import getShort from './getShort';
import getLong from './getLong';
import getBytes from './getBytes';
import utf16ToAnsi from './utf16ToAnsi';

/**
 *
 * @param params
 * @private
 */
export default (params = {}) => {
    return new Promise((resolve, reject) => {
        let {fileBinaryReadData = {}} = params;
        const from = fileBinaryReadData.fDir;
        const size = 1 << fileBinaryReadData.sectorShift;
        fileBinaryReadData.fatEntries = [];

        recursiveRead(from, size, fileBinaryReadData, (fileBinaryReadData) => {
            const fatEntries = fileBinaryReadData.fatEntries;
            let len = fatEntries.length;

            while (len && fatEntries[len - 1].type === 0) {
                len--;
                fatEntries.length = len;
            }

            resolve(fileBinaryReadData);
        }, reject);
    });
};

function recursiveRead (from, size, fileBinaryReadData, resolve, reject) {
    let queue = [];
    const {sectorShift = 0, endOfChain = 0, binaryData = {}, fatChains, fatEntries} = fileBinaryReadData;

    for (let i = 0; i < size; i += 128) {
        queue.push(binaryData.readUint8Array({
            index: ((from + 1) << sectorShift) + i,
            length: 128
        }).then(entry => {
            const queue = [];
            const data = {
                type: entry[0x42],
                color: entry[0x43]
            };

            queue.push(getShort({
                from: 0x40,
                data: entry,
                fileBinaryReadData
            }).then((res) => {
                data.name = utf16ToAnsi({
                    data: binaryData.excludeUintArray({
                        data: entry,
                        index: 0,
                        length: res
                    }),
                    fileBinaryReadData
                });
            }));

            queue.push(getLong({
                from: 0x44,
                data: entry,
                fileBinaryReadData
            }).then((res) => {
                data.left = res;
            }));

            queue.push(getLong({
                from: 0x48,
                data: entry,
                fileBinaryReadData
            }).then((res) => {
                data.right = res;
            }));

            queue.push(getLong({
                from: 0x4C,
                data: entry,
                fileBinaryReadData
            }).then((res) => {
                data.child = res;
            }));

            queue.push(getLong({
                from: 0x74,
                data: entry,
                fileBinaryReadData
            }).then((res) => {
                data.start = res;
            }));

            queue.push(getBytes({
                from: 0x78,
                data: entry,
                count: 8,
                fileBinaryReadData
            }).then((res) => {
                data.size = res;
            }));

            Promise.all(queue).then(() => {
                fatEntries.push(data);
            }, reject);
        }, reject));
    }

    Promise.all(queue).then(() => {
        from = (fatChains && fatChains[from]) || endOfChain;

        if (from !== endOfChain) {
            recursiveRead(from, size, fileBinaryReadData, resolve, reject);
        } else {
            resolve(fileBinaryReadData);
        }
    }, reject);
}


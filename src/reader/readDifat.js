import getLong from './getLong';

/**
 *
 * @param params
 * @private
 */
export default (params = {}) => {
    return new Promise((resolve, reject) => {
        let i = 109;
        const queue = [];
        const {fileBinaryReadData} = params;
        fileBinaryReadData.difat = [];
        fileBinaryReadData.difat.length = queue.length = i;

        while (i--) {
            queue[i] = getLong({
                fileBinaryReadData,

                //0x4C = 76
                from: (76 + i * 4)
            }).then(result => {
                fileBinaryReadData.difat[i] = result;
            });
        }

        Promise.all(queue).then(() => {
            new Promise(res => {
                if (fileBinaryReadData.fDifat !== fileBinaryReadData.endOfChain) {
                    recursiveReadLastSectors({
                        fileBinaryReadData,
                        size: 1 << fileBinaryReadData.sectorShift,
                        resolve: res,
                        reject
                    });
                } else {
                    res();
                }
            }).then(() => {
                // delete unused links
                let difat = fileBinaryReadData.difat;
                let len = difat.length;

                while (len && difat[len - 1] === fileBinaryReadData.freeSect) {
                    len--;
                    difat.length = len;
                }

                resolve(fileBinaryReadData);
            }, reject);
        }, reject);
    });
};

function recursiveReadLastSectors (params = {}) {
    let {resolve, reject, index = 0, fileBinaryReadData, size = 0, from} = params;
    const queue = [];
    const len = size - 4;

    if (from == null) {
        from = fileBinaryReadData.fDifat;
    }

    const start = (from + 1) << fileBinaryReadData.sectorShift;
    let i = 0;

    for (; i < len; i += 4) {
        queue.push(getLong({
            fileBinaryReadData,
            from: start + i
        }).then(result => {
            fileBinaryReadData.difat.push(result);
        }));
    }

    queue.push(getLong({
        fileBinaryReadData,
        from: start + i
    }).then(result => {
        from = result;
    }));

    Promise.all(queue).then(() => {
        if (from !== fileBinaryReadData.endOfChain && index < fileBinaryReadData.cDifat) {
            recursiveReadLastSectors({
                resolve,
                reject,
                fileBinaryReadData,
                index: index + 1,
                size,
                from
            });
        } else {
            resolve(fileBinaryReadData);
        }
    }, reject);
}
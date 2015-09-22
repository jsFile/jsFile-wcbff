/**
 *
 * @param params
 * @private
 */
export default (params = {}) => {
    return new Promise(function (resolve, reject) {
        const {fileBinaryReadData = {}, index = 0, isRoot} = params;
        const entry = (fileBinaryReadData.fatEntries && fileBinaryReadData.fatEntries[index]) || {};
        const {endOfChain, miniSectorShift} = fileBinaryReadData;
        const size = entry.size || 0;
        const stream = [];
        let from = entry.start || 0;

        /**
         * If the size is smaller then 4096b we should read the data from miniFat, otherwise - from general Fat.
         * "RootEntry" is exception, we should read it's content from Fat.
         */
        if (size < fileBinaryReadData.miniSectorCutoff && !isRoot) {
            const sectorSize = 1 << miniSectorShift;

            while (from !== endOfChain) {
                let start = from << miniSectorShift;
                const len = start + sectorSize;

                // read miniFat-sector
                for (let i = start; i < len; i++) {
                    stream.push(fileBinaryReadData.miniFat[i]);
                }

                // Находим следующий кусок miniFat'а в массиве последовательностей
                from = (fileBinaryReadData.miniFatChains && fileBinaryReadData.miniFatChains[from]) || endOfChain;
            }

            resolve(prepareStream({
                size: size,
                stream: stream,
                fileBinaryReadData
            }));
        } else {
            getStreamFromBigFile(stream, from, fileBinaryReadData, resolve, reject);
        }
    });
};

function prepareStream (params) {
    let typedArray = params.fileBinaryReadData.binaryData.getUint8Array(params.size);

    typedArray.set(params.stream.slice(0, params.size), 0);

    return typedArray;
}

function getStreamFromBigFile (stream, from, fileBinaryReadData, resolve, reject) {
    const sectorShift = fileBinaryReadData.sectorShift;
    const endOfChain = fileBinaryReadData.endOfChain;
    const sectorSize = 1 << fileBinaryReadData;

    if (from != endOfChain) {
        const start = (from + 1) << sectorShift;

        fileBinaryReadData.binaryData.readUint8Array({
            index: start,
            length: sectorSize
        }).then((bytes) => {
            let len = bytes.length;
            for (let i = 0; i < len; i++) {
                stream.push(bytes[i]);
            }

            from = (fileBinaryReadData.fatChains && fileBinaryReadData.fatChains[from]) || endOfChain;
            getStreamFromBigFile(stream, from, fileBinaryReadData, resolve, reject);
        }, reject);
    } else {
        resolve(prepareStream({
            size,
            stream,
            fileBinaryReadData
        }));
    }
}
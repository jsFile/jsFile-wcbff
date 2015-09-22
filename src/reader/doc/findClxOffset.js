import getLong from './../getLong';

export default (params = {}) => {
    return new Promise((resolve, reject) => {
        let {fileBinaryReadData, clx = [], from = 0} = params;
        recursiveRead(from, clx, fileBinaryReadData, resolve, reject);
    });
};

function recursiveRead (from, clx, fileBinaryReadData, resolve, reject) {
    let index = fileBinaryReadData && fileBinaryReadData.binaryData.findPosition({
        data: clx,
        needle: 0x02,
        offset: from
    });

    if (index >= 0) {
        getLong({
            from: index,
            data: clx,
            fileBinaryReadData
        }).then((res) => {
            fileBinaryReadData.lcbPieceTable = res;
            fileBinaryReadData.pieceTable = fileBinaryReadData.binaryData.excludeUintArray({
                data: clx,
                index: index + 5,
                length: clx.length - (index + 5)
            });

            // if the size isn't equal that found size - let's find again
            if (fileBinaryReadData.pieceTable.length !== fileBinaryReadData.lcbPieceTable) {
                from = index + 1;
                recursiveRead(from, clx, fileBinaryReadData, resolve, reject);
            } else {
                resolve(fileBinaryReadData);
            }
        }, reject);
    } else {
        resolve(fileBinaryReadData);
    }
}
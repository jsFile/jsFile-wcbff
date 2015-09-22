import getLong from './../getLong';

/**
 *
 * @param params
 * @private
 */
export default (params = {}) => {
    return new Promise((resolve, reject) => {
        const {index = 0, fileBinaryReadData = {}} = params;
        fileBinaryReadData.cp = fileBinaryReadData.cp || [];
        recursiveRead(index, fileBinaryReadData, resolve, reject);
    });
};

function recursiveRead (index, fileBinaryReadData, resolve, reject) {
    getLong({
        data: fileBinaryReadData.pieceTable,
        fileBinaryReadData,
        from: index
    }).then((res) => {
        fileBinaryReadData.cp.push(res);
        if (res !== fileBinaryReadData.lastCp) {
            index += 4;
            recursiveRead(index, fileBinaryReadData, resolve, reject);
        } else {
            resolve(fileBinaryReadData);
        }
    }, reject);
}
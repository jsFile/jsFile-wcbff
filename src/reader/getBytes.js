/**
 *
 * @param params
 * @private
 */
export default (params = {}) => {
    return new Promise((resolve, reject) => {
        const {data, fileBinaryReadData, from, count} = params;

        if (!fileBinaryReadData && !data) {
            return reject();
        }

        let promise;
        const binary = fileBinaryReadData && fileBinaryReadData.binaryData;
        if (data) {
            promise = new Promise((resolve) => {
                resolve(binary.excludeUintArray({
                    index: from,
                    length: count,
                    data: data
                }));
            });
        } else {
            promise = binary.readUint8Array({
                index: from,
                length: count
            });
        }

        promise.then((bytes) => {
            let bytesArray = bytes;
            if (fileBinaryReadData.isLittleEndian) {
                bytesArray = binary.reverseUintArray(bytes);
            }

            resolve(Number(`0x${binary.uintArrayToHex(bytesArray)}`, 16));
        }, reject);
    });
};
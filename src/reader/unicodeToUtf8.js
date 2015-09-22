import getShort from './getShort';

/**
 *
 * @param params
 * @private
 */
export default (params) => {
    return new Promise((resolve, reject) => {
        let {result = '', index = 0, data = [], fileBinaryReadData, length} = params;
        if (length == null) {
            length = data.length;
        }

        recursiveRead(data, index, length, fileBinaryReadData, result, resolve, reject);
    });
};

function recursiveRead (data, index, length, fileBinaryReadData, result, resolve, reject) {
    let cd;

    if (index < length) {
        cd = fileBinaryReadData.binaryData.excludeUintArray({
            data,
            index,
            length: 2
        });

        const low = cd[0];

        // if the top byte is zero - we work with ANSI
        if (cd[1] === 0) {

            // if ASCII-value of the low byte is greater than 32, use it as is.
            if (low >= 32) {
                result += String.fromCharCode(low);
            } else {
                // check the special commands
                if (low === 0x0D || low === 0x07) {
                    result += '\n';
                } else if (low === 0x13) {
                    result += 'HYPER13';
                } else if (low === 0x14) {
                    result += 'HYPER14';
                } else if (low === 0x15) {
                    result += 'HYPER15';
                }
            }

            index += 2;
            recursiveRead(data, index, length, fileBinaryReadData, result, resolve, reject);
        } else {
            getShort({
                fileBinaryReadData,
                data: cd,
                from: 0
            }).then((res) => {
                console.log(res);

                index += 2;
                recursiveRead(data, index, length, fileBinaryReadData, result, resolve, reject);
            }, reject);
        }
    } else {
        resolve(result);
    }
}
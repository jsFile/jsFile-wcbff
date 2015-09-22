import getLong from './../getLong';
import unicodeToUtf8 from './../unicodeToUtf8';
import utf16ToAnsi from './../utf16ToAnsi';

/**
 *
 * @param params
 * @private
 */
export default (params = {}) => {
    return new Promise((resolve, reject) => {
        let {index = 0, fileBinaryReadData = {}, length = 0} = params;

        fileBinaryReadData.text = fileBinaryReadData.text || '';

        readRecursive(index, fileBinaryReadData, length, resolve, reject);
    });
};

function readRecursive (index, fileBinaryReadData, length, resolve, reject) {
    if (index < length) {
        getLong({
            from: 2,
            data: fileBinaryReadData.pcd[index],
            fileBinaryReadData
        }).then((res) => {
            let part;
            const isAnsi = (res & 0x40000000) === 0x40000000;
            let fc = res & 0x3FFFFFFF;
            let lcb = fileBinaryReadData.cp[index + 1] - fileBinaryReadData.cp[index];

            // If it's Unicode then we need more files in 2 times
            if (!isAnsi) {
                lcb *= 2;
            } else {
                // if it's ANSI that we need less files
                fc /= 2;
            }

            // read the part from WordDocument stream
            part = fileBinaryReadData.binaryData.excludeUintArray({
                data: fileBinaryReadData.wordDocumentStream,
                index: fc,
                length: lcb
            });

            // if it's Unicode then convert to normal state
            if (!isAnsi) {
                unicodeToUtf8({
                    data: part,
                    fileBinaryReadData
                }).then((text) => {
                    fileBinaryReadData.text += text;
                    index++;
                    readRecursive(index, fileBinaryReadData, length, resolve, reject);
                });
            } else {
                fileBinaryReadData.text += utf16ToAnsi({
                    data: part
                });

                index++;
                readRecursive(index, fileBinaryReadData, length, resolve, reject);
            }
        }, reject);
    } else {
        resolve(fileBinaryReadData);
    }
}
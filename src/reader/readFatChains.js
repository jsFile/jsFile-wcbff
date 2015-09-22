import getLong from './getLong';

/**
 *
 * @private
 */
export default (params = {}) => {
    return new Promise((resolve, reject) => {
        let {index = 0, length = 0, size = 0, fileBinaryReadData = {}} = params;
        const sectorShift = fileBinaryReadData.sectorShift;
        const queue = [];

        fileBinaryReadData.fatChains = [];
        for (; index < length; index++) {
            for (let j = 0; j < size; j += 4) {
                queue.push(getLong({
                    fileBinaryReadData,
                    from: ((fileBinaryReadData.difat[index] + 1) << sectorShift) + index
                }).then(function (result) {
                    fileBinaryReadData.fatChains.push(result);
                }));
            }
        }

        Promise.all(queue).then(() => {
            resolve(fileBinaryReadData);
        }, reject);
    });
};
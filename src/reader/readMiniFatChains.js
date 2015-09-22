import getLong from './getLong';

/**
 *
 * @param params
 * @private
 */
export default (params = {}) => {
    return new Promise((resolve, reject) => {
        let queue = [];
        let {from = 0, size = 0, fileBinaryReadData = {}} = params;
        const {sectorShift = 0, endOfChain = 0} = fileBinaryReadData;

        fileBinaryReadData.miniFatChains = [];

        while (from !== endOfChain) {
            for (let i = 0; i < size; i += 4) {
                queue.push(getLong({
                    fileBinaryReadData,
                    from: ((from + 1) << sectorShift) + i
                }).then(function (result) {
                    fileBinaryReadData.miniFatChains.push(result);
                }));
            }

            from = (fileBinaryReadData.fatChains && fileBinaryReadData.fatChains[from]) || endOfChain;
        }

        Promise.all(queue).then(() => {
            resolve(fileBinaryReadData);
        }, reject);
    });
};
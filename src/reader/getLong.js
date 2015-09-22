import getBytes from './getBytes';

/**
 *
 * @param params
 * @private
 */
export default (params = {}) => {
    return getBytes({
        data: params.data,
        from: params.from,
        count: 4,
        fileBinaryReadData: params.fileBinaryReadData
    });
};
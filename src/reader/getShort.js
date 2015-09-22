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
        count: 2,
        fileBinaryReadData: params.fileBinaryReadData
    });
};
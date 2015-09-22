/**
 *
 * @param options
 * @returns {*}
 */
export default function (options = {}) {
    let {offset = 0, data = [], needle} = options;
    let bytes;

    bytes = this.excludeUintArray({
        data: data,
        index: offset,
        length: data.length
    });

    return Array.prototype.indexOf.call(bytes, needle);
}
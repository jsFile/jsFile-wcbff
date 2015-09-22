/**
 *
 * @param options
 * @returns {Array}
 */
export default function (options = {}) {
    let arr = [];
    let j = 0;
    let {data = [], length = 0} = options;
    const len = data.length;
    let i = length && Math.ceil(len / length);

    while (i--) {
        arr[i] = this.excludeUintArray({
            data,
            index: j,
            length: (length > (len - length * i) ? (len - length * i) : length) - j
        });
        j += length;
    }

    return arr;
}
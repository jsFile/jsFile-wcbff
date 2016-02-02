/**
 *
 * @param options
 * @returns {*}
 */
export default function excludeUintArray (options = {}) {
    let dataArray;
    const arr = [];
    let {length = 0, index = 0, data = []} = options;

    if (data instanceof Uint16Array) {
        dataArray = this.getUint16Array(length * 2);
    } else if (data instanceof Uint32Array) {
        dataArray = this.getUint32Array(length * 4);
    } else {
        dataArray = this.getUint8Array(length);
    }

    length += index;
    for (let i = index; i < length; i++) {
        arr.push(data[i]);
    }

    dataArray.set(arr, 0);
    return dataArray;
}
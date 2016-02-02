/**
 *
 * @param array
 * @returns {*}
 */
export default function reverseUintArray (array = []) {
    let dataArray;
    const len = array.length;

    if (array instanceof Uint16Array) {
        dataArray = this.getUint16Array(len);
    } else if (array instanceof Uint32Array) {
        dataArray = this.getUint32Array(len);
    } else {
        dataArray = this.getUint8Array(len);
    }

    //create copy of array and reverse it
    dataArray.set(Array.prototype.slice.call(array, 0).reverse(), 0);

    return dataArray;
}
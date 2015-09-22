/**
 *
 * @param byteLength {number}
 * @param bytes {array}
 * @returns {{buffer: ArrayBuffer, array: Uint8Array, view: DataView}}
 */
export default function (byteLength = 0, bytes = []) {
    let buffer = new ArrayBuffer(byteLength);
    let array = new Uint8Array(buffer);
    array.set(Array.prototype.slice.call(bytes, 0, byteLength), 0);

    return {
        buffer,
        array,
        view: new DataView(buffer)
    };
}
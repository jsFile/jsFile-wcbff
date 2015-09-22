/**
 *
 * @param size
 * @returns {Uint8Array}
 */
export default function (size) {
    return new Uint8Array(new ArrayBuffer(size));
}
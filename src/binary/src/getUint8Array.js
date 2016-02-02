/**
 *
 * @param size
 * @returns {Uint8Array}
 */
export default function getUint8Array (size) {
    return new Uint8Array(new ArrayBuffer(size));
}
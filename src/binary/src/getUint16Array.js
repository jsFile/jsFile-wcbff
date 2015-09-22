/**
 *
 * @param size
 * @returns {Uint16Array}
 */
export default function  (size) {
    return new Uint16Array(new ArrayBuffer(size));
}
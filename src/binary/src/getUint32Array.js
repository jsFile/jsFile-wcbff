/**
 *
 * @param size
 * @returns {Uint32Array}
 */
export default function  (size) {
    return new Uint32Array(new ArrayBuffer(size));
}
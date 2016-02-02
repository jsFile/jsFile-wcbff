/**
 *
 * @param str
 * @returns {*}
 */
export default function ord (str) {
    str = String(str);

    let code = str.charCodeAt(0);

    if (55296 <= code && code <= 56319) {
        if (str.length === 1) {
            return code;
        }

        return ((code - 55296) * 1024) + (str.charCodeAt(1) - 56320) + 65536;
    }

    return code;
}
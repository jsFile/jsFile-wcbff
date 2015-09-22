/**
 *
 * @param array
 * @returns {string}
 */
export default function (array = {}) {
    let result = '';
    const len = array.length;

    for (let i = 0; i < len; i++) {
        let str = array[i].toString(16);
        result += (str.length < 2 ? '0' + str : str);
    }

    return result;
}
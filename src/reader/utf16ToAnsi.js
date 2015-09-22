export default (params = {}) => {
    let result = '';
    let {data = [], length = 0} = params;

    while (length--) {
        if (data[length] !== 0) {
            result = String.fromCharCode(data[length]) + result;
        }
    }

    return result;
};
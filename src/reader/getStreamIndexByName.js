export default (params = {}) => {
    const {from = 0, name, fileBinaryReadData = {}} = params;
    const fatEntries = fileBinaryReadData.fatEntries || [];

    for (let i = fatEntries.length - 1; i >= from; i--) {
        if (fatEntries[i].name === name) {
            return i;
        }
    }

    return null;
};
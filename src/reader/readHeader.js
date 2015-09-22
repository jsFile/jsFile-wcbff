import getShort from './getShort';
import getLong from './getLong';

/**
 *
 * @param params
 * @private
 */
export default (params = {}) => {
    const {fileBinaryReadData} = params;
    fileBinaryReadData.isLittleEndian = false;
    return fileBinaryReadData.binaryData.readUint8Array({
        index: 0x1C,
        length: 2
    }).then(bytes => {
        const queue = [];
        fileBinaryReadData.isLittleEndian = (fileBinaryReadData.binaryData.uintArrayToHex(bytes) === 'FEFF');

        queue.push(getShort({
            fileBinaryReadData,
            from: 0x1A
        }).then((version) => {
            fileBinaryReadData.version = version;

            if (version === 4) {
                return getLong({
                    fileBinaryReadData,
                    from: 0x28
                }).then(cDir => fileBinaryReadData.cDir = cDir);
            }
        }));

        queue.push(getShort({
            fileBinaryReadData,
            from: 0x1E
        }).then(sectorShift => fileBinaryReadData.sectorShift = sectorShift));

        queue.push(getShort({
            fileBinaryReadData,
            from: 0x20
        }).then(miniSectorShift => fileBinaryReadData.miniSectorShift = miniSectorShift));

        queue.push(getLong({
            fileBinaryReadData,
            from: 0x38
        }).then(miniSectorCutoff => fileBinaryReadData.miniSectorCutoff = miniSectorCutoff));

        queue.push(getLong({
            fileBinaryReadData,
            from: 0x30
        }).then((fDir) => fileBinaryReadData.fDir = fDir));

        queue.push(getLong({
            fileBinaryReadData,
            from: 0x2C
        }).then((fatCount) => fileBinaryReadData.fatCount = fatCount));

        queue.push(getLong({
            fileBinaryReadData,
            from: 0x40
        }).then((minifatCount) => fileBinaryReadData.minifatCount = minifatCount));

        queue.push(getLong({
            fileBinaryReadData,
            from: 0x3C
        }).then(fMiniFat => fileBinaryReadData.fMiniFat = fMiniFat));

        queue.push(getLong({
            fileBinaryReadData,
            from: 0x48
        }).then((cDifat) => fileBinaryReadData.cDifat = cDifat));

        queue.push(getLong({
            fileBinaryReadData,
            from: 0x44
        }).then((fDifat) => fileBinaryReadData.fDifat = fDifat));

        return Promise.all(queue).then(() => fileBinaryReadData);
    });
};
import Binary from './../binary/index';
import readHeader from './readHeader';
import readDifat from './readDifat';
import readFatChains from './readFatChains';
import readMiniFatChains from './readMiniFatChains';
import readDirectoryStructure from './readDirectoryStructure';
import getStreamIndexByName from './getStreamIndexByName';
import getStreamByIndex from './getStreamByIndex';

/**
 *
 * @param file
 * @private
 */
export default function (file) {
    return new Promise(function (resolve, reject) {
        const binaryData = new Binary(file);

        binaryData.readUint8Array({
            index: 0,
            length: 8
        }).then((bytes) => {
            const hexId = binaryData.uintArrayToHex(bytes);
            const fileBinaryReadData = {
                endOfChain: 0xFFFFFFFE,
                freeSect: 0xFFFFFFFF,
                binaryData: binaryData,
                dataHelper: binaryData.getDataHelper(bytes.length, bytes),
                hexId
            };

            if (!hexId || ['D0CF11E0A1B11AE1', '0E11FC0DD0CF11E0'].indexOf(hexId.toUpperCase()) < 0) {
                return reject();
            }

            return readHeader({fileBinaryReadData}).then((fileBinaryReadData) => {
                return readDifat({fileBinaryReadData}).then((fileBinaryReadData) => {
                    return readFatChains({
                        fileBinaryReadData,
                        size: 1 << fileBinaryReadData.sectorShift,
                        length: fileBinaryReadData.difat.length
                    }).then((fileBinaryReadData) => {
                        return readMiniFatChains({
                            fileBinaryReadData,
                            from: fileBinaryReadData.fMiniFat,
                            size: 1 << fileBinaryReadData.sectorShift
                        }).then((fileBinaryReadData) => {
                            return readDirectoryStructure({fileBinaryReadData}).then((fileBinaryReadData) => {
                                let rootStreamIndex = getStreamIndexByName({
                                    name: 'Root Entry',
                                    fileBinaryReadData
                                });

                                if (rootStreamIndex == null) {
                                    fileBinaryReadData.difat = null;
                                    return reject();
                                }

                                return getStreamByIndex({
                                    index: rootStreamIndex,
                                    fileBinaryReadData,
                                    isRoot: true
                                }).then(stream => {
                                    fileBinaryReadData.difat = null;
                                    fileBinaryReadData.miniFat = stream;
                                    resolve(fileBinaryReadData);
                                    fileBinaryReadData = null;
                                });
                            });
                        });
                    });
                });
            });
        }, reject);
    });
}
import getStreamIndexByName from './../getStreamIndexByName';
import getStreamByIndex from './../getStreamByIndex';
import getShort from './../getShort';
import getLong from './../getLong';
import findClxOffset from './findClxOffset';
import fillingCp from './fillingCp';
import readText from './readText';

/**
 *
 * @param fileBinaryReadData
 * @private
 */
export default (fileBinaryReadData) => {
    return new Promise((resolve, reject) => {
        const wordDocumentStreamIndex = getStreamIndexByName({
            name: 'WordDocument',
            fileBinaryReadData
        });

        if (wordDocumentStreamIndex == null) {
            return reject();
        }

        getStreamByIndex({
            index: wordDocumentStreamIndex,
            fileBinaryReadData
        }).then((wordDocumentStream) => {
            fileBinaryReadData.wordDocumentStream = wordDocumentStream;

            return getShort({
                from: 0x000A,
                data: wordDocumentStream,
                fileBinaryReadData
            }).then((bytes) => {
                let queue = [];

                // Number of table: 0 or 1
                const tmp = 0x0200;
                fileBinaryReadData.streamTableNumber = Number((bytes & tmp) === tmp);

                // Find position of CLX in table stream and CLX's size.
                queue.push(getLong({
                    from: 0x01A2,
                    data: wordDocumentStream,
                    fileBinaryReadData
                }).then((res) => fileBinaryReadData.clxPosition = res));

                queue.push(getLong({
                    from: 0x01A6,
                    data: wordDocumentStream,
                    fileBinaryReadData
                }).then((res) => fileBinaryReadData.clxSize = res));

                // read several values to separate the positions from size in CLX
                queue.push(getLong({
                    from: 0x004C,
                    data: wordDocumentStream,
                    fileBinaryReadData
                }).then((res) => fileBinaryReadData.ccpText = res));

                queue.push(getLong({
                    from: 0x0050,
                    data: wordDocumentStream,
                    fileBinaryReadData
                }).then((res) => fileBinaryReadData.ccpFtn = res));

                queue.push(getLong({
                    from: 0x0054,
                    data: wordDocumentStream,
                    fileBinaryReadData
                }).then((res) => fileBinaryReadData.ccpHdd = res));

                queue.push(getLong({
                    from: 0x0058,
                    data: wordDocumentStream,
                    fileBinaryReadData
                }).then((res) => fileBinaryReadData.ccpMcr = res));

                queue.push(getLong({
                    from: 0x005C,
                    data: wordDocumentStream,
                    fileBinaryReadData
                }).then((res) => fileBinaryReadData.ccpAtn = res));

                queue.push(getLong({
                    from: 0x0060,
                    data: wordDocumentStream,
                    fileBinaryReadData
                }).then((res) => fileBinaryReadData.ccpEdn = res));

                queue.push(getLong({
                    from: 0x0064,
                    data: wordDocumentStream,
                    fileBinaryReadData
                }).then((res) => fileBinaryReadData.ccpTxbx = res));

                queue.push(getLong({
                    from: 0x0068,
                    data: wordDocumentStream,
                    fileBinaryReadData
                }).then((res) => fileBinaryReadData.ccpHdrTxbx = res));

                return Promise.all(queue).then(() => {
                    // find the last CP - character position
                    fileBinaryReadData.lastCp =
                        fileBinaryReadData.ccpFtn +
                        fileBinaryReadData.ccpHdd +
                        fileBinaryReadData.ccpMcr +
                        fileBinaryReadData.ccpAtn +
                        fileBinaryReadData.ccpEdn +
                        fileBinaryReadData.ccpTxbx +
                        fileBinaryReadData.ccpHdrTxbx +
                        Number(fileBinaryReadData.ccpText);

                    fileBinaryReadData.lastCp += Number(fileBinaryReadData.lastCp !== 0);

                    // find the table
                    fileBinaryReadData.tStreamIndex = getStreamIndexByName({
                        fileBinaryReadData,
                        name: fileBinaryReadData.streamTableNumber + 'Table'
                    });

                    if (fileBinaryReadData.tStreamIndex == null) {
                        return reject();
                    }

                    return getStreamByIndex({
                        index: fileBinaryReadData.tStreamIndex,
                        fileBinaryReadData
                    }).then((stream) => {
                        const clx = fileBinaryReadData.binaryData.excludeUintArray({
                            index: fileBinaryReadData.clxPosition,
                            length: fileBinaryReadData.clxSize,
                            data: stream
                        });

                        fileBinaryReadData.lcbPieceTable = 0;
                        fileBinaryReadData.pieceTable = [];
                        return findClxOffset({
                            from: 0,
                            clx,
                            fileBinaryReadData
                        }).then((fileBinaryReadData) => {
                            // didn't find the text
                            if (!fileBinaryReadData.pieceTable.length) {
                                return reject();
                            }

                            let index = 0;
                            return fillingCp({
                                index,
                                fileBinaryReadData
                            }).then((fileBinaryReadData) => {
                                fileBinaryReadData.pcd = fileBinaryReadData.binaryData.excludeUintArray({
                                    data: fileBinaryReadData.pieceTable,
                                    index: index + 4,
                                    length: fileBinaryReadData.pieceTable.length - (index + 4)
                                });

                                fileBinaryReadData.pcd = fileBinaryReadData.binaryData.uintArraySplit({
                                    data: fileBinaryReadData.pcd,
                                    length: 8
                                });

                                return readText({
                                    fileBinaryReadData,
                                    length: fileBinaryReadData.pcd.length
                                }).then((fileBinaryReadData) => {
                                    // remove from file included objects
                                    fileBinaryReadData.text = fileBinaryReadData.text
                                        .replace(/HYPER13 *(INCLUDEPICTURE|HTMLCONTROL)(.*)HYPER15/im, '')
                                        .replace(/HYPER13(.*)HYPER14(.*)HYPER15/im, '$2');

                                    resolve(fileBinaryReadData);
                                });
                            });
                        });
                    });
                });
            });
        }, reject);
    });
};
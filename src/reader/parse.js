import JsFile from 'JsFile';
import getStreams from './getStreams';
import parseDoc from './doc/parse';
const {errors: {invalidReadFile, invalidFileType}} = JsFile.Engine;

export default function parse () {
    return new Promise((resolve, reject) => {
        if (!this.isValid()) {
            reject(new Error(invalidFileType));
            return;
        }

        /**
         * TODO: detect document type by file
         * @type {boolean}
         */
        const isDoc = true;

        //const fileName = this.file.name;

        getStreams(this.file).then((fileBinaryReadData) => {
            if (isDoc) {
                parseDoc(fileBinaryReadData).then(() => {
                    /*prepareDocument(fileBinaryReadData.text, (documentData) => {
                        documentData.name = ((documentData.fileInfo && documentData.fileInfo.title) || fileName || '')
                            .replace(/\.[^.]+$/, '');

                        resolve(new Document(documentData));
                    });*/
                }, () => reject(new Error(invalidReadFile)));
            } else {
                reject(new Error(invalidFileType));
            }
        }, () => reject(new Error(invalidFileType)));
    });
}
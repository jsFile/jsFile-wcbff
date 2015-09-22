import JsFile from 'JsFile';
import getStreams from './getStreams';
import parseDoc from './doc/parse';
const {Document} = JsFile;
const {errors: {invalidReadFile, invalidFileType}} = JsFile.Engine;

export default function () {
    return new Promise(function (resolve, reject) {
        if (!this.isValid()) {
            reject(new Error(invalidFileType));
            return;
        }

        /**
         * TODO: detect document type by file
         * @type {boolean}
         */
        const isDoc = true;
        const fileName = this.file.name;

        getStreams(this.file).then((fileBinaryReadData) => {
            if (isDoc) {
                parseDoc(fileBinaryReadData).then((fileBinaryReadData) => {
                    console.log(fileBinaryReadData.text);
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
    }.bind(this));
}
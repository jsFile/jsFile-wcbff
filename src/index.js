import JsFile from 'JsFile';
import createDocument from './reader/createDocument';
import parse from './reader/parse';
import './polyfill';

const {Engine, defineEngine} = JsFile;

/**
 * @description Supported files by engine
 * @type {{extension: Array, mime: Array}}
 */
const files = {
    extension: ['doc'],
    mime: ['application/msword']
};

class WcbffEngine extends Engine {
    constructor () {
        super(...arguments);

        this.createDocument = createDocument;
        this.files = files;
        this.parser = parse;
    }

    static test (file) {
        return Boolean(file && Engine.validateFile(file, files));
    }
}

WcbffEngine.mimeTypes = files.mime.slice(0);
defineEngine(WcbffEngine);

export default WcbffEngine;
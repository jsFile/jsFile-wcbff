import {Engine, defineEngine} from 'JsFile';
import createDocument from './reader/createDocument';
import parse from './reader/parse';
import pf from './polyfill';

/**
 * @description Supported files by engine
 * @type {{extension: Array, mime: Array}}
 */
const files = {
    extension: ['doc'],
    mime: ['application/msword']
};

class WcbffEngine extends Engine {
    createDocument = createDocument

    files = files

    parser = parse

    static test (file) {
        return Boolean(file && Engine.validateFile(file, files));
    }

    static mimeTypes = files.mime.slice(0)
}

defineEngine(WcbffEngine);

export default WcbffEngine;
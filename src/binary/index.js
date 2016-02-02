import findPosition from './src/findPosition.js';
import getDataHelper from './src/getDataHelper';
import getUint8Array from './src/getUint8Array';
import getUint16Array from './src/getUint16Array';
import getUint32Array from './src/getUint32Array';
import ord from './src/ord';
import readUint8Array from './src/readUint8Array';
import reverseUintArray from './src/reverseUintArray';
import uintArraySplit from './src/uintArraySplit';
import uintArrayToHex from './src/uintArrayToHex';
import excludeUintArray from './src/excludeUintArray';

/**
 * @param blob
 */
class Binary {
    constructor (blob = null) {
        this.blob = blob;
        this.size = (blob && blob.size) || 0;
        this.ord = ord;
        this.uintArrayToHex = uintArrayToHex;
        this.findPosition = findPosition;
        this.getDataHelper = getDataHelper;
        this.getUint8Array = getUint8Array;
        this.getUint16Array = getUint16Array;
        this.getUint32Array = getUint32Array;
        this.readUint8Array = readUint8Array;
        this.reverseUintArray = reverseUintArray;
        this.uintArraySplit = uintArraySplit;
        this.excludeUintArray = excludeUintArray;
    }
}

export default Binary;
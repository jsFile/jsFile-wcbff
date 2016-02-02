(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("JsFile"));
	else if(typeof define === 'function' && define.amd)
		define(["JsFile"], factory);
	else if(typeof exports === 'object')
		exports["JsFileWcbff"] = factory(require("JsFile"));
	else
		root["JsFileWcbff"] = factory(root["JsFile"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _createDocument = __webpack_require__(2);

	var _createDocument2 = _interopRequireDefault(_createDocument);

	var _parse = __webpack_require__(3);

	var _parse2 = _interopRequireDefault(_parse);

	__webpack_require__(33);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Engine = _JsFile2.default.Engine;
	var defineEngine = _JsFile2.default.defineEngine;

	/**
	 * @description Supported files by engine
	 * @type {{extension: Array, mime: Array}}
	 */

	var files = {
	    extension: ['doc'],
	    mime: ['application/msword']
	};

	var WcbffEngine = function (_Engine) {
	    _inherits(WcbffEngine, _Engine);

	    function WcbffEngine() {
	        _classCallCheck(this, WcbffEngine);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WcbffEngine).apply(this, arguments));

	        _this.createDocument = _createDocument2.default;
	        _this.files = files;
	        _this.parser = _parse2.default;
	        return _this;
	    }

	    _createClass(WcbffEngine, null, [{
	        key: 'test',
	        value: function test(file) {
	            return Boolean(file && Engine.validateFile(file, files));
	        }
	    }]);

	    return WcbffEngine;
	}(Engine);

	WcbffEngine.mimeTypes = files.mime.slice(0);
	defineEngine(WcbffEngine);

	exports.default = WcbffEngine;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createDocument;
	function createDocument() {}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = parse;

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _getStreams = __webpack_require__(4);

	var _getStreams2 = _interopRequireDefault(_getStreams);

	var _parse = __webpack_require__(28);

	var _parse2 = _interopRequireDefault(_parse);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _JsFile$Engine$errors = _JsFile2.default.Engine.errors;
	var invalidReadFile = _JsFile$Engine$errors.invalidReadFile;
	var invalidFileType = _JsFile$Engine$errors.invalidFileType;
	function parse() {
	    var _this = this;

	    return new Promise(function (resolve, reject) {
	        if (!_this.isValid()) {
	            reject(new Error(invalidFileType));
	            return;
	        }

	        /**
	         * TODO: detect document type by file
	         * @type {boolean}
	         */
	        var isDoc = true;

	        //const fileName = this.file.name;

	        (0, _getStreams2.default)(_this.file).then(function (fileBinaryReadData) {
	            if (isDoc) {
	                (0, _parse2.default)(fileBinaryReadData).then(function () {
	                    /*prepareDocument(fileBinaryReadData.text, (documentData) => {
	                        documentData.name = ((documentData.fileInfo && documentData.fileInfo.title) || fileName || '')
	                            .replace(/\.[^.]+$/, '');
	                          resolve(new Document(documentData));
	                    });*/
	                }, function () {
	                    return reject(new Error(invalidReadFile));
	                });
	            } else {
	                reject(new Error(invalidFileType));
	            }
	        }, function () {
	            return reject(new Error(invalidFileType));
	        });
	    });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = getStreams;

	var _index = __webpack_require__(5);

	var _index2 = _interopRequireDefault(_index);

	var _readHeader = __webpack_require__(17);

	var _readHeader2 = _interopRequireDefault(_readHeader);

	var _readDifat = __webpack_require__(21);

	var _readDifat2 = _interopRequireDefault(_readDifat);

	var _readFatChains = __webpack_require__(22);

	var _readFatChains2 = _interopRequireDefault(_readFatChains);

	var _readMiniFatChains = __webpack_require__(23);

	var _readMiniFatChains2 = _interopRequireDefault(_readMiniFatChains);

	var _readDirectoryStructure = __webpack_require__(24);

	var _readDirectoryStructure2 = _interopRequireDefault(_readDirectoryStructure);

	var _getStreamIndexByName = __webpack_require__(26);

	var _getStreamIndexByName2 = _interopRequireDefault(_getStreamIndexByName);

	var _getStreamByIndex = __webpack_require__(27);

	var _getStreamByIndex2 = _interopRequireDefault(_getStreamByIndex);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param file
	 * @private
	 */
	function getStreams(file) {
	    return new Promise(function (resolve, reject) {
	        var binaryData = new _index2.default(file);

	        binaryData.readUint8Array({
	            index: 0,
	            length: 8
	        }).then(function (bytes) {
	            var hexId = binaryData.uintArrayToHex(bytes);
	            var fileBinaryReadData = {
	                endOfChain: 0xFFFFFFFE,
	                freeSect: 0xFFFFFFFF,
	                binaryData: binaryData,
	                dataHelper: binaryData.getDataHelper(bytes.length, bytes),
	                hexId: hexId
	            };

	            if (!hexId || ['D0CF11E0A1B11AE1', '0E11FC0DD0CF11E0'].indexOf(hexId.toUpperCase()) < 0) {
	                return reject();
	            }

	            return (0, _readHeader2.default)({ fileBinaryReadData: fileBinaryReadData }).then(function (fileBinaryReadData) {
	                return (0, _readDifat2.default)({ fileBinaryReadData: fileBinaryReadData }).then(function (fileBinaryReadData) {
	                    return (0, _readFatChains2.default)({
	                        fileBinaryReadData: fileBinaryReadData,
	                        size: 1 << fileBinaryReadData.sectorShift,
	                        length: fileBinaryReadData.difat.length
	                    }).then(function (fileBinaryReadData) {
	                        return (0, _readMiniFatChains2.default)({
	                            fileBinaryReadData: fileBinaryReadData,
	                            from: fileBinaryReadData.fMiniFat,
	                            size: 1 << fileBinaryReadData.sectorShift
	                        }).then(function (fileBinaryReadData) {
	                            return (0, _readDirectoryStructure2.default)({ fileBinaryReadData: fileBinaryReadData }).then(function (fileBinaryReadData) {
	                                var rootStreamIndex = (0, _getStreamIndexByName2.default)({
	                                    name: 'Root Entry',
	                                    fileBinaryReadData: fileBinaryReadData
	                                });

	                                if (rootStreamIndex == null) {
	                                    fileBinaryReadData.difat = null;
	                                    return reject();
	                                }

	                                return (0, _getStreamByIndex2.default)({
	                                    index: rootStreamIndex,
	                                    fileBinaryReadData: fileBinaryReadData,
	                                    isRoot: true
	                                }).then(function (stream) {
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _findPosition = __webpack_require__(6);

	var _findPosition2 = _interopRequireDefault(_findPosition);

	var _getDataHelper = __webpack_require__(7);

	var _getDataHelper2 = _interopRequireDefault(_getDataHelper);

	var _getUint8Array = __webpack_require__(8);

	var _getUint8Array2 = _interopRequireDefault(_getUint8Array);

	var _getUint16Array = __webpack_require__(9);

	var _getUint16Array2 = _interopRequireDefault(_getUint16Array);

	var _getUint32Array = __webpack_require__(10);

	var _getUint32Array2 = _interopRequireDefault(_getUint32Array);

	var _ord = __webpack_require__(11);

	var _ord2 = _interopRequireDefault(_ord);

	var _readUint8Array = __webpack_require__(12);

	var _readUint8Array2 = _interopRequireDefault(_readUint8Array);

	var _reverseUintArray = __webpack_require__(13);

	var _reverseUintArray2 = _interopRequireDefault(_reverseUintArray);

	var _uintArraySplit = __webpack_require__(14);

	var _uintArraySplit2 = _interopRequireDefault(_uintArraySplit);

	var _uintArrayToHex = __webpack_require__(15);

	var _uintArrayToHex2 = _interopRequireDefault(_uintArrayToHex);

	var _excludeUintArray = __webpack_require__(16);

	var _excludeUintArray2 = _interopRequireDefault(_excludeUintArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @param blob
	 */

	var Binary = function Binary() {
	    var blob = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	    _classCallCheck(this, Binary);

	    this.blob = blob;
	    this.size = blob && blob.size || 0;
	    this.ord = _ord2.default;
	    this.uintArrayToHex = _uintArrayToHex2.default;
	    this.findPosition = _findPosition2.default;
	    this.getDataHelper = _getDataHelper2.default;
	    this.getUint8Array = _getUint8Array2.default;
	    this.getUint16Array = _getUint16Array2.default;
	    this.getUint32Array = _getUint32Array2.default;
	    this.readUint8Array = _readUint8Array2.default;
	    this.reverseUintArray = _reverseUintArray2.default;
	    this.uintArraySplit = _uintArraySplit2.default;
	    this.excludeUintArray = _excludeUintArray2.default;
	};

	exports.default = Binary;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = findPosition;
	/**
	 *
	 * @param options
	 * @returns {*}
	 */
	function findPosition() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var _options$offset = options.offset;
	    var offset = _options$offset === undefined ? 0 : _options$offset;
	    var _options$data = options.data;
	    var data = _options$data === undefined ? [] : _options$data;
	    var needle = options.needle;

	    var bytes = undefined;

	    bytes = this.excludeUintArray({
	        data: data,
	        index: offset,
	        length: data.length
	    });

	    return Array.prototype.indexOf.call(bytes, needle);
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = getDataHelper;
	/**
	 *
	 * @param byteLength {number}
	 * @param bytes {array}
	 * @returns {{buffer: ArrayBuffer, array: Uint8Array, view: DataView}}
	 */
	function getDataHelper() {
	    var byteLength = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    var bytes = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	    var buffer = new ArrayBuffer(byteLength);
	    var array = new Uint8Array(buffer);
	    array.set(Array.prototype.slice.call(bytes, 0, byteLength), 0);

	    return {
	        buffer: buffer,
	        array: array,
	        view: new DataView(buffer)
	    };
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUint8Array;
	/**
	 *
	 * @param size
	 * @returns {Uint8Array}
	 */
	function getUint8Array(size) {
	  return new Uint8Array(new ArrayBuffer(size));
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (size) {
	  return new Uint16Array(new ArrayBuffer(size));
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (size) {
	  return new Uint32Array(new ArrayBuffer(size));
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = ord;
	/**
	 *
	 * @param str
	 * @returns {*}
	 */
	function ord(str) {
	    str = String(str);

	    var code = str.charCodeAt(0);

	    if (55296 <= code && code <= 56319) {
	        if (str.length === 1) {
	            return code;
	        }

	        return (code - 55296) * 1024 + (str.charCodeAt(1) - 56320) + 65536;
	    }

	    return code;
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = readUint8Array;
	/**
	 *
	 * @param options
	 */
	function readUint8Array() {
	    var _this = this;

	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    return new Promise(function (resolve, reject) {
	        var reader = new FileReader();
	        var _options$index = options.index;
	        var index = _options$index === undefined ? 0 : _options$index;
	        var _options$length = options.length;
	        var length = _options$length === undefined ? 0 : _options$length;

	        reader.onload = function (e) {
	            resolve(new Uint8Array(e.target.result));
	        };

	        reader.onerror = reject;
	        reader.readAsArrayBuffer(_this.blob.slice(index, index + length));
	    });
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = reverseUintArray;
	/**
	 *
	 * @param array
	 * @returns {*}
	 */
	function reverseUintArray() {
	    var array = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	    var dataArray = undefined;
	    var len = array.length;

	    if (array instanceof Uint16Array) {
	        dataArray = this.getUint16Array(len);
	    } else if (array instanceof Uint32Array) {
	        dataArray = this.getUint32Array(len);
	    } else {
	        dataArray = this.getUint8Array(len);
	    }

	    //create copy of array and reverse it
	    dataArray.set(Array.prototype.slice.call(array, 0).reverse(), 0);

	    return dataArray;
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = uintArraySplit;
	/**
	 *
	 * @param options
	 * @returns {Array}
	 */
	function uintArraySplit() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var arr = [];
	    var j = 0;
	    var _options$data = options.data;
	    var data = _options$data === undefined ? [] : _options$data;
	    var _options$length = options.length;
	    var length = _options$length === undefined ? 0 : _options$length;

	    var len = data.length;
	    var i = length && Math.ceil(len / length);

	    while (i--) {
	        arr[i] = this.excludeUintArray({
	            data: data,
	            index: j,
	            length: (length > len - length * i ? len - length * i : length) - j
	        });
	        j += length;
	    }

	    return arr;
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = uintArrayToHex;
	/**
	 *
	 * @param array
	 * @returns {string}
	 */
	function uintArrayToHex() {
	    var array = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var result = '';
	    var len = array.length;

	    for (var i = 0; i < len; i++) {
	        var str = array[i].toString(16);
	        result += str.length < 2 ? '0' + str : str;
	    }

	    return result;
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = excludeUintArray;
	/**
	 *
	 * @param options
	 * @returns {*}
	 */
	function excludeUintArray() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var dataArray = undefined;
	    var arr = [];
	    var _options$length = options.length;
	    var length = _options$length === undefined ? 0 : _options$length;
	    var _options$index = options.index;
	    var index = _options$index === undefined ? 0 : _options$index;
	    var _options$data = options.data;
	    var data = _options$data === undefined ? [] : _options$data;

	    if (data instanceof Uint16Array) {
	        dataArray = this.getUint16Array(length * 2);
	    } else if (data instanceof Uint32Array) {
	        dataArray = this.getUint32Array(length * 4);
	    } else {
	        dataArray = this.getUint8Array(length);
	    }

	    length += index;
	    for (var i = index; i < length; i++) {
	        arr.push(data[i]);
	    }

	    dataArray.set(arr, 0);
	    return dataArray;
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getShort = __webpack_require__(18);

	var _getShort2 = _interopRequireDefault(_getShort);

	var _getLong = __webpack_require__(20);

	var _getLong2 = _interopRequireDefault(_getLong);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param params
	 * @private
	 */

	exports.default = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var fileBinaryReadData = params.fileBinaryReadData;

	    fileBinaryReadData.isLittleEndian = false;
	    return fileBinaryReadData.binaryData.readUint8Array({
	        index: 0x1C,
	        length: 2
	    }).then(function (bytes) {
	        var queue = [];
	        fileBinaryReadData.isLittleEndian = fileBinaryReadData.binaryData.uintArrayToHex(bytes) === 'FEFF';

	        queue.push((0, _getShort2.default)({
	            fileBinaryReadData: fileBinaryReadData,
	            from: 0x1A
	        }).then(function (version) {
	            fileBinaryReadData.version = version;

	            if (version === 4) {
	                return (0, _getLong2.default)({
	                    fileBinaryReadData: fileBinaryReadData,
	                    from: 0x28
	                }).then(function (cDir) {
	                    return fileBinaryReadData.cDir = cDir;
	                });
	            }
	        }));

	        queue.push((0, _getShort2.default)({
	            fileBinaryReadData: fileBinaryReadData,
	            from: 0x1E
	        }).then(function (sectorShift) {
	            return fileBinaryReadData.sectorShift = sectorShift;
	        }));

	        queue.push((0, _getShort2.default)({
	            fileBinaryReadData: fileBinaryReadData,
	            from: 0x20
	        }).then(function (miniSectorShift) {
	            return fileBinaryReadData.miniSectorShift = miniSectorShift;
	        }));

	        queue.push((0, _getLong2.default)({
	            fileBinaryReadData: fileBinaryReadData,
	            from: 0x38
	        }).then(function (miniSectorCutoff) {
	            return fileBinaryReadData.miniSectorCutoff = miniSectorCutoff;
	        }));

	        queue.push((0, _getLong2.default)({
	            fileBinaryReadData: fileBinaryReadData,
	            from: 0x30
	        }).then(function (fDir) {
	            return fileBinaryReadData.fDir = fDir;
	        }));

	        queue.push((0, _getLong2.default)({
	            fileBinaryReadData: fileBinaryReadData,
	            from: 0x2C
	        }).then(function (fatCount) {
	            return fileBinaryReadData.fatCount = fatCount;
	        }));

	        queue.push((0, _getLong2.default)({
	            fileBinaryReadData: fileBinaryReadData,
	            from: 0x40
	        }).then(function (minifatCount) {
	            return fileBinaryReadData.minifatCount = minifatCount;
	        }));

	        queue.push((0, _getLong2.default)({
	            fileBinaryReadData: fileBinaryReadData,
	            from: 0x3C
	        }).then(function (fMiniFat) {
	            return fileBinaryReadData.fMiniFat = fMiniFat;
	        }));

	        queue.push((0, _getLong2.default)({
	            fileBinaryReadData: fileBinaryReadData,
	            from: 0x48
	        }).then(function (cDifat) {
	            return fileBinaryReadData.cDifat = cDifat;
	        }));

	        queue.push((0, _getLong2.default)({
	            fileBinaryReadData: fileBinaryReadData,
	            from: 0x44
	        }).then(function (fDifat) {
	            return fileBinaryReadData.fDifat = fDifat;
	        }));

	        return Promise.all(queue).then(function () {
	            return fileBinaryReadData;
	        });
	    });
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getBytes = __webpack_require__(19);

	var _getBytes2 = _interopRequireDefault(_getBytes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param params
	 * @private
	 */

	exports.default = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    return (0, _getBytes2.default)({
	        data: params.data,
	        from: params.from,
	        count: 2,
	        fileBinaryReadData: params.fileBinaryReadData
	    });
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 *
	 * @param params
	 * @private
	 */

	exports.default = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    return new Promise(function (resolve, reject) {
	        var data = params.data;
	        var fileBinaryReadData = params.fileBinaryReadData;
	        var from = params.from;
	        var count = params.count;

	        if (!fileBinaryReadData && !data) {
	            return reject();
	        }

	        var promise = undefined;
	        var binary = fileBinaryReadData && fileBinaryReadData.binaryData;
	        if (data) {
	            promise = new Promise(function (resolve) {
	                resolve(binary.excludeUintArray({
	                    index: from,
	                    length: count,
	                    data: data
	                }));
	            });
	        } else {
	            promise = binary.readUint8Array({
	                index: from,
	                length: count
	            });
	        }

	        promise.then(function (bytes) {
	            var bytesArray = bytes;
	            if (fileBinaryReadData.isLittleEndian) {
	                bytesArray = binary.reverseUintArray(bytes);
	            }

	            resolve(Number("0x" + binary.uintArrayToHex(bytesArray), 16));
	        }, reject);
	    });
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getBytes = __webpack_require__(19);

	var _getBytes2 = _interopRequireDefault(_getBytes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param params
	 * @private
	 */

	exports.default = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    return (0, _getBytes2.default)({
	        data: params.data,
	        from: params.from,
	        count: 4,
	        fileBinaryReadData: params.fileBinaryReadData
	    });
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getLong = __webpack_require__(20);

	var _getLong2 = _interopRequireDefault(_getLong);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param params
	 * @private
	 */

	exports.default = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    return new Promise(function (resolve, reject) {
	        var i = 109;
	        var queue = [];
	        var fileBinaryReadData = params.fileBinaryReadData;

	        fileBinaryReadData.difat = [];
	        fileBinaryReadData.difat.length = queue.length = i;

	        while (i--) {
	            queue[i] = (0, _getLong2.default)({
	                fileBinaryReadData: fileBinaryReadData,

	                //0x4C = 76
	                from: 76 + i * 4
	            }).then(function (result) {
	                fileBinaryReadData.difat[i] = result;
	            });
	        }

	        Promise.all(queue).then(function () {
	            new Promise(function (res) {
	                if (fileBinaryReadData.fDifat !== fileBinaryReadData.endOfChain) {
	                    recursiveReadLastSectors({
	                        fileBinaryReadData: fileBinaryReadData,
	                        size: 1 << fileBinaryReadData.sectorShift,
	                        resolve: res,
	                        reject: reject
	                    });
	                } else {
	                    res();
	                }
	            }).then(function () {
	                // delete unused links
	                var difat = fileBinaryReadData.difat;
	                var len = difat.length;

	                while (len && difat[len - 1] === fileBinaryReadData.freeSect) {
	                    len--;
	                    difat.length = len;
	                }

	                resolve(fileBinaryReadData);
	            }, reject);
	        }, reject);
	    });
	};

	function recursiveReadLastSectors() {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var resolve = params.resolve;
	    var reject = params.reject;
	    var _params$index = params.index;
	    var index = _params$index === undefined ? 0 : _params$index;
	    var fileBinaryReadData = params.fileBinaryReadData;
	    var _params$size = params.size;
	    var size = _params$size === undefined ? 0 : _params$size;
	    var from = params.from;

	    var queue = [];
	    var len = size - 4;

	    if (from == null) {
	        from = fileBinaryReadData.fDifat;
	    }

	    var start = from + 1 << fileBinaryReadData.sectorShift;
	    var i = 0;

	    for (; i < len; i += 4) {
	        queue.push((0, _getLong2.default)({
	            fileBinaryReadData: fileBinaryReadData,
	            from: start + i
	        }).then(function (result) {
	            fileBinaryReadData.difat.push(result);
	        }));
	    }

	    queue.push((0, _getLong2.default)({
	        fileBinaryReadData: fileBinaryReadData,
	        from: start + i
	    }).then(function (result) {
	        from = result;
	    }));

	    Promise.all(queue).then(function () {
	        if (from !== fileBinaryReadData.endOfChain && index < fileBinaryReadData.cDifat) {
	            recursiveReadLastSectors({
	                resolve: resolve,
	                reject: reject,
	                fileBinaryReadData: fileBinaryReadData,
	                index: index + 1,
	                size: size,
	                from: from
	            });
	        } else {
	            resolve(fileBinaryReadData);
	        }
	    }, reject);
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getLong = __webpack_require__(20);

	var _getLong2 = _interopRequireDefault(_getLong);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @private
	 */

	exports.default = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    return new Promise(function (resolve, reject) {
	        var _params$index = params.index;
	        var index = _params$index === undefined ? 0 : _params$index;
	        var _params$length = params.length;
	        var length = _params$length === undefined ? 0 : _params$length;
	        var _params$size = params.size;
	        var size = _params$size === undefined ? 0 : _params$size;
	        var _params$fileBinaryRea = params.fileBinaryReadData;
	        var fileBinaryReadData = _params$fileBinaryRea === undefined ? {} : _params$fileBinaryRea;

	        var sectorShift = fileBinaryReadData.sectorShift;
	        var queue = [];

	        fileBinaryReadData.fatChains = [];
	        for (; index < length; index++) {
	            for (var j = 0; j < size; j += 4) {
	                queue.push((0, _getLong2.default)({
	                    fileBinaryReadData: fileBinaryReadData,
	                    from: (fileBinaryReadData.difat[index] + 1 << sectorShift) + index
	                }).then(function (result) {
	                    fileBinaryReadData.fatChains.push(result);
	                }));
	            }
	        }

	        Promise.all(queue).then(function () {
	            resolve(fileBinaryReadData);
	        }, reject);
	    });
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getLong = __webpack_require__(20);

	var _getLong2 = _interopRequireDefault(_getLong);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param params
	 * @private
	 */

	exports.default = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    return new Promise(function (resolve, reject) {
	        var queue = [];
	        var _params$from = params.from;
	        var from = _params$from === undefined ? 0 : _params$from;
	        var _params$size = params.size;
	        var size = _params$size === undefined ? 0 : _params$size;
	        var _params$fileBinaryRea = params.fileBinaryReadData;
	        var fileBinaryReadData = _params$fileBinaryRea === undefined ? {} : _params$fileBinaryRea;
	        var _fileBinaryReadData$s = fileBinaryReadData.sectorShift;
	        var sectorShift = _fileBinaryReadData$s === undefined ? 0 : _fileBinaryReadData$s;
	        var _fileBinaryReadData$e = fileBinaryReadData.endOfChain;
	        var endOfChain = _fileBinaryReadData$e === undefined ? 0 : _fileBinaryReadData$e;

	        fileBinaryReadData.miniFatChains = [];

	        while (from !== endOfChain) {
	            for (var i = 0; i < size; i += 4) {
	                queue.push((0, _getLong2.default)({
	                    fileBinaryReadData: fileBinaryReadData,
	                    from: (from + 1 << sectorShift) + i
	                }).then(function (result) {
	                    fileBinaryReadData.miniFatChains.push(result);
	                }));
	            }

	            from = fileBinaryReadData.fatChains && fileBinaryReadData.fatChains[from] || endOfChain;
	        }

	        Promise.all(queue).then(function () {
	            resolve(fileBinaryReadData);
	        }, reject);
	    });
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getShort = __webpack_require__(18);

	var _getShort2 = _interopRequireDefault(_getShort);

	var _getLong = __webpack_require__(20);

	var _getLong2 = _interopRequireDefault(_getLong);

	var _getBytes = __webpack_require__(19);

	var _getBytes2 = _interopRequireDefault(_getBytes);

	var _utf16ToAnsi = __webpack_require__(25);

	var _utf16ToAnsi2 = _interopRequireDefault(_utf16ToAnsi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param params
	 * @private
	 */

	exports.default = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    return new Promise(function (resolve, reject) {
	        var _params$fileBinaryRea = params.fileBinaryReadData;
	        var fileBinaryReadData = _params$fileBinaryRea === undefined ? {} : _params$fileBinaryRea;

	        var from = fileBinaryReadData.fDir;
	        var size = 1 << fileBinaryReadData.sectorShift;
	        fileBinaryReadData.fatEntries = [];

	        recursiveRead(from, size, fileBinaryReadData, function (fileBinaryReadData) {
	            var fatEntries = fileBinaryReadData.fatEntries;
	            var len = fatEntries.length;

	            while (len && fatEntries[len - 1].type === 0) {
	                len--;
	                fatEntries.length = len;
	            }

	            resolve(fileBinaryReadData);
	        }, reject);
	    });
	};

	function recursiveRead(from, size, fileBinaryReadData, resolve, reject) {
	    var queue = [];
	    var _fileBinaryReadData$s = fileBinaryReadData.sectorShift;
	    var sectorShift = _fileBinaryReadData$s === undefined ? 0 : _fileBinaryReadData$s;
	    var _fileBinaryReadData$e = fileBinaryReadData.endOfChain;
	    var endOfChain = _fileBinaryReadData$e === undefined ? 0 : _fileBinaryReadData$e;
	    var _fileBinaryReadData$b = fileBinaryReadData.binaryData;
	    var binaryData = _fileBinaryReadData$b === undefined ? {} : _fileBinaryReadData$b;
	    var fatChains = fileBinaryReadData.fatChains;
	    var fatEntries = fileBinaryReadData.fatEntries;

	    for (var i = 0; i < size; i += 128) {
	        queue.push(binaryData.readUint8Array({
	            index: (from + 1 << sectorShift) + i,
	            length: 128
	        }).then(function (entry) {
	            var queue = [];
	            var data = {
	                type: entry[0x42],
	                color: entry[0x43]
	            };

	            queue.push((0, _getShort2.default)({
	                from: 0x40,
	                data: entry,
	                fileBinaryReadData: fileBinaryReadData
	            }).then(function (res) {
	                data.name = (0, _utf16ToAnsi2.default)({
	                    data: binaryData.excludeUintArray({
	                        data: entry,
	                        index: 0,
	                        length: res
	                    }),
	                    fileBinaryReadData: fileBinaryReadData
	                });
	            }));

	            queue.push((0, _getLong2.default)({
	                from: 0x44,
	                data: entry,
	                fileBinaryReadData: fileBinaryReadData
	            }).then(function (res) {
	                data.left = res;
	            }));

	            queue.push((0, _getLong2.default)({
	                from: 0x48,
	                data: entry,
	                fileBinaryReadData: fileBinaryReadData
	            }).then(function (res) {
	                data.right = res;
	            }));

	            queue.push((0, _getLong2.default)({
	                from: 0x4C,
	                data: entry,
	                fileBinaryReadData: fileBinaryReadData
	            }).then(function (res) {
	                data.child = res;
	            }));

	            queue.push((0, _getLong2.default)({
	                from: 0x74,
	                data: entry,
	                fileBinaryReadData: fileBinaryReadData
	            }).then(function (res) {
	                data.start = res;
	            }));

	            queue.push((0, _getBytes2.default)({
	                from: 0x78,
	                data: entry,
	                count: 8,
	                fileBinaryReadData: fileBinaryReadData
	            }).then(function (res) {
	                data.size = res;
	            }));

	            Promise.all(queue).then(function () {
	                fatEntries.push(data);
	            }, reject);
	        }, reject));
	    }

	    Promise.all(queue).then(function () {
	        from = fatChains && fatChains[from] || endOfChain;

	        if (from !== endOfChain) {
	            recursiveRead(from, size, fileBinaryReadData, resolve, reject);
	        } else {
	            resolve(fileBinaryReadData);
	        }
	    }, reject);
	}

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var result = '';
	    var _params$data = params.data;
	    var data = _params$data === undefined ? [] : _params$data;
	    var _params$length = params.length;
	    var length = _params$length === undefined ? 0 : _params$length;

	    while (length--) {
	        if (data[length] !== 0) {
	            result = String.fromCharCode(data[length]) + result;
	        }
	    }

	    return result;
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var _params$from = params.from;
	    var from = _params$from === undefined ? 0 : _params$from;
	    var name = params.name;
	    var _params$fileBinaryRea = params.fileBinaryReadData;
	    var fileBinaryReadData = _params$fileBinaryRea === undefined ? {} : _params$fileBinaryRea;

	    var fatEntries = fileBinaryReadData.fatEntries || [];

	    for (var i = fatEntries.length - 1; i >= from; i--) {
	        if (fatEntries[i].name === name) {
	            return i;
	        }
	    }

	    return null;
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 *
	 * @param params
	 * @private
	 */

	exports.default = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    return new Promise(function (resolve, reject) {
	        var _params$fileBinaryRea = params.fileBinaryReadData;
	        var fileBinaryReadData = _params$fileBinaryRea === undefined ? {} : _params$fileBinaryRea;
	        var _params$index = params.index;
	        var index = _params$index === undefined ? 0 : _params$index;
	        var isRoot = params.isRoot;

	        var entry = fileBinaryReadData.fatEntries && fileBinaryReadData.fatEntries[index] || {};
	        var endOfChain = fileBinaryReadData.endOfChain;
	        var miniSectorShift = fileBinaryReadData.miniSectorShift;

	        var size = entry.size || 0;
	        var stream = [];
	        var from = entry.start || 0;

	        /**
	         * If the size is smaller then 4096b we should read the data from miniFat, otherwise - from general Fat.
	         * "RootEntry" is exception, we should read it's content from Fat.
	         */
	        if (size < fileBinaryReadData.miniSectorCutoff && !isRoot) {
	            var sectorSize = 1 << miniSectorShift;

	            while (from !== endOfChain) {
	                var start = from << miniSectorShift;
	                var len = start + sectorSize;

	                // read miniFat-sector
	                for (var i = start; i < len; i++) {
	                    stream.push(fileBinaryReadData.miniFat[i]);
	                }

	                // Находим следующий кусок miniFat'а в массиве последовательностей
	                from = fileBinaryReadData.miniFatChains && fileBinaryReadData.miniFatChains[from] || endOfChain;
	            }

	            resolve(prepareStream({
	                size: size,
	                stream: stream,
	                fileBinaryReadData: fileBinaryReadData
	            }));
	        } else {
	            getStreamFromBigFile(stream, from, size, fileBinaryReadData, resolve, reject);
	        }
	    });
	};

	function prepareStream(params) {
	    var typedArray = params.fileBinaryReadData.binaryData.getUint8Array(params.size);

	    typedArray.set(params.stream.slice(0, params.size), 0);

	    return typedArray;
	}

	function getStreamFromBigFile(stream, from, size, fileBinaryReadData, resolve, reject) {
	    var sectorShift = fileBinaryReadData.sectorShift;
	    var endOfChain = fileBinaryReadData.endOfChain;
	    var sectorSize = 1 << fileBinaryReadData;

	    if (from != endOfChain) {
	        var start = from + 1 << sectorShift;

	        fileBinaryReadData.binaryData.readUint8Array({
	            index: start,
	            length: sectorSize
	        }).then(function (bytes) {
	            var len = bytes.length;
	            for (var i = 0; i < len; i++) {
	                stream.push(bytes[i]);
	            }

	            from = fileBinaryReadData.fatChains && fileBinaryReadData.fatChains[from] || endOfChain;
	            getStreamFromBigFile(stream, from, size, fileBinaryReadData, resolve, reject);
	        }, reject);
	    } else {
	        resolve(prepareStream({
	            size: size,
	            stream: stream,
	            fileBinaryReadData: fileBinaryReadData
	        }));
	    }
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getStreamIndexByName = __webpack_require__(26);

	var _getStreamIndexByName2 = _interopRequireDefault(_getStreamIndexByName);

	var _getStreamByIndex = __webpack_require__(27);

	var _getStreamByIndex2 = _interopRequireDefault(_getStreamByIndex);

	var _getShort = __webpack_require__(18);

	var _getShort2 = _interopRequireDefault(_getShort);

	var _getLong = __webpack_require__(20);

	var _getLong2 = _interopRequireDefault(_getLong);

	var _findClxOffset = __webpack_require__(29);

	var _findClxOffset2 = _interopRequireDefault(_findClxOffset);

	var _fillingCp = __webpack_require__(30);

	var _fillingCp2 = _interopRequireDefault(_fillingCp);

	var _readText = __webpack_require__(31);

	var _readText2 = _interopRequireDefault(_readText);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param fileBinaryReadData
	 * @private
	 */

	exports.default = function (fileBinaryReadData) {
	    return new Promise(function (resolve, reject) {
	        var wordDocumentStreamIndex = (0, _getStreamIndexByName2.default)({
	            name: 'WordDocument',
	            fileBinaryReadData: fileBinaryReadData
	        });

	        if (wordDocumentStreamIndex == null) {
	            return reject();
	        }

	        (0, _getStreamByIndex2.default)({
	            index: wordDocumentStreamIndex,
	            fileBinaryReadData: fileBinaryReadData
	        }).then(function (wordDocumentStream) {
	            fileBinaryReadData.wordDocumentStream = wordDocumentStream;

	            return (0, _getShort2.default)({
	                from: 0x000A,
	                data: wordDocumentStream,
	                fileBinaryReadData: fileBinaryReadData
	            }).then(function (bytes) {
	                var queue = [];

	                // Number of table: 0 or 1
	                var tmp = 0x0200;
	                fileBinaryReadData.streamTableNumber = Number((bytes & tmp) === tmp);

	                // Find position of CLX in table stream and CLX's size.
	                queue.push((0, _getLong2.default)({
	                    from: 0x01A2,
	                    data: wordDocumentStream,
	                    fileBinaryReadData: fileBinaryReadData
	                }).then(function (res) {
	                    return fileBinaryReadData.clxPosition = res;
	                }));

	                queue.push((0, _getLong2.default)({
	                    from: 0x01A6,
	                    data: wordDocumentStream,
	                    fileBinaryReadData: fileBinaryReadData
	                }).then(function (res) {
	                    return fileBinaryReadData.clxSize = res;
	                }));

	                // read several values to separate the positions from size in CLX
	                queue.push((0, _getLong2.default)({
	                    from: 0x004C,
	                    data: wordDocumentStream,
	                    fileBinaryReadData: fileBinaryReadData
	                }).then(function (res) {
	                    return fileBinaryReadData.ccpText = res;
	                }));

	                queue.push((0, _getLong2.default)({
	                    from: 0x0050,
	                    data: wordDocumentStream,
	                    fileBinaryReadData: fileBinaryReadData
	                }).then(function (res) {
	                    return fileBinaryReadData.ccpFtn = res;
	                }));

	                queue.push((0, _getLong2.default)({
	                    from: 0x0054,
	                    data: wordDocumentStream,
	                    fileBinaryReadData: fileBinaryReadData
	                }).then(function (res) {
	                    return fileBinaryReadData.ccpHdd = res;
	                }));

	                queue.push((0, _getLong2.default)({
	                    from: 0x0058,
	                    data: wordDocumentStream,
	                    fileBinaryReadData: fileBinaryReadData
	                }).then(function (res) {
	                    return fileBinaryReadData.ccpMcr = res;
	                }));

	                queue.push((0, _getLong2.default)({
	                    from: 0x005C,
	                    data: wordDocumentStream,
	                    fileBinaryReadData: fileBinaryReadData
	                }).then(function (res) {
	                    return fileBinaryReadData.ccpAtn = res;
	                }));

	                queue.push((0, _getLong2.default)({
	                    from: 0x0060,
	                    data: wordDocumentStream,
	                    fileBinaryReadData: fileBinaryReadData
	                }).then(function (res) {
	                    return fileBinaryReadData.ccpEdn = res;
	                }));

	                queue.push((0, _getLong2.default)({
	                    from: 0x0064,
	                    data: wordDocumentStream,
	                    fileBinaryReadData: fileBinaryReadData
	                }).then(function (res) {
	                    return fileBinaryReadData.ccpTxbx = res;
	                }));

	                queue.push((0, _getLong2.default)({
	                    from: 0x0068,
	                    data: wordDocumentStream,
	                    fileBinaryReadData: fileBinaryReadData
	                }).then(function (res) {
	                    return fileBinaryReadData.ccpHdrTxbx = res;
	                }));

	                return Promise.all(queue).then(function () {
	                    // find the last CP - character position
	                    fileBinaryReadData.lastCp = fileBinaryReadData.ccpFtn + fileBinaryReadData.ccpHdd + fileBinaryReadData.ccpMcr + fileBinaryReadData.ccpAtn + fileBinaryReadData.ccpEdn + fileBinaryReadData.ccpTxbx + fileBinaryReadData.ccpHdrTxbx + Number(fileBinaryReadData.ccpText);

	                    fileBinaryReadData.lastCp += Number(fileBinaryReadData.lastCp !== 0);

	                    // find the table
	                    fileBinaryReadData.tStreamIndex = (0, _getStreamIndexByName2.default)({
	                        fileBinaryReadData: fileBinaryReadData,
	                        name: fileBinaryReadData.streamTableNumber + 'Table'
	                    });

	                    if (fileBinaryReadData.tStreamIndex == null) {
	                        return reject();
	                    }

	                    return (0, _getStreamByIndex2.default)({
	                        index: fileBinaryReadData.tStreamIndex,
	                        fileBinaryReadData: fileBinaryReadData
	                    }).then(function (stream) {
	                        var clx = fileBinaryReadData.binaryData.excludeUintArray({
	                            index: fileBinaryReadData.clxPosition,
	                            length: fileBinaryReadData.clxSize,
	                            data: stream
	                        });

	                        fileBinaryReadData.lcbPieceTable = 0;
	                        fileBinaryReadData.pieceTable = [];
	                        return (0, _findClxOffset2.default)({
	                            from: 0,
	                            clx: clx,
	                            fileBinaryReadData: fileBinaryReadData
	                        }).then(function (fileBinaryReadData) {
	                            // didn't find the text
	                            if (!fileBinaryReadData.pieceTable.length) {
	                                return reject();
	                            }

	                            var index = 0;
	                            return (0, _fillingCp2.default)({
	                                index: index,
	                                fileBinaryReadData: fileBinaryReadData
	                            }).then(function (fileBinaryReadData) {
	                                fileBinaryReadData.pcd = fileBinaryReadData.binaryData.excludeUintArray({
	                                    data: fileBinaryReadData.pieceTable,
	                                    index: index + 4,
	                                    length: fileBinaryReadData.pieceTable.length - (index + 4)
	                                });

	                                fileBinaryReadData.pcd = fileBinaryReadData.binaryData.uintArraySplit({
	                                    data: fileBinaryReadData.pcd,
	                                    length: 8
	                                });

	                                return (0, _readText2.default)({
	                                    fileBinaryReadData: fileBinaryReadData,
	                                    length: fileBinaryReadData.pcd.length
	                                }).then(function (fileBinaryReadData) {
	                                    // remove from file included objects
	                                    fileBinaryReadData.text = fileBinaryReadData.text.replace(/HYPER13 *(INCLUDEPICTURE|HTMLCONTROL)(.*)HYPER15/im, '').replace(/HYPER13(.*)HYPER14(.*)HYPER15/im, '$2');

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

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getLong = __webpack_require__(20);

	var _getLong2 = _interopRequireDefault(_getLong);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    return new Promise(function (resolve, reject) {
	        var fileBinaryReadData = params.fileBinaryReadData;
	        var _params$clx = params.clx;
	        var clx = _params$clx === undefined ? [] : _params$clx;
	        var _params$from = params.from;
	        var from = _params$from === undefined ? 0 : _params$from;

	        recursiveRead(from, clx, fileBinaryReadData, resolve, reject);
	    });
	};

	function recursiveRead(from, clx, fileBinaryReadData, resolve, reject) {
	    var index = fileBinaryReadData && fileBinaryReadData.binaryData.findPosition({
	        data: clx,
	        needle: 0x02,
	        offset: from
	    });

	    if (index >= 0) {
	        (0, _getLong2.default)({
	            from: index,
	            data: clx,
	            fileBinaryReadData: fileBinaryReadData
	        }).then(function (res) {
	            fileBinaryReadData.lcbPieceTable = res;
	            fileBinaryReadData.pieceTable = fileBinaryReadData.binaryData.excludeUintArray({
	                data: clx,
	                index: index + 5,
	                length: clx.length - (index + 5)
	            });

	            // if the size isn't equal that found size - let's find again
	            if (fileBinaryReadData.pieceTable.length !== fileBinaryReadData.lcbPieceTable) {
	                from = index + 1;
	                recursiveRead(from, clx, fileBinaryReadData, resolve, reject);
	            } else {
	                resolve(fileBinaryReadData);
	            }
	        }, reject);
	    } else {
	        resolve(fileBinaryReadData);
	    }
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getLong = __webpack_require__(20);

	var _getLong2 = _interopRequireDefault(_getLong);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param params
	 * @private
	 */

	exports.default = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    return new Promise(function (resolve, reject) {
	        var _params$index = params.index;
	        var index = _params$index === undefined ? 0 : _params$index;
	        var _params$fileBinaryRea = params.fileBinaryReadData;
	        var fileBinaryReadData = _params$fileBinaryRea === undefined ? {} : _params$fileBinaryRea;

	        fileBinaryReadData.cp = fileBinaryReadData.cp || [];
	        recursiveRead(index, fileBinaryReadData, resolve, reject);
	    });
	};

	function recursiveRead(index, fileBinaryReadData, resolve, reject) {
	    (0, _getLong2.default)({
	        data: fileBinaryReadData.pieceTable,
	        fileBinaryReadData: fileBinaryReadData,
	        from: index
	    }).then(function (res) {
	        fileBinaryReadData.cp.push(res);
	        if (res !== fileBinaryReadData.lastCp) {
	            index += 4;
	            recursiveRead(index, fileBinaryReadData, resolve, reject);
	        } else {
	            resolve(fileBinaryReadData);
	        }
	    }, reject);
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getLong = __webpack_require__(20);

	var _getLong2 = _interopRequireDefault(_getLong);

	var _unicodeToUtf = __webpack_require__(32);

	var _unicodeToUtf2 = _interopRequireDefault(_unicodeToUtf);

	var _utf16ToAnsi = __webpack_require__(25);

	var _utf16ToAnsi2 = _interopRequireDefault(_utf16ToAnsi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param params
	 * @private
	 */

	exports.default = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    return new Promise(function (resolve, reject) {
	        var _params$index = params.index;
	        var index = _params$index === undefined ? 0 : _params$index;
	        var _params$fileBinaryRea = params.fileBinaryReadData;
	        var fileBinaryReadData = _params$fileBinaryRea === undefined ? {} : _params$fileBinaryRea;
	        var _params$length = params.length;
	        var length = _params$length === undefined ? 0 : _params$length;

	        fileBinaryReadData.text = fileBinaryReadData.text || '';

	        readRecursive(index, fileBinaryReadData, length, resolve, reject);
	    });
	};

	function readRecursive(index, fileBinaryReadData, length, resolve, reject) {
	    if (index < length) {
	        (0, _getLong2.default)({
	            from: 2,
	            data: fileBinaryReadData.pcd[index],
	            fileBinaryReadData: fileBinaryReadData
	        }).then(function (res) {
	            var part = undefined;
	            var isAnsi = (res & 0x40000000) === 0x40000000;
	            var fc = res & 0x3FFFFFFF;
	            var lcb = fileBinaryReadData.cp[index + 1] - fileBinaryReadData.cp[index];

	            // If it's Unicode then we need more files in 2 times
	            if (!isAnsi) {
	                lcb *= 2;
	            } else {
	                // if it's ANSI that we need less files
	                fc /= 2;
	            }

	            // read the part from WordDocument stream
	            part = fileBinaryReadData.binaryData.excludeUintArray({
	                data: fileBinaryReadData.wordDocumentStream,
	                index: fc,
	                length: lcb
	            });

	            // if it's Unicode then convert to normal state
	            if (!isAnsi) {
	                (0, _unicodeToUtf2.default)({
	                    data: part,
	                    fileBinaryReadData: fileBinaryReadData
	                }).then(function (text) {
	                    fileBinaryReadData.text += text;
	                    index++;
	                    readRecursive(index, fileBinaryReadData, length, resolve, reject);
	                });
	            } else {
	                fileBinaryReadData.text += (0, _utf16ToAnsi2.default)({
	                    data: part
	                });

	                index++;
	                readRecursive(index, fileBinaryReadData, length, resolve, reject);
	            }
	        }, reject);
	    } else {
	        resolve(fileBinaryReadData);
	    }
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getShort = __webpack_require__(18);

	var _getShort2 = _interopRequireDefault(_getShort);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param params
	 * @private
	 */

	exports.default = function (params) {
	    return new Promise(function (resolve, reject) {
	        var _params$result = params.result;
	        var result = _params$result === undefined ? '' : _params$result;
	        var _params$index = params.index;
	        var index = _params$index === undefined ? 0 : _params$index;
	        var _params$data = params.data;
	        var data = _params$data === undefined ? [] : _params$data;
	        var fileBinaryReadData = params.fileBinaryReadData;
	        var length = params.length;

	        if (length == null) {
	            length = data.length;
	        }

	        recursiveRead(data, index, length, fileBinaryReadData, result, resolve, reject);
	    });
	};

	function recursiveRead(data, index, length, fileBinaryReadData, result, resolve, reject) {
	    var cd = undefined;

	    if (index < length) {
	        cd = fileBinaryReadData.binaryData.excludeUintArray({
	            data: data,
	            index: index,
	            length: 2
	        });

	        var low = cd[0];

	        // if the top byte is zero - we work with ANSI
	        if (cd[1] === 0) {

	            // if ASCII-value of the low byte is greater than 32, use it as is.
	            if (low >= 32) {
	                result += String.fromCharCode(low);
	            } else {
	                // check the special commands
	                if (low === 0x0D || low === 0x07) {
	                    result += '\n';
	                } else if (low === 0x13) {
	                    result += 'HYPER13';
	                } else if (low === 0x14) {
	                    result += 'HYPER14';
	                } else if (low === 0x15) {
	                    result += 'HYPER15';
	                }
	            }

	            index += 2;
	            recursiveRead(data, index, length, fileBinaryReadData, result, resolve, reject);
	        } else {
	            (0, _getShort2.default)({
	                fileBinaryReadData: fileBinaryReadData,
	                data: cd,
	                from: 0
	            }).then(function () {
	                index += 2;
	                recursiveRead(data, index, length, fileBinaryReadData, result, resolve, reject);
	            }, reject);
	        }
	    } else {
	        resolve(result);
	    }
	}

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	if (!String.prototype.includes) {
	    String.prototype.includes = function () {
	        return String.prototype.indexOf.apply(this, arguments) !== -1;
	    };
	}

	exports.default = {};

/***/ }
/******/ ])
});
;
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Live2dHelper"] = factory();
	else
		root["Live2dHelper"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/node-libs-browser/mock/empty.js":
/*!******************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/empty.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/Core/live2dcubismcore.min.js":
/*!******************************************!*\
  !*** ./src/Core/live2dcubismcore.min.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, __dirname, Buffer) {/**
 * Live2D Cubism Core
 * (C) 2019 Live2D Inc. All rights reserved.
 *
 * This file is licensed pursuant to the license agreement below.
 * This file corresponds to the "Redistributable Code" in the agreement.
 * https://www.live2d.com/eula/live2d-proprietary-software-license-agreement_en.html
 */
var Live2DCubismCore;!function(Live2DCubismCore){var _csm=function(){function _csm(){}return _csm.getVersion=function(){return _em.ccall("csmGetVersion","number",[],[])},_csm.getLatestMocVersion=function(){return _em.ccall("csmGetLatestMocVersion","number",[],[])},_csm.getMocVersion=function(moc){return _em.ccall("csmGetMocVersion","number",["number"],[moc])},_csm.getSizeofModel=function(moc){return _em.ccall("csmGetSizeofModel","number",["number"],[moc])},_csm.reviveMocInPlace=function(memory,mocSize){return _em.ccall("csmReviveMocInPlace","number",["number","number"],[memory,mocSize])},_csm.initializeModelInPlace=function(moc,memory,modelSize){return _em.ccall("csmInitializeModelInPlace","number",["number","number","number"],[moc,memory,modelSize])},_csm.getParameterCount=function(model){return _em.ccall("csmGetParameterCount","number",["number"],[model])},_csm.getParameterIds=function(model){return _em.ccall("csmGetParameterIds","number",["number"],[model])},_csm.getParameterMinimumValues=function(model){return _em.ccall("csmGetParameterMinimumValues","number",["number"],[model])},_csm.getParameterMaximumValues=function(model){return _em.ccall("csmGetParameterMaximumValues","number",["number"],[model])},_csm.getParameterDefaultValues=function(model){return _em.ccall("csmGetParameterDefaultValues","number",["number"],[model])},_csm.getParameterValues=function(model){return _em.ccall("csmGetParameterValues","number",["number"],[model])},_csm.getPartCount=function(model){return _em.ccall("csmGetPartCount","number",["number"],[model])},_csm.getPartIds=function(model){return _em.ccall("csmGetPartIds","number",["number"],[model])},_csm.getPartOpacities=function(model){return _em.ccall("csmGetPartOpacities","number",["number"],[model])},_csm.getPartParentPartIndices=function(model){return _em.ccall("csmGetPartParentPartIndices","number",["number"],[model])},_csm.getDrawableCount=function(model){return _em.ccall("csmGetDrawableCount","number",["number"],[model])},_csm.getDrawableIds=function(model){return _em.ccall("csmGetDrawableIds","number",["number"],[model])},_csm.getDrawableConstantFlags=function(model){return _em.ccall("csmGetDrawableConstantFlags","number",["number"],[model])},_csm.getDrawableDynamicFlags=function(model){return _em.ccall("csmGetDrawableDynamicFlags","number",["number"],[model])},_csm.getDrawableTextureIndices=function(model){return _em.ccall("csmGetDrawableTextureIndices","number",["number"],[model])},_csm.getDrawableDrawOrders=function(model){return _em.ccall("csmGetDrawableDrawOrders","number",["number"],[model])},_csm.getDrawableRenderOrders=function(model){return _em.ccall("csmGetDrawableRenderOrders","number",["number"],[model])},_csm.getDrawableOpacities=function(model){return _em.ccall("csmGetDrawableOpacities","number",["number"],[model])},_csm.getDrawableMaskCounts=function(model){return _em.ccall("csmGetDrawableMaskCounts","number",["number"],[model])},_csm.getDrawableMasks=function(model){return _em.ccall("csmGetDrawableMasks","number",["number"],[model])},_csm.getDrawableVertexCounts=function(model){return _em.ccall("csmGetDrawableVertexCounts","number",["number"],[model])},_csm.getDrawableVertexPositions=function(model){return _em.ccall("csmGetDrawableVertexPositions","number",["number"],[model])},_csm.getDrawableVertexUvs=function(model){return _em.ccall("csmGetDrawableVertexUvs","number",["number"],[model])},_csm.getDrawableIndexCounts=function(model){return _em.ccall("csmGetDrawableIndexCounts","number",["number"],[model])},_csm.getDrawableIndices=function(model){return _em.ccall("csmGetDrawableIndices","number",["number"],[model])},_csm.mallocMoc=function(mocSize){return _em.ccall("csmMallocMoc","number",["number"],[mocSize])},_csm.mallocModelAndInitialize=function(moc){return _em.ccall("csmMallocModelAndInitialize","number",["number"],[moc])},_csm.malloc=function(size){return _em.ccall("csmMalloc","number",["number"],[size])},_csm.setLogFunction=function(handler){_em.ccall("csmSetLogFunction",null,["number"],[handler])},_csm.updateModel=function(model){_em.ccall("csmUpdateModel",null,["number"],[model])},_csm.readCanvasInfo=function(model,outSizeInPixels,outOriginInPixels,outPixelsPerUnit){_em.ccall("csmReadCanvasInfo",null,["number","number","number","number"],[model,outSizeInPixels,outOriginInPixels,outPixelsPerUnit])},_csm.resetDrawableDynamicFlags=function(model){_em.ccall("csmResetDrawableDynamicFlags",null,["number"],[model])},_csm.free=function(memory){_em.ccall("csmFree",null,["number"],[memory])},_csm}(),Version=function(){function Version(){}return Version.csmGetVersion=function(){return _csm.getVersion()},Version.csmGetLatestMocVersion=function(){return _csm.getLatestMocVersion()},Version.csmGetMocVersion=function(moc){return _csm.getMocVersion(moc._ptr)},Version}();Live2DCubismCore.Version=Version;var Logging=function(){function Logging(){}return Logging.csmSetLogFunction=function(handler){Logging.logFunction=handler;var pointer=_em.addFunction(Logging.wrapLogFunction,"vi");_csm.setLogFunction(pointer)},Logging.csmGetLogFunction=function(){return Logging.logFunction},Logging.wrapLogFunction=function(messagePtr){var messageStr=_em.UTF8ToString(messagePtr);Logging.logFunction(messageStr)},Logging}();Live2DCubismCore.Logging=Logging;var Moc=function(){function Moc(mocBytes){var memory=_csm.mallocMoc(mocBytes.byteLength);memory&&(new Uint8Array(_em.HEAPU8.buffer,memory,mocBytes.byteLength).set(new Uint8Array(mocBytes)),this._ptr=_csm.reviveMocInPlace(memory,mocBytes.byteLength),this._ptr||_csm.free(memory))}return Moc.fromArrayBuffer=function(buffer){if(!buffer)return null;var moc=new Moc(buffer);return moc._ptr?moc:null},Moc.prototype._release=function(){_csm.free(this._ptr),this._ptr=0},Moc}();Live2DCubismCore.Moc=Moc;var Model=function(){function Model(moc){this._ptr=_csm.mallocModelAndInitialize(moc._ptr),this._ptr&&(this.parameters=new Parameters(this._ptr),this.parts=new Parts(this._ptr),this.drawables=new Drawables(this._ptr),this.canvasinfo=new CanvasInfo(this._ptr))}return Model.fromMoc=function(moc){var model=new Model(moc);return model._ptr?model:null},Model.prototype.update=function(){_csm.updateModel(this._ptr)},Model.prototype.release=function(){_csm.free(this._ptr),this._ptr=0},Model}();Live2DCubismCore.Model=Model;var CanvasInfo=function(modelPtr){if(modelPtr){var _canvasSize_data=new Float32Array(2),_canvasSize_nDataBytes=_canvasSize_data.length*_canvasSize_data.BYTES_PER_ELEMENT,_canvasSize_dataPtr=_csm.malloc(_canvasSize_nDataBytes),_canvasSize_dataHeap=new Uint8Array(_em.HEAPU8.buffer,_canvasSize_dataPtr,_canvasSize_nDataBytes);_canvasSize_dataHeap.set(new Uint8Array(_canvasSize_data.buffer));var _canvasOrigin_data=new Float32Array(2),_canvasOrigin_nDataBytes=_canvasOrigin_data.length*_canvasOrigin_data.BYTES_PER_ELEMENT,_canvasOrigin_dataPtr=_csm.malloc(_canvasOrigin_nDataBytes),_canvasOrigin_dataHeap=new Uint8Array(_em.HEAPU8.buffer,_canvasOrigin_dataPtr,_canvasOrigin_nDataBytes);_canvasOrigin_dataHeap.set(new Uint8Array(_canvasOrigin_data.buffer));var _canvasPPU_data=new Float32Array(1),_canvasPPU_nDataBytes=_canvasPPU_data.length*_canvasPPU_data.BYTES_PER_ELEMENT,_canvasPPU_dataPtr=_csm.malloc(_canvasPPU_nDataBytes),_canvasPPU_dataHeap=new Uint8Array(_em.HEAPU8.buffer,_canvasPPU_dataPtr,_canvasPPU_nDataBytes);_canvasPPU_dataHeap.set(new Uint8Array(_canvasPPU_data.buffer)),_csm.readCanvasInfo(modelPtr,_canvasSize_dataHeap.byteOffset,_canvasOrigin_dataHeap.byteOffset,_canvasPPU_dataHeap.byteOffset),_canvasSize_data=new Float32Array(_canvasSize_dataHeap.buffer,_canvasSize_dataHeap.byteOffset,_canvasSize_dataHeap.length),_canvasOrigin_data=new Float32Array(_canvasOrigin_dataHeap.buffer,_canvasOrigin_dataHeap.byteOffset,_canvasOrigin_dataHeap.length),_canvasPPU_data=new Float32Array(_canvasPPU_dataHeap.buffer,_canvasPPU_dataHeap.byteOffset,_canvasPPU_dataHeap.length),this.CanvasWidth=_canvasSize_data[0],this.CanvasHeight=_canvasSize_data[1],this.CanvasOriginX=_canvasOrigin_data[0],this.CanvasOriginY=_canvasOrigin_data[1],this.PixelsPerUnit=_canvasPPU_data[0],_csm.free(_canvasSize_dataHeap.byteOffset),_csm.free(_canvasOrigin_dataHeap.byteOffset),_csm.free(_canvasPPU_dataHeap.byteOffset)}};Live2DCubismCore.CanvasInfo=CanvasInfo;var Parameters=function(modelPtr){var length=0;this.count=_csm.getParameterCount(modelPtr),length=_csm.getParameterCount(modelPtr),this.ids=new Array(length);for(var _ids=new Uint32Array(_em.HEAPU32.buffer,_csm.getParameterIds(modelPtr),length),i=0;i<_ids.length;i++)this.ids[i]=_em.UTF8ToString(_ids[i]);length=_csm.getParameterCount(modelPtr),this.minimumValues=new Float32Array(_em.HEAPF32.buffer,_csm.getParameterMinimumValues(modelPtr),length),length=_csm.getParameterCount(modelPtr),this.maximumValues=new Float32Array(_em.HEAPF32.buffer,_csm.getParameterMaximumValues(modelPtr),length),length=_csm.getParameterCount(modelPtr),this.defaultValues=new Float32Array(_em.HEAPF32.buffer,_csm.getParameterDefaultValues(modelPtr),length),length=_csm.getParameterCount(modelPtr),this.values=new Float32Array(_em.HEAPF32.buffer,_csm.getParameterValues(modelPtr),length)};Live2DCubismCore.Parameters=Parameters;var Parts=function(modelPtr){var length=0;this.count=_csm.getPartCount(modelPtr),length=_csm.getPartCount(modelPtr),this.ids=new Array(length);for(var _ids=new Uint32Array(_em.HEAPU32.buffer,_csm.getPartIds(modelPtr),length),i=0;i<_ids.length;i++)this.ids[i]=_em.UTF8ToString(_ids[i]);length=_csm.getPartCount(modelPtr),this.opacities=new Float32Array(_em.HEAPF32.buffer,_csm.getPartOpacities(modelPtr),length),length=_csm.getPartCount(modelPtr),this.parentIndices=new Int32Array(_em.HEAP32.buffer,_csm.getPartParentPartIndices(modelPtr),length)};Live2DCubismCore.Parts=Parts;var Drawables=function(){function Drawables(modelPtr){this._modelPtr=modelPtr;var length=0,length2=null;this.count=_csm.getDrawableCount(modelPtr),length=_csm.getDrawableCount(modelPtr),this.ids=new Array(length);for(var _ids=new Uint32Array(_em.HEAPU32.buffer,_csm.getDrawableIds(modelPtr),length),i=0;i<_ids.length;i++)this.ids[i]=_em.UTF8ToString(_ids[i]);length=_csm.getDrawableCount(modelPtr),this.constantFlags=new Uint8Array(_em.HEAPU8.buffer,_csm.getDrawableConstantFlags(modelPtr),length),length=_csm.getDrawableCount(modelPtr),this.dynamicFlags=new Uint8Array(_em.HEAPU8.buffer,_csm.getDrawableDynamicFlags(modelPtr),length),length=_csm.getDrawableCount(modelPtr),this.textureIndices=new Int32Array(_em.HEAP32.buffer,_csm.getDrawableTextureIndices(modelPtr),length),length=_csm.getDrawableCount(modelPtr),this.drawOrders=new Int32Array(_em.HEAP32.buffer,_csm.getDrawableDrawOrders(modelPtr),length),length=_csm.getDrawableCount(modelPtr),this.renderOrders=new Int32Array(_em.HEAP32.buffer,_csm.getDrawableRenderOrders(modelPtr),length),length=_csm.getDrawableCount(modelPtr),this.opacities=new Float32Array(_em.HEAPF32.buffer,_csm.getDrawableOpacities(modelPtr),length),length=_csm.getDrawableCount(modelPtr),this.maskCounts=new Int32Array(_em.HEAP32.buffer,_csm.getDrawableMaskCounts(modelPtr),length),length=_csm.getDrawableCount(modelPtr),this.vertexCounts=new Int32Array(_em.HEAP32.buffer,_csm.getDrawableVertexCounts(modelPtr),length),length=_csm.getDrawableCount(modelPtr),this.indexCounts=new Int32Array(_em.HEAP32.buffer,_csm.getDrawableIndexCounts(modelPtr),length),length=_csm.getDrawableCount(modelPtr),length2=new Int32Array(_em.HEAP32.buffer,_csm.getDrawableMaskCounts(modelPtr),length),this.masks=new Array(length);var _masks=new Uint32Array(_em.HEAPU32.buffer,_csm.getDrawableMasks(modelPtr),length);for(i=0;i<_masks.length;i++)this.masks[i]=new Int32Array(_em.HEAP32.buffer,_masks[i],length2[i]);length=_csm.getDrawableCount(modelPtr),length2=new Int32Array(_em.HEAP32.buffer,_csm.getDrawableVertexCounts(modelPtr),length),this.vertexPositions=new Array(length);var _vertexPositions=new Uint32Array(_em.HEAPU32.buffer,_csm.getDrawableVertexPositions(modelPtr),length);for(i=0;i<_vertexPositions.length;i++)this.vertexPositions[i]=new Float32Array(_em.HEAPF32.buffer,_vertexPositions[i],2*length2[i]);length=_csm.getDrawableCount(modelPtr),length2=new Int32Array(_em.HEAP32.buffer,_csm.getDrawableVertexCounts(modelPtr),length),this.vertexUvs=new Array(length);var _vertexUvs=new Uint32Array(_em.HEAPU32.buffer,_csm.getDrawableVertexUvs(modelPtr),length);for(i=0;i<_vertexUvs.length;i++)this.vertexUvs[i]=new Float32Array(_em.HEAPF32.buffer,_vertexUvs[i],2*length2[i]);length=_csm.getDrawableCount(modelPtr),length2=new Int32Array(_em.HEAP32.buffer,_csm.getDrawableIndexCounts(modelPtr),length),this.indices=new Array(length);var _indices=new Uint32Array(_em.HEAPU32.buffer,_csm.getDrawableIndices(modelPtr),length);for(i=0;i<_indices.length;i++)this.indices[i]=new Uint16Array(_em.HEAPU16.buffer,_indices[i],length2[i])}return Drawables.prototype.resetDynamicFlags=function(){_csm.resetDrawableDynamicFlags(this._modelPtr)},Drawables}();Live2DCubismCore.Drawables=Drawables;var Utils=function(){function Utils(){}return Utils.hasBlendAdditiveBit=function(bitfield){return 1==(1&bitfield)},Utils.hasBlendMultiplicativeBit=function(bitfield){return 2==(2&bitfield)},Utils.hasIsDoubleSidedBit=function(bitfield){return 4==(4&bitfield)},Utils.hasIsInvertedMaskBit=function(bitfield){return 8==(8&bitfield)},Utils.hasIsVisibleBit=function(bitfield){return 1==(1&bitfield)},Utils.hasVisibilityDidChangeBit=function(bitfield){return 2==(2&bitfield)},Utils.hasOpacityDidChangeBit=function(bitfield){return 4==(4&bitfield)},Utils.hasDrawOrderDidChangeBit=function(bitfield){return 8==(8&bitfield)},Utils.hasRenderOrderDidChangeBit=function(bitfield){return 16==(16&bitfield)},Utils.hasVertexPositionsDidChangeBit=function(bitfield){return 32==(32&bitfield)},Utils}();Live2DCubismCore.Utils=Utils;var _scriptDir,_em_module=(_scriptDir="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0,function(_em_module){var b;_em_module=_em_module||{},b=b||(void 0!==_em_module?_em_module:{});var n,l={};for(n in b)b.hasOwnProperty(n)&&(l[n]=b[n]);var t,p,q,r=!1;p="object"==typeof window,q="function"==typeof importScripts,r="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node&&!p&&!q,t=!p&&!r&&!q;var v,w,x,y,u="";r?(u=__dirname+"/",v=function(a,c){var d;return(d=z(a))?c?d:d.toString():(x=x||__webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js"),a=(y=y||__webpack_require__(/*! path */ "./node_modules/path-browserify/index.js")).normalize(a),x.readFileSync(a,c?null:"utf8"))},w=function(a){return(a=v(a,!0)).buffer||(a=new Uint8Array(a)),assert(a.buffer),a},1<process.argv.length&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",function(a){throw a}),process.on("unhandledRejection",B),b.inspect=function(){return"[Emscripten Module object]"}):t?("undefined"!=typeof read&&(v=function(a){var c=z(a);return c?C(c):read(a)}),w=function(a){var c;return(c=z(a))?c:"function"==typeof readbuffer?new Uint8Array(readbuffer(a)):(assert("object"==typeof(c=read(a,"binary"))),c)},"undefined"!=typeof print&&("undefined"==typeof console&&(console={}),console.log=print,console.warn=console.error="undefined"!=typeof printErr?printErr:print)):(p||q)&&(q?u=self.location.href:document.currentScript&&(u=document.currentScript.src),_scriptDir&&(u=_scriptDir),u=0!==u.indexOf("blob:")?u.substr(0,u.lastIndexOf("/")+1):"",v=function(a){try{var c=new XMLHttpRequest;return c.open("GET",a,!1),c.send(null),c.responseText}catch(d){if(a=z(a))return C(a);throw d}},q&&(w=function(a){try{var c=new XMLHttpRequest;return c.open("GET",a,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}catch(d){if(a=z(a))return a;throw d}}));var F,D=b.print||console.log.bind(console),E=b.printErr||console.warn.bind(console);for(n in l)l.hasOwnProperty(n)&&(b[n]=l[n]);function da(){return{exports:function(asmLibraryArg,wasmMemory,wasmTable){var scratchBuffer=new ArrayBuffer(8),b=new Int32Array(scratchBuffer),c=new Float32Array(scratchBuffer),d=new Float64Array(scratchBuffer);function e(index){return b[index]}function f(index,value){b[index]=value}function g(){return d[0]}function h(value){d[0]=value}function j(value){c[0]=value}function k(){return c[0]}var mem,U,global,env,buffer,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,C,H,I,J,K,L,M,T=(mem=wasmMemory.buffer,U=new Uint8Array(mem),function(offset,s){var V,W;if("undefined"==typeof Buffer)for(V=atob(s),W=0;W<V.length;W++)U[offset+W]=V.charCodeAt(W);else for(V=Buffer.from(s,"base64"),W=0;W<V.length;W++)U[offset+W]=V[W]});return T(1024,"CgBbQ1NNXSBbRV1Jbml0aWFsaXplRGVmb3JtZXJzKCk6IFVua25vd24gRGVmb3JtZXIgVHlwZS4KAE1PQzMAW0NTTV0gW0VdJXM6ICVzCgBbQ1NNXSBbRV1XYXJwRGVmb3JtZXI6OlRyYW5zZm9ybVRhcmdldCgpIGVycm9yLiBbJWRdIHAwMT0oJS40ZiAsICUuNGYpCgAlcwoAICAAW0NTTV0gW0VdY3NtUmV2aXZlTW9jSW5QbGFjZSBpcyBmYWlsZWQuIENvcnJ1cHRlZCAgbW9jMyBmaWxlLgoAImFkZHJlc3MiIGlzIG51bGwuAFtDU01dIFtXXVJvdGF0aW9uRGVmb3JtZXI6IE5vdCBmb3VuZCB0cmFuc2Zvcm1lZCBEaXJlY3Rpb24uCgAlMDJYIABbQ1NNXSBbRV1jc21SZXZpdmVNb2NJblBsYWNlIGlzIGZhaWxlZC4gVGhlIENvcmUgdW5zdXBwb3J0IGxhdGVyIHRoYW4gbW9jMyB2ZXI6WyVkXS4gVGhpcyBtb2MzIHZlciBpcyBbJWRdLgoAImFkZHJlc3MiIGFsaWdubWVudCBpcyBpbnZhbGlkLgBbQ1NNXSBbRV1VcGRhdGVEZWZvcm1lckhpZXJhcmNoeSgpOiBVbmtub3duIERlZm9ybWVyIFR5cGUuCgBbQ1NNXSBbRV1jc21HZXRNb2NWZXJzaW9uIGlzIGZhaWxlZC4gQ29ycnVwdGVkIG1vYzMgZmlsZS4KACJzaXplIiBpcyBpbnZhbGlkLgBMaXZlMkQgQ3ViaXNtIFNESyBDb3JlIFZlcnNpb24gJWQuJWQuJWQAIm1vZGVsIiBpcyBpbnZhbGlkLgBjc21HZXRNb2NWZXJzaW9uAGNzbVJldml2ZU1vY0luUGxhY2UAY3NtUmVhZENhbnZhc0luZm8AIm91dFNpemVJblBpeGVscyIgaXMgbnVsbC4AIm91dE9yaWdpbkluUGl4ZWxzIiBpcyBudWxsLgAib3V0UGl4ZWxzUGVyVW5pdCIgaXMgbnVsbC4AY3NtR2V0U2l6ZW9mTW9kZWwAIm1vYyIgaXMgaW52YWxpZC4AY3NtSW5pdGlhbGl6ZU1vZGVsSW5QbGFjZQAic2l6ZSIgaXMgaW52YWxpZABjc21VcGRhdGVNb2RlbABjc21HZXRQYXJhbWV0ZXJDb3VudABjc21HZXRQYXJhbWV0ZXJJZHMAY3NtR2V0UGFyYW1ldGVyTWluaW11bVZhbHVlcwBjc21HZXRQYXJhbWV0ZXJNYXhpbXVtVmFsdWVzAGNzbUdldFBhcmFtZXRlckRlZmF1bHRWYWx1ZXMAY3NtR2V0UGFyYW1ldGVyVmFsdWVzAGNzbUdldFBhcnRDb3VudABjc21HZXRQYXJ0SWRzAGNzbUdldFBhcnRPcGFjaXRpZXMAY3NtR2V0UGFydFBhcmVudFBhcnRJbmRpY2VzAGNzbUdldERyYXdhYmxlQ291bnQAY3NtR2V0RHJhd2FibGVJZHMAY3NtR2V0RHJhd2FibGVDb25zdGFudEZsYWdzAGNzbUdldERyYXdhYmxlRHluYW1pY0ZsYWdzAGNzbUdldERyYXdhYmxlVGV4dHVyZUluZGljZXMAY3NtR2V0RHJhd2FibGVEcmF3T3JkZXJzAGNzbUdldERyYXdhYmxlUmVuZGVyT3JkZXJzAGNzbUdldERyYXdhYmxlT3BhY2l0aWVzAGNzbUdldERyYXdhYmxlTWFza0NvdW50cwBjc21HZXREcmF3YWJsZU1hc2tzAGNzbUdldERyYXdhYmxlVmVydGV4Q291bnRzAGNzbUdldERyYXdhYmxlVmVydGV4UG9zaXRpb25zAGNzbUdldERyYXdhYmxlVmVydGV4VXZzAGNzbUdldERyYXdhYmxlSW5kZXhDb3VudHMAY3NtR2V0RHJhd2FibGVJbmRpY2VzAGNzbVJlc2V0RHJhd2FibGVEeW5hbWljRmxhZ3M="),T(2572,"Cw=="),T(2611,"//////8="),T(2680,"GBgAAC0rICAgMFgweAAobnVsbCkAAAAAEQAKABEREQAAAAAFAAAAAAAACQAAAAAL"),T(2736,"EQAPChEREQMKBwABEwkLCwAACQYLAAALAAYRAAAAERER"),T(2785,"Cw=="),T(2794,"EQAKChEREQAKAAACAAkLAAAACQALAAAL"),T(2843,"DA=="),T(2855,"DAAAAAAMAAAAAAkMAAAAAAAMAAAM"),T(2901,"Dg=="),T(2913,"DQAAAAQNAAAAAAkOAAAAAAAOAAAO"),T(2959,"EA=="),T(2971,"DwAAAAAPAAAAAAkQAAAAAAAQAAAQAAASAAAAEhIS"),T(3026,"EgAAABISEgAAAAAAAAk="),T(3075,"Cw=="),T(3087,"CgAAAAAKAAAAAAkLAAAAAAALAAAL"),T(3133,"DA=="),T(3145,"DAAAAAAMAAAAAAkMAAAAAAAMAAAMAAAwMTIzNDU2Nzg5QUJDREVGLTBYKzBYIDBYLTB4KzB4IDB4AGluZgBJTkYAbmFuAE5BTgAu"),T(3232,"AwAAAAQAAAAEAAAABgAAAIP5ogBETm4A/CkVANFXJwDdNPUAYtvAADyZlQBBkEMAY1H+ALveqwC3YcUAOm4kANJNQgBJBuAACeouAByS0QDrHf4AKbEcAOg+pwD1NYIARLsuAJzphAC0JnAAQX5fANaROQBTgzkAnPQ5AItfhAAo+b0A+B87AN7/lwAPmAUAES/vAApaiwBtH20Az342AAnLJwBGT7cAnmY/AC3qXwC6J3UA5evHAD178QD3OQcAklKKAPtr6gAfsV8ACF2NADADVgB7/EYA8KtrACC8zwA29JoA46kdAF5hkQAIG+YAhZllAKAUXwCNQGgAgNj/ACdzTQAGBjEAylYVAMmocwB74mAAa4zAABnERwDNZ8MACejcAFmDKgCLdsQAphyWAESv3QAZV9EApT4FAAUH/wAzfj8AwjLoAJhP3gC7fTIAJj3DAB5r7wCf+F4ANR86AH/yygDxhx0AfJAhAGokfADVbvoAMC13ABU7QwC1FMYAwxmdAK3EwgAsTUEADABdAIZ9RgDjcS0Am8aaADNiAAC00nwAtKeXADdV1QDXPvYAoxAYAE12/ABknSoAcNerAGN8+AB6sFcAFxXnAMBJVgA71tkAp4Q4ACQjywDWincAWlQjAAAfuQDxChsAGc7fAJ8x/wBmHmoAmVdhAKz7RwB+f9gAImW3ADLoiQDmv2AA78TNAGw2CQBdP9QAFt7XAFg73gDem5IA0iIoACiG6ADiWE0AxsoyAAjjFgDgfcsAF8BQAPMdpwAY4FsALhM0AIMSYgCDSAEA9Y5bAK2wfwAe6fIASEpDABBn0wCq3dgArl9CAGphzgAKKKQA05m0AAam8gBcd38Ao8KDAGE8iACKc3gAr4xaAG/XvQAtpmMA9L/LAI2B7wAmwWcAVcpFAMrZNgAoqNIAwmGNABLJdwAEJhQAEkabAMRZxADIxUQATbKRAAAX8wDUQ60AKUnlAP3VEAAAvvwAHpTMAHDO7gATPvUA7PGAALPnwwDH+CgAkwWUAMFxPgAuCbMAC0XzAIgSnACrIHsALrWfAEeSwgB7Mi8ADFVtAHKnkABr5x8AMcuWAHkWSgBBeeIA9N+JAOiUlwDi5oQAmTGXAIjtawBfXzYAu/0OAEiatABnpGwAcXJCAI1dMgCfFbgAvOUJAI0xJQD3dDkAMAUcAA0MAQBLCGgALO5YAEeqkAB05wIAvdYkAPd9pgBuSHIAnxbvAI6UpgC0kfYA0VNRAM8K8gAgmDMA9Ut+ALJjaADdPl8AQF0DAIWJfwBVUikAN2TAAG3YEAAySDIAW0x1AE5x1ABFVG4ACwnBACr1aQAUZtUAJwedAF0EUAC0O9sA6nbFAIf5FwBJa30AHSe6AJZpKQDGzKwArRRUAJDiagCI2YkALHJQAASkvgB3B5QA8zBwAAD8JwDqcagAZsJJAGTgPQCX3YMAoz+XAEOU/QANhowAMUHeAJI5nQDdcIwAF7fnAAjfOwAVNysAXICgAFqAkwAQEZIAD+jYAGyArwDb/0sAOJAPAFkYdgBipRUAYcu7AMeJuQAQQL0A0vIEAEl1JwDrtvYA2yK7AAoUqgCJJi8AZIN2AAk7MwAOlBoAUTqqAB2jwgCv7a4AXCYSAG3CTQAtepwAwFaXAAM/gwAJ8PYAK0CMAG0xmQA5tAcADCAVANjDWwD1ksQAxq1LAE7KpQCnN80A5qk2AKuSlADdQmgAGWPeAHaM7wBoi1IA/Ns3AK6hqwDfFTEAAK6hAAz72gBkTWYA7QW3ACllMABXVr8AR/86AGr5uQB1vvMAKJPfAKuAMABmjPYABMsVAPoiBgDZ5B0APbOkAFcbjwA2zQkATkLpABO+pAAzI7UA8KoaAE9lqADSwaUACz8PAFt4zQAj+XYAe4sEAIkXcgDGplMAb27iAO/rAACbSlgAxNq3AKpmugB2z88A0QIdALHxLQCMmcEAw613AIZI2gD3XaAAxoD0AKzwLwDd7JoAP1y8ANDebQCQxx8AKtu2AKMlOgAAr5oArVOTALZXBAApLbQAS4B+ANoHpwB2qg4Ae1mhABYSKgDcty0A+uX9AInb/gCJvv0A5HZsAAap/AA+gHAAhW4VAP2H/wAoPgcAYWczACoYhgBNveoAs+evAI9tbgCVZzkAMb9bAITXSAAw3xYAxy1DACVhNQDJcM4AMMu4AL9s/QCkAKIABWzkAFrdoAAhb0cAYhLSALlchABwYUkAa1bgAJlSAQBQVTcAHtW3ADPxxAATbl8AXTDkAIUuqQAdssMAoTI2AAi3pADqsdQAFvchAI9p5AAn/3cADAOAAI1ALQBPzaAAIKWZALOi0wAvXQoAtPlCABHaywB9vtAAm9vBAKsXvQDKooEACGpcAC5VFwAnAFUAfxTwAOEHhgAUC2QAlkGNAIe+3gDa/SoAayW2AHuJNAAF8/4Aub+eAGhqTwBKKqgAT8RaAC34vADXWpgA9MeVAA1NjQAgOqYApFdfABQ/sQCAOJUAzCABAHHdhgDJ3rYAv2D1AE1lEQABB2sAjLCsALLA0ABRVUgAHvsOAJVywwCjBjsAwEA1AAbcewDgRcwATin6ANbKyADo80EAfGTeAJtk2ADZvjEApJfDAHdY1ABp48UA8NoTALo6PABGGEYAVXVfANK99QBuksYArC5dAA5E7QAcPkIAYcSHACn96QDn1vMAInzKAG+RNQAI4MUA/9eNAG5q4gCw/cYAkwjBAHxddABrrbIAzW6dAD5yewDGEWoA98+pAClz3wC1yboAtwBRAOKyDQB0uiQA5X1gAHTYigANFSwAgRgMAH5mlAABKRYAn3p2AP39vgBWRe8A2X42AOzZEwCLurkAxJf8ADGoJwDxbsMAlMU2ANioVgC0qLUAz8wOABKJLQBvVzQALFaJAJnO4wDWILkAa16qAD4qnAARX8wA/QtKAOH0+wCOO20A4oYsAOnUhAD8tKkA7+7RAC41yQAvOWEAOCFEABvZyACB/AoA+0pqAC8c2ABTtIQATpmMAFQizAAqVdwAwMbWAAsZlgAacLgAaZVkACZaYAA/Uu4AfxEPAPS1EQD8y/UANLwtADS87gDoXcwA3V5gAGeOmwCSM+8AyRe4AGFYmwDhV7wAUYPGANg+EADdcUgALRzdAK8YoQAhLEYAWfPXANl6mACeVMAAT4b6AFYG/ADlea4AiSI2ADitIgBnk9wAVeiqAIImOADK55sAUQ2kAJkzsQCp1w4AaQVIAGWy8AB/iKcAiEyXAPnRNgAhkrMAe4JKAJjPIQBAn9wA3EdVAOF0OgBn60IA/p3fAF7UXwB7Z6QAuqx6AFX2ogAriCMAQbpVAFluCAAhKoYAOUeDAInj5gDlntQASftAAP9W6QAcD8oAxVmKAJT6KwDTwcUAD8XPANtargBHxYYAhUNiACGGOwAseZQAEGGHACpMewCALBoAQ78SAIgmkAB4PIkAqMTkAOXbewDEOsIAJvTqAPdnigANkr8AZaMrAD2TsQC9fAsApFHcACfdYwBp4d0AmpQZAKgplQBozigACe20AESfIABOmMoAcIJjAH58IwAPuTIAp/WOABRW5wAh8QgAtZ0qAG9+TQClGVEAtfmrAILf1gCW3WEAFjYCAMQ6nwCDoqEAcu1tADmNegCCuKkAazJcAEYnWwAANO0A0gB3APz0VQABWU0A4HGA"),T(6019,"QPsh+T8AAAAALUR0PgAAAICYRvg8AAAAYFHMeDsAAACAgxvwOQAAAEAgJXo4AAAAgCKC4zYAAAAAHfNpNThj7T7aD0k/Xph7P9oPyT9pN6wxaCEiM7QPFDNoIaIz2w9JP9sPSb/kyxZA5MsWwAAAAAAAAACA2w9JQNsPScAAAIA/AADAPwAAAADcz9E1AAAAAADAFT8="),T(6168,"BQ=="),T(6180,"DA=="),T(6204,"DQAAAA4AAADIGQAAAAQ="),T(6228,"AQ=="),T(6243,"Cv////8="),T(6500,"9B0="),global={Int8Array:Int8Array,Int16Array:Int16Array,Int32Array:Int32Array,Uint8Array:Uint8Array,Uint16Array:Uint16Array,Uint32Array:Uint32Array,Float32Array:Float32Array,Float64Array:Float64Array,NaN:NaN,Infinity:1/0,Math:Math},env=asmLibraryArg,buffer=wasmMemory.buffer,m=env.memory,n=wasmTable,o=new global.Int8Array(buffer),p=new global.Int16Array(buffer),q=new global.Int32Array(buffer),r=new global.Uint8Array(buffer),s=new global.Uint16Array(buffer),t=new global.Uint32Array(buffer),u=new global.Float32Array(buffer),v=new global.Float64Array(buffer),w=global.Math.imul,x=global.Math.fround,y=global.Math.abs,z=global.Math.clz32,A=global.Math.min,global.Math.max,C=global.Math.floor,global.Math.ceil,global.Math.sqrt,env.abort,global.NaN,H=global.Infinity,I=env.a,J=env.b,K=env.c,L=5251088,M=0,n[1]=function(a,df,ef,ff){a|=0,df|=0,ef|=0,ff|=0;var If,gf=0,hf=x(0),jf=x(0),kf=0,lf=x(0),mf=x(0),nf=x(0),of=0,pf=x(0),qf=x(0),rf=x(0),sf=x(0),tf=x(0),uf=x(0),vf=x(0),wf=x(0),xf=x(0),yf=x(0),zf=x(0),Af=x(0),Bf=x(0),Cf=x(0),Df=0,Ef=0,Ff=x(0),Gf=x(0),Hf=0,Jf=0,Kf=x(0),Lf=x(0),Mf=0,Nf=0,Of=0,Pf=0,Qf=0,Rf=0,Sf=0,Tf=0,Uf=0,Vf=x(0),Wf=x(0),Xf=x(0),Yf=x(0),Zf=x(0),_f=x(0),$f=x(0),ag=0,bg=0;if(L=If=L-32|0,1<=(0|ff))for(Qf=(Df=q[a+4>>2])+-1|0,Rf=(Jf=q[a>>2])+-1|0,Sf=Nf=(of=q[a+20>>2])+(Df<<3)|0,Tf=Of=((Mf=w(Jf,Ef=Df+1|0))<<3)+of|0,Uf=Pf=(Df+Mf<<3)+of|0,Kf=x(0|Jf),Lf=x(0|Df),ag=q[a+8>>2],a=0;;){nf=u[4+(gf=(Hf=a<<3)+df|0)>>2],jf=x(nf*Kf),pf=u[gf>>2],hf=x(pf*Lf),gf=nf>=x(1);a:if(nf<x(0)^1&&!(gf|pf>=x(1)|pf<x(0)))gf=x(y(uf=jf))<x(2147483648)?~~jf:-2147483648,mf=x(uf-x(0|gf)),kf=x(y(jf=hf))<x(2147483648)?~~hf:-2147483648,lf=x(jf-x(0|kf)),gf=kf+w(gf,Ef)|0,jf=ag?(hf=x(x(1)-mf),jf=x(x(1)-lf),kf=(gf<<3)+of|0,gf=(gf+Ef<<3)+of|0,u[ef+Hf>>2]=x(x(x(hf*x(jf*u[kf>>2]))+x(hf*x(lf*u[kf+8>>2])))+x(mf*x(jf*u[gf>>2])))+x(mf*x(lf*u[gf+8>>2])),hf=x(x(x(hf*x(jf*u[kf+4>>2]))+x(hf*x(lf*u[kf+12>>2])))+x(mf*x(jf*u[gf+4>>2]))),x(mf*x(lf*u[gf+12>>2]))):x(lf+mf)<=x(1)?(hf=x(x(x(1)-lf)-mf),kf=(gf<<3)+of|0,gf=(gf+Ef<<3)+of|0,u[ef+Hf>>2]=x(x(hf*u[kf>>2])+x(lf*u[kf+8>>2]))+x(mf*u[gf>>2]),hf=x(x(hf*u[kf+4>>2])+x(lf*u[kf+12>>2])),x(mf*u[gf+4>>2])):(hf=x(x(lf+x(-1))+mf),kf=(gf+Ef<<3)+of|0,jf=x(x(1)-lf),nf=x(x(1)-mf),gf=(gf<<3)+of|0,u[ef+Hf>>2]=x(x(hf*u[kf+8>>2])+x(jf*u[kf>>2]))+x(nf*u[gf+8>>2]),hf=x(x(hf*u[kf+12>>2])+x(jf*u[kf+4>>2])),x(nf*u[gf+12>>2]));else{if(bg||(uf=u[Uf+4>>2],Vf=u[of+4>>2],qf=x(uf-Vf),Wf=u[Sf+4>>2],Xf=u[Tf+4>>2],rf=x(Wf-Xf),vf=x(x(qf-rf)*x(.5)),Yf=u[Pf>>2],Zf=u[of>>2],sf=x(Yf-Zf),_f=u[Nf>>2],$f=u[Of>>2],tf=x(_f-$f),wf=x(x(sf-tf)*x(.5)),rf=x(x(rf+qf)*x(.5)),tf=x(x(tf+sf)*x(.5)),bg=1,qf=x(x(x(x(x(Vf+Wf)+Xf)+uf)*x(.25))-x(qf*x(.5))),sf=x(x(x(x(x(Zf+_f)+$f)+Yf)*x(.25))-x(sf*x(.5)))),!(nf<x(3)^1|pf>x(-2)^1|pf<x(3)^1|nf>x(-2)^1)){b:if(pf<=x(0)){if(nf<=x(0)){mf=x(x(nf+x(2))*x(.5)),lf=x(x(pf+x(2))*x(.5)),hf=x(vf+vf),Ff=x(qf-hf),jf=x(wf+wf),Gf=x(sf-jf),Bf=x(qf-x(rf+rf)),xf=x(Bf-hf),Cf=x(sf-x(tf+tf)),yf=x(Cf-jf),zf=u[of+4>>2],Af=u[of>>2];break b}if(gf){hf=x(vf*x(3)),jf=x(qf-x(rf+rf)),Bf=x(hf+jf),xf=x(wf*x(3)),yf=x(sf-x(tf+tf)),Cf=x(xf+yf),mf=x(x(nf+x(-1))*x(.5)),lf=x(x(pf+x(2))*x(.5)),zf=x(hf+qf),Af=x(xf+sf),xf=x(vf+jf),yf=x(wf+yf),Ff=u[Tf+4>>2],Gf=u[Of>>2];break b}hf=x(qf-x(rf+rf)),gf=Rf,kf=x(y(jf))<x(2147483648)?~~jf:-2147483648,mf=x(0|(gf=(0|kf)==(0|Jf)?gf:kf)),lf=x(mf/Kf),xf=x(x(lf*vf)+hf),uf=x(lf*wf),lf=x(sf-x(tf+tf)),yf=x(uf+lf),nf=x(x(0|(kf=gf+1|0))/Kf),Bf=x(x(nf*vf)+hf),Cf=x(x(nf*wf)+lf),lf=x(x(pf+x(2))*x(.5)),mf=x(jf-mf),gf=(w(gf,Ef)<<3)+of|0,Ff=u[gf+4>>2],Gf=u[gf>>2],gf=(w(kf,Ef)<<3)+of|0,zf=u[gf+4>>2],Af=u[gf>>2]}else if(pf>=x(1)){if(nf<=x(0)){mf=x(x(nf+x(2))*x(.5)),lf=x(x(pf+x(-1))*x(.5)),hf=x(vf+vf),xf=x(x(rf+qf)-hf),jf=x(wf+wf),yf=x(x(tf+sf)-jf),zf=x(x(rf*x(3))+qf),Ff=x(zf-hf),Af=x(x(tf*x(3))+sf),Gf=x(Af-jf),Bf=u[Sf+4>>2],Cf=u[Nf>>2];break b}if(gf){hf=x(vf*x(3)),Bf=x(hf+x(rf+qf)),jf=x(wf*x(3)),Cf=x(jf+x(tf+sf)),uf=hf,hf=x(x(rf*x(3))+qf),zf=x(uf+hf),uf=jf,jf=x(x(tf*x(3))+sf),Af=x(uf+jf),mf=x(x(nf+x(-1))*x(.5)),lf=x(x(pf+x(-1))*x(.5)),Ff=x(vf+hf),Gf=x(wf+jf),xf=u[Uf+4>>2],yf=u[Pf>>2];break b}hf=x(x(rf*x(3))+qf),gf=Rf,kf=x(y(jf))<x(2147483648)?~~jf:-2147483648,mf=x(0|(gf=(0|kf)==(0|Jf)?gf:kf)),lf=x(mf/Kf),Ff=x(x(lf*vf)+hf),uf=x(lf*wf),lf=x(x(tf*x(3))+sf),Gf=x(uf+lf),nf=x(x(0|(kf=gf+1|0))/Kf),zf=x(x(nf*vf)+hf),Af=x(x(nf*wf)+lf),lf=x(x(pf+x(-1))*x(.5)),mf=x(jf-mf),gf=(w(gf,Ef)+Df<<3)+of|0,xf=u[gf+4>>2],yf=u[gf>>2],gf=(w(kf,Ef)+Df<<3)+of|0,Bf=u[gf+4>>2],Cf=u[gf>>2]}else nf<=x(0)?(mf=x(x(nf+x(2))*x(.5)),gf=Qf,kf=x(y(jf=hf))<x(2147483648)?~~hf:-2147483648,hf=x(0|(gf=(0|kf)==(0|Df)?gf:kf)),lf=x(jf-hf),hf=x(hf/Lf),jf=x(vf+vf),xf=x(x(x(hf*rf)+qf)-jf),uf=x(x(hf*tf)+sf),hf=x(wf+wf),yf=x(uf-hf),nf=x(x(0|(kf=gf+1|0))/Lf),Ff=x(x(x(nf*rf)+qf)-jf),Gf=x(x(x(nf*tf)+sf)-hf),Bf=u[4+(gf=(gf<<3)+of|0)>>2],Cf=u[gf>>2],zf=u[4+(gf=(kf<<3)+of|0)>>2],Af=u[gf>>2]):gf?(uf=jf=x(vf*x(3)),gf=Qf,kf=x(y(hf))<x(2147483648)?~~hf:-2147483648,lf=x(0|(gf=(0|kf)==(0|Df)?gf:kf)),mf=x(lf/Lf),Bf=x(uf+x(x(mf*rf)+qf)),pf=x(wf*x(3)),Cf=x(pf+x(x(mf*tf)+sf)),uf=jf,jf=x(x(0|(kf=gf+1|0))/Lf),zf=x(uf+x(x(jf*rf)+qf)),Af=x(pf+x(x(jf*tf)+sf)),mf=x(x(nf+x(-1))*x(.5)),lf=x(hf-lf),xf=u[4+(gf=(gf+Mf<<3)+of|0)>>2],yf=u[gf>>2],Ff=u[4+(gf=(kf+Mf<<3)+of|0)>>2],Gf=u[gf>>2]):(v[16+If>>3]=nf,q[If>>2]=a,v[8+If>>3]=pf,Y(4,1104,If));if(x(lf+mf)<=x(1)){u[ef+Hf>>2]=x(yf+x(x(Gf-yf)*lf))+x(x(Cf-yf)*mf),hf=x(xf+x(x(Ff-xf)*lf)),jf=x(x(Bf-xf)*mf);break a}hf=x(x(1)-lf),jf=x(x(1)-mf),u[ef+Hf>>2]=x(Af+x(x(Cf-Af)*hf))+x(x(Gf-Af)*jf),hf=x(zf+x(x(Bf-zf)*hf)),jf=x(x(Ff-zf)*jf);break a}u[ef+Hf>>2]=x(nf*wf)+x(x(pf*tf)+sf),hf=x(nf*vf),jf=x(x(pf*rf)+qf)}if(u[4+(ef+Hf|0)>>2]=hf+jf,(0|ff)==(0|(a=a+1|0)))break}L=32+If|0},n[2]=function(a,se,te){a|=0,se|=0;var Ie,Je,Ke,He=0;if(Je=q[140+(te|=0)>>2],Ke=q[te+136>>2],Ie=q[a+24>>2],-1==(0|(He=q[a+4>>2])))return q[(a=se<<2)+Ke>>2]=q[Ie+16>>2],void(q[a+Je>>2]=1065353216);te=q[te+4>>2]+(He<<5)|0,He=q[Ie+20>>2],n[q[te+20>>2]](q[te+24>>2],He,He,q[Ie+12>>2]),se<<=2,a=q[a+4>>2]<<2,u[se+Ke>>2]=u[Ie+16>>2]*u[a+Ke>>2],q[se+Je>>2]=q[a+Je>>2]},n[3]=function(a,se,te,Le){a|=0,se|=0,te|=0,Le|=0;var Ue,Me=x(0),Ne=x(0),Oe=x(0),Pe=x(0),Qe=0,Re=x(0),Se=0,Te=x(0),Ve=x(0),We=x(0);if(Qe=q[a+28>>2],Ne=function(a){var Tb,Rb=x(0),Sb=0,Ub=0,Vb=0;L=Tb=L-16|0,j(a);a:if((Sb=2147483647&(Ub=e(0)))>>>0<=1061752794){if(Rb=x(1),Sb>>>0<964689920)break a;Rb=aa(+a)}else if(Sb>>>0<=1081824209){if(Vb=+a,1075235812<=Sb>>>0){Rb=x(-aa(((0|Ub)<0?3.141592653589793:-3.141592653589793)+Vb));break a}if((0|Ub)<=-1){Rb=$(Vb+1.5707963267948966);break a}Rb=$(1.5707963267948966-Vb)}else if(Sb>>>0<=1088565717){if(1085271520<=Sb>>>0){Rb=aa(+a+((0|Ub)<0?6.283185307179586:-6.283185307179586));break a}if((0|Ub)<=-1){Rb=$(-4.71238898038469-a);break a}Rb=$(a-4.71238898038469)}else if(Rb=x(a-a),!(2139095040<=Sb>>>0))if((Sb=3&la(a,8+Tb|0))>>>0<=2){switch(Sb-1|0){default:Rb=aa(v[8+Tb>>3]);break a;case 0:Rb=$(-v[8+Tb>>3]);break a;case 1:}Rb=x(-aa(v[8+Tb>>3]))}else Rb=$(v[8+Tb>>3]);return L=16+Tb|0,Rb}(Me=x(x(x(u[a>>2]+u[a+20>>2])*x(3.1415927410125732))/x(180))),Oe=u[a+8>>2],Ue=q[a+24>>2],Me=function(a){var Ob,Hb=0,Pb=0,Qb=0;L=Ob=L-16|0,j(a);a:if((Hb=2147483647&(Qb=e(0)))>>>0<=1061752794){if(Hb>>>0<964689920)break a;a=$(+a)}else if(Hb>>>0<=1081824209){if(Pb=+a,Hb>>>0<=1075235811){if((0|Qb)<=-1){a=x(-aa(Pb+1.5707963267948966));break a}a=aa(Pb+-1.5707963267948966);break a}a=$(-(((0|Qb)<0?3.141592653589793:-3.141592653589793)+Pb))}else if(Hb>>>0<=1088565717){if(Pb=+a,Hb>>>0<=1085271519){if((0|Qb)<=-1){a=aa(Pb+4.71238898038469);break a}a=x(-aa(Pb+-4.71238898038469));break a}a=$(((0|Qb)<0?6.283185307179586:-6.283185307179586)+Pb)}else if(2139095040<=Hb>>>0)a=x(a-a);else if((Hb=3&la(a,8+Ob|0))>>>0<=2){switch(Hb-1|0){default:a=$(v[8+Ob>>3]);break a;case 0:a=aa(v[8+Ob>>3]);break a;case 1:}a=$(-v[8+Ob>>3])}else a=x(-aa(v[8+Ob>>3]));return L=16+Ob|0,a}(Me),0<(0|Le))for(Ne=x(Oe*Ne),Re=x(Qe?-1:1),Ve=x(Ne*Re),Pe=x(Ue?-1:1),We=x(Pe*x(Oe*Me)),Ne=x(Pe*Ne),Oe=x(x(Oe*x(-Me))*Re),Me=u[a+16>>2],Re=u[a+12>>2];Qe=(a=Se<<3)+te|0,Pe=u[(a=a+se|0)>>2],Te=u[a+4>>2],u[Qe+4>>2]=Me+x(x(We*Pe)+x(Ve*Te)),u[Qe>>2]=Re+x(x(Ne*Pe)+x(Oe*Te)),(0|(Se=Se+1|0))!=(0|Le););},n[4]=function(a,se,te){a|=0,se|=0,te|=0;var ue,ve,Be,Ce,De,we=0,xe=x(0),ye=x(0),ze=0,Ae=x(0),Ee=x(0),Fe=x(0),Ge=x(0);if(L=ue=L+-64|0,Be=q[te+140>>2],Ce=q[te+136>>2],ve=q[a+24>>2],-1!=(0|(De=q[a+4>>2]))){we=q[te+4>>2],ze=q[ve+12>>2],q[24+ue>>2]=ze,te=q[ve+16>>2],q[28+ue>>2]=te,q[16+ue>>2]=0,Ee=1==q[8+(we=we+(De<<5)|0)>>2]?x(-10):x(-.10000000149011612),u[20+ue>>2]=Ee,q[60+ue>>2]=te,q[56+ue>>2]=ze,n[q[we+20>>2]](q[we+24>>2],56+ue|0,48+ue|0,1),Ae=x(1),ze=9;b:{for(;;){if(te=ze,Fe=x(Ae*x(0)),u[32+ue>>2]=Fe+u[56+ue>>2],Ge=x(Ee*Ae),u[36+ue>>2]=Ge+u[60+ue>>2],n[q[we+20>>2]](q[we+24>>2],32+ue|0,40+ue|0,1),ye=x(u[44+ue>>2]-u[52+ue>>2]),u[44+ue>>2]=ye,xe=x(u[40+ue>>2]-u[48+ue>>2]),u[40+ue>>2]=xe,ye!=x(0)||xe!=x(0)){te=q[44+ue>>2],q[8+ue>>2]=q[40+ue>>2],q[12+ue>>2]=te;break b}if(u[32+ue>>2]=u[56+ue>>2]-Fe,u[36+ue>>2]=u[60+ue>>2]-Ge,n[q[we+20>>2]](q[we+24>>2],32+ue|0,40+ue|0,1),ye=x(u[40+ue>>2]-u[48+ue>>2]),u[40+ue>>2]=ye,xe=x(u[44+ue>>2]-u[52+ue>>2]),(u[44+ue>>2]=xe)!=x(0)||ye!=x(0)){u[12+ue>>2]=-xe,u[8+ue>>2]=-ye;break b}if(ze=te+-1|0,Ae=x(Ae*x(.10000000149011612)),!te)break}Y(3,1265,0)}xe=function(a,fh){var gh=x(0);if((gh=x(Aa(u[4+a>>2],u[a>>2])-Aa(u[4+fh>>2],u[fh>>2])))<x(-3.1415927410125732))for(;(gh=x(gh+x(6.2831854820251465)))<x(-3.1415927410125732););if(gh>x(3.1415927410125732))for(;(gh=x(gh+x(-6.2831854820251465)))>x(3.1415927410125732););return gh}(16+ue|0,8+ue|0),n[q[we+20>>2]](q[we+24>>2],24+ue|0,24+ue|0,1),q[ve+12>>2]=q[24+ue>>2],q[ve+16>>2]=q[28+ue>>2],u[ve+20>>2]=u[ve+20>>2]+x(x(xe*x(-180))/x(3.1415927410125732)),se<<=2,a=q[a+4>>2]<<2,u[se+Ce>>2]=u[ve+4>>2]*u[a+Ce>>2],xe=x(u[ve+8>>2]*u[a+Be>>2]),u[se+Be>>2]=xe,u[ve+8>>2]=xe}else q[(a=se<<2)+Ce>>2]=q[ve+4>>2],q[a+Be>>2]=q[ve+8>>2];L=64+ue|0},n[5]=function(a){a|=0;var jg,ng,df=0,ef=0,ff=0,cg=0,dg=0,eg=x(0),fg=0,gg=0,hg=0,ig=0,kg=0,lg=0,mg=0,og=0,pg=0,qg=0,rg=0;if(hg=q[a+248>>2],ng=q[a+204>>2],jg=q[a+200>>2],!((0|(dg=q[a+220>>2]))<1)){for(fg=q[a+236>>2],cg=q[a+216>>2],ff=q[a+224>>2];u[(ef=df<<2)+fg>>2]=u[ef+ff>>2]*u[ef+cg>>2],(0|dg)!=(0|(df=df+1|0)););if(!((0|dg)<1))for(fg=q[a+240>>2],cg=q[a+216>>2],ff=q[a+228>>2],df=0;u[(ef=df<<2)+fg>>2]=u[ef+ff>>2]*u[ef+cg>>2],(0|dg)!=(0|(df=df+1|0)););}if(1<=(0|jg))for(og=q[a+208>>2],dg=fg=0;;){if(q[hg>>2]){ig=(ff=q[(ef=fg<<2)+q[a+212>>2]>>2])+dg|0;c:{if((0|ff)<=0)q[ef+q[a+276>>2]>>2]=0;else{for(cg=q[a+236>>2],eg=x(0),df=dg;eg=x(eg+u[cg+(df<<2)>>2]),(0|(df=df+1|0))<(0|ig););if(u[ef+q[a+276>>2]>>2]=eg,!((0|ff)<1)){for(cg=q[a+240>>2],eg=x(0),df=dg;eg=x(eg+u[cg+(df<<2)>>2]),(0|(df=df+1|0))<(0|ig););break c}}eg=x(0)}if(df=ef+q[a+268>>2]|0,eg=x(eg+x(.0010000000474974513)),cg=x(y(eg))<x(2147483648)?~~eg:-2147483648,q[df>>2]=cg,cg=(df=q[12+((fg<<4)+ng|0)>>2])<<1,kg=q[ef+q[a+272>>2]>>2],(df=(0|df)<1)||ba(kg,0,(1<(0|cg)?cg:1)<<2),!(df|(0|ff)<1))for(lg=q[a+244>>2],pg=q[a+216>>2],qg=q[a+232>>2],ef=dg;;){for(gg=(df=ef<<2)+pg|0,rg=q[df+qg>>2],ff=df=0;u[lg+(mg=ff<<2)>>2]=u[rg+mg>>2]*u[gg>>2],(0|(ff=ff+1|0))<(0|cg););for(;u[(gg=(ff=df<<2)+kg|0)>>2]=u[ff+lg>>2]+u[gg>>2],(0|(df=df+1|0))<(0|cg););if(!((0|(ef=ef+1|0))<(0|ig)))break}}if(hg=hg+4|0,dg=q[(fg<<2)+og>>2]+dg|0,(0|jg)==(0|(fg=fg+1|0)))break}},n[6]=function(a){a|=0;var Ng,Rg,Eg=0,Fg=0,Gg=0,Hg=0,Ig=0,Jg=0,Kg=x(0),Lg=0,Mg=0,Og=0,Pg=0,Qg=0,Sg=0,Tg=0,Ug=0,Vg=0,Wg=0;if(Mg=q[a+172>>2],Ng=q[a- -64>>2],Rg=q[a+68>>2],1<=(0|(Gg=q[a+92>>2])))for(Ig=q[a+104>>2],Jg=q[a+88>>2],Fg=q[a+96>>2];u[(Hg=Eg<<2)+Ig>>2]=u[Fg+Hg>>2]*u[Jg+Hg>>2],(0|Gg)!=(0|(Eg=Eg+1|0)););if(1<=(0|Ng))for(Sg=q[a+80>>2],Hg=Ig=0;;){if(q[Mg>>2]){if(Og=(Eg=q[q[a+84>>2]+(Ig<<2)>>2])+Hg|0,Gg=(0|Eg)<1)Kg=x(0);else for(Jg=q[a+104>>2],Kg=x(0),Eg=Hg;Kg=x(Kg+u[Jg+(Eg<<2)>>2]),(0|(Eg=Eg+1|0))<(0|Og););if(Eg=w(Ig,24)+Rg|0,u[Eg+16>>2]=Kg,Jg=(Fg=q[Eg+12>>2])<<1,(Fg=(0|Fg)<1)||ba(q[Eg+20>>2],0,(1<(0|Jg)?Jg:1)<<2),!(Fg|Gg))for(Tg=q[Eg+20>>2],Pg=q[a+108>>2],Ug=q[a+88>>2],Vg=q[a+100>>2],Gg=Hg;;){for(Lg=(Eg=Gg<<2)+Ug|0,Wg=q[Eg+Vg>>2],Fg=Eg=0;u[(Qg=Fg<<2)+Pg>>2]=u[Wg+Qg>>2]*u[Lg>>2],(0|(Fg=Fg+1|0))<(0|Jg););for(;u[(Lg=(Fg=Eg<<2)+Tg|0)>>2]=u[Fg+Pg>>2]+u[Lg>>2],(0|(Eg=Eg+1|0))<(0|Jg););if(!((0|(Gg=Gg+1|0))<(0|Og)))break}}if(Mg=Mg+4|0,Hg=q[(Ig<<2)+Sg>>2]+Hg|0,(0|Ng)==(0|(Ig=Ig+1|0)))break}},n[7]=function(a){a|=0;var eh,Xg=0,Yg=x(0),Zg=0,_g=0,$g=0,ah=0,bh=0,ch=0,dh=0;if(bh=q[a+36>>2],eh=q[a+4>>2],1<=(0|(_g=q[a+24>>2])))for(ch=q[a+32>>2],dh=q[a+20>>2],Zg=q[a+28>>2];u[($g=Xg<<2)+ch>>2]=u[Zg+$g>>2]*u[$g+dh>>2],(0|_g)!=(0|(Xg=Xg+1|0)););if(1<=(0|eh))for($g=q[a+12>>2],Zg=0;;){if(q[bh>>2]){if((0|(Xg=q[(_g=ah<<2)+q[a+16>>2]>>2]))<1)Yg=x(0);else for(ch=Xg+Zg|0,dh=q[a+32>>2],Yg=x(0),Xg=Zg;Yg=x(Yg+u[dh+(Xg<<2)>>2]),(0|(Xg=Xg+1|0))<(0|ch););Xg=_g+q[a+44>>2]|0,Yg=x(Yg+x(.0010000000474974513)),x(y(Yg))<x(2147483648)?q[Xg>>2]=~~Yg:q[Xg>>2]=-2147483648}if(bh=bh+4|0,Zg=q[$g+(ah<<2)>>2]+Zg|0,(0|eh)==(0|(ah=ah+1|0)))break}},n[8]=function(a){a|=0;var Ag,Dg,sg=0,tg=0,ug=x(0),vg=0,wg=0,xg=0,yg=0,zg=0,Bg=0,Cg=0;if(Cg=q[a+176>>2],Dg=q[a+72>>2],Ag=q[a+76>>2],!((0|(xg=q[a+124>>2]))<1)){for(yg=q[a+148>>2],vg=q[a+120>>2],wg=q[a+128>>2];u[(tg=sg<<2)+yg>>2]=u[tg+wg>>2]*u[tg+vg>>2],(0|xg)!=(0|(sg=sg+1|0)););if(!((0|xg)<1)){for(yg=q[a+152>>2],vg=q[a+120>>2],wg=q[a+132>>2],sg=0;u[(tg=sg<<2)+yg>>2]=u[tg+wg>>2]*u[tg+vg>>2],(0|xg)!=(0|(sg=sg+1|0)););if(!((0|xg)<1)){for(yg=q[a+156>>2],vg=q[a+120>>2],wg=q[a+136>>2],sg=0;u[(tg=sg<<2)+yg>>2]=u[tg+wg>>2]*u[tg+vg>>2],(0|xg)!=(0|(sg=sg+1|0)););if(!((0|xg)<1)){for(yg=q[a+160>>2],vg=q[a+120>>2],wg=q[a+140>>2],sg=0;u[(tg=sg<<2)+yg>>2]=u[tg+wg>>2]*u[tg+vg>>2],(0|xg)!=(0|(sg=sg+1|0)););if(!((0|xg)<1))for(yg=q[a+164>>2],vg=q[a+120>>2],wg=q[a+144>>2],sg=0;u[(tg=sg<<2)+yg>>2]=u[tg+wg>>2]*u[tg+vg>>2],(0|xg)!=(0|(sg=sg+1|0)););}}}}if(1<=(0|Dg))for(yg=q[a+112>>2],wg=0;;){if(q[Cg>>2]){b:{c:{d:{e:{if((0|(tg=q[q[a+116>>2]+(zg<<2)>>2]))<=0)q[4+((zg<<5)+Ag|0)>>2]=0;else{for(Bg=tg+wg|0,vg=q[a+148>>2],ug=x(0),sg=wg;ug=x(ug+u[vg+(sg<<2)>>2]),(0|(sg=sg+1|0))<(0|Bg););if(u[4+(xg=(zg<<5)+Ag|0)>>2]=ug,!(tg=(0|tg)<1)){for(vg=q[a+152>>2],ug=x(0),sg=wg;ug=x(ug+u[vg+(sg<<2)>>2]),(0|(sg=sg+1|0))<(0|Bg););if(u[xg+20>>2]=ug,tg)break e;for(vg=q[a+156>>2],ug=x(0),sg=wg;ug=x(ug+u[vg+(sg<<2)>>2]),(0|(sg=sg+1|0))<(0|Bg););if(u[xg+12>>2]=ug,tg)break d;for(vg=q[a+160>>2],ug=x(0),sg=wg;ug=x(ug+u[vg+(sg<<2)>>2]),(0|(sg=sg+1|0))<(0|Bg););if(u[xg+16>>2]=ug,tg)break c;for(vg=q[a+164>>2],ug=x(0),sg=wg;ug=x(ug+u[vg+(sg<<2)>>2]),(0|(sg=sg+1|0))<(0|Bg););break b}}q[20+((zg<<5)+Ag|0)>>2]=0}q[12+((zg<<5)+Ag|0)>>2]=0}q[16+((zg<<5)+Ag|0)>>2]=0}ug=x(0)}u[8+((zg<<5)+Ag|0)>>2]=ug}if(Cg=Cg+4|0,wg=q[yg+(zg<<2)>>2]+wg|0,(0|Dg)==(0|(zg=zg+1|0)))break}},n[9]=function(a){a|=0;var ce,Wd=0,Xd=0,Yd=0,Zd=0,_d=0,$d=x(0),ae=0,be=0,de=0,ee=0;if(ce=q[a+340>>2],1<=(0|(Yd=q[a+360>>2])))for(ae=q[a+368>>2],be=q[a+356>>2],Xd=q[a+364>>2];u[(Zd=Wd<<2)+ae>>2]=u[Xd+Zd>>2]*u[Zd+be>>2],(0|Yd)!=(0|(Wd=Wd+1|0)););if(1<=(0|ce))for(de=q[a+348>>2],ee=q[a+344>>2],Zd=q[a+352>>2],Xd=0;;){if((0|(Wd=q[(Yd=_d<<2)+Zd>>2]))<1)$d=x(0);else for(ae=Wd+Xd|0,be=q[a+368>>2],$d=x(0),Wd=Xd;$d=x($d+u[be+(Wd<<2)>>2]),(0|(Wd=Wd+1|0))<(0|ae););if(u[20+(w(_d,24)+ee|0)>>2]=$d,Xd=q[Yd+de>>2]+Xd|0,(0|ce)==(0|(_d=_d+1|0)))break}},n[10]=function(a){var wd=0,xd=0,yd=0,zd=0,Ad=0,Bd=0,Cd=0;if(!(q[380+(a|=0)>>2]||(0|(wd=q[a+200>>2]))<1))for(Bd=(xd=q[a+204>>2])+(wd<<4)|0,wd=q[a+248>>2],zd=q[a+272>>2];;){if(q[wd>>2]&&(a=1,!((0|(yd=q[xd+12>>2]))<1)))for(yd<<=1,Cd=q[zd>>2];u[(Ad=(a<<2)+Cd|0)>>2]=-u[Ad>>2],(0|(a=a+2|0))<(0|yd););if(zd=zd+4|0,wd=wd+4|0,!((xd=xd+16|0)>>>0<Bd>>>0))break}},n[11]=function(a,Hc,pd){Hc|=0,pd|=0;var rd,qd=0;return fa(rd=q[20+(a|=0)>>2],Hc,qd=pd>>>0<(qd=q[a+16>>2]-rd|0)>>>0?pd:qd),q[a+20>>2]=qd+q[a+20>>2],0|pd},n[12]=function(a){return 0},n[13]=function(a,Hc,id){Hc|=0,id|=0;var kd,jd=0,ld=0,md=0,nd=0,od=0;for(L=kd=L-32|0,jd=q[28+(a|=0)>>2],q[16+kd>>2]=jd,md=q[a+20>>2],q[28+kd>>2]=id,q[24+kd>>2]=Hc,Hc=md-jd|0,md=(q[20+kd>>2]=Hc)+id|0,nd=2,Hc=16+kd|0;;){a:{if((ld=(jd=0)|K(q[a+60>>2],0|Hc,0|nd,12+kd|0))&&(q[1906]=ld,jd=-1),(0|(jd=jd?q[12+kd>>2]=-1:q[12+kd>>2]))!=(0|md)){if(-1<(0|jd))break a;q[a+28>>2]=0,q[a+16>>2]=0,q[a+20>>2]=0,q[a>>2]=32|q[a>>2],2!=((a=0)|nd)&&(a=id-q[Hc+4>>2]|0)}else Hc=q[a+44>>2],q[a+28>>2]=Hc,q[a+20>>2]=Hc,q[a+16>>2]=Hc+q[a+48>>2],a=id;return L=32+kd|0,0|a}ld=jd-((od=(ld=q[Hc+4>>2])>>>0<jd>>>0)?ld:0)|0,q[(Hc=od?Hc+8|0:Hc)>>2]=ld+q[Hc>>2],q[Hc+4>>2]=q[Hc+4>>2]-ld,md=md-jd|0,nd=nd-od|0}},n[14]=function(a,Hc,id,jd){return M=0},n[15]=function(a,Wb,Hc,Ic,Jc,Kc){a|=0,Wb=+Wb,Hc|=0,Ic|=0,Jc|=0,Kc|=0;var Pc,$c,fd,Lc=0,Mc=0,Nc=0,Oc=0,Qc=0,Rc=0,Sc=0,Tc=0,Uc=0,Vc=0,Wc=0,Xc=0,Yc=0,Zc=0,_c=0,ad=0,bd=0;if(q[44+(L=Pc=L-560|0)>>2]=0,h(+Wb),Lc=0|e(1),fd=4294967295<e(0)>>>0?0:1,$c=(0|Lc)<-1||(0|Lc)<=-1&&fd?(h(+(Wb=-Wb)),Lc=0|e(1),e(0),_c=1,3184):2048&Jc?(_c=1,3187):(_c=1&Jc)?3190:3185,2146435072!=(2146435072&Lc))if(Wb=function na(a,pa){var ra,sa,qa=0;if(h(+a),qa=0|e(1),ra=0|e(0),2047!=(0|(qa=(sa=qa)>>>20&2047))){if(!qa)return qa=pa,pa=0==a?0:(a=na(0x10000000000000000*a,pa),q[pa>>2]+-64|0),q[qa>>2]=pa,a;q[pa>>2]=qa+-1022,f(0,0|ra),f(1,-2146435073&sa|1071644672),a=+g()}return a}(Wb,44+Pc|0),0!=(Wb+=Wb)&&(q[44+Pc>>2]=q[44+Pc>>2]+-1),Xc=16+Pc|0,97!=(0|(ad=32|Kc))){for(Lc=(0|Ic)<0,0!=Wb?(Oc=q[44+Pc>>2]+-28|0,q[44+Pc>>2]=Oc,Wb*=268435456):Oc=q[44+Pc>>2],Sc=Lc?6:Ic,Nc=Vc=(0|Oc)<0?48+Pc|0:336+Pc|0;Lc=Wb<4294967296&0<=Wb?~~Wb>>>0:0,Nc=(Ic=Nc)+4|0,0!=(Wb=1e9*(Wb-((q[Ic>>2]=Lc)>>>0))););if((0|Oc)<1)Lc=Nc,Mc=Vc;else for(Mc=Vc;;){if(Uc=(0|Oc)<29?Oc:29,!((Lc=Nc+-4|0)>>>0<Mc>>>0)){for(Ic=Uc,Tc=0;Rc=0,bd=Tc,Tc=q[(Wc=Lc)>>2],Qc=31&Ic,Qc=32<=(63&Ic)>>>0?(Oc=Tc<<Qc,0):(Oc=(1<<Qc)-1&Tc>>>32-Qc,Tc<<Qc),Rc=Oc+Rc|0,Rc=(Tc=bd+Qc|0)>>>0<Qc>>>0?Rc+1|0:Rc,bd=Wc,Wc=gc(Tc=hc(Qc=Tc,Rc,1e9),M,1e9),q[bd>>2]=Qc-Wc,Mc>>>0<=(Lc=Lc+-4|0)>>>0;);(Ic=Tc)&&(q[(Mc=Mc+-4|0)>>2]=Ic)}for(;Mc>>>0<(Lc=Nc)>>>0&&!q[(Nc=Lc+-4|0)>>2];);if(Oc=q[44+Pc>>2]-Uc|0,Nc=Lc,!(0<(0|(q[44+Pc>>2]=Oc))))break}if((0|Oc)<=-1)for(Zc=1+((Sc+25|0)/9|0)|0,Uc=102==(0|ad);;){if(Tc=(0|Oc)<-9?9:0-Oc|0,Lc>>>0<=Mc>>>0)Mc=q[Mc>>2]?Mc:Mc+4|0;else{for(Wc=1e9>>>Tc,Qc=-1<<Tc^-1,Oc=0,Nc=Mc;Ic=q[Nc>>2],q[Nc>>2]=(Ic>>>Tc)+Oc,Oc=w(Wc,Ic&Qc),(Nc=Nc+4|0)>>>0<Lc>>>0;);Mc=q[Mc>>2]?Mc:Mc+4|0,Oc&&(q[Lc>>2]=Oc,Lc=Lc+4|0)}if(Oc=Tc+q[44+Pc>>2]|0,Lc=(0|Zc)<Lc-(Ic=Uc?Vc:Mc)>>2?Ic+(Zc<<2)|0:Lc,!((0|(q[44+Pc>>2]=Oc))<0))break}if(!(Lc>>>(Nc=0)<=Mc>>>0||(Nc=w(Vc-Mc>>2,9),Oc=10,(Ic=q[Mc>>2])>>>0<10)))for(;Nc=Nc+1|0,(Oc=w(Oc,10))>>>0<=Ic>>>0;);if((0|(Ic=(Sc-(102==(0|ad)?0:Nc)|0)-(103==(0|ad)&0!=(0|Sc))|0))<(w(Lc-Vc>>2,9)+-9|0)){if(Rc=(Vc+((Ic=(0|(Qc=Ic+9216|0))/9|0)<<2)|0)-4092|0,Oc=10,(0|(Ic=1+(Qc-w(Ic,9)|0)|0))<=8)for(;Oc=w(Oc,10),9!=(0|(Ic=Ic+1|0)););if(Zc=Rc+4|0,((Uc=(Wc=q[Rc>>2])-w(Oc,Qc=(Wc>>>0)/(Oc>>>0)|0)|0)||(0|Zc)!=(0|Lc))&&(Yc=Uc>>>0<(Ic=Oc>>>1)>>>0?.5:(0|Lc)==(0|Zc)&&(0|Ic)==(0|Uc)?1:1.5,Wb=1&Qc?9007199254740994:9007199254740992,!_c|45!=r[0|$c]||(Yc=-Yc,Wb=-Wb),Ic=Wc-Uc|0,q[Rc>>2]=Ic,Wb+Yc!=Wb)){if(Ic=Ic+Oc|0,1e9<=(q[Rc>>2]=Ic)>>>0)for(;(Rc=Rc+-4|(q[Rc>>2]=0))>>>0<Mc>>>0&&(q[(Mc=Mc+-4|0)>>2]=0),Ic=q[Rc>>2]+1|0,999999999<(q[Rc>>2]=Ic)>>>0;);if(Nc=w(Vc-Mc>>2,9),Oc=10,!((Ic=q[Mc>>2])>>>0<10))for(;Nc=Nc+1|0,(Oc=w(Oc,10))>>>0<=Ic>>>0;);}Lc=(Ic=Rc+4|0)>>>0<Lc>>>0?Ic:Lc}j:{for(;;){if((Uc=Lc)>>>(Wc=0)<=Mc>>>0)break j;if(q[(Lc=Uc+-4|0)>>2])break}Wc=1}if(103==(0|ad)){if(Sc=((Ic=(0|Nc)<(0|(Lc=Sc||1))&-5<(0|Nc))?-1^Nc:-1)+Lc|0,Kc=(Ic?-1:-2)+Kc|0,!(Qc=8&Jc)){if(Lc=9,Wc&&(Qc=q[Uc+-4>>2])&&!((Qc>>>(Lc=0))%(Ic=10)))for(;Lc=Lc+1|0,!((Qc>>>0)%((Ic=w(Ic,10))>>>0)););Ic=w(Uc-Vc>>2,9)+-9|0,Sc=102!=(32|Kc)?((Qc=0)|Sc)<(0|(Ic=0<(0|(Ic=(Ic+Nc|0)-Lc|0))?Ic:0))?Sc:Ic:((Qc=0)|Sc)<(0|(Ic=0<(0|(Ic=Ic-Lc|0))?Ic:0))?Sc:Ic}}else Qc=8&Jc;if(Rc=0!=(0|(Oc=Sc|Qc)),Ic=a,bd=Hc,Lc=0<(0|Nc)?Nc:0,102!=(0|(Tc=32|Kc))){if((Xc-(Lc=ea((Lc=Nc>>31)+Nc^Lc,0,Xc))|0)<=1)for(;o[0|(Lc=Lc+-1|0)]=48,(Xc-Lc|0)<2;);o[0|(Zc=Lc+-2|0)]=Kc,o[Lc+-1|0]=(0|Nc)<0?45:43,Lc=Xc-Zc|0}if(_(Ic,32,bd,Rc=1+(Lc+(Rc+(Sc+_c|0)|0)|0)|0,Jc),Z(a,$c,_c),_(a,48,Hc,Rc,65536^Jc),102!=(0|Tc)){q:if(!((0|Sc)<0))for(Kc=Wc?Uc:Mc+4|0,Ic=16+Pc|8,Vc=16+Pc|9,Nc=Mc;;){(0|Vc)==(0|(Lc=ea(q[Nc>>2],0,Vc)))&&(o[24+Pc|0]=48,Lc=Ic);r:if((0|Mc)==(0|Nc))Z(a,Lc,1),Lc=Lc+1|0,(0|Sc)<1&&!Qc||Z(a,3219,1);else{if(Lc>>>0<=16+Pc>>>0)break r;for(;o[0|(Lc=Lc+-1|0)]=48,16+Pc>>>0<Lc>>>0;);}if(Z(a,Tc=Lc,(0|(Lc=Vc-Lc|0))<(0|Sc)?Lc:Sc),Sc=Sc-Lc|0,Kc>>>0<=(Nc=Nc+4|0)>>>0)break q;if(!(-1<(0|Sc)))break}_(a,48,Sc+18|0,18,0),Z(a,Zc,Xc-Zc|0)}else{for(Ic=16+Pc|8,Nc=16+Pc|9,Mc=Kc=Vc>>>0<Mc>>>0?Vc:Mc;;){Lc=ea(q[Mc>>2],0,Nc);o:if((0|Kc)==(0|Mc))(0|Lc)==(0|Nc)&&(o[24+Pc|0]=48,Lc=Ic);else{if(Lc>>>0<=16+Pc>>>0)break o;for(;o[0|(Lc=Lc+-1|0)]=48,16+Pc>>>0<Lc>>>0;);}if(Z(a,Lc,Nc-Lc|0),!((Mc=Mc+4|0)>>>0<=Vc>>>0))break}Oc&&Z(a,3219,1);p:if(!((0|Sc)<1|Uc>>>0<=Mc>>>0))for(;;){if(16+Pc>>>0<(Lc=ea(q[Mc>>2],0,Nc))>>>0)for(;o[0|(Lc=Lc+-1|0)]=48,16+Pc>>>0<Lc>>>0;);if(Z(a,Lc,(0|Sc)<9?Sc:9),Sc=Sc+-9|0,Uc>>>0<=(Mc=Mc+4|0)>>>0)break p;if(!(0<(0|Sc)))break}_(a,48,Sc+9|0,9,0)}}else{if(Wc=(Vc=32&Kc)?9+$c|0:$c,!(11<Ic>>>0)&&(Lc=12-Ic|0)){for(Yc=8;Yc*=16,Lc=Lc+-1|0;);Wb=45!=r[0|Wc]?Wb+Yc-Yc:-(Yc+(-Wb-Yc))}for((0|Xc)==(0|(Lc=ea((Nc=(Lc=q[44+Pc>>2])>>31)^Lc+Nc,0,Xc)))&&(o[15+Pc|0]=48,Lc=15+Pc|0),Qc=2|_c,Nc=q[44+Pc>>2],o[0|(Uc=Lc+-2|0)]=Kc+15,o[Lc+-1|0]=(0|Nc)<0?45:43,Lc=8&Jc,Mc=16+Pc|0;Kc=Mc,Tc=Vc,Nc=y(Wb)<2147483648?~~Wb:-2147483648,o[0|Mc]=Tc|r[Nc+3168|0],1!=((Mc=Kc+1|0)-(16+Pc|0)|0)|(0==(Wb=16*(Wb-(0|Nc)))?!(Lc|0<(0|Ic)):0)||(o[Kc+1|0]=46,Mc=Kc+2|0),0!=Wb;);_(a,32,Hc,Rc=(Kc=!Ic|(0|Ic)<=((Mc-Pc|0)-18|0)?((Xc-(16+Pc|0)|0)-Uc|0)+Mc|0:2+((Ic+Xc|0)-Uc|0)|0)+Qc|0,Jc),Z(a,Wc,Qc),_(a,48,Hc,Rc,65536^Jc),Z(a,16+Pc|0,Ic=Mc-(16+Pc|0)|0),_(a,48,Kc-((Lc=Ic)+(Ic=Xc-Uc|0)|0)|0,0,0),Z(a,Uc,Ic)}else _(a,32,Hc,Rc=_c+3|0,-65537&Jc),Z(a,$c,_c),Ic=Kc>>>5&1,Z(a,Wb!=Wb?Ic?3211:3215:Ic?3203:3207,3);return _(a,32,Hc,Rc,8192^Jc),L=560+Pc|0,0|((0|Rc)<(0|Hc)?Hc:Rc)},n[16]=function(a,Wb){var wc,Fc,Gc;a|=0,Wb=q[(wc=Wb|=0)>>2]+15&-16,q[wc>>2]=Wb+16,Fc=a,Gc=function(a,Wb,Xb,nc){var qc,sc,tc,uc,oc=0,pc=0,rc=0;L=qc=L-32|0,oc=(sc=oc=2147483647&nc)-1006698496|0,(pc=rc=Xb)>>>0<0&&(oc=oc+1|0),tc=pc,pc=oc,oc=sc-1140785152|0,(uc=rc)>>>0<0&&(oc=oc+1|0);a:if((0|oc)==(0|pc)&tc>>>0<uc>>>0|pc>>>0<oc>>>0){if(oc=nc<<4|Xb>>>28,Xb=Xb<<4|Wb>>>28,134217728==(0|(rc=Wb&=268435455))&1<=a>>>0|134217728<Wb>>>0){oc=oc+1073741824|0,(a=Xb+1|0)>>>0<1&&(oc=oc+1|0),pc=a;break a}if(oc=oc-(((pc=Xb)>>>0<0)+-1073741824|0)|0,a|134217728^rc)break a;(a=pc+(1&pc)|0)>>>0<pc>>>0&&(oc=oc+1|0),pc=a}else(!rc&2147418112==(0|sc)?!(a|Wb):2147418112==(0|sc)&rc>>>0<0|sc>>>0<2147418112)?(oc=2146435072,1140785151==((pc=0)|sc)&4294967295<rc>>>0|1140785151<sc>>>0||(rc=sc>>>16)>>>(oc=0)<15249||(function(a,Wb,Xb,nc,vc,wc){var Bc=0,Cc=0,Dc=0,Ec=0;a:if(64&wc)Wb=31&(Xb=wc-64|0),Wb=32<=(63&Xb)>>>0?(Xb=0,vc>>>Wb):(Xb=vc>>>Wb,((1<<Wb)-1&vc)<<32-Wb|nc>>>Wb),vc=nc=0;else{if(!wc)break a;Cc=vc,Dc=nc,Bc=31&(Ec=64-wc|0),Ec=32<=(63&Ec)>>>0?(Cc=Dc<<Bc,0):(Cc=(1<<Bc)-1&Dc>>>32-Bc|Cc<<Bc,Dc<<Bc),Dc=Wb,Wb=31&(Bc=wc),Wb=32<=(63&Bc)>>>0?(Bc=0,Xb>>>Wb):(Bc=Xb>>>Wb,((1<<Wb)-1&Xb)<<32-Wb|Dc>>>Wb),Wb|=Ec,Xb=Bc|Cc,Bc=nc,nc=31&wc,nc=32<=(63&wc)>>>0?(Cc=0,vc>>>nc):(Cc=vc>>>nc,((1<<nc)-1&vc)<<32-nc|Bc>>>nc),vc=Cc}q[a>>2]=Wb,q[4+a>>2]=Xb,q[8+a>>2]=nc,q[12+a>>2]=vc}(qc,a,Wb,Xb,oc=65535&nc|65536,15361-rc|0),function(a,Wb,Xb,nc,vc,wc){var xc=0,yc=0,zc=0,Ac=0;64&wc?(nc=Wb,Wb=31&(vc=wc+-64|0),32<=(63&vc)>>>0?(vc=nc<<Wb,nc=0):(vc=(1<<Wb)-1&nc>>>32-Wb|Xb<<Wb,nc<<=Wb),Xb=Wb=0):wc&&(xc=nc,nc=31&(zc=wc),Ac=32<=(63&wc)>>>0?(yc=xc<<nc,0):(yc=(1<<nc)-1&xc>>>32-nc|vc<<nc,xc<<nc),nc=Xb,xc=Wb,vc=31&(wc=64-wc|0),32<=(63&wc)>>>0?(wc=0,nc>>>=vc):(wc=nc>>>vc,nc=((1<<vc)-1&nc)<<32-vc|xc>>>vc),nc|=Ac,vc=wc|yc,wc=Wb,Wb=31&zc,Wb=32<=(63&zc)>>>0?(yc=wc<<Wb,0):(yc=(1<<Wb)-1&wc>>>32-Wb|Xb<<Wb,wc<<Wb),Xb=yc),q[a>>2]=Wb,q[4+a>>2]=Xb,q[8+a>>2]=nc,q[12+a>>2]=vc}(16+qc|0,a,Wb,Xb,oc,rc+-15233|0),Xb=q[4+qc>>2],a=q[8+qc>>2],oc=q[12+qc>>2]<<4|a>>>28,pc=a<<4|Xb>>>28,134217728==(0|(Xb=a=268435455&Xb))&1<=(Wb=q[qc>>2]|0!=(q[16+qc>>2]|q[24+qc>>2])|0!=(q[20+qc>>2]|q[28+qc>>2]))>>>0|134217728<a>>>0?((a=pc+1|0)>>>0<1&&(oc=oc+1|0),pc=a):Wb|134217728^Xb||((a=pc+(1&pc)|0)>>>0<pc>>>0&&(oc=oc+1|0),pc=a))):(pc=Xb<<4|Wb>>>28,oc=524287&(oc=nc<<4|Xb>>>28)|2146959360);return L=32+qc|0,f(0,0|pc),f(1,-2147483648&nc|oc),+g()}(q[Wb>>2],q[Wb+4>>2],q[Wb+8>>2],q[Wb+12>>2]),v[Fc>>3]=Gc},{d:function(){},e:function(){return 67108864},f:function(){return 3},g:function(a,Wb){return Wb|=0,L=Wb=L-16|0,a=(a|=0)?ma(a)?(Y(4,1533,0),0):r[a+4|0]:(q[Wb+4>>2]=1246,q[Wb>>2]=1671,Y(4,1087,Wb),0),L=Wb+16|0,0|a},h:function(a){a|=0,q[1641]=a},i:function(a,ri){var ti;return ri|=0,L=ti=L-48|0,a=(a|=0)?(a+63&-64)==(0|a)?(ri+63&-64)==(0|ri)&&ri?function(a){var Xe,se=0,te=0,Le=0,Ye=0,Ze=0,_e=0,$e=0,af=0,bf=0,cf=0;if(q[24+(L=Xe=L-32|0)>>2]=0,q[16+Xe>>2]=4,function(a){var vd;sa(16+(L=vd=L-272|0)|0,1611,q[12+vd>>2]=a),function(a){var ud;q[(L=ud=L-16|0)>>2]=a,function(a,Hc){var id;ra(a,1176,q[12+(L=id=L-16|0)>>2]=Hc,0,0),L=16+id|0}(q[670],ud),L=16+ud|0}(16+vd|0),L=272+vd|0}(16+Xe|(q[20+Xe>>2]=0)),ma(a))Y(4,1183,0),a=0;else if(4<=(te=r[a+4|0])>>>0)q[4+Xe>>2]=te,q[Xe>>2]=3,Y(4,1332,Xe),a=0;else{for(1!=(0|(Ye=!r[a+5|0]))&&(ca(a+4|0,1),X(a- -64|0,4,160),o[a+5|0]=0),se=a- -64|0,Le=102,te=a+704|0;q[te>>2]=q[se>>2]+a,te=te+4|0,se=se+4|0,Le=Le+-1|0;);if(1!=(0|Ye)&&(te=r[a+4|0],X(q[a+704>>2],4,32),ca(q[a+708>>2],4),ca(q[a+708>>2]+4|0,4),ca(q[a+708>>2]+8|0,4),ca(q[a+708>>2]+12|0,4),ca(q[a+708>>2]+16|0,4),ca(q[a+708>>2]+20|0,1),X(q[a+720>>2],4,q[q[a+704>>2]>>2]),X(q[a+724>>2],4,q[q[a+704>>2]>>2]),X(q[a+728>>2],4,q[q[a+704>>2]>>2]),X(q[a+732>>2],4,q[q[a+704>>2]>>2]),X(q[a+736>>2],4,q[q[a+704>>2]>>2]),X(q[a+740>>2],4,q[q[a+704>>2]>>2]),X(q[a+752>>2],4,q[q[a+704>>2]+4>>2]),X(q[a+756>>2],4,q[q[a+704>>2]+4>>2]),X(q[a+760>>2],4,q[q[a+704>>2]+4>>2]),X(q[a+764>>2],4,q[q[a+704>>2]+4>>2]),X(q[a+768>>2],4,q[q[a+704>>2]+4>>2]),X(q[a+772>>2],4,q[q[a+704>>2]+4>>2]),X(q[a+776>>2],4,q[q[a+704>>2]+4>>2]),X(q[a+780>>2],4,q[q[a+704>>2]+8>>2]),X(q[a+784>>2],4,q[q[a+704>>2]+8>>2]),X(q[a+788>>2],4,q[q[a+704>>2]+8>>2]),X(q[a+792>>2],4,q[q[a+704>>2]+8>>2]),X(q[a+796>>2],4,q[q[a+704>>2]+8>>2]),X(q[a+800>>2],4,q[q[a+704>>2]+8>>2]),X(q[a+804>>2],4,q[q[a+704>>2]+12>>2]),X(q[a+808>>2],4,q[q[a+704>>2]+12>>2]),X(q[a+812>>2],4,q[q[a+704>>2]+12>>2]),X(q[a+816>>2],4,q[q[a+704>>2]+12>>2]),X(q[a+840>>2],4,q[q[a+704>>2]+16>>2]),X(q[a+844>>2],4,q[q[a+704>>2]+16>>2]),X(q[a+848>>2],4,q[q[a+704>>2]+16>>2]),X(q[a+852>>2],4,q[q[a+704>>2]+16>>2]),X(q[a+856>>2],4,q[q[a+704>>2]+16>>2]),X(q[a+860>>2],4,q[q[a+704>>2]+16>>2]),X(q[a+864>>2],4,q[q[a+704>>2]+16>>2]),X(q[a+868>>2],4,q[q[a+704>>2]+16>>2]),X(q[a+872>>2],1,q[q[a+704>>2]+16>>2]),X(q[a+876>>2],4,q[q[a+704>>2]+16>>2]),X(q[a+880>>2],4,q[q[a+704>>2]+16>>2]),X(q[a+884>>2],4,q[q[a+704>>2]+16>>2]),X(q[a+888>>2],4,q[q[a+704>>2]+16>>2]),X(q[a+892>>2],4,q[q[a+704>>2]+16>>2]),X(q[a+896>>2],4,q[q[a+704>>2]+16>>2]),X(q[a+908>>2],4,q[q[a+704>>2]+20>>2]),X(q[a+912>>2],4,q[q[a+704>>2]+20>>2]),X(q[a+916>>2],4,q[q[a+704>>2]+20>>2]),X(q[a+920>>2],4,q[q[a+704>>2]+20>>2]),X(q[a+924>>2],4,q[q[a+704>>2]+20>>2]),X(q[a+928>>2],4,q[q[a+704>>2]+20>>2]),X(q[a+932>>2],4,q[q[a+704>>2]+20>>2]),X(q[a+936>>2],4,q[q[a+704>>2]+24>>2]),X(q[a+940>>2],4,q[q[a+704>>2]+28>>2]),X(q[a+944>>2],4,q[q[a+704>>2]+28>>2]),X(q[a+948>>2],4,q[q[a+704>>2]+32>>2]),X(q[a+952>>2],4,q[q[a+704>>2]+32>>2]),X(q[a+956>>2],4,q[q[a+704>>2]+32>>2]),X(q[a+960>>2],4,q[q[a+704>>2]+32>>2]),X(q[a+964>>2],4,q[q[a+704>>2]+32>>2]),X(q[a+968>>2],4,q[q[a+704>>2]+32>>2]),X(q[a+972>>2],4,q[q[a+704>>2]+32>>2]),X(q[a+976>>2],4,q[q[a+704>>2]+36>>2]),X(q[a+980>>2],4,q[q[a+704>>2]+36>>2]),X(q[a+984>>2],4,q[q[a+704>>2]+36>>2]),X(q[a+988>>2],4,q[q[a+704>>2]+40>>2]),X(q[a+992>>2],4,q[q[a+704>>2]+44>>2]),X(q[a+996>>2],4,q[q[a+704>>2]+48>>2]),X(q[a+1e3>>2],4,q[q[a+704>>2]+48>>2]),X(q[a+1004>>2],4,q[q[a+704>>2]+52>>2]),X(q[a+1008>>2],4,q[q[a+704>>2]+52>>2]),X(q[a+1012>>2],4,q[q[a+704>>2]+56>>2]),X(q[a+1016>>2],4,q[q[a+704>>2]+60>>2]),X(q[a+1020>>2],2,q[q[a+704>>2]+64>>2]),X(q[a+1024>>2],4,q[q[a+704>>2]+68>>2]),X(q[a+1028>>2],4,q[q[a+704>>2]+72>>2]),X(q[a+1032>>2],4,q[q[a+704>>2]+72>>2]),X(q[a+1036>>2],4,q[q[a+704>>2]+72>>2]),X(q[a+1040>>2],4,q[q[a+704>>2]+72>>2]),X(q[a+1044>>2],4,q[q[a+704>>2]+72>>2]),X(q[a+1048>>2],4,q[q[a+704>>2]+76>>2]),X(q[a+1052>>2],4,q[q[a+704>>2]+76>>2]),X(q[a+1056>>2],4,q[q[a+704>>2]+76>>2]),X(q[a+1068>>2],4,q[q[a+704>>2]+80>>2]),X(q[a+1072>>2],4,q[q[a+704>>2]+80>>2]),X(q[a+1076>>2],4,q[q[a+704>>2]+80>>2]),X(q[a+1080>>2],4,q[q[a+704>>2]+80>>2]),X(q[a+1084>>2],4,q[q[a+704>>2]+80>>2]),X(q[a+1088>>2],4,q[q[a+704>>2]+80>>2]),X(q[a+1092>>2],4,q[q[a+704>>2]+80>>2]),X(q[a+1096>>2],4,q[q[a+704>>2]+84>>2]),X(q[a+1100>>2],2,q[q[a+704>>2]+84>>2]),X(q[a+1104>>2],4,q[q[a+704>>2]+88>>2]),te>>>0<2||X(q[a+1108>>2],4,q[q[a+704>>2]+8>>2])),q[1643]=5,q[1642]=6,q[1644]=7,q[1645]=8,q[1646]=9,q[1647]=10,se=q[a+704>>2],1<=q[se>>2])for(te=0;q[q[a+712>>2]+(te<<2)>>2]=q[a+716>>2]+(te<<6),te=te+1|0,se=q[a+704>>2],(0|te)<q[se>>2];);if(1<=q[se+4>>2])for(te=0;q[q[a+744>>2]+(te<<2)>>2]=q[a+748>>2]+(te<<6),te=te+1|0,se=q[a+704>>2],(0|te)<q[se+4>>2];);if(1<=q[se+16>>2])for(te=0;q[(se=te<<2)+q[a+820>>2]>>2]=q[a+836>>2]+(te<<6),q[se+q[a+824>>2]>>2]=q[a+1016>>2]+(q[se+q[a+880>>2]>>2]<<2),q[se+q[a+828>>2]>>2]=q[a+1020>>2]+(q[se+q[a+884>>2]>>2]<<1),q[se+q[a+832>>2]>>2]=q[a+1024>>2]+(q[se+q[a+892>>2]>>2]<<2),te=te+1|0,se=q[a+704>>2],(0|te)<q[se+16>>2];);if(1<=q[se+20>>2])for(te=0;q[q[a+900>>2]+(te<<2)>>2]=q[a+904>>2]+(te<<6),te=te+1|0,se=q[a+704>>2],(0|te)<q[se+20>>2];);if(1<=q[se+80>>2])for(te=0;q[q[a+1060>>2]+(te<<2)>>2]=q[a+1064>>2]+(te<<6),te=te+1|0,se=q[a+704>>2],(0|te)<q[se+80>>2];);if(!(1&o[q[a+708>>2]+20|0]||(0|(Ye=q[se+16>>2]))<1)){for(_e=q[a+888>>2],$e=q[a+884>>2],Ze=q[a+1020>>2],te=0;;){if(0<(0|(af=q[(se=te<<2)+_e>>2]+-1|0)))for(bf=Ze+(q[se+$e>>2]<<1)|0,se=0;cf=s[(Le=(se<<1)+bf|0)>>1],p[Le>>1]=s[Le+4>>1],p[Le+4>>1]=cf,(0|(se=se+3|0))<(0|af););if((0|Ye)==(0|(te=te+1|0)))break}for(te=q[a+876>>2],_e=q[a+880>>2],$e=q[a+1016>>2],Le=0;;){if(1<=(0|(Ze=q[(se=Le<<2)+te>>2])))for(Ze=(se=$e+(q[se+_e>>2]<<2)|0)+(Ze<<3)|0,se=se+4|0;u[se>>2]=x(1)-u[se>>2],(se=se+8|0)>>>0<Ze>>>0;);if((0|Ye)==(0|(Le=Le+1|0)))break}}}return L=32+Xe|0,a}(a):(q[20+ti>>2]=1592,q[16+ti>>2]=1688,Y(4,1087,16+ti|0),0):(q[36+ti>>2]=1441,q[32+ti>>2]=1688,Y(4,1087,32+ti|0),0):(q[4+ti>>2]=1246,q[ti>>2]=1688,Y(4,1087,ti),0),L=48+ti|0,0|a},j:function(a,$h,ai,bi){var ci;$h|=0,ai|=0,bi|=0,L=ci=L+-64|0,(a|=0)?$h?ai?bi?(a=q[q[a>>2]+708>>2],q[$h>>2]=q[a+12>>2],q[$h+4>>2]=q[a+16>>2],q[ai>>2]=q[a+4>>2],q[ai+4>>2]=q[a+8>>2],q[bi>>2]=q[a>>2]):(q[52+ci>>2]=1782,q[48+ci>>2]=1708,Y(4,1087,48+ci|0)):(q[36+ci>>2]=1753,q[32+ci>>2]=1708,Y(4,1087,32+ci|0)):(q[20+ci>>2]=1726,q[16+ci>>2]=1708,Y(4,1087,16+ci|0)):(q[4+ci>>2]=1651,q[ci>>2]=1708,Y(4,1087,ci)),L=64+ci|0},k:wa,l:va,m:function(a){var _h;L=_h=L-16|0,(a|=0)?ta(a):(q[4+_h>>2]=1651,q[_h>>2]=1890,Y(4,1087,_h)),L=16+_h|0},n:function(a){var Zh;return L=Zh=L-16|0,a=(a|=0)?q[a+292>>2]:(q[4+Zh>>2]=1651,q[Zh>>2]=1905,Y(4,1087,Zh),-1),L=16+Zh|0,0|a},o:function(a){var Yh;return L=Yh=L-16|0,a=(a|=0)?q[q[a>>2]+900>>2]:(q[4+Yh>>2]=1651,q[Yh>>2]=1926,Y(4,1087,Yh),0),L=16+Yh|0,0|a},p:function(a){var Xh;return L=Xh=L-16|0,a=(a|=0)?q[q[a>>2]+912>>2]:(q[4+Xh>>2]=1651,q[Xh>>2]=1945,Y(4,1087,Xh),0),L=16+Xh|0,0|a},q:function(a){var Wh;return L=Wh=L-16|0,a=(a|=0)?q[q[a>>2]+908>>2]:(q[4+Wh>>2]=1651,q[Wh>>2]=1974,Y(4,1087,Wh),0),L=16+Wh|0,0|a},r:function(a){var Vh;return L=Vh=L-16|0,a=(a|=0)?q[q[a>>2]+916>>2]:(q[4+Vh>>2]=1651,q[Vh>>2]=2003,Y(4,1087,Vh),0),L=16+Vh|0,0|a},s:function(a){var Th;return L=Th=L-16|0,a=(a|=0)?q[a+300>>2]:(q[4+Th>>2]=1651,q[Th>>2]=2032,Y(4,1087,Th),0),L=16+Th|0,0|a},t:function(a){var Sh;return L=Sh=L-16|0,a=(a|=0)?q[a+4>>2]:(q[4+Sh>>2]=1651,q[Sh>>2]=2054,Y(4,1087,Sh),-1),L=16+Sh|0,0|a},u:function(a){var Rh;return L=Rh=L-16|0,a=(a|=0)?q[q[a>>2]+712>>2]:(q[4+Rh>>2]=1651,q[Rh>>2]=2070,Y(4,1087,Rh),0),L=16+Rh|0,0|a},v:function(a){var Qh;return L=Qh=L-16|0,a=(a|=0)?q[a+52>>2]:(q[4+Qh>>2]=1651,q[Qh>>2]=2084,Y(4,1087,Qh),0),L=16+Qh|0,0|a},w:function(a){var Ph;return L=Ph=L-16|0,a=(a|=0)?q[q[a>>2]+740>>2]:(q[4+Ph>>2]=1651,q[Ph>>2]=2104,Y(4,1087,Ph),0),L=16+Ph|0,0|a},x:function(a){var Oh;return L=Oh=L-16|0,a=(a|=0)?q[a+200>>2]:(q[4+Oh>>2]=1651,q[Oh>>2]=2132,Y(4,1087,Oh),-1),L=16+Oh|0,0|a},y:function(a){var Nh;return L=Nh=L-16|0,a=(a|=0)?q[q[a>>2]+820>>2]:(q[4+Nh>>2]=1651,q[Nh>>2]=2152,Y(4,1087,Nh),0),L=16+Nh|0,0|a},z:function(a){var Mh;return L=Mh=L-16|0,a=(a|=0)?q[q[a>>2]+872>>2]:(q[4+Mh>>2]=1651,q[Mh>>2]=2170,Y(4,1087,Mh),0),L=16+Mh|0,0|a},A:function(a){var Lh;return L=Lh=L-16|0,a=(a|=0)?q[a+260>>2]:(q[4+Lh>>2]=1651,q[Lh>>2]=2198,Y(4,1087,Lh),0),L=16+Lh|0,0|a},B:function(a){var Kh;return L=Kh=L-16|0,a=(a|=0)?q[q[a>>2]+868>>2]:(q[4+Kh>>2]=1651,q[Kh>>2]=2225,Y(4,1087,Kh),0),L=16+Kh|0,0|a},C:function(a){var Jh;return L=Jh=L-16|0,a=(a|=0)?q[a+268>>2]:(q[4+Jh>>2]=1651,q[Jh>>2]=2254,Y(4,1087,Jh),0),L=16+Jh|0,0|a},D:function(a){var Ih;return L=Ih=L-16|0,a=(a|=0)?q[a+264>>2]:(q[4+Ih>>2]=1651,q[Ih>>2]=2279,Y(4,1087,Ih),0),L=16+Ih|0,0|a},E:function(a){var Hh;return L=Hh=L-16|0,a=(a|=0)?q[a+276>>2]:(q[4+Hh>>2]=1651,q[Hh>>2]=2306,Y(4,1087,Hh),0),L=16+Hh|0,0|a},F:function(a){var Gh;return L=Gh=L-16|0,a=(a|=0)?q[q[a>>2]+896>>2]:(q[4+Gh>>2]=1651,q[Gh>>2]=2330,Y(4,1087,Gh),0),L=16+Gh|0,0|a},G:function(a){var Fh;return L=Fh=L-16|0,a=(a|=0)?q[q[a>>2]+832>>2]:(q[4+Fh>>2]=1651,q[Fh>>2]=2355,Y(4,1087,Fh),0),L=16+Fh|0,0|a},H:function(a){var Eh;return L=Eh=L-16|0,a=(a|=0)?q[q[a>>2]+876>>2]:(q[4+Eh>>2]=1651,q[Eh>>2]=2375,Y(4,1087,Eh),0),L=16+Eh|0,0|a},I:function(a){var Dh;return L=Dh=L-16|0,a=(a|=0)?q[a+272>>2]:(q[4+Dh>>2]=1651,q[Dh>>2]=2402,Y(4,1087,Dh),0),L=16+Dh|0,0|a},J:function(a){var Ch;return L=Ch=L-16|0,a=(a|=0)?q[q[a>>2]+824>>2]:(q[4+Ch>>2]=1651,q[Ch>>2]=2432,Y(4,1087,Ch),0),L=16+Ch|0,0|a},K:function(a){var ih;return L=ih=L-16|0,a=(a|=0)?q[q[a>>2]+888>>2]:(q[4+ih>>2]=1651,q[ih>>2]=2456,Y(4,1087,ih),0),L=16+ih|0,0|a},L:function(a){var hh;return L=hh=L-16|0,a=(a|=0)?q[q[a>>2]+828>>2]:(q[4+hh>>2]=1651,q[hh>>2]=2482,Y(4,1087,hh),0),L=16+hh|0,0|a},M:function(a){var fh;L=fh=L-16|0,(a|=0)?q[a+256>>2]=1:(q[4+fh>>2]=1651,q[fh>>2]=2504,Y(4,1087,fh)),L=16+fh|0},N:function(a){var td;return ya(12+(L=td=L-16|0)|0,64,a|=0),L=16+td|0,q[12+td>>2]},O:function(a){var Hc,pd=0,sd=0;return L=Hc=L-16|0,(a|=0)&&(ya(12+Hc|0,16,sd=wa(a))||(pd=va(a,q[12+Hc>>2],sd))||(za(q[12+Hc>>2]),pd=0)),L=16+Hc|0,0|pd},P:function(a){return 0|ja(a|=0)},Q:function(a){za(a|=0)},R:function(){return 0|L},S:function(a){return 0|(L=L-(a|=0)&-16)},T:function(a){L=a|=0},U:function(a){return 0|function(pagesToAdd){pagesToAdd|=0;var P=0|N(),Q=P+pagesToAdd|0;if(P<Q&&Q<65536){var R=new ArrayBuffer(w(Q,65536)),S=new global.Int8Array(R);S.set(o),o=S,o=new global.Int8Array(R),p=new global.Int16Array(R),q=new global.Int32Array(R),r=new global.Uint8Array(R),s=new global.Uint16Array(R),t=new global.Uint32Array(R),u=new global.Float32Array(R),v=new global.Float64Array(R),buffer=R,m.buffer=R}return P}(0|(a|=0))},V:function(a,$h){$h|=0,n[a|=0]($h)}};function X(a,b,c){var d=0,e=0,f=0;if(c)for(;;){if(c=c+-1|0,a>>>0<(d=(e=a+b|0)-1|0)>>>0)for(;f=r[0|a],o[0|a]=r[0|d],o[0|d]=f,(a=a+1|0)>>>0<(d=d+-1|0)>>>0;);if(a=e,!c)break}}function Y(a,b,c){var g;L=g=L-272|0,t[1640]>a>>>0||(a=q[1641])&&(sa(16+g|0,b,q[12+g>>2]=c),n[a](16+g|0)),L=272+g|0}function Z(a,b,c){32&r[0|a]||function(a,Wb,Hc){var Ic=0,Jc=0,Kc=0;a:{if(!(Ic=q[Hc+16>>2])){if(function(a){var Wb=0;return Wb=r[a+74|0],o[a+74|0]=Wb+-1|Wb,8&(Wb=q[a>>2])?(q[a>>2]=32|Wb,-1):(q[a+4>>2]=0,q[a+8>>2]=0,Wb=q[a+44>>2],q[a+28>>2]=Wb,q[a+20>>2]=Wb,q[a+16>>2]=Wb+q[a+48>>2],0)}(Hc))break a;Ic=q[Hc+16>>2]}if(Ic-(Kc=q[Hc+20>>2])>>>0<Wb>>>0)return n[q[Hc+36>>2]](Hc,a,Wb);b:if(!(o[Hc+75|0]<0)){for(Ic=Wb;;){if(!(Jc=Ic))break b;if(10==r[(Ic=Jc+-1|0)+a|0])break}if(n[q[Hc+36>>2]](Hc,a,Jc)>>>0<Jc>>>0)break a;Wb=Wb-Jc|0,a=a+Jc|0,Kc=q[Hc+20>>2]}fa(Kc,a,Wb),q[Hc+20>>2]=q[Hc+20>>2]+Wb}}(b,c,a)}function _(a,b,c,h,i){var j,k=0,l=0;if(L=j=L-256|0,!(73728&i|(0|c)<=(0|h))){if(ba(j,b,(k=(i=c-h|0)>>>0<256)?i:256),b=a,l=j,!k){for(c=c-h|0;Z(a,j,256),255<(i=i+-256|0)>>>0;);i=255&c}Z(b,l,i)}L=256+j|0}function $(a){var b,c;return x((b=a*a)*b*(c=b*a)*(2718311493989822e-21*b-.00019839334836096632)+(c*(.008333329385889463*b-.16666666641626524)+a))}function aa(a){var h;return x(-.499999997251031*(a*=a)+1+.04166662332373906*(h=a*a)+a*h*(2439044879627741e-20*a-.001388676377460993))}function ba(a,i,m){var n=0,p=0,r=0,s=0;if(m&&(o[(n=a+m|0)-1|0]=i,o[0|a]=i,!(m>>>0<3||(o[n+-2|0]=i,o[a+1|0]=i,o[n+-3|0]=i,o[a+2|0]=i,m>>>0<7||(o[n+-4|0]=i,o[a+3|0]=i,m>>>0<9||(p=(n=0-a&3)+a|0,i=w(255&i,16843009),q[p>>2]=i,q[(n=(m=m-n&-4)+p|0)-4>>2]=i,m>>>0<9||(q[p+8>>2]=i,q[p+4>>2]=i,q[n+-8>>2]=i,q[n+-12>>2]=i,m>>>0<25||(q[p+24>>2]=i,q[p+20>>2]=i,q[p+16>>2]=i,q[p+12>>2]=i,q[n+-16>>2]=i,q[n+-20>>2]=i,q[n+-24>>2]=i,q[n+-28>>2]=i,(m=m-(s=4&p|24)|0)>>>0<32))))))))for(r=n=i,i=p+s|0;q[i+24>>2]=r,q[i+28>>2]=n,q[i+16>>2]=r,q[i+20>>2]=n,q[i+8>>2]=r,q[i+12>>2]=n,q[i>>2]=r,q[i+4>>2]=n,i=i+32|0,31<(m=m+-32|0)>>>0;);return a}function ca(a,i){var m=0;if(a>>>0<(i=(a+i|0)-1|0)>>>0)for(;m=r[0|a],o[0|a]=r[0|i],o[0|i]=m,(a=a+1|0)>>>0<(i=i+-1|0)>>>0;);}function da(a){var o,i;return o=N(),(a=(i=q[2052])+a|0)>>>0<=o<<16>>>0||J(0|a)?(q[2052]=a,i):(q[1906]=48,-1)}function ea(a,q,t){var u=0,v=0,x=0;if(1==(0|q)&a>>>0<0|q>>>0<1)u=a;else for(;v=gc(u=hc(a,q,10),x=v=M,10),o[0|(t=t+-1|0)]=a-v|48,v=9==(0|q)&4294967295<a>>>0|9<q>>>0,a=u,q=x,v;);if(u)for(;a=(u>>>0)/10|0,o[0|(t=t+-1|0)]=u-w(a,10)|48,q=9<u>>>0,u=a,q;);return t}function fa(a,t,w){var y,z=0;if(8192<=w>>>0)I(0|a,0|t,0|w);else{y=a+w|0;a:if(3&(a^t))if(y>>>0<4)w=a;else if((z=y-4|0)>>>0<a>>>0)w=a;else for(w=a;o[0|w]=r[0|t],o[w+1|0]=r[t+1|0],o[w+2|0]=r[t+2|0],o[w+3|0]=r[t+3|0],t=t+4|0,(w=w+4|0)>>>0<=z>>>0;);else{b:if((0|w)<1)w=a;else if(3&a)for(w=a;;){if(o[0|w]=r[0|t],t=t+1|0,y>>>0<=(w=w+1|0)>>>0)break b;if(!(3&w))break}else w=a;if(!((a=-4&y)>>>0<64||(z=a+-64|0)>>>0<w>>>0))for(;q[w>>2]=q[t>>2],q[w+4>>2]=q[t+4>>2],q[w+8>>2]=q[t+8>>2],q[w+12>>2]=q[t+12>>2],q[w+16>>2]=q[t+16>>2],q[w+20>>2]=q[t+20>>2],q[w+24>>2]=q[t+24>>2],q[w+28>>2]=q[t+28>>2],q[w+32>>2]=q[t+32>>2],q[w+36>>2]=q[t+36>>2],q[w+40>>2]=q[t+40>>2],q[w+44>>2]=q[t+44>>2],q[w+48>>2]=q[t+48>>2],q[w+52>>2]=q[t+52>>2],q[w+56>>2]=q[t+56>>2],q[w+60>>2]=q[t+60>>2],t=t- -64|0,(w=w- -64|0)>>>0<=z>>>0;);if(a>>>0<=w>>>0)break a;for(;q[w>>2]=q[t>>2],t=t+4|0,(w=w+4|0)>>>0<a>>>0;);}if(w>>>0<y>>>0)for(;o[0|w]=r[0|t],t=t+1|0,(0|y)!=(0|(w=w+1|0)););}}function ga(a){return a+-48>>>0<10}function ha(a,q){var t=0;a:if(1024<=(0|q)){if(a*=898846567431158e293,(0|(t=q+-1023|0))<1024){q=t;break a}a*=898846567431158e293,q=((0|q)<3069?q:3069)+-2046|0}else-1023<(0|q)||(a*=22250738585072014e-324,q=-1023<(0|(t=q+1022|0))?t:(a*=22250738585072014e-324,(-3066<(0|q)?q:-3066)+2044|0));return f(0,0),f(1,q+1023<<20),a*g()}function ia(a,A,B,C,D,E,F){var G,S,V,H=0,I=0,J=0,K=0,M=0,N=0,O=0,P=0,Q=0,R=0,T=0,U=0;q[76+(L=G=L-80|0)>>2]=A,V=55+G|0,S=56+G|0,A=0;a:{b:{c:for(;;){(0|Q)<0||(Q=(2147483647-Q|0)<(0|A)?(q[1906]=61,-1):A+Q|0);e:{f:{g:{h:{i:{j:{k:{l:{m:{n:{o:{p:{q:{if(K=q[76+G>>2],J=r[0|(A=K)]){for(;;){r:{s:{t:if(H=255&J){if(37!=(0|H))break s;for(J=A;;){if(37!=r[A+1|0])break t;if(H=A+2|0,q[76+G>>2]=H,J=J+1|0,I=r[A+2|0],A=H,37!=(0|I))break}}else J=A;if(A=J-K|0,a&&Z(a,K,A),A)continue c;R=-1,J=1,M=!ga(o[q[76+(H=G)>>2]+1|0]),A=q[76+G>>2],M|36!=r[A+2|0]||(R=o[A+1|0]+-48|0,T=1,J=3),A=J+A|0,q[H+76>>2]=A;u:if(31<(I=(O=o[(J=0)|A])+-32|0)>>>0)H=A;else if(H=A,75913&(I=1<<I))for(;;){if(H=A+1|0,q[76+G>>2]=H,J|=I,31<(I=(O=o[A+1|0])+-32|0)>>>0)break u;if(A=H,!(75913&(I=1<<I)))break}v:if(42!=(0|O)){if((0|(P=qa(76+G|0)))<0)break b;A=q[76+G>>2]}else{if(M=G,ga(o[H+1|0])&&(A=q[76+G>>2],36==r[A+2|0]))q[((o[A+1|0]<<2)+D|0)-192>>2]=10,P=q[((o[A+1|0]<<3)+C|0)-384>>2],T=1,A=A+3|0;else{if(T)break b;P=T=0,a&&(A=q[B>>2],q[B>>2]=A+4,P=q[A>>2]),A=q[76+G>>2]+1|0}if(q[M+76>>2]=A,-1<(0|P))break v;P=0-P|0,J|=8192}I=-1;y:if(46==r[0|A])if(42!=r[A+1|0])q[76+G>>2]=A+1,I=qa(76+G|0),A=q[76+G>>2];else{if(ga(o[A+2|0])&&(A=q[76+G>>2],36==r[A+3|0])){q[((o[A+2|0]<<2)+D|0)-192>>2]=10,I=q[((o[A+2|0]<<3)+C|0)-384>>2],A=A+4|0,q[76+G>>2]=A;break y}if(T)break b;I=a?(A=q[B>>2],q[B>>2]=A+4,q[A>>2]):0,A=q[76+G>>2]+2|0,q[76+G>>2]=A}for(H=0;;){if(U=H,N=-1,57<o[0|A]+-65>>>0)break a;if(O=A+1|0,q[76+G>>2]=O,H=o[0|A],A=O,!((H=r[2639+(H+w(U,58)|0)|0])+-1>>>0<8))break}if(!H)break a;A:{B:{C:{if(19==(0|H)){if((0|R)<=-1)break C;break a}if((0|R)<0)break B;q[(R<<2)+D>>2]=H,H=q[4+(A=(R<<3)+C|0)>>2],q[64+G>>2]=q[A>>2],q[68+G>>2]=H}if(A=0,!a)continue c;break A}if(!a)break e;pa(64+G|0,H,B,F),O=q[76+G>>2]}if(M=-65537&J,J=8192&J?M:J,R=2684,H=S,A=o[O+-1|(N=0)],(O=(A=U&&3==(15&A)?-33&A:A)+-88|0)>>>0<=32)break r;D:{E:{F:{G:{if(6<(M=A+-65|0)>>>0){if(83!=(0|A))break f;if(!I)break G;H=q[64+G>>2];break E}switch(M-1|0){case 1:break F;case 0:case 2:break f;default:break q}}_(a,32,P,A=0,J);break D}q[12+G>>2]=0,q[8+G>>2]=q[64+G>>2],q[64+G>>2]=8+G,I=-1,H=8+G|0}A=0;H:{for(;;){if(!(K=q[H>>2]))break H;if((M=(0|(K=oa(4+G|0,K)))<0)|I-A>>>0<K>>>0)break;if(H=H+4|0,!((A=A+K|0)>>>0<I>>>0))break H}if(N=-1,M)break a}if(_(a,32,P,A,J),A)for(I=0,H=q[64+G>>2];;){if(!(K=q[H>>2]))break D;if((0|A)<(0|(I=(K=oa(4+G|0,K))+I|0)))break D;if(Z(a,4+G|0,K),H=H+4|0,!(I>>>0<A>>>0))break}else A=0}_(a,32,P,A,8192^J),A=(0|A)<(0|P)?P:A;continue c}H=A+1|0,q[76+G>>2]=H,J=r[A+1|0],A=H;continue}break}switch(O-1|0){case 28:break i;case 21:break j;case 23:break l;case 22:break m;case 11:case 16:break n;case 10:break o;case 26:break p;case 8:case 12:case 13:case 14:break q;case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 9:case 15:case 17:case 18:case 19:case 20:case 24:case 25:case 27:case 29:case 30:break f;default:break k}}if(N=Q,a)break a;if(!T)break e;for(A=1;;){if(a=q[(A<<2)+D>>2]){if(pa((A<<3)+C|0,a,B,F),10!=(0|(A=A+(N=1)|0)))continue;break a}break}if(N=1,9<A>>>0)break a;if(N=-1,q[(A<<2)+D>>2])break a;for(;!q[((A=A+1|0)<<2)+D>>2]&&10!=(0|A););N=A>>>0<10?-1:1;break a}A=0|n[E](a,v[64+G>>3],P,I,J,A);continue}H=(A=Ia(K=(A=q[64+G>>2])||2694,I))||I+K|0,J=M,I=A?A-K|0:I;break f}o[55+G|0]=q[64+G>>2],I=1,K=V,J=M;break f}if(A=M=q[68+G>>2],K=q[64+G>>2],(0|A)<-1||(0|A)<=-1&&!(4294967295<K>>>0)){A=0-(A+(0<K>>>0)|0)|0,K=0-K|0,q[64+G>>2]=K,q[68+G>>2]=A,N=1,R=2684;break h}if(2048&J){N=1,R=2685;break h}R=(N=1&J)?2686:2684;break h}if(K=Oa(q[64+G>>2],q[68+G>>2],S),!(8&J))break g;I=(0|(A=S-K|0))<(0|I)?I:A+1|0;break g}I=8<I>>>0?I:8,J|=8,A=120}if(K=Na(q[64+G>>2],q[68+G>>2],S,32&A),!(8&J)|!(q[64+G>>2]|q[68+G>>2]))break g;R=2684+(A>>>4)|0,N=2;break g}if(7<(H=255&U)>>>(A=0))continue;switch(H-1|0){default:case 0:q[q[64+G>>2]>>2]=Q;continue;case 1:H=q[64+G>>2],q[H>>2]=Q,q[H+4>>2]=Q>>31;continue;case 2:p[q[64+G>>2]>>1]=Q;continue;case 3:o[q[64+G>>2]]=Q;continue;case 5:q[q[64+G>>2]>>2]=Q;continue;case 4:continue;case 6:}H=q[64+G>>2],q[H>>2]=Q,q[H+4>>2]=Q>>31;continue}K=q[64+G>>2],A=q[68+G>>2],R=2684}K=ea(K,A,S)}J=-1<(0|I)?-65537&J:J,I=!!((M=A=q[68+G>>2])|(O=q[64+G>>2]))|I?(0|(A=!(M|O)+(S-K|0)|0))<(0|I)?I:A:(K=S,0)}_(a,32,A=(0|P)<(0|(H=(I=(0|I)<(0|(M=H-K|0))?M:I)+N|0))?H:P,H,J),Z(a,R,N),_(a,48,A,H,65536^J),_(a,48,I,M,0),Z(a,K,M),_(a,32,A,H,8192^J);continue}break}N=0;break a}N=-1}return L=80+G|0,N}function ja(a){var Z,w=0,A=0,B=0,C=0,D=0,E=0,F=0,W=0,X=0,Y=0,_=0,$=0;L=Z=L-16|0;a:{b:{c:{d:{e:{f:{g:{h:{i:{j:{k:{if(a>>>0<=244){if(3&(w=(D=q[1923])>>>(a=(E=a>>>0<11?16:a+11&-8)>>>3))){a=(w=q[7740+(C=(A=a+(1&(-1^w))|0)<<3)>>2])+8|0,(0|(B=q[w+8>>2]))!=(0|(C=C+7732|0))?(q[B+12>>2]=C,q[C+8>>2]=B):(_=7692,$=jc(A)&D,q[_>>2]=$),A<<=3,q[w+4>>2]=3|A,q[4+(w=w+A|0)>>2]=1|q[w+4>>2];break a}if(E>>>0<=(W=q[1925])>>>0)break k;if(w){A=w=(a=(0-(a=(0-(A=2<<a)|A)&w<<a)&a)-1|0)>>>12&16,A|=w=(a>>>=w)>>>5&8,A|=w=(a>>>=w)>>>2&4,w=q[7740+(B=(A=((A|=w=(a>>>=w)>>>1&2)|(w=(a>>>=w)>>>1&1))+(a>>>w)|0)<<3)>>2],(0|(a=q[w+8>>2]))!=(0|(B=B+7732|0))?(q[a+12>>2]=B,q[B+8>>2]=a):(D=jc(A)&D,q[1923]=D),a=w+8|0,q[w+4>>2]=3|E,C=(A<<=3)-E|0,q[4+(F=w+E|0)>>2]=1|C,q[w+A>>2]=C,W&&(w=7732+((A=W>>>3)<<3)|0,B=q[1928],A=(A=1<<A)&D?q[w+8>>2]:(q[1923]=A|D,w),q[w+8>>2]=B,q[A+12>>2]=B,q[B+12>>2]=w,q[B+8>>2]=A),q[1928]=F,q[1925]=C;break a}if(!(Y=q[1924]))break k;for(A=w=(a=(Y&0-Y)-1|0)>>>12&16,A|=w=(a>>>=w)>>>5&8,A|=w=(a>>>=w)>>>2&4,w=q[7996+(((A|=w=(a>>>=w)>>>1&2)|(w=(a>>>=w)>>>1&1))+(a>>>w)<<2)>>2],B=(-8&q[w+4>>2])-E|0,A=w;a=(a=q[A+16>>2])||q[A+20>>2];)B=(A=(C=(-8&q[a+4>>2])-E|0)>>>0<B>>>0)?C:B,w=A?a:w,A=a;if(X=q[w+24>>2],(0|(C=q[w+12>>2]))!=(0|w)){a=q[w+8>>2],q[a+12>>2]=C,q[C+8>>2]=a;break b}if(!(a=q[(A=w+20|0)>>2])){if(!(a=q[w+16>>2]))break j;A=w+16|0}for(;F=A,(a=q[(A=(C=a)+20|0)>>2])||(A=C+16|0,a=q[C+16>>2]););q[F>>2]=0;break b}if(E=-1,!(4294967231<a>>>0)&&(E=-8&(w=a+11|0),W=q[1924])){A=0-E|0,D=0,(w>>>=8)&&(D=31,16777215<E>>>0||(D=28+((a=((D=(w<<=B=w+1048320>>>16&8)<<(a=w+520192>>>16&4))<<(w=D+245760>>>16&2)>>>15)-(w|a|B)|0)<<1|E>>>a+21&1)|0));q:{r:{if(B=q[7996+(D<<2)>>2])for(w=E<<(31==(0|D)?0:25-(D>>>1)|0),a=0;;){if(!(A>>>0<=(F=(-8&q[B+4>>2])-E|0)>>>0||(C=B,A=F))){A=0,a=B;break r}if(F=q[B+20>>2],B=q[16+((w>>>29&4)+B|0)>>2],a=F?(0|F)==(0|B)?a:F:a,w<<=0!=(0|B),!B)break}else a=0;if(!(a|C)){if(!(a=(0-(a=2<<D)|a)&W))break k;B=w=(a=(a&0-a)-1|0)>>>12&16,B|=w=(a>>>=w)>>>5&8,B|=w=(a>>>=w)>>>2&4,a=q[7996+(((B|=w=(a>>>=w)>>>1&2)|(w=(a>>>=w)>>>1&1))+(a>>>w)<<2)>>2]}if(!a)break q}for(;A=(w=(B=(-8&q[a+4>>2])-E|0)>>>0<A>>>0)?B:A,C=w?a:C,a=(w=q[a+16>>2])||q[a+20>>2];);}if(!(!C|A>>>0>=q[1925]-E>>>0)){if(F=q[C+24>>2],(0|C)!=(0|(w=q[C+12>>2]))){a=q[C+8>>2],q[a+12>>2]=w,q[w+8>>2]=a;break c}if(!(a=q[(B=C+20|0)>>2])){if(!(a=q[C+16>>2]))break i;B=C+16|0}for(;D=B,(a=q[(B=(w=a)+20|0)>>2])||(B=w+16|0,a=q[w+16>>2]););q[D>>2]=0;break c}}}if(E>>>0<=(w=q[1925])>>>0){a=q[1928],16<=(A=w-E|0)>>>0?(q[1925]=A,B=a+E|0,q[1928]=B,q[B+4>>2]=1|A,q[a+w>>2]=A,q[a+4>>2]=3|E):(q[1928]=0,q[1925]=0,q[a+4>>2]=3|w,q[4+(w=a+w|0)>>2]=1|q[w+4>>2]),a=a+8|0;break a}if(E>>>0<(B=q[1926])>>>0){w=B-E|0,q[1926]=w,A=(a=q[1929])+E|0,q[1929]=A,q[A+4>>2]=1|w,q[a+4>>2]=3|E,a=a+8|0;break a}if((A=(D=(A=C=E+47|(a=0))+(w=q[2041]?q[2043]:(q[2044]=-1,q[2045]=-1,q[2042]=4096,q[2043]=4096,q[2041]=12+Z&-16^1431655768,q[2046]=0,q[2034]=0,4096))|0)&(F=0-w|0))>>>0<=E>>>0)break a;if((w=q[2033])&&(X=(W=q[2031])+A|0)>>>0<=W>>>0|w>>>0<X>>>0)break a;if(4&r[8136])break f;v:{w:{if(w=q[1929])for(a=8140;;){if((W=q[a>>2])+q[a+4>>2]>>>0>w>>>0&&W>>>0<=w>>>0)break w;if(!(a=q[a+8>>2]))break}if(-1==(0|(w=da(0))))break g;if(D=A,(B=(a=q[2042])+-1|0)&w&&(D=(A-w|0)+(w+B&0-a)|0),D>>>0<=E>>>0|2147483646<D>>>0)break g;if((a=q[2033])&&(F=(B=q[2031])+D|0)>>>0<=B>>>0|a>>>0<F>>>0)break g;if((0|w)!=(0|(a=da(D))))break v;break e}if(2147483646<(D=F&D-B)>>>0)break g;if((0|(w=da(D)))==(q[a>>2]+q[a+4>>2]|0))break h;a=w}if(!(E+48>>>0<=D>>>0|2147483646<D>>>0|-1==(0|(w=a)))){if(2147483646<(a=(a=q[2043])+(C-D|0)&0-a)>>>0)break e;if(-1!=(0|da(a))){D=a+D|0;break e}da(0-D|0);break g}if(-1!=(0|w))break e;break g}C=0;break b}w=0;break c}if(-1!=(0|w))break e}q[2034]=4|q[2034]}if(2147483646<A>>>0)break d;if(w=da(A),(a=da(0))>>>0<=w>>>0|-1==(0|w)|-1==(0|a))break d;if((D=a-w|0)>>>0<=E+40>>>0)break d}a=q[2031]+D|0,(q[2031]=a)>>>0>t[2032]&&(q[2032]=a);x:{y:{z:{if(A=q[1929]){for(a=8140;;){if(((B=q[a>>2])+(C=q[a+4>>2])|0)==(0|w))break z;if(!(a=q[a+8>>2]))break}break y}for((a=q[1927])>>>0<=w>>>0&&a||(q[1927]=w),a=0,q[2036]=D,q[2035]=w,q[1931]=-1,q[1932]=q[2041],q[2038]=0;B=7732+(A=a<<3)|0,q[A+7740>>2]=B,q[A+7744>>2]=B,32!=(0|(a=a+1|0)););B=(a=D+-40|0)-(A=w+8&7?-8-w&7:0)|0,q[1926]=B,A=w+A|0,q[1929]=A,q[A+4>>2]=1|B,q[4+(a+w|0)>>2]=40,q[1930]=q[2045];break x}if(!(8&r[a+12|0]|w>>>0<=A>>>0|A>>>0<B>>>0)){q[a+4>>2]=C+D,w=(a=A+8&7?-8-A&7:0)+A|0,q[1929]=w,a=(B=q[1926]+D|0)-a|0,q[1926]=a,q[w+4>>2]=1|a,q[4+(A+B|0)>>2]=40,q[1930]=q[2045];break x}}w>>>0<(C=q[1927])>>>0&&(q[1927]=w,C=0),B=w+D|0,a=8140;A:{B:{C:{D:{E:{F:{for(;(0|B)!=q[a>>2];)if(!(a=q[a+8>>2]))break F;if(!(8&r[a+12|0]))break E}for(a=8140;;){if((B=q[a>>2])>>>0<=A>>>0&&A>>>0<(C=B+q[a+4>>2]|0)>>>0)break D;a=q[a+8>>2]}}if(q[a>>2]=w,q[a+4>>2]=q[a+4>>2]+D,q[4+(X=(w+8&7?-8-w&7:0)+w|0)>>2]=3|E,a=((w=B+(B+8&7?-8-B&7:0)|0)-X|0)-E|0,F=E+X|0,(0|w)==(0|A)){q[1929]=F,a=q[1926]+a|0,q[1926]=a,q[F+4>>2]=1|a;break B}if(q[1928]==(0|w)){q[1928]=F,a=q[1925]+a|0,q[1925]=a,q[F+4>>2]=1|a,q[a+F>>2]=a;break B}if(1==(3&(A=q[w+4>>2]))){Y=-8&A;G:if(A>>>0<=255){if(C=A>>>3,A=q[w+8>>2],(0|(B=q[w+12>>2]))==(0|A)){_=7692,$=q[1923]&jc(C),q[_>>2]=$;break G}q[A+12>>2]=B,q[B+8>>2]=A}else{if(W=q[w+24>>2],(0|(D=q[w+12>>2]))==(0|w))if((E=q[(B=w+20|0)>>2])||(E=q[(B=w+16|0)>>2])){for(;A=B,(E=q[(B=(D=E)+20|0)>>2])||(B=D+16|0,E=q[D+16>>2]););q[A>>2]=0}else D=0;else A=q[w+8>>2],q[A+12>>2]=D,q[D+8>>2]=A;if(W){A=q[w+28>>2];J:{if(q[(B=7996+(A<<2)|0)>>2]==(0|w)){if(q[B>>2]=D)break J;_=7696,$=q[1924]&jc(A),q[_>>2]=$;break G}if(!(q[W+(q[W+16>>2]==(0|w)?16:20)>>2]=D))break G}q[D+24>>2]=W,(A=q[w+16>>2])&&(q[D+16>>2]=A,q[A+24>>2]=D),(A=q[w+20>>2])&&(q[D+20>>2]=A,q[A+24>>2]=D)}}w=w+Y|0,a=a+Y|0}if(q[w+4>>2]=-2&q[w+4>>2],q[F+4>>2]=1|a,(q[a+F>>2]=a)>>>0<=255){a=7732+((w=a>>>3)<<3)|0,w=(A=q[1923])&(w=1<<w)?q[a+8>>2]:(q[1923]=w|A,a),q[a+8>>2]=F,q[w+12>>2]=F,q[F+12>>2]=a,q[F+8>>2]=w;break B}if(w=0,(B=a>>>8)&&(w=31,16777215<a>>>0||(w=28+((w=((E=(B<<=C=B+1048320>>>16&8)<<(w=B+520192>>>16&4))<<(B=E+245760>>>16&2)>>>15)-(B|w|C)|0)<<1|a>>>w+21&1)|0)),q[(A=F)+28>>2]=w,q[F+16>>2]=0,A=7996+(w<<2)|(q[F+20>>2]=0),(B=q[1924])&(C=1<<w)){for(B=a<<(31==(0|w)?0:25-(w>>>1)|0),w=q[A>>2];;){if((-8&q[(A=w)+4>>2])==(0|a))break C;if(w=B>>>29,B<<=1,!(w=q[16+(C=(4&w)+A|0)>>2]))break}q[C+16>>2]=F}else q[1924]=B|C,q[A>>2]=F;q[F+24>>2]=A,q[F+12>>2]=F,q[F+8>>2]=F;break B}for(F=(a=D+-40|0)-(B=w+8&7?-8-w&7:0)|0,q[1926]=F,B=w+B|0,q[1929]=B,q[B+4>>2]=1|F,q[4+(a+w|0)>>2]=40,q[1930]=q[2045],q[(B=(a=(C+(C+-39&7?39-C&7:0)|0)-47|0)>>>0<A+16>>>0?A:a)+4>>2]=27,a=q[2038],q[B+16>>2]=q[2037],q[B+20>>2]=a,a=q[2036],q[B+8>>2]=q[2035],q[B+12>>2]=a,q[2037]=B+8,q[2036]=D,q[2035]=w,a=B+24|(q[2038]=0);q[a+4>>2]=7,w=a+8|0,a=a+4|0,w>>>0<C>>>0;);if((0|A)==(0|B))break x;if(q[B+4>>2]=-2&q[B+4>>2],C=B-A|0,q[A+4>>2]=1|C,(q[B>>2]=C)>>>0<=255){a=7732+((w=C>>>3)<<3)|0,w=(B=q[1923])&(w=1<<w)?q[a+8>>2]:(q[1923]=w|B,a),q[a+8>>2]=A,q[w+12>>2]=A,q[A+12>>2]=a,q[A+8>>2]=w;break x}if(q[A+16>>2]=0,a=q[A+20>>2]=0,(B=C>>>8)&&(a=31,16777215<C>>>0||(a=28+((a=((F=(B<<=D=B+1048320>>>16&8)<<(a=B+520192>>>16&4))<<(B=F+245760>>>16&2)>>>15)-(B|a|D)|0)<<1|C>>>a+21&1)|0)),w=7996+((q[(w=A)+28>>2]=a)<<2)|0,(B=q[1924])&(D=1<<a)){for(a=C<<(31==(0|a)?0:25-(a>>>1)|0),w=q[w>>2];;){if((0|C)==(-8&q[(B=w)+4>>2]))break A;if(w=a>>>29,a<<=1,!(w=q[16+(D=B+(4&w)|0)>>2]))break}q[D+16>>2]=A,q[A+24>>2]=B}else q[1924]=B|D,q[w>>2]=A,q[A+24>>2]=w;q[A+12>>2]=A,q[A+8>>2]=A;break x}a=q[A+8>>2],q[a+12>>2]=F,q[A+8>>2]=F,q[F+24>>2]=0,q[F+12>>2]=A,q[F+8>>2]=a}a=X+8|0;break a}a=q[B+8>>2],q[a+12>>2]=A,q[B+8>>2]=A,q[A+24>>2]=0,q[A+12>>2]=B,q[A+8>>2]=a}if(!((a=q[1926])>>>0<=E>>>0)){w=a-E|0,q[1926]=w,A=(a=q[1929])+E|0,q[1929]=A,q[A+4>>2]=1|w,q[a+4>>2]=3|E,a=a+8|0;break a}}q[1906]=48,a=0;break a}Q:if(F){a=q[C+28>>2];R:{if(q[(B=7996+(a<<2)|0)>>2]==(0|C)){if(q[B>>2]=w)break R;W=jc(a)&W,q[1924]=W;break Q}if(!(q[F+(q[F+16>>2]==(0|C)?16:20)>>2]=w))break Q}q[w+24>>2]=F,(a=q[C+16>>2])&&(q[w+16>>2]=a,q[a+24>>2]=w),(a=q[C+20>>2])&&(q[w+20>>2]=a,q[a+24>>2]=w)}S:if(A>>>0<=15)a=A+E|0,q[C+4>>2]=3|a,q[4+(a=a+C|0)>>2]=1|q[a+4>>2];else if(q[C+4>>2]=3|E,q[4+(B=C+E|0)>>2]=1|A,(q[A+B>>2]=A)>>>0<=255)a=7732+((w=A>>>3)<<3)|0,w=(A=q[1923])&(w=1<<w)?q[a+8>>2]:(q[1923]=w|A,a),q[a+8>>2]=B,q[w+12>>2]=B,q[B+12>>2]=a,q[B+8>>2]=w;else{a=0,(E=A>>>8)&&(a=31,16777215<A>>>0||(a=28+((a=((F=(E<<=D=E+1048320>>>16&8)<<(a=E+520192>>>16&4))<<(E=F+245760>>>16&2)>>>15)-(E|a|D)|0)<<1|A>>>a+21&1)|0)),q[(w=B)+28>>2]=a,q[B+16>>2]=0,w=7996+(a<<2)|(q[B+20>>2]=0);V:{if((E=1<<a)&W){for(a=A<<(31==(0|a)?0:25-(a>>>1)|0),E=q[w>>2];;){if((-8&q[(w=E)+4>>2])==(0|A))break V;if(E=a>>>29,a<<=1,!(E=q[16+(D=(4&E)+w|0)>>2]))break}q[D+16>>2]=B}else q[1924]=E|W,q[w>>2]=B;q[B+24>>2]=w,q[B+12>>2]=B,q[B+8>>2]=B;break S}a=q[w+8>>2],q[a+12>>2]=B,q[w+8>>2]=B,q[B+24>>2]=0,q[B+12>>2]=w,q[B+8>>2]=a}a=C+8|0;break a}X:if(X){a=q[w+28>>2];Y:{if(q[(A=7996+(a<<2)|0)>>2]==(0|w)){if(q[A>>2]=C)break Y;_=7696,$=jc(a)&Y,q[_>>2]=$;break X}if(!(q[X+(q[X+16>>2]==(0|w)?16:20)>>2]=C))break X}q[C+24>>2]=X,(a=q[w+16>>2])&&(q[C+16>>2]=a,q[a+24>>2]=C),(a=q[w+20>>2])&&(q[C+20>>2]=a,q[a+24>>2]=C)}B>>>0<=15?(a=B+E|0,q[w+4>>2]=3|a,q[4+(a=a+w|0)>>2]=1|q[a+4>>2]):(q[w+4>>2]=3|E,q[4+(E=w+E|0)>>2]=1|B,q[B+E>>2]=B,W&&(a=7732+((A=W>>>3)<<3)|0,C=q[1928],A=(A=1<<A)&D?q[a+8>>2]:(q[1923]=A|D,a),q[a+8>>2]=C,q[A+12>>2]=C,q[C+12>>2]=a,q[C+8>>2]=A),q[1928]=E,q[1925]=B),a=w+8|0}return L=16+Z|0,a}function ka(a){var q=0,L=x(0),aa=0,ba=0,ca=x(0),da=x(0);j(a);a:{if(1283457024<=(q=2147483647&(ba=e(0)))>>>0){if(2139095040<q>>>0)break a;return x((0|ba)<0?-1.570796251296997:1.570796251296997)}b:{if(q>>>0<=1054867455){if(aa=-1,964689920<=q>>>0)break b;break a}if(a=x(y(a)),q>>>0<=1066926079){if(q>>>0<=1060110335){a=x(x(x(a+a)+x(-1))/x(a+x(2))),aa=0;break b}a=x(x(a+x(-1))/x(a+x(1))),aa=1}else aa=q>>>0<=1075576831?(a=x(x(a+x(-1.5))/x(x(a*x(1.5))+x(1))),2):(a=x(x(-1)/a),3)}if(q=aa,ca=x(a*a),L=x(ca*ca),da=x(L*x(x(L*x(-.106480173766613))+x(-.19999158382415771))),L=x(ca*x(x(L*x(x(L*x(.06168760731816292))+x(.14253635704517365)))+x(.333333283662796))),(0|q)<=-1)return x(a-x(a*x(da+L)));a=x(u[6080+(q<<=2)>>2]-x(x(x(a*x(da+L))-u[q+6096>>2])-a)),a=(0|ba)<0?x(-a):a}return a}function la(a,ea){var ha,fa=0,ga=0,ia=0,ja=0,ka=0;L=ha=L-16|0,j(a);a:if((fa=2147483647&(ia=e(0)))>>>0<=1305022426){if(ga=.6366197723675814*(ja=+a)+6755399441055744-6755399441055744,v[ea>>3]=ja+-1.5707963109016418*ga+-1.5893254773528196e-8*ga,y(ga)<2147483648){fa=~~ga;break a}fa=-2147483648}else 2139095040<=fa>>>0?(v[ea>>3]=x(a-a),fa=0):(fa=((ka=fa)>>>23)-150|0,v[8+ha>>3]=(f(0,ka-(fa<<23)|0),k()),fa=Da(8+ha|0,ha,fa),ga=v[ha>>3],(0|ia)<=-1?(v[ea>>3]=-ga,fa=0-fa|0):v[ea>>3]=ga);return L=16+ha|0,fa}function ma(a){var ea=0,la=0,ma=0,na=0,oa=0;ma=4,la=1082;a:if(ea=r[0|a]){for(;!((0|(na=r[0|la]))!=(0|ea)||!(ma=ma+-1|0)|!na);)if(la=la+1|0,ea=r[a+1|0],a=a+1|0,!ea)break a;oa=ea}return(255&oa)-r[0|la]|0}function oa(a,pa){return a?function(a,Wb){a:{if(a){if(Wb>>>0<=127)break a;if(q[q[1625]>>2]){if(Wb>>>0<=2047)return o[a+1|0]=63&Wb|128,o[0|a]=Wb>>>6|192,2;if(!(57344!=(-8192&Wb)&&55296<=Wb>>>0))return o[a+2|0]=63&Wb|128,o[0|a]=Wb>>>12|224,o[a+1|0]=Wb>>>6&63|128,3;if(Wb+-65536>>>0<=1048575)return o[a+3|0]=63&Wb|128,o[0|a]=Wb>>>18|240,o[a+2|0]=Wb>>>6&63|128,o[a+1|0]=Wb>>>12&63|128,4}else if(57216==(-128&Wb))break a;q[1906]=25,a=-1}else a=1;return a}return o[0|a]=Wb,1}(a,pa):0}function pa(a,pa,ta,ua){a:{if(!(20<pa>>>0||9<(pa=pa+-9|0)>>>0)){switch(pa-1|0){default:return pa=q[ta>>2],q[ta>>2]=pa+4,void(q[a>>2]=q[pa>>2]);case 0:return pa=q[ta>>2],q[ta>>2]=pa+4,pa=q[pa>>2],q[a>>2]=pa,void(q[a+4>>2]=pa>>31);case 1:return pa=q[ta>>2],q[ta>>2]=pa+4,q[a>>2]=q[pa>>2],void(q[a+4>>2]=0);case 3:return pa=q[ta>>2],q[ta>>2]=pa+4,pa=p[pa>>1],q[a>>2]=pa,void(q[a+4>>2]=pa>>31);case 4:return pa=q[ta>>2],q[ta>>2]=pa+4,q[a>>2]=s[pa>>1],void(q[a+4>>2]=0);case 5:return pa=q[ta>>2],q[ta>>2]=pa+4,pa=o[0|pa],q[a>>2]=pa,void(q[a+4>>2]=pa>>31);case 6:return pa=q[ta>>2],q[ta>>2]=pa+4,q[a>>2]=r[0|pa],void(q[a+4>>2]=0);case 2:case 7:break a;case 8:}n[ua](a,ta)}return}pa=q[ta>>2]+7&-8,q[ta>>2]=pa+8,ta=q[pa+4>>2],q[a>>2]=q[pa>>2],q[a+4>>2]=ta}function qa(a){var pa=0,ta=0,ua=0;if(ga(o[q[a>>2]]))for(;pa=q[a>>2],ua=o[0|pa],q[a>>2]=pa+1,ta=(w(ta,10)+ua|0)-48|0,ga(o[pa+1|0]););return ta}function ra(a,va,wa,xa,ya){var za,Aa=0,Ba=0;q[204+(L=za=L-208|0)>>2]=wa,ba(160+za|(wa=0),0,40),q[200+za>>2]=q[204+za>>2],(0|ia(0,va,200+za|0,80+za|0,160+za|0,xa,ya))<0||(wa=0<=q[a+76>>2]?1:wa,Aa=q[a>>2],o[a+74|0]<=0&&(q[a>>2]=-33&Aa),Ba=32&Aa,q[a+48>>2]?ia(a,va,200+za|0,80+za|0,160+za|0,xa,ya):(q[a+48>>2]=80,q[a+16>>2]=80+za,q[a+28>>2]=za,q[a+20>>2]=za,Aa=q[a+44>>2],ia(a,va,200+(q[a+44>>2]=za)|0,80+za|0,160+za|0,xa,ya),Aa&&(n[q[a+36>>2]](a,0,0),q[a+48>>2]=0,q[a+44>>2]=Aa,q[a+28>>2]=0,q[a+16>>2]=0,q[a+20>>2]=0)),q[a>>2]=q[a>>2]|Ba),L=208+za|0}function sa(a,va,wa){var xa,ya=0;fa(8+(L=xa=L-160|0)|0,2536,144),q[52+xa>>2]=a,ya=(ya=-2-(q[28+xa>>2]=a)|0)>>>0<256?ya:256,a=a+(q[56+xa>>2]=ya)|0,q[36+xa>>2]=a,q[24+xa>>2]=a,ra(8+xa|0,va,wa,15,16),ya&&(a=q[28+xa>>2],o[a-((0|a)==q[24+xa>>2])|0]=0),L=160+xa|0}function ta(a){var va=0,wa=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=x(0),Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=x(0),Qa=0,Ra=x(0),Sa=0,Ta=0,Ua=x(0),Va=x(0),Wa=x(0),Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0;if(q[a+256>>2]&&(va=q[a+200>>2]<<2,fa(q[a+280>>2],q[a+264>>2],va),fa(q[a+284>>2],q[a+268>>2],va),fa(q[a+288>>2],q[a+276>>2],va)),!((0|(Ea=q[a+292>>2]))<1)){for(Ia=(Ga=q[a+296>>2])+w(Ea,40)|0,Ca=q[a+300>>2],va=Ga;Wa=u[Ca>>2],(Ra=u[va+32>>2])==(Ha=(wa=q[va+12>>2])?(Ua=u[va>>2],Ha=x(Wa-Ua),Wa=u[va+8>>2],Pa=x(Ha/Wa),Ha=x(C(Pa)),Da=x(y(Ha))<x(2147483648)?~~Ha:-2147483648,x(Ua+x(Wa*x(Pa-x(0|Da))))):(Pa=u[va>>2],Ha=u[va+4>>2],Wa<Pa?Pa:Ha<Wa?Ha:Wa))?q[va+36>>2]=0:(u[va+32>>2]=Ha,q[va+36>>2]=1),wa||(u[Ca>>2]=Ha),Ca=Ca+4|0,(va=va+40|0)>>>0<Ia>>>0;);if(!((0|Ea)<1))for(Qa=q[a+308>>2],Oa=q[a+376>>2];;){e:if(!((0|(wa=q[Ga+28>>2]))<1))if(Ja=(va=Qa+w(q[Ga+24>>2],28)|0)+w(wa,28)|0,Wa=u[Ga+20>>2],Va=u[Ga+16>>2],Ra=u[Ga+32>>2],Oa)for(;;){Ua=x(Ea=0);l:{m:{n:{if((0|(Fa=q[va>>2]))<1)Ca=Da=0;else if(wa=q[va+4>>2],Pa=u[wa>>2],Ha=x(Pa-Va),1!=(0|Fa)){if(Ra<Ha){Da=1,Ca=0;break m}if(Da=0,Ra<x(Va+Pa))Ca=0;else{if(Ca=1,Ha=u[wa+4>>2],!(Ra<x(Va+Ha)))for(;;){if((0|Fa)==(0|(Ca=Ca+1|0)))break n;if(Pa=Ha,Ha=u[wa+(Ca<<2)>>2],Ra<x(Va+Ha))break}x(Ha-Va)<Ra||(Ca=Ca+-1|0,(Ha=x(Ha-Pa))<Wa||(Ua=x(x(Ra-Pa)/Ha)))}}else Da=Ra<x(Va+Pa)^1|Ha<Ra^1,Ca=0;if(Da)break m;if(Na=Fa=1,!q[va+16>>2])break m;break l}Ca=Fa+-1|0,Da=1}Na=(Fa=(Ha=u[va+12>>2])!=Ua)&(Ua==x(0)|Ha==x(0))|q[va+8>>2]!=(0|Ca),Ea=Da}if(q[va+20>>2]=Na,q[va+24>>2]=Fa,u[va+12>>2]=Ua,q[va+16>>2]=Ea,q[va+8>>2]=Ca,!((va=va+28|0)>>>0<Ja>>>0))break}else{if(!q[Ga+36>>2])for(;;)if(q[va+20>>2]=0,!((va=va+28|(q[va+24>>2]=0))>>>0<Ja>>>0))break e;for(;;){Ua=x(Ea=0);f:{g:{h:{i:if(!(((Da=0)|(Ca=q[(wa=va)>>2]))<1)){if(La=q[va+4>>2],Pa=u[La>>2],Ha=x(Pa-Va),1!=(0|Ca)){if(!(Ra<Ha)){if(Da=0,Ra<x(Va+Pa))break i;Fa=1;j:if(Ha=u[La+4>>2],!(Ra<x(Va+Ha))){for(Ca=Ca+-1|0;Pa=Ha,(0|Ca)!=(0|Fa);)if(Ha=u[La+((Fa=Fa+1|0)<<2)>>2],Ra<x(Va+Ha))break j;Da=1;break g}if(Da=0,x(Ha-Va)<Ra){Ca=Fa;break h}if(Ca=Fa+-1|0,(Ha=x(Ha-Pa))<Wa)break h;Ua=x(x(Ra-Pa)/Ha);break h}Da=1,Ca=0;break g}Da=Ra<x(Va+Pa)^1|Ha<Ra^1}Ca=0}if(!Da&&(La=Fa=1,q[va+16>>2]))break f}Ea=Da,La=(Fa=(Ha=u[va+12>>2])!=Ua)&(Ua==x(0)|Ha==x(0))|q[va+8>>2]!=(0|Ca)}if(q[wa+20>>2]=La,q[va+24>>2]=Fa,u[va+12>>2]=Ua,q[va+16>>2]=Ea,q[va+8>>2]=Ca,!((va=va+28|0)>>>0<Ja>>>0))break}}if(!((Ga=Ga+40|0)>>>0<Ia>>>0))break}}if(1<=(0|(va=q[a+312>>2])))for(La=(Ka=q[a+316>>2])+w(va,36)|0,Ia=q[a+376>>2];;){$a=(wa=q[Ka+12>>2])+((Ga=q[Ka>>2])<<2)|0,Sa=q[a+308>>2],va=wa;p:{if(!(Ga=((Fa=Da=Ea=0)|Ga)<1))for(;;){if(Ca=Sa+w(q[va>>2],28)|0,q[Ca+16>>2]){Na=1,Ta=_a=0;break p}if(Ea=Ea||q[Ca+24>>2],Fa=Fa||q[Ca+20>>2],Da=(u[Ca+12>>2]!=x(0))+Da|0,!((va=va+4|0)>>>0<$a>>>0))break}if(Na=0,(Ta=Ia?1:Fa)|(_a=Ia?1:Ea)&&(Za=1<<Da,q[Ka+8>>2]=Za,31!=(0|Da))){for(Ea=q[Ka+20>>2],Ca=(va=q[Ka+16>>2])+(Fa=Za<<2)|0,Xa=ba(Ma=va,0,4+((Ja=-1^va)+((va=va+4|0)>>>0<Ca>>>0?Ca:va)|0)&-4),Fa=Ea+Fa|0,va=Ea;q[va>>2]=1065353216,(va=va+4|0)>>>0<Fa>>>0;);if(!Ga)if(Fa=Ga=1,Da)for(;;){if(Ma=Sa+w(q[wa>>2],28)|0,Da=q[Ma+8>>2],Ja=w(Da,Ga),va=0,(Ha=u[Ma+12>>2])==x(0))for(;q[(Da=Xa+(va<<2)|0)>>2]=Ja+q[Da>>2],(0|Za)!=(0|(va=va+1|0)););else{for(q[Xa>>2]=Ja+q[Xa>>2],u[Ea>>2]=x(x(1)-Ha)*u[Ea>>2],Qa=w(Da+(va=1)|0,Ga);Ha=u[Ma+12>>2],Ca=va&Fa,q[(Da=(Oa=va<<2)+Xa|0)>>2]=q[Da>>2]+(Ca?Qa:Ja),u[(Da=Ea+Oa|0)>>2]=(Ca?Ha:x(x(1)-Ha))*u[Da>>2],(0|Za)!=(0|(va=va+1|0)););Fa<<=1}if(Ga=w(q[Ma>>2],Ga),!((wa=wa+4|0)>>>0<$a>>>0))break}else for(;;){if(Ca=Sa+w(q[wa>>2],28)|0,Fa=w(q[Ca+8>>2],Ga),va=0,(Ha=u[Ca+12>>2])==x(0))for(;q[(Da=Xa+(va<<2)|0)>>2]=Fa+q[Da>>2],(0|Za)!=(0|(va=va+1|0)););else q[Xa>>2]=Fa+q[Xa>>2],u[Ea>>2]=x(x(1)-Ha)*u[Ea>>2];if(Ga=w(q[Ca>>2],Ga),!((wa=wa+4|0)>>>0<$a>>>0))break}}}if(q[Ka+32>>2]=Na,q[Ka+24>>2]=Ta,q[Ka+28>>2]=_a,!((Ka=Ka+36|0)>>>0<La>>>0))break}if(!((0|(Da=q[a+4>>2]))<=0)){for(wa=(va=q[a+52>>2])+(Da<<2)|0;Ha=u[va>>2],u[va>>2]=Ha<x(0)?x(0):x(A(Ha,x(1))),(va=va+4|0)>>>0<wa>>>0;);if(!((0|Da)<1)){for(Ga=(va=q[a+8>>2])+(Da<<3)|0,Ja=q[a+316>>2],Ea=q[a+40>>2],Ca=Fa=q[a+36>>2];Da=0,q[va+4>>2]&&(wa=q[va>>2],!q[Fa+(wa<<2)>>2]&&-1!=(0|wa)||(Da=!q[32+(Ja+w(q[Ea>>2],36)|0)>>2])),q[Ca>>2]=Da,Ea=Ea+4|0,Ca=Ca+4|0,(va=va+8|0)>>>0<Ga>>>0;);if(!((0|(Ia=q[a+4>>2]))<1))for(La=q[a>>2],Qa=q[La+724>>2],wa=q[a+40>>2],Fa=Ga=0;;){if(Ma=Ja+w(q[wa>>2],36)|0,(q[Ma+28>>2]||q[Ma+24>>2])&&(q[(Ea=Ga<<2)+q[a+16>>2]>>2]=q[Ma+8>>2],q[Ma+24>>2]&&!((0|(Da=q[Ma+8>>2]))<1)))for(Oa=(va=q[Ma+16>>2])+(Da<<2)|0,Ea=q[Ea+Qa>>2],Ca=q[a+28>>2]+(Fa<<2)|0,Da=q[La+936>>2];q[Ca>>2]=q[Da+(Ea+q[va>>2]<<2)>>2],Ca=Ca+4|0,(va=va+4|0)>>>0<Oa>>>0;);if(q[Ma+28>>2]&&!((0|(Da=q[Ma+8>>2]))<1))for(Da=(va=q[Ma+20>>2])+(Da<<2)|0,Ca=q[a+20>>2]+(Fa<<2)|0;q[Ca>>2]=q[va>>2],Ca=Ca+4|0,(va=va+4|0)>>>0<Da>>>0;);if(wa=wa+4|0,Fa=q[Ma+4>>2]+Fa|0,(0|Ia)==(0|(Ga=Ga+1|0)))break}}}if(n[q[1644]](a),ab=q[a+316>>2],1<=(0|(wa=q[a+56>>2]))){for(Ia=(va=q[a+60>>2])+(wa<<5)|0,La=q[a+176>>2],Qa=q[a+172>>2],Oa=q[a+36>>2],Da=q[a+180>>2],Ea=Ca=q[a+168>>2];;){Fa=Ea,wa=0,q[va+28>>2]&&(-1!=(0|(Ga=q[va>>2]))&&(wa=0,!q[Oa+(Ga<<2)>>2])||-1!=(0|(Ga=q[va+4>>2]))&&(wa=0,!q[Ca+(Ga<<2)>>2])||(wa=!q[32+(w(q[Da>>2],36)+ab|0)>>2])),q[Fa>>2]=wa;x:if((Fa=q[va+8>>2])>>>0<=1){if(Fa-1){q[Qa+(q[va+12>>2]<<2)>>2]=wa;break x}q[La+(q[va+12>>2]<<2)>>2]=wa}else Y(4,1473,0);if(Da=Da+4|0,Ea=Ea+4|0,!((va=va+32|0)>>>0<Ia>>>0))break}ab=q[a+316>>2]}if(Ga=q[a>>2],1<=(0|(Ia=q[a- -64>>2]))){for(La=q[Ga+988>>2],Qa=q[Ga+784>>2],Na=q[a+184>>2],Ka=wa=0;;){if(Ja=w(q[Na>>2],36)+ab|0,(q[Ja+28>>2]||q[Ja+24>>2])&&(q[(Ea=wa<<2)+q[a+84>>2]>>2]=q[Ja+8>>2],q[Ja+24>>2]&&!((0|(Da=q[Ja+8>>2]))<1)))for(Oa=(va=q[Ja+16>>2])+(Da<<2)|0,Fa=q[Ea+Qa>>2],Ca=(Da=Ka<<2)+q[a+100>>2]|0,Ea=Da+q[a+96>>2]|0;Da=Fa+q[va>>2]<<2,q[Ca>>2]=La+(q[Da+q[Ga+944>>2]>>2]<<2),q[Ea>>2]=q[Da+q[Ga+940>>2]>>2],Ea=Ea+4|0,Ca=Ca+4|0,(va=va+4|0)>>>0<Oa>>>0;);if(q[Ja+28>>2]&&!((0|(Da=q[Ja+8>>2]))<1))for(Da=(va=q[Ja+20>>2])+(Da<<2)|0,Ca=q[a+88>>2]+(Ka<<2)|0;q[Ca>>2]=q[va>>2],Ca=Ca+4|0,(va=va+4|0)>>>0<Da>>>0;);if(Na=Na+4|0,Ka=q[Ja+4>>2]+Ka|0,(0|Ia)==(0|(wa=wa+1|0)))break}ab=q[a+316>>2],Ga=q[a>>2]}if(1<=(0|(Za=q[a+72>>2])))for($a=q[a+76>>2],Sa=q[Ga+808>>2],_a=q[a+188>>2],Ta=Ka=0;;){if(Ya=w(q[_a>>2],36)+ab|0,(q[Ya+28>>2]||q[Ya+24>>2])&&(q[(wa=Ka<<2)+q[a+116>>2]>>2]=q[Ya+8>>2],q[Ya+24>>2])){if(va=q[Ya+16>>2],Xa=q[wa+Sa>>2],1<=(0|(wa=q[Ya+8>>2])))for(Ma=va+(wa<<2)|0,Ca=(wa=Ta<<2)+q[a+132>>2]|0,Ea=wa+q[a+136>>2]|0,Da=wa+q[a+140>>2]|0,Fa=wa+q[a+144>>2]|0,Na=wa+q[a+128>>2]|0,Ja=q[Ga+948>>2],Ia=q[Ga+964>>2],La=q[Ga+960>>2],Qa=q[Ga+956>>2],Oa=q[Ga+952>>2],wa=va;bb=Xa+q[wa>>2]<<2,q[Ca>>2]=q[bb+Oa>>2],q[Ea>>2]=q[Qa+bb>>2],q[Da>>2]=q[La+bb>>2],q[Fa>>2]=q[Ia+bb>>2],q[Na>>2]=q[Ja+bb>>2],Na=Na+4|0,Fa=Fa+4|0,Da=Da+4|0,Ea=Ea+4|0,Ca=Ca+4|0,(wa=wa+4|0)>>>0<Ma>>>0;);wa=$a+(Ka<<5)|0,va=Xa+q[va>>2]<<2,q[wa+24>>2]=q[va+q[Ga+968>>2]>>2],q[wa+28>>2]=q[va+q[Ga+972>>2]>>2]}if(q[Ya+28>>2]&&!((0|(wa=q[Ya+8>>2]))<1))for(wa=(va=q[Ya+20>>2])+(wa<<2)|0,Ca=q[a+120>>2]+(Ta<<2)|0;q[Ca>>2]=q[va>>2],Ca=Ca+4|0,(va=va+4|0)>>>0<wa>>>0;);if(_a=_a+4|0,Ta=q[Ya+4>>2]+Ta|0,(0|Za)==(0|(Ka=Ka+1|0)))break}if(n[q[1642]](a),n[q[1645]](a),!((0|(wa=q[a+200>>2]))<1)){for(Oa=(va=q[a+204>>2])+(wa<<4)|0,Ga=q[a+168>>2],Fa=q[a+36>>2],Ja=q[a+316>>2],Ea=q[a+252>>2],Ca=q[a+248>>2];Da=0,q[va+8>>2]&&(wa=q[va>>2],!q[Fa+(wa<<2)>>2]&&-1!=(0|wa)||(wa=q[va+4>>2],!q[Ga+(wa<<2)>>2]&&-1!=(0|wa)||(Da=!q[32+(Ja+w(q[Ea>>2],36)|0)>>2]))),q[Ca>>2]=Da,Ea=Ea+4|0,Ca=Ca+4|0,(va=va+16|0)>>>0<Oa>>>0;);if(!((0|(La=q[a+200>>2]))<1))for(Ma=q[a>>2],Qa=q[Ma+988>>2],Oa=q[Ma+844>>2],wa=q[a+252>>2],Na=Ka=0;;){if(Sa=Ja+w(q[wa>>2],36)|0,(q[Sa+28>>2]||q[Sa+24>>2])&&(q[(Ea=Ka<<2)+q[a+212>>2]>>2]=q[Sa+8>>2],q[Sa+24>>2]&&!((0|(Da=q[Sa+8>>2]))<1)))for(Ga=(va=q[Sa+16>>2])+(Da<<2)|0,Fa=q[Ea+Oa>>2],Ca=(Da=Na<<2)+q[a+232>>2]|0,Ea=Da+q[a+224>>2]|0,Da=Da+q[a+228>>2]|0;Ia=Fa+q[va>>2]<<2,q[Ca>>2]=Qa+(q[Ia+q[Ma+984>>2]>>2]<<2),q[Ea>>2]=q[Ia+q[Ma+976>>2]>>2],q[Da>>2]=q[Ia+q[Ma+980>>2]>>2],Da=Da+4|0,Ea=Ea+4|0,Ca=Ca+4|0,(va=va+4|0)>>>0<Ga>>>0;);if(q[Sa+28>>2]&&!((0|(Da=q[Sa+8>>2]))<1))for(Da=(va=q[Sa+20>>2])+(Da<<2)|0,Ca=q[a+216>>2]+(Na<<2)|0;q[Ca>>2]=q[va>>2],Ca=Ca+4|0,(va=va+4|0)>>>0<Da>>>0;);if(wa=wa+4|0,Na=q[Sa+4>>2]+Na|0,(0|La)==(0|(Ka=Ka+1|0)))break}}if(n[q[1643]](a),function(a){var me,fe=0,ge=0,he=0,ie=0,je=0,ke=0,le=0,ne=0,oe=0,pe=0,qe=0,re=0;if(1<=(0|(me=q[a+340>>2])))for(oe=q[a+316>>2],ne=q[a>>2],pe=q[ne+1072>>2],je=q[a+372>>2];;){if(he=w(q[je>>2],36)+oe|0,(q[he+28>>2]||q[he+24>>2])&&(q[(fe=ke<<2)+q[a+352>>2]>>2]=q[he+8>>2],q[he+24>>2]&&!((0|(ie=q[he+8>>2]))<1)))for(ie=(ge=q[he+16>>2])+(ie<<2)|0,qe=q[fe+pe>>2],fe=q[a+364>>2]+(le<<2)|0,re=q[ne+1104>>2];q[fe>>2]=q[(q[ge>>2]+qe<<2)+re>>2],fe=fe+4|0,(ge=ge+4|0)>>>0<ie>>>0;);if(q[he+28>>2]&&!((0|(fe=q[he+8>>2]))<1))for(ie=(ge=q[he+20>>2])+(fe<<2)|0,fe=q[a+356>>2]+(le<<2)|0;q[fe>>2]=q[ge>>2],fe=fe+4|0,(ge=ge+4|0)>>>0<ie>>>0;);if(je=je+4|0,le=q[he+4>>2]+le|0,(0|me)==(0|(ke=ke+1|0)))break}}(a),n[q[1646]](a),wa=q[a+48>>2],1<=(0|(va=q[a+4>>2])))for(Ga=(Ea=q[a+8>>2])+(va<<3)|0,Da=q[a+52>>2],Ca=q[a+36>>2],va=wa;q[Ca>>2]&&(Ha=u[Da>>2],u[va>>2]=Ha,-1!=(0|(Fa=q[Ea>>2]))&&(u[va>>2]=Ha*u[(Fa<<2)+wa>>2])),va=va+4|0,Da=Da+4|0,Ca=Ca+4|0,(Ea=Ea+8|0)>>>0<Ga>>>0;);if(1<=(0|(Da=q[a+56>>2]))){for(wa=a+56|0,va=q[a+60>>2],Ca=q[a+168>>2],Ea=0;q[Ca>>2]&&n[q[va+16>>2]](va,Ea,wa),Ca=Ca+4|0,va=va+32|0,(0|Da)!=(0|(Ea=Ea+1|0)););wa=q[a+48>>2]}if(1<=(0|(Da=q[a+200>>2])))for(La=(va=q[a+204>>2])+(Da<<4)|0,Qa=q[a+192>>2],Oa=q[a+60>>2],Ea=q[a+248>>2],Ca=q[a+276>>2],Da=q[a+272>>2];q[Ea>>2]&&(-1!=(0|(Fa=q[va>>2]))&&(u[Ca>>2]=u[(Fa<<2)+wa>>2]*u[Ca>>2]),-1!=(0|(Fa=q[va+4>>2]))&&(u[Ca>>2]=u[Qa+(Fa<<2)>>2]*u[Ca>>2],Ga=Oa+(Fa<<5)|0,Fa=q[Da>>2],n[q[Ga+20>>2]](q[Ga+24>>2],Fa,Fa,q[va+12>>2]))),Da=Da+4|0,Ca=Ca+4|0,Ea=Ea+4|0,(va=va+16|0)>>>0<La>>>0;);if(function(a){var Dd=0,Ed=0,Fd=0,Gd=0,Hd=x(0),Id=x(0),Jd=x(0),Kd=x(0),Ld=x(0),Md=0,Nd=0,Od=0,Pd=0,Qd=0,Rd=x(0),Sd=0,Td=0,Ud=x(0),Vd=0;if(1<=(0|(Fd=q[a+340>>2])))for(Vd=(Dd=q[a+344>>2])+w(Fd,24)|0,Fd=q[a+272>>2];;){if((a=0)<(0|(Md=q[Dd+8>>2])))for(Nd=q[Fd+(q[Dd+4>>2]<<2)>>2],Od=q[Fd+(q[Dd>>2]<<2)>>2],Hd=u[Dd+20>>2],Pd=q[Dd+16>>2],Qd=q[Dd+12>>2];Rd=u[((Ed=1|a)<<2)+Qd>>2],Gd=s[(a<<1)+Pd>>1]<<3&262136,Id=u[(Sd=(4|Gd)+Od|0)>>2],Ed=s[(Ed<<1)+Pd>>1]<<3&262136,Jd=u[(Td=(4|Ed)+Nd|0)>>2],Kd=u[(Gd=Gd+Od|0)>>2],Ud=u[(a<<2)+Qd>>2],Ld=u[(Ed=Ed+Nd|0)>>2],u[Gd>>2]=Kd+x(Hd*x(Ud*x(Ld-Kd))),u[Sd>>2]=Id+x(Hd*x(Ud*x(Jd-Id))),u[Ed>>2]=Ld+x(Hd*x(Rd*x(Kd-Ld))),u[Td>>2]=Jd+x(Hd*x(Rd*x(Id-Jd))),(0|(a=a+2|0))<(0|Md););if(!((Dd=Dd+24|0)>>>0<Vd>>>0))break}}(a),n[q[1647]](a),Na=q[a+248>>2],Ka=q[a+268>>2],1<=(0|(Ja=q[a+320>>2]))){for(La=(Da=q[a+324>>2])+w(Ja,28)|0,Qa=q[a+44>>2],Oa=q[a+36>>2],wa=Da;;){if(1<=(0|(Ca=q[wa+4>>2])))for(Ga=wa+20|0,Fa=q[wa+12>>2],va=0;Ia=q[4+(Ea=Fa+(va<<4)|0)>>2]<<2,Ea=1==q[(Ma=Ea)>>2],q[Ma+12>>2]=q[(q[Ia+(Ea?Oa:Na)>>2]?Ia+(Ea?Qa:Ka)|0:Ga)>>2],(0|Ca)!=(0|(va=va+1|0)););if(!((wa=wa+28|0)>>>0<La>>>0))break}for(Qa=q[a+264>>2],Ta=0;;){if(Ia=Da+w(Ta,28)|0,!(q[(La=Ia)+24>>2]<1)){for(Ea=q[a+328>>2],va=0;q[Ea+(va<<2)>>2]=-1,(0|(va=va+1|0))<(0|(wa=q[La+24>>2])););if(!((0|wa)<1))for(wa=q[a+336>>2],va=0;q[wa+(va<<2)>>2]=-1,(0|(va=va+1|0))<q[La+24>>2];);}if(!(q[Ia+4>>2]<1)){for(Oa=q[a+332>>2],va=0;q[Oa+(va<<2)>>2]=-1,(0|(va=va+1|0))<(0|(wa=q[Ia+4>>2])););if(!((0|wa)<1))for(Ca=q[Ia+12>>2],Ga=q[a+336>>2],va=0;Fa=q[12+(Ca+(va<<4)|0)>>2]-q[Ia+20>>2]<<2,wa=-1!=(0|(wa=q[(Ea=Fa+Ga|0)>>2]))?Oa+(wa<<2)|0:Fa+q[a+328>>2]|0,q[wa>>2]=va,(0|(va=(q[Ea>>2]=va)+1|0))<q[Ia+4>>2];);}if(1<=(0|(Ea=q[La+24>>2])))for(Ca=q[Ia+8>>2],Oa=q[a+328>>2],Ga=0;;){if(-1!=(0|(va=q[Oa+(Ga<<2)>>2]))){for(Fa=q[a+332>>2],Ea=q[Ia+12>>2];Ca=(wa=1!=q[(wa=Ea+(va<<4)|0)>>2]?(q[Qa+(q[wa+4>>2]<<2)>>2]=Ca,1):(wa=Da+w(q[wa+8>>2],28)|0,q[wa+8>>2]=Ca,q[wa>>2]))+Ca|0,(0|va)<(0|(wa=q[Fa+(va<<2)>>2]))&&-1!=(0|(va=wa)););Ea=q[La+24>>2]}if(!((0|(Ga=Ga+1|0))<(0|Ea)))break}if((0|Ja)==(0|(Ta=Ta+1|0)))break}}Fa=q[a+200>>2];M:{if(q[a+376>>2]){if(va=0,((q[a+256>>2]=0)|Fa)<1)break M;for(;;){if(Ca=62,Ea=q[a+260>>2]+va|0,!q[(wa=va<<2)+Na>>2]|u[wa+q[a+276>>2]>>2]==x(0)||(Ca=63),o[0|Ea]=Ca,(0|Fa)==(0|(va=va+1|0)))break M;Na=q[a+248>>2]}}if(!q[a+256>>2]){if((0|Fa)<1)break M;for(va=0;;){if(!q[(wa=va<<2)+Na>>2]|u[wa+q[a+276>>2]>>2]==x(0)?(wa=q[a+260>>2]+va|0,o[0|wa]=254&r[0|wa]):(wa=q[a+260>>2]+va|0,o[0|wa]=1|r[0|wa]),(0|Fa)==(0|(va=va+1|0)))break M;Na=q[a+248>>2]}}if(!(((q[a+256>>2]=0)|Fa)<1))for(Ca=0;;){if(Ha=u[(Ea=Ca<<2)+q[a+276>>2]>>2],Da=q[Ea+Na>>2],va=Ha!=x(0)&0!=(0|Da),wa=q[a+260>>2]+Ca|0,va=(0|va)==(1&o[0|wa])?va:2|va,va=Ha!=u[Ea+q[a+288>>2]>>2]?4|va:va,va=q[Ea+Ka>>2]==q[Ea+q[a+284>>2]>>2]?va:8|va,va=q[Ea+q[a+264>>2]>>2]==q[Ea+q[a+280>>2]>>2]?va:16|va,o[0|wa]=Da?32|va:va,(0|Fa)==(0|(Ca=Ca+1|0)))break M;Ka=q[a+268>>2],Na=q[a+248>>2]}}q[a+376>>2]=0}function ua(a,cb,db){var eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0;if(q[cb>>2]=384,fb=q[a>>2],1<=(0|(hb=q[fb>>2]))){for(jb=q[a+16>>2],kb=q[a+296>>2];gb=(1<<q[kb+(q[jb+(eb<<2)>>2]<<2)>>2])+gb|0,(0|hb)!=(0|(eb=eb+1|0)););eb=gb<<2}if(q[cb+4>>2]=hb<<3,q[cb+8>>2]=q[fb>>2]<<2,q[cb+12>>2]=q[fb>>2]<<2,q[cb+16>>2]=q[fb>>2]<<2,q[cb+20>>2]=q[fb>>2]<<2,q[cb+24>>2]=q[fb>>2]<<2,gb=q[fb>>2],q[cb+40>>2]=eb,q[cb+36>>2]=eb,q[cb+32>>2]=eb,q[cb+28>>2]=gb<<2,1<=((gb=eb=0)|(kb=q[fb+8>>2]))){for(mb=q[a+296>>2],nb=q[a+88>>2],lb=q[a+76>>2],hb=0;eb=(0|eb)<(0|(jb=q[(ob=gb<<2)+nb>>2]))?jb:eb,ib=(15+(jb<<3)&-16)+ib|0,hb=(1<<q[mb+(q[lb+ob>>2]<<2)>>2])+hb|0,(0|kb)!=(0|(gb=gb+1|0)););gb=eb<<3,eb=hb<<2}if(q[cb+44>>2]=q[fb+4>>2]<<5,q[cb+48>>2]=w(q[fb+8>>2],24),q[cb+52>>2]=q[fb+12>>2]<<5,q[cb+56>>2]=q[fb+4>>2]<<2,q[cb+60>>2]=q[fb+8>>2]<<2,q[cb+64>>2]=q[fb+12>>2]<<2,q[cb+68>>2]=q[fb+4>>2]<<2,hb=q[fb+4>>2],q[cb+76>>2]=ib,q[cb+72>>2]=hb<<2,q[cb+80>>2]=q[fb+8>>2]<<2,hb=q[fb+8>>2],q[cb+104>>2]=gb,q[cb+100>>2]=eb,q[cb+96>>2]=eb,q[cb+92>>2]=eb,q[cb+88>>2]=eb,q[cb+84>>2]=hb<<2,1<=((eb=ib=0)|(hb=q[fb+12>>2]))){for(jb=q[a+296>>2],kb=q[a+100>>2],gb=0;gb=(1<<q[jb+(q[kb+(eb<<2)>>2]<<2)>>2])+gb|0,(0|hb)!=(0|(eb=eb+1|0)););eb=gb<<2}if(q[cb+108>>2]=hb<<2,gb=q[fb+12>>2],q[cb+156>>2]=eb,q[cb+152>>2]=eb,q[cb+148>>2]=eb,q[cb+144>>2]=eb,q[cb+140>>2]=eb,q[cb+136>>2]=eb,q[cb+132>>2]=eb,q[cb+128>>2]=eb,q[cb+124>>2]=eb,q[cb+120>>2]=eb,q[cb+116>>2]=eb,q[cb+112>>2]=gb<<2,1<=((gb=eb=0)|(jb=q[fb+16>>2]))){for(mb=q[a+136>>2],nb=q[a+296>>2],lb=q[a+172>>2],hb=0;eb=(0|eb)<(0|(kb=q[(ob=gb<<2)+lb>>2]))?kb:eb,ib=(15+(kb<<3)&-16)+ib|0,hb=(1<<q[nb+(q[mb+ob>>2]<<2)>>2])+hb|0,(0|jb)!=(0|(gb=gb+1|0)););gb=eb<<3,eb=hb<<2}if(q[cb+160>>2]=jb<<4,q[cb+164>>2]=q[fb+16>>2]<<2,q[cb+168>>2]=q[fb+16>>2],q[cb+172>>2]=q[fb+16>>2]<<2,q[cb+176>>2]=q[fb+16>>2]<<2,hb=q[fb+16>>2],q[cb+184>>2]=ib,q[cb+180>>2]=hb<<2,q[cb+188>>2]=q[fb+16>>2]<<2,q[cb+192>>2]=q[fb+16>>2]<<2,q[cb+196>>2]=q[fb+16>>2]<<2,q[cb+200>>2]=q[fb+16>>2]<<2,q[cb+204>>2]=q[fb+16>>2]<<2,hb=q[fb+16>>2],q[cb+236>>2]=gb,q[cb+232>>2]=eb,q[cb+228>>2]=eb,q[cb+224>>2]=eb,q[cb+220>>2]=eb,q[cb+216>>2]=eb,q[cb+212>>2]=eb,q[cb+208>>2]=hb<<2,q[cb+240>>2]=w(q[fb+20>>2],40),q[cb+244>>2]=q[fb+20>>2]<<2,q[cb+248>>2]=w(q[fb+52>>2],28),1<=((eb=hb=0)|(ib=q[fb+48>>2]))){for(jb=q[a+296>>2],gb=0;gb=(1<<q[jb+(eb<<2)>>2])+gb|0,(0|ib)!=(0|(eb=eb+1|0)););eb=gb<<2}if(q[cb+260>>2]=eb,q[cb+256>>2]=eb,q[cb+252>>2]=w(ib,36),q[cb+264>>2]=w(q[fb+72>>2],28),1<=((eb=0)|(jb=q[fb+72>>2]))){for(kb=q[a+340>>2],mb=q[a+336>>2],nb=q[a+328>>2],gb=0;gb=(0|(lb=q[(ib=hb<<2)+mb>>2]-q[ib+kb>>2]|0))<(0|gb)?gb:lb+1|0,eb=(0|eb)<(0|(ib=q[ib+nb>>2]))?ib:eb,(0|jb)!=(0|(hb=hb+1|0)););hb=gb<<2,eb<<=2}if(gb=q[fb+76>>2],q[cb+280>>2]=hb,q[cb+276>>2]=eb,q[cb+272>>2]=hb,q[cb+268>>2]=gb<<4,1<=((eb=0)|(hb=q[fb+80>>2]))){for(ib=q[a+364>>2],a=q[a+296>>2],gb=0;gb=(1<<q[a+(q[ib+(eb<<2)>>2]<<2)>>2])+gb|0,(0|hb)!=(0|(eb=eb+1|0)););eb=gb<<2}for(q[cb+284>>2]=w(hb,24),q[cb+288>>2]=q[fb+80>>2]<<2,a=q[fb+80>>2],q[cb+304>>2]=eb,q[cb+300>>2]=eb,q[cb+296>>2]=eb,q[cb>>2]=0,q[cb+292>>2]=a<<2,eb=384,gb=1;eb=((fb=q[(a=(gb<<2)+cb|0)>>2])+15&-16)+(q[a>>2]=eb)|0,77!=(0|(gb=gb+1|0)););q[db>>2]=eb}function va(a,cb,db){var pb;cb|=0,L=pb=L+-64|0;a:{if(a|=0)if(cb)if((cb+15&-16)==(0|cb)){if(cb=function(a,hh,ih){var lh,jh=0,kh=0,mh=0,nh=0,oh=0,ph=0,qh=0,rh=0,sh=0,th=0,uh=0,vh=0,wh=0,xh=0,yh=0,zh=0,Ah=0,Bh=x(0);if(ba(16+(L=lh=L-336|0)|0,0,308),ua(a+704|0,16+lh|0,12+lh|0),(kh=q[12+lh>>2])>>>0<=ih>>>0){if(jh=(hh=ba(hh,ih=0,kh))+q[16+lh>>2]|0,q[jh+8>>2]=hh+q[20+lh>>2],q[jh+36>>2]=hh+q[24+lh>>2],q[jh+44>>2]=hh+q[28+lh>>2],q[jh+48>>2]=hh+q[32+lh>>2],q[jh+52>>2]=hh+q[36+lh>>2],q[jh+12>>2]=hh+q[40+lh>>2],q[jh+16>>2]=hh+q[44+lh>>2],q[jh+20>>2]=hh+q[48+lh>>2],q[jh+28>>2]=hh+q[52+lh>>2],q[jh+32>>2]=hh+q[56+lh>>2],kh=q[a+704>>2],q[jh+60>>2]=hh+q[60+lh>>2],ph=hh+q[64+lh>>2]|0,q[jh+68>>2]=ph,q[jh+76>>2]=hh+q[68+lh>>2],q[jh+168>>2]=hh+q[72+lh>>2],q[jh+172>>2]=hh+q[76+lh>>2],q[jh+176>>2]=hh+q[80+lh>>2],q[jh+192>>2]=hh+q[84+lh>>2],q[jh+196>>2]=hh+q[88+lh>>2],1<=(0|(kh=q[kh+8>>2])))for(mh=hh+q[92+lh>>2]|0,qh=q[a+792>>2];q[20+(ph+w(ih,24)|0)>>2]=mh,mh=(15+(q[qh+(ih<<2)>>2]<<3)&-16)+mh|0,(0|kh)!=(0|(ih=ih+1|0)););if(q[jh+80>>2]=hh+q[96+lh>>2],q[jh+84>>2]=hh+q[100+lh>>2],q[jh+88>>2]=hh+q[104+lh>>2],q[jh+96>>2]=hh+q[108+lh>>2],q[jh+100>>2]=hh+q[112+lh>>2],q[jh+104>>2]=hh+q[116+lh>>2],q[jh+108>>2]=hh+q[120+lh>>2],q[jh+112>>2]=hh+q[124+lh>>2],q[jh+116>>2]=hh+q[128+lh>>2],q[jh+120>>2]=hh+q[132+lh>>2],q[jh+128>>2]=hh+q[136+lh>>2],q[jh+132>>2]=hh+q[140+lh>>2],q[jh+136>>2]=hh+q[144+lh>>2],q[jh+140>>2]=hh+q[148+lh>>2],q[jh+144>>2]=hh+q[152+lh>>2],q[jh+148>>2]=hh+q[156+lh>>2],q[jh+152>>2]=hh+q[160+lh>>2],q[jh+156>>2]=hh+q[164+lh>>2],q[jh+160>>2]=hh+q[168+lh>>2],q[jh+164>>2]=hh+q[172+lh>>2],ih=q[a+704>>2],q[jh+204>>2]=hh+q[176+lh>>2],q[jh+248>>2]=hh+q[180+lh>>2],q[jh+260>>2]=hh+q[184+lh>>2],q[jh+264>>2]=hh+q[188+lh>>2],q[jh+268>>2]=hh+q[192+lh>>2],kh=hh+q[196+lh>>2]|0,q[jh+272>>2]=kh,!((0|(ph=q[ih+16>>2]))<1)&&(mh=hh+q[200+lh>>2]|0,q[kh>>2]=mh,(ih=1)!=(0|ph)))for(kh=0;mh=(15+(q[q[a+876>>2]+(kh<<2)>>2]<<3)&-16)+mh|0,q[q[jh+272>>2]+(ih<<2)>>2]=mh,(0|ph)!=(0|(ih=(kh=ih)+1|0)););if(q[jh+276>>2]=hh+q[204+lh>>2],q[jh+280>>2]=hh+q[208+lh>>2],q[jh+284>>2]=hh+q[212+lh>>2],q[jh+288>>2]=hh+q[216+lh>>2],q[jh+208>>2]=hh+q[220+lh>>2],q[jh+212>>2]=hh+q[224+lh>>2],q[jh+216>>2]=hh+q[228+lh>>2],q[jh+224>>2]=hh+q[232+lh>>2],q[jh+228>>2]=hh+q[236+lh>>2],q[jh+232>>2]=hh+q[240+lh>>2],q[jh+236>>2]=hh+q[244+lh>>2],q[jh+240>>2]=hh+q[248+lh>>2],q[jh+244>>2]=hh+q[252+lh>>2],ih=q[256+lh>>2],oh=hh+q[260+lh>>2]|0,q[jh+300>>2]=oh,rh=hh+ih|0,q[jh+296>>2]=rh,th=hh+q[264+lh>>2]|0,q[jh+308>>2]=th,ih=q[a+704>>2],kh=q[276+lh>>2],mh=q[272+lh>>2],qh=hh+q[268+lh>>2]|0,q[jh+316>>2]=qh,1<=(0|(ph=q[ih+48>>2])))for(mh=hh+mh|0,kh=hh+kh|0,nh=q[a+1e3>>2],ih=0;sh=qh+w(ih,36)|0,q[sh+20>>2]=kh,q[sh+16>>2]=mh,kh=(sh=1<<q[nh+(ih<<2)>>2]<<2)+kh|0,mh=mh+sh|0,(0|ph)!=(0|(ih=ih+1|0)););if(ih=q[a+704>>2],kh=hh+q[280+lh>>2]|0,q[jh+324>>2]=kh,1<=(0|(ph=q[ih+72>>2])))for(mh=hh+q[284+lh>>2]|0,nh=q[a+1032>>2],ih=0;q[12+(kh+w(ih,28)|0)>>2]=mh,mh=(q[nh+(ih<<2)>>2]<<4)+mh|0,(0|ph)!=(0|(ih=ih+1|0)););if(q[jh+328>>2]=hh+q[288+lh>>2],q[jh+332>>2]=hh+q[292+lh>>2],q[jh+336>>2]=hh+q[296+lh>>2],q[jh+344>>2]=hh+q[300+lh>>2],q[jh+348>>2]=hh+q[304+lh>>2],q[jh+352>>2]=hh+q[308+lh>>2],q[jh+356>>2]=hh+q[312+lh>>2],q[jh+364>>2]=hh+q[316+lh>>2],ih=q[320+lh>>2],q[jh+376>>2]=1,q[jh+368>>2]=hh+ih,q[jh+380>>2]=1&o[q[a+708>>2]+20|0],ph=q[a+704>>2],kh=q[ph+20>>2],1<=(0|(q[jh+292>>2]=kh))){for(sh=q[a+932>>2],uh=q[a+928>>2],yh=q[a+924>>2],nh=q[a+916>>2],vh=q[a+920>>2],zh=q[a+908>>2],Ah=q[a+912>>2],mh=kh;hh=rh+w(mh=mh+-1|0,40)|0,wh=(ih=mh<<2)+Ah|0,q[hh>>2]=q[wh>>2],xh=ih+zh|0,q[hh+4>>2]=q[xh>>2],u[hh+8>>2]=u[xh>>2]-u[wh>>2],q[hh+12>>2]=q[ih+vh>>2],q[hh+32>>2]=q[ih+nh>>2],Bh=$b(x(q[ih+yh>>2])),u[hh+16>>2]=Bh,u[hh+20>>2]=Bh*x(1.5),q[hh+24>>2]=q[ih+uh>>2],ih=q[ih+sh>>2],q[hh+36>>2]=1,q[hh+28>>2]=ih,0<(0|mh););for(;q[(hh=(kh=kh+-1|0)<<2)+oh>>2]=q[hh+nh>>2],0<(0|kh););}if(ih=q[ph+52>>2],1<=(0|(q[jh+304>>2]=ih)))for(kh=q[a+1004>>2],mh=q[a+1012>>2],nh=q[a+1008>>2];hh=th+w(ih=ih+-1|0,28)|0,oh=ih<<2,q[hh>>2]=q[oh+nh>>2],oh=q[kh+oh>>2],q[hh+20>>2]=1,q[hh+24>>2]=1,q[hh+12>>2]=0,q[hh+4>>2]=mh+(oh<<2),0<(0|ih););if(ih=q[ph+48>>2],1<=(0|(q[jh+312>>2]=ih)))for(kh=q[a+996>>2],mh=q[a+992>>2],nh=q[a+1e3>>2];hh=qh+w(ih=ih+-1|0,36)|0,rh=q[(oh=ih<<2)+nh>>2],q[hh>>2]=rh,q[hh+4>>2]=1<<rh,oh=q[kh+oh>>2],q[hh+24>>2]=1,q[hh+28>>2]=1,q[hh+12>>2]=mh+(oh<<2),0<(0|ih););if(mh=q[ph>>2],q[jh+4>>2]=mh,kh=q[a+720>>2],q[jh+40>>2]=kh,(0|mh)<1)ih=0;else{for(nh=q[a+732>>2],oh=q[a+736>>2],rh=q[a+740>>2],th=q[jh+52>>2],sh=q[jh+8>>2],ih=mh;hh=(ih=ih+-1|0)<<2,q[(uh=sh+(ih<<3)|0)>>2]=q[hh+rh>>2],q[uh+4>>2]=q[hh+oh>>2],u[hh+th>>2]=q[hh+nh>>2]?x(1):x(0),0<(0|ih););for(nh=q[jh+12>>2],ih=0;hh=q[4+(qh+w(q[(oh=(mh=mh+-1|0)<<2)+kh>>2],36)|0)>>2],ih=(q[nh+oh>>2]=hh)+ih|0,0<(0|mh););}if(q[jh+24>>2]=ih,mh=q[ph+4>>2],q[jh+56>>2]=mh,q[jh+180>>2]=q[a+752>>2],q[jh+184>>2]=q[a+780>>2],q[jh+188>>2]=q[a+804>>2],1<=(0|mh)){for(;;){mh=mh+-1|0,hh=q[jh+60>>2]+(mh<<5)|0,ih=mh<<2,q[hh>>2]=q[ih+q[a+764>>2]>>2],q[hh+4>>2]=q[ih+q[a+768>>2]>>2],kh=q[ih+q[a+772>>2]>>2],q[hh+8>>2]=kh,ph=q[ih+q[a+776>>2]>>2],q[hh+12>>2]=ph,q[hh+28>>2]=q[ih+q[a+760>>2]>>2];c:if(kh>>>0<=1){if(kh-1){q[hh+20>>2]=1,q[hh+16>>2]=2,q[hh+24>>2]=q[jh+68>>2]+w(ph,24);break c}q[hh+20>>2]=3,q[hh+16>>2]=4,q[hh+24>>2]=q[jh+76>>2]+(ph<<5)}else Y(4,1026,0);if(!(0<(0|mh)))break}ph=q[a+704>>2]}mh=q[ph+8>>2];d:if(!((0|(q[jh+64>>2]=mh))<1)){if(ih=mh+-1|0,qh=q[a+792>>2],nh=q[a+800>>2],oh=q[a+796>>2],rh=q[jh+68>>2],r[a+4|0]<2)for(;;)if(hh=rh+w(ih,24)|0,kh=ih<<2,q[hh>>2]=q[kh+oh>>2],q[hh+4>>2]=q[kh+nh>>2],kh=q[kh+qh>>2],q[hh+8>>2]=0,q[hh+12>>2]=kh,hh=0<(0|ih),ih=ih+-1|0,!hh)break d;for(th=q[a+1108>>2];hh=rh+w(ih,24)|0,kh=ih<<2,q[hh>>2]=q[kh+oh>>2],q[hh+4>>2]=q[kh+nh>>2],q[hh+12>>2]=q[kh+qh>>2],q[hh+8>>2]=q[kh+th>>2],hh=0<(0|ih),ih=ih+-1|0,hh;);}if(hh=q[ph+12>>2],1<=(0|(q[jh+72>>2]=hh)))for(kh=q[a+816>>2],qh=q[jh+76>>2],ih=hh;q[qh+((ih=ih+-1|0)<<5)>>2]=q[kh+(ih<<2)>>2],0<(0|ih););if(1<=((kh=ih=0)|mh)){for(qh=q[jh+80>>2],nh=q[jh+184>>2],oh=q[jh+316>>2];hh=q[4+(oh+w(q[(rh=(mh=mh+-1|0)<<2)+nh>>2],36)|0)>>2],kh=(q[qh+rh>>2]=hh)+kh|0,0<(0|mh););hh=q[jh+72>>2]}if(q[jh+92>>2]=kh,1<=(0|hh))for(mh=q[jh+112>>2],qh=q[jh+188>>2],nh=q[jh+316>>2];kh=q[4+(nh+w(q[(oh=(hh=hh+-1|0)<<2)+qh>>2],36)|0)>>2],ih=ih+(q[mh+oh>>2]=kh)|0,0<(0|hh););if(q[jh+124>>2]=ih,kh=q[ph+16>>2],q[jh+200>>2]=kh,qh=q[a+840>>2],q[jh+252>>2]=qh,(0|kh)<1)ih=0;else{for(nh=q[a+856>>2],oh=q[a+876>>2],rh=q[a+864>>2],th=q[a+860>>2],sh=q[jh+204>>2],ih=kh;mh=(ih=ih+-1|0)<<2,q[(hh=sh+(ih<<4)|0)>>2]=q[mh+th>>2],q[hh+4>>2]=q[mh+rh>>2],q[hh+12>>2]=q[mh+oh>>2],q[hh+8>>2]=q[mh+nh>>2],0<(0|ih););for(mh=q[jh+208>>2],nh=q[jh+316>>2],ih=0;hh=q[4+(nh+w(q[(oh=(kh=kh+-1|0)<<2)+qh>>2],36)|0)>>2],ih=(q[mh+oh>>2]=hh)+ih|0,0<(0|kh););}if(q[jh+220>>2]=ih,mh=q[ph+72>>2],1<=(0|(q[jh+320>>2]=mh)))for(oh=q[a+1028>>2],rh=q[a+1044>>2],th=q[a+1040>>2],sh=q[a+1036>>2],uh=q[a+1032>>2],yh=q[jh+324>>2],kh=0;;){if(hh=yh+w(kh,28)|0,qh=q[(ih=kh<<2)+uh>>2],q[hh+4>>2]=qh,q[hh>>2]=q[ih+sh>>2],nh=q[ih+th>>2],q[hh+16>>2]=nh,vh=q[ih+rh>>2],q[hh+20>>2]=vh,q[hh+8>>2]=0,q[hh+24>>2]=1+(nh-vh|0),1<=(0|qh))for(vh=q[ih+oh>>2],zh=q[hh+12>>2],Ah=q[a+1056>>2],wh=q[a+1048>>2],xh=q[a+1052>>2],ih=0;nh=ih+vh<<2,q[4+(hh=zh+(ih<<4)|0)>>2]=q[nh+xh>>2],q[hh>>2]=q[nh+wh>>2],nh=q[nh+Ah>>2],q[hh+12>>2]=0,q[hh+8>>2]=nh,(0|qh)!=(0|(ih=ih+1|0)););if((0|mh)==(0|(kh=kh+1|0)))break}if(hh=q[ph+80>>2],q[jh+340>>2]=hh,mh=q[a+1068>>2],q[jh+372>>2]=mh,(0|hh)<1)hh=0;else{for(ph=q[a+1100>>2],qh=q[a+1088>>2],nh=q[a+1096>>2],oh=q[a+1092>>2],rh=q[a+1084>>2],th=q[a+1080>>2],sh=q[jh+344>>2];ih=sh+w(hh=hh+-1|0,24)|0,kh=hh<<2,q[ih>>2]=q[kh+th>>2],q[ih+4>>2]=q[kh+rh>>2],q[ih+8>>2]=q[kh+oh>>2],kh=q[kh+qh>>2],q[ih+16>>2]=ph+(kh<<1),q[ih+12>>2]=nh+(kh<<2),0<(0|hh););if((0|(ih=q[jh+340>>2]))<1)hh=0;else for(ph=q[jh+348>>2],qh=q[jh+316>>2],hh=0;kh=q[4+(qh+w(q[(nh=(ih=ih+-1|0)<<2)+mh>>2],36)|0)>>2],hh=hh+(q[nh+ph>>2]=kh)|0,0<(0|ih););}q[jh>>2]=a,q[jh+360>>2]=hh,ta(jh)}return L=336+lh|0,jh}(a,cb,db|=0))break a;q[36+pb>>2]=1872,q[32+pb>>2]=1846,Y(4,1087,32+pb|0)}else q[52+pb>>2]=1441,q[48+pb>>2]=1846,Y(4,1087,48+pb|0);else q[20+pb>>2]=1246,q[16+pb>>2]=1846,Y(4,1087,16+pb|0);else q[4+pb>>2]=1828,q[pb>>2]=1846,Y(4,1087,pb);cb=0}return L=64+pb|0,0|cb}function wa(a){var cb;return L=cb=L-16|0,a=(a|=0)?function(a){var Uh;return ba(16+(L=Uh=L-336|0)|0,0,308),ua(a+704|0,16+Uh|0,12+Uh|0),L=336+Uh|0,q[12+Uh>>2]}(a):(q[4+cb>>2]=1828,q[cb>>2]=1810,Y(4,1087,cb),0),L=16+cb|0,0|a}function xa(a,db){var qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0;tb=a+db|0;a:{b:if(!(1&(qb=q[a+4>>2]))){if(!(3&qb))break a;if(db=(qb=q[a>>2])+db|0,(0|(a=a-qb|0))==q[1928]){if(3==(3&(qb=q[tb+4>>2])))return q[1925]=db,q[tb+4>>2]=-2&qb,q[a+4>>2]=1|db,void(q[tb>>2]=db)}else{if(qb>>>0<=255){if(sb=qb>>>3,qb=q[a+8>>2],(0|(rb=q[a+12>>2]))==(0|qb)){wb=7692,xb=q[1923]&jc(sb),q[wb>>2]=xb;break b}q[qb+12>>2]=rb,q[rb+8>>2]=qb;break b}if(vb=q[a+24>>2],(0|(qb=q[a+12>>2]))==(0|a))if((sb=q[(rb=a+20|0)>>2])||(sb=q[(rb=a+16|0)>>2])){for(;ub=rb,(sb=q[(rb=(qb=sb)+20|0)>>2])||(rb=qb+16|0,sb=q[qb+16>>2]););q[ub>>2]=0}else qb=0;else rb=q[a+8>>2],q[rb+12>>2]=qb,q[qb+8>>2]=rb;if(!vb)break b;rb=q[a+28>>2];e:{if(q[(sb=7996+(rb<<2)|0)>>2]==(0|a)){if(q[sb>>2]=qb)break e;wb=7696,xb=q[1924]&jc(rb),q[wb>>2]=xb;break b}if(!(q[vb+(q[vb+16>>2]==(0|a)?16:20)>>2]=qb))break b}if(q[qb+24>>2]=vb,(rb=q[a+16>>2])&&(q[qb+16>>2]=rb,q[rb+24>>2]=qb),!(rb=q[a+20>>2]))break b;q[qb+20>>2]=rb,q[rb+24>>2]=qb}}f:{if(!(2&(qb=q[tb+4>>2]))){if(q[1929]==(0|tb)){if(q[1929]=a,db=q[1926]+db|0,q[1926]=db,q[a+4>>2]=1|db,q[1928]!=(0|a))break a;return q[1925]=0,void(q[1928]=0)}if(q[1928]==(0|tb))return q[1928]=a,db=q[1925]+db|0,q[1925]=db,q[a+4>>2]=1|db,void(q[a+db>>2]=db);db=(-8&qb)+db|0;g:if(qb>>>0<=255){if(sb=qb>>>3,qb=q[tb+8>>2],(0|(rb=q[tb+12>>2]))==(0|qb)){wb=7692,xb=q[1923]&jc(sb),q[wb>>2]=xb;break g}q[qb+12>>2]=rb,q[rb+8>>2]=qb}else{if(vb=q[tb+24>>2],(0|tb)==(0|(qb=q[tb+12>>2])))if((sb=q[(rb=tb+20|0)>>2])||(sb=q[(rb=tb+16|0)>>2])){for(;ub=rb,(sb=q[(rb=(qb=sb)+20|0)>>2])||(rb=qb+16|0,sb=q[qb+16>>2]););q[ub>>2]=0}else qb=0;else rb=q[tb+8>>2],q[rb+12>>2]=qb,q[qb+8>>2]=rb;if(vb){rb=q[tb+28>>2];j:{if(q[(sb=7996+(rb<<2)|0)>>2]==(0|tb)){if(q[sb>>2]=qb)break j;wb=7696,xb=q[1924]&jc(rb),q[wb>>2]=xb;break g}if(!(q[vb+(q[vb+16>>2]==(0|tb)?16:20)>>2]=qb))break g}q[qb+24>>2]=vb,(rb=q[tb+16>>2])&&(q[qb+16>>2]=rb,q[rb+24>>2]=qb),(rb=q[tb+20>>2])&&(q[qb+20>>2]=rb,q[rb+24>>2]=qb)}}if(q[a+4>>2]=1|db,q[a+db>>2]=db,q[1928]!=(0|a))break f;return void(q[1925]=db)}q[tb+4>>2]=-2&qb,q[a+4>>2]=1|db,q[a+db>>2]=db}if(db>>>0<=255)return db=7732+((qb=db>>>3)<<3)|0,qb=(rb=q[1923])&(qb=1<<qb)?q[db+8>>2]:(q[1923]=qb|rb,db),q[db+8>>2]=a,q[qb+12>>2]=a,q[a+12>>2]=db,void(q[a+8>>2]=qb);q[a+16>>2]=0,qb=q[a+20>>2]=0,(sb=db>>>8)&&(qb=31,16777215<db>>>0||(qb=28+((qb=((tb=(sb<<=ub=sb+1048320>>>16&8)<<(qb=sb+520192>>>16&4))<<(sb=tb+245760>>>16&2)>>>15)-(sb|qb|ub)|0)<<1|db>>>qb+21&1)|0)),sb=7996+((q[(rb=a)+28>>2]=qb)<<2)|0;m:{if((rb=q[1924])&(ub=1<<qb)){for(rb=db<<(31==(0|qb)?0:25-(qb>>>1)|0),qb=q[sb>>2];;){if((-8&q[(sb=qb)+4>>2])==(0|db))break m;if(qb=rb>>>29,rb<<=1,!(qb=q[16+(ub=sb+(4&qb)|0)>>2]))break}q[ub+16>>2]=a}else q[1924]=rb|ub,q[sb>>2]=a;return q[a+24>>2]=sb,q[a+12>>2]=a,void(q[a+8>>2]=a)}db=q[sb+8>>2],q[db+12>>2]=a,q[sb+8>>2]=a,q[a+24>>2]=0,q[a+12>>2]=sb,q[a+8>>2]=db}}function ya(a,db,yb){var zb=0;a:{if(8!=(0|db)){if(zb=28,3&db|1!=(0|function(a){for(var ri=0,ui=0;ui=ri,a;)a&=a-1,ri=ri+1|0;return ui}(db>>>2)))break a;if(zb=48,-64-db>>>0<yb>>>0)break a;db=function(a,$h){var ai=0,bi=0,di=0,ei=0,fi=0;if((bi=a>>>0>(ai=16)?a:16)+-1&bi)for(;ai=(a=ai)<<1,a>>>0<bi>>>0;);else a=bi;return-64-a>>>0<=$h>>>0?(q[1906]=48,0):(ai=ja(12+((bi=$h>>>0<11?16:$h+11&-8)+a|0)|0))?($h=ai+-8|0,ai&a+-1?(di=(-8&(fi=q[(ei=ai+-4|0)>>2]))-(ai=(a=15<(ai=((a+ai|0)-1&0-a)-8|0)-$h>>>0?ai:a+ai|0)-$h|0)|0,3&fi?(q[a+4>>2]=di|1&q[a+4>>2]|2,q[4+(di=a+di|0)>>2]=1|q[di+4>>2],q[ei>>2]=ai|1&q[ei>>2]|2,q[a+4>>2]=1|q[a+4>>2],xa($h,ai)):($h=q[$h>>2],q[a+4>>2]=di,q[a>>2]=$h+ai)):a=$h,3&($h=q[a+4>>2])&&((ai=-8&$h)>>>0<=bi+16>>>0||(q[a+4>>2]=bi|1&$h|2,$h=a+bi|0,bi=ai-bi|0,q[$h+4>>2]=3|bi,q[4+(ai=a+ai|0)>>2]=1|q[ai+4>>2],xa($h,bi))),a+8|0):0}(16<db>>>0?db:16,yb)}else db=ja(yb);if(!db)return 48;q[a>>2]=db,zb=0}return zb}function za(a){var db=0,yb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0;a:if(a){Cb=(Ab=a+-8|0)+(a=-8&(yb=q[a+-4>>2]))|0;b:if(!(1&yb)){if(!(3&yb))break a;if((Ab=Ab-(yb=q[Ab>>2])|0)>>>0<t[1927])break a;if(a=a+yb|0,q[1928]==(0|Ab)){if(3==(3&(yb=q[Cb+4>>2])))return q[1925]=a,q[Cb+4>>2]=-2&yb,q[Ab+4>>2]=1|a,void(q[a+Ab>>2]=a)}else{if(yb>>>0<=255){if(Bb=q[Ab+8>>2],yb>>>=3,(0|(db=q[Ab+12>>2]))==(0|Bb)){Fb=7692,Gb=q[1923]&jc(yb),q[Fb>>2]=Gb;break b}q[Bb+12>>2]=db,q[db+8>>2]=Bb;break b}if(Eb=q[Ab+24>>2],(0|Ab)==(0|(yb=q[Ab+12>>2])))if((db=q[(Bb=Ab+20|0)>>2])||(db=q[(Bb=Ab+16|0)>>2])){for(;Db=Bb,(db=q[(Bb=(yb=db)+20|0)>>2])||(Bb=yb+16|0,db=q[yb+16>>2]););q[Db>>2]=0}else yb=0;else db=q[Ab+8>>2],q[db+12>>2]=yb,q[yb+8>>2]=db;if(!Eb)break b;Bb=q[Ab+28>>2];e:{if(q[(db=7996+(Bb<<2)|0)>>2]==(0|Ab)){if(q[db>>2]=yb)break e;Fb=7696,Gb=q[1924]&jc(Bb),q[Fb>>2]=Gb;break b}if(!(q[Eb+(q[Eb+16>>2]==(0|Ab)?16:20)>>2]=yb))break b}if(q[yb+24>>2]=Eb,(db=q[Ab+16>>2])&&(q[yb+16>>2]=db,q[db+24>>2]=yb),!(db=q[Ab+20>>2]))break b;q[yb+20>>2]=db,q[db+24>>2]=yb}}if(!(Cb>>>0<=Ab>>>0)&&1&(yb=q[Cb+4>>2])){f:{if(!(2&yb)){if(q[1929]==(0|Cb)){if(q[1929]=Ab,a=q[1926]+a|0,q[1926]=a,q[Ab+4>>2]=1|a,q[1928]!=(0|Ab))break a;return q[1925]=0,void(q[1928]=0)}if(q[1928]==(0|Cb))return q[1928]=Ab,a=q[1925]+a|0,q[1925]=a,q[Ab+4>>2]=1|a,void(q[a+Ab>>2]=a);a=(-8&yb)+a|0;g:if(yb>>>0<=255){if(yb>>>=3,(0|(db=q[Cb+8>>2]))==(0|(Bb=q[Cb+12>>2]))){Fb=7692,Gb=q[1923]&jc(yb),q[Fb>>2]=Gb;break g}q[db+12>>2]=Bb,q[Bb+8>>2]=db}else{if(Eb=q[Cb+24>>2],(0|Cb)==(0|(yb=q[Cb+12>>2])))if((db=q[(Bb=Cb+20|0)>>2])||(db=q[(Bb=Cb+16|0)>>2])){for(;Db=Bb,(db=q[(Bb=(yb=db)+20|0)>>2])||(Bb=yb+16|0,db=q[yb+16>>2]););q[Db>>2]=0}else yb=0;else db=q[Cb+8>>2],q[db+12>>2]=yb,q[yb+8>>2]=db;if(Eb){Bb=q[Cb+28>>2];j:{if(q[(db=7996+(Bb<<2)|0)>>2]==(0|Cb)){if(q[db>>2]=yb)break j;Fb=7696,Gb=q[1924]&jc(Bb),q[Fb>>2]=Gb;break g}if(!(q[Eb+(q[Eb+16>>2]==(0|Cb)?16:20)>>2]=yb))break g}q[yb+24>>2]=Eb,(db=q[Cb+16>>2])&&(q[yb+16>>2]=db,q[db+24>>2]=yb),(db=q[Cb+20>>2])&&(q[yb+20>>2]=db,q[db+24>>2]=yb)}}if(q[Ab+4>>2]=1|a,q[a+Ab>>2]=a,q[1928]!=(0|Ab))break f;return void(q[1925]=a)}q[Cb+4>>2]=-2&yb,q[Ab+4>>2]=1|a,q[a+Ab>>2]=a}if(a>>>0<=255)return yb=7732+((a>>>=3)<<3)|0,a=(db=q[1923])&(a=1<<a)?q[yb+8>>2]:(q[1923]=a|db,yb),q[yb+8>>2]=Ab,q[a+12>>2]=Ab,q[Ab+12>>2]=yb,void(q[Ab+8>>2]=a);q[Ab+16>>2]=0,db=q[Ab+20>>2]=0,(Bb=a>>>8)&&(db=31,16777215<a>>>0||(db=Bb,db<<=Bb=Bb+1048320>>>16&8,db=28+((db=((db<<=Eb=db+520192>>>16&4)<<(Db=db+245760>>>16&2)>>>15)-(Db|Bb|Eb)|0)<<1|a>>>db+21&1)|0)),Db=7996+((q[(yb=Ab)+28>>2]=db)<<2)|0;m:if((Bb=q[1924])&(yb=1<<db)){Bb=a<<(31==(0|db)?0:25-(db>>>1)|0),yb=q[Db>>2];n:{for(;;){if((-8&q[(db=yb)+4>>2])==(0|a))break n;if(yb=Bb>>>29,Bb<<=1,!(yb=q[16+(Db=db+(4&yb)|0)>>2]))break}q[Db+16>>2]=Ab,q[Ab+12>>2]=Ab,q[Ab+24>>2]=db,q[Ab+8>>2]=Ab;break m}a=q[db+8>>2],q[a+12>>2]=Ab,q[db+8>>2]=Ab,q[Ab+24>>2]=0,q[Ab+12>>2]=db,q[Ab+8>>2]=a}else q[1924]=yb|Bb,q[Db>>2]=Ab,q[Ab+12>>2]=Ab,q[Ab+24>>2]=Db,q[Ab+8>>2]=Ab;if(a=q[1931]+-1|0,!(q[1931]=a)){for(Ab=8148;Ab=(a=q[Ab>>2])+8|0,a;);q[1931]=-1}}}}function Aa(a,Hb){var Nb,Kb,Ib=0,Jb=0,Lb=0,Mb=x(0);if(j(Hb),!((Kb=2147483647&(Ib=e(0)))>>>0<=2139095040&&(j(a),(Jb=2147483647&(Lb=e(0)))>>>0<2139095041)))return x(a+Hb);if(1065353216==(0|Ib))return ka(a);Ib=(Nb=Ib>>>30&2)|Lb>>>31;b:{c:{d:{e:{if(!Jb){f:switch(Ib-2|0){case 0:break e;case 1:break f;default:break d}return x(-3.1415927410125732)}if(2139095040!=(0|Kb)){if(!Kb|!(Jb>>>0<=218103808+Kb>>>0&&2139095040!=(0|Jb)))break b;if(Jb+218103808>>>0<Kb>>>0&&(Mb=x(0),Nb)||(Mb=ka(x(y(x(a/Hb))))),a=Mb,Ib>>>0<=2){h:switch(Ib-1|0){case 0:return x(-a);case 1:break h;default:break d}return x(x(3.1415927410125732)-x(a+x(8.742277657347586e-8)))}return x(x(a+x(8.742277657347586e-8))+x(-3.1415927410125732))}if(2139095040==(0|Jb))break c;return u[6128+(Ib<<2)>>2]}a=x(3.1415927410125732)}return a}return u[6112+(Ib<<2)>>2]}return x((0|Lb)<0?-1.5707963705062866:1.5707963705062866)}function Da(a,Wb,Xb){var $b,ec,ic,jc,mc,Yb=0,Zb=0,_b=0,ac=0,bc=0,cc=0,dc=0,fc=0,gc=0,hc=0,kc=0,lc=0;if(L=$b=L-560|0,dc=(Zb=Xb)+w(ic=0<(0|(Xb=(Xb+-3|0)/24|0))?Xb:0,-24)|0,0<=(0|(ec=q[808])))for(Zb=ec+1|0,Xb=ic;v[(320+$b|0)+(_b<<3)>>3]=(0|Xb)<0?0:+q[3248+(Xb<<2)>>2],Xb=Xb+1|0,(0|Zb)!=(0|(_b=_b+1|0)););for(bc=dc+-24|0,Zb=0;;){for(Yb=Xb=0;Yb+=v[(Xb<<3)+a>>3]*v[(320+$b|0)+(Zb-Xb<<3)>>3],1!=(0|(Xb=Xb+1|0)););if(v[(Zb<<3)+$b>>3]=Yb,Xb=(0|Zb)<(0|ec),Zb=Zb+1|0,!Xb)break}mc=23-bc|0,jc=24-bc|0,Zb=ec;a:{for(;;){if(Yb=v[(Zb<<3)+$b>>3],!(gc=((Xb=0)|(_b=Zb))<1))for(;cc=(480+$b|0)+(Xb<<2)|0,fc=Yb,ac=y(Yb*=5.960464477539063e-8)<2147483648?~~Yb:-2147483648,ac=y(fc+=-16777216*(Yb=+(0|ac)))<2147483648?~~fc:-2147483648,q[cc>>2]=ac,Yb=v[((_b=_b+-1|0)<<3)+$b>>3]+Yb,(0|Zb)!=(0|(Xb=Xb+1|0)););Yb=ha(Yb,bc),Yb+=-8*C(.125*Yb),Yb-=0|(cc=y(Yb)<2147483648?~~Yb:-2147483648);e:{f:{g:{if(kc=(0|bc)<1){if(bc)break g;ac=q[476+((Zb<<2)+$b|0)>>2]>>23}else hc=_b=(Zb<<2)+$b|0,_b=(ac=q[_b+476>>2])-((Xb=ac>>jc)<<jc)|0,cc=Xb+cc|0,ac=(q[hc+476>>2]=_b)>>mc;if((0|ac)<1)break e;break f}if(ac=2,!(.5<=Yb)){ac=0;break e}}if(_b=Xb=0,!gc)for(;;){gc=q[(lc=(480+$b|0)+(Xb<<2)|0)>>2],hc=16777215;i:{j:{if(!_b){if(!gc)break j;hc=16777216,_b=1}q[lc>>2]=hc-gc;break i}_b=0}if((0|Zb)==(0|(Xb=Xb+1|0)))break}kc||1<(Xb=bc+-1|0)>>>0||(q[476+(Xb=(Zb<<2)+$b|0)>>2]=Xb-1?8388607&q[Xb+476>>2]:4194303&q[Xb+476>>2]),cc=cc+1|0,2==(0|ac)&&(Yb=1-Yb,ac=2,_b&&(Yb-=ha(1,bc)))}if(0!=Yb)break;if(!(((_b=0)|(Xb=Zb))<=(0|ec))){for(;_b=q[(480+$b|0)+((Xb=Xb+-1|0)<<2)>>2]|_b,(0|ec)<(0|Xb););if(_b){for(dc=bc;dc=dc+-24|0,!q[(480+$b|0)+((Zb=Zb+-1|0)<<2)>>2];);break a}}for(Xb=1;Xb=(_b=Xb)+1|0,!q[(480+$b|0)+(ec-_b<<2)>>2];);for(_b=Zb+_b|0;;){for(Zb=cc=Zb+1|0,v[(320+$b|0)+(cc<<3)>>3]=q[3248+(ic+Zb<<2)>>2],Yb=Xb=0;Yb+=v[(Xb<<3)+a>>3]*v[(320+$b|0)+(cc-Xb<<3)>>3],1!=(0|(Xb=Xb+1|0)););if(v[(Zb<<3)+$b>>3]=Yb,!((0|Zb)<(0|_b)))break}Zb=_b}16777216<=(Yb=ha(Yb,0-bc|0))?(a=(480+$b|0)+(Zb<<2)|0,fc=Yb,Xb=y(Yb*=5.960464477539063e-8)<2147483648?~~Yb:-2147483648,_b=y(Yb=fc+-16777216*(0|Xb))<2147483648?~~Yb:-2147483648,q[a>>2]=_b,Zb=Zb+1|0):(Xb=y(Yb)<2147483648?~~Yb:-2147483648,dc=bc),q[(480+$b|0)+(Zb<<2)>>2]=Xb}if(Yb=ha(1,dc),!((0|Zb)<=-1)){for(Xb=Zb;v[(Xb<<3)+$b>>3]=Yb*q[(480+$b|0)+(Xb<<2)>>2],Yb*=5.960464477539063e-8,a=0<(0|Xb),Xb=Xb+-1|0,a;);if(!((0|Zb)<=-1))for(Xb=Zb;;){for(bc=Zb-(a=Xb)|0,Xb=Yb=0;Yb+=v[6016+(Xb<<3)>>3]*v[(a+Xb<<3)+$b>>3],!((0|ec)<=(0|Xb))&&(dc=Xb>>>0<bc>>>0,Xb=Xb+1|0,dc););if(v[(160+$b|0)+(bc<<3)>>3]=Yb,Xb=a+-1|0,!(0<(0|a)))break}}if((Yb=0)<=(0|Zb))for(;Yb+=v[(160+$b|0)+(Zb<<3)>>3],a=0<(0|Zb),Zb=Zb+-1|0,a;);return v[Wb>>3]=ac?-Yb:Yb,L=560+$b|0,7&cc}function Ia(a,Wb){var Xb=0,nc=0,vc=0;Xb=0!=(0|Wb);a:{b:{c:{d:if(!(!Wb|!(3&a)))for(;;){if(!r[0|a])break c;if(a=a+1|0,Xb=0!=(0|(Wb=Wb+-1|0)),!Wb)break d;if(!(3&a))break}if(!Xb)break b}if(!r[0|a])break a;e:{if(4<=Wb>>>0){for(Xb=(Xb=Wb+-4|0)-(nc=-4&Xb)|0,nc=4+(a+nc|0)|0;;){if((-1^(vc=q[a>>2]))&vc+-16843009&-2139062144)break e;if(a=a+4|0,!(3<(Wb=Wb+-4|0)>>>0))break}Wb=Xb,a=nc}if(!Wb)break b}for(;;){if(!r[0|a])break a;if(a=a+1|0,!(Wb=Wb+-1|0))break}}return 0}return a}function Na(a,Wb,Hc,Ic){if(a|Wb)for(;o[0|(Hc=Hc+-1|0)]=r[3168+(15&a)|0]|Ic,(a=(15&Wb)<<28|a>>>4)|(Wb>>>=4););return Hc}function Oa(a,Wb,Hc){if(a|Wb)for(;o[0|(Hc=Hc+-1|0)]=7&a|48,(a=(7&Wb)<<29|a>>>3)|(Wb>>>=3););return Hc}function $b(a){var $h=x(0),gi=x(0),hi=0,ii=0,ji=x(0),ki=x(0),li=x(0),mi=x(0),ni=0,oi=x(0),pi=x(0),qi=0;a:{b:{if(j(a),ii=2147483647&(hi=e(0))){if(!(ii>>>0<2139095041))return x(x(.10000000149011612)+a);if(1065353216==(0|ii))return x(-1<(0|hi)?.10000000149011612:10);if(2139095040==(0|ii))return x(-1<(0|hi)?0:-a);if(1073741824==(0|hi))return x(.010000000707805157);if(1056964608==(0|hi))return x(.3162277638912201);if(1291845633<=ii>>>0)return x((0|hi)<0?H:0);if(ji=u[1537],ki=x(x(1.600000023841858)-ji),li=x(x(1)/x(ji+x(1.600000023841858))),f(0,-4096&(j(gi=x(ki*li)),e(0))),$h=k(),mi=x($h*$h),pi=u[1541],ji=x(li*x(x(ki-x((oi=$h)*x(3.099609375)))-x($h*x(x(1.600000023841858)-x(x(3.099609375)-ji))))),li=x(x(gi+$h)*ji),$h=x(gi*gi),ki=x(li+x(x($h*$h)*x(x($h*x(x($h*x(x($h*x(x($h*x(x($h*x(.20697501301765442))+x(.23066075146198273)))+x(.2727281153202057)))+x(.3333333432674408)))+x(.4285714328289032)))+x(.6000000238418579)))),f(0,-4096&(j(x(x(mi+x(3))+ki)),e(0))),$h=k(),li=x(oi*$h),gi=x(x(ji*$h)+x(gi*x(ki-x(x($h+x(-3))-mi)))),f(0,-4096&(j(x(li+gi)),e(0))),$h=k(),ji=x($h*x(.9619140625)),mi=x(u[1539]+x(x(x(gi-x($h-li))*x(.9617967009544373))+x($h*x(-.00011736857413779944)))),f(0,-4096&(j(x(x(pi+x(ji+mi))+x(-4))),e(0))),gi=k(),f(0,-4096&hi),ki=k(),$h=x(gi*ki),a=x(x(x(mi-x(x(x(gi-x(-4))-pi)-ji))*a)+x(x(a-ki)*gi)),j(gi=x($h+a)),1124073473<=(0|(hi=e(0))))break b;d:{e:{if((ii=1124073472)==(0|hi)){if(!(x(a+x(4.299566569443414e-8))>x(gi-$h)))break e;break b}if(ii=2147483647&hi,!(a<=x(gi-$h)^1|-1021968384!=(0|hi))|1125515265<=ii>>>0)break a;if(ii>>>0<1056964609)break d}ni=(8388607&(ii=(8388608>>>(ii>>>23)-126)+hi|0)|8388608)>>>150-(qi=ii>>>23&255),ni=(0|hi)<0?0-ni|0:ni,$h=x($h-(f(0,ii&-8388608>>qi+-127),k())),j(x(a+$h)),hi=e(0)}f(0,-32768&hi),gi=k(),ji=x(gi*x(.693145751953125)),gi=x(x(gi*x(14286065379565116e-22))+x(x(a-x(gi-$h))*x(.6931471824645996))),a=x(ji+gi),$h=x(a*a),$h=x(a-x($h*x(x($h*x(x($h*x(x($h*x(x($h*x(4.138136944220605e-8))+x(-16533901998627698e-22)))+x(661375597701408e-19)))+x(-.0027777778450399637)))+x(.1666666716337204)))),oi=x(x(a*$h)/x($h+x(-2))),$h=x(gi-x(a-ji)),a=(0|(hi=0|(j(a=x(x(a-x(oi-x($h+x(a*$h))))+x(1))),e(0)+(ni<<23))))<=8388607?function(a,ri){var si=0;a:if(128<=(0|ri)){if(a=x(a*x(17014118346046923e22)),(0|(si=ri+-127|0))<128){ri=si;break a}a=x(a*x(17014118346046923e22)),ri=((0|ri)<381?ri:381)+-254|0}else-127<(0|ri)||(a=x(a*x(11754943508222875e-54)),ri=-127<(0|(si=ri+126|0))?si:(a=x(a*x(11754943508222875e-54)),(-378<(0|ri)?ri:-378)+252|0));return x(a*(f(0,1065353216+(ri<<23)|0),k()))}(a,ni):(f(0,hi),k()),a=x(x(1)*a)}else a=x(1);return a}return x(H)}return x(0)}function dc(a,ri){var low,high;low=0|a,high=0|ri,b[0]=low,b[1]=high}function gc(a,ri,ui){return function(a,ri,ui){var wi,xi,yi,zi,vi=0;return zi=w(wi=ui>>>16,vi=a>>>16),a=(65535&(vi=((yi=w(xi=65535&ui,a&=65535))>>>16)+w(vi,xi)|0))+w(a,wi)|0,M=((zi+w(ri,ui)|0)+(vi>>>16)|0)+(a>>>16)|0,65535&yi|a<<16}(a,ri,ui)}function hc(a,ri,ui){return function(a,ri,ui){var Ai=0,Bi=0,Ci=0,Di=0,Ei=0,Fi=0,Gi=0,Hi=0,Ii=0;a:{b:{c:{d:{e:{f:{g:{h:{i:{if(Bi=ri){if(!(Ai=ui))break i;break h}return dc((ri=a)-w(a=(a>>>0)/(ui>>>0)|0,ui)|0,0),M=0,a}if(!a)break g;break f}if(!((Di=Ai+-1|0)&Ai))break e;Ei=0-(Di=(z(Ai)+33|0)-z(Bi)|0)|0;break c}return dc(0,Bi-w(a=(Bi>>>0)/0|0,0)|0),M=0,a}if((Ai=32-z(Bi)|0)>>>0<31)break d;break b}if(dc(a&Di,0),1==(0|Ai))break a;return ui=31&(Ai=Ai?31-z(Ai+-1^Ai)|0:32),a=32<=(63&Ai)>>>0?(Bi=0,ri>>>ui):(Bi=ri>>>ui,((1<<ui)-1&ri)<<32-ui|a>>>ui),M=Bi,a}Di=Ai+1|0,Ei=63-Ai|0}if(Ai=ri,Ci=31&(Bi=63&Di),Ci=32<=Bi>>>0?(Bi=0,Ai>>>Ci):(Bi=Ai>>>Ci,((1<<Ci)-1&Ai)<<32-Ci|a>>>Ci),Ai=31&(Ei&=63),32<=Ei>>>0?(ri=a<<Ai,a=0):(ri=(1<<Ai)-1&a>>>32-Ai|ri<<Ai,a<<=Ai),Di)for((Ei=ui+(Ai=-1)|0)>>>0<4294967295&&(Ai=0);Ci=(Gi=Fi=Ci<<1|ri>>>31)-(Hi=ui&(Fi=Ai-((Bi=Bi<<1|Ci>>>31)+(Ei>>>0<Fi>>>0)|0)>>31))|0,Bi=Bi-(Gi>>>0<Hi>>>0)|0,ri=ri<<1|a>>>31,a=Ii|a<<1,Ii=Fi&=1,Di=Di+-1|0;);return dc(Ci,Bi),M=ri<<1|a>>>31,Fi|a<<1}dc(a,ri),ri=a=0}return M=ri,a}(a,ri,ui)}function jc(a){var Ji;return(-1>>>(Ji=31&a)&-2)<<Ji|(-1<<(a=0-a&31)&-2)>>>a}function N(){return buffer.byteLength/65536|0}}(H,I,J)}}l=null,b.wasmBinary&&(F=b.wasmBinary);var fa=Error,WebAssembly={};F=[],"object"!=typeof WebAssembly&&E("no native wasm support detected");var I,J=new function(a){var c=Array(17);return c.grow=function(){18<=c.length&&B("Unable to grow wasm table. Use a higher value for RESERVED_FUNCTION_POINTERS or set ALLOW_TABLE_GROWTH."),c.push(null)},c.set=function(a,e){c[a]=e},c.get=function(a){return c[a]},c}({initial:17,maximum:18,element:"anyfunc"}),K=!1;function assert(a,c){a||B("Assertion failed: "+c)}var buffer,M,L,N,ia="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function ja(a,c,d){var e=c+d;for(d=c;a[d]&&!(e<=d);)++d;if(16<d-c&&a.subarray&&ia)return ia.decode(a.subarray(c,d));for(e="";c<d;){var f=a[c++];if(128&f){var g=63&a[c++];if(192==(224&f))e+=String.fromCharCode((31&f)<<6|g);else{var m=63&a[c++];(f=224==(240&f)?(15&f)<<12|g<<6|m:(7&f)<<18|g<<12|m<<6|63&a[c++])<65536?e+=String.fromCharCode(f):(f-=65536,e+=String.fromCharCode(55296|f>>10,56320|1023&f))}}else e+=String.fromCharCode(f)}return e}function ka(a,c){return a?ja(L,a,c):""}function la(a){return 0<a%65536&&(a+=65536-a%65536),a}function ma(a){buffer=a,b.HEAP8=M=new Int8Array(a),b.HEAP16=new Int16Array(a),b.HEAP32=N=new Int32Array(a),b.HEAPU8=L=new Uint8Array(a),b.HEAPU16=new Uint16Array(a),b.HEAPU32=new Uint32Array(a),b.HEAPF32=new Float32Array(a),b.HEAPF64=new Float64Array(a)}"undefined"!=typeof TextDecoder&&new TextDecoder("utf-16le");var G=b.TOTAL_MEMORY||16777216;function O(a){for(;0<a.length;){var c=a.shift();if("function"==typeof c)c();else{var d=c.X;"number"==typeof d?void 0===c.W?b.dynCall_v(d):b.dynCall_vi(d,c.W):d(void 0===c.W?null:c.W)}}}(I=b.wasmMemory?b.wasmMemory:new function(){return{buffer:new ArrayBuffer(G/65536*65536),grow:function(a){return ca(a)}}})&&(buffer=I.buffer),G=buffer.byteLength,ma(buffer),N[2052]=5251248;var na=[],oa=[],pa=[],qa=[];function ra(){var a=b.preRun.shift();na.unshift(a)}if(Math.imul&&-5===Math.imul(4294967295,5)||(Math.imul=function(a,c){var d=65535&a,e=65535&c;return d*e+((a>>>16)*e+d*(c>>>16)<<16)|0}),!Math.fround){var sa=new Float32Array(1);Math.fround=function(a){return sa[0]=a,sa[0]}}Math.clz32||(Math.clz32=function(a){var c=32,d=a>>16;return d&&(c-=16,a=d),(d=a>>8)&&(c-=8,a=d),(d=a>>4)&&(c-=4,a=d),(d=a>>2)&&(c-=2,a=d),a>>1?c-2:c-a}),Math.trunc||(Math.trunc=function(a){return a<0?Math.ceil(a):Math.floor(a)});var P=0,Q=null,U=null;function B(a){throw b.onAbort&&b.onAbort(a),D(a),E(a),K=!0,new fa("abort("+a+"). Build with -s ASSERTIONS=1 for more info.")}b.preloadedImages={},b.preloadedAudios={};var V="data:application/octet-stream;base64,";function W(a){return String.prototype.startsWith?a.startsWith(V):0===a.indexOf(V)}var X="_em_module.wasm";if(!W(X)){var ta=X;X=b.locateFile?b.locateFile(ta,u):u+ta}function ua(){try{if(F)return new Uint8Array(F);var a=z(X);if(a)return a;if(w)return w(X);throw"both async and sync fetching of the wasm failed"}catch(c){B(c)}}oa.push({X:function(){wa()}});var xa=[null,[],[]],ya=!1;function C(a){for(var c=[],d=0;d<a.length;d++){var e=a[d];255<e&&(ya&&assert(!1,"Character code "+e+" ("+String.fromCharCode(e)+")  at offset "+d+" not in 0x00-0xFF."),e&=255),c.push(String.fromCharCode(e))}return c.join("")}var za="function"==typeof atob?atob:function(a){var c="",d=0;a=a.replace(/[^A-Za-z0-9\+\/=]/g,"");do{var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(d++)),f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(d++)),g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(d++)),m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(d++));e=e<<2|f>>4,f=(15&f)<<4|g>>2;var h=(3&g)<<6|m;c+=String.fromCharCode(e),64!==g&&(c+=String.fromCharCode(f)),64!==m&&(c+=String.fromCharCode(h))}while(d<a.length);return c};function z(a){if(W(a)){if(a=a.slice(V.length),"boolean"==typeof r&&r){try{var c=Buffer.from(a,"base64")}catch(g){c=new Buffer(a,"base64")}var d=new Uint8Array(c.buffer,c.byteOffset,c.byteLength)}else try{var e=za(a),f=new Uint8Array(e.length);for(c=0;c<e.length;++c)f[c]=e.charCodeAt(c);d=f}catch(g){throw Error("Converting base64 string to bytes failed.")}return d}}var H={a:function(a,c,d){L.set(L.subarray(c,c+d),a)},b:function(a){if(2147418112<a)return!1;for(var c=Math.max(M.length,16777216);c<a;)c=c<=536870912?la(2*c):Math.min(la((3*c+2147483648)/4),2147418112);a:{try{I.grow(c-buffer.byteLength+65535>>16),ma(I.buffer);var d=1;break a}catch(e){}d=void 0}return!!d},c:function(a,c,d,e){try{for(var f=0,g=0;g<d;g++){for(var m=N[c+8*g>>2],h=N[c+(8*g+4)>>2],A=0;A<h;A++){var R=L[m+A],S=xa[a];0===R||10===R?((1===a?D:E)(ja(S,0)),S.length=0):S.push(R)}f+=h}return N[e>>2]=f,0}catch(T){return"undefined"!=typeof FS&&T instanceof FS.Y||B(T),T.Z}},memory:I,table:J},Aa=function(){function a(a){b.asm=a.exports,P--,b.monitorRunDependencies&&b.monitorRunDependencies(P),0==P&&(null!==Q&&(clearInterval(Q),Q=null),U&&(a=U,U=null,a()))}function c(c){a(c.instance)}function d(a){return(F||!p&&!q||"function"!=typeof fetch?new Promise(function(a){a(ua())}):fetch(X,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+X+"'";return a.arrayBuffer()}).catch(function(){return ua()})).then(function(){return{then:function(a){a({instance:new da})}}}).then(a,function(a){E("failed to asynchronously prepare wasm: "+a),B(a)})}var e={env:H,wasi_unstable:H};if(P++,b.monitorRunDependencies&&b.monitorRunDependencies(P),b.instantiateWasm)try{return b.instantiateWasm(e,a)}catch(f){return E("Module.instantiateWasm callback failed with error: "+f),!1}return function(){if(F||"function"!=typeof WebAssembly.instantiateStreaming||W(X)||"function"!=typeof fetch)return d(c);fetch(X,{credentials:"same-origin"}).then(function(a){return WebAssembly.instantiateStreaming(a,e).then(c,function(a){E("wasm streaming compile failed: "+a),E("falling back to ArrayBuffer instantiation"),d(c)})})}(),{}}();b.asm=Aa;var wa=b.___wasm_call_ctors=function(){return b.asm.d.apply(null,arguments)};b._csmGetVersion=function(){return b.asm.e.apply(null,arguments)},b._csmGetLatestMocVersion=function(){return b.asm.f.apply(null,arguments)},b._csmGetMocVersion=function(){return b.asm.g.apply(null,arguments)},b._csmSetLogFunction=function(){return b.asm.h.apply(null,arguments)},b._csmReviveMocInPlace=function(){return b.asm.i.apply(null,arguments)},b._csmReadCanvasInfo=function(){return b.asm.j.apply(null,arguments)},b._csmGetSizeofModel=function(){return b.asm.k.apply(null,arguments)},b._csmInitializeModelInPlace=function(){return b.asm.l.apply(null,arguments)},b._csmUpdateModel=function(){return b.asm.m.apply(null,arguments)},b._csmGetParameterCount=function(){return b.asm.n.apply(null,arguments)},b._csmGetParameterIds=function(){return b.asm.o.apply(null,arguments)},b._csmGetParameterMinimumValues=function(){return b.asm.p.apply(null,arguments)},b._csmGetParameterMaximumValues=function(){return b.asm.q.apply(null,arguments)},b._csmGetParameterDefaultValues=function(){return b.asm.r.apply(null,arguments)},b._csmGetParameterValues=function(){return b.asm.s.apply(null,arguments)},b._csmGetPartCount=function(){return b.asm.t.apply(null,arguments)},b._csmGetPartIds=function(){return b.asm.u.apply(null,arguments)},b._csmGetPartOpacities=function(){return b.asm.v.apply(null,arguments)},b._csmGetPartParentPartIndices=function(){return b.asm.w.apply(null,arguments)},b._csmGetDrawableCount=function(){return b.asm.x.apply(null,arguments)},b._csmGetDrawableIds=function(){return b.asm.y.apply(null,arguments)},b._csmGetDrawableConstantFlags=function(){return b.asm.z.apply(null,arguments)},b._csmGetDrawableDynamicFlags=function(){return b.asm.A.apply(null,arguments)},b._csmGetDrawableTextureIndices=function(){return b.asm.B.apply(null,arguments)},b._csmGetDrawableDrawOrders=function(){return b.asm.C.apply(null,arguments)},b._csmGetDrawableRenderOrders=function(){return b.asm.D.apply(null,arguments)},b._csmGetDrawableOpacities=function(){return b.asm.E.apply(null,arguments)},b._csmGetDrawableMaskCounts=function(){return b.asm.F.apply(null,arguments)},b._csmGetDrawableMasks=function(){return b.asm.G.apply(null,arguments)},b._csmGetDrawableVertexCounts=function(){return b.asm.H.apply(null,arguments)},b._csmGetDrawableVertexPositions=function(){return b.asm.I.apply(null,arguments)},b._csmGetDrawableVertexUvs=function(){return b.asm.J.apply(null,arguments)},b._csmGetDrawableIndexCounts=function(){return b.asm.K.apply(null,arguments)},b._csmGetDrawableIndices=function(){return b.asm.L.apply(null,arguments)},b._csmResetDrawableDynamicFlags=function(){return b.asm.M.apply(null,arguments)},b._csmMallocMoc=function(){return b.asm.N.apply(null,arguments)},b._csmMallocModelAndInitialize=function(){return b.asm.O.apply(null,arguments)},b._csmMalloc=function(){return b.asm.P.apply(null,arguments)},b._csmFree=function(){return b.asm.Q.apply(null,arguments)};var Y,Ba=b.stackSave=function(){return b.asm.R.apply(null,arguments)},Ca=b.stackAlloc=function(){return b.asm.S.apply(null,arguments)},Da=b.stackRestore=function(){return b.asm.T.apply(null,arguments)},ca=b.__growWasmMemory=function(){return b.asm.U.apply(null,arguments)};function Z(){function a(){if(!Y&&(Y=!0,!K)){if(O(oa),O(pa),b.onRuntimeInitialized&&b.onRuntimeInitialized(),b.postRun)for("function"==typeof b.postRun&&(b.postRun=[b.postRun]);b.postRun.length;){var a=b.postRun.shift();qa.unshift(a)}O(qa)}}if(!(0<P)){if(b.preRun)for("function"==typeof b.preRun&&(b.preRun=[b.preRun]);b.preRun.length;)ra();O(na),0<P||(b.setStatus?(b.setStatus("Running..."),setTimeout(function(){setTimeout(function(){b.setStatus("")},1),a()},1)):a())}}if(b.dynCall_vi=function(){return b.asm.V.apply(null,arguments)},b.asm=Aa,b.ccall=function(a,c,d,e){var f={string:function(a){var c=0;if(null!=a&&0!==a){var d=1+(a.length<<2),e=c=Ca(d),f=L;if(0<d){d=e+d-1;for(var g=0;g<a.length;++g){var k=a.charCodeAt(g);if(55296<=k&&k<=57343&&(k=65536+((1023&k)<<10)|1023&a.charCodeAt(++g)),k<=127){if(d<=e)break;f[e++]=k}else{if(k<=2047){if(d<=e+1)break;f[e++]=192|k>>6}else{if(k<=65535){if(d<=e+2)break;f[e++]=224|k>>12}else{if(d<=e+3)break;f[e++]=240|k>>18,f[e++]=128|k>>12&63}f[e++]=128|k>>6&63}f[e++]=128|63&k}}f[e]=0}}return c},array:function(a){var c=Ca(a.length);return M.set(a,c),c}},g=function(a){var c=b["_"+a];return assert(c,"Cannot call unknown function "+a+", make sure it is exported"),c}(a),m=[];if(a=0,e)for(var h=0;h<e.length;h++){var A=f[d[h]];A?(0===a&&(a=Ba()),m[h]=A(e[h])):m[h]=e[h]}return d=function(a){return"string"===c?ka(a):"boolean"===c?!!a:a}(d=g.apply(null,m)),0!==a&&Da(a),d},b.UTF8ToString=ka,b.addFunction=function(a,c){var d=J.length;try{J.grow(1)}catch(e){if(!e instanceof RangeError)throw e;throw"Unable to grow wasm table. Use a higher value for RESERVED_FUNCTION_POINTERS or set ALLOW_TABLE_GROWTH."}try{J.set(d,a)}catch(e){if(!e instanceof TypeError)throw e;assert(void 0!==c,"Missing signature argument to addFunction"),J.set(d,a)}return d},b.then=function(a){if(Y)a(b);else{var c=b.onRuntimeInitialized;b.onRuntimeInitialized=function(){c&&c(),a(b)}}return b},U=function Ea(){Y||Z(),Y||(U=Ea)},b.run=Z,b.preInit)for("function"==typeof b.preInit&&(b.preInit=[b.preInit]);0<b.preInit.length;)b.preInit.pop()();return Z(),_em_module}); true?module.exports=_em_module:undefined;var _em=_em_module()}(Live2DCubismCore=Live2DCubismCore||{});module.exports = Live2DCubismCore;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js"), "/", __webpack_require__(/*! ./../../node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./src/CubismSDK/CubismSDK.ts":
/*!************************************!*\
  !*** ./src/CubismSDK/CubismSDK.ts ***!
  \************************************/
/*! exports provided: CubismSDK */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubismSDK", function() { return CubismSDK; });
/* harmony import */ var _Framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Framework/live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/* harmony import */ var _Framework_math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Framework/math/cubismmatrix44 */ "./src/Framework/math/cubismmatrix44.ts");
/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Logger */ "./src/Logger.ts");
/* harmony import */ var _TextureManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TextureManager */ "./src/CubismSDK/TextureManager.ts");
/* harmony import */ var _Webgl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Webgl */ "./src/CubismSDK/Webgl.ts");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./View */ "./src/CubismSDK/View.ts");
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Model */ "./src/CubismSDK/Model.ts");
/* harmony import */ var _TouchManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TouchManager */ "./src/CubismSDK/TouchManager.ts");


var Csm_CubismMatrix44 = _Framework_math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismMatrix44;
var Csm_CubismFramework = _Framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismFramework;






var CubismSDK = /** @class */ (function () {
    function CubismSDK(setting) {
        this._cubismOption = new _Framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["Option"]();
        this._webgl = new _Webgl__WEBPACK_IMPORTED_MODULE_4__["Webgl"](setting.canvas);
        this._view = new _View__WEBPACK_IMPORTED_MODULE_5__["View"](this._webgl);
        this._textureManager = new _TextureManager__WEBPACK_IMPORTED_MODULE_3__["TextureManager"](this._webgl);
        this._cubismOption.logFunction = _Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log;
        this._cubismOption.loggingLevel = 0;
        Csm_CubismFramework.startUp(this._cubismOption);
        Csm_CubismFramework.initialize();
        var projection = new Csm_CubismMatrix44();
        this._model = new _Model__WEBPACK_IMPORTED_MODULE_6__["Model"](setting, this._textureManager, this._webgl);
        this._touchManage = new _TouchManager__WEBPACK_IMPORTED_MODULE_7__["TouchManager"](setting, this._view, this._model);
        this.loop();
    }
    CubismSDK.prototype.loop = function () {
        var _this = this;
        this._model.updateTime();
        this._webgl.gl.clearColor(0.0, 0.0, 0.0, 0.0);
        this._webgl.gl.enable(this._webgl.gl.DEPTH_TEST);
        this._webgl.gl.depthFunc(this._webgl.gl.LEQUAL);
        this._webgl.gl.clear(this._webgl.gl.COLOR_BUFFER_BIT | this._webgl.gl.DEPTH_BUFFER_BIT);
        this._webgl.gl.clearDepth(1.0);
        this._webgl.gl.enable(this._webgl.gl.BLEND);
        this._webgl.gl.blendFunc(this._webgl.gl.SRC_ALPHA, this._webgl.gl.ONE_MINUS_SRC_ALPHA);
        this._view.render();
        this._model.onUpdate();
        requestAnimationFrame(function () {
            _this.loop();
        });
    };
    return CubismSDK;
}());



/***/ }),

/***/ "./src/CubismSDK/Model.ts":
/*!********************************!*\
  !*** ./src/CubismSDK/Model.ts ***!
  \********************************/
/*! exports provided: Model */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return Model; });
/* harmony import */ var _Framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Framework/live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/* harmony import */ var _Framework_model_cubismusermodel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Framework/model/cubismusermodel */ "./src/Framework/model/cubismusermodel.ts");
/* harmony import */ var _Framework_cubismmodelsettingjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Framework/cubismmodelsettingjson */ "./src/Framework/cubismmodelsettingjson.ts");
/* harmony import */ var _Framework_cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Framework/cubismdefaultparameterid */ "./src/Framework/cubismdefaultparameterid.ts");
/* harmony import */ var _Framework_motion_acubismmotion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Framework/motion/acubismmotion */ "./src/Framework/motion/acubismmotion.ts");
/* harmony import */ var _Framework_effect_cubismeyeblink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Framework/effect/cubismeyeblink */ "./src/Framework/effect/cubismeyeblink.ts");
/* harmony import */ var _Framework_effect_cubismbreath__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Framework/effect/cubismbreath */ "./src/Framework/effect/cubismbreath.ts");
/* harmony import */ var _Framework_type_csmvector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Framework/type/csmvector */ "./src/Framework/type/csmvector.ts");
/* harmony import */ var _Framework_type_csmmap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Framework/type/csmmap */ "./src/Framework/type/csmmap.ts");
/* harmony import */ var _Framework_math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Framework/math/cubismmatrix44 */ "./src/Framework/math/cubismmatrix44.ts");
/* harmony import */ var _Framework_utils_cubismstring__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Framework/utils/cubismstring */ "./src/Framework/utils/cubismstring.ts");
/* harmony import */ var _Framework_motion_cubismmotionqueuemanager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Framework/motion/cubismmotionqueuemanager */ "./src/Framework/motion/cubismmotionqueuemanager.ts");
/* harmony import */ var _Framework_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Framework/utils/cubismdebug */ "./src/Framework/utils/cubismdebug.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Utils */ "./src/Utils.ts");
/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Logger */ "./src/Logger.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};













var InvalidMotionQueueEntryHandleValue = _Framework_motion_cubismmotionqueuemanager__WEBPACK_IMPORTED_MODULE_11__["Live2DCubismFramework"].InvalidMotionQueueEntryHandleValue;
var CubismString = _Framework_utils_cubismstring__WEBPACK_IMPORTED_MODULE_10__["Live2DCubismFramework"].CubismString;
var csmMap = _Framework_type_csmmap__WEBPACK_IMPORTED_MODULE_8__["Live2DCubismFramework"].csmMap;
var csmVector = _Framework_type_csmvector__WEBPACK_IMPORTED_MODULE_7__["Live2DCubismFramework"].csmVector;
var CubismBreath = _Framework_effect_cubismbreath__WEBPACK_IMPORTED_MODULE_6__["Live2DCubismFramework"].CubismBreath;
var BreathParameterData = _Framework_effect_cubismbreath__WEBPACK_IMPORTED_MODULE_6__["Live2DCubismFramework"].BreathParameterData;
var CubismEyeBlink = _Framework_effect_cubismeyeblink__WEBPACK_IMPORTED_MODULE_5__["Live2DCubismFramework"].CubismEyeBlink;
var ACubismMotion = _Framework_motion_acubismmotion__WEBPACK_IMPORTED_MODULE_4__["Live2DCubismFramework"].ACubismMotion;
var CubismFramework = _Framework_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismFramework;
var CubismUserModel = _Framework_model_cubismusermodel__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismUserModel;
var CubismModelSettingJson = _Framework_cubismmodelsettingjson__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].CubismModelSettingJson;
var CubismDefaultParameterId = _Framework_cubismdefaultparameterid__WEBPACK_IMPORTED_MODULE_3__["Live2DCubismFramework"];
var Csm_CubismMatrix44 = _Framework_math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_9__["Live2DCubismFramework"].CubismMatrix44;


var LoadStep;
(function (LoadStep) {
    LoadStep[LoadStep["LoadAssets"] = 0] = "LoadAssets";
    LoadStep[LoadStep["LoadModel"] = 1] = "LoadModel";
    LoadStep[LoadStep["WaitLoadModel"] = 2] = "WaitLoadModel";
    LoadStep[LoadStep["LoadExpression"] = 3] = "LoadExpression";
    LoadStep[LoadStep["WaitLoadExpression"] = 4] = "WaitLoadExpression";
    LoadStep[LoadStep["LoadPhysics"] = 5] = "LoadPhysics";
    LoadStep[LoadStep["WaitLoadPhysics"] = 6] = "WaitLoadPhysics";
    LoadStep[LoadStep["LoadPose"] = 7] = "LoadPose";
    LoadStep[LoadStep["WaitLoadPose"] = 8] = "WaitLoadPose";
    LoadStep[LoadStep["SetupEyeBlink"] = 9] = "SetupEyeBlink";
    LoadStep[LoadStep["SetupBreath"] = 10] = "SetupBreath";
    LoadStep[LoadStep["LoadUserData"] = 11] = "LoadUserData";
    LoadStep[LoadStep["WaitLoadUserData"] = 12] = "WaitLoadUserData";
    LoadStep[LoadStep["SetupEyeBlinkIds"] = 13] = "SetupEyeBlinkIds";
    LoadStep[LoadStep["SetupLipSyncIds"] = 14] = "SetupLipSyncIds";
    LoadStep[LoadStep["SetupLayout"] = 15] = "SetupLayout";
    LoadStep[LoadStep["LoadMotion"] = 16] = "LoadMotion";
    LoadStep[LoadStep["WaitLoadMotion"] = 17] = "WaitLoadMotion";
    LoadStep[LoadStep["CompleteInitialize"] = 18] = "CompleteInitialize";
    LoadStep[LoadStep["CompleteSetupModel"] = 19] = "CompleteSetupModel";
    LoadStep[LoadStep["LoadTexture"] = 20] = "LoadTexture";
    LoadStep[LoadStep["WaitLoadTexture"] = 21] = "WaitLoadTexture";
    LoadStep[LoadStep["CompleteSetup"] = 22] = "CompleteSetup";
})(LoadStep || (LoadStep = {}));
/**
 * ユーザーが実際に使用するモデルの実装クラス<br>
 * モデル生成、機能コンポーネント生成、更新処理とレンダリングの呼び出しを行う。
 */
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    /**
     * コンストラクタ
     */
    function Model(setting, textureManager, webgl) {
        var _this = _super.call(this) || this;
        _this._setting = setting;
        _this._textureManager = textureManager;
        _this._webgl = webgl;
        _this._viewMatrix = new Csm_CubismMatrix44();
        _this.s_currentFrame = 0.0;
        _this.s_lastFrame = 0.0;
        _this.s_deltaTime = 0.0;
        _this._modelSetting = null;
        _this._userTimeSeconds = 0.0;
        _this._eyeBlinkIds = new csmVector();
        _this._lipSyncIds = new csmVector();
        _this._motions = new csmMap();
        _this._expressions = new csmMap();
        _this._hitArea = new csmVector();
        _this._userArea = new csmVector();
        _this._idParamAngleX = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamAngleX);
        _this._idParamAngleY = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamAngleY);
        _this._idParamAngleZ = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamAngleZ);
        _this._idParamEyeBallX = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamEyeBallX);
        _this._idParamEyeBallY = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamEyeBallY);
        _this._idParamBodyAngleX = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamBodyAngleX);
        _this._state = LoadStep.LoadAssets;
        _this._expressionCount = 0;
        _this._textureCount = 0;
        _this.loadAssets(_this._setting.modelBuffer);
        return _this;
    }
    /**
     * model3.jsonが置かれたディレクトリとファイルパスからモデルを生成する
     * @param dir
     * @param fileName
     */
    Model.prototype.loadAssets = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var size, setting;
            return __generator(this, function (_a) {
                size = model.byteLength;
                setting = new CubismModelSettingJson(model, size);
                this._state = LoadStep.LoadModel;
                this.setupModel(setting);
                return [2 /*return*/];
            });
        });
    };
    /**
     * model3.jsonからモデルを生成する。
     * model3.jsonの記述に従ってモデル生成、モーション、物理演算などのコンポーネント生成を行う。
     *
     * @param setting ICubismModelSettingのインスタンス
     */
    Model.prototype.setupModel = function (setting) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer, size, path, buffer_1, count, i, name_1, path_1, buffer_2, size_1, motion, path_2, buffer_3, size_2, path_3, buffer_4, size_3, breathParameters, path_4, buffer_5, size_4, eyeBlinkIdCount, i, lipSyncIdCount, i, layout, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._updating = true;
                        this._initialized = false;
                        this._modelSetting = setting;
                        if (!(this._modelSetting.getModelFileName() != "")) return [3 /*break*/, 20];
                        this._state = LoadStep.WaitLoadModel;
                        path = this._modelSetting.getModelFileName();
                        path = this._setting.baseUrl + path;
                        return [4 /*yield*/, _Utils__WEBPACK_IMPORTED_MODULE_13__["Utils"].getArraybuffer(path)];
                    case 1:
                        buffer_1 = _b.sent();
                        this.loadModel(buffer_1);
                        this._state = LoadStep.LoadExpression;
                        if (!(this._modelSetting.getExpressionCount() > 0)) return [3 /*break*/, 5];
                        this._state = LoadStep.WaitLoadExpression;
                        count = this._modelSetting.getExpressionCount();
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < count)) return [3 /*break*/, 5];
                        name_1 = this._modelSetting.getExpressionName(i);
                        path_1 = this._modelSetting.getExpressionFileName(i);
                        path_1 = this._setting.baseUrl + path_1;
                        return [4 /*yield*/, _Utils__WEBPACK_IMPORTED_MODULE_13__["Utils"].getArraybuffer(path_1)];
                    case 3:
                        buffer_2 = _b.sent();
                        size_1 = buffer_2.byteLength;
                        motion = this.loadExpression(buffer_2, size_1, name_1);
                        if (this._expressions.getValue(name_1) != null) {
                            ACubismMotion.delete(this._expressions.getValue(name_1));
                            this._expressions.setValue(name_1, null);
                        }
                        this._expressions.setValue(name_1, motion);
                        this._expressionCount++;
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this._state = LoadStep.LoadPhysics;
                        if (!(this._modelSetting.getPhysicsFileName() != "")) return [3 /*break*/, 7];
                        this._state = LoadStep.WaitLoadPhysics;
                        path_2 = this._modelSetting.getPhysicsFileName();
                        path_2 = this._setting.baseUrl + path_2;
                        return [4 /*yield*/, _Utils__WEBPACK_IMPORTED_MODULE_13__["Utils"].getArraybuffer(path_2)];
                    case 6:
                        buffer_3 = _b.sent();
                        size_2 = buffer_3.byteLength;
                        this.loadPhysics(buffer_3, size_2);
                        _b.label = 7;
                    case 7:
                        this._state = LoadStep.LoadPose;
                        if (!(this._modelSetting.getPoseFileName() != "")) return [3 /*break*/, 9];
                        this._state = LoadStep.WaitLoadPose;
                        path_3 = this._modelSetting.getPoseFileName();
                        path_3 = this._setting.baseUrl + path_3;
                        return [4 /*yield*/, _Utils__WEBPACK_IMPORTED_MODULE_13__["Utils"].getArraybuffer(path_3)];
                    case 8:
                        buffer_4 = _b.sent();
                        size_3 = buffer_4.byteLength;
                        this.loadPose(buffer_4, size_3);
                        _b.label = 9;
                    case 9:
                        this._state = LoadStep.SetupEyeBlink;
                        if (this._modelSetting.getEyeBlinkParameterCount() > 0) {
                            this._eyeBlink = CubismEyeBlink.create(this._modelSetting);
                        }
                        this._state = LoadStep.SetupBreath;
                        this._breath = CubismBreath.create();
                        breathParameters = new csmVector();
                        breathParameters.pushBack(new BreathParameterData(this._idParamAngleX, 0.0, 15.0, 6.5345, 0.5));
                        breathParameters.pushBack(new BreathParameterData(this._idParamAngleY, 0.0, 8.0, 3.5345, 0.5));
                        breathParameters.pushBack(new BreathParameterData(this._idParamAngleZ, 0.0, 10.0, 5.5345, 0.5));
                        breathParameters.pushBack(new BreathParameterData(this._idParamBodyAngleX, 0.0, 4.0, 15.5345, 0.5));
                        breathParameters.pushBack(new BreathParameterData(CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamBreath), 0.0, 0.5, 3.2345, 0.5));
                        this._breath.setParameters(breathParameters);
                        this._state = LoadStep.LoadUserData;
                        if (!(this._modelSetting.getUserDataFile() != "")) return [3 /*break*/, 11];
                        this._state = LoadStep.WaitLoadUserData;
                        path_4 = this._modelSetting.getUserDataFile();
                        path_4 = this._setting.baseUrl + path_4;
                        return [4 /*yield*/, _Utils__WEBPACK_IMPORTED_MODULE_13__["Utils"].getArraybuffer(path_4)];
                    case 10:
                        buffer_5 = _b.sent();
                        size_4 = buffer_5.byteLength;
                        this.loadUserData(buffer_5, size_4);
                        _b.label = 11;
                    case 11:
                        this._state = LoadStep.SetupEyeBlinkIds;
                        eyeBlinkIdCount = this._modelSetting.getEyeBlinkParameterCount();
                        for (i = 0; i < eyeBlinkIdCount; ++i) {
                            this._eyeBlinkIds.pushBack(this._modelSetting.getEyeBlinkParameterId(i));
                        }
                        this._state = LoadStep.SetupLipSyncIds;
                        lipSyncIdCount = this._modelSetting.getLipSyncParameterCount();
                        for (i = 0; i < lipSyncIdCount; ++i) {
                            this._lipSyncIds.pushBack(this._modelSetting.getLipSyncParameterId(i));
                        }
                        this._state = LoadStep.SetupLayout;
                        layout = new csmMap();
                        this._modelSetting.getLayoutMap(layout);
                        this._modelMatrix.setupFromLayout(layout);
                        _a = this._setting.motionLoadMode;
                        switch (_a) {
                            case 'greedy': return [3 /*break*/, 12];
                            case 'textures_first': return [3 /*break*/, 15];
                        }
                        return [3 /*break*/, 17];
                    case 12:
                        this._state = LoadStep.LoadMotion;
                        this._state = LoadStep.WaitLoadMotion;
                        return [4 /*yield*/, this.setupMotion()];
                    case 13:
                        _b.sent();
                        return [4 /*yield*/, this.setupTextures()];
                    case 14:
                        _b.sent();
                        this._state = LoadStep.CompleteSetup;
                        return [3 /*break*/, 19];
                    case 15: return [4 /*yield*/, this.setupTextures()];
                    case 16:
                        _b.sent();
                        this._state = LoadStep.CompleteSetup;
                        this.setupMotion();
                        return [3 /*break*/, 19];
                    case 17: return [4 /*yield*/, this.setupTextures()];
                    case 18:
                        _b.sent();
                        this._state = LoadStep.CompleteSetup;
                        _b.label = 19;
                    case 19: return [3 /*break*/, 20];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    Model.prototype.setupMotion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var motionGroupCount, promises, i, groupName, k;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._model.saveParameters();
                        motionGroupCount = this._modelSetting.getMotionGroupCount();
                        promises = [];
                        for (i = 0; i < motionGroupCount; i++) {
                            groupName = this._modelSetting.getMotionGroupName(i);
                            for (k = 0; k < this._modelSetting.getMotionCount(groupName); k++) {
                                promises.push(this.registerMotion(groupName, k));
                            }
                        }
                        return [4 /*yield*/, Promise.all(promises).then(function () {
                                _this._motionManager.stopAllMotions();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Model.prototype.setupTextures = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usePremultiply, textureCount, modelTextureNumber, texturePath, textureInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usePremultiply = true;
                        this._state = LoadStep.LoadTexture;
                        this._updating = false;
                        this._initialized = true;
                        this.createRenderer();
                        this._state = LoadStep.WaitLoadTexture;
                        textureCount = this._modelSetting.getTextureCount();
                        modelTextureNumber = 0;
                        _a.label = 1;
                    case 1:
                        if (!(modelTextureNumber < textureCount)) return [3 /*break*/, 4];
                        if (this._modelSetting.getTextureFileName(modelTextureNumber) == "") {
                            console.log("getTextureFileName null");
                            return [3 /*break*/, 3];
                        }
                        texturePath = this._modelSetting.getTextureFileName(modelTextureNumber);
                        texturePath = this._setting.baseUrl + texturePath;
                        return [4 /*yield*/, this._textureManager.createTextureFromPngFile(texturePath, usePremultiply)];
                    case 2:
                        textureInfo = _a.sent();
                        this.getRenderer().bindTexture(modelTextureNumber, textureInfo.id);
                        this._textureCount++;
                        this.getRenderer().setIsPremultipliedAlpha(usePremultiply);
                        this.getRenderer().startUp(this._webgl.gl);
                        _a.label = 3;
                    case 3:
                        modelTextureNumber++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * レンダラを再構築する
     */
    Model.prototype.reloadRenderer = function () {
        this.deleteRenderer();
        this.createRenderer();
        this.setupTextures();
    };
    /**
     * 注册之后通过this._motions.getValue(name)获取
     * @param groupName
     * @param index
     * @return CubismMotion
     */
    Model.prototype.registerMotion = function (groupName, index) {
        return __awaiter(this, void 0, void 0, function () {
            var path;
            var _this = this;
            return __generator(this, function (_a) {
                path = this._modelSetting.getMotionFileName(groupName, index);
                _Logger__WEBPACK_IMPORTED_MODULE_14__["Logger"].log("register motion: " + path + " => [" + groupName + "_" + index + "]", true);
                return [2 /*return*/, this.preLoadMotion(path).then(function (buffer) {
                        var name = CubismString.getFormatedString("{0}_{1}", groupName, index);
                        _Logger__WEBPACK_IMPORTED_MODULE_14__["Logger"].log("load motion complete: " + path + " => [" + groupName + "_" + index + "]", true);
                        var size = buffer.byteLength;
                        var tmpMotion = (_this.loadMotion(buffer, size, name));
                        var fadeTime = _this._modelSetting.getMotionFadeInTimeValue(groupName, index);
                        if (fadeTime >= 0.0) {
                            tmpMotion.setFadeInTime(fadeTime);
                        }
                        fadeTime = _this._modelSetting.getMotionFadeOutTimeValue(groupName, index);
                        if (fadeTime >= 0.0) {
                            tmpMotion.setFadeOutTime(fadeTime);
                        }
                        tmpMotion.setEffectIds(_this._eyeBlinkIds, _this._lipSyncIds);
                        if (_this._motions.getValue(name) != null) {
                            ACubismMotion.delete(_this._motions.getValue(name));
                        }
                        _this._motions.setValue(name, tmpMotion);
                        _Logger__WEBPACK_IMPORTED_MODULE_14__["Logger"].log("motion parse complete: " + path + " => [" + groupName + "_" + index + "]", true);
                        return tmpMotion;
                    })];
            });
        });
    };
    /**
     * 更新
     */
    Model.prototype.update = function () {
        if (this._state != LoadStep.CompleteSetup)
            return;
        var deltaTimeSeconds = this.s_deltaTime;
        this._userTimeSeconds += deltaTimeSeconds;
        this._dragManager.update(deltaTimeSeconds);
        this._dragX = this._dragManager.getX();
        this._dragY = this._dragManager.getY();
        // モーションによるパラメータ更新の有無
        var motionUpdated = false;
        //--------------------------------------------------------------------------
        this._model.loadParameters(); // 前回セーブされた状態をロード
        if (this._motionManager.isFinished()) {
            // モーションの再生がない場合、待機モーションの中からランダムで再生する
            this.startRandomMotion(this._setting.idle, this._setting.Priority.Idle);
        }
        else {
            motionUpdated = this._motionManager.updateMotion(this._model, deltaTimeSeconds); // モーションを更新
        }
        this._model.saveParameters(); // 状態を保存
        //--------------------------------------------------------------------------
        // まばたき
        if (!motionUpdated) {
            if (this._eyeBlink != null) {
                // メインモーションの更新がないとき
                this._eyeBlink.updateParameters(this._model, deltaTimeSeconds); // 目パチ
            }
        }
        if (this._expressionManager != null) {
            this._expressionManager.updateMotion(this._model, deltaTimeSeconds); // 表情でパラメータ更新（相対変化）
        }
        // ドラッグによる変化
        // ドラッグによる顔の向きの調整
        this._model.addParameterValueById(this._idParamAngleX, this._dragX * 30); // -30から30の値を加える
        this._model.addParameterValueById(this._idParamAngleY, this._dragY * 30);
        this._model.addParameterValueById(this._idParamAngleZ, this._dragX * this._dragY * -30);
        // ドラッグによる体の向きの調整
        this._model.addParameterValueById(this._idParamBodyAngleX, this._dragX * 10); // -10から10の値を加える
        // ドラッグによる目の向きの調整
        this._model.addParameterValueById(this._idParamEyeBallX, this._dragX); // -1から1の値を加える
        this._model.addParameterValueById(this._idParamEyeBallY, this._dragY);
        // 呼吸など
        if (this._breath != null) {
            this._breath.updateParameters(this._model, deltaTimeSeconds);
        }
        // 物理演算の設定
        if (this._physics != null) {
            this._physics.evaluate(this._model, deltaTimeSeconds);
        }
        // リップシンクの設定
        if (this._lipsync) {
            var value = 0; // リアルタイムでリップシンクを行う場合、システムから音量を取得して、0~1の範囲で値を入力します。
            for (var i = 0; i < this._lipSyncIds.getSize(); ++i) {
                this._model.addParameterValueById(this._lipSyncIds.at(i), value, 0.8);
            }
        }
        // ポーズの設定
        if (this._pose != null) {
            this._pose.updateParameters(this._model, deltaTimeSeconds);
        }
        this._model.update();
    };
    /**
     * 引数で指定したモーションの再生を開始する
     * @param group モーショングループ名
     * @param no グループ内の番号
     * @param priority 優先度
     * @return 開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するisFinished()の引数で使用する。開始できない時は[-1]
     */
    Model.prototype.startMotion = function (group, no, priority) {
        var _this = this;
        if (priority == this._setting.Priority.Force) {
            this._motionManager.setReservePriority(priority);
        }
        else if (!this._motionManager.reserveMotion(priority)) {
            _Logger__WEBPACK_IMPORTED_MODULE_14__["Logger"].log("can't start motion.", true);
            return InvalidMotionQueueEntryHandleValue;
        }
        var fileName = this._modelSetting.getMotionFileName(group, no);
        var name = CubismString.getFormatedString("{0}_{1}", group, no);
        var motion = this._motions.getValue(name);
        if (motion == null) {
            this.registerMotion(group, no).then(function (_motion) {
                _Logger__WEBPACK_IMPORTED_MODULE_14__["Logger"].log("start motion: [" + group + "_" + no + "]", true);
                _this._motionManager.startMotionPriority(_motion, false, priority);
            });
        }
        else {
            _Logger__WEBPACK_IMPORTED_MODULE_14__["Logger"].log("start motion: [" + group + "_" + no + "]", true);
            return this._motionManager.startMotionPriority(motion, false, priority);
        }
    };
    /**
     * ランダムに選ばれたモーションの再生を開始する。
     * @param group モーショングループ名
     * @param priority 優先度
     * @return 開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するisFinished()の引数で使用する。開始できない時は[-1]
     */
    Model.prototype.startRandomMotion = function (group, priority) {
        if (this._modelSetting.getMotionCount(group) == 0) {
            return InvalidMotionQueueEntryHandleValue;
        }
        var no = Math.floor(Math.random() * this._modelSetting.getMotionCount(group));
        return this.startMotion(group, no, priority);
    };
    /**
     * 引数で指定した表情モーションをセットする
     *
     * @param expressionId 表情モーションのID
     */
    Model.prototype.setExpression = function (expressionId) {
        var motion = this._expressions.getValue(expressionId);
        _Logger__WEBPACK_IMPORTED_MODULE_14__["Logger"].log("expression: [" + expressionId + "]", true);
        if (motion != null) {
            this._expressionManager.startMotionPriority(motion, false, this._setting.Priority.Force);
        }
        else {
            _Logger__WEBPACK_IMPORTED_MODULE_14__["Logger"].log("expression[" + expressionId + "] is null", true);
        }
    };
    /**
     * ランダムに選ばれた表情モーションをセットする
     */
    Model.prototype.setRandomExpression = function () {
        if (this._expressions.getSize() == 0) {
            return;
        }
        var no = Math.floor(Math.random() * this._expressions.getSize());
        for (var i = 0; i < this._expressions.getSize(); i++) {
            if (i == no) {
                var name_2 = this._expressions._keyValues[i].first;
                this.setExpression(name_2);
                return;
            }
        }
    };
    /**
     * イベントの発火を受け取る
     */
    Model.prototype.motionEventFired = function (eventValue) {
        Object(_Framework_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_12__["CubismLogInfo"])("{0} is fired on LAppModel!!", eventValue.s);
    };
    /**
     * 当たり判定テスト
     * 指定ＩＤの頂点リストから矩形を計算し、座標をが矩形範囲内か判定する。
     *
     * @param hitArenaName  当たり判定をテストする対象のID
     * @param x             判定を行うX座標
     * @param y             判定を行うY座標
     */
    // public hitTest(hitArenaName: string, x: number, y: number): boolean {
    //   // 透明時は当たり判定無し。
    //   if (this._opacity < 1) {
    //     return false;
    //   }
    //   const count: number = this._modelSetting.getHitAreasCount();
    //   for (let i: number = 0; i < count; i++) {
    //     if (this._modelSetting.getHitAreaName(i) == hitArenaName) {
    //       const drawId: CubismIdHandle = this._modelSetting.getHitAreaId(i);
    //       return this.isHit(drawId, x, y).hit;
    //     }
    //   }
    //   return false;
    // }
    /**
     * 获取命中的区域列表,并且按照区域大小从小到大排序
     * @param x
     * @param y
     */
    Model.prototype.getHitList = function (x, y) {
        var result = [];
        for (var _i = 0, _a = this.getDrawableIds(); _i < _a.length; _i++) {
            var drawId = _a[_i];
            var cubismIdHandle = CubismFramework.getIdManager().getId(drawId);
            var hitStatus = this.isHit(cubismIdHandle, x, y);
            if (hitStatus.hit) {
                result.push({
                    cubismIdHandle: cubismIdHandle,
                    area: hitStatus.area,
                    id: drawId
                });
            }
        }
        result.sort(function (a, b) {
            return a.area - b.area;
        });
        return result;
    };
    /**
     * モーションデータをグループ名から一括でロードする。
     * モーションデータの名前は内部でModelSettingから取得する。
     *
     * @param group モーションデータのグループ名
     */
    Model.prototype.preLoadMotionGroup = function (group, motionBuffers) {
        return __awaiter(this, void 0, void 0, function () {
            var i, name_3, path, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(i < this._modelSetting.getMotionCount(group))) return [3 /*break*/, 5];
                        name_3 = CubismString.getFormatedString("{0}_{1}", group, i);
                        path = this._modelSetting.getMotionFileName(group, i);
                        path = this._setting.baseUrl + path;
                        _Logger__WEBPACK_IMPORTED_MODULE_14__["Logger"].log("load motion: " + path + " => [" + group + "_" + i + "]", true);
                        _b = (_a = motionBuffers).push;
                        _c = {
                            name: name_3,
                            group: group,
                            i: i
                        };
                        return [4 /*yield*/, fetch(path)];
                    case 2: return [4 /*yield*/, (_d.sent()).arrayBuffer()];
                    case 3:
                        _b.apply(_a, [(_c.buffer = _d.sent(),
                                _c)]);
                        _d.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Model.prototype.preLoadMotion = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this._setting.baseUrl + path;
                        return [4 /*yield*/, fetch(path)];
                    case 1: return [4 /*yield*/, (_a.sent()).arrayBuffer()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * すべてのモーションデータを解放する。
     */
    Model.prototype.releaseMotions = function () {
        this._motions.clear();
    };
    /**
     * 全ての表情データを解放する。
     */
    Model.prototype.releaseExpressions = function () {
        this._expressions.clear();
    };
    /**
     * モデルを描画する処理。モデルを描画する空間のView-Projection行列を渡す。
     */
    Model.prototype.doDraw = function () {
        if (this._model == null)
            return;
        // キャンバスサイズを渡す
        var viewport = [
            0,
            0,
            this._setting.canvas.width,
            this._setting.canvas.height
        ];
        this.getRenderer().setRenderState(this._webgl.frameBuffer, viewport);
        this.getRenderer().drawModel();
    };
    /**
     * モデルを描画する処理。モデルを描画する空間のView-Projection行列を渡す。
     */
    Model.prototype.draw = function (matrix) {
        if (this._model == null) {
            return;
        }
        // 各読み込み終了後
        if (this._state == LoadStep.CompleteSetup) {
            matrix.multiplyByMatrix(this._modelMatrix);
            this.getRenderer().setMvpMatrix(matrix);
            this.doDraw();
        }
    };
    Model.prototype.updateTime = function () {
        this.s_currentFrame = Date.now();
        this.s_deltaTime = (this.s_currentFrame - this.s_lastFrame) / 1000;
        this.s_lastFrame = this.s_currentFrame;
    };
    Model.prototype.onUpdate = function () {
        var projection = new Csm_CubismMatrix44();
        var width, height;
        width = this._setting.canvas.width;
        height = this._setting.canvas.height;
        projection.scale(1.0, width / height);
        if (this._viewMatrix != null) {
            projection.multiplyByMatrix(this._viewMatrix);
        }
        this.update();
        this.draw(projection);
    };
    Model.prototype.getDrawableIds = function () {
        return this._model.getModel().drawables.ids;
    };
    return Model;
}(CubismUserModel));



/***/ }),

/***/ "./src/CubismSDK/TextureManager.ts":
/*!*****************************************!*\
  !*** ./src/CubismSDK/TextureManager.ts ***!
  \*****************************************/
/*! exports provided: TextureManager, TextureInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextureManager", function() { return TextureManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextureInfo", function() { return TextureInfo; });
/* harmony import */ var _Framework_type_csmvector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Framework/type/csmvector */ "./src/Framework/type/csmvector.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils */ "./src/Utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var Csm_csmVector = _Framework_type_csmvector__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].csmVector;

var TextureManager = /** @class */ (function () {
    function TextureManager(webgl) {
        this._textures = new Csm_csmVector();
        this.webgl = webgl;
    }
    TextureManager.prototype.release = function () {
        for (var ite = this._textures.begin(); ite.notEqual(this._textures.end()); ite.preIncrement()) {
            this.webgl.gl.deleteTexture(ite.ptr().id);
        }
        this._textures = null;
    };
    /**
     *
     * @param fileName
     * @param usePremultiply
     * @return textureInfo
     */
    TextureManager.prototype.createTextureFromPngFile = function (fileName, usePremultiply) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (reslove, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var ite, img, _a, _b, _c;
                        var _this = this;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    for (ite = this._textures.begin(); ite.notEqual(this._textures.end()); ite.preIncrement()) {
                                        if (ite.ptr().fileName == fileName &&
                                            ite.ptr().usePremultply == usePremultiply) {
                                            reslove(ite.ptr());
                                            return [2 /*return*/];
                                        }
                                    }
                                    img = new Image();
                                    img.onload = function () {
                                        var tex = _this.webgl.gl.createTexture();
                                        _this.webgl.gl.bindTexture(_this.webgl.gl.TEXTURE_2D, tex);
                                        _this.webgl.gl.texParameteri(_this.webgl.gl.TEXTURE_2D, _this.webgl.gl.TEXTURE_MIN_FILTER, _this.webgl.gl.LINEAR_MIPMAP_LINEAR);
                                        _this.webgl.gl.texParameteri(_this.webgl.gl.TEXTURE_2D, _this.webgl.gl.TEXTURE_MAG_FILTER, _this.webgl.gl.LINEAR);
                                        if (usePremultiply) {
                                            _this.webgl.gl.pixelStorei(_this.webgl.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
                                        }
                                        _this.webgl.gl.texImage2D(_this.webgl.gl.TEXTURE_2D, 0, _this.webgl.gl.RGBA, _this.webgl.gl.RGBA, _this.webgl.gl.UNSIGNED_BYTE, img);
                                        _this.webgl.gl.generateMipmap(_this.webgl.gl.TEXTURE_2D);
                                        _this.webgl.gl.bindTexture(_this.webgl.gl.TEXTURE_2D, null);
                                        var textureInfo = new TextureInfo();
                                        textureInfo.fileName = fileName;
                                        textureInfo.width = img.width;
                                        textureInfo.height = img.height;
                                        textureInfo.id = tex;
                                        textureInfo.img = img;
                                        textureInfo.usePremultply = usePremultiply;
                                        _this._textures.pushBack(textureInfo);
                                        reslove(textureInfo);
                                    };
                                    _a = img;
                                    _c = (_b = URL).createObjectURL;
                                    return [4 /*yield*/, _Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].getBlob(fileName)];
                                case 1:
                                    _a.src = _c.apply(_b, [_d.sent()]);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    TextureManager.prototype.releaseTextures = function () {
        for (var i = 0; i < this._textures.getSize(); i++) {
            this._textures.set(i, null);
        }
        this._textures.clear();
    };
    /**
     * @param texture
     */
    TextureManager.prototype.releaseTextureByTexture = function (texture) {
        for (var i = 0; i < this._textures.getSize(); i++) {
            if (this._textures.at(i).id != texture) {
                continue;
            }
            this._textures.set(i, null);
            this._textures.remove(i);
            break;
        }
    };
    /**
     * @param fileName
     */
    TextureManager.prototype.releaseTextureByFilePath = function (fileName) {
        for (var i = 0; i < this._textures.getSize(); i++) {
            if (this._textures.at(i).fileName == fileName) {
                this._textures.set(i, null);
                this._textures.remove(i);
                break;
            }
        }
    };
    return TextureManager;
}());

var TextureInfo = /** @class */ (function () {
    function TextureInfo() {
        this.id = null;
        this.width = 0;
        this.height = 0;
    }
    return TextureInfo;
}());



/***/ }),

/***/ "./src/CubismSDK/TouchManager.ts":
/*!***************************************!*\
  !*** ./src/CubismSDK/TouchManager.ts ***!
  \***************************************/
/*! exports provided: TouchManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TouchManager", function() { return TouchManager; });
/* harmony import */ var _Framework_math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Framework/math/cubismmatrix44 */ "./src/Framework/math/cubismmatrix44.ts");
/* harmony import */ var _Framework_math_cubismviewmatrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Framework/math/cubismviewmatrix */ "./src/Framework/math/cubismviewmatrix.ts");
/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Logger */ "./src/Logger.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utils */ "./src/Utils.ts");


var Csm_CubismViewMatrix = _Framework_math_cubismviewmatrix__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismViewMatrix;
var Csm_CubismMatrix44 = _Framework_math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismMatrix44;


var TouchManager = /** @class */ (function () {
    function TouchManager(setting, view, model) {
        this._captured = false;
        this._coordinateManager = new CoordinateManager();
        this._deviceToScreen = new Csm_CubismMatrix44();
        this._viewMatrix = new Csm_CubismViewMatrix();
        this._setting = setting;
        this._view = view;
        this._model = model;
        var width, height;
        width = setting.canvas.width;
        height = setting.canvas.height;
        var ratio = height / width;
        var left = setting.view.VIEW_LOGICAL_LEFT;
        var right = setting.view.VIEW_LOGICAL_RIGHT;
        var bottom = -ratio;
        var top = ratio;
        this._viewMatrix.setScreenRect(left, right, bottom, top); // デバイスに対応する画面の範囲。 Xの左端、Xの右端、Yの下端、Yの上端
        var screenW = Math.abs(left - right);
        this._deviceToScreen.scaleRelative(screenW / width, -screenW / width);
        this._deviceToScreen.translateRelative(-width * 0.5, -height * 0.5);
        // 表示範囲の設定
        this._viewMatrix.setMaxScale(setting.view.VIEW_MAX_SCALE); // 限界拡張率
        this._viewMatrix.setMinScale(setting.view.VIEW_MIN_SCALE); // 限界縮小率
        // 表示できる最大範囲
        this._viewMatrix.setMaxScreenRect(setting.view.VIEW_LOGICAL_MAX_LEFT, setting.view.VIEW_LOGICAL_MAX_RIGHT, setting.view.VIEW_LOGICAL_MAX_BOTTOM, setting.view.VIEW_LOGICAL_MAX_TOP);
        this.bindEvent();
    }
    TouchManager.prototype.bindEvent = function () {
        var _this = this;
        var supportTouch = "ontouchend" in this._setting.canvas;
        if (supportTouch) {
            this._setting.canvas.ontouchstart = function (e) {
                _this.onTouchBegan(e);
            };
            this._setting.canvas.ontouchmove = function (e) {
                _this.onTouchMoved(e);
            };
            this._setting.canvas.ontouchend = function (e) {
                _this.onTouchEnded(e);
            };
            this._setting.canvas.ontouchcancel = function (e) {
                _this.onTouchCancel(e);
            };
        }
        else {
            this._setting.canvas.onmousedown = function (e) {
                _this.onClickBegan(e);
            };
            this._setting.canvas.onmousemove = function (e) {
                _this.onMouseMoved(e);
            };
            this._setting.canvas.onmouseup = function (e) {
                _this.onClickEnded(e);
            };
        }
    };
    TouchManager.prototype.onClickBegan = function (e) {
        this._captured = true;
        var posX = e.pageX;
        var posY = e.pageY;
        this.onTouchesBegan(posX, posY);
    };
    TouchManager.prototype.onMouseMoved = function (e) {
        if (!this._captured) {
            return;
        }
        var rect = e.target.getBoundingClientRect();
        var posX = e.clientX - rect.left;
        var posY = e.clientY - rect.top;
        this.onTouchesMoved(posX, posY);
    };
    TouchManager.prototype.onClickEnded = function (e) {
        this._captured = false;
        var rect = e.target.getBoundingClientRect();
        var posX = e.clientX - rect.left;
        var posY = e.clientY - rect.top;
        this.onTouchesEnded(posX, posY);
    };
    TouchManager.prototype.onTouchBegan = function (e) {
        this._captured = true;
        var posX = e.changedTouches[0].pageX;
        var posY = e.changedTouches[0].pageY;
        this.onTouchesBegan(posX, posY);
    };
    TouchManager.prototype.onTouchMoved = function (e) {
        if (!this._captured) {
            return;
        }
        var rect = e.target.getBoundingClientRect();
        var posX = e.changedTouches[0].clientX - rect.left;
        var posY = e.changedTouches[0].clientY - rect.top;
        this.onTouchesMoved(posX, posY);
    };
    TouchManager.prototype.onTouchEnded = function (e) {
        this._captured = false;
        var rect = e.target.getBoundingClientRect();
        var posX = e.changedTouches[0].clientX - rect.left;
        var posY = e.changedTouches[0].clientY - rect.top;
        this.onTouchesEnded(posX, posY);
    };
    TouchManager.prototype.onTouchCancel = function (e) {
        this._captured = false;
        var rect = e.target.getBoundingClientRect();
        var posX = e.changedTouches[0].clientX - rect.left;
        var posY = e.changedTouches[0].clientY - rect.top;
        this.onTouchesEnded(posX, posY);
    };
    /**
     * タッチされた時に呼ばれる。
     *
     * @param pointX スクリーンX座標
     * @param pointY スクリーンY座標
     */
    TouchManager.prototype.onTouchesBegan = function (pointX, pointY) {
        this._coordinateManager.touchesBegan(pointX, pointY);
    };
    /**
     * タッチしているときにポインタが動いたら呼ばれる。
     *
     * @param pointX スクリーンX座標
     * @param pointY スクリーンY座標
     */
    TouchManager.prototype.onTouchesMoved = function (pointX, pointY) {
        var viewX = this.transformViewX(this._coordinateManager.getX());
        var viewY = this.transformViewY(this._coordinateManager.getY());
        this._coordinateManager.touchesMoved(pointX, pointY);
        this._model.setDragging(viewX, viewY);
    };
    /**
     * タッチが終了したら呼ばれる。
     *
     * @param pointX スクリーンX座標
     * @param pointY スクリーンY座標
     */
    TouchManager.prototype.onTouchesEnded = function (pointX, pointY) {
        this._model.setDragging(0.0, 0.0);
        // シングルタップ
        var x = this._deviceToScreen.transformX(this._coordinateManager.getX()); // 論理座標変換した座標を取得。
        var y = this._deviceToScreen.transformY(this._coordinateManager.getY()); // 論理座標変化した座標を取得。
        this.onTap(x, y);
    };
    /**
     * X座標をView座標に変換する。
     *
     * @param deviceX デバイスX座標
     */
    TouchManager.prototype.transformViewX = function (deviceX) {
        var screenX = this._deviceToScreen.transformX(deviceX); // 論理座標変換した座標を取得。
        return this._viewMatrix.invertTransformX(screenX); // 拡大、縮小、移動後の値。
    };
    /**
     * Y座標をView座標に変換する。
     *
     * @param deviceY デバイスY座標
     */
    TouchManager.prototype.transformViewY = function (deviceY) {
        var screenY = this._deviceToScreen.transformY(deviceY); // 論理座標変換した座標を取得。
        return this._viewMatrix.invertTransformY(screenY);
    };
    /**
     * X座標をScreen座標に変換する。
     * @param deviceX デバイスX座標
     */
    TouchManager.prototype.transformScreenX = function (deviceX) {
        return this._deviceToScreen.transformX(deviceX);
    };
    /**
     * Y座標をScreen座標に変換する。
     *
     * @param deviceY デバイスY座標
     */
    TouchManager.prototype.transformScreenY = function (deviceY) {
        return this._deviceToScreen.transformY(deviceY);
    };
    /**
     * 点击区域可以通过binding绑定多个motion group,每个motion group里面可以包含多个动作
     * @param x
     * @param y
     */
    TouchManager.prototype.onTap = function (x, y) {
        _Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log("onTap x: " + x + " y: " + y, true);
        var hitList = this._model.getHitList(x, y);
        for (var _i = 0, hitList_1 = hitList; _i < hitList_1.length; _i++) {
            var drawId = hitList_1[_i];
            _Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log("Hit drawId : " + drawId.id, true);
            if (this._setting.binding[drawId.id]) {
                this._model.startRandomMotion(_Utils__WEBPACK_IMPORTED_MODULE_3__["Utils"].getRandomItem(this._setting.binding[drawId.id].motion), 2);
                return;
            }
            else {
                if (this._setting.debug) {
                    _Logger__WEBPACK_IMPORTED_MODULE_2__["Logger"].log("Hit drawId " + drawId.id + " not found binding", true);
                }
            }
        }
    };
    return TouchManager;
}());

var CoordinateManager = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function CoordinateManager() {
        this._startX = 0.0;
        this._startY = 0.0;
        this._lastX = 0.0;
        this._lastY = 0.0;
        this._lastX1 = 0.0;
        this._lastY1 = 0.0;
        this._lastX2 = 0.0;
        this._lastY2 = 0.0;
        this._lastTouchDistance = 0.0;
        this._deltaX = 0.0;
        this._deltaY = 0.0;
        this._scale = 1.0;
        this._touchSingle = false;
        this._flipAvailable = false;
    }
    CoordinateManager.prototype.getCenterX = function () {
        return this._lastX;
    };
    CoordinateManager.prototype.getCenterY = function () {
        return this._lastY;
    };
    CoordinateManager.prototype.getDeltaX = function () {
        return this._deltaX;
    };
    CoordinateManager.prototype.getDeltaY = function () {
        return this._deltaY;
    };
    CoordinateManager.prototype.getStartX = function () {
        return this._startX;
    };
    CoordinateManager.prototype.getStartY = function () {
        return this._startY;
    };
    CoordinateManager.prototype.getScale = function () {
        return this._scale;
    };
    CoordinateManager.prototype.getX = function () {
        return this._lastX;
    };
    CoordinateManager.prototype.getY = function () {
        return this._lastY;
    };
    CoordinateManager.prototype.getX1 = function () {
        return this._lastX1;
    };
    CoordinateManager.prototype.getY1 = function () {
        return this._lastY1;
    };
    CoordinateManager.prototype.getX2 = function () {
        return this._lastX2;
    };
    CoordinateManager.prototype.getY2 = function () {
        return this._lastY2;
    };
    CoordinateManager.prototype.isSingleTouch = function () {
        return this._touchSingle;
    };
    CoordinateManager.prototype.isFlickAvailable = function () {
        return this._flipAvailable;
    };
    CoordinateManager.prototype.disableFlick = function () {
        this._flipAvailable = false;
    };
    /**
     * タッチ開始時イベント
     * @param deviceX タッチした画面のxの値
     * @param deviceY タッチした画面のyの値
     */
    CoordinateManager.prototype.touchesBegan = function (deviceX, deviceY) {
        this._lastX = deviceX;
        this._lastY = deviceY;
        this._startX = deviceX;
        this._startY = deviceY;
        this._lastTouchDistance = -1.0;
        this._flipAvailable = true;
        this._touchSingle = true;
    };
    /**
     * ドラッグ時のイベント
     * @param deviceX タッチした画面のxの値
     * @param deviceY タッチした画面のyの値
     */
    CoordinateManager.prototype.touchesMoved = function (deviceX, deviceY) {
        this._lastX = deviceX;
        this._lastY = deviceY;
        this._lastTouchDistance = -1.0;
        this._touchSingle = true;
    };
    /**
     * フリックの距離測定
     * @return フリック距離
     */
    CoordinateManager.prototype.getFlickDistance = function () {
        return this.calculateDistance(this._startX, this._startY, this._lastX, this._lastY);
    };
    /**
     * 点１から点２への距離を求める
     *
     * @param x1 １つ目のタッチした画面のxの値
     * @param y1 １つ目のタッチした画面のyの値
     * @param x2 ２つ目のタッチした画面のxの値
     * @param y2 ２つ目のタッチした画面のyの値
     */
    CoordinateManager.prototype.calculateDistance = function (x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };
    /**
     * ２つ目の値から、移動量を求める。
     * 違う方向の場合は移動量０。同じ方向の場合は、絶対値が小さい方の値を参照する。
     *
     * @param v1 １つ目の移動量
     * @param v2 ２つ目の移動量
     *
     * @return 小さい方の移動量
     */
    CoordinateManager.prototype.calculateMovingAmount = function (v1, v2) {
        if (v1 > 0.0 != v2 > 0.0) {
            return 0.0;
        }
        var sign = v1 > 0.0 ? 1.0 : -1.0;
        var absoluteValue1 = Math.abs(v1);
        var absoluteValue2 = Math.abs(v2);
        return (sign * (absoluteValue1 < absoluteValue2 ? absoluteValue1 : absoluteValue2));
    };
    return CoordinateManager;
}());


/***/ }),

/***/ "./src/CubismSDK/View.ts":
/*!*******************************!*\
  !*** ./src/CubismSDK/View.ts ***!
  \*******************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
var View = /** @class */ (function () {
    function View(webgl) {
        this._webgl = webgl;
    }
    View.prototype.render = function () {
        this._webgl.gl.useProgram(this._programId);
        this._webgl.gl.flush();
    };
    return View;
}());



/***/ }),

/***/ "./src/CubismSDK/Webgl.ts":
/*!********************************!*\
  !*** ./src/CubismSDK/Webgl.ts ***!
  \********************************/
/*! exports provided: Webgl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Webgl", function() { return Webgl; });
var Webgl = /** @class */ (function () {
    function Webgl(canvas) {
        this.gl = canvas.getContext("webgl");
        this.frameBuffer = this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }
    Webgl.prototype.createShader = function () {
        var vertexShaderId = this.gl.createShader(this.gl.VERTEX_SHADER);
        if (vertexShaderId == null) {
            // LAppPal.printLog("failed to create vertexShader");
            return null;
        }
        var vertexShader = "precision mediump float;" +
            "attribute vec3 position;" +
            "attribute vec2 uv;" +
            "varying vec2 vuv;" +
            "void main(void)" +
            "{" +
            "   gl_Position = vec4(position, 1.0);" +
            "   vuv = uv;" +
            "}";
        this.gl.shaderSource(vertexShaderId, vertexShader);
        this.gl.compileShader(vertexShaderId);
        var fragmentShaderId = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        if (fragmentShaderId == null) {
            // LAppPal.printLog("failed to create fragmentShader");
            return null;
        }
        var fragmentShader = "precision mediump float;" +
            "varying vec2 vuv;" +
            "uniform sampler2D texture;" +
            "void main(void)" +
            "{" +
            "   gl_FragColor = texture2D(texture, vuv);" +
            "}";
        this.gl.shaderSource(fragmentShaderId, fragmentShader);
        this.gl.compileShader(fragmentShaderId);
        var programId = this.gl.createProgram();
        this.gl.attachShader(programId, vertexShaderId);
        this.gl.attachShader(programId, fragmentShaderId);
        this.gl.deleteShader(vertexShaderId);
        this.gl.deleteShader(fragmentShaderId);
        this.gl.linkProgram(programId);
        this.gl.useProgram(programId);
        return programId;
    };
    return Webgl;
}());



/***/ }),

/***/ "./src/Framework/cubismdefaultparameterid.ts":
/*!***************************************************!*\
  !*** ./src/Framework/cubismdefaultparameterid.ts ***!
  \***************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * @brief パラメータIDのデフォルト値を保持する定数<br>
 *         デフォルト値の仕様は以下のマニュアルに基づく<br>
 *         https://docs.live2d.com/cubism-editor-manual/standard-parametor-list/
 */
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    // パーツID
    Live2DCubismFramework.HitAreaPrefix = "HitArea";
    Live2DCubismFramework.HitAreaHead = "Head";
    Live2DCubismFramework.HitAreaBody = "Body";
    Live2DCubismFramework.PartsIdCore = "Parts01Core";
    Live2DCubismFramework.PartsArmPrefix = "Parts01Arm_";
    Live2DCubismFramework.PartsArmLPrefix = "Parts01ArmL_";
    Live2DCubismFramework.PartsArmRPrefix = "Parts01ArmR_";
    // パラメータID
    Live2DCubismFramework.ParamAngleX = "ParamAngleX";
    Live2DCubismFramework.ParamAngleY = "ParamAngleY";
    Live2DCubismFramework.ParamAngleZ = "ParamAngleZ";
    Live2DCubismFramework.ParamEyeLOpen = "ParamEyeLOpen";
    Live2DCubismFramework.ParamEyeLSmile = "ParamEyeLSmile";
    Live2DCubismFramework.ParamEyeROpen = "ParamEyeROpen";
    Live2DCubismFramework.ParamEyeRSmile = "ParamEyeRSmile";
    Live2DCubismFramework.ParamEyeBallX = "ParamEyeBallX";
    Live2DCubismFramework.ParamEyeBallY = "ParamEyeBallY";
    Live2DCubismFramework.ParamEyeBallForm = "ParamEyeBallForm";
    Live2DCubismFramework.ParamBrowLY = "ParamBrowLY";
    Live2DCubismFramework.ParamBrowRY = "ParamBrowRY";
    Live2DCubismFramework.ParamBrowLX = "ParamBrowLX";
    Live2DCubismFramework.ParamBrowRX = "ParamBrowRX";
    Live2DCubismFramework.ParamBrowLAngle = "ParamBrowLAngle";
    Live2DCubismFramework.ParamBrowRAngle = "ParamBrowRAngle";
    Live2DCubismFramework.ParamBrowLForm = "ParamBrowLForm";
    Live2DCubismFramework.ParamBrowRForm = "ParamBrowRForm";
    Live2DCubismFramework.ParamMouthForm = "ParamMouthForm";
    Live2DCubismFramework.ParamMouthOpenY = "ParamMouthOpenY";
    Live2DCubismFramework.ParamCheek = "ParamCheek";
    Live2DCubismFramework.ParamBodyAngleX = "ParamBodyAngleX";
    Live2DCubismFramework.ParamBodyAngleY = "ParamBodyAngleY";
    Live2DCubismFramework.ParamBodyAngleZ = "ParamBodyAngleZ";
    Live2DCubismFramework.ParamBreath = "ParamBreath";
    Live2DCubismFramework.ParamArmLA = "ParamArmLA";
    Live2DCubismFramework.ParamArmRA = "ParamArmRA";
    Live2DCubismFramework.ParamArmLB = "ParamArmLB";
    Live2DCubismFramework.ParamArmRB = "ParamArmRB";
    Live2DCubismFramework.ParamHandL = "ParamHandL";
    Live2DCubismFramework.ParamHandR = "ParamHandR";
    Live2DCubismFramework.ParamHairFront = "ParamHairFront";
    Live2DCubismFramework.ParamHairSide = "ParamHairSide";
    Live2DCubismFramework.ParamHairBack = "ParamHairBack";
    Live2DCubismFramework.ParamHairFluffy = "ParamHairFluffy";
    Live2DCubismFramework.ParamShoulderY = "ParamShoulderY";
    Live2DCubismFramework.ParamBustX = "ParamBustX";
    Live2DCubismFramework.ParamBustY = "ParamBustY";
    Live2DCubismFramework.ParamBaseX = "ParamBaseX";
    Live2DCubismFramework.ParamBaseY = "ParamBaseY";
    Live2DCubismFramework.ParamNONE = "NONE:";
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/cubismframeworkconfig.ts":
/*!************************************************!*\
  !*** ./src/Framework/cubismframeworkconfig.ts ***!
  \************************************************/
/*! exports provided: CSM_LOG_LEVEL_VERBOSE, CSM_LOG_LEVEL_DEBUG, CSM_LOG_LEVEL_INFO, CSM_LOG_LEVEL_WARNING, CSM_LOG_LEVEL_ERROR, CSM_LOG_LEVEL_OFF, CSM_LOG_LEVEL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSM_LOG_LEVEL_VERBOSE", function() { return CSM_LOG_LEVEL_VERBOSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSM_LOG_LEVEL_DEBUG", function() { return CSM_LOG_LEVEL_DEBUG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSM_LOG_LEVEL_INFO", function() { return CSM_LOG_LEVEL_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSM_LOG_LEVEL_WARNING", function() { return CSM_LOG_LEVEL_WARNING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSM_LOG_LEVEL_ERROR", function() { return CSM_LOG_LEVEL_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSM_LOG_LEVEL_OFF", function() { return CSM_LOG_LEVEL_OFF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSM_LOG_LEVEL", function() { return CSM_LOG_LEVEL; });
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
//========================================================
//  ログ出力関数の設定
//========================================================
//---------- ログ出力レベル 選択項目 定義 ----------
/// 詳細ログ出力設定
var CSM_LOG_LEVEL_VERBOSE = 0;
/// デバッグログ出力設定
var CSM_LOG_LEVEL_DEBUG = 1;
/// Infoログ出力設定
var CSM_LOG_LEVEL_INFO = 2;
/// 警告ログ出力設定
var CSM_LOG_LEVEL_WARNING = 3;
/// エラーログ出力設定
var CSM_LOG_LEVEL_ERROR = 4;
/// ログ出力オフ設定
var CSM_LOG_LEVEL_OFF = 5;
/**
* ログ出力レベル設定。
*
* 強制的にログ出力レベルを変える時に定義を有効にする。
* CSM_LOG_LEVEL_VERBOSE ～ CSM_LOG_LEVEL_OFF を選択する。
*/
var CSM_LOG_LEVEL = CSM_LOG_LEVEL_VERBOSE;


/***/ }),

/***/ "./src/Framework/cubismmodelsettingjson.ts":
/*!*************************************************!*\
  !*** ./src/Framework/cubismmodelsettingjson.ts ***!
  \*************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/* harmony import */ var _icubismmodelsetting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icubismmodelsetting */ "./src/Framework/icubismmodelsetting.ts");
/* harmony import */ var _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/cubismjson */ "./src/Framework/utils/cubismjson.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./type/csmvector */ "./src/Framework/type/csmvector.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var csmVector = _type_csmvector__WEBPACK_IMPORTED_MODULE_3__["Live2DCubismFramework"].csmVector;
var CubismFramework = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismFramework;
var CubismJson = _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].CubismJson;
var ICubismModelSetting = _icubismmodelsetting__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].ICubismModelSetting;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * Model3Jsonのキー文字列
     */
    // JSON Keys
    var Version = "Version";
    var FileReferences = "FileReferences";
    var Groups = "Groups";
    var Layout = "Layout";
    var HitAreas = "HitAreas";
    var Moc = "Moc";
    var Textures = "Textures";
    var Physics = "Physics";
    var Pose = "Pose";
    var Expressions = "Expressions";
    var Motions = "Motions";
    var UserData = "UserData";
    var Name = "Name";
    var FilePath = "File";
    var Id = "Id";
    var Ids = "Ids";
    var Target = "Target";
    // Motions
    var Idle = "Idle";
    var TapBody = "TapBody";
    var PinchIn = "PinchIn";
    var PinchOut = "PinchOut";
    var Shake = "Shake";
    var FlickHead = "FlickHead";
    var Parameter = "Parameter";
    var SoundPath = "Sound";
    var FadeInTime = "FadeInTime";
    var FadeOutTime = "FadeOutTime";
    // Layout
    var CenterX = "CenterX";
    var CenterY = "CenterY";
    var X = "X";
    var Y = "Y";
    var Width = "Width";
    var Height = "Height";
    var LipSync = "LipSync";
    var EyeBlink = "EyeBlink";
    var InitParameter = "init_param";
    var InitPartsVisible = "init_parts_visible";
    var Val = "val";
    var FrequestNode;
    (function (FrequestNode) {
        FrequestNode[FrequestNode["FrequestNode_Groups"] = 0] = "FrequestNode_Groups";
        FrequestNode[FrequestNode["FrequestNode_Moc"] = 1] = "FrequestNode_Moc";
        FrequestNode[FrequestNode["FrequestNode_Motions"] = 2] = "FrequestNode_Motions";
        FrequestNode[FrequestNode["FrequestNode_Expressions"] = 3] = "FrequestNode_Expressions";
        FrequestNode[FrequestNode["FrequestNode_Textures"] = 4] = "FrequestNode_Textures";
        FrequestNode[FrequestNode["FrequestNode_Physics"] = 5] = "FrequestNode_Physics";
        FrequestNode[FrequestNode["FrequestNode_Pose"] = 6] = "FrequestNode_Pose";
        FrequestNode[FrequestNode["FrequestNode_HitAreas"] = 7] = "FrequestNode_HitAreas"; // getRoot().getValueByString(HitAreas)
    })(FrequestNode || (FrequestNode = {}));
    ;
    /**
     * Model3Jsonパーサー
     *
     * model3.jsonファイルをパースして値を取得する
     */
    var CubismModelSettingJson = /** @class */ (function (_super) {
        __extends(CubismModelSettingJson, _super);
        /**
         * 引数付きコンストラクタ
         *
         * @param buffer    Model3Jsonをバイト配列として読み込んだデータバッファ
         * @param size      Model3Jsonのデータサイズ
         */
        function CubismModelSettingJson(buffer, size) {
            var _this = _super.call(this) || this;
            _this._json = CubismJson.create(buffer, size);
            if (_this._json) {
                _this._jsonValue = new csmVector();
                // 順番はenum FrequestNodeと一致させる
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(Groups));
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(FileReferences).getValueByString(Moc));
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(FileReferences).getValueByString(Motions));
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(FileReferences).getValueByString(Expressions));
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(FileReferences).getValueByString(Textures));
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(FileReferences).getValueByString(Physics));
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(FileReferences).getValueByString(Pose));
                _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(HitAreas));
            }
            return _this;
        }
        /**
         * デストラクタ相当の処理
         */
        CubismModelSettingJson.prototype.release = function () {
            CubismJson.delete(this._json);
            this._jsonValue = null;
        };
        /**
         * CubismJsonオブジェクトを取得する
         *
         * @return CubismJson
         */
        CubismModelSettingJson.prototype.GetJson = function () {
            return this._json;
        };
        /**
         * Mocファイルの名前を取得する
         * @return Mocファイルの名前
         */
        CubismModelSettingJson.prototype.getModelFileName = function () {
            if (!this.isExistModelFile()) {
                return "";
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Moc).getRawString();
        };
        /**
         * モデルが使用するテクスチャの数を取得する
         * テクスチャの数
         */
        CubismModelSettingJson.prototype.getTextureCount = function () {
            if (!this.isExistTextureFiles()) {
                return 0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Textures).getSize();
        };
        /**
         * テクスチャが配置されたディレクトリの名前を取得する
         * @return テクスチャが配置されたディレクトリの名前
         */
        CubismModelSettingJson.prototype.getTextureDirectory = function () {
            return this._jsonValue.at(FrequestNode.FrequestNode_Textures).getRawString();
        };
        /**
         * モデルが使用するテクスチャの名前を取得する
         * @param index 配列のインデックス値
         * @return テクスチャの名前
         */
        CubismModelSettingJson.prototype.getTextureFileName = function (index) {
            return this._jsonValue.at(FrequestNode.FrequestNode_Textures).getValueByIndex(index).getRawString();
        };
        /**
         * モデルに設定された当たり判定の数を取得する
         * @return モデルに設定された当たり判定の数
         */
        CubismModelSettingJson.prototype.getHitAreasCount = function () {
            if (!this.isExistHitAreas()) {
                return 0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_HitAreas).getSize();
        };
        /**
         * 当たり判定に設定されたIDを取得する
         *
         * @param index 配列のindex
         * @return 当たり判定に設定されたID
         */
        CubismModelSettingJson.prototype.getHitAreaId = function (index) {
            return CubismFramework.getIdManager().getId(this._jsonValue.at(FrequestNode.FrequestNode_HitAreas).getValueByIndex(index).getValueByString(Id).getRawString());
        };
        /**
         * 当たり判定に設定された名前を取得する
         * @param index 配列のインデックス値
         * @return 当たり判定に設定された名前
         */
        CubismModelSettingJson.prototype.getHitAreaName = function (index) {
            return this._jsonValue.at(FrequestNode.FrequestNode_HitAreas).getValueByIndex(index).getValueByString(Name).getRawString();
        };
        /**
         * 物理演算設定ファイルの名前を取得する
         * @return 物理演算設定ファイルの名前
         */
        CubismModelSettingJson.prototype.getPhysicsFileName = function () {
            if (!this.isExistPhysicsFile()) {
                return "";
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Physics).getRawString();
        };
        /**
         * パーツ切り替え設定ファイルの名前を取得する
         * @return パーツ切り替え設定ファイルの名前
         */
        CubismModelSettingJson.prototype.getPoseFileName = function () {
            if (!this.isExistPoseFile()) {
                return "";
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Pose).getRawString();
        };
        /**
         * 表情設定ファイルの数を取得する
         * @return 表情設定ファイルの数
         */
        CubismModelSettingJson.prototype.getExpressionCount = function () {
            if (!this.isExistExpressionFile()) {
                return 0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Expressions).getSize();
        };
        /**
         * 表情設定ファイルを識別する名前（別名）を取得する
         * @param index 配列のインデックス値
         * @return 表情の名前
         */
        CubismModelSettingJson.prototype.getExpressionName = function (index) {
            return this._jsonValue.at(FrequestNode.FrequestNode_Expressions).getValueByIndex(index).getValueByString(Name).getRawString();
        };
        /**
         * 表情設定ファイルの名前を取得する
         * @param index 配列のインデックス値
         * @return 表情設定ファイルの名前
         */
        CubismModelSettingJson.prototype.getExpressionFileName = function (index) {
            return this._jsonValue.at(FrequestNode.FrequestNode_Expressions).getValueByIndex(index).getValueByString(FilePath).getRawString();
        };
        /**
         * モーショングループの数を取得する
         * @return モーショングループの数
         */
        CubismModelSettingJson.prototype.getMotionGroupCount = function () {
            if (!this.isExistMotionGroups()) {
                return 0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getKeys().getSize();
        };
        /**
         * モーショングループの名前を取得する
         * @param index 配列のインデックス値
         * @return モーショングループの名前
         */
        CubismModelSettingJson.prototype.getMotionGroupName = function (index) {
            if (!this.isExistMotionGroups()) {
                return null;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getKeys().at(index);
        };
        /**
         * モーショングループに含まれるモーションの数を取得する
         * @param groupName モーショングループの名前
         * @return モーショングループの数
         */
        CubismModelSettingJson.prototype.getMotionCount = function (groupName) {
            if (!this.isExistMotionGroupName(groupName)) {
                return 0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getSize();
        };
        /**
         * グループ名とインデックス値からモーションファイル名を取得する
         * @param groupName モーショングループの名前
         * @param index     配列のインデックス値
         * @return モーションファイルの名前
         */
        CubismModelSettingJson.prototype.getMotionFileName = function (groupName, index) {
            if (!this.isExistMotionGroupName(groupName)) {
                return "";
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(FilePath).getRawString();
        };
        /**
         * モーションに対応するサウンドファイルの名前を取得する
         * @param groupName モーショングループの名前
         * @param index 配列のインデックス値
         * @return サウンドファイルの名前
         */
        CubismModelSettingJson.prototype.getMotionSoundFileName = function (groupName, index) {
            if (!this.isExistMotionSoundFile(groupName, index)) {
                return "";
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(SoundPath).getRawString();
        };
        /**
         * モーション開始時のフェードイン処理時間を取得する
         * @param groupName モーショングループの名前
         * @param index 配列のインデックス値
         * @return フェードイン処理時間[秒]
         */
        CubismModelSettingJson.prototype.getMotionFadeInTimeValue = function (groupName, index) {
            if (!this.isExistMotionFadeIn(groupName, index)) {
                return -1.0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(FadeInTime).toFloat();
        };
        /**
         * モーション終了時のフェードアウト処理時間を取得する
         * @param groupName モーショングループの名前
         * @param index 配列のインデックス値
         * @return フェードアウト処理時間[秒]
         */
        CubismModelSettingJson.prototype.getMotionFadeOutTimeValue = function (groupName, index) {
            if (!this.isExistMotionFadeOut(groupName, index)) {
                return -1.0;
            }
            return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(FadeOutTime).toFloat();
        };
        /**
         * ユーザーデータのファイル名を取得する
         * @return ユーザーデータのファイル名
         */
        CubismModelSettingJson.prototype.getUserDataFile = function () {
            if (!this.isExistUserDataFile()) {
                return "";
            }
            return this._json.getRoot().getValueByString(FileReferences).getValueByString(UserData).getRawString();
        };
        /**
         * レイアウト情報を取得する
         * @param outLayoutMap csmMapクラスのインスタンス
         * @return true レイアウト情報が存在する
         * @return false レイアウト情報が存在しない
         */
        CubismModelSettingJson.prototype.getLayoutMap = function (outLayoutMap) {
            // 存在しない要素にアクセスするとエラーになるためValueがnullの場合はnullを代入する
            var map = this._json.getRoot().getValueByString(Layout).getMap();
            if (map == null) {
                return false;
            }
            var ret = false;
            for (var ite = map.begin(); ite.notEqual(map.end()); ite.preIncrement()) {
                outLayoutMap.setValue(ite.ptr().first, ite.ptr().second.toFloat());
                ret = true;
            }
            return ret;
        };
        /**
         * 目パチに関連付けられたパラメータの数を取得する
         * @return 目パチに関連付けられたパラメータの数
         */
        CubismModelSettingJson.prototype.getEyeBlinkParameterCount = function () {
            if (!this.isExistEyeBlinkParameters()) {
                return 0;
            }
            var num = 0;
            for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
                var refI = this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i);
                if (refI.isNull() || refI.isError()) {
                    continue;
                }
                if (refI.getValueByString(Name).getRawString() == EyeBlink) {
                    num = refI.getValueByString(Ids).getVector().getSize();
                    break;
                }
            }
            return num;
        };
        /**
         * 目パチに関連付けられたパラメータのIDを取得する
         * @param index 配列のインデックス値
         * @return パラメータID
         */
        CubismModelSettingJson.prototype.getEyeBlinkParameterId = function (index) {
            if (!this.isExistEyeBlinkParameters()) {
                return null;
            }
            for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
                var refI = this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i);
                if (refI.isNull() || refI.isError()) {
                    continue;
                }
                if (refI.getValueByString(Name).getRawString() == EyeBlink) {
                    return CubismFramework.getIdManager().getId(refI.getValueByString(Ids).getValueByIndex(index).getRawString());
                }
            }
            return null;
        };
        /**
         * リップシンクに関連付けられたパラメータの数を取得する
         * @return リップシンクに関連付けられたパラメータの数
         */
        CubismModelSettingJson.prototype.getLipSyncParameterCount = function () {
            if (!this.isExistLipSyncParameters()) {
                return 0;
            }
            var num = 0;
            for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
                var refI = this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i);
                if (refI.isNull() || refI.isError()) {
                    continue;
                }
                if (refI.getValueByString(Name).getRawString() == LipSync) {
                    num = refI.getValueByString(Ids).getVector().getSize();
                    break;
                }
            }
            return num;
        };
        /**
         * リップシンクに関連付けられたパラメータの数を取得する
         * @param index 配列のインデックス値
         * @return パラメータID
         */
        CubismModelSettingJson.prototype.getLipSyncParameterId = function (index) {
            if (!this.isExistLipSyncParameters()) {
                return null;
            }
            for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
                var refI = this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i);
                if (refI.isNull() || refI.isError()) {
                    continue;
                }
                if (refI.getValueByString(Name).getRawString() == LipSync) {
                    return CubismFramework.getIdManager().getId(refI.getValueByString(Ids).getValueByIndex(index).getRawString());
                }
            }
            return null;
        };
        /**
         * モデルファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        CubismModelSettingJson.prototype.isExistModelFile = function () {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Moc);
            return !node.isNull() && !node.isError();
        };
        /**
         * テクスチャファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        CubismModelSettingJson.prototype.isExistTextureFiles = function () {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Textures);
            return !node.isNull() && !node.isError();
        };
        /**
         * 当たり判定のキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        CubismModelSettingJson.prototype.isExistHitAreas = function () {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_HitAreas);
            return !node.isNull() && !node.isError();
        };
        /**
         * 物理演算ファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        CubismModelSettingJson.prototype.isExistPhysicsFile = function () {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Physics);
            return !node.isNull() && !node.isError();
        };
        /**
         * ポーズ設定ファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        CubismModelSettingJson.prototype.isExistPoseFile = function () {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Pose);
            return !node.isNull() && !node.isError();
        };
        /**
         * 表情設定ファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        CubismModelSettingJson.prototype.isExistExpressionFile = function () {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Expressions);
            return !node.isNull() && !node.isError();
        };
        /**
         * モーショングループのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        CubismModelSettingJson.prototype.isExistMotionGroups = function () {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Motions);
            return !node.isNull() && !node.isError();
        };
        /**
         * 引数で指定したモーショングループのキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        CubismModelSettingJson.prototype.isExistMotionGroupName = function (groupName) {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName);
            return !node.isNull() && !node.isError();
        };
        /**
         * 引数で指定したモーションに対応するサウンドファイルのキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @param index 配列のインデックス値
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        CubismModelSettingJson.prototype.isExistMotionSoundFile = function (groupName, index) {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(SoundPath);
            return !node.isNull() && !node.isError();
        };
        /**
         * 引数で指定したモーションに対応するフェードイン時間のキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @param index 配列のインデックス値
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        CubismModelSettingJson.prototype.isExistMotionFadeIn = function (groupName, index) {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(FadeInTime);
            return !node.isNull() && !node.isError();
        };
        /**
         * 引数で指定したモーションに対応するフェードアウト時間のキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @param index 配列のインデックス値
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        CubismModelSettingJson.prototype.isExistMotionFadeOut = function (groupName, index) {
            var node = this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(FadeOutTime);
            return !node.isNull() && !node.isError();
        };
        /**
         * UserDataのファイル名が存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        CubismModelSettingJson.prototype.isExistUserDataFile = function () {
            var node = this._json.getRoot().getValueByString(FileReferences).getValueByString(UserData);
            return !node.isNull() && !node.isError();
        };
        /**
         * 目ぱちに対応付けられたパラメータが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        CubismModelSettingJson.prototype.isExistEyeBlinkParameters = function () {
            if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).isNull() || this._jsonValue.at(FrequestNode.FrequestNode_Groups).isError()) {
                return false;
            }
            for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); ++i) {
                if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i).getValueByString(Name).getRawString() == EyeBlink) {
                    return true;
                }
            }
            return false;
        };
        /**
         * リップシンクに対応付けられたパラメータが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        CubismModelSettingJson.prototype.isExistLipSyncParameters = function () {
            if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).isNull() || this._jsonValue.at(FrequestNode.FrequestNode_Groups).isError()) {
                return false;
            }
            for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); ++i) {
                if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i).getValueByString(Name).getRawString() == LipSync) {
                    return true;
                }
            }
            return false;
        };
        return CubismModelSettingJson;
    }(ICubismModelSetting));
    Live2DCubismFramework.CubismModelSettingJson = CubismModelSettingJson;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/effect/cubismbreath.ts":
/*!**********************************************!*\
  !*** ./src/Framework/effect/cubismbreath.ts ***!
  \**********************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 呼吸機能
     *
     * 呼吸機能を提供する。
     */
    var CubismBreath = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismBreath() {
            this._currentTime = 0.0;
        }
        /**
         * インスタンスの作成
         */
        CubismBreath.create = function () {
            return new CubismBreath();
        };
        /**
         * インスタンスの破棄
         * @param instance 対象のCubismBreath
         */
        CubismBreath.delete = function (instance) {
            if (instance != null) {
                instance = null;
            }
        };
        /**
         * 呼吸のパラメータの紐づけ
         * @param breathParameters 呼吸を紐づけたいパラメータのリスト
         */
        CubismBreath.prototype.setParameters = function (breathParameters) {
            this._breathParameters = breathParameters;
        };
        /**
         * 呼吸に紐づいているパラメータの取得
         * @return 呼吸に紐づいているパラメータのリスト
         */
        CubismBreath.prototype.getParameters = function () {
            return this._breathParameters;
        };
        /**
         * モデルのパラメータの更新
         * @param model 対象のモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         */
        CubismBreath.prototype.updateParameters = function (model, deltaTimeSeconds) {
            this._currentTime += deltaTimeSeconds;
            var t = this._currentTime * 2.0 * 3.14159;
            for (var i = 0; i < this._breathParameters.getSize(); ++i) {
                var data = this._breathParameters.at(i);
                model.addParameterValueById(data.parameterId, data.offset + (data.peak * Math.sin(t / data.cycle)), data.weight);
            }
        };
        return CubismBreath;
    }());
    Live2DCubismFramework.CubismBreath = CubismBreath;
    /**
     * 呼吸のパラメータ情報
     */
    var BreathParameterData = /** @class */ (function () {
        /**
         * コンストラクタ
         * @param parameterId   呼吸をひもづけるパラメータID
         * @param offset        呼吸を正弦波としたときの、波のオフセット
         * @param peak          呼吸を正弦波としたときの、波の高さ
         * @param cycle         呼吸を正弦波としたときの、波の周期
         * @param weight        パラメータへの重み
         */
        function BreathParameterData(parameterId, offset, peak, cycle, weight) {
            this.parameterId = (parameterId == undefined)
                ? null
                : parameterId;
            this.offset = (offset == undefined)
                ? 0.0
                : offset;
            this.peak = (peak == undefined)
                ? 0.0
                : peak;
            this.cycle = (cycle == undefined)
                ? 0.0
                : cycle;
            this.weight = (weight == undefined)
                ? 0.0
                : weight;
        }
        return BreathParameterData;
    }());
    Live2DCubismFramework.BreathParameterData = BreathParameterData;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/effect/cubismeyeblink.ts":
/*!************************************************!*\
  !*** ./src/Framework/effect/cubismeyeblink.ts ***!
  \************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/csmvector */ "./src/Framework/type/csmvector.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

var csmVector = _type_csmvector__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].csmVector;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 自動まばたき機能
     *
     * 自動まばたき機能を提供する。
     */
    var CubismEyeBlink = /** @class */ (function () {
        /**
         * コンストラクタ
         * @param modelSetting モデルの設定情報
         */
        function CubismEyeBlink(modelSetting) {
            this._blinkingState = EyeState.EyeState_First;
            this._nextBlinkingTime = 0.0;
            this._stateStartTimeSeconds = 0.0;
            this._blinkingIntervalSeconds = 4.0;
            this._closingSeconds = 0.1;
            this._closedSeconds = 0.05;
            this._openingSeconds = 0.15;
            this._userTimeSeconds = 0.0;
            this._parameterIds = new csmVector();
            if (modelSetting == null) {
                return;
            }
            for (var i = 0; i < modelSetting.getEyeBlinkParameterCount(); ++i) {
                this._parameterIds.pushBack(modelSetting.getEyeBlinkParameterId(i));
            }
        }
        /**
         * インスタンスを作成する
         * @param modelSetting モデルの設定情報
         * @return 作成されたインスタンス
         * @note 引数がNULLの場合、パラメータIDが設定されていない空のインスタンスを作成する。
         */
        CubismEyeBlink.create = function (modelSetting) {
            if (modelSetting === void 0) { modelSetting = null; }
            return new CubismEyeBlink(modelSetting);
        };
        /**
         * インスタンスの破棄
         * @param eyeBlink 対象のCubismEyeBlink
         */
        CubismEyeBlink.delete = function (eyeBlink) {
            if (eyeBlink != null) {
                eyeBlink = null;
            }
        };
        /**
         * まばたきの間隔の設定
         * @param blinkingInterval まばたきの間隔の時間[秒]
         */
        CubismEyeBlink.prototype.setBlinkingInterval = function (blinkingInterval) {
            this._blinkingIntervalSeconds = blinkingInterval;
        };
        /**
         * まばたきのモーションの詳細設定
         * @param closing   まぶたを閉じる動作の所要時間[秒]
         * @param closed    まぶたを閉じている動作の所要時間[秒]
         * @param opening   まぶたを開く動作の所要時間[秒]
         */
        CubismEyeBlink.prototype.setBlinkingSetting = function (closing, closed, opening) {
            this._closingSeconds = closing;
            this._closedSeconds = closed;
            this._openingSeconds = opening;
        };
        /**
         * まばたきさせるパラメータIDのリストの設定
         * @param parameterIds パラメータのIDのリスト
         */
        CubismEyeBlink.prototype.setParameterIds = function (parameterIds) {
            this._parameterIds = parameterIds;
        };
        /**
         * まばたきさせるパラメータIDのリストの取得
         * @return パラメータIDのリスト
         */
        CubismEyeBlink.prototype.getParameterIds = function () {
            return this._parameterIds;
        };
        /**
         * モデルのパラメータの更新
         * @param model 対象のモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         */
        CubismEyeBlink.prototype.updateParameters = function (model, deltaTimeSeconds) {
            this._userTimeSeconds += deltaTimeSeconds;
            var parameterValue;
            var t = 0.0;
            switch (this._blinkingState) {
                case EyeState.EyeState_Closing:
                    t = ((this._userTimeSeconds - this._stateStartTimeSeconds) / this._closingSeconds);
                    if (t >= 1.0) {
                        t = 1.0;
                        this._blinkingState = EyeState.EyeState_Closed;
                        this._stateStartTimeSeconds = this._userTimeSeconds;
                    }
                    parameterValue = 1.0 - t;
                    break;
                case EyeState.EyeState_Closed:
                    t = ((this._userTimeSeconds - this._stateStartTimeSeconds) / this._closedSeconds);
                    if (t >= 1.0) {
                        this._blinkingState = EyeState.EyeState_Opening;
                        this._stateStartTimeSeconds = this._userTimeSeconds;
                    }
                    parameterValue = 0.0;
                    break;
                case EyeState.EyeState_Opening:
                    t = ((this._userTimeSeconds - this._stateStartTimeSeconds) / this._openingSeconds);
                    if (t >= 1.0) {
                        t = 1.0;
                        this._blinkingState = EyeState.EyeState_Interval;
                        this._nextBlinkingTime = this.determinNextBlinkingTiming();
                    }
                    parameterValue = t;
                    break;
                case EyeState.EyeState_Interval:
                    if (this._nextBlinkingTime < this._userTimeSeconds) {
                        this._blinkingState = EyeState.EyeState_Closing;
                        this._stateStartTimeSeconds = this._userTimeSeconds;
                    }
                    parameterValue = 1.0;
                    break;
                case EyeState.EyeState_First:
                default:
                    this._blinkingState = EyeState.EyeState_Interval;
                    this._nextBlinkingTime = this.determinNextBlinkingTiming();
                    parameterValue = 1.0;
                    break;
            }
            if (!CubismEyeBlink.CloseIfZero) {
                parameterValue = -parameterValue;
            }
            for (var i = 0; i < this._parameterIds.getSize(); ++i) {
                model.setParameterValueById(this._parameterIds.at(i), parameterValue);
            }
        };
        /**
         * 次の瞬きのタイミングの決定
         *
         * @return 次のまばたきを行う時刻[秒]
         */
        CubismEyeBlink.prototype.determinNextBlinkingTiming = function () {
            var r = Math.random();
            return this._userTimeSeconds + (r * (2.0 * this._blinkingIntervalSeconds - 1.0));
        };
        /**
         * IDで指定された目のパラメータが、0のときに閉じるなら true 、1の時に閉じるなら false 。
         */
        CubismEyeBlink.CloseIfZero = true;
        return CubismEyeBlink;
    }());
    Live2DCubismFramework.CubismEyeBlink = CubismEyeBlink;
    /**
     * まばたきの状態
     *
     * まばたきの状態を表す列挙型
     */
    var EyeState;
    (function (EyeState) {
        EyeState[EyeState["EyeState_First"] = 0] = "EyeState_First";
        EyeState[EyeState["EyeState_Interval"] = 1] = "EyeState_Interval";
        EyeState[EyeState["EyeState_Closing"] = 2] = "EyeState_Closing";
        EyeState[EyeState["EyeState_Closed"] = 3] = "EyeState_Closed";
        EyeState[EyeState["EyeState_Opening"] = 4] = "EyeState_Opening"; // まぶたが開いていく途中の状態
    })(EyeState = Live2DCubismFramework.EyeState || (Live2DCubismFramework.EyeState = {}));
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/effect/cubismpose.ts":
/*!********************************************!*\
  !*** ./src/Framework/effect/cubismpose.ts ***!
  \********************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/csmvector */ "./src/Framework/type/csmvector.ts");
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/* harmony import */ var _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/cubismjson */ "./src/Framework/utils/cubismjson.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */



var csmVector = _type_csmvector__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].csmVector;
var CubismFramework = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismFramework;
var CubismJson = _utils_cubismjson__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].CubismJson;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var Epsilon = 0.001;
    var DefaultFadeInSeconds = 0.5;
    // Pose.jsonのタグ
    var FadeIn = "FadeInTime";
    var Link = "Link";
    var Groups = "Groups";
    var Id = "Id";
    /**
     * パーツの不透明度の設定
     *
     * パーツの不透明度の管理と設定を行う。
     */
    var CubismPose = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismPose() {
            this._fadeTimeSeconds = DefaultFadeInSeconds;
            this._lastModel = null;
            this._partGroups = new csmVector();
            this._partGroupCounts = new csmVector();
        }
        /**
         * インスタンスの作成
         * @param pose3json pose3.jsonのデータ
         * @param size pose3.jsonのデータのサイズ[byte]
         * @return 作成されたインスタンス
         */
        CubismPose.create = function (pose3json, size) {
            var ret = new CubismPose();
            var json = CubismJson.create(pose3json, size);
            var root = json.getRoot();
            // フェード時間の指定
            if (!root.getValueByString(FadeIn).isNull()) {
                ret._fadeTimeSeconds = root.getValueByString(FadeIn).toFloat(DefaultFadeInSeconds);
                if (ret._fadeTimeSeconds <= 0.0) {
                    ret._fadeTimeSeconds = DefaultFadeInSeconds;
                }
            }
            // パーツグループ
            var poseListInfo = root.getValueByString(Groups);
            var poseCount = poseListInfo.getSize();
            for (var poseIndex = 0; poseIndex < poseCount; ++poseIndex) {
                var idListInfo = poseListInfo.getValueByIndex(poseIndex);
                var idCount = idListInfo.getSize();
                var groupCount = 0;
                for (var groupIndex = 0; groupIndex < idCount; ++groupIndex) {
                    var partInfo = idListInfo.getValueByIndex(groupIndex);
                    var partData = new PartData();
                    var parameterId = CubismFramework.getIdManager().getId(partInfo.getValueByString(Id).getRawString());
                    partData.partId = parameterId;
                    // リンクするパーツの設定
                    if (!partInfo.getValueByString(Link).isNull()) {
                        var linkListInfo = partInfo.getValueByString(Link);
                        var linkCount = linkListInfo.getSize();
                        for (var linkIndex = 0; linkIndex < linkCount; ++linkIndex) {
                            var linkPart = new PartData();
                            var linkId = CubismFramework.getIdManager().getId(linkListInfo.getValueByIndex(linkIndex).getString());
                            linkPart.partId = linkId;
                            partData.link.pushBack(linkPart);
                        }
                    }
                    ret._partGroups.pushBack(partData.clone());
                    ++groupCount;
                }
                ret._partGroupCounts.pushBack(groupCount);
            }
            CubismJson.delete(json);
            return ret;
        };
        /**
         * インスタンスを破棄する
         * @param pose 対象のCubismPose
         */
        CubismPose.delete = function (pose) {
            if (pose != null) {
                pose = null;
            }
        };
        /**
         * モデルのパラメータの更新
         * @param model 対象のモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         */
        CubismPose.prototype.updateParameters = function (model, deltaTimeSeconds) {
            // 前回のモデルと同じでない場合は初期化が必要
            if (model != this._lastModel) {
                // パラメータインデックスの初期化
                this.reset(model);
            }
            this._lastModel = model;
            // 設定から時間を変更すると、経過時間がマイナスになる事があるので、経過時間0として対応
            if (deltaTimeSeconds < 0.0) {
                deltaTimeSeconds = 0.0;
            }
            var beginIndex = 0;
            for (var i = 0; i < this._partGroupCounts.getSize(); i++) {
                var partGroupCount = this._partGroupCounts.at(i);
                this.doFade(model, deltaTimeSeconds, beginIndex, partGroupCount);
                beginIndex += partGroupCount;
            }
            this.copyPartOpacities(model);
        };
        /**
         * 表示を初期化
         * @param model 対象のモデル
         * @note 不透明度の初期値が0でないパラメータは、不透明度を１に設定する
         */
        CubismPose.prototype.reset = function (model) {
            var beginIndex = 0;
            for (var i = 0; i < this._partGroupCounts.getSize(); ++i) {
                var groupCount = this._partGroupCounts.at(i);
                for (var j = beginIndex; j < beginIndex + groupCount; ++j) {
                    this._partGroups.at(j).initialize(model);
                    var partsIndex = this._partGroups.at(j).partIndex;
                    var paramIndex = this._partGroups.at(j).parameterIndex;
                    if (partsIndex < 0) {
                        continue;
                    }
                    model.setPartOpacityByIndex(partsIndex, (j == beginIndex ? 1.0 : 0.0));
                    model.setParameterValueByIndex(paramIndex, (j == beginIndex ? 1.0 : 0.0));
                    for (var k = 0; k < this._partGroups.at(j).link.getSize(); ++k) {
                        this._partGroups.at(j).link.at(k).initialize(model);
                    }
                }
                beginIndex += groupCount;
            }
        };
        /**
         * パーツの不透明度をコピー
         *
         * @param model 対象のモデル
         */
        CubismPose.prototype.copyPartOpacities = function (model) {
            for (var groupIndex = 0; groupIndex < this._partGroups.getSize(); ++groupIndex) {
                var partData = this._partGroups.at(groupIndex);
                if (partData.link.getSize() == 0) {
                    continue; // 連動するパラメータはない
                }
                var partIndex = this._partGroups.at(groupIndex).partIndex;
                var opacity = model.getPartOpacityByIndex(partIndex);
                for (var linkIndex = 0; linkIndex < partData.link.getSize(); ++linkIndex) {
                    var linkPart = partData.link.at(linkIndex);
                    var linkPartIndex = linkPart.partIndex;
                    if (linkPartIndex < 0) {
                        continue;
                    }
                    model.setPartOpacityByIndex(linkPartIndex, opacity);
                }
            }
        };
        /**
         * パーツのフェード操作を行う。
         * @param model 対象のモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         * @param beginIndex フェード操作を行うパーツグループの先頭インデックス
         * @param partGroupCount フェード操作を行うパーツグループの個数
         */
        CubismPose.prototype.doFade = function (model, deltaTimeSeconds, beginIndex, partGroupCount) {
            var visiblePartIndex = -1;
            var newOpacity = 1.0;
            var phi = 0.5;
            var backOpacityThreshold = 0.15;
            // 現在、表示状態になっているパーツを取得
            for (var i = beginIndex; i < beginIndex + partGroupCount; ++i) {
                var partIndex = this._partGroups.at(i).partIndex;
                var paramIndex = this._partGroups.at(i).parameterIndex;
                if (model.getParameterValueByIndex(paramIndex) > Epsilon) {
                    if (visiblePartIndex >= 0) {
                        break;
                    }
                    visiblePartIndex = i;
                    newOpacity = model.getPartOpacityByIndex(partIndex);
                    // 新しい不透明度を計算
                    newOpacity += (deltaTimeSeconds / this._fadeTimeSeconds);
                    if (newOpacity > 1.0) {
                        newOpacity = 1.0;
                    }
                }
            }
            if (visiblePartIndex < 0) {
                visiblePartIndex = 0;
                newOpacity = 1.0;
            }
            // 表示パーツ、非表示パーツの不透明度を設定する
            for (var i = beginIndex; i < beginIndex + partGroupCount; ++i) {
                var partsIndex = this._partGroups.at(i).partIndex;
                // 表示パーツの設定
                if (visiblePartIndex == i) {
                    model.setPartOpacityByIndex(partsIndex, newOpacity); // 先に設定
                }
                // 非表示パーツの設定
                else {
                    var opacity = model.getPartOpacityByIndex(partsIndex);
                    var a1 = void 0; // 計算によって求められる不透明度
                    if (newOpacity < phi) {
                        a1 = newOpacity * (phi - 1) / phi + 1.0; // (0,1),(phi,phi)を通る直線式
                    }
                    else {
                        a1 = (1 - newOpacity) * phi / (1.0 - phi); // (1,0),(phi,phi)を通る直線式
                    }
                    // 背景の見える割合を制限する場合
                    var backOpacity = (1.0 - a1) * (1.0 - newOpacity);
                    if (backOpacity > backOpacityThreshold) {
                        a1 = 1.0 - backOpacityThreshold / (1.0 - newOpacity);
                    }
                    if (opacity > a1) {
                        opacity = a1; // 計算の不透明度よりも大きければ（濃ければ）不透明度を上げる
                    }
                    model.setPartOpacityByIndex(partsIndex, opacity);
                }
            }
        };
        return CubismPose;
    }());
    Live2DCubismFramework.CubismPose = CubismPose;
    /**
     * パーツにまつわるデータを管理
     */
    var PartData = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function PartData(v) {
            this.parameterIndex = 0;
            this.partIndex = 0;
            this.link = new csmVector();
            if (v != undefined) {
                this.partId = v.partId;
                for (var ite = v.link.begin(); ite.notEqual(v.link.end()); ite.preIncrement()) {
                    this.link.pushBack(ite.ptr().clone());
                }
            }
        }
        /**
         * =演算子のオーバーロード
         */
        PartData.prototype.assignment = function (v) {
            this.partId = v.partId;
            for (var ite = v.link.begin(); ite.notEqual(v.link.end()); ite.preIncrement()) {
                this.link.pushBack(ite.ptr().clone());
            }
            return this;
        };
        /**
         * 初期化
         * @param model 初期化に使用するモデル
         */
        PartData.prototype.initialize = function (model) {
            this.parameterIndex = model.getParameterIndex(this.partId);
            this.partIndex = model.getPartIndex(this.partId);
            model.setParameterValueByIndex(this.parameterIndex, 1);
        };
        /**
         * オブジェクトのコピーを生成する
         */
        PartData.prototype.clone = function () {
            var clonePartData = new PartData();
            clonePartData.partId = this.partId;
            clonePartData.parameterIndex = this.parameterIndex;
            clonePartData.partIndex = this.partIndex;
            clonePartData.link = new csmVector();
            for (var ite = this.link.begin(); ite.notEqual(this.link.end()); ite.increment()) {
                clonePartData.link.pushBack(ite.ptr().clone());
            }
            return clonePartData;
        };
        return PartData;
    }());
    Live2DCubismFramework.PartData = PartData;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/icubismmodelsetting.ts":
/*!**********************************************!*\
  !*** ./src/Framework/icubismmodelsetting.ts ***!
  \**********************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * モデル設定情報を取り扱う関数を宣言した純粋仮想クラス。
     *
     * このクラスを継承することで、モデル設定情報を取り扱うクラスになる。
     */
    var ICubismModelSetting = /** @class */ (function () {
        function ICubismModelSetting() {
        }
        return ICubismModelSetting;
    }());
    Live2DCubismFramework.ICubismModelSetting = ICubismModelSetting;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/id/cubismid.ts":
/*!**************************************!*\
  !*** ./src/Framework/id/cubismid.ts ***!
  \**************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _type_csmstring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/csmstring */ "./src/Framework/type/csmstring.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

var csmString = _type_csmstring__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].csmString;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * パラメータ名・パーツ名・Drawable名を保持
     *
     * パラメータ名・パーツ名・Drawable名を保持するクラス。
     */
    var CubismId = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismId(id) {
            if (typeof (id) === 'string') {
                this._id = new csmString(id);
                return;
            }
            this._id = id;
        }
        /**
         * ID名を取得する
         */
        CubismId.prototype.getString = function () {
            return this._id;
        };
        /**
         * idを比較
         * @param c 比較するid
         * @return 同じならばtrue,異なっていればfalseを返す
         */
        CubismId.prototype.isEqual = function (c) {
            if (typeof (c) === 'string') {
                return this._id.isEqual(c);
            }
            else if (c instanceof csmString) {
                return this._id.isEqual(c.s);
            }
            else if (c instanceof CubismId) {
                return this._id.isEqual(c._id.s);
            }
            return false;
        };
        /**
         * idを比較
         * @param c 比較するid
         * @return 同じならばtrue,異なっていればfalseを返す
         */
        CubismId.prototype.isNotEqual = function (c) {
            if (typeof (c) == 'string') {
                return !this._id.isEqual(c);
            }
            else if (c instanceof csmString) {
                return !this._id.isEqual(c.s);
            }
            else if (c instanceof CubismId) {
                return !this._id.isEqual(c._id.s);
            }
            return false;
        };
        return CubismId;
    }());
    Live2DCubismFramework.CubismId = CubismId;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/id/cubismidmanager.ts":
/*!*********************************************!*\
  !*** ./src/Framework/id/cubismidmanager.ts ***!
  \*********************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/csmvector */ "./src/Framework/type/csmvector.ts");
/* harmony import */ var _cubismid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubismid */ "./src/Framework/id/cubismid.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */


var CubismId = _cubismid__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismId;
var csmVector = _type_csmvector__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].csmVector;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * ID名の管理
     *
     * ID名を管理する。
     */
    var CubismIdManager = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismIdManager() {
            this._ids = new csmVector();
        }
        /**
         * デストラクタ相当の処理
         */
        CubismIdManager.prototype.release = function () {
            for (var i = 0; i < this._ids.getSize(); ++i) {
                this._ids.set(i, void 0);
            }
            this._ids = null;
        };
        /**
         * ID名をリストから登録
         *
         * @param ids ID名リスト
         * @param count IDの個数
         */
        CubismIdManager.prototype.registerIds = function (ids) {
            for (var i = 0; i < ids.length; i++) {
                this.registerId(ids[i]);
            }
        };
        /**
         * ID名を登録
         *
         * @param id ID名
         */
        CubismIdManager.prototype.registerId = function (id) {
            var result = null;
            if ('string' == typeof (id)) {
                if ((result = this.findId(id)) != null) {
                    return result;
                }
                result = new CubismId(id);
                this._ids.pushBack(result);
            }
            else {
                return this.registerId(id.s);
            }
            return result;
        };
        /**
         * ID名からIDを取得する
         *
         * @param id ID名
         */
        CubismIdManager.prototype.getId = function (id) {
            return this.registerId(id);
        };
        /**
         * ID名からIDの確認
         *
         * @return true 存在する
         * @return false 存在しない
         */
        CubismIdManager.prototype.isExist = function (id) {
            if ('string' == typeof (id)) {
                return (this.findId(id) != null);
            }
            return this.isExist(id.s);
        };
        /**
         * ID名からIDを検索する。
         *
         * @param id ID名
         * @return 登録されているID。なければNULL。
         */
        CubismIdManager.prototype.findId = function (id) {
            for (var i = 0; i < this._ids.getSize(); ++i) {
                if (this._ids.at(i).getString().isEqual(id)) {
                    return this._ids.at(i);
                }
            }
            return null;
        };
        return CubismIdManager;
    }());
    Live2DCubismFramework.CubismIdManager = CubismIdManager;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/live2dcubismframework.ts":
/*!************************************************!*\
  !*** ./src/Framework/live2dcubismframework.ts ***!
  \************************************************/
/*! exports provided: strtod, Live2DCubismFramework, Option, LogLevel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strtod", function() { return strtod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Option", function() { return Option; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return LogLevel; });
/* harmony import */ var _utils_cubismjson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/cubismjson */ "./src/Framework/utils/cubismjson.ts");
/* harmony import */ var _id_cubismidmanager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./id/cubismidmanager */ "./src/Framework/id/cubismidmanager.ts");
/* harmony import */ var _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rendering/cubismrenderer */ "./src/Framework/rendering/cubismrenderer.ts");
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/cubismdebug */ "./src/Framework/utils/cubismdebug.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/// <reference path="../Core/live2dcubismcore.d.ts" />
var Live2DCubismCore = __webpack_require__(/*! ../Core/live2dcubismcore.min.js */ "./src/Core/live2dcubismcore.min.js");




var Value = _utils_cubismjson__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].Value;
var CubismIdManager = _id_cubismidmanager__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismIdManager;
var CubismRenderer = _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].CubismRenderer;
function strtod(s, endPtr) {
    var index = 0;
    for (var i = 1;; i++) {
        var testC = s.slice(i - 1, i);
        // 指数・マイナスの可能性があるのでスキップする
        if (testC == 'e' || testC == '-' || testC == 'E') {
            continue;
        }
        // 文字列の範囲を広げていく
        var test = s.substring(0, i);
        var number = Number(test);
        if (isNaN(number)) {
            // 数値として認識できなくなったので終了
            break;
        }
        // 最後に数値としてできたindexを格納しておく
        index = i;
    }
    var d = parseFloat(s); // パースした数値
    if (isNaN(d)) {
        // 数値として認識できなくなったので終了
        d = NaN;
    }
    endPtr[0] = s.slice(index); // 後続の文字列
    return d;
}
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    // ファイルスコープの変数を初期化
    var s_isStarted = false;
    var s_isInitialized = false;
    var s_option = null;
    var s_cubismIdManager = null;
    /**
     * Framework内で使う定数の宣言
     */
    var Constant;
    (function (Constant) {
        Constant.vertexOffset = 0; // メッシュ頂点のオフセット値
        Constant.vertexStep = 2; // メッシュ頂点のステップ値
    })(Constant = Live2DCubismFramework.Constant || (Live2DCubismFramework.Constant = {}));
    function csmDelete(address) {
        if (!address) {
            return;
        }
        address = void 0;
    }
    Live2DCubismFramework.csmDelete = csmDelete;
    /**
     * Live2D Cubism SDK Original Workflow SDKのエントリポイント
     * 利用開始時はCubismFramework.initialize()を呼び、CubismFramework.dispose()で終了する。
     */
    var CubismFramework = /** @class */ (function () {
        /**
         * 静的クラスとして使用する
         * インスタンス化させない
         */
        function CubismFramework() {
        }
        /**
         * Cubism FrameworkのAPIを使用可能にする。
         *  APIを実行する前に必ずこの関数を実行すること。
         *  一度準備が完了して以降は、再び実行しても内部処理がスキップされます。
         *
         * @param    option      Optionクラスのインスタンス
         *
         * @return   準備処理が完了したらtrueが返ります。
         */
        CubismFramework.startUp = function (option) {
            if (option === void 0) { option = null; }
            if (s_isStarted) {
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__["CubismLogInfo"])("CubismFramework.startUp() is already done.");
                return s_isStarted;
            }
            s_option = option;
            if (s_option != null) {
                Live2DCubismCore.Logging.csmSetLogFunction(s_option.logFunction);
            }
            s_isStarted = true;
            // Live2D Cubism Coreバージョン情報を表示
            if (s_isStarted) {
                var version = Live2DCubismCore.Version.csmGetVersion();
                var major = ((version & 0xFF000000) >> 24);
                var minor = ((version & 0x00FF0000) >> 16);
                var patch = ((version & 0x0000FFFF));
                var versionNumber = version;
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__["CubismLogInfo"])("Live2D Cubism Core version: {0}.{1}.{2} ({3})", ('00' + major).slice(-2), ('00' + minor).slice(-2), ('0000' + patch).slice(-4), versionNumber);
            }
            Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__["CubismLogInfo"])("CubismFramework.startUp() is complete.");
            return s_isStarted;
        };
        /**
         * StartUp()で初期化したCubismFrameworkの各パラメータをクリアします。
         * Dispose()したCubismFrameworkを再利用する際に利用してください。
         */
        CubismFramework.cleanUp = function () {
            s_isStarted = false;
            s_isInitialized = false;
            s_option = null;
            s_cubismIdManager = null;
        };
        /**
         * Cubism Framework内のリソースを初期化してモデルを表示可能な状態にします。<br>
         *     再度Initialize()するには先にDispose()を実行する必要があります。
         */
        CubismFramework.initialize = function () {
            Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__["CSM_ASSERT"])(s_isStarted);
            if (!s_isStarted) {
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__["CubismLogWarning"])("CubismFramework is not started.");
                return;
            }
            // --- s_isInitializedによる連続初期化ガード ---
            // 連続してリソース確保が行われないようにする。
            // 再度Initialize()するには先にDispose()を実行する必要がある。
            if (s_isInitialized) {
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__["CubismLogWarning"])("CubismFramework.initialize() skipped, already initialized.");
                return;
            }
            //---- static 初期化 ----
            Value.staticInitializeNotForClientCall();
            s_cubismIdManager = new CubismIdManager();
            s_isInitialized = true;
            Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__["CubismLogInfo"])("CubismFramework.initialize() is complete.");
        };
        /**
         * Cubism Framework内の全てのリソースを解放します。
         *      ただし、外部で確保されたリソースについては解放しません。
         *      外部で適切に破棄する必要があります。
         */
        CubismFramework.dispose = function () {
            Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__["CSM_ASSERT"])(s_isStarted);
            if (!s_isStarted) {
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__["CubismLogWarning"])("CubismFramework is not started.");
                return;
            }
            // --- s_isInitializedによる未初期化解放ガード ---
            // dispose()するには先にinitialize()を実行する必要がある。
            if (!s_isInitialized) // false...リソース未確保の場合
             {
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__["CubismLogWarning"])("CubismFramework.dispose() skipped, not initialized.");
                return;
            }
            Value.staticReleaseNotForClientCall();
            s_cubismIdManager.release();
            s_cubismIdManager = null;
            // レンダラの静的リソース（シェーダプログラム他）を解放する
            CubismRenderer.staticRelease();
            s_isInitialized = false;
            Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_3__["CubismLogInfo"])("CubismFramework.dispose() is complete.");
        };
        /**
         * Cubism FrameworkのAPIを使用する準備が完了したかどうか
         * @return APIを使用する準備が完了していればtrueが返ります。
         */
        CubismFramework.isStarted = function () {
            return s_isStarted;
        };
        /**
         * Cubism Frameworkのリソース初期化がすでに行われているかどうか
         * @return リソース確保が完了していればtrueが返ります
         */
        CubismFramework.isInitialized = function () {
            return s_isInitialized;
        };
        /**
         * Core APIにバインドしたログ関数を実行する
         *
         * @praram message ログメッセージ
         */
        CubismFramework.coreLogFunction = function (message) {
            // Return if logging not possible.
            if (!Live2DCubismCore.Logging.csmGetLogFunction()) {
                return;
            }
            Live2DCubismCore.Logging.csmGetLogFunction()(message);
        };
        /**
         * 現在のログ出力レベル設定の値を返す。
         *
         * @return  現在のログ出力レベル設定の値
         */
        CubismFramework.getLoggingLevel = function () {
            if (s_option != null) {
                return s_option.loggingLevel;
            }
            return LogLevel.LogLevel_Off;
        };
        /**
         * IDマネージャのインスタンスを取得する
         * @return CubismManagerクラスのインスタンス
         */
        CubismFramework.getIdManager = function () {
            return s_cubismIdManager;
        };
        return CubismFramework;
    }());
    Live2DCubismFramework.CubismFramework = CubismFramework;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
var Option = /** @class */ (function () {
    function Option() {
    }
    return Option;
}());

/**
 * ログ出力のレベル
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["LogLevel_Verbose"] = 0] = "LogLevel_Verbose";
    LogLevel[LogLevel["LogLevel_Debug"] = 1] = "LogLevel_Debug";
    LogLevel[LogLevel["LogLevel_Info"] = 2] = "LogLevel_Info";
    LogLevel[LogLevel["LogLevel_Warning"] = 3] = "LogLevel_Warning";
    LogLevel[LogLevel["LogLevel_Error"] = 4] = "LogLevel_Error";
    LogLevel[LogLevel["LogLevel_Off"] = 5] = "LogLevel_Off"; // ログ出力無効
})(LogLevel || (LogLevel = {}));


/***/ }),

/***/ "./src/Framework/math/cubismmath.ts":
/*!******************************************!*\
  !*** ./src/Framework/math/cubismmath.ts ***!
  \******************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _cubismvector2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismvector2 */ "./src/Framework/math/cubismvector2.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

var CubismVector2 = _cubismvector2__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismVector2;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 数値計算などに使用するユーティリティクラス
     */
    var CubismMath = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismMath() {
        }
        /**
         * 第一引数の値を最小値と最大値の範囲に収めた値を返す
         *
         * @param value 収められる値
         * @param min   範囲の最小値
         * @param max   範囲の最大値
         * @return 最小値と最大値の範囲に収めた値
         */
        CubismMath.range = function (value, min, max) {
            if (value < min) {
                value = min;
            }
            else if (value > max) {
                value = max;
            }
            return value;
        };
        /**
         * サイン関数の値を求める
         *
         * @param x 角度値（ラジアン）
         * @return サイン関数sin(x)の値
         */
        CubismMath.sin = function (x) {
            return Math.sin(x);
        };
        /**
         * コサイン関数の値を求める
         *
         * @param x 角度値(ラジアン)
         * @return コサイン関数cos(x)の値
         */
        CubismMath.cos = function (x) {
            return Math.cos(x);
        };
        /**
         * 値の絶対値を求める
         *
         * @param x 絶対値を求める値
         * @return 値の絶対値
         */
        CubismMath.abs = function (x) {
            return Math.abs(x);
        };
        /**
         * 平方根(ルート)を求める
         * @param x -> 平方根を求める値
         * @return 値の平方根
         */
        CubismMath.sqrt = function (x) {
            return Math.sqrt(x);
        };
        /**
         * イージング処理されたサインを求める
         * フェードイン・アウト時のイージングに利用できる
         *
         * @param value イージングを行う値
         * @return イージング処理されたサイン値
         */
        CubismMath.getEasingSine = function (value) {
            if (value < 0.0) {
                return 0.0;
            }
            else if (value > 1.0) {
                return 1.0;
            }
            return 0.5 - 0.5 * this.cos(value * Math.PI);
        };
        /**
         * 大きい方の値を返す
         *
         * @param left 左辺の値
         * @param right 右辺の値
         * @return 大きい方の値
         */
        CubismMath.max = function (left, right) {
            return (left > right)
                ? left
                : right;
        };
        /**
         * 小さい方の値を返す
         *
         * @param left  左辺の値
         * @param right 右辺の値
         * @return 小さい方の値
         */
        CubismMath.min = function (left, right) {
            return (left > right)
                ? right
                : left;
        };
        /**
         * 角度値をラジアン値に変換する
         *
         * @param degrees   角度値
         * @return 角度値から変換したラジアン値
         */
        CubismMath.degreesToRadian = function (degrees) {
            return (degrees / 180.0) * Math.PI;
        };
        /**
         * ラジアン値を角度値に変換する
         *
         * @param radian    ラジアン値
         * @return ラジアン値から変換した角度値
         */
        CubismMath.radianToDegrees = function (radian) {
            return (radian * 180.0) / Math.PI;
        };
        /**
         * ２つのベクトルからラジアン値を求める
         *
         * @param from  始点ベクトル
         * @param to    終点ベクトル
         * @return ラジアン値から求めた方向ベクトル
         */
        CubismMath.directionToRadian = function (from, to) {
            var q1 = Math.atan2(to.y, to.x);
            var q2 = Math.atan2(from.y, from.x);
            var ret = q1 - q2;
            while (ret < -Math.PI) {
                ret += Math.PI * 2.0;
            }
            while (ret > Math.PI) {
                ret -= Math.PI * 2.0;
            }
            return ret;
        };
        /**
         * ２つのベクトルから角度値を求める
         *
         * @param from  始点ベクトル
         * @param to    終点ベクトル
         * @return 角度値から求めた方向ベクトル
         */
        CubismMath.directionToDegrees = function (from, to) {
            var radian = this.directionToRadian(from, to);
            var degree = this.radianToDegrees(radian);
            if ((to.x - from.x) > 0.0) {
                degree = -degree;
            }
            return degree;
        };
        /**
         * ラジアン値を方向ベクトルに変換する。
         *
         * @param totalAngle    ラジアン値
         * @return ラジアン値から変換した方向ベクトル
         */
        CubismMath.radianToDirection = function (totalAngle) {
            var ret = new CubismVector2();
            ret.x = this.sin(totalAngle);
            ret.y = this.cos(totalAngle);
            return ret;
        };
        return CubismMath;
    }());
    Live2DCubismFramework.CubismMath = CubismMath;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/math/cubismmatrix44.ts":
/*!**********************************************!*\
  !*** ./src/Framework/math/cubismmatrix44.ts ***!
  \**********************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 4x4の行列
     *
     * 4x4行列の便利クラス。
     */
    var CubismMatrix44 = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismMatrix44() {
            this._tr = new Float32Array(16); // 4 * 4のサイズ
            this.loadIdentity();
        }
        /**
         * 受け取った２つの行列の乗算を行う。
         *
         * @param a 行列a
         * @param b 行列b
         * @return 乗算結果の行列
         */
        CubismMatrix44.multiply = function (a, b, dst) {
            var c = new Float32Array([
                0.0, 0.0, 0.0, 0.0,
                0.0, 0.0, 0.0, 0.0,
                0.0, 0.0, 0.0, 0.0,
                0.0, 0.0, 0.0, 0.0
            ]);
            var n = 4;
            for (var i = 0; i < n; ++i) {
                for (var j = 0; j < n; ++j) {
                    for (var k = 0; k < n; ++k) {
                        c[j + i * 4] += a[k + i * 4] * b[j + k * 4];
                    }
                }
            }
            for (var i = 0; i < 16; ++i) {
                dst[i] = c[i];
            }
        };
        /**
         * 単位行列に初期化する
         */
        CubismMatrix44.prototype.loadIdentity = function () {
            var c = new Float32Array([
                1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            this.setMatrix(c);
        };
        /**
         * 行列を設定
         *
         * @param tr 16個の浮動小数点数で表される4x4の行列
         */
        CubismMatrix44.prototype.setMatrix = function (tr) {
            for (var i = 0; i < 16; ++i) {
                this._tr[i] = tr[i];
            }
        };
        /**
         * 行列を浮動小数点数の配列で取得
         *
         * @return 16個の浮動小数点数で表される4x4の行列
         */
        CubismMatrix44.prototype.getArray = function () {
            return this._tr;
        };
        /**
         * X軸の拡大率を取得
         * @return X軸の拡大率
         */
        CubismMatrix44.prototype.getScaleX = function () {
            return this._tr[0];
        };
        /**
         * Y軸の拡大率を取得する
         *
         * @return Y軸の拡大率
         */
        CubismMatrix44.prototype.getScaleY = function () {
            return this._tr[5];
        };
        /**
         * X軸の移動量を取得
         * @return X軸の移動量
         */
        CubismMatrix44.prototype.getTranslateX = function () {
            return this._tr[12];
        };
        /**
         * Y軸の移動量を取得
         * @return Y軸の移動量
         */
        CubismMatrix44.prototype.getTranslateY = function () {
            return this._tr[13];
        };
        /**
         * X軸の値を現在の行列で計算
         *
         * @param src X軸の値
         * @return 現在の行列で計算されたX軸の値
         */
        CubismMatrix44.prototype.transformX = function (src) {
            return this._tr[0] * src + this._tr[12];
        };
        /**
         * Y軸の値を現在の行列で計算
         *
         * @param src Y軸の値
         * @return　現在の行列で計算されたY軸の値
         */
        CubismMatrix44.prototype.transformY = function (src) {
            return this._tr[5] * src + this._tr[13];
        };
        /**
         * X軸の値を現在の行列で逆計算
         */
        CubismMatrix44.prototype.invertTransformX = function (src) {
            return (src - this._tr[12]) / this._tr[0];
        };
        /**
         * Y軸の値を現在の行列で逆計算
         */
        CubismMatrix44.prototype.invertTransformY = function (src) {
            return (src - this._tr[13]) / this._tr[5];
        };
        /**
         * 現在の行列の位置を起点にして移動
         *
         * 現在の行列の位置を起点にして相対的に移動する。
         *
         * @param x X軸の移動量
         * @param y Y軸の移動量
         */
        CubismMatrix44.prototype.translateRelative = function (x, y) {
            var tr1 = new Float32Array([
                1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                x, y, 0.0, 1.0
            ]);
            CubismMatrix44.multiply(tr1, this._tr, this._tr);
        };
        /**
         * 現在の行列の位置を移動
         *
         * 現在の行列の位置を指定した位置へ移動する
         *
         * @param x X軸の移動量
         * @param y y軸の移動量
         */
        CubismMatrix44.prototype.translate = function (x, y) {
            this._tr[12] = x;
            this._tr[13] = y;
        };
        /**
         * 現在の行列のX軸の位置を指定した位置へ移動する
         *
         * @param x X軸の移動量
         */
        CubismMatrix44.prototype.translateX = function (x) {
            this._tr[12] = x;
        };
        /**
         * 現在の行列のY軸の位置を指定した位置へ移動する
         *
         * @param y Y軸の移動量
         */
        CubismMatrix44.prototype.translateY = function (y) {
            this._tr[13] = y;
        };
        /**
         * 現在の行列の拡大率を相対的に設定する
         *
         * @param x X軸の拡大率
         * @param y Y軸の拡大率
         */
        CubismMatrix44.prototype.scaleRelative = function (x, y) {
            var tr1 = new Float32Array([
                x, 0.0, 0.0, 0.0,
                0.0, y, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            CubismMatrix44.multiply(tr1, this._tr, this._tr);
        };
        /**
         * 現在の行列の拡大率を指定した倍率に設定する
         *
         * @param x X軸の拡大率
         * @param y Y軸の拡大率
         */
        CubismMatrix44.prototype.scale = function (x, y) {
            this._tr[0] = x;
            this._tr[5] = y;
        };
        /**
         * 現在の行列に行列を乗算
         *
         * @param m 行列
         */
        CubismMatrix44.prototype.multiplyByMatrix = function (m) {
            CubismMatrix44.multiply(m.getArray(), this._tr, this._tr);
        };
        /**
         * オブジェクトのコピーを生成する
         */
        CubismMatrix44.prototype.clone = function () {
            var cloneMatrix = new CubismMatrix44();
            for (var i = 0; i < this._tr.length; i++) {
                cloneMatrix._tr[i] = this._tr[i];
            }
            return cloneMatrix;
        };
        return CubismMatrix44;
    }());
    Live2DCubismFramework.CubismMatrix44 = CubismMatrix44;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/math/cubismmodelmatrix.ts":
/*!*************************************************!*\
  !*** ./src/Framework/math/cubismmodelmatrix.ts ***!
  \*************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismmatrix44 */ "./src/Framework/math/cubismmatrix44.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var CubismMatrix44 = _cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismMatrix44;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * モデル座標設定用の4x4行列
     *
     * モデル座標設定用の4x4行列クラス
     */
    var CubismModelMatrix = /** @class */ (function (_super) {
        __extends(CubismModelMatrix, _super);
        /**
         * コンストラクタ
         *
         * @param w 横幅
         * @param h 縦幅
         */
        function CubismModelMatrix(w, h) {
            var _this = _super.call(this) || this;
            _this._width = (w !== undefined)
                ? w
                : 0.0;
            _this._height = (h !== undefined)
                ? h
                : 0.0;
            _this.setHeight(1.0);
            return _this;
        }
        /**
         * 横幅を設定
         *
         * @param w 横幅
         */
        CubismModelMatrix.prototype.setWidth = function (w) {
            var scaleX = w / this._width;
            var scaleY = scaleX;
            this.scale(scaleX, scaleY);
        };
        /**
         * 縦幅を設定
         * @param h 縦幅
         */
        CubismModelMatrix.prototype.setHeight = function (h) {
            var scaleX = h / this._height;
            var scaleY = scaleX;
            this.scale(scaleX, scaleY);
        };
        /**
         * 位置を設定
         *
         * @param x X軸の位置
         * @param y Y軸の位置
         */
        CubismModelMatrix.prototype.setPosition = function (x, y) {
            this.translate(x, y);
        };
        /**
         * 中心位置を設定
         *
         * @param x X軸の中心位置
         * @param y Y軸の中心位置
         *
         * @note widthかheightを設定したあとでないと、拡大率が正しく取得できないためずれる。
         */
        CubismModelMatrix.prototype.setCenterPosition = function (x, y) {
            this.centerX(x);
            this.centerY(y);
        };
        /**
         * 上辺の位置を設定する
         *
         * @param y 上辺のY軸位置
         */
        CubismModelMatrix.prototype.top = function (y) {
            this.setY(y);
        };
        /**
         * 下辺の位置を設定する
         *
         * @param y 下辺のY軸位置
         */
        CubismModelMatrix.prototype.bottom = function (y) {
            var h = this._height * this.getScaleY();
            this.translateY(y - h);
        };
        /**
         * 左辺の位置を設定
         *
         * @param x 左辺のX軸位置
         */
        CubismModelMatrix.prototype.left = function (x) {
            this.setX(x);
        };
        /**
         * 右辺の位置を設定
         *
         * @param x 右辺のX軸位置
         */
        CubismModelMatrix.prototype.right = function (x) {
            var w = this._width * this.getScaleX();
            this.translateX(x - w);
        };
        /**
         * X軸の中心位置を設定
         *
         * @param x X軸の中心位置
         */
        CubismModelMatrix.prototype.centerX = function (x) {
            var w = this._width * this.getScaleX();
            this.translateX(x - (w / 2.0));
        };
        /**
         * X軸の位置を設定
         *
         * @param x X軸の位置
         */
        CubismModelMatrix.prototype.setX = function (x) {
            this.translateX(x);
        };
        /**
         * Y軸の中心位置を設定
         *
         * @param y Y軸の中心位置
         */
        CubismModelMatrix.prototype.centerY = function (y) {
            var h = this._height * this.getScaleY();
            this.translateY(y - (h / 2.0));
        };
        /**
         * Y軸の位置を設定する
         *
         * @param y Y軸の位置
         */
        CubismModelMatrix.prototype.setY = function (y) {
            this.translateY(y);
        };
        /**
         * レイアウト情報から位置を設定
         *
         * @param layout レイアウト情報
         */
        CubismModelMatrix.prototype.setupFromLayout = function (layout) {
            var keyWidth = "width";
            var keyHeight = "height";
            var keyX = "x";
            var keyY = "y";
            var keyCenterX = "center_x";
            var keyCenterY = "center_y";
            var keyTop = "top";
            var keyBottom = "bottom";
            var keyLeft = "left";
            var keyRight = "right";
            for (var ite = layout.begin(); ite.notEqual(layout.end()); ite.preIncrement()) {
                var key = ite.ptr().first;
                var value = ite.ptr().second;
                if (key == keyWidth) {
                    this.setWidth(value);
                }
                else if (key == keyHeight) {
                    this.setHeight(value);
                }
            }
            for (var ite = layout.begin(); ite.notEqual(layout.end()); ite.preIncrement()) {
                var key = ite.ptr().first;
                var value = ite.ptr().second;
                if (key == keyX) {
                    this.setX(value);
                }
                else if (key == keyY) {
                    this.setY(value);
                }
                else if (key == keyCenterX) {
                    this.centerX(value);
                }
                else if (key == keyCenterY) {
                    this.centerY(value);
                }
                else if (key == keyTop) {
                    this.top(value);
                }
                else if (key == keyBottom) {
                    this.bottom(value);
                }
                else if (key == keyLeft) {
                    this.left(value);
                }
                else if (key == keyRight) {
                    this.right(value);
                }
            }
        };
        return CubismModelMatrix;
    }(CubismMatrix44));
    Live2DCubismFramework.CubismModelMatrix = CubismModelMatrix;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/math/cubismtargetpoint.ts":
/*!*************************************************!*\
  !*** ./src/Framework/math/cubismtargetpoint.ts ***!
  \*************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _cubismmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismmath */ "./src/Framework/math/cubismmath.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

var CubismMath = _cubismmath__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismMath;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var FrameRate = 30;
    var Epsilon = 0.01;
    /**
     * 顔の向きの制御機能
     *
     * 顔の向きの制御機能を提供するクラス。
     */
    var CubismTargetPoint = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismTargetPoint() {
            this._faceTargetX = 0.0;
            this._faceTargetY = 0.0;
            this._faceX = 0.0;
            this._faceY = 0.0;
            this._faceVX = 0.0;
            this._faceVY = 0.0;
            this._lastTimeSeconds = 0.0;
            this._userTimeSeconds = 0.0;
        }
        /**
         * 更新処理
         */
        CubismTargetPoint.prototype.update = function (deltaTimeSeconds) {
            // デルタ時間を加算する
            this._userTimeSeconds += deltaTimeSeconds;
            // 首を中央から左右に振るときの平均的な速さは　秒速度。加速・減速を考慮して、その２倍を最高速度とする
            // 顔の振り具合を、中央（0.0）から、左右は（+-1.0）とする
            var faceParamMaxV = 40.0 / 10.0; // 7.5秒間に40分移動(5.3/sc)
            var maxV = faceParamMaxV * 1.0 / FrameRate; // 1frameあたりに変化できる速度の上限
            if (this._lastTimeSeconds == 0.0) {
                this._lastTimeSeconds = this._userTimeSeconds;
                return;
            }
            var deltaTimeWeight = (this._userTimeSeconds - this._lastTimeSeconds) * FrameRate;
            this._lastTimeSeconds = this._userTimeSeconds;
            // 最高速度になるまでの時間を
            var timeToMaxSpeed = 0.15;
            var frameToMaxSpeed = timeToMaxSpeed * FrameRate; // sec * frame/sec
            var maxA = deltaTimeWeight * maxV / frameToMaxSpeed; // 1frameあたりの加速度
            // 目指す向きは、（dx, dy）方向のベクトルとなる
            var dx = this._faceTargetX - this._faceX;
            var dy = this._faceTargetY - this._faceY;
            if (CubismMath.abs(dx) <= Epsilon && CubismMath.abs(dy) <= Epsilon) {
                return; // 変化なし
            }
            // 速度の最大よりも大きい場合は、速度を落とす
            var d = CubismMath.sqrt((dx * dx) + (dy * dy));
            // 進行方向の最大速度ベクトル
            var vx = maxV * dx / d;
            var vy = maxV * dy / d;
            // 現在の速度から、新規速度への変化（加速度）を求める
            var ax = vx - this._faceVX;
            var ay = vy - this._faceVY;
            var a = CubismMath.sqrt((ax * ax) + (ay * ay));
            // 加速のとき
            if (a < -maxA || a > maxA) {
                ax *= maxA / a;
                ay *= maxA / a;
            }
            // 加速度を元の速度に足して、新速度とする
            this._faceVX += ax;
            this._faceVY += ay;
            // 目的の方向に近づいたとき、滑らかに減速するための処理
            // 設定された加速度で止まる事の出来る距離と速度の関係から
            // 現在とりうる最高速度を計算し、それ以上の時は速度を落とす
            // ※本来、人間は筋力で力（加速度）を調整できるため、より自由度が高いが、簡単な処理で済ませている
            {
                // 加速度、速度、距離の関係式。
                //            2  6           2               3
                //      sqrt(a  t  + 16 a h t  - 8 a h) - a t
                // v = --------------------------------------
                //                    2
                //                 4 t  - 2
                // (t=1)
                // 	時刻tは、あらかじめ加速度、速度を1/60(フレームレート、単位なし)で
                // 	考えているので、t＝１として消してよい（※未検証）
                var maxV_1 = 0.5 * (CubismMath.sqrt((maxA * maxA) + 16.0 * maxA * d - 8.0 * maxA * d) - maxA);
                var curV = CubismMath.sqrt((this._faceVX * this._faceVX) + (this._faceVY * this._faceVY));
                if (curV > maxV_1) {
                    // 現在の速度 > 最高速度のとき、最高速度まで減速
                    this._faceVX *= maxV_1 / curV;
                    this._faceVY *= maxV_1 / curV;
                }
            }
            this._faceX += this._faceVX;
            this._faceY += this._faceVY;
        };
        /**
         * X軸の顔の向きの値を取得
         *
         * @return X軸の顔の向きの値（-1.0 ~ 1.0）
         */
        CubismTargetPoint.prototype.getX = function () {
            return this._faceX;
        };
        /**
         * Y軸の顔の向きの値を取得
         *
         * @return Y軸の顔の向きの値（-1.0 ~ 1.0）
         */
        CubismTargetPoint.prototype.getY = function () {
            return this._faceY;
        };
        /**
         * 顔の向きの目標値を設定
         *
         * @param x X軸の顔の向きの値（-1.0 ~ 1.0）
         * @param y Y軸の顔の向きの値（-1.0 ~ 1.0）
         */
        CubismTargetPoint.prototype.set = function (x, y) {
            this._faceTargetX = x;
            this._faceTargetY = y;
        };
        return CubismTargetPoint;
    }());
    Live2DCubismFramework.CubismTargetPoint = CubismTargetPoint;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/math/cubismvector2.ts":
/*!*********************************************!*\
  !*** ./src/Framework/math/cubismvector2.ts ***!
  \*********************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 2次元ベクトル型
     *
     * 2次元ベクトル型の機能を提供する。
     */
    var CubismVector2 = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismVector2(x, y) {
            this.x = x;
            this.y = y;
            this.x = (x == undefined)
                ? 0.0
                : x;
            this.y = (y == undefined)
                ? 0.0
                : y;
        }
        /**
         * ベクトルの加算
         *
         * @param vector2 加算するベクトル値
         * @return 加算結果 ベクトル値
         */
        CubismVector2.prototype.add = function (vector2) {
            var ret = new CubismVector2(0.0, 0.0);
            ret.x = this.x + vector2.x;
            ret.y = this.y + vector2.y;
            return ret;
        };
        /**
         * ベクトルの減算
         *
         * @param vector2 減算するベクトル値
         * @return 減算結果 ベクトル値
         */
        CubismVector2.prototype.substract = function (vector2) {
            var ret = new CubismVector2(0.0, 0.0);
            ret.x = this.x - vector2.x;
            ret.y = this.y - vector2.y;
            return ret;
        };
        /**
         * ベクトルの乗算
         *
         * @param vector2 乗算するベクトル値
         * @return 乗算結果　ベクトル値
         */
        CubismVector2.prototype.multiply = function (vector2) {
            var ret = new CubismVector2(0.0, 0.0);
            ret.x = this.x * vector2.x;
            ret.y = this.y * vector2.y;
            return ret;
        };
        /**
         * ベクトルの乗算(スカラー)
         *
         * @param scalar 乗算するスカラー値
         * @return 乗算結果　ベクトル値
         */
        CubismVector2.prototype.multiplyByScaler = function (scalar) {
            return this.multiply(new CubismVector2(scalar, scalar));
        };
        /**
         * ベクトルの除算
         *
         * @param vector2 除算するベクトル値
         * @return 除算結果　ベクトル値
         */
        CubismVector2.prototype.division = function (vector2) {
            var ret = new CubismVector2(0.0, 0.0);
            ret.x = this.x / vector2.x;
            ret.y = this.y / vector2.y;
            return ret;
        };
        /**
         * ベクトルの除算(スカラー)
         *
         * @param scalar 除算するスカラー値
         * @return 除算結果　ベクトル値
         */
        CubismVector2.prototype.divisionByScalar = function (scalar) {
            return this.division(new CubismVector2(scalar, scalar));
        };
        /**
         * ベクトルの長さを取得する
         *
         * @return ベクトルの長さ
         */
        CubismVector2.prototype.getLength = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        /**
         * ベクトルの距離の取得
         *
         * @param a 点
         * @return ベクトルの距離
         */
        CubismVector2.prototype.getDistanceWith = function (a) {
            return Math.sqrt(((this.x - a.x) * (this.x - a.x)) + ((this.y - a.y) * (this.y - a.y)));
        };
        /**
         * ドット積の計算
         *
         * @param a 値
         * @return 結果
         */
        CubismVector2.prototype.dot = function (a) {
            return (this.x * a.x) + (this.y * a.y);
        };
        /**
         * 正規化の適用
         */
        CubismVector2.prototype.normalize = function () {
            var length = Math.pow((this.x * this.x) + (this.y * this.y), 0.5);
            this.x = this.x / length;
            this.y = this.y / length;
        };
        /**
         * 等しさの確認（等しいか？）
         *
         * 値が等しいか？
         *
         * @param rhs 確認する値
         * @return true 値は等しい
         * @return false 値は等しくない
         */
        CubismVector2.prototype.isEqual = function (rhs) {
            return (this.x == rhs.x) && (this.y == rhs.y);
        };
        /**
         * 等しさの確認（等しくないか？）
         *
         * 値が等しくないか？
         *
         * @param rhs 確認する値
         * @return true 値は等しくない
         * @return false 値は等しい
         */
        CubismVector2.prototype.isNotEqual = function (rhs) {
            return !(this.isEqual(rhs));
        };
        return CubismVector2;
    }());
    Live2DCubismFramework.CubismVector2 = CubismVector2;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/math/cubismviewmatrix.ts":
/*!************************************************!*\
  !*** ./src/Framework/math/cubismviewmatrix.ts ***!
  \************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismmatrix44 */ "./src/Framework/math/cubismmatrix44.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var CubismMatrix44 = _cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismMatrix44;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * カメラの位置変更に使うと便利な4x4行列
     *
     * カメラの位置変更に使うと便利な4x4行列のクラス。
     */
    var CubismViewMatrix = /** @class */ (function (_super) {
        __extends(CubismViewMatrix, _super);
        /**
         * コンストラクタ
         */
        function CubismViewMatrix() {
            var _this = _super.call(this) || this;
            _this._screenLeft = 0.0;
            _this._screenRight = 0.0;
            _this._screenTop = 0.0;
            _this._screenBottom = 0.0;
            _this._maxLeft = 0.0;
            _this._maxRight = 0.0;
            _this._maxTop = 0.0;
            _this._maxBottom = 0.0;
            _this._maxScale = 0.0;
            _this._minScale = 0.0;
            return _this;
        }
        /**
         * 移動を調整
         *
         * @param x X軸の移動量
         * @param y Y軸の移動量
         */
        CubismViewMatrix.prototype.adjustTranslate = function (x, y) {
            if (this._tr[0] * this._maxLeft + (this._tr[12] + x) > this._screenLeft) {
                x = this._screenLeft - this._tr[0] * this._maxLeft - this._tr[12];
            }
            if (this._tr[0] * this._maxRight + (this._tr[12] + x) < this._screenRight) {
                x = this._screenRight - this._tr[0] * this._maxRight - this._tr[12];
            }
            if (this._tr[5] * this._maxTop + (this._tr[13] + y) < this._screenTop) {
                y = this._screenTop - this._tr[5] * this._maxTop - this._tr[13];
            }
            if (this._tr[5] * this._maxBottom + (this._tr[13] + y) > this._screenBottom) {
                y = this._screenBottom - this._tr[5] * this._maxBottom - this._tr[13];
            }
            var tr1 = new Float32Array([
                1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                x, y, 0.0, 1.0
            ]);
            CubismMatrix44.multiply(tr1, this._tr, this._tr);
        };
        /**
         * 拡大率を調整
         *
         * @param cx 拡大を行うX軸の中心位置
         * @param cy 拡大を行うY軸の中心位置
         * @param scale　拡大率
         */
        CubismViewMatrix.prototype.adjustScale = function (cx, cy, scale) {
            var maxScale = this.getMaxScale();
            var minScale = this.getMinScale();
            var targetScale = scale * this._tr[0];
            if (targetScale < minScale) {
                if (this._tr[0] > 0.0) {
                    scale = minScale / this._tr[0];
                }
            }
            else if (targetScale > maxScale) {
                if (this._tr[0] > 0.0) {
                    scale = maxScale / this._tr[0];
                }
            }
            var tr1 = new Float32Array([
                1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                cx, cy, 0.0, 1.0
            ]);
            var tr2 = new Float32Array([
                scale, 0.0, 0.0, 0.0,
                0.0, scale, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            var tr3 = new Float32Array([
                1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                -cx, -cy, 0.0, 1.0,
            ]);
            CubismMatrix44.multiply(tr3, this._tr, this._tr);
            CubismMatrix44.multiply(tr2, this._tr, this._tr);
            CubismMatrix44.multiply(tr1, this._tr, this._tr);
        };
        /**
         * デバイスに対応する論理座養生の範囲の設定
         *
         * @param left      左辺のX軸の位置
         * @param right     右辺のX軸の位置
         * @param bottom    下辺のY軸の位置
         * @param top       上辺のY軸の位置
         */
        CubismViewMatrix.prototype.setScreenRect = function (left, right, bottom, top) {
            this._screenLeft = left;
            this._screenRight = right;
            this._screenBottom = bottom;
            this._screenTop = top;
        };
        /**
         * デバイスに対応する論理座標上の移動可能範囲の設定
         * @param left      左辺のX軸の位置
         * @param right     右辺のX軸の位置
         * @param bottom    下辺のY軸の位置
         * @param top       上辺のY軸の位置
         */
        CubismViewMatrix.prototype.setMaxScreenRect = function (left, right, bottom, top) {
            this._maxLeft = left;
            this._maxRight = right;
            this._maxTop = top;
            this._maxBottom = bottom;
        };
        /**
         * 最大拡大率の設定
         * @param maxScale 最大拡大率
         */
        CubismViewMatrix.prototype.setMaxScale = function (maxScale) {
            this._maxScale = maxScale;
        };
        /**
         * 最小拡大率の設定
         * @param minScale 最小拡大率
         */
        CubismViewMatrix.prototype.setMinScale = function (minScale) {
            this._minScale = minScale;
        };
        /**
         * 最大拡大率の取得
         * @return 最大拡大率
         */
        CubismViewMatrix.prototype.getMaxScale = function () {
            return this._maxScale;
        };
        /**
         * 最小拡大率の取得
         * @return 最小拡大率
         */
        CubismViewMatrix.prototype.getMinScale = function () {
            return this._minScale;
        };
        /**
         * 拡大率が最大になっているかを確認する
         *
         * @return true 拡大率は最大
         * @return false 拡大率は最大ではない
         */
        CubismViewMatrix.prototype.isMaxScale = function () {
            return this.getScaleX() >= this._maxScale;
        };
        /**
         * 拡大率が最小になっているかを確認する
         *
         * @return true 拡大率は最小
         * @return false 拡大率は最小ではない
         */
        CubismViewMatrix.prototype.isMinScale = function () {
            return this.getScaleX() <= this._minScale;
        };
        /**
         * デバイスに対応する論理座標の左辺のＸ軸位置を取得する
         * @return デバイスに対応する論理座標の左辺のX軸位置
         */
        CubismViewMatrix.prototype.getScreenLeft = function () {
            return this._screenLeft;
        };
        /**
         * デバイスに対応する論理座標の右辺のＸ軸位置を取得する
         * @return デバイスに対応する論理座標の右辺のX軸位置
         */
        CubismViewMatrix.prototype.getScreenRight = function () {
            return this._screenRight;
        };
        /**
         * デバイスに対応する論理座標の下辺のY軸位置を取得する
         * @return デバイスに対応する論理座標の下辺のY軸位置
         */
        CubismViewMatrix.prototype.getScreenBottom = function () {
            return this._screenBottom;
        };
        /**
         * デバイスに対応する論理座標の上辺のY軸位置を取得する
         * @return デバイスに対応する論理座標の上辺のY軸位置
         */
        CubismViewMatrix.prototype.getScreenTop = function () {
            return this._screenTop;
        };
        /**
         * 左辺のX軸位置の最大値の取得
         * @return 左辺のX軸位置の最大値
         */
        CubismViewMatrix.prototype.getMaxLeft = function () {
            return this._maxLeft;
        };
        /**
         * 右辺のX軸位置の最大値の取得
         * @return 右辺のX軸位置の最大値
         */
        CubismViewMatrix.prototype.getMaxRight = function () {
            return this._maxRight;
        };
        /**
         * 下辺のY軸位置の最大値の取得
         * @return 下辺のY軸位置の最大値
         */
        CubismViewMatrix.prototype.getMaxBottom = function () {
            return this._maxBottom;
        };
        /**
         * 上辺のY軸位置の最大値の取得
         * @return 上辺のY軸位置の最大値
         */
        CubismViewMatrix.prototype.getMaxTop = function () {
            return this._maxTop;
        };
        return CubismViewMatrix;
    }(CubismMatrix44));
    Live2DCubismFramework.CubismViewMatrix = CubismViewMatrix;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/model/cubismmoc.ts":
/*!******************************************!*\
  !*** ./src/Framework/model/cubismmoc.ts ***!
  \******************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _cubismmodel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismmodel */ "./src/Framework/model/cubismmodel.ts");
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/cubismdebug */ "./src/Framework/utils/cubismdebug.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/// <reference path="../../Core/live2dcubismcore.d.ts" />
var Live2DCubismCore = __webpack_require__(/*! ../../Core/live2dcubismcore.min.js */ "./src/Core/live2dcubismcore.min.js");

var CubismModel = _cubismmodel__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismModel;

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * Mocデータの管理
     *
     * Mocデータの管理を行うクラス。
     */
    var CubismMoc = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismMoc(moc) {
            this._moc = moc;
            this._modelCount = 0;
        }
        /**
         * Mocデータの作成
         */
        CubismMoc.create = function (mocBytes) {
            var cubismMoc = null;
            var moc = Live2DCubismCore.Moc.fromArrayBuffer(mocBytes);
            if (moc) {
                cubismMoc = new CubismMoc(moc);
            }
            return cubismMoc;
        };
        /**
         * Mocデータを削除
         *
         * Mocデータを削除する
         */
        CubismMoc.delete = function (moc) {
            moc._moc._release();
            moc._moc = null;
            moc = null;
        };
        /**
         * モデルを作成する
         *
         * @return Mocデータから作成されたモデル
         */
        CubismMoc.prototype.createModel = function () {
            var cubismModel = null;
            var model = Live2DCubismCore.Model.fromMoc(this._moc);
            if (model) {
                cubismModel = new CubismModel(model);
                cubismModel.initialize();
                ++this._modelCount;
            }
            return cubismModel;
        };
        /**
         * モデルを削除する
         */
        CubismMoc.prototype.deleteModel = function (model) {
            if (model != null) {
                model.release();
                model = null;
                --this._modelCount;
            }
        };
        /**
         * デストラクタ相当の処理
         */
        CubismMoc.prototype.release = function () {
            Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_1__["CSM_ASSERT"])(this._modelCount == 0);
            this._moc._release();
            this._moc = null;
        };
        return CubismMoc;
    }());
    Live2DCubismFramework.CubismMoc = CubismMoc;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/model/cubismmodel.ts":
/*!********************************************!*\
  !*** ./src/Framework/model/cubismmodel.ts ***!
  \********************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rendering/cubismrenderer */ "./src/Framework/rendering/cubismrenderer.ts");
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/* harmony import */ var _type_csmmap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/csmmap */ "./src/Framework/type/csmmap.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../type/csmvector */ "./src/Framework/type/csmvector.ts");
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/cubismdebug */ "./src/Framework/utils/cubismdebug.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/// <reference path="../../Core/live2dcubismcore.d.ts" />
var Live2DCubismCore = __webpack_require__(/*! ../../Core/live2dcubismcore.min.js */ "./src/Core/live2dcubismcore.min.js");





var CubismFramework = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismFramework;
var CubismBlendMode = _rendering_cubismrenderer__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismBlendMode;
var csmVector = _type_csmvector__WEBPACK_IMPORTED_MODULE_3__["Live2DCubismFramework"].csmVector;
var csmMap = _type_csmmap__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].csmMap;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * モデル
     *
     * Mocデータから生成されるモデルのクラス。
     */
    var CubismModel = /** @class */ (function () {
        /**
         * コンストラクタ
         * @param model モデル
         */
        function CubismModel(model) {
            this._model = model;
            this._parameterValues = null;
            this._parameterMaximumValues = null;
            this._parameterMinimumValues = null;
            this._partOpacities = null;
            this._savedParameters = new csmVector();
            this._parameterIds = new csmVector();
            this._drawableIds = new csmVector();
            this._partIds = new csmVector();
            this._notExistPartId = new csmMap();
            this._notExistParameterId = new csmMap();
            this._notExistParameterValues = new csmMap();
            this._notExistPartOpacities = new csmMap();
        }
        /**
         * モデルのパラメータの更新
         */
        CubismModel.prototype.update = function () {
            // Update model
            this._model.update();
            this._model.drawables.resetDynamicFlags();
        };
        /**
         * キャンバスの幅を取得する
         */
        CubismModel.prototype.getCanvasWidth = function () {
            if (this._model == null) {
                return 0.0;
            }
            return this._model.canvasinfo.CanvasWidth / this._model.canvasinfo.PixelsPerUnit;
        };
        /**
         * キャンバスの高さを取得する
         */
        CubismModel.prototype.getCanvasHeight = function () {
            if (this._model == null) {
                return 0.0;
            }
            return this._model.canvasinfo.CanvasHeight / this._model.canvasinfo.PixelsPerUnit;
        };
        /**
         * パラメータを保存する
         */
        CubismModel.prototype.saveParameters = function () {
            var parameterCount = this._model.parameters.count;
            var savedParameterCount = this._savedParameters.getSize();
            for (var i = 0; i < parameterCount; ++i) {
                if (i < savedParameterCount) {
                    this._savedParameters.set(i, this._parameterValues[i]);
                }
                else {
                    this._savedParameters.pushBack(this._parameterValues[i]);
                }
            }
        };
        /**
         * モデルを取得
         */
        CubismModel.prototype.getModel = function () {
            return this._model;
        };
        /**
         * パーツのインデックスを取得
         * @param partId パーツのID
         * @return パーツのインデックス
         */
        CubismModel.prototype.getPartIndex = function (partId) {
            var partIndex;
            var partCount = this._model.parts.count;
            for (partIndex = 0; partIndex < partCount; ++partIndex) {
                if (partId == this._partIds.at(partIndex)) {
                    return partIndex;
                }
            }
            // モデルに存在していない場合、非存在パーツIDリスト内にあるかを検索し、そのインデックスを返す
            if (this._notExistPartId.isExist(partId)) {
                return this._notExistPartId.getValue(partId);
            }
            // 非存在パーツIDリストにない場合、新しく要素を追加する
            partIndex = partCount + this._notExistPartId.getSize();
            this._notExistPartId.setValue(partId, partIndex);
            this._notExistPartOpacities.appendKey(partIndex);
            return partIndex;
        };
        /**
         * パーツの個数の取得
         * @return パーツの個数
         */
        CubismModel.prototype.getPartCount = function () {
            var partCount = this._model.parts.count;
            return partCount;
        };
        /**
         * パーツの不透明度の設定(Index)
         * @param partIndex パーツのインデックス
         * @param opacity 不透明度
         */
        CubismModel.prototype.setPartOpacityByIndex = function (partIndex, opacity) {
            if (this._notExistPartOpacities.isExist(partIndex)) {
                this._notExistPartOpacities.setValue(partIndex, opacity);
                return;
            }
            // インデックスの範囲内検知
            Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_4__["CSM_ASSERT"])(0 <= partIndex && partIndex < this.getPartCount());
            this._partOpacities[partIndex] = opacity;
        };
        /**
         * パーツの不透明度の設定(Id)
         * @param partId パーツのID
         * @param opacity パーツの不透明度
         */
        CubismModel.prototype.setPartOpacityById = function (partId, opacity) {
            // 高速化のためにPartIndexを取得できる機構になっているが、外部からの設定の時は呼び出し頻度が低いため不要
            var index = this.getPartIndex(partId);
            if (index < 0) {
                return; // パーツがないのでスキップ
            }
            this.setPartOpacityByIndex(index, opacity);
        };
        /**
         * パーツの不透明度の取得(index)
         * @param partIndex パーツのインデックス
         * @return パーツの不透明度
         */
        CubismModel.prototype.getPartOpacityByIndex = function (partIndex) {
            if (this._notExistPartOpacities.isExist(partIndex)) {
                // モデルに存在しないパーツIDの場合、非存在パーツリストから不透明度を返す。
                return this._notExistPartOpacities.getValue(partIndex);
            }
            // インデックスの範囲内検知
            Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_4__["CSM_ASSERT"])(0 <= partIndex && partIndex < this.getPartCount());
            return this._partOpacities[partIndex];
        };
        /**
         * パーツの不透明度の取得(id)
         * @param partId パーツのＩｄ
         * @return パーツの不透明度
         */
        CubismModel.prototype.getPartOpacityById = function (partId) {
            // 高速化のためにPartIndexを取得できる機構になっているが、外部からの設定の時は呼び出し頻度が低いため不要
            var index = this.getPartIndex(partId);
            if (index < 0) {
                return 0; // パーツが無いのでスキップ
            }
            return this.getPartOpacityByIndex(index);
        };
        /**
         * パラメータのインデックスの取得
         * @param パラメータID
         * @return パラメータのインデックス
         */
        CubismModel.prototype.getParameterIndex = function (parameterId) {
            var parameterIndex;
            var idCount = this._model.parameters.count;
            for (parameterIndex = 0; parameterIndex < idCount; ++parameterIndex) {
                if (parameterId != this._parameterIds.at(parameterIndex)) {
                    continue;
                }
                return parameterIndex;
            }
            // モデルに存在していない場合、非存在パラメータIDリスト内を検索し、そのインデックスを返す
            if (this._notExistParameterId.isExist(parameterId)) {
                return this._notExistParameterId.getValue(parameterId);
            }
            // 非存在パラメータIDリストにない場合新しく要素を追加する
            parameterIndex = this._model.parameters.count + this._notExistParameterId.getSize();
            this._notExistParameterId.setValue(parameterId, parameterIndex);
            this._notExistParameterValues.appendKey(parameterIndex);
            return parameterIndex;
        };
        /**
         * パラメータの個数の取得
         * @return パラメータの個数
         */
        CubismModel.prototype.getParameterCount = function () {
            return this._model.parameters.count;
        };
        /**
         * パラメータの最大値の取得
         * @param parameterIndex パラメータのインデックス
         * @return パラメータの最大値
         */
        CubismModel.prototype.getParameterMaximumValue = function (parameterIndex) {
            return this._model.parameters.maximumValues[parameterIndex];
        };
        /**
         * パラメータの最小値の取得
         * @param parameterIndex パラメータのインデックス
         * @return パラメータの最小値
         */
        CubismModel.prototype.getParameterMinimumValue = function (parameterIndex) {
            return this._model.parameters.minimumValues[parameterIndex];
        };
        /**
         * パラメータのデフォルト値の取得
         * @param parameterIndex パラメータのインデックス
         * @return パラメータのデフォルト値
         */
        CubismModel.prototype.getParameterDefaultValue = function (parameterIndex) {
            return this._model.parameters.defaultValues[parameterIndex];
        };
        /**
         * パラメータの値の取得
         * @param parameterIndex    パラメータのインデックス
         * @return パラメータの値
         */
        CubismModel.prototype.getParameterValueByIndex = function (parameterIndex) {
            if (this._notExistParameterValues.isExist(parameterIndex)) {
                return this._notExistParameterValues.getValue(parameterIndex);
            }
            // インデックスの範囲内検知
            Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_4__["CSM_ASSERT"])(0 <= parameterIndex && parameterIndex < this.getParameterCount());
            return this._parameterValues[parameterIndex];
        };
        /**
         * パラメータの値の取得
         * @param parameterId    パラメータのID
         * @return パラメータの値
         */
        CubismModel.prototype.getParameterValueById = function (parameterId) {
            // 高速化のためにparameterIndexを取得できる機構になっているが、外部からの設定の時は呼び出し頻度が低いため不要
            var parameterIndex = this.getParameterIndex(parameterId);
            return this.getParameterValueByIndex(parameterIndex);
        };
        /**
         * パラメータの値の設定
         * @param parameterIndex パラメータのインデックス
         * @param value パラメータの値
         * @param weight 重み
         */
        CubismModel.prototype.setParameterValueByIndex = function (parameterIndex, value, weight) {
            if (weight === void 0) { weight = 1.0; }
            if (this._notExistParameterValues.isExist(parameterIndex)) {
                this._notExistParameterValues.setValue(parameterIndex, (weight == 1)
                    ? value
                    : (this._notExistParameterValues.getValue(parameterIndex) * (1 - weight)) + (value * weight));
                return;
            }
            // インデックスの範囲内検知
            Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_4__["CSM_ASSERT"])(0 <= parameterIndex && parameterIndex < this.getParameterCount());
            if (this._model.parameters.maximumValues[parameterIndex] < value) {
                value = this._model.parameters.maximumValues[parameterIndex];
            }
            if (this._model.parameters.minimumValues[parameterIndex] > value) {
                value = this._model.parameters.minimumValues[parameterIndex];
            }
            this._parameterValues[parameterIndex] = (weight == 1)
                ? value
                : this._parameterValues[parameterIndex] = (this._parameterValues[parameterIndex] * (1 - weight)) + (value * weight);
        };
        /**
         * パラメータの値の設定
         * @param parameterId パラメータのID
         * @param value パラメータの値
         * @param weight 重み
         */
        CubismModel.prototype.setParameterValueById = function (parameterId, value, weight) {
            if (weight === void 0) { weight = 1.0; }
            var index = this.getParameterIndex(parameterId);
            this.setParameterValueByIndex(index, value, weight);
        };
        /**
         * パラメータの値の加算(index)
         * @param parameterIndex パラメータインデックス
         * @param value 加算する値
         * @param weight 重み
         */
        CubismModel.prototype.addParameterValueByIndex = function (parameterIndex, value, weight) {
            if (weight === void 0) { weight = 1.0; }
            this.setParameterValueByIndex(parameterIndex, (this.getParameterValueByIndex(parameterIndex) + (value * weight)));
        };
        /**
         * パラメータの値の加算(id)
         * @param parameterId パラメータＩＤ
         * @param value 加算する値
         * @param weight 重み
         */
        CubismModel.prototype.addParameterValueById = function (parameterId, value, weight) {
            if (weight === void 0) { weight = 1.0; }
            var index = this.getParameterIndex(parameterId);
            this.addParameterValueByIndex(index, value, weight);
        };
        /**
         * パラメータの値の乗算
         * @param parameterId パラメータのID
         * @param value 乗算する値
         * @param weight 重み
         */
        CubismModel.prototype.multiplyParameterValueById = function (parameterId, value, weight) {
            if (weight === void 0) { weight = 1.0; }
            var index = this.getParameterIndex(parameterId);
            this.multiplyParameterValueByIndex(index, value, weight);
        };
        /**
         * パラメータの値の乗算
         * @param parameterIndex パラメータのインデックス
         * @param value　乗算する値
         * @param weight 重み
         */
        CubismModel.prototype.multiplyParameterValueByIndex = function (parameterIndex, value, weight) {
            if (weight === void 0) { weight = 1.0; }
            this.setParameterValueByIndex(parameterIndex, (this.getParameterValueByIndex(parameterIndex) * (1.0 + (value - 1.0) * weight)));
        };
        /**
         * Drawableのインデックスの取得
         * @param drawableId DrawableのID
         * @return Drawableのインデックス
         */
        CubismModel.prototype.getDrawableIndex = function (drawableId) {
            var drawableCount = this._model.drawables.count;
            for (var drawableIndex = 0; drawableIndex < drawableCount; ++drawableIndex) {
                if (this._drawableIds.at(drawableIndex) == drawableId) {
                    return drawableIndex;
                }
            }
            return -1;
        };
        /**
         * Drawableの個数の取得
         * @return drawableの個数
         */
        CubismModel.prototype.getDrawableCount = function () {
            var drawableCount = this._model.drawables.count;
            return drawableCount;
        };
        /**
         * DrawableのIDを取得する
         * @param drawableIndex Drawableのインデックス
         * @return drawableのID
         */
        CubismModel.prototype.getDrawableId = function (drawableIndex) {
            var parameterIds = this._model.drawables.ids;
            return CubismFramework.getIdManager().getId(parameterIds[drawableIndex]);
        };
        /**
         * Drawableの描画順リストの取得
         * @return Drawableの描画順リスト
         */
        CubismModel.prototype.getDrawableRenderOrders = function () {
            var renderOrders = this._model.drawables.renderOrders;
            return renderOrders;
        };
        /**
         * Drawableのテクスチャインデックスリストの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableのテクスチャインデックスリスト
         */
        CubismModel.prototype.getDrawableTextureIndices = function (drawableIndex) {
            var textureIndices = this._model.drawables.textureIndices;
            return textureIndices[drawableIndex];
        };
        /**
         * DrawableのVertexPositionsの変化情報の取得
         *
         * 直近のCubismModel.update関数でDrawableの頂点情報が変化したかを取得する。
         *
         * @param   drawableIndex   Drawableのインデックス
         * @retval  true    Drawableの頂点情報が直近のCubismModel.update関数で変化した
         * @retval  false   Drawableの頂点情報が直近のCubismModel.update関数で変化していない
         */
        CubismModel.prototype.getDrawableDynamicFlagVertexPositionsDidChange = function (drawableIndex) {
            var dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(dynamicFlags[drawableIndex]);
        };
        /**
         * Drawableの頂点インデックスの個数の取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの頂点インデックスの個数
         */
        CubismModel.prototype.getDrawableVertexIndexCount = function (drawableIndex) {
            var indexCounts = this._model.drawables.indexCounts;
            return indexCounts[drawableIndex];
        };
        /**
         * Drawableの頂点の個数の取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの頂点の個数
         */
        CubismModel.prototype.getDrawableVertexCount = function (drawableIndex) {
            var vertexCounts = this._model.drawables.vertexCounts;
            return vertexCounts[drawableIndex];
        };
        /**
         * Drawableの頂点リストの取得
         * @param drawableIndex drawableのインデックス
         * @return drawableの頂点リスト
         */
        CubismModel.prototype.getDrawableVertices = function (drawableIndex) {
            return this.getDrawableVertexPositions(drawableIndex);
        };
        /**
         * Drawableの頂点インデックスリストの取得
         * @param drarableIndex Drawableのインデックス
         * @return drawableの頂点インデックスリスト
         */
        CubismModel.prototype.getDrawableVertexIndices = function (drawableIndex) {
            var indicesArray = this._model.drawables.indices;
            return indicesArray[drawableIndex];
        };
        /**
         * Drawableの頂点リストの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの頂点リスト
         */
        CubismModel.prototype.getDrawableVertexPositions = function (drawableIndex) {
            var verticesArray = this._model.drawables.vertexPositions;
            return verticesArray[drawableIndex];
        };
        /**
         * Drawableの頂点のUVリストの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの頂点UVリスト
         */
        CubismModel.prototype.getDrawableVertexUvs = function (drawableIndex) {
            var uvsArray = this._model.drawables.vertexUvs;
            return uvsArray[drawableIndex];
        };
        /**
         * Drawableの不透明度の取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの不透明度
         */
        CubismModel.prototype.getDrawableOpacity = function (drawableIndex) {
            var opacities = this._model.drawables.opacities;
            return opacities[drawableIndex];
        };
        /**
         * Drawableのカリング情報の取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableのカリング情報
         */
        CubismModel.prototype.getDrawableCulling = function (drawableIndex) {
            var constantFlags = this._model.drawables.constantFlags;
            return !Live2DCubismCore.Utils.hasIsDoubleSidedBit(constantFlags[drawableIndex]);
        };
        /**
         * Drawableのブレンドモードを取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableのブレンドモード
         */
        CubismModel.prototype.getDrawableBlendMode = function (drawableIndex) {
            var constantFlags = this._model.drawables.constantFlags;
            return (Live2DCubismCore.Utils.hasBlendAdditiveBit(constantFlags[drawableIndex]))
                ? CubismBlendMode.CubismBlendMode_Additive
                : (Live2DCubismCore.Utils.hasBlendMultiplicativeBit(constantFlags[drawableIndex]))
                    ? CubismBlendMode.CubismBlendMode_Multiplicative
                    : CubismBlendMode.CubismBlendMode_Normal;
        };
        /**
         * Drawableのマスクの反転使用の取得
         *
         * Drawableのマスク使用時の反転設定を取得する。
         * マスクを使用しない場合は無視される。
         *
         * @param drawableIndex Drawableのインデックス
         * @return Drawableの反転設定
         */
        CubismModel.prototype.getDrawableInvertedMaskBit = function (drawableIndex) {
            var constantFlags = this._model.drawables.constantFlags;
            return (Live2DCubismCore.Utils.hasIsInvertedMaskBit(constantFlags[drawableIndex]));
        };
        /**
         * Drawableのクリッピングマスクリストの取得
         * @return Drawableのクリッピングマスクリスト
         */
        CubismModel.prototype.getDrawableMasks = function () {
            var masks = this._model.drawables.masks;
            return masks;
        };
        /**
         * Drawableのクリッピングマスクの個数リストの取得
         * @return Drawableのクリッピングマスクの個数リスト
         */
        CubismModel.prototype.getDrawableMaskCounts = function () {
            var maskCounts = this._model.drawables.maskCounts;
            return maskCounts;
        };
        /**
         * クリッピングマスクの使用状態
         *
         * @return true クリッピングマスクを使用している
         * @return false クリッピングマスクを使用していない
         */
        CubismModel.prototype.isUsingMasking = function () {
            for (var d = 0; d < this._model.drawables.count; ++d) {
                if (this._model.drawables.maskCounts[d] <= 0) {
                    continue;
                }
                return true;
            }
            return false;
        };
        /**
         * Drawableの表示情報を取得する
         *
         * @param drawableIndex Drawableのインデックス
         * @return true Drawableが表示
         * @return false Drawableが非表示
         */
        CubismModel.prototype.getDrawableDynamicFlagIsVisible = function (drawableIndex) {
            var dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasIsVisibleBit(dynamicFlags[drawableIndex]);
        };
        /**
         * DrawableのDrawOrderの変化情報の取得
         *
         * 直近のCubismModel.update関数でdrawableのdrawOrderが変化したかを取得する。
         * drawOrderはartMesh上で指定する0から1000の情報
         * @param drawableIndex drawableのインデックス
         * @return true drawableの不透明度が直近のCubismModel.update関数で変化した
         * @return false drawableの不透明度が直近のCubismModel.update関数で変化している
         */
        CubismModel.prototype.getDrawableDynamicFlagVisibilityDidChange = function (drawableIndex) {
            var dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasVisibilityDidChangeBit(dynamicFlags[drawableIndex]);
        };
        /**
         * Drawableの不透明度の変化情報の取得
         *
         * 直近のCubismModel.update関数でdrawableの不透明度が変化したかを取得する。
         *
         * @param drawableIndex drawableのインデックス
         * @return true Drawableの不透明度が直近のCubismModel.update関数で変化した
         * @return false Drawableの不透明度が直近のCubismModel.update関数で変化してない
         */
        CubismModel.prototype.getDrawableDynamicFlagOpacityDidChange = function (drawableIndex) {
            var dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasOpacityDidChangeBit(dynamicFlags[drawableIndex]);
        };
        /**
         * Drawableの描画順序の変化情報の取得
         *
         * 直近のCubismModel.update関数でDrawableの描画の順序が変化したかを取得する。
         *
         * @param drawableIndex Drawableのインデックス
         * @return true Drawableの描画の順序が直近のCubismModel.update関数で変化した
         * @return false Drawableの描画の順序が直近のCubismModel.update関数で変化してない
         */
        CubismModel.prototype.getDrawableDynamicFlagRenderOrderDidChange = function (drawableIndex) {
            var dynamicFlags = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(dynamicFlags[drawableIndex]);
        };
        /**
         * 保存されたパラメータの読み込み
         */
        CubismModel.prototype.loadParameters = function () {
            var parameterCount = this._model.parameters.count;
            var savedParameterCount = this._savedParameters.getSize();
            if (parameterCount > savedParameterCount) {
                parameterCount = savedParameterCount;
            }
            for (var i = 0; i < parameterCount; ++i) {
                this._parameterValues[i] = this._savedParameters.at(i);
            }
        };
        /**
         * 初期化する
         */
        CubismModel.prototype.initialize = function () {
            Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_4__["CSM_ASSERT"])(this._model);
            this._parameterValues = this._model.parameters.values;
            this._partOpacities = this._model.parts.opacities;
            this._parameterMaximumValues = this._model.parameters.maximumValues;
            this._parameterMinimumValues = this._model.parameters.minimumValues;
            {
                var parameterIds = this._model.parameters.ids;
                var parameterCount = this._model.parameters.count;
                this._parameterIds.prepareCapacity(parameterCount);
                for (var i = 0; i < parameterCount; ++i) {
                    this._parameterIds.pushBack(CubismFramework.getIdManager().getId(parameterIds[i]));
                }
            }
            {
                var partIds = this._model.parts.ids;
                var partCount = this._model.parts.count;
                this._partIds.prepareCapacity(partCount);
                for (var i = 0; i < partCount; ++i) {
                    this._partIds.pushBack(CubismFramework.getIdManager().getId(partIds[i]));
                }
            }
            {
                var drawableIds = this._model.drawables.ids;
                var drawableCount = this._model.drawables.count;
                this._drawableIds.prepareCapacity(drawableCount);
                for (var i = 0; i < drawableCount; ++i) {
                    this._drawableIds.pushBack(CubismFramework.getIdManager().getId(drawableIds[i]));
                }
            }
        };
        /**
         * デストラクタ相当の処理
         */
        CubismModel.prototype.release = function () {
            this._model.release();
            this._model = null;
        };
        return CubismModel;
    }());
    Live2DCubismFramework.CubismModel = CubismModel;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/model/cubismmodeluserdata.ts":
/*!****************************************************!*\
  !*** ./src/Framework/model/cubismmodeluserdata.ts ***!
  \****************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _cubismmodeluserdatajson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismmodeluserdatajson */ "./src/Framework/model/cubismmodeluserdatajson.ts");
/* harmony import */ var _type_csmstring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/csmstring */ "./src/Framework/type/csmstring.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/csmvector */ "./src/Framework/type/csmvector.ts");
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */




var CubismFramework = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_3__["Live2DCubismFramework"].CubismFramework;
var csmVector = _type_csmvector__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].csmVector;
var csmString = _type_csmstring__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].csmString;
var CubismModelUserDataJson = _cubismmodeluserdatajson__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismModelUserDataJson;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var ArtMesh = "ArtMesh";
    /**
     * ユーザーデータインターフェース
     *
     * Jsonから読み込んだユーザーデータを記録しておくための構造体
     */
    var CubismModelUserDataNode = /** @class */ (function () {
        function CubismModelUserDataNode() {
        }
        return CubismModelUserDataNode;
    }());
    Live2DCubismFramework.CubismModelUserDataNode = CubismModelUserDataNode;
    /**
     * ユーザデータの管理クラス
     *
     * ユーザデータをロード、管理、検索インターフェイス、解放までを行う。
     */
    var CubismModelUserData = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismModelUserData() {
            this._userDataNodes = new csmVector();
            this._artMeshUserDataNode = new csmVector();
        }
        /**
         * インスタンスの作成
         *
         * @param buffer    userdata3.jsonが読み込まれているバッファ
         * @param size      バッファのサイズ
         * @return 作成されたインスタンス
         */
        CubismModelUserData.create = function (buffer, size) {
            var ret = new CubismModelUserData();
            ret.parseUserData(buffer, size);
            return ret;
        };
        /**
         * インスタンスを破棄する
         *
         * @param modelUserData 破棄するインスタンス
         */
        CubismModelUserData.delete = function (modelUserData) {
            if (modelUserData != null) {
                modelUserData.release();
                modelUserData = null;
            }
        };
        /**
         * ArtMeshのユーザーデータのリストの取得
         *
         * @return ユーザーデータリスト
         */
        CubismModelUserData.prototype.getArtMeshUserDatas = function () {
            return this._artMeshUserDataNode;
        };
        /**
         * userdata3.jsonのパース
         *
         * @param buffer    userdata3.jsonが読み込まれているバッファ
         * @param size      バッファのサイズ
         */
        CubismModelUserData.prototype.parseUserData = function (buffer, size) {
            var json = new CubismModelUserDataJson(buffer, size);
            var typeOfArtMesh = CubismFramework.getIdManager().getId(ArtMesh);
            var nodeCount = json.getUserDataCount();
            for (var i = 0; i < nodeCount; i++) {
                var addNode = new CubismModelUserDataNode();
                addNode.targetId = json.getUserDataId(i);
                addNode.targetType = CubismFramework.getIdManager().getId(json.getUserDataTargetType(i));
                addNode.value = new csmString(json.getUserDataValue(i));
                this._userDataNodes.pushBack(addNode);
                if (addNode.targetType == typeOfArtMesh) {
                    this._artMeshUserDataNode.pushBack(addNode);
                }
            }
            json.release();
            json = void 0;
        };
        /**
         * デストラクタ相当の処理
         *
         * ユーザーデータ構造体配列を解放する
         */
        CubismModelUserData.prototype.release = function () {
            for (var i = 0; i < this._userDataNodes.getSize(); ++i) {
                this._userDataNodes.set(i, null);
            }
            this._userDataNodes = null;
        };
        return CubismModelUserData;
    }());
    Live2DCubismFramework.CubismModelUserData = CubismModelUserData;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/model/cubismmodeluserdatajson.ts":
/*!********************************************************!*\
  !*** ./src/Framework/model/cubismmodeluserdatajson.ts ***!
  \********************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _utils_cubismjson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/cubismjson */ "./src/Framework/utils/cubismjson.ts");
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */


var CubismFramework = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismFramework;
var CubismJson = _utils_cubismjson__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismJson;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var Meta = "Meta";
    var UserDataCount = "UserDataCount";
    var TotalUserDataSize = "TotalUserDataSize";
    var UserData = "UserData";
    var Target = "Target";
    var Id = "Id";
    var Value = "Value";
    var CubismModelUserDataJson = /** @class */ (function () {
        /**
         * コンストラクタ
         * @param buffer    userdata3.jsonが読み込まれているバッファ
         * @param size      バッファのサイズ
         */
        function CubismModelUserDataJson(buffer, size) {
            this._json = CubismJson.create(buffer, size);
        }
        /**
         * デストラクタ相当の処理
         */
        CubismModelUserDataJson.prototype.release = function () {
            CubismJson.delete(this._json);
        };
        /**
         * ユーザーデータ個数の取得
         * @return ユーザーデータの個数
         */
        CubismModelUserDataJson.prototype.getUserDataCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(UserDataCount).toInt();
        };
        /**
         * ユーザーデータ総文字列数の取得
         *
         * @return ユーザーデータ総文字列数
         */
        CubismModelUserDataJson.prototype.getTotalUserDataSize = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalUserDataSize).toInt();
        };
        /**
         * ユーザーデータのタイプの取得
         *
         * @return ユーザーデータのタイプ
         */
        CubismModelUserDataJson.prototype.getUserDataTargetType = function (i) {
            return this._json.getRoot().getValueByString(UserData).getValueByIndex(i).getValueByString(Target).getRawString();
        };
        /**
         * ユーザーデータのターゲットIDの取得
         *
         * @param i インデックス
         * @return ユーザーデータターゲットID
         */
        CubismModelUserDataJson.prototype.getUserDataId = function (i) {
            return CubismFramework.getIdManager().getId(this._json.getRoot().getValueByString(UserData).getValueByIndex(i).getValueByString(Id).getRawString());
        };
        /**
         * ユーザーデータの文字列の取得
         *
         * @param i インデックス
         * @return ユーザーデータ
         */
        CubismModelUserDataJson.prototype.getUserDataValue = function (i) {
            return this._json.getRoot().getValueByString(UserData).getValueByIndex(i).getValueByString(Value).getRawString();
        };
        return CubismModelUserDataJson;
    }());
    Live2DCubismFramework.CubismModelUserDataJson = CubismModelUserDataJson;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/model/cubismusermodel.ts":
/*!************************************************!*\
  !*** ./src/Framework/model/cubismusermodel.ts ***!
  \************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/* harmony import */ var _motion_cubismmotionmanager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../motion/cubismmotionmanager */ "./src/Framework/motion/cubismmotionmanager.ts");
/* harmony import */ var _math_cubismtargetpoint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/cubismtargetpoint */ "./src/Framework/math/cubismtargetpoint.ts");
/* harmony import */ var _math_cubismmodelmatrix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/cubismmodelmatrix */ "./src/Framework/math/cubismmodelmatrix.ts");
/* harmony import */ var _cubismmoc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cubismmoc */ "./src/Framework/model/cubismmoc.ts");
/* harmony import */ var _motion_cubismmotion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../motion/cubismmotion */ "./src/Framework/motion/cubismmotion.ts");
/* harmony import */ var _motion_cubismexpressionmotion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../motion/cubismexpressionmotion */ "./src/Framework/motion/cubismexpressionmotion.ts");
/* harmony import */ var _effect_cubismpose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../effect/cubismpose */ "./src/Framework/effect/cubismpose.ts");
/* harmony import */ var _cubismmodeluserdata__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cubismmodeluserdata */ "./src/Framework/model/cubismmodeluserdata.ts");
/* harmony import */ var _physics_cubismphysics__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../physics/cubismphysics */ "./src/Framework/physics/cubismphysics.ts");
/* harmony import */ var _effect_cubismbreath__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../effect/cubismbreath */ "./src/Framework/effect/cubismbreath.ts");
/* harmony import */ var _effect_cubismeyeblink__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../effect/cubismeyeblink */ "./src/Framework/effect/cubismeyeblink.ts");
/* harmony import */ var _rendering_cubismrenderer_webgl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../rendering/cubismrenderer_webgl */ "./src/Framework/rendering/cubismrenderer_webgl.ts");
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/cubismdebug */ "./src/Framework/utils/cubismdebug.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */














var CubismRenderer_WebGL = _rendering_cubismrenderer_webgl__WEBPACK_IMPORTED_MODULE_12__["Live2DCubismFramework"].CubismRenderer_WebGL;
var CubismEyeBlink = _effect_cubismeyeblink__WEBPACK_IMPORTED_MODULE_11__["Live2DCubismFramework"].CubismEyeBlink;
var CubismBreath = _effect_cubismbreath__WEBPACK_IMPORTED_MODULE_10__["Live2DCubismFramework"].CubismBreath;
var Constant = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].Constant;
var CubismPhysics = _physics_cubismphysics__WEBPACK_IMPORTED_MODULE_9__["Live2DCubismFramework"].CubismPhysics;
var CubismModelUserData = _cubismmodeluserdata__WEBPACK_IMPORTED_MODULE_8__["Live2DCubismFramework"].CubismModelUserData;
var CubismPose = _effect_cubismpose__WEBPACK_IMPORTED_MODULE_7__["Live2DCubismFramework"].CubismPose;
var CubismExpressionMotion = _motion_cubismexpressionmotion__WEBPACK_IMPORTED_MODULE_6__["Live2DCubismFramework"].CubismExpressionMotion;
var CubismMotion = _motion_cubismmotion__WEBPACK_IMPORTED_MODULE_5__["Live2DCubismFramework"].CubismMotion;
var CubismMoc = _cubismmoc__WEBPACK_IMPORTED_MODULE_4__["Live2DCubismFramework"].CubismMoc;
var CubismModelMatrix = _math_cubismmodelmatrix__WEBPACK_IMPORTED_MODULE_3__["Live2DCubismFramework"].CubismModelMatrix;
var CubismTargetPoint = _math_cubismtargetpoint__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].CubismTargetPoint;
var CubismMotionManager = _motion_cubismmotionmanager__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismMotionManager;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * ユーザーが実際に使用するモデル
     *
     * ユーザーが実際に使用するモデルの基底クラス。これを継承してユーザーが実装する。
     */
    var CubismUserModel = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismUserModel() {
            // 各変数初期化
            this._moc = null;
            this._model = null;
            this._motionManager = null;
            this._expressionManager = null;
            this._eyeBlink = null;
            this._breath = null;
            this._modelMatrix = null;
            this._pose = null;
            this._dragManager = null;
            this._physics = null;
            this._modelUserData = null;
            this._initialized = false;
            this._updating = false;
            this._opacity = 1.0;
            this._lipsync = true;
            this._lastLipSyncValue = 0.0;
            this._dragX = 0.0;
            this._dragY = 0.0;
            this._accelerationX = 0.0;
            this._accelerationY = 0.0;
            this._accelerationZ = 0.0;
            this._debugMode = false;
            this._renderer = null;
            // モーションマネージャーを作成
            this._motionManager = new CubismMotionManager();
            this._motionManager.setEventCallback(CubismUserModel.cubismDefaultMotionEventCallback, this);
            // 表情マネージャーを作成
            this._expressionManager = new CubismMotionManager();
            // ドラッグによるアニメーション
            this._dragManager = new CubismTargetPoint();
        }
        /**
         * 初期化状態の取得
         *
         * 初期化されている状態か？
         *
         * @return true     初期化されている
         * @return false    初期化されていない
         */
        CubismUserModel.prototype.isInitialized = function () {
            return this._initialized;
        };
        /**
         * 初期化状態の設定
         *
         * 初期化状態を設定する。
         *
         * @param v 初期化状態
         */
        CubismUserModel.prototype.setInitialized = function (v) {
            this._initialized = v;
        };
        /**
         * 更新状態の取得
         *
         * 更新されている状態か？
         *
         * @return true     更新されている
         * @return false    更新されていない
         */
        CubismUserModel.prototype.isUpdating = function () {
            return this._updating;
        };
        /**
         * 更新状態の設定
         *
         * 更新状態を設定する
         *
         * @param v 更新状態
         */
        CubismUserModel.prototype.setUpdating = function (v) {
            this._updating = v;
        };
        /**
         * マウスドラッグ情報の設定
         * @param ドラッグしているカーソルのX位置
         * @param ドラッグしているカーソルのY位置
         */
        CubismUserModel.prototype.setDragging = function (x, y) {
            this._dragManager.set(x, y);
        };
        /**
         * 加速度の情報を設定する
         * @param x X軸方向の加速度
         * @param y Y軸方向の加速度
         * @param z Z軸方向の加速度
         */
        CubismUserModel.prototype.setAcceleration = function (x, y, z) {
            this._accelerationX = x;
            this._accelerationY = y;
            this._accelerationZ = z;
        };
        /**
         * モデル行列を取得する
         * @return モデル行列
         */
        CubismUserModel.prototype.getModelMatrix = function () {
            return this._modelMatrix;
        };
        /**
         * 不透明度の設定
         * @param a 不透明度
         */
        CubismUserModel.prototype.setOpacity = function (a) {
            this._opacity = a;
        };
        /**
         * 不透明度の取得
         * @return 不透明度
         */
        CubismUserModel.prototype.getOpacity = function () {
            return this._opacity;
        };
        /**
         * モデルデータを読み込む
         *
         * @param buffer    moc3ファイルが読み込まれているバッファ
         */
        CubismUserModel.prototype.loadModel = function (buffer) {
            this._moc = CubismMoc.create(buffer);
            this._model = this._moc.createModel();
            this._model.saveParameters();
            if (this._moc == null || this._model == null) {
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_13__["CubismLogError"])("Failed to CreateModel().");
                return;
            }
            this._modelMatrix = new CubismModelMatrix(this._model.getCanvasWidth(), this._model.getCanvasHeight());
        };
        /**
         * モーションデータを読み込む
         * @param buffer motion3.jsonファイルが読み込まれているバッファ
         * @param size バッファのサイズ
         * @param name モーションの名前
         * @return モーションクラス
         */
        CubismUserModel.prototype.loadMotion = function (buffer, size, name) {
            return CubismMotion.create(buffer, size);
        };
        /**
         * 表情データの読み込み
         * @param buffer expファイルが読み込まれているバッファ
         * @param size バッファのサイズ
         * @param name 表情の名前
         */
        CubismUserModel.prototype.loadExpression = function (buffer, size, name) {
            return CubismExpressionMotion.create(buffer, size);
        };
        /**
         * ポーズデータの読み込み
         * @param buffer pose3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        CubismUserModel.prototype.loadPose = function (buffer, size) {
            this._pose = CubismPose.create(buffer, size);
        };
        /**
         * モデルに付属するユーザーデータを読み込む
         * @param buffer userdata3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        CubismUserModel.prototype.loadUserData = function (buffer, size) {
            this._modelUserData = CubismModelUserData.create(buffer, size);
        };
        /**
         * 物理演算データの読み込み
         * @param buffer  physics3.jsonが読み込まれているバッファ
         * @param size    バッファのサイズ
         */
        CubismUserModel.prototype.loadPhysics = function (buffer, size) {
            this._physics = CubismPhysics.create(buffer, size);
        };
        /**
         * 当たり判定の取得
         * @param drawableId 検証したいDrawableのID
         * @param pointX X位置
         * @param pointY Y位置
         * @return { hit: boolean,area: number }
         */
        CubismUserModel.prototype.isHit = function (drawableId, pointX, pointY) {
            var drawIndex = this._model.getDrawableIndex(drawableId);
            if (drawIndex < 0) {
                return {
                    hit: false,
                    area: 0
                }; // 存在しない場合はfalse
            }
            var count = this._model.getDrawableVertexCount(drawIndex);
            var vertices = this._model.getDrawableVertices(drawIndex);
            var left = vertices[0];
            var right = vertices[0];
            var top = vertices[1];
            var bottom = vertices[1];
            for (var j = 1; j < count; ++j) {
                var x = vertices[Constant.vertexOffset + j * Constant.vertexStep];
                var y = vertices[Constant.vertexOffset + j * Constant.vertexStep + 1];
                if (x < left) {
                    left = x; // Min x
                }
                if (x > right) {
                    right = x; // Max x
                }
                if (y < top) {
                    top = y; // Min y
                }
                if (y > bottom) {
                    bottom = y; // Max y
                }
            }
            var tx = this._modelMatrix.invertTransformX(pointX);
            var ty = this._modelMatrix.invertTransformY(pointY);
            return {
                hit: left <= tx && tx <= right && top <= ty && ty <= bottom,
                area: Math.abs(left - right) * Math.abs(bottom - top)
            };
        };
        /**
         * モデルの取得
         * @return モデル
         */
        CubismUserModel.prototype.getModel = function () {
            return this._model;
        };
        /**
         * レンダラの取得
         * @return レンダラ
         */
        CubismUserModel.prototype.getRenderer = function () {
            return this._renderer;
        };
        /**
         * レンダラを作成して初期化を実行する
         */
        CubismUserModel.prototype.createRenderer = function () {
            if (this._renderer) {
                this.deleteRenderer();
            }
            this._renderer = new CubismRenderer_WebGL();
            this._renderer.initialize(this._model);
        };
        /**
         * レンダラの解放
         */
        CubismUserModel.prototype.deleteRenderer = function () {
            if (this._renderer != null) {
                this._renderer.release();
                this._renderer = null;
            }
        };
        /**
         * イベント発火時の標準処理
         *
         * Eventが再生処理時にあった場合の処理をする。
         * 継承で上書きすることを想定している。
         * 上書きしない場合はログ出力をする。
         *
         * @param eventValue 発火したイベントの文字列データ
         */
        CubismUserModel.prototype.motionEventFired = function (eventValue) {
            Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_13__["CubismLogInfo"])("{0}", eventValue.s);
        };
        /**
         * イベント用のコールバック
         *
         * CubismMotionQueueManagerにイベント用に登録するためのCallback。
         * CubismUserModelの継承先のEventFiredを呼ぶ。
         *
         * @param caller 発火したイベントを管理していたモーションマネージャー、比較用
         * @param eventValue 発火したイベントの文字列データ
         * @param customData CubismUserModelを継承したインスタンスを想定
         */
        CubismUserModel.cubismDefaultMotionEventCallback = function (caller, eventValue, customData) {
            var model = customData;
            if (model != null) {
                model.motionEventFired(eventValue);
            }
        };
        /**
         * デストラクタに相当する処理
         */
        CubismUserModel.prototype.release = function () {
            if (this._motionManager != null) {
                this._motionManager.release();
                this._motionManager = null;
            }
            if (this._expressionManager != null) {
                this._expressionManager.release();
                this._expressionManager = null;
            }
            if (this._moc != null) {
                this._moc.deleteModel(this._model);
                this._moc.release();
                this._moc = null;
            }
            this._modelMatrix = null;
            CubismPose.delete(this._pose);
            CubismEyeBlink.delete(this._eyeBlink);
            CubismBreath.delete(this._breath);
            this._dragManager = null;
            CubismPhysics.delete(this._physics);
            CubismModelUserData.delete(this._modelUserData);
            this.deleteRenderer();
        };
        return CubismUserModel;
    }());
    Live2DCubismFramework.CubismUserModel = CubismUserModel;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/motion/acubismmotion.ts":
/*!***********************************************!*\
  !*** ./src/Framework/motion/acubismmotion.ts ***!
  \***********************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/cubismmath */ "./src/Framework/math/cubismmath.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/csmvector */ "./src/Framework/type/csmvector.ts");
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/cubismdebug */ "./src/Framework/utils/cubismdebug.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */



var csmVector = _type_csmvector__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].csmVector;
var CubismMath = _math_cubismmath__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismMath;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * モーションの抽象基底クラス
     *
     * モーションの抽象基底クラス。MotionQueueManagerによってモーションの再生を管理する。
     */
    var ACubismMotion = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function ACubismMotion() {
            this._fadeInSeconds = -1.0;
            this._fadeOutSeconds = -1.0;
            this._weight = 1.0;
            this._offsetSeconds = 0.0; // 再生の開始時刻
            this._firedEventValues = new csmVector();
        }
        /**
         * インスタンスの破棄
         */
        ACubismMotion.delete = function (motion) {
            motion.release();
            motion = void 0;
            motion = null;
        };
        /**
         * デストラクタ相当の処理
         */
        ACubismMotion.prototype.release = function () {
            this._weight = 0.0;
        };
        /**
         * モデルのパラメータ
         * @param model 対象のモデル
         * @param motionQueueEntry CubismMotionQueueManagerで管理されているモーション
         * @param userTimeSeconds デルタ時間の積算値[秒]
         */
        ACubismMotion.prototype.updateParameters = function (model, motionQueueEntry, userTimeSeconds) {
            if (!motionQueueEntry.isAvailable() || motionQueueEntry.isFinished()) {
                return;
            }
            if (!motionQueueEntry.isStarted()) {
                motionQueueEntry.setIsStarted(true);
                motionQueueEntry.setStartTime(userTimeSeconds - this._offsetSeconds); // モーションの開始時刻を記録
                motionQueueEntry.setFadeInStartTime(userTimeSeconds); // フェードインの開始時刻
                var duration = this.getDuration();
                if (motionQueueEntry.getEndTime() < 0) {
                    // 開始していないうちに終了設定している場合がある。
                    motionQueueEntry.setEndTime((duration <= 0) ? -1 : motionQueueEntry.getStartTime() + duration);
                    // duration == -1 の場合はループする
                }
            }
            var fadeWeight = this._weight; // 現在の値と掛け合わせる割合
            //---- フェードイン・アウトの処理 ----
            // 単純なサイン関数でイージングする
            var fadeIn = this._fadeInSeconds == 0.0
                ? 1.0
                : CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) / this._fadeInSeconds);
            var fadeOut = (this._fadeOutSeconds == 0.0 || motionQueueEntry.getEndTime() < 0.0)
                ? 1.0
                : CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) / this._fadeOutSeconds);
            fadeWeight = fadeWeight * fadeIn * fadeOut;
            motionQueueEntry.setState(userTimeSeconds, fadeWeight);
            Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_2__["CSM_ASSERT"])(0.0 <= fadeWeight && fadeWeight <= 1.0);
            //---- 全てのパラメータIDをループする ----
            this.doUpdateParameters(model, userTimeSeconds, fadeWeight, motionQueueEntry);
            // 後処理
            // 終了時刻を過ぎたら終了フラグを立てる(CubismMotionQueueManager)
            if ((motionQueueEntry.getEndTime() > 0) && (motionQueueEntry.getEndTime() < userTimeSeconds)) {
                motionQueueEntry.setIsFinished(true); // 終了
            }
        };
        /**
         * フェードインの時間を設定する
         * @param fadeInSeconds フェードインにかかる時間[秒]
         */
        ACubismMotion.prototype.setFadeInTime = function (fadeInSeconds) {
            this._fadeInSeconds = fadeInSeconds;
        };
        /**
         * フェードアウトの時間を設定する
         * @param fadeOutSeconds フェードアウトにかかる時間[秒]
         */
        ACubismMotion.prototype.setFadeOutTime = function (fadeOutSeconds) {
            this._fadeOutSeconds = fadeOutSeconds;
        };
        /**
         * フェードアウトにかかる時間の取得
         * @return フェードアウトにかかる時間[秒]
         */
        ACubismMotion.prototype.getFadeOutTime = function () {
            return this._fadeOutSeconds;
        };
        /**
         * フェードインにかかる時間の取得
         * @return フェードインにかかる時間[秒]
         */
        ACubismMotion.prototype.getFadeInTime = function () {
            return this._fadeInSeconds;
        };
        /**
         * モーション適用の重みの設定
         * @param weight 重み（0.0 - 1.0）
         */
        ACubismMotion.prototype.setWeight = function (weight) {
            this._weight = weight;
        };
        /**
         * モーション適用の重みの取得
         * @return 重み（0.0 - 1.0）
         */
        ACubismMotion.prototype.getWeight = function () {
            return this._weight;
        };
        /**
         * モーションの長さの取得
         * @return モーションの長さ[秒]
         *
         * @note ループの時は「-1」。
         *       ループでない場合は、オーバーライドする。
         *       正の値の時は取得される時間で終了する。
         *       「-1」の時は外部から停止命令がない限り終わらない処理となる。
         */
        ACubismMotion.prototype.getDuration = function () {
            return -1.0;
        };
        /**
         * モーションのループ1回分の長さの取得
         * @return モーションのループ一回分の長さ[秒]
         *
         * @note ループしない場合は、getDuration()と同じ値を返す
         *       ループ一回分の長さが定義できない場合(プログラム的に動き続けるサブクラスなど)の場合は「-1」を返す
         */
        ACubismMotion.prototype.getLoopDuration = function () {
            return -1.0;
        };
        /**
         * モーション再生の開始時刻の設定
         * @param offsetSeconds モーション再生の開始時刻[秒]
         */
        ACubismMotion.prototype.setOffsetTime = function (offsetSeconds) {
            this._offsetSeconds = offsetSeconds;
        };
        /**
         * モデルのパラメータ更新
         *
         * イベント発火のチェック。
         * 入力する時間は呼ばれるモーションタイミングを０とした秒数で行う。
         *
         * @param beforeCheckTimeSeconds 前回のイベントチェック時間[秒]
         * @param motionTimeSeconds 今回の再生時間[秒]
         */
        ACubismMotion.prototype.getFiredEvent = function (beforeCheckTimeSeconds, motionTimeSeconds) {
            return this._firedEventValues;
        };
        return ACubismMotion;
    }());
    Live2DCubismFramework.ACubismMotion = ACubismMotion;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/motion/cubismexpressionmotion.ts":
/*!********************************************************!*\
  !*** ./src/Framework/motion/cubismexpressionmotion.ts ***!
  \********************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _acubismmotion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./acubismmotion */ "./src/Framework/motion/acubismmotion.ts");
/* harmony import */ var _utils_cubismjson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/cubismjson */ "./src/Framework/utils/cubismjson.ts");
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../type/csmvector */ "./src/Framework/type/csmvector.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var csmVector = _type_csmvector__WEBPACK_IMPORTED_MODULE_3__["Live2DCubismFramework"].csmVector;
var CubismFramework = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].CubismFramework;
var CubismJson = _utils_cubismjson__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismJson;
var ACubismMotion = _acubismmotion__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].ACubismMotion;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    // exp3.jsonのキーとデフォルト
    var ExpressionKeyFadeIn = "FadeInTime";
    var ExpressionKeyFadeOut = "FadeOutTime";
    var ExpressionKeyParameters = "Parameters";
    var ExpressionKeyId = "Id";
    var ExpressionKeyValue = "Value";
    var ExpressionKeyBlend = "Blend";
    var BlendValueAdd = "Add";
    var BlendValueMultiply = "Multiply";
    var BlendValueOverwrite = "Overwrite";
    var DefaultFadeTime = 1.0;
    /**
     * 表情のモーション
     *
     * 表情のモーションクラス。
     */
    var CubismExpressionMotion = /** @class */ (function (_super) {
        __extends(CubismExpressionMotion, _super);
        /**
         * コンストラクタ
         */
        function CubismExpressionMotion() {
            var _this = _super.call(this) || this;
            _this._parameters = new csmVector();
            return _this;
        }
        /**
         * インスタンスを作成する。
         * @param buffer expファイルが読み込まれているバッファ
         * @param size バッファのサイズ
         * @return 作成されたインスタンス
         */
        CubismExpressionMotion.create = function (buffer, size) {
            var expression = new CubismExpressionMotion();
            var json = CubismJson.create(buffer, size);
            var root = json.getRoot();
            expression.setFadeInTime(root.getValueByString(ExpressionKeyFadeIn).toFloat(DefaultFadeTime)); // フェードイン
            expression.setFadeOutTime(root.getValueByString(ExpressionKeyFadeOut).toFloat(DefaultFadeTime)); // フェードアウト
            // 各パラメータについて
            var parameterCount = root.getValueByString(ExpressionKeyParameters).getSize();
            expression._parameters.prepareCapacity(parameterCount);
            for (var i = 0; i < parameterCount; ++i) {
                var param = root.getValueByString(ExpressionKeyParameters).getValueByIndex(i);
                var parameterId = CubismFramework.getIdManager().getId(param.getValueByString(ExpressionKeyId).getRawString()); // パラメータID
                var value = param.getValueByString(ExpressionKeyValue).toFloat(); // 値
                // 計算方法の設定
                var blendType = void 0;
                if (param.getValueByString(ExpressionKeyBlend).isNull() || param.getValueByString(ExpressionKeyBlend).getString() == BlendValueAdd) {
                    blendType = ExpressionBlendType.ExpressionBlendType_Add;
                }
                else if (param.getValueByString(ExpressionKeyBlend).getString() == BlendValueMultiply) {
                    blendType = ExpressionBlendType.ExpressionBlendType_Multiply;
                }
                else if (param.getValueByString(ExpressionKeyBlend).getString() == BlendValueOverwrite) {
                    blendType = ExpressionBlendType.ExpressionBlendType_Overwrite;
                }
                else {
                    // その他 仕様にない値を設定した時は加算モードにすることで復旧
                    blendType = ExpressionBlendType.ExpressionBlendType_Add;
                }
                // 設定オブジェクトを作成してリストに追加する
                var item = new ExpressionParameter();
                item.parameterId = parameterId;
                item.blendType = blendType;
                item.value = value;
                expression._parameters.pushBack(item);
            }
            CubismJson.delete(json); // JSONデータは不要になったら削除する
            return expression;
        };
        /**
         * モデルのパラメータの更新の実行
         * @param model 対象のモデル
         * @param userTimeSeconds デルタ時間の積算値[秒]
         * @param weight モーションの重み
         * @param motionQueueEntry CubismMotionQueueManagerで管理されているモーション
         */
        CubismExpressionMotion.prototype.doUpdateParameters = function (model, userTimeSeconds, weight, motionQueueEntry) {
            for (var i = 0; i < this._parameters.getSize(); ++i) {
                var parameter = this._parameters.at(i);
                switch (parameter.blendType) {
                    case ExpressionBlendType.ExpressionBlendType_Add:
                        {
                            model.addParameterValueById(parameter.parameterId, parameter.value, weight);
                            break;
                        }
                    case ExpressionBlendType.ExpressionBlendType_Multiply:
                        {
                            model.multiplyParameterValueById(parameter.parameterId, parameter.value, weight);
                            break;
                        }
                    case ExpressionBlendType.ExpressionBlendType_Overwrite:
                        {
                            model.setParameterValueById(parameter.parameterId, parameter.value, weight);
                            break;
                        }
                    default:
                        // 仕様にない値を設定した時はすでに加算モードになっている
                        break;
                }
            }
        };
        return CubismExpressionMotion;
    }(ACubismMotion));
    Live2DCubismFramework.CubismExpressionMotion = CubismExpressionMotion;
    /**
     * 表情パラメータ値の計算方式
     */
    var ExpressionBlendType;
    (function (ExpressionBlendType) {
        ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Add"] = 0] = "ExpressionBlendType_Add";
        ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Multiply"] = 1] = "ExpressionBlendType_Multiply";
        ExpressionBlendType[ExpressionBlendType["ExpressionBlendType_Overwrite"] = 2] = "ExpressionBlendType_Overwrite"; // 上書き
    })(ExpressionBlendType = Live2DCubismFramework.ExpressionBlendType || (Live2DCubismFramework.ExpressionBlendType = {}));
    /**
     * 表情のパラメータ情報
     */
    var ExpressionParameter = /** @class */ (function () {
        function ExpressionParameter() {
        }
        return ExpressionParameter;
    }());
    Live2DCubismFramework.ExpressionParameter = ExpressionParameter;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/motion/cubismmotion.ts":
/*!**********************************************!*\
  !*** ./src/Framework/motion/cubismmotion.ts ***!
  \**********************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _cubismmotionjson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismmotionjson */ "./src/Framework/motion/cubismmotionjson.ts");
/* harmony import */ var _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cubismmotioninternal */ "./src/Framework/motion/cubismmotioninternal.ts");
/* harmony import */ var _acubismmotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./acubismmotion */ "./src/Framework/motion/acubismmotion.ts");
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/* harmony import */ var _math_cubismmath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../math/cubismmath */ "./src/Framework/math/cubismmath.ts");
/* harmony import */ var _type_csmstring__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../type/csmstring */ "./src/Framework/type/csmstring.ts");
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/cubismdebug */ "./src/Framework/utils/cubismdebug.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var csmString = _type_csmstring__WEBPACK_IMPORTED_MODULE_5__["Live2DCubismFramework"].csmString;
var CubismMotionData = _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismMotionData;
var CubismMotionSegment = _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismMotionSegment;
var CubismMotionPoint = _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismMotionPoint;
var CubismMotionEvent = _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismMotionEvent;
var CubismMotionSegmentType = _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismMotionSegmentType;
var CubismMotionCurve = _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismMotionCurve;
var CubismMotionCurveTarget = _cubismmotioninternal__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismMotionCurveTarget;
var CubismMath = _math_cubismmath__WEBPACK_IMPORTED_MODULE_4__["Live2DCubismFramework"].CubismMath;
var CubismFramework = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_3__["Live2DCubismFramework"].CubismFramework;
var ACubismMotion = _acubismmotion__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].ACubismMotion;
var CubismMotionJson = _cubismmotionjson__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismMotionJson;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var EffectNameEyeBlink = "EyeBlink";
    var EffectNameLipSync = "LipSync";
    var TargetNameModel = "Model";
    var TargetNameParameter = "Parameter";
    var TargetNamePartOpacity = "PartOpacity";
    function lerpPoints(a, b, t) {
        var result = new CubismMotionPoint();
        result.time = a.time + ((b.time - a.time) * t);
        result.value = a.value + ((b.value - a.value) * t);
        return result;
    }
    function linearEvaluate(points, time) {
        var t = (time - points[0].time) / (points[1].time - points[0].time);
        if (t < 0.0) {
            t = 0.0;
        }
        return points[0].value + ((points[1].value - points[0].value) * t);
    }
    function bezierEvaluate(points, time) {
        var t = (time - points[0].time) / (points[3].time - points[0].time);
        if (t < 0.0) {
            t = 0.0;
        }
        var p01 = lerpPoints(points[0], points[1], t);
        var p12 = lerpPoints(points[1], points[2], t);
        var p23 = lerpPoints(points[2], points[3], t);
        var p012 = lerpPoints(p01, p12, t);
        var p123 = lerpPoints(p12, p23, t);
        return lerpPoints(p012, p123, t).value;
    }
    function steppedEvaluate(points, time) {
        return points[0].value;
    }
    function inverseSteppedEvaluate(points, time) {
        return points[1].value;
    }
    function evaluateCurve(motionData, index, time) {
        // Find segment to evaluate.
        var curve = motionData.curves.at(index);
        var target = -1;
        var totalSegmentCount = curve.baseSegmentIndex + curve.segmentCount;
        var pointPosition = 0;
        for (var i = curve.baseSegmentIndex; i < totalSegmentCount; ++i) {
            // Get first point of next segment.
            pointPosition = motionData.segments.at(i).basePointIndex
                + (motionData.segments.at(i).segmentType == CubismMotionSegmentType.CubismMotionSegmentType_Bezier
                    ? 3
                    : 1);
            // Break if time lies within current segment.
            if (motionData.points.at(pointPosition).time > time) {
                target = i;
                break;
            }
        }
        if (target == -1) {
            return motionData.points.at(pointPosition).value;
        }
        var segment = motionData.segments.at(target);
        return segment.evaluate(motionData.points.get(segment.basePointIndex), time);
    }
    /**
     * モーションクラス
     *
     * モーションのクラス。
     */
    var CubismMotion = /** @class */ (function (_super) {
        __extends(CubismMotion, _super);
        /**
         * コンストラクタ
         */
        function CubismMotion() {
            var _this = _super.call(this) || this;
            _this._sourceFrameRate = 30.0;
            _this._loopDurationSeconds = -1.0;
            _this._isLoop = false; // trueから false へデフォルトを変更
            _this._isLoopFadeIn = true; // ループ時にフェードインが有効かどうかのフラグ
            _this._lastWeight = 0.0;
            _this._motionData = null;
            _this._modelCurveIdEyeBlink = null;
            _this._modelCurveIdLipSync = null;
            _this._eyeBlinkParameterIds = null;
            _this._lipSyncParameterIds = null;
            return _this;
        }
        /**
         * インスタンスを作成する
         *
         * @param buffer motion3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         * @return 作成されたインスタンス
         */
        CubismMotion.create = function (buffer, size) {
            var ret = new CubismMotion();
            ret.parse(buffer, size);
            ret._sourceFrameRate = ret._motionData.fps;
            ret._loopDurationSeconds = ret._motionData.duration;
            // NOTE: Editorではループありのモーション書き出しは非対応
            // ret->_loop = (ret->_motionData->Loop > 0);
            return ret;
        };
        /**
         * モデルのパラメータの更新の実行
         * @param model             対象のモデル
         * @param userTimeSeconds   現在の時刻[秒]
         * @param fadeWeight        モーションの重み
         * @param motionQueueEntry  CubismMotionQueueManagerで管理されているモーション
         */
        CubismMotion.prototype.doUpdateParameters = function (model, userTimeSeconds, fadeWeight, motionQueueEntry) {
            if (this._modelCurveIdEyeBlink == null) {
                this._modelCurveIdEyeBlink = CubismFramework.getIdManager().getId(EffectNameEyeBlink);
            }
            if (this._modelCurveIdLipSync == null) {
                this._modelCurveIdLipSync = CubismFramework.getIdManager().getId(EffectNameLipSync);
            }
            var timeOffsetSeconds = userTimeSeconds - motionQueueEntry.getStartTime();
            if (timeOffsetSeconds < 0.0) {
                timeOffsetSeconds = 0.0; // エラー回避
            }
            var lipSyncValue = Number.MAX_VALUE;
            var eyeBlinkValue = Number.MAX_VALUE;
            //まばたき、リップシンクのうちモーションの適用を検出するためのビット（maxFlagCount個まで
            var MaxTargetSize = 64;
            var lipSyncFlags = 0;
            var eyeBlinkFlags = 0;
            //瞬き、リップシンクのターゲット数が上限を超えている場合
            if (this._eyeBlinkParameterIds.getSize() > MaxTargetSize) {
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_6__["CubismLogDebug"])("too many eye blink targets : {0}", this._eyeBlinkParameterIds.getSize());
            }
            if (this._lipSyncParameterIds.getSize() > MaxTargetSize) {
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_6__["CubismLogDebug"])("too many lip sync targets : {0}", this._lipSyncParameterIds.getSize());
            }
            var tmpFadeIn = (this._fadeInSeconds <= 0.0)
                ? 1.0
                : CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) / this._fadeInSeconds);
            var tmpFadeOut = (this._fadeOutSeconds <= 0.0 || motionQueueEntry.getEndTime() < 0.0)
                ? 1.0
                : CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) / this._fadeOutSeconds);
            var value;
            var c, parameterIndex;
            // 'Repeat' time as necessary.
            var time = timeOffsetSeconds;
            if (this._isLoop) {
                while (time > this._motionData.duration) {
                    time -= this._motionData.duration;
                }
            }
            var curves = this._motionData.curves;
            // Evaluate model curves.
            for (c = 0; c < this._motionData.curveCount && curves.at(c).type == CubismMotionCurveTarget.CubismMotionCurveTarget_Model; ++c) {
                // Evaluate curve and call handler.
                value = evaluateCurve(this._motionData, c, time);
                if (curves.at(c).id == this._modelCurveIdEyeBlink) {
                    eyeBlinkValue = value;
                }
                else if (curves.at(c).id == this._modelCurveIdLipSync) {
                    lipSyncValue = value;
                }
            }
            var parameterMotionCurveCount = 0;
            for (; c < this._motionData.curveCount && curves.at(c).type == CubismMotionCurveTarget.CubismMotionCurveTarget_Parameter; ++c) {
                parameterMotionCurveCount++;
                // Find parameter index.
                parameterIndex = model.getParameterIndex(curves.at(c).id);
                // Skip curve evaluation if no value in sink.
                if (parameterIndex == -1) {
                    continue;
                }
                var sourceValue = model.getParameterValueByIndex(parameterIndex);
                // Evaluate curve and apply value.
                value = evaluateCurve(this._motionData, c, time);
                if (eyeBlinkValue != Number.MAX_VALUE) {
                    for (var i = 0; i < this._eyeBlinkParameterIds.getSize() && i < MaxTargetSize; ++i) {
                        if (this._eyeBlinkParameterIds.at(i) == curves.at(c).id) {
                            value *= eyeBlinkValue;
                            eyeBlinkFlags |= 1 << i;
                            break;
                        }
                    }
                }
                if (lipSyncValue != Number.MAX_VALUE) {
                    for (var i = 0; i < this._lipSyncParameterIds.getSize() && i < MaxTargetSize; ++i) {
                        if (this._lipSyncParameterIds.at(i) == curves.at(c).id) {
                            value += lipSyncValue;
                            lipSyncFlags |= 1 << i;
                            break;
                        }
                    }
                }
                var v = void 0;
                // パラメータごとのフェード
                if (curves.at(c).fadeInTime < 0.0 && curves.at(c).fadeOutTime < 0.0) {
                    // モーションのフェードを適用
                    v = sourceValue + (value - sourceValue) * fadeWeight;
                }
                else {
                    // パラメータに対してフェードインかフェードアウトが設定してある場合はそちらを適用
                    var fin = void 0;
                    var fout = void 0;
                    if (curves.at(c).fadeInTime < 0.0) {
                        fin = tmpFadeIn;
                    }
                    else {
                        fin = curves.at(c).fadeInTime == 0.0
                            ? 1.0
                            : CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) / curves.at(c).fadeInTime);
                    }
                    if (curves.at(c).fadeOutTime < 0.0) {
                        fout = tmpFadeOut;
                    }
                    else {
                        fout = (curves.at(c).fadeOutTime == 0.0 || motionQueueEntry.getEndTime() < 0.0)
                            ? 1.0
                            : CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) / curves.at(c).fadeOutTime);
                    }
                    var paramWeight = this._weight * fin * fout;
                    // パラメータごとのフェードを適用
                    v = sourceValue + (value - sourceValue) * paramWeight;
                }
                model.setParameterValueByIndex(parameterIndex, v, 1.0);
            }
            {
                if (eyeBlinkValue != Number.MAX_VALUE) {
                    for (var i = 0; i < this._eyeBlinkParameterIds.getSize() && i < MaxTargetSize; ++i) {
                        var sourceValue = model.getParameterValueById(this._eyeBlinkParameterIds.at(i));
                        // モーションでの上書きがあった時にはまばたきは適用しない
                        if ((eyeBlinkFlags >> i) & 0x01) {
                            continue;
                        }
                        var v = sourceValue + (eyeBlinkValue - sourceValue) * fadeWeight;
                        model.setParameterValueById(this._eyeBlinkParameterIds.at(i), v);
                    }
                }
                if (lipSyncValue != Number.MAX_VALUE) {
                    for (var i = 0; i < this._lipSyncParameterIds.getSize() && i < MaxTargetSize; ++i) {
                        var sourceValue = model.getParameterValueById(this._lipSyncParameterIds.at(i));
                        // モーションでの上書きがあった時にはリップシンクは適用しない
                        if ((lipSyncFlags >> i) & 0x01) {
                            continue;
                        }
                        var v = sourceValue + (lipSyncValue - sourceValue) * fadeWeight;
                        model.setParameterValueById(this._lipSyncParameterIds.at(i), v);
                    }
                }
            }
            for (; c < this._motionData.curveCount && curves.at(c).type == CubismMotionCurveTarget.CubismMotionCurveTarget_PartOpacity; ++c) {
                // Find parameter index.
                parameterIndex = model.getParameterIndex(curves.at(c).id);
                // Skip curve evaluation if no value in sink.
                if (parameterIndex == -1) {
                    continue;
                }
                // Evaluate curve and apply value.
                value = evaluateCurve(this._motionData, c, time);
                model.setParameterValueByIndex(parameterIndex, value);
            }
            if (timeOffsetSeconds >= this._motionData.duration) {
                if (this._isLoop) {
                    motionQueueEntry.setStartTime(userTimeSeconds); // 最初の状態へ
                    if (this._isLoopFadeIn) {
                        // ループ内でループ用フェードインが有効の時は、フェードイン設定し直し
                        motionQueueEntry.setFadeInStartTime(userTimeSeconds);
                    }
                }
                else {
                    motionQueueEntry.setIsFinished(true);
                }
            }
            this._lastWeight = fadeWeight;
        };
        /**
         * ループ情報の設定
         * @param loop ループ情報
         */
        CubismMotion.prototype.setIsLoop = function (loop) {
            this._isLoop = loop;
        };
        /**
         * ループ情報の取得
         * @return true ループする
         * @return false ループしない
         */
        CubismMotion.prototype.isLoop = function () {
            return this._isLoop;
        };
        /**
         * ループ時のフェードイン情報の設定
         * @param loopFadeIn  ループ時のフェードイン情報
         */
        CubismMotion.prototype.setIsLoopFadeIn = function (loopFadeIn) {
            this._isLoopFadeIn = loopFadeIn;
        };
        /**
         * ループ時のフェードイン情報の取得
         *
         * @return  true    する
         * @return  false   しない
         */
        CubismMotion.prototype.isLoopFadeIn = function () {
            return this._isLoopFadeIn;
        };
        /**
         * モーションの長さを取得する。
         *
         * @return  モーションの長さ[秒]
         */
        CubismMotion.prototype.getDuration = function () {
            return this._isLoop ? -1.0 : this._loopDurationSeconds;
        };
        /**
         * モーションのループ時の長さを取得する。
         *
         * @return  モーションのループ時の長さ[秒]
         */
        CubismMotion.prototype.getLoopDuration = function () {
            return this._loopDurationSeconds;
        };
        /**
         * パラメータに対するフェードインの時間を設定する。
         *
         * @param parameterId     パラメータID
         * @param value           フェードインにかかる時間[秒]
         */
        CubismMotion.prototype.setParameterFadeInTime = function (parameterId, value) {
            var curves = this._motionData.curves;
            for (var i = 0; i < this._motionData.curveCount; ++i) {
                if (parameterId == curves.at(i).id) {
                    curves.at(i).fadeInTime = value;
                    return;
                }
            }
        };
        /**
        * パラメータに対するフェードアウトの時間の設定
        * @param parameterId     パラメータID
        * @param value           フェードアウトにかかる時間[秒]
        */
        CubismMotion.prototype.setParameterFadeOutTime = function (parameterId, value) {
            var curves = this._motionData.curves;
            for (var i = 0; i < this._motionData.curveCount; ++i) {
                if (parameterId == curves.at(i).id) {
                    curves.at(i).fadeOutTime = value;
                    return;
                }
            }
        };
        /**
        * パラメータに対するフェードインの時間の取得
        * @param    parameterId     パラメータID
        * @return   フェードインにかかる時間[秒]
        */
        CubismMotion.prototype.getParameterFadeInTime = function (parameterId) {
            var curves = this._motionData.curves;
            for (var i = 0; i < this._motionData.curveCount; ++i) {
                if (parameterId == curves.at(i).id) {
                    return curves.at(i).fadeInTime;
                }
            }
            return -1;
        };
        /**
        * パラメータに対するフェードアウトの時間を取得
        *
        * @param   parameterId     パラメータID
        * @return   フェードアウトにかかる時間[秒]
        */
        CubismMotion.prototype.getParameterFadeOutTime = function (parameterId) {
            var curves = this._motionData.curves;
            for (var i = 0; i < this._motionData.curveCount; ++i) {
                if (parameterId == curves.at(i).id) {
                    return curves.at(i).fadeOutTime;
                }
            }
            return -1;
        };
        /**
         * 自動エフェクトがかかっているパラメータIDリストの設定
         * @param eyeBlinkParameterIds    自動まばたきがかかっているパラメータIDのリスト
         * @param lipSyncParameterIds     リップシンクがかかっているパラメータIDのリスト
         */
        CubismMotion.prototype.setEffectIds = function (eyeBlinkParameterIds, lipSyncParameterIds) {
            this._eyeBlinkParameterIds = eyeBlinkParameterIds;
            this._lipSyncParameterIds = lipSyncParameterIds;
        };
        /**
         * デストラクタ相当の処理
         */
        CubismMotion.prototype.release = function () {
            this._motionData = void 0;
            this._motionData = null;
        };
        CubismMotion.prototype.parse = function (motionJson, size) {
            this._motionData = new CubismMotionData();
            var json = new CubismMotionJson(motionJson, size);
            this._motionData.duration = json.getMotionDuration();
            this._motionData.loop = json.isMotionLoop();
            this._motionData.curveCount = json.getMotionCurveCount();
            this._motionData.fps = json.getMotionFps();
            this._motionData.eventCount = json.getEventCount();
            if (json.isExistMotionFadeInTime()) {
                this._fadeInSeconds = (json.getMotionFadeInTime() < 0.0)
                    ? 1.0
                    : json.getMotionFadeInTime();
            }
            else {
                this._fadeInSeconds = 1.0;
            }
            if (json.isExistMotionFadeOutTime()) {
                this._fadeOutSeconds = (json.getMotionFadeOutTime() < 0.0)
                    ? 1.0
                    : json.getMotionFadeOutTime();
            }
            else {
                this._fadeOutSeconds = 1.0;
            }
            // this._motionData.curves.updateSize(this._motionData.curveCount, CubismMotionCurve, true);
            // this._motionData.segments.updateSize(json.getMotionTotalSegmentCount(), CubismMotionSegment, true);
            // this._motionData.points.updateSize(json.getMotionTotalPointCount()+500, CubismMotionPoint, true);
            // this._motionData.events.updateSize(this._motionData.eventCount, CubismMotionEvent, true);
            var totalPointCount = 0;
            var totalSegmentCount = 0;
            // Curves
            for (var curveCount = 0; curveCount < this._motionData.curveCount; ++curveCount) {
                var cubismMotionCurve = new CubismMotionCurve();
                if (json.getMotionCurveTarget(curveCount) == TargetNameModel) {
                    cubismMotionCurve.type = CubismMotionCurveTarget.CubismMotionCurveTarget_Model;
                }
                else if (json.getMotionCurveTarget(curveCount) == TargetNameParameter) {
                    cubismMotionCurve.type = CubismMotionCurveTarget.CubismMotionCurveTarget_Parameter;
                }
                else if (json.getMotionCurveTarget(curveCount) == TargetNamePartOpacity) {
                    cubismMotionCurve.type = CubismMotionCurveTarget.CubismMotionCurveTarget_PartOpacity;
                }
                cubismMotionCurve.id = json.getMotionCurveId(curveCount);
                cubismMotionCurve.baseSegmentIndex = totalSegmentCount;
                cubismMotionCurve.fadeInTime =
                    (json.isExistMotionCurveFadeInTime(curveCount))
                        ? json.getMotionCurveFadeInTime(curveCount)
                        : -1.0;
                cubismMotionCurve.fadeOutTime =
                    (json.isExistMotionCurveFadeOutTime(curveCount))
                        ? json.getMotionCurveFadeOutTime(curveCount)
                        : -1.0;
                // Segments
                for (var segmentPosition = 0; segmentPosition < json.getMotionCurveSegmentCount(curveCount);) {
                    var cubismMotionSegment = new CubismMotionSegment();
                    if (segmentPosition == 0) {
                        var cubismMotionPoint = new CubismMotionPoint();
                        cubismMotionSegment.basePointIndex = totalPointCount;
                        cubismMotionPoint.time = json.getMotionCurveSegment(curveCount, segmentPosition);
                        cubismMotionPoint.value = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                        this._motionData.points.pushBack(cubismMotionPoint);
                        totalPointCount += 1;
                        segmentPosition += 2;
                    }
                    else {
                        cubismMotionSegment.basePointIndex = totalPointCount - 1;
                    }
                    var segment = json.getMotionCurveSegment(curveCount, segmentPosition);
                    switch (segment) {
                        case CubismMotionSegmentType.CubismMotionSegmentType_Linear:
                            {
                                var cubismMotionPoint = new CubismMotionPoint();
                                cubismMotionSegment.segmentType = CubismMotionSegmentType.CubismMotionSegmentType_Linear;
                                cubismMotionSegment.evaluate = linearEvaluate;
                                cubismMotionPoint.time = json.getMotionCurveSegment(curveCount, (segmentPosition + 1));
                                cubismMotionPoint.value = json.getMotionCurveSegment(curveCount, (segmentPosition + 2));
                                this._motionData.points.pushBack(cubismMotionPoint);
                                totalPointCount += 1;
                                segmentPosition += 3;
                                break;
                            }
                        case CubismMotionSegmentType.CubismMotionSegmentType_Bezier:
                            {
                                var cubismMotionPoint = void 0;
                                cubismMotionSegment.segmentType = CubismMotionSegmentType.CubismMotionSegmentType_Bezier;
                                cubismMotionSegment.evaluate = bezierEvaluate;
                                cubismMotionPoint = new CubismMotionPoint();
                                cubismMotionPoint.time = json.getMotionCurveSegment(curveCount, (segmentPosition + 1));
                                cubismMotionPoint.value = json.getMotionCurveSegment(curveCount, (segmentPosition + 2));
                                this._motionData.points.pushBack(cubismMotionPoint);
                                cubismMotionPoint = new CubismMotionPoint();
                                cubismMotionPoint.time = json.getMotionCurveSegment(curveCount, (segmentPosition + 3));
                                cubismMotionPoint.value = json.getMotionCurveSegment(curveCount, (segmentPosition + 4));
                                this._motionData.points.pushBack(cubismMotionPoint);
                                cubismMotionPoint = new CubismMotionPoint();
                                cubismMotionPoint.time = json.getMotionCurveSegment(curveCount, (segmentPosition + 5));
                                cubismMotionPoint.value = json.getMotionCurveSegment(curveCount, (segmentPosition + 6));
                                this._motionData.points.pushBack(cubismMotionPoint);
                                totalPointCount += 3;
                                segmentPosition += 7;
                                break;
                            }
                        case CubismMotionSegmentType.CubismMotionSegmentType_Stepped:
                            {
                                var cubismMotionPoint = new CubismMotionPoint();
                                cubismMotionSegment.segmentType = CubismMotionSegmentType.CubismMotionSegmentType_Stepped;
                                cubismMotionSegment.evaluate = steppedEvaluate;
                                cubismMotionPoint.time = json.getMotionCurveSegment(curveCount, (segmentPosition + 1));
                                cubismMotionPoint.value = json.getMotionCurveSegment(curveCount, (segmentPosition + 2));
                                this._motionData.points.pushBack(cubismMotionPoint);
                                totalPointCount += 1;
                                segmentPosition += 3;
                                break;
                            }
                        case CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped:
                            {
                                var cubismMotionPoint = new CubismMotionPoint();
                                cubismMotionSegment.segmentType = CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped;
                                cubismMotionSegment.evaluate = inverseSteppedEvaluate;
                                cubismMotionPoint.time = json.getMotionCurveSegment(curveCount, (segmentPosition + 1));
                                cubismMotionPoint.value = json.getMotionCurveSegment(curveCount, (segmentPosition + 2));
                                this._motionData.points.pushBack(cubismMotionPoint);
                                totalPointCount += 1;
                                segmentPosition += 3;
                                break;
                            }
                        default:
                            {
                                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_6__["CSM_ASSERT"])(0);
                                break;
                            }
                    }
                    ++cubismMotionCurve.segmentCount;
                    ++totalSegmentCount;
                    this._motionData.segments.pushBack(cubismMotionSegment);
                }
                this._motionData.curves.pushBack(cubismMotionCurve);
            }
            for (var userdatacount = 0; userdatacount < json.getEventCount(); ++userdatacount) {
                var cubismMotionEvent = new CubismMotionEvent();
                cubismMotionEvent.fireTime = json.getEventTime(userdatacount);
                cubismMotionEvent.value = json.getEventValue(userdatacount);
                this._motionData.events.pushBack(cubismMotionEvent);
            }
            json.release();
            json = void 0;
            json = null;
        };
        /**
         * モデルのパラメータ更新
         *
         * イベント発火のチェック。
         * 入力する時間は呼ばれるモーションタイミングを０とした秒数で行う。
         *
         * @param beforeCheckTimeSeconds   前回のイベントチェック時間[秒]
         * @param motionTimeSeconds        今回の再生時間[秒]
         */
        CubismMotion.prototype.getFiredEvent = function (beforeCheckTimeSeconds, motionTimeSeconds) {
            this._firedEventValues.updateSize(0);
            // イベントの発火チェック
            for (var u = 0; u < this._motionData.eventCount; ++u) {
                if ((this._motionData.events.at(u).fireTime > beforeCheckTimeSeconds) &&
                    (this._motionData.events.at(u).fireTime <= motionTimeSeconds)) {
                    this._firedEventValues.pushBack(new csmString(this._motionData.events.at(u).value.s));
                }
            }
            return this._firedEventValues;
        };
        return CubismMotion;
    }(ACubismMotion));
    Live2DCubismFramework.CubismMotion = CubismMotion;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/motion/cubismmotioninternal.ts":
/*!******************************************************!*\
  !*** ./src/Framework/motion/cubismmotioninternal.ts ***!
  \******************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/csmvector */ "./src/Framework/type/csmvector.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

var csmVector = _type_csmvector__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].csmVector;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * @brief モーションカーブの種類
     *
     * モーションカーブの種類。
     */
    var CubismMotionCurveTarget;
    (function (CubismMotionCurveTarget) {
        CubismMotionCurveTarget[CubismMotionCurveTarget["CubismMotionCurveTarget_Model"] = 0] = "CubismMotionCurveTarget_Model";
        CubismMotionCurveTarget[CubismMotionCurveTarget["CubismMotionCurveTarget_Parameter"] = 1] = "CubismMotionCurveTarget_Parameter";
        CubismMotionCurveTarget[CubismMotionCurveTarget["CubismMotionCurveTarget_PartOpacity"] = 2] = "CubismMotionCurveTarget_PartOpacity"; // パーツの不透明度に対して
    })(CubismMotionCurveTarget = Live2DCubismFramework.CubismMotionCurveTarget || (Live2DCubismFramework.CubismMotionCurveTarget = {}));
    ;
    /**
     * @brief モーションカーブのセグメントの種類
     *
     * モーションカーブのセグメントの種類。
     */
    var CubismMotionSegmentType;
    (function (CubismMotionSegmentType) {
        CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_Linear"] = 0] = "CubismMotionSegmentType_Linear";
        CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_Bezier"] = 1] = "CubismMotionSegmentType_Bezier";
        CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_Stepped"] = 2] = "CubismMotionSegmentType_Stepped";
        CubismMotionSegmentType[CubismMotionSegmentType["CubismMotionSegmentType_InverseStepped"] = 3] = "CubismMotionSegmentType_InverseStepped"; // インバースステップ
    })(CubismMotionSegmentType = Live2DCubismFramework.CubismMotionSegmentType || (Live2DCubismFramework.CubismMotionSegmentType = {}));
    ;
    /**
     * @brief モーションカーブの制御点
     *
     * モーションカーブの制御点。
     */
    var CubismMotionPoint = /** @class */ (function () {
        function CubismMotionPoint() {
            this.time = 0.0; // 時間[秒]
            this.value = 0.0; // 値
        }
        return CubismMotionPoint;
    }());
    Live2DCubismFramework.CubismMotionPoint = CubismMotionPoint;
    ;
    /**
     * @brief モーションカーブのセグメント
     *
     * モーションカーブのセグメント。
     */
    var CubismMotionSegment = /** @class */ (function () {
        /**
         * @brief コンストラクタ
         *
         * コンストラクタ。
         */
        function CubismMotionSegment() {
            this.evaluate = null;
            this.basePointIndex = 0;
            this.segmentType = 0;
        }
        return CubismMotionSegment;
    }());
    Live2DCubismFramework.CubismMotionSegment = CubismMotionSegment;
    ;
    /**
     * @brief モーションカーブ
     *
     * モーションカーブ。
     */
    var CubismMotionCurve = /** @class */ (function () {
        function CubismMotionCurve() {
            this.type = CubismMotionCurveTarget.CubismMotionCurveTarget_Model;
            this.segmentCount = 0;
            this.baseSegmentIndex = 0;
            this.fadeInTime = 0.0;
            this.fadeOutTime = 0.0;
        }
        return CubismMotionCurve;
    }());
    Live2DCubismFramework.CubismMotionCurve = CubismMotionCurve;
    ;
    /**
    * イベント。
    */
    var CubismMotionEvent = /** @class */ (function () {
        function CubismMotionEvent() {
            this.fireTime = 0.0;
        }
        return CubismMotionEvent;
    }());
    Live2DCubismFramework.CubismMotionEvent = CubismMotionEvent;
    ;
    /**
     * @brief モーションデータ
     *
     * モーションデータ。
     */
    var CubismMotionData = /** @class */ (function () {
        function CubismMotionData() {
            this.duration = 0.0;
            this.loop = false;
            this.curveCount = 0;
            this.eventCount = 0;
            this.fps = 0.0;
            this.curves = new csmVector();
            this.segments = new csmVector();
            this.points = new csmVector();
            this.events = new csmVector();
        }
        return CubismMotionData;
    }());
    Live2DCubismFramework.CubismMotionData = CubismMotionData;
    ;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/motion/cubismmotionjson.ts":
/*!**************************************************!*\
  !*** ./src/Framework/motion/cubismmotionjson.ts ***!
  \**************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _utils_cubismjson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/cubismjson */ "./src/Framework/utils/cubismjson.ts");
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/* harmony import */ var _type_csmstring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/csmstring */ "./src/Framework/type/csmstring.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */



var csmString = _type_csmstring__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].csmString;
var CubismFramework = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismFramework;
var CubismJson = _utils_cubismjson__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismJson;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    // JSON keys
    var Meta = "Meta";
    var Duration = "Duration";
    var Loop = "Loop";
    var CurveCount = "CurveCount";
    var Fps = "Fps";
    var TotalSegmentCount = "TotalSegmentCount";
    var TotalPointCount = "TotalPointCount";
    var Curves = "Curves";
    var Target = "Target";
    var Id = "Id";
    var FadeInTime = "FadeInTime";
    var FadeOutTime = "FadeOutTime";
    var Segments = "Segments";
    var UserData = "UserData";
    var UserDataCount = "UserDataCount";
    var TotalUserDataSize = "TotalUserDataSize";
    var Time = "Time";
    var Value = "Value";
    /**
     * motion3.jsonのコンテナ。
     */
    var CubismMotionJson = /** @class */ (function () {
        /**
         * コンストラクタ
         * @param buffer motion3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        function CubismMotionJson(buffer, size) {
            this._json = CubismJson.create(buffer, size);
        }
        /**
         * デストラクタ相当の処理
         */
        CubismMotionJson.prototype.release = function () {
            CubismJson.delete(this._json);
        };
        /**
         * モーションの長さを取得する
         * @return モーションの長さ[秒]
         */
        CubismMotionJson.prototype.getMotionDuration = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(Duration).toFloat();
        };
        /**
         * モーションのループ情報の取得
         * @return true ループする
         * @return false ループしない
         */
        CubismMotionJson.prototype.isMotionLoop = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(Loop).toBoolean();
        };
        /**
         * モーションカーブの個数の取得
         * @return モーションカーブの個数
         */
        CubismMotionJson.prototype.getMotionCurveCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(CurveCount).toInt();
        };
        /**
         * モーションのフレームレートの取得
         * @return フレームレート[FPS]
         */
        CubismMotionJson.prototype.getMotionFps = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(Fps).toFloat();
        };
        /**
         * モーションのセグメントの総合計の取得
         * @return モーションのセグメントの取得
         */
        CubismMotionJson.prototype.getMotionTotalSegmentCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalSegmentCount).toInt();
        };
        /**
         * モーションのカーブの制御店の総合計の取得
         * @return モーションのカーブの制御点の総合計
         */
        CubismMotionJson.prototype.getMotionTotalPointCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalPointCount).toInt();
        };
        /**
         * モーションのフェードイン時間の存在
         * @return true 存在する
         * @return false 存在しない
         */
        CubismMotionJson.prototype.isExistMotionFadeInTime = function () {
            return !this._json.getRoot().getValueByString(Meta).getValueByString(FadeInTime).isNull();
        };
        /**
         * モーションのフェードアウト時間の存在
         * @return true 存在する
         * @return false 存在しない
         */
        CubismMotionJson.prototype.isExistMotionFadeOutTime = function () {
            return !this._json.getRoot().getValueByString(Meta).getValueByString(FadeOutTime).isNull();
        };
        /**
         * モーションのフェードイン時間の取得
         * @return フェードイン時間[秒]
         */
        CubismMotionJson.prototype.getMotionFadeInTime = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(FadeInTime).toFloat();
        };
        /**
         * モーションのフェードアウト時間の取得
         * @return フェードアウト時間[秒]
         */
        CubismMotionJson.prototype.getMotionFadeOutTime = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(FadeOutTime).toFloat();
        };
        /**
         * モーションのカーブの種類の取得
         * @param curveIndex カーブのインデックス
         * @return カーブの種類
         */
        CubismMotionJson.prototype.getMotionCurveTarget = function (curveIndex) {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Target).getRawString();
        };
        /**
         * モーションのカーブのIDの取得
         * @param curveIndex カーブのインデックス
         * @return カーブのID
         */
        CubismMotionJson.prototype.getMotionCurveId = function (curveIndex) {
            return CubismFramework.getIdManager().getId(this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Id).getRawString());
        };
        /**
         * モーションのカーブのフェードイン時間の存在
         * @param curveIndex カーブのインデックス
         * @return true 存在する
         * @return false 存在しない
         */
        CubismMotionJson.prototype.isExistMotionCurveFadeInTime = function (curveIndex) {
            return !this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeInTime).isNull();
        };
        /**
         * モーションのカーブのフェードアウト時間の存在
         * @param curveIndex カーブのインデックス
         * @return true 存在する
         * @return false 存在しない
         */
        CubismMotionJson.prototype.isExistMotionCurveFadeOutTime = function (curveIndex) {
            return !this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeOutTime).isNull();
        };
        /**
         * モーションのカーブのフェードイン時間の取得
         * @param curveIndex カーブのインデックス
         * @return フェードイン時間[秒]
         */
        CubismMotionJson.prototype.getMotionCurveFadeInTime = function (curveIndex) {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeInTime).toFloat();
        };
        /**
         * モーションのカーブのフェードアウト時間の取得
         * @param curveIndex カーブのインデックス
         * @return フェードアウト時間[秒]
         */
        CubismMotionJson.prototype.getMotionCurveFadeOutTime = function (curveIndex) {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeOutTime).toFloat();
        };
        /**
         * モーションのカーブのセグメントの個数を取得する
         * @param curveIndex カーブのインデックス
         * @return モーションのカーブのセグメントの個数
         */
        CubismMotionJson.prototype.getMotionCurveSegmentCount = function (curveIndex) {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Segments).getVector().getSize();
        };
        /**
         * モーションのカーブのセグメントの値の取得
         * @param curveIndex カーブのインデックス
         * @param segmentIndex セグメントのインデックス
         * @return セグメントの値
         */
        CubismMotionJson.prototype.getMotionCurveSegment = function (curveIndex, segmentIndex) {
            return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Segments).getValueByIndex(segmentIndex).toFloat();
        };
        /**
         * イベントの個数の取得
         * @return イベントの個数
         */
        CubismMotionJson.prototype.getEventCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(UserDataCount).toInt();
        };
        /**
         *  イベントの総文字数の取得
         * @return イベントの総文字数
         */
        CubismMotionJson.prototype.getTotalEventValueSize = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalUserDataSize).toInt();
        };
        /**
         * イベントの時間の取得
         * @param userDataIndex イベントのインデックス
         * @return イベントの時間[秒]
         */
        CubismMotionJson.prototype.getEventTime = function (userDataIndex) {
            return this._json.getRoot().getValueByString(UserData).getValueByIndex(userDataIndex).getValueByString(Time).toInt();
        };
        /**
         * イベントの取得
         * @param userDataIndex イベントのインデックス
         * @return イベントの文字列
         */
        CubismMotionJson.prototype.getEventValue = function (userDataIndex) {
            return new csmString(this._json.getRoot().getValueByString(UserData).getValueByIndex(userDataIndex).getValueByString(Value).getRawString());
        };
        return CubismMotionJson;
    }());
    Live2DCubismFramework.CubismMotionJson = CubismMotionJson;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/motion/cubismmotionmanager.ts":
/*!*****************************************************!*\
  !*** ./src/Framework/motion/cubismmotionmanager.ts ***!
  \*****************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _cubismmotionqueuemanager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismmotionqueuemanager */ "./src/Framework/motion/cubismmotionqueuemanager.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var CubismMotionQueueManager = _cubismmotionqueuemanager__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismMotionQueueManager;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * モーションの管理
     *
     * モーションの管理を行うクラス
     */
    var CubismMotionManager = /** @class */ (function (_super) {
        __extends(CubismMotionManager, _super);
        /**
         * コンストラクタ
         */
        function CubismMotionManager() {
            var _this = _super.call(this) || this;
            _this._currentPriority = 0;
            _this._reservePriority = 0;
            return _this;
        }
        /**
         * 再生中のモーションの優先度の取得
         * @return  モーションの優先度
         */
        CubismMotionManager.prototype.getCurrentPriority = function () {
            return this._currentPriority;
        };
        /**
         * 予約中のモーションの優先度を取得する。
         * @return  モーションの優先度
         */
        CubismMotionManager.prototype.getReservePriority = function () {
            return this._reservePriority;
        };
        /**
         * 予約中のモーションの優先度を設定する。
         * @param   val     優先度
         */
        CubismMotionManager.prototype.setReservePriority = function (val) {
            this._reservePriority = val;
        };
        /**
         * 優先度を設定してモーションを開始する。
         *
         * @param motion          モーション
         * @param autoDelete      再生が狩猟したモーションのインスタンスを削除するならtrue
         * @param priority        優先度
         * @return                開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するIsFinished()の引数で使用する。開始できない時は「-1」
         */
        CubismMotionManager.prototype.startMotionPriority = function (motion, autoDelete, priority) {
            if (priority == this._reservePriority) {
                this._reservePriority = 0; // 予約を解除
            }
            this._currentPriority = priority; // 再生中モーションの優先度を設定
            return _super.prototype.startMotion.call(this, motion, autoDelete, this._userTimeSeconds);
        };
        /**
         * モーションを更新して、モデルにパラメータ値を反映する。
         *
         * @param model   対象のモデル
         * @param deltaTimeSeconds    デルタ時間[秒]
         * @return  true    更新されている
         * @return  false   更新されていない
         */
        CubismMotionManager.prototype.updateMotion = function (model, deltaTimeSeconds) {
            this._userTimeSeconds += deltaTimeSeconds;
            var updated = _super.prototype.doUpdateMotion.call(this, model, this._userTimeSeconds);
            if (this.isFinished()) {
                this._currentPriority = 0; // 再生中のモーションの優先度を解除
            }
            return updated;
        };
        /**
         * モーションを予約する。
         *
         * @param   priority    優先度
         * @return  true    予約できた
         * @return  false   予約できなかった
         */
        CubismMotionManager.prototype.reserveMotion = function (priority) {
            if ((priority <= this._reservePriority) || (priority <= this._currentPriority)) {
                return false;
            }
            this._reservePriority = priority;
            return true;
        };
        return CubismMotionManager;
    }(CubismMotionQueueManager));
    Live2DCubismFramework.CubismMotionManager = CubismMotionManager;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/motion/cubismmotionqueueentry.ts":
/*!********************************************************!*\
  !*** ./src/Framework/motion/cubismmotionqueueentry.ts ***!
  \********************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _acubismmotion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./acubismmotion */ "./src/Framework/motion/acubismmotion.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

var ACubismMotion = _acubismmotion__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].ACubismMotion;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * CubismMotionQueueManagerで再生している各モーションの管理クラス。
     */
    var CubismMotionQueueEntry = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismMotionQueueEntry() {
            this._autoDelete = false;
            this._motion = null;
            this._available = true;
            this._finished = false;
            this._started = false;
            this._startTimeSeconds = -1.0;
            this._fadeInStartTimeSeconds = 0.0;
            this._endTimeSeconds = -1.0;
            this._stateTimeSeconds = 0.0;
            this._stateWeight = 0.0;
            this._lastEventCheckSeconds = 0.0;
            this._motionQueueEntryHandle = this;
        }
        /**
         * デストラクタ相当の処理
         */
        CubismMotionQueueEntry.prototype.release = function () {
            if (this._autoDelete && this._motion) {
                ACubismMotion.delete(this._motion); //
            }
        };
        /**
         * フェードアウトの開始
         * @param fadeOutSeconds フェードアウトにかかる時間[秒]
         * @param userTimeSeconds デルタ時間の積算値[秒]
         */
        CubismMotionQueueEntry.prototype.startFadeout = function (fadeoutSeconds, userTimeSeconds) {
            var newEndTimeSeconds = userTimeSeconds + fadeoutSeconds;
            if (this._endTimeSeconds < 0.0 || newEndTimeSeconds < this._endTimeSeconds) {
                this._endTimeSeconds = newEndTimeSeconds;
            }
        };
        /**
         * モーションの終了の確認
         *
         * @return true モーションが終了した
         * @return false 終了していない
         */
        CubismMotionQueueEntry.prototype.isFinished = function () {
            return this._finished;
        };
        /**
         * モーションの開始の確認
         * @return true モーションが開始した
         * @return false 開始していない
         */
        CubismMotionQueueEntry.prototype.isStarted = function () {
            return this._started;
        };
        /**
         * モーションの開始時刻の取得
         * @return モーションの開始時刻[秒]
         */
        CubismMotionQueueEntry.prototype.getStartTime = function () {
            return this._startTimeSeconds;
        };
        /**
         * フェードインの開始時刻の取得
         * @return フェードインの開始時刻[秒]
         */
        CubismMotionQueueEntry.prototype.getFadeInStartTime = function () {
            return this._fadeInStartTimeSeconds;
        };
        /**
         * フェードインの終了時刻の取得
         * @return フェードインの終了時刻の取得
         */
        CubismMotionQueueEntry.prototype.getEndTime = function () {
            return this._endTimeSeconds;
        };
        /**
         * モーションの開始時刻の設定
         * @param startTime モーションの開始時刻
         */
        CubismMotionQueueEntry.prototype.setStartTime = function (startTime) {
            this._startTimeSeconds = startTime;
        };
        /**
         * フェードインの開始時刻の設定
         * @param startTime フェードインの開始時刻[秒]
         */
        CubismMotionQueueEntry.prototype.setFadeInStartTime = function (startTime) {
            this._fadeInStartTimeSeconds = startTime;
        };
        /**
         * フェードインの終了時刻の設定
         * @param endTime フェードインの終了時刻[秒]
         */
        CubismMotionQueueEntry.prototype.setEndTime = function (endTime) {
            this._endTimeSeconds = endTime;
        };
        /**
         * モーションの終了の設定
         * @param f trueならモーションの終了
         */
        CubismMotionQueueEntry.prototype.setIsFinished = function (f) {
            this._finished = f;
        };
        /**
         * モーション開始の設定
         * @param f trueならモーションの開始
         */
        CubismMotionQueueEntry.prototype.setIsStarted = function (f) {
            this._started = f;
        };
        /**
         * モーションの有効性の確認
         * @return true モーションは有効
         * @return false モーションは無効
         */
        CubismMotionQueueEntry.prototype.isAvailable = function () {
            return this._available;
        };
        /**
         * モーションの有効性の設定
         * @param v trueならモーションは有効
         */
        CubismMotionQueueEntry.prototype.setIsAvailable = function (v) {
            this._available = v;
        };
        /**
         * モーションの状態の設定
         * @param timeSeconds 現在時刻[秒]
         * @param weight モーション尾重み
         */
        CubismMotionQueueEntry.prototype.setState = function (timeSeconds, weight) {
            this._stateTimeSeconds = timeSeconds;
            this._stateWeight = weight;
        };
        /**
         * モーションの現在時刻の取得
         * @return モーションの現在時刻[秒]
         */
        CubismMotionQueueEntry.prototype.getStateTime = function () {
            return this._stateTimeSeconds;
        };
        /**
         * モーションの重みの取得
         * @return モーションの重み
         */
        CubismMotionQueueEntry.prototype.getStateWeight = function () {
            return this._stateWeight;
        };
        /**
         * 最後にイベントの発火をチェックした時間を取得
         *
         * @return 最後にイベントの発火をチェックした時間[秒]
         */
        CubismMotionQueueEntry.prototype.getLastCheckEventTime = function () {
            return this._lastEventCheckSeconds;
        };
        /**
         * 最後にイベントをチェックした時間を設定
         * @param checkTime 最後にイベントをチェックした時間[秒]
         */
        CubismMotionQueueEntry.prototype.setLastCheckEventTime = function (checkTime) {
            this._lastEventCheckSeconds = checkTime;
        };
        return CubismMotionQueueEntry;
    }());
    Live2DCubismFramework.CubismMotionQueueEntry = CubismMotionQueueEntry;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/motion/cubismmotionqueuemanager.ts":
/*!**********************************************************!*\
  !*** ./src/Framework/motion/cubismmotionqueuemanager.ts ***!
  \**********************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _cubismmotionqueueentry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismmotionqueueentry */ "./src/Framework/motion/cubismmotionqueueentry.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/csmvector */ "./src/Framework/type/csmvector.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */


var csmVector = _type_csmvector__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].csmVector;
var CubismMotionQueueEntry = _cubismmotionqueueentry__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismMotionQueueEntry;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * モーション再生の管理
     *
     * モーション再生の管理用クラス。CubismMotionモーションなどACubismMotionのサブクラスを再生するために使用する。
     *
     * @note 再生中に別のモーションが StartMotion()された場合は、新しいモーションに滑らかに変化し旧モーションは中断する。
     *       表情用モーション、体用モーションなどを分けてモーション化した場合など、
     *       複数のモーションを同時に再生させる場合は、複数のCubismMotionQueueManagerインスタンスを使用する。
     */
    var CubismMotionQueueManager = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismMotionQueueManager() {
            this._userTimeSeconds = 0.0;
            this._eventCallBack = null;
            this._eventCustomData = null;
            this._motions = new csmVector();
        }
        /**
         * デストラクタ
         */
        CubismMotionQueueManager.prototype.release = function () {
            for (var i = 0; i < this._motions.getSize(); ++i) {
                if (this._motions.at(i)) {
                    this._motions.at(i).release();
                    this._motions.set(i, void 0);
                    this._motions.set(i, null);
                }
            }
            this._motions = null;
        };
        /**
         * 指定したモーションの開始
         *
         * 指定したモーションを開始する。同じタイプのモーションが既にある場合は、既存のモーションに終了フラグを立て、フェードアウトを開始させる。
         *
         * @param   motion          開始するモーション
         * @param   autoDelete      再生が終了したモーションのインスタンスを削除するなら true
         * @param   userTimeSeconds デルタ時間の積算値[秒]
         * @return                      開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するIsFinished()の引数で使用する。開始できない時は「-1」
         */
        CubismMotionQueueManager.prototype.startMotion = function (motion, autoDelete, userTimeSeconds) {
            if (motion == null) {
                return Live2DCubismFramework.InvalidMotionQueueEntryHandleValue;
            }
            var motionQueueEntry = null;
            // 既にモーションがあれば終了フラグを立てる
            for (var i = 0; i < this._motions.getSize(); ++i) {
                motionQueueEntry = this._motions.at(i);
                if (motionQueueEntry == null) {
                    continue;
                }
                motionQueueEntry.startFadeout(motionQueueEntry._motion.getFadeOutTime(), userTimeSeconds); // フェードアウトを開始し終了する
            }
            motionQueueEntry = new CubismMotionQueueEntry(); // 終了時に破棄する
            motionQueueEntry._autoDelete = autoDelete;
            motionQueueEntry._motion = motion;
            this._motions.pushBack(motionQueueEntry);
            return motionQueueEntry._motionQueueEntryHandle;
        };
        /**
         * 全てのモーションの終了の確認
         * @return true 全て終了している
         * @return false 終了していない
         */
        CubismMotionQueueManager.prototype.isFinished = function () {
            // ------- 処理を行う -------
            // 既にモーションがあれば終了フラグを立てる
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    ite = this._motions.erase(ite); // 削除
                    continue;
                }
                var motion = motionQueueEntry._motion;
                if (motion == null) {
                    motionQueueEntry.release();
                    motionQueueEntry = void 0;
                    motionQueueEntry = null;
                    ite = this._motions.erase(ite); // 削除
                    continue;
                }
                // ----- 終了済みの処理があれば削除する ------
                if (!motionQueueEntry.isFinished()) {
                    return false;
                }
                else {
                    ite.preIncrement();
                }
            }
            return true;
        };
        /**
         * 指定したモーションの終了の確認
         * @param motionQueueEntryNumber モーションの識別番号
         * @return true 全て終了している
         * @return false 終了していない
         */
        CubismMotionQueueManager.prototype.isFinishedByHandle = function (motionQueueEntryNumber) {
            // 既にモーションがあれば終了フラグを立てる
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end()); ite.increment()) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    continue;
                }
                if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber && !motionQueueEntry.isFinished()) {
                    return false;
                }
            }
            return true;
        };
        /**
         * 全てのモーションを停止する
         */
        CubismMotionQueueManager.prototype.stopAllMotions = function () {
            // ------- 処理を行う -------
            // 既にモーションがあれば終了フラグを立てる
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    ite = this._motions.erase(ite);
                    continue;
                }
                // ----- 終了済みの処理があれば削除する ------
                motionQueueEntry.release();
                motionQueueEntry = void 0;
                motionQueueEntry = null;
                ite = this._motions.erase(ite); // 削除
            }
        };
        /**
         * 指定したCubismMotionQueueEntryの取得

         * @param   motionQueueEntryNumber  モーションの識別番号
         * @return  指定したCubismMotionQueueEntry
         * @return  null   見つからなかった
         */
        CubismMotionQueueManager.prototype.getCubismMotionQueueEntry = function (motionQueueEntryNumber) {
            //------- 処理を行う -------
            // 既にモーションがあれば終了フラグを立てる
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end()); ite.preIncrement()) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    continue;
                }
                if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber) {
                    return motionQueueEntry;
                }
            }
            return null;
        };
        /**
         * イベントを受け取るCallbackの登録
         *
         * @param callback コールバック関数
         * @param customData コールバックに返されるデータ
         */
        CubismMotionQueueManager.prototype.setEventCallback = function (callback, customData) {
            if (customData === void 0) { customData = null; }
            this._eventCallBack = callback;
            this._eventCustomData = customData;
        };
        /**
         * モーションを更新して、モデルにパラメータ値を反映する。
         *
         * @param   model   対象のモデル
         * @param   userTimeSeconds   デルタ時間の積算値[秒]
         * @return  true    モデルへパラメータ値の反映あり
         * @return  false   モデルへパラメータ値の反映なし(モーションの変化なし)
         */
        CubismMotionQueueManager.prototype.doUpdateMotion = function (model, userTimeSeconds) {
            var updated = false;
            // ------- 処理を行う --------
            // 既にモーションがあれば終了フラグを立てる
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    ite = this._motions.erase(ite); // 削除
                    continue;
                }
                var motion = motionQueueEntry._motion;
                if (motion == null) {
                    motionQueueEntry.release();
                    motionQueueEntry = void 0;
                    motionQueueEntry = null;
                    ite = this._motions.erase(ite); // 削除
                    continue;
                }
                // ------ 値を反映する ------
                motion.updateParameters(model, motionQueueEntry, userTimeSeconds);
                updated = true;
                // ------ ユーザトリガーイベントを検査する ----
                var firedList = motion.getFiredEvent(motionQueueEntry.getLastCheckEventTime() - motionQueueEntry.getStartTime(), userTimeSeconds - motionQueueEntry.getStartTime());
                for (var i = 0; i < firedList.getSize(); ++i) {
                    this._eventCallBack(this, firedList.at(i), this._eventCustomData);
                }
                motionQueueEntry.setLastCheckEventTime(userTimeSeconds);
                // ------ 終了済みの処理があれば削除する ------
                if (motionQueueEntry.isFinished()) {
                    motionQueueEntry.release();
                    motionQueueEntry = void 0;
                    motionQueueEntry = null;
                    ite = this._motions.erase(ite); // 削除
                }
                else {
                    ite.preIncrement();
                }
            }
            return updated;
        };
        return CubismMotionQueueManager;
    }());
    Live2DCubismFramework.CubismMotionQueueManager = CubismMotionQueueManager;
    Live2DCubismFramework.InvalidMotionQueueEntryHandleValue = -1;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/physics/cubismphysics.ts":
/*!************************************************!*\
  !*** ./src/Framework/physics/cubismphysics.ts ***!
  \************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubismphysicsinternal */ "./src/Framework/physics/cubismphysicsinternal.ts");
/* harmony import */ var _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/cubismvector2 */ "./src/Framework/math/cubismvector2.ts");
/* harmony import */ var _math_cubismmath__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/cubismmath */ "./src/Framework/math/cubismmath.ts");
/* harmony import */ var _cubismphysicsjson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cubismphysicsjson */ "./src/Framework/physics/cubismphysicsjson.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */




var CubismPhysicsJson = _cubismphysicsjson__WEBPACK_IMPORTED_MODULE_3__["Live2DCubismFramework"].CubismPhysicsJson;
var CubismMath = _math_cubismmath__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].CubismMath;
var CubismPhysicsRig = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismPhysicsRig;
var CubismPhysicsSubRig = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismPhysicsSubRig;
var CubismPhysicsInput = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismPhysicsInput;
var CubismPhysicsOutput = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismPhysicsOutput;
var CubismPhysicsParticle = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismPhysicsParticle;
var CubismPhysicsSource = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismPhysicsSource;
var CubismPhysicsTargetType = _cubismphysicsinternal__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismPhysicsTargetType;
var CubismVector2 = _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismVector2;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /// physics types tags.
    var PhysicsTypeTagX = "X";
    var PhysicsTypeTagY = "Y";
    var PhysicsTypeTagAngle = "Angle";
    /// Constant of air resistance.
    var AirResistance = 5.0;
    /// Constant of maximum weight of input and output ratio.
    var MaximumWeight = 100.0;
    /// Constant of threshold of movement.
    var MovementThreshold = 0.001;
    /**
     * 物理演算クラス
     */
    var CubismPhysics = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismPhysics() {
            this._physicsRig = null;
            // set default options
            this._options = new Options();
            this._options.gravity.y = -1.0;
            this._options.gravity.x = 0;
            this._options.wind.x = 0;
            this._options.wind.y = 0;
        }
        /**
         * インスタンスの作成
         * @param buffer    physics3.jsonが読み込まれているバッファ
         * @param size      バッファのサイズ
         * @return 作成されたインスタンス
         */
        CubismPhysics.create = function (buffer, size) {
            var ret = new CubismPhysics();
            ret.parse(buffer, size);
            ret._physicsRig.gravity.y = 0;
            return ret;
        };
        /**
         * インスタンスを破棄する
         * @param physics 破棄するインスタンス
         */
        CubismPhysics.delete = function (physics) {
            if (physics != null) {
                physics.release();
                physics = null;
            }
        };
        /**
         * 物理演算の評価
         * @param model 物理演算の結果を適用するモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         */
        CubismPhysics.prototype.evaluate = function (model, deltaTimeSeconds) {
            var totalAngle;
            var weight;
            var radAngle;
            var outputValue;
            var totalTranslation = new CubismVector2();
            var currentSetting;
            var currentInput;
            var currentOutput;
            var currentParticles;
            var parameterValue;
            var parameterMaximumValue;
            var parameterMinimumValue;
            var parameterDefaultValue;
            parameterValue = model.getModel().parameters.values;
            parameterMaximumValue = model.getModel().parameters.maximumValues;
            parameterMinimumValue = model.getModel().parameters.minimumValues;
            parameterDefaultValue = model.getModel().parameters.defaultValues;
            for (var settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
                totalAngle = { angle: 0.0 };
                totalTranslation.x = 0.0;
                totalTranslation.y = 0.0;
                currentSetting = this._physicsRig.settings.at(settingIndex);
                currentInput = this._physicsRig.inputs.get(currentSetting.baseInputIndex);
                currentOutput = this._physicsRig.outputs.get(currentSetting.baseOutputIndex);
                currentParticles = this._physicsRig.particles.get(currentSetting.baseParticleIndex);
                // Load input parameters
                for (var i = 0; i < currentSetting.inputCount; ++i) {
                    weight = currentInput[i].weight / MaximumWeight;
                    if (currentInput[i].sourceParameterIndex == -1) {
                        currentInput[i].sourceParameterIndex = model.getParameterIndex(currentInput[i].source.id);
                    }
                    currentInput[i].getNormalizedParameterValue(totalTranslation, totalAngle, parameterValue[currentInput[i].sourceParameterIndex], parameterMinimumValue[currentInput[i].sourceParameterIndex], parameterMaximumValue[currentInput[i].sourceParameterIndex], parameterDefaultValue[currentInput[i].sourceParameterIndex], currentSetting.normalizationPosition, currentSetting.normalizationAngle, currentInput[0].reflect, weight);
                }
                radAngle = CubismMath.degreesToRadian(-totalAngle.angle);
                totalTranslation.x = (totalTranslation.x * CubismMath.cos(radAngle) - totalTranslation.y * CubismMath.sin(radAngle));
                totalTranslation.y = (totalTranslation.x * CubismMath.sin(radAngle) + totalTranslation.y * CubismMath.cos(radAngle));
                // Calculate particles position.
                updateParticles(currentParticles, currentSetting.particleCount, totalTranslation, totalAngle.angle, this._options.wind, MovementThreshold * currentSetting.normalizationPosition.maximum, deltaTimeSeconds, AirResistance);
                // Update output parameters.
                for (var i = 0; i < currentSetting.outputCount; ++i) {
                    var particleIndex = currentOutput[i].vertexIndex;
                    if (particleIndex < 1 || particleIndex >= currentSetting.particleCount) {
                        break;
                    }
                    if (currentOutput[i].destinationParameterIndex == -1) {
                        currentOutput[i].destinationParameterIndex = model.getParameterIndex(currentOutput[i].destination.id);
                    }
                    var translation = new CubismVector2();
                    translation.x = currentParticles[particleIndex].position.x - currentParticles[particleIndex - 1].position.x;
                    translation.y = currentParticles[particleIndex].position.y - currentParticles[particleIndex - 1].position.y;
                    outputValue = currentOutput[i].getValue(translation, currentParticles, particleIndex, currentOutput[i].reflect, this._options.gravity);
                    var destinationParameterIndex = currentOutput[i].destinationParameterIndex;
                    var outParameterValue = (!Float32Array.prototype.slice && 'subarray' in Float32Array.prototype)
                        ? JSON.parse(JSON.stringify(parameterValue.subarray(destinationParameterIndex))) // 値渡しするため、JSON.parse, JSON.stringify
                        : parameterValue.slice(destinationParameterIndex);
                    updateOutputParameterValue(outParameterValue, parameterMinimumValue[destinationParameterIndex], parameterMaximumValue[destinationParameterIndex], outputValue, currentOutput[i]);
                    // 値を反映
                    for (var offset = destinationParameterIndex, outParamIndex = 0; offset < parameterValue.length; offset++, outParamIndex++) {
                        parameterValue[offset] = outParameterValue[outParamIndex];
                    }
                }
            }
        };
        /**
         * オプションの設定
         * @param options オプション
         */
        CubismPhysics.prototype.setOptions = function (options) {
            this._options = options;
        };
        /**
         * オプションの取得
         * @return オプション
         */
        CubismPhysics.prototype.getOption = function () {
            return this._options;
        };
        /**
         * デストラクタ相当の処理
         */
        CubismPhysics.prototype.release = function () {
            this._physicsRig = void 0;
            this._physicsRig = null;
        };
        /**
         * physics3.jsonをパースする。
         * @param physicsJson physics3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        CubismPhysics.prototype.parse = function (physicsJson, size) {
            this._physicsRig = new CubismPhysicsRig();
            var json = new CubismPhysicsJson(physicsJson, size);
            this._physicsRig.gravity = json.getGravity();
            this._physicsRig.wind = json.getWind();
            this._physicsRig.subRigCount = json.getSubRigCount();
            this._physicsRig.settings.updateSize(this._physicsRig.subRigCount, CubismPhysicsSubRig, true);
            this._physicsRig.inputs.updateSize(json.getTotalInputCount(), CubismPhysicsInput, true);
            this._physicsRig.outputs.updateSize(json.getTotalOutputCount(), CubismPhysicsOutput, true);
            this._physicsRig.particles.updateSize(json.getVertexCount(), CubismPhysicsParticle, true);
            var inputIndex = 0, outputIndex = 0, particleIndex = 0;
            for (var i = 0; i < this._physicsRig.settings.getSize(); ++i) {
                this._physicsRig.settings.at(i).normalizationPosition.minimum = json.getNormalizationPositionMinimumValue(i);
                this._physicsRig.settings.at(i).normalizationPosition.maximum = json.getNormalizationPositionMaximumValue(i);
                this._physicsRig.settings.at(i).normalizationPosition.defalut = json.getNormalizationPositionDefaultValue(i);
                this._physicsRig.settings.at(i).normalizationAngle.minimum = json.getNormalizationAngleMinimumValue(i);
                this._physicsRig.settings.at(i).normalizationAngle.maximum = json.getNormalizationAngleMaximumValue(i);
                this._physicsRig.settings.at(i).normalizationAngle.defalut = json.getNormalizationAngleDefaultValue(i);
                // Input
                this._physicsRig.settings.at(i).inputCount = json.getInputCount(i);
                this._physicsRig.settings.at(i).baseInputIndex = inputIndex;
                for (var j = 0; j < this._physicsRig.settings.at(i).inputCount; ++j) {
                    this._physicsRig.inputs.at(inputIndex + j).sourceParameterIndex = -1;
                    this._physicsRig.inputs.at(inputIndex + j).weight = json.getInputWeight(i, j);
                    this._physicsRig.inputs.at(inputIndex + j).reflect = json.getInputReflect(i, j);
                    if (json.getInputType(i, j) == PhysicsTypeTagX) {
                        this._physicsRig.inputs.at(inputIndex + j).type = CubismPhysicsSource.CubismPhysicsSource_X;
                        this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue = getInputTranslationXFromNormalizedParameterValue;
                    }
                    else if (json.getInputType(i, j) == PhysicsTypeTagY) {
                        this._physicsRig.inputs.at(inputIndex + j).type = CubismPhysicsSource.CubismPhysicsSource_Y;
                        this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue = getInputTranslationYFromNormalizedParamterValue;
                    }
                    else if (json.getInputType(i, j) == PhysicsTypeTagAngle) {
                        this._physicsRig.inputs.at(inputIndex + j).type = CubismPhysicsSource.CubismPhysicsSource_Angle;
                        this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue = getInputAngleFromNormalizedParameterValue;
                    }
                    this._physicsRig.inputs.at(inputIndex + j).source.targetType = CubismPhysicsTargetType.CubismPhysicsTargetType_Parameter;
                    this._physicsRig.inputs.at(inputIndex + j).source.id = json.getInputSourceId(i, j);
                }
                inputIndex += this._physicsRig.settings.at(i).inputCount;
                // Output
                this._physicsRig.settings.at(i).outputCount = json.getOutputCount(i);
                this._physicsRig.settings.at(i).baseOutputIndex = outputIndex;
                for (var j = 0; j < this._physicsRig.settings.at(i).outputCount; ++j) {
                    this._physicsRig.outputs.at(outputIndex + j).destinationParameterIndex = -1;
                    this._physicsRig.outputs.at(outputIndex + j).vertexIndex = json.getOutputVertexIndex(i, j);
                    this._physicsRig.outputs.at(outputIndex + j).angleScale = json.getOutputAngleScale(i, j);
                    this._physicsRig.outputs.at(outputIndex + j).weight = json.getOutputWeight(i, j);
                    this._physicsRig.outputs.at(outputIndex + j).destination.targetType = CubismPhysicsTargetType.CubismPhysicsTargetType_Parameter;
                    this._physicsRig.outputs.at(outputIndex + j).destination.id = json.getOutputDestinationId(i, j);
                    if (json.getOutputType(i, j) == PhysicsTypeTagX) {
                        this._physicsRig.outputs.at(outputIndex + j).type = CubismPhysicsSource.CubismPhysicsSource_X;
                        this._physicsRig.outputs.at(outputIndex + j).getValue = getOutputTranslationX;
                        this._physicsRig.outputs.at(outputIndex + j).getScale = getOutputScaleTranslationX;
                    }
                    else if (json.getOutputType(i, j) == PhysicsTypeTagY) {
                        this._physicsRig.outputs.at(outputIndex + j).type = CubismPhysicsSource.CubismPhysicsSource_Y;
                        this._physicsRig.outputs.at(outputIndex + j).getValue = getOutputTranslationY;
                        this._physicsRig.outputs.at(outputIndex + j).getScale = getOutputScaleTranslationY;
                    }
                    else if (json.getOutputType(i, j) == PhysicsTypeTagAngle) {
                        this._physicsRig.outputs.at(outputIndex + j).type = CubismPhysicsSource.CubismPhysicsSource_Angle;
                        this._physicsRig.outputs.at(outputIndex + j).getValue = getOutputAngle;
                        this._physicsRig.outputs.at(outputIndex + j).getScale = getOutputScaleAngle;
                    }
                    this._physicsRig.outputs.at(outputIndex + j).reflect = json.getOutputReflect(i, j);
                }
                outputIndex += this._physicsRig.settings.at(i).outputCount;
                // Particle
                this._physicsRig.settings.at(i).particleCount = json.getParticleCount(i);
                this._physicsRig.settings.at(i).baseParticleIndex = particleIndex;
                for (var j = 0; j < this._physicsRig.settings.at(i).particleCount; ++j) {
                    this._physicsRig.particles.at(particleIndex + j).mobility = json.getParticleMobility(i, j);
                    this._physicsRig.particles.at(particleIndex + j).delay = json.getParticleDelay(i, j);
                    this._physicsRig.particles.at(particleIndex + j).acceleration = json.getParticleAcceleration(i, j);
                    this._physicsRig.particles.at(particleIndex + j).radius = json.getParticleRadius(i, j);
                    this._physicsRig.particles.at(particleIndex + j).position = json.getParticlePosition(i, j);
                }
                particleIndex += this._physicsRig.settings.at(i).particleCount;
            }
            this.initialize();
            json.release();
            json = void 0;
            json = null;
        };
        /**
         * 初期化する
         */
        CubismPhysics.prototype.initialize = function () {
            var strand;
            var currentSetting;
            var radius;
            for (var settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
                currentSetting = this._physicsRig.settings.at(settingIndex);
                strand = this._physicsRig.particles.get(currentSetting.baseParticleIndex);
                // Initialize the top of particle.
                strand[0].initialPosition = new CubismVector2(0.0, 0.0);
                strand[0].lastPosition = new CubismVector2(strand[0].initialPosition.x, strand[0].initialPosition.y);
                strand[0].lastGravity = new CubismVector2(0.0, -1.0);
                strand[0].lastGravity.y *= -1.0;
                strand[0].velocity = new CubismVector2(0.0, 0.0);
                strand[0].force = new CubismVector2(0.0, 0.0);
                // Initialize paritcles.
                for (var i = 1; i < currentSetting.particleCount; ++i) {
                    radius = new CubismVector2(0.0, 0.0);
                    radius.y = strand[i].radius;
                    strand[i].initialPosition = new CubismVector2(strand[i - 1].initialPosition.x + radius.x, strand[i - 1].initialPosition.y + radius.y);
                    strand[i].position = new CubismVector2(strand[i].initialPosition.x, strand[i].initialPosition.y);
                    strand[i].lastPosition = new CubismVector2(strand[i].initialPosition.x, strand[i].initialPosition.y);
                    strand[i].lastGravity = new CubismVector2(0.0, -1.0);
                    strand[i].lastGravity.y *= -1.0;
                    strand[i].velocity = new CubismVector2(0.0, 0.0);
                    strand[i].force = new CubismVector2(0.0, 0.0);
                }
            }
        };
        return CubismPhysics;
    }());
    Live2DCubismFramework.CubismPhysics = CubismPhysics;
    /**
     * 物理演算のオプション
     */
    var Options = /** @class */ (function () {
        function Options() {
            this.gravity = new CubismVector2(0, 0);
            this.wind = new CubismVector2(0, 0);
        }
        return Options;
    }());
    Live2DCubismFramework.Options = Options;
    /**
     * Gets sign.
     *
     * @param value Evaluation target value.
     *
     * @return Sign of value.
     */
    function sign(value) {
        var ret = 0;
        if (value > 0.0) {
            ret = 1;
        }
        else if (value < 0.0) {
            ret = -1;
        }
        return ret;
    }
    function getInputTranslationXFromNormalizedParameterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition, normalizationAngle, isInverted, weight) {
        targetTranslation.x += normalizeParameterValue(value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition.minimum, normalizationPosition.maximum, normalizationPosition.defalut, isInverted) * weight;
    }
    function getInputTranslationYFromNormalizedParamterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition, normalizationAngle, isInverted, weight) {
        targetTranslation.y += normalizeParameterValue(value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition.minimum, normalizationPosition.maximum, normalizationPosition.defalut, isInverted) * weight;
    }
    function getInputAngleFromNormalizedParameterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizaitionPosition, normalizationAngle, isInverted, weight) {
        targetAngle.angle += normalizeParameterValue(value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationAngle.minimum, normalizationAngle.maximum, normalizationAngle.defalut, isInverted) * weight;
    }
    function getOutputTranslationX(translation, particles, particleIndex, isInverted, parentGravity) {
        var outputValue = translation.x;
        if (isInverted) {
            outputValue *= -1.0;
        }
        return outputValue;
    }
    function getOutputTranslationY(translation, particles, particleIndex, isInverted, parentGravity) {
        var outputValue = translation.y;
        if (isInverted) {
            outputValue *= -1.0;
        }
        return outputValue;
    }
    function getOutputAngle(translation, particles, particleIndex, isInverted, parentGravity) {
        var outputValue;
        if (particleIndex >= 2) {
            parentGravity = particles[particleIndex - 1].position.substract(particles[particleIndex - 2].position);
        }
        else {
            parentGravity = parentGravity.multiplyByScaler(-1.0);
        }
        outputValue = CubismMath.directionToRadian(parentGravity, translation);
        if (isInverted) {
            outputValue *= -1.0;
        }
        return outputValue;
    }
    function getRangeValue(min, max) {
        var maxValue = CubismMath.max(min, max);
        var minValue = CubismMath.min(min, max);
        return CubismMath.abs(maxValue - minValue);
    }
    function getDefaultValue(min, max) {
        var minValue = CubismMath.min(min, max);
        return minValue + (getRangeValue(min, max) / 2.0);
    }
    function getOutputScaleTranslationX(translationScale, angleScale) {
        return JSON.parse(JSON.stringify(translationScale.x));
    }
    function getOutputScaleTranslationY(translationScale, angleScale) {
        return JSON.parse(JSON.stringify(translationScale.y));
    }
    function getOutputScaleAngle(translationScale, angleScale) {
        return JSON.parse(JSON.stringify(angleScale));
    }
    /**
     * Updates particles.
     *
     * @param strand                Target array of particle.
     * @param strandCount           Count of particle.
     * @param totalTranslation      Total translation value.
     * @param totalAngle            Total angle.
     * @param windDirection         Direction of Wind.
     * @param thresholdValue        Threshold of movement.
     * @param deltaTimeSeconds      Delta time.
     * @param airResistance         Air resistance.
     */
    function updateParticles(strand, strandCount, totalTranslation, totalAngle, windDirection, thresholdValue, deltaTimeSeconds, airResistance) {
        var totalRadian;
        var delay;
        var radian;
        var currentGravity;
        var direction = new CubismVector2(0.0, 0.0);
        var velocity = new CubismVector2(0.0, 0.0);
        var force = new CubismVector2(0.0, 0.0);
        var newDirection = new CubismVector2(0.0, 0.0);
        strand[0].position = new CubismVector2(totalTranslation.x, totalTranslation.y);
        totalRadian = CubismMath.degreesToRadian(totalAngle);
        currentGravity = CubismMath.radianToDirection(totalRadian);
        currentGravity.normalize();
        for (var i = 1; i < strandCount; ++i) {
            strand[i].force = currentGravity.multiplyByScaler(strand[i].acceleration).add(windDirection);
            strand[i].lastPosition = new CubismVector2(strand[i].position.x, strand[i].position.y);
            delay = strand[i].delay * deltaTimeSeconds * 30.0;
            direction = strand[i].position.substract(strand[i - 1].position);
            radian = CubismMath.directionToRadian(strand[i].lastGravity, currentGravity) / airResistance;
            direction.x = ((CubismMath.cos(radian) * direction.x) - (direction.y * CubismMath.sin(radian)));
            direction.y = ((CubismMath.sin(radian) * direction.x) + (direction.y * CubismMath.cos(radian)));
            strand[i].position = strand[i - 1].position.add(direction);
            velocity = strand[i].velocity.multiplyByScaler(delay);
            force = strand[i].force.multiplyByScaler(delay).multiplyByScaler(delay);
            strand[i].position = strand[i].position.add(velocity).add(force);
            newDirection = strand[i].position.substract(strand[i - 1].position);
            newDirection.normalize();
            strand[i].position = strand[i - 1].position.add(newDirection.multiplyByScaler(strand[i].radius));
            if (CubismMath.abs(strand[i].position.x) < thresholdValue) {
                strand[i].position.x = 0.0;
            }
            if (delay != 0.0) {
                strand[i].velocity = strand[i].position.substract(strand[i].lastPosition);
                strand[i].velocity = strand[i].velocity.divisionByScalar(delay);
                strand[i].velocity = strand[i].velocity.multiplyByScaler(strand[i].mobility);
            }
            strand[i].force = new CubismVector2(0.0, 0.0);
            strand[i].lastGravity = new CubismVector2(currentGravity.x, currentGravity.y);
        }
    }
    /**
     * Updates output parameter value.
     * @param parameterValue            Target parameter value.
     * @param parameterValueMinimum     Minimum of parameter value.
     * @param parameterValueMaximum     Maximum of parameter value.
     * @param translation               Translation value.
     */
    function updateOutputParameterValue(parameterValue, parameterValueMinimum, parameterValueMaximum, translation, output) {
        var outputScale;
        var value;
        var weight;
        outputScale = output.getScale(output.translationScale, output.angleScale);
        value = translation * outputScale;
        if (value < parameterValueMinimum) {
            if (value < output.valueBelowMinimum) {
                output.valueBelowMinimum = value;
            }
            value = parameterValueMinimum;
        }
        else if (value > parameterValueMaximum) {
            if (value > output.valueExceededMaximum) {
                output.valueExceededMaximum = value;
            }
            value = parameterValueMaximum;
        }
        weight = (output.weight / MaximumWeight);
        if (weight >= 1.0) {
            parameterValue[0] = value;
        }
        else {
            value = (parameterValue[0] * (1.0 - weight)) + (value * weight);
            parameterValue[0] = value;
        }
    }
    function normalizeParameterValue(value, parameterMinimum, parameterMaximum, parameterDefault, normalizedMinimum, normalizedMaximum, normalizedDefault, isInverted) {
        var result = 0.0;
        var maxValue = CubismMath.max(parameterMaximum, parameterMinimum);
        if (maxValue < value) {
            value = maxValue;
        }
        var minValue = CubismMath.min(parameterMaximum, parameterMinimum);
        if (minValue > value) {
            value = minValue;
        }
        var minNormValue = CubismMath.min(normalizedMinimum, normalizedMaximum);
        var maxNormValue = CubismMath.max(normalizedMinimum, normalizedMaximum);
        var middleNormValue = normalizedDefault;
        var middleValue = getDefaultValue(minValue, maxValue);
        var paramValue = value - middleValue;
        switch (sign(paramValue)) {
            case 1:
                {
                    var nLength = maxNormValue - middleNormValue;
                    var pLength = maxValue - middleValue;
                    if (pLength != 0.0) {
                        result = paramValue * (nLength / pLength);
                        result += middleNormValue;
                    }
                    break;
                }
            case -1:
                {
                    var nLength = minNormValue - middleNormValue;
                    var pLength = minValue - middleValue;
                    if (pLength != 0.0) {
                        result = paramValue * (nLength / pLength);
                        result += middleNormValue;
                    }
                    break;
                }
            case 0:
                {
                    result = middleNormValue;
                    break;
                }
            default:
                {
                    break;
                }
        }
        return (isInverted)
            ? result
            : (result * -1.0);
    }
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/physics/cubismphysicsinternal.ts":
/*!********************************************************!*\
  !*** ./src/Framework/physics/cubismphysicsinternal.ts ***!
  \********************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _math_cubismvector2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/cubismvector2 */ "./src/Framework/math/cubismvector2.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/csmvector */ "./src/Framework/type/csmvector.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */


var csmVector = _type_csmvector__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].csmVector;
var CubismVector2 = _math_cubismvector2__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismVector2;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 物理演算の適用先の種類
     */
    var CubismPhysicsTargetType;
    (function (CubismPhysicsTargetType) {
        CubismPhysicsTargetType[CubismPhysicsTargetType["CubismPhysicsTargetType_Parameter"] = 0] = "CubismPhysicsTargetType_Parameter";
    })(CubismPhysicsTargetType = Live2DCubismFramework.CubismPhysicsTargetType || (Live2DCubismFramework.CubismPhysicsTargetType = {}));
    /**
     * 物理演算の入力の種類
     */
    var CubismPhysicsSource;
    (function (CubismPhysicsSource) {
        CubismPhysicsSource[CubismPhysicsSource["CubismPhysicsSource_X"] = 0] = "CubismPhysicsSource_X";
        CubismPhysicsSource[CubismPhysicsSource["CubismPhysicsSource_Y"] = 1] = "CubismPhysicsSource_Y";
        CubismPhysicsSource[CubismPhysicsSource["CubismPhysicsSource_Angle"] = 2] = "CubismPhysicsSource_Angle";
    })(CubismPhysicsSource = Live2DCubismFramework.CubismPhysicsSource || (Live2DCubismFramework.CubismPhysicsSource = {}));
    /**
     * @brief 物理演算で使用する外部の力
     *
     * 物理演算で使用する外部の力。
     */
    var PhysicsJsonEffectiveForces = /** @class */ (function () {
        function PhysicsJsonEffectiveForces() {
            this.gravity = new CubismVector2(0, 0);
            this.wind = new CubismVector2(0, 0);
        }
        return PhysicsJsonEffectiveForces;
    }());
    Live2DCubismFramework.PhysicsJsonEffectiveForces = PhysicsJsonEffectiveForces;
    /**
     * 物理演算のパラメータ情報
     */
    var CubismPhysicsParameter = /** @class */ (function () {
        function CubismPhysicsParameter() {
        }
        return CubismPhysicsParameter;
    }());
    Live2DCubismFramework.CubismPhysicsParameter = CubismPhysicsParameter;
    /**
     * 物理演算の正規化情報
     */
    var CubismPhysicsNormalization = /** @class */ (function () {
        function CubismPhysicsNormalization() {
        }
        return CubismPhysicsNormalization;
    }());
    Live2DCubismFramework.CubismPhysicsNormalization = CubismPhysicsNormalization;
    /**
     * 物理演算の演算委使用する物理点の情報
     */
    var CubismPhysicsParticle = /** @class */ (function () {
        function CubismPhysicsParticle() {
            this.initialPosition = new CubismVector2(0, 0);
            this.position = new CubismVector2(0, 0);
            this.lastPosition = new CubismVector2(0, 0);
            this.lastGravity = new CubismVector2(0, 0);
            this.force = new CubismVector2(0, 0);
            this.velocity = new CubismVector2(0, 0);
        }
        return CubismPhysicsParticle;
    }());
    Live2DCubismFramework.CubismPhysicsParticle = CubismPhysicsParticle;
    /**
     * 物理演算の物理点の管理
     */
    var CubismPhysicsSubRig = /** @class */ (function () {
        function CubismPhysicsSubRig() {
            this.normalizationPosition = new CubismPhysicsNormalization();
            this.normalizationAngle = new CubismPhysicsNormalization();
        }
        return CubismPhysicsSubRig;
    }());
    Live2DCubismFramework.CubismPhysicsSubRig = CubismPhysicsSubRig;
    /**
     * 物理演算の入力情報
     */
    var CubismPhysicsInput = /** @class */ (function () {
        function CubismPhysicsInput() {
            this.source = new CubismPhysicsParameter();
        }
        return CubismPhysicsInput;
    }());
    Live2DCubismFramework.CubismPhysicsInput = CubismPhysicsInput;
    /**
     * @brief 物理演算の出力情報
     *
     * 物理演算の出力情報。
     */
    var CubismPhysicsOutput = /** @class */ (function () {
        function CubismPhysicsOutput() {
            this.destination = new CubismPhysicsParameter();
            this.translationScale = new CubismVector2(0, 0);
        }
        return CubismPhysicsOutput;
    }());
    Live2DCubismFramework.CubismPhysicsOutput = CubismPhysicsOutput;
    /**
     * @brief 物理演算のデータ
     *
     * 物理演算のデータ。
     */
    var CubismPhysicsRig = /** @class */ (function () {
        function CubismPhysicsRig() {
            this.settings = new csmVector();
            this.inputs = new csmVector();
            this.outputs = new csmVector();
            this.particles = new csmVector();
            this.gravity = new CubismVector2(0, 0);
            this.wind = new CubismVector2(0, 0);
        }
        return CubismPhysicsRig;
    }());
    Live2DCubismFramework.CubismPhysicsRig = CubismPhysicsRig;
    ;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/physics/cubismphysicsjson.ts":
/*!****************************************************!*\
  !*** ./src/Framework/physics/cubismphysicsjson.ts ***!
  \****************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _utils_cubismjson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/cubismjson */ "./src/Framework/utils/cubismjson.ts");
/* harmony import */ var _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/cubismvector2 */ "./src/Framework/math/cubismvector2.ts");
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */



var CubismFramework = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].CubismFramework;
var CubismVector2 = _math_cubismvector2__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].CubismVector2;
var CubismJson = _utils_cubismjson__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismJson;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    // JSON keys
    var Position = "Position";
    var X = "X";
    var Y = "Y";
    var Angle = "Angle";
    var Type = "Type";
    var Id = "Id";
    // Meta
    var Meta = "Meta";
    var EffectiveForces = "EffectiveForces";
    var TotalInputCount = "TotalInputCount";
    var TotalOutputCount = "TotalOutputCount";
    var PhysicsSettingCount = "PhysicsSettingCount";
    var Gravity = "Gravity";
    var Wind = "Wind";
    var VertexCount = "VertexCount";
    // PhysicsSettings
    var PhysicsSettings = "PhysicsSettings";
    var Normalization = "Normalization";
    var Minimum = "Minimum";
    var Maximum = "Maximum";
    var Default = "Default";
    var Reflect = "Reflect";
    var Weight = "Weight";
    // Input
    var Input = "Input";
    var Source = "Source";
    // Output
    var Output = "Output";
    var Scale = "Scale";
    var VertexIndex = "VertexIndex";
    var Destination = "Destination";
    // Particle
    var Vertices = "Vertices";
    var Mobility = "Mobility";
    var Delay = "Delay";
    var Radius = "Radius";
    var Acceleration = "Acceleration";
    /**
     * physics3.jsonのコンテナ。
     */
    var CubismPhysicsJson = /** @class */ (function () {
        /**
         * コンストラクタ
         * @param buffer physics3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        function CubismPhysicsJson(buffer, size) {
            this._json = CubismJson.create(buffer, size);
        }
        /**
         * デストラクタ相当の処理
         */
        CubismPhysicsJson.prototype.release = function () {
            CubismJson.delete(this._json);
        };
        /**
         * 重力の取得
         * @return 重力
         */
        CubismPhysicsJson.prototype.getGravity = function () {
            var ret = new CubismVector2(0, 0);
            ret.x = this._json.getRoot().getValueByString(Meta).getValueByString(EffectiveForces).getValueByString(Gravity).getValueByString(X).toFloat();
            ret.y = this._json.getRoot().getValueByString(Meta).getValueByString(EffectiveForces).getValueByString(Gravity).getValueByString(Y).toFloat();
            return ret;
        };
        /**
         * 風の取得
         * @return 風
         */
        CubismPhysicsJson.prototype.getWind = function () {
            var ret = new CubismVector2(0, 0);
            ret.x = this._json.getRoot().getValueByString(Meta).getValueByString(EffectiveForces).getValueByString(Wind).getValueByString(X).toFloat();
            ret.y = this._json.getRoot().getValueByString(Meta).getValueByString(EffectiveForces).getValueByString(Wind).getValueByString(Y).toFloat();
            return ret;
        };
        /**
         * 物理店の管理の個数の取得
         * @return 物理店の管理の個数
         */
        CubismPhysicsJson.prototype.getSubRigCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(PhysicsSettingCount).toInt();
        };
        /**
         * 入力の総合計の取得
         * @return 入力の総合計
         */
        CubismPhysicsJson.prototype.getTotalInputCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalInputCount).toInt();
        };
        /**
         * 出力の総合計の取得
         * @return 出力の総合計
         */
        CubismPhysicsJson.prototype.getTotalOutputCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(TotalOutputCount).toInt();
        };
        /**
         * 物理点の個数の取得
         * @return 物理点の個数
         */
        CubismPhysicsJson.prototype.getVertexCount = function () {
            return this._json.getRoot().getValueByString(Meta).getValueByString(VertexCount).toInt();
        };
        /**
         * 正規化された位置の最小値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置の最小値
         */
        CubismPhysicsJson.prototype.getNormalizationPositionMinimumValue = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Position).getValueByString(Minimum).toFloat();
        };
        /**
         * 正規化された位置の最大値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置の最大値
         */
        CubismPhysicsJson.prototype.getNormalizationPositionMaximumValue = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Position).getValueByString(Maximum).toFloat();
        };
        /**
         * 正規化された位置のデフォルト値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置のデフォルト値
         */
        CubismPhysicsJson.prototype.getNormalizationPositionDefaultValue = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Position).getValueByString(Default).toFloat();
        };
        /**
         * 正規化された角度の最小値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された角度の最小値
         */
        CubismPhysicsJson.prototype.getNormalizationAngleMinimumValue = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Angle).getValueByString(Minimum).toFloat();
        };
        /**
         * 正規化された角度の最大値の取得
         * @param physicsSettingIndex
         * @return 正規化された角度の最大値
         */
        CubismPhysicsJson.prototype.getNormalizationAngleMaximumValue = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Angle).getValueByString(Maximum).toFloat();
        };
        /**
         * 正規化された角度のデフォルト値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された角度のデフォルト値
         */
        CubismPhysicsJson.prototype.getNormalizationAngleDefaultValue = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Angle).getValueByString(Default).toFloat();
        };
        /**
         * 入力の個数の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 入力の個数
         */
        CubismPhysicsJson.prototype.getInputCount = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getVector().getSize();
        };
        /**
         * 入力の重みの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の重み
         */
        CubismPhysicsJson.prototype.getInputWeight = function (physicsSettingIndex, inputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Weight).toFloat();
        };
        /**
         * 入力の反転の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の反転
         */
        CubismPhysicsJson.prototype.getInputReflect = function (physicsSettingIndex, inputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Reflect).toBoolean();
        };
        /**
         * 入力の種類の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の種類
         */
        CubismPhysicsJson.prototype.getInputType = function (physicsSettingIndex, inputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Type).getRawString();
        };
        /**
         * 入力元のIDの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力元のID
         */
        CubismPhysicsJson.prototype.getInputSourceId = function (physicsSettingIndex, inputIndex) {
            return CubismFramework.getIdManager().getId(this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Source).getValueByString(Id).getRawString());
        };
        /**
         * 出力の個数の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 出力の個数
         */
        CubismPhysicsJson.prototype.getOutputCount = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getVector().getSize();
        };
        /**
         * 出力の物理点のインデックスの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の物理点のインデックス
         */
        CubismPhysicsJson.prototype.getOutputVertexIndex = function (physicsSettingIndex, outputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(VertexIndex).toInt();
        };
        /**
         * 出力の角度のスケールを取得する
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の角度のスケール
         */
        CubismPhysicsJson.prototype.getOutputAngleScale = function (physicsSettingIndex, outputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Scale).toFloat();
        };
        /**
         * 出力の重みの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の重み
         */
        CubismPhysicsJson.prototype.getOutputWeight = function (physicsSettingIndex, outputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Weight).toFloat();
        };
        /**
         * 出力先のIDの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex　出力のインデックス
         * @return 出力先のID
         */
        CubismPhysicsJson.prototype.getOutputDestinationId = function (physicsSettingIndex, outputIndex) {
            return CubismFramework.getIdManager().getId(this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Destination).getValueByString(Id).getRawString());
        };
        /**
         * 出力の種類の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の種類
         */
        CubismPhysicsJson.prototype.getOutputType = function (physicsSettingIndex, outputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Type).getRawString();
        };
        /**
         * 出力の反転の取得
         * @param physicsSettingIndex 物理演算のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の反転
         */
        CubismPhysicsJson.prototype.getOutputReflect = function (physicsSettingIndex, outputIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Reflect).toBoolean();
        };
        /**
         * 物理点の個数の取得
         * @param physicsSettingIndex 物理演算男設定のインデックス
         * @return 物理点の個数
         */
        CubismPhysicsJson.prototype.getParticleCount = function (physicsSettingIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getVector().getSize();
        };
        /**
         * 物理点の動きやすさの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の動きやすさ
         */
        CubismPhysicsJson.prototype.getParticleMobility = function (physicsSettingIndex, vertexIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Mobility).toFloat();
        };
        /**
         * 物理点の遅れの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の遅れ
         */
        CubismPhysicsJson.prototype.getParticleDelay = function (physicsSettingIndex, vertexIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Delay).toFloat();
        };
        /**
         * 物理点の加速度の取得
         * @param physicsSettingIndex 物理演算の設定
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の加速度
         */
        CubismPhysicsJson.prototype.getParticleAcceleration = function (physicsSettingIndex, vertexIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Acceleration).toFloat();
        };
        /**
         * 物理点の距離の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の距離
         */
        CubismPhysicsJson.prototype.getParticleRadius = function (physicsSettingIndex, vertexIndex) {
            return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Radius).toInt();
        };
        /**
         * 物理点の位置の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexInde 物理点のインデックス
         * @return 物理点の位置
         */
        CubismPhysicsJson.prototype.getParticlePosition = function (physicsSettingIndex, vertexIndex) {
            var ret = new CubismVector2(0, 0);
            ret.x = this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Position).getValueByString(X).toFloat();
            ret.y = this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Position).getValueByString(Y).toFloat();
            return ret;
        };
        return CubismPhysicsJson;
    }());
    Live2DCubismFramework.CubismPhysicsJson = CubismPhysicsJson;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/rendering/cubismrenderer.ts":
/*!***************************************************!*\
  !*** ./src/Framework/rendering/cubismrenderer.ts ***!
  \***************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/cubismmatrix44 */ "./src/Framework/math/cubismmatrix44.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

var CubismMatrix44 = _math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismMatrix44;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * モデル描画を処理するレンダラ
     *
     * サブクラスに環境依存の描画命令を記述する。
     */
    var CubismRenderer = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismRenderer() {
            this._isCulling = false;
            this._isPremultipliedAlpha = false;
            this._anisortopy = 0.0;
            this._model = null;
            this._modelColor = new CubismTextureColor();
            // 単位行列に初期化
            this._mvpMatrix4x4 = new CubismMatrix44();
            this._mvpMatrix4x4.loadIdentity();
        }
        /**
         * レンダラのインスタンスを生成して取得する
         *
         * @return レンダラのインスタンス
         */
        CubismRenderer.create = function () {
            return null;
        };
        /**
         * レンダラのインスタンスを解放する
         */
        CubismRenderer.delete = function (renderer) {
            renderer = null;
        };
        /**
         * レンダラの初期化処理を実行する
         * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
         * @param model モデルのインスタンス
         */
        CubismRenderer.prototype.initialize = function (model) {
            this._model = model;
        };
        /**
         * モデルを描画する
         */
        CubismRenderer.prototype.drawModel = function () {
            if (this.getModel() == null)
                return;
            this.doDrawModel();
        };
        /**
         * Model-View-Projection 行列をセットする
         * 配列は複製されるので、元の配列は外で破棄して良い
         * @param matrix44 Model-View-Projection 行列
         */
        CubismRenderer.prototype.setMvpMatrix = function (matrix44) {
            this._mvpMatrix4x4.setMatrix(matrix44.getArray());
        };
        /**
         * Model-View-Projection 行列を取得する
         * @return Model-View-Projection 行列
         */
        CubismRenderer.prototype.getMvpMatrix = function () {
            return this._mvpMatrix4x4;
        };
        /**
         * モデルの色をセットする
         * 各色0.0~1.0の間で指定する（1.0が標準の状態）
         * @param red 赤チャンネルの値
         * @param green 緑チャンネルの値
         * @param blue 青チャンネルの値
         * @param alpha αチャンネルの値
         */
        CubismRenderer.prototype.setModelColor = function (red, green, blue, alpha) {
            if (red < 0.0) {
                red = 0.0;
            }
            else if (red > 1.0) {
                red = 1.0;
            }
            if (green < 0.0) {
                green = 0.0;
            }
            else if (green > 1.0) {
                green = 1.0;
            }
            if (blue < 0.0) {
                blue = 0.0;
            }
            else if (blue > 1.0) {
                blue = 1.0;
            }
            if (alpha < 0.0) {
                alpha = 0.0;
            }
            else if (alpha > 1.0) {
                alpha = 1.0;
            }
            this._modelColor.R = red;
            this._modelColor.G = green;
            this._modelColor.B = blue;
            this._modelColor.A = alpha;
        };
        /**
         * モデルの色を取得する
         * 各色0.0~1.0の間で指定する(1.0が標準の状態)
         *
         * @return RGBAのカラー情報
         */
        CubismRenderer.prototype.getModelColor = function () {
            return JSON.parse(JSON.stringify(this._modelColor));
        };
        /**
         * 乗算済みαの有効・無効をセットする
         * 有効にするならtrue、無効にするならfalseをセットする
         */
        CubismRenderer.prototype.setIsPremultipliedAlpha = function (enable) {
            this._isPremultipliedAlpha = enable;
        };
        /**
         * 乗算済みαの有効・無効を取得する
         * @return true 乗算済みのα有効
         * @return false 乗算済みのα無効
         */
        CubismRenderer.prototype.isPremultipliedAlpha = function () {
            return this._isPremultipliedAlpha;
        };
        /**
         * カリング（片面描画）の有効・無効をセットする。
         * 有効にするならtrue、無効にするならfalseをセットする
         */
        CubismRenderer.prototype.setIsCulling = function (culling) {
            this._isCulling = culling;
        };
        /**
         * カリング（片面描画）の有効・無効を取得する。
         * @return true カリング有効
         * @return false カリング無効
         */
        CubismRenderer.prototype.isCulling = function () {
            return this._isCulling;
        };
        /**
         * テクスチャの異方性フィルタリングのパラメータをセットする
         * パラメータ値の影響度はレンダラの実装に依存する
         * @param n パラメータの値
         */
        CubismRenderer.prototype.setAnisotropy = function (n) {
            this._anisortopy = n;
        };
        /**
         * テクスチャの異方性フィルタリングのパラメータをセットする
         * @return 異方性フィルタリングのパラメータ
         */
        CubismRenderer.prototype.getAnisotropy = function () {
            return this._anisortopy;
        };
        /**
         * レンダリングするモデルを取得する
         * @return レンダリングするモデル
         */
        CubismRenderer.prototype.getModel = function () {
            return this._model;
        };
        return CubismRenderer;
    }());
    Live2DCubismFramework.CubismRenderer = CubismRenderer;
    var CubismBlendMode;
    (function (CubismBlendMode) {
        CubismBlendMode[CubismBlendMode["CubismBlendMode_Normal"] = 0] = "CubismBlendMode_Normal";
        CubismBlendMode[CubismBlendMode["CubismBlendMode_Additive"] = 1] = "CubismBlendMode_Additive";
        CubismBlendMode[CubismBlendMode["CubismBlendMode_Multiplicative"] = 2] = "CubismBlendMode_Multiplicative";
    })(CubismBlendMode = Live2DCubismFramework.CubismBlendMode || (Live2DCubismFramework.CubismBlendMode = {}));
    ;
    /**
     * テクスチャの色をRGBAで扱うためのクラス
     */
    var CubismTextureColor = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismTextureColor() {
            this.R = 1.0;
            this.G = 1.0;
            this.B = 1.0;
            this.A = 1.0;
        }
        return CubismTextureColor;
    }());
    Live2DCubismFramework.CubismTextureColor = CubismTextureColor;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/rendering/cubismrenderer_webgl.ts":
/*!*********************************************************!*\
  !*** ./src/Framework/rendering/cubismrenderer_webgl.ts ***!
  \*********************************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/* harmony import */ var _type_csmrectf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/csmrectf */ "./src/Framework/type/csmrectf.ts");
/* harmony import */ var _cubismrenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubismrenderer */ "./src/Framework/rendering/cubismrenderer.ts");
/* harmony import */ var _math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/cubismmatrix44 */ "./src/Framework/math/cubismmatrix44.ts");
/* harmony import */ var _type_csmmap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../type/csmmap */ "./src/Framework/type/csmmap.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../type/csmvector */ "./src/Framework/type/csmvector.ts");
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/cubismdebug */ "./src/Framework/utils/cubismdebug.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var Constant = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].Constant;
var CubismMatrix44 = _math_cubismmatrix44__WEBPACK_IMPORTED_MODULE_3__["Live2DCubismFramework"].CubismMatrix44;
var csmRect = _type_csmrectf__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].csmRect;
var csmMap = _type_csmmap__WEBPACK_IMPORTED_MODULE_4__["Live2DCubismFramework"].csmMap;
var csmVector = _type_csmvector__WEBPACK_IMPORTED_MODULE_5__["Live2DCubismFramework"].csmVector;
var CubismRenderer = _cubismrenderer__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].CubismRenderer;
var CubismBlendMode = _cubismrenderer__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].CubismBlendMode;
var CubismTextureColor = _cubismrenderer__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].CubismTextureColor;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var ColorChannelCount = 4; // 実験時に1チャンネルの場合は1、RGBだけの場合は3、アルファも含める場合は4
    var shaderCount = 10; // シェーダーの数 = マスク生成用 + (通常用 + 加算 + 乗算) * (マスク無の乗算済アルファ対応版 + マスク有の乗算済アルファ対応版 + マスク有反転の乗算済アルファ対応版)
    var s_instance;
    var s_viewport;
    var s_fbo;
    /**
     * クリッピングマスクの処理を実行するクラス
     */
    var CubismClippingManager_WebGL = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismClippingManager_WebGL() {
            this._maskRenderTexture = null;
            this._colorBuffer = null;
            this._currentFrameNo = 0;
            this._clippingMaskBufferSize = 256;
            this._clippingContextListForMask = new csmVector();
            this._clippingContextListForDraw = new csmVector();
            this._channelColors = new csmVector();
            this._tmpBoundsOnModel = new csmRect();
            this._tmpMatrix = new CubismMatrix44();
            this._tmpMatrixForMask = new CubismMatrix44();
            this._tmpMatrixForDraw = new CubismMatrix44();
            this._maskTexture = null;
            var tmp = new CubismTextureColor();
            tmp.R = 1.0;
            tmp.G = 0.0;
            tmp.B = 0.0;
            tmp.A = 0.0;
            this._channelColors.pushBack(tmp);
            tmp = new CubismTextureColor();
            tmp.R = 0.0;
            tmp.G = 1.0;
            tmp.B = 0.0;
            tmp.A = 0.0;
            this._channelColors.pushBack(tmp);
            tmp = new CubismTextureColor();
            tmp.R = 0.0;
            tmp.G = 0.0;
            tmp.B = 1.0;
            tmp.A = 0.0;
            this._channelColors.pushBack(tmp);
            tmp = new CubismTextureColor();
            tmp.R = 0.0;
            tmp.G = 0.0;
            tmp.B = 0.0;
            tmp.A = 1.0;
            this._channelColors.pushBack(tmp);
        }
        /**
         * カラーチャンネル（RGBA）のフラグを取得する
         * @param channelNo カラーチャンネル（RGBA）の番号（0:R, 1:G, 2:B, 3:A）
         */
        CubismClippingManager_WebGL.prototype.getChannelFlagAsColor = function (channelNo) {
            return this._channelColors.at(channelNo);
        };
        /**
         * テンポラリのレンダーテクスチャのアドレスを取得する
         * FrameBufferObjectが存在しない場合、新しく生成する
         *
         * @return レンダーテクスチャのアドレス
         */
        CubismClippingManager_WebGL.prototype.getMaskRenderTexture = function () {
            var ret = 0;
            // テンポラリのRenderTextureを取得する
            if (this._maskTexture && this._maskTexture.texture != 0) // 前回使ったものを返す
             {
                this._maskTexture.frameNo = this._currentFrameNo;
                ret = this._maskTexture.texture;
            }
            if (ret == 0) {
                // FrameBufferObjectが存在しない場合、新しく生成する
                // クリッピングバッファサイズを取得
                var size = this._clippingMaskBufferSize;
                this._colorBuffer = this.gl.createTexture();
                this.gl.bindTexture(this.gl.TEXTURE_2D, this._colorBuffer);
                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, size, size, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
                this.gl.bindTexture(this.gl.TEXTURE_2D, null);
                ret = this.gl.createFramebuffer();
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, ret);
                this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this._colorBuffer, 0);
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo);
                this._maskTexture = new CubismRenderTextureResource(this._currentFrameNo, ret);
            }
            return ret;
        };
        /**
         * WebGLレンダリングコンテキストを設定する
         * @param gl WebGLレンダリングコンテキスト
         */
        CubismClippingManager_WebGL.prototype.setGL = function (gl) {
            this.gl = gl;
        };
        /**
         * マスクされる描画オブジェクト群全体を囲む矩形（モデル座標系）を計算する
         * @param model モデルのインスタンス
         * @param clippingContext クリッピングマスクのコンテキスト
         */
        CubismClippingManager_WebGL.prototype.calcClippedDrawTotalBounds = function (model, clippingContext) {
            // 被クリッピングマスク（マスクされる描画オブジェクト）の全体の矩形
            var clippedDrawTotalMinX = Number.MAX_VALUE;
            var clippedDrawTotalMinY = Number.MAX_VALUE;
            var clippedDrawTotalMaxX = Number.MIN_VALUE;
            var clippedDrawTotalMaxY = Number.MIN_VALUE;
            // このマスクが実際に必要か判定する
            // このクリッピングを利用する「描画オブジェクト」がひとつでも使用可能であればマスクを生成する必要がある
            var clippedDrawCount = clippingContext._clippedDrawableIndexList.length;
            for (var clippedDrawableIndex = 0; clippedDrawableIndex < clippedDrawCount; clippedDrawableIndex++) {
                // マスクを使用する描画オブジェクトの描画される矩形を求める
                var drawableIndex = clippingContext._clippedDrawableIndexList[clippedDrawableIndex];
                var drawableVertexCount = model.getDrawableVertexCount(drawableIndex);
                var drawableVertexes = model.getDrawableVertices(drawableIndex);
                var minX = Number.MAX_VALUE;
                var minY = Number.MAX_VALUE;
                var maxX = Number.MIN_VALUE;
                var maxY = Number.MIN_VALUE;
                var loop = drawableVertexCount * Constant.vertexStep;
                for (var pi = Constant.vertexOffset; pi < loop; pi += Constant.vertexStep) {
                    var x = drawableVertexes[pi];
                    var y = drawableVertexes[pi + 1];
                    if (x < minX) {
                        minX = x;
                    }
                    if (x > maxX) {
                        maxX = x;
                    }
                    if (y < minY) {
                        minY = y;
                    }
                    if (y > maxY) {
                        maxY = y;
                    }
                }
                // 有効な点が一つも取れなかったのでスキップ
                if (minX == Number.MAX_VALUE) {
                    continue;
                }
                //　全体の矩形に反映
                if (minX < clippedDrawTotalMinX) {
                    clippedDrawTotalMinX = minX;
                }
                if (minY < clippedDrawTotalMinY) {
                    clippedDrawTotalMinY = minY;
                }
                if (maxX > clippedDrawTotalMaxX) {
                    clippedDrawTotalMaxX = maxX;
                }
                if (maxY > clippedDrawTotalMaxY) {
                    clippedDrawTotalMaxY = maxY;
                }
                if (clippedDrawTotalMinX == Number.MAX_VALUE) {
                    clippingContext._allClippedDrawRect.x = 0.0;
                    clippingContext._allClippedDrawRect.y = 0.0;
                    clippingContext._allClippedDrawRect.width = 0.0;
                    clippingContext._allClippedDrawRect.height = 0.0;
                    clippingContext._isUsing = false;
                }
                else {
                    clippingContext._isUsing = true;
                    var w = clippedDrawTotalMaxX - clippedDrawTotalMinX;
                    var h = clippedDrawTotalMaxY - clippedDrawTotalMinY;
                    clippingContext._allClippedDrawRect.x = clippedDrawTotalMinX;
                    clippingContext._allClippedDrawRect.y = clippedDrawTotalMinY;
                    clippingContext._allClippedDrawRect.width = w;
                    clippingContext._allClippedDrawRect.height = h;
                }
            }
        };
        /**
         * デストラクタ相当の処理
         */
        CubismClippingManager_WebGL.prototype.release = function () {
            for (var i = 0; i < this._clippingContextListForMask.getSize(); i++) {
                if (this._clippingContextListForMask.at(i)) {
                    this._clippingContextListForMask.at(i).release();
                    this._clippingContextListForMask.set(i, void 0);
                }
                this._clippingContextListForMask.set(i, null);
            }
            this._clippingContextListForMask = null;
            // _clippingContextListForDrawは_clippingContextListForMaskにあるインスタンスを指している。上記の処理により要素ごとのDELETEは不要。
            for (var i = 0; i < this._clippingContextListForDraw.getSize(); i++) {
                this._clippingContextListForDraw.set(i, null);
            }
            this._clippingContextListForDraw = null;
            if (this._maskTexture) {
                this.gl.deleteFramebuffer(this._maskTexture.texture);
                this._maskTexture = null;
            }
            for (var i = 0; i < this._channelColors.getSize(); i++) {
                this._channelColors.set(i, null);
            }
            this._channelColors = null;
            // テクスチャ解放
            this.gl.deleteTexture(this._colorBuffer);
            this._colorBuffer = null;
        };
        /**
         * マネージャの初期化処理
         * クリッピングマスクを使う描画オブジェクトの登録を行う
         * @param model モデルのインスタンス
         * @param drawableCount 描画オブジェクトの数
         * @param drawableMasks 描画オブジェクトをマスクする描画オブジェクトのインデックスのリスト
         * @param drawableCounts 描画オブジェクトをマスクする描画オブジェクトの数
         */
        CubismClippingManager_WebGL.prototype.initialize = function (model, drawableCount, drawableMasks, drawableMaskCounts) {
            // クリッピングマスクを使う描画オブジェクトをすべて登録する
            // クリッピングマスクは、通常数個程度に限定して使うものとする
            for (var i = 0; i < drawableCount; i++) {
                if (drawableMaskCounts[i] <= 0) {
                    // クリッピングマスクが使用されていないアートメッシュ（多くの場合使用しない）
                    this._clippingContextListForDraw.pushBack(null);
                    continue;
                }
                // 既にあるClipContextと同じかチェックする
                var clippingContext = this.findSameClip(drawableMasks[i], drawableMaskCounts[i]);
                if (clippingContext == null) {
                    // 同一のマスクが存在していない場合は生成する
                    clippingContext = new CubismClippingContext(this, drawableMasks[i], drawableMaskCounts[i]);
                    this._clippingContextListForMask.pushBack(clippingContext);
                }
                clippingContext.addClippedDrawable(i);
                this._clippingContextListForDraw.pushBack(clippingContext);
            }
        };
        /**
         * クリッピングコンテキストを作成する。モデル描画時に実行する。
         * @param model モデルのインスタンス
         * @param renderer レンダラのインスタンス
         */
        CubismClippingManager_WebGL.prototype.setupClippingContext = function (model, renderer) {
            this._currentFrameNo++;
            // 全てのクリッピングを用意する
            // 同じクリップ（複数の場合はまとめて一つのクリップ）を使う場合は1度だけ設定する
            var usingClipCount = 0;
            for (var clipIndex = 0; clipIndex < this._clippingContextListForMask.getSize(); clipIndex++) {
                // 1つのクリッピングマスクに関して
                var cc = this._clippingContextListForMask.at(clipIndex);
                // このクリップを利用する描画オブジェクト群全体を囲む矩形を計算
                this.calcClippedDrawTotalBounds(model, cc);
                if (cc._isUsing) {
                    usingClipCount++; // 使用中としてカウント
                }
            }
            // マスク作成処理
            if (usingClipCount > 0) {
                // 生成したFrameBufferと同じサイズでビューポートを設定
                this.gl.viewport(0, 0, this._clippingMaskBufferSize, this._clippingMaskBufferSize);
                // マスクをactiveにする
                this._maskRenderTexture = this.getMaskRenderTexture();
                // モデル描画時にDrawMeshNowに渡される変換(モデルtoワールド座標変換)
                var modelToWorldF = renderer.getMvpMatrix();
                renderer.preDraw(); // バッファをクリアする
                // 各マスクのレイアウトを決定していく
                this.setupLayoutBounds(usingClipCount);
                // ---------- マスク描画処理 ----------
                // マスク用RenderTextureをactiveにセット
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._maskRenderTexture);
                // マスクをクリアする
                // (仮仕様) 1が無効（描かれない）領域、0が有効（描かれる）領域。（シェーダーCd*Csで0に近い値をかけてマスクを作る。1をかけると何も起こらない）
                this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT);
                // 実際にマスクを生成する
                // 全てのマスクをどのようにレイアウトして描くかを決定し、ClipContext, ClippedDrawContextに記憶する
                for (var clipIndex = 0; clipIndex < this._clippingContextListForMask.getSize(); clipIndex++) {
                    // --- 実際に1つのマスクを描く ---
                    var clipContext = this._clippingContextListForMask.at(clipIndex);
                    var allClipedDrawRect = clipContext._allClippedDrawRect; // このマスクを使う、すべての描画オブジェクトの論理座標上の囲み矩形
                    var layoutBoundsOnTex01 = clipContext._layoutBounds; // この中にマスクを収める
                    // モデル座標上の矩形を、適宜マージンを付けて使う
                    var MARGIN = 0.05;
                    this._tmpBoundsOnModel.setRect(allClipedDrawRect);
                    this._tmpBoundsOnModel.expand(allClipedDrawRect.width * MARGIN, allClipedDrawRect.height * MARGIN);
                    //########## 本来は割り当てられた領域の全体を使わず必要最低限のサイズがよい
                    // シェーダ用の計算式を求める。回転を考慮しない場合は以下のとおり
                    // movePeriod' = movePeriod * scaleX + offX		  [[ movePeriod' = (movePeriod - tmpBoundsOnModel.movePeriod)*scale + layoutBoundsOnTex01.movePeriod ]]
                    var scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
                    var scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
                    // マスク生成時に使う行列を求める
                    {
                        // シェーダに渡す行列を求める <<<<<<<<<<<<<<<<<<<<<<<< 要最適化（逆順に計算すればシンプルにできる）
                        this._tmpMatrix.loadIdentity();
                        {
                            // layout0..1 を -1..1に変換
                            this._tmpMatrix.translateRelative(-1.0, -1.0);
                            this._tmpMatrix.scaleRelative(2.0, 2.0);
                        }
                        {
                            // view to layout0..1
                            this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y);
                            this._tmpMatrix.scaleRelative(scaleX, scaleY); // new = [translate][scale]
                            this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y);
                            // new = [translate][scale][translate]
                        }
                        // tmpMatrixForMaskが計算結果
                        this._tmpMatrixForMask.setMatrix(this._tmpMatrix.getArray());
                    }
                    //--------- draw時の mask 参照用行列を計算
                    {
                        // シェーダに渡す行列を求める <<<<<<<<<<<<<<<<<<<<<<<< 要最適化（逆順に計算すればシンプルにできる）
                        this._tmpMatrix.loadIdentity();
                        {
                            this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y);
                            this._tmpMatrix.scaleRelative(scaleX, scaleY); // new = [translate][scale]
                            this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y);
                            // new = [translate][scale][translate]
                        }
                        this._tmpMatrixForDraw.setMatrix(this._tmpMatrix.getArray());
                    }
                    clipContext._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray());
                    clipContext._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
                    var clipDrawCount = clipContext._clippingIdCount;
                    for (var i = 0; i < clipDrawCount; i++) {
                        var clipDrawIndex = clipContext._clippingIdList[i];
                        // 頂点情報が更新されておらず、信頼性がない場合は描画をパスする
                        if (!model.getDrawableDynamicFlagVertexPositionsDidChange(clipDrawIndex)) {
                            continue;
                        }
                        renderer.setIsCulling(model.getDrawableCulling(clipDrawIndex) != false);
                        // 今回専用の変換を適用して描く
                        // チャンネルも切り替える必要がある(A,R,G,B)
                        renderer.setClippingContextBufferForMask(clipContext);
                        renderer.drawMesh(model.getDrawableTextureIndices(clipDrawIndex), model.getDrawableVertexIndexCount(clipDrawIndex), model.getDrawableVertexCount(clipDrawIndex), model.getDrawableVertexIndices(clipDrawIndex), model.getDrawableVertices(clipDrawIndex), model.getDrawableVertexUvs(clipDrawIndex), model.getDrawableOpacity(clipDrawIndex), CubismBlendMode.CubismBlendMode_Normal, // クリッピングは通常描画を強制
                        false // マスク生成時はクリッピングの反転使用は全く関係がない
                        );
                    }
                }
                // --- 後処理 ---
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo); // 描画対象を戻す
                renderer.setClippingContextBufferForMask(null);
                this.gl.viewport(s_viewport[0], s_viewport[1], s_viewport[2], s_viewport[3]);
            }
        };
        /**
         * 既にマスクを作っているかを確認
         * 作っている様であれば該当するクリッピングマスクのインスタンスを返す
         * 作っていなければNULLを返す
         * @param drawableMasks 描画オブジェクトをマスクする描画オブジェクトのリスト
         * @param drawableMaskCounts 描画オブジェクトをマスクする描画オブジェクトの数
         * @return 該当するクリッピングマスクが存在すればインスタンスを返し、なければNULLを返す
         */
        CubismClippingManager_WebGL.prototype.findSameClip = function (drawableMasks, drawableMaskCounts) {
            // 作成済みClippingContextと一致するか確認
            for (var i = 0; i < this._clippingContextListForMask.getSize(); i++) {
                var clippingContext = this._clippingContextListForMask.at(i);
                var count = clippingContext._clippingIdCount;
                // 個数が違う場合は別物
                if (count != drawableMaskCounts) {
                    continue;
                }
                var sameCount = 0;
                // 同じIDを持つか確認。配列の数が同じなので、一致した個数が同じなら同じ物を持つとする
                for (var j = 0; j < count; j++) {
                    var clipId = clippingContext._clippingIdList[j];
                    for (var k = 0; k < count; k++) {
                        if (drawableMasks[k] == clipId) {
                            sameCount++;
                            break;
                        }
                    }
                }
                if (sameCount == count) {
                    return clippingContext;
                }
            }
            return null; // 見つからなかった
        };
        /**
         * クリッピングコンテキストを配置するレイアウト
         * 一つのレンダーテクスチャを極力いっぱいに使ってマスクをレイアウトする
         * マスクグループの数が4以下ならRGBA各チャンネルに一つずつマスクを配置し、5以上6以下ならRGBAを2,2,1,1と配置する。
         *
         * @param usingClipCount 配置するクリッピングコンテキストの数
         */
        CubismClippingManager_WebGL.prototype.setupLayoutBounds = function (usingClipCount) {
            // ひとつのRenderTextureを極力いっぱいに使ってマスクをレイアウトする
            // マスクグループの数が4以下ならRGBA各チャンネルに1つずつマスクを配置し、5以上6以下ならRGBAを2,2,1,1と配置する
            // RGBAを順番に使っていく
            var div = usingClipCount / ColorChannelCount; //　1チャンネルに配置する基本のマスク
            var mod = usingClipCount % ColorChannelCount; // 余り、この番号のチャンネルまでに一つずつ配分する
            // 小数点は切り捨てる
            div = ~~div;
            mod = ~~mod;
            // RGBAそれぞれのチャンネルを用意していく（0:R, 1:G, 2:B, 3:A）
            var curClipIndex = 0; // 順番に設定していく
            for (var channelNo = 0; channelNo < ColorChannelCount; channelNo++) {
                // このチャンネルにレイアウトする数
                var layoutCount = div + (channelNo < mod ? 1 : 0);
                // 分割方法を決定する
                if (layoutCount == 0) {
                    // 何もしない
                }
                else if (layoutCount == 1) {
                    // 全てをそのまま使う
                    var clipContext = this._clippingContextListForMask.at(curClipIndex++);
                    clipContext._layoutChannelNo = channelNo;
                    clipContext._layoutBounds.x = 0.0;
                    clipContext._layoutBounds.y = 0.0;
                    clipContext._layoutBounds.width = 1.0;
                    clipContext._layoutBounds.height = 1.0;
                }
                else if (layoutCount == 2) {
                    for (var i = 0; i < layoutCount; i++) {
                        var xpos = i % 2;
                        // 小数点は切り捨てる
                        xpos = ~~xpos;
                        var cc = this._clippingContextListForMask.at(curClipIndex++);
                        cc._layoutChannelNo = channelNo;
                        cc._layoutBounds.x = xpos * 0.5;
                        cc._layoutBounds.y = 0.0;
                        cc._layoutBounds.width = 0.5;
                        cc._layoutBounds.height = 1.0;
                        // UVを2つに分解して使う
                    }
                }
                else if (layoutCount <= 4) {
                    // 4分割して使う
                    for (var i = 0; i < layoutCount; i++) {
                        var xpos = i % 2;
                        var ypos = i / 2;
                        // 小数点は切り捨てる
                        xpos = ~~xpos;
                        ypos = ~~ypos;
                        var cc = this._clippingContextListForMask.at(curClipIndex++);
                        cc._layoutChannelNo = channelNo;
                        cc._layoutBounds.x = xpos * 0.5;
                        cc._layoutBounds.y = ypos * 0.5;
                        cc._layoutBounds.width = 0.5;
                        cc._layoutBounds.height = 0.5;
                    }
                }
                else if (layoutCount <= 9) {
                    // 9分割して使う
                    for (var i = 0; i < layoutCount; i++) {
                        var xpos = i % 3;
                        var ypos = i / 3;
                        // 小数点は切り捨てる
                        xpos = ~~xpos;
                        ypos = ~~ypos;
                        var cc = this._clippingContextListForMask.at(curClipIndex++);
                        cc._layoutChannelNo = channelNo;
                        cc._layoutBounds.x = xpos / 3.0;
                        cc._layoutBounds.y = ypos / 3.0;
                        cc._layoutBounds.width = 1.0 / 3.0;
                        cc._layoutBounds.height = 1.0 / 3.0;
                    }
                }
                else {
                    Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_6__["CubismLogError"])("not supported mask count : {0}", layoutCount);
                }
            }
        };
        /**
         * カラーバッファを取得する
         * @return カラーバッファ
         */
        CubismClippingManager_WebGL.prototype.getColorBuffer = function () {
            return this._colorBuffer;
        };
        /**
         * 画面描画に使用するクリッピングマスクのリストを取得する
         * @return 画面描画に使用するクリッピングマスクのリスト
         */
        CubismClippingManager_WebGL.prototype.getClippingContextListForDraw = function () {
            return this._clippingContextListForDraw;
        };
        /**
         * クリッピングマスクバッファのサイズを設定する
         * @param size クリッピングマスクバッファのサイズ
         */
        CubismClippingManager_WebGL.prototype.setClippingMaskBufferSize = function (size) {
            this._clippingMaskBufferSize = size;
        };
        /**
         * クリッピングマスクバッファのサイズを取得する
         * @return クリッピングマスクバッファのサイズ
         */
        CubismClippingManager_WebGL.prototype.getClippingMaskBufferSize = function () {
            return this._clippingMaskBufferSize;
        };
        return CubismClippingManager_WebGL;
    }());
    Live2DCubismFramework.CubismClippingManager_WebGL = CubismClippingManager_WebGL;
    /**
     * レンダーテクスチャのリソースを定義する構造体
     * クリッピングマスクで使用する
     */
    var CubismRenderTextureResource = /** @class */ (function () {
        /**
         * 引数付きコンストラクタ
         * @param frameNo レンダラーのフレーム番号
         * @param texture テクスチャのアドレス
         */
        function CubismRenderTextureResource(frameNo, texture) {
            this.frameNo = frameNo;
            this.texture = texture;
        }
        return CubismRenderTextureResource;
    }());
    Live2DCubismFramework.CubismRenderTextureResource = CubismRenderTextureResource;
    /**
     * クリッピングマスクのコンテキスト
     */
    var CubismClippingContext = /** @class */ (function () {
        /**
         * 引数付きコンストラクタ
         */
        function CubismClippingContext(manager, clippingDrawableIndices, clipCount) {
            this._owner = manager;
            // クリップしている（＝マスク用の）Drawableのインデックスリスト
            this._clippingIdList = clippingDrawableIndices;
            // マスクの数
            this._clippingIdCount = clipCount;
            this._allClippedDrawRect = new csmRect();
            this._layoutBounds = new csmRect();
            this._clippedDrawableIndexList = new Array();
            this._matrixForMask = new CubismMatrix44();
            this._matrixForDraw = new CubismMatrix44();
        }
        /**
         * デストラクタ相当の処理
         */
        CubismClippingContext.prototype.release = function () {
            if (this._layoutBounds != null) {
                this._layoutBounds = null;
            }
            if (this._allClippedDrawRect != null) {
                this._allClippedDrawRect = null;
            }
            if (this._clippedDrawableIndexList != null) {
                this._clippedDrawableIndexList = null;
            }
        };
        /**
         * このマスクにクリップされる描画オブジェクトを追加する
         *
         * @param drawableIndex クリッピング対象に追加する描画オブジェクトのインデックス
         */
        CubismClippingContext.prototype.addClippedDrawable = function (drawableIndex) {
            this._clippedDrawableIndexList.push(drawableIndex);
        };
        /**
         * このマスクを管理するマネージャのインスタンスを取得する
         * @return クリッピングマネージャのインスタンス
         */
        CubismClippingContext.prototype.getClippingManager = function () {
            return this._owner;
        };
        CubismClippingContext.prototype.setGl = function (gl) {
            this._owner.setGL(gl);
        };
        return CubismClippingContext;
    }());
    Live2DCubismFramework.CubismClippingContext = CubismClippingContext;
    /**
     * WebGL用のシェーダープログラムを生成・破棄するクラス
     * シングルトンなクラスであり、CubismShader_WebGL.getInstanceからアクセスする。
     */
    var CubismShader_WebGL = /** @class */ (function () {
        /**
         * privateなコンストラクタ
         */
        function CubismShader_WebGL() {
            this._shaderSets = new csmVector();
        }
        /**
         * インスタンスを取得する（シングルトン）
         * @return インスタンス
         */
        CubismShader_WebGL.getInstance = function () {
            if (s_instance == null) {
                s_instance = new CubismShader_WebGL();
                return s_instance;
            }
            return s_instance;
        };
        /**
         * インスタンスを開放する（シングルトン）
         */
        CubismShader_WebGL.deleteInstance = function () {
            if (s_instance) {
                s_instance.release();
                s_instance = null;
            }
        };
        /**
         * デストラクタ相当の処理
         */
        CubismShader_WebGL.prototype.release = function () {
            this.releaseShaderProgram();
        };
        /**
         * シェーダープログラムの一連のセットアップを実行する
         * @param renderer レンダラのインスタンス
         * @param textureId GPUのテクスチャID
         * @param vertexCount ポリゴンメッシュの頂点数
         * @param vertexArray ポリゴンメッシュの頂点配列
         * @param indexArray　インデックスバッファの頂点配列
         * @param uvArray uv配列
         * @param opacity 不透明度
         * @param colorBlendMode カラーブレンディングのタイプ
         * @param baseColor ベースカラー
         * @param isPremultipliedAlpha 乗算済みアルファかどうか
         * @param matrix4x4 Model-View-Projection行列
         * @param invertedMask マスクを反転して使用するフラグ
         */
        CubismShader_WebGL.prototype.setupShaderProgram = function (renderer, textureId, vertexCount, vertexArray, indexArray, uvArray, bufferData, opacity, colorBlendMode, baseColor, isPremultipliedAlpha, matrix4x4, invertedMask) {
            if (!isPremultipliedAlpha) {
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_6__["CubismLogError"])("NoPremultipliedAlpha is not allowed");
            }
            if (this._shaderSets.getSize() == 0) {
                this.generateShaders();
            }
            // Blending
            var SRC_COLOR;
            var DST_COLOR;
            var SRC_ALPHA;
            var DST_ALPHA;
            if (renderer.getClippingContextBufferForMask() != null) // マスク生成時
             {
                var shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_SetupMask);
                this.gl.useProgram(shaderSet.shaderProgram);
                // テクスチャ設定
                this.gl.activeTexture(this.gl.TEXTURE0);
                this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
                this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
                // 頂点配列の設定(VBO)
                if (bufferData.vertex == null) {
                    bufferData.vertex = this.gl.createBuffer();
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.vertex);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
                this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
                this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, 0, 0);
                // テクスチャ頂点の設定
                if (bufferData.uv == null) {
                    bufferData.uv = this.gl.createBuffer();
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.uv);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
                this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
                this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
                // チャンネル
                var channelNo = renderer.getClippingContextBufferForMask()._layoutChannelNo;
                var colorChannel = renderer.getClippingContextBufferForMask().getClippingManager().getChannelFlagAsColor(channelNo);
                this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.R, colorChannel.G, colorChannel.B, colorChannel.A);
                this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer.getClippingContextBufferForMask()._matrixForMask.getArray());
                var rect = renderer.getClippingContextBufferForMask()._layoutBounds;
                this.gl.uniform4f(shaderSet.uniformBaseColorLocation, rect.x * 2.0 - 1.0, rect.y * 2.0 - 1.0, rect.getRight() * 2.0 - 1.0, rect.getBottom() * 2.0 - 1.0);
                SRC_COLOR = this.gl.ZERO;
                DST_COLOR = this.gl.ONE_MINUS_SRC_COLOR;
                SRC_ALPHA = this.gl.ZERO;
                DST_ALPHA = this.gl.ONE_MINUS_SRC_ALPHA;
            }
            else // マスク生成以外の場合
             {
                var masked = renderer.getClippingContextBufferForDraw() != null; // この描画オブジェクトはマスク対象か
                var offset = (masked ? (invertedMask ? 2 : 1) : 0);
                var shaderSet = new CubismShaderSet();
                switch (colorBlendMode) {
                    case CubismBlendMode.CubismBlendMode_Normal:
                    default:
                        shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_NormalPremultipliedAlpha + offset);
                        SRC_COLOR = this.gl.ONE;
                        DST_COLOR = this.gl.ONE_MINUS_SRC_ALPHA;
                        SRC_ALPHA = this.gl.ONE;
                        DST_ALPHA = this.gl.ONE_MINUS_SRC_ALPHA;
                        break;
                    case CubismBlendMode.CubismBlendMode_Additive:
                        shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_AddPremultipliedAlpha + offset);
                        SRC_COLOR = this.gl.ONE;
                        DST_COLOR = this.gl.ONE;
                        SRC_ALPHA = this.gl.ZERO;
                        DST_ALPHA = this.gl.ONE;
                        break;
                    case CubismBlendMode.CubismBlendMode_Multiplicative:
                        shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_MultPremultipliedAlpha + offset);
                        SRC_COLOR = this.gl.DST_COLOR;
                        DST_COLOR = this.gl.ONE_MINUS_SRC_ALPHA;
                        SRC_ALPHA = this.gl.ZERO;
                        DST_ALPHA = this.gl.ONE;
                        break;
                }
                this.gl.useProgram(shaderSet.shaderProgram);
                // 頂点配列の設定
                if (bufferData.vertex == null) {
                    bufferData.vertex = this.gl.createBuffer();
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.vertex);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
                this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
                this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, 0, 0);
                // テクスチャ頂点の設定
                if (bufferData.uv == null) {
                    bufferData.uv = this.gl.createBuffer();
                }
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.uv);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
                this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
                this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
                if (masked) {
                    this.gl.activeTexture(this.gl.TEXTURE1);
                    var tex = renderer.getClippingContextBufferForDraw().getClippingManager().getColorBuffer();
                    this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
                    this.gl.uniform1i(shaderSet.samplerTexture1Location, 1);
                    // view座標をClippingContextの座標に変換するための行列を設定
                    this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer.getClippingContextBufferForDraw()._matrixForDraw.getArray());
                    // 使用するカラーチャンネルを設定
                    var channelNo = renderer.getClippingContextBufferForDraw()._layoutChannelNo;
                    var colorChannel = renderer.getClippingContextBufferForDraw().getClippingManager().getChannelFlagAsColor(channelNo);
                    this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.R, colorChannel.G, colorChannel.B, colorChannel.A);
                }
                // テクスチャ設定
                this.gl.activeTexture(this.gl.TEXTURE0);
                this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
                this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
                // 座標変換
                this.gl.uniformMatrix4fv(shaderSet.uniformMatrixLocation, false, matrix4x4.getArray());
                this.gl.uniform4f(shaderSet.uniformBaseColorLocation, baseColor.R, baseColor.G, baseColor.B, baseColor.A);
            }
            // IBOを作成し、データを転送
            if (bufferData.index == null) {
                bufferData.index = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, bufferData.index);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexArray, this.gl.DYNAMIC_DRAW);
            this.gl.blendFuncSeparate(SRC_COLOR, DST_COLOR, SRC_ALPHA, DST_ALPHA);
        };
        /**
         * シェーダープログラムを解放する
         */
        CubismShader_WebGL.prototype.releaseShaderProgram = function () {
            for (var i = 0; i < this._shaderSets.getSize(); i++) {
                this.gl.deleteProgram(this._shaderSets.at(i).shaderProgram);
                this._shaderSets.at(i).shaderProgram = 0;
                this._shaderSets.set(i, void 0);
                this._shaderSets.set(i, null);
            }
        };
        /**
         * シェーダープログラムを初期化する
         * @param vertShaderSrc 頂点シェーダのソース
         * @param fragShaderSrc フラグメントシェーダのソース
         */
        CubismShader_WebGL.prototype.generateShaders = function () {
            for (var i = 0; i < shaderCount; i++) {
                this._shaderSets.pushBack(new CubismShaderSet());
            }
            this._shaderSets.at(0).shaderProgram = this.loadShaderProgram(Live2DCubismFramework.vertexShaderSrcSetupMask, Live2DCubismFramework.fragmentShaderSrcsetupMask);
            this._shaderSets.at(1).shaderProgram = this.loadShaderProgram(Live2DCubismFramework.vertexShaderSrc, Live2DCubismFramework.fragmentShaderSrcPremultipliedAlpha);
            this._shaderSets.at(2).shaderProgram = this.loadShaderProgram(Live2DCubismFramework.vertexShaderSrcMasked, Live2DCubismFramework.fragmentShaderSrcMaskPremultipliedAlpha);
            this._shaderSets.at(3).shaderProgram = this.loadShaderProgram(Live2DCubismFramework.vertexShaderSrcMasked, Live2DCubismFramework.fragmentShaderSrcMaskInvertedPremultipliedAlpha);
            // 加算も通常と同じシェーダーを利用する
            this._shaderSets.at(4).shaderProgram = this._shaderSets.at(1).shaderProgram;
            this._shaderSets.at(5).shaderProgram = this._shaderSets.at(2).shaderProgram;
            this._shaderSets.at(6).shaderProgram = this._shaderSets.at(3).shaderProgram;
            // 乗算も通常と同じシェーダーを利用する
            this._shaderSets.at(7).shaderProgram = this._shaderSets.at(1).shaderProgram;
            this._shaderSets.at(8).shaderProgram = this._shaderSets.at(2).shaderProgram;
            this._shaderSets.at(9).shaderProgram = this._shaderSets.at(3).shaderProgram;
            // SetupMask
            this._shaderSets.at(0).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(0).shaderProgram, "a_position");
            this._shaderSets.at(0).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(0).shaderProgram, "a_texCoord");
            this._shaderSets.at(0).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, "s_texture0");
            this._shaderSets.at(0).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, "u_clipMatrix");
            this._shaderSets.at(0).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, "u_channelFlag");
            this._shaderSets.at(0).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, "u_baseColor");
            // 通常（PremultipliedAlpha）
            this._shaderSets.at(1).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(1).shaderProgram, "a_position");
            this._shaderSets.at(1).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(1).shaderProgram, "a_texCoord");
            this._shaderSets.at(1).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, "s_texture0");
            this._shaderSets.at(1).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, "u_matrix");
            this._shaderSets.at(1).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, "u_baseColor");
            // 通常（クリッピング、PremultipliedAlpha）
            this._shaderSets.at(2).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(2).shaderProgram, "a_position");
            this._shaderSets.at(2).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(2).shaderProgram, "a_texCoord");
            this._shaderSets.at(2).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, "s_texture0");
            this._shaderSets.at(2).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, "s_texture1");
            this._shaderSets.at(2).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, "u_matrix");
            this._shaderSets.at(2).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, "u_clipMatrix");
            this._shaderSets.at(2).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, "u_channelFlag");
            this._shaderSets.at(2).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, "u_baseColor");
            // 通常（クリッピング・反転, PremultipliedAlpha）
            this._shaderSets.at(3).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(3).shaderProgram, "a_position");
            this._shaderSets.at(3).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(3).shaderProgram, "a_texCoord");
            this._shaderSets.at(3).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, "s_texture0");
            this._shaderSets.at(3).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, "s_texture1");
            this._shaderSets.at(3).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, "u_matrix");
            this._shaderSets.at(3).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, "u_clipMatrix");
            this._shaderSets.at(3).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, "u_channelFlag");
            this._shaderSets.at(3).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, "u_baseColor");
            // 加算（PremultipliedAlpha）
            this._shaderSets.at(4).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(4).shaderProgram, "a_position");
            this._shaderSets.at(4).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(4).shaderProgram, "a_texCoord");
            this._shaderSets.at(4).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, "s_texture0");
            this._shaderSets.at(4).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, "u_matrix");
            this._shaderSets.at(4).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, "u_baseColor");
            // 加算（クリッピング、PremultipliedAlpha）
            this._shaderSets.at(5).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(5).shaderProgram, "a_position");
            this._shaderSets.at(5).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(5).shaderProgram, "a_texCoord");
            this._shaderSets.at(5).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, "s_texture0");
            this._shaderSets.at(5).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, "s_texture1");
            this._shaderSets.at(5).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, "u_matrix");
            this._shaderSets.at(5).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, "u_clipMatrix");
            this._shaderSets.at(5).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, "u_channelFlag");
            this._shaderSets.at(5).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, "u_baseColor");
            // 加算（クリッピング・反転、PremultipliedAlpha）
            this._shaderSets.at(6).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(6).shaderProgram, "a_position");
            this._shaderSets.at(6).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(6).shaderProgram, "a_texCoord");
            this._shaderSets.at(6).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, "s_texture0");
            this._shaderSets.at(6).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, "s_texture1");
            this._shaderSets.at(6).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, "u_matrix");
            this._shaderSets.at(6).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, "u_clipMatrix");
            this._shaderSets.at(6).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, "u_channelFlag");
            this._shaderSets.at(6).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, "u_baseColor");
            // 乗算（PremultipliedAlpha）
            this._shaderSets.at(7).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(7).shaderProgram, "a_position");
            this._shaderSets.at(7).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(7).shaderProgram, "a_texCoord");
            this._shaderSets.at(7).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, "s_texture0");
            this._shaderSets.at(7).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, "u_matrix");
            this._shaderSets.at(7).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, "u_baseColor");
            // 乗算（クリッピング、PremultipliedAlpha）
            this._shaderSets.at(8).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(8).shaderProgram, "a_position");
            this._shaderSets.at(8).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(8).shaderProgram, "a_texCoord");
            this._shaderSets.at(8).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, "s_texture0");
            this._shaderSets.at(8).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, "s_texture1");
            this._shaderSets.at(8).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, "u_matrix");
            this._shaderSets.at(8).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, "u_clipMatrix");
            this._shaderSets.at(8).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, "u_channelFlag");
            this._shaderSets.at(8).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, "u_baseColor");
            // 乗算（クリッピング・反転、PremultipliedAlpha）
            this._shaderSets.at(9).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(9).shaderProgram, "a_position");
            this._shaderSets.at(9).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(9).shaderProgram, "a_texCoord");
            this._shaderSets.at(9).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, "s_texture0");
            this._shaderSets.at(9).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, "s_texture1");
            this._shaderSets.at(9).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, "u_matrix");
            this._shaderSets.at(9).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, "u_clipMatrix");
            this._shaderSets.at(9).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, "u_channelFlag");
            this._shaderSets.at(9).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, "u_baseColor");
        };
        /**
         * シェーダプログラムをロードしてアドレスを返す
         * @param vertexShaderSource    頂点シェーダのソース
         * @param fragmentShaderSource  フラグメントシェーダのソース
         * @return シェーダプログラムのアドレス
         */
        CubismShader_WebGL.prototype.loadShaderProgram = function (vertexShaderSource, fragmentShaderSource) {
            // Create Shader Program
            var shaderProgram = this.gl.createProgram();
            var vertShader = this.compileShaderSource(this.gl.VERTEX_SHADER, vertexShaderSource);
            if (!vertShader) {
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_6__["CubismLogError"])("Vertex shader compile error!");
                return 0;
            }
            var fragShader = this.compileShaderSource(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
            if (!fragShader) {
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_6__["CubismLogError"])("Vertex shader compile error!");
                return 0;
            }
            // Attach vertex shader to program
            this.gl.attachShader(shaderProgram, vertShader);
            // Attach fragment shader to program
            this.gl.attachShader(shaderProgram, fragShader);
            // link program
            this.gl.linkProgram(shaderProgram);
            var linkStatus = this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS);
            // リンクに失敗したらシェーダーを削除
            if (!linkStatus) {
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_6__["CubismLogError"])("Failed to link program: {0}", shaderProgram);
                this.gl.deleteShader(vertShader);
                vertShader = 0;
                this.gl.deleteShader(fragShader);
                fragShader = 0;
                if (shaderProgram) {
                    this.gl.deleteProgram(shaderProgram);
                    shaderProgram = 0;
                }
                return 0;
            }
            // Release vertex and fragment shaders.
            this.gl.deleteShader(vertShader);
            this.gl.deleteShader(fragShader);
            return shaderProgram;
        };
        /**
         * シェーダープログラムをコンパイルする
         * @param shaderType シェーダタイプ(Vertex/Fragment)
         * @param shaderSource シェーダソースコード
         *
         * @return コンパイルされたシェーダープログラム
         */
        CubismShader_WebGL.prototype.compileShaderSource = function (shaderType, shaderSource) {
            var source = shaderSource;
            var shader = this.gl.createShader(shaderType);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);
            if (!shader) {
                var log = this.gl.getShaderInfoLog(shader);
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_6__["CubismLogError"])("Shader compile log: {0} ", log);
            }
            var status = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
            if (!status) {
                this.gl.deleteShader(shader);
                return null;
            }
            return shader;
        };
        CubismShader_WebGL.prototype.setGl = function (gl) {
            this.gl = gl;
        };
        return CubismShader_WebGL;
    }());
    Live2DCubismFramework.CubismShader_WebGL = CubismShader_WebGL;
    /**
     * CubismShader_WebGLのインナークラス
     */
    var CubismShaderSet = /** @class */ (function () {
        function CubismShaderSet() {
        }
        return CubismShaderSet;
    }());
    Live2DCubismFramework.CubismShaderSet = CubismShaderSet;
    var ShaderNames;
    (function (ShaderNames) {
        // SetupMask
        ShaderNames[ShaderNames["ShaderNames_SetupMask"] = 0] = "ShaderNames_SetupMask";
        // Normal
        ShaderNames[ShaderNames["ShaderNames_NormalPremultipliedAlpha"] = 1] = "ShaderNames_NormalPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_NormalMaskedPremultipliedAlpha"] = 2] = "ShaderNames_NormalMaskedPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_NomralMaskedInvertedPremultipliedAlpha"] = 3] = "ShaderNames_NomralMaskedInvertedPremultipliedAlpha";
        // Add
        ShaderNames[ShaderNames["ShaderNames_AddPremultipliedAlpha"] = 4] = "ShaderNames_AddPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_AddMaskedPremultipliedAlpha"] = 5] = "ShaderNames_AddMaskedPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_AddMaskedPremultipliedAlphaInverted"] = 6] = "ShaderNames_AddMaskedPremultipliedAlphaInverted";
        // Mult
        ShaderNames[ShaderNames["ShaderNames_MultPremultipliedAlpha"] = 7] = "ShaderNames_MultPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_MultMaskedPremultipliedAlpha"] = 8] = "ShaderNames_MultMaskedPremultipliedAlpha";
        ShaderNames[ShaderNames["ShaderNames_MultMaskedPremultipliedAlphaInverted"] = 9] = "ShaderNames_MultMaskedPremultipliedAlphaInverted";
    })(ShaderNames = Live2DCubismFramework.ShaderNames || (Live2DCubismFramework.ShaderNames = {}));
    ;
    Live2DCubismFramework.vertexShaderSrcSetupMask = "attribute vec4     a_position;" +
        "attribute vec2     a_texCoord;" +
        "varying vec2       v_texCoord;" +
        "varying vec4       v_myPos;" +
        "uniform mat4       u_clipMatrix;" +
        "void main()" +
        "{" +
        "   gl_Position = u_clipMatrix * a_position;" +
        "   v_myPos = u_clipMatrix * a_position;" +
        "   v_texCoord = a_texCoord;" +
        "   v_texCoord.y = 1.0 - v_texCoord.y;" +
        "}";
    Live2DCubismFramework.fragmentShaderSrcsetupMask = "precision mediump float;" +
        "varying vec2       v_texCoord;" +
        "varying vec4       v_myPos;" +
        "uniform vec4       u_baseColor;" +
        "uniform vec4       u_channelFlag;" +
        "uniform sampler2D  s_texture0;" +
        "void main()" +
        "{" +
        "   float isInside = " +
        "       step(u_baseColor.x, v_myPos.x/v_myPos.w)" +
        "       * step(u_baseColor.y, v_myPos.y/v_myPos.w)" +
        "       * step(v_myPos.x/v_myPos.w, u_baseColor.z)" +
        "       * step(v_myPos.y/v_myPos.w, u_baseColor.w);" +
        "   gl_FragColor = u_channelFlag * texture2D(s_texture0, v_texCoord).a * isInside;" +
        "}";
    //----- バーテックスシェーダプログラム -----
    // Normal & Add & Mult 共通
    Live2DCubismFramework.vertexShaderSrc = "attribute vec4     a_position;" + //v.vertex
        "attribute vec2     a_texCoord;" + //v.texcoord
        "varying vec2       v_texCoord;" + //v2f.texcoord
        "uniform mat4       u_matrix;" +
        "void main()" +
        "{" +
        "   gl_Position = u_matrix * a_position;" +
        "   v_texCoord = a_texCoord;" +
        "   v_texCoord.y = 1.0 - v_texCoord.y;" +
        "}";
    // Normal & Add & Mult 共通（クリッピングされたものの描画用）
    Live2DCubismFramework.vertexShaderSrcMasked = "attribute vec4     a_position;" +
        "attribute vec2     a_texCoord;" +
        "varying vec2       v_texCoord;" +
        "varying vec4       v_clipPos;" +
        "uniform mat4       u_matrix;" +
        "uniform mat4       u_clipMatrix;" +
        "void main()" +
        "{" +
        "   gl_Position = u_matrix * a_position;" +
        "   v_clipPos = u_clipMatrix * a_position;" +
        "   v_texCoord = a_texCoord;" +
        "   v_texCoord.y = 1.0 - v_texCoord.y;" +
        "}";
    //----- フラグメントシェーダプログラム -----
    // Normal & Add & Mult 共通 （PremultipliedAlpha）
    Live2DCubismFramework.fragmentShaderSrcPremultipliedAlpha = "precision mediump float;" +
        "varying vec2       v_texCoord;" + //v2f.texcoord
        "uniform vec4       u_baseColor;" +
        "uniform sampler2D  s_texture0;" + //_MainTex
        "void main()" +
        "{" +
        "   gl_FragColor = texture2D(s_texture0 , v_texCoord) * u_baseColor;" +
        "}";
    // Normal （クリッピングされたものの描画用、PremultipliedAlpha兼用）
    Live2DCubismFramework.fragmentShaderSrcMaskPremultipliedAlpha = "precision mediump float;" +
        "varying vec2       v_texCoord;" +
        "varying vec4       v_clipPos;" +
        "uniform vec4       u_baseColor;" +
        "uniform vec4       u_channelFlag;" +
        "uniform sampler2D  s_texture0;" +
        "uniform sampler2D  s_texture1;" +
        "void main()" +
        "{" +
        "   vec4 col_formask = texture2D(s_texture0 , v_texCoord) * u_baseColor;" +
        "   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;" +
        "   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;" +
        "   col_formask = col_formask * maskVal;" +
        "   gl_FragColor = col_formask;" +
        "}";
    // Normal & Add & Mult 共通（クリッピングされて反転使用の描画用、PremultipliedAlphaの場合）
    Live2DCubismFramework.fragmentShaderSrcMaskInvertedPremultipliedAlpha = "precision mediump float;" +
        "varying vec2 v_texCoord;" +
        "varying vec4 v_clipPos;" +
        "uniform sampler2D s_texture0;" +
        "uniform sampler2D s_texture1;" +
        "uniform vec4 u_channelFlag;" +
        "uniform vec4 u_baseColor;" +
        "void main()" +
        "{" +
        "vec4 col_formask = texture2D(s_texture0, v_texCoord) * u_baseColor;" +
        "vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;" +
        "float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;" +
        "col_formask = col_formask * (1.0 - maskVal);" +
        "gl_FragColor = col_formask;" +
        "}";
    /**
     * WebGL用の描画命令を実装したクラス
     */
    var CubismRenderer_WebGL = /** @class */ (function (_super) {
        __extends(CubismRenderer_WebGL, _super);
        /**
         * コンストラクタ
         */
        function CubismRenderer_WebGL() {
            var _this = _super.call(this) || this;
            _this._clippingContextBufferForMask = null;
            _this._clippingContextBufferForDraw = null;
            _this._clippingManager = new CubismClippingManager_WebGL();
            _this.firstDraw = true;
            _this._textures = new csmMap();
            _this._sortedDrawableIndexList = new csmVector();
            _this._bufferData = {
                vertex: WebGLBuffer = null,
                uv: WebGLBuffer = null,
                index: WebGLBuffer = null
            };
            // テクスチャ対応マップの容量を確保しておく
            _this._textures.prepareCapacity(32, true);
            return _this;
        }
        /**
         * レンダラの初期化処理を実行する
         * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
         *
         * @param model モデルのインスタンス
         */
        CubismRenderer_WebGL.prototype.initialize = function (model) {
            if (model.isUsingMasking()) {
                this._clippingManager = new CubismClippingManager_WebGL(); // クリッピングマスク・バッファ前処理方式を初期化
                this._clippingManager.initialize(model, model.getDrawableCount(), model.getDrawableMasks(), model.getDrawableMaskCounts());
            }
            this._sortedDrawableIndexList.resize(model.getDrawableCount(), 0);
            _super.prototype.initialize.call(this, model); // 親クラスの処理を呼ぶ
        };
        /**
         * WebGLテクスチャのバインド処理
         * CubismRendererにテクスチャを設定し、CubismRenderer内でその画像を参照するためのIndex値を戻り値とする
         * @param modelTextureNo セットするモデルテクスチャの番号
         * @param glTextureNo WebGLテクスチャの番号
         */
        CubismRenderer_WebGL.prototype.bindTexture = function (modelTextureNo, glTexture) {
            this._textures.setValue(modelTextureNo, glTexture);
        };
        /**
         * WebGLにバインドされたテクスチャのリストを取得する
         * @return テクスチャのリスト
         */
        CubismRenderer_WebGL.prototype.getBindedTextures = function () {
            return this._textures;
        };
        /**
         * クリッピングマスクバッファのサイズを設定する
         * マスク用のFrameBufferを破棄、再作成する為処理コストは高い
         * @param size クリッピングマスクバッファのサイズ
         */
        CubismRenderer_WebGL.prototype.setClippingMaskBufferSize = function (size) {
            // FrameBufferのサイズを変更するためにインスタンスを破棄・再作成する
            this._clippingManager.release();
            this._clippingManager = void 0;
            this._clippingManager = null;
            this._clippingManager = new CubismClippingManager_WebGL();
            this._clippingManager.setClippingMaskBufferSize(size);
            this._clippingManager.initialize(this.getModel(), this.getModel().getDrawableCount(), this.getModel().getDrawableMasks(), this.getModel().getDrawableMaskCounts());
        };
        /**
         * クリッピングマスクバッファのサイズを取得する
         * @return クリッピングマスクバッファのサイズ
         */
        CubismRenderer_WebGL.prototype.getClippingMaskBufferSize = function () {
            return this._clippingManager.getClippingMaskBufferSize();
        };
        /**
         * デストラクタ相当の処理
         */
        CubismRenderer_WebGL.prototype.release = function () {
            this._clippingManager.release();
            this._clippingManager = void 0;
            this._clippingManager = null;
            this.gl.deleteBuffer(this._bufferData.vertex);
            this._bufferData.vertex = null;
            this.gl.deleteBuffer(this._bufferData.uv);
            this._bufferData.uv = null;
            this.gl.deleteBuffer(this._bufferData.index);
            this._bufferData.index = null;
            this._bufferData = null;
            this._textures = null;
        };
        /**
         * モデルを描画する実際の処理
         */
        CubismRenderer_WebGL.prototype.doDrawModel = function () {
            //------------ クリッピングマスク・バッファ前処理方式の場合 ------------
            if (this._clippingManager != null) {
                this.preDraw();
                this._clippingManager.setupClippingContext(this.getModel(), this);
            }
            // 上記クリッピング処理内でも一度PreDrawを呼ぶので注意!!
            this.preDraw();
            var drawableCount = this.getModel().getDrawableCount();
            var renderOrder = this.getModel().getDrawableRenderOrders();
            // インデックスを描画順でソート
            for (var i = 0; i < drawableCount; ++i) {
                var order = renderOrder[i];
                this._sortedDrawableIndexList.set(order, i);
            }
            // 描画
            for (var i = 0; i < drawableCount; ++i) {
                var drawableIndex = this._sortedDrawableIndexList.at(i);
                // Drawableが表示状態でなければ処理をパスする
                if (!this.getModel().getDrawableDynamicFlagIsVisible(drawableIndex)) {
                    continue;
                }
                // クリッピングマスクをセットする
                this.setClippingContextBufferForDraw((this._clippingManager != null)
                    ? (this._clippingManager.getClippingContextListForDraw()).at(drawableIndex)
                    : null);
                this.setIsCulling(this.getModel().getDrawableCulling(drawableIndex));
                this.drawMesh(this.getModel().getDrawableTextureIndices(drawableIndex), this.getModel().getDrawableVertexIndexCount(drawableIndex), this.getModel().getDrawableVertexCount(drawableIndex), this.getModel().getDrawableVertexIndices(drawableIndex), this.getModel().getDrawableVertices(drawableIndex), this.getModel().getDrawableVertexUvs(drawableIndex), this.getModel().getDrawableOpacity(drawableIndex), this.getModel().getDrawableBlendMode(drawableIndex), this.getModel().getDrawableInvertedMaskBit(drawableIndex));
            }
        };
        /**
         * [オーバーライド]
         * 描画オブジェクト（アートメッシュ）を描画する。
         * ポリゴンメッシュとテクスチャ番号をセットで渡す。
         * @param textureNo 描画するテクスチャ番号
         * @param indexCount 描画オブジェクトのインデックス値
         * @param vertexCount ポリゴンメッシュの頂点数
         * @param indexArray ポリゴンメッシュのインデックス配列
         * @param vertexArray ポリゴンメッシュの頂点配列
         * @param uvArray uv配列
         * @param opacity 不透明度
         * @param colorBlendMode カラー合成タイプ
         * @param invertedMask マスク使用時のマスクの反転使用
         */
        CubismRenderer_WebGL.prototype.drawMesh = function (textureNo, indexCount, vertexCount, indexArray, vertexArray, uvArray, opacity, colorBlendMode, invertedMask) {
            // 裏面描画の有効・無効
            if (this.isCulling()) {
                this.gl.enable(this.gl.CULL_FACE);
            }
            else {
                this.gl.disable(this.gl.CULL_FACE);
            }
            this.gl.frontFace(this.gl.CCW); // Cubism SDK OpenGLはマスク・アートメッシュ共にCCWが表面
            var modelColorRGBA = this.getModelColor();
            if (this.getClippingContextBufferForMask() == null) // マスク生成時以外
             {
                modelColorRGBA.A *= opacity;
                if (this.isPremultipliedAlpha()) {
                    modelColorRGBA.R *= modelColorRGBA.A;
                    modelColorRGBA.G *= modelColorRGBA.A;
                    modelColorRGBA.B *= modelColorRGBA.A;
                }
            }
            var drawtexture; // シェーダに渡すテクスチャ
            // テクスチャマップからバインド済みテクスチャＩＤを取得
            // バインドされていなければダミーのテクスチャIDをセットする
            if (this._textures.getValue(textureNo) != null) {
                drawtexture = this._textures.getValue(textureNo);
            }
            else {
                drawtexture = null;
            }
            CubismShader_WebGL.getInstance().setupShaderProgram(this, drawtexture, vertexCount, vertexArray, indexArray, uvArray, this._bufferData, opacity, colorBlendMode, modelColorRGBA, this.isPremultipliedAlpha(), this.getMvpMatrix(), invertedMask);
            // ポリゴンメッシュを描画する
            this.gl.drawElements(this.gl.TRIANGLES, indexCount, this.gl.UNSIGNED_SHORT, 0);
            // 後処理
            this.gl.useProgram(null);
            this.setClippingContextBufferForDraw(null);
            this.setClippingContextBufferForMask(null);
        };
        /**
         * レンダラが保持する静的なリソースを解放する
         * WebGLの静的なシェーダープログラムを解放する
         */
        CubismRenderer_WebGL.doStaticRelease = function () {
            CubismShader_WebGL.deleteInstance();
        };
        /**
         * レンダーステートを設定する
         * @param fbo アプリケーション側で指定しているフレームバッファ
         * @param viewport ビューポート
         */
        CubismRenderer_WebGL.prototype.setRenderState = function (fbo, viewport) {
            s_fbo = fbo;
            s_viewport = viewport;
        };
        /**
         * 描画開始時の追加処理
         * モデルを描画する前にクリッピングマスクに必要な処理を実装している
         */
        CubismRenderer_WebGL.prototype.preDraw = function () {
            if (this.firstDraw) {
                this.firstDraw = false;
                // 拡張機能を有効にする
                this._anisortopy = this.gl.getExtension("EXT_texture_filter_anisotropic") ||
                    this.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
                    this.gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
            }
            this.gl.disable(this.gl.SCISSOR_TEST);
            this.gl.disable(this.gl.STENCIL_TEST);
            this.gl.disable(this.gl.DEPTH_TEST);
            // カリング（1.0beta3）
            this.gl.frontFace(this.gl.CW);
            this.gl.enable(this.gl.BLEND);
            this.gl.colorMask(true, true, true, true);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null); // 前にバッファがバインドされていたら破棄する必要がある
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        };
        /**
         * マスクテクスチャに描画するクリッピングコンテキストをセットする
         */
        CubismRenderer_WebGL.prototype.setClippingContextBufferForMask = function (clip) {
            this._clippingContextBufferForMask = clip;
        };
        /**
         * マスクテクスチャに描画するクリッピングコンテキストを取得する
         * @return マスクテクスチャに描画するクリッピングコンテキスト
         */
        CubismRenderer_WebGL.prototype.getClippingContextBufferForMask = function () {
            return this._clippingContextBufferForMask;
        };
        /**
         * 画面上に描画するクリッピングコンテキストをセットする
         */
        CubismRenderer_WebGL.prototype.setClippingContextBufferForDraw = function (clip) {
            this._clippingContextBufferForDraw = clip;
        };
        /**
         * 画面上に描画するクリッピングコンテキストを取得する
         * @return 画面上に描画するクリッピングコンテキスト
         */
        CubismRenderer_WebGL.prototype.getClippingContextBufferForDraw = function () {
            return this._clippingContextBufferForDraw;
        };
        /**
         * glの設定
         */
        CubismRenderer_WebGL.prototype.startUp = function (gl) {
            this.gl = gl;
            this._clippingManager.setGL(gl);
            CubismShader_WebGL.getInstance().setGl(gl);
        };
        return CubismRenderer_WebGL;
    }(CubismRenderer));
    Live2DCubismFramework.CubismRenderer_WebGL = CubismRenderer_WebGL;
    /**
     * レンダラが保持する静的なリソースを開放する
     */
    CubismRenderer.staticRelease = function () {
        CubismRenderer_WebGL.doStaticRelease();
    };
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/type/csmmap.ts":
/*!**************************************!*\
  !*** ./src/Framework/type/csmmap.ts ***!
  \**************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _utils_cubismdebug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/cubismdebug */ "./src/Framework/utils/cubismdebug.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * Key-Valueのペアを定義するクラス
     * csmMapクラスの内部データで使用する。
     */
    var csmPair = /** @class */ (function () {
        /**
         * コンストラクタ
         * @param key Keyとしてセットする値
         * @param value Valueとしてセットする値
         */
        function csmPair(key, value) {
            this.first = (key == undefined)
                ? null
                : key;
            this.second = (value == undefined)
                ? null
                : value;
        }
        return csmPair;
    }());
    Live2DCubismFramework.csmPair = csmPair;
    /**
     * マップ型
     */
    var csmMap = /** @class */ (function () {
        /**
         * 引数付きコンストラクタ
         * @param size 初期化時点で確保するサイズ
         */
        function csmMap(size) {
            if (size != undefined) {
                if (size < 1) {
                    this._keyValues = new Array();
                    this._dummyValue = null;
                    this._size = 0;
                }
                else {
                    this._keyValues = new Array(size);
                    this._size = size;
                }
            }
            else {
                this._keyValues = new Array();
                this._dummyValue = null;
                this._size = 0;
            }
        }
        /**
         * デストラクタ
         */
        csmMap.prototype.release = function () {
            this.clear();
        };
        /**
         * キーを追加する
         * @param key 新たに追加するキー
         */
        csmMap.prototype.appendKey = function (key) {
            // 新しくKey/Valueのペアを作る
            this.prepareCapacity(this._size + 1, false); // 1つ以上入る隙間を作る
            // 新しいkey/valueのインデックスは_size
            this._keyValues[this._size] = new csmPair(key);
            this._size += 1;
        };
        /**
         * 添字演算子[key]のオーバーロード(get)
         * @param key 添字から特定されるValue値
         */
        csmMap.prototype.getValue = function (key) {
            var found = -1;
            for (var i = 0; i < this._size; i++) {
                if (this._keyValues[i].first == key) {
                    found = i;
                    break;
                }
            }
            if (found >= 0) {
                return this._keyValues[found].second;
            }
            else {
                this.appendKey(key); // 新規キーを追加
                return this._keyValues[this._size - 1].second;
            }
        };
        /**
         * 添字演算子[key]のオーバーロード(set)
         * @param key 添字から特定されるValue値
         * @param value 代入するValue値
         */
        csmMap.prototype.setValue = function (key, value) {
            var found = -1;
            for (var i = 0; i < this._size; i++) {
                if (this._keyValues[i].first == key) {
                    found = i;
                    break;
                }
            }
            if (found >= 0) {
                this._keyValues[found].second = value;
            }
            else {
                this.appendKey(key); // 新規キーを追加
                this._keyValues[this._size - 1].second = value;
            }
        };
        /**
         * 引数で渡したKeyを持つ要素が存在するか
         * @param key 存在を確認するkey
         * @return true 引数で渡したkeyを持つ要素が存在する
         * @return false 引数で渡したkeyを持つ要素が存在しない
         */
        csmMap.prototype.isExist = function (key) {
            for (var i = 0; i < this._size; i++) {
                if (this._keyValues[i].first == key) {
                    return true;
                }
            }
            return false;
        };
        /**
         * keyValueのポインタを全て解放する
         */
        csmMap.prototype.clear = function () {
            this._keyValues = void 0;
            this._keyValues = null;
            this._keyValues = new Array();
            this._size = 0;
        };
        /**
         * コンテナのサイズを取得する
         *
         * @return コンテナのサイズ
         */
        csmMap.prototype.getSize = function () {
            return this._size;
        };
        /**
         * コンテナのキャパシティを確保する
         * @param newSize 新たなキャパシティ。引数の値が現在のサイズ未満の場合は何もしない。
         * @param fitToSize trueなら指定したサイズに合わせる。falseならサイズを2倍確保しておく。
         */
        csmMap.prototype.prepareCapacity = function (newSize, fitToSize) {
            if (newSize > this._keyValues.length) {
                if (this._keyValues.length == 0) {
                    if (!fitToSize && newSize < csmMap.DefaultSize)
                        newSize = csmMap.DefaultSize;
                    this._keyValues.length = newSize;
                }
                else {
                    if (!fitToSize && newSize < this._keyValues.length * 2)
                        newSize = this._keyValues.length * 2;
                    this._keyValues.length = newSize;
                }
            }
        };
        /**
         * コンテナの先頭要素を返す
         */
        csmMap.prototype.begin = function () {
            var ite = new iterator(this, 0);
            return ite;
        };
        /**
         * コンテナの終端要素を返す
         */
        csmMap.prototype.end = function () {
            var ite = new iterator(this, this._size); // 終了
            return ite;
        };
        /**
         * コンテナから要素を削除する
         *
         * @param ite 削除する要素
         */
        csmMap.prototype.erase = function (ite) {
            var index = ite._index;
            if (index < 0 || this._size <= index) {
                return ite; // 削除範囲外
            }
            // 削除
            this._keyValues.splice(index, 1);
            --this._size;
            var ite2 = new iterator(this, index); // 終了
            return ite2;
        };
        /**
         * コンテナの値を32ビット符号付き整数型でダンプする
         */
        csmMap.prototype.dumpAsInt = function () {
            for (var i = 0; i < this._size; i++) {
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_0__["CubismLogDebug"])("{0} ,", this._keyValues[i]);
                Object(_utils_cubismdebug__WEBPACK_IMPORTED_MODULE_0__["CubismLogDebug"])("\n");
            }
        };
        csmMap.DefaultSize = 10; // コンテナの初期化のデフォルトサイズ
        return csmMap;
    }());
    Live2DCubismFramework.csmMap = csmMap;
    /**
     * csmMap<T>のイテレータ
     */
    var iterator = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function iterator(v, idx) {
            this._map = (v != undefined)
                ? v
                : new csmMap();
            this._index = (idx != undefined)
                ? idx
                : 0;
        }
        /**
         * =演算子のオーバーロード
         */
        iterator.prototype.set = function (ite) {
            this._index = ite._index;
            this._map = ite._map;
            return this;
        };
        /**
         * 前置き++演算子のオーバーロード
         */
        iterator.prototype.preIncrement = function () {
            ++this._index;
            return this;
        };
        /**
         * 前置き--演算子のオーバーロード
         */
        iterator.prototype.preDecrement = function () {
            --this._index;
            return this;
        };
        /**
         * 後置き++演算子のオーバーロード
         */
        iterator.prototype.increment = function () {
            var iteold = new iterator(this._map, this._index++); // 古い値を保存
            this._map = iteold._map;
            this._index = iteold._index;
            return this;
        };
        /**
         * 後置き--演算子のオーバーロード
         */
        iterator.prototype.decrement = function () {
            var iteold = new iterator(this._map, this._index); // 古い値を保存
            this._map = iteold._map;
            this._index = iteold._index;
            return this;
        };
        /**
         * *演算子のオーバーロード
         */
        iterator.prototype.ptr = function () {
            return this._map._keyValues[this._index];
        };
        /**
         * !=演算
         */
        iterator.prototype.notEqual = function (ite) {
            return (this._index != ite._index) || (this._map != ite._map);
        };
        return iterator;
    }());
    Live2DCubismFramework.iterator = iterator;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/type/csmrectf.ts":
/*!****************************************!*\
  !*** ./src/Framework/type/csmrectf.ts ***!
  \****************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 矩形形状（座標・長さはfloat値）を定義するクラス
     */
    var csmRect = /** @class */ (function () {
        /**
         * コンストラクタ
         * @param x 左端X座標
         * @param y 上端Y座標
         * @param w 幅
         * @param h 高さ
         */
        function csmRect(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        }
        /**
         * 矩形中央のX座標を取得する
         */
        csmRect.prototype.getCenterX = function () {
            return this.x + 0.5 * this.width;
        };
        /**
         * 矩形中央のY座標を取得する
         */
        csmRect.prototype.getCenterY = function () {
            return this.y + 0.5 * this.height;
        };
        /**
         * 右側のX座標を取得する
         */
        csmRect.prototype.getRight = function () {
            return this.x + this.width;
        };
        /**
         * 下端のY座標を取得する
         */
        csmRect.prototype.getBottom = function () {
            return this.y + this.height;
        };
        /**
         * 矩形に値をセットする
         * @param r 矩形のインスタンス
         */
        csmRect.prototype.setRect = function (r) {
            this.x = r.x;
            this.y = r.y;
            this.width = r.width;
            this.height = r.height;
        };
        /**
         * 矩形中央を軸にして縦横を拡縮する
         * @param w 幅方向に拡縮する量
         * @param h 高さ方向に拡縮する量
         */
        csmRect.prototype.expand = function (w, h) {
            this.x -= w;
            this.y -= h;
            this.width += w * 2.0;
            this.height += h * 2.0;
        };
        return csmRect;
    }());
    Live2DCubismFramework.csmRect = csmRect;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/type/csmstring.ts":
/*!*****************************************!*\
  !*** ./src/Framework/type/csmstring.ts ***!
  \*****************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * 文字列クラス。
     */
    var csmString = /** @class */ (function () {
        /**
         * 引数付きコンストラクタ
         */
        function csmString(s) {
            this.s = s;
        }
        /**
         * 文字列を後方に追加する
         *
         * @param c 追加する文字列
         * @return 更新された文字列
         */
        csmString.prototype.append = function (c, length) {
            this.s += (length !== undefined)
                ? c.substr(0, length)
                : c;
            return this;
        };
        /**
         * 文字サイズを拡張して文字を埋める
         * @param length    拡張する文字数
         * @param v         埋める文字
         * @return 更新された文字列
         */
        csmString.prototype.expansion = function (length, v) {
            var ret = this;
            for (var i = 0; i < length; i++) {
                ret.append(v);
            }
            return ret;
        };
        /**
         * 文字列の長さをバイト数で取得する
         */
        csmString.prototype.getBytes = function () {
            return encodeURIComponent(this.s).replace(/%../g, "x").length;
        };
        /**
         * 文字列の長さを返す
         */
        csmString.prototype.getLength = function () {
            return this.s.length;
        };
        /**
         * 文字列比較　<
         * @param s 比較する文字列
         * @return true:    比較する文字列より小さい
         * @return false:   比較する文字列より大きい
         */
        csmString.prototype.isLess = function (s) {
            return this.s < s.s;
        };
        /**
         * 文字列比較 >
         * @param s 比較する文字列
         * @return true:    比較する文字列より大きい
         * @return false:   比較する文字列より小さい
         */
        csmString.prototype.isGreat = function (s) {
            return this.s > s.s;
        };
        /**
         * 文字列比較 ==
         * @param s 比較する文字列
         * @return true:    比較する文字列と等しい
         * @return false:   比較する文字列と異なる
         */
        csmString.prototype.isEqual = function (s) {
            return this.s == s;
        };
        /**
         * 文字列が空かどうか
         * @return true: 空の文字列
         * @return false: 値が設定されている
         */
        csmString.prototype.isEmpty = function () {
            return this.s.length == 0;
        };
        return csmString;
    }());
    Live2DCubismFramework.csmString = csmString;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/type/csmvector.ts":
/*!*****************************************!*\
  !*** ./src/Framework/type/csmvector.ts ***!
  \*****************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * ベクター型（可変配列型）
     */
    var csmVector = /** @class */ (function () {
        /**
         * 引数付きコンストラクタ
         * @param iniitalCapacity 初期化後のキャパシティ。データサイズは_capacity * sizeof(T)
         * @param zeroClear trueなら初期化時に確保した領域を0で埋める
         */
        function csmVector(initialCapacity) {
            if (initialCapacity === void 0) { initialCapacity = 0; }
            if (initialCapacity < 1) {
                this._ptr = new Array();
                this._capacity = 0;
                this._size = 0;
            }
            else {
                this._ptr = new Array(initialCapacity);
                this._capacity = initialCapacity;
                this._size = 0;
            }
        }
        /**
         * インデックスで指定した要素を返す
         */
        csmVector.prototype.at = function (index) {
            return this._ptr[index];
        };
        /**
         * 要素をセット
         * @param index 要素をセットするインデックス
         * @param value セットする要素
         */
        csmVector.prototype.set = function (index, value) {
            this._ptr[index] = value;
        };
        /**
         * コンテナを取得する
         */
        csmVector.prototype.get = function (offset) {
            if (offset === void 0) { offset = 0; }
            var ret = new Array();
            for (var i = offset; i < this._size; i++) {
                ret.push(this._ptr[i]);
            }
            return ret;
        };
        /**
         * pushBack処理、コンテナに新たな要素を追加する
         * @param value PushBack処理で追加する値
         */
        csmVector.prototype.pushBack = function (value) {
            if (this._size >= this._capacity) {
                this.prepareCapacity(this._capacity == 0 ? csmVector.s_defaultSize : this._capacity * 2);
            }
            this._ptr[this._size++] = value;
        };
        /**
         * コンテナの全要素を解放する
         */
        csmVector.prototype.clear = function () {
            this._ptr.length = 0;
            this._size = 0;
        };
        /**
         * コンテナの要素数を返す
         * @return コンテナの要素数
         */
        csmVector.prototype.getSize = function () {
            return this._size;
        };
        /**
         * コンテナの全要素に対して代入処理を行う
         * @param newSize 代入処理後のサイズ
         * @param value 要素に代入する値
         */
        csmVector.prototype.assign = function (newSize, value) {
            var curSize = this._size;
            if (curSize < newSize) {
                this.prepareCapacity(newSize); // capacity更新
            }
            for (var i = 0; i < newSize; i++) {
                this._ptr[i] = value;
            }
            this._size = newSize;
        };
        /**
         * サイズ変更
         */
        csmVector.prototype.resize = function (newSize, value) {
            if (value === void 0) { value = null; }
            this.updateSize(newSize, value, true);
        };
        /**
         * サイズ変更
         */
        csmVector.prototype.updateSize = function (newSize, value, callPlacementNew) {
            if (value === void 0) { value = null; }
            if (callPlacementNew === void 0) { callPlacementNew = true; }
            var curSize = this._size;
            if (curSize < newSize) {
                this.prepareCapacity(newSize); // capacity更新
                if (callPlacementNew) {
                    for (var i = this._size; i < newSize; i++) {
                        if (typeof value == 'function') // new
                         {
                            this._ptr[i] = JSON.parse(JSON.stringify(new value()));
                        }
                        else // プリミティブ型なので値渡し
                         {
                            this._ptr[i] = value;
                        }
                    }
                }
                else {
                    for (var i = this._size; i < newSize; i++) {
                        this._ptr[i] = value;
                    }
                }
            }
            else {
                // newSize <= this._size
                //---
                var sub = this._size - newSize;
                this._ptr.splice(this._size - sub, sub); // 不要なので破棄する
            }
            this._size = newSize;
        };
        /**
         * コンテナにコンテナ要素を挿入する
         * @param position 挿入する位置
         * @param begin　挿入するコンテナの開始位置
         * @param end 挿入するコンテナの終端位置
         */
        csmVector.prototype.insert = function (position, begin, end) {
            var dstSi = position._index;
            var srcSi = begin._index;
            var srcEi = end._index;
            var addCount = srcEi - srcSi;
            this.prepareCapacity(this._size + addCount);
            // 挿入用の既存データをシフトして隙間を作る
            var addSize = this._size - dstSi;
            if (addSize > 0) {
                for (var i = 0; i < addSize; i++) {
                    this._ptr.splice(dstSi + i, 0, null);
                }
            }
            for (var i = srcSi; i < srcEi; i++, dstSi++) {
                this._ptr[dstSi] = begin._vector._ptr[i];
            }
            this._size = this._size + addCount;
        };
        /**
         * コンテナからインデックスで指定した要素を削除する
         * @param index インデックス値
         * @return true 削除実行
         * @return false 削除範囲外
         */
        csmVector.prototype.remove = function (index) {
            if (index < 0 || this._size <= index) {
                return false; // 削除範囲外
            }
            this._ptr.splice(index, 1);
            --this._size;
            return true;
        };
        /**
         * コンテナから要素を削除して他の要素をシフトする
         * @param ite 削除する要素
         */
        csmVector.prototype.erase = function (ite) {
            var index = ite._index;
            if (index < 0 || this._size <= index) {
                return ite; // 削除範囲外
            }
            // 削除
            this._ptr.splice(index, 1);
            --this._size;
            var ite2 = new iterator(this, index); // 終了
            return ite2;
        };
        /**
         * コンテナのキャパシティを確保する
         * @param newSize 新たなキャパシティ。引数の値が現在のサイズ未満の場合は何もしない.
         */
        csmVector.prototype.prepareCapacity = function (newSize) {
            if (newSize > this._capacity) {
                if (this._capacity == 0) {
                    this._ptr = new Array(newSize);
                    this._capacity = newSize;
                }
                else {
                    this._ptr.length = newSize;
                    this._capacity = newSize;
                }
            }
        };
        /**
         * コンテナの先頭要素を返す
         */
        csmVector.prototype.begin = function () {
            var ite = (this._size == 0)
                ? this.end()
                : new iterator(this, 0);
            return ite;
        };
        /**
         * コンテナの終端要素を返す
         */
        csmVector.prototype.end = function () {
            var ite = new iterator(this, this._size);
            return ite;
        };
        csmVector.prototype.getOffset = function (offset) {
            var newVector = new csmVector();
            newVector._ptr = this.get(offset);
            newVector._size = this.get(offset).length;
            newVector._capacity = this.get(offset).length;
            return newVector;
        };
        csmVector.s_defaultSize = 10; // コンテナ初期化のデフォルトサイズ
        return csmVector;
    }());
    Live2DCubismFramework.csmVector = csmVector;
    var iterator = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function iterator(v, index) {
            this._vector = (v != undefined) ? v : null;
            this._index = (index != undefined) ? index : 0;
        }
        /**
         * 代入
         */
        iterator.prototype.set = function (ite) {
            this._index = ite._index;
            this._vector = ite._vector;
            return this;
        };
        /**
         * 前置き++演算
         */
        iterator.prototype.preIncrement = function () {
            ++this._index;
            return this;
        };
        /**
         * 前置き--演算
         */
        iterator.prototype.preDecrement = function () {
            --this._index;
            return this;
        };
        /**
         * 後置き++演算子
         */
        iterator.prototype.increment = function () {
            var iteold = new iterator(this._vector, this._index++);
            this._vector = iteold._vector;
            this._index = iteold._index;
            return this;
        };
        /**
         * 後置き--演算子
         */
        iterator.prototype.decrement = function () {
            var iteold = new iterator(this._vector, this._index--); // 古い値を保存
            this._vector = iteold._vector;
            this._index = iteold._index;
            return this;
        };
        /**
         * ptr
         */
        iterator.prototype.ptr = function () {
            return this._vector._ptr[this._index];
        };
        /**
         * =演算子のオーバーロード
         */
        iterator.prototype.substitution = function (ite) {
            this._index = ite._index;
            this._vector = ite._vector;
            return this;
        };
        /**
         * !=演算子のオーバーロード
         */
        iterator.prototype.notEqual = function (ite) {
            return (this._index != ite._index) || (this._vector != ite._vector);
        };
        return iterator;
    }());
    Live2DCubismFramework.iterator = iterator;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/utils/cubismdebug.ts":
/*!********************************************!*\
  !*** ./src/Framework/utils/cubismdebug.ts ***!
  \********************************************/
/*! exports provided: CubismLogPrint, CubismLogPrintIn, CSM_ASSERT, CubismLogVerbose, CubismLogDebug, CubismLogInfo, CubismLogWarning, CubismLogError, Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubismLogPrint", function() { return CubismLogPrint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubismLogPrintIn", function() { return CubismLogPrintIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSM_ASSERT", function() { return CSM_ASSERT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubismLogVerbose", function() { return CubismLogVerbose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubismLogDebug", function() { return CubismLogDebug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubismLogInfo", function() { return CubismLogInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubismLogWarning", function() { return CubismLogWarning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubismLogError", function() { return CubismLogError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/* harmony import */ var _cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cubismframeworkconfig */ "./src/Framework/cubismframeworkconfig.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */


var CubismLogPrint = function (level, fmt, args) {
    Live2DCubismFramework.CubismDebug.print(level, "[CSM]" + fmt, args);
};
var CubismLogPrintIn = function (level, fmt, args) {
    CubismLogPrint(level, fmt + "\n", args);
};
var CSM_ASSERT = function (expr) {
    console.assert(expr);
};
var CubismLogVerbose = function (fmt) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
};
var CubismLogDebug = function (fmt) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
};
var CubismLogInfo = function (fmt) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
};
var CubismLogWarning = function (fmt) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
};
var CubismLogError = function (fmt) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
};
if (_cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_1__["CSM_LOG_LEVEL"] <= _cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_1__["CSM_LOG_LEVEL_VERBOSE"]) {
    CubismLogVerbose = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Verbose, "[V]" + fmt, args);
    };
    CubismLogDebug = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Debug, "[D]" + fmt, args);
    };
    CubismLogInfo = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Info, "[I]" + fmt, args);
    };
    CubismLogWarning = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Warning, "[W]" + fmt, args);
    };
    CubismLogError = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Error, "[E]" + fmt, args);
    };
}
else if (_cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_1__["CSM_LOG_LEVEL"] == _cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_1__["CSM_LOG_LEVEL_DEBUG"]) {
    CubismLogDebug = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Debug, "[D]" + fmt, args);
    };
    CubismLogInfo = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Info, "[I]" + fmt, args);
    };
    CubismLogWarning = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Warning, "[W]" + fmt, args);
    };
    CubismLogError = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Error, "[E]" + fmt, args);
    };
}
else if (_cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_1__["CSM_LOG_LEVEL"] == _cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_1__["CSM_LOG_LEVEL_INFO"]) {
    CubismLogInfo = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Info, "[I]" + fmt, args);
    };
    CubismLogWarning = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Warning, "[W]" + fmt, args);
    };
    CubismLogError = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Error, "[E]" + fmt, args);
    };
}
else if (_cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_1__["CSM_LOG_LEVEL"] == _cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_1__["CSM_LOG_LEVEL_WARNING"]) {
    CubismLogWarning = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Warning, "[W]" + fmt, args);
    };
    CubismLogError = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Error, "[E]" + fmt, args);
    };
}
else if (_cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_1__["CSM_LOG_LEVEL"] == _cubismframeworkconfig__WEBPACK_IMPORTED_MODULE_1__["CSM_LOG_LEVEL_ERROR"]) {
    CubismLogError = function (fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        CubismLogPrintIn(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].LogLevel_Error, "[E]" + fmt, args);
    };
}
//------------ LIVE2D NAMESPACE ------------
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    /**
     * デバッグ用のユーティリティクラス。
     * ログの出力、バイトのダンプなど
     */
    var CubismDebug = /** @class */ (function () {
        /**
         * private コンストラクタ
         */
        function CubismDebug() {
        }
        /**
         * ログを出力する。第一引数にログレベルを設定する。
         * CubismFramework.initialize()時にオプションで設定されたログ出力レベルを下回る場合はログに出さない。
         *
         * @param logLevel ログレベルの設定
         * @param format 書式付き文字列
         * @param args 可変長引数
         */
        CubismDebug.print = function (logLevel, format, args) {
            // オプションで設定されたログ出力レベルを下回る場合はログに出さない
            if (logLevel < _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismFramework.getLoggingLevel()) {
                return;
            }
            var logPrint = _live2dcubismframework__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].CubismFramework.coreLogFunction;
            if (!logPrint)
                return;
            var buffer = format.replace(/\{(\d+)\}/g, function (m, k) {
                return args[k];
            });
            logPrint(buffer);
        };
        /**
         * データから指定した長さだけダンプ出力する。
         * CubismFramework.initialize()時にオプションで設定されたログ出力レベルを下回る場合はログに出さない。
         *
         * @param logLevel ログレベルの設定
         * @param data ダンプするデータ
         * @param length ダンプする長さ
         */
        CubismDebug.dumpBytes = function (logLevel, data, length) {
            for (var i = 0; i < length; i++) {
                if (i % 16 == 0 && i > 0)
                    this.print(logLevel, "\n");
                else if (i % 8 == 0 && i > 0)
                    this.print(logLevel, "  ");
                this.print(logLevel, "{0} ", [(data[i] & 0xFF)]);
            }
            this.print(logLevel, "\n");
        };
        return CubismDebug;
    }());
    Live2DCubismFramework.CubismDebug = CubismDebug;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));
//------------ LIVE2D NAMESPACE ------------


/***/ }),

/***/ "./src/Framework/utils/cubismjson.ts":
/*!*******************************************!*\
  !*** ./src/Framework/utils/cubismjson.ts ***!
  \*******************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/* harmony import */ var _type_csmstring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/csmstring */ "./src/Framework/type/csmstring.ts");
/* harmony import */ var _type_csmmap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/csmmap */ "./src/Framework/type/csmmap.ts");
/* harmony import */ var _type_csmvector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/csmvector */ "./src/Framework/type/csmvector.ts");
/* harmony import */ var _cubismdebug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cubismdebug */ "./src/Framework/utils/cubismdebug.ts");
/* harmony import */ var _live2dcubismframework__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../live2dcubismframework */ "./src/Framework/live2dcubismframework.ts");
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var csmVector = _type_csmvector__WEBPACK_IMPORTED_MODULE_2__["Live2DCubismFramework"].csmVector;
var csmMap = _type_csmmap__WEBPACK_IMPORTED_MODULE_1__["Live2DCubismFramework"].csmMap;
var csmString = _type_csmstring__WEBPACK_IMPORTED_MODULE_0__["Live2DCubismFramework"].csmString;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    // StaticInitializeNotForClientCall()で初期化する
    var CSM_JSON_ERROR_TYPE_MISMATCH = "Error: type mismatch";
    var CSM_JSON_ERROR_INDEX_OF_BOUNDS = "Error: index out of bounds";
    /**
     * パースしたJSONエレメントの要素の基底クラス。
     */
    var Value = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function Value() {
        }
        /**
         * 要素を文字列型で返す(string)
         */
        Value.prototype.getRawString = function (defaultValue, indent) {
            return this.getString(defaultValue, indent);
        };
        /**
         * 要素を数値型で返す(number)
         */
        Value.prototype.toInt = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            return defaultValue;
        };
        /**
         * 要素を数値型で返す(number)
         */
        Value.prototype.toFloat = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            return defaultValue;
        };
        /**
         * 要素を真偽値で返す(boolean)
         */
        Value.prototype.toBoolean = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = false; }
            return defaultValue;
        };
        /**
         * サイズを返す
         */
        Value.prototype.getSize = function () {
            return 0;
        };
        /**
         * 要素を配列で返す(Value[])
         */
        Value.prototype.getArray = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            return defaultValue;
        };
        /**
         * 要素をコンテナで返す(array)
         */
        Value.prototype.getVector = function (defaultValue) {
            return defaultValue;
        };
        /**
         * 要素をマップで返す(csmMap<csmString, Value>)
         */
        Value.prototype.getMap = function (defaultValue) {
            return defaultValue;
        };
        /**
         * 添字演算子[index]
         */
        Value.prototype.getValueByIndex = function (index) {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        };
        /**
         * 添字演算子[string | csmString]
         */
        Value.prototype.getValueByString = function (s) {
            return Value.nullValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        };
        /**
         * マップのキー一覧をコンテナで返す
         *
         * @return マップのキーの一覧
         */
        Value.prototype.getKeys = function () {
            return Value.s_dummyKeys;
        };
        /**
         * Valueの種類がエラー値ならtrue
         */
        Value.prototype.isError = function () {
            return false;
        };
        /**
         * Valueの種類がnullならtrue
         */
        Value.prototype.isNull = function () {
            return false;
        };
        /**
         * Valueの種類が真偽値ならtrue
         */
        Value.prototype.isBool = function () {
            return false;
        };
        /**
         * Valueの種類が数値型ならtrue
         */
        Value.prototype.isFloat = function () {
            return false;
        };
        /**
         * Valueの種類が文字列ならtrue
         */
        Value.prototype.isString = function () {
            return false;
        };
        /**
         * Valueの種類が配列ならtrue
         */
        Value.prototype.isArray = function () {
            return false;
        };
        /**
         * Valueの種類がマップ型ならtrue
         */
        Value.prototype.isMap = function () {
            return false;
        };
        Value.prototype.equals = function (value) {
            return false;
        };
        /**
         * Valueの値が静的ならtrue、静的なら解放しない
         */
        Value.prototype.isStatic = function () {
            return false;
        };
        /**
         * Valueにエラー値をセットする
         */
        Value.prototype.setErrorNotForClientCall = function (errorStr) {
            return JsonError.errorValue;
        };
        /**
         * 初期化用メソッド
         */
        Value.staticInitializeNotForClientCall = function () {
            JsonBoolean.trueValue = new JsonBoolean(true);
            JsonBoolean.falseValue = new JsonBoolean(false);
            JsonError.errorValue = new JsonError("ERROR", true);
            this.nullValue = new JsonNullvalue();
            Value.s_dummyKeys = new csmVector();
        };
        /**
         * リリース用メソッド
         */
        Value.staticReleaseNotForClientCall = function () {
            JsonBoolean.trueValue = null;
            JsonBoolean.falseValue = null;
            JsonError.errorValue = null;
            Value.nullValue = null;
            Value.s_dummyKeys = null;
            JsonBoolean.trueValue = null;
            JsonBoolean.falseValue = null;
            JsonError.errorValue = null;
            Value.nullValue = null;
            Value.s_dummyKeys = null;
        };
        return Value;
    }());
    Live2DCubismFramework.Value = Value;
    /**
     * Ascii文字のみ対応した最小限の軽量JSONパーサ。
     * 仕様はJSONのサブセットとなる。
     * 設定ファイル(model3.json)などのロード用
     *
     * [未対応項目]
     * ・日本語などの非ASCII文字
     * ・eによる指数表現
     */
    var CubismJson = /** @class */ (function () {
        /**
         * コンストラクタ
         */
        function CubismJson(buffer, length) {
            this._error = null;
            this._lineCount = 0;
            this._root = null;
            if (buffer != undefined) {
                this.parseBytes(buffer, length);
            }
        }
        /**
         * バイトデータから直接ロードしてパースする
         *
         * @param buffer バッファ
         * @param size バッファサイズ
         * @return CubismJsonクラスのインスタンス。失敗したらNULL
         */
        CubismJson.create = function (buffer, size) {
            var json = new CubismJson();
            var succeeded = json.parseBytes(buffer, size);
            if (!succeeded) {
                CubismJson.delete(json);
                return null;
            }
            else {
                return json;
            }
        };
        /**
         * パースしたJSONオブジェクトの解放処理
         *
         * @param instance CubismJsonクラスのインスタンス
         */
        CubismJson.delete = function (instance) {
            instance = null;
        };
        /**
         * パースしたJSONのルート要素を返す
         */
        CubismJson.prototype.getRoot = function () {
            return this._root;
        };
        /**
         *  UnicodeのバイナリをStringに変換
         *
         * @param buffer 変換するバイナリデータ
         * @return 変換後の文字列
         */
        CubismJson.prototype.arrayBufferToString = function (buffer) {
            var uint8Array = new Uint8Array(buffer);
            var str = "";
            for (var i = 0, len = uint8Array.length; i < len; ++i) {
                str += ("%" + this.pad(uint8Array[i].toString(16)));
            }
            str = decodeURIComponent(str);
            return str;
        };
        /**
         * エンコード、パディング
         */
        CubismJson.prototype.pad = function (n) {
            return n.length < 2
                ? "0" + n
                : n;
        };
        ;
        /**
         * JSONのパースを実行する
         * @param buffer    パース対象のデータバイト
         * @param size      データバイトのサイズ
         * return true : 成功
         * return false: 失敗
         */
        CubismJson.prototype.parseBytes = function (buffer, size) {
            var endPos = new Array(1); // 参照渡しにするため配列
            var decodeBuffer = this.arrayBufferToString(buffer);
            this._root = this.parseValue(decodeBuffer, size, 0, endPos);
            if (this._error) {
                var strbuf = '\0';
                strbuf = "Json parse error : @line " + (this._lineCount + 1) + "\n";
                this._root = new JsonString(strbuf);
                Object(_cubismdebug__WEBPACK_IMPORTED_MODULE_3__["CubismLogInfo"])("{0}", this._root.getRawString());
                return false;
            }
            else if (this._root == null) {
                this._root = new JsonError(new csmString(this._error), false); // rootは解放されるのでエラーオブジェクトを別途作成する
                return false;
            }
            return true;
        };
        /**
         * パース時のエラー値を返す
         */
        CubismJson.prototype.getParseError = function () {
            return this._error;
        };
        /**
         * ルート要素の次の要素がファイルの終端だったらtrueを返す
         */
        CubismJson.prototype.checkEndOfFile = function () {
            return this._root.getArray()[1].equals("EOF");
        };
        /**
         * JSONエレメントからValue(float,String,Value*,Array,null,true,false)をパースする
         * エレメントの書式に応じて内部でParseString(), ParseObject(), ParseArray()を呼ぶ
         *
         * @param   buffer      JSONエレメントのバッファ
         * @param   length      パースする長さ
         * @param   begin       パースを開始する位置
         * @param   outEndPos   パース終了時の位置
         * @return      パースから取得したValueオブジェクト
         */
        CubismJson.prototype.parseValue = function (buffer, length, begin, outEndPos) {
            if (this._error)
                return null;
            var o = null;
            var i = begin;
            var f;
            for (; i < length; i++) {
                var c = buffer[i];
                switch (c) {
                    case '-':
                    case '.':
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        {
                            var afterString = new Array(1); // 参照渡しにするため
                            f = Object(_live2dcubismframework__WEBPACK_IMPORTED_MODULE_4__["strtod"])(buffer.slice(i), afterString);
                            outEndPos[0] = buffer.indexOf(afterString[0]);
                            return new JsonFloat(f);
                        }
                    case '\"':
                        return new JsonString(this.parseString(buffer, length, i + 1, outEndPos)); // \"の次の文字から
                    case '[':
                        o = this.parseArray(buffer, length, i + 1, outEndPos);
                        return o;
                    case '{':
                        o = this.parseObject(buffer, length, i + 1, outEndPos);
                        return o;
                    case 'n': // null以外にない
                        if (i + 3 < length) {
                            o = new JsonNullvalue(); // 解放できるようにする
                            outEndPos[0] = i + 4;
                        }
                        else {
                            this._error = "parse null";
                        }
                        return o;
                    case 't': // true以外にない
                        if (i + 3 < length) {
                            o = JsonBoolean.trueValue;
                            outEndPos[0] = i + 4;
                        }
                        else {
                            this._error = "parse true";
                        }
                        return o;
                    case 'f': // false以外にない
                        if (i + 4 < length) {
                            o = JsonBoolean.falseValue;
                            outEndPos[0] = i + 5;
                        }
                        else {
                            this._error = "illegal ',' position";
                        }
                        return o;
                    case ',': // Array separator
                        this._error = "illegal ',' position";
                        return null;
                    case ']': // 不正な｝だがスキップする。配列の最後に不要な , があると思われる
                        outEndPos[0] = i; // 同じ文字を再処理
                        return null;
                    case '\n':
                        this._lineCount++;
                    case ' ':
                    case '\t':
                    case '\r':
                    default: // スキップ
                        break;
                }
            }
            this._error = "illegal end of value";
            return null;
        };
        /**
         * 次の「"」までの文字列をパースする。
         *
         * @param   string  ->  パース対象の文字列
         * @param   length  ->  パースする長さ
         * @param   begin   ->  パースを開始する位置
         * @param  outEndPos   ->  パース終了時の位置
         * @return      パースした文F字列要素
         */
        CubismJson.prototype.parseString = function (string, length, begin, outEndPos) {
            if (this._error)
                return null;
            var i = begin;
            var c, c2;
            var ret = new csmString("");
            var bufStart = begin; // sbufに登録されていない文字の開始位置
            for (; i < length; i++) {
                c = string[i];
                switch (c) {
                    case '\"': // 終端の”、エスケープ文字は別に処理されるのでここに来ない
                        {
                            outEndPos[0] = i + 1; // ”の次の文字
                            ret.append(string.slice(bufStart), (i - bufStart)); // 前の文字までを登録する
                            return ret.s;
                        }
                    case '//': // エスケープの場合
                        {
                            i++; // ２文字をセットで扱う
                            if (i - 1 > bufStart) {
                                ret.append(string.slice(bufStart), (i - bufStart)); // 前の文字までを登録する
                            }
                            bufStart = i + 1; // エスケープ（２文字)の次の文字から
                            if (i < length) {
                                c2 = string[i];
                                switch (c2) {
                                    case '\\':
                                        ret.expansion(1, '\\');
                                        break;
                                    case '\"':
                                        ret.expansion(1, '\"');
                                        break;
                                    case '/':
                                        ret.expansion(1, '/');
                                        break;
                                    case 'b':
                                        ret.expansion(1, '\b');
                                        break;
                                    case 'f':
                                        ret.expansion(1, '\f');
                                        break;
                                    case 'n':
                                        ret.expansion(1, '\n');
                                        break;
                                    case 'r':
                                        ret.expansion(1, '\r');
                                        break;
                                    case 't':
                                        ret.expansion(1, '\t');
                                        break;
                                    case 'u':
                                        this._error = "parse string/unicord escape not supported";
                                        break;
                                    default:
                                        break;
                                }
                            }
                            else {
                                this._error = "parse string/escape error";
                            }
                        }
                    default:
                        {
                            break;
                        }
                }
            }
            this._error = "parse string/illegal end";
            return null;
        };
        /**
         * JSONのオブジェクトエレメントをパースしてValueオブジェクトを返す
         *
         * @param buffer    JSONエレメントのバッファ
         * @param length    パースする長さ
         * @param begin     パースを開始する位置
         * @param outEndPos パース終了時の位置
         * @return パースから取得したValueオブジェクト
         */
        CubismJson.prototype.parseObject = function (buffer, length, begin, outEndPos) {
            if (this._error)
                return null;
            var ret = new JsonMap();
            // Key: Value
            var key = "";
            var i = begin;
            var c = "";
            var localRetEndPos2 = Array(1);
            var ok = false;
            // , が続く限りループ
            for (; i < length; i++) {
                FOR_LOOP: for (; i < length; i++) {
                    c = buffer[i];
                    switch (c) {
                        case '\"':
                            key = this.parseString(buffer, length, i + 1, localRetEndPos2);
                            if (this._error) {
                                return null;
                            }
                            i = localRetEndPos2[0];
                            ok = true;
                            break FOR_LOOP; //-- loopから出る
                        case '}': // 閉じカッコ
                            outEndPos[0] = i + 1;
                            return ret; // 空
                        case ':':
                            this._error = "illegal ':' position";
                            break;
                        case '\n':
                            this._lineCount++;
                        default:
                            break; // スキップする文字
                    }
                }
                if (!ok) {
                    this._error = "key not found";
                    return null;
                }
                ok = false;
                // : をチェック
                FOR_LOOP2: for (; i < length; i++) {
                    c = buffer[i];
                    switch (c) {
                        case ':':
                            ok = true;
                            i++;
                            break FOR_LOOP2;
                        case '}':
                            this._error = "illegal '}' position";
                            break;
                        case '\n': this._lineCount++;
                        // case ' ': case '\t' : case '\r':
                        default:
                            break; // スキップする文字
                    }
                }
                if (!ok) {
                    this._error = "':' not found";
                    return null;
                }
                // 値をチェック
                var value = this.parseValue(buffer, length, i, localRetEndPos2);
                if (this._error) {
                    return null;
                }
                i = localRetEndPos2[0];
                // ret.put(key, value);
                ret.put(key, value);
                FOR_LOOP3: for (; i < length; i++) {
                    c = buffer[i];
                    switch (c) {
                        case ',':
                            break FOR_LOOP3;
                        case '}':
                            outEndPos[0] = i + 1;
                            return ret; // 正常終了
                        case '\n':
                            this._lineCount++;
                        default:
                            break; // スキップ
                    }
                }
            }
            this._error = "illegal end of perseObject";
            return null;
        };
        /**
         * 次の「"」までの文字列をパースする。
         * @param buffer    JSONエレメントのバッファ
         * @param length    パースする長さ
         * @param begin     パースを開始する位置
         * @param outEndPos パース終了時の位置
         * @return パースから取得したValueオブジェクト
         */
        CubismJson.prototype.parseArray = function (buffer, length, begin, outEndPos) {
            if (this._error)
                return null;
            var ret = new JsonArray();
            // key : value
            var i = begin;
            var c;
            var localRetEndpos2 = new Array(1);
            // , が続く限りループ
            for (; i < length; i++) {
                // : をチェック
                var value = this.parseValue(buffer, length, i, localRetEndpos2);
                if (this._error) {
                    return null;
                }
                i = localRetEndpos2[0];
                if (value) {
                    ret.add(value);
                }
                // FOR_LOOP3:
                // boolean breakflag = false;
                FOR_LOOP: for (; i < length; i++) {
                    c = buffer[i];
                    switch (c) {
                        case ',':
                            // breakflag = true;
                            // break; // 次のKEY, VAlUEへ
                            break FOR_LOOP;
                        case ']':
                            outEndPos[0] = i + 1;
                            return ret; // 終了
                        case '\n':
                            ++this._lineCount;
                        //case ' ': case '\t': case '\r':
                        default:
                            break; // スキップ
                    }
                }
            }
            ret = void 0;
            this._error = "illegal end of parseObject";
            return null;
        };
        return CubismJson;
    }());
    Live2DCubismFramework.CubismJson = CubismJson;
    /**
     * パースしたJSONの要素をfloat値として扱う
     */
    var JsonFloat = /** @class */ (function (_super) {
        __extends(JsonFloat, _super);
        /**
         * コンストラクタ
         */
        function JsonFloat(v) {
            var _this = _super.call(this) || this;
            _this._value = v;
            return _this;
        }
        /**
         * Valueの種類が数値型ならtrue
         */
        JsonFloat.prototype.isFloat = function () {
            return true;
        };
        /**
         * 要素を文字列で返す(csmString型)
         */
        JsonFloat.prototype.getString = function (defaultValue, indent) {
            var strbuf = '\0';
            this._value = parseFloat(strbuf);
            this._stringBuffer = strbuf;
            return this._stringBuffer;
        };
        /**
         * 要素を数値型で返す(number)
         */
        JsonFloat.prototype.toInt = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            return parseInt(this._value.toString());
        };
        /**
         * 要素を数値型で返す(number)
         */
        JsonFloat.prototype.toFloat = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0.0; }
            return this._value;
        };
        JsonFloat.prototype.equals = function (value) {
            if ('number' === typeof (value)) {
                // int
                if (Math.round(value)) {
                    return false;
                }
                // float
                else {
                    return value == this._value;
                }
            }
            return false;
        };
        return JsonFloat;
    }(Value));
    Live2DCubismFramework.JsonFloat = JsonFloat;
    /**
     * パースしたJSONの要素を真偽値として扱う
     */
    var JsonBoolean = /** @class */ (function (_super) {
        __extends(JsonBoolean, _super);
        /**
         * 引数付きコンストラクタ
         */
        function JsonBoolean(v) {
            var _this = _super.call(this) || this;
            _this._boolValue = v;
            return _this;
        }
        /**
         * Valueの種類が真偽値ならtrue
         */
        JsonBoolean.prototype.isBool = function () {
            return true;
        };
        /**
         * 要素を真偽値で返す(boolean)
         */
        JsonBoolean.prototype.toBoolean = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = false; }
            return this._boolValue;
        };
        /**
         * 要素を文字列で返す(csmString型)
         */
        JsonBoolean.prototype.getString = function (defaultValue, indent) {
            this._stringBuffer = this._boolValue
                ? "true"
                : "false";
            return this._stringBuffer;
        };
        JsonBoolean.prototype.equals = function (value) {
            if ('boolean' === typeof (value)) {
                return value == this._boolValue;
            }
            return false;
        };
        /**
         * Valueの値が静的ならtrue, 静的なら解放しない
         */
        JsonBoolean.prototype.isStatic = function () {
            return true;
        };
        return JsonBoolean;
    }(Value));
    Live2DCubismFramework.JsonBoolean = JsonBoolean;
    /**
     * パースしたJSONの要素を文字列として扱う
     */
    var JsonString = /** @class */ (function (_super) {
        __extends(JsonString, _super);
        function JsonString(s) {
            var _this = _super.call(this) || this;
            if ('string' === typeof (s)) {
                _this._stringBuffer = s;
            }
            if (s instanceof csmString) {
                _this._stringBuffer = s.s;
            }
            return _this;
        }
        /**
         * Valueの種類が文字列ならtrue
         */
        JsonString.prototype.isString = function () {
            return true;
        };
        /**
         * 要素を文字列で返す(csmString型)
         */
        JsonString.prototype.getString = function (defaultValue, indent) {
            return this._stringBuffer;
        };
        JsonString.prototype.equals = function (value) {
            if ('string' === typeof (value)) {
                return this._stringBuffer == value;
            }
            if (value instanceof csmString) {
                return (this._stringBuffer == value.s);
            }
            return false;
        };
        return JsonString;
    }(Value));
    Live2DCubismFramework.JsonString = JsonString;
    /**
     * JSONパース時のエラー結果。文字列型のようにふるまう
     */
    var JsonError = /** @class */ (function (_super) {
        __extends(JsonError, _super);
        /**
         * 引数付きコンストラクタ
         */
        function JsonError(s, isStatic) {
            var _this = this;
            if ("string" === typeof (s)) {
                _this = _super.call(this, s) || this;
            }
            else {
                _this = _super.call(this, s) || this;
            }
            _this._isStatic = isStatic;
            return _this;
        }
        /**
         * Valueの値が静的ならtrue、静的なら解放しない
         */
        JsonError.prototype.isStatic = function () {
            return this._isStatic;
        };
        /**
         * エラー情報をセットする
         */
        JsonError.prototype.setErrorNotForClientCall = function (s) {
            this._stringBuffer = s;
            return this;
        };
        /**
         * Valueの種類がエラー値ならtrue
         */
        JsonError.prototype.isError = function () {
            return true;
        };
        return JsonError;
    }(JsonString));
    Live2DCubismFramework.JsonError = JsonError;
    /**
     * パースしたJSONの要素をNULL値として持つ
     */
    var JsonNullvalue = /** @class */ (function (_super) {
        __extends(JsonNullvalue, _super);
        /**
         * コンストラクタ
         */
        function JsonNullvalue() {
            var _this = _super.call(this) || this;
            _this._stringBuffer = "NullValue";
            return _this;
        }
        /**
         * Valueの種類がNULL値ならtrue
         */
        JsonNullvalue.prototype.isNull = function () {
            return true;
        };
        /**
         * 要素を文字列で返す(csmString型)
         */
        JsonNullvalue.prototype.getString = function (defaultValue, indent) {
            return this._stringBuffer;
        };
        /**
         * Valueの値が静的ならtrue, 静的なら解放しない
         */
        JsonNullvalue.prototype.isStatic = function () {
            return true;
        };
        return JsonNullvalue;
    }(Value));
    Live2DCubismFramework.JsonNullvalue = JsonNullvalue;
    /**
     * パースしたJSONの要素を配列として持つ
     */
    var JsonArray = /** @class */ (function (_super) {
        __extends(JsonArray, _super);
        /**
         * コンストラクタ
         */
        function JsonArray() {
            var _this = _super.call(this) || this;
            _this._array = new csmVector();
            return _this;
        }
        /**
         * デストラクタ相当の処理
         */
        JsonArray.prototype.release = function () {
            for (var ite = this._array.begin(); ite.notEqual(this._array.end()); ite.preIncrement()) {
                var v = ite.ptr();
                if (v && !v.isStatic()) {
                    v = void 0;
                    v = null;
                }
            }
        };
        /**
         * Valueの種類が配列ならtrue
         */
        JsonArray.prototype.isArray = function () {
            return true;
        };
        /**
         * 添字演算子[index]
         */
        JsonArray.prototype.getValueByIndex = function (index) {
            if (index < 0 || this._array.getSize() <= index) {
                return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_INDEX_OF_BOUNDS);
            }
            var v = this._array.at(index);
            if (v == null) {
                return Value.nullValue;
            }
            return v;
        };
        /**
         * 添字演算子[string | csmString]
         */
        JsonArray.prototype.getValueByString = function (s) {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        };
        /**
         * 要素を文字列で返す(csmString型)
         */
        JsonArray.prototype.getString = function (defaultValue, indent) {
            var stringBuffer = indent + "[\n";
            for (var ite = this._array.begin(); ite.notEqual(this._array.end()); ite.increment()) {
                var v = ite.ptr();
                this._stringBuffer += indent + "" + v.getString(indent + " ") + "\n";
            }
            this._stringBuffer = stringBuffer + indent + "]\n";
            return this._stringBuffer;
        };
        /**
         * 配列要素を追加する
         * @param v 追加する要素
         */
        JsonArray.prototype.add = function (v) {
            this._array.pushBack(v);
        };
        /**
         * 要素をコンテナで返す(csmVector<Value>)
         */
        JsonArray.prototype.getVector = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            return this._array;
        };
        /**
         * 要素の数を返す
         */
        JsonArray.prototype.getSize = function () {
            return this._array.getSize();
        };
        return JsonArray;
    }(Value));
    Live2DCubismFramework.JsonArray = JsonArray;
    /**
     * パースしたJSONの要素をマップとして持つ
     */
    var JsonMap = /** @class */ (function (_super) {
        __extends(JsonMap, _super);
        /**
         * コンストラクタ
         */
        function JsonMap() {
            var _this = _super.call(this) || this;
            _this._map = new csmMap();
            return _this;
        }
        /**
         * デストラクタ相当の処理
         */
        JsonMap.prototype.release = function () {
            var ite = this._map.begin();
            while (ite.notEqual(this._map.end())) {
                var v = ite.ptr().second;
                if (v && !v.isStatic()) {
                    v = void 0;
                    v = null;
                }
                ite.preIncrement();
            }
        };
        /**
         * Valueの値がMap型ならtrue
         */
        JsonMap.prototype.isMap = function () {
            return true;
        };
        /**
         * 添字演算子[string | csmString]
         */
        JsonMap.prototype.getValueByString = function (s) {
            if (s instanceof csmString) {
                var ret = this._map.getValue(s.s);
                if (ret == null) {
                    return Value.nullValue;
                }
                return ret;
            }
            for (var iter = this._map.begin(); iter.notEqual(this._map.end()); iter.preIncrement()) {
                if (iter.ptr().first == s) {
                    if (iter.ptr().second == null) {
                        return Value.nullValue;
                    }
                    return iter.ptr().second;
                }
            }
            return Value.nullValue;
        };
        /**
         * 添字演算子[index]
         */
        JsonMap.prototype.getValueByIndex = function (index) {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        };
        /**
         * 要素を文字列で返す(csmString型)
         */
        JsonMap.prototype.getString = function (defaultValue, indent) {
            this._stringBuffer = indent + "{\n";
            var ite = this._map.begin();
            while (ite.notEqual(this._map.end())) {
                var key = ite.ptr().first;
                var v = ite.ptr().second;
                this._stringBuffer += indent + " " + key + " : " + v.getString(indent + "   ") + " \n";
                ite.preIncrement();
            }
            this._stringBuffer += indent + "}\n";
            return this._stringBuffer;
        };
        /**
         * 要素をMap型で返す
         */
        JsonMap.prototype.getMap = function (defaultValue) {
            return this._map;
        };
        /**
         * Mapに要素を追加する
         */
        JsonMap.prototype.put = function (key, v) {
            this._map.setValue(key, v);
        };
        /**
         * Mapからキーのリストを取得する
         */
        JsonMap.prototype.getKeys = function () {
            if (!this._keys) {
                this._keys = new csmVector();
                var ite = this._map.begin();
                while (ite.notEqual(this._map.end())) {
                    var key = ite.ptr().first;
                    this._keys.pushBack(key);
                    ite.preIncrement();
                }
            }
            return this._keys;
        };
        /**
         * Mapの要素数を取得する
         */
        JsonMap.prototype.getSize = function () {
            return this._keys.getSize();
        };
        return JsonMap;
    }(Value));
    Live2DCubismFramework.JsonMap = JsonMap;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Framework/utils/cubismstring.ts":
/*!*********************************************!*\
  !*** ./src/Framework/utils/cubismstring.ts ***!
  \*********************************************/
/*! exports provided: Live2DCubismFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Live2DCubismFramework", function() { return Live2DCubismFramework; });
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var CubismString = /** @class */ (function () {
        /**
         * コンストラクタ呼び出し不可な静的クラスにする。
         */
        function CubismString() {
        }
        /**
         * 標準出力の書式を適用した文字列を取得する。
         * @param format    標準出力の書式指定文字列
         * @param ...args   書式指定文字列に渡す文字列
         * @return 書式を適用した文字列
         */
        CubismString.getFormatedString = function (format) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var ret = format;
            return ret.replace(/\{(\d+)\}/g, function (m, k) {
                return args[k];
            });
        };
        /**
         * textがstartWordで始まっているかどうかを返す
         * @param test 検査対象の文字列
         * @param startWord 比較対象の文字列
         * @return true textがstartWordで始まっている
         * @return false textがstartWordで始まっていない
         */
        CubismString.isStartWith = function (text, startWord) {
            var textIndex = 0;
            var startWordIndex = 0;
            while (startWord[startWordIndex] != '\0') {
                if (text[textIndex] == '\0' || text[textIndex++] != startWord[startWordIndex++]) {
                    return false;
                }
            }
            return false;
        };
        /**
         * position位置の文字から数字を解析する。
         *
         * @param string 文字列
         * @param length 文字列の長さ
         * @param position 解析したい文字の位置
         * @param outEndPos 一文字も読み込まなかった場合はエラー値(-1)が入る
         * @return 解析結果の数値
         */
        CubismString.stringToFloat = function (string, length, position, outEndPos) {
            var i = position;
            var minus = false; // マイナスフラグ
            var period = false;
            var v1 = 0;
            //負号の確認
            var c = parseInt(string[i]);
            if (c < 0) {
                minus = true;
                i++;
            }
            //整数部の確認
            for (; i < length; i++) {
                var c_1 = string[i];
                if (0 <= parseInt(c_1) && parseInt(c_1) <= 9) {
                    v1 = v1 * 10 + (parseInt(c_1) - 0);
                }
                else if (c_1 == '.') {
                    period = true;
                    i++;
                    break;
                }
                else {
                    break;
                }
            }
            //小数部の確認
            if (period) {
                var mul = 0.1;
                for (; i < length; i++) {
                    c = parseFloat(string[i]) & 0xFF;
                    if (0 <= c && c <= 9) {
                        v1 += mul * (c - 0);
                    }
                    else {
                        break;
                    }
                    mul *= 0.1; //一桁下げる
                    if (!c)
                        break;
                }
            }
            if (i == position) {
                //一文字も読み込まなかった場合
                outEndPos[0] = -1; //エラー値が入るので呼び出し元で適切な処理を行う
                return 0;
            }
            if (minus)
                v1 = -v1;
            outEndPos[0] = i;
            return v1;
        };
        return CubismString;
    }());
    Live2DCubismFramework.CubismString = CubismString;
})(Live2DCubismFramework || (Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/Logger.ts":
/*!***********************!*\
  !*** ./src/Logger.ts ***!
  \***********************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.init = function (canLog, canWarn, canError) {
        if (canLog === void 0) { canLog = true; }
        if (canWarn === void 0) { canWarn = true; }
        if (canError === void 0) { canError = true; }
        this.canLog = canLog;
        this.canWarn = canWarn;
        this.canError = canError;
    };
    Logger.log = function (message, isDebug) {
        if (isDebug === void 0) { isDebug = false; }
        if (Logger.canLog) {
            console.log("[live2d-helper] " + message);
        }
    };
    Logger.warn = function (message, isDebug) {
        if (isDebug === void 0) { isDebug = false; }
        if (Logger.canWarn) {
            console.warn("[live2d-helper] " + message);
        }
    };
    Logger.error = function (message, isDebug) {
        if (isDebug === void 0) { isDebug = false; }
        if (Logger.canError) {
            console.error("[live2d-helper] " + message);
        }
    };
    Logger.canLog = true;
    Logger.canWarn = true;
    Logger.canError = true;
    return Logger;
}());



/***/ }),

/***/ "./src/ModelInfo.ts":
/*!**************************!*\
  !*** ./src/ModelInfo.ts ***!
  \**************************/
/*! exports provided: ModelInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModelInfo", function() { return ModelInfo; });
var ModelInfo = /** @class */ (function () {
    function ModelInfo(setting, cubismSDK) {
        this._setting = setting;
        this._cubismSDK = cubismSDK;
    }
    Object.defineProperty(ModelInfo.prototype, "HitAreasList", {
        get: function () {
            return this._cubismSDK._model.getDrawableIds();
        },
        enumerable: true,
        configurable: true
    });
    return ModelInfo;
}());



/***/ }),

/***/ "./src/Setting.ts":
/*!************************!*\
  !*** ./src/Setting.ts ***!
  \************************/
/*! exports provided: Setting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Setting", function() { return Setting; });
/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logger */ "./src/Logger.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var Setting = /** @class */ (function () {
    function Setting() {
        this.model = "";
        this.imageUrl = "";
        this.soundUrl = "";
        this.interval = 15000;
        this.width = 300;
        this.height = 300;
        this.layout = {
            width: null,
            height: null,
            x: null,
            y: null,
            center_x: null,
            center_y: null,
            top: null,
            bottom: null,
            left: null,
            right: null
        };
        this.idle = "idle";
        this.view = {
            VIEW_MAX_SCALE: 2,
            VIEW_MIN_SCALE: 0.8,
            VIEW_LOGICAL_LEFT: -1.0,
            VIEW_LOGICAL_RIGHT: 1.0,
            VIEW_LOGICAL_MAX_LEFT: -2.0,
            VIEW_LOGICAL_MAX_RIGHT: 2.0,
            VIEW_LOGICAL_MAX_BOTTOM: -2.0,
            VIEW_LOGICAL_MAX_TOP: 2.0
        };
        this.initModelCallback = function (live2dHelper) { };
        this.scaling = false;
        this.globalFollowPointer = false;
        this.binding = {};
        this.autoLoadAudio = {
            canLoad: true,
            callback: function () { }
        };
        this.allowSound = true;
        this.Priority = {
            None: 0,
            Idle: 1,
            Normal: 2,
            Force: 3
        };
    }
    Setting.prototype.init = function (arg1, arg2) {
        return __awaiter(this, void 0, void 0, function () {
            var _binding, canvas, baseUrl, model, imageUrl, soundUrl, interval, width, height, layout, debug, idle, view, initModelCallback, scaling, globalFollowPointer, binding, autoLoadAudio, allowSound, motionLoadMode, key, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if ((typeof arg1 === "string" || arg1 instanceof HTMLCanvasElement) &&
                            typeof arg2 === "string") {
                            this.baseUrl = /\/$/.test(arg2) ? arg2 : arg2 + "/";
                            if (typeof arg1 === "string") {
                                this.canvas = document.querySelector(arg1);
                                if (!this.canvas) {
                                    _Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].error("Not Found HTMLCanvasElement");
                                    throw new Error("Not Found HTMLCanvasElement");
                                }
                            }
                            else {
                                this.canvas = arg1;
                            }
                        }
                        else {
                            canvas = arg1.canvas, baseUrl = arg1.baseUrl, model = arg1.model, imageUrl = arg1.imageUrl, soundUrl = arg1.soundUrl, interval = arg1.interval, width = arg1.width, height = arg1.height, layout = arg1.layout, debug = arg1.debug, idle = arg1.idle, view = arg1.view, initModelCallback = arg1.initModelCallback, scaling = arg1.scaling, globalFollowPointer = arg1.globalFollowPointer, binding = arg1.binding, autoLoadAudio = arg1.autoLoadAudio, allowSound = arg1.allowSound, motionLoadMode = arg1.motionLoadMode;
                            this.canvas =
                                canvas instanceof HTMLElement ? canvas : document.querySelector(canvas);
                            this.baseUrl = /\/$/.test(baseUrl) ? baseUrl : baseUrl + "/";
                            this.imageUrl = imageUrl ? imageUrl : this.baseUrl; // 图片资源的路径
                            this.imageUrl = /\/$/.test(this.imageUrl)
                                ? this.imageUrl
                                : this.imageUrl + "/";
                            this.soundUrl = soundUrl ? soundUrl : this.baseUrl; // 音频资源的路径
                            this.soundUrl = /\/$/.test(this.soundUrl)
                                ? this.soundUrl
                                : this.soundUrl + "/";
                            this.interval = interval || 15000;
                            this.width = isNaN(Number(width)) ? 800 : Number(width);
                            this.height = isNaN(Number(height)) ? 800 : Number(height);
                            this.canvas.width = this.width;
                            this.canvas.height = this.height;
                            this.layout = layout;
                            this.debug = debug || this.debug;
                            this.idle = idle;
                            this.motionLoadMode = motionLoadMode || 'lazy';
                            if (view) {
                                for (key in this.view) {
                                    if (view[key]) {
                                        this.view[key] = view[key];
                                    }
                                }
                            }
                            this.initModelCallback =
                                typeof initModelCallback === "function"
                                    ? initModelCallback
                                    : function (live2dHelper) { };
                            this.scaling = typeof scaling === "boolean" ? scaling : false;
                            this.globalFollowPointer =
                                typeof globalFollowPointer === "boolean" ? globalFollowPointer : false;
                            if (typeof autoLoadAudio === "function") {
                                this.autoLoadAudio = {
                                    canLoad: true,
                                    callback: autoLoadAudio
                                };
                            }
                            else if (typeof autoLoadAudio === "boolean") {
                                this.autoLoadAudio = {
                                    canLoad: autoLoadAudio,
                                    callback: function () { }
                                };
                            }
                            this.model = model;
                            _binding = binding;
                            this.allowSound = typeof allowSound === "boolean" ? allowSound : true;
                        }
                        if (!(this.model === undefined || typeof this.model === "string")) return [3 /*break*/, 2];
                        this.model = this.model ? this.model : this.baseUrl + "model.json";
                        _a = this;
                        return [4 /*yield*/, _Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].getArraybuffer(this.model)];
                    case 1:
                        _a.modelBuffer = _b.sent();
                        this.model = JSON.parse(_Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].arrayBuffer2String(this.modelBuffer));
                        return [3 /*break*/, 3];
                    case 2:
                        this.model = this.model;
                        _b.label = 3;
                    case 3:
                        this.initBind(_binding || {});
                        if (!this.canvas || !this.baseUrl) {
                            _Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].error("Not Found HTMLCanvasElement OR baseUrl");
                            throw new Error("Not Found HTMLCanvasElement OR baseUrl");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Setting.prototype.initBind = function (binding) {
        var _this = this;
        for (var id in binding) {
            var motion = [];
            var callback = function (_a) {
                var hitArea = _a.hitArea, motionPath = _a.motionPath, motionName = _a.motionName, priority = _a.priority;
            };
            if (typeof binding[id] === "string") {
                motion.push(binding[id]);
            }
            else if (Array.isArray(binding[id])) {
                motion.push.apply(motion, binding[id]);
            }
            else if (typeof binding[id] === "function") {
                callback = binding[id];
            }
            else if (typeof binding[id] === "object") {
                if (Array.isArray(binding[id].motion)) {
                    motion.push.apply(motion, binding[id].motion);
                }
                else {
                    motion.push(binding[id].motion);
                }
                if (typeof binding[id].callback === "function") {
                    callback = binding[id].callback;
                }
            }
            this.binding[name] = {
                motion: motion,
                callback: callback
            };
        }
        // 合并model和配置中的binding对象
        if (this.model.HitAreas) {
            var jsonBinding = JSON.parse(JSON.stringify(this.model.HitAreas));
            var _loop_1 = function (item) {
                var motion = [];
                if (item.Motion) {
                    if (typeof item.Motion === "string") {
                        motion.push(item.Motion);
                    }
                    else if (Array.isArray(item.Motion)) {
                        motion.push.apply(motion, item.Motion);
                    }
                }
                if (this_1.binding[item.Id]) {
                    motion.forEach(function (name) {
                        if (!_this.binding[item.Id].motion.includes(name)) {
                            _this.binding[item.Id].motion.push(name);
                        }
                    });
                }
                else {
                    this_1.binding[item.Id] = {
                        motion: motion,
                        callback: function (_a) {
                            var hitArea = _a.hitArea, motionPath = _a.motionPath, motionName = _a.motionName, priority = _a.priority;
                        }
                    };
                }
            };
            var this_1 = this;
            for (var _i = 0, jsonBinding_1 = jsonBinding; _i < jsonBinding_1.length; _i++) {
                var item = jsonBinding_1[_i];
                _loop_1(item);
            }
        }
        else {
            _Logger__WEBPACK_IMPORTED_MODULE_0__["Logger"].warn("Not Found HitAreas In model.json");
        }
    };
    return Setting;
}());



/***/ }),

/***/ "./src/Utils.ts":
/*!**********************!*\
  !*** ./src/Utils.ts ***!
  \**********************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.xhr = function (url, method, responseType) {
        return new Promise(function (reslove, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.responseType = responseType;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        reslove(xhr.response);
                    }
                    else {
                        reject({
                            status: xhr.status,
                            message: xhr.responseText
                        });
                    }
                }
            };
            xhr.send();
        });
    };
    Utils.getJson = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.xhr(url, "get", "json")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Utils.getBlob = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.xhr(url, "get", "blob")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Utils.getArraybuffer = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.xhr(url, "get", "arraybuffer")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Utils.arrayBuffer2String = function (buffer) {
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
    };
    Utils.getRandomItem = function (target) {
        return target[Math.floor(Math.random() * target.length)];
    };
    return Utils;
}());



/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Setting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Setting */ "./src/Setting.ts");
/* harmony import */ var _CubismSDK_CubismSDK__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CubismSDK/CubismSDK */ "./src/CubismSDK/CubismSDK.ts");
/* harmony import */ var _ModelInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ModelInfo */ "./src/ModelInfo.ts");



var Live2dHelper = /** @class */ (function () {
    function Live2dHelper(arg1, arg2) {
        var _this = this;
        this.setting = new _Setting__WEBPACK_IMPORTED_MODULE_0__["Setting"]();
        this.setting.init(arg1, arg2).then(function () {
            _this.load();
        });
        this.setting.canvas["_Live2dHelper"] = this;
    }
    Live2dHelper.prototype.load = function () {
        this.cubismSDK = new _CubismSDK_CubismSDK__WEBPACK_IMPORTED_MODULE_1__["CubismSDK"](this.setting);
        this.modelInfo = new _ModelInfo__WEBPACK_IMPORTED_MODULE_2__["ModelInfo"](this.setting, this.cubismSDK);
    };
    return Live2dHelper;
}());
/* harmony default export */ __webpack_exports__["default"] = (Live2dHelper);


/***/ })

/******/ })["default"];
});
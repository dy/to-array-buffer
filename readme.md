# to-array-buffer [![unstable](https://img.shields.io/badge/stability-unstable-orange.svg)](http://github.com/badges/stability-badges) [![Build Status](https://img.shields.io/travis/dfcreative/to-array-buffer.svg)](https://travis-ci.org/dfcreative/to-array-buffer)

Turn a buffer-like to an ArrayBuffer:

* Buffer
* ArrayBuffer view (TydedArray, FloatArray, DataView etc)
* [AudioBuffer](http://github.com/audiojs/audio-buffer)
* ImageData
* [ndarray](https://github.com/scijs/ndarray)
* data-uri (limited)
* base64
* String
* Array

[![npm install to-array-buffer](https://nodei.co/npm/to-array-buffer.png?mini=true)](https://npmjs.org/package/to-array-buffer/)

```js
var toArrayBuffer = require('to-array-buffer')
var context = require('audio-context')

//Get array buffer from any object.
ab = toArrayBuffer(new Buffer(100))
ab = toArrayBuffer(new Float32Array(12))
ab = toArrayBuffer(context.createBuffer(2, 200, 3000))
ab = toArrayBuffer([1, 2, 3])
ab = toArrayBuffer(imageData)
ab = toArrayBuffer(ndarray)
ab = toArrayBuffer(dataUri)

//Please note that for strings you may want to decode/encode etc.
ab = toArrayBuffer(encode('abc'))

//Pass `clone` as the second argument to ensure result is cloned.
refAb = toArrayBuffer(new ArrayBuffer(12), true)
refAb = toArrayBuffer(new Uint8Array([1, 2, 3]), true)
```

### Related

* [data-uri-to-buffer](https://npmjs.org/package/data-uri-to-buffer) − advanced data-uri decoder.
* [save-file](https://github.com/dfcreative/save-file) — save any input data to file in node/browser.
* [buffer-to-arraybuffer](https://npmjs.org/package/buffer-to-arraybuffer) — convert surely known Buffer datatype to ArrayBuffer.

Turn a buffer like to an ArrayBuffer.

[![npm install to-array-buffer](https://nodei.co/npm/to-array-buffer.png?mini=true)](https://npmjs.org/package/to-array-buffer/)

```js
var toArrayBuffer = require('to-array-buffer');
var context = require('audio-context');

//Get array buffer from any object.
var ab = toArrayBuffer(new Buffer(100));
var ab = toArrayBuffer(new Float32Array(12));
var ab = toArrayBuffer(context.createBuffer(2, 200, 3000));
var ab = toArrayBuffer([1, 2, 3]);
var ab = toArrayBuffer(imageData);
var ab = toArrayBuffer(ndarray);

//Please note that for strings you have to define encoding etc.
//So create buffer at first.
var ab = toArrayBuffer(new Buffer('abc'));

//Please also note that if possible, the result is returned by reference.
//Pass `clone` second argument to ensure result is cloned.
var refAb = toArrayBuffer(new ArrayBuffer(12), true);
var refAb = toArrayBuffer(new Uint8Array([1, 2, 3]), true);
```

### Related

> [buffer-to-arraybuffer](https://npmjs.org/package/buffer-to-arraybuffer) — convert surely known Buffer datatype to ArrayBuffer.
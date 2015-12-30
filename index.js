/**
 * @module  to-array-buffer
 */

var isAudioBuffer = require('is-audio-buffer');

module.exports = function toArrayBuffer (arg) {
	//zero-len or undefined-like
	if (!arg) return new ArrayBuffer();

	//array buffer already
	if (arg instanceof ArrayBuffer) return arg.slice();

	//array buffer view: TypedArray, DataView, Buffer etc
	if (ArrayBuffer.isView(arg)) {
		var offset = arg.byteOffset || 0;
		var length = arg.byteLength || arg.buffer.byteLength;
		return arg.buffer.slice(offset, offset + length);
	}

	//audio-buffer
	if (isAudioBuffer(arg)) {
		var data = new Float32Array(arg.length * arg.numberOfChannels);

		for (var channel = 0; channel < arg.numberOfChannels; channel++) {
			data.set(arg.getChannelData(channel), channel * arg.length);
		}

		return data.buffer;
	}

	//buffer/data-nested: NDArray, ImageData etc.
	//FIXME: NDArrays with custom data type cause butthurt
	if (arg.buffer || arg.data) {
		return toArrayBuffer(arg.buffer || arg.data);
	}

	//array-like or unknown
	//hope Uint8Array knows better how to treat the data
	//some data, like strings, is shitty, in sense it would require encoding etc.
	//lots of code in dependence.
	//so it’s up to user to convert string to buffer.
	return (new Uint8Array(arg.length != null ? arg : [arg])).buffer;
}
/**
 * @module  to-array-buffer
 */

'use strict'

var isAudioBuffer = require('is-audio-buffer');
var atob = require('atob-lite')
var isBase64 = require('is-base64')


module.exports = function toArrayBuffer (arg, clone) {
	//zero-length or undefined-like
	if (!arg) return new ArrayBuffer();

	//array buffer
	if (arg instanceof ArrayBuffer) return clone ? arg.slice() : arg;

	//try to decode data-uri, if any
	if (typeof arg === 'string') {
		//valid data uri
		if (/^data\:/i.test(arg)) {
			return dataUriToBuffer(arg)
		}
		//base64
		else if (isBase64(arg)) {
			return base642ab(arg)
		}
		//plain string
		else {
			return str2ab(arg)
		}
	}

	//array buffer view: TypedArray, DataView, Buffer etc
	//FIXME: as only Buffer obtains the way to provide subArrayBuffer - use that
	if (ArrayBuffer.isView(arg)) {
		if (arg.byteOffset != null) return arg.buffer.slice(arg.byteOffset, arg.byteOffset + arg.byteLength);
		return clone ? arg.buffer.slice() : arg.buffer;
	}

	//audio-buffer - note that we simply merge data by channels
	//no encoding or cleverness involved
	if (isAudioBuffer(arg)) {
		var floatArray = arg.getChannelData(0).constructor;
		var data = new floatArray(arg.length * arg.numberOfChannels);

		for (var channel = 0; channel < arg.numberOfChannels; channel++) {
			data.set(arg.getChannelData(channel), channel * arg.length);
		}

		return data.buffer;
	}

	//buffer/data nested: NDArray, ImageData etc.
	//FIXME: NDArrays with custom data type may be invalid for this procedure
	if (arg.buffer || arg.data) {
		var result = toArrayBuffer(arg.buffer || arg.data);
		return clone ? result.slice() : result;
	}

	//array-like or unknown
	//hope Uint8Array knows better how to treat the input
	return (new Uint8Array(arg.length != null ? arg : [arg])).buffer;
}


//modified data-uri-to-buffer
function dataUriToBuffer (uri) {
  // strip newlines
  uri = uri.replace(/\r?\n/g, '');

  // split the URI up into the "metadata" and the "data" portions
  var firstComma = uri.indexOf(',');
  if (-1 === firstComma || firstComma <= 4) throw new TypeError('malformed data: URI');

  // remove the "data:" scheme and parse the metadata
  var meta = uri.substring(5, firstComma).split(';');

  var base64 = false;
  var charset = 'US-ASCII';
  for (var i = 0; i < meta.length; i++) {
    if ('base64' == meta[i]) {
      base64 = true;
    } else if (0 == meta[i].indexOf('charset=')) {
      charset = meta[i].substring(8);
    }
  }

  // get the encoded data portion and decode URI-encoded chars
  var data = unescape(uri.substring(firstComma + 1));

  var buffer = base64 ? base642ab(data) : str2ab(data);

  // set `.type` property to MIME type
  buffer.type = meta[0] || 'text/plain';

  // set the `.charset` property
  buffer.charset = charset;

  return buffer;
}

function str2ab(str) {
	var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
	var bufView = new Uint16Array(buf);
	for (var i=0, strLen=str.length; i<strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}

function base642ab(str) {
	var binary = atob(str),
		array = new Uint8Array(binary.length);
	for(var i = 0; i < binary.length; i++) {
		array[i] = binary.charCodeAt(i);
	}
	return array.buffer
}

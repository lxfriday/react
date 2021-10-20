/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 * @nolint
 * @preventMunge
 * @generated
 */

"use strict";
var ReactFlightNativeRelayClientIntegration = require("ReactFlightNativeRelayClientIntegration");
function formatProdErrorMessage(code) {
  for (
    var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code,
      i = 1;
    i < arguments.length;
    i++
  )
    url += "&args[]=" + encodeURIComponent(arguments[i]);
  return (
    "Minified React error #" +
    code +
    "; visit " +
    url +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var isArrayImpl = Array.isArray;
function parseModelRecursively(response, parentObj, value) {
  if ("string" === typeof value)
    return parseModelString(response, parentObj, value);
  if ("object" === typeof value && null !== value) {
    if (isArrayImpl(value)) {
      var parsedValue = [];
      for (parentObj = 0; parentObj < value.length; parentObj++)
        parsedValue[parentObj] = parseModelRecursively(
          response,
          value,
          value[parentObj]
        );
      response =
        parsedValue[0] === REACT_ELEMENT_TYPE
          ? {
              $$typeof: REACT_ELEMENT_TYPE,
              type: parsedValue[1],
              key: parsedValue[2],
              ref: null,
              props: parsedValue[3],
              _owner: null
            }
          : parsedValue;
      return response;
    }
    parentObj = {};
    for (parsedValue in value)
      parentObj[parsedValue] = parseModelRecursively(
        response,
        value,
        value[parsedValue]
      );
    return parentObj;
  }
  return value;
}
var dummy = {},
  REACT_ELEMENT_TYPE = 60103,
  REACT_LAZY_TYPE = 60116;
if ("function" === typeof Symbol && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor("react.element");
  REACT_LAZY_TYPE = symbolFor("react.lazy");
}
function Chunk(status, value, response) {
  this._status = status;
  this._value = value;
  this._response = response;
}
Chunk.prototype.then = function(resolve) {
  0 === this._status
    ? (null === this._value && (this._value = []), this._value.push(resolve))
    : resolve();
};
function readChunk(chunk) {
  switch (chunk._status) {
    case 3:
      return chunk._value;
    case 1:
      var value = parseModelRecursively(chunk._response, dummy, chunk._value);
      chunk._status = 3;
      return (chunk._value = value);
    case 2:
      return (
        (value = ReactFlightNativeRelayClientIntegration.requireModule(
          chunk._value
        )),
        (chunk._status = 3),
        (chunk._value = value)
      );
    case 0:
      throw chunk;
    default:
      throw chunk._value;
  }
}
function readRoot() {
  var chunk = getChunk(this, 0);
  return readChunk(chunk);
}
function createInitializedChunk(response, value) {
  return new Chunk(3, value, response);
}
function wakeChunk(listeners) {
  if (null !== listeners)
    for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
}
function triggerErrorOnChunk(chunk, error) {
  if (0 === chunk._status) {
    var listeners = chunk._value;
    chunk._status = 4;
    chunk._value = error;
    wakeChunk(listeners);
  }
}
function reportGlobalError(response, error) {
  response._chunks.forEach(function(chunk) {
    triggerErrorOnChunk(chunk, error);
  });
}
function getChunk(response, id) {
  var chunks = response._chunks,
    chunk = chunks.get(id);
  chunk || ((chunk = new Chunk(0, null, response)), chunks.set(id, chunk));
  return chunk;
}
function parseModelString(response, parentObject, value) {
  switch (value[0]) {
    case "$":
      if ("$" === value) return REACT_ELEMENT_TYPE;
      if ("$" === value[1] || "@" === value[1]) return value.substring(1);
      parentObject = parseInt(value.substring(1), 16);
      response = getChunk(response, parentObject);
      return readChunk(response);
    case "@":
      return (
        (parentObject = parseInt(value.substring(1), 16)),
        (response = getChunk(response, parentObject)),
        { $$typeof: REACT_LAZY_TYPE, _payload: response, _init: readChunk }
      );
  }
  return value;
}
exports.close = function(response) {
  reportGlobalError(response, Error(formatProdErrorMessage(412)));
};
exports.createResponse = function() {
  return { _chunks: new Map(), readRoot: readRoot };
};
exports.resolveRow = function(response, chunk$jscomp$0) {
  if ("J" === chunk$jscomp$0[0]) {
    var id = chunk$jscomp$0[1];
    chunk$jscomp$0 = chunk$jscomp$0[2];
    var chunks = response._chunks,
      chunk = chunks.get(id);
    chunk
      ? 0 === chunk._status &&
        ((response = chunk._value),
        (chunk._status = 1),
        (chunk._value = chunk$jscomp$0),
        wakeChunk(response))
      : chunks.set(id, new Chunk(1, chunk$jscomp$0, response));
  } else
    "M" === chunk$jscomp$0[0]
      ? ((id = chunk$jscomp$0[1]),
        (chunks = chunk$jscomp$0[2]),
        (chunk = response._chunks),
        (chunk$jscomp$0 = chunk.get(id)),
        (chunks = parseModelRecursively(response, dummy, chunks)),
        (chunks = ReactFlightNativeRelayClientIntegration.resolveModuleReference(
          chunks
        )),
        ReactFlightNativeRelayClientIntegration.preloadModule(chunks),
        chunk$jscomp$0
          ? 0 === chunk$jscomp$0._status &&
            ((response = chunk$jscomp$0._value),
            (chunk$jscomp$0._status = 2),
            (chunk$jscomp$0._value = chunks),
            wakeChunk(response))
          : chunk.set(id, new Chunk(2, chunks, response)))
      : "S" === chunk$jscomp$0[0]
      ? response._chunks.set(
          chunk$jscomp$0[1],
          createInitializedChunk(response, Symbol.for(chunk$jscomp$0[2]))
        )
      : ((id = chunk$jscomp$0[1]),
        (chunk = Error(chunk$jscomp$0[2].message)),
        (chunk.stack = chunk$jscomp$0[2].stack),
        (chunk$jscomp$0 = response._chunks),
        (chunks = chunk$jscomp$0.get(id))
          ? triggerErrorOnChunk(chunks, chunk)
          : chunk$jscomp$0.set(id, new Chunk(4, chunk, response)));
};

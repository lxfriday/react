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
var JSResourceReferenceImpl = require("JSResourceReferenceImpl"),
  ReactFlightNativeRelayServerIntegration = require("ReactFlightNativeRelayServerIntegration"),
  React = require("react"),
  hasOwnProperty = Object.prototype.hasOwnProperty,
  isArrayImpl = Array.isArray;
function convertModelToJSON(request, parent, key, model) {
  parent = resolveModelToJSON(request, parent, key, model);
  if ("object" === typeof parent && null !== parent) {
    if (isArrayImpl(parent)) {
      var jsonArray = [];
      for (key = 0; key < parent.length; key++)
        jsonArray[key] = convertModelToJSON(
          request,
          parent,
          "" + key,
          parent[key]
        );
      return jsonArray;
    }
    key = {};
    for (jsonArray in parent)
      hasOwnProperty.call(parent, jsonArray) &&
        (key[jsonArray] = convertModelToJSON(
          request,
          parent,
          jsonArray,
          parent[jsonArray]
        ));
    return key;
  }
  return parent;
}
function writeChunk(destination, chunk) {
  ReactFlightNativeRelayServerIntegration.emitRow(destination, chunk);
  return !0;
}
var REACT_ELEMENT_TYPE = 60103,
  REACT_FRAGMENT_TYPE = 60107,
  REACT_FORWARD_REF_TYPE = 60112,
  REACT_MEMO_TYPE = 60115,
  REACT_LAZY_TYPE = 60116;
if ("function" === typeof Symbol && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor("react.element");
  REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
  REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
  REACT_MEMO_TYPE = symbolFor("react.memo");
  REACT_LAZY_TYPE = symbolFor("react.lazy");
}
var ReactCurrentDispatcher =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
    .ReactCurrentDispatcher;
function defaultErrorHandler(error) {
  console.error(error);
}
function createRequest(model, bundlerConfig, onError) {
  var pingedSegments = [],
    request = {
      status: 0,
      fatalError: null,
      destination: null,
      bundlerConfig: bundlerConfig,
      cache: new Map(),
      nextChunkId: 0,
      pendingChunks: 0,
      pingedSegments: pingedSegments,
      completedModuleChunks: [],
      completedJSONChunks: [],
      completedErrorChunks: [],
      writtenSymbols: new Map(),
      writtenModules: new Map(),
      onError: void 0 === onError ? defaultErrorHandler : onError,
      toJSON: function(key, value) {
        return resolveModelToJSON(request, this, key, value);
      }
    };
  request.pendingChunks++;
  model = createSegment(request, model);
  pingedSegments.push(model);
  return request;
}
function attemptResolveElement(type, key, ref, props) {
  if (null !== ref && void 0 !== ref)
    throw Error(
      "Refs cannot be used in server components, nor passed to client components."
    );
  if ("function" === typeof type) return type(props);
  if ("string" === typeof type) return [REACT_ELEMENT_TYPE, type, key, props];
  if ("symbol" === typeof type)
    return type === REACT_FRAGMENT_TYPE
      ? props.children
      : [REACT_ELEMENT_TYPE, type, key, props];
  if (null != type && "object" === typeof type) {
    if (type instanceof JSResourceReferenceImpl)
      return [REACT_ELEMENT_TYPE, type, key, props];
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return (type = type.render), type(props, void 0);
      case REACT_MEMO_TYPE:
        return attemptResolveElement(type.type, key, ref, props);
    }
  }
  throw Error(
    "Unsupported server component type: " + describeValueForErrorMessage(type)
  );
}
function createSegment(request, model) {
  var segment = {
    id: request.nextChunkId++,
    model: model,
    ping: function() {
      var pingedSegments = request.pingedSegments;
      pingedSegments.push(segment);
      1 === pingedSegments.length && performWork(request);
    }
  };
  return segment;
}
function objectName(object) {
  return Object.prototype.toString
    .call(object)
    .replace(/^\[object (.*)\]$/, function(m, p0) {
      return p0;
    });
}
function describeKeyForErrorMessage(key) {
  var encodedKey = JSON.stringify(key);
  return '"' + key + '"' === encodedKey ? key : encodedKey;
}
function describeValueForErrorMessage(value) {
  switch (typeof value) {
    case "string":
      return JSON.stringify(
        10 >= value.length ? value : value.substr(0, 10) + "..."
      );
    case "object":
      if (isArrayImpl(value)) return "[...]";
      value = objectName(value);
      return "Object" === value ? "{...}" : value;
    case "function":
      return "function";
    default:
      return String(value);
  }
}
function describeObjectForErrorMessage(objectOrArray, expandedName) {
  if (isArrayImpl(objectOrArray)) {
    for (var str = "[", i = 0; i < objectOrArray.length; i++) {
      0 < i && (str += ", ");
      if (6 < i) {
        str += "...";
        break;
      }
      var value = objectOrArray[i];
      str =
        "" + i === expandedName && "object" === typeof value && null !== value
          ? str + describeObjectForErrorMessage(value)
          : str + describeValueForErrorMessage(value);
    }
    return str + "]";
  }
  str = "{";
  i = Object.keys(objectOrArray);
  for (value = 0; value < i.length; value++) {
    0 < value && (str += ", ");
    if (6 < value) {
      str += "...";
      break;
    }
    var name = i[value];
    str += describeKeyForErrorMessage(name) + ": ";
    var value$3 = objectOrArray[name];
    str =
      name === expandedName && "object" === typeof value$3 && null !== value$3
        ? str + describeObjectForErrorMessage(value$3)
        : str + describeValueForErrorMessage(value$3);
  }
  return str + "}";
}
function resolveModelToJSON(request, parent, key, value) {
  switch (value) {
    case REACT_ELEMENT_TYPE:
      return "$";
    case REACT_LAZY_TYPE:
      throw Error("React Lazy Components are not yet supported on the server.");
  }
  for (
    ;
    "object" === typeof value &&
    null !== value &&
    value.$$typeof === REACT_ELEMENT_TYPE;

  ) {
    var element = value;
    try {
      value = attemptResolveElement(
        element.type,
        element.key,
        element.ref,
        element.props
      );
    } catch (x) {
      if ("object" === typeof x && null !== x && "function" === typeof x.then)
        return (
          request.pendingChunks++,
          (request = createSegment(request, value)),
          (parent = request.ping),
          x.then(parent, parent),
          "@" + request.id.toString(16)
        );
      reportError(request, x);
      request.pendingChunks++;
      parent = request.nextChunkId++;
      emitErrorChunk(request, parent, x);
      return "@" + parent.toString(16);
    }
  }
  if (null === value) return null;
  if ("object" === typeof value) {
    if (value instanceof JSResourceReferenceImpl) {
      element = request.writtenModules;
      var existingId = element.get(value);
      if (void 0 !== existingId)
        return parent[0] === REACT_ELEMENT_TYPE && "1" === key
          ? "@" + existingId.toString(16)
          : "$" + existingId.toString(16);
      try {
        var moduleMetaData = ReactFlightNativeRelayServerIntegration.resolveModuleMetaData(
          request.bundlerConfig,
          value
        );
        request.pendingChunks++;
        var moduleId = request.nextChunkId++;
        request.completedModuleChunks.push(["M", moduleId, moduleMetaData]);
        element.set(value, moduleId);
        return parent[0] === REACT_ELEMENT_TYPE && "1" === key
          ? "@" + moduleId.toString(16)
          : "$" + moduleId.toString(16);
      } catch (x$5) {
        return (
          request.pendingChunks++,
          (parent = request.nextChunkId++),
          emitErrorChunk(request, parent, x$5),
          "$" + parent.toString(16)
        );
      }
    }
    return value;
  }
  if ("string" === typeof value)
    return (
      (request = "$" === value[0] || "@" === value[0] ? "$" + value : value),
      request
    );
  if (
    "boolean" === typeof value ||
    "number" === typeof value ||
    "undefined" === typeof value
  )
    return value;
  if ("function" === typeof value) {
    if (/^on[A-Z]/.test(key))
      throw Error(
        "Event handlers cannot be passed to client component props. Remove " +
          (describeKeyForErrorMessage(key) +
            " from these props if possible: " +
            describeObjectForErrorMessage(parent) +
            "\nIf you need interactivity, consider converting part of this to a client component.")
      );
    throw Error(
      "Functions cannot be passed directly to client components because they're not serializable. Remove " +
        (describeKeyForErrorMessage(key) +
          " (" +
          (value.displayName || value.name || "function") +
          ") from this object, or avoid the entire object: " +
          describeObjectForErrorMessage(parent))
    );
  }
  if ("symbol" === typeof value) {
    moduleMetaData = request.writtenSymbols;
    moduleId = moduleMetaData.get(value);
    if (void 0 !== moduleId) return "$" + moduleId.toString(16);
    moduleId = value.description;
    if (Symbol.for(moduleId) !== value)
      throw Error(
        "Only global symbols received from Symbol.for(...) can be passed to client components. The symbol Symbol.for(" +
          (value.description +
            ") cannot be found among global symbols. Remove ") +
          (describeKeyForErrorMessage(key) +
            " from this object, or avoid the entire object: " +
            describeObjectForErrorMessage(parent))
      );
    request.pendingChunks++;
    parent = request.nextChunkId++;
    request.completedModuleChunks.push(["S", parent, moduleId]);
    moduleMetaData.set(value, parent);
    return "$" + parent.toString(16);
  }
  if ("bigint" === typeof value)
    throw Error(
      "BigInt (" +
        value +
        ") is not yet supported in client component props. Remove " +
        (describeKeyForErrorMessage(key) +
          " from this object or use a plain number instead: " +
          describeObjectForErrorMessage(parent))
    );
  throw Error(
    "Type " +
      typeof value +
      " is not supported in client component props. Remove " +
      (describeKeyForErrorMessage(key) +
        " from this object, or avoid the entire object: " +
        describeObjectForErrorMessage(parent))
  );
}
function reportError(request, error) {
  request = request.onError;
  request(error);
}
function fatalError(request, error) {
  null !== request.destination
    ? ((request.status = 2),
      ReactFlightNativeRelayServerIntegration.close(request.destination))
    : ((request.status = 1), (request.fatalError = error));
}
function emitErrorChunk(request, id, error) {
  var stack = "";
  try {
    if (error instanceof Error) {
      var message = String(error.message);
      stack = String(error.stack);
    } else message = "Error: " + error;
  } catch (x) {
    message = "An error occurred but serializing the error message failed.";
  }
  request.completedErrorChunks.push([
    "E",
    id,
    { message: message, stack: stack }
  ]);
}
function performWork(request$jscomp$0) {
  var prevDispatcher = ReactCurrentDispatcher.current,
    prevCache = currentCache;
  ReactCurrentDispatcher.current = Dispatcher;
  currentCache = request$jscomp$0.cache;
  try {
    var pingedSegments = request$jscomp$0.pingedSegments;
    request$jscomp$0.pingedSegments = [];
    for (var i = 0; i < pingedSegments.length; i++) {
      var segment = pingedSegments[i];
      var request = request$jscomp$0;
      try {
        for (
          var value = segment.model;
          "object" === typeof value &&
          null !== value &&
          value.$$typeof === REACT_ELEMENT_TYPE;

        ) {
          var element = value;
          segment.model = value;
          value = attemptResolveElement(
            element.type,
            element.key,
            element.ref,
            element.props
          );
        }
        var id = segment.id,
          json = convertModelToJSON(request, {}, "", value);
        request.completedJSONChunks.push(["J", id, json]);
      } catch (x) {
        if (
          "object" === typeof x &&
          null !== x &&
          "function" === typeof x.then
        ) {
          var ping = segment.ping;
          x.then(ping, ping);
        } else reportError(request, x), emitErrorChunk(request, segment.id, x);
      }
    }
    null !== request$jscomp$0.destination &&
      flushCompletedChunks(request$jscomp$0, request$jscomp$0.destination);
  } catch (error) {
    reportError(request$jscomp$0, error), fatalError(request$jscomp$0, error);
  } finally {
    (ReactCurrentDispatcher.current = prevDispatcher),
      (currentCache = prevCache);
  }
}
function flushCompletedChunks(request, destination) {
  for (
    var moduleChunks = request.completedModuleChunks, i = 0;
    i < moduleChunks.length;
    i++
  )
    if ((request.pendingChunks--, !writeChunk(destination, moduleChunks[i]))) {
      request.destination = null;
      i++;
      break;
    }
  moduleChunks.splice(0, i);
  moduleChunks = request.completedJSONChunks;
  for (i = 0; i < moduleChunks.length; i++)
    if ((request.pendingChunks--, !writeChunk(destination, moduleChunks[i]))) {
      request.destination = null;
      i++;
      break;
    }
  moduleChunks.splice(0, i);
  moduleChunks = request.completedErrorChunks;
  for (i = 0; i < moduleChunks.length; i++)
    if ((request.pendingChunks--, !writeChunk(destination, moduleChunks[i]))) {
      request.destination = null;
      i++;
      break;
    }
  moduleChunks.splice(0, i);
  0 === request.pendingChunks &&
    ReactFlightNativeRelayServerIntegration.close(destination);
}
function unsupportedHook() {
  throw Error("This Hook is not supported in Server Components.");
}
function unsupportedRefresh() {
  if (!currentCache)
    throw Error("Refreshing the cache is not supported in Server Components.");
}
var currentCache = null,
  Dispatcher = {
    useMemo: function(nextCreate) {
      return nextCreate();
    },
    useCallback: function(callback) {
      return callback;
    },
    useDebugValue: function() {},
    useDeferredValue: unsupportedHook,
    useTransition: unsupportedHook,
    getCacheForType: function(resourceType) {
      if (!currentCache)
        throw Error("Reading the cache is only supported while rendering.");
      var entry = currentCache.get(resourceType);
      void 0 === entry &&
        ((entry = resourceType()), currentCache.set(resourceType, entry));
      return entry;
    },
    readContext: unsupportedHook,
    useContext: unsupportedHook,
    useReducer: unsupportedHook,
    useRef: unsupportedHook,
    useState: unsupportedHook,
    useInsertionEffect: unsupportedHook,
    useLayoutEffect: unsupportedHook,
    useImperativeHandle: unsupportedHook,
    useEffect: unsupportedHook,
    useOpaqueIdentifier: unsupportedHook,
    useMutableSource: unsupportedHook,
    useSyncExternalStore: unsupportedHook,
    useCacheRefresh: function() {
      return unsupportedRefresh;
    }
  };
exports.render = function(model, destination, config) {
  model = createRequest(model, config);
  performWork(model);
  if (1 === model.status)
    (model.status = 2),
      ReactFlightNativeRelayServerIntegration.close(destination);
  else if (2 !== model.status) {
    model.destination = destination;
    try {
      flushCompletedChunks(model, destination);
    } catch (error) {
      reportError(model, error), fatalError(model, error);
    }
  }
};

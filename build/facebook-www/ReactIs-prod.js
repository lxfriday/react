/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 * @nolint
 * @preventMunge
 * @preserve-invariant-messages
 */

"use strict";
var REACT_ELEMENT_TYPE = 60103,
  REACT_PORTAL_TYPE = 60106,
  REACT_FRAGMENT_TYPE = 60107,
  REACT_STRICT_MODE_TYPE = 60108,
  REACT_PROFILER_TYPE = 60114,
  REACT_PROVIDER_TYPE = 60109,
  REACT_CONTEXT_TYPE = 60110,
  REACT_FORWARD_REF_TYPE = 60112,
  REACT_SUSPENSE_TYPE = 60113,
  REACT_SUSPENSE_LIST_TYPE = 60120,
  REACT_MEMO_TYPE = 60115,
  REACT_LAZY_TYPE = 60116,
  REACT_SCOPE_TYPE = 60119,
  REACT_DEBUG_TRACING_MODE_TYPE = 60129,
  REACT_OFFSCREEN_TYPE = 60130,
  REACT_LEGACY_HIDDEN_TYPE = 60131,
  REACT_CACHE_TYPE = 60132;
if ("function" === typeof Symbol && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor("react.element");
  REACT_PORTAL_TYPE = symbolFor("react.portal");
  REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
  REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
  REACT_PROFILER_TYPE = symbolFor("react.profiler");
  REACT_PROVIDER_TYPE = symbolFor("react.provider");
  REACT_CONTEXT_TYPE = symbolFor("react.context");
  REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
  REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
  REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
  REACT_MEMO_TYPE = symbolFor("react.memo");
  REACT_LAZY_TYPE = symbolFor("react.lazy");
  REACT_SCOPE_TYPE = symbolFor("react.scope");
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
  REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
  REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
  REACT_CACHE_TYPE = symbolFor("react.cache");
}
require("ReactFeatureFlags");
var REACT_MODULE_REFERENCE = 0;
"function" === typeof Symbol &&
  (REACT_MODULE_REFERENCE = Symbol.for("react.module.reference"));
function typeOf(object) {
  if ("object" === typeof object && null !== object) {
    var $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        switch (((object = object.type), object)) {
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_SUSPENSE_LIST_TYPE:
            return object;
          default:
            switch (((object = object && object.$$typeof), object)) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return object;
              default:
                return $$typeof;
            }
        }
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }
}
var ContextProvider = REACT_PROVIDER_TYPE,
  Element = REACT_ELEMENT_TYPE,
  ForwardRef = REACT_FORWARD_REF_TYPE,
  Fragment = REACT_FRAGMENT_TYPE,
  Lazy = REACT_LAZY_TYPE,
  Memo = REACT_MEMO_TYPE,
  Portal = REACT_PORTAL_TYPE,
  Profiler = REACT_PROFILER_TYPE,
  StrictMode = REACT_STRICT_MODE_TYPE,
  Suspense = REACT_SUSPENSE_TYPE,
  SuspenseList = REACT_SUSPENSE_LIST_TYPE;
exports.ContextConsumer = REACT_CONTEXT_TYPE;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.SuspenseList = SuspenseList;
exports.isAsyncMode = function() {
  return !1;
};
exports.isConcurrentMode = function() {
  return !1;
};
exports.isContextConsumer = function(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
};
exports.isContextProvider = function(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
};
exports.isElement = function(object) {
  return (
    "object" === typeof object &&
    null !== object &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
};
exports.isForwardRef = function(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
};
exports.isFragment = function(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
};
exports.isLazy = function(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
};
exports.isMemo = function(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
};
exports.isPortal = function(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
};
exports.isProfiler = function(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
};
exports.isStrictMode = function(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
};
exports.isSuspense = function(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
};
exports.isSuspenseList = function(object) {
  return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
};
exports.isValidElementType = function(type) {
  return "string" === typeof type ||
    "function" === typeof type ||
    type === REACT_FRAGMENT_TYPE ||
    type === REACT_PROFILER_TYPE ||
    type === REACT_DEBUG_TRACING_MODE_TYPE ||
    type === REACT_STRICT_MODE_TYPE ||
    type === REACT_SUSPENSE_TYPE ||
    type === REACT_SUSPENSE_LIST_TYPE ||
    type === REACT_LEGACY_HIDDEN_TYPE ||
    type === REACT_OFFSCREEN_TYPE ||
    type === REACT_SCOPE_TYPE ||
    type === REACT_CACHE_TYPE ||
    ("object" === typeof type &&
      null !== type &&
      (type.$$typeof === REACT_LAZY_TYPE ||
        type.$$typeof === REACT_MEMO_TYPE ||
        type.$$typeof === REACT_PROVIDER_TYPE ||
        type.$$typeof === REACT_CONTEXT_TYPE ||
        type.$$typeof === REACT_FORWARD_REF_TYPE ||
        type.$$typeof === REACT_MODULE_REFERENCE ||
        void 0 !== type.getModuleId))
    ? !0
    : !1;
};
exports.typeOf = typeOf;

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
var React = require("react"),
  Transform = require("art/core/transform"),
  Mode$1 = require("art/modes/current"),
  Scheduler = require("scheduler"),
  FastNoSideEffects = require("art/modes/fast-noSideEffects");
function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i],
          key;
        for (key in source)
          Object.prototype.hasOwnProperty.call(source, key) &&
            (target[key] = source[key]);
      }
      return target;
    };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
function _assertThisInitialized(self) {
  if (void 0 === self)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return self;
}
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
var ReactSharedInternals =
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  REACT_ELEMENT_TYPE = 60103,
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
var MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
function getComponentNameFromType(type) {
  if (null == type) return null;
  if ("function" === typeof type) return type.displayName || type.name || null;
  if ("string" === typeof type) return type;
  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return "Fragment";
    case REACT_PORTAL_TYPE:
      return "Portal";
    case REACT_PROFILER_TYPE:
      return "Profiler";
    case REACT_STRICT_MODE_TYPE:
      return "StrictMode";
    case REACT_SUSPENSE_TYPE:
      return "Suspense";
    case REACT_SUSPENSE_LIST_TYPE:
      return "SuspenseList";
    case REACT_CACHE_TYPE:
      return "Cache";
  }
  if ("object" === typeof type)
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return (type.displayName || "Context") + ".Consumer";
      case REACT_PROVIDER_TYPE:
        return (type._context.displayName || "Context") + ".Provider";
      case REACT_FORWARD_REF_TYPE:
        var innerType = type.render;
        type = type.displayName;
        type ||
          ((type = innerType.displayName || innerType.name || ""),
          (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
        return type;
      case REACT_MEMO_TYPE:
        return (
          (innerType = type.displayName || null),
          null !== innerType
            ? innerType
            : getComponentNameFromType(type.type) || "Memo"
        );
      case REACT_LAZY_TYPE:
        innerType = type._payload;
        type = type._init;
        try {
          return getComponentNameFromType(type(innerType));
        } catch (x) {}
    }
  return null;
}
function getComponentNameFromFiber(fiber) {
  var type = fiber.type;
  switch (fiber.tag) {
    case 24:
      return "Cache";
    case 9:
      return (type.displayName || "Context") + ".Consumer";
    case 10:
      return (type._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (fiber = type.render),
        (fiber = fiber.displayName || fiber.name || ""),
        type.displayName ||
          ("" !== fiber ? "ForwardRef(" + fiber + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return type;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return getComponentNameFromType(type);
    case 23:
      return "LegacyHidden";
    case 8:
      return type === REACT_STRICT_MODE_TYPE ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof type)
        return type.displayName || type.name || null;
      if ("string" === typeof type) return type;
  }
  return null;
}
var dynamicFeatureFlags = require("ReactFeatureFlags"),
  deferRenderPhaseUpdateToNextBatch =
    dynamicFeatureFlags.deferRenderPhaseUpdateToNextBatch,
  skipUnmountedBoundaries = dynamicFeatureFlags.skipUnmountedBoundaries,
  enableUseRefAccessWarning = dynamicFeatureFlags.enableUseRefAccessWarning,
  disableNativeComponentFrames =
    dynamicFeatureFlags.disableNativeComponentFrames,
  disableSchedulerTimeoutInWorkLoop =
    dynamicFeatureFlags.disableSchedulerTimeoutInWorkLoop,
  enableLazyContextPropagation =
    dynamicFeatureFlags.enableLazyContextPropagation;
function getNearestMountedFiber(fiber) {
  var node = fiber,
    nearestMounted = fiber;
  if (fiber.alternate) for (; node.return; ) node = node.return;
  else {
    fiber = node;
    do
      (node = fiber),
        0 !== (node.flags & 4098) && (nearestMounted = node.return),
        (fiber = node.return);
    while (fiber);
  }
  return 3 === node.tag ? nearestMounted : null;
}
function assertIsMounted(fiber) {
  if (getNearestMountedFiber(fiber) !== fiber)
    throw Error(formatProdErrorMessage(188));
}
function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    alternate = getNearestMountedFiber(fiber);
    if (null === alternate) throw Error(formatProdErrorMessage(188));
    return alternate !== fiber ? null : fiber;
  }
  for (var a = fiber, b = alternate; ; ) {
    var parentA = a.return;
    if (null === parentA) break;
    var parentB = parentA.alternate;
    if (null === parentB) {
      b = parentA.return;
      if (null !== b) {
        a = b;
        continue;
      }
      break;
    }
    if (parentA.child === parentB.child) {
      for (parentB = parentA.child; parentB; ) {
        if (parentB === a) return assertIsMounted(parentA), fiber;
        if (parentB === b) return assertIsMounted(parentA), alternate;
        parentB = parentB.sibling;
      }
      throw Error(formatProdErrorMessage(188));
    }
    if (a.return !== b.return) (a = parentA), (b = parentB);
    else {
      for (var didFindChild = !1, child$0 = parentA.child; child$0; ) {
        if (child$0 === a) {
          didFindChild = !0;
          a = parentA;
          b = parentB;
          break;
        }
        if (child$0 === b) {
          didFindChild = !0;
          b = parentA;
          a = parentB;
          break;
        }
        child$0 = child$0.sibling;
      }
      if (!didFindChild) {
        for (child$0 = parentB.child; child$0; ) {
          if (child$0 === a) {
            didFindChild = !0;
            a = parentB;
            b = parentA;
            break;
          }
          if (child$0 === b) {
            didFindChild = !0;
            b = parentB;
            a = parentA;
            break;
          }
          child$0 = child$0.sibling;
        }
        if (!didFindChild) throw Error(formatProdErrorMessage(189));
      }
    }
    if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
  }
  if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
  return a.stateNode.current === a ? fiber : alternate;
}
function findCurrentHostFiberImpl(node) {
  if (5 === node.tag || 6 === node.tag) return node;
  for (node = node.child; null !== node; ) {
    var match = findCurrentHostFiberImpl(node);
    if (null !== match) return match;
    node = node.sibling;
  }
  return null;
}
function isFiberSuspenseAndTimedOut(fiber) {
  var memoizedState = fiber.memoizedState;
  return (
    13 === fiber.tag &&
    null !== memoizedState &&
    null === memoizedState.dehydrated
  );
}
function doesFiberContain(parentFiber, childFiber) {
  for (
    var parentFiberAlternate = parentFiber.alternate;
    null !== childFiber;

  ) {
    if (childFiber === parentFiber || childFiber === parentFiberAlternate)
      return !0;
    childFiber = childFiber.return;
  }
  return !1;
}
var isArrayImpl = Array.isArray,
  TYPES = {
    CLIPPING_RECTANGLE: "ClippingRectangle",
    GROUP: "Group",
    SHAPE: "Shape",
    TEXT: "Text"
  },
  EVENT_TYPES = {
    onClick: "click",
    onMouseMove: "mousemove",
    onMouseOver: "mouseover",
    onMouseOut: "mouseout",
    onMouseUp: "mouseup",
    onMouseDown: "mousedown"
  };
function childrenAsString(children) {
  return children
    ? "string" === typeof children
      ? children
      : children.length
      ? children.join("")
      : ""
    : "";
}
var scheduleCallback = Scheduler.unstable_scheduleCallback,
  cancelCallback = Scheduler.unstable_cancelCallback,
  shouldYield = Scheduler.unstable_shouldYield,
  requestPaint = Scheduler.unstable_requestPaint,
  now = Scheduler.unstable_now,
  ImmediatePriority = Scheduler.unstable_ImmediatePriority,
  UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
  NormalPriority = Scheduler.unstable_NormalPriority,
  IdlePriority = Scheduler.unstable_IdlePriority,
  rendererID = null,
  injectedHook = null;
function onCommitRoot(root) {
  if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
    try {
      injectedHook.onCommitFiberRoot(
        rendererID,
        root,
        void 0,
        128 === (root.current.flags & 128)
      );
    } catch (err) {}
}
var nextTransitionLane = 64,
  nextRetryLane = 4194304;
function getHighestPriorityLanes(lanes) {
  switch (lanes & -lanes) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return lanes & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return lanes & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return lanes;
  }
}
function getNextLanes(root, wipLanes) {
  var pendingLanes = root.pendingLanes;
  if (0 === pendingLanes) return 0;
  var nextLanes = 0,
    suspendedLanes = root.suspendedLanes,
    pingedLanes = root.pingedLanes,
    nonIdlePendingLanes = pendingLanes & 268435455;
  if (0 !== nonIdlePendingLanes) {
    var nonIdleUnblockedLanes = nonIdlePendingLanes & ~suspendedLanes;
    0 !== nonIdleUnblockedLanes
      ? (nextLanes = getHighestPriorityLanes(nonIdleUnblockedLanes))
      : ((pingedLanes &= nonIdlePendingLanes),
        0 !== pingedLanes &&
          (nextLanes = getHighestPriorityLanes(pingedLanes)));
  } else
    (nonIdlePendingLanes = pendingLanes & ~suspendedLanes),
      0 !== nonIdlePendingLanes
        ? (nextLanes = getHighestPriorityLanes(nonIdlePendingLanes))
        : 0 !== pingedLanes &&
          (nextLanes = getHighestPriorityLanes(pingedLanes));
  if (0 === nextLanes) return 0;
  if (
    0 !== wipLanes &&
    wipLanes !== nextLanes &&
    0 === (wipLanes & suspendedLanes) &&
    ((suspendedLanes = nextLanes & -nextLanes),
    (pingedLanes = wipLanes & -wipLanes),
    suspendedLanes >= pingedLanes ||
      (16 === suspendedLanes && 0 !== (pingedLanes & 4194240)))
  )
    return wipLanes;
  0 === (root.current.mode & 32) &&
    0 !== (nextLanes & 4) &&
    (nextLanes |= pendingLanes & 16);
  wipLanes = root.entangledLanes;
  if (0 !== wipLanes)
    for (root = root.entanglements, wipLanes &= nextLanes; 0 < wipLanes; )
      (pendingLanes = 31 - clz32(wipLanes)),
        (suspendedLanes = 1 << pendingLanes),
        (nextLanes |= root[pendingLanes]),
        (wipLanes &= ~suspendedLanes);
  return nextLanes;
}
function computeExpirationTime(lane, currentTime) {
  switch (lane) {
    case 1:
    case 2:
    case 4:
      return currentTime + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return currentTime + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function getLanesToRetrySynchronouslyOnError(root) {
  root = root.pendingLanes & -1073741825;
  return 0 !== root ? root : root & 1073741824 ? 1073741824 : 0;
}
function includesBlockingLane(root, lanes) {
  return 0 !== (root.current.mode & 32) ? !1 : 0 !== (lanes & 30);
}
function createLaneMap(initial) {
  for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
  return laneMap;
}
function markRootUpdated(root, updateLane, eventTime) {
  root.pendingLanes |= updateLane;
  536870912 !== updateLane &&
    ((root.suspendedLanes = 0), (root.pingedLanes = 0));
  root = root.eventTimes;
  updateLane = 31 - clz32(updateLane);
  root[updateLane] = eventTime;
}
function markRootFinished(root, remainingLanes) {
  var noLongerPendingLanes = root.pendingLanes & ~remainingLanes;
  root.pendingLanes = remainingLanes;
  root.suspendedLanes = 0;
  root.pingedLanes = 0;
  root.expiredLanes &= remainingLanes;
  root.mutableReadLanes &= remainingLanes;
  root.entangledLanes &= remainingLanes;
  0 === (root.pooledCacheLanes &= remainingLanes) && (root.pooledCache = null);
  remainingLanes = root.entanglements;
  var eventTimes = root.eventTimes;
  for (root = root.expirationTimes; 0 < noLongerPendingLanes; ) {
    var index$5 = 31 - clz32(noLongerPendingLanes),
      lane = 1 << index$5;
    remainingLanes[index$5] = 0;
    eventTimes[index$5] = -1;
    root[index$5] = -1;
    noLongerPendingLanes &= ~lane;
  }
}
function markRootEntangled(root, entangledLanes) {
  var rootEntangledLanes = (root.entangledLanes |= entangledLanes);
  for (root = root.entanglements; rootEntangledLanes; ) {
    var index$6 = 31 - clz32(rootEntangledLanes),
      lane = 1 << index$6;
    (lane & entangledLanes) | (root[index$6] & entangledLanes) &&
      (root[index$6] |= entangledLanes);
    rootEntangledLanes &= ~lane;
  }
}
var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback,
  log = Math.log,
  LN2 = Math.LN2;
function clz32Fallback(lanes) {
  return 0 === lanes ? 32 : (31 - ((log(lanes) / LN2) | 0)) | 0;
}
var currentUpdatePriority = 0;
function lanesToEventPriority(lanes) {
  lanes &= -lanes;
  return 1 < lanes
    ? 4 < lanes
      ? 0 !== (lanes & 268435455)
        ? 16
        : 536870912
      : 4
    : 1;
}
function shim() {
  throw Error(formatProdErrorMessage(305));
}
function shim$1() {
  throw Error(formatProdErrorMessage(357));
}
var pooledTransform = new Transform(),
  NO_CONTEXT = {},
  UPDATE_SIGNAL = {};
function createEventHandler(instance) {
  return function(event) {
    var listener = instance._listeners[event.type];
    listener &&
      ("function" === typeof listener
        ? listener.call(instance, event)
        : listener.handleEvent && listener.handleEvent(event));
  };
}
function destroyEventListeners(instance) {
  if (instance._subscriptions)
    for (var type in instance._subscriptions) instance._subscriptions[type]();
  instance._subscriptions = null;
  instance._listeners = null;
}
function applyClippingRectangleProps(instance, props) {
  applyNodeProps(
    instance,
    props,
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
  );
  instance.width = props.width;
  instance.height = props.height;
}
function applyGroupProps(instance, props) {
  applyNodeProps(
    instance,
    props,
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
  );
  instance.width = props.width;
  instance.height = props.height;
}
function applyNodeProps(instance, props) {
  var prevProps =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
  var JSCompiler_inline_result =
    null != props.scaleX ? props.scaleX : null != props.scale ? props.scale : 1;
  var JSCompiler_inline_result$jscomp$0 =
    null != props.scaleY ? props.scaleY : null != props.scale ? props.scale : 1;
  pooledTransform
    .transformTo(1, 0, 0, 1, 0, 0)
    .move(props.x || 0, props.y || 0)
    .rotate(props.rotation || 0, props.originX, props.originY)
    .scale(
      JSCompiler_inline_result,
      JSCompiler_inline_result$jscomp$0,
      props.originX,
      props.originY
    );
  null != props.transform && pooledTransform.transform(props.transform);
  (instance.xx === pooledTransform.xx &&
    instance.yx === pooledTransform.yx &&
    instance.xy === pooledTransform.xy &&
    instance.yy === pooledTransform.yy &&
    instance.x === pooledTransform.x &&
    instance.y === pooledTransform.y) ||
    instance.transformTo(pooledTransform);
  (props.cursor === prevProps.cursor && props.title === prevProps.title) ||
    instance.indicate(props.cursor, props.title);
  instance.blend &&
    props.opacity !== prevProps.opacity &&
    instance.blend(null == props.opacity ? 1 : props.opacity);
  props.visible !== prevProps.visible &&
    (null == props.visible || props.visible
      ? instance.show()
      : instance.hide());
  for (var type in EVENT_TYPES)
    (prevProps = instance),
      (JSCompiler_inline_result = EVENT_TYPES[type]),
      (JSCompiler_inline_result$jscomp$0 = props[type]),
      prevProps._listeners ||
        ((prevProps._listeners = {}), (prevProps._subscriptions = {})),
      (prevProps._listeners[
        JSCompiler_inline_result
      ] = JSCompiler_inline_result$jscomp$0)
        ? prevProps._subscriptions[JSCompiler_inline_result] ||
          (prevProps._subscriptions[
            JSCompiler_inline_result
          ] = prevProps.subscribe(
            JSCompiler_inline_result,
            createEventHandler(prevProps),
            prevProps
          ))
        : prevProps._subscriptions[JSCompiler_inline_result] &&
          (prevProps._subscriptions[JSCompiler_inline_result](),
          delete prevProps._subscriptions[JSCompiler_inline_result]);
}
function applyRenderableNodeProps(instance, props) {
  var prevProps =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
  applyNodeProps(instance, props, prevProps);
  prevProps.fill !== props.fill &&
    (props.fill && props.fill.applyFill
      ? props.fill.applyFill(instance)
      : instance.fill(props.fill));
  (prevProps.stroke === props.stroke &&
    prevProps.strokeWidth === props.strokeWidth &&
    prevProps.strokeCap === props.strokeCap &&
    prevProps.strokeJoin === props.strokeJoin &&
    prevProps.strokeDash === props.strokeDash) ||
    instance.stroke(
      props.stroke,
      props.strokeWidth,
      props.strokeCap,
      props.strokeJoin,
      props.strokeDash
    );
}
function applyShapeProps(instance, props) {
  var prevProps =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
  applyRenderableNodeProps(instance, props, prevProps);
  var path = props.d || childrenAsString(props.children),
    prevDelta = instance._prevDelta;
  if (
    path !== instance._prevPath ||
    path.delta !== prevDelta ||
    prevProps.height !== props.height ||
    prevProps.width !== props.width
  )
    instance.draw(path, props.width, props.height),
      (instance._prevDelta = path.delta),
      (instance._prevPath = path);
}
function applyTextProps(instance, props) {
  var prevProps =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
  applyRenderableNodeProps(instance, props, prevProps);
  var string = props.children,
    JSCompiler_temp;
  if (!(JSCompiler_temp = instance._currentString !== string)) {
    JSCompiler_temp = props.font;
    var newFont = prevProps.font;
    JSCompiler_temp =
      JSCompiler_temp === newFont
        ? !0
        : "string" === typeof newFont || "string" === typeof JSCompiler_temp
        ? !1
        : newFont.fontSize === JSCompiler_temp.fontSize &&
          newFont.fontStyle === JSCompiler_temp.fontStyle &&
          newFont.fontVariant === JSCompiler_temp.fontVariant &&
          newFont.fontWeight === JSCompiler_temp.fontWeight &&
          newFont.fontFamily === JSCompiler_temp.fontFamily;
    JSCompiler_temp = !JSCompiler_temp;
  }
  if (
    JSCompiler_temp ||
    props.alignment !== prevProps.alignment ||
    props.path !== prevProps.path
  )
    instance.draw(string, props.font, props.alignment, props.path),
      (instance._currentString = string);
}
var scheduleTimeout = setTimeout,
  cancelTimeout = clearTimeout;
function shouldSetTextContent(type, props) {
  return (
    "string" === typeof props.children || "number" === typeof props.children
  );
}
var prefix;
function describeBuiltInComponentFrame(name) {
  if (void 0 === prefix)
    try {
      throw Error();
    } catch (x) {
      var match = x.stack.trim().match(/\n( *(at )?)/);
      prefix = (match && match[1]) || "";
    }
  return "\n" + prefix + name;
}
var reentry = !1;
function describeNativeComponentFrame(fn, construct) {
  if (disableNativeComponentFrames || !fn || reentry) return "";
  reentry = !0;
  var previousPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (construct)
      if (
        ((construct = function() {
          throw Error();
        }),
        Object.defineProperty(construct.prototype, "props", {
          set: function() {
            throw Error();
          }
        }),
        "object" === typeof Reflect && Reflect.construct)
      ) {
        try {
          Reflect.construct(construct, []);
        } catch (x) {
          var control = x;
        }
        Reflect.construct(fn, [], construct);
      } else {
        try {
          construct.call();
        } catch (x$7) {
          control = x$7;
        }
        fn.call(construct.prototype);
      }
    else {
      try {
        throw Error();
      } catch (x$8) {
        control = x$8;
      }
      fn();
    }
  } catch (sample) {
    if (sample && control && "string" === typeof sample.stack) {
      for (
        var sampleLines = sample.stack.split("\n"),
          controlLines = control.stack.split("\n"),
          s = sampleLines.length - 1,
          c = controlLines.length - 1;
        1 <= s && 0 <= c && sampleLines[s] !== controlLines[c];

      )
        c--;
      for (; 1 <= s && 0 <= c; s--, c--)
        if (sampleLines[s] !== controlLines[c]) {
          if (1 !== s || 1 !== c) {
            do
              if ((s--, c--, 0 > c || sampleLines[s] !== controlLines[c])) {
                var frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                fn.displayName &&
                  frame.includes("<anonymous>") &&
                  (frame = frame.replace("<anonymous>", fn.displayName));
                return frame;
              }
            while (1 <= s && 0 <= c);
          }
          break;
        }
    }
  } finally {
    (reentry = !1), (Error.prepareStackTrace = previousPrepareStackTrace);
  }
  return (fn = fn ? fn.displayName || fn.name : "")
    ? describeBuiltInComponentFrame(fn)
    : "";
}
var hasOwnProperty = Object.prototype.hasOwnProperty,
  valueStack = [],
  index = -1;
function pop(cursor) {
  0 > index ||
    ((cursor.current = valueStack[index]), (valueStack[index] = null), index--);
}
function push(cursor, value) {
  index++;
  valueStack[index] = cursor.current;
  cursor.current = value;
}
var emptyContextObject = {};
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs = "function" === typeof Object.is ? Object.is : is,
  syncQueue = null,
  includesLegacySyncCallbacks = !1,
  isFlushingSyncQueue = !1;
function flushSyncCallbacks() {
  if (!isFlushingSyncQueue && null !== syncQueue) {
    isFlushingSyncQueue = !0;
    var i = 0,
      previousUpdatePriority = currentUpdatePriority;
    try {
      var queue = syncQueue;
      for (currentUpdatePriority = 1; i < queue.length; i++) {
        var callback = queue[i];
        do callback = callback(!0);
        while (null !== callback);
      }
      syncQueue = null;
      includesLegacySyncCallbacks = !1;
    } catch (error) {
      throw (null !== syncQueue && (syncQueue = syncQueue.slice(i + 1)),
      scheduleCallback(ImmediatePriority, flushSyncCallbacks),
      error);
    } finally {
      (currentUpdatePriority = previousUpdatePriority),
        (isFlushingSyncQueue = !1);
    }
  }
  return null;
}
var ReactCurrentBatchConfig = ReactSharedInternals.ReactCurrentBatchConfig;
function shallowEqual(objA, objB) {
  if (objectIs(objA, objB)) return !0;
  if (
    "object" !== typeof objA ||
    null === objA ||
    "object" !== typeof objB ||
    null === objB
  )
    return !1;
  var keysA = Object.keys(objA),
    keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return !1;
  for (keysB = 0; keysB < keysA.length; keysB++) {
    var currentKey = keysA[keysB];
    if (
      !hasOwnProperty.call(objB, currentKey) ||
      !objectIs(objA[currentKey], objB[currentKey])
    )
      return !1;
  }
  return !0;
}
function describeFiber(fiber) {
  switch (fiber.tag) {
    case 5:
      return describeBuiltInComponentFrame(fiber.type);
    case 16:
      return describeBuiltInComponentFrame("Lazy");
    case 13:
      return describeBuiltInComponentFrame("Suspense");
    case 19:
      return describeBuiltInComponentFrame("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (fiber = describeNativeComponentFrame(fiber.type, !1)), fiber;
    case 11:
      return (
        (fiber = describeNativeComponentFrame(fiber.type.render, !1)), fiber
      );
    case 1:
      return (fiber = describeNativeComponentFrame(fiber.type, !0)), fiber;
    default:
      return "";
  }
}
function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    baseProps = Object.assign({}, baseProps);
    Component = Component.defaultProps;
    for (var propName in Component)
      void 0 === baseProps[propName] &&
        (baseProps[propName] = Component[propName]);
    return baseProps;
  }
  return baseProps;
}
var valueCursor = { current: null },
  currentlyRenderingFiber = null,
  lastContextDependency = null,
  lastFullyObservedContext = null;
function resetContextDependencies() {
  lastFullyObservedContext = lastContextDependency = currentlyRenderingFiber = null;
}
function pushProvider(providerFiber, context, nextValue) {
  push(valueCursor, context._currentValue2);
  context._currentValue2 = nextValue;
}
function popProvider(context) {
  var currentValue = valueCursor.current;
  pop(valueCursor);
  context._currentValue2 = currentValue;
}
function scheduleWorkOnParentPath(parent, renderLanes) {
  for (; null !== parent; ) {
    var alternate = parent.alternate;
    if ((parent.childLanes & renderLanes) === renderLanes)
      if (
        null === alternate ||
        (alternate.childLanes & renderLanes) === renderLanes
      )
        break;
      else alternate.childLanes |= renderLanes;
    else
      (parent.childLanes |= renderLanes),
        null !== alternate && (alternate.childLanes |= renderLanes);
    parent = parent.return;
  }
}
function propagateContextChange(workInProgress, context, renderLanes) {
  if (enableLazyContextPropagation)
    propagateContextChanges(workInProgress, [context], renderLanes, !0);
  else if (!enableLazyContextPropagation) {
    var fiber = workInProgress.child;
    null !== fiber && (fiber.return = workInProgress);
    for (; null !== fiber; ) {
      var list = fiber.dependencies;
      if (null !== list) {
        var nextFiber = fiber.child;
        for (var dependency = list.firstContext; null !== dependency; ) {
          if (dependency.context === context) {
            if (1 === fiber.tag) {
              dependency = createUpdate(-1, renderLanes & -renderLanes);
              dependency.tag = 2;
              var updateQueue = fiber.updateQueue;
              if (null !== updateQueue) {
                updateQueue = updateQueue.shared;
                var pending = updateQueue.pending;
                null === pending
                  ? (dependency.next = dependency)
                  : ((dependency.next = pending.next),
                    (pending.next = dependency));
                updateQueue.pending = dependency;
              }
            }
            fiber.lanes |= renderLanes;
            dependency = fiber.alternate;
            null !== dependency && (dependency.lanes |= renderLanes);
            scheduleWorkOnParentPath(fiber.return, renderLanes);
            list.lanes |= renderLanes;
            break;
          }
          dependency = dependency.next;
        }
      } else if (10 === fiber.tag)
        nextFiber = fiber.type === workInProgress.type ? null : fiber.child;
      else if (18 === fiber.tag) {
        nextFiber = fiber.return;
        if (null === nextFiber) throw Error(formatProdErrorMessage(341));
        nextFiber.lanes |= renderLanes;
        list = nextFiber.alternate;
        null !== list && (list.lanes |= renderLanes);
        scheduleWorkOnParentPath(nextFiber, renderLanes);
        nextFiber = fiber.sibling;
      } else nextFiber = fiber.child;
      if (null !== nextFiber) nextFiber.return = fiber;
      else
        for (nextFiber = fiber; null !== nextFiber; ) {
          if (nextFiber === workInProgress) {
            nextFiber = null;
            break;
          }
          fiber = nextFiber.sibling;
          if (null !== fiber) {
            fiber.return = nextFiber.return;
            nextFiber = fiber;
            break;
          }
          nextFiber = nextFiber.return;
        }
      fiber = nextFiber;
    }
  }
}
function propagateContextChanges(
  workInProgress,
  contexts,
  renderLanes,
  forcePropagateEntireTree
) {
  if (enableLazyContextPropagation) {
    var fiber = workInProgress.child;
    null !== fiber && (fiber.return = workInProgress);
    for (; null !== fiber; ) {
      var list = fiber.dependencies;
      if (null !== list) {
        var nextFiber = fiber.child;
        list = list.firstContext;
        a: for (; null !== list; ) {
          var dependency = list;
          list = fiber;
          for (var i = 0; i < contexts.length; i++)
            if (dependency.context === contexts[i]) {
              list.lanes |= renderLanes;
              dependency = list.alternate;
              null !== dependency && (dependency.lanes |= renderLanes);
              scheduleWorkOnParentPath(list.return, renderLanes);
              forcePropagateEntireTree || (nextFiber = null);
              break a;
            }
          list = dependency.next;
        }
      } else if (18 === fiber.tag) {
        nextFiber = fiber.return;
        if (null === nextFiber) throw Error(formatProdErrorMessage(341));
        nextFiber.lanes |= renderLanes;
        list = nextFiber.alternate;
        null !== list && (list.lanes |= renderLanes);
        scheduleWorkOnParentPath(nextFiber, renderLanes);
        nextFiber = null;
      } else nextFiber = fiber.child;
      if (null !== nextFiber) nextFiber.return = fiber;
      else
        for (nextFiber = fiber; null !== nextFiber; ) {
          if (nextFiber === workInProgress) {
            nextFiber = null;
            break;
          }
          fiber = nextFiber.sibling;
          if (null !== fiber) {
            fiber.return = nextFiber.return;
            nextFiber = fiber;
            break;
          }
          nextFiber = nextFiber.return;
        }
      fiber = nextFiber;
    }
  }
}
function propagateParentContextChanges(
  current,
  workInProgress,
  renderLanes,
  forcePropagateEntireTree
) {
  if (enableLazyContextPropagation) {
    current = null;
    for (
      var parent = workInProgress, isInsidePropagationBailout = !1;
      null !== parent;

    ) {
      if (!isInsidePropagationBailout)
        if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = !0;
        else if (0 !== (parent.flags & 262144)) break;
      if (10 === parent.tag) {
        var currentParent = parent.alternate;
        if (null === currentParent) throw Error(formatProdErrorMessage(387));
        currentParent = currentParent.memoizedProps;
        if (null !== currentParent) {
          var context = parent.type._context;
          objectIs(parent.pendingProps.value, currentParent.value) ||
            (null !== current ? current.push(context) : (current = [context]));
        }
      }
      parent = parent.return;
    }
    null !== current &&
      propagateContextChanges(
        workInProgress,
        current,
        renderLanes,
        forcePropagateEntireTree
      );
    workInProgress.flags |= 262144;
  }
}
function checkIfContextChanged(currentDependencies) {
  if (!enableLazyContextPropagation) return !1;
  for (
    currentDependencies = currentDependencies.firstContext;
    null !== currentDependencies;

  ) {
    if (
      !objectIs(
        currentDependencies.context._currentValue2,
        currentDependencies.memoizedValue
      )
    )
      return !0;
    currentDependencies = currentDependencies.next;
  }
  return !1;
}
function prepareToReadContext(workInProgress, renderLanes) {
  currentlyRenderingFiber = workInProgress;
  lastFullyObservedContext = lastContextDependency = null;
  workInProgress = workInProgress.dependencies;
  null !== workInProgress &&
    (enableLazyContextPropagation
      ? (workInProgress.firstContext = null)
      : null !== workInProgress.firstContext &&
        (0 !== (workInProgress.lanes & renderLanes) && (didReceiveUpdate = !0),
        (workInProgress.firstContext = null)));
}
function readContext(context) {
  var value = context._currentValue2;
  if (lastFullyObservedContext !== context)
    if (
      ((context = { context: context, memoizedValue: value, next: null }),
      null === lastContextDependency)
    ) {
      if (null === currentlyRenderingFiber)
        throw Error(formatProdErrorMessage(308));
      lastContextDependency = context;
      currentlyRenderingFiber.dependencies = {
        lanes: 0,
        firstContext: context
      };
      enableLazyContextPropagation && (currentlyRenderingFiber.flags |= 524288);
    } else lastContextDependency = lastContextDependency.next = context;
  return value;
}
var interleavedQueues = null,
  hasForceUpdate = !1;
function initializeUpdateQueue(fiber) {
  fiber.updateQueue = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null
  };
}
function cloneUpdateQueue(current, workInProgress) {
  current = current.updateQueue;
  workInProgress.updateQueue === current &&
    (workInProgress.updateQueue = {
      baseState: current.baseState,
      firstBaseUpdate: current.firstBaseUpdate,
      lastBaseUpdate: current.lastBaseUpdate,
      shared: current.shared,
      effects: current.effects
    });
}
function createUpdate(eventTime, lane) {
  return {
    eventTime: eventTime,
    lane: lane,
    tag: 0,
    payload: null,
    callback: null,
    next: null
  };
}
function enqueueUpdate(fiber, update) {
  var updateQueue = fiber.updateQueue;
  null !== updateQueue &&
    ((updateQueue = updateQueue.shared),
    null === workInProgressRoot ||
    0 === (fiber.mode & 1) ||
    (!deferRenderPhaseUpdateToNextBatch && 0 !== (executionContext & 2))
      ? ((fiber = updateQueue.pending),
        null === fiber
          ? (update.next = update)
          : ((update.next = fiber.next), (fiber.next = update)),
        (updateQueue.pending = update))
      : ((fiber = updateQueue.interleaved),
        null === fiber
          ? ((update.next = update),
            null === interleavedQueues
              ? (interleavedQueues = [updateQueue])
              : interleavedQueues.push(updateQueue))
          : ((update.next = fiber.next), (fiber.next = update)),
        (updateQueue.interleaved = update)));
}
function entangleTransitions(root, fiber, lane) {
  fiber = fiber.updateQueue;
  if (null !== fiber && ((fiber = fiber.shared), 0 !== (lane & 4194240))) {
    var queueLanes = fiber.lanes;
    queueLanes &= root.pendingLanes;
    lane |= queueLanes;
    fiber.lanes = lane;
    markRootEntangled(root, lane);
  }
}
function enqueueCapturedUpdate(workInProgress, capturedUpdate) {
  var queue = workInProgress.updateQueue,
    current = workInProgress.alternate;
  if (
    null !== current &&
    ((current = current.updateQueue), queue === current)
  ) {
    var newFirst = null,
      newLast = null;
    queue = queue.firstBaseUpdate;
    if (null !== queue) {
      do {
        var clone = {
          eventTime: queue.eventTime,
          lane: queue.lane,
          tag: queue.tag,
          payload: queue.payload,
          callback: queue.callback,
          next: null
        };
        null === newLast
          ? (newFirst = newLast = clone)
          : (newLast = newLast.next = clone);
        queue = queue.next;
      } while (null !== queue);
      null === newLast
        ? (newFirst = newLast = capturedUpdate)
        : (newLast = newLast.next = capturedUpdate);
    } else newFirst = newLast = capturedUpdate;
    queue = {
      baseState: current.baseState,
      firstBaseUpdate: newFirst,
      lastBaseUpdate: newLast,
      shared: current.shared,
      effects: current.effects
    };
    workInProgress.updateQueue = queue;
    return;
  }
  workInProgress = queue.lastBaseUpdate;
  null === workInProgress
    ? (queue.firstBaseUpdate = capturedUpdate)
    : (workInProgress.next = capturedUpdate);
  queue.lastBaseUpdate = capturedUpdate;
}
function processUpdateQueue(
  workInProgress$jscomp$0,
  props,
  instance,
  renderLanes
) {
  var queue = workInProgress$jscomp$0.updateQueue;
  hasForceUpdate = !1;
  var firstBaseUpdate = queue.firstBaseUpdate,
    lastBaseUpdate = queue.lastBaseUpdate,
    pendingQueue = queue.shared.pending;
  if (null !== pendingQueue) {
    queue.shared.pending = null;
    var lastPendingUpdate = pendingQueue,
      firstPendingUpdate = lastPendingUpdate.next;
    lastPendingUpdate.next = null;
    null === lastBaseUpdate
      ? (firstBaseUpdate = firstPendingUpdate)
      : (lastBaseUpdate.next = firstPendingUpdate);
    lastBaseUpdate = lastPendingUpdate;
    var current = workInProgress$jscomp$0.alternate;
    null !== current &&
      ((current = current.updateQueue),
      (pendingQueue = current.lastBaseUpdate),
      pendingQueue !== lastBaseUpdate &&
        (null === pendingQueue
          ? (current.firstBaseUpdate = firstPendingUpdate)
          : (pendingQueue.next = firstPendingUpdate),
        (current.lastBaseUpdate = lastPendingUpdate)));
  }
  if (null !== firstBaseUpdate) {
    var newState = queue.baseState;
    lastBaseUpdate = 0;
    current = firstPendingUpdate = lastPendingUpdate = null;
    pendingQueue = firstBaseUpdate;
    do {
      var updateLane = pendingQueue.lane,
        updateEventTime = pendingQueue.eventTime;
      if ((renderLanes & updateLane) === updateLane) {
        null !== current &&
          (current = current.next = {
            eventTime: updateEventTime,
            lane: 0,
            tag: pendingQueue.tag,
            payload: pendingQueue.payload,
            callback: pendingQueue.callback,
            next: null
          });
        a: {
          var workInProgress = workInProgress$jscomp$0,
            update = pendingQueue;
          updateLane = props;
          updateEventTime = instance;
          switch (update.tag) {
            case 1:
              workInProgress = update.payload;
              if ("function" === typeof workInProgress) {
                newState = workInProgress.call(
                  updateEventTime,
                  newState,
                  updateLane
                );
                break a;
              }
              newState = workInProgress;
              break a;
            case 3:
              workInProgress.flags = (workInProgress.flags & -65537) | 128;
            case 0:
              workInProgress = update.payload;
              updateLane =
                "function" === typeof workInProgress
                  ? workInProgress.call(updateEventTime, newState, updateLane)
                  : workInProgress;
              if (null === updateLane || void 0 === updateLane) break a;
              newState = Object.assign({}, newState, updateLane);
              break a;
            case 2:
              hasForceUpdate = !0;
          }
        }
        null !== pendingQueue.callback &&
          0 !== pendingQueue.lane &&
          ((workInProgress$jscomp$0.flags |= 64),
          (updateLane = queue.effects),
          null === updateLane
            ? (queue.effects = [pendingQueue])
            : updateLane.push(pendingQueue));
      } else
        (updateEventTime = {
          eventTime: updateEventTime,
          lane: updateLane,
          tag: pendingQueue.tag,
          payload: pendingQueue.payload,
          callback: pendingQueue.callback,
          next: null
        }),
          null === current
            ? ((firstPendingUpdate = current = updateEventTime),
              (lastPendingUpdate = newState))
            : (current = current.next = updateEventTime),
          (lastBaseUpdate |= updateLane);
      pendingQueue = pendingQueue.next;
      if (null === pendingQueue)
        if (((pendingQueue = queue.shared.pending), null === pendingQueue))
          break;
        else
          (updateLane = pendingQueue),
            (pendingQueue = updateLane.next),
            (updateLane.next = null),
            (queue.lastBaseUpdate = updateLane),
            (queue.shared.pending = null);
    } while (1);
    null === current && (lastPendingUpdate = newState);
    queue.baseState = lastPendingUpdate;
    queue.firstBaseUpdate = firstPendingUpdate;
    queue.lastBaseUpdate = current;
    props = queue.shared.interleaved;
    if (null !== props) {
      queue = props;
      do (lastBaseUpdate |= queue.lane), (queue = queue.next);
      while (queue !== props);
    } else null === firstBaseUpdate && (queue.shared.lanes = 0);
    workInProgressRootSkippedLanes |= lastBaseUpdate;
    workInProgress$jscomp$0.lanes = lastBaseUpdate;
    workInProgress$jscomp$0.memoizedState = newState;
  }
}
function commitUpdateQueue(finishedWork, finishedQueue, instance) {
  finishedWork = finishedQueue.effects;
  finishedQueue.effects = null;
  if (null !== finishedWork)
    for (
      finishedQueue = 0;
      finishedQueue < finishedWork.length;
      finishedQueue++
    ) {
      var effect = finishedWork[finishedQueue],
        callback = effect.callback;
      if (null !== callback) {
        effect.callback = null;
        effect = instance;
        if ("function" !== typeof callback)
          throw Error(formatProdErrorMessage(191, callback));
        callback.call(effect);
      }
    }
}
var emptyRefsObject = new React.Component().refs;
function applyDerivedStateFromProps(
  workInProgress,
  ctor,
  getDerivedStateFromProps,
  nextProps
) {
  ctor = workInProgress.memoizedState;
  getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
  getDerivedStateFromProps =
    null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps
      ? ctor
      : Object.assign({}, ctor, getDerivedStateFromProps);
  workInProgress.memoizedState = getDerivedStateFromProps;
  0 === workInProgress.lanes &&
    (workInProgress.updateQueue.baseState = getDerivedStateFromProps);
}
var classComponentUpdater = {
  isMounted: function(component) {
    return (component = component._reactInternals)
      ? getNearestMountedFiber(component) === component
      : !1;
  },
  enqueueSetState: function(inst, payload, callback) {
    inst = inst._reactInternals;
    var eventTime = requestEventTime(),
      lane = requestUpdateLane(inst),
      update = createUpdate(eventTime, lane);
    update.payload = payload;
    void 0 !== callback && null !== callback && (update.callback = callback);
    enqueueUpdate(inst, update);
    payload = scheduleUpdateOnFiber(inst, lane, eventTime);
    null !== payload && entangleTransitions(payload, inst, lane);
  },
  enqueueReplaceState: function(inst, payload, callback) {
    inst = inst._reactInternals;
    var eventTime = requestEventTime(),
      lane = requestUpdateLane(inst),
      update = createUpdate(eventTime, lane);
    update.tag = 1;
    update.payload = payload;
    void 0 !== callback && null !== callback && (update.callback = callback);
    enqueueUpdate(inst, update);
    payload = scheduleUpdateOnFiber(inst, lane, eventTime);
    null !== payload && entangleTransitions(payload, inst, lane);
  },
  enqueueForceUpdate: function(inst, callback) {
    inst = inst._reactInternals;
    var eventTime = requestEventTime(),
      lane = requestUpdateLane(inst),
      update = createUpdate(eventTime, lane);
    update.tag = 2;
    void 0 !== callback && null !== callback && (update.callback = callback);
    enqueueUpdate(inst, update);
    callback = scheduleUpdateOnFiber(inst, lane, eventTime);
    null !== callback && entangleTransitions(callback, inst, lane);
  }
};
function checkShouldComponentUpdate(
  workInProgress,
  ctor,
  oldProps,
  newProps,
  oldState,
  newState,
  nextContext
) {
  workInProgress = workInProgress.stateNode;
  return "function" === typeof workInProgress.shouldComponentUpdate
    ? workInProgress.shouldComponentUpdate(newProps, newState, nextContext)
    : ctor.prototype && ctor.prototype.isPureReactComponent
    ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
    : !0;
}
function constructClassInstance(workInProgress, ctor, props) {
  var context = emptyContextObject,
    contextType = ctor.contextType;
  "object" === typeof contextType &&
    null !== contextType &&
    (context = readContext(contextType));
  ctor = new ctor(props, context);
  workInProgress.memoizedState =
    null !== ctor.state && void 0 !== ctor.state ? ctor.state : null;
  ctor.updater = classComponentUpdater;
  workInProgress.stateNode = ctor;
  ctor._reactInternals = workInProgress;
  return ctor;
}
function callComponentWillReceiveProps(
  workInProgress,
  instance,
  newProps,
  nextContext
) {
  workInProgress = instance.state;
  "function" === typeof instance.componentWillReceiveProps &&
    instance.componentWillReceiveProps(newProps, nextContext);
  "function" === typeof instance.UNSAFE_componentWillReceiveProps &&
    instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  instance.state !== workInProgress &&
    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
}
function mountClassInstance(workInProgress, ctor, newProps, renderLanes) {
  var instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
  instance.refs = emptyRefsObject;
  initializeUpdateQueue(workInProgress);
  var contextType = ctor.contextType;
  instance.context =
    "object" === typeof contextType && null !== contextType
      ? readContext(contextType)
      : emptyContextObject;
  instance.state = workInProgress.memoizedState;
  contextType = ctor.getDerivedStateFromProps;
  "function" === typeof contextType &&
    (applyDerivedStateFromProps(workInProgress, ctor, contextType, newProps),
    (instance.state = workInProgress.memoizedState));
  "function" === typeof ctor.getDerivedStateFromProps ||
    "function" === typeof instance.getSnapshotBeforeUpdate ||
    ("function" !== typeof instance.UNSAFE_componentWillMount &&
      "function" !== typeof instance.componentWillMount) ||
    ((ctor = instance.state),
    "function" === typeof instance.componentWillMount &&
      instance.componentWillMount(),
    "function" === typeof instance.UNSAFE_componentWillMount &&
      instance.UNSAFE_componentWillMount(),
    ctor !== instance.state &&
      classComponentUpdater.enqueueReplaceState(instance, instance.state, null),
    processUpdateQueue(workInProgress, newProps, instance, renderLanes),
    (instance.state = workInProgress.memoizedState));
  "function" === typeof instance.componentDidMount &&
    (workInProgress.flags |= 2097156);
}
function coerceRef(returnFiber, current, element) {
  returnFiber = element.ref;
  if (
    null !== returnFiber &&
    "function" !== typeof returnFiber &&
    "object" !== typeof returnFiber
  ) {
    if (element._owner) {
      element = element._owner;
      if (element) {
        if (1 !== element.tag) throw Error(formatProdErrorMessage(309));
        var inst = element.stateNode;
      }
      if (!inst) throw Error(formatProdErrorMessage(147, returnFiber));
      var resolvedInst = inst,
        stringRef = "" + returnFiber;
      if (
        null !== current &&
        null !== current.ref &&
        "function" === typeof current.ref &&
        current.ref._stringRef === stringRef
      )
        return current.ref;
      current = function(value) {
        var refs = resolvedInst.refs;
        refs === emptyRefsObject && (refs = resolvedInst.refs = {});
        null === value ? delete refs[stringRef] : (refs[stringRef] = value);
      };
      current._stringRef = stringRef;
      return current;
    }
    if ("string" !== typeof returnFiber)
      throw Error(formatProdErrorMessage(284));
    if (!element._owner) throw Error(formatProdErrorMessage(290, returnFiber));
  }
  return returnFiber;
}
function throwOnInvalidObjectType(returnFiber, newChild) {
  returnFiber = Object.prototype.toString.call(newChild);
  throw Error(
    formatProdErrorMessage(
      31,
      "[object Object]" === returnFiber
        ? "object with keys {" + Object.keys(newChild).join(", ") + "}"
        : returnFiber
    )
  );
}
function resolveLazy(lazyType) {
  var init = lazyType._init;
  return init(lazyType._payload);
}
function ChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (shouldTrackSideEffects) {
      var deletions = returnFiber.deletions;
      null === deletions
        ? ((returnFiber.deletions = [childToDelete]), (returnFiber.flags |= 16))
        : deletions.push(childToDelete);
    }
  }
  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) return null;
    for (; null !== currentFirstChild; )
      deleteChild(returnFiber, currentFirstChild),
        (currentFirstChild = currentFirstChild.sibling);
    return null;
  }
  function mapRemainingChildren(returnFiber, currentFirstChild) {
    for (returnFiber = new Map(); null !== currentFirstChild; )
      null !== currentFirstChild.key
        ? returnFiber.set(currentFirstChild.key, currentFirstChild)
        : returnFiber.set(currentFirstChild.index, currentFirstChild),
        (currentFirstChild = currentFirstChild.sibling);
    return returnFiber;
  }
  function useFiber(fiber, pendingProps) {
    fiber = createWorkInProgress(fiber, pendingProps);
    fiber.index = 0;
    fiber.sibling = null;
    return fiber;
  }
  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) return lastPlacedIndex;
    newIndex = newFiber.alternate;
    if (null !== newIndex)
      return (
        (newIndex = newIndex.index),
        newIndex < lastPlacedIndex
          ? ((newFiber.flags |= 2), lastPlacedIndex)
          : newIndex
      );
    newFiber.flags |= 2;
    return lastPlacedIndex;
  }
  function placeSingleChild(newFiber) {
    shouldTrackSideEffects &&
      null === newFiber.alternate &&
      (newFiber.flags |= 2);
    return newFiber;
  }
  function updateTextNode(returnFiber, current, textContent, lanes) {
    if (null === current || 6 !== current.tag)
      return (
        (current = createFiberFromText(textContent, returnFiber.mode, lanes)),
        (current.return = returnFiber),
        current
      );
    current = useFiber(current, textContent);
    current.return = returnFiber;
    return current;
  }
  function updateElement(returnFiber, current, element, lanes) {
    var elementType = element.type;
    if (elementType === REACT_FRAGMENT_TYPE)
      return updateFragment(
        returnFiber,
        current,
        element.props.children,
        lanes,
        element.key
      );
    if (
      null !== current &&
      (current.elementType === elementType ||
        ("object" === typeof elementType &&
          null !== elementType &&
          elementType.$$typeof === REACT_LAZY_TYPE &&
          resolveLazy(elementType) === current.type))
    )
      return (
        (lanes = useFiber(current, element.props)),
        (lanes.ref = coerceRef(returnFiber, current, element)),
        (lanes.return = returnFiber),
        lanes
      );
    lanes = createFiberFromTypeAndProps(
      element.type,
      element.key,
      element.props,
      null,
      returnFiber.mode,
      lanes
    );
    lanes.ref = coerceRef(returnFiber, current, element);
    lanes.return = returnFiber;
    return lanes;
  }
  function updatePortal(returnFiber, current, portal, lanes) {
    if (
      null === current ||
      4 !== current.tag ||
      current.stateNode.containerInfo !== portal.containerInfo ||
      current.stateNode.implementation !== portal.implementation
    )
      return (
        (current = createFiberFromPortal(portal, returnFiber.mode, lanes)),
        (current.return = returnFiber),
        current
      );
    current = useFiber(current, portal.children || []);
    current.return = returnFiber;
    return current;
  }
  function updateFragment(returnFiber, current, fragment, lanes, key) {
    if (null === current || 7 !== current.tag)
      return (
        (current = createFiberFromFragment(
          fragment,
          returnFiber.mode,
          lanes,
          key
        )),
        (current.return = returnFiber),
        current
      );
    current = useFiber(current, fragment);
    current.return = returnFiber;
    return current;
  }
  function createChild(returnFiber, newChild, lanes) {
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (newChild = createFiberFromText(
          "" + newChild,
          returnFiber.mode,
          lanes
        )),
        (newChild.return = returnFiber),
        newChild
      );
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return (
            (lanes = createFiberFromTypeAndProps(
              newChild.type,
              newChild.key,
              newChild.props,
              null,
              returnFiber.mode,
              lanes
            )),
            (lanes.ref = coerceRef(returnFiber, null, newChild)),
            (lanes.return = returnFiber),
            lanes
          );
        case REACT_PORTAL_TYPE:
          return (
            (newChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              lanes
            )),
            (newChild.return = returnFiber),
            newChild
          );
        case REACT_LAZY_TYPE:
          var init = newChild._init;
          return createChild(returnFiber, init(newChild._payload), lanes);
      }
      if (isArrayImpl(newChild) || getIteratorFn(newChild))
        return (
          (newChild = createFiberFromFragment(
            newChild,
            returnFiber.mode,
            lanes,
            null
          )),
          (newChild.return = returnFiber),
          newChild
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateSlot(returnFiber, oldFiber, newChild, lanes) {
    var key = null !== oldFiber ? oldFiber.key : null;
    if ("string" === typeof newChild || "number" === typeof newChild)
      return null !== key
        ? null
        : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return newChild.key === key
            ? updateElement(returnFiber, oldFiber, newChild, lanes)
            : null;
        case REACT_PORTAL_TYPE:
          return newChild.key === key
            ? updatePortal(returnFiber, oldFiber, newChild, lanes)
            : null;
        case REACT_LAZY_TYPE:
          return (
            (key = newChild._init),
            updateSlot(returnFiber, oldFiber, key(newChild._payload), lanes)
          );
      }
      if (isArrayImpl(newChild) || getIteratorFn(newChild))
        return null !== key
          ? null
          : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateFromMap(
    existingChildren,
    returnFiber,
    newIdx,
    newChild,
    lanes
  ) {
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (existingChildren = existingChildren.get(newIdx) || null),
        updateTextNode(returnFiber, existingChildren, "" + newChild, lanes)
      );
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return (
            (existingChildren =
              existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null),
            updateElement(returnFiber, existingChildren, newChild, lanes)
          );
        case REACT_PORTAL_TYPE:
          return (
            (existingChildren =
              existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null),
            updatePortal(returnFiber, existingChildren, newChild, lanes)
          );
        case REACT_LAZY_TYPE:
          var init = newChild._init;
          return updateFromMap(
            existingChildren,
            returnFiber,
            newIdx,
            init(newChild._payload),
            lanes
          );
      }
      if (isArrayImpl(newChild) || getIteratorFn(newChild))
        return (
          (existingChildren = existingChildren.get(newIdx) || null),
          updateFragment(returnFiber, existingChildren, newChild, lanes, null)
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function reconcileChildrenArray(
    returnFiber,
    currentFirstChild,
    newChildren,
    lanes
  ) {
    for (
      var resultingFirstChild = null,
        previousNewFiber = null,
        oldFiber = currentFirstChild,
        newIdx = (currentFirstChild = 0),
        nextOldFiber = null;
      null !== oldFiber && newIdx < newChildren.length;
      newIdx++
    ) {
      oldFiber.index > newIdx
        ? ((nextOldFiber = oldFiber), (oldFiber = null))
        : (nextOldFiber = oldFiber.sibling);
      var newFiber = updateSlot(
        returnFiber,
        oldFiber,
        newChildren[newIdx],
        lanes
      );
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects &&
        oldFiber &&
        null === newFiber.alternate &&
        deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber
        ? (resultingFirstChild = newFiber)
        : (previousNewFiber.sibling = newFiber);
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (newIdx === newChildren.length)
      return (
        deleteRemainingChildren(returnFiber, oldFiber), resultingFirstChild
      );
    if (null === oldFiber) {
      for (; newIdx < newChildren.length; newIdx++)
        (oldFiber = createChild(returnFiber, newChildren[newIdx], lanes)),
          null !== oldFiber &&
            ((currentFirstChild = placeChild(
              oldFiber,
              currentFirstChild,
              newIdx
            )),
            null === previousNewFiber
              ? (resultingFirstChild = oldFiber)
              : (previousNewFiber.sibling = oldFiber),
            (previousNewFiber = oldFiber));
      return resultingFirstChild;
    }
    for (
      oldFiber = mapRemainingChildren(returnFiber, oldFiber);
      newIdx < newChildren.length;
      newIdx++
    )
      (nextOldFiber = updateFromMap(
        oldFiber,
        returnFiber,
        newIdx,
        newChildren[newIdx],
        lanes
      )),
        null !== nextOldFiber &&
          (shouldTrackSideEffects &&
            null !== nextOldFiber.alternate &&
            oldFiber.delete(
              null === nextOldFiber.key ? newIdx : nextOldFiber.key
            ),
          (currentFirstChild = placeChild(
            nextOldFiber,
            currentFirstChild,
            newIdx
          )),
          null === previousNewFiber
            ? (resultingFirstChild = nextOldFiber)
            : (previousNewFiber.sibling = nextOldFiber),
          (previousNewFiber = nextOldFiber));
    shouldTrackSideEffects &&
      oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
    return resultingFirstChild;
  }
  function reconcileChildrenIterator(
    returnFiber,
    currentFirstChild,
    newChildrenIterable,
    lanes
  ) {
    var iteratorFn = getIteratorFn(newChildrenIterable);
    if ("function" !== typeof iteratorFn)
      throw Error(formatProdErrorMessage(150));
    newChildrenIterable = iteratorFn.call(newChildrenIterable);
    if (null == newChildrenIterable) throw Error(formatProdErrorMessage(151));
    for (
      var previousNewFiber = (iteratorFn = null),
        oldFiber = currentFirstChild,
        newIdx = (currentFirstChild = 0),
        nextOldFiber = null,
        step = newChildrenIterable.next();
      null !== oldFiber && !step.done;
      newIdx++, step = newChildrenIterable.next()
    ) {
      oldFiber.index > newIdx
        ? ((nextOldFiber = oldFiber), (oldFiber = null))
        : (nextOldFiber = oldFiber.sibling);
      var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects &&
        oldFiber &&
        null === newFiber.alternate &&
        deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber
        ? (iteratorFn = newFiber)
        : (previousNewFiber.sibling = newFiber);
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (step.done)
      return deleteRemainingChildren(returnFiber, oldFiber), iteratorFn;
    if (null === oldFiber) {
      for (; !step.done; newIdx++, step = newChildrenIterable.next())
        (step = createChild(returnFiber, step.value, lanes)),
          null !== step &&
            ((currentFirstChild = placeChild(step, currentFirstChild, newIdx)),
            null === previousNewFiber
              ? (iteratorFn = step)
              : (previousNewFiber.sibling = step),
            (previousNewFiber = step));
      return iteratorFn;
    }
    for (
      oldFiber = mapRemainingChildren(returnFiber, oldFiber);
      !step.done;
      newIdx++, step = newChildrenIterable.next()
    )
      (step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes)),
        null !== step &&
          (shouldTrackSideEffects &&
            null !== step.alternate &&
            oldFiber.delete(null === step.key ? newIdx : step.key),
          (currentFirstChild = placeChild(step, currentFirstChild, newIdx)),
          null === previousNewFiber
            ? (iteratorFn = step)
            : (previousNewFiber.sibling = step),
          (previousNewFiber = step));
    shouldTrackSideEffects &&
      oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
    return iteratorFn;
  }
  function reconcileChildFibers(
    returnFiber,
    currentFirstChild,
    newChild,
    lanes
  ) {
    "object" === typeof newChild &&
      null !== newChild &&
      newChild.type === REACT_FRAGMENT_TYPE &&
      null === newChild.key &&
      (newChild = newChild.props.children);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          a: {
            for (
              var key = newChild.key, child = currentFirstChild;
              null !== child;

            ) {
              if (child.key === key) {
                key = newChild.type;
                if (key === REACT_FRAGMENT_TYPE) {
                  if (7 === child.tag) {
                    deleteRemainingChildren(returnFiber, child.sibling);
                    currentFirstChild = useFiber(
                      child,
                      newChild.props.children
                    );
                    currentFirstChild.return = returnFiber;
                    returnFiber = currentFirstChild;
                    break a;
                  }
                } else if (
                  child.elementType === key ||
                  ("object" === typeof key &&
                    null !== key &&
                    key.$$typeof === REACT_LAZY_TYPE &&
                    resolveLazy(key) === child.type)
                ) {
                  deleteRemainingChildren(returnFiber, child.sibling);
                  currentFirstChild = useFiber(child, newChild.props);
                  currentFirstChild.ref = coerceRef(
                    returnFiber,
                    child,
                    newChild
                  );
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                }
                deleteRemainingChildren(returnFiber, child);
                break;
              } else deleteChild(returnFiber, child);
              child = child.sibling;
            }
            newChild.type === REACT_FRAGMENT_TYPE
              ? ((currentFirstChild = createFiberFromFragment(
                  newChild.props.children,
                  returnFiber.mode,
                  lanes,
                  newChild.key
                )),
                (currentFirstChild.return = returnFiber),
                (returnFiber = currentFirstChild))
              : ((lanes = createFiberFromTypeAndProps(
                  newChild.type,
                  newChild.key,
                  newChild.props,
                  null,
                  returnFiber.mode,
                  lanes
                )),
                (lanes.ref = coerceRef(
                  returnFiber,
                  currentFirstChild,
                  newChild
                )),
                (lanes.return = returnFiber),
                (returnFiber = lanes));
          }
          return placeSingleChild(returnFiber);
        case REACT_PORTAL_TYPE:
          a: {
            for (child = newChild.key; null !== currentFirstChild; ) {
              if (currentFirstChild.key === child)
                if (
                  4 === currentFirstChild.tag &&
                  currentFirstChild.stateNode.containerInfo ===
                    newChild.containerInfo &&
                  currentFirstChild.stateNode.implementation ===
                    newChild.implementation
                ) {
                  deleteRemainingChildren(
                    returnFiber,
                    currentFirstChild.sibling
                  );
                  currentFirstChild = useFiber(
                    currentFirstChild,
                    newChild.children || []
                  );
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                } else {
                  deleteRemainingChildren(returnFiber, currentFirstChild);
                  break;
                }
              else deleteChild(returnFiber, currentFirstChild);
              currentFirstChild = currentFirstChild.sibling;
            }
            currentFirstChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              lanes
            );
            currentFirstChild.return = returnFiber;
            returnFiber = currentFirstChild;
          }
          return placeSingleChild(returnFiber);
        case REACT_LAZY_TYPE:
          return (
            (child = newChild._init),
            reconcileChildFibers(
              returnFiber,
              currentFirstChild,
              child(newChild._payload),
              lanes
            )
          );
      }
      if (isArrayImpl(newChild))
        return reconcileChildrenArray(
          returnFiber,
          currentFirstChild,
          newChild,
          lanes
        );
      if (getIteratorFn(newChild))
        return reconcileChildrenIterator(
          returnFiber,
          currentFirstChild,
          newChild,
          lanes
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return "string" === typeof newChild || "number" === typeof newChild
      ? ((newChild = "" + newChild),
        null !== currentFirstChild && 6 === currentFirstChild.tag
          ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling),
            (currentFirstChild = useFiber(currentFirstChild, newChild)),
            (currentFirstChild.return = returnFiber),
            (returnFiber = currentFirstChild))
          : (deleteRemainingChildren(returnFiber, currentFirstChild),
            (currentFirstChild = createFiberFromText(
              newChild,
              returnFiber.mode,
              lanes
            )),
            (currentFirstChild.return = returnFiber),
            (returnFiber = currentFirstChild)),
        placeSingleChild(returnFiber))
      : deleteRemainingChildren(returnFiber, currentFirstChild);
  }
  return reconcileChildFibers;
}
var reconcileChildFibers = ChildReconciler(!0),
  mountChildFibers = ChildReconciler(!1),
  NO_CONTEXT$1 = {},
  contextStackCursor = { current: NO_CONTEXT$1 },
  contextFiberStackCursor = { current: NO_CONTEXT$1 },
  rootInstanceStackCursor = { current: NO_CONTEXT$1 };
function requiredContext(c) {
  if (c === NO_CONTEXT$1) throw Error(formatProdErrorMessage(174));
  return c;
}
function pushHostContainer(fiber, nextRootInstance) {
  push(rootInstanceStackCursor, nextRootInstance);
  push(contextFiberStackCursor, fiber);
  push(contextStackCursor, NO_CONTEXT$1);
  pop(contextStackCursor);
  push(contextStackCursor, NO_CONTEXT);
}
function popHostContainer() {
  pop(contextStackCursor);
  pop(contextFiberStackCursor);
  pop(rootInstanceStackCursor);
}
function pushHostContext(fiber) {
  requiredContext(rootInstanceStackCursor.current);
  requiredContext(contextStackCursor.current) !== NO_CONTEXT &&
    (push(contextFiberStackCursor, fiber),
    push(contextStackCursor, NO_CONTEXT));
}
function popHostContext(fiber) {
  contextFiberStackCursor.current === fiber &&
    (pop(contextStackCursor), pop(contextFiberStackCursor));
}
var suspenseStackCursor = { current: 0 };
function findFirstSuspended(row) {
  for (var node = row; null !== node; ) {
    if (13 === node.tag) {
      var state = node.memoizedState;
      if (null !== state && (null === state.dehydrated || shim() || shim()))
        return node;
    } else if (19 === node.tag && void 0 !== node.memoizedProps.revealOrder) {
      if (0 !== (node.flags & 128)) return node;
    } else if (null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === row) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === row) return null;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
  return null;
}
var workInProgressSources = [];
function resetWorkInProgressVersions() {
  for (var i = 0; i < workInProgressSources.length; i++)
    workInProgressSources[i]._workInProgressVersionSecondary = null;
  workInProgressSources.length = 0;
}
var CacheContext = {
    $$typeof: REACT_CONTEXT_TYPE,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  },
  pooledCache = null,
  prevFreshCacheOnStack = { current: null };
function popRootCachePool(root, renderLanes) {
  root.pooledCache = pooledCache;
  null !== pooledCache && (root.pooledCacheLanes |= renderLanes);
  pooledCache = null;
}
function restoreSpawnedCachePool(offscreenWorkInProgress, prevCachePool) {
  if (CacheContext._currentValue2 !== prevCachePool.parent) return null;
  push(prevFreshCacheOnStack, pooledCache);
  pooledCache = prevCachePool.pool;
  return prevCachePool;
}
var _suspendedPooledCache = null;
function popCachePool() {
  _suspendedPooledCache = pooledCache;
  pooledCache = prevFreshCacheOnStack.current;
  pop(prevFreshCacheOnStack);
}
function getSuspendedCachePool() {
  var pool = pooledCache;
  if (null === pool)
    if (null !== _suspendedPooledCache)
      (pool = _suspendedPooledCache), (_suspendedPooledCache = null);
    else return null;
  return { parent: CacheContext._currentValue2, pool: pool };
}
var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentBatchConfig$1 = ReactSharedInternals.ReactCurrentBatchConfig,
  renderLanes = 0,
  currentlyRenderingFiber$1 = null,
  currentHook = null,
  workInProgressHook = null,
  didScheduleRenderPhaseUpdate = !1,
  didScheduleRenderPhaseUpdateDuringThisPass = !1;
function throwInvalidHookError() {
  throw Error(formatProdErrorMessage(321));
}
function areHookInputsEqual(nextDeps, prevDeps) {
  if (null === prevDeps) return !1;
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
    if (!objectIs(nextDeps[i], prevDeps[i])) return !1;
  return !0;
}
function renderWithHooks(
  current,
  workInProgress,
  Component,
  props,
  secondArg,
  nextRenderLanes
) {
  renderLanes = nextRenderLanes;
  currentlyRenderingFiber$1 = workInProgress;
  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.lanes = 0;
  ReactCurrentDispatcher$1.current =
    null === current || null === current.memoizedState
      ? HooksDispatcherOnMount
      : HooksDispatcherOnUpdate;
  nextRenderLanes = Component(props, secondArg);
  if (didScheduleRenderPhaseUpdateDuringThisPass) {
    var numberOfReRenders = 0;
    do {
      didScheduleRenderPhaseUpdateDuringThisPass = !1;
      if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
      numberOfReRenders += 1;
      workInProgressHook = currentHook = null;
      workInProgress.updateQueue = null;
      ReactCurrentDispatcher$1.current = HooksDispatcherOnRerender;
      nextRenderLanes = Component(props, secondArg);
    } while (didScheduleRenderPhaseUpdateDuringThisPass);
  }
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  workInProgress = null !== currentHook && null !== currentHook.next;
  renderLanes = 0;
  workInProgressHook = currentHook = currentlyRenderingFiber$1 = null;
  didScheduleRenderPhaseUpdate = !1;
  if (workInProgress) throw Error(formatProdErrorMessage(300));
  enableLazyContextPropagation &&
    null !== current &&
    !didReceiveUpdate &&
    ((current = current.dependencies),
    null !== current &&
      checkIfContextChanged(current) &&
      (didReceiveUpdate = !0));
  return nextRenderLanes;
}
function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  null === workInProgressHook
    ? (currentlyRenderingFiber$1.memoizedState = workInProgressHook = hook)
    : (workInProgressHook = workInProgressHook.next = hook);
  return workInProgressHook;
}
function updateWorkInProgressHook() {
  if (null === currentHook) {
    var nextCurrentHook = currentlyRenderingFiber$1.alternate;
    nextCurrentHook =
      null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
  } else nextCurrentHook = currentHook.next;
  var nextWorkInProgressHook =
    null === workInProgressHook
      ? currentlyRenderingFiber$1.memoizedState
      : workInProgressHook.next;
  if (null !== nextWorkInProgressHook)
    (workInProgressHook = nextWorkInProgressHook),
      (currentHook = nextCurrentHook);
  else {
    if (null === nextCurrentHook) throw Error(formatProdErrorMessage(310));
    currentHook = nextCurrentHook;
    nextCurrentHook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,
      next: null
    };
    null === workInProgressHook
      ? (currentlyRenderingFiber$1.memoizedState = workInProgressHook = nextCurrentHook)
      : (workInProgressHook = workInProgressHook.next = nextCurrentHook);
  }
  return workInProgressHook;
}
function basicStateReducer(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function updateReducer(reducer) {
  var hook = updateWorkInProgressHook(),
    queue = hook.queue;
  if (null === queue) throw Error(formatProdErrorMessage(311));
  queue.lastRenderedReducer = reducer;
  var current = currentHook,
    baseQueue = current.baseQueue,
    pendingQueue = queue.pending;
  if (null !== pendingQueue) {
    if (null !== baseQueue) {
      var baseFirst = baseQueue.next;
      baseQueue.next = pendingQueue.next;
      pendingQueue.next = baseFirst;
    }
    current.baseQueue = baseQueue = pendingQueue;
    queue.pending = null;
  }
  if (null !== baseQueue) {
    pendingQueue = baseQueue.next;
    current = current.baseState;
    var newBaseQueueFirst = (baseFirst = null),
      newBaseQueueLast = null,
      update = pendingQueue;
    do {
      var updateLane = update.lane;
      if ((renderLanes & updateLane) === updateLane)
        null !== newBaseQueueLast &&
          (newBaseQueueLast = newBaseQueueLast.next = {
            lane: 0,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: null
          }),
          (current = update.hasEagerState
            ? update.eagerState
            : reducer(current, update.action));
      else {
        var clone = {
          lane: updateLane,
          action: update.action,
          hasEagerState: update.hasEagerState,
          eagerState: update.eagerState,
          next: null
        };
        null === newBaseQueueLast
          ? ((newBaseQueueFirst = newBaseQueueLast = clone),
            (baseFirst = current))
          : (newBaseQueueLast = newBaseQueueLast.next = clone);
        currentlyRenderingFiber$1.lanes |= updateLane;
        workInProgressRootSkippedLanes |= updateLane;
      }
      update = update.next;
    } while (null !== update && update !== pendingQueue);
    null === newBaseQueueLast
      ? (baseFirst = current)
      : (newBaseQueueLast.next = newBaseQueueFirst);
    objectIs(current, hook.memoizedState) || (didReceiveUpdate = !0);
    hook.memoizedState = current;
    hook.baseState = baseFirst;
    hook.baseQueue = newBaseQueueLast;
    queue.lastRenderedState = current;
  }
  reducer = queue.interleaved;
  if (null !== reducer) {
    baseQueue = reducer;
    do
      (pendingQueue = baseQueue.lane),
        (currentlyRenderingFiber$1.lanes |= pendingQueue),
        (workInProgressRootSkippedLanes |= pendingQueue),
        (baseQueue = baseQueue.next);
    while (baseQueue !== reducer);
  } else null === baseQueue && (queue.lanes = 0);
  return [hook.memoizedState, queue.dispatch];
}
function rerenderReducer(reducer) {
  var hook = updateWorkInProgressHook(),
    queue = hook.queue;
  if (null === queue) throw Error(formatProdErrorMessage(311));
  queue.lastRenderedReducer = reducer;
  var dispatch = queue.dispatch,
    lastRenderPhaseUpdate = queue.pending,
    newState = hook.memoizedState;
  if (null !== lastRenderPhaseUpdate) {
    queue.pending = null;
    var update = (lastRenderPhaseUpdate = lastRenderPhaseUpdate.next);
    do (newState = reducer(newState, update.action)), (update = update.next);
    while (update !== lastRenderPhaseUpdate);
    objectIs(newState, hook.memoizedState) || (didReceiveUpdate = !0);
    hook.memoizedState = newState;
    null === hook.baseQueue && (hook.baseState = newState);
    queue.lastRenderedState = newState;
  }
  return [newState, dispatch];
}
function readFromUnsubscribedMutableSource(root, source, getSnapshot) {
  var getVersion = source._getVersion;
  getVersion = getVersion(source._source);
  var JSCompiler_inline_result = source._workInProgressVersionSecondary;
  if (null !== JSCompiler_inline_result)
    root = JSCompiler_inline_result === getVersion;
  else if (
    ((root = root.mutableReadLanes), (root = (renderLanes & root) === root))
  )
    (source._workInProgressVersionSecondary = getVersion),
      workInProgressSources.push(source);
  if (root) return getSnapshot(source._source);
  workInProgressSources.push(source);
  throw Error(formatProdErrorMessage(350));
}
function useMutableSource(hook, source, getSnapshot, subscribe) {
  var root = workInProgressRoot;
  if (null === root) throw Error(formatProdErrorMessage(349));
  var getVersion = source._getVersion,
    version = getVersion(source._source),
    dispatcher = ReactCurrentDispatcher$1.current,
    _dispatcher$useState = dispatcher.useState(function() {
      return readFromUnsubscribedMutableSource(root, source, getSnapshot);
    }),
    setSnapshot = _dispatcher$useState[1],
    snapshot = _dispatcher$useState[0];
  _dispatcher$useState = workInProgressHook;
  var memoizedState = hook.memoizedState,
    refs = memoizedState.refs,
    prevGetSnapshot = refs.getSnapshot,
    prevSource = memoizedState.source;
  memoizedState = memoizedState.subscribe;
  var fiber = currentlyRenderingFiber$1;
  hook.memoizedState = { refs: refs, source: source, subscribe: subscribe };
  dispatcher.useEffect(
    function() {
      refs.getSnapshot = getSnapshot;
      refs.setSnapshot = setSnapshot;
      var maybeNewVersion = getVersion(source._source);
      objectIs(version, maybeNewVersion) ||
        ((maybeNewVersion = getSnapshot(source._source)),
        objectIs(snapshot, maybeNewVersion) ||
          (setSnapshot(maybeNewVersion),
          (maybeNewVersion = requestUpdateLane(fiber)),
          (root.mutableReadLanes |= maybeNewVersion & root.pendingLanes)),
        markRootEntangled(root, root.mutableReadLanes));
    },
    [getSnapshot, source, subscribe]
  );
  dispatcher.useEffect(
    function() {
      return subscribe(source._source, function() {
        var latestGetSnapshot = refs.getSnapshot,
          latestSetSnapshot = refs.setSnapshot;
        try {
          latestSetSnapshot(latestGetSnapshot(source._source));
          var lane = requestUpdateLane(fiber);
          root.mutableReadLanes |= lane & root.pendingLanes;
        } catch (error) {
          latestSetSnapshot(function() {
            throw error;
          });
        }
      });
    },
    [source, subscribe]
  );
  (objectIs(prevGetSnapshot, getSnapshot) &&
    objectIs(prevSource, source) &&
    objectIs(memoizedState, subscribe)) ||
    ((hook = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: basicStateReducer,
      lastRenderedState: snapshot
    }),
    (hook.dispatch = setSnapshot = dispatchSetState.bind(
      null,
      currentlyRenderingFiber$1,
      hook
    )),
    (_dispatcher$useState.queue = hook),
    (_dispatcher$useState.baseQueue = null),
    (snapshot = readFromUnsubscribedMutableSource(root, source, getSnapshot)),
    (_dispatcher$useState.memoizedState = _dispatcher$useState.baseState = snapshot));
  return snapshot;
}
function updateMutableSource(source, getSnapshot, subscribe) {
  var hook = updateWorkInProgressHook();
  return useMutableSource(hook, source, getSnapshot, subscribe);
}
function mountSyncExternalStore(subscribe, getSnapshot) {
  var fiber = currentlyRenderingFiber$1,
    hook = mountWorkInProgressHook();
  var nextSnapshot = getSnapshot();
  var root = workInProgressRoot;
  if (null === root) throw Error(formatProdErrorMessage(349));
  includesBlockingLane(root, renderLanes) ||
    pushStoreConsistencyCheck(fiber, getSnapshot, nextSnapshot);
  hook.memoizedState = nextSnapshot;
  root = { value: nextSnapshot, getSnapshot: getSnapshot };
  hook.queue = root;
  mountEffect(subscribeToStore.bind(null, fiber, root, subscribe), [subscribe]);
  fiber.flags |= 2048;
  pushEffect(
    9,
    updateStoreInstance.bind(null, fiber, root, nextSnapshot, getSnapshot),
    void 0,
    null
  );
  return nextSnapshot;
}
function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
  fiber.flags |= 16384;
  fiber = { getSnapshot: getSnapshot, value: renderedSnapshot };
  getSnapshot = currentlyRenderingFiber$1.updateQueue;
  null === getSnapshot
    ? ((getSnapshot = { lastEffect: null, stores: null }),
      (currentlyRenderingFiber$1.updateQueue = getSnapshot),
      (getSnapshot.stores = [fiber]))
    : ((renderedSnapshot = getSnapshot.stores),
      null === renderedSnapshot
        ? (getSnapshot.stores = [fiber])
        : renderedSnapshot.push(fiber));
}
function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
  inst.value = nextSnapshot;
  inst.getSnapshot = getSnapshot;
  checkIfSnapshotChanged(inst) && scheduleUpdateOnFiber(fiber, 1, -1);
}
function subscribeToStore(fiber, inst, subscribe) {
  return subscribe(function() {
    checkIfSnapshotChanged(inst) && scheduleUpdateOnFiber(fiber, 1, -1);
  });
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(inst, nextValue);
  } catch (error) {
    return !0;
  }
}
function mountState(initialState) {
  var hook = mountWorkInProgressHook();
  "function" === typeof initialState && (initialState = initialState());
  hook.memoizedState = hook.baseState = initialState;
  initialState = {
    pending: null,
    interleaved: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState
  };
  hook.queue = initialState;
  initialState = initialState.dispatch = dispatchSetState.bind(
    null,
    currentlyRenderingFiber$1,
    initialState
  );
  return [hook.memoizedState, initialState];
}
function pushEffect(tag, create, destroy, deps) {
  tag = { tag: tag, create: create, destroy: destroy, deps: deps, next: null };
  create = currentlyRenderingFiber$1.updateQueue;
  null === create
    ? ((create = { lastEffect: null, stores: null }),
      (currentlyRenderingFiber$1.updateQueue = create),
      (create.lastEffect = tag.next = tag))
    : ((destroy = create.lastEffect),
      null === destroy
        ? (create.lastEffect = tag.next = tag)
        : ((deps = destroy.next),
          (destroy.next = tag),
          (tag.next = deps),
          (create.lastEffect = tag)));
  return tag;
}
function updateRef() {
  return updateWorkInProgressHook().memoizedState;
}
function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
  var hook = mountWorkInProgressHook();
  currentlyRenderingFiber$1.flags |= fiberFlags;
  hook.memoizedState = pushEffect(
    1 | hookFlags,
    create,
    void 0,
    void 0 === deps ? null : deps
  );
}
function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var destroy = void 0;
  if (null !== currentHook) {
    var prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (null !== deps && areHookInputsEqual(deps, prevEffect.deps)) {
      hook.memoizedState = pushEffect(hookFlags, create, destroy, deps);
      return;
    }
  }
  currentlyRenderingFiber$1.flags |= fiberFlags;
  hook.memoizedState = pushEffect(1 | hookFlags, create, destroy, deps);
}
function mountEffect(create, deps) {
  return mountEffectImpl(4196352, 8, create, deps);
}
function updateEffect(create, deps) {
  return updateEffectImpl(2048, 8, create, deps);
}
function updateInsertionEffect(create, deps) {
  return updateEffectImpl(4, 2, create, deps);
}
function updateLayoutEffect(create, deps) {
  return updateEffectImpl(4, 4, create, deps);
}
function imperativeHandleEffect(create, ref) {
  if ("function" === typeof ref)
    return (
      (create = create()),
      ref(create),
      function() {
        ref(null);
      }
    );
  if (null !== ref && void 0 !== ref)
    return (
      (create = create()),
      (ref.current = create),
      function() {
        ref.current = null;
      }
    );
}
function updateImperativeHandle(ref, create, deps) {
  deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
  return updateEffectImpl(
    4,
    4,
    imperativeHandleEffect.bind(null, create, ref),
    deps
  );
}
function mountDebugValue() {}
function updateCallback(callback, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var prevState = hook.memoizedState;
  if (
    null !== prevState &&
    null !== deps &&
    areHookInputsEqual(deps, prevState[1])
  )
    return prevState[0];
  hook.memoizedState = [callback, deps];
  return callback;
}
function updateMemo(nextCreate, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var prevState = hook.memoizedState;
  if (
    null !== prevState &&
    null !== deps &&
    areHookInputsEqual(deps, prevState[1])
  )
    return prevState[0];
  nextCreate = nextCreate();
  hook.memoizedState = [nextCreate, deps];
  return nextCreate;
}
function startTransition(setPending, callback) {
  var previousPriority = currentUpdatePriority;
  currentUpdatePriority =
    0 !== previousPriority && 4 > previousPriority ? previousPriority : 4;
  setPending(!0);
  var prevTransition = ReactCurrentBatchConfig$1.transition;
  ReactCurrentBatchConfig$1.transition = 1;
  try {
    setPending(!1), callback();
  } finally {
    (currentUpdatePriority = previousPriority),
      (ReactCurrentBatchConfig$1.transition = prevTransition);
  }
}
function updateRefresh() {
  return updateWorkInProgressHook().memoizedState;
}
function refreshCache(fiber, seedKey, seedValue) {
  for (fiber = fiber.return; null !== fiber; ) {
    switch (fiber.tag) {
      case 24:
      case 3:
        var lane = requestUpdateLane(fiber),
          eventTime = requestEventTime(),
          root = scheduleUpdateOnFiber(fiber, lane, eventTime);
        null !== root && entangleTransitions(root, fiber, lane);
        var seededCache = new Map();
        null !== seedKey &&
          void 0 !== seedKey &&
          null !== root &&
          seededCache.set(seedKey, seedValue);
        seedKey = createUpdate(eventTime, lane);
        seedKey.payload = { cache: seededCache };
        enqueueUpdate(fiber, seedKey);
        return;
    }
    fiber = fiber.return;
  }
}
function dispatchReducerAction(fiber, queue, action) {
  var lane = requestUpdateLane(fiber);
  action = {
    lane: lane,
    action: action,
    hasEagerState: !1,
    eagerState: null,
    next: null
  };
  isRenderPhaseUpdate(fiber)
    ? enqueueRenderPhaseUpdate(queue, action)
    : (enqueueUpdate$1(fiber, queue, action),
      (action = requestEventTime()),
      (fiber = scheduleUpdateOnFiber(fiber, lane, action)),
      null !== fiber && entangleTransitionUpdate(fiber, queue, lane));
}
function dispatchSetState(fiber, queue, action) {
  var lane = requestUpdateLane(fiber),
    update = {
      lane: lane,
      action: action,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
  if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
  else {
    enqueueUpdate$1(fiber, queue, update);
    var alternate = fiber.alternate;
    if (
      0 === fiber.lanes &&
      (null === alternate || 0 === alternate.lanes) &&
      ((alternate = queue.lastRenderedReducer), null !== alternate)
    )
      try {
        var currentState = queue.lastRenderedState,
          eagerState = alternate(currentState, action);
        update.hasEagerState = !0;
        update.eagerState = eagerState;
        if (objectIs(eagerState, currentState)) return;
      } catch (error) {
      } finally {
      }
    action = requestEventTime();
    fiber = scheduleUpdateOnFiber(fiber, lane, action);
    null !== fiber && entangleTransitionUpdate(fiber, queue, lane);
  }
}
function isRenderPhaseUpdate(fiber) {
  var alternate = fiber.alternate;
  return (
    fiber === currentlyRenderingFiber$1 ||
    (null !== alternate && alternate === currentlyRenderingFiber$1)
  );
}
function enqueueRenderPhaseUpdate(queue, update) {
  didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = !0;
  var pending = queue.pending;
  null === pending
    ? (update.next = update)
    : ((update.next = pending.next), (pending.next = update));
  queue.pending = update;
}
function enqueueUpdate$1(fiber, queue, update) {
  null === workInProgressRoot ||
  0 === (fiber.mode & 1) ||
  (!deferRenderPhaseUpdateToNextBatch && 0 !== (executionContext & 2))
    ? ((fiber = queue.pending),
      null === fiber
        ? (update.next = update)
        : ((update.next = fiber.next), (fiber.next = update)),
      (queue.pending = update))
    : ((fiber = queue.interleaved),
      null === fiber
        ? ((update.next = update),
          null === interleavedQueues
            ? (interleavedQueues = [queue])
            : interleavedQueues.push(queue))
        : ((update.next = fiber.next), (fiber.next = update)),
      (queue.interleaved = update));
}
function entangleTransitionUpdate(root, queue, lane) {
  if (0 !== (lane & 4194240)) {
    var queueLanes = queue.lanes;
    queueLanes &= root.pendingLanes;
    lane |= queueLanes;
    queue.lanes = lane;
    markRootEntangled(root, lane);
  }
}
function getCacheForType(resourceType) {
  var cache = readContext(CacheContext),
    cacheForType = cache.get(resourceType);
  void 0 === cacheForType &&
    ((cacheForType = resourceType()), cache.set(resourceType, cacheForType));
  return cacheForType;
}
var ContextOnlyDispatcher = {
  readContext: readContext,
  useCallback: throwInvalidHookError,
  useContext: throwInvalidHookError,
  useEffect: throwInvalidHookError,
  useImperativeHandle: throwInvalidHookError,
  useInsertionEffect: throwInvalidHookError,
  useLayoutEffect: throwInvalidHookError,
  useMemo: throwInvalidHookError,
  useReducer: throwInvalidHookError,
  useRef: throwInvalidHookError,
  useState: throwInvalidHookError,
  useDebugValue: throwInvalidHookError,
  useDeferredValue: throwInvalidHookError,
  useTransition: throwInvalidHookError,
  useMutableSource: throwInvalidHookError,
  useSyncExternalStore: throwInvalidHookError,
  useOpaqueIdentifier: throwInvalidHookError,
  unstable_isNewReconciler: !1
};
ContextOnlyDispatcher.getCacheForType = getCacheForType;
ContextOnlyDispatcher.useCacheRefresh = throwInvalidHookError;
var HooksDispatcherOnMount = {
  readContext: readContext,
  useCallback: function(callback, deps) {
    mountWorkInProgressHook().memoizedState = [
      callback,
      void 0 === deps ? null : deps
    ];
    return callback;
  },
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: function(ref, create, deps) {
    deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
    return mountEffectImpl(
      2097156,
      4,
      imperativeHandleEffect.bind(null, create, ref),
      deps
    );
  },
  useLayoutEffect: function(create, deps) {
    return mountEffectImpl(2097156, 4, create, deps);
  },
  useInsertionEffect: function(create, deps) {
    return mountEffectImpl(4, 2, create, deps);
  },
  useMemo: function(nextCreate, deps) {
    var hook = mountWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    nextCreate = nextCreate();
    hook.memoizedState = [nextCreate, deps];
    return nextCreate;
  },
  useReducer: function(reducer, initialArg, init) {
    var hook = mountWorkInProgressHook();
    initialArg = void 0 !== init ? init(initialArg) : initialArg;
    hook.memoizedState = hook.baseState = initialArg;
    reducer = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: reducer,
      lastRenderedState: initialArg
    };
    hook.queue = reducer;
    reducer = reducer.dispatch = dispatchReducerAction.bind(
      null,
      currentlyRenderingFiber$1,
      reducer
    );
    return [hook.memoizedState, reducer];
  },
  useRef: function(initialValue) {
    var hook = mountWorkInProgressHook();
    if (enableUseRefAccessWarning)
      return (
        (initialValue = { current: initialValue }),
        (hook.memoizedState = initialValue)
      );
    initialValue = { current: initialValue };
    return (hook.memoizedState = initialValue);
  },
  useState: mountState,
  useDebugValue: mountDebugValue,
  useDeferredValue: function(value) {
    var _mountState = mountState(value),
      prevValue = _mountState[0],
      setValue = _mountState[1];
    mountEffect(
      function() {
        var prevTransition = ReactCurrentBatchConfig$1.transition;
        ReactCurrentBatchConfig$1.transition = 1;
        try {
          setValue(value);
        } finally {
          ReactCurrentBatchConfig$1.transition = prevTransition;
        }
      },
      [value]
    );
    return prevValue;
  },
  useTransition: function() {
    var _mountState2 = mountState(!1),
      isPending = _mountState2[0];
    _mountState2 = startTransition.bind(null, _mountState2[1]);
    mountWorkInProgressHook().memoizedState = _mountState2;
    return [isPending, _mountState2];
  },
  useMutableSource: function(source, getSnapshot, subscribe) {
    var hook = mountWorkInProgressHook();
    hook.memoizedState = {
      refs: { getSnapshot: getSnapshot, setSnapshot: null },
      source: source,
      subscribe: subscribe
    };
    return useMutableSource(hook, source, getSnapshot, subscribe);
  },
  useSyncExternalStore: mountSyncExternalStore,
  useOpaqueIdentifier: function() {
    throw Error(formatProdErrorMessage(248));
  },
  unstable_isNewReconciler: !1
};
HooksDispatcherOnMount.getCacheForType = getCacheForType;
HooksDispatcherOnMount.useCacheRefresh = function() {
  return (mountWorkInProgressHook().memoizedState = refreshCache.bind(
    null,
    currentlyRenderingFiber$1
  ));
};
var HooksDispatcherOnUpdate = {
  readContext: readContext,
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useInsertionEffect: updateInsertionEffect,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: function() {
    return updateReducer(basicStateReducer);
  },
  useDebugValue: mountDebugValue,
  useDeferredValue: function(value) {
    var _updateState = updateReducer(basicStateReducer),
      prevValue = _updateState[0],
      setValue = _updateState[1];
    updateEffect(
      function() {
        var prevTransition = ReactCurrentBatchConfig$1.transition;
        ReactCurrentBatchConfig$1.transition = 1;
        try {
          setValue(value);
        } finally {
          ReactCurrentBatchConfig$1.transition = prevTransition;
        }
      },
      [value]
    );
    return prevValue;
  },
  useTransition: function() {
    var isPending = updateReducer(basicStateReducer)[0],
      start = updateWorkInProgressHook().memoizedState;
    return [isPending, start];
  },
  useMutableSource: updateMutableSource,
  useSyncExternalStore: function(subscribe, getSnapshot) {
    var fiber = currentlyRenderingFiber$1,
      hook = updateWorkInProgressHook(),
      nextSnapshot = getSnapshot(),
      snapshotChanged = !objectIs(hook.memoizedState, nextSnapshot);
    snapshotChanged &&
      ((hook.memoizedState = nextSnapshot), (didReceiveUpdate = !0));
    hook = hook.queue;
    updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [
      subscribe
    ]);
    if (
      hook.getSnapshot !== getSnapshot ||
      snapshotChanged ||
      (null !== workInProgressHook && workInProgressHook.memoizedState.tag & 1)
    ) {
      fiber.flags |= 2048;
      pushEffect(
        9,
        updateStoreInstance.bind(null, fiber, hook, nextSnapshot, getSnapshot),
        void 0,
        null
      );
      subscribe = workInProgressRoot;
      if (null === subscribe) throw Error(formatProdErrorMessage(349));
      includesBlockingLane(subscribe, renderLanes) ||
        pushStoreConsistencyCheck(fiber, getSnapshot, nextSnapshot);
    }
    return nextSnapshot;
  },
  useOpaqueIdentifier: function() {
    return updateReducer(basicStateReducer)[0];
  },
  unstable_isNewReconciler: !1
};
HooksDispatcherOnUpdate.getCacheForType = getCacheForType;
HooksDispatcherOnUpdate.useCacheRefresh = updateRefresh;
var HooksDispatcherOnRerender = {
  readContext: readContext,
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useInsertionEffect: updateInsertionEffect,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: rerenderReducer,
  useRef: updateRef,
  useState: function() {
    return rerenderReducer(basicStateReducer);
  },
  useDebugValue: mountDebugValue,
  useDeferredValue: function(value) {
    var _rerenderState = rerenderReducer(basicStateReducer),
      prevValue = _rerenderState[0],
      setValue = _rerenderState[1];
    updateEffect(
      function() {
        var prevTransition = ReactCurrentBatchConfig$1.transition;
        ReactCurrentBatchConfig$1.transition = 1;
        try {
          setValue(value);
        } finally {
          ReactCurrentBatchConfig$1.transition = prevTransition;
        }
      },
      [value]
    );
    return prevValue;
  },
  useTransition: function() {
    var isPending = rerenderReducer(basicStateReducer)[0],
      start = updateWorkInProgressHook().memoizedState;
    return [isPending, start];
  },
  useMutableSource: updateMutableSource,
  useSyncExternalStore: mountSyncExternalStore,
  useOpaqueIdentifier: function() {
    return rerenderReducer(basicStateReducer)[0];
  },
  unstable_isNewReconciler: !1
};
HooksDispatcherOnRerender.getCacheForType = getCacheForType;
HooksDispatcherOnRerender.useCacheRefresh = updateRefresh;
function createCapturedValue(value, source) {
  try {
    var info = "",
      node = source;
    do (info += describeFiber(node)), (node = node.return);
    while (node);
    var JSCompiler_inline_result = info;
  } catch (x) {
    JSCompiler_inline_result =
      "\nError generating stack: " + x.message + "\n" + x.stack;
  }
  return { value: value, source: source, stack: JSCompiler_inline_result };
}
var ReactFiberErrorDialogWWW = require("ReactFiberErrorDialog");
if ("function" !== typeof ReactFiberErrorDialogWWW.showErrorDialog)
  throw Error(formatProdErrorMessage(320));
function logCapturedError(boundary, errorInfo) {
  try {
    !1 !==
      ReactFiberErrorDialogWWW.showErrorDialog({
        componentStack: null !== errorInfo.stack ? errorInfo.stack : "",
        error: errorInfo.value,
        errorBoundary:
          null !== boundary && 1 === boundary.tag ? boundary.stateNode : null
      }) && console.error(errorInfo.value);
  } catch (e) {
    setTimeout(function() {
      throw e;
    });
  }
}
var PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map;
function createRootErrorUpdate(fiber, errorInfo, lane) {
  lane = createUpdate(-1, lane);
  lane.tag = 3;
  lane.payload = { element: null };
  var error = errorInfo.value;
  lane.callback = function() {
    hasUncaughtError || ((hasUncaughtError = !0), (firstUncaughtError = error));
    logCapturedError(fiber, errorInfo);
  };
  return lane;
}
function createClassErrorUpdate(fiber, errorInfo, lane) {
  lane = createUpdate(-1, lane);
  lane.tag = 3;
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
  if ("function" === typeof getDerivedStateFromError) {
    var error = errorInfo.value;
    lane.payload = function() {
      return getDerivedStateFromError(error);
    };
    lane.callback = function() {
      logCapturedError(fiber, errorInfo);
    };
  }
  var inst = fiber.stateNode;
  null !== inst &&
    "function" === typeof inst.componentDidCatch &&
    (lane.callback = function() {
      logCapturedError(fiber, errorInfo);
      "function" !== typeof getDerivedStateFromError &&
        (null === legacyErrorBoundariesThatAlreadyFailed
          ? (legacyErrorBoundariesThatAlreadyFailed = new Set([this]))
          : legacyErrorBoundariesThatAlreadyFailed.add(this));
      var stack = errorInfo.stack;
      this.componentDidCatch(errorInfo.value, {
        componentStack: null !== stack ? stack : ""
      });
    });
  return lane;
}
var emptyObject = {};
function collectScopedNodesFromChildren(
  startingChild,
  fn$jscomp$0,
  scopedNodes$jscomp$0
) {
  for (; null !== startingChild; ) {
    var node = startingChild,
      fn = fn$jscomp$0,
      scopedNodes = scopedNodes$jscomp$0;
    if (5 === node.tag) {
      var type = node.type,
        memoizedProps = node.memoizedProps,
        instance = node.stateNode;
      null !== instance &&
        !0 === fn(type, memoizedProps || emptyObject, instance) &&
        scopedNodes.push(instance);
    }
    type = node.child;
    isFiberSuspenseAndTimedOut(node) && (type = node.child.sibling.child);
    null !== type && collectScopedNodesFromChildren(type, fn, scopedNodes);
    startingChild = startingChild.sibling;
  }
}
function collectFirstScopedNodeFromChildren(startingChild, fn$jscomp$0) {
  for (; null !== startingChild; ) {
    a: {
      var JSCompiler_inline_result = startingChild;
      var fn = fn$jscomp$0;
      if (5 === JSCompiler_inline_result.tag) {
        var type = JSCompiler_inline_result.type,
          memoizedProps = JSCompiler_inline_result.memoizedProps,
          instance = JSCompiler_inline_result.stateNode;
        if (null !== instance && !0 === fn(type, memoizedProps, instance)) {
          JSCompiler_inline_result = instance;
          break a;
        }
      }
      type = JSCompiler_inline_result.child;
      isFiberSuspenseAndTimedOut(JSCompiler_inline_result) &&
        (type = JSCompiler_inline_result.child.sibling.child);
      JSCompiler_inline_result =
        null !== type ? collectFirstScopedNodeFromChildren(type, fn) : null;
    }
    if (null !== JSCompiler_inline_result) return JSCompiler_inline_result;
    startingChild = startingChild.sibling;
  }
  return null;
}
function collectNearestChildContextValues(
  startingChild,
  context$jscomp$0,
  childContextValues$jscomp$0
) {
  for (; null !== startingChild; ) {
    var node = startingChild,
      context = context$jscomp$0,
      childContextValues = childContextValues$jscomp$0;
    if (10 === node.tag && node.type._context === context)
      childContextValues.push(node.memoizedProps.value);
    else {
      var child = node.child;
      isFiberSuspenseAndTimedOut(node) && (child = node.child.sibling.child);
      null !== child &&
        collectNearestChildContextValues(child, context, childContextValues);
    }
    startingChild = startingChild.sibling;
  }
}
function DO_NOT_USE_queryAllNodes(fn) {
  var currentFiber = shim$1();
  if (null === currentFiber) return null;
  currentFiber = currentFiber.child;
  var scopedNodes = [];
  null !== currentFiber &&
    collectScopedNodesFromChildren(currentFiber, fn, scopedNodes);
  return 0 === scopedNodes.length ? null : scopedNodes;
}
function DO_NOT_USE_queryFirstNode(fn) {
  var currentFiber = shim$1();
  if (null === currentFiber) return null;
  currentFiber = currentFiber.child;
  return null !== currentFiber
    ? collectFirstScopedNodeFromChildren(currentFiber, fn)
    : null;
}
function containsNode() {
  throw Error(formatProdErrorMessage(248));
}
function getChildContextValues(context) {
  var currentFiber = shim$1();
  if (null === currentFiber) return [];
  currentFiber = currentFiber.child;
  var childContextValues = [];
  null !== currentFiber &&
    collectNearestChildContextValues(currentFiber, context, childContextValues);
  return childContextValues;
}
function markRef(workInProgress) {
  workInProgress.flags |= 512;
  workInProgress.flags |= 1048576;
}
var appendAllChildren, updateHostContainer, updateHostComponent, updateHostText;
appendAllChildren = function(parent, workInProgress) {
  for (var node = workInProgress.child; null !== node; ) {
    if (5 === node.tag || 6 === node.tag) {
      var parentInstance = parent,
        child = node.stateNode;
      if ("string" === typeof child) throw Error(formatProdErrorMessage(216));
      child.inject(parentInstance);
    } else if (4 !== node.tag && null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === workInProgress) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === workInProgress) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
};
updateHostContainer = function() {};
updateHostComponent = function(current, workInProgress, type, newProps) {
  current.memoizedProps !== newProps &&
    (requiredContext(contextStackCursor.current),
    (workInProgress.updateQueue = UPDATE_SIGNAL)) &&
    (workInProgress.flags |= 4);
};
updateHostText = function(current, workInProgress, oldText, newText) {
  oldText !== newText && (workInProgress.flags |= 4);
};
function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
  switch (renderState.tailMode) {
    case "hidden":
      hasRenderedATailFallback = renderState.tail;
      for (var lastTailNode = null; null !== hasRenderedATailFallback; )
        null !== hasRenderedATailFallback.alternate &&
          (lastTailNode = hasRenderedATailFallback),
          (hasRenderedATailFallback = hasRenderedATailFallback.sibling);
      null === lastTailNode
        ? (renderState.tail = null)
        : (lastTailNode.sibling = null);
      break;
    case "collapsed":
      lastTailNode = renderState.tail;
      for (var lastTailNode$36 = null; null !== lastTailNode; )
        null !== lastTailNode.alternate && (lastTailNode$36 = lastTailNode),
          (lastTailNode = lastTailNode.sibling);
      null === lastTailNode$36
        ? hasRenderedATailFallback || null === renderState.tail
          ? (renderState.tail = null)
          : (renderState.tail.sibling = null)
        : (lastTailNode$36.sibling = null);
  }
}
function bubbleProperties(completedWork) {
  var didBailout =
      null !== completedWork.alternate &&
      completedWork.alternate.child === completedWork.child,
    newChildLanes = 0,
    subtreeFlags = 0;
  if (didBailout)
    for (var child$37 = completedWork.child; null !== child$37; )
      (newChildLanes |= child$37.lanes | child$37.childLanes),
        (subtreeFlags |= child$37.subtreeFlags & 7340032),
        (subtreeFlags |= child$37.flags & 7340032),
        (child$37.return = completedWork),
        (child$37 = child$37.sibling);
  else
    for (child$37 = completedWork.child; null !== child$37; )
      (newChildLanes |= child$37.lanes | child$37.childLanes),
        (subtreeFlags |= child$37.subtreeFlags),
        (subtreeFlags |= child$37.flags),
        (child$37.return = completedWork),
        (child$37 = child$37.sibling);
  completedWork.subtreeFlags |= subtreeFlags;
  completedWork.childLanes = newChildLanes;
  return didBailout;
}
function completeWork(current, workInProgress, renderLanes) {
  var newProps = workInProgress.pendingProps;
  switch (workInProgress.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return bubbleProperties(workInProgress), null;
    case 1:
      return bubbleProperties(workInProgress), null;
    case 3:
      return (
        (newProps = workInProgress.stateNode),
        popRootCachePool(newProps, renderLanes),
        popProvider(CacheContext),
        popHostContainer(),
        resetWorkInProgressVersions(),
        newProps.pendingContext &&
          ((newProps.context = newProps.pendingContext),
          (newProps.pendingContext = null)),
        (null !== current && null !== current.child) ||
          newProps.isDehydrated ||
          (workInProgress.flags |= 1024),
        updateHostContainer(current, workInProgress),
        bubbleProperties(workInProgress),
        null
      );
    case 5:
      popHostContext(workInProgress);
      renderLanes = requiredContext(rootInstanceStackCursor.current);
      var type = workInProgress.type;
      if (null !== current && null != workInProgress.stateNode)
        updateHostComponent(
          current,
          workInProgress,
          type,
          newProps,
          renderLanes
        ),
          current.ref !== workInProgress.ref && markRef(workInProgress);
      else {
        if (!newProps) {
          if (null === workInProgress.stateNode)
            throw Error(formatProdErrorMessage(166));
          bubbleProperties(workInProgress);
          return null;
        }
        requiredContext(contextStackCursor.current);
        switch (type) {
          case TYPES.CLIPPING_RECTANGLE:
            var instance = Mode$1.ClippingRectangle();
            instance._applyProps = applyClippingRectangleProps;
            break;
          case TYPES.GROUP:
            instance = Mode$1.Group();
            instance._applyProps = applyGroupProps;
            break;
          case TYPES.SHAPE:
            instance = Mode$1.Shape();
            instance._applyProps = applyShapeProps;
            break;
          case TYPES.TEXT:
            (instance = Mode$1.Text(
              newProps.children,
              newProps.font,
              newProps.alignment,
              newProps.path
            )),
              (instance._applyProps = applyTextProps);
        }
        if (!instance) throw Error(formatProdErrorMessage(217, type));
        instance._applyProps(instance, newProps);
        current = instance;
        appendAllChildren(current, workInProgress, !1, !1);
        workInProgress.stateNode = current;
        null !== workInProgress.ref && markRef(workInProgress);
      }
      bubbleProperties(workInProgress);
      return null;
    case 6:
      if (current && null != workInProgress.stateNode)
        updateHostText(
          current,
          workInProgress,
          current.memoizedProps,
          newProps
        );
      else {
        if ("string" !== typeof newProps && null === workInProgress.stateNode)
          throw Error(formatProdErrorMessage(166));
        requiredContext(rootInstanceStackCursor.current);
        requiredContext(contextStackCursor.current);
        workInProgress.stateNode = newProps;
      }
      bubbleProperties(workInProgress);
      return null;
    case 13:
      pop(suspenseStackCursor);
      newProps = workInProgress.memoizedState;
      if (null !== newProps && null !== newProps.dehydrated) {
        if (null === current) {
          throw Error(formatProdErrorMessage(318));
          throw Error(formatProdErrorMessage(344));
        }
        0 === (workInProgress.flags & 128) &&
          (workInProgress.memoizedState = null);
        workInProgress.flags |= 4;
        bubbleProperties(workInProgress);
        return null;
      }
      if (0 !== (workInProgress.flags & 128))
        return (workInProgress.lanes = renderLanes), workInProgress;
      renderLanes = !1;
      null !== current && (renderLanes = null !== current.memoizedState);
      null === newProps ||
        renderLanes ||
        ((workInProgress.child.flags |= 8192),
        0 !== (workInProgress.mode & 1) &&
          ((null === current &&
            !0 !== workInProgress.memoizedProps.unstable_avoidThisFallback) ||
          0 !== (suspenseStackCursor.current & 1)
            ? 0 === workInProgressRootExitStatus &&
              (workInProgressRootExitStatus = 3)
            : renderDidSuspendDelayIfPossible()));
      null !== workInProgress.updateQueue && (workInProgress.flags |= 4);
      null !== workInProgress.updateQueue &&
        null != workInProgress.memoizedProps.suspenseCallback &&
        (workInProgress.flags |= 4);
      bubbleProperties(workInProgress);
      return null;
    case 4:
      return (
        popHostContainer(),
        updateHostContainer(current, workInProgress),
        bubbleProperties(workInProgress),
        null
      );
    case 10:
      return (
        popProvider(workInProgress.type._context),
        bubbleProperties(workInProgress),
        null
      );
    case 17:
      return bubbleProperties(workInProgress), null;
    case 19:
      pop(suspenseStackCursor);
      instance = workInProgress.memoizedState;
      if (null === instance) return bubbleProperties(workInProgress), null;
      newProps = 0 !== (workInProgress.flags & 128);
      type = instance.rendering;
      if (null === type)
        if (newProps) cutOffTailIfNeeded(instance, !1);
        else {
          if (
            0 !== workInProgressRootExitStatus ||
            (null !== current && 0 !== (current.flags & 128))
          )
            for (current = workInProgress.child; null !== current; ) {
              type = findFirstSuspended(current);
              if (null !== type) {
                workInProgress.flags |= 128;
                cutOffTailIfNeeded(instance, !1);
                current = type.updateQueue;
                null !== current &&
                  ((workInProgress.updateQueue = current),
                  (workInProgress.flags |= 4));
                workInProgress.subtreeFlags = 0;
                current = renderLanes;
                for (renderLanes = workInProgress.child; null !== renderLanes; )
                  (newProps = renderLanes),
                    (instance = current),
                    (newProps.flags &= 7340034),
                    (type = newProps.alternate),
                    null === type
                      ? ((newProps.childLanes = 0),
                        (newProps.lanes = instance),
                        (newProps.child = null),
                        (newProps.subtreeFlags = 0),
                        (newProps.memoizedProps = null),
                        (newProps.memoizedState = null),
                        (newProps.updateQueue = null),
                        (newProps.dependencies = null),
                        (newProps.stateNode = null))
                      : ((newProps.childLanes = type.childLanes),
                        (newProps.lanes = type.lanes),
                        (newProps.child = type.child),
                        (newProps.subtreeFlags = 0),
                        (newProps.deletions = null),
                        (newProps.memoizedProps = type.memoizedProps),
                        (newProps.memoizedState = type.memoizedState),
                        (newProps.updateQueue = type.updateQueue),
                        (newProps.type = type.type),
                        (instance = type.dependencies),
                        (newProps.dependencies =
                          null === instance
                            ? null
                            : {
                                lanes: instance.lanes,
                                firstContext: instance.firstContext
                              })),
                    (renderLanes = renderLanes.sibling);
                push(
                  suspenseStackCursor,
                  (suspenseStackCursor.current & 1) | 2
                );
                return workInProgress.child;
              }
              current = current.sibling;
            }
          null !== instance.tail &&
            now() > workInProgressRootRenderTargetTime &&
            ((workInProgress.flags |= 128),
            (newProps = !0),
            cutOffTailIfNeeded(instance, !1),
            (workInProgress.lanes = 4194304));
        }
      else {
        if (!newProps)
          if (((current = findFirstSuspended(type)), null !== current)) {
            if (
              ((workInProgress.flags |= 128),
              (newProps = !0),
              (current = current.updateQueue),
              null !== current &&
                ((workInProgress.updateQueue = current),
                (workInProgress.flags |= 4)),
              cutOffTailIfNeeded(instance, !0),
              null === instance.tail &&
                "hidden" === instance.tailMode &&
                !type.alternate)
            )
              return bubbleProperties(workInProgress), null;
          } else
            2 * now() - instance.renderingStartTime >
              workInProgressRootRenderTargetTime &&
              1073741824 !== renderLanes &&
              ((workInProgress.flags |= 128),
              (newProps = !0),
              cutOffTailIfNeeded(instance, !1),
              (workInProgress.lanes = 4194304));
        instance.isBackwards
          ? ((type.sibling = workInProgress.child),
            (workInProgress.child = type))
          : ((current = instance.last),
            null !== current
              ? (current.sibling = type)
              : (workInProgress.child = type),
            (instance.last = type));
      }
      if (null !== instance.tail)
        return (
          (workInProgress = instance.tail),
          (instance.rendering = workInProgress),
          (instance.tail = workInProgress.sibling),
          (instance.renderingStartTime = now()),
          (workInProgress.sibling = null),
          (current = suspenseStackCursor.current),
          push(suspenseStackCursor, newProps ? (current & 1) | 2 : current & 1),
          workInProgress
        );
      bubbleProperties(workInProgress);
      return null;
    case 21:
      return (
        null === current
          ? ((workInProgress.stateNode = {
              DO_NOT_USE_queryAllNodes: DO_NOT_USE_queryAllNodes,
              DO_NOT_USE_queryFirstNode: DO_NOT_USE_queryFirstNode,
              containsNode: containsNode,
              getChildContextValues: getChildContextValues
            }),
            shim$1(),
            null !== workInProgress.ref &&
              (markRef(workInProgress), (workInProgress.flags |= 4)))
          : (null !== workInProgress.ref && (workInProgress.flags |= 4),
            current.ref !== workInProgress.ref && markRef(workInProgress)),
        bubbleProperties(workInProgress),
        null
      );
    case 22:
    case 23:
      return (
        popRenderLanes(),
        (renderLanes = null !== workInProgress.memoizedState),
        null !== current &&
          (null !== current.memoizedState) !== renderLanes &&
          "unstable-defer-without-hiding" !== newProps.mode &&
          23 !== workInProgress.tag &&
          (workInProgress.flags |= 8192),
        renderLanes && 0 !== (workInProgress.mode & 1)
          ? 0 !== (subtreeRenderLanes & 1073741824) &&
            (bubbleProperties(workInProgress),
            23 !== workInProgress.tag &&
              workInProgress.subtreeFlags & 6 &&
              "unstable-defer-without-hiding" !== newProps.mode &&
              (workInProgress.flags |= 8192))
          : bubbleProperties(workInProgress),
        null !== workInProgress.updateQueue && popCachePool(),
        null
      );
    case 24:
      return popProvider(CacheContext), bubbleProperties(workInProgress), null;
  }
  throw Error(formatProdErrorMessage(156, workInProgress.tag));
}
var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner,
  didReceiveUpdate = !1;
function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
  workInProgress.child =
    null === current
      ? mountChildFibers(workInProgress, null, nextChildren, renderLanes)
      : reconcileChildFibers(
          workInProgress,
          current.child,
          nextChildren,
          renderLanes
        );
}
function updateForwardRef(
  current,
  workInProgress,
  Component,
  nextProps,
  renderLanes
) {
  Component = Component.render;
  var ref = workInProgress.ref;
  prepareToReadContext(workInProgress, renderLanes);
  nextProps = renderWithHooks(
    current,
    workInProgress,
    Component,
    nextProps,
    ref,
    renderLanes
  );
  if (null !== current && !didReceiveUpdate)
    return (
      (workInProgress.updateQueue = current.updateQueue),
      (workInProgress.flags &= -2053),
      (current.lanes &= ~renderLanes),
      bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
    );
  workInProgress.flags |= 1;
  reconcileChildren(current, workInProgress, nextProps, renderLanes);
  return workInProgress.child;
}
function updateMemoComponent(
  current,
  workInProgress,
  Component,
  nextProps,
  renderLanes
) {
  if (null === current) {
    var type = Component.type;
    if (
      "function" === typeof type &&
      !shouldConstruct(type) &&
      void 0 === type.defaultProps &&
      null === Component.compare &&
      void 0 === Component.defaultProps
    )
      return (
        (workInProgress.tag = 15),
        (workInProgress.type = type),
        updateSimpleMemoComponent(
          current,
          workInProgress,
          type,
          nextProps,
          renderLanes
        )
      );
    current = createFiberFromTypeAndProps(
      Component.type,
      null,
      nextProps,
      workInProgress,
      workInProgress.mode,
      renderLanes
    );
    current.ref = workInProgress.ref;
    current.return = workInProgress;
    return (workInProgress.child = current);
  }
  type = current.child;
  if (!checkScheduledUpdateOrContext(current, renderLanes)) {
    var prevProps = type.memoizedProps;
    Component = Component.compare;
    Component = null !== Component ? Component : shallowEqual;
    if (Component(prevProps, nextProps) && current.ref === workInProgress.ref)
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }
  workInProgress.flags |= 1;
  current = createWorkInProgress(type, nextProps);
  current.ref = workInProgress.ref;
  current.return = workInProgress;
  return (workInProgress.child = current);
}
function updateSimpleMemoComponent(
  current,
  workInProgress,
  Component,
  nextProps,
  renderLanes
) {
  if (
    null !== current &&
    shallowEqual(current.memoizedProps, nextProps) &&
    current.ref === workInProgress.ref
  )
    if (
      ((didReceiveUpdate = !1),
      checkScheduledUpdateOrContext(current, renderLanes))
    )
      0 !== (current.flags & 131072) && (didReceiveUpdate = !0);
    else
      return (
        (workInProgress.lanes = current.lanes),
        bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
      );
  return updateFunctionComponent(
    current,
    workInProgress,
    Component,
    nextProps,
    renderLanes
  );
}
function updateOffscreenComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps,
    nextChildren = nextProps.children,
    prevState = null !== current ? current.memoizedState : null,
    spawnedCachePool = null;
  if (
    "hidden" === nextProps.mode ||
    "unstable-defer-without-hiding" === nextProps.mode
  )
    if (0 === (workInProgress.mode & 1))
      (workInProgress.memoizedState = { baseLanes: 0, cachePool: null }),
        push(subtreeRenderLanesCursor, subtreeRenderLanes),
        (subtreeRenderLanes |= renderLanes);
    else if (0 !== (renderLanes & 1073741824))
      null !== prevState &&
        ((nextProps = prevState.cachePool),
        null !== nextProps &&
          (spawnedCachePool = restoreSpawnedCachePool(
            workInProgress,
            nextProps
          ))),
        (workInProgress.memoizedState = { baseLanes: 0, cachePool: null }),
        (prevState = null !== prevState ? prevState.baseLanes : renderLanes),
        push(subtreeRenderLanesCursor, subtreeRenderLanes),
        (subtreeRenderLanes |= prevState);
    else
      return (
        null !== prevState
          ? ((nextChildren = prevState.baseLanes | renderLanes),
            (spawnedCachePool =
              null === pooledCache
                ? null
                : { parent: CacheContext._currentValue2, pool: pooledCache }))
          : (nextChildren = renderLanes),
        (workInProgress.lanes = workInProgress.childLanes = 1073741824),
        (workInProgress.memoizedState = {
          baseLanes: nextChildren,
          cachePool: spawnedCachePool
        }),
        (workInProgress.updateQueue = null),
        (spawnedCachePool = nextChildren),
        push(subtreeRenderLanesCursor, subtreeRenderLanes),
        (subtreeRenderLanes |= spawnedCachePool),
        enableLazyContextPropagation &&
          null !== current &&
          propagateParentContextChanges(
            current,
            workInProgress,
            renderLanes,
            !0
          ),
        null
      );
  else
    null !== prevState
      ? ((nextProps = prevState.baseLanes | renderLanes),
        (prevState = prevState.cachePool),
        null !== prevState &&
          (spawnedCachePool = restoreSpawnedCachePool(
            workInProgress,
            prevState
          )),
        (workInProgress.memoizedState = null))
      : (nextProps = renderLanes),
      (prevState = nextProps),
      push(subtreeRenderLanesCursor, subtreeRenderLanes),
      (subtreeRenderLanes |= prevState);
  workInProgress.updateQueue = spawnedCachePool;
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}
function markRef$1(current, workInProgress) {
  var ref = workInProgress.ref;
  if (
    (null === current && null !== ref) ||
    (null !== current && current.ref !== ref)
  )
    (workInProgress.flags |= 512), (workInProgress.flags |= 1048576);
}
function updateFunctionComponent(
  current,
  workInProgress,
  Component,
  nextProps,
  renderLanes
) {
  prepareToReadContext(workInProgress, renderLanes);
  Component = renderWithHooks(
    current,
    workInProgress,
    Component,
    nextProps,
    void 0,
    renderLanes
  );
  if (null !== current && !didReceiveUpdate)
    return (
      (workInProgress.updateQueue = current.updateQueue),
      (workInProgress.flags &= -2053),
      (current.lanes &= ~renderLanes),
      bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
    );
  workInProgress.flags |= 1;
  reconcileChildren(current, workInProgress, Component, renderLanes);
  return workInProgress.child;
}
function updateClassComponent(
  current,
  workInProgress,
  Component,
  nextProps,
  renderLanes
) {
  prepareToReadContext(workInProgress, renderLanes);
  if (null === workInProgress.stateNode)
    null !== current &&
      ((current.alternate = null),
      (workInProgress.alternate = null),
      (workInProgress.flags |= 2)),
      constructClassInstance(workInProgress, Component, nextProps),
      mountClassInstance(workInProgress, Component, nextProps, renderLanes),
      (nextProps = !0);
  else if (null === current) {
    var instance = workInProgress.stateNode,
      oldProps = workInProgress.memoizedProps;
    instance.props = oldProps;
    var oldContext = instance.context,
      contextType = Component.contextType,
      nextContext = emptyContextObject;
    "object" === typeof contextType &&
      null !== contextType &&
      (nextContext = readContext(contextType));
    var getDerivedStateFromProps = Component.getDerivedStateFromProps;
    (contextType =
      "function" === typeof getDerivedStateFromProps ||
      "function" === typeof instance.getSnapshotBeforeUpdate) ||
      ("function" !== typeof instance.UNSAFE_componentWillReceiveProps &&
        "function" !== typeof instance.componentWillReceiveProps) ||
      ((oldProps !== nextProps || oldContext !== nextContext) &&
        callComponentWillReceiveProps(
          workInProgress,
          instance,
          nextProps,
          nextContext
        ));
    hasForceUpdate = !1;
    var oldState = workInProgress.memoizedState;
    instance.state = oldState;
    processUpdateQueue(workInProgress, nextProps, instance, renderLanes);
    oldContext = workInProgress.memoizedState;
    oldProps !== nextProps || oldState !== oldContext || hasForceUpdate
      ? ("function" === typeof getDerivedStateFromProps &&
          (applyDerivedStateFromProps(
            workInProgress,
            Component,
            getDerivedStateFromProps,
            nextProps
          ),
          (oldContext = workInProgress.memoizedState)),
        (oldProps =
          hasForceUpdate ||
          checkShouldComponentUpdate(
            workInProgress,
            Component,
            oldProps,
            nextProps,
            oldState,
            oldContext,
            nextContext
          ))
          ? (contextType ||
              ("function" !== typeof instance.UNSAFE_componentWillMount &&
                "function" !== typeof instance.componentWillMount) ||
              ("function" === typeof instance.componentWillMount &&
                instance.componentWillMount(),
              "function" === typeof instance.UNSAFE_componentWillMount &&
                instance.UNSAFE_componentWillMount()),
            "function" === typeof instance.componentDidMount &&
              (workInProgress.flags |= 2097156))
          : ("function" === typeof instance.componentDidMount &&
              (workInProgress.flags |= 2097156),
            (workInProgress.memoizedProps = nextProps),
            (workInProgress.memoizedState = oldContext)),
        (instance.props = nextProps),
        (instance.state = oldContext),
        (instance.context = nextContext),
        (nextProps = oldProps))
      : ("function" === typeof instance.componentDidMount &&
          (workInProgress.flags |= 2097156),
        (nextProps = !1));
  } else {
    instance = workInProgress.stateNode;
    cloneUpdateQueue(current, workInProgress);
    nextContext = workInProgress.memoizedProps;
    contextType =
      workInProgress.type === workInProgress.elementType
        ? nextContext
        : resolveDefaultProps(workInProgress.type, nextContext);
    instance.props = contextType;
    getDerivedStateFromProps = workInProgress.pendingProps;
    var oldContext$jscomp$0 = instance.context;
    oldContext = Component.contextType;
    oldProps = emptyContextObject;
    "object" === typeof oldContext &&
      null !== oldContext &&
      (oldProps = readContext(oldContext));
    oldState = Component.getDerivedStateFromProps;
    (oldContext =
      "function" === typeof oldState ||
      "function" === typeof instance.getSnapshotBeforeUpdate) ||
      ("function" !== typeof instance.UNSAFE_componentWillReceiveProps &&
        "function" !== typeof instance.componentWillReceiveProps) ||
      ((nextContext !== getDerivedStateFromProps ||
        oldContext$jscomp$0 !== oldProps) &&
        callComponentWillReceiveProps(
          workInProgress,
          instance,
          nextProps,
          oldProps
        ));
    hasForceUpdate = !1;
    oldContext$jscomp$0 = workInProgress.memoizedState;
    instance.state = oldContext$jscomp$0;
    processUpdateQueue(workInProgress, nextProps, instance, renderLanes);
    var newState = workInProgress.memoizedState;
    nextContext !== getDerivedStateFromProps ||
    oldContext$jscomp$0 !== newState ||
    hasForceUpdate ||
    (enableLazyContextPropagation &&
      null !== current &&
      null !== current.dependencies &&
      checkIfContextChanged(current.dependencies))
      ? ("function" === typeof oldState &&
          (applyDerivedStateFromProps(
            workInProgress,
            Component,
            oldState,
            nextProps
          ),
          (newState = workInProgress.memoizedState)),
        (contextType =
          hasForceUpdate ||
          checkShouldComponentUpdate(
            workInProgress,
            Component,
            contextType,
            nextProps,
            oldContext$jscomp$0,
            newState,
            oldProps
          ) ||
          (enableLazyContextPropagation &&
            null !== current &&
            null !== current.dependencies &&
            checkIfContextChanged(current.dependencies)))
          ? (oldContext ||
              ("function" !== typeof instance.UNSAFE_componentWillUpdate &&
                "function" !== typeof instance.componentWillUpdate) ||
              ("function" === typeof instance.componentWillUpdate &&
                instance.componentWillUpdate(nextProps, newState, oldProps),
              "function" === typeof instance.UNSAFE_componentWillUpdate &&
                instance.UNSAFE_componentWillUpdate(
                  nextProps,
                  newState,
                  oldProps
                )),
            "function" === typeof instance.componentDidUpdate &&
              (workInProgress.flags |= 4),
            "function" === typeof instance.getSnapshotBeforeUpdate &&
              (workInProgress.flags |= 1024))
          : ("function" !== typeof instance.componentDidUpdate ||
              (nextContext === current.memoizedProps &&
                oldContext$jscomp$0 === current.memoizedState) ||
              (workInProgress.flags |= 4),
            "function" !== typeof instance.getSnapshotBeforeUpdate ||
              (nextContext === current.memoizedProps &&
                oldContext$jscomp$0 === current.memoizedState) ||
              (workInProgress.flags |= 1024),
            (workInProgress.memoizedProps = nextProps),
            (workInProgress.memoizedState = newState)),
        (instance.props = nextProps),
        (instance.state = newState),
        (instance.context = oldProps),
        (nextProps = contextType))
      : ("function" !== typeof instance.componentDidUpdate ||
          (nextContext === current.memoizedProps &&
            oldContext$jscomp$0 === current.memoizedState) ||
          (workInProgress.flags |= 4),
        "function" !== typeof instance.getSnapshotBeforeUpdate ||
          (nextContext === current.memoizedProps &&
            oldContext$jscomp$0 === current.memoizedState) ||
          (workInProgress.flags |= 1024),
        (nextProps = !1));
  }
  return finishClassComponent(
    current,
    workInProgress,
    Component,
    nextProps,
    !1,
    renderLanes
  );
}
function finishClassComponent(
  current,
  workInProgress,
  Component,
  shouldUpdate,
  hasContext,
  renderLanes
) {
  markRef$1(current, workInProgress);
  hasContext = 0 !== (workInProgress.flags & 128);
  if (!shouldUpdate && !hasContext)
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  shouldUpdate = workInProgress.stateNode;
  ReactCurrentOwner$1.current = workInProgress;
  Component =
    hasContext && "function" !== typeof Component.getDerivedStateFromError
      ? null
      : shouldUpdate.render();
  workInProgress.flags |= 1;
  null !== current && hasContext
    ? ((workInProgress.child = reconcileChildFibers(
        workInProgress,
        current.child,
        null,
        renderLanes
      )),
      (workInProgress.child = reconcileChildFibers(
        workInProgress,
        null,
        Component,
        renderLanes
      )))
    : reconcileChildren(current, workInProgress, Component, renderLanes);
  workInProgress.memoizedState = shouldUpdate.state;
  return workInProgress.child;
}
var SUSPENDED_MARKER = { dehydrated: null, retryLane: 0 };
function mountSuspenseOffscreenState(renderLanes) {
  return { baseLanes: renderLanes, cachePool: getSuspendedCachePool() };
}
function updateSuspenseOffscreenState(prevOffscreenState, renderLanes) {
  var cachePool = prevOffscreenState.cachePool;
  if (null !== cachePool) {
    var parentCache = CacheContext._currentValue2;
    cachePool =
      cachePool.parent !== parentCache
        ? { parent: parentCache, pool: parentCache }
        : cachePool;
  } else cachePool = getSuspendedCachePool();
  return {
    baseLanes: prevOffscreenState.baseLanes | renderLanes,
    cachePool: cachePool
  };
}
function updateSuspenseComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps,
    suspenseContext = suspenseStackCursor.current,
    showFallback = !1,
    didSuspend = 0 !== (workInProgress.flags & 128),
    JSCompiler_temp;
  (JSCompiler_temp = didSuspend) ||
    (JSCompiler_temp =
      null !== current && null === current.memoizedState
        ? !1
        : 0 !== (suspenseContext & 2));
  JSCompiler_temp
    ? ((showFallback = !0), (workInProgress.flags &= -129))
    : (null !== current && null === current.memoizedState) ||
      !0 === nextProps.unstable_avoidThisFallback ||
      (suspenseContext |= 1);
  push(suspenseStackCursor, suspenseContext & 1);
  if (null === current) {
    current = workInProgress.memoizedState;
    if (null !== current && null !== current.dehydrated)
      return (
        0 === (workInProgress.mode & 1)
          ? (workInProgress.lanes = 1)
          : shim()
          ? (workInProgress.lanes = 8)
          : (workInProgress.lanes = 1073741824),
        null
      );
    current = nextProps.children;
    suspenseContext = nextProps.fallback;
    return showFallback
      ? ((current = mountSuspenseFallbackChildren(
          workInProgress,
          current,
          suspenseContext,
          renderLanes
        )),
        (workInProgress.child.memoizedState = mountSuspenseOffscreenState(
          renderLanes
        )),
        (workInProgress.memoizedState = SUSPENDED_MARKER),
        current)
      : "number" === typeof nextProps.unstable_expectedLoadTime
      ? ((current = mountSuspenseFallbackChildren(
          workInProgress,
          current,
          suspenseContext,
          renderLanes
        )),
        (workInProgress.child.memoizedState = mountSuspenseOffscreenState(
          renderLanes
        )),
        (workInProgress.memoizedState = SUSPENDED_MARKER),
        (workInProgress.lanes = 4194304),
        current)
      : mountSuspensePrimaryChildren(workInProgress, current);
  }
  suspenseContext = current.memoizedState;
  if (null !== suspenseContext) {
    if (null !== suspenseContext.dehydrated) {
      if (didSuspend) {
        if (workInProgress.flags & 256)
          return (
            (workInProgress.flags &= -257),
            retrySuspenseComponentWithoutHydrating(
              current,
              workInProgress,
              renderLanes
            )
          );
        if (null !== workInProgress.memoizedState)
          return (
            (workInProgress.child = current.child),
            (workInProgress.flags |= 128),
            null
          );
        showFallback = nextProps.fallback;
        suspenseContext = workInProgress.mode;
        nextProps = createFiberFromOffscreen(
          { mode: "visible", children: nextProps.children },
          suspenseContext,
          0,
          null
        );
        showFallback = createFiberFromFragment(
          showFallback,
          suspenseContext,
          renderLanes,
          null
        );
        showFallback.flags |= 2;
        nextProps.return = workInProgress;
        showFallback.return = workInProgress;
        nextProps.sibling = showFallback;
        workInProgress.child = nextProps;
        0 !== (workInProgress.mode & 1) &&
          reconcileChildFibers(
            workInProgress,
            current.child,
            null,
            renderLanes
          );
        workInProgress.child.memoizedState = mountSuspenseOffscreenState(
          renderLanes
        );
        workInProgress.memoizedState = SUSPENDED_MARKER;
        return showFallback;
      }
      if (
        0 !== (executionContext & 8) ||
        0 === (workInProgress.mode & 1) ||
        shim()
      )
        workInProgress = retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress,
          renderLanes
        );
      else if (
        (enableLazyContextPropagation &&
          !didReceiveUpdate &&
          propagateParentContextChanges(
            current,
            workInProgress,
            renderLanes,
            !1
          ),
        (nextProps = 0 !== (renderLanes & current.childLanes)),
        didReceiveUpdate || nextProps)
      ) {
        nextProps = workInProgressRoot;
        if (null !== nextProps) {
          switch (renderLanes & -renderLanes) {
            case 4:
              showFallback = 2;
              break;
            case 16:
              showFallback = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              showFallback = 32;
              break;
            case 536870912:
              showFallback = 268435456;
              break;
            default:
              showFallback = 0;
          }
          nextProps =
            0 !== (showFallback & (nextProps.suspendedLanes | renderLanes))
              ? 0
              : showFallback;
          0 !== nextProps &&
            nextProps !== suspenseContext.retryLane &&
            ((suspenseContext.retryLane = nextProps),
            scheduleUpdateOnFiber(current, nextProps, -1));
        }
        renderDidSuspendDelayIfPossible();
        workInProgress = retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress,
          renderLanes
        );
      } else
        shim()
          ? ((workInProgress.flags |= 128),
            (workInProgress.child = current.child),
            retryDehydratedSuspenseBoundary.bind(null, current),
            shim(),
            (workInProgress = null))
          : ((workInProgress = mountSuspensePrimaryChildren(
              workInProgress,
              workInProgress.pendingProps.children
            )),
            (workInProgress.flags |= 4096));
      return workInProgress;
    }
    if (showFallback)
      return (
        (nextProps = updateSuspenseFallbackChildren(
          current,
          workInProgress,
          nextProps.children,
          nextProps.fallback,
          renderLanes
        )),
        (showFallback = workInProgress.child),
        (suspenseContext = current.child.memoizedState),
        (showFallback.memoizedState =
          null === suspenseContext
            ? mountSuspenseOffscreenState(renderLanes)
            : updateSuspenseOffscreenState(suspenseContext, renderLanes)),
        (showFallback.childLanes = current.childLanes & ~renderLanes),
        (workInProgress.memoizedState = SUSPENDED_MARKER),
        nextProps
      );
    renderLanes = updateSuspensePrimaryChildren(
      current,
      workInProgress,
      nextProps.children,
      renderLanes
    );
    workInProgress.memoizedState = null;
    return renderLanes;
  }
  if (showFallback)
    return (
      (nextProps = updateSuspenseFallbackChildren(
        current,
        workInProgress,
        nextProps.children,
        nextProps.fallback,
        renderLanes
      )),
      (showFallback = workInProgress.child),
      (suspenseContext = current.child.memoizedState),
      (showFallback.memoizedState =
        null === suspenseContext
          ? mountSuspenseOffscreenState(renderLanes)
          : updateSuspenseOffscreenState(suspenseContext, renderLanes)),
      (showFallback.childLanes = current.childLanes & ~renderLanes),
      (workInProgress.memoizedState = SUSPENDED_MARKER),
      nextProps
    );
  renderLanes = updateSuspensePrimaryChildren(
    current,
    workInProgress,
    nextProps.children,
    renderLanes
  );
  workInProgress.memoizedState = null;
  return renderLanes;
}
function mountSuspensePrimaryChildren(workInProgress, primaryChildren) {
  primaryChildren = createFiberFromOffscreen(
    { mode: "visible", children: primaryChildren },
    workInProgress.mode,
    0,
    null
  );
  primaryChildren.return = workInProgress;
  return (workInProgress.child = primaryChildren);
}
function mountSuspenseFallbackChildren(
  workInProgress,
  primaryChildren,
  fallbackChildren,
  renderLanes
) {
  var mode = workInProgress.mode,
    progressedPrimaryFragment = workInProgress.child;
  primaryChildren = { mode: "hidden", children: primaryChildren };
  0 === (mode & 1) && null !== progressedPrimaryFragment
    ? ((progressedPrimaryFragment.childLanes = 0),
      (progressedPrimaryFragment.pendingProps = primaryChildren))
    : (progressedPrimaryFragment = createFiberFromOffscreen(
        primaryChildren,
        mode,
        0,
        null
      ));
  fallbackChildren = createFiberFromFragment(
    fallbackChildren,
    mode,
    renderLanes,
    null
  );
  progressedPrimaryFragment.return = workInProgress;
  fallbackChildren.return = workInProgress;
  progressedPrimaryFragment.sibling = fallbackChildren;
  workInProgress.child = progressedPrimaryFragment;
  return fallbackChildren;
}
function updateSuspensePrimaryChildren(
  current,
  workInProgress,
  primaryChildren,
  renderLanes
) {
  var currentPrimaryChildFragment = current.child;
  current = currentPrimaryChildFragment.sibling;
  primaryChildren = createWorkInProgress(currentPrimaryChildFragment, {
    mode: "visible",
    children: primaryChildren
  });
  0 === (workInProgress.mode & 1) && (primaryChildren.lanes = renderLanes);
  primaryChildren.return = workInProgress;
  primaryChildren.sibling = null;
  null !== current &&
    ((renderLanes = workInProgress.deletions),
    null === renderLanes
      ? ((workInProgress.deletions = [current]), (workInProgress.flags |= 16))
      : renderLanes.push(current));
  return (workInProgress.child = primaryChildren);
}
function updateSuspenseFallbackChildren(
  current,
  workInProgress,
  primaryChildren,
  fallbackChildren,
  renderLanes
) {
  var mode = workInProgress.mode;
  current = current.child;
  var currentFallbackChildFragment = current.sibling,
    primaryChildProps = { mode: "hidden", children: primaryChildren };
  0 === (mode & 1) && workInProgress.child !== current
    ? ((primaryChildren = workInProgress.child),
      (primaryChildren.childLanes = 0),
      (primaryChildren.pendingProps = primaryChildProps),
      (workInProgress.deletions = null))
    : ((primaryChildren = createWorkInProgress(current, primaryChildProps)),
      (primaryChildren.subtreeFlags = current.subtreeFlags & 7340032));
  null !== currentFallbackChildFragment
    ? (fallbackChildren = createWorkInProgress(
        currentFallbackChildFragment,
        fallbackChildren
      ))
    : ((fallbackChildren = createFiberFromFragment(
        fallbackChildren,
        mode,
        renderLanes,
        null
      )),
      (fallbackChildren.flags |= 2));
  fallbackChildren.return = workInProgress;
  primaryChildren.return = workInProgress;
  primaryChildren.sibling = fallbackChildren;
  workInProgress.child = primaryChildren;
  return fallbackChildren;
}
function retrySuspenseComponentWithoutHydrating(
  current,
  workInProgress,
  renderLanes
) {
  reconcileChildFibers(workInProgress, current.child, null, renderLanes);
  current = mountSuspensePrimaryChildren(
    workInProgress,
    workInProgress.pendingProps.children
  );
  current.flags |= 2;
  workInProgress.memoizedState = null;
  return current;
}
function scheduleWorkOnFiber(fiber, renderLanes) {
  fiber.lanes |= renderLanes;
  var alternate = fiber.alternate;
  null !== alternate && (alternate.lanes |= renderLanes);
  scheduleWorkOnParentPath(fiber.return, renderLanes);
}
function initSuspenseListRenderState(
  workInProgress,
  isBackwards,
  tail,
  lastContentRow,
  tailMode
) {
  var renderState = workInProgress.memoizedState;
  null === renderState
    ? (workInProgress.memoizedState = {
        isBackwards: isBackwards,
        rendering: null,
        renderingStartTime: 0,
        last: lastContentRow,
        tail: tail,
        tailMode: tailMode
      })
    : ((renderState.isBackwards = isBackwards),
      (renderState.rendering = null),
      (renderState.renderingStartTime = 0),
      (renderState.last = lastContentRow),
      (renderState.tail = tail),
      (renderState.tailMode = tailMode));
}
function updateSuspenseListComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps,
    revealOrder = nextProps.revealOrder,
    tailMode = nextProps.tail;
  reconcileChildren(current, workInProgress, nextProps.children, renderLanes);
  nextProps = suspenseStackCursor.current;
  if (0 !== (nextProps & 2))
    (nextProps = (nextProps & 1) | 2), (workInProgress.flags |= 128);
  else {
    if (null !== current && 0 !== (current.flags & 128))
      a: for (current = workInProgress.child; null !== current; ) {
        if (13 === current.tag)
          null !== current.memoizedState &&
            scheduleWorkOnFiber(current, renderLanes);
        else if (19 === current.tag) scheduleWorkOnFiber(current, renderLanes);
        else if (null !== current.child) {
          current.child.return = current;
          current = current.child;
          continue;
        }
        if (current === workInProgress) break a;
        for (; null === current.sibling; ) {
          if (null === current.return || current.return === workInProgress)
            break a;
          current = current.return;
        }
        current.sibling.return = current.return;
        current = current.sibling;
      }
    nextProps &= 1;
  }
  push(suspenseStackCursor, nextProps);
  if (0 === (workInProgress.mode & 1)) workInProgress.memoizedState = null;
  else
    switch (revealOrder) {
      case "forwards":
        renderLanes = workInProgress.child;
        for (revealOrder = null; null !== renderLanes; )
          (current = renderLanes.alternate),
            null !== current &&
              null === findFirstSuspended(current) &&
              (revealOrder = renderLanes),
            (renderLanes = renderLanes.sibling);
        renderLanes = revealOrder;
        null === renderLanes
          ? ((revealOrder = workInProgress.child),
            (workInProgress.child = null))
          : ((revealOrder = renderLanes.sibling), (renderLanes.sibling = null));
        initSuspenseListRenderState(
          workInProgress,
          !1,
          revealOrder,
          renderLanes,
          tailMode
        );
        break;
      case "backwards":
        renderLanes = null;
        revealOrder = workInProgress.child;
        for (workInProgress.child = null; null !== revealOrder; ) {
          current = revealOrder.alternate;
          if (null !== current && null === findFirstSuspended(current)) {
            workInProgress.child = revealOrder;
            break;
          }
          current = revealOrder.sibling;
          revealOrder.sibling = renderLanes;
          renderLanes = revealOrder;
          revealOrder = current;
        }
        initSuspenseListRenderState(
          workInProgress,
          !0,
          renderLanes,
          null,
          tailMode
        );
        break;
      case "together":
        initSuspenseListRenderState(workInProgress, !1, null, null, void 0);
        break;
      default:
        workInProgress.memoizedState = null;
    }
  return workInProgress.child;
}
function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
  null !== current && (workInProgress.dependencies = current.dependencies);
  workInProgressRootSkippedLanes |= workInProgress.lanes;
  if (0 === (renderLanes & workInProgress.childLanes))
    if (enableLazyContextPropagation && null !== current) {
      if (
        (propagateParentContextChanges(
          current,
          workInProgress,
          renderLanes,
          !1
        ),
        0 === (renderLanes & workInProgress.childLanes))
      )
        return null;
    } else return null;
  if (null !== current && workInProgress.child !== current.child)
    throw Error(formatProdErrorMessage(153));
  if (null !== workInProgress.child) {
    current = workInProgress.child;
    renderLanes = createWorkInProgress(current, current.pendingProps);
    workInProgress.child = renderLanes;
    for (renderLanes.return = workInProgress; null !== current.sibling; )
      (current = current.sibling),
        (renderLanes = renderLanes.sibling = createWorkInProgress(
          current,
          current.pendingProps
        )),
        (renderLanes.return = workInProgress);
    renderLanes.sibling = null;
  }
  return workInProgress.child;
}
function checkScheduledUpdateOrContext(current, renderLanes) {
  return 0 !== (current.lanes & renderLanes) ||
    (enableLazyContextPropagation &&
      ((current = current.dependencies),
      null !== current && checkIfContextChanged(current)))
    ? !0
    : !1;
}
function attemptEarlyBailoutIfNoScheduledUpdate(
  current,
  workInProgress,
  renderLanes
) {
  switch (workInProgress.tag) {
    case 3:
      pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
      var root = workInProgress.stateNode;
      pushProvider(workInProgress, CacheContext, current.memoizedState.cache);
      pooledCache = root.pooledCache;
      break;
    case 5:
      pushHostContext(workInProgress);
      break;
    case 4:
      pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
      break;
    case 10:
      pushProvider(
        workInProgress,
        workInProgress.type._context,
        workInProgress.memoizedProps.value
      );
      break;
    case 13:
      root = workInProgress.memoizedState;
      if (null !== root) {
        if (null !== root.dehydrated)
          return (
            push(suspenseStackCursor, suspenseStackCursor.current & 1),
            (workInProgress.flags |= 128),
            null
          );
        if (0 !== (renderLanes & workInProgress.child.childLanes))
          return updateSuspenseComponent(current, workInProgress, renderLanes);
        push(suspenseStackCursor, suspenseStackCursor.current & 1);
        current = bailoutOnAlreadyFinishedWork(
          current,
          workInProgress,
          renderLanes
        );
        return null !== current ? current.sibling : null;
      }
      push(suspenseStackCursor, suspenseStackCursor.current & 1);
      break;
    case 19:
      var didSuspendBefore = 0 !== (current.flags & 128);
      root = 0 !== (renderLanes & workInProgress.childLanes);
      enableLazyContextPropagation &&
        !root &&
        (propagateParentContextChanges(
          current,
          workInProgress,
          renderLanes,
          !1
        ),
        (root = 0 !== (renderLanes & workInProgress.childLanes)));
      if (didSuspendBefore) {
        if (root)
          return updateSuspenseListComponent(
            current,
            workInProgress,
            renderLanes
          );
        workInProgress.flags |= 128;
      }
      didSuspendBefore = workInProgress.memoizedState;
      null !== didSuspendBefore &&
        ((didSuspendBefore.rendering = null),
        (didSuspendBefore.tail = null),
        (didSuspendBefore.lastEffect = null));
      push(suspenseStackCursor, suspenseStackCursor.current);
      if (root) break;
      else return null;
    case 22:
    case 23:
      return (
        (workInProgress.lanes = 0),
        updateOffscreenComponent(current, workInProgress, renderLanes)
      );
    case 24:
      pushProvider(workInProgress, CacheContext, current.memoizedState.cache);
  }
  return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
}
function unwindWork(workInProgress, renderLanes) {
  switch (workInProgress.tag) {
    case 1:
      return (
        (renderLanes = workInProgress.flags),
        renderLanes & 65536
          ? ((workInProgress.flags = (renderLanes & -65537) | 128),
            workInProgress)
          : null
      );
    case 3:
      popRootCachePool(workInProgress.stateNode, renderLanes);
      popProvider(CacheContext);
      popHostContainer();
      resetWorkInProgressVersions();
      renderLanes = workInProgress.flags;
      if (0 !== (renderLanes & 128)) throw Error(formatProdErrorMessage(285));
      workInProgress.flags = (renderLanes & -65537) | 128;
      return workInProgress;
    case 5:
      return popHostContext(workInProgress), null;
    case 13:
      pop(suspenseStackCursor);
      renderLanes = workInProgress.memoizedState;
      if (
        null !== renderLanes &&
        null !== renderLanes.dehydrated &&
        null === workInProgress.alternate
      )
        throw Error(formatProdErrorMessage(340));
      renderLanes = workInProgress.flags;
      return renderLanes & 65536
        ? ((workInProgress.flags = (renderLanes & -65537) | 128),
          workInProgress)
        : null;
    case 19:
      return pop(suspenseStackCursor), null;
    case 4:
      return popHostContainer(), null;
    case 10:
      return popProvider(workInProgress.type._context), null;
    case 22:
    case 23:
      return (
        popRenderLanes(),
        null !== workInProgress.updateQueue && popCachePool(),
        null
      );
    case 24:
      return popProvider(CacheContext), null;
    default:
      return null;
  }
}
if ("function" !== typeof require("ReactFbErrorUtils").invokeGuardedCallback)
  throw Error(formatProdErrorMessage(255));
var offscreenSubtreeIsHidden = !1,
  offscreenSubtreeWasHidden = !1,
  PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set,
  nextEffect = null;
function safelyDetachRef(current, nearestMountedAncestor) {
  var ref = current.ref;
  if (null !== ref)
    if ("function" === typeof ref)
      try {
        ref(null);
      } catch (error) {
        captureCommitPhaseError(current, nearestMountedAncestor, error);
      }
    else ref.current = null;
}
var focusedInstanceHandle = null,
  shouldFireAfterActiveInstanceBlur = !1;
function commitBeforeMutationEffects(root, firstChild) {
  focusedInstanceHandle = null;
  for (nextEffect = firstChild; null !== nextEffect; ) {
    root = nextEffect;
    firstChild = root.deletions;
    if (null !== firstChild)
      for (var i = 0; i < firstChild.length; i++)
        doesFiberContain(firstChild[i], focusedInstanceHandle) &&
          (shouldFireAfterActiveInstanceBlur = !0);
    firstChild = root.child;
    if (0 !== (root.subtreeFlags & 9236) && null !== firstChild)
      (firstChild.return = root), (nextEffect = firstChild);
    else
      for (; null !== nextEffect; ) {
        root = nextEffect;
        try {
          var current = root.alternate,
            flags = root.flags;
          if (
            !shouldFireAfterActiveInstanceBlur &&
            null !== focusedInstanceHandle
          ) {
            var JSCompiler_temp;
            if ((JSCompiler_temp = 13 === root.tag))
              a: {
                if (null !== current) {
                  var oldState = current.memoizedState;
                  if (null === oldState || null !== oldState.dehydrated) {
                    var newState = root.memoizedState;
                    JSCompiler_temp =
                      null !== newState && null === newState.dehydrated;
                    break a;
                  }
                }
                JSCompiler_temp = !1;
              }
            JSCompiler_temp &&
              doesFiberContain(root, focusedInstanceHandle) &&
              (shouldFireAfterActiveInstanceBlur = !0);
          }
          if (0 !== (flags & 1024))
            switch (root.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== current) {
                  var prevProps = current.memoizedProps,
                    prevState = current.memoizedState,
                    instance = root.stateNode,
                    snapshot = instance.getSnapshotBeforeUpdate(
                      root.elementType === root.type
                        ? prevProps
                        : resolveDefaultProps(root.type, prevProps),
                      prevState
                    );
                  instance.__reactInternalSnapshotBeforeUpdate = snapshot;
                }
                break;
              case 3:
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(formatProdErrorMessage(163));
            }
        } catch (error) {
          captureCommitPhaseError(root, root.return, error);
        }
        firstChild = root.sibling;
        if (null !== firstChild) {
          firstChild.return = root.return;
          nextEffect = firstChild;
          break;
        }
        nextEffect = root.return;
      }
  }
  current = shouldFireAfterActiveInstanceBlur;
  shouldFireAfterActiveInstanceBlur = !1;
  focusedInstanceHandle = null;
  return current;
}
function commitHookEffectListUnmount(
  flags,
  finishedWork,
  nearestMountedAncestor$jscomp$0
) {
  var updateQueue = finishedWork.updateQueue;
  updateQueue = null !== updateQueue ? updateQueue.lastEffect : null;
  if (null !== updateQueue) {
    var effect = (updateQueue = updateQueue.next);
    do {
      if ((effect.tag & flags) === flags) {
        var destroy = effect.destroy;
        effect.destroy = void 0;
        if (void 0 !== destroy) {
          var current = finishedWork,
            nearestMountedAncestor = nearestMountedAncestor$jscomp$0;
          try {
            destroy();
          } catch (error) {
            captureCommitPhaseError(current, nearestMountedAncestor, error);
          }
        }
      }
      effect = effect.next;
    } while (effect !== updateQueue);
  }
}
function commitHookEffectListMount(tag, finishedWork) {
  finishedWork = finishedWork.updateQueue;
  finishedWork = null !== finishedWork ? finishedWork.lastEffect : null;
  if (null !== finishedWork) {
    var effect = (finishedWork = finishedWork.next);
    do {
      if ((effect.tag & tag) === tag) {
        var create = effect.create;
        effect.destroy = create();
      }
      effect = effect.next;
    } while (effect !== finishedWork);
  }
}
function commitAttachRef(finishedWork) {
  var ref = finishedWork.ref;
  if (null !== ref) {
    var instance = finishedWork.stateNode;
    switch (finishedWork.tag) {
      case 5:
        var instanceToUse = instance;
        break;
      default:
        instanceToUse = instance;
    }
    21 === finishedWork.tag && (instanceToUse = instance);
    "function" === typeof ref
      ? ref(instanceToUse)
      : (ref.current = instanceToUse);
  }
}
function commitUnmount(finishedRoot, current, nearestMountedAncestor$jscomp$0) {
  if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount)
    try {
      injectedHook.onCommitFiberUnmount(rendererID, current);
    } catch (err) {}
  switch (current.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      finishedRoot = current.updateQueue;
      if (
        null !== finishedRoot &&
        ((finishedRoot = finishedRoot.lastEffect), null !== finishedRoot)
      ) {
        var effect = (finishedRoot = finishedRoot.next);
        do {
          var _effect = effect,
            destroy = _effect.destroy;
          _effect = _effect.tag;
          if (
            void 0 !== destroy &&
            (0 !== (_effect & 2) || 0 !== (_effect & 4))
          ) {
            _effect = current;
            var nearestMountedAncestor = nearestMountedAncestor$jscomp$0;
            try {
              destroy();
            } catch (error) {
              captureCommitPhaseError(_effect, nearestMountedAncestor, error);
            }
          }
          effect = effect.next;
        } while (effect !== finishedRoot);
      }
      break;
    case 1:
      safelyDetachRef(current, nearestMountedAncestor$jscomp$0);
      finishedRoot = current.stateNode;
      if ("function" === typeof finishedRoot.componentWillUnmount)
        try {
          (finishedRoot.props = current.memoizedProps),
            (finishedRoot.state = current.memoizedState),
            finishedRoot.componentWillUnmount();
        } catch (error) {
          captureCommitPhaseError(
            current,
            nearestMountedAncestor$jscomp$0,
            error
          );
        }
      break;
    case 5:
      safelyDetachRef(current, nearestMountedAncestor$jscomp$0);
      break;
    case 4:
      unmountHostComponents(
        finishedRoot,
        current,
        nearestMountedAncestor$jscomp$0
      );
      break;
    case 18:
      nearestMountedAncestor$jscomp$0 = finishedRoot.hydrationCallbacks;
      null !== nearestMountedAncestor$jscomp$0 &&
        (nearestMountedAncestor$jscomp$0 =
          nearestMountedAncestor$jscomp$0.onDeleted) &&
        nearestMountedAncestor$jscomp$0(current.stateNode);
      break;
    case 21:
      safelyDetachRef(current, nearestMountedAncestor$jscomp$0);
  }
}
function detachFiberAfterEffects(fiber) {
  var alternate = fiber.alternate;
  null !== alternate &&
    ((fiber.alternate = null), detachFiberAfterEffects(alternate));
  fiber.child = null;
  fiber.deletions = null;
  fiber.sibling = null;
  fiber.stateNode = null;
  fiber.return = null;
  fiber.dependencies = null;
  fiber.memoizedProps = null;
  fiber.memoizedState = null;
  fiber.pendingProps = null;
  fiber.stateNode = null;
  fiber.updateQueue = null;
}
function isHostParent(fiber) {
  return 5 === fiber.tag || 3 === fiber.tag || 4 === fiber.tag;
}
function commitPlacement(finishedWork) {
  a: {
    for (var parent = finishedWork.return; null !== parent; ) {
      if (isHostParent(parent)) break a;
      parent = parent.return;
    }
    throw Error(formatProdErrorMessage(160));
  }
  var parentFiber = parent;
  parent = parentFiber.stateNode;
  switch (parentFiber.tag) {
    case 5:
      var isContainer = !1;
      break;
    case 3:
      parent = parent.containerInfo;
      isContainer = !0;
      break;
    case 4:
      parent = parent.containerInfo;
      isContainer = !0;
      break;
    default:
      throw Error(formatProdErrorMessage(161));
  }
  parentFiber.flags & 32 && (parentFiber.flags &= -33);
  a: b: for (parentFiber = finishedWork; ; ) {
    for (; null === parentFiber.sibling; ) {
      if (null === parentFiber.return || isHostParent(parentFiber.return)) {
        parentFiber = null;
        break a;
      }
      parentFiber = parentFiber.return;
    }
    parentFiber.sibling.return = parentFiber.return;
    for (
      parentFiber = parentFiber.sibling;
      5 !== parentFiber.tag && 6 !== parentFiber.tag && 18 !== parentFiber.tag;

    ) {
      if (parentFiber.flags & 2) continue b;
      if (null === parentFiber.child || 4 === parentFiber.tag) continue b;
      else
        (parentFiber.child.return = parentFiber),
          (parentFiber = parentFiber.child);
    }
    if (!(parentFiber.flags & 2)) {
      parentFiber = parentFiber.stateNode;
      break a;
    }
  }
  isContainer
    ? insertOrAppendPlacementNodeIntoContainer(
        finishedWork,
        parentFiber,
        parent
      )
    : insertOrAppendPlacementNode(finishedWork, parentFiber, parent);
}
function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
  var tag = node.tag;
  if (5 === tag || 6 === tag)
    if (((node = node.stateNode), before)) {
      if (node === before) throw Error(formatProdErrorMessage(218));
      node.injectBefore(before);
    } else node.parentNode === parent && node.eject(), node.inject(parent);
  else if (4 !== tag && ((node = node.child), null !== node))
    for (
      insertOrAppendPlacementNodeIntoContainer(node, before, parent),
        node = node.sibling;
      null !== node;

    )
      insertOrAppendPlacementNodeIntoContainer(node, before, parent),
        (node = node.sibling);
}
function insertOrAppendPlacementNode(node, before, parent) {
  var tag = node.tag;
  if (5 === tag || 6 === tag)
    if (((node = node.stateNode), before)) {
      if (node === before) throw Error(formatProdErrorMessage(218));
      node.injectBefore(before);
    } else node.parentNode === parent && node.eject(), node.inject(parent);
  else if (4 !== tag && ((node = node.child), null !== node))
    for (
      insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
      null !== node;

    )
      insertOrAppendPlacementNode(node, before, parent), (node = node.sibling);
}
function unmountHostComponents(
  finishedRoot$jscomp$0,
  current,
  nearestMountedAncestor$jscomp$0
) {
  for (
    var node = current,
      currentParentIsValid = !1,
      currentParent,
      currentParentIsContainer;
    ;

  ) {
    if (!currentParentIsValid) {
      currentParentIsValid = node.return;
      a: for (;;) {
        if (null === currentParentIsValid)
          throw Error(formatProdErrorMessage(160));
        currentParent = currentParentIsValid.stateNode;
        switch (currentParentIsValid.tag) {
          case 5:
            currentParentIsContainer = !1;
            break a;
          case 3:
            currentParent = currentParent.containerInfo;
            currentParentIsContainer = !0;
            break a;
          case 4:
            currentParent = currentParent.containerInfo;
            currentParentIsContainer = !0;
            break a;
        }
        currentParentIsValid = currentParentIsValid.return;
      }
      currentParentIsValid = !0;
    }
    if (5 === node.tag || 6 === node.tag) {
      a: for (
        var finishedRoot = finishedRoot$jscomp$0,
          root = node,
          nearestMountedAncestor = nearestMountedAncestor$jscomp$0,
          node$jscomp$0 = root;
        ;

      )
        if (
          (commitUnmount(finishedRoot, node$jscomp$0, nearestMountedAncestor),
          null !== node$jscomp$0.child && 4 !== node$jscomp$0.tag)
        )
          (node$jscomp$0.child.return = node$jscomp$0),
            (node$jscomp$0 = node$jscomp$0.child);
        else {
          if (node$jscomp$0 === root) break a;
          for (; null === node$jscomp$0.sibling; ) {
            if (null === node$jscomp$0.return || node$jscomp$0.return === root)
              break a;
            node$jscomp$0 = node$jscomp$0.return;
          }
          node$jscomp$0.sibling.return = node$jscomp$0.return;
          node$jscomp$0 = node$jscomp$0.sibling;
        }
      (finishedRoot = node.stateNode),
        destroyEventListeners(finishedRoot),
        finishedRoot.eject();
    } else if (18 === node.tag)
      (finishedRoot = finishedRoot$jscomp$0.hydrationCallbacks),
        null !== finishedRoot &&
          (finishedRoot = finishedRoot.onDeleted) &&
          finishedRoot(node.stateNode),
        shim(currentParent, node.stateNode);
    else if (4 === node.tag) {
      if (null !== node.child) {
        currentParent = node.stateNode.containerInfo;
        currentParentIsContainer = !0;
        node.child.return = node;
        node = node.child;
        continue;
      }
    } else if (
      (commitUnmount(
        finishedRoot$jscomp$0,
        node,
        nearestMountedAncestor$jscomp$0
      ),
      null !== node.child)
    ) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === current) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === current) return;
      node = node.return;
      4 === node.tag && (currentParentIsValid = !1);
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function commitWork(current, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      commitHookEffectListUnmount(3, finishedWork, finishedWork.return);
      commitHookEffectListMount(3, finishedWork);
      commitHookEffectListUnmount(5, finishedWork, finishedWork.return);
      return;
    case 1:
      return;
    case 5:
      var instance = finishedWork.stateNode;
      if (null != instance) {
        var newProps = finishedWork.memoizedProps;
        current = null !== current ? current.memoizedProps : newProps;
        var updatePayload = finishedWork.updateQueue;
        finishedWork.updateQueue = null;
        null !== updatePayload &&
          instance._applyProps(instance, newProps, current);
      }
      return;
    case 6:
      if (null === finishedWork.stateNode)
        throw Error(formatProdErrorMessage(162));
      return;
    case 3:
      return;
    case 12:
      return;
    case 13:
      null !== finishedWork.memoizedState &&
        ((instance = finishedWork.memoizedProps.suspenseCallback),
        "function" === typeof instance &&
          ((newProps = finishedWork.updateQueue),
          null !== newProps && instance(new Set(newProps))));
      attachSuspenseRetryListeners(finishedWork);
      return;
    case 19:
      attachSuspenseRetryListeners(finishedWork);
      return;
    case 17:
      return;
    case 21:
      shim$1();
      return;
  }
  throw Error(formatProdErrorMessage(163));
}
function attachSuspenseRetryListeners(finishedWork) {
  var wakeables = finishedWork.updateQueue;
  if (null !== wakeables) {
    finishedWork.updateQueue = null;
    var retryCache = finishedWork.stateNode;
    null === retryCache &&
      (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
    wakeables.forEach(function(wakeable) {
      var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
      retryCache.has(wakeable) ||
        (retryCache.add(wakeable), wakeable.then(retry, retry));
    });
  }
}
function commitMutationEffects(root, firstChild$jscomp$0) {
  for (nextEffect = firstChild$jscomp$0; null !== nextEffect; ) {
    firstChild$jscomp$0 = nextEffect;
    var deletions = firstChild$jscomp$0.deletions;
    if (null !== deletions)
      for (var i = 0; i < deletions.length; i++) {
        var childToDelete = deletions[i];
        try {
          unmountHostComponents(root, childToDelete, firstChild$jscomp$0);
          var alternate = childToDelete.alternate;
          null !== alternate && (alternate.return = null);
          childToDelete.return = null;
        } catch (error) {
          captureCommitPhaseError(childToDelete, firstChild$jscomp$0, error);
        }
      }
    deletions = firstChild$jscomp$0.child;
    if (0 !== (firstChild$jscomp$0.subtreeFlags & 12854) && null !== deletions)
      (deletions.return = firstChild$jscomp$0), (nextEffect = deletions);
    else
      for (; null !== nextEffect; ) {
        firstChild$jscomp$0 = nextEffect;
        try {
          var flags = firstChild$jscomp$0.flags;
          if (flags & 512) {
            var current = firstChild$jscomp$0.alternate;
            if (null !== current) {
              var currentRef = current.ref;
              null !== currentRef &&
                ("function" === typeof currentRef
                  ? currentRef(null)
                  : (currentRef.current = null));
            }
            21 === firstChild$jscomp$0.tag &&
              commitAttachRef(firstChild$jscomp$0);
          }
          if (flags & 8192)
            switch (firstChild$jscomp$0.tag) {
              case 13:
                if (null !== firstChild$jscomp$0.memoizedState) {
                  var current$94 = firstChild$jscomp$0.alternate;
                  if (null === current$94 || null === current$94.memoizedState)
                    globalMostRecentFallbackTime = now();
                }
                break;
              case 22:
                var isHidden$96 = null !== firstChild$jscomp$0.memoizedState,
                  current$97 = firstChild$jscomp$0.alternate,
                  wasHidden$98 =
                    null !== current$97 && null !== current$97.memoizedState;
                deletions = firstChild$jscomp$0;
                a: {
                  i = deletions;
                  childToDelete = isHidden$96;
                  for (var hostSubtreeRoot = null, node = i; ; ) {
                    if (5 === node.tag) {
                      if (null === hostSubtreeRoot) {
                        hostSubtreeRoot = node;
                        var instance = node.stateNode;
                        if (childToDelete) instance.hide();
                        else {
                          var props = node.memoizedProps;
                          (null == props.visible || props.visible) &&
                            node.stateNode.show();
                        }
                      }
                    } else if (
                      6 !== node.tag &&
                      ((22 !== node.tag && 23 !== node.tag) ||
                        null === node.memoizedState ||
                        node === i) &&
                      null !== node.child
                    ) {
                      node.child.return = node;
                      node = node.child;
                      continue;
                    }
                    if (node === i) break;
                    for (; null === node.sibling; ) {
                      if (null === node.return || node.return === i) break a;
                      hostSubtreeRoot === node && (hostSubtreeRoot = null);
                      node = node.return;
                    }
                    hostSubtreeRoot === node && (hostSubtreeRoot = null);
                    node.sibling.return = node.return;
                    node = node.sibling;
                  }
                }
                if (
                  isHidden$96 &&
                  !wasHidden$98 &&
                  0 !== (deletions.mode & 1)
                ) {
                  nextEffect = deletions;
                  for (
                    var offscreenChild = deletions.child;
                    null !== offscreenChild;

                  ) {
                    for (
                      deletions = nextEffect = offscreenChild;
                      null !== nextEffect;

                    ) {
                      i = nextEffect;
                      var firstChild = i.child;
                      switch (i.tag) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                          commitHookEffectListUnmount(4, i, i.return);
                          break;
                        case 1:
                          safelyDetachRef(i, i.return);
                          var instance$jscomp$0 = i.stateNode;
                          if (
                            "function" ===
                            typeof instance$jscomp$0.componentWillUnmount
                          ) {
                            var nearestMountedAncestor = i.return;
                            try {
                              (instance$jscomp$0.props = i.memoizedProps),
                                (instance$jscomp$0.state = i.memoizedState),
                                instance$jscomp$0.componentWillUnmount();
                            } catch (error) {
                              captureCommitPhaseError(
                                i,
                                nearestMountedAncestor,
                                error
                              );
                            }
                          }
                          break;
                        case 5:
                          safelyDetachRef(i, i.return);
                          break;
                        case 22:
                          if (null !== i.memoizedState) {
                            disappearLayoutEffects_complete(deletions);
                            continue;
                          }
                      }
                      null !== firstChild
                        ? ((firstChild.return = i), (nextEffect = firstChild))
                        : disappearLayoutEffects_complete(deletions);
                    }
                    offscreenChild = offscreenChild.sibling;
                  }
                }
            }
          switch (flags & 4102) {
            case 2:
              commitPlacement(firstChild$jscomp$0);
              firstChild$jscomp$0.flags &= -3;
              break;
            case 6:
              commitPlacement(firstChild$jscomp$0);
              firstChild$jscomp$0.flags &= -3;
              commitWork(firstChild$jscomp$0.alternate, firstChild$jscomp$0);
              break;
            case 4096:
              firstChild$jscomp$0.flags &= -4097;
              break;
            case 4100:
              firstChild$jscomp$0.flags &= -4097;
              commitWork(firstChild$jscomp$0.alternate, firstChild$jscomp$0);
              break;
            case 4:
              commitWork(firstChild$jscomp$0.alternate, firstChild$jscomp$0);
          }
        } catch (error) {
          captureCommitPhaseError(
            firstChild$jscomp$0,
            firstChild$jscomp$0.return,
            error
          );
        }
        deletions = firstChild$jscomp$0.sibling;
        if (null !== deletions) {
          deletions.return = firstChild$jscomp$0.return;
          nextEffect = deletions;
          break;
        }
        nextEffect = firstChild$jscomp$0.return;
      }
  }
}
function commitLayoutEffects(finishedWork, root, committedLanes) {
  nextEffect = finishedWork;
  commitLayoutEffects_begin(finishedWork, root, committedLanes);
}
function commitLayoutEffects_begin(subtreeRoot, root, committedLanes) {
  for (var isModernRoot = 0 !== (subtreeRoot.mode & 1); null !== nextEffect; ) {
    var fiber = nextEffect,
      firstChild = fiber.child;
    if (22 === fiber.tag && isModernRoot) {
      var newOffscreenSubtreeIsHidden =
        null !== fiber.memoizedState || offscreenSubtreeIsHidden;
      if (!newOffscreenSubtreeIsHidden) {
        var current = fiber.alternate,
          newOffscreenSubtreeWasHidden =
            (null !== current && null !== current.memoizedState) ||
            offscreenSubtreeWasHidden;
        current = offscreenSubtreeIsHidden;
        var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
        offscreenSubtreeIsHidden = newOffscreenSubtreeIsHidden;
        if (
          (offscreenSubtreeWasHidden = newOffscreenSubtreeWasHidden) &&
          !prevOffscreenSubtreeWasHidden
        )
          for (nextEffect = fiber; null !== nextEffect; )
            (newOffscreenSubtreeIsHidden = nextEffect),
              (newOffscreenSubtreeWasHidden =
                newOffscreenSubtreeIsHidden.child),
              22 === newOffscreenSubtreeIsHidden.tag &&
              null !== newOffscreenSubtreeIsHidden.memoizedState
                ? reappearLayoutEffects_complete(fiber)
                : null !== newOffscreenSubtreeWasHidden
                ? ((newOffscreenSubtreeWasHidden.return = newOffscreenSubtreeIsHidden),
                  (nextEffect = newOffscreenSubtreeWasHidden))
                : reappearLayoutEffects_complete(fiber);
        for (; null !== firstChild; )
          (nextEffect = firstChild),
            commitLayoutEffects_begin(firstChild, root, committedLanes),
            (firstChild = firstChild.sibling);
        nextEffect = fiber;
        offscreenSubtreeIsHidden = current;
        offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
      }
      commitLayoutMountEffects_complete(subtreeRoot, root, committedLanes);
    } else
      0 !== (fiber.subtreeFlags & 8772) && null !== firstChild
        ? ((firstChild.return = fiber), (nextEffect = firstChild))
        : commitLayoutMountEffects_complete(subtreeRoot, root, committedLanes);
  }
}
function commitLayoutMountEffects_complete(subtreeRoot) {
  for (; null !== nextEffect; ) {
    var fiber = nextEffect;
    if (0 !== (fiber.flags & 8772)) {
      var current = fiber.alternate;
      try {
        if (0 !== (fiber.flags & 8772))
          switch (fiber.tag) {
            case 0:
            case 11:
            case 15:
              offscreenSubtreeWasHidden || commitHookEffectListMount(5, fiber);
              break;
            case 1:
              var instance = fiber.stateNode;
              if (fiber.flags & 4 && !offscreenSubtreeWasHidden)
                if (null === current) instance.componentDidMount();
                else {
                  var prevProps =
                    fiber.elementType === fiber.type
                      ? current.memoizedProps
                      : resolveDefaultProps(fiber.type, current.memoizedProps);
                  instance.componentDidUpdate(
                    prevProps,
                    current.memoizedState,
                    instance.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var updateQueue = fiber.updateQueue;
              null !== updateQueue &&
                commitUpdateQueue(fiber, updateQueue, instance);
              break;
            case 3:
              var updateQueue$90 = fiber.updateQueue;
              if (null !== updateQueue$90) {
                current = null;
                if (null !== fiber.child)
                  switch (fiber.child.tag) {
                    case 5:
                      current = fiber.child.stateNode;
                      break;
                    case 1:
                      current = fiber.child.stateNode;
                  }
                commitUpdateQueue(fiber, updateQueue$90, current);
              }
              break;
            case 5:
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
              break;
            default:
              throw Error(formatProdErrorMessage(163));
          }
        offscreenSubtreeWasHidden ||
          (fiber.flags & 512 && 21 !== fiber.tag && commitAttachRef(fiber));
      } catch (error) {
        captureCommitPhaseError(fiber, fiber.return, error);
      }
    }
    if (fiber === subtreeRoot) {
      nextEffect = null;
      break;
    }
    current = fiber.sibling;
    if (null !== current) {
      current.return = fiber.return;
      nextEffect = current;
      break;
    }
    nextEffect = fiber.return;
  }
}
function disappearLayoutEffects_complete(subtreeRoot) {
  for (; null !== nextEffect; ) {
    var fiber = nextEffect;
    if (fiber === subtreeRoot) {
      nextEffect = null;
      break;
    }
    var sibling = fiber.sibling;
    if (null !== sibling) {
      sibling.return = fiber.return;
      nextEffect = sibling;
      break;
    }
    nextEffect = fiber.return;
  }
}
function reappearLayoutEffects_complete(subtreeRoot) {
  for (; null !== nextEffect; ) {
    var fiber = nextEffect;
    try {
      switch (fiber.tag) {
        case 0:
        case 11:
        case 15:
          var nearestMountedAncestor = fiber.return;
          try {
            commitHookEffectListMount(4, fiber);
          } catch (error) {
            captureCommitPhaseError(fiber, nearestMountedAncestor, error);
          }
          break;
        case 1:
          var instance = fiber.stateNode;
          if ("function" === typeof instance.componentDidMount) {
            var nearestMountedAncestor$jscomp$0 = fiber.return;
            try {
              instance.componentDidMount();
            } catch (error) {
              captureCommitPhaseError(
                fiber,
                nearestMountedAncestor$jscomp$0,
                error
              );
            }
          }
          var nearestMountedAncestor$jscomp$1 = fiber.return;
          try {
            commitAttachRef(fiber);
          } catch (error) {
            captureCommitPhaseError(
              fiber,
              nearestMountedAncestor$jscomp$1,
              error
            );
          }
          break;
        case 5:
          var nearestMountedAncestor$jscomp$2 = fiber.return;
          try {
            commitAttachRef(fiber);
          } catch (error) {
            captureCommitPhaseError(
              fiber,
              nearestMountedAncestor$jscomp$2,
              error
            );
          }
      }
    } catch (error) {
      captureCommitPhaseError(fiber, fiber.return, error);
    }
    if (fiber === subtreeRoot) {
      nextEffect = null;
      break;
    }
    var sibling = fiber.sibling;
    if (null !== sibling) {
      sibling.return = fiber.return;
      nextEffect = sibling;
      break;
    }
    nextEffect = fiber.return;
  }
}
var ceil = Math.ceil,
  ReactCurrentDispatcher$2 = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner,
  ReactCurrentBatchConfig$2 = ReactSharedInternals.ReactCurrentBatchConfig,
  executionContext = 0,
  workInProgressRoot = null,
  workInProgress = null,
  workInProgressRootRenderLanes = 0,
  subtreeRenderLanes = 0,
  subtreeRenderLanesCursor = { current: 0 },
  workInProgressRootExitStatus = 0,
  workInProgressRootFatalError = null,
  workInProgressRootSkippedLanes = 0,
  workInProgressRootInterleavedUpdatedLanes = 0,
  workInProgressRootRenderPhaseUpdatedLanes = 0,
  workInProgressRootPingedLanes = 0,
  globalMostRecentFallbackTime = 0,
  workInProgressRootRenderTargetTime = Infinity,
  hasUncaughtError = !1,
  firstUncaughtError = null,
  legacyErrorBoundariesThatAlreadyFailed = null,
  rootDoesHavePassiveEffects = !1,
  rootWithPendingPassiveEffects = null,
  pendingPassiveEffectsLanes = 0,
  nestedUpdateCount = 0,
  rootWithNestedUpdates = null,
  currentEventTime = -1,
  currentEventTransitionLane = 0;
function requestEventTime() {
  return 0 !== (executionContext & 6)
    ? now()
    : -1 !== currentEventTime
    ? currentEventTime
    : (currentEventTime = now());
}
function requestUpdateLane(fiber) {
  if (0 === (fiber.mode & 1)) return 1;
  if (
    !deferRenderPhaseUpdateToNextBatch &&
    0 !== (executionContext & 2) &&
    0 !== workInProgressRootRenderLanes
  )
    return workInProgressRootRenderLanes & -workInProgressRootRenderLanes;
  if (0 !== ReactCurrentBatchConfig.transition)
    return (
      0 === currentEventTransitionLane &&
        ((fiber = nextTransitionLane),
        (nextTransitionLane <<= 1),
        0 === (nextTransitionLane & 4194240) && (nextTransitionLane = 64),
        (currentEventTransitionLane = fiber)),
      currentEventTransitionLane
    );
  fiber = currentUpdatePriority;
  return 0 !== fiber ? fiber : 16;
}
function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  if (50 < nestedUpdateCount)
    throw ((nestedUpdateCount = 0),
    (rootWithNestedUpdates = null),
    Error(formatProdErrorMessage(185)));
  var root = markUpdateLaneFromFiberToRoot(fiber, lane);
  if (null === root) return null;
  markRootUpdated(root, lane, eventTime);
  if (0 !== (executionContext & 2) && root === workInProgressRoot)
    workInProgressRootRenderPhaseUpdatedLanes |= lane;
  else {
    if (root === workInProgressRoot) {
      if (deferRenderPhaseUpdateToNextBatch || 0 === (executionContext & 2))
        workInProgressRootInterleavedUpdatedLanes |= lane;
      4 === workInProgressRootExitStatus &&
        markRootSuspended$1(root, workInProgressRootRenderLanes);
    }
    ensureRootIsScheduled(root, eventTime);
    1 === lane &&
      0 === executionContext &&
      0 === (fiber.mode & 1) &&
      ((workInProgressRootRenderTargetTime = now() + 500),
      includesLegacySyncCallbacks && flushSyncCallbacks());
  }
  return root;
}
function markUpdateLaneFromFiberToRoot(sourceFiber, lane) {
  sourceFiber.lanes |= lane;
  var alternate = sourceFiber.alternate;
  null !== alternate && (alternate.lanes |= lane);
  alternate = sourceFiber;
  for (sourceFiber = sourceFiber.return; null !== sourceFiber; )
    (sourceFiber.childLanes |= lane),
      (alternate = sourceFiber.alternate),
      null !== alternate && (alternate.childLanes |= lane),
      (alternate = sourceFiber),
      (sourceFiber = sourceFiber.return);
  return 3 === alternate.tag ? alternate.stateNode : null;
}
function ensureRootIsScheduled(root, currentTime) {
  for (
    var existingCallbackNode = root.callbackNode,
      suspendedLanes = root.suspendedLanes,
      pingedLanes = root.pingedLanes,
      expirationTimes = root.expirationTimes,
      lanes = root.pendingLanes;
    0 < lanes;

  ) {
    var index$3 = 31 - clz32(lanes),
      lane = 1 << index$3,
      expirationTime = expirationTimes[index$3];
    if (-1 === expirationTime) {
      if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes))
        expirationTimes[index$3] = computeExpirationTime(lane, currentTime);
    } else expirationTime <= currentTime && (root.expiredLanes |= lane);
    lanes &= ~lane;
  }
  suspendedLanes = getNextLanes(
    root,
    root === workInProgressRoot ? workInProgressRootRenderLanes : 0
  );
  if (0 === suspendedLanes)
    null !== existingCallbackNode && cancelCallback(existingCallbackNode),
      (root.callbackNode = null),
      (root.callbackPriority = 0);
  else if (
    ((currentTime = suspendedLanes & -suspendedLanes),
    root.callbackPriority !== currentTime)
  ) {
    null != existingCallbackNode && cancelCallback(existingCallbackNode);
    if (1 === currentTime)
      0 === root.tag
        ? ((existingCallbackNode = performSyncWorkOnRoot.bind(null, root)),
          (includesLegacySyncCallbacks = !0),
          null === syncQueue
            ? (syncQueue = [existingCallbackNode])
            : syncQueue.push(existingCallbackNode))
        : ((existingCallbackNode = performSyncWorkOnRoot.bind(null, root)),
          null === syncQueue
            ? (syncQueue = [existingCallbackNode])
            : syncQueue.push(existingCallbackNode)),
        scheduleCallback(ImmediatePriority, flushSyncCallbacks),
        (existingCallbackNode = null);
    else {
      switch (lanesToEventPriority(suspendedLanes)) {
        case 1:
          existingCallbackNode = ImmediatePriority;
          break;
        case 4:
          existingCallbackNode = UserBlockingPriority;
          break;
        case 16:
          existingCallbackNode = NormalPriority;
          break;
        case 536870912:
          existingCallbackNode = IdlePriority;
          break;
        default:
          existingCallbackNode = NormalPriority;
      }
      existingCallbackNode = scheduleCallback$1(
        existingCallbackNode,
        performConcurrentWorkOnRoot.bind(null, root)
      );
    }
    root.callbackPriority = currentTime;
    root.callbackNode = existingCallbackNode;
  }
}
function performConcurrentWorkOnRoot(root, didTimeout) {
  currentEventTime = -1;
  currentEventTransitionLane = 0;
  if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
  var originalCallbackNode = root.callbackNode;
  if (flushPassiveEffects() && root.callbackNode !== originalCallbackNode)
    return null;
  var lanes = getNextLanes(
    root,
    root === workInProgressRoot ? workInProgressRootRenderLanes : 0
  );
  if (0 === lanes) return null;
  if (
    includesBlockingLane(root, lanes) ||
    0 !== (lanes & root.expiredLanes) ||
    (!disableSchedulerTimeoutInWorkLoop && didTimeout)
  )
    didTimeout = renderRootSync(root, lanes);
  else {
    didTimeout = lanes;
    var prevExecutionContext = executionContext;
    executionContext |= 2;
    var prevDispatcher = pushDispatcher();
    if (
      workInProgressRoot !== root ||
      workInProgressRootRenderLanes !== didTimeout
    )
      (workInProgressRootRenderTargetTime = now() + 500),
        prepareFreshStack(root, didTimeout);
    do
      try {
        workLoopConcurrent();
        break;
      } catch (thrownValue) {
        handleError(root, thrownValue);
      }
    while (1);
    resetContextDependencies();
    ReactCurrentDispatcher$2.current = prevDispatcher;
    executionContext = prevExecutionContext;
    null !== workInProgress
      ? (didTimeout = 0)
      : ((workInProgressRoot = null),
        (workInProgressRootRenderLanes = 0),
        (didTimeout = workInProgressRootExitStatus));
  }
  if (0 !== didTimeout) {
    2 === didTimeout &&
      ((prevExecutionContext = getLanesToRetrySynchronouslyOnError(root)),
      0 !== prevExecutionContext &&
        ((lanes = prevExecutionContext),
        (didTimeout = recoverFromConcurrentError(root, prevExecutionContext))));
    if (1 === didTimeout)
      throw ((originalCallbackNode = workInProgressRootFatalError),
      prepareFreshStack(root, 0),
      markRootSuspended$1(root, lanes),
      ensureRootIsScheduled(root, now()),
      originalCallbackNode);
    prevDispatcher = !includesBlockingLane(root, lanes);
    prevExecutionContext = root.current.alternate;
    if (
      prevDispatcher &&
      !isRenderConsistentWithExternalStores(prevExecutionContext) &&
      ((didTimeout = renderRootSync(root, lanes)),
      2 === didTimeout &&
        ((prevDispatcher = getLanesToRetrySynchronouslyOnError(root)),
        0 !== prevDispatcher &&
          ((lanes = prevDispatcher),
          (didTimeout = recoverFromConcurrentError(root, prevDispatcher)))),
      1 === didTimeout)
    )
      throw ((originalCallbackNode = workInProgressRootFatalError),
      prepareFreshStack(root, 0),
      markRootSuspended$1(root, lanes),
      ensureRootIsScheduled(root, now()),
      originalCallbackNode);
    root.finishedWork = prevExecutionContext;
    root.finishedLanes = lanes;
    switch (didTimeout) {
      case 0:
      case 1:
        throw Error(formatProdErrorMessage(345));
      case 2:
        commitRoot(root);
        break;
      case 3:
        markRootSuspended$1(root, lanes);
        if (
          (lanes & 130023424) === lanes &&
          ((didTimeout = globalMostRecentFallbackTime + 500 - now()),
          10 < didTimeout)
        ) {
          if (0 !== getNextLanes(root, 0)) break;
          prevExecutionContext = root.suspendedLanes;
          if ((prevExecutionContext & lanes) !== lanes) {
            requestEventTime();
            root.pingedLanes |= root.suspendedLanes & prevExecutionContext;
            break;
          }
          root.timeoutHandle = scheduleTimeout(
            commitRoot.bind(null, root),
            didTimeout
          );
          break;
        }
        commitRoot(root);
        break;
      case 4:
        markRootSuspended$1(root, lanes);
        if ((lanes & 4194240) === lanes) break;
        didTimeout = root.eventTimes;
        for (prevExecutionContext = -1; 0 < lanes; ) {
          var index$2 = 31 - clz32(lanes);
          prevDispatcher = 1 << index$2;
          index$2 = didTimeout[index$2];
          index$2 > prevExecutionContext && (prevExecutionContext = index$2);
          lanes &= ~prevDispatcher;
        }
        lanes = prevExecutionContext;
        lanes = now() - lanes;
        lanes =
          (120 > lanes
            ? 120
            : 480 > lanes
            ? 480
            : 1080 > lanes
            ? 1080
            : 1920 > lanes
            ? 1920
            : 3e3 > lanes
            ? 3e3
            : 4320 > lanes
            ? 4320
            : 1960 * ceil(lanes / 1960)) - lanes;
        if (10 < lanes) {
          root.timeoutHandle = scheduleTimeout(
            commitRoot.bind(null, root),
            lanes
          );
          break;
        }
        commitRoot(root);
        break;
      case 5:
        commitRoot(root);
        break;
      default:
        throw Error(formatProdErrorMessage(329));
    }
  }
  ensureRootIsScheduled(root, now());
  return root.callbackNode === originalCallbackNode
    ? performConcurrentWorkOnRoot.bind(null, root)
    : null;
}
function recoverFromConcurrentError(root, errorRetryLanes) {
  var prevExecutionContext = executionContext;
  executionContext |= 8;
  root.isDehydrated && (root.isDehydrated = !1);
  for (
    var exitStatus, i = 0;
    50 > i &&
    ((exitStatus = renderRootSync(root, errorRetryLanes)),
    2 === exitStatus && 0 !== workInProgressRootRenderPhaseUpdatedLanes);
    i++
  );
  executionContext = prevExecutionContext;
  return exitStatus;
}
function isRenderConsistentWithExternalStores(finishedWork) {
  for (var node = finishedWork; ; ) {
    if (node.flags & 16384) {
      var updateQueue = node.updateQueue;
      if (
        null !== updateQueue &&
        ((updateQueue = updateQueue.stores), null !== updateQueue)
      )
        for (var i = 0; i < updateQueue.length; i++) {
          var check = updateQueue[i],
            getSnapshot = check.getSnapshot;
          check = check.value;
          try {
            if (!objectIs(getSnapshot(), check)) return !1;
          } catch (error) {
            return !1;
          }
        }
    }
    updateQueue = node.child;
    if (node.subtreeFlags & 16384 && null !== updateQueue)
      (updateQueue.return = node), (node = updateQueue);
    else {
      if (node === finishedWork) break;
      for (; null === node.sibling; ) {
        if (null === node.return || node.return === finishedWork) return !0;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }
  return !0;
}
function markRootSuspended$1(root, suspendedLanes) {
  suspendedLanes &= ~workInProgressRootPingedLanes;
  suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
  root.suspendedLanes |= suspendedLanes;
  root.pingedLanes &= ~suspendedLanes;
  for (root = root.expirationTimes; 0 < suspendedLanes; ) {
    var index$4 = 31 - clz32(suspendedLanes),
      lane = 1 << index$4;
    root[index$4] = -1;
    suspendedLanes &= ~lane;
  }
}
function performSyncWorkOnRoot(root) {
  if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
  flushPassiveEffects();
  var lanes = getNextLanes(root, 0);
  if (0 === (lanes & 1)) return ensureRootIsScheduled(root, now()), null;
  var exitStatus = renderRootSync(root, lanes);
  if (0 !== root.tag && 2 === exitStatus) {
    var errorRetryLanes = getLanesToRetrySynchronouslyOnError(root);
    0 !== errorRetryLanes &&
      ((lanes = errorRetryLanes),
      (exitStatus = recoverFromConcurrentError(root, errorRetryLanes)));
  }
  if (1 === exitStatus)
    throw ((exitStatus = workInProgressRootFatalError),
    prepareFreshStack(root, 0),
    markRootSuspended$1(root, lanes),
    ensureRootIsScheduled(root, now()),
    exitStatus);
  root.finishedWork = root.current.alternate;
  root.finishedLanes = lanes;
  commitRoot(root);
  ensureRootIsScheduled(root, now());
  return null;
}
function popRenderLanes() {
  subtreeRenderLanes = subtreeRenderLanesCursor.current;
  pop(subtreeRenderLanesCursor);
}
function prepareFreshStack(root, lanes) {
  root.finishedWork = null;
  root.finishedLanes = 0;
  var timeoutHandle = root.timeoutHandle;
  -1 !== timeoutHandle &&
    ((root.timeoutHandle = -1), cancelTimeout(timeoutHandle));
  if (null !== workInProgress)
    for (timeoutHandle = workInProgress.return; null !== timeoutHandle; ) {
      var interruptedWork = timeoutHandle;
      switch (interruptedWork.tag) {
        case 3:
          popRootCachePool(
            interruptedWork.stateNode,
            workInProgressRootRenderLanes
          );
          popProvider(CacheContext);
          popHostContainer();
          resetWorkInProgressVersions();
          break;
        case 5:
          popHostContext(interruptedWork);
          break;
        case 4:
          popHostContainer();
          break;
        case 13:
          pop(suspenseStackCursor);
          break;
        case 19:
          pop(suspenseStackCursor);
          break;
        case 10:
          popProvider(interruptedWork.type._context);
          break;
        case 22:
        case 23:
          popRenderLanes();
          null !== interruptedWork.updateQueue && popCachePool();
          break;
        case 24:
          popProvider(CacheContext);
      }
      timeoutHandle = timeoutHandle.return;
    }
  workInProgressRoot = root;
  workInProgress = createWorkInProgress(root.current, null);
  workInProgressRootRenderLanes = subtreeRenderLanes = lanes;
  workInProgressRootExitStatus = 0;
  workInProgressRootFatalError = null;
  workInProgressRootPingedLanes = workInProgressRootRenderPhaseUpdatedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = 0;
  if (null !== interleavedQueues) {
    for (root = 0; root < interleavedQueues.length; root++)
      if (
        ((lanes = interleavedQueues[root]),
        (timeoutHandle = lanes.interleaved),
        null !== timeoutHandle)
      ) {
        lanes.interleaved = null;
        interruptedWork = timeoutHandle.next;
        var lastPendingUpdate = lanes.pending;
        if (null !== lastPendingUpdate) {
          var firstPendingUpdate = lastPendingUpdate.next;
          lastPendingUpdate.next = interruptedWork;
          timeoutHandle.next = firstPendingUpdate;
        }
        lanes.pending = timeoutHandle;
      }
    interleavedQueues = null;
  }
}
function handleError(root$jscomp$0, thrownValue) {
  do {
    var erroredWork = workInProgress;
    try {
      resetContextDependencies();
      ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
      if (didScheduleRenderPhaseUpdate) {
        for (
          var hook = currentlyRenderingFiber$1.memoizedState;
          null !== hook;

        ) {
          var queue = hook.queue;
          null !== queue && (queue.pending = null);
          hook = hook.next;
        }
        didScheduleRenderPhaseUpdate = !1;
      }
      renderLanes = 0;
      workInProgressHook = currentHook = currentlyRenderingFiber$1 = null;
      didScheduleRenderPhaseUpdateDuringThisPass = !1;
      ReactCurrentOwner$2.current = null;
      if (null === erroredWork || null === erroredWork.return) {
        workInProgressRootExitStatus = 1;
        workInProgressRootFatalError = thrownValue;
        workInProgress = null;
        break;
      }
      a: {
        var root = root$jscomp$0,
          returnFiber = erroredWork.return,
          sourceFiber = erroredWork,
          value = thrownValue;
        thrownValue = workInProgressRootRenderLanes;
        sourceFiber.flags |= 32768;
        if (
          null !== value &&
          "object" === typeof value &&
          "function" === typeof value.then
        ) {
          var wakeable = value,
            sourceFiber$jscomp$0 = sourceFiber;
          if (enableLazyContextPropagation) {
            var currentSourceFiber = sourceFiber$jscomp$0.alternate;
            null !== currentSourceFiber &&
              propagateParentContextChanges(
                currentSourceFiber,
                sourceFiber$jscomp$0,
                thrownValue,
                !0
              );
          }
          var tag = sourceFiber$jscomp$0.tag;
          if (
            0 === (sourceFiber$jscomp$0.mode & 1) &&
            (0 === tag || 11 === tag || 15 === tag)
          ) {
            var currentSource = sourceFiber$jscomp$0.alternate;
            currentSource
              ? ((sourceFiber$jscomp$0.updateQueue = currentSource.updateQueue),
                (sourceFiber$jscomp$0.memoizedState =
                  currentSource.memoizedState),
                (sourceFiber$jscomp$0.lanes = currentSource.lanes))
              : ((sourceFiber$jscomp$0.updateQueue = null),
                (sourceFiber$jscomp$0.memoizedState = null));
          }
          b: {
            sourceFiber$jscomp$0 = returnFiber;
            var sourceFiber$jscomp$1 = sourceFiber,
              rootRenderLanes = thrownValue,
              hasInvisibleParentBoundary =
                0 !== (suspenseStackCursor.current & 1),
              node = sourceFiber$jscomp$0;
            do {
              var JSCompiler_temp;
              if ((JSCompiler_temp = 13 === node.tag)) {
                var nextState = node.memoizedState;
                JSCompiler_temp =
                  null !== nextState
                    ? null !== nextState.dehydrated
                      ? !0
                      : !1
                    : !0 !== node.memoizedProps.unstable_avoidThisFallback
                    ? !0
                    : hasInvisibleParentBoundary
                    ? !1
                    : !0;
              }
              if (JSCompiler_temp) {
                if (0 === (node.mode & 1)) {
                  if (node === sourceFiber$jscomp$0) node.flags |= 65536;
                  else {
                    node.flags |= 128;
                    sourceFiber$jscomp$1.flags |= 131072;
                    sourceFiber$jscomp$1.flags &= -52805;
                    if (1 === sourceFiber$jscomp$1.tag)
                      if (null === sourceFiber$jscomp$1.alternate)
                        sourceFiber$jscomp$1.tag = 17;
                      else {
                        var update = createUpdate(-1, 1);
                        update.tag = 2;
                        enqueueUpdate(sourceFiber$jscomp$1, update);
                      }
                    sourceFiber$jscomp$1.lanes |= 1;
                  }
                  var suspenseBoundary = node;
                  break b;
                }
                node.flags |= 65536;
                node.lanes = rootRenderLanes;
                suspenseBoundary = node;
                break b;
              }
              node = node.return;
            } while (null !== node);
            suspenseBoundary = null;
          }
          if (null !== suspenseBoundary) {
            value = void 0;
            sourceFiber = suspenseBoundary;
            if (sourceFiber.mode & 1) {
              var pingCache = root.pingCache;
              null === pingCache
                ? ((pingCache = root.pingCache = new PossiblyWeakMap()),
                  (value = new Set()),
                  pingCache.set(wakeable, value))
                : ((value = pingCache.get(wakeable)),
                  void 0 === value &&
                    ((value = new Set()), pingCache.set(wakeable, value)));
              if (!value.has(thrownValue)) {
                value.add(thrownValue);
                var ping = pingSuspendedRoot.bind(
                  null,
                  root,
                  wakeable,
                  thrownValue
                );
                wakeable.then(ping, ping);
              }
            }
            var wakeables = sourceFiber.updateQueue;
            if (null === wakeables) {
              var updateQueue = new Set();
              updateQueue.add(wakeable);
              sourceFiber.updateQueue = updateQueue;
            } else wakeables.add(wakeable);
            break a;
          } else
            value = Error(
              formatProdErrorMessage(
                411,
                getComponentNameFromFiber(sourceFiber) || "A React component"
              )
            );
        }
        4 !== workInProgressRootExitStatus &&
          (workInProgressRootExitStatus = 2);
        value = createCapturedValue(value, sourceFiber);
        root = returnFiber;
        do {
          switch (root.tag) {
            case 3:
              wakeable = value;
              root.flags |= 65536;
              thrownValue &= -thrownValue;
              root.lanes |= thrownValue;
              var update$jscomp$0 = createRootErrorUpdate(
                root,
                wakeable,
                thrownValue
              );
              enqueueCapturedUpdate(root, update$jscomp$0);
              break a;
            case 1:
              wakeable = value;
              var ctor = root.type,
                instance = root.stateNode;
              if (
                0 === (root.flags & 128) &&
                ("function" === typeof ctor.getDerivedStateFromError ||
                  (null !== instance &&
                    "function" === typeof instance.componentDidCatch &&
                    (null === legacyErrorBoundariesThatAlreadyFailed ||
                      !legacyErrorBoundariesThatAlreadyFailed.has(instance))))
              ) {
                root.flags |= 65536;
                thrownValue &= -thrownValue;
                root.lanes |= thrownValue;
                var update$34 = createClassErrorUpdate(
                  root,
                  wakeable,
                  thrownValue
                );
                enqueueCapturedUpdate(root, update$34);
                break a;
              }
          }
          root = root.return;
        } while (null !== root);
      }
      completeUnitOfWork(erroredWork);
    } catch (yetAnotherThrownValue) {
      thrownValue = yetAnotherThrownValue;
      workInProgress === erroredWork &&
        null !== erroredWork &&
        (workInProgress = erroredWork = erroredWork.return);
      continue;
    }
    break;
  } while (1);
}
function pushDispatcher() {
  var prevDispatcher = ReactCurrentDispatcher$2.current;
  ReactCurrentDispatcher$2.current = ContextOnlyDispatcher;
  return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
}
function renderDidSuspendDelayIfPossible() {
  if (
    0 === workInProgressRootExitStatus ||
    3 === workInProgressRootExitStatus ||
    2 === workInProgressRootExitStatus
  )
    workInProgressRootExitStatus = 4;
  null === workInProgressRoot ||
    (0 === (workInProgressRootSkippedLanes & 268435455) &&
      0 === (workInProgressRootInterleavedUpdatedLanes & 268435455)) ||
    markRootSuspended$1(workInProgressRoot, workInProgressRootRenderLanes);
}
function renderRootSync(root, lanes) {
  var prevExecutionContext = executionContext;
  executionContext |= 2;
  var prevDispatcher = pushDispatcher();
  (workInProgressRoot === root && workInProgressRootRenderLanes === lanes) ||
    prepareFreshStack(root, lanes);
  do
    try {
      workLoopSync();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    }
  while (1);
  resetContextDependencies();
  executionContext = prevExecutionContext;
  ReactCurrentDispatcher$2.current = prevDispatcher;
  if (null !== workInProgress) throw Error(formatProdErrorMessage(261));
  workInProgressRoot = null;
  workInProgressRootRenderLanes = 0;
  return workInProgressRootExitStatus;
}
function workLoopSync() {
  for (; null !== workInProgress; ) performUnitOfWork(workInProgress);
}
function workLoopConcurrent() {
  for (; null !== workInProgress && !shouldYield(); )
    performUnitOfWork(workInProgress);
}
function performUnitOfWork(unitOfWork) {
  var next = beginWork$1(unitOfWork.alternate, unitOfWork, subtreeRenderLanes);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  null === next ? completeUnitOfWork(unitOfWork) : (workInProgress = next);
  ReactCurrentOwner$2.current = null;
}
function completeUnitOfWork(unitOfWork) {
  var completedWork = unitOfWork;
  do {
    var current = completedWork.alternate;
    unitOfWork = completedWork.return;
    if (0 === (completedWork.flags & 32768)) {
      if (
        ((current = completeWork(current, completedWork, subtreeRenderLanes)),
        null !== current)
      ) {
        workInProgress = current;
        return;
      }
    } else {
      current = unwindWork(completedWork, subtreeRenderLanes);
      if (null !== current) {
        current.flags &= 32767;
        workInProgress = current;
        return;
      }
      null !== unitOfWork &&
        ((unitOfWork.flags |= 32768),
        (unitOfWork.subtreeFlags = 0),
        (unitOfWork.deletions = null));
    }
    completedWork = completedWork.sibling;
    if (null !== completedWork) {
      workInProgress = completedWork;
      return;
    }
    workInProgress = completedWork = unitOfWork;
  } while (null !== completedWork);
  0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
}
function commitRoot(root) {
  var previousUpdateLanePriority = currentUpdatePriority,
    prevTransition = ReactCurrentBatchConfig$2.transition;
  try {
    (ReactCurrentBatchConfig$2.transition = 0),
      (currentUpdatePriority = 1),
      commitRootImpl(root, previousUpdateLanePriority);
  } finally {
    (ReactCurrentBatchConfig$2.transition = prevTransition),
      (currentUpdatePriority = previousUpdateLanePriority);
  }
  return null;
}
function commitRootImpl(root, renderPriorityLevel) {
  do flushPassiveEffects();
  while (null !== rootWithPendingPassiveEffects);
  if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
  var finishedWork = root.finishedWork,
    lanes = root.finishedLanes;
  if (null === finishedWork) return null;
  root.finishedWork = null;
  root.finishedLanes = 0;
  if (finishedWork === root.current) throw Error(formatProdErrorMessage(177));
  root.callbackNode = null;
  root.callbackPriority = 0;
  var remainingLanes = finishedWork.lanes | finishedWork.childLanes;
  markRootFinished(root, remainingLanes);
  root === workInProgressRoot &&
    ((workInProgress = workInProgressRoot = null),
    (workInProgressRootRenderLanes = 0));
  (0 === (finishedWork.subtreeFlags & 2064) &&
    0 === (finishedWork.flags & 2064)) ||
    rootDoesHavePassiveEffects ||
    ((rootDoesHavePassiveEffects = !0),
    scheduleCallback$1(NormalPriority, function() {
      flushPassiveEffects();
      return null;
    }));
  remainingLanes = 0 !== (finishedWork.flags & 15990);
  if (0 !== (finishedWork.subtreeFlags & 15990) || remainingLanes) {
    remainingLanes = ReactCurrentBatchConfig$2.transition;
    ReactCurrentBatchConfig$2.transition = 0;
    var previousPriority = currentUpdatePriority;
    currentUpdatePriority = 1;
    var prevExecutionContext = executionContext;
    executionContext |= 4;
    ReactCurrentOwner$2.current = null;
    commitBeforeMutationEffects(root, finishedWork);
    commitMutationEffects(root, finishedWork);
    root.current = finishedWork;
    commitLayoutEffects(finishedWork, root, lanes);
    requestPaint();
    executionContext = prevExecutionContext;
    currentUpdatePriority = previousPriority;
    ReactCurrentBatchConfig$2.transition = remainingLanes;
  } else root.current = finishedWork;
  rootDoesHavePassiveEffects &&
    ((rootDoesHavePassiveEffects = !1),
    (rootWithPendingPassiveEffects = root),
    (pendingPassiveEffectsLanes = lanes));
  remainingLanes = root.pendingLanes;
  0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = null);
  onCommitRoot(finishedWork.stateNode, renderPriorityLevel);
  ensureRootIsScheduled(root, now());
  if (hasUncaughtError)
    throw ((hasUncaughtError = !1),
    (root = firstUncaughtError),
    (firstUncaughtError = null),
    root);
  0 !== (pendingPassiveEffectsLanes & 1) &&
    0 !== root.tag &&
    flushPassiveEffects();
  remainingLanes = root.pendingLanes;
  0 !== (remainingLanes & 1)
    ? root === rootWithNestedUpdates
      ? nestedUpdateCount++
      : ((nestedUpdateCount = 0), (rootWithNestedUpdates = root))
    : (nestedUpdateCount = 0);
  flushSyncCallbacks();
  return null;
}
function flushPassiveEffects() {
  if (null !== rootWithPendingPassiveEffects) {
    var renderPriority = lanesToEventPriority(pendingPassiveEffectsLanes),
      prevTransition = ReactCurrentBatchConfig$2.transition,
      previousPriority = currentUpdatePriority;
    try {
      ReactCurrentBatchConfig$2.transition = 0;
      currentUpdatePriority = 16 > renderPriority ? 16 : renderPriority;
      if (null === rootWithPendingPassiveEffects)
        var JSCompiler_inline_result = !1;
      else {
        renderPriority = rootWithPendingPassiveEffects;
        rootWithPendingPassiveEffects = null;
        pendingPassiveEffectsLanes = 0;
        if (0 !== (executionContext & 6))
          throw Error(formatProdErrorMessage(331));
        var prevExecutionContext = executionContext;
        executionContext |= 4;
        for (nextEffect = renderPriority.current; null !== nextEffect; ) {
          var fiber = nextEffect,
            child = fiber.child;
          if (0 !== (nextEffect.flags & 16)) {
            var deletions = fiber.deletions;
            if (null !== deletions) {
              for (var i = 0; i < deletions.length; i++) {
                var fiberToDelete = deletions[i];
                for (nextEffect = fiberToDelete; null !== nextEffect; ) {
                  var fiber$jscomp$0 = nextEffect;
                  switch (fiber$jscomp$0.tag) {
                    case 0:
                    case 11:
                    case 15:
                      commitHookEffectListUnmount(8, fiber$jscomp$0, fiber);
                  }
                  var child$jscomp$0 = fiber$jscomp$0.child;
                  if (null !== child$jscomp$0)
                    (child$jscomp$0.return = fiber$jscomp$0),
                      (nextEffect = child$jscomp$0);
                  else
                    for (; null !== nextEffect; ) {
                      fiber$jscomp$0 = nextEffect;
                      var sibling = fiber$jscomp$0.sibling,
                        returnFiber = fiber$jscomp$0.return;
                      detachFiberAfterEffects(fiber$jscomp$0);
                      if (fiber$jscomp$0 === fiberToDelete) {
                        nextEffect = null;
                        break;
                      }
                      if (null !== sibling) {
                        sibling.return = returnFiber;
                        nextEffect = sibling;
                        break;
                      }
                      nextEffect = returnFiber;
                    }
                }
              }
              var previousFiber = fiber.alternate;
              if (null !== previousFiber) {
                var detachedChild = previousFiber.child;
                if (null !== detachedChild) {
                  previousFiber.child = null;
                  do {
                    var detachedSibling = detachedChild.sibling;
                    detachedChild.sibling = null;
                    detachedChild = detachedSibling;
                  } while (null !== detachedChild);
                }
              }
              nextEffect = fiber;
            }
          }
          if (0 !== (fiber.subtreeFlags & 2064) && null !== child)
            (child.return = fiber), (nextEffect = child);
          else
            b: for (; null !== nextEffect; ) {
              fiber = nextEffect;
              if (0 !== (fiber.flags & 2048))
                switch (fiber.tag) {
                  case 0:
                  case 11:
                  case 15:
                    commitHookEffectListUnmount(9, fiber, fiber.return);
                }
              var sibling$jscomp$0 = fiber.sibling;
              if (null !== sibling$jscomp$0) {
                sibling$jscomp$0.return = fiber.return;
                nextEffect = sibling$jscomp$0;
                break b;
              }
              nextEffect = fiber.return;
            }
        }
        var finishedWork = renderPriority.current;
        for (nextEffect = finishedWork; null !== nextEffect; ) {
          child = nextEffect;
          var firstChild = child.child;
          if (0 !== (child.subtreeFlags & 2064) && null !== firstChild)
            (firstChild.return = child), (nextEffect = firstChild);
          else
            b: for (child = finishedWork; null !== nextEffect; ) {
              deletions = nextEffect;
              if (0 !== (deletions.flags & 2048))
                try {
                  switch (deletions.tag) {
                    case 0:
                    case 11:
                    case 15:
                      commitHookEffectListMount(9, deletions);
                  }
                } catch (error) {
                  captureCommitPhaseError(deletions, deletions.return, error);
                }
              if (deletions === child) {
                nextEffect = null;
                break b;
              }
              var sibling$jscomp$1 = deletions.sibling;
              if (null !== sibling$jscomp$1) {
                sibling$jscomp$1.return = deletions.return;
                nextEffect = sibling$jscomp$1;
                break b;
              }
              nextEffect = deletions.return;
            }
        }
        executionContext = prevExecutionContext;
        flushSyncCallbacks();
        if (
          injectedHook &&
          "function" === typeof injectedHook.onPostCommitFiberRoot
        )
          try {
            injectedHook.onPostCommitFiberRoot(rendererID, renderPriority);
          } catch (err) {}
        JSCompiler_inline_result = !0;
      }
      return JSCompiler_inline_result;
    } finally {
      (currentUpdatePriority = previousPriority),
        (ReactCurrentBatchConfig$2.transition = prevTransition);
    }
  }
  return !1;
}
function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
  sourceFiber = createCapturedValue(error, sourceFiber);
  sourceFiber = createRootErrorUpdate(rootFiber, sourceFiber, 1);
  enqueueUpdate(rootFiber, sourceFiber);
  sourceFiber = requestEventTime();
  rootFiber = markUpdateLaneFromFiberToRoot(rootFiber, 1);
  null !== rootFiber &&
    (markRootUpdated(rootFiber, 1, sourceFiber),
    ensureRootIsScheduled(rootFiber, sourceFiber));
}
function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
  if (3 === sourceFiber.tag)
    captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
  else
    for (
      nearestMountedAncestor = skipUnmountedBoundaries
        ? nearestMountedAncestor
        : sourceFiber.return;
      null !== nearestMountedAncestor;

    ) {
      if (3 === nearestMountedAncestor.tag) {
        captureCommitPhaseErrorOnRoot(
          nearestMountedAncestor,
          sourceFiber,
          error
        );
        break;
      } else if (1 === nearestMountedAncestor.tag) {
        var instance = nearestMountedAncestor.stateNode;
        if (
          "function" ===
            typeof nearestMountedAncestor.type.getDerivedStateFromError ||
          ("function" === typeof instance.componentDidCatch &&
            (null === legacyErrorBoundariesThatAlreadyFailed ||
              !legacyErrorBoundariesThatAlreadyFailed.has(instance)))
        ) {
          sourceFiber = createCapturedValue(error, sourceFiber);
          sourceFiber = createClassErrorUpdate(
            nearestMountedAncestor,
            sourceFiber,
            1
          );
          enqueueUpdate(nearestMountedAncestor, sourceFiber);
          sourceFiber = requestEventTime();
          nearestMountedAncestor = markUpdateLaneFromFiberToRoot(
            nearestMountedAncestor,
            1
          );
          null !== nearestMountedAncestor &&
            (markRootUpdated(nearestMountedAncestor, 1, sourceFiber),
            ensureRootIsScheduled(nearestMountedAncestor, sourceFiber));
          break;
        }
      }
      nearestMountedAncestor = nearestMountedAncestor.return;
    }
}
function pingSuspendedRoot(root, wakeable, pingedLanes) {
  var pingCache = root.pingCache;
  null !== pingCache && pingCache.delete(wakeable);
  wakeable = requestEventTime();
  root.pingedLanes |= root.suspendedLanes & pingedLanes;
  workInProgressRoot === root &&
    (workInProgressRootRenderLanes & pingedLanes) === pingedLanes &&
    (4 === workInProgressRootExitStatus ||
    (3 === workInProgressRootExitStatus &&
      (workInProgressRootRenderLanes & 130023424) ===
        workInProgressRootRenderLanes &&
      500 > now() - globalMostRecentFallbackTime)
      ? prepareFreshStack(root, 0)
      : (workInProgressRootPingedLanes |= pingedLanes));
  ensureRootIsScheduled(root, wakeable);
}
function retryTimedOutBoundary(boundaryFiber, retryLane) {
  0 === retryLane &&
    (0 === (boundaryFiber.mode & 1)
      ? (retryLane = 1)
      : ((retryLane = nextRetryLane),
        (nextRetryLane <<= 1),
        0 === (nextRetryLane & 130023424) && (nextRetryLane = 4194304)));
  var eventTime = requestEventTime();
  boundaryFiber = markUpdateLaneFromFiberToRoot(boundaryFiber, retryLane);
  null !== boundaryFiber &&
    (markRootUpdated(boundaryFiber, retryLane, eventTime),
    ensureRootIsScheduled(boundaryFiber, eventTime));
}
function retryDehydratedSuspenseBoundary(boundaryFiber) {
  var suspenseState = boundaryFiber.memoizedState,
    retryLane = 0;
  null !== suspenseState && (retryLane = suspenseState.retryLane);
  retryTimedOutBoundary(boundaryFiber, retryLane);
}
function resolveRetryWakeable(boundaryFiber, wakeable) {
  var retryLane = 0;
  switch (boundaryFiber.tag) {
    case 13:
      var retryCache = boundaryFiber.stateNode;
      var suspenseState = boundaryFiber.memoizedState;
      null !== suspenseState && (retryLane = suspenseState.retryLane);
      break;
    case 19:
      retryCache = boundaryFiber.stateNode;
      break;
    default:
      throw Error(formatProdErrorMessage(314));
  }
  null !== retryCache && retryCache.delete(wakeable);
  retryTimedOutBoundary(boundaryFiber, retryLane);
}
var beginWork$1;
beginWork$1 = function(current, workInProgress, renderLanes) {
  if (null !== current)
    if (current.memoizedProps !== workInProgress.pendingProps)
      didReceiveUpdate = !0;
    else {
      if (
        !checkScheduledUpdateOrContext(current, renderLanes) &&
        0 === (workInProgress.flags & 128)
      )
        return (
          (didReceiveUpdate = !1),
          attemptEarlyBailoutIfNoScheduledUpdate(
            current,
            workInProgress,
            renderLanes
          )
        );
      didReceiveUpdate = 0 !== (current.flags & 131072) ? !0 : !1;
    }
  else didReceiveUpdate = !1;
  workInProgress.lanes = 0;
  switch (workInProgress.tag) {
    case 2:
      var Component = workInProgress.type;
      null !== current &&
        ((current.alternate = null),
        (workInProgress.alternate = null),
        (workInProgress.flags |= 2));
      current = workInProgress.pendingProps;
      prepareToReadContext(workInProgress, renderLanes);
      current = renderWithHooks(
        null,
        workInProgress,
        Component,
        current,
        void 0,
        renderLanes
      );
      workInProgress.flags |= 1;
      workInProgress.tag = 0;
      reconcileChildren(null, workInProgress, current, renderLanes);
      workInProgress = workInProgress.child;
      return workInProgress;
    case 16:
      Component = workInProgress.elementType;
      a: {
        null !== current &&
          ((current.alternate = null),
          (workInProgress.alternate = null),
          (workInProgress.flags |= 2));
        current = workInProgress.pendingProps;
        var init = Component._init;
        Component = init(Component._payload);
        workInProgress.type = Component;
        init = workInProgress.tag = resolveLazyComponentTag(Component);
        current = resolveDefaultProps(Component, current);
        switch (init) {
          case 0:
            workInProgress = updateFunctionComponent(
              null,
              workInProgress,
              Component,
              current,
              renderLanes
            );
            break a;
          case 1:
            workInProgress = updateClassComponent(
              null,
              workInProgress,
              Component,
              current,
              renderLanes
            );
            break a;
          case 11:
            workInProgress = updateForwardRef(
              null,
              workInProgress,
              Component,
              current,
              renderLanes
            );
            break a;
          case 14:
            workInProgress = updateMemoComponent(
              null,
              workInProgress,
              Component,
              resolveDefaultProps(Component.type, current),
              renderLanes
            );
            break a;
        }
        throw Error(formatProdErrorMessage(306, Component, ""));
      }
      return workInProgress;
    case 0:
      return (
        (Component = workInProgress.type),
        (init = workInProgress.pendingProps),
        (init =
          workInProgress.elementType === Component
            ? init
            : resolveDefaultProps(Component, init)),
        updateFunctionComponent(
          current,
          workInProgress,
          Component,
          init,
          renderLanes
        )
      );
    case 1:
      return (
        (Component = workInProgress.type),
        (init = workInProgress.pendingProps),
        (init =
          workInProgress.elementType === Component
            ? init
            : resolveDefaultProps(Component, init)),
        updateClassComponent(
          current,
          workInProgress,
          Component,
          init,
          renderLanes
        )
      );
    case 3:
      pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
      Component = workInProgress.updateQueue;
      if (null === current || null === Component)
        throw Error(formatProdErrorMessage(282));
      var nextProps = workInProgress.pendingProps;
      init = workInProgress.memoizedState;
      Component = init.element;
      cloneUpdateQueue(current, workInProgress);
      processUpdateQueue(workInProgress, nextProps, null, renderLanes);
      nextProps = workInProgress.memoizedState;
      var nextCache = nextProps.cache;
      pooledCache = workInProgress.stateNode.pooledCache;
      pushProvider(workInProgress, CacheContext, nextCache);
      nextCache !== init.cache &&
        propagateContextChange(workInProgress, CacheContext, renderLanes);
      init = nextProps.element;
      init === Component
        ? (workInProgress = bailoutOnAlreadyFinishedWork(
            current,
            workInProgress,
            renderLanes
          ))
        : (reconcileChildren(current, workInProgress, init, renderLanes),
          (workInProgress = workInProgress.child));
      return workInProgress;
    case 5:
      return (
        pushHostContext(workInProgress),
        (Component = workInProgress.type),
        (init = workInProgress.pendingProps),
        (nextProps = null !== current ? current.memoizedProps : null),
        (nextCache = init.children),
        shouldSetTextContent(Component, init)
          ? (nextCache = null)
          : null !== nextProps &&
            shouldSetTextContent(Component, nextProps) &&
            (workInProgress.flags |= 32),
        markRef$1(current, workInProgress),
        reconcileChildren(current, workInProgress, nextCache, renderLanes),
        workInProgress.child
      );
    case 6:
      return null;
    case 13:
      return updateSuspenseComponent(current, workInProgress, renderLanes);
    case 4:
      return (
        pushHostContainer(
          workInProgress,
          workInProgress.stateNode.containerInfo
        ),
        (Component = workInProgress.pendingProps),
        null === current
          ? (workInProgress.child = reconcileChildFibers(
              workInProgress,
              null,
              Component,
              renderLanes
            ))
          : reconcileChildren(current, workInProgress, Component, renderLanes),
        workInProgress.child
      );
    case 11:
      return (
        (Component = workInProgress.type),
        (init = workInProgress.pendingProps),
        (init =
          workInProgress.elementType === Component
            ? init
            : resolveDefaultProps(Component, init)),
        updateForwardRef(current, workInProgress, Component, init, renderLanes)
      );
    case 7:
      return (
        reconcileChildren(
          current,
          workInProgress,
          workInProgress.pendingProps,
          renderLanes
        ),
        workInProgress.child
      );
    case 8:
      return (
        reconcileChildren(
          current,
          workInProgress,
          workInProgress.pendingProps.children,
          renderLanes
        ),
        workInProgress.child
      );
    case 12:
      return (
        reconcileChildren(
          current,
          workInProgress,
          workInProgress.pendingProps.children,
          renderLanes
        ),
        workInProgress.child
      );
    case 10:
      a: {
        Component = workInProgress.type._context;
        init = workInProgress.pendingProps;
        nextProps = workInProgress.memoizedProps;
        nextCache = init.value;
        pushProvider(workInProgress, Component, nextCache);
        if (!enableLazyContextPropagation && null !== nextProps)
          if (objectIs(nextProps.value, nextCache)) {
            if (nextProps.children === init.children) {
              workInProgress = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress,
                renderLanes
              );
              break a;
            }
          } else propagateContextChange(workInProgress, Component, renderLanes);
        reconcileChildren(current, workInProgress, init.children, renderLanes);
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 9:
      return (
        (init = workInProgress.type),
        (Component = workInProgress.pendingProps.children),
        prepareToReadContext(workInProgress, renderLanes),
        (init = readContext(init)),
        (Component = Component(init)),
        (workInProgress.flags |= 1),
        reconcileChildren(current, workInProgress, Component, renderLanes),
        workInProgress.child
      );
    case 14:
      return (
        (Component = workInProgress.type),
        (init = resolveDefaultProps(Component, workInProgress.pendingProps)),
        (init = resolveDefaultProps(Component.type, init)),
        updateMemoComponent(
          current,
          workInProgress,
          Component,
          init,
          renderLanes
        )
      );
    case 15:
      return updateSimpleMemoComponent(
        current,
        workInProgress,
        workInProgress.type,
        workInProgress.pendingProps,
        renderLanes
      );
    case 17:
      return (
        (Component = workInProgress.type),
        (init = workInProgress.pendingProps),
        (init =
          workInProgress.elementType === Component
            ? init
            : resolveDefaultProps(Component, init)),
        null !== current &&
          ((current.alternate = null),
          (workInProgress.alternate = null),
          (workInProgress.flags |= 2)),
        (workInProgress.tag = 1),
        prepareToReadContext(workInProgress, renderLanes),
        constructClassInstance(workInProgress, Component, init),
        mountClassInstance(workInProgress, Component, init, renderLanes),
        finishClassComponent(
          null,
          workInProgress,
          Component,
          !0,
          !1,
          renderLanes
        )
      );
    case 19:
      return updateSuspenseListComponent(current, workInProgress, renderLanes);
    case 21:
      return (
        reconcileChildren(
          current,
          workInProgress,
          workInProgress.pendingProps.children,
          renderLanes
        ),
        workInProgress.child
      );
    case 22:
      return updateOffscreenComponent(current, workInProgress, renderLanes);
    case 23:
      return updateOffscreenComponent(current, workInProgress, renderLanes);
    case 24:
      return (
        prepareToReadContext(workInProgress, renderLanes),
        (Component = readContext(CacheContext)),
        null === current
          ? (null === pooledCache && (pooledCache = new Map()),
            (init = pooledCache),
            (workInProgress.memoizedState = { parent: Component, cache: init }),
            initializeUpdateQueue(workInProgress),
            pushProvider(workInProgress, CacheContext, init))
          : (0 !== (current.lanes & renderLanes) &&
              (cloneUpdateQueue(current, workInProgress),
              processUpdateQueue(workInProgress, null, null, renderLanes)),
            (init = current.memoizedState),
            (nextProps = workInProgress.memoizedState),
            init.parent !== Component
              ? ((init = { parent: Component, cache: Component }),
                (workInProgress.memoizedState = init),
                0 === workInProgress.lanes &&
                  (workInProgress.memoizedState = workInProgress.updateQueue.baseState = init),
                pushProvider(workInProgress, CacheContext, Component))
              : ((Component = nextProps.cache),
                pushProvider(workInProgress, CacheContext, Component),
                Component !== init.cache &&
                  propagateContextChange(
                    workInProgress,
                    CacheContext,
                    renderLanes
                  ))),
        reconcileChildren(
          current,
          workInProgress,
          workInProgress.pendingProps.children,
          renderLanes
        ),
        workInProgress.child
      );
  }
  throw Error(formatProdErrorMessage(156, workInProgress.tag));
};
function scheduleCallback$1(priorityLevel, callback) {
  return scheduleCallback(priorityLevel, callback);
}
function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;
  this.key = key;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = pendingProps;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = mode;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function createFiber(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
}
function shouldConstruct(Component) {
  Component = Component.prototype;
  return !(!Component || !Component.isReactComponent);
}
function resolveLazyComponentTag(Component) {
  if ("function" === typeof Component)
    return shouldConstruct(Component) ? 1 : 0;
  if (void 0 !== Component && null !== Component) {
    Component = Component.$$typeof;
    if (Component === REACT_FORWARD_REF_TYPE) return 11;
    if (Component === REACT_MEMO_TYPE) return 14;
  }
  return 2;
}
function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate;
  null === workInProgress
    ? ((workInProgress = createFiber(
        current.tag,
        pendingProps,
        current.key,
        current.mode
      )),
      (workInProgress.elementType = current.elementType),
      (workInProgress.type = current.type),
      (workInProgress.stateNode = current.stateNode),
      (workInProgress.alternate = current),
      (current.alternate = workInProgress))
    : ((workInProgress.pendingProps = pendingProps),
      (workInProgress.type = current.type),
      (workInProgress.flags = 0),
      (workInProgress.subtreeFlags = 0),
      (workInProgress.deletions = null));
  workInProgress.flags = current.flags & 7340032;
  workInProgress.childLanes = current.childLanes;
  workInProgress.lanes = current.lanes;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  pendingProps = current.dependencies;
  workInProgress.dependencies =
    null === pendingProps
      ? null
      : { lanes: pendingProps.lanes, firstContext: pendingProps.firstContext };
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;
  return workInProgress;
}
function createFiberFromTypeAndProps(
  type,
  key,
  pendingProps,
  owner,
  mode,
  lanes
) {
  var fiberTag = 2;
  owner = type;
  if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
  else if ("string" === typeof type) fiberTag = 5;
  else
    a: switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(pendingProps.children, mode, lanes, key);
      case REACT_DEBUG_TRACING_MODE_TYPE:
        fiberTag = 8;
        mode |= 4;
        break;
      case REACT_STRICT_MODE_TYPE:
        fiberTag = 8;
        mode |= 8;
        break;
      case REACT_PROFILER_TYPE:
        return (
          (type = createFiber(12, pendingProps, key, mode | 2)),
          (type.elementType = REACT_PROFILER_TYPE),
          (type.lanes = lanes),
          type
        );
      case REACT_SUSPENSE_TYPE:
        return (
          (type = createFiber(13, pendingProps, key, mode)),
          (type.elementType = REACT_SUSPENSE_TYPE),
          (type.lanes = lanes),
          type
        );
      case REACT_SUSPENSE_LIST_TYPE:
        return (
          (type = createFiber(19, pendingProps, key, mode)),
          (type.elementType = REACT_SUSPENSE_LIST_TYPE),
          (type.lanes = lanes),
          type
        );
      case REACT_OFFSCREEN_TYPE:
        return createFiberFromOffscreen(pendingProps, mode, lanes, key);
      case REACT_LEGACY_HIDDEN_TYPE:
        return (
          (type = createFiber(23, pendingProps, key, mode)),
          (type.elementType = REACT_LEGACY_HIDDEN_TYPE),
          (type.lanes = lanes),
          type
        );
      case REACT_SCOPE_TYPE:
        return (
          (key = createFiber(21, pendingProps, key, mode)),
          (key.type = type),
          (key.elementType = type),
          (key.lanes = lanes),
          key
        );
      case REACT_CACHE_TYPE:
        return (
          (type = createFiber(24, pendingProps, key, mode)),
          (type.elementType = REACT_CACHE_TYPE),
          (type.lanes = lanes),
          type
        );
      default:
        if ("object" === typeof type && null !== type)
          switch (type.$$typeof) {
            case REACT_PROVIDER_TYPE:
              fiberTag = 10;
              break a;
            case REACT_CONTEXT_TYPE:
              fiberTag = 9;
              break a;
            case REACT_FORWARD_REF_TYPE:
              fiberTag = 11;
              break a;
            case REACT_MEMO_TYPE:
              fiberTag = 14;
              break a;
            case REACT_LAZY_TYPE:
              fiberTag = 16;
              owner = null;
              break a;
          }
        throw Error(
          formatProdErrorMessage(130, null == type ? type : typeof type, "")
        );
    }
  key = createFiber(fiberTag, pendingProps, key, mode);
  key.elementType = type;
  key.type = owner;
  key.lanes = lanes;
  return key;
}
function createFiberFromFragment(elements, mode, lanes, key) {
  elements = createFiber(7, elements, key, mode);
  elements.lanes = lanes;
  return elements;
}
function createFiberFromOffscreen(pendingProps, mode, lanes, key) {
  pendingProps = createFiber(22, pendingProps, key, mode);
  pendingProps.elementType = REACT_OFFSCREEN_TYPE;
  pendingProps.lanes = lanes;
  return pendingProps;
}
function createFiberFromText(content, mode, lanes) {
  content = createFiber(6, content, null, mode);
  content.lanes = lanes;
  return content;
}
function createFiberFromPortal(portal, mode, lanes) {
  mode = createFiber(
    4,
    null !== portal.children ? portal.children : [],
    portal.key,
    mode
  );
  mode.lanes = lanes;
  mode.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null,
    implementation: portal.implementation
  };
  return mode;
}
function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;
  this.containerInfo = containerInfo;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.isDehydrated = hydrate;
  this.callbackNode = null;
  this.callbackPriority = 0;
  this.eventTimes = createLaneMap(0);
  this.expirationTimes = createLaneMap(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = createLaneMap(0);
  this.pooledCache = null;
  this.pooledCacheLanes = 0;
  this.hydrationCallbacks = null;
}
function updateContainer(element, container, parentComponent, callback) {
  parentComponent = container.current;
  var eventTime = requestEventTime(),
    lane = requestUpdateLane(parentComponent);
  null === container.context
    ? (container.context = emptyContextObject)
    : (container.pendingContext = emptyContextObject);
  container = createUpdate(eventTime, lane);
  container.payload = { element: element };
  callback = void 0 === callback ? null : callback;
  null !== callback && (container.callback = callback);
  enqueueUpdate(parentComponent, container);
  element = scheduleUpdateOnFiber(parentComponent, lane, eventTime);
  null !== element && entangleTransitions(element, parentComponent, lane);
  return lane;
}
function emptyFindFiberByHostInstance() {
  return null;
}
Mode$1.setCurrent(FastNoSideEffects);
var slice = Array.prototype.slice,
  LinearGradient = (function() {
    function LinearGradient(stops, x1, y1, x2, y2) {
      this._args = slice.call(arguments);
    }
    LinearGradient.prototype.applyFill = function(node) {
      node.fillLinear.apply(node, this._args);
    };
    return LinearGradient;
  })(),
  RadialGradient = (function() {
    function RadialGradient(stops, fx, fy, rx, ry, cx, cy) {
      this._args = slice.call(arguments);
    }
    RadialGradient.prototype.applyFill = function(node) {
      node.fillRadial.apply(node, this._args);
    };
    return RadialGradient;
  })(),
  Pattern = (function() {
    function Pattern(url, width, height, left, top) {
      this._args = slice.call(arguments);
    }
    Pattern.prototype.applyFill = function(node) {
      node.fillImage.apply(node, this._args);
    };
    return Pattern;
  })(),
  Surface = (function(_React$Component) {
    function Surface() {
      return _React$Component.apply(this, arguments) || this;
    }
    _inheritsLoose(Surface, _React$Component);
    var _proto4 = Surface.prototype;
    _proto4.componentDidMount = function() {
      var _this$props = this.props;
      this._surface = Mode$1.Surface(
        +_this$props.width,
        +_this$props.height,
        this._tagRef
      );
      _this$props = new FiberRootNode(this._surface, 0, !1);
      _this$props.hydrationCallbacks = null;
      var JSCompiler_inline_result = createFiber(3, null, null, 0);
      _this$props.current = JSCompiler_inline_result;
      JSCompiler_inline_result.stateNode = _this$props;
      var initialCache = new Map();
      _this$props.pooledCache = initialCache;
      JSCompiler_inline_result.memoizedState = {
        element: null,
        cache: initialCache
      };
      initializeUpdateQueue(JSCompiler_inline_result);
      this._mountNode = _this$props;
      updateContainer(this.props.children, this._mountNode, this);
    };
    _proto4.componentDidUpdate = function(prevProps) {
      var props = this.props;
      (props.height === prevProps.height && props.width === prevProps.width) ||
        this._surface.resize(+props.width, +props.height);
      updateContainer(this.props.children, this._mountNode, this);
      this._surface.render && this._surface.render();
    };
    _proto4.componentWillUnmount = function() {
      updateContainer(null, this._mountNode, this);
    };
    _proto4.render = function() {
      var $jscomp$this = this,
        props = this.props;
      return React.createElement(Mode$1.Surface.tagName, {
        ref: function(ref) {
          return ($jscomp$this._tagRef = ref);
        },
        accessKey: props.accessKey,
        className: props.className,
        draggable: props.draggable,
        role: props.role,
        style: props.style,
        tabIndex: props.tabIndex,
        title: props.title
      });
    };
    return Surface;
  })(React.Component),
  Text = (function(_React$Component2) {
    function Text(props) {
      var _this = _React$Component2.call(this, props) || this;
      ["height", "width", "x", "y"].forEach(function(key) {
        Object.defineProperty(_assertThisInitialized(_this), key, {
          get: function() {
            return this._text ? this._text[key] : void 0;
          }
        });
      });
      return _this;
    }
    _inheritsLoose(Text, _React$Component2);
    Text.prototype.render = function() {
      var $jscomp$this = this;
      return React.createElement(
        TYPES.TEXT,
        _extends({}, this.props, {
          ref: function(t) {
            return ($jscomp$this._text = t);
          }
        }),
        childrenAsString(this.props.children)
      );
    };
    return Text;
  })(React.Component),
  devToolsConfig$jscomp$inline_987 = {
    findFiberByHostInstance: function() {
      return null;
    },
    bundleType: 0,
    version: "17.0.3",
    rendererPackageName: "react-art"
  };
var internals$jscomp$inline_1238 = {
  bundleType: devToolsConfig$jscomp$inline_987.bundleType,
  version: devToolsConfig$jscomp$inline_987.version,
  rendererPackageName: devToolsConfig$jscomp$inline_987.rendererPackageName,
  rendererConfig: devToolsConfig$jscomp$inline_987.rendererConfig,
  overrideHookState: null,
  overrideHookStateDeletePath: null,
  overrideHookStateRenamePath: null,
  overrideProps: null,
  overridePropsDeletePath: null,
  overridePropsRenamePath: null,
  setErrorHandler: null,
  setSuspenseHandler: null,
  scheduleUpdate: null,
  currentDispatcherRef: ReactSharedInternals.ReactCurrentDispatcher,
  findHostInstanceByFiber: function(fiber) {
    fiber = findCurrentFiberUsingSlowPath(fiber);
    fiber = null !== fiber ? findCurrentHostFiberImpl(fiber) : null;
    return null === fiber ? null : fiber.stateNode;
  },
  findFiberByHostInstance:
    devToolsConfig$jscomp$inline_987.findFiberByHostInstance ||
    emptyFindFiberByHostInstance,
  findHostInstancesForRefresh: null,
  scheduleRefresh: null,
  scheduleRoot: null,
  setRefreshHandler: null,
  getCurrentFiber: null,
  reconcilerVersion: "17.0.3"
};
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var hook$jscomp$inline_1239 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (
    !hook$jscomp$inline_1239.isDisabled &&
    hook$jscomp$inline_1239.supportsFiber
  )
    try {
      (rendererID = hook$jscomp$inline_1239.inject(
        internals$jscomp$inline_1238
      )),
        (injectedHook = hook$jscomp$inline_1239);
    } catch (err) {}
}
var Path = Mode$1.Path;
exports.Transform = Transform;
exports.ClippingRectangle = TYPES.CLIPPING_RECTANGLE;
exports.Group = TYPES.GROUP;
exports.LinearGradient = LinearGradient;
exports.Path = Path;
exports.Pattern = Pattern;
exports.RadialGradient = RadialGradient;
exports.Shape = TYPES.SHAPE;
exports.Surface = Surface;
exports.Text = Text;

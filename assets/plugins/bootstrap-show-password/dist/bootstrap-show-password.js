(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = global || self, factory(global.jQuery));
}(this, function ($) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  // `IsArray` abstract operation
  // https://tc39.github.io/ecma262/#sec-isarray
  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
  };

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (it, S) {
    if (!isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var descriptors = !fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = typeof window == 'object' && window && window.Math == Math ? window
    : typeof self == 'object' && self && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();

  var document = global.document;
  // typeof document.createElement is 'object' in old IE
  var exist = isObject(document) && isObject(document.createElement);

  var documentCreateElement = function (it) {
    return exist ? document.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var nativeDefineProperty = Object.defineProperty;

  var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var hide = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      hide(global, key, value);
    } catch (error) {
      global[key] = value;
    } return value;
  };

  var shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = global[SHARED] || setGlobal(SHARED, {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.0.1',
    mode: 'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + postfix).toString(36));
  };

  // Chrome 38 Symbol has incorrect toString conversion
  var nativeSymbol = !fails(function () {
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var store = shared('wks');

  var Symbol$1 = global.Symbol;


  var wellKnownSymbol = function (name) {
    return store[name] || (store[name] = nativeSymbol && Symbol$1[name]
      || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
  };

  var SPECIES = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var SPECIES$1 = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    return !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$1] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = nativeGetOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = nativeGetOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f$1
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings


  var split = ''.split;

  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var nativeGetOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  var f$2 = descriptors ? nativeGetOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$2
  };

  var functionToString = shared('native-function-to-string', Function.toString);

  var WeakMap = global.WeakMap;

  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

  var shared$1 = shared('keys');


  var sharedKey = function (key) {
    return shared$1[key] || (shared$1[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1 = global.WeakMap;
  var set, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap) {
    var store$1 = new WeakMap$1();
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;
    set = function (it, metadata) {
      wmset.call(store$1, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store$1, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store$1, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      hide(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(functionToString).split('toString');

  shared('inspectSource', function (it) {
    return functionToString.call(it);
  });

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
    if (O === global) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else hide(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
  });
  });

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  // false -> Array#indexOf
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  // true  -> Array#includes
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  var arrayIncludes = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIndexOf = arrayIncludes(false);


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  var Reflect = global.Reflect;

  // all object keys, includes non-enumerable and symbols
  var ownKeys = Reflect && Reflect.ownKeys || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global;
    } else if (STATIC) {
      target = global[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        hide(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

  var IS_CONCAT_SPREADABLE_SUPPORT = !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export({ target: 'Array', proto: true, forced: FORCED }, {
    concat: function concat(arg) { // eslint-disable-line no-unused-vars
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = toLength(E.length);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var aFunction = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  // optional / simple context binding
  var bindContext = function (fn, that, length) {
    aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
  // 0 -> Array#forEach
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  // 1 -> Array#map
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  // 2 -> Array#filter
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  // 3 -> Array#some
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  // 4 -> Array#every
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  // 5 -> Array#find
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  // 6 -> Array#findIndex
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  var arrayMethods = function (TYPE, specificCreate) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    var create = specificCreate || arraySpeciesCreate;
    return function ($this, callbackfn, that) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = bindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: target.push(value);       // filter
          } else if (IS_EVERY) return false;  // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)



  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var i = 0;
    var key;
    while (length > i) objectDefineProperty.f(O, key = keys[i++], Properties[key]);
    return O;
  };

  var document$1 = global.document;

  var html = document$1 && document$1.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])





  var IE_PROTO = sharedKey('IE_PROTO');
  var PROTOTYPE = 'prototype';
  var Empty = function () { /* empty */ };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var length = enumBugKeys.length;
    var lt = '<';
    var script = 'script';
    var gt = '>';
    var js = 'java' + script + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    iframe.src = String(js);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
    return createDict();
  };

  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE] = anObject(O);
      result = new Empty();
      Empty[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = createDict();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  hiddenKeys[IE_PROTO] = true;

  var UNSCOPABLES = wellKnownSymbol('unscopables');


  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    hide(ArrayPrototype, UNSCOPABLES, objectCreate(null));
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var internalFind = arrayMethods(5);
  var FIND = 'find';
  var SKIPS_HOLES = true;

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  _export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
    find: function find(callbackfn /* , that = undefined */) {
      return internalFind(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND);

  var sloppyArrayMethod = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !method || !fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var nativeJoin = [].join;

  var ES3_STRINGS = indexedObject != Object;
  var SLOPPY_METHOD = sloppyArrayMethod('join', ',');

  // `Array.prototype.join` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.join
  _export({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD }, {
    join: function join(separator) {
      return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
    }
  });

  // a string of all valid unicode whitespaces
  // eslint-disable-next-line max-len
  var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // 1 -> String#trimStart
  // 2 -> String#trimEnd
  // 3 -> String#trim
  var stringTrim = function (string, TYPE) {
    string = String(requireObjectCoercible(string));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };

  var nativeParseInt = global.parseInt;


  var hex = /^[-+]?0[xX]/;
  var FORCED$1 = nativeParseInt(whitespaces + '08') !== 8 || nativeParseInt(whitespaces + '0x16') !== 22;

  var _parseInt = FORCED$1 ? function parseInt(str, radix) {
    var string = stringTrim(String(str), 3);
    return nativeParseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
  } : nativeParseInt;

  // `parseInt` method
  // https://tc39.github.io/ecma262/#sec-parseint-string-radix
  _export({ global: true, forced: parseInt != _parseInt }, {
    parseInt: _parseInt
  });

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function () {
    var that = anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  var nativeReplace = String.prototype.replace;

  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var regexpExec = patchedExec;

  _export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
    exec: regexpExec
  });

  // CONVERT_TO_STRING: true  -> String#at
  // CONVERT_TO_STRING: false -> String#codePointAt
  var stringAt = function (that, pos, CONVERT_TO_STRING) {
    var S = String(requireObjectCoercible(that));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };

  // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex
  var advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? stringAt(S, index, true).length : 1);
  };

  // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw TypeError('RegExp exec method returned something other than an Object or null');
      }
      return result;
    }

    if (classofRaw(R) !== 'RegExp') {
      throw TypeError('RegExp#exec called on incompatible receiver');
    }

    return regexpExec.call(R, S);
  };

  var SPECIES$2 = wellKnownSymbol('species');

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
    var SYMBOL = wellKnownSymbol(KEY);

    var DELEGATES_TO_SYMBOL = !fails(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;
      re.exec = function () { execCalled = true; return null; };

      if (KEY === 'split') {
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$2] = function () { return re; };
      }

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      });
      var stringMethod = methods[0];
      var regexMethod = methods[1];

      redefine(String.prototype, KEY, stringMethod);
      redefine(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) { return regexMethod.call(string, this, arg); }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) { return regexMethod.call(string, this); }
      );
      if (sham) hide(RegExp.prototype[SYMBOL], 'sham', true);
    }
  };

  var max$1 = Math.max;
  var min$2 = Math.min;
  var floor$1 = Math.floor;
  var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // @@replace logic
  fixRegexpWellKnownSymbolLogic(
    'replace',
    2,
    function (REPLACE, nativeReplace, maybeCallNative) {
      return [
        // `String.prototype.replace` method
        // https://tc39.github.io/ecma262/#sec-string.prototype.replace
        function replace(searchValue, replaceValue) {
          var O = requireObjectCoercible(this);
          var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
          return replacer !== undefined
            ? replacer.call(searchValue, O, replaceValue)
            : nativeReplace.call(String(O), searchValue, replaceValue);
        },
        // `RegExp.prototype[@@replace]` method
        // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
        function (regexp, replaceValue) {
          var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
          if (res.done) return res.value;

          var rx = anObject(regexp);
          var S = String(this);

          var functionalReplace = typeof replaceValue === 'function';
          if (!functionalReplace) replaceValue = String(replaceValue);

          var global = rx.global;
          if (global) {
            var fullUnicode = rx.unicode;
            rx.lastIndex = 0;
          }
          var results = [];
          while (true) {
            var result = regexpExecAbstract(rx, S);
            if (result === null) break;

            results.push(result);
            if (!global) break;

            var matchStr = String(result[0]);
            if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          }

          var accumulatedResult = '';
          var nextSourcePosition = 0;
          for (var i = 0; i < results.length; i++) {
            result = results[i];

            var matched = String(result[0]);
            var position = max$1(min$2(toInteger(result.index), S.length), 0);
            var captures = [];
            // NOTE: This is equivalent to
            //   captures = result.slice(1).map(maybeToString)
            // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
            // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
            // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
            for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
            var namedCaptures = result.groups;
            if (functionalReplace) {
              var replacerArgs = [matched].concat(captures, position, S);
              if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
              var replacement = String(replaceValue.apply(undefined, replacerArgs));
            } else {
              replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
            }
            if (position >= nextSourcePosition) {
              accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
              nextSourcePosition = position + matched.length;
            }
          }
          return accumulatedResult + S.slice(nextSourcePosition);
        }
      ];

      // https://tc39.github.io/ecma262/#sec-getsubstitution
      function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
        var tailPos = position + matched.length;
        var m = captures.length;
        var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
        if (namedCaptures !== undefined) {
          namedCaptures = toObject(namedCaptures);
          symbols = SUBSTITUTION_SYMBOLS;
        }
        return nativeReplace.call(replacement, symbols, function (match, ch) {
          var capture;
          switch (ch.charAt(0)) {
            case '$': return '$';
            case '&': return matched;
            case '`': return str.slice(0, position);
            case "'": return str.slice(tailPos);
            case '<':
              capture = namedCaptures[ch.slice(1, -1)];
              break;
            default: // \d\d?
              var n = +ch;
              if (n === 0) return match;
              if (n > m) {
                var f = floor$1(n / 10);
                if (f === 0) return match;
                if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                return match;
              }
              capture = captures[n - 1];
          }
          return capture === undefined ? '' : capture;
        });
      }
    }
  );

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * @author zhixin wen <wenzhixin2010@gmail.com>
   * https://github.com/wenzhixin/bootstrap-show-password
   * version: 1.2.1
   */

  var bootstrapVersion = 4;

  try {
    var rawVersion = $.fn.dropdown.Constructor.VERSION; // Only try to parse VERSION if is is defined.
    // It is undefined in older versions of Bootstrap (tested with 3.1.1).

    if (rawVersion !== undefined) {
      bootstrapVersion = parseInt(rawVersion, 10);
    }
  } catch (e) {// ignore
  }

  var Constants = {
    html: {
      inputGroups: {
        3: ['<span tabindex="100" class="add-on input-group-addon %s" title="%s">', '</span>'],
        4: ['<div class="%s"><button tabindex="100" title="%s" class="btn btn-outline-secondary" type="button">', '</button></div>']
      }[bootstrapVersion]
    } // TOOLS DEFINITION
    // ======================
    // it only does '%s', and return '' when arguments are undefined

  };

  var sprintf = function sprintf(str) {
    var args = arguments;
    var flag = true;
    var i = 1;
    str = str.replace(/%s/g, function () {
      var arg = args[i++];

      if (typeof arg === 'undefined') {
        flag = false;
        return '';
      }

      return arg;
    });

    if (flag) {
      return str;
    }

    return '';
  };

  var Password =
  /*#__PURE__*/
  function () {
    function Password(element, options) {
      _classCallCheck(this, Password);

      this.options = options;
      this.$element = $(element);
      this.isShown = false;
      this.init();
    }

    _createClass(Password, [{
      key: "init",
      value: function init() {
        var placementFuc;
        var inputClass;

        if (this.options.placement === 'before') {
          placementFuc = 'insertBefore';
          inputClass = 'input-group-prepend';
        } else {
          this.options.placement = 'after'; // default to after

          placementFuc = 'insertAfter';
          inputClass = 'input-group-append';
        } // Create the text, icon and assign


        this.$element.wrap("<div class=\"input-group".concat(sprintf(' input-group-%s', this.options.size), "\" />"));
        this.$text = $('<input type="text" />')[placementFuc](this.$element).attr('class', this.$element.attr('class')).attr('style', this.$element.attr('style')).attr('placeholder', this.$element.attr('placeholder')).attr('maxlength', this.$element.attr('maxlength')).attr('disabled', this.$element.attr('disabled')).css('display', this.$element.css('display')).val(this.$element.val()).hide(); // Copy readonly attribute if it's set

        if (this.$element.prop('readonly')) this.$text.prop('readonly', true);
        this.$icon = $(["".concat(sprintf(Constants.html.inputGroups[0], inputClass, this.options.message), "\n      <i class=\"icon-eye-open ").concat(this.options.eyeClass, " ").concat(this.options.eyeClassPositionInside ? '' : this.options.eyeOpenClass, "\">\n      ").concat(this.options.eyeClassPositionInside ? this.options.eyeOpenClass : '', "\n      </i>"), Constants.html.inputGroups[1]].join(''))[placementFuc](this.$text).css('cursor', 'pointer'); // events

        this.$text.off('keyup').on('keyup', $.proxy(function () {
          if (!this.isShown) return;
          this.$element.val(this.$text.val()).trigger('change');
        }, this));
        this.$icon.off('click').on('click', $.proxy(function () {
          this.$text.val(this.$element.val()).trigger('change');
          this.toggle();
        }, this));
      }
    }, {
      key: "toggle",
      value: function toggle(_relatedTarget) {
        this[!this.isShown ? 'show' : 'hide'](_relatedTarget);
      }
    }, {
      key: "show",
      value: function show(_relatedTarget) {
        var e = $.Event('show.bs.password', {
          relatedTarget: _relatedTarget
        });
        this.$element.trigger(e);
        this.isShown = true;
        this.$element.hide();
        this.$text.show();

        if (this.options.eyeClassPositionInside) {
          this.$icon.find('i,svg').removeClass('icon-eye-open').addClass('icon-eye-close').html(this.options.eyeCloseClass);
        } else {
          this.$icon.find('i,svg').removeClass("icon-eye-open ".concat(this.options.eyeOpenClass)).addClass("icon-eye-close ".concat(this.options.eyeCloseClass));
        }

        this.$text[this.options.placement](this.$element);
      }
    }, {
      key: "hide",
      value: function hide(_relatedTarget) {
        var e = $.Event('hide.bs.password', {
          relatedTarget: _relatedTarget
        });
        this.$element.trigger(e);
        this.isShown = false;
        this.$element.show();
        this.$text.hide();

        if (this.options.eyeClassPositionInside) {
          this.$icon.find('i,svg').removeClass('icon-eye-close').addClass('icon-eye-open').html(this.options.eyeOpenClass);
        } else {
          this.$icon.find('i,svg').removeClass("icon-eye-close ".concat(this.options.eyeCloseClass)).addClass("icon-eye-open ".concat(this.options.eyeOpenClass));
        }

        this.$element[this.options.placement](this.$text);
      }
    }, {
      key: "val",
      value: function val(value) {
        if (typeof value === 'undefined') {
          return this.$element.val();
        }

        this.$element.val(value).trigger('change');
        this.$text.val(value);
      }
    }, {
      key: "focus",
      value: function focus() {
        this.$element.focus();
      }
    }]);

    return Password;
  }();

  Password.DEFAULTS = {
    placement: 'after',
    // 'before' or 'after'
    message: 'Click here to show/hide password',
    size: undefined,
    // '', 'sm', 'large'
    eyeClass: 'fa',
    // 'glyphicon',
    eyeOpenClass: 'fa-eye',
    // 'glyphicon-eye-open',
    eyeCloseClass: 'fa-eye-slash',
    // 'glyphicon-eye-close',
    eyeClassPositionInside: false // PASSWORD PLUGIN DEFINITION
    // =======================

  };
  var old = $.fn.password;

  $.fn.password = function () {
    var option = arguments[0]; // public function

    var args = arguments;
    var value;
    var allowedMethods = ['show', 'hide', 'toggle', 'val', 'focus'];
    this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.password');
      var options = $.extend({}, Password.DEFAULTS, $this.data(), _typeof(option) === 'object' && option);

      if (typeof option === 'string') {
        if ($.inArray(option, allowedMethods) < 0) {
          throw new Error("Unknown method: ".concat(option));
        }

        value = data[option](args[1]);
      } else {
        if (!data) {
          data = new Password($this, options);
          $this.data('bs.password', data);
        } else {
          data.init(options);
        }
      }
    });
    return value ? value : this;
  };

  $.fn.password.Constructor = Password; // PASSWORD NO CONFLICT
  // =================

  $.fn.password.noConflict = function () {
    $.fn.password = old;
    return this;
  };

  $(function () {
    $('[data-toggle="password"]').password();
  });

}));

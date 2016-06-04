(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
   typeof define === 'function' && define.amd ? define(factory) :
   (factory());
}(this, function () { 'use strict';

   var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;
   function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports; }

   var gate$1 = __commonjs(function (module, exports, global) {
   (function (global, factory) {
      typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define(factory) :
      (global.Gate = factory());
   }(__commonjs_global, function () { 'use strict';

      function CustomEventTarget() {}

      function Gate (options) {};

         return Gate;

      }));
   });

   var a = 5;
   console.log(window.a);
}));
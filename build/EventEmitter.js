"use strict";var _createClass=function(){function e(e,t){for(var n in t){var i=t[n];i.configurable=!0,i.value&&(i.writable=!0)}Object.defineProperties(e,t)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),_classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},EventEmitterGroup=function(){function e(t){_classCallCheck(this,e),this._unbind=[],this._emitter=t}return _createClass(e,{addEventListener:{value:function(e,t){var n=this._emitter.addEventListener(e,t);this._unbind.push(n)}},removeEventListeners:{value:function(){this._unbind.forEach(function(e){return e()}),this._unbind=[]}}}),e}(),EventEmitter=function(){function e(){_classCallCheck(this,e),this._eventEmitterChannels={}}return _createClass(e,{addEventListener:{value:function(e,t){var n=this;return this._eventEmitterChannels.hasOwnProperty(e)?this._eventEmitterChannels[e].push(t):this._eventEmitterChannels[e]=[t],function(){return n.removeEventListener(e,t)}}},removeEventListener:{value:function(e,t){var n=this._eventEmitterChannels;if(n.hasOwnProperty(e)){var i=n[e],r=i.indexOf(t);-1!==r&&i.splice(r,1)}}},removeEventListeners:{value:function(e){"undefined"==typeof e?this._eventEmitterChannels={}:this._eventEmitterChannels.hasOwnProperty(e)&&delete this._eventEmitterChannels[e]}},emitEvent:{value:function(e,t){this._eventEmitterChannels.hasOwnProperty(e)&&this._eventEmitterChannels[e].forEach(function(e){e(t)})}},createEventGroup:{value:function(){return new EventEmitterGroup(this)}}}),e}();
//# sourceMappingURL=EventEmitter.js.map

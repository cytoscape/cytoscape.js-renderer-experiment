(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeRendererExperiment"] = factory();
	else
		root["cytoscapeRendererExperiment"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(2);

function Renderer(options) {
  console.log('constructor', options);

  var cy = options.cy;
  var container = cy.container();

  var data = this.data = {};

  var canvas = data.canvas = document.createElement('canvas');
  canvas.width = cy.width();
  canvas.height = cy.height();

  var context = data.context = canvas.getContext('2d');

  container.appendChild(canvas);
}

// focus on this function if you're rendering imperatively
function render(options) {
  console.log('render', options);

  var cy = this.cy;
  var context = this.data.context;

  var zoom = cy.zoom();
  var pan = cy.pan();

  context.fillStyle = 'red';
  context.strokeStyle = 'blue';

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(-99999, -99999, 99999999, 99999999);

  context.translate(pan.x, pan.y);
  context.scale(zoom, zoom);

  cy.edges().forEach(function (e) {
    var p1 = e.source().position();
    var p2 = e.target().position();

    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.closePath();

    context.stroke();
  });

  cy.nodes().forEach(function (n) {
    var w = n.width();
    var h = n.height();
    var pos = n.position();
    var x = pos.x - w / 2;
    var y = pos.y - h / 2;

    context.fillRect(x, y, w, h);
  });
}

assign(Renderer.prototype, {
  render: render,

  nodeShapeImpl: function nodeShapeImpl(name, context, centerX, centerY, width, height, points) {
    // this can be ignored as it could be refactored out of the current base renderer assumptions
  },
  arrowShapeImpl: function arrowShapeImpl(name) {
    // this can be ignored as it could be refactored out of the current base renderer assumptions
  },
  matchCanvasSize: function matchCanvasSize(container) {
    // ignore for now: used for automatically resizing the container to fit the available dom area
  },
  redrawHint: function redrawHint(group, isDirty) {
    // optimisation (e.g. only need to redraw selection box): can be ignored for now
  },
  renderTo: function renderTo(cxt, zoom, pan, pxRatio) {
    // deprecated: ignore
  }
});

module.exports = Renderer;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global cytoscape */

var Renderer = __webpack_require__(0);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  // register with cytoscape.js
  cytoscape('renderer', 'experiment', Renderer);
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Simple, internal Object.assign() polyfill for options objects etc.

module.exports = Object.assign != null ? Object.assign.bind(Object) : function (tgt) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.forEach(function (src) {
    if (src !== null && src !== undefined) {
      Object.keys(src).forEach(function (k) {
        return tgt[k] = src[k];
      });
    }
  });

  return tgt;
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhZWRlZGM1MjY2OTI5NjVhYWIwNCIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NpZ24uanMiXSwibmFtZXMiOlsiYXNzaWduIiwicmVxdWlyZSIsIlJlbmRlcmVyIiwib3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJjeSIsImNvbnRhaW5lciIsImRhdGEiLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ3aWR0aCIsImhlaWdodCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXIiLCJ6b29tIiwicGFuIiwiZmlsbFN0eWxlIiwic3Ryb2tlU3R5bGUiLCJzZXRUcmFuc2Zvcm0iLCJjbGVhclJlY3QiLCJ0cmFuc2xhdGUiLCJ4IiwieSIsInNjYWxlIiwiZWRnZXMiLCJmb3JFYWNoIiwicDEiLCJlIiwic291cmNlIiwicG9zaXRpb24iLCJwMiIsInRhcmdldCIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsImNsb3NlUGF0aCIsInN0cm9rZSIsIm5vZGVzIiwidyIsIm4iLCJoIiwicG9zIiwiZmlsbFJlY3QiLCJwcm90b3R5cGUiLCJub2RlU2hhcGVJbXBsIiwibmFtZSIsImNlbnRlclgiLCJjZW50ZXJZIiwicG9pbnRzIiwiYXJyb3dTaGFwZUltcGwiLCJtYXRjaENhbnZhc1NpemUiLCJyZWRyYXdIaW50IiwiZ3JvdXAiLCJpc0RpcnR5IiwicmVuZGVyVG8iLCJjeHQiLCJweFJhdGlvIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlZ2lzdGVyIiwiY3l0b3NjYXBlIiwiT2JqZWN0IiwiYmluZCIsInRndCIsInNyY3MiLCJzcmMiLCJ1bmRlZmluZWQiLCJrZXlzIiwiayJd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LFlBQVUsVUFBVixFQUFzQixZQUF0QixFQUFvQzlELFFBQXBDO0FBQ0QsQ0FMRDs7QUFPQSxJQUFJLE9BQU84RCxTQUFQLEtBQXFCLFdBQXpCLEVBQXNDO0FBQUU7QUFDdENELFdBQVNDLFNBQVQ7QUFDRDs7QUFFREgsT0FBT0MsT0FBUCxHQUFpQkMsUUFBakIsQzs7Ozs7Ozs7O0FDaEJBOztBQUVBRixPQUFPQyxPQUFQLEdBQWlCRyxPQUFPakUsTUFBUCxJQUFpQixJQUFqQixHQUF3QmlFLE9BQU9qRSxNQUFQLENBQWNrRSxJQUFkLENBQW1CRCxNQUFuQixDQUF4QixHQUFxRCxVQUFVRSxHQUFWLEVBQXdCO0FBQUEsb0NBQU5DLElBQU07QUFBTkEsUUFBTTtBQUFBOztBQUM1RkEsT0FBS3ZDLE9BQUwsQ0FBYSxlQUFPO0FBQ2xCLFFBQUl3QyxRQUFRLElBQVIsSUFBZ0JBLFFBQVFDLFNBQTVCLEVBQXVDO0FBQ3JDTCxhQUFPTSxJQUFQLENBQVlGLEdBQVosRUFBaUJ4QyxPQUFqQixDQUF5QjtBQUFBLGVBQUtzQyxJQUFJSyxDQUFKLElBQVNILElBQUlHLENBQUosQ0FBZDtBQUFBLE9BQXpCO0FBQ0Q7QUFDRixHQUpEOztBQU1BLFNBQU9MLEdBQVA7QUFDRCxDQVJELEMiLCJmaWxlIjoiY3l0b3NjYXBlLXJlbmRlcmVyLWV4cGVyaW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjeXRvc2NhcGVSZW5kZXJlckV4cGVyaW1lbnRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3l0b3NjYXBlUmVuZGVyZXJFeHBlcmltZW50XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWVkZWRjNTI2NjkyOTY1YWFiMDQiLCJjb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuL2Fzc2lnbicpO1xuXG5mdW5jdGlvbiBSZW5kZXJlcihvcHRpb25zKSB7XG4gIGNvbnNvbGUubG9nKCdjb25zdHJ1Y3RvcicsIG9wdGlvbnMpO1xuXG4gIGNvbnN0IGN5ID0gb3B0aW9ucy5jeTtcbiAgY29uc3QgY29udGFpbmVyID0gY3kuY29udGFpbmVyKCk7XG5cbiAgY29uc3QgZGF0YSA9IHRoaXMuZGF0YSA9IHt9O1xuXG4gIGNvbnN0IGNhbnZhcyA9IGRhdGEuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IFxuICBjYW52YXMud2lkdGggPSBjeS53aWR0aCgpO1xuICBjYW52YXMuaGVpZ2h0ID0gY3kuaGVpZ2h0KCk7XG5cbiAgY29uc3QgY29udGV4dCA9IGRhdGEuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW52YXMpO1xufVxuXG4vLyBmb2N1cyBvbiB0aGlzIGZ1bmN0aW9uIGlmIHlvdSdyZSByZW5kZXJpbmcgaW1wZXJhdGl2ZWx5XG5mdW5jdGlvbiByZW5kZXIob3B0aW9ucykge1xuICBjb25zb2xlLmxvZygncmVuZGVyJywgb3B0aW9ucyk7XG5cbiAgY29uc3QgY3kgPSB0aGlzLmN5O1xuICBjb25zdCB7IGNvbnRleHQgfSA9IHRoaXMuZGF0YTtcbiAgY29uc3Qgem9vbSA9IGN5Lnpvb20oKTtcbiAgY29uc3QgcGFuID0gY3kucGFuKCk7XG5cbiAgY29udGV4dC5maWxsU3R5bGUgPSAncmVkJztcbiAgY29udGV4dC5zdHJva2VTdHlsZSA9ICdibHVlJztcblxuICBjb250ZXh0LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgY29udGV4dC5jbGVhclJlY3QoLTk5OTk5LCAtOTk5OTksIDk5OTk5OTk5LCA5OTk5OTk5OSk7XG5cbiAgY29udGV4dC50cmFuc2xhdGUocGFuLngsIHBhbi55KTtcbiAgY29udGV4dC5zY2FsZSh6b29tLCB6b29tKTtcblxuICBjeS5lZGdlcygpLmZvckVhY2goZSA9PiB7XG4gICAgY29uc3QgcDEgPSBlLnNvdXJjZSgpLnBvc2l0aW9uKCk7XG4gICAgY29uc3QgcDIgPSBlLnRhcmdldCgpLnBvc2l0aW9uKCk7XG5cbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQubW92ZVRvKHAxLngsIHAxLnkpO1xuICAgIGNvbnRleHQubGluZVRvKHAyLngsIHAyLnkpO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG5cbiAgICBjb250ZXh0LnN0cm9rZSgpO1xuICB9KTtcblxuICBjeS5ub2RlcygpLmZvckVhY2gobiA9PiB7XG4gICAgY29uc3QgdyA9IG4ud2lkdGgoKTtcbiAgICBjb25zdCBoID0gbi5oZWlnaHQoKTtcbiAgICBjb25zdCBwb3MgPSBuLnBvc2l0aW9uKCk7XG4gICAgY29uc3QgeCA9IHBvcy54IC0gdy8yO1xuICAgIGNvbnN0IHkgPSBwb3MueSAtIGgvMjtcblxuICAgIGNvbnRleHQuZmlsbFJlY3QoeCwgeSwgdywgaCk7XG4gIH0pO1xufVxuXG5hc3NpZ24oUmVuZGVyZXIucHJvdG90eXBlLCB7XG4gIHJlbmRlcixcblxuICBub2RlU2hhcGVJbXBsKG5hbWUsIGNvbnRleHQsIGNlbnRlclgsIGNlbnRlclksIHdpZHRoLCBoZWlnaHQsIHBvaW50cykge1xuICAgIC8vIHRoaXMgY2FuIGJlIGlnbm9yZWQgYXMgaXQgY291bGQgYmUgcmVmYWN0b3JlZCBvdXQgb2YgdGhlIGN1cnJlbnQgYmFzZSByZW5kZXJlciBhc3N1bXB0aW9uc1xuICB9LFxuXG4gIGFycm93U2hhcGVJbXBsKG5hbWUpIHtcbiAgICAvLyB0aGlzIGNhbiBiZSBpZ25vcmVkIGFzIGl0IGNvdWxkIGJlIHJlZmFjdG9yZWQgb3V0IG9mIHRoZSBjdXJyZW50IGJhc2UgcmVuZGVyZXIgYXNzdW1wdGlvbnNcbiAgfSxcblxuICBtYXRjaENhbnZhc1NpemUoY29udGFpbmVyKSB7XG4gICAgLy8gaWdub3JlIGZvciBub3c6IHVzZWQgZm9yIGF1dG9tYXRpY2FsbHkgcmVzaXppbmcgdGhlIGNvbnRhaW5lciB0byBmaXQgdGhlIGF2YWlsYWJsZSBkb20gYXJlYVxuICB9LFxuXG4gIHJlZHJhd0hpbnQoZ3JvdXAsIGlzRGlydHkpIHtcbiAgICAvLyBvcHRpbWlzYXRpb24gKGUuZy4gb25seSBuZWVkIHRvIHJlZHJhdyBzZWxlY3Rpb24gYm94KTogY2FuIGJlIGlnbm9yZWQgZm9yIG5vd1xuICB9LFxuXG4gIHJlbmRlclRvKGN4dCwgem9vbSwgcGFuLCBweFJhdGlvKSB7XG4gICAgLy8gZGVwcmVjYXRlZDogaWdub3JlXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlcmVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZW5kZXJlci5qcyIsIi8qIGdsb2JhbCBjeXRvc2NhcGUgKi9cblxuY29uc3QgUmVuZGVyZXIgPSByZXF1aXJlKCcuL3JlbmRlcmVyJyk7XG5cbi8vIHJlZ2lzdGVycyB0aGUgZXh0ZW5zaW9uIG9uIGEgY3l0b3NjYXBlIGxpYiByZWZcbmxldCByZWdpc3RlciA9IGZ1bmN0aW9uIChjeXRvc2NhcGUpIHtcbiAgaWYgKCFjeXRvc2NhcGUpIHsgcmV0dXJuOyB9IC8vIGNhbid0IHJlZ2lzdGVyIGlmIGN5dG9zY2FwZSB1bnNwZWNpZmllZFxuXG4gIC8vIHJlZ2lzdGVyIHdpdGggY3l0b3NjYXBlLmpzXG4gIGN5dG9zY2FwZSgncmVuZGVyZXInLCAnZXhwZXJpbWVudCcsIFJlbmRlcmVyKTtcbn07XG5cbmlmICh0eXBlb2YgY3l0b3NjYXBlICE9PSAndW5kZWZpbmVkJykgeyAvLyBleHBvc2UgdG8gZ2xvYmFsIGN5dG9zY2FwZSAoaS5lLiB3aW5kb3cuY3l0b3NjYXBlKVxuICByZWdpc3RlcihjeXRvc2NhcGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiLy8gU2ltcGxlLCBpbnRlcm5hbCBPYmplY3QuYXNzaWduKCkgcG9seWZpbGwgZm9yIG9wdGlvbnMgb2JqZWN0cyBldGMuXG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiAhPSBudWxsID8gT2JqZWN0LmFzc2lnbi5iaW5kKE9iamVjdCkgOiBmdW5jdGlvbiAodGd0LCAuLi5zcmNzKSB7XG4gIHNyY3MuZm9yRWFjaChzcmMgPT4ge1xuICAgIGlmIChzcmMgIT09IG51bGwgJiYgc3JjICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIE9iamVjdC5rZXlzKHNyYykuZm9yRWFjaChrID0+IHRndFtrXSA9IHNyY1trXSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gdGd0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NpZ24uanMiXSwic291cmNlUm9vdCI6IiJ9
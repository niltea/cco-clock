/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hand = function () {
    function Hand(type, elementId) {
        _classCallCheck(this, Hand);

        this.isOK = false;
        this.type = type;
        this.element = document.getElementById(elementId);
        if (!this.element) {
            return;
        }
        this.isOK = true;
    }

    _createClass(Hand, [{
        key: 'setAngle',
        value: function setAngle(current, max) {
            var _this = this;

            if (!this.isOK) return;
            this.currentPosition = current < max ? current : current - max;
            var angle = 360 / max * current;
            if (angle === this.angle) return;
            this.angle = angle;
            if (angle === 0) {
                this.element.style.transform = 'rotate(360deg)';
                setTimeout(function () {
                    _this.element.classList.add('noTransition');
                    _this.element.style.transform = 'rotate(0deg)';
                    setTimeout(function () {
                        _this.element.classList.remove('noTransition');
                    }, 200);
                }, 200);
            } else {
                this.element.style.transform = 'rotate(' + angle + 'deg)';
            }
        }
    }]);

    return Hand;
}();

var hands = {
    hour: undefined,
    min: undefined,
    sec: undefined
};
var init = function init() {
    hands.hour = new Hand('hour', 'hand--hour');
    hands.min = new Hand('min', 'hand--min');
    hands.sec = new Hand('sec', 'hand--sec');
    var clock = document.getElementById('clock');
    setHands();
    setTimeout(function () {
        clock.classList.add('is--shown');
    }, 500);
    setInterval(setHands, 500);
};
var setHands = function setHands() {
    var now = new Date();
    hands.hour.setAngle(now.getHours(), 12);
    hands.min.setAngle(now.getMinutes(), 60);
    hands.sec.setAngle(now.getSeconds(), 60);
};
document.addEventListener('DOMContentLoaded', function () {
    init();
});

/***/ })
/******/ ]);
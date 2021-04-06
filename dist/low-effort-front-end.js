var LowEffortFrontEnd;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/RenderPage.ts":
/*!***************************!*\
  !*** ./src/RenderPage.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPage": () => (/* binding */ RenderPage)
/* harmony export */ });
class RenderPage {
    constructor(startConfig, hash, router) {
        this.startConfig = startConfig;
        this.hash = hash;
        this.router = router;
        this.dom = document.getElementById("LowEffortFrontEnd");
        if (!this.dom)
            throw new Error("DOM has no element with ID 'LowEffortFrontEnd'");
        if (!this.checkIf404(hash))
            throw new Error("RenderPage cannot render a page that dose not exists");
        this.page = this.startConfig.pages[hash.replace("#", "")];
        this.render();
    }
    checkIf404(hash) {
        if (hash == "#404")
            return true;
        return !!this.startConfig.pages[hash.replace("#", "")];
    }
    render() {
        document.querySelector("title").innerText = this.page.title;
        //const fragment = new DocumentFragment();
        const fragment = document.createElement("div");
        for (const element of this.page.content) {
            fragment.appendChild(elementCreator.element(element, this.router));
        }
        this.dom.innerHTML = "";
        this.dom.appendChild(fragment);
    }
}
class elementCreator {
    static element(element, router) {
        const el = document.createElement(element.type);
        if (element.text)
            el.innerText = element.text;
        if (element.click)
            this.createClickListener(element, el, router);
        return el;
    }
    static createClickListener(element, el, router) {
        let func;
        switch (element.click.type) {
            case "custom":
                el.onclick = function (ev) {
                    try {
                        eval(element.click.js);
                    }
                    catch (error) {
                        console.error(error);
                    }
                };
                break;
            case "router":
                el.onclick = () => {
                    router.changePage(element.click.goTo);
                };
                break;
            default:
                break;
        }
    }
}


/***/ }),

/***/ "./src/router.ts":
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Router": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var _RenderPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RenderPage */ "./src/RenderPage.ts");

class Router {
    constructor(startConfig) {
        this.startConfig = startConfig;
        if (!this.hash || this.hash == "") {
            this.hash = startConfig.startPage;
        }
        //TODO get 404
        window.addEventListener("hashchange", () => {
            if (this.checkIf404(location.hash)) {
                this.initRenderPage(location.hash);
                return;
            }
            this.hash = "#404";
            this.initRenderPage(location.hash);
        });
        this.initRenderPage(location.hash);
    }
    changePage(newHash) {
        if (this.checkIf404(newHash)) {
            this.initRenderPage(newHash);
            return;
        }
        this.hash = "#404";
        this.initRenderPage(location.hash);
    }
    checkIf404(hash) {
        if (hash == "#404")
            return true;
        return !!this.startConfig.pages[hash.replace("#", "")];
    }
    initRenderPage(hash) {
        console.log("hash change");
        new _RenderPage__WEBPACK_IMPORTED_MODULE_0__.RenderPage(this.startConfig, hash, this);
    }
    get hash() {
        return location.hash;
    }
    set hash(newHash) {
        if (!this.checkIf404(newHash))
            newHash = "#404";
        if (history.pushState) {
            history.pushState(null, null, newHash);
        }
        else {
            location.hash = newHash;
        }
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LowEffortFrontEnd)
/* harmony export */ });
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ "./src/router.ts");

const default404 = {
    title: "404 Not Found",
    content: [
        {
            type: "h1",
            text: "404 - Not Found"
        },
        {
            type: "p",
            text: "This page was not found"
        }
    ]
};
class LowEffortFrontEnd {
    constructor(startConfig) {
        console.log("Start Low Effort Front End - https://github.com/i5heu/low-effort-front-end-js");
        if (!startConfig.pages[404]) {
            startConfig.pages[404] = default404;
        }
        this.startConfig = startConfig;
        new _router__WEBPACK_IMPORTED_MODULE_0__.Router(startConfig);
    }
}

})();

LowEffortFrontEnd = __webpack_exports__.default;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Mb3dFZmZvcnRGcm9udEVuZC8uL3NyYy9SZW5kZXJQYWdlLnRzIiwid2VicGFjazovL0xvd0VmZm9ydEZyb250RW5kLy4vc3JjL3JvdXRlci50cyIsIndlYnBhY2s6Ly9Mb3dFZmZvcnRGcm9udEVuZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Mb3dFZmZvcnRGcm9udEVuZC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTG93RWZmb3J0RnJvbnRFbmQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Mb3dFZmZvcnRGcm9udEVuZC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0xvd0VmZm9ydEZyb250RW5kLy4vc3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBSU8sTUFBTSxVQUFVO0lBT25CLFlBQVksV0FBd0IsRUFBRSxJQUFZLEVBQUUsTUFBYztRQUM5RCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxHQUFtQixRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQztRQUVoRixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1FBRTVFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFB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SUFDNUIsQ0FBQztDQUNKIiwiZmlsZSI6Imxvdy1lZmZvcnQtZnJvbnQtZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuLi9ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC9saWIvdHlwZXNjcmlwdFwiO1xuaW1wb3J0IHsgUGFnZUVsZW1lbnQsIFBhZ2UsIFN0YXJ0Q29uZmlnIH0gZnJvbSBcIi4vbWFpblwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIi4vcm91dGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJQYWdlIHtcbiAgICBzdGFydENvbmZpZzogU3RhcnRDb25maWc7XG4gICAgaGFzaDogc3RyaW5nXG4gICAgZG9tOiBIVE1MRGl2RWxlbWVudFxuICAgIHBhZ2U6IFBhZ2VcbiAgICByb3V0ZXI6IFJvdXRlclxuXG4gICAgY29uc3RydWN0b3Ioc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnLCBoYXNoOiBzdHJpbmcsIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIHRoaXMuc3RhcnRDb25maWcgPSBzdGFydENvbmZpZztcbiAgICAgICAgdGhpcy5oYXNoID0gaGFzaDtcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgICAgIHRoaXMuZG9tID0gPEhUTUxEaXZFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiTG93RWZmb3J0RnJvbnRFbmRcIik7XG4gICAgICAgIGlmICghdGhpcy5kb20pIHRocm93IG5ldyBFcnJvcihcIkRPTSBoYXMgbm8gZWxlbWVudCB3aXRoIElEICdMb3dFZmZvcnRGcm9udEVuZCdcIilcblxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tJZjQwNChoYXNoKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlbmRlclBhZ2UgY2Fubm90IHJlbmRlciBhIHBhZ2UgdGhhdCBkb3NlIG5vdCBleGlzdHNcIik7XG5cbiAgICAgICAgdGhpcy5wYWdlID0gdGhpcy5zdGFydENvbmZpZy5wYWdlc1toYXNoLnJlcGxhY2UoXCIjXCIsIFwiXCIpXTtcblxuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIGNoZWNrSWY0MDQoaGFzaDogc3RyaW5nKSB7XG4gICAgICAgIGlmIChoYXNoID09IFwiIzQwNFwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zdGFydENvbmZpZy5wYWdlc1toYXNoLnJlcGxhY2UoXCIjXCIsIFwiXCIpXTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0aXRsZVwiKS5pbm5lclRleHQgPSB0aGlzLnBhZ2UudGl0bGU7XG5cbiAgICAgICAgLy9jb25zdCBmcmFnbWVudCA9IG5ldyBEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdGhpcy5wYWdlLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsZW1lbnRDcmVhdG9yLmVsZW1lbnQoZWxlbWVudCwgdGhpcy5yb3V0ZXIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZG9tLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHRoaXMuZG9tLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICB9XG59XG5cblxuY2xhc3MgZWxlbWVudENyZWF0b3Ige1xuICAgIHN0YXRpYyBlbGVtZW50KGVsZW1lbnQ6IFBhZ2VFbGVtZW50LCByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudC50eXBlKTtcbiAgICAgICAgaWYgKGVsZW1lbnQudGV4dCkgZWwuaW5uZXJUZXh0ID0gZWxlbWVudC50ZXh0O1xuICAgICAgICBpZiAoZWxlbWVudC5jbGljaykgdGhpcy5jcmVhdGVDbGlja0xpc3RlbmVyKGVsZW1lbnQsIGVsLCByb3V0ZXIpO1xuXG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlQ2xpY2tMaXN0ZW5lcihlbGVtZW50OiBQYWdlRWxlbWVudCwgZWw6IEhUTUxFbGVtZW50LCByb3V0ZXI6IFJvdXRlcikge1xuXG4gICAgICAgIGxldCBmdW5jOiBGdW5jdGlvbjtcblxuICAgICAgICBzd2l0Y2ggKGVsZW1lbnQuY2xpY2sudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImN1c3RvbVwiOlxuICAgICAgICAgICAgICAgIGVsLm9uY2xpY2sgPSBmdW5jdGlvbiAoZXY6IFBvaW50ZXJFdmVudCkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZhbChlbGVtZW50LmNsaWNrLmpzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwicm91dGVyXCI6XG4gICAgICAgICAgICAgICAgZWwub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGVyLmNoYW5nZVBhZ2UoZWxlbWVudC5jbGljay5nb1RvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgU3RhcnRDb25maWcgfSBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBSZW5kZXJQYWdlIH0gZnJvbSBcIi4vUmVuZGVyUGFnZVwiO1xuXG5leHBvcnQgY2xhc3MgUm91dGVyIHtcbiAgICBzdGFydENvbmZpZzogU3RhcnRDb25maWc7XG5cbiAgICBjb25zdHJ1Y3RvcihzdGFydENvbmZpZzogU3RhcnRDb25maWcpIHtcbiAgICAgICAgdGhpcy5zdGFydENvbmZpZyA9IHN0YXJ0Q29uZmlnO1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNoIHx8IHRoaXMuaGFzaCA9PSBcIlwiKSB7XG4gICAgICAgICAgICB0aGlzLmhhc2ggPSBzdGFydENvbmZpZy5zdGFydFBhZ2U7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vVE9ETyBnZXQgNDA0XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrSWY0MDQobG9jYXRpb24uaGFzaCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRSZW5kZXJQYWdlKGxvY2F0aW9uLmhhc2gpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5oYXNoID0gXCIjNDA0XCI7XG4gICAgICAgICAgICB0aGlzLmluaXRSZW5kZXJQYWdlKGxvY2F0aW9uLmhhc2gpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmluaXRSZW5kZXJQYWdlKGxvY2F0aW9uLmhhc2gpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjaGFuZ2VQYWdlKG5ld0hhc2g6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5jaGVja0lmNDA0KG5ld0hhc2gpKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRSZW5kZXJQYWdlKG5ld0hhc2gpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYXNoID0gXCIjNDA0XCI7XG4gICAgICAgIHRoaXMuaW5pdFJlbmRlclBhZ2UobG9jYXRpb24uaGFzaCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNoZWNrSWY0MDQoaGFzaDogc3RyaW5nKSB7XG4gICAgICAgIGlmIChoYXNoID09IFwiIzQwNFwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zdGFydENvbmZpZy5wYWdlc1toYXNoLnJlcGxhY2UoXCIjXCIsIFwiXCIpXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRSZW5kZXJQYWdlKGhhc2g6IHN0cmluZykge1xuICAgICAgICBjb25zb2xlLmxvZyhcImhhc2ggY2hhbmdlXCIpXG4gICAgICAgIG5ldyBSZW5kZXJQYWdlKHRoaXMuc3RhcnRDb25maWcsIGhhc2gsIHRoaXMpO1xuICAgIH1cblxuICAgIGdldCBoYXNoKCkge1xuICAgICAgICByZXR1cm4gbG9jYXRpb24uaGFzaFxuICAgIH1cblxuICAgIHNldCBoYXNoKG5ld0hhc2gpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrSWY0MDQobmV3SGFzaCkpXG4gICAgICAgICAgICBuZXdIYXNoID0gXCIjNDA0XCI7XG5cbiAgICAgICAgaWYgKGhpc3RvcnkucHVzaFN0YXRlKSB7XG4gICAgICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCBuZXdIYXNoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBuZXdIYXNoO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIi4vcm91dGVyXCI7XG5cblxuZXhwb3J0IHR5cGUgUGF0aCA9IHN0cmluZztcblxuZXhwb3J0IGludGVyZmFjZSBDbGljayB7XG4gICAgdHlwZTogXCJyb3V0ZXJcInxcInN1Ym1pdFwifFwiY3VzdG9tXCIsXG4gICAgZ29Ubz86IHN0cmluZyxcbiAgICBqcz86IHN0cmluZyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdlRWxlbWVudCB7XG4gICAgdHlwZTogXCJoMVwifFwicFwifFwiYnV0dG9uXCIsXG4gICAgdGV4dD86IHN0cmluZyxcbiAgICBjbGljaz86IENsaWNrXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZSB7XG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBjb250ZW50OiBBcnJheTxQYWdlRWxlbWVudD5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGFydENvbmZpZyB7XG4gICAgc3RhcnRQYWdlOiBQYXRoLFxuICAgIGFub255bVN0YXRpc3RpY3M6IGJvb2xlYW4sXG4gICAgcGFnZXM6IHtcbiAgICAgICAgW25hbWU6IHN0cmluZ106IFBhZ2VcbiAgICB9XG59XG5cbmNvbnN0IGRlZmF1bHQ0MDQ6IFBhZ2UgPSB7XG4gICAgdGl0bGU6IFwiNDA0IE5vdCBGb3VuZFwiLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJoMVwiLFxuICAgICAgICAgICAgdGV4dDogXCI0MDQgLSBOb3QgRm91bmRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcInBcIixcbiAgICAgICAgICAgIHRleHQ6IFwiVGhpcyBwYWdlIHdhcyBub3QgZm91bmRcIlxuICAgICAgICB9XG4gICAgXVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb3dFZmZvcnRGcm9udEVuZCB7XG4gICAgc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnO1xuXG4gICAgY29uc3RydWN0b3Ioc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3RhcnQgTG93IEVmZm9ydCBGcm9udCBFbmQgLSBodHRwczovL2dpdGh1Yi5jb20vaTVoZXUvbG93LWVmZm9ydC1mcm9udC1lbmQtanNcIik7XG4gICAgICAgIFxuICAgICAgICBpZighc3RhcnRDb25maWcucGFnZXNbNDA0XSl7XG4gICAgICAgICAgICBzdGFydENvbmZpZy5wYWdlc1s0MDRdID0gZGVmYXVsdDQwNDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zdGFydENvbmZpZyA9IHN0YXJ0Q29uZmlnO1xuXG4gICAgICAgIG5ldyBSb3V0ZXIoc3RhcnRDb25maWcpO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9
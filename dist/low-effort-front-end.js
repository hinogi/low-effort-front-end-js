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
        if (element.className)
            el.className = element.className;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Mb3dFZmZvcnRGcm9udEVuZC8uL3NyYy9SZW5kZXJQYWdlLnRzIiwid2VicGFjazovL0xvd0VmZm9ydEZyb250RW5kLy4vc3JjL3JvdXRlci50cyIsIndlYnBhY2s6Ly9Mb3dFZmZvcnRGcm9udEVuZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Mb3dFZmZvcnRGcm9udEVuZC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTG93RWZmb3J0RnJvbnRFbmQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Mb3dFZmZvcnRGcm9udEVuZC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0xvd0VmZm9ydEZyb250RW5kLy4vc3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBSU8sTUFBTSxVQUFVO0lBT25CLFlBQVksV0FBd0IsRUFBRSxJQUFZLEVBQUUsTUFBYztRQUM5RCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxHQUFtQixRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQztRQUVoRixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1FBRTVFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFB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QUVELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBRS9CLElBQUksMkNBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0oiLCJmaWxlIjoibG93LWVmZm9ydC1mcm9udC1lbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy90eXBlc2NyaXB0L2xpYi90eXBlc2NyaXB0XCI7XG5pbXBvcnQgeyBQYWdlRWxlbWVudCwgUGFnZSwgU3RhcnRDb25maWcgfSBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiLi9yb3V0ZXJcIjtcblxuZXhwb3J0IGNsYXNzIFJlbmRlclBhZ2Uge1xuICAgIHN0YXJ0Q29uZmlnOiBTdGFydENvbmZpZztcbiAgICBoYXNoOiBzdHJpbmdcbiAgICBkb206IEhUTUxEaXZFbGVtZW50XG4gICAgcGFnZTogUGFnZVxuICAgIHJvdXRlcjogUm91dGVyXG5cbiAgICBjb25zdHJ1Y3RvcihzdGFydENvbmZpZzogU3RhcnRDb25maWcsIGhhc2g6IHN0cmluZywgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgdGhpcy5zdGFydENvbmZpZyA9IHN0YXJ0Q29uZmlnO1xuICAgICAgICB0aGlzLmhhc2ggPSBoYXNoO1xuICAgICAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcbiAgICAgICAgdGhpcy5kb20gPSA8SFRNTERpdkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJMb3dFZmZvcnRGcm9udEVuZFwiKTtcbiAgICAgICAgaWYgKCF0aGlzLmRvbSkgdGhyb3cgbmV3IEVycm9yKFwiRE9NIGhhcyBubyBlbGVtZW50IHdpdGggSUQgJ0xvd0VmZm9ydEZyb250RW5kJ1wiKVxuXG4gICAgICAgIGlmICghdGhpcy5jaGVja0lmNDA0KGhhc2gpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVuZGVyUGFnZSBjYW5ub3QgcmVuZGVyIGEgcGFnZSB0aGF0IGRvc2Ugbm90IGV4aXN0c1wiKTtcblxuICAgICAgICB0aGlzLnBhZ2UgPSB0aGlzLnN0YXJ0Q29uZmlnLnBhZ2VzW2hhc2gucmVwbGFjZShcIiNcIiwgXCJcIildO1xuXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgY2hlY2tJZjQwNChoYXNoOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGhhc2ggPT0gXCIjNDA0XCIpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gISF0aGlzLnN0YXJ0Q29uZmlnLnBhZ2VzW2hhc2gucmVwbGFjZShcIiNcIiwgXCJcIildO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInRpdGxlXCIpLmlubmVyVGV4dCA9IHRoaXMucGFnZS50aXRsZTtcblxuICAgICAgICAvL2NvbnN0IGZyYWdtZW50ID0gbmV3IERvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0aGlzLnBhZ2UuY29udGVudCkge1xuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudENyZWF0b3IuZWxlbWVudChlbGVtZW50LCB0aGlzLnJvdXRlcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kb20uaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgdGhpcy5kb20uYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgIH1cbn1cblxuXG5jbGFzcyBlbGVtZW50Q3JlYXRvciB7XG4gICAgc3RhdGljIGVsZW1lbnQoZWxlbWVudDogUGFnZUVsZW1lbnQsIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50LnR5cGUpO1xuICAgICAgICBpZiAoZWxlbWVudC50ZXh0KSBlbC5pbm5lclRleHQgPSBlbGVtZW50LnRleHQ7XG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZSkgZWwuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWU7XG4gICAgICAgIGlmIChlbGVtZW50LmNsaWNrKSB0aGlzLmNyZWF0ZUNsaWNrTGlzdGVuZXIoZWxlbWVudCwgZWwsIHJvdXRlcik7XG5cbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVDbGlja0xpc3RlbmVyKGVsZW1lbnQ6IFBhZ2VFbGVtZW50LCBlbDogSFRNTEVsZW1lbnQsIHJvdXRlcjogUm91dGVyKSB7XG5cbiAgICAgICAgbGV0IGZ1bmM6IEZ1bmN0aW9uO1xuXG4gICAgICAgIHN3aXRjaCAoZWxlbWVudC5jbGljay50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiY3VzdG9tXCI6XG4gICAgICAgICAgICAgICAgZWwub25jbGljayA9IGZ1bmN0aW9uIChldjogUG9pbnRlckV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmFsKGVsZW1lbnQuY2xpY2suanMpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJyb3V0ZXJcIjpcbiAgICAgICAgICAgICAgICBlbC5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByb3V0ZXIuY2hhbmdlUGFnZShlbGVtZW50LmNsaWNrLmdvVG8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBTdGFydENvbmZpZyB9IGZyb20gXCIuL21haW5cIjtcbmltcG9ydCB7IFJlbmRlclBhZ2UgfSBmcm9tIFwiLi9SZW5kZXJQYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBSb3V0ZXIge1xuICAgIHN0YXJ0Q29uZmlnOiBTdGFydENvbmZpZztcblxuICAgIGNvbnN0cnVjdG9yKHN0YXJ0Q29uZmlnOiBTdGFydENvbmZpZykge1xuICAgICAgICB0aGlzLnN0YXJ0Q29uZmlnID0gc3RhcnRDb25maWc7XG5cbiAgICAgICAgaWYgKCF0aGlzLmhhc2ggfHwgdGhpcy5oYXNoID09IFwiXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzaCA9IHN0YXJ0Q29uZmlnLnN0YXJ0UGFnZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy9UT0RPIGdldCA0MDRcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tJZjQwNChsb2NhdGlvbi5oYXNoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFJlbmRlclBhZ2UobG9jYXRpb24uaGFzaCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmhhc2ggPSBcIiM0MDRcIjtcbiAgICAgICAgICAgIHRoaXMuaW5pdFJlbmRlclBhZ2UobG9jYXRpb24uaGFzaCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5pdFJlbmRlclBhZ2UobG9jYXRpb24uaGFzaCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNoYW5nZVBhZ2UobmV3SGFzaDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrSWY0MDQobmV3SGFzaCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFJlbmRlclBhZ2UobmV3SGFzaCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhhc2ggPSBcIiM0MDRcIjtcbiAgICAgICAgdGhpcy5pbml0UmVuZGVyUGFnZShsb2NhdGlvbi5oYXNoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hlY2tJZjQwNChoYXNoOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGhhc2ggPT0gXCIjNDA0XCIpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gISF0aGlzLnN0YXJ0Q29uZmlnLnBhZ2VzW2hhc2gucmVwbGFjZShcIiNcIiwgXCJcIildO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFJlbmRlclBhZ2UoaGFzaDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGFzaCBjaGFuZ2VcIilcbiAgICAgICAgbmV3IFJlbmRlclBhZ2UodGhpcy5zdGFydENvbmZpZywgaGFzaCwgdGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0IGhhc2goKSB7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5oYXNoXG4gICAgfVxuXG4gICAgc2V0IGhhc2gobmV3SGFzaCkge1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2tJZjQwNChuZXdIYXNoKSlcbiAgICAgICAgICAgIG5ld0hhc2ggPSBcIiM0MDRcIjtcblxuICAgICAgICBpZiAoaGlzdG9yeS5wdXNoU3RhdGUpIHtcbiAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIG5ld0hhc2gpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IG5ld0hhc2g7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiLi9yb3V0ZXJcIjtcblxuXG5leHBvcnQgdHlwZSBQYXRoID0gc3RyaW5nO1xuXG5leHBvcnQgaW50ZXJmYWNlIENsaWNrIHtcbiAgICB0eXBlOiBcInJvdXRlclwifFwic3VibWl0XCJ8XCJjdXN0b21cIixcbiAgICBnb1RvPzogc3RyaW5nLFxuICAgIGpzPzogc3RyaW5nLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2VFbGVtZW50IHtcbiAgICB0eXBlOiBcImgxXCJ8XCJwXCJ8XCJidXR0b25cIixcbiAgICB0ZXh0Pzogc3RyaW5nLFxuICAgIGNsYXNzTmFtZT86IHN0cmluZyxcbiAgICBjbGljaz86IENsaWNrXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZSB7XG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBjb250ZW50OiBBcnJheTxQYWdlRWxlbWVudD5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGFydENvbmZpZyB7XG4gICAgc3RhcnRQYWdlOiBQYXRoLFxuICAgIGFub255bVN0YXRpc3RpY3M6IGJvb2xlYW4sXG4gICAgcGFnZXM6IHtcbiAgICAgICAgW25hbWU6IHN0cmluZ106IFBhZ2VcbiAgICB9XG59XG5cbmNvbnN0IGRlZmF1bHQ0MDQ6IFBhZ2UgPSB7XG4gICAgdGl0bGU6IFwiNDA0IE5vdCBGb3VuZFwiLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJoMVwiLFxuICAgICAgICAgICAgdGV4dDogXCI0MDQgLSBOb3QgRm91bmRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcInBcIixcbiAgICAgICAgICAgIHRleHQ6IFwiVGhpcyBwYWdlIHdhcyBub3QgZm91bmRcIlxuICAgICAgICB9XG4gICAgXVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb3dFZmZvcnRGcm9udEVuZCB7XG4gICAgc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnO1xuXG4gICAgY29uc3RydWN0b3Ioc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3RhcnQgTG93IEVmZm9ydCBGcm9udCBFbmQgLSBodHRwczovL2dpdGh1Yi5jb20vaTVoZXUvbG93LWVmZm9ydC1mcm9udC1lbmQtanNcIik7XG4gICAgICAgIFxuICAgICAgICBpZighc3RhcnRDb25maWcucGFnZXNbNDA0XSl7XG4gICAgICAgICAgICBzdGFydENvbmZpZy5wYWdlc1s0MDRdID0gZGVmYXVsdDQwNDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zdGFydENvbmZpZyA9IHN0YXJ0Q29uZmlnO1xuXG4gICAgICAgIG5ldyBSb3V0ZXIoc3RhcnRDb25maWcpO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9
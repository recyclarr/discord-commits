/******/ var __webpack_modules__ = ({

/***/ 558:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var map = {
	"./author-with-link.mjs": [
		240,
		240
	],
	"./avatar-with-link.mjs": [
		266,
		266
	],
	"./plain-author.mjs": [
		180,
		263
	],
	"./plain.mjs": [
		263,
		705
	],
	"./simple-link.mjs": [
		619,
		619
	]
};
function webpackAsyncContext(req) {
	if(!__nccwpck_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __nccwpck_require__.e(ids[1]).then(() => {
		return __nccwpck_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 558;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 320:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 280:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 161:
/***/ ((module) => {

module.exports = eval("require")("node-fetch");


/***/ }),

/***/ 720:
/***/ ((module) => {

module.exports = eval("require")("stjs");


/***/ }),

/***/ 313:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "$M": () => (/* binding */ parseTemplate),
/* harmony export */   "$k": () => (/* binding */ loadTemplate),
/* harmony export */   "hb": () => (/* binding */ stringToBoolean),
/* harmony export */   "rN": () => (/* binding */ createCommit),
/* harmony export */   "yC": () => (/* binding */ stringOrFalse)
/* harmony export */ });
/* harmony import */ var stjs__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(720);


async function loadTemplate(name) {
    try {
        return (await __nccwpck_require__(558)(`./${name}.mjs`)).default
    } catch (err) {
        return (await __nccwpck_require__.e(/* import() */ 705).then(__nccwpck_require__.bind(__nccwpck_require__, 263))).default
    }
}

function stringToBoolean(string) {
    switch (string.toLowerCase().trim()) {
        case "false": case "no": case "0": case "": case null: return false;
        default: return true;
    }
}

function stringOrFalse(string) {
    switch (string.toLowerCase().trim()) {
        case "false": case "no": case "0": case "": case null: return false;
        default: return string;
    }
}

function createCommit(commit) {
    const messageSections = commit.message.split("\n\n")
    return {
        title: messageSections[0],
        description: messageSections.slice(1).join("\n\n"),
        ...commit
    }
}

function parseTemplate(data, template) {
    return stjs__WEBPACK_IMPORTED_MODULE_0__.select(data).transformWith(template).root()
}

/***/ }),

/***/ 576:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
    {
        author: {
            email: "email@example.com",
            name: "Broken",
            username: "503 Action Failure",
        },
        message: "If you see this, you most likely did not setup your action right. This means no commits were found in the github context and somehow a commit event was triggered.",
    },
    {
        author: {
            email: "email@example.com",
            name: "Broken",
            username: "503 Action Failure",
        },
        message:
            "optionally you can use this array for basic testing. for example: \n" +
            "\n" +
            "**What is new?**\n" +
            "I'm testing out some capability.\n" +
            "~what do you think?~\n" +
            "```js\n" +
            "console.log('asdf');\n" +
            "```",
    },
]);

/***/ }),

/***/ 482:
/***/ ((__webpack_module__, __unused_webpack___webpack_exports__, __nccwpck_require__) => {

__nccwpck_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(320);
/* harmony import */ var _actions_github__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(280);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_2__ = __nccwpck_require__(161);
/* harmony import */ var _api_mjs__WEBPACK_IMPORTED_MODULE_3__ = __nccwpck_require__(313);
/* harmony import */ var _defaults_payload_commits_mjs__WEBPACK_IMPORTED_MODULE_4__ = __nccwpck_require__(576);






const templateName = _actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput("template") || "plain";
const template = await (0,_api_mjs__WEBPACK_IMPORTED_MODULE_3__/* .loadTemplate */ .$k)(templateName)
const message = _actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput("message") || template.message
const webhook = _actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput("webhook");
const lastCommitOnly = (0,_api_mjs__WEBPACK_IMPORTED_MODULE_3__/* .stringToBoolean */ .hb)(_actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput("last-commit-only"))
const extraEmbeds = (0,_api_mjs__WEBPACK_IMPORTED_MODULE_3__/* .stringToBoolean */ .hb)(_actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput("include-extras")) ? template.extras || [] : []
const embed = (0,_api_mjs__WEBPACK_IMPORTED_MODULE_3__/* .stringOrFalse */ .yC)(_actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput("embed")) || JSON.stringify(template.embed)
const commitFilters = _actions_core__WEBPACK_IMPORTED_MODULE_0__.getMultilineInput("commit-filters").map(x => new RegExp(x))

const DATA = {
  env: { ...process.env },
  github: { ..._actions_github__WEBPACK_IMPORTED_MODULE_1__ },
}

async function main() {
  _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.payload.commits ??= _defaults_payload_commits_mjs__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z

  if (lastCommitOnly) {
    _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.payload.commits = _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.payload.commits.slice(-1)
  }

  if (commitFilters.length !== 0) {
    console.log(`Filters: ${commitFilters}`)
    _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.payload.commits = _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.payload.commits.filter(commit => {
      const messageSubject = commit.message.split('\n')[0];
      return commitFilters.some(x => x.test(messageSubject))
    })
  }

  // If commits are empty, bail out and do nothing.
  if (_actions_github__WEBPACK_IMPORTED_MODULE_1__.context.payload.commits.length === 0) {
    return
  }

  let embeds = _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.payload.commits.map(commit => {
    return (0,_api_mjs__WEBPACK_IMPORTED_MODULE_3__/* .parseTemplate */ .$M)({
      ...DATA,
      commit: (0,_api_mjs__WEBPACK_IMPORTED_MODULE_3__/* .createCommit */ .rN)(commit),
    }, JSON.parse(embed));
  })

  embeds = embeds.concat(extraEmbeds.map(embed => (0,_api_mjs__WEBPACK_IMPORTED_MODULE_3__/* .parseTemplate */ .$M)(DATA, embed)))

  const payload = {
    content: (0,_api_mjs__WEBPACK_IMPORTED_MODULE_3__/* .parseTemplate */ .$M)(DATA, message),
    embeds: embeds.filter(x => x)
  }

  try {
    await node_fetch__WEBPACK_IMPORTED_MODULE_2__(`${webhook}?wait=true`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Event": "push",
      },
      body: JSON.stringify(payload)
    })
  } catch (err) {
    console.error(err)
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.error(err)
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed(
      "Message :",
      err.response ? err.response.data : err.message
    );
  }
}

await main()

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/******/ // expose the modules object (__webpack_modules__)
/******/ __nccwpck_require__.m = __webpack_modules__;
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/async module */
/******/ (() => {
/******/ 	var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 	var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 	var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 	var resolveQueue = (queue) => {
/******/ 		if(queue && !queue.d) {
/******/ 			queue.d = 1;
/******/ 			queue.forEach((fn) => (fn.r--));
/******/ 			queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 		}
/******/ 	}
/******/ 	var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 		if(dep !== null && typeof dep === "object") {
/******/ 			if(dep[webpackQueues]) return dep;
/******/ 			if(dep.then) {
/******/ 				var queue = [];
/******/ 				queue.d = 0;
/******/ 				dep.then((r) => {
/******/ 					obj[webpackExports] = r;
/******/ 					resolveQueue(queue);
/******/ 				}, (e) => {
/******/ 					obj[webpackError] = e;
/******/ 					resolveQueue(queue);
/******/ 				});
/******/ 				var obj = {};
/******/ 				obj[webpackQueues] = (fn) => (fn(queue));
/******/ 				return obj;
/******/ 			}
/******/ 		}
/******/ 		var ret = {};
/******/ 		ret[webpackQueues] = x => {};
/******/ 		ret[webpackExports] = dep;
/******/ 		return ret;
/******/ 	}));
/******/ 	__nccwpck_require__.a = (module, body, hasAwait) => {
/******/ 		var queue;
/******/ 		hasAwait && ((queue = []).d = 1);
/******/ 		var depQueues = new Set();
/******/ 		var exports = module.exports;
/******/ 		var currentDeps;
/******/ 		var outerResolve;
/******/ 		var reject;
/******/ 		var promise = new Promise((resolve, rej) => {
/******/ 			reject = rej;
/******/ 			outerResolve = resolve;
/******/ 		});
/******/ 		promise[webpackExports] = exports;
/******/ 		promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 		module.exports = promise;
/******/ 		body((deps) => {
/******/ 			currentDeps = wrapDeps(deps);
/******/ 			var fn;
/******/ 			var getResult = () => (currentDeps.map((d) => {
/******/ 				if(d[webpackError]) throw d[webpackError];
/******/ 				return d[webpackExports];
/******/ 			}))
/******/ 			var promise = new Promise((resolve) => {
/******/ 				fn = () => (resolve(getResult));
/******/ 				fn.r = 0;
/******/ 				var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 				currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 			});
/******/ 			return fn.r ? promise : getResult();
/******/ 		}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 		queue && (queue.d = 0);
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__nccwpck_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/ensure chunk */
/******/ (() => {
/******/ 	__nccwpck_require__.f = {};
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__nccwpck_require__.e = (chunkId) => {
/******/ 		return Promise.all(Object.keys(__nccwpck_require__.f).reduce((promises, key) => {
/******/ 			__nccwpck_require__.f[key](chunkId, promises);
/******/ 			return promises;
/******/ 		}, []));
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/get javascript chunk filename */
/******/ (() => {
/******/ 	// This function allow to reference async chunks
/******/ 	__nccwpck_require__.u = (chunkId) => {
/******/ 		// return url for filenames based on template
/******/ 		return "" + chunkId + ".index.mjs";
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__nccwpck_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/******/ /* webpack/runtime/import chunk loading */
/******/ (() => {
/******/ 	// no baseURI
/******/ 	
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		179: 0
/******/ 	};
/******/ 	
/******/ 	var installChunk = (data) => {
/******/ 		var {ids, modules, runtime} = data;
/******/ 		// add "modules" to the modules object,
/******/ 		// then flag all "ids" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0;
/******/ 		for(moduleId in modules) {
/******/ 			if(__nccwpck_require__.o(modules, moduleId)) {
/******/ 				__nccwpck_require__.m[moduleId] = modules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(runtime) runtime(__nccwpck_require__);
/******/ 		for(;i < ids.length; i++) {
/******/ 			chunkId = ids[i];
/******/ 			if(__nccwpck_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				installedChunks[chunkId][0]();
/******/ 			}
/******/ 			installedChunks[ids[i]] = 0;
/******/ 		}
/******/ 	
/******/ 	}
/******/ 	
/******/ 	__nccwpck_require__.f.j = (chunkId, promises) => {
/******/ 			// import() chunk loading for javascript
/******/ 			var installedChunkData = __nccwpck_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 			if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 	
/******/ 				// a Promise means "currently loading".
/******/ 				if(installedChunkData) {
/******/ 					promises.push(installedChunkData[1]);
/******/ 				} else {
/******/ 					if(true) { // all chunks have JS
/******/ 						// setup Promise in chunk cache
/******/ 						var promise = import("./" + __nccwpck_require__.u(chunkId)).then(installChunk, (e) => {
/******/ 							if(installedChunks[chunkId] !== 0) installedChunks[chunkId] = undefined;
/******/ 							throw e;
/******/ 						});
/******/ 						var promise = Promise.race([promise, new Promise((resolve) => (installedChunkData = installedChunks[chunkId] = [resolve]))])
/******/ 						promises.push(installedChunkData[1] = promise);
/******/ 					} else installedChunks[chunkId] = 0;
/******/ 				}
/******/ 			}
/******/ 	};
/******/ 	
/******/ 	// no external install chunk
/******/ 	
/******/ 	// no on chunks loaded
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module used 'module' so it can't be inlined
/******/ var __webpack_exports__ = __nccwpck_require__(482);
/******/ __webpack_exports__ = await __webpack_exports__;
/******/ 

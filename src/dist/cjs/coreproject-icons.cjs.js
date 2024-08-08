'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d67e527c.js');
const appGlobals = require('./app-globals-3a1e7e63.js');

/*
 Stencil Client Patch Browser v4.20.0 | MIT Licensed | https://stenciljs.com
 */
var patchBrowser = () => {
  const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('coreproject-icons.cjs.js', document.baseURI).href));
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return index.promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["coreproject-icon-arrow.cjs",[[1,"coreproject-icon-arrow",{"variant":[1],"width":[1],"height":[1],"_style":[16]}]]],["coreproject-logo-anime-core.cjs",[[1,"coreproject-logo-anime-core"]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=coreproject-icons.cjs.js.map
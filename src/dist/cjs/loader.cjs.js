'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d67e527c.js');
const appGlobals = require('./app-globals-3a1e7e63.js');

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["coreproject-icon-arrow.cjs",[[1,"coreproject-icon-arrow",{"variant":[1],"width":[1],"height":[1],"_style":[16]}]]],["coreproject-logo-anime-core.cjs",[[1,"coreproject-logo-anime-core"]]]], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map
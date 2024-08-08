import { p as promiseResolve, b as bootstrapLazy } from './index-3d039e81.js';
export { s as setNonce } from './index-3d039e81.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v4.20.0 | MIT Licensed | https://stenciljs.com
 */
var patchBrowser = () => {
  const importMeta = import.meta.url;
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await globalScripts();
  return bootstrapLazy([["coreproject-icon-arrow",[[1,"coreproject-icon-arrow",{"variant":[1],"width":[1],"height":[1],"_style":[16]}]]],["coreproject-logo-anime-core",[[1,"coreproject-logo-anime-core"]]]], options);
});

//# sourceMappingURL=coreproject-icons.js.map
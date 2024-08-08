import { b as bootstrapLazy } from './index-3d039e81.js';
export { s as setNonce } from './index-3d039e81.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy([["coreproject-icon-arrow",[[1,"coreproject-icon-arrow",{"variant":[1],"width":[1],"height":[1],"_style":[16]}]]],["coreproject-logo-anime-core",[[1,"coreproject-logo-anime-core"]]]], options);
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map
/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "./stencil-public-runtime";
export namespace Components {
    interface CoreprojectIconArrow {
        "_style": { [key: string]: string };
        "height": string;
        "variant": 'outline' | 'fill';
        "width": string;
    }
    interface CoreprojectLogoAnimeCore {
    }
}
declare global {
    interface HTMLCoreprojectIconArrowElement extends Components.CoreprojectIconArrow, HTMLStencilElement {
    }
    var HTMLCoreprojectIconArrowElement: {
        prototype: HTMLCoreprojectIconArrowElement;
        new (): HTMLCoreprojectIconArrowElement;
    };
    interface HTMLCoreprojectLogoAnimeCoreElement extends Components.CoreprojectLogoAnimeCore, HTMLStencilElement {
    }
    var HTMLCoreprojectLogoAnimeCoreElement: {
        prototype: HTMLCoreprojectLogoAnimeCoreElement;
        new (): HTMLCoreprojectLogoAnimeCoreElement;
    };
    interface HTMLElementTagNameMap {
        "coreproject-icon-arrow": HTMLCoreprojectIconArrowElement;
        "coreproject-logo-anime-core": HTMLCoreprojectLogoAnimeCoreElement;
    }
}
declare namespace LocalJSX {
    interface CoreprojectIconArrow {
        "_style"?: { [key: string]: string };
        "height"?: string;
        "variant"?: 'outline' | 'fill';
        "width"?: string;
    }
    interface CoreprojectLogoAnimeCore {
    }
    interface IntrinsicElements {
        "coreproject-icon-arrow": CoreprojectIconArrow;
        "coreproject-logo-anime-core": CoreprojectLogoAnimeCore;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "coreproject-icon-arrow": LocalJSX.CoreprojectIconArrow & JSXBase.HTMLAttributes<HTMLCoreprojectIconArrowElement>;
            "coreproject-logo-anime-core": LocalJSX.CoreprojectLogoAnimeCore & JSXBase.HTMLAttributes<HTMLCoreprojectLogoAnimeCoreElement>;
        }
    }
}

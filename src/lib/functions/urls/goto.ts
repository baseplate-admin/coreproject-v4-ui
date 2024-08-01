import * as _ from "lodash-es";
import htmx from "htmx.org"

function handle_404() {
    goto({ url: "/404", target: "body", verb: "GET" });
}

function handle_500() {
    goto({ url: "/500", target: "body", verb: "GET" });
}


export async function goto({
    url,
    verb,
    target,
    anchor = null,
    history = true
}: {
    url: string;
    history?: boolean;
    anchor?: HTMLElement | null | undefined;
    verb: "GET" | "POST" | "DELETE" | "PUT";
    target: string;
}): Promise<void> {
    // In case of empty url, send user to 404 page
    if (_.isEmpty(url)) {
        handle_404();
    }

    // WHAT KIND OF FUCKERY IS THIS
    // FUCK HTMX
    // related : https://github.com/bigskysoftware/htmx/discussions/2116
    // related : https://www.reddit.com/r/htmx/comments/18np8pk/how_to_make_ajax_update_the_history_cache/
    const btn = document.createElement("button");
    btn.setAttribute(`hx-${verb?.toLowerCase()}`, url);
    btn.setAttribute("hx-target", target);
    // Push in case of history
    if (history) {
        btn.setAttribute("hx-push-url", url);
    }

    // Hide Button
    btn.style.display = "none";
    // Add `htmx` listener
    htmx.process(btn);
    let _anchor: HTMLElement | null = null;

    if (!_.isNull(anchor) && !_.isUndefined(anchor)) {
        _anchor = anchor as HTMLElement;
    } else {
        _anchor = document.body as HTMLElement;
    }

    // Redirect to 404 page in case of error
    btn.addEventListener("htmx:afterRequest", (event: any) => {
        if (event.detail.failed) {
            switch (event.detail.xhr.status) {
                case 404:
                    handle_404();
                    break;
                case 500:
                    handle_500();
                    break;
            }
        }
    });

    try {
        _anchor?.appendChild(btn);
        btn.click();
    } catch {
        throw new Error("Cannot click button");
    } finally {
        _anchor?.removeChild(btn);
    }
}
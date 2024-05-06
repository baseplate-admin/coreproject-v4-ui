<!-- <script lang="ts">
    import { beforeUpdate } from "svelte";
    import { OpengraphGenerator } from "$functions/opengraph";
    import { page } from "$app/stores";

    beforeUpdat React.createElement(async () => {
        // @ts-ignore
        await import("@stoplight/elements/web-components.min.js");
        await import("@stoplight/elements/styles.min.css");
    });

    const opengraph = new OpengraphGenerator({
        title: "Stoplight | CoreProject",
        url: $page.url.href,
        description: "Explore backend of coreproject",
        site_name: "CoreProject",
        locale: "en_US",
        image_url: ""
    }).generate_opengraph();
</script>

<svelte:head>
    {@html opengraph}
</svelte:head>

<elements-api
    data-theme="dark"
    class="w-screen"
    apiDescriptionUrl="/openapi/schema.yaml"
    router="hash"
    layout="sidebar"
/> -->

<script lang="ts">
	import { OpengraphGenerator } from "$functions/opengraph";
	import { page } from "$app/stores";
	import "@stoplight/elements/styles.min.css";

	import React from "react";
	import { API } from "@stoplight/elements";
	import { createRoot } from "react-dom/client";

	const e = React.createElement;
	class Documentation extends React.Component {
		render() {
			return React.createElement(
				"div",
				{ className: "w-screen" },
				React.createElement(API, {
					router: "hash",
					layout: "sidebar",
					apiDescriptionUrl: "/openapi/schema.yaml"
				})
			);
		}
	}
	let container: HTMLDivElement;
	$effect(() => {
		createRoot(container).render(React.createElement(Documentation));
	});
</script>

<svelte:head>
	{@html new OpengraphGenerator({
		title: "Stoplight | CoreProject",
		url: $page.url.href,
		description: "Explore backend of coreproject",
		site_name: "CoreProject",
		locale: "en_US",
		image_url: ""
	}).generate_opengraph()}
</svelte:head>

<main>
	<div bind:this={container}></div>
</main>

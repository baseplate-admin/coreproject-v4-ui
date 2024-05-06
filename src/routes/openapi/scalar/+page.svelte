<script lang="ts">
	import React from "react";
	import { ApiReferenceReact } from "@scalar/api-reference-react";
	import { createRoot } from "react-dom/client";

	class Documentation extends React.Component {
		render() {
			return React.createElement(
				"div",
				{ className: "w-screen" },
				React.createElement(ApiReferenceReact, {
					// This entire thing is a hack, if it works why complain
					// @ts-ignore
					spec: {
						url: "/openapi/schema.yaml"
					}
				})
			);
		}
	}
	let container: HTMLDivElement;
	$effect(() => {
		createRoot(container).render(React.createElement(Documentation));
	});
</script>

<main>
	<div bind:this={container}></div>
</main>

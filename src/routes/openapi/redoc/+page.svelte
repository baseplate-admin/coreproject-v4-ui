<script lang="ts">
	import React from "react";
	import { RedocStandalone } from "redoc";
	import { createRoot } from "react-dom/client";

	class Documentation extends React.Component {
		render() {
			return React.createElement(
				"div",
				{ className: "w-screen" },
				React.createElement(RedocStandalone, {
					specUrl: "/openapi/schema.yaml",
					options: {
						nativeScrollbars: true
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

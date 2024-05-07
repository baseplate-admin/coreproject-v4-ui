<script lang="ts">
	const register_rapidoc = async () => {
		// @ts-ignore
		await import("rapidoc");
	};
	$effect.pre(() => {
		register_rapidoc().then(() => {
			console.log("Registered Rapidoc");
		});
	});
</script>

<rapi-doc
	spec-url="/openapi/schema.yaml"
	render-style="read"
	style={{ height: "100vh", width: "100%" }}
></rapi-doc>

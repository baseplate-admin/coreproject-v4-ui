<script lang="ts">
	import { page } from "$app/stores";

	const API_URL = new URL($page.url.hostname + "/api/colorthief");

	let { url }: { url: string } = $props();

	API_URL.searchParams.append("url", url);

	const fetch_image = async () => {
		const res = await fetch(url);
		if (res.status != 200) throw new Error("Image is not loadable from server");

		const data = (await res.json()) as { colors: number[]; image: Uint8Array };
		const arrayBufferView = new Uint8Array(data.image);
		const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
		const image = URL.createObjectURL(blob);
		return image;
	};
</script>

{#await fetch_image()}
	<!-- loader ?  -->
{:then res}
	<img alt="" src={res} />
{:catch error}
	<!-- error -->
{/await}

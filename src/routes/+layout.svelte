<script lang="ts">
	import { base } from '$app/paths';
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon.ico" />
</svelte:head>

{@render children()}

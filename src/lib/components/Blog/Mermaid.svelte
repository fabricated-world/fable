<script lang="ts">
	import { fade } from 'svelte/transition';
	import { mermaidRendered } from '$lib/stores';
	import { theme } from '$lib/themes';

	import Skeleton from '$lib/components/Skeleton.svelte';
	import MermaidRenderer from '$lib/components/Blog/MermaidRenderer.svelte';

	let current_theme: String;
	let force_reloaded = false;

	theme.subscribe((theme) => {
		if (theme) {
			force_reloaded = true;
			setTimeout(() => {
				current_theme = theme;
				force_reloaded = false;
			}, 1000);
		}
	});
</script>

<div class="container">
	<div
		in:fade={{ delay: 1000, duration: 300 }}
		style="display: {$mermaidRendered ? 'block' : 'none'}"
	>
		{#if !force_reloaded}
			<MermaidRenderer {current_theme}>
				<slot />
			</MermaidRenderer>
		{/if}
	</div>
	{#if !$mermaidRendered}
		<div out:fade={{ duration: 300 }} class="placeholder">
			<Skeleton />
		</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.placeholder {
		position: absolute;
		display: flex;
		flex-grow: 1;
		height: 100%;
		width: 100%;
		justify-content: center;
		align-items: center;
		padding: var(--size-8);
	}
</style>

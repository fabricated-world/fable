<script lang="ts">
	export let url: string;
	export let logo: string;
	export let alt: string;
	export let text: string;
	export let back_color: string = 'var(--background)';
	export let text_color: string = 'var(--text-1)';

	export let style: string = '';
	style = `--component-back-color: ${back_color}; --component-text-color: ${text_color};` + style;

	import * as icons from 'lucide-svelte';
</script>

<a href={url} target="_blank" {style}>
	{#if logo.startsWith('icon:')}
		<svelte:component this={icons[logo.replace('icon:', '')]} />
	{:else}
		<img src={logo} {alt} />
	{/if}
	{@html text}
</a>

<style>
	a {
		background: var(--component-back-color);
		color: var(--component-text-color);
		text-decoration: none;

		height: var(--size-8);
		min-width: var(--size-13);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: var(--size-3);
		overflow: hidden;

		border-radius: 5px;
		padding: 0.75rem var(--size-fluid-3);

		font-weight: var(--font-weight-9);
	}

	img {
		height: 100%;
	}
</style>

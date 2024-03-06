<script lang="ts">
	import { fly } from 'svelte/transition';
	import { theme, toggleTheme } from '$lib/themes';

	import { Moon, Sun } from 'lucide-svelte';
</script>

<button on:click={toggleTheme} aria-label="Toggle theme">
	{#if $theme === 'dark'}
		<div in:fly={{ y: 10 }}>
			<Moon />
			<span>Dark</span>
		</div>
	{:else}
		<div in:fly={{ y: -10 }}>
			<Sun />
			<span>Light</span>
		</div>
	{/if}
</button>

<style>
	button {
		padding: 0;
		font-weight: inherit;
		background: none;
		border: none;
		box-shadow: none;
		overflow: hidden;
	}

	button > * {
		display: flex;
		gap: var(--size-2);
	}
</style>

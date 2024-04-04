<script lang="ts">
	import { Menu, X, Home } from 'lucide-svelte';

	import * as env from '$env/static/public';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	import type { MenuItem } from '$lib/types.ts';

	export let links: MenuItem[] = [{ name: 'Home', path: '/', icon: Home }];
	let sidebar_opened = false;

	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<nav>
	{#if innerWidth < 768}
		<div
			aria-label="Open Sidebar"
			aria-pressed="false"
			role="button"
			tabindex="0"
			class="toggle"
			on:click={() => {
				sidebar_opened = !sidebar_opened;
			}}
			on:keydown={() => {
				sidebar_opened = !sidebar_opened;
			}}
		>
			<Menu />
		</div>
	{/if}
	<a href="/" class="title">{env.PUBLIC_NAME}</a>
	{#if innerWidth >= 768}
		<ul class="links">
			{#each links as link}
				<li>
					<a href={link.path}>
						{link.name}
					</a>
				</li>
			{/each}
		</ul>
	{/if}

	<ThemeToggle />
</nav>

{#if innerWidth < 768}
	<div class="sidebar" class:opened={sidebar_opened}>
		<div
			aria-label="Close Sidebar"
			aria-pressed="false"
			role="button"
			tabindex="0"
			class="toggle"
			style="margin-bottom: var(--size-3)"
			on:click={() => {
				sidebar_opened = !sidebar_opened;
			}}
			on:keydown={() => {
				sidebar_opened = !sidebar_opened;
			}}
		>
			<X style="width: var(--size-7)" />
		</div>

		<ul class="links">
			{#each links as link}
				<li>
					<a
						on:click={() => {
							sidebar_opened = false;
						}}
						href={link.path}
					>
						<span class="sidebar-icon"><svelte:component this={link.icon} /></span>
						{link.name}
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<!-- Close the sidebar on external click-->
	<div
		class="sidebar-overlay"
		class:opened={sidebar_opened}
		aria-label="Close Sidebar"
		aria-pressed="false"
		role="button"
		tabindex="0"
		on:click={() => {
			sidebar_opened = !sidebar_opened;
		}}
		on:keydown={() => {
			sidebar_opened = !sidebar_opened;
		}}
	/>
{/if}

<style>
	nav {
		padding: var(--size-7) var(--size-2);
		display: flex;
		justify-content: space-between;
	}

	.links {
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
	}

	a {
		color: inherit;
		text-decoration: none;
		font-size: var(--font-size-2);
	}

	li > a {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--size-2);
	}

	@media (min-width: 768px) {
		.links {
			flex-direction: row;
			gap: var(--size-7);
		}
	}

	.sidebar {
		position: fixed;
		left: calc(var(--size-14) * -1);
		top: 0;
		height: 100vh;
		width: var(--size-14);
		background: var(--surface-2);
		padding: var(--size-6);
		display: flex;
		flex-direction: column;
		gap: var(--size-4);
		transition-duration: 0.2s;
		z-index: 999;
	}

	.sidebar.opened {
		left: 0;
	}

	.sidebar a {
		font-size: var(--font-size-4);
	}

	.toggle {
		cursor: pointer;
	}

	.sidebar-icon {
		color: var(--text-2);
	}

	.sidebar-overlay {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 998;
		display: none;
	}

	.sidebar-overlay.opened {
		display: block;
	}
</style>

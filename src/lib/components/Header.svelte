<script>
	import * as env from '$env/static/public';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	export let links = [{ name: 'Home', path: '/' }];
</script>

<nav>
	<a href="/" class="title">{env.PUBLIC_NAME}</a>
	<ul class="links">
		{#each links as link}
			<li>
				<a href={link.path}>
					{link.name}
				</a>
			</li>
		{/each}
	</ul>

	<ThemeToggle />
</nav>

<style>
	nav {
		padding-block: var(--size-7);
	}

	.links {
		margin-block: var(--size-7);
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	@media (min-width: 768px) {
		nav {
			display: flex;
			justify-content: space-between;
		}

		.links {
			display: flex;
			gap: var(--size-7);
			margin-block: 0;
		}
	}
</style>

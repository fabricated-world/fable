<script lang="ts">
	import * as env from '$env/static/public';
	import { formatDate } from '$lib/utils/date';

	export let data;

	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	<title>{env.PUBLIC_BLOG_NAME}</title>
</svelte:head>

<section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				{#if innerWidth >= 1440}
					<img
						class="icon"
						src={post.icon ||
							'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='}
						alt=""
						loading="lazy"
					/>
					<div>
						<a href="/blog/{post.slug}" class="title">{post.title}</a>
						<p class="date">{formatDate(post.date)}</p>
						<p class="description">{post.description}</p>
					</div>
				{:else}
					<div>
						<a href="/blog/{post.slug}" class="title">{post.title}</a>
						<p class="date">{formatDate(post.date)}</p>
					</div>
					<div class="mobile-content">
						{#if post.icon}
							<img class="icon" src={post.icon} alt="" loading="lazy" />
						{/if}
						<p class="description">{post.description}</p>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</section>

<style>
	.posts {
		display: grid;
		gap: var(--size-7);
	}

	.post {
		max-inline-size: var(--size-content-3);
		display: flex;
		flex-direction: column;
		gap: var(--size-4);
		padding: var(--size-3);
	}

	@media (min-width: 1440px) {
		.post {
			flex-direction: row;
		}
	}

	.mobile-content {
		display: flex;
		flex-direction: row;
		gap: var(--size-3);
	}

	.post:not(:last-child) {
		border-bottom: 1px solid var(--border);
		padding-bottom: var(--size-7);
	}

	.icon {
		height: var(--size-12);
		width: var(--size-12);
		border-radius: var(--radius-3);
	}

	.title {
		font-size: var(--font-size-fluid-3);
		text-transform: capitalize;
	}

	.date {
		color: var(--text-2);
	}

	.description {
		margin-top: var(--size-3);
	}
</style>

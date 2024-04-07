<script lang="ts">
	import type { BlogPost } from '$lib/types';
	import { formatDate } from '$lib/utils/date';

	export let meta: BlogPost;
</script>

<article>
	<a href={'javascript:history.back()'}>⬅ go back</a>

	<hgroup>
		<h1>{meta.title}</h1>
		<p>Published on {formatDate(meta.date)} by {meta.author}.</p>
	</hgroup>

	<div class="tags">
		{#each meta.tags as tag}
			<span class="surface-4">#{tag}</span>
		{/each}
	</div>

	<div class="blog-content">
		<slot />
	</div>
</article>

<style>
	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
	}

	h1 {
		text-transform: capitalize;
	}

	h1 + p {
		margin-top: var(--size-2);
		color: var(--text-2);
	}

	a {
		color: var(--text-2);
	}

	.tags {
		display: flex;
		flex-flow: row wrap;
		gap: var(--size-2);
		margin-top: var(--size-3);
		margin-bottom: var(--size-4);
	}

	.tags > * {
		padding: var(--size-1) var(--size-3);
		border-radius: var(--radius-round);
		white-space: nowrap;
	}
</style>

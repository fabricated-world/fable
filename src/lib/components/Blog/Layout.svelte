<script lang="ts">
	import type { BlogPost } from '$lib/types';
	import { formatDate } from '$lib/utils/date';

	export let meta: BlogPost;
</script>

<article>
	<hgroup>
		<h1>{meta.title}</h1>
		<p>Published at {formatDate(meta.date)}</p>
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

	.tags {
		display: flex;
		flex-flow: row wrap;
		gap: var(--size-2);
		margin-top: var(--size-3);
	}

	.tags > * {
		padding: var(--size-1) var(--size-3);
		border-radius: var(--radius-round);
		white-space: nowrap;
	}
</style>

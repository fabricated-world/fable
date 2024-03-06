import { error } from '@sveltejs/kit';

import type { Post } from '$lib/types';

export async function load({ fetch, params }) {
	try {
		const postData: Post = await (await fetch(`/api/blog/posts/${params.slug}`)).json();
		const post = await import(`../../../posts/${postData.path}.md`);

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		throw error(404, `Could not find "${params.slug}"`);
	}
}

import { error } from '@sveltejs/kit';

import type { Post } from '$lib/types';

export async function load({ fetch, params }) {
	try {
		const postData: Post = await (await fetch(`/api/blog/post/${params.slug}`)).json();
		const post = await import(`@blogposts/${postData.path}.md`);

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		throw error(404, `Could not find "${params.slug}"`);
	}
}

import { json, error } from '@sveltejs/kit';

import { getPost } from '$lib/server/blog';

export async function GET({ params }) {
	const post = await getPost(params.slug);
	if (post) {
		return json(await getPost(params.slug));
	} else {
		throw error(404, `Could not find "${params.slug}"`);
	}
}

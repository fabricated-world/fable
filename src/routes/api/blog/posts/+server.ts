import { json } from '@sveltejs/kit';

import { getPosts } from '$lib/server/blog';

export async function GET() {
	return json(await getPosts());
}

export const prerender = true;

import * as env from '$env/static/public';
import type { Post } from '$lib/types';

export async function GET({ fetch, url }) {
	const response = await fetch('../api/blog/posts');
	const posts: Post[] = await response.json();

	const headers = { 'Content-Type': 'application/xml' };

	const xml = `
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>${env.PUBLIC_NAME} Blog</title>
    <description>${env.PUBLIC_DESCRIPTION}</description>
    <link>${url.origin + url.pathname}</link>
    <atom:link href="${url}" rel="self" type="application/rss+xml"/>
    ${posts
			.map((post) =>
				`
      <item>
        <title>${post.title}</title>
        <description>${post.description}</description>
        <link>${url.origin + '/blog'}/${post.slug}</link>
        <guid isPermaLink="true">${url.origin + '/blog'}/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>
    `.trim()
			)
			.join('\n    ')}
  </channel>
</rss>
	`.trim();

	return new Response(xml, { headers });
}

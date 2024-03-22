import { mdsvex, escapeSvelte } from 'mdsvex';
import { visit } from 'unist-util-visit';
import { codeToHtml } from 'shiki';
import { s } from 'hastscript';

import remarkGithubBlockquoteAdmonitions from 'remark-github-beta-blockquote-admonitions';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkReadingTime from 'mdsvex-reading-time';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex-svelte';
import rehypeSlug from 'rehype-slug';

async function highlighter(code, lang = 'text') {
	try {
		if (lang === 'mermaid') {
			return `<Components.Mermaid>{\`${code.trim().replaceAll('`', '\\`')}\`}</Components.Mermaid>`;
		} else {
			// Render other codeblocks using Shiki
			const html = escapeSvelte(
				await codeToHtml(code, {
					themes: {
						dark: 'catppuccin-mocha',
						light: 'catppuccin-latte'
					},
					defaultColor: false,
					lang
				})
			).replace('shiki shiki-themes', `shiki shiki-themes language-${lang}`);
			return `{@html \`${html}\`}`;
		}
	} catch (e) {
		return highlighter(code);
	}
}

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexConfigs = {
	extensions: ['.md'],
	layout: {
		_: './src/lib/components/Blog/Mdsvex.svelte'
	},
	highlight: { highlighter },
	remarkPlugins: [
		remarkGithubBlockquoteAdmonitions,
		remarkUnwrapImages,
		remarkReadingTime,
		remarkMath,
		remarkToc
	],
	rehypePlugins: [
		rehypeKatex,
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				properties: {
					class: 'header-link'
				},
				content: [
					s(
						'svg.autolink-svg',
						{
							xmlns: 'http://www.w3.org/2000/svg',
							width: 24,
							height: 24,
							fill: 'none',
							stroke: 'currentColor',
							'stroke-width': 2,
							'stroke-linecap': 'round',
							'stroke-linejoin': 'round',
							viewBox: '0 0 24 24'
						},
						s('path', {
							d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'
						}),
						s('path', {
							d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'
						})
					)
				]
			}
		]
	]
};

const mdsvexPreprocess = mdsvex(mdsvexConfigs);
export default mdsvexPreprocess;

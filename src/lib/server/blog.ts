import frontmatter from 'front-matter';
import type { BlogPost } from '$lib/types';

let posts_cache;
let knownSlugs: string[];

// Ensure that the slug is unique by adding an incremental number at the end
function generateUniqueSlug(slug: string) {
	let uniqueSlug = slug;
	let increment = 1;

	// Check if the original slug is already in the knownSlugs array
	while (knownSlugs.includes(uniqueSlug)) {
		// If it is, append an incrementing number to make it unique
		uniqueSlug = `${slug}-${increment}`;
		increment++;
	}

	knownSlugs.push(uniqueSlug);
	return uniqueSlug;
}

function slugify(path) {
	// make the slug url friendly
	let slug = path
		?.replace(/[^a-zA-Z0-9-_]/g, '-') //replace any illegal character with a '-'
		?.replace(/(-)\1+/g, '$1'); // delete any consecutive '-'.

	if (!slug) {
		slug = 'unknown'; //if the resulting string is undefined or empty because a weird markdown file made its way replace it with 'unknown'
	}
	//ensure that the slug is unique
	return generateUniqueSlug(slug, knownSlugs);
}

/* DISABLED; PARSER FOR Asciidoc
async function asciidocProcesser(path, data) {
	// import the raw file content and extract the metadata from the frontmatter
	let file = (await import(/* @vite-ignore */ /* path + '?raw')).default;
	let metadata: Omit<Omit<BlogPost, 'path'>, 'slug'> = frontmatter(file).attributes;

	// get the slug from the filename, delete the '.adoc' extension
	path = path.split('/').at(-1)?.slice(0, -5);

	let slug = slugify(path);

	if (slug && metadata) {
		return { slug, path: path + '.adoc', ...metadata } satisfies BlogPost;
	}
}
*/

async function markdownProcesser(path, data) {
	// get the slug from the filename, delete the '.md' extension
	path = path.split('/').at(-1)?.slice(0, -3);

	let slug = slugify(path);

	if (data && typeof data === 'object' && 'metadata' in data && slug) {
		const metadata = data.metadata as Omit<Omit<BlogPost, 'path'>, 'slug'>;
		// return the post object
		return { slug, path, ...metadata } satisfies BlogPost;
	}
}

async function fetchPosts() {
	const blogPaths = import.meta.glob(['/src/posts/*.md'], { eager: true }); // import.meta.glob is a vite utility, more info here: https://vitejs.dev/guide/features.html#glob-import

	knownSlugs = [];
	const posts: BlogPost[] = (
		await Promise.all(
			Object.keys(blogPaths).map((path) => {
				if (path.endsWith('.md')) {
					// Handle Markdown
					return markdownProcesser(path, blogPaths[path]);
				} /* else if (path.endsWith('.adoc')) {
					// handle Asciidoc
					return asciidocProcesser(path, blogPaths[path]);
				} else {
					// unsuported markup language
				}*/
			})
		)
	).filter((post): post is Post => !!post && post.published); // Type predicate to narrow down type

	// make the most recent posts first then return
	posts_cache = posts.sort((first, second) => {
		return new Date(second.date).getTime() - new Date(first.date).getTime();
	});

	return posts_cache;
}

export async function getPosts() {
	if (posts_cache) {
		return posts_cache;
	} else {
		return await fetchPosts();
	}
}

export async function getPost(slug) {
	return (await getPosts()).find((post) => post.slug == slug);
}

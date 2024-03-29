import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import mdsvex from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [preprocess(), mdsvex],
	kit: {
		adapter: adapter()
	}
};

export default config;

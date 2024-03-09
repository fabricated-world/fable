import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

import dynamicImport from 'vite-plugin-dynamic-import';
import path from 'path';

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

	console.log(process.env.BLOG_PATH);
	return defineConfig({
		plugins: [sveltekit(), dynamicImport()],
		ignore: ['**/*.adoc'],
		resolve: {
			alias: {
				'@blogposts': path.join(__dirname, process.env.BLOG_PATH)
			}
		},
		server: {
			fs: {
				// Allow serving files from one level up to the project root
				allow: ['.' + process.env.BLOG_PATH]
			}
		}
	});
};

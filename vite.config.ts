import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

import dynamicImport from 'vite-plugin-dynamic-import';
import path from 'path';
import fs from 'fs';

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

	!fs.existsSync(path.join(__dirname, "static", "blog")) && fs.symlinkSync(path.join(__dirname, process.env.BLOG_STATIC), path.join(__dirname, "static", "blog"), 'junction');
  
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
				allow: ['.' + process.env.BLOG_PATH, '.' + process.env.BLOG_STATIC]
			}
		},
        beforeBuild: [`node blogstatic.sync.js ${ path.join(__dirname, process.env.BLOG_STATIC)}`]
	});
};

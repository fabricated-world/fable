<script lang="ts">
	import * as env from '$env/static/public';
	import BlogLayout from '$lib/components/Blog/Layout.svelte';
	export let data;
</script>

<svelte:head>
	<title>{data.meta.title} - {env.PUBLIC_NAME}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{data.meta.title} - {env.PUBLIC_BLOG_NAME} Blog" />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
		integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
		crossorigin="anonymous"
	/>
</svelte:head>

<BlogLayout meta={data.meta}>
	<svelte:component this={data.content} />
</BlogLayout>

<script lang="ts">
	import * as env from '$env/static/public';
</script>

<h1>the {env.PUBLIC_NAME} project</h1>
<p>This website is still in early access so it's still missing a lot of features!</p>
<p>You can check out the <a href="/blog">Blog</a> section thought!</p>

<style>
	h1 {
		text-transform: capitalize;
	}
	h1 + p {
		font-weight: bold;
	}
</style>

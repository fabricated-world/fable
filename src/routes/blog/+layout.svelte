<script lang="ts">
	import mermaid from 'mermaid';
	import PageTransition from '$lib/components/Transitions/Fade.svelte';

	mermaid.initialize({
		theme: 'base',
		startOnLoad: false
	});

	export let data;
</script>

<PageTransition url={data.url}>
	<slot />
</PageTransition>

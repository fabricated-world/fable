<script lang="ts">
	import PageTransition from '$lib/components/Transitions/Fade.svelte';

	export let data;
</script>

<PageTransition url={data.url}>
	<slot />
</PageTransition>

<script lang="ts">
	import SocialCard from './SocialCard.svelte';

	import type { Social } from '$lib/types';
	export let socials: Social[];
	export let style: string = '';
</script>

<div {style}>
	{#each socials as social}
		<SocialCard
			text={social.text}
			url={social.url}
			logo={social.logo}
			alt={social.alt}
			back_color={social.back_color}
			text_color={social.text_color}
			style={social.style}
		/>
	{/each}
</div>

<style>
	div {
		width: fit-content;
		display: flex;
		flex-direction: column;
		gap: var(--size-7);
	}
</style>

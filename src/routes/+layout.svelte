<script>
	import 'open-props/style';
	import 'open-props/normalize';
	import 'open-props/buttons';

	import { Home, NotepadText } from 'lucide-svelte';

	import '../app.css';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="layout">
	<Header
		links={[
			{ name: 'Home', path: '/', icon: Home },
			{ name: 'Blog', path: '/blog', icon: NotepadText }
		]}
	/>

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	.layout {
		height: 100%;
		max-inline-size: 1440px;
		display: grid;
		grid-template-rows: auto 1fr auto;
		margin-inline: auto;
		padding-inline: var(--size-7);
	}

	main {
		padding-block: var(--size-9);
	}

	@media (min-width: 1440px) {
		.layout {
			padding-inline: 0;
		}
	}
</style>

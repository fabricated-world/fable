<script lang="ts">
	import { getColor } from '$lib/themes';
	import { browser } from '$app/environment';
	import { mermaidRendered } from '$lib/stores';

	import { onMount } from 'svelte';
	import mermaid from 'mermaid';

	onMount(() => {
		if (browser) {
			mermaidRendered.set(true);
			setTimeout(async () => {
				await mermaid.run();
			}, 0);
		}
	});

	export let current_theme: String;
</script>

<pre class="mermaid">
{#key current_theme}
		{`%%{
  init: {
    'theme': 'base',
    'themeVariables': {
      'darkMode': ${current_theme === 'dark'},
      'background': '${getColor('--surface-1') || '#f4f4f4'}',
      'primaryColor': '${getColor('--surface-2') || '#fff4dd'}',
      'primaryTextColor': '${getColor('--text-1') || (current_theme === 'dark' ? '#ddd' : '#333')}',
      'primaryBorderColor': '${getColor('--border') || '#eee'}',
      'secondaryColor': '${getColor('--surface-3') || '#fff4dd'}',
      'tertiaryColor': '${getColor('--surface-4') || '#fff4dd'}'
    }
  }
}%%`}
	{/key}
<slot />
</pre>

<style>
	.mermaid {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
</style>

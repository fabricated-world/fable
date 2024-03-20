<script lang="ts">
	export let width: string = '100%';
	export let height: string = '100%';
</script>

<div class="skeleton" style:width style:height />

<style>
	.skeleton {
		border-radius: var(--radius-3);
		animation: 1.5s linear infinite alternate blink;
	}

	@keyframes blink {
		from {
			background: var(--surface-2);
		}
		to {
			background: var(--surface-4);
		}
	}
</style>

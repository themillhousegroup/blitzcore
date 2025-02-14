<script lang="ts">
	import { Spring } from 'svelte/motion';

  type Props = {
    onNewGame: () => void;
  }
  const { onNewGame }: Props = $props();

	const count = new Spring(0);
	const offset = $derived(modulo(count.current, 1));

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<div class="rounds">
	
</div>

<style>
	.rounds {
		display: flex;
    flex-direction: column;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
    background-color: green;
	}
</style>

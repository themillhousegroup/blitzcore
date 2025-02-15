<script lang="ts">
	import { Spring } from 'svelte/motion';

  type Props = {
    onNewGame: () => void;
    onAddRound: () => void;
  }
  const { onNewGame, onAddRound }: Props = $props();

	const count = new Spring(0);
	const offset = $derived(modulo(count.current, 1));

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<div class="toolbar">
	<button onclick={onNewGame} aria-label="Start a new game">
		New Game
	</button>

	<button onclick={onAddRound} aria-label="Start a new game">
		Add Round
	</button>
</div>

<style>
	.toolbar {
		flex: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 1em;
		width: 100%;
		margin: 0;
		z-index: 50;
	}

	.toolbar button {
		flex: 1;
		padding: 4px;
		border: 1px;
		border-radius: 8px;
		margin: 4px;
		background-color: grey;
		touch-action: manipulation;
	}

	.toolbar button:hover {
		background-color: var(--color-bg-1);
	}

</style>

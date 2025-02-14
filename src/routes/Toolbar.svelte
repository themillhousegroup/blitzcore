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
		width: 100%;
		border-top: 1px solid green;
		border-bottom: 1px solid green;
		margin: 0;
		background-color: pink;
		z-index: 50;
	}

	.toolbar button {
		width: 5em;
		padding: 0;
		border: 1px;
		border-radius: 8px;
		background-color: grey;
		touch-action: manipulation;
		font-size: 2rem;
		
	}

	.toolbar button:hover {
		background-color: var(--color-bg-1);
	}

</style>

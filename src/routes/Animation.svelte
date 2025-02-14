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
	

	<div class="counter-viewport">
		<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
			<strong class="hidden" aria-hidden="true">{Math.floor(count.current + 1)}</strong>
			<strong>{Math.floor(count.current)}</strong>
		</div>
	</div>
</div>

<style>
	.toolbar {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	.toolbar button {
		width: 2em;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px;
		border-radius: 8px;
		background-color: grey;
		touch-action: manipulation;
		font-size: 2rem;
		
	}

	.toolbar button:hover {
		background-color: var(--color-bg-1);
	}

	.counter-viewport {
		width: 8em;
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>

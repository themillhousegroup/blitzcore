<script lang="ts">
	import type { Game } from '$lib';

	type Props = {
		existingGame: Game | undefined;
		onNewGame: () => void;
		onAddRound: () => void;
	};
	const { onNewGame, onAddRound }: Props = $props();
	function confirmNewGame() {
		if (confirm('Are you sure you want to start a new game?')) {
			onNewGame();
		}
	}
</script>

<div class="toolbar">
	<button onclick={confirmNewGame} aria-label="Start a new game"> New Game </button>

	<!-- todo: toggle between visual modes here -->

	<button onclick={onAddRound} aria-label="Start a new game"> Add Round </button>
</div>

<style>
	.toolbar {
		height: 10%;
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
	}

	.toolbar button:hover {
		background-color: var(--color-bg-1);
	}
</style>

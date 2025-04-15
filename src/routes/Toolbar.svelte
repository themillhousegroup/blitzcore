<script lang="ts">
	import type { RoundDisplayMode } from '$lib';
	type Props = {
		onNewGame: () => void;
		roundDisplayMode: RoundDisplayMode;
		onToggleDisplayMode: () => void;
		onAddRound: () => void;
	};
	const { onNewGame, onAddRound, roundDisplayMode, onToggleDisplayMode }: Props = $props();
</script>

<div class="toolbar">
	<button onclick={onNewGame} aria-label="Start a new game"> New Game </button>

	<button onclick={onToggleDisplayMode} aria-label="Toggle"> 
		{roundDisplayMode === "ROUND_DETAILS" ? "Show Totals" : "Show Details" }
	</button>

	<button onclick={onAddRound} aria-label="Start a new game"> Add Round </button>
</div>

<style>
	.toolbar {
		height: 7dvh;
		max-height: 7dvh;
		flex: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 1dvw;
		width: 100%;
		margin: 0;
		z-index: 50;
	}

	.toolbar button {
		flex: 1;
	}
</style>

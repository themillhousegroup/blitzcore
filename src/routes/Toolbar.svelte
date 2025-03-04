<script lang="ts">
	type Props = {
		onNewGame: () => void;
		onAddRound: () => void;
	};
	const { onNewGame, onAddRound }: Props = $props();
</script>

<div class="toolbar">
	<button onclick={onNewGame} aria-label="Start a new game"> New Game </button>

	<!-- todo: toggle between visual modes here -->

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
		gap: 1em;
		width: 100%;
		margin: 0;
		z-index: 50;
	}

	.toolbar button {
		flex: 1;
	}
</style>

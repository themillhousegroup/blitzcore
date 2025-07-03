<script lang="ts">
	import type { OutcomeRound, Player, RoundDisplayMode, EditCallback, SupportedPlayerArray } from '$lib';
	import Round from './Round.svelte';

	type Props = {
		players: SupportedPlayerArray;
		rounds: Array<OutcomeRound>;
		focusedRoundIndex: number;
		onCellClicked: EditCallback;
		roundDisplayMode: RoundDisplayMode;
	};
	const { players, rounds, focusedRoundIndex, onCellClicked, roundDisplayMode }: Props = $props();
</script>

<div class="rounds">
	{#each rounds as round, i}
		<Round
			roundNumber={i}
			{round}
			{rounds}
			{players}
			darker={i % 2 == 0}
			focused={i === focusedRoundIndex}
			onCellClicked={onCellClicked}
			{roundDisplayMode}
		/>
	{/each}
</div>

<style>
	.rounds {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		z-index: 50;
		max-height: 75dvh;
		overflow-y: scroll;
	}
</style>

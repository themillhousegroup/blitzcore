<script lang="ts">
	import type { OutcomeRound, Player } from '$lib';
	import Round from './Round.svelte';

	type Props = {
		players: Array<Player>;
		rounds: Array<OutcomeRound>;
		focusedRoundIndex: number;
		onRoundEdit: (roundNumber: number) => void;
	};
	const { players, rounds, focusedRoundIndex, onRoundEdit }: Props = $props();
</script>

<div class="rounds">
	{#each rounds as round, i}
		<Round
			roundNumber={i}
			{round}
			{players}
			darker={i % 2 == 0}
			focused={i === focusedRoundIndex}
			onRoundClicked={onRoundEdit}
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

<script lang="ts">
	import type { Player, OutcomeRound, RoundDisplayMode } from '$lib';
	import Headings from './Headings.svelte';
	import Rounds from './Rounds.svelte';
	import Totals from './Totals.svelte';

	type Props = {
		players: Array<Player>;
		rounds: Array<OutcomeRound>;
		focusedRoundIndex: number;
		onRoundEdit: (roundNumber: number) => void;
		roundDisplayMode: RoundDisplayMode;
	};
	const { players, rounds, focusedRoundIndex, onRoundEdit, roundDisplayMode }: Props = $props();
</script>

<div class="main">
	<Headings {players} />
	<Rounds {rounds} {players} {focusedRoundIndex} {onRoundEdit} {roundDisplayMode} />
	<Totals {players} {rounds} />
</div>

<style>
	.main {
		height: 93dvh;
		max-height: 93dvh;
		flex: 10;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		background-color: white;
	}
</style>

<script lang="ts">
	import { roundTotal, playerRunningTotalForRound, type OutcomeRound, type Player, type RoundDisplayMode, type EditCallback, type SupportedPlayerArray } from '$lib';
	import Cell from './Cell.svelte';

	type Props = {
		roundNumber: number;
		round: OutcomeRound;
		rounds: Array<OutcomeRound>;
		players: SupportedPlayerArray;
		darker: boolean;
		focused: boolean;
		onCellClicked: EditCallback;
		roundDisplayMode: RoundDisplayMode;
	};
	const { roundNumber, round, rounds, players, darker, focused, onCellClicked, roundDisplayMode }: Props = $props();
</script>

<div class={`round ${focused ? 'focused' : ''}`}>
	{#each players as player, i}
		<Cell forPlayer={player} colorMode={darker ? 'LOW' : 'HIGH'} {focused}>
			<div class={`cell-inner ${roundDisplayMode}`} onclickcapture={() => onCellClicked(roundNumber, i)}>
				{#if roundDisplayMode === 'ROUND_DETAILS'}
					<div class="card">{round.outcomes[i].blitzCardsRemaining}</div>
					<div>{round.outcomes[i].cardsPlayed}</div>
					<div class="sum">{roundTotal(round.outcomes[i])}</div>
				{:else}
					<div>{playerRunningTotalForRound(i, rounds, roundNumber)}</div>
				{/if}
			</div>
		</Cell>
	{/each}
</div>

<style>
	.round {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
		background-color: var(--theme-background-color);
		gap: 1px;
	}

	.round.focused {
		border-top: 2px solid var(--theme-border-color);
		border-bottom: 2px solid var(--theme-border-color);
	}

	.cell-inner {
		font-weight: normal;
		text-align: center;
		line-height: 2em;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.cell-inner.TOTALS {
		justify-content: center;
	}

	.card {
		font-size: 0.75em;
		color: black;
		border-radius: 0.3em;
		width: 1.3em;
		border: 1px solid var(--theme-border-color);

		margin: 0.1em;
		line-height: 1.8em;
		background-color: white;
	}

	.sum {
		font-weight: bold;
	}
</style>

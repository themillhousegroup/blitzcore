<script lang="ts">
	import { roundTotal, type OutcomeRound, type Player } from '$lib';
	import Cell from './Cell.svelte';

	type Props = {
		roundNumber: number;
		round: OutcomeRound;
		players: Array<Player>;
		darker: boolean;
		focused: boolean;
		onRoundClicked: (roundNumber: number) => void;
	};
	const { roundNumber, round, players, darker, focused, onRoundClicked }: Props = $props();
</script>

<div class={`round ${focused ? 'focused' : ''}`} onclickcapture={() => onRoundClicked(roundNumber)}>
	{#each players as player, i}
		<Cell forPlayer={player} colorMode={darker ? 'LOW' : 'HIGH'} {focused}>
			<div class="cell-inner">
				<div class="card">{round.outcomes[i].blitzCardsRemaining}</div>
				<div>{round.outcomes[i].cardsPlayed}</div>
				<div class="sum">{roundTotal(round.outcomes[i])}</div>
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
		background-color: white;
	}

	.round.focused {
		border-top: 2px solid white;
		border-bottom: 2px solid white;
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
	.card {
		font-size: 0.75em;
		color: black;
		border-radius: 0.3em;
		width: 1.3em;
		border: 1px solid white;

		margin: 0.1em;
		line-height: 1.8em;
		background-color: white;
	}

	.sum {
		font-weight: bold;
	}
</style>

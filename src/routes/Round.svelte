<script lang="ts">
	import { roundTotal, type Game, type OutcomeRound, type Player } from '$lib';
	import Cell from './Cell.svelte';

  type Props = {
		roundNumber: number;
    round: OutcomeRound;
		players: Array<Player>
		darker: boolean;
		onRoundClicked: (roundNumber: number) => void;
	}
  const { roundNumber, round, players, darker, onRoundClicked }: Props = $props();

</script>

<div class="round" onclickcapture={() => onRoundClicked(roundNumber)}> 
	{#each players as player, i}
		<Cell forPlayer={player} colorMode={darker ? "LOW" : "HIGH"}>
			<div class='cell-inner'>
				{round.outcomes[i].blitzCardsRemaining}
				{round.outcomes[i].cardsPlayed}
				{roundTotal(round.outcomes[i])}
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

	.cell-inner {
		font-weight: normal;
		text-align: center;
		line-height: 2em;
	}
</style>

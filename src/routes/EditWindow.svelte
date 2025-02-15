<script lang="ts">
	import { addRound, roundTotal, type Game, type OutcomeRound } from '$lib';
	import Headings from './Headings.svelte';
	import Rounds from './Rounds.svelte';
	import Totals from './Totals.svelte';

  type Props = {
    game: Game
		roundNumber: number;
		onFinished: () => void;
  }
  const { game, roundNumber, onFinished }: Props = $props();
	const { players, rounds } = game;
	const round = rounds[roundNumber];

	let editingPlayer = $state(-1);
</script>

<div class="editwindow">
	<h2>Round {roundNumber +1}</h2>

	<div class="playersbox">
		{#each players as player, i}
			<div class="playerbox" style={`background-color: ${player.color.lowIntensity}; border-color: ${player.color.highIntensity}`}>
				<h2>{player.name}</h2>
				<div class="inforow">
					<h3>Blitz Cards Remaining</h3>
					<h4>{round.outcomes[i].blitzCardsRemaining}</h4>
				</div>
				<div class="inforow">
					<h3>Cards Played</h3>
					<h4>{round.outcomes[i].cardsPlayed}</h4>
				</div>

				<h1>{roundTotal(round.outcomes[i])}</h1>
			</div>
		{/each}
	</div>


	<button onclick={onFinished} aria-label="Finished editing">
		Done
	</button>
</div>

<style>
	.editwindow {
		position: absolute;
		top: 2vh;
		left: 5vw;
		z-index: 100;
		opacity: 1;
		border: 2px solid darkgray;
		border-radius: 8px;
		background-color: white;
		height: 96vh;
		width: 90vw;
		display: flex;
    flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	button {
		width: 60vw;
	}

	h1, h2, h4 {
		font-weight: bold;
	}

	h1, h4 {
		text-align: right;
	}

	.playersbox {
		flex: 1;
		display: flex;
		gap: 1em;
		flex-direction: column;
		justify-content: space-between;
	}
	.playerbox {
		flex: 1;
		width: 80vw;
		border: 1px solid pink;
		border-radius: 8px;
		padding: 4px 8px;
	}

	.inforow {
		display: flex;
		justify-content: space-between;
	}
</style>

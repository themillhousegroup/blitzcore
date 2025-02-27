<script lang="ts">
		import type { Game, OutcomeRound, PlayerOutcome } from '$lib';
	import EditWindowPlayerBox from './EditWindowPlayerBox.svelte';
	
  type Props = {
    previousGame: Game | undefined;
    onFinished: (newGameSetup: GameSetup) => void;
  }
  const { previousGame, onFinished }: Props = $props();
	const round = $derived(game.rounds[roundNumber]);

	let playerBoxBeingEdited = $state(-1);

	function replacePlayerOutcome(i: number, newOutcome: PlayerOutcome) {
		const before = round.outcomes.slice(0, i);
		const after = round.outcomes.slice(i+1);
		const newOutcomes = [...before, newOutcome, ...after];
		onRoundUpdate(roundNumber, {
			outcomes: newOutcomes
		});
	}
</script>

<div class="newgamewindow">
	<h2>Round {roundNumber +1}</h2>

	<div class="playersbox">
		{#each game.players as player, i}
			{#if playerBoxBeingEdited === i}
				<EditWindowPlayerBox 
					player={player} 
					editing
					outcome={round.outcomes[i]} 
					onNewOutcome={(newOutcome: PlayerOutcome) => replacePlayerOutcome(i, newOutcome)}
				/>
			{:else}
				<div onclickcapture={() => playerBoxBeingEdited = i}> 
					<EditWindowPlayerBox 
						player={player} 
						editing={false}
						outcome={round.outcomes[i]} 
					/>
				</div>
			{/if}
		{/each}
	</div>

        <button onclick={onFinished} aria-label="Start the game">
		Start the game
	</button>
</div>

<style>
	.newgamewindow {
		position: absolute;
		top: 2dvh;
		left: 5vw;
		z-index: 100;
		opacity: 1;
		border: 2px solid darkgray;
		border-radius: 8px;
		background-color: white;
		height: 96dvh;
		width: 90vw;
		display: flex;
    flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	button {
		width: 60vw;
	}

	h2 {
		font-weight: bold;
	}

	.playersbox {
		display: flex;
		gap: 1dvh;
		flex-direction: column;
		justify-content: space-between;
		height: 86vh;
	}

</style>

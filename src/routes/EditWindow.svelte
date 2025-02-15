<script lang="ts">
	import { type Game } from '$lib';
	import EditWindowPlayerBox from './EditWindowPlayerBox.svelte';
	
  type Props = {
    game: Game
		roundNumber: number;
		onFinished: () => void;
  }
  const { game, roundNumber, onFinished }: Props = $props();
	const { players, rounds } = game;
	const round = rounds[roundNumber];

	let playerBoxBeingEdited = $state(-1)
</script>

<div class="editwindow">
	<h2>Round {roundNumber +1}</h2>

	<div class="playersbox">
		{#each players as player, i}
			{#if playerBoxBeingEdited === i}
				<EditWindowPlayerBox 
					player={player} 
					editing
					outcome={round.outcomes[i]} 
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

	h2 {
		font-weight: bold;
	}

	.playersbox {
		display: flex;
		gap: 1em;
		flex-direction: column;
		justify-content: space-between;
		height: 86vh;
	}

</style>

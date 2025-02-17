<script lang="ts">
	import type { Game, OutcomeRound } from '$lib';
	import Round from './Round.svelte';

  type Props = {
    game: Game;
		onRoundEdit: (roundNumber: number) => void;
  }
  const { game, onRoundEdit }: Props = $props();
</script>

<div class="rounds">
	{#each game.rounds as round, i}
		<Round 
			roundNumber={i} 
			round={round} 
			players={game.players} 
			darker={i % 2 == 0} 
			focused={i === game.focusedRoundIndex}
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
	}
</style>

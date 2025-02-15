<script lang="ts">
	import type { Game, OutcomeRound } from '$lib';
	import Round from './Round.svelte';

  type Props = {
    game: Game;
		onRoundEdit: (roundNumber: number) => void;
  }
  const { game, onRoundEdit }: Props = $props();
	const { players, rounds } = game;

</script>

<div class="rounds">
	{#each rounds as round, i}
		<Round 
			roundNumber={i} 
			round={round} 
			players={players} 
			darker={i % 2 == 0} 
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

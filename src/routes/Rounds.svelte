<script lang="ts">
	import type { Game } from '$lib';
	import Round from './Round.svelte';

  type Props = {
    game: Game;
  }
  const { game }: Props = $props();
	const { players, rounds } = game;

</script>

<div class="rounds">
	{#each rounds as round, i}
		<Round round={round} players={players} darker={i % 2 == 0}/>
	{/each}
</div>

<style>
	.rounds {
		display: flex;
    flex-direction: column;
		justify-content: flex-start;
    background-color: green;
		z-index: 50;
	}
</style>

<script lang="ts">
	import type { Game, OutcomeRound, Player } from '$lib';
	import Cell from './Cell.svelte';

  type Props = {
    round: OutcomeRound;
		players: Array<Player>
		darker: boolean;
  }
  const { round, players, darker }: Props = $props();

</script>

<div class="round">
	{#each players as player}
		<Cell forPlayer={player} colorMode={darker ? "LOW" : "HIGH"}>
			<span></span>
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
</style>

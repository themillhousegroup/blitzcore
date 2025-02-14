<script lang="ts">
	import type { Game, OutcomeRound, Player } from '$lib';

  type Props = {
    round: OutcomeRound;
		players: Array<Player>
		darker: boolean;
  }
  const { round, players, darker }: Props = $props();

</script>

<div class="round">
	{#each players as player}
		<div class="cell" style={`background-color: ${darker ? player.color.lowIntensity : player.color.highIntensity}`}></div>
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

	.cell {
		flex: 1;
		height: 2em;
		width: 2em;
	}
</style>

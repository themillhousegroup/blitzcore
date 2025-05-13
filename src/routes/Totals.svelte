<script lang="ts">
	import { playerTotal, type OutcomeRound, type Player, } from '$lib';
	import Cell from './Cell.svelte';
	import Round from './Round.svelte';

	type Props = {
		players: Array<Player>;
			rounds: Array<OutcomeRound>;
	};
	const { players, rounds }: Props = $props();
</script>

<div class="totals">
	{#each players as player, i}
		<Cell forPlayer={player} colorMode="NORMAL">
			<div class="cell-inner">{playerTotal(i, rounds)}</div>
		</Cell>
	{/each}
</div>

<style>
	.totals {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
		gap: 1px;
		z-index: 50;
		border-top: 2px solid darkgray;
		border-bottom: 2px solid darkgray;
	}

	.cell-inner {
		font-weight: bold;
		text-align: center;
		line-height: 1.2em;
		font-size: 1.6em;
	}
</style>

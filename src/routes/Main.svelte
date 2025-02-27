<script lang="ts">
	import type { Game, OutcomeRound } from '$lib';
	import Headings from './Headings.svelte';
	import Rounds from './Rounds.svelte';
	import Totals from './Totals.svelte';

  type Props = {
    game: Game | undefined;
		onRoundEdit: (roundNumber: number) => void;
  }
  const { game, onRoundEdit }: Props = $props();

</script>

<div class="main">
	{#if game}
		<Headings game={game} />
		<Rounds game={game} onRoundEdit={onRoundEdit}/>
		<Totals game={game} />
	{/if}
</div>

<style>
	.main {
		height: 90dvh;
		max-height: 90dvh;
		flex: 0;
		display: flex;
    		flex-direction: column;
		justify-content: flex-start;
		background-color: white;
		overflow-y: scroll;
	}
</style>

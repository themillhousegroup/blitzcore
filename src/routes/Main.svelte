<script lang="ts">
	import type { Game } from '$lib';
	import Headings from './Headings.svelte';
	import Rounds from './Rounds.svelte';
	import Totals from './Totals.svelte';

	type Props = {
		game: Game | undefined;
		onRoundEdit: (roundNumber: number) => void;
	};
	const { game, onRoundEdit }: Props = $props();
</script>

<div class="main">
	{#if game}
		<Headings {game} />
		<Rounds {game} {onRoundEdit} />
		<Totals {game} />
	{/if}
</div>

<style>
	.main {
		height: 90%;
		max-height: 90%;
		flex: 10;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		background-color: white;
		overflow-y: scroll;
	}
</style>

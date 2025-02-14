<script lang="ts">
	import type { Game } from '$lib';
	import Headings from './Headings.svelte';
	import Rounds from './Rounds.svelte';

  type Props = {
    game: Game | undefined;
  }
  const { game }: Props = $props();

</script>

<div class="main">
	{#if game}
	<Headings game={game} />
	<Rounds game={game} />
	{/if}
</div>

<style>
	.main {
		flex: 10;
		display: flex;
    flex-direction: column;
		justify-content: flex-start;
    background-color: red;
	}
</style>

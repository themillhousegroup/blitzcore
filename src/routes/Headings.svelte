<script lang="ts">
	import type { SupportedPlayerArray } from "$lib";

	type Props = {
		players: SupportedPlayerArray;
	};
	const { players }: Props = $props();
</script>

<div class="headings">
	{#each players as player}
		<div class="heading" style={`background-color: ${player.color.normal}`}>
			<span class="name">{player.name}</span>
		</div>
	{/each}
</div>

<style>
	.headings {
		flex: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		background-color: var(--theme-background-color);
		gap: 1px;
	}

	.heading {
		width: 9em;
		height: 4em;
		line-height: 4em;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.name {
		transform: rotate(-20deg);
	}
</style>

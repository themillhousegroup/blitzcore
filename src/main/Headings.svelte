<script lang="ts">
	import type { SupportedPlayerArray } from "$lib";

	type Props = {
		players: SupportedPlayerArray;
	};
	const { players }: Props = $props();
	// 15 degrees per player once there's more than 2
	const headerTextRotationDegrees = $derived((players.length -2) * 15);
</script>

<div class="headings">
	{#each players as player}
		<div 
			class="heading" 
			style={`background-color: ${player.color.normal}`}>
			<span 
				style:transform={`rotate(-${headerTextRotationDegrees}deg)`}>
				{player.name}
			</span>
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
		width: 50%;
		height: 4em;
		line-height: 4em;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	span {
		/** Let long names overhang the container*/
		position: absolute;
	}
</style>

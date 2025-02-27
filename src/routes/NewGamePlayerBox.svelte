<script lang="ts">
	import { type Player } from '$lib';

	type Props = {
		player: Player;
		onPlayerUpdated: (newPlayer: Player) => void;
	};
	const { player, onPlayerUpdated }: Props = $props();
</script>

<div class="playerbox">
	<div class="inforow">
		<label for="playerName">Player Name</label>
		<input name="playerName" type="text" min="1" max="20" value={player.name} />
		<div class="colorgroup">
			<button class="color red">Blue</button> 
			<button class="color red">Red</button> 
			<button class="color red">Yellow</button> 
			<button class="color red">Green</button> 
		</div>
	</div>
</div>

<style>
	.playerbox {
		flex: 1;
		width: 80vw;
		border: 1px solid pink;
		border-radius: 8px;
		padding: 2px 8px;
	}

	.colorgroup {
		display: flex;
		flex-direction: row;
	}

	button.color {
		flex: 1;
	}

	.inforow {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 6px;
	}
</style>

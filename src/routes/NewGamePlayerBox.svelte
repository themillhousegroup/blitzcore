<script lang="ts">
	import {
		BLITZ_BLUE,
		BLITZ_GREEN,
		BLITZ_RED,
		BLITZ_YELLOW,
		type DutchBlitzColor,
		type Player
	} from '$lib';

	type Props = {
		player: Player;
		onPlayerUpdated: (newPlayer: Player) => void;
	};
	const { player, onPlayerUpdated }: Props = $props();

	function colorClicked(newColor: DutchBlitzColor): any {
		onPlayerUpdated({
			...player,
			color: newColor
		})
	}


	function nameChanged(event: Event & { currentTarget: EventTarget & HTMLInputElement; }) {
		onPlayerUpdated({
			...player,
			name: event.currentTarget.value
		})
	}
</script>

<div class="playerbox">
	<div class="namegroup">
		<label for="playerName">Player Name</label>
		<input name="playerName" 
			class="nameinput"
			onchange={nameChanged}
			type="text" min="1" max="20" value={player.name} 
			style:border-color={player.color.normal}
			style:background-color={player.color.lowIntensity}
		/>
	</div>
	<div class="colorgroup">
		<label for="playerName">Player Color</label>
		<div class="buttons">
			<button
				class="color"
				onclick={() => colorClicked(BLITZ_BLUE)}
				style:color={BLITZ_BLUE.normal}
				style:border-color={BLITZ_BLUE.normal}
			>
				Blue
			</button>
			<button
				class="color"
				onclick={() => colorClicked(BLITZ_RED)}
				style:color={BLITZ_RED.normal}
				style:border-color={BLITZ_RED.normal}
			>
				Red
			</button>
			<button
				class="color"
				onclick={() => colorClicked(BLITZ_YELLOW)}
				style:color={BLITZ_YELLOW.normal}
				style:border-color={BLITZ_YELLOW.normal}>Yellow</button
			>
			<button class="color" 
			onclick={() => colorClicked(BLITZ_GREEN)}
			style:color={BLITZ_GREEN.normal} style:border-color={BLITZ_GREEN.normal}
				>Green</button
			>
		</div>
	</div>
</div>

<style>
	.playerbox {
		flex: 1;
		display: flex;
		width: 80vw;
		border: 1px solid black;
		border-radius: 8px;
		padding: 2px 8px;
		gap: 8px;
		justify-content: space-between;
	}

	.namegroup {
		flex: 1;
		width: 9em;
		display: flex;
		flex-direction: column;
	}

	.nameinput {
		border-radius: 4px;
		color: var(--theme-color);
	}

	.colorgroup {
		flex: 4;
		display: flex;
		flex-direction: column;
	}

	.buttons {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	label {
		font-size: smaller;
	}

	button.color {
		flex: 1;
		margin: 2px;
	}
</style>

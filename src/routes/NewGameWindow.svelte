<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';

	import {
		type GameSetup,
		type Player,
		DEFAULT_PLAYERS,
		SUPPORTED_NUMBER_OF_PLAYERS,
		type SupportedNumPlayers,
	} from '$lib';
	import { CORE_THEME_NAMES, RadioControl, SliderControl, type ThemeName } from '@themillhousegroup/svelte-common-ui';
	import NewGamePlayerBox from './NewGamePlayerBox.svelte';

	type Props = {
		gameSetup: GameSetup;
		onFinished: (newGameSetup: GameSetup) => void;
		onThemeNameChanged: (newThemeName: ThemeName) => void; // allows user to experiment
	};
	const { gameSetup, onFinished, onThemeNameChanged }: Props = $props();

	let numberOfPlayers = $state(gameSetup.numPlayers);

	const setNumberOfPlayers = (newNum: SupportedNumPlayers) => {
		numberOfPlayers = newNum;
		if (numberOfPlayers > newPlayerArray.length) {
			newPlayerArray = DEFAULT_PLAYERS.slice(0, newNum);
			gameSetup.players.forEach((p, i) => {
				if (i < newNum && gameSetup.players.length > 0) {
					newPlayerArray[i] = gameSetup.players[i];
				}
			});
		} 
	}

	let newPlayerArray: Array<Player> = $state([...gameSetup.players]);


	const updatePlayer = (playerIdx: number) => (newPlayerInfo:Player) => {
		newPlayerArray[playerIdx] = newPlayerInfo;
	}


	const completeSetup = () => {
		// Ultimate type-safety...
		switch (numberOfPlayers) {
			case 2:
				onFinished({
					themeName: gameSetup.themeName,
					numPlayers: 2,
					players: [newPlayerArray[0], newPlayerArray[1]]
				});
				break;
			case 3:
				onFinished({
					themeName: gameSetup.themeName,
					numPlayers: 3,
					players: [newPlayerArray[0], newPlayerArray[1], newPlayerArray[2]]
				});
				break;
			case 4:
				onFinished({
					themeName: gameSetup.themeName,
					numPlayers: 4,
					players: [newPlayerArray[0], newPlayerArray[1], newPlayerArray[2], newPlayerArray[3]]
				});
				break;
			default:
				onFinished({
					themeName: gameSetup.themeName,
					numPlayers: 5,
					players: [newPlayerArray[0], newPlayerArray[1], newPlayerArray[2], newPlayerArray[3], newPlayerArray[4]]
				});
				break;
		}		


	}
</script>

<div class="newgamewindow">
	<h2>New Game</h2>
	<div class="numplayers">

		<SliderControl
			label='Number of Players'
			options={SUPPORTED_NUMBER_OF_PLAYERS}
			selectedValue={numberOfPlayers} 
			onValueChanged={setNumberOfPlayers}
			--width={"60%"}
		/>
	</div>
	<div class="playersbox">
		{#each { length: numberOfPlayers }, playerIdx}
			<NewGamePlayerBox 
				player={newPlayerArray[playerIdx as number]} 
				onPlayerUpdated={updatePlayer(playerIdx)} 
			/>
		{/each}
		{#if numberOfPlayers === 2}
			<div id="twoplayerwarning">
			<strong>Don't forget</strong> that a two-player game
			requires <strong>5</strong> <i>Wood Piles</i> each, not 3!
			</div>
		{/if}
	</div>

	<div class="bottomarea">

		{#snippet light(selected: boolean, style?: string)}
			<span class={`inner ${selected ? 'selected' : ''}`} {style}>
				<Sun size="1.25em"/>
			</span>
		{/snippet}
		{#snippet dark(selected: boolean, style?: string)}
			<span class={`inner ${selected ? 'selected': ''}`} {style}>
				<Moon size="1.25em" />
			</span>
		{/snippet}

		<div class="rcholder">
		<RadioControl
			options={CORE_THEME_NAMES}
			selectedValue={gameSetup.themeName}
			onValueChanged={onThemeNameChanged}
			optionLabelSnippets={[light, dark]}
		/>
	</div>
		<button 
			onclick={completeSetup} 
			aria-label="Start the game"> Start the game </button>
	</div>
</div>

<style>
	.newgamewindow {
		position: absolute;
		top: 2dvh;
		left: 5dvw;
		z-index: 100;
		opacity: 1;
		border: 2px solid var(--theme-border-color);
		border-radius: 8px;
		background-color: var(--theme-background-color);
		height: 96dvh;
		width: 90dvw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.numplayers {
		width: 90%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	button {
		width: 60dvw;
	}

	h2 {
		font-weight: bold;
	}

	.playersbox {
		display: flex;
		gap: 1dvh;
		flex-direction: column;
		justify-content: space-between;
		max-height: 75dvh;
		height: 75dvh;
		overflow-y: scroll;
	}

	#twoplayerwarning {
		width: 80dvw;
		padding: 1em;
	}

	.bottomarea {
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.bottomarea button {
		flex: 8;
	}

	.inner {
		display: flex;
		justify-content: center;
		min-width: 1.5em;
		padding: 0.25em;

		&.selected {
			background-color: #00ff0040;
		}
	}
</style>

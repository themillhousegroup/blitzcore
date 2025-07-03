<script lang="ts">
	import {
		type GameSetup,
		type Player,
		DEFAULT_PLAYERS,
		type SupportedNumPlayers,
		type SupportedPlayerArray,
		type TwoPlayerArray,
	} from '$lib';
	import NewGamePlayerBox from './NewGamePlayerBox.svelte';

	type Props = {
		gameSetup: GameSetup;
		onFinished: (newGameSetup: GameSetup) => void;
	};
	const { gameSetup, onFinished }: Props = $props();

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
			default:
				onFinished({
					themeName: gameSetup.themeName,
					numPlayers: 4,
					players: [newPlayerArray[0], newPlayerArray[1], newPlayerArray[2], newPlayerArray[3]]
				});
				break;
		}		


	}


	function numPlayersChanged(event: Event & { currentTarget: EventTarget & HTMLInputElement; }) {
		setNumberOfPlayers(parseInt(event.currentTarget.value, 10) as SupportedNumPlayers)
	}

	let colorsAreUnique:boolean = $state(true)
</script>

<div class="newgamewindow">
	<h2>New Game</h2>
	<div class="numplayers">
		<label for="numPlayersRange">Number of Players</label>
		
		<input name="numPlayersRange" 
			type="range" 
			min="2" step="1" max="4" 
			value={numberOfPlayers} 
			list="markers"
			onchange={numPlayersChanged}
		/>
		<datalist id="markers">
			<option value="2" label="2"></option>
			<option value="3" label="3"></option>
			<option value="4" label="4"></option>
		</datalist>
	</div>
	<div class="playersbox">
		{#each { length: numberOfPlayers }, playerIdx}
			<NewGamePlayerBox 
				player={newPlayerArray[playerIdx as number]} 
				onPlayerUpdated={updatePlayer(playerIdx)} 
			/>
		{/each}
	</div>

	<button 
		onclick={completeSetup} 
		disabled={!colorsAreUnique}
		aria-label="Start the game"> Start the game </button>
</div>

<style>
	.newgamewindow {
		position: absolute;
		top: 2dvh;
		left: 5vw;
		z-index: 100;
		opacity: 1;
		border: 2px solid darkgray;
		border-radius: 8px;
		background-color: white;
		height: 94dvh;
		width: 90vw;
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

	datalist {
		width: 8em;
		display: flex;
		justify-content: space-between;
	}

	button {
		width: 60vw;
	}

	h2 {
		font-weight: bold;
	}

	.playersbox {
		display: flex;
		gap: 1dvh;
		flex-direction: column;
		justify-content: space-between;
		height: 74dvh;
	}
</style>

<script lang="ts">
	import {
		BLITZ_BLUE,
		BLITZ_GREEN,
		BLITZ_RED,
		BLITZ_YELLOW,
		type GameSetup,
		type OutcomeRound,
		type Player,
		type PlayerOutcome
	} from '$lib';
	import NewGamePlayerBox from './NewGamePlayerBox.svelte';
	// import NewGamePlayerBox from './NewGamePlayerBox.svelte';

	type Props = {
		previousPlayers: Array<Player>;
		onFinished: (newGameSetup: GameSetup) => void;
	};
	const { previousPlayers, onFinished }: Props = $props();

	const DEFAULT_PLAYERS: Array<Player> = [
		{
			name: 'Alice',
			color: BLITZ_BLUE
		},
		{
			name: 'Bob',
			color: BLITZ_RED
		},
		{
			name: 'Charlie',
			color: BLITZ_YELLOW
		},
		{
			name: 'David',
			color: BLITZ_GREEN
		}
	];

	let numberOfPlayers = $state(previousPlayers.length === 0 ? DEFAULT_PLAYERS.length : previousPlayers.length);
	function setNumberOfPlayers(newNum: number) {
		numberOfPlayers = newNum;
		if (numberOfPlayers > newPlayerArray.length) {
			newPlayerArray = DEFAULT_PLAYERS;
			newPlayerArray.forEach((p, i) => {
				if (i < newNum && previousPlayers.length > 0) {
					newPlayerArray[i] = previousPlayers[i];
				}
			});
		} 
	}

	let newPlayerArray: Array<Player> = $state(previousPlayers.length === 0 ? [...DEFAULT_PLAYERS] : [...previousPlayers);


	const updatePlayer = (playerIdx: number) => (newPlayerInfo:Player) => {
		newPlayerArray[playerIdx] = newPlayerInfo;
	}


	function completeSetup() {
		const newGameSetup = newPlayerArray.slice(0, numberOfPlayers) as unknown as GameSetup;
		onFinished(newGameSetup)
	}


	function numPlayersChanged(event: Event & { currentTarget: EventTarget & HTMLInputElement; }) {
		setNumberOfPlayers(parseInt(event.currentTarget.value, 10))
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
		height: 96dvh;
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
		height: 86vh;
	}
</style>

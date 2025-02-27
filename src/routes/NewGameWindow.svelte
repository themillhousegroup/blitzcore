<script lang="ts">
	import {
		BLITZ_BLUE,
		BLITZ_GREEN,
		BLITZ_RED,
		BLITZ_YELLOW,
		type Game,
		type GameSetup,
		type OutcomeRound,
		type Player,
		type PlayerOutcome
	} from '$lib';
	import NewGamePlayerBox from './NewGamePlayerBox.svelte';
	// import NewGamePlayerBox from './NewGamePlayerBox.svelte';

	type Props = {
		previousGame: Game | undefined;
		onFinished: (newGameSetup: GameSetup) => void;
	};
	const { previousGame, onFinished }: Props = $props();

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

	let numberOfPlayers = $state(previousGame?.players.length || DEFAULT_PLAYERS.length);
	function setNumberOfPlayers(newNum: number) {
		console.log(`num players => ${newNum}`);
		numberOfPlayers = newNum;
	}
	let newPlayerArray: Array<Player> = $derived(previousGame?.players || DEFAULT_PLAYERS);

	function completeSetup() {
		const newGameSetup = newPlayerArray as unknown as GameSetup;
		onFinished(newGameSetup)
	}
</script>

<div class="newgamewindow">
	<h2>New Game</h2>
	<div class="numplayers">
		<button class="numbtn" onclick={() => setNumberOfPlayers(2)} aria-label="Two Players">
			2 Players
		</button>
		<button class="numbtn" onclick={() => setNumberOfPlayers(3)} aria-label="Three Players">
			3 Players
		</button>
		<button class="numbtn" onclick={() => setNumberOfPlayers(4)} aria-label="Four Players">
			4 Players
		</button>
	</div>
	<div class="playersbox">
		{#each { length: numberOfPlayers }, playerIdx}
			<NewGamePlayerBox 
				player={newPlayerArray[playerIdx as number]} 
				onPlayerUpdated={(newPlayerInfo: Player) => newPlayerArray[playerIdx as number] = newPlayerInfo} 
			/>
		{/each}
	</div>

	<button onclick={completeSetup} aria-label="Start the game"> Start the game </button>
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
		flex-direction: row;
		justify-content: space-between;
	}

	button.numbtn {
		flex: 1;
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

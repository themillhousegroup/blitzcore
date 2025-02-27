<script lang="ts">
	import Toolbar from './Toolbar.svelte';
	import Main from './Main.svelte';
	import {
		addRound,
		createNewGameForPlayers,
		type OutcomeRound,
		type GameSetup,
		type Game
	} from '$lib';
	import EditWindow from './EditWindow.svelte';
	import NewGameWindow from './NewGameWindow.svelte';

	let game: Game | undefined = $state(undefined);

	let showNewGameWindow: boolean = $state(true);
	let showEditWindowForRound: number = $state(-1);

	function startEditing(roundNumber: number) {
		showEditWindowForRound = roundNumber;
	}
	function stopEditing() {
		showEditWindowForRound = -1;
	}

	function onNewGame() {
		console.log(`NewGame`);
		showNewGameWindow = true;
	}

	function onNewGameSetupFinished(newGameSetup: GameSetup) {
		showNewGameWindow = false;
		game = createNewGameForPlayers(newGameSetup);
	}
	function onAddRound() {
		console.log(`onAddRound`);
		if (game) {
			game = addRound(game);
		}
	}
	function roundUpdated(roundNumber: number, newRound: OutcomeRound) {
		if (game) {
			game.rounds[roundNumber] = newRound;
		}
	}
</script>

<div class="blitzcore">
	<Main {game} onRoundEdit={startEditing} />
	{#if showNewGameWindow}
		<div class="matte">
			<NewGameWindow previousGame={game} onFinished={onNewGameSetupFinished} />
		</div>
	{/if}

	{#if game && showEditWindowForRound >= 0}
		<div class="matte">
			<EditWindow
				{game}
				roundNumber={showEditWindowForRound}
				onRoundUpdate={roundUpdated}
				onFinished={stopEditing}
			/>
		</div>
	{/if}
	<Toolbar existingGame={game} {onNewGame} {onAddRound} />
</div>

<style>
	.blitzcore {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: space-between;
		width: 100dvw;
		height: 100dvh;
	}

	.matte {
		position: absolute;
		z-index: 75;
		width: 100vw;
		height: 100vh;
		background-color: #202020cc;
	}
</style>

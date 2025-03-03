<script lang="ts">
	import Toolbar from './Toolbar.svelte';
	import Main from './Main.svelte';
	import {
		type OutcomeRound,
		type GameSetup,
		type Player,

		createRound

	} from '$lib';
	import EditWindow from './EditWindow.svelte';
	import NewGameWindow from './NewGameWindow.svelte';

	let players: Array<Player> = $state([]);
	let rounds: Array<OutcomeRound> = $state([]);
	let focusedRoundIndex: number = $state(0);

	let showNewGameWindow: boolean = $state(true);
	let showEditWindowForRound: number = $state(-1);

	function startEditing(roundNumber: number) {
		showEditWindowForRound = roundNumber;
	}
	function stopEditing() {
		showEditWindowForRound = -1;
	}

	function onNewGame() {
		showNewGameWindow = true;
	}

	function onNewGameSetupFinished(newGameSetup: GameSetup) {
		showNewGameWindow = false;
		focusedRoundIndex = 0;
		players = newGameSetup as unknown as Array<Player>;
		rounds = [createRound(newGameSetup.length)];
	}

	function onAddRound() {
		if (rounds) {
			rounds.push(createRound(players.length));
			focusedRoundIndex = rounds.length - 1
		}
	}
	function roundUpdated(roundNumber: number, newRound: OutcomeRound) {
		if (rounds.length > roundNumber) {
			rounds[roundNumber] = newRound;
		}
	}
</script>

<div class="blitzcore">
	<Main {players} {focusedRoundIndex} {rounds} onRoundEdit={startEditing} />
	{#if showNewGameWindow}
		<div class="matte">
			<NewGameWindow previousPlayers={players} onFinished={onNewGameSetupFinished} />
		</div>
	{/if}

	{#if showEditWindowForRound >= 0}
		<div class="matte">
			<EditWindow
				round={rounds[showEditWindowForRound]}
				roundNumber={showEditWindowForRound}
				{players}
				onRoundUpdate={roundUpdated}
				onFinished={stopEditing}
			/>
		</div>
	{/if}
	<Toolbar {onNewGame} {onAddRound} />
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

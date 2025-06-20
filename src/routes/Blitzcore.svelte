<script lang="ts">
	import { browser } from '$app/environment';
	import Toolbar from './Toolbar.svelte';
	import Main from './Main.svelte';
	import {
		type OutcomeRound,
		type GameSetup,
		type Player,
		storeGameSetup,
		retrieveGameSetup,
		createRound,
		roundsHaveValuableContent,
		EditCallback
	} from '$lib';
	import EditWindow from './EditWindow.svelte';
	import NewGameWindow from './NewGameWindow.svelte';
	import NewGameConfirmDialog from './NewGameConfirmDialog.svelte';

	let players: Array<Player> = $state(browser ? retrieveGameSetup() : []);
	let rounds: Array<OutcomeRound> = $state([]);
	let focusedRoundIndex: number = $state(0);
	let roundDisplayMode: RoundDisplayMode = $state('ROUND_DETAILS');

	function onToggleDisplayMode() {
		roundDisplayMode = (roundDisplayMode === 'ROUND_DETAILS' ? 'TOTALS' : 'ROUND_DETAILS');
	}

	let showNewGameConfirmDialog: boolean = $state(false);
	let showNewGameWindow: boolean = $state(true);
	let showEditWindowForRound: number = $state(-1);
	let editWindowInitiallyFocusedPlayerIndex: number = $state(-1);

	function startEditing(roundNumber: number, playerIndex: number) {
		showEditWindowForRound = roundNumber;
		editWindowInitiallyFocusedPlayerIndex = playerIndex;
	}
	function stopEditing() {
		showEditWindowForRound = -1;
	}

	function onNewGame() {
		if (roundsHaveValuableContent(rounds)) {
			showNewGameConfirmDialog = true;
		} else {
			showNewGameWindow = true;
		}
	}

	function onNewGameSetupFinished(newGameSetup: GameSetup) {
		showNewGameWindow = false;
		focusedRoundIndex = 0;
		players = newGameSetup as unknown as Array<Player>;
		rounds = [createRound(newGameSetup.length)];
		storeGameSetup(newGameSetup);
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

	function handleNewGameConfirm(proceedWithNewGame: boolean) {
		showNewGameConfirmDialog = false;
		showNewGameWindow = proceedWithNewGame;
	}
</script>

<div class="blitzcore">
	<Main {players} {focusedRoundIndex} {rounds} onCellClicked={startEditing} {roundDisplayMode} />

	{#if showNewGameConfirmDialog}
		<div class="matte">
			<NewGameConfirmDialog onDismissed={handleNewGameConfirm} />
		</div>
	{/if}

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
				initiallyFocusedPlayerIndex={editWindowInitiallyFocusedPlayerIndex}
				{players}
				onRoundUpdate={roundUpdated}
				onFinished={stopEditing}
			/>
		</div>
	{/if}
	<Toolbar {onNewGame} {roundDisplayMode} {onToggleDisplayMode} {onAddRound} />
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
		width: 100dvw;
		height: 100dvh;
		background-color: #202020cc;
	}
</style>

<script lang="ts">
	import { browser } from '$app/environment';
	import Toolbar from '../components/Toolbar.svelte';
	import Main from '../main/Main.svelte';
	import {
		type OutcomeRound,
		type GameSetup,
		type Player,
		storeGameSetup,
		retrieveGameSetup,
		storeCurrentGame,
		createRound,
		roundsHaveValuableContent,
		type RoundDisplayMode
	} from '$lib';
	import EditWindow from '../dialogs/EditWindow.svelte';
	import NewGameWindow from '../dialogs/NewGameWindow.svelte';
	import NewGameConfirmDialog from '../dialogs/NewGameConfirmDialog.svelte';
	import { ModalMatte, ThemeProvider, type ThemeName } from '@themillhousegroup/svelte-common-ui';
	import { ALL_THEMES } from '$lib/theming';
	import TipCallout from '../components/TipCallout.svelte';

	let gameSetup: GameSetup = $state(retrieveGameSetup(browser));
	let rounds: Array<OutcomeRound> = $state([]);
	let focusedRoundIndex: number = $state(0);
	let roundDisplayMode: RoundDisplayMode = $state('ROUND_DETAILS');

	function onToggleDisplayMode() {
		roundDisplayMode = roundDisplayMode === 'ROUND_DETAILS' ? 'TOTALS' : 'ROUND_DETAILS';
	}

	let showNewGameConfirmDialog: boolean = $state(false);
	let showNewGameWindow: boolean = $state(true);
	let showEditWindowForRound: number = $state(-1);
	let editWindowInitiallyFocusedPlayerIndex: number = $state(-1);

	// Move to settings later...
	let showTips = $state(false);

	let showFirstRoundTip = $state(false);
	let showAddRoundTip = $state(false);

	function startEditing(roundNumber: number, playerIndex: number) {
		showEditWindowForRound = roundNumber;
		editWindowInitiallyFocusedPlayerIndex = playerIndex;
	}
	function stopEditing() {
		if (showEditWindowForRound === 0) {
			showFirstRoundTip = false;
			showAddRoundTip = showTips;
		}
		showEditWindowForRound = -1;
	}

	function onNewGame() {
		if (roundsHaveValuableContent(rounds)) {
			showNewGameConfirmDialog = true;
		} else {
			showNewGameWindow = true;
		}
	}

	function onThemeNameChanged(newThemeName: ThemeName) {
		gameSetup.themeName = newThemeName;
	}

	function onNewGameSetupFinished(newGameSetup: GameSetup) {
		showNewGameWindow = false;
		focusedRoundIndex = 0;
		gameSetup = newGameSetup;
		rounds = [createRound(newGameSetup.numPlayers)];
		storeGameSetup(newGameSetup);

		showFirstRoundTip = showTips;
	}

	function onAddRound() {
		if (rounds) {
			rounds.push(createRound(gameSetup.numPlayers));
			focusedRoundIndex = rounds.length - 1;
		}
		showAddRoundTip = false;
	}
	function roundUpdated(roundNumber: number, newRound: OutcomeRound) {
		if (rounds.length > roundNumber) {
			rounds[roundNumber] = newRound;
			storeCurrentGame(rounds);
		}
	}

	function handleNewGameConfirm(proceedWithNewGame: boolean) {
		showNewGameConfirmDialog = false;
		showNewGameWindow = proceedWithNewGame;
	}
</script>

	<ThemeProvider allThemes={ALL_THEMES} themeName={gameSetup.themeName}>
		<div class="blitzcore">
		
			<Main
				players={gameSetup.players}
				{focusedRoundIndex}
				{rounds}
				onCellClicked={startEditing}
				{roundDisplayMode}
			/>

			{#if showFirstRoundTip}
				<TipCallout --width="12em">
					Tap this row to enter the scores for the first round
				</TipCallout>
			{/if}

			{#if showNewGameConfirmDialog}
				<ModalMatte onMatteClicked={() => handleNewGameConfirm(false)}>
					<NewGameConfirmDialog onDismissed={handleNewGameConfirm} />
				</ModalMatte>
			{/if}

			{#if showNewGameWindow}
				<ModalMatte onMatteClicked={() => showNewGameWindow = false }>
					<NewGameWindow {gameSetup} onFinished={onNewGameSetupFinished} {onThemeNameChanged}/>
				</ModalMatte>
			{/if}

			{#if showEditWindowForRound >= 0}
				<ModalMatte onMatteClicked={stopEditing}>
					<EditWindow
						round={rounds[showEditWindowForRound]}
						roundNumber={showEditWindowForRound}
						initiallyFocusedPlayerIndex={editWindowInitiallyFocusedPlayerIndex}
						players={gameSetup.players}
						onRoundUpdate={roundUpdated}
						onFinished={stopEditing}
					/>
				</ModalMatte>
			{/if}

			{#if showAddRoundTip}
				<TipCallout --width="12em">
					Tap <i><strong>"Add Round"</strong></i> to add a row for the next round
				</TipCallout>
			{/if}

			<Toolbar {onNewGame} {roundDisplayMode} {onToggleDisplayMode} {onAddRound} />
		
	</div>
	
	</ThemeProvider>

<style>
	.blitzcore {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: space-between;
		width: 100dvw;
		height: 100dvh;
	}
</style>

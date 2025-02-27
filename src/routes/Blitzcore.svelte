<script lang="ts">
  import Toolbar from './Toolbar.svelte';
  import Main from './Main.svelte';
	import { addRound, BLITZ_BLUE, BLITZ_GREEN, BLITZ_RED, BLITZ_YELLOW, createNewGameForPlayers, type OutcomeRound, type GameSetup } from '$lib';
	import EditWindow from './EditWindow.svelte';
import NewGameWindow from './NewGameWindow.svelte';

  const DEFAULT_PLAYERS = [
    {
      name: "Sophie",
      color: BLITZ_RED
    },
    {
      name: "Bec",
      color: BLITZ_GREEN
    },
    {
      name: "Charlie",
      color: BLITZ_YELLOW
    },
    {
      name: "Johnny",
      color: BLITZ_BLUE
    }
  ]


  let game: Game | undefined = $state(undefined);

let showNewGameWindow: boolean = $state(false);
  let showEditWindowForRound: number = $state(-1);

  function startEditing(roundNumber: number) {
    showEditWindowForRound = roundNumber;
  }
  function stopEditing() {
    showEditWindowForRound = -1
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
    game = addRound(game);
	}
	function roundUpdated(roundNumber: number, newRound: OutcomeRound) {
    game.rounds[roundNumber] = newRound;
	}
</script>

<div class="blitzcore">
  <Main game={game} onRoundEdit={startEditing}/>
{#if showNewGameWindow}
    <div class="matte">
      <NewGameWindow 
        previousGame={game} 
        onFinished={onNewGameSetupFinished} 
       />
    </div>
{/if}

  {#if showEditWindowForRound >= 0}
    <div class="matte">
      <EditWindow 
        game={game} 
        roundNumber={showEditWindowForRound} 
        onRoundUpdate={roundUpdated}
        onFinished={stopEditing} />
    </div>
  {/if}
  <Toolbar onNewGame={onNewGame} onAddRound={onAddRound}/>
</div>

<style>
  .blitzcore {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  .matte {
    position: absolute;
    z-index: 75;
    width: 100vw;
    height: 100vh;
    background-color: #202020cc;
  }
</style>

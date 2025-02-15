<script lang="ts">
  import Toolbar from './Toolbar.svelte';
  import Main from './Main.svelte';
	import { addRound, BLITZ_BLUE, BLITZ_GREEN, BLITZ_RED, BLITZ_YELLOW, createNewGameForPlayers } from '$lib';
	import EditWindow from './EditWindow.svelte';

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


  let game = $state(createNewGameForPlayers(DEFAULT_PLAYERS));

  let showEditWindowForRound: number = $state(-1);

  function startEditing(roundNumber: number) {
    showEditWindowForRound = roundNumber;
  }
  function stopEditing() {
    showEditWindowForRound = -1
  }

  function onNewGame() {
    console.log(`NewGame`);
    game = createNewGameForPlayers(DEFAULT_PLAYERS);
	}
	function onAddRound() {
    console.log(`onAddRound`);
    game = addRound(game);
	}



</script>

<div class="blitzcore">
  <Main game={game} onRoundEdit={startEditing}/>
  {#if showEditWindowForRound >= 0}
    <div class="matte">
      <EditWindow game={game} roundNumber={showEditWindowForRound || 0} onFinished={stopEditing} />
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

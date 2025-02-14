<script lang="ts">
  import Toolbar from './Toolbar.svelte';
  import Main from './Main.svelte';
	import { addRound, BLITZ_BLUE, BLITZ_GREEN, BLITZ_RED, BLITZ_YELLOW, createNewGameForPlayers } from '$lib';

  const DEFAULT_PLAYERS = [
    {
      name: "Sophie",
      color: BLITZ_YELLOW
    },
    {
      name: "Bec",
      color: BLITZ_RED
    },
    {
      name: "Charlie",
      color: BLITZ_GREEN
    },
    {
      name: "John",
      color: BLITZ_BLUE
    }
  ]


  let game = $state(createNewGameForPlayers(DEFAULT_PLAYERS));
	function onNewGame() {
    console.log(`NewGame`);
	}
	function onAddRound() {
    console.log(`onAddRound`);
    game = addRound(game);
	}
</script>

<div class="blitzcore">
  <Toolbar onNewGame={onNewGame} onAddRound={onAddRound}/>
  <Main game={game} />
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
</style>

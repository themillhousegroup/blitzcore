<script lang="ts">
  import Toolbar from './Toolbar.svelte';
  import Main from './Main.svelte';
	import { addRound, BLITZ_BLUE, BLITZ_GREEN, BLITZ_RED, BLITZ_YELLOW, createNewGameForPlayers } from '$lib';

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
	function onNewGame() {
    console.log(`NewGame`);
	}
	function onAddRound() {
    console.log(`onAddRound`);
    game = addRound(game);
	}
</script>

<div class="blitzcore">
  <Main game={game} />
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
</style>

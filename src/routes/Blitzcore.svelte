<script lang="ts">
	import { Spring } from 'svelte/motion';
  import Toolbar from './Toolbar.svelte';
  import Rounds from './Rounds.svelte';

	function onNewGame() {
    console.log(`NewGame`);
	}
</script>

<div class="blitzcore">
  <Toolbar onNewGame />
  <Rounds onNewGame />
</div>

<style>
  .blitzcore {
  }
</style>

<script lang="ts">
	import { Spring } from 'svelte/motion';
  import Toolbar from './Toolbar.svelte';

	function onNewGame() {
    console.log(`NewGame`);
	}
</script>

<div class="blitzcore">
  <Toolbar onNewGame />
</div>

<style>
  .blitzcore {
  }
</style>

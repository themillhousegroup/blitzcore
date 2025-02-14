<script lang="ts">
	import { Spring } from 'svelte/motion';
  import Counter from './Counter.svelte';

	function onNewGame() {
    console.log(`NewGame`);
	}
</script>

<div class="blitzcore">
  <Counter onNewGame />
</div>

<style>
  .blitzcore {
  }
</style>

<script lang="ts">
	import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  }

  const { children } = $props();
</script>

<div class="tipcallout">
  <b>Tip</b><br/>
  {@render children()}
</div>	

<style>
  @keyframes fade-in {
    from { 
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .tipcallout {
    border: 1px solid var(--theme-border-color);
    background-color: var(--theme-color);
    color: var(--theme-background-color);
    border-radius: 8px;
    padding: 1em;
    margin: 1em;
    width: var(--width);
    animation-name: fade-in;
    animation-duration: 3s;
    animation-iteration-count: 1;
  }
</style>
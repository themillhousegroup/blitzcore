<script lang="ts">
	import { deriveColor, type ColorMode, type DutchBlitzColor, type Player } from "$lib";
	import type { Snippet } from "svelte";

  type Props = {
    forPlayer: Player;
    children: Snippet;
	focused?: boolean;
    colorMode?: ColorMode;
  }
  const { children, forPlayer, colorMode, focused }: Props = $props();

  const bgColor = deriveColor(forPlayer.color, colorMode);
</script>

<div class={`cell ${focused ? 'focused' : ''}`} style={`background-color: ${bgColor}`}>
  {@render children()}
</div>

<style>
  .cell {
		flex: 1;
		height: 2em;
		width: 2em;
	}

  .focused {
     font-size: larger;
  }
</style>

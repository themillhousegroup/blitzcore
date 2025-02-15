<script lang="ts">
	import { deriveColor, type ColorMode, type DutchBlitzColor, type Player } from "$lib";
	import type { Snippet } from "svelte";

  type Props = {
    forPlayer: Player;
    children: Snippet;
    colorMode?: ColorMode;
  }
  const { children, forPlayer, colorMode }: Props = $props();

  const bgColor = deriveColor(forPlayer.color, colorMode);
</script>

<div class="cell" style={`background-color: ${bgColor}`}>
  {@render children()}
</div>

<style>
  .cell {
		flex: 1;
		height: 2em;
		width: 2em;
	}
</style>
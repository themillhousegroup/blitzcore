<script lang="ts">
  type Props = {
		currentValue: number;
    onNewValue: (n: number) => void;
		mode: "BLITZ" | "PLAYED"
  }
  const { currentValue, onNewValue, mode }: Props = $props();
</script>

<div class="modifier">
	{#if mode === "BLITZ"}
		{#each { length: 11}, num}
		<button class={`card ${(currentValue === num) ? 'selected' : ''}`} onclick={() => onNewValue(num)} aria-label={`Select ${num}`}>
			{num}
		</button>
		{/each}
	{:else}
		<button class="incdec" onclick={() => onNewValue(currentValue - 1)} aria-label="-1" disabled={currentValue === 0}>
			-1
		</button>

		<div class="counter">
			{currentValue}
		</div>

		<button class="incdec" onclick={() => onNewValue(currentValue + 1)} aria-label="+1">
			+1
		</button>
		<button  class="incdec" onclick={() => onNewValue(currentValue + 5)} aria-label="+5">
			+5
		</button>
		<button  class="incdec" onclick={() => onNewValue(currentValue + 10)} aria-label="+10">
			+10
		</button>
	{/if}
</div>

<style>
	.modifier {
		display: flex;
		flex-direction: row;
		gap: 4px;
	}

	.modifier button {
		width: 2rem;
		font-size: 1.7rem;
		margin: 0.3rem 0;
	}

	.card {
		flex: 1;
		border-radius: 4px;
		padding: 1px;
		border: 1px solid white;
		background-color: white;
	}

	.card.selected {
		color: red;
		border-color: red;
	}

	.modifier button.incdec {
		flex: 1;
		width: 3em;
	}

	.counter {
		flex: 2;
		width: 6em;
		overflow: hidden;
		text-align: center;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 2.75em;
	}

</style>

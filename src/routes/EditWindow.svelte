<script lang="ts">
	import type { OutcomeRound, Player, PlayerOutcome, SupportedPlayerArray } from '$lib';
	import EditWindowPlayerBox from './EditWindowPlayerBox.svelte';

	type Props = {
		round: OutcomeRound;
		roundNumber: number;
		initiallyFocusedPlayerIndex: number;
		players: SupportedPlayerArray;
		onRoundUpdate: (roundNumber: number, newRound: OutcomeRound) => void;
		onFinished: () => void;
	};
	const { round, roundNumber, players, onRoundUpdate, onFinished, initiallyFocusedPlayerIndex }: Props = $props();

	let playerBoxBeingEdited = $state(initiallyFocusedPlayerIndex);

	function replacePlayerOutcome(i: number, newOutcome: PlayerOutcome) {
		const before = round.outcomes.slice(0, i);
		const after = round.outcomes.slice(i + 1);
		const newOutcomes = [...before, newOutcome, ...after];
		onRoundUpdate(roundNumber, {
			outcomes: newOutcomes
		});
	}
</script>

<div class="editwindow">
	<h2>Round {roundNumber + 1}</h2>

	<div class="playersbox">
		{#each players as player, i}
			{#if playerBoxBeingEdited === i}
				<EditWindowPlayerBox
					{player}
					editing
					outcome={round.outcomes[i]}
					onNewOutcome={(newOutcome: PlayerOutcome) => replacePlayerOutcome(i, newOutcome)}
				/>
			{:else}
				<div onclickcapture={() => (playerBoxBeingEdited = i)}>
					<EditWindowPlayerBox {player} editing={false} outcome={round.outcomes[i]} />
				</div>
			{/if}
		{/each}
	</div>

	<button onclick={onFinished} aria-label="Finished editing"> Done </button>
</div>

<style>
	.editwindow {
		position: absolute;
		top: 2dvh;
		left: 5vw;
		z-index: 100;
		opacity: 1;
		border: 2px solid var(--theme-border-color);
		border-radius: 8px;
		background-color: var(--theme-background-color);
		height: 96dvh;
		width: 90vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	button {
		width: 60vw;
	}

	h2 {
		font-weight: bold;
	}

	.playersbox {
		display: flex;
		gap: 1dvh;
		flex-direction: column;
		justify-content: space-between;
		height: 75vh;
	}
</style>

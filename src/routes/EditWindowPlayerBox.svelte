<script lang="ts">
	import { roundTotal, type Player, type PlayerOutcome } from '$lib';
	import NumericModifier from './NumericModifier.svelte';

	type CoreProps = {
		player: Player;
		outcome: PlayerOutcome;
	};

	type EditModeProps = {
		editing: true;
		onNewOutcome: (newOutcome: PlayerOutcome) => void;
	};
	type ViewModeProps = {
		editing: false;
		onNewOutcome?: undefined;
	};

	type Props = CoreProps & (EditModeProps | ViewModeProps);
	const { player, editing, outcome, onNewOutcome }: Props = $props();

	function onNewBlitzCardsRemaining(n: number) {
		console.log(`New Blitz number: ${n}`);
		editing &&
			onNewOutcome({
				...outcome,
				blitzCardsRemaining: n
			});
	}
	function onNewPlayedCardsRemaining(n: number) {
		console.log(`New played number: ${n}`);
		editing &&
			onNewOutcome({
				...outcome,
				cardsPlayed: n
			});
	}
</script>

<div
	class="playerbox"
	style={`background-color: ${player.color.lowIntensity}; border-color: ${player.color.highIntensity};`}
>
	<div class="inforow">
		<h2 style={`border-bottom: 1px solid ${player.color.highIntensity}; width: 90%`}>
			{player.name}
		</h2>
		<h1>{roundTotal(outcome)}</h1>
	</div>

	<div class={`inforow ${editing && 'inforow-editing'}`}>
		<h4>Blitz Cards Remaining</h4>
		{#if editing}
			<div style={`height: 8vh;`}>
				<NumericModifier
					currentValue={outcome.blitzCardsRemaining}
					onNewValue={onNewBlitzCardsRemaining}
					mode="BLITZ"
				/>
			</div>
		{:else}
			<h3>{outcome.blitzCardsRemaining}&nbsp;</h3>
		{/if}
	</div>
	<div class={`inforow ${editing && 'inforow-editing'}`}>
		<h4>Cards Played</h4>
		{#if editing}
			<div style={`height: 8vh;`}>
				<NumericModifier
					currentValue={outcome.cardsPlayed}
					onNewValue={onNewPlayedCardsRemaining}
					mode="PLAYED"
				/>
			</div>
		{:else}
			<h3>{outcome.cardsPlayed}&nbsp;</h3>
		{/if}
	</div>
</div>

<!-- <button onclick={onFinished} aria-label="Finished editing">
		Done
	</button> -->
<!-- </div> -->

<style>
	.playerbox {
		flex: 1;
		width: 80vw;
		border: 1px solid pink;
		border-radius: 8px;
		padding: 2px 8px;
	}

	h1,
	h2,
	h3 {
		font-weight: bold;
	}

	h1 {
		font-size: 1.75em;
	}

	h1,
	h3 {
		text-align: right;
		line-height: 0.9em;
	}
	h3 {
		text-align: right;
	}
	h4 {
		font-weight: normal;
	}

	.inforow {
		display: flex;
		justify-content: space-between;
		margin-bottom: 6px;
	}

	.inforow-editing {
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 6px;
	}
</style>

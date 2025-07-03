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
		editing &&
			onNewOutcome({
				...outcome,
				blitzCardsRemaining: n
			});
	}
	function onNewPlayedCardsRemaining(n: number) {
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
		<h2 class="undername" style:border-bottom-color={player.color.highIntensity}>
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

<style>
	.playerbox {
		flex: 1;
		width: 80vw;
		border: 1px solid transparent;
		border-radius: 8px;
		padding: 2px 8px;
	}

	.undername {
		width: 90%;
		border-bottom: 1px solid transparent;
		padding-bottom: 0;
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
		margin-bottom: 2px;
	}

	.inforow-editing {
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 2px;
	}
</style>

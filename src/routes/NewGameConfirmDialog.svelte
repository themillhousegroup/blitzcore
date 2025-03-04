<script lang="ts">
	type Props = {
		onDismissed: (proceedWithNewGame: boolean) => void;
	};
	const { onDismissed }: Props = $props();
</script>

<div class="newgameconfirmdialog">
	<h2>Confirm</h2>
	<div class="numplayers">
		<h3>Are you sure you want to start a new game?</h3>
	</div>

	<div class="btnrow">
		<button 
		onclick={() => onDismissed(false)} 
		aria-label="Cancel"> Cancel </button>

	<button 
		onclick={() => onDismissed(true)} 
		aria-label="Proceed"> Proceed </button>
		</div>
</div>

<style>
	.newgameconfirmdialog {
		position: absolute;
		top: 12dvh;
		left: 5vw;
		z-index: 100;
		opacity: 1;
		border: 2px solid darkgray;
		border-radius: 8px;
		background-color: white;
		height: 42dvh;
		width: 90vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.btnrow {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		gap: 8px;
	}
	button {
		flex: 1;
		width: 36vw;
	}
</style>

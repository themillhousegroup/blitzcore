<script lang="ts">
	import Blitzcore from './Blitzcore.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Dutch Blitz Scoring App" />
</svelte:head>

<article>
	<Blitzcore />
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
	}
</style>

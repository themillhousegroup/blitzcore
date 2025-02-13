<script lang="ts">
	import Counter from './Counter.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Dutch Blitz Scoring App" />
</svelte:head>

<article>
	<Counter />
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: black;
		height: 100vh;
		width: 100vw;
	}
</style>

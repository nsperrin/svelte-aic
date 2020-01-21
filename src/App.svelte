<script>
	import GameLayout from "./GameLayout/GameLayout.svelte";
	import Title from "./Title/Title.svelte";
</script>

<main>
	<div class="container">
		<audio autoplay>
			<source src="assets/beepboop.mp3" type="audio/mpeg"/>
		</audio>
		<Title/>
		<GameLayout></GameLayout>
	</div>
	
</main>

<style>
	* {
		text-align: center;
		padding: 1em;
		max-width: 800px;
		margin: 0 auto;
		height: 100%;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.container {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	
</style>
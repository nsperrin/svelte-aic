<script>
	import Board from "./Board/Board.svelte";
</script>

<main>
	<p>
		Lady Meow Meow is Anna Winpurr's special guest at this year's Meowt Gala.
		She's taking the responsibility seriously, placing pawpurrazzi all around the
		mueseum to ensure coverage from every angle. Read the floor tiles of their
		locations to figure out her gift to you.
	</p>
  <p>
		Pawpurrazzi can be placed in any of the letter squares. Numbers on the blank
		or number squares indicate how many pawpurrazzi are next to that square, either horizontally
		or vertically. Each pawpurrazzi illuminates from their flashbulb until they hit a blank or number 
		square or the outer edge of the gallery in its row and column. Every letter square
		must be illuminated. Pawpurrazi do not need to be next to a numbered 
		square. No pawpurrazzi can be in another's flashbulb path horizontally or vertically.
	</p>
	<Board/>
</main>

<style>
	* {
		text-align: center;
		padding: 1em;
		max-width: 800px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
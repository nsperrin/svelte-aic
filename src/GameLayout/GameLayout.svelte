<script>
    import Board from '../Board/Board.svelte';
</script>

<div class="layout">
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
</div>

<style>
    .layout {
        opacity: 0;
        animation: fadein 1s forwards;
        animation-delay: 6s;
        display: flex;
        flex-direction: column;
        height: 100%;
        visibility: hidden;
    }

    @keyframes fadein {
        0% {opacity: 0; visibility: visible;}
        100% {opacity: 1; visibility: visible;};
    }
</style>
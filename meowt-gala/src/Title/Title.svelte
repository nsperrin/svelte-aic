<script>
    let src = "assets/ballcat.gif"
</script>

<div class="title">
    <img { src } alt="Lady Meow Meow" />
    <img src="assets/nekoatsume.png" alt="Neko Atsune" />
    <div class="text"v>Meowt Gala</div>
</div>


<style>
    .title {
        position: fixed;
        display: flex;
        align-items: center;
        flex-direction: column;
        animation: fade 6s linear forwards;
        
    }

    .title > .text {
        font-style: italic;
        font-family: cursive;
        font-size: 2em;
    }

    img { 
        height: 40%;
        width: 40%;
    }

	@keyframes fade {
		0% { opacity: 0;}
		30% { opacity: 1; }
        60% { opacity: 1; }
        99% { opacity: 0; }
        100% { opacity: 0; }
	}
</style>
<script>
  import Tile from "../Tile/Tile.svelte";
  import { galaStore } from "../stores/galaStore.js";

  let gala;
  galaStore.subscribe(value => {
    gala = value;
  });
</script>

<div class="board-wrapper">
  {#each gala as row}
    <div class="row-wrapper">
      {#each row as galaTile}
        <Tile galaTile={galaTile}/>
      {/each}
    </div>
  {/each}
</div>

<style>
  .board-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: fit-content;
    margin: auto;
    border: 1px solid gray;
  }

  .row-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
</style>
<script>
  import {handleTileSelection} from "../stores/galaStore.js";
  export let galaTile;
</script>

<div class="tile-wrapper" wall={galaTile.isWall} on:click={handleTileSelection(galaTile)}>
  <span class="value-wrapper" lit={galaTile.isIlluminated} pawpurrazzi={galaTile.hasPawpurrazzi} inError={galaTile.inError}>
    {galaTile.value}
  </span>
</div>

<style>
  .tile-wrapper {
    display: flex;
    padding: 1.5em;
    border: 1px solid gray;
    width: 1.5em;
    justify-content: center;
  }

  .tile-wrapper[wall=true]{
    background-color: gray;
    color: white;
  }

  .value-wrapper {
    padding: 1em;
    border-radius: 4px;
    min-height: 1em;
    min-width: 1em;
    margin: -1em;
    font-weight: bold;
    border: 2px solid transparent;
  }
  .value-wrapper[lit=true]{
    background-color: yellowgreen;
  }
  .value-wrapper[lit=true][inError=true]{
    background-color: red;
  }
  .value-wrapper[pawpurrazzi=true]{
    border: 2px solid darkgreen;
    background-color: yellowgreen;
    border-radius: 50%;
  }
  .value-wrapper[pawpurrazzi=true][inError=true]{
    border: 2px solid darkred;
    background-color: red;
  }
</style>
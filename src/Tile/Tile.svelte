<script>
  import {handleTileSelection} from "../stores/gala/galaStore.js";
  export let galaTile;
</script>

<div class="tile-wrapper" wall={galaTile.isWall} on:click={handleTileSelection(galaTile)}>
  <span class="value-wrapper" lit={galaTile.isIlluminated} pawpurrazzi={galaTile.hasPawpurrazzi} inError={galaTile.inError}>
    {galaTile.value}
  </span>
</div>

<style type="text/scss">
  .tile-wrapper {
    display: flex;
    padding: 1.5em;
    border: 1px solid gray;
    width: 1.5em;
    justify-content: center;

    .value-wrapper {
      padding: 1em;
      border-radius: 4px;
      min-height: 1em;
      min-width: 1em;
      margin: -1em;
      font-weight: 800;
      border: 2px solid transparent;
    }

    &[wall=true]{
      background-color: gray;
      color: white;

      .value-wrapper[inError=true]{
        color: darkred;
      }

      .value-wrapper[lit=true]{
        color: yellowgreen;
      }
    }

    &[wall=false] {
      .value-wrapper {
        &[lit=true] {
          background-color: yellowgreen;

          &[inError=true]{
            background-color: red;
          }
        }

        &[pawpurrazzi=true]{
          border: 2px solid darkgreen;
          background-color: yellowgreen;
          border-radius: 50%;

          &[inError=true]{
            border: 2px solid darkred;
            background-color: red;
          }
        }
      }
    }
  }
</style>
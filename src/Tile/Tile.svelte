<script>
  import {handleTileSelection} from "../stores/gala/galaStore.js";
  export let galaTile;
</script>

<div style="--catSrc: url({galaTile.catImageSrc})" class="tile-wrapper" wall={galaTile.isWall} on:click={handleTileSelection(galaTile)}>
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
  position: relative;
  overflow: hidden;
}

.tile-wrapper[wall=true]{
  background-color: gray;
  color: white;
}

.tile-wrapper[wall=true] .value-wrapper[inError=true]{
  color: darkred;
}

.tile-wrapper[wall=true] .value-wrapper[lit=true]{
  color: yellowgreen;
}

.tile-wrapper[wall=false] .value-wrapper[lit=true]::after {
  background-image: url('../assets/yarn.png');
  background-size: cover;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
  animation: rollYarn .2s linear forwards;
}

@keyframes rollYarn {
  0% { opacity: 0;}
  100% { opacity: .5;}
}

.tile-wrapper[wall=false] .value-wrapper[lit=true][inError=true]{
  background-color: red;
}

.tile-wrapper[wall=false] .value-wrapper[pawpurrazzi=true]::after{
  background: var(--catSrc);
  background-size: cover;
  content: "";
  opacity: 0.4;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
  animation: rotation 12s infinite;
}

@keyframes rotation {
  0% { -webkit-transform: rotate(0deg); transform:rotate(0deg); }
  85% { -webkit-transform: rotate(0deg); transform:rotate(0deg); }
  90% { -webkit-transform: rotate(-15deg); transform:rotate(-15deg); }
  95% { -webkit-transform: rotate(15deg); transform:rotate(15deg); }
  100% { -webkit-transform: rotate(0deg); transform:rotate(0deg); }
}

.tile-wrapper[wall=false] .value-wrapper[pawpurrazzi=true][inError=true]{
  border: 2px solid darkred;
  background-color: red;
}

.value-wrapper {
  padding: 1em;
  border-radius: 4px;
  min-height: 1em;
  min-width: 1em;
  margin: -1em;
  font-weight: 800;
  border: 2px solid transparent;
}

</style>
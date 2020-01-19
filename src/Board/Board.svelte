<script>
  import Tile from "../Tile/Tile.svelte";
  import { galaStore, setGalaState } from "../stores/gala/galaStore.js";

  // setGalaState([
  //   "POWP1 WHAMBONK",
  //   "HA1 AW0AT12ABO",
  //   "PPITPOWT2THU1O",
  //   "R1LHKOGATERD1M",
  //   "O3GP LRU1 HSA ",
  //   "ZP O0 1N0SOPL ",
  //   "TAZKIHAK0CKS D",
  //   "K KEE2EGRRPREU",
  //   "1TRAB A1 1L2KH",
  //   "1AKE00PEI OE T",
  //   "S LPRSHPWOPE1H",
  //   "P2OLE1ATSYEEHW",
  //   "LOP1 SR2WO 2IA",
  //   "ATSTHUNK  WHIP",
  // ])();  
    setGalaState([
    " A ",
    "A3A",
    " A ",
  ])();  
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
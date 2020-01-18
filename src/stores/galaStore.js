import { writable } from 'svelte/store';
import {initialGalaState} from '../App.helpers';

export const galaStore = writable(initialGalaState([
  "TE21XHI",
  "SIAS1FM",
  "P ILLL ",
  "2EE3AR0",
  "1TENX1T",
  "SF ORWG",
  "RIE1 DR",
]));

const pipe = (...fns) => (input) =>  fns.reduce((lastValue, fn) => fn(lastValue), input);

const values = (obj) => Object.values(obj);

const identity = x => x;

const some = (evaluate) => (items) => items.reduce((acc, item) => acc || evaluate(item), false); 

const cloneGala = (gala) => [...gala.map(r => [...r])];

const togglePawpurrazzi = (rowIndex, colIndex) => (gala) => {
  const galaCopy = cloneGala(gala);
  const currentValue = galaCopy[rowIndex][colIndex].hasPawpurrazzi;
  galaCopy[rowIndex][colIndex].hasPawpurrazzi = !currentValue;
  return galaCopy;
};

const validIndicies = (rowIndex, colIndex) => (gala) => {
  const isIndexValid = (max) => (value) => value >= 0 && value < max;
  return isIndexValid(gala.length)(rowIndex) && isIndexValid(gala[rowIndex].length)(colIndex);
}

const tilesUntilWall = (directionalFn) => (tile) => (gala) =>{
  const checkNext = ([rowIndex, colIndex]) => {
    if(validIndicies(rowIndex, colIndex)(gala) && !gala[rowIndex][colIndex].isWall) {
      return [gala[rowIndex][colIndex], ...checkNext(directionalFn([rowIndex, colIndex]))];
    } else {
      return [];
    }
  }
  return checkNext(directionalFn([tile.rowIndex, tile.colIndex])).filter(x => x !== undefined)
}

const tilesNorth = tilesUntilWall(([ri, ci]) => [ri - 1, ci]);
const tilesSouth = tilesUntilWall(([ri, ci]) => [ri + 1, ci]);
const tilesEast = tilesUntilWall(([ri, ci]) => [ri, ci + 1]);
const tilesWest = tilesUntilWall(([ri, ci]) => [ri, ci - 1]);

const illuminationSources = tile => gala => {
  const tilesN = tilesNorth(tile)(gala);
  const tilesS = tilesSouth(tile)(gala);
  const tilesE = tilesEast(tile)(gala);
  const tilesW = tilesWest(tile)(gala);
  const numberAdjacent = [tilesN[0], tilesS[0], tilesE[0], tilesW[0]]
    .filter(identity)
    .reduce((sum, tile) => tile.hasPawpurrazzi ? sum + 1: sum, 0);
  return {
    inDirection: {
      north: some(x => x.hasPawpurrazzi)(tilesN),
      south: some(x => x.hasPawpurrazzi)(tilesS),
      east: some(x => x.hasPawpurrazzi)(tilesE),
      west: some(x => x.hasPawpurrazzi)(tilesW),
    },
    numberAdjacent
  }
}

const lit = (illuminationSources) => (tile) => ({
  ...tile, 
  isIlluminated: !tile.isWall && pipe(values, some(identity))(illuminationSources.inDirection)
});

const inError = (illuminationSources) => (tile) => ({
  ...tile,
  inError: (tile.isWall && (illuminationSources.numberAdjacent > tile.numberAdjacent)) ||
    (tile.hasPawpurrazzi && pipe(values, some(identity))(illuminationSources.inDirection)) || 
    (tile.isIlluminated && (
      illuminationSources.inDirection.north && illuminationSources.inDirection.south ||
      illuminationSources.inDirection.east && illuminationSources.inDirection.west))
});

const tilesWithIlluminationSources = (...mappers) => (gala) => 
  cloneGala(gala).map(row => 
    row.map(tile => {
      const is = illuminationSources(tile)(gala);
      return pipe(...mappers.map(mapper => mapper(is)))(tile); 
    })
  );

export const handleTileSelection = (tile) => () => {
  tile.isWall || galaStore.update(pipe(
    togglePawpurrazzi(tile.rowIndex, tile.colIndex),
    tilesWithIlluminationSources(
      lit,
      inError
    )
  ));
};
import { galaStore, setGalaState } from "./galaStore";
import * as faker from "faker";

const storeValueAfter = (store) => async (action, ...params) => new Promise(r => {
  action(...params);
  store.subscribe(r);
});

const testStateInitialization = (name, value, expected) => {
  it(name, async () => {
    const gala = await storeValueAfter(galaStore)(setGalaState([value]))
    expect(gala[0][0]).toEqual(expected);
  });
};

const alpha = () => {
  const  value = faker.random.alphaNumeric(1);
  return /^\d+$/.test(value) ? alpha() : value;
}

describe("galaStore", () => {
  describe("#setGalaState", () => {
    testStateInitialization("blank wall is set correctly", " ", {
      value: ' ', isWall: true, numberAdjacent: undefined,
      hasPawpurrazzi: false, isIlluminated: false, inError: false,
      rowIndex: 0, colIndex: 0  
    });

    testStateInitialization("0 wall is set correctlY", "0", {
      value: "0", isWall: true, numberAdjacent: 0,
      hasPawpurrazzi: false, isIlluminated: true, inError: false,
      rowIndex: 0, colIndex: 0  
    });

    [1, 2, 3, 4].forEach(n => {
      testStateInitialization(`${n} wall is set correctly`, `${n}`, {
        value: `${n}`, isWall: true, numberAdjacent: n,
        hasPawpurrazzi: false, isIlluminated: false, inError: false,
        rowIndex: 0, colIndex: 0  
      });
    });
    
    [
      alpha(),
    ].forEach(a => {
      testStateInitialization(`letter tile is set correctly`, `${a}`, {
        value: `${a}`, isWall: false, numberAdjacent: undefined,
        hasPawpurrazzi: false, isIlluminated: false, inError: false,
        rowIndex: 0, colIndex: 0  
      });
    });

    it('spreads strings into 2D array', async () => {
      const input = [
        `${alpha()}${alpha()}${alpha()}`,
        `${alpha()}${alpha()}${alpha()}`,
        `${alpha()}${alpha()}${alpha()}`,
      ];
      const output = (await storeValueAfter(galaStore)(setGalaState(input)))
        .map(r => r.map(t => t.value).join(""));
      expect(output).toEqual(input);
    });
  });

});
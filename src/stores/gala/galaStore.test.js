import { galaStore, setGalaState, handleTileSelection, initialGalaState } from "./galaStore";
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

  describe("#handleTileSelection", () => {
    describe("selected wall", () => {
      it("does nothing", async () => {
        const initialGala = await storeValueAfter(galaStore)(setGalaState([" S", "EE"]));
        const galaAfterSelection = await storeValueAfter(galaStore)(handleTileSelection(initialGala[0][0]));
        expect(initialGala).toEqual(galaAfterSelection);
      });
    });

    describe("not wall", () => {
      describe("pawpurrazi not already in space", () => {
        it("adds pawpurrazi to selected location", async () => {
          const initialGala = await storeValueAfter(galaStore)(setGalaState([" S", "EE"]));
          expect(initialGala[1][1].hasPawpurrazzi).toEqual(false);

          const galaAfterSelection = await storeValueAfter(galaStore)(handleTileSelection(initialGala[1][1]));
          expect(galaAfterSelection[1][1].hasPawpurrazzi).toEqual(true);
        });

        it("illuminates adjacent areas", async () => {
          const initialGala = await storeValueAfter(galaStore)(setGalaState([" S", "EE"]));
          expect(initialGala[0][1].isIlluminated).toEqual(false);
          expect(initialGala[1][0].isIlluminated).toEqual(false);

          const galaAfterSelection = await storeValueAfter(galaStore)(handleTileSelection(initialGala[1][1]));
          expect(galaAfterSelection[0][1].isIlluminated).toEqual(true);
          expect(galaAfterSelection[1][0].isIlluminated).toEqual(true);
        });

        it("illuminates until wall", async () => {
          const initialGala = await storeValueAfter(galaStore)(setGalaState([
            "ABCDCBA",
            "ABC CBA",
            "ABCDCBA",
            "A CDC A",
            "ABCDCBA",
            "ABC CBA",
            "ABCDCBA",
          ]));
          expect(initialGala[0][3].isIlluminated).toEqual(false);
          expect(initialGala[2][3].isIlluminated).toEqual(false);
          expect(initialGala[3][0].isIlluminated).toEqual(false);
          expect(initialGala[3][2].isIlluminated).toEqual(false);
          expect(initialGala[3][4].isIlluminated).toEqual(false);
          expect(initialGala[3][6].isIlluminated).toEqual(false);
          expect(initialGala[4][3].isIlluminated).toEqual(false);
          expect(initialGala[6][3].isIlluminated).toEqual(false);

          const galaAfterSelection = await storeValueAfter(galaStore)(handleTileSelection(initialGala[3][3]));

          expect(galaAfterSelection[0][3].isIlluminated).toEqual(false);
          expect(galaAfterSelection[2][3].isIlluminated).toEqual(true);
          expect(galaAfterSelection[3][0].isIlluminated).toEqual(false);
          expect(galaAfterSelection[3][2].isIlluminated).toEqual(true);
          expect(galaAfterSelection[3][4].isIlluminated).toEqual(true);
          expect(galaAfterSelection[3][6].isIlluminated).toEqual(false);
          expect(galaAfterSelection[4][3].isIlluminated).toEqual(true);
          expect(galaAfterSelection[6][3].isIlluminated).toEqual(false);
        });

        describe('wall states', () => {
          const testWallState = (getter, name) => (value) => (expecteds) => {
            it(`${name} is set for ${value}`, async () => {
              const stateChange = storeValueAfter(galaStore);
              const initN = await stateChange(setGalaState([" A ", `A${value}A`, " A "]));
              expect(getter(initN[1][1])).toEqual(expecteds[0]);
              const afterN_1 = await stateChange(handleTileSelection(initN[0][1]));
              const afterN_2 = await stateChange(handleTileSelection(afterN_1[1][0]));
              const afterN_3 = await stateChange(handleTileSelection(afterN_2[1][2]));
              const afterN_4 = await stateChange(handleTileSelection(afterN_3[2][1]));
              expect(getter(afterN_1[1][1])).toEqual(expecteds[1]);
              expect(getter(afterN_2[1][1])).toEqual(expecteds[2]);
              expect(getter(afterN_3[1][1])).toEqual(expecteds[3]);
              expect(getter(afterN_4[1][1])).toEqual(expecteds[4]);
            });
          }     

          describe("illumination", () => {
            const testWallIllumination = testWallState(x => x.isIlluminated, "illumination");
            testWallIllumination("0")([true, false, false, false, false]);
            testWallIllumination("1")([false, true, false, false, false]);
            testWallIllumination("2")([false, false, true, false, false]);
            testWallIllumination("3")([false, false, false, true, false]);
            testWallIllumination("4")([false, false, false, false, true]);
          });

          describe("error", () => {
            const testWallError = testWallState(x => x.inError, "error");
            testWallError("0")([false, true, true, true, true]);
            testWallError("1")([false, false, true, true, true]);
            testWallError("2")([false, false, false, true, true]);
            testWallError("3")([false, false, false, false, true]);
            testWallError("4")([false, false, false, false, false]);
          });
        });
      });

      describe("pawpurrazi already in space", () => {
        it("removes pawpurrazi to selected location if already there", async () => {
          const s0 = await storeValueAfter(galaStore)(setGalaState([" S", "EE"]));
          const initialGala = await storeValueAfter(galaStore)(handleTileSelection(s0[1][1]));
          expect(initialGala[1][1].hasPawpurrazzi).toEqual(true);

          const galaAfterSelection = await storeValueAfter(galaStore)(handleTileSelection(initialGala[1][1]));
          expect(galaAfterSelection[1][1].hasPawpurrazzi).toEqual(false);
        });

        it("un-illuminates adjacent areas", async () => {
          const s0 = await storeValueAfter(galaStore)(setGalaState([" S", "EE"]));
          const initialGala = await storeValueAfter(galaStore)(handleTileSelection(s0[1][1]));
          expect(initialGala[0][1].isIlluminated).toEqual(true);
          expect(initialGala[1][0].isIlluminated).toEqual(true);
         
          const galaAfterSelection = await storeValueAfter(galaStore)(handleTileSelection(initialGala[1][1]));
          expect(galaAfterSelection[0][1].isIlluminated).toEqual(false);
          expect(galaAfterSelection[1][0].isIlluminated).toEqual(false);
        });

        it("does not un-illuminate areas if another pawpurrazzi can see area", async () => {
          const s0 = await storeValueAfter(galaStore)(setGalaState([" S", "EE"]));
          const s1 = await storeValueAfter(galaStore)(handleTileSelection(s0[0][1]));
          const initialGala = await storeValueAfter(galaStore)(handleTileSelection(s1[1][0]));
          expect(initialGala[1][1].isIlluminated).toEqual(true);
         
          const galaAfterSelection = await storeValueAfter(galaStore)(handleTileSelection(initialGala[0][1]));
          expect(galaAfterSelection[1][1].isIlluminated).toEqual(true);
        });
      });
    });
  });
});
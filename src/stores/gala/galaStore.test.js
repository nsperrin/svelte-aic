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

        it("it illuminates numbered wall if the number of adjacent pawpurrazzi equals the numberOnWall", async () => {
          const init0 = await storeValueAfter(galaStore)(setGalaState([" A ", "A0A", " A "]));
          expect(init0[1][1].isIlluminated).toEqual(true);
          const after0_1 = await storeValueAfter(galaStore)(handleTileSelection(init0[0][1]));
          const after0_2 = await storeValueAfter(galaStore)(handleTileSelection(after0_1[1][0]));
          const after0_3 = await storeValueAfter(galaStore)(handleTileSelection(after0_2[1][2]));
          const after0_4 = await storeValueAfter(galaStore)(handleTileSelection(after0_3[2][1]));
          expect(after0_1[1][1].isIlluminated).toEqual(false);
          expect(after0_2[1][1].isIlluminated).toEqual(false);
          expect(after0_3[1][1].isIlluminated).toEqual(false);
          expect(after0_4[1][1].isIlluminated).toEqual(false);
          
          const init1 = await storeValueAfter(galaStore)(setGalaState([" A ", "A1A", " A "]));
          expect(init1[1][1].isIlluminated).toEqual(false);
          const after1_1 = await storeValueAfter(galaStore)(handleTileSelection(init1[0][1]));
          const after1_2 = await storeValueAfter(galaStore)(handleTileSelection(after1_1[1][0]));
          const after1_3 = await storeValueAfter(galaStore)(handleTileSelection(after1_2[1][2]));
          const after1_4 = await storeValueAfter(galaStore)(handleTileSelection(after1_3[2][1]));
          expect(after1_1[1][1].isIlluminated).toEqual(true);
          expect(after1_2[1][1].isIlluminated).toEqual(false);
          expect(after1_3[1][1].isIlluminated).toEqual(false);
          expect(after1_4[1][1].isIlluminated).toEqual(false);

          const init2 = await storeValueAfter(galaStore)(setGalaState([" A ", "A2A", " A "]));
          expect(init2[1][1].isIlluminated).toEqual(false);
          const after2_1 = await storeValueAfter(galaStore)(handleTileSelection(init2[0][1]));
          const after2_2 = await storeValueAfter(galaStore)(handleTileSelection(after2_1[1][0]));
          const after2_3 = await storeValueAfter(galaStore)(handleTileSelection(after2_2[1][2]));
          const after2_4 = await storeValueAfter(galaStore)(handleTileSelection(after2_3[2][1]));
          expect(after2_1[1][1].isIlluminated).toEqual(false);
          expect(after2_2[1][1].isIlluminated).toEqual(true);
          expect(after2_3[1][1].isIlluminated).toEqual(false);
          expect(after2_4[1][1].isIlluminated).toEqual(false);

          const init3 = await storeValueAfter(galaStore)(setGalaState([" A ", "A3A", " A "]));
          expect(init3[1][1].isIlluminated).toEqual(false);
          const after3_1 = await storeValueAfter(galaStore)(handleTileSelection(init3[0][1]));
          const after3_2 = await storeValueAfter(galaStore)(handleTileSelection(after3_1[1][0]));
          const after3_3 = await storeValueAfter(galaStore)(handleTileSelection(after3_2[1][2]));
          const after3_4 = await storeValueAfter(galaStore)(handleTileSelection(after3_3[2][1]));
          expect(after3_1[1][1].isIlluminated).toEqual(false);
          expect(after3_2[1][1].isIlluminated).toEqual(false);
          expect(after3_3[1][1].isIlluminated).toEqual(true);
          expect(after3_4[1][1].isIlluminated).toEqual(false);

          const init4 = await storeValueAfter(galaStore)(setGalaState([" A ", "A4A", " A "]));
          expect(init4[1][1].isIlluminated).toEqual(false);
          const after4_1 = await storeValueAfter(galaStore)(handleTileSelection(init4[0][1]));
          const after4_2 = await storeValueAfter(galaStore)(handleTileSelection(after4_1[1][0]));
          const after4_3 = await storeValueAfter(galaStore)(handleTileSelection(after4_2[1][2]));
          const after4_4 = await storeValueAfter(galaStore)(handleTileSelection(after4_3[2][1]));
          expect(after4_1[1][1].isIlluminated).toEqual(false);
          expect(after4_2[1][1].isIlluminated).toEqual(false);
          expect(after4_3[1][1].isIlluminated).toEqual(false);
          expect(after4_4[1][1].isIlluminated).toEqual(true);
        });

        it("it sets error on numbered wall if the number of adjacent pawpurrazzi exceeds the numberOnWall", async () => {
          const init0 = await storeValueAfter(galaStore)(setGalaState([" A ", "A0A", " A "]));
          expect(init0[1][1].inError).toEqual(false);
          const after0_1 = await storeValueAfter(galaStore)(handleTileSelection(init0[0][1]));
          const after0_2 = await storeValueAfter(galaStore)(handleTileSelection(after0_1[1][0]));
          const after0_3 = await storeValueAfter(galaStore)(handleTileSelection(after0_2[1][2]));
          const after0_4 = await storeValueAfter(galaStore)(handleTileSelection(after0_3[2][1]));
          expect(after0_1[1][1].inError).toEqual(true);
          expect(after0_2[1][1].inError).toEqual(true);
          expect(after0_3[1][1].inError).toEqual(true);
          expect(after0_4[1][1].inError).toEqual(true);
          
          const init1 = await storeValueAfter(galaStore)(setGalaState([" A ", "A1A", " A "]));
          expect(init1[1][1].inError).toEqual(false);
          const after1_1 = await storeValueAfter(galaStore)(handleTileSelection(init1[0][1]));
          const after1_2 = await storeValueAfter(galaStore)(handleTileSelection(after1_1[1][0]));
          const after1_3 = await storeValueAfter(galaStore)(handleTileSelection(after1_2[1][2]));
          const after1_4 = await storeValueAfter(galaStore)(handleTileSelection(after1_3[2][1]));
          expect(after1_1[1][1].inError).toEqual(false);
          expect(after1_2[1][1].inError).toEqual(true);
          expect(after1_3[1][1].inError).toEqual(true);
          expect(after1_4[1][1].inError).toEqual(true);

          const init2 = await storeValueAfter(galaStore)(setGalaState([" A ", "A2A", " A "]));
          expect(init2[1][1].inError).toEqual(false);
          const after2_1 = await storeValueAfter(galaStore)(handleTileSelection(init2[0][1]));
          const after2_2 = await storeValueAfter(galaStore)(handleTileSelection(after2_1[1][0]));
          const after2_3 = await storeValueAfter(galaStore)(handleTileSelection(after2_2[1][2]));
          const after2_4 = await storeValueAfter(galaStore)(handleTileSelection(after2_3[2][1]));
          expect(after2_1[1][1].inError).toEqual(false);
          expect(after2_2[1][1].inError).toEqual(false);
          expect(after2_3[1][1].inError).toEqual(true);
          expect(after2_4[1][1].inError).toEqual(true);

          const init3 = await storeValueAfter(galaStore)(setGalaState([" A ", "A3A", " A "]));
          expect(init3[1][1].inError).toEqual(false);
          const after3_1 = await storeValueAfter(galaStore)(handleTileSelection(init3[0][1]));
          const after3_2 = await storeValueAfter(galaStore)(handleTileSelection(after3_1[1][0]));
          const after3_3 = await storeValueAfter(galaStore)(handleTileSelection(after3_2[1][2]));
          const after3_4 = await storeValueAfter(galaStore)(handleTileSelection(after3_3[2][1]));
          expect(after3_1[1][1].inError).toEqual(false);
          expect(after3_2[1][1].inError).toEqual(false);
          expect(after3_3[1][1].inError).toEqual(false);
          expect(after3_4[1][1].inError).toEqual(true);

          const init4 = await storeValueAfter(galaStore)(setGalaState([" A ", "A4A", " A "]));
          expect(init4[1][1].inError).toEqual(false);
          const after4_1 = await storeValueAfter(galaStore)(handleTileSelection(init4[0][1]));
          const after4_2 = await storeValueAfter(galaStore)(handleTileSelection(after4_1[1][0]));
          const after4_3 = await storeValueAfter(galaStore)(handleTileSelection(after4_2[1][2]));
          const after4_4 = await storeValueAfter(galaStore)(handleTileSelection(after4_3[2][1]));
          expect(after4_1[1][1].inError).toEqual(false);
          expect(after4_2[1][1].inError).toEqual(false);
          expect(after4_3[1][1].inError).toEqual(false);
          expect(after4_4[1][1].inError).toEqual(false);
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
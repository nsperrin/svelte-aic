const initialSpace = (value) => (rowIndex, colIndex) => {
  const isWall = /^\d+|\s$/.test(value);
  const numberAdjacent = isWall && /^\d+$/.test(value) 
    ? parseInt(value, 10) 
    : undefined
  return {
    value,
    isWall,
    numberAdjacent,
    hasPawpurrazzi: false,
    isIlluminated: false,
    inError: false,
    rowIndex,
    colIndex,
  }
};

export const initialGalaState = (rowStrings) => 
  rowStrings.map((rs, ri) => 
    [...rs].map((v, ci) => 
      initialSpace(v)(ri, ci)
    )
  );
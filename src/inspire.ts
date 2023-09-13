export const latitudeSpacing: {[key: number]: number} = {
  0: 3600,
  1: 3000,
  2: 1800,
  3: 1200,
  4: 600,
  5: 300,
  6: 120,
  7: 60,
  8: 30,
  9: 15,
  10: 5,
  11: 3,
  12: 1.5,
  13: 1,
  14: 0.75,
  15: 0.5,
  16: 0.3,
  17: 0.15,
  18: 0.1,
  19: 0.075,
  20: 0.03,
  21: 0.015,
  22: 0.01,
  23: 0.0075,
  24: 0.003,
};

export const cellSize: {[key: number]: {value: number; unit: string}} = {
  0: {value: 1, unit: 'D'},
  1: {value: 50, unit: 'M'},
  2: {value: 30, unit: 'M'},
  3: {value: 20, unit: 'M'},
  4: {value: 10, unit: 'M'},
  5: {value: 5, unit: 'M'},
  6: {value: 2, unit: 'M'},
  7: {value: 1, unit: 'M'},
  8: {value: 30, unit: 'S'},
  9: {value: 15, unit: 'S'},
  10: {value: 5, unit: 'S'},
  11: {value: 3, unit: 'S'},
  12: {value: 1500, unit: 'MS'},
  13: {value: 1000, unit: 'MS'},
  14: {value: 750, unit: 'MS'},
  15: {value: 500, unit: 'MS'},
  16: {value: 300, unit: 'MS'},
  17: {value: 150, unit: 'MS'},
  18: {value: 100, unit: 'MS'},
  19: {value: 75, unit: 'MS'},
  20: {value: 30, unit: 'MS'},
  21: {value: 15, unit: 'MS'},
  22: {value: 10, unit: 'MS'},
  23: {value: 7500, unit: 'MMS'},
  24: {value: 3000, unit: 'MMS'},
};

const factorPerZone: {[key: number]: number} = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 6,
};

function getLongitudinalFactorAndZone(lat: number): {factor: number; zone: number} {
  let factor: number = 1;
  let zone: number = 1;
  lat = Math.abs(lat);
  if (lat >= 50 && lat <= 70) {
    factor = 2;
    zone = 2;
  } else if (lat > 70 && lat <= 75) {
    factor = 3;
    zone = 3;
  } else if (lat > 75 && lat <= 80) {
    factor = 4;
    zone = 4;
  } else if (lat > 80 && lat <= 90) {
    factor = 6;
    zone = 5;
  }
  return {factor, zone};
}

export function getGrid(resolution, bounds) {
  const latMin = bounds[0][0],
    latMax = bounds[1][0],
    longMin = bounds[0][1],
    longMax = bounds[1][1];
  return {
    latitudes: latitudeCoordinates(latMin, latMax, longMin, longMax, resolution),
    longitudes: longitudeCoordinates(latMin, latMax, longMin, longMax, resolution),
  };
}

function latitudeCoordinates(latMin, latMax, longMin, longMax, resolution) {
  const linesLong = [];
  const latSpacing = latitudeSpacing[resolution] / 3600;

  for (let lat = latMin; lat <= latMax; lat += latSpacing) {
    const latLine = [];

    const longRange = range(longMin, longMax, latSpacing);
    for (let lon of longRange) {
      latLine.push([lon, lat]);
    }
    linesLong.push(latLine);
  }

  return linesLong;
}

function longitudeCoordinates(latMin, latMax, longMin, longMax, resolution) {
  const linesLong = [];

  for (let lat = latMin; lat <= latMax; lat += latitudeSpacing[resolution] / 3600) {
    const {factor} = getLongitudinalFactorAndZone(lat);
    const latIncrement = (factor * latitudeSpacing[resolution]) / 3600;

    const longRange = range(longMin, longMax, latIncrement);
    for (let lon of longRange) {
      linesLong.push([
        [lon, lat],
        [lon, lat + latIncrement],
      ]);
    }
  }

  return linesLong;
}

function range(start, stop, step) {
  return Array.from({length: Math.ceil((stop - start) / step)}, (_, i) => start + i * step);
}

function degreesToUnit(value, unit, multiple) {
  const unitMultipliers = {
    D: 1,
    M: 60,
    S: 3600,
    MS: 3600000,
    MMS: 3600000000,
  };

  if (unit in unitMultipliers) {
    return (value * unitMultipliers[unit]) / multiple;
  } else {
    return null;
  }
}

/**
 * Generates a grid identifier based on a given position and level.
 *
 * @param {Array<number>} position - The position as [latitude, longitude].
 * @param {number} level - The level of the grid.
 * @returns {string} The generated grid identifier.
 */
export function cellIdFromPosition(position, level) {
  const [pointLat, pointLong] = position;

  const {factor, zone} = getLongitudinalFactorAndZone(pointLat);

  const unit = cellSize[level].unit;
  const value = cellSize[level].value;
  const latDirection = pointLat >= 0 ? 'N' : 'S';
  const lonDirection = pointLong >= 0 ? 'E' : 'W';
  const latId = Math.round(degreesToUnit(Math.abs(pointLat), unit, value));
  const lonId = Math.round(degreesToUnit(Math.abs(pointLong), unit, value * factor));

  return `Grid_ETRS89-GRS80_z${zone}_${value}${unit}_${latDirection}${latId}_${lonDirection}${lonId}`;
}

function unitToDegrees(minutes, unit, multiple) {
  const unitMultipliers = {
    D: 1,
    M: 1 / 60,
    S: 1 / 3600,
    MS: 1 / 3600000,
    MMS: 1 / 3600000000,
  };

  if (unit in unitMultipliers) {
    return minutes * unitMultipliers[unit] * multiple;
  }

  return null;
}

/**
 * Extracts bounds of grid from the identifier.
 *
 * @param {string} cellIdentifier - The grid cell identifier to parse.
 * @returns {Array<Array<number>>|null} The coordinate positions as [[minLat, minLong], [maxLat, maxLong]], or null if parsing fails.
 */
export function cellBoundsFromId(cellIdentifier) {
  const regex = /^Grid_ETRS89-GRS80_z(\d+)_(\d+[A-Z]+)_([NS])(\d+\.*\d*)_([EW])(\d+\.*\d*)$/;
  const match = RegExp(regex).exec(cellIdentifier);

  if (match) {
    const [, zone, resStr, latDirection, latValue, longDirection, longValue] = match;

    const unit = RegExp(/\D+/).exec(resStr)[0];
    const value = parseInt(resStr);
    const factor = factorPerZone[zone];

    const minLat = unitToDegrees(latValue, unit, value) * (latDirection === 'N' ? 1 : -1);
    const minLong = unitToDegrees(parseFloat(longValue), unit, value) * (longDirection === 'E' ? 1 : -1) * factor;

    let resolution = null;

    for (const key in cellSize) {
      if (cellSize[key].value + cellSize[key].unit === resStr) {
        resolution = key;
        break;
      }
    }
    const latIncrement = latitudeSpacing[resolution] / 3600;
    const maxLat = minLat + latIncrement * (latDirection === 'N' ? 1 : -1);
    const maxLong = (minLong + latIncrement * parseInt(factor)) * (longDirection === 'E' ? 1 : -1);

    return [
      [minLat, minLong],
      [maxLat, maxLong],
    ];
  }

  return null;
}


/**
 * Determines the grid cell that contains the given geographic position.
 *
 * @param {Array<number>} position - The geographic position as [latitude, longitude].
 * @param {number} resolution - The resolution of the grid.
 * @returns {Array<Array<number>>} The boundaries of the grid cell as [minLong, minLat, maxLong, maxLat].
 */
/*
export function getGridCellBoundaries(position, resolution) {
  const [pointLat, pointLong] = position;
  let [minLat, minLong] = etrs89Bounds[0];

  for (let lat = geoBounds[0][0]; lat <= geoBounds[1][0]; lat += latitudeSpacing[resolution] / 3600) {
    if (lat > pointLat) {
      minLat = lat - latitudeSpacing[resolution] / 3600;
      break;
    }
  }

  const factor = getLongitudinalFactorAndZone(minLat, resolution);

  for (let long = geoBounds[0][1]; long <= geoBounds[1][1]; long += (factor * latitudeSpacing[resolution]) / 3600) {
    if (long > pointLong) {
      minLong = long - (factor * latitudeSpacing[resolution]) / 3600;
      break;
    }
  }

  const latIncrement = latitudeSpacing[resolution] / 3600;
  const maxLat = minLat + latIncrement;
  const maxLong = minLong + latIncrement * parseInt(factor);

  return [
    [minLat, minLong],
    [maxLat, maxLong],
  ];
}
*/
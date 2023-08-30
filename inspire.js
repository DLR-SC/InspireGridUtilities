export const latitudeSpacing = {0:3600, 1:3000, 2:1800, 3:1200, 4:600, 5:300, 6:120, 7:60, 8:30, 9:15, 10:5, 11:3, 12:1.5, 13:1, 14:0.75, 15:0.5, 16:0.3, 17:0.15 , 18:0.1, 19:0.075, 20:0.03, 21:0.015, 22:0.01, 23:0.0075, 24:0.003}
export const cellSizeMeters = {
    0: { value: 1, unit: 'D' },
    1: { value: 50, unit: 'M' },
    2: { value: 30, unit: 'M' },
    3: { value: 20, unit: 'M' },
    4: { value: 10, unit: 'M' },
    5: { value: 5, unit: 'M' },
    6: { value: 2, unit: 'M' },
    7: { value: 1, unit: 'M' },
    8: { value: 30, unit: 'S' },
    9: { value: 15, unit: 'S' },
    10: { value: 5, unit: 'S' },
    11: { value: 3, unit: 'S' },
    12: { value: 1500, unit: 'MS' },
    13: { value: 1000, unit: 'MS' },
    14: { value: 750, unit: 'MS' },
    15: { value: 500, unit: 'MS' },
    16: { value: 300, unit: 'MS' },
    17: { value: 150, unit: 'MS' },
    18: { value: 100, unit: 'MS' },
    19: { value: 75, unit: 'MS' },
    20: { value: 30, unit: 'MS' },
    21: { value: 15, unit: 'MS' },
    22: { value: 10, unit: 'MS' },
    23: { value: 7500, unit: 'MMS' },
    24: { value: 3000, unit: 'MMS' },
   };
export const etrs89Bounds = [[32, -16], [85, 40]] //[[latMin, longMin], [latMax, longMax]]
var geoBounds = etrs89Bounds

function getLongitudinalFactor(lat){
    var factor = 1
    if (lat >= 50 && lat <= 70) {
    factor = 2  
    } else if (lat > 70 && lat <= 75) {
    factor = 3
    } else if (lat > 75 && lat <= 80) {
    factor = 4
    }  else if (lat > 80 && lat <= 90) {
    factor = 6 
    }
    return factor
}

/**
* Function to get INSPIRE grid line coordinates
*
* @param {number} resolution - The resolution value.
* @param {Array<Array<number>>} [bounds=[[32, -16], [85, 40]]] - The bounding coordinates in the form [[latMin, longMin], [latMax, longMax]].
* @returns {Object} gridLines - An object containing latitude and longitude grid lines.
* @returns {Array<number>} gridLines.latitudes - Array of latitude coordinates.
* @returns {Array<number>} gridLines.longitudes - Array of longitude coordinates.
*/
export function getGrid(resolution, bounds = etrs89Bounds) {
    
    geoBounds = bounds
    const latMin = bounds[0][0], latMax = bounds[1][0], longMin = bounds[0][1], longMax = bounds[1][1]
    const gridLines = {
        latitudes: latitudeCoordinates(latMin, latMax, longMin, longMax, resolution),
        longitudes: longitudeCoordinates(latMin, latMax, longMin, longMax, resolution)
    };
    return gridLines;
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

function longitudeCoordinates(latMin, latMax, longMin, longMax, resolution){
    const linesLong = [];

    for (let lat = latMin; lat <= latMax; lat += latitudeSpacing[resolution] / 3600) {
        const factor = getLongitudinalFactor(lat);
        const latIncrement = factor * latitudeSpacing[resolution] / 3600;
        
        const longRange = range(longMin, longMax, latIncrement);
        for (let lon of longRange) {
        linesLong.push([[lon, lat], [lon, lat + latIncrement]]);
        }
    }

    return linesLong;
}

function range(start, stop, step) {
    return Array.from({ length: Math.ceil((stop - start) / step) }, (_, i) => start + i * step);
}

function degreesToUnit(value, unit, multiple) {
    const unitMultipliers = {
      'D': 1,
      'M': 60,
      'S': 3600,
      'MS': 3600000,
      'MMS': 3600000000
    };
  
    if (unit in unitMultipliers) {
      return (value * unitMultipliers[unit] / multiple);
    } else {
      return null;
    }
}

/**
 * Generates a grid identifier based on a given position and resolution.
 *
 * @param {Array<number>} position - The position as [latitude, longitude].
 * @param {number} resolution - The resolution of the grid.
 * @returns {string} The generated grid identifier.
 */
export function generateGridCellIdentifier(position, resolution) {
    const [pointLat, pointLong] = position;
    let cellLat = etrs89Bounds[0][0], cellLong = etrs89Bounds[0][1];
    for (let lat = geoBounds[0][0]; lat <= geoBounds[1][0]; lat += latitudeSpacing[resolution] / 3600) {
      if (lat > pointLat) {
        cellLat = lat - latitudeSpacing[resolution] / 3600;
        break;
      }
    }
  
    const factor = getLongitudinalFactor(cellLat, resolution);
    
    for (let long = geoBounds[0][1]; long <= geoBounds[1][1]; long += factor*latitudeSpacing[resolution] / 3600) {
      if (long > pointLong) {
        cellLong = long - factor*latitudeSpacing[resolution] / 3600;
        break;
      }
    }
    
    let unit = cellSizeMeters[resolution].unit, value = cellSizeMeters[resolution].value
    return `Grid_ETRS89-GRS80_z${factor}_${value}${unit}_${cellLat >= 0 ? 'N' : 'S'}${Math.round(degreesToUnit(Math.abs(cellLat), unit, value))}_${cellLong >= 0 ? 'E' : 'W'}${Math.round(degreesToUnit(Math.abs(cellLong), unit, value))}`;
}

function unitToDegrees(minutes, unit, multiple) {
    const unitMultipliers = {
      'D': 1,
      'M': 1 / 60,
      'S': 1 / 3600,
      'MS': 1 / 3600000,
      'MMS': 1 / 3600000000
    };
  
    if (unit in unitMultipliers) {
      return (minutes * unitMultipliers[unit] * multiple);
    } else {
      return null;
    }
}
  
  
  /**
   * Extracts bounds of grid from the identifier.
   *
   * @param {string} cellIdentifier - The grid cell identifier to parse.
   * @returns {Array<Array<number>>|null} The coordinate positions as [[minLat, minLong], [maxLat, maxLong]], or null if parsing fails.
   */
export function extractPositionsFromCellIdentifier(cellIdentifier) {
    const regex = /^Grid_ETRS89-GRS80_z(\d+)_(\d+[A-Z]+)_(N|S)(\d+\.*\d*)_(E|W)(\d+\.*\d*)$/;
    const match = cellIdentifier.match(regex);
  
    if (match) {
      const [, factor, resStr, latDirection, latValue, longDirection, longValue] = match;
  
      const unit =  resStr.match(/\D+/)[0];
      const value = parseInt(resStr);
  
      const minLat = unitToDegrees(latValue, unit, value) * (latDirection === 'N' ? 1 : -1);
      const minLong = unitToDegrees(parseFloat(longValue), unit, value) * (longDirection === 'E' ? 1 : -1);
  
      let resolution = null;
  
      for (const key in cellSizeMeters) {
        if ((cellSizeMeters[key].value + cellSizeMeters[key].unit) === resStr) {
          resolution = key;
          break;
        }
      }
      const latIncrement = latitudeSpacing[resolution] / 3600;
      const maxLat = minLat + latIncrement
      const maxLong = minLong + latIncrement * parseInt(factor)
  
      
      return [[minLat, minLong], [maxLat, maxLong]];
    }
  
    return null;
}

/**
 * Determines the grid cell that contains the given geographic position.
 *
 * @param {Array<number>} position - The geographic position as [latitude, longitude].
 * @param {number} resolution - The resolution of the grid.
 * @returns {Array<number>} The boundaries of the grid cell as [minLong, minLat, maxLong, maxLat].
 */
export function getGridCellBoundaries(position, resolution) {
    const [pointLat, pointLong] = position;
    let [minLat, minLong] = etrs89Bounds[0];
  
    
    for (let lat = geoBounds[0][0]; lat <= geoBounds[1][0]; lat += latitudeSpacing[resolution] / 3600) {
      if (lat > pointLat) {
        minLat = lat - latitudeSpacing[resolution] / 3600;
        break;
      }
    }
  
    const factor = getLongitudinalFactor(minLat, resolution);
  
    for (let long = geoBounds[0][1]; long <= geoBounds[1][1]; long += factor*latitudeSpacing[resolution] / 3600) {
      if (long > pointLong) {
        minLong = long - factor*latitudeSpacing[resolution] / 3600;
        break;
      }
    }
  
    const latIncrement = latitudeSpacing[resolution] / 3600;
    const maxLat = minLat + latIncrement;
    const maxLong = minLong + latIncrement * parseInt(factor);
  
    return [[minLat, minLong], [maxLat, maxLong]];
}
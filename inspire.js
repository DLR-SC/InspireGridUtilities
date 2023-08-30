export const latitudeSpacing = {0:3600, 1:3000, 2:1800, 3:1200, 4:600, 5:300, 6:120, 7:60, 8:30, 9:15, 10:5, 11:3, 12:1.5, 13:1, 14:0.75, 15:0.5, 16:0.3, 17:0.15 , 18:0.1, 19:0.075, 20:0.03, 21:0.015, 22:0.01, 23:0.0075, 24:0.003}
export const etrs89Bounds = [[32, -16], [85, 40]] //[[latMin, longMin], [latMax, longMax]]

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

export function getGrid(res, bounds = etrs89Bounds) {
    /**
    * Function to get INSPIRE grid line coordinates
    *
    * @param {number} res - The resolution value.
    * @param {Array<Array<number>>} [bounds=[[32, -16], [85, 40]]] - The bounding coordinates in the form [[latMin, longMin], [latMax, longMax]].
    * @returns {Object} gridLines - An object containing latitude and longitude grid lines.
    * @returns {Array<number>} gridLines.latitudes - Array of latitude coordinates.
    * @returns {Array<number>} gridLines.longitudes - Array of longitude coordinates.
    */
    const latMin = bounds[0][0], latMax = bounds[1][0], longMin = bounds[0][1], longMax = bounds[1][1]
    const gridLines = {
        latitudes: latitudeCoordinates(latMin, latMax, longMin, longMax, res),
        longitudes: longitudeCoordinates(latMin, latMax, longMin, longMax, res)
    };
    return gridLines;
}
  
function latitudeCoordinates(latMin, latMax, longMin, longMax, res) {
    const linesLong = [];
    const latSpacing = latitudeSpacing[res] / 3600;

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

function longitudeCoordinates(latMin, latMax, longMin, longMax, res){
    const linesLong = [];

    for (let lat = latMin; lat <= latMax; lat += latitudeSpacing[res] / 3600) {
        const factor = getLongitudinalFactor(lat);
        const latIncrement = factor * latitudeSpacing[res] / 3600;
        
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
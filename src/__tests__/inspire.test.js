import {describe, test, expect} from '@jest/globals';
import {
  cellBoundsFromId,
  cellIdFromPosition,
} from '../inspire';
import { toBeDeepCloseTo, toMatchCloseTo } from "jest-matcher-deep-close-to";

expect.extend({toBeDeepCloseTo, toMatchCloseTo});
describe('cellIdFromPosition', () => {
  describe('origin', () => {
    test('position [0, 0], level 0', () => {
      expect(cellIdFromPosition([0, 0], 0)).toBe('Grid_ETRS89-GRS80_z1_1D_N0_E0');
    });

    test('position [0, 0], level 10', () => {
      expect(cellIdFromPosition([0, 0], 10)).toBe('Grid_ETRS89-GRS80_z1_5S_N0_E0');
    });
  });

  describe('zone 1 north', () => {
    test('position [35, 20], level 0', () => {
      expect(cellIdFromPosition([35, 20], 0)).toBe('Grid_ETRS89-GRS80_z1_1D_N35_E20');
    });

    test('position [35, 20], level 1', () => {
      expect(cellIdFromPosition([35, 20], 1)).toBe('Grid_ETRS89-GRS80_z1_50M_N42_E24');
    });

    test('position [35, 20], level 2', () => {
      expect(cellIdFromPosition([35, 20], 2)).toBe('Grid_ETRS89-GRS80_z1_30M_N70_E40');
    });

    test('position [35, 20], level 3', () => {
      expect(cellIdFromPosition([35, 20], 3)).toBe('Grid_ETRS89-GRS80_z1_20M_N105_E60');
    });

    test('position [35, 20], level 4', () => {
      expect(cellIdFromPosition([35, 20], 4)).toBe('Grid_ETRS89-GRS80_z1_10M_N210_E120');
    });

    test('position [35, 20], level 5', () => {
      expect(cellIdFromPosition([35, 20], 5)).toBe('Grid_ETRS89-GRS80_z1_5M_N420_E240');
    });

    test('position [35, 20], level 6', () => {
      expect(cellIdFromPosition([35, 20], 6)).toBe('Grid_ETRS89-GRS80_z1_2M_N1050_E600');
    });

    test('position [35, 20], level 7', () => {
      expect(cellIdFromPosition([35, 20], 7)).toBe('Grid_ETRS89-GRS80_z1_1M_N2100_E1200');
    });

    test('position [35, 20], level 8', () => {
      expect(cellIdFromPosition([35, 20], 8)).toBe('Grid_ETRS89-GRS80_z1_30S_N4200_E2400');
    });

    test('position [35, 20], level 9', () => {
      expect(cellIdFromPosition([35, 20], 9)).toBe('Grid_ETRS89-GRS80_z1_15S_N8400_E4800');
    });

    test('position [35, 20], level 10', () => {
      expect(cellIdFromPosition([35, 20], 10)).toBe('Grid_ETRS89-GRS80_z1_5S_N25200_E14400');
    });
  });

  describe('zone 1 south', () => {
    test('position [-35, 20], level 0', () => {
      expect(cellIdFromPosition([-35, 20], 0)).toBe('Grid_ETRS89-GRS80_z1_1D_S35_E20');
    });

    test('position [-35, 20], level 1', () => {
      expect(cellIdFromPosition([-35, 20], 1)).toBe('Grid_ETRS89-GRS80_z1_50M_S42_E24');
    });

    test('position [-35, 20], level 2', () => {
      expect(cellIdFromPosition([-35, 20], 2)).toBe('Grid_ETRS89-GRS80_z1_30M_S70_E40');
    });

    test('position [-35, 20], level 3', () => {
      expect(cellIdFromPosition([-35, 20], 3)).toBe('Grid_ETRS89-GRS80_z1_20M_S105_E60');
    });

    test('position [-35, 20], level 4', () => {
      expect(cellIdFromPosition([-35, 20], 4)).toBe('Grid_ETRS89-GRS80_z1_10M_S210_E120');
    });

    test('position [-35, 20], level 5', () => {
      expect(cellIdFromPosition([-35, 20], 5)).toBe('Grid_ETRS89-GRS80_z1_5M_S420_E240');
    });

    test('position [-35, 20], level 6', () => {
      expect(cellIdFromPosition([-35, 20], 6)).toBe('Grid_ETRS89-GRS80_z1_2M_S1050_E600');
    });

    test('position [-35, 20], level 7', () => {
      expect(cellIdFromPosition([-35, 20], 7)).toBe('Grid_ETRS89-GRS80_z1_1M_S2100_E1200');
    });

    test('position [-35, 20], level 8', () => {
      expect(cellIdFromPosition([-35, 20], 8)).toBe('Grid_ETRS89-GRS80_z1_30S_S4200_E2400');
    });

    test('position [-35, 20], level 9', () => {
      expect(cellIdFromPosition([-35, 20], 9)).toBe('Grid_ETRS89-GRS80_z1_15S_S8400_E4800');
    });

    test('position [-35, 20], level 10', () => {
      expect(cellIdFromPosition([-35, 20], 10)).toBe('Grid_ETRS89-GRS80_z1_5S_S25200_E14400');
    });
  });

  describe('zone 2 north', () => {
    test('position [62, 20], level 0', () => {
      expect(cellIdFromPosition([62, 20], 0)).toBe('Grid_ETRS89-GRS80_z2_1D_N62_E10');
    });

    test('position [62, 20], level 1', () => {
      expect(cellIdFromPosition([62, 20], 1)).toBe('Grid_ETRS89-GRS80_z2_50M_N74_E12');
    });

    test('position [62, 20], level 2', () => {
      expect(cellIdFromPosition([62, 20], 2)).toBe('Grid_ETRS89-GRS80_z2_30M_N124_E20');
    });

    test('position [62, 20], level 3', () => {
      expect(cellIdFromPosition([62, 20], 3)).toBe('Grid_ETRS89-GRS80_z2_20M_N186_E30');
    });

    test('position [62, 20], level 4', () => {
      expect(cellIdFromPosition([62, 20], 4)).toBe('Grid_ETRS89-GRS80_z2_10M_N372_E60');
    });

    test('position [62, 20], level 5', () => {
      expect(cellIdFromPosition([62, 20], 5)).toBe('Grid_ETRS89-GRS80_z2_5M_N744_E120');
    });

    test('position [62, 20], level 6', () => {
      expect(cellIdFromPosition([62, 20], 6)).toBe('Grid_ETRS89-GRS80_z2_2M_N1860_E300');
    });

    test('position [62, 20], level 7', () => {
      expect(cellIdFromPosition([62, 20], 7)).toBe('Grid_ETRS89-GRS80_z2_1M_N3720_E600');
    });

    test('position [62, 20], level 8', () => {
      expect(cellIdFromPosition([62, 20], 8)).toBe('Grid_ETRS89-GRS80_z2_30S_N7440_E1200');
    });

    test('position [62, 20], level 9', () => {
      expect(cellIdFromPosition([62, 20], 9)).toBe('Grid_ETRS89-GRS80_z2_15S_N14880_E2400');
    });

    test('position [62, 20], level 10', () => {
      expect(cellIdFromPosition([62, 20], 10)).toBe('Grid_ETRS89-GRS80_z2_5S_N44640_E7200');
    });
  });

  describe('zone 2 south', () => {
    test('position [-62, 20], level 0', () => {
      expect(cellIdFromPosition([-62, 20], 0)).toBe('Grid_ETRS89-GRS80_z2_1D_S62_E10');
    });

    test('position [-62, 20], level 1', () => {
      expect(cellIdFromPosition([-62, 20], 1)).toBe('Grid_ETRS89-GRS80_z2_50M_S74_E12');
    });

    test('position [-62, 20], level 2', () => {
      expect(cellIdFromPosition([-62, 20], 2)).toBe('Grid_ETRS89-GRS80_z2_30M_S124_E20');
    });

    test('position [-62, 20], level 3', () => {
      expect(cellIdFromPosition([-62, 20], 3)).toBe('Grid_ETRS89-GRS80_z2_20M_S186_E30');
    });

    test('position [-62, 20], level 4', () => {
      expect(cellIdFromPosition([-62, 20], 4)).toBe('Grid_ETRS89-GRS80_z2_10M_S372_E60');
    });

    test('position [-62, 20], level 5', () => {
      expect(cellIdFromPosition([-62, 20], 5)).toBe('Grid_ETRS89-GRS80_z2_5M_S744_E120');
    });

    test('position [-62, 20], level 6', () => {
      expect(cellIdFromPosition([-62, 20], 6)).toBe('Grid_ETRS89-GRS80_z2_2M_S1860_E300');
    });

    test('position [-62, 20], level 7', () => {
      expect(cellIdFromPosition([-62, 20], 7)).toBe('Grid_ETRS89-GRS80_z2_1M_S3720_E600');
    });

    test('position [-62, 20], level 8', () => {
      expect(cellIdFromPosition([-62, 20], 8)).toBe('Grid_ETRS89-GRS80_z2_30S_S7440_E1200');
    });

    test('position [-62, 20], level 9', () => {
      expect(cellIdFromPosition([-62, 20], 9)).toBe('Grid_ETRS89-GRS80_z2_15S_S14880_E2400');
    });

    test('position [-62, 20], level 10', () => {
      expect(cellIdFromPosition([-62, 20], 10)).toBe('Grid_ETRS89-GRS80_z2_5S_S44640_E7200');
    });
  });
});

describe('cellBoundsFromId', () => {
  describe('origin', () => {
    test('z1_1D_N0_E0', () => {
      expect(cellBoundsFromId('Grid_ETRS89-GRS80_z1_1D_N0_E0')).toEqual([[0, 0], [1, 1]]);
    });

    test('z1_5S_N0_E0', () => {
      expect(cellBoundsFromId('Grid_ETRS89-GRS80_z1_5S_N0_E0')).toBeDeepCloseTo([[0, 0], [0.001389, 0.001389]], 5);
    });

    test('z1_1D_S0_W0', () => {
      expect(cellBoundsFromId('Grid_ETRS89-GRS80_z1_1D_S0_W0')).toBeDeepCloseTo([[0, 0], [-1, -1]], 5);
    });

    test('z1_5S_S0_W0', () => {
      expect(cellBoundsFromId('Grid_ETRS89-GRS80_z1_5S_S0_W0')).toBeDeepCloseTo([[0, 0], [-0.001389, -0.001389]], 5);
    });
  });

  describe('zone 1 north', () => {
    test('z1_1D_N35_E20', () => {
      expect(cellBoundsFromId('Grid_ETRS89-GRS80_z1_1D_N35_E20')).toBeDeepCloseTo([[35, 20], [36, 21]], 5);
    });

    test('z1_5S_N25200_E14400', () => {
      expect(cellBoundsFromId('Grid_ETRS89-GRS80_z1_5S_N25200_E14400')).toBeDeepCloseTo([[35, 20], [35.001389, 20.001389]], 5);
    });
  });

  describe('zone 1 south', () => {
    test('z1_1D_S35_E20', () => {
      expect(cellBoundsFromId('Grid_ETRS89-GRS80_z1_1D_S35_E20')).toBeDeepCloseTo([[-35, 20], [-36, 21]], 5);
    });

    test('z1_5S_S25200_E14400', () => {
      expect(cellBoundsFromId('Grid_ETRS89-GRS80_z1_5S_S25200_E14400')).toBeDeepCloseTo([[-35, 20], [-35.001389, 20.001389]], 5);
    });
  });

  describe('zone 2 north', () => {
    test('z2_1D_N62_E10', () => {
      expect(cellBoundsFromId('Grid_ETRS89-GRS80_z2_1D_N62_E10')).toBeDeepCloseTo([[62, 20], [63, 22]], 5);
    });

    test('z2_5S_N44640_E7200', () => {
      expect(cellBoundsFromId('Grid_ETRS89-GRS80_z2_5S_N44640_E7200')).toBeDeepCloseTo([[62, 20], [62.001389, 20.002778]], 5);
    });
  });

  describe('zone 2 south', () => {
    test('z2_1D_S62_E10', () => {
      expect(cellBoundsFromId('Grid_ETRS89-GRS80_z2_1D_S62_E10')).toBeDeepCloseTo([[-62, 20], [-63, 22]], 5);
    });

    test('z2_5S_S44640_E7200', () => {
      expect(cellBoundsFromId('Grid_ETRS89-GRS80_z2_5S_S44640_E7200')).toBeDeepCloseTo([[-62, 20], [-62.001389, 20.002778]], 5);
    });
  });
});


/*
describe('extractPositionsFromCellIdentifier', () => {
  test('cellIdentifier Grid_ETRS89-GRS80_z1_5M_N35_E20', () => {
    expect(extractPositionsFromCellIdentifier('Grid_ETRS89-GRS80_z1_5M_N35_E20')).toEqual([
      [35, 20],
      [35.083333333333336, 20.083333333333332],
    ]);
  });
});

describe('getGridCellBoundaries', () => {
  test('position [35, 20], resolution 5', () => {
    expect(getGridCellBoundaries([35, 20], 5)).toEqual([
      [35, 20],
      [35.083333333333336, 20.083333333333332],
    ]);
  });
});*/

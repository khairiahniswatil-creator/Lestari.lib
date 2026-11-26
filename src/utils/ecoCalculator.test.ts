import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePaperSavings } from './ecoCalculator';

test('calculates sheets, water, and CO2 savings for virgin paper baseline', () => {
  const result = calculatePaperSavings({
    pagesRead: 200,
    copiesAvoided: 2,
    paperBaseline: 'virgin',
    digitalReadingHours: 5,
    lowCarbonMode: false,
  });

  // 200 pages / 2 = 100 sheets per copy * 2 copies = 200 sheets
  assert.equal(result.sheetsSaved, 200);
  assert.equal(result.paperWeightKg, 0.9);
  assert.equal(result.waterSavedLiters, 2000);
  assert.equal(result.printCo2AvoidedKg, 1.7);
  assert.equal(result.digitalReadingCo2Kg, 0.12);
  assert.equal(result.netCo2SavedKg, 1.58);
});

test('low-carbon mode reduces digital reading emissions compared to standard mode', () => {
  const standard = calculatePaperSavings({
    pagesRead: 120,
    copiesAvoided: 1,
    paperBaseline: 'recycled',
    digitalReadingHours: 4,
    lowCarbonMode: false,
  });
  const lowCarbon = calculatePaperSavings({
    pagesRead: 120,
    copiesAvoided: 1,
    paperBaseline: 'recycled',
    digitalReadingHours: 4,
    lowCarbonMode: true,
  });

  assert.ok(lowCarbon.digitalReadingCo2Kg < standard.digitalReadingCo2Kg);
  assert.ok(lowCarbon.netCo2SavedKg > standard.netCo2SavedKg);
});

test('handles zero pages gracefully without NaN', () => {
  const result = calculatePaperSavings({
    pagesRead: 0,
    copiesAvoided: 1,
    paperBaseline: 'virgin',
    digitalReadingHours: 0,
    lowCarbonMode: true,
  });

  assert.equal(result.sheetsSaved, 0);
  assert.equal(result.treesSaved, 0);
  assert.equal(result.netCo2SavedKg, 0);
});

import type { PaperSavingsInput, PaperSavingsResult } from '../types/library';

/**
 * Pure environmental impact calculator for digital library reading.
 *
 * Baseline factors (transparent lifecycle estimates):
 * - 1 double-sided printed sheet = 2 book pages (rounded up per physical copy)
 * - 1 A4/B5 book sheet (80gsm) = 0.0045 kg (4.5 g)
 * - 1 standard pulpwood tree produces ~8,333 book sheets (37.5 kg paper)
 * - Virgin paper water footprint = 10 L/sheet; recycled paper = 4.5 L/sheet
 * - Virgin paper print+distribution footprint = 0.0085 kg CO2e/sheet;
 *   recycled paper = 0.0051 kg CO2e/sheet
 * - Digital device + network transfer reading footprint:
 *   standard mode = 0.024 kg CO2e/hour; low-carbon mode = 0.015 kg CO2e/hour
 */
export function calculatePaperSavings(input: PaperSavingsInput): PaperSavingsResult {
  const safePages = Math.max(0, Math.floor(input.pagesRead || 0));
  const safeCopies = Math.max(0, Math.floor(input.copiesAvoided || 0));
  const safeHours = Math.max(0, Number(input.digitalReadingHours) || 0);

  if (safePages === 0 || safeCopies === 0) {
    const digitalOnly = safeHours * (input.lowCarbonMode ? 0.015 : 0.024);
    return {
      sheetsSaved: 0,
      paperWeightKg: 0,
      treesSaved: 0,
      waterSavedLiters: 0,
      printCo2AvoidedKg: 0,
      digitalReadingCo2Kg: round2(digitalOnly),
      netCo2SavedKg: round2(-digitalOnly),
    };
  }

  const sheetsPerCopy = Math.ceil(safePages / 2);
  const sheetsSaved = sheetsPerCopy * safeCopies;
  const paperWeightKg = sheetsSaved * 0.0045;
  const treesSaved = sheetsSaved / 8333;

  const waterPerSheet = input.paperBaseline === 'virgin' ? 10 : 4.5;
  const co2PerSheet = input.paperBaseline === 'virgin' ? 0.0085 : 0.0051;

  const waterSavedLiters = sheetsSaved * waterPerSheet;
  const printCo2AvoidedKg = sheetsSaved * co2PerSheet;
  const digitalReadingCo2Kg = safeHours * (input.lowCarbonMode ? 0.015 : 0.024);
  const netCo2SavedKg = printCo2AvoidedKg - digitalReadingCo2Kg;

  return {
    sheetsSaved,
    paperWeightKg: round2(paperWeightKg),
    treesSaved: round3(treesSaved),
    waterSavedLiters: Math.round(waterSavedLiters),
    printCo2AvoidedKg: round2(printCo2AvoidedKg),
    digitalReadingCo2Kg: round2(digitalReadingCo2Kg),
    netCo2SavedKg: round2(netCo2SavedKg),
  };
}

function round2(val: number): number {
  const rounded = Math.round(val * 100) / 100;
  return rounded === 0 ? 0 : rounded;
}

function round3(val: number): number {
  const rounded = Math.round(val * 1000) / 1000;
  return rounded === 0 ? 0 : rounded;
}

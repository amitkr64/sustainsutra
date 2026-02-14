/**
 * Smart number formatting utilities for BRSR Analysis
 * Prevents excessive decimal places while maintaining precision
 *
 * IMPORTANT: All GHG/emission values are NORMALIZED to tCO2 (tonnes CO2 equivalent)
 * for uniformity across all company reports. Display formatting handles appropriate scaling.
 */

// ============================================================================
// GHG UNIT CONVERSION UTILITIES
// ============================================================================

/**
 * GHG Unit conversion factors to tCO2 (tonnes CO2 equivalent)
 * All values are converted to tCO2 as the standard base unit
 */
const GHG_UNIT_CONVERSIONS = {
  // Base unit
  'tCO2e': 1,           // tonnes CO2 equivalent
  'tCO2': 1,            // tonnes CO2

  // Metric prefixes
  'ktCO2e': 1000,       // kilotonnes = 1,000 tonnes
  'ktCO2': 1000,
  'KtCO2e': 1000,
  'KtCO2': 1000,
  'kTonne': 1000,

  'MtCO2e': 1000000,    // megatonnes = 1,000,000 tonnes
  'MtCO2': 1000000,
  'Million tCO2': 1000000,
  'Million tCO2e': 1000000,
  'Million Tonnes': 1000000,

  'GtCO2e': 1000000000, // gigatonnes = 1,000,000,000 tonnes
  'GtCO2': 1000000000,

  // Alternative unit names
  'Tonne': 1,
  'Tonnes': 1,
  'Metric Ton': 1,
  'Metric Tonne': 1,
  'Ton': 1,
};

/**
 * Convert any GHG value with unit to tCO2 (tonnes CO2 equivalent)
 * @param {number} value - The GHG value
 * @param {string} unit - The unit of the value (e.g., 'tCO2e', 'MtCO2e', 'ktCO2e')
 * @returns {number} Value in tCO2 (tonnes)
 */
export const convertToTCO2 = (value, unit) => {
  if (value === null || value === undefined || isNaN(value)) return 0;
  if (!unit) return value; // Assume already in tCO2 if no unit specified

  // Normalize unit string
  const normalizedUnit = unit.trim().replace(/\s+/g, ' ');
  const conversionFactor = GHG_UNIT_CONVERSIONS[normalizedUnit];

  if (conversionFactor) {
    return value * conversionFactor;
  }

  // Log warning for unknown units but return original value
  console.warn(`Unknown GHG unit: "${unit}". Assuming value is already in tCO2.`);
  return value;
};

/**
 * Convert tCO2 value to specified unit
 * @param {number} valueInTCO2 - Value in tonnes CO2 equivalent
 * @param {string} targetUnit - Target unit to convert to
 * @returns {number} Converted value
 */
export const convertFromTCO2 = (valueInTCO2, targetUnit) => {
  if (valueInTCO2 === null || valueInTCO2 === undefined || isNaN(valueInTCO2)) return 0;
  if (!targetUnit) return valueInTCO2;

  const normalizedUnit = targetUnit.trim().replace(/\s+/g, ' ');
  const conversionFactor = GHG_UNIT_CONVERSIONS[normalizedUnit];

  if (conversionFactor) {
    return valueInTCO2 / conversionFactor;
  }

  console.warn(`Unknown target unit: "${targetUnit}". Returning original value in tCO2.`);
  return valueInTCO2;
};

/**
 * Detect if a unit string is a valid GHG unit
 * @param {string} unit - Unit string to check
 * @returns {boolean} True if valid GHG unit
 */
export const isGHGUnit = (unit) => {
  if (!unit) return false;
  const normalizedUnit = unit.trim().replace(/\s+/g, ' ');
  return Object.prototype.hasOwnProperty.call(GHG_UNIT_CONVERSIONS, normalizedUnit);
};

/**
 * Get conversion factor for a unit
 * @param {string} unit - Unit string
 * @returns {number|undefined} Conversion factor or undefined if not found
 */
export const getGHGConversionFactor = (unit) => {
  if (!unit) return undefined;
  const normalizedUnit = unit.trim().replace(/\s+/g, ' ');
  return GHG_UNIT_CONVERSIONS[normalizedUnit];
};

/**
 * Format a number with appropriate decimal places
 * @param {number} value - The value to format
 * @param {number} maxDecimals - Maximum decimal places (default: 2)
 * @returns {string} Formatted number string
 */
export const formatNumber = (value, maxDecimals = 2) => {
  if (value === null || value === undefined) return '0';
  if (typeof value !== 'number') return '0';
  if (isNaN(value)) return '0';
  if (value === 0) return '0';

  const absValue = Math.abs(value);

  // For very small numbers, use scientific notation
  if (absValue < 0.0001 && value !== 0) {
    const result = value.toExponential(2);
    return isNaN(result) ? '0' : result;
  }
  // For small numbers (< 0.01), show up to 3 decimals, no trailing zeros
  if (absValue < 0.01) {
    const rounded = parseFloat(value.toFixed(3));
    return isNaN(rounded) ? '0' : rounded.toString();
  }
  // For small-medium numbers, show up to 2 decimals, no trailing zeros
  if (absValue < 100) {
    const rounded = parseFloat(value.toFixed(maxDecimals));
    return isNaN(rounded) ? '0' : rounded.toString();
  }
  // For large numbers, show as integer
  const result = value.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  return result || '0';
};

/**
 * Format a percentage with appropriate precision
 * @param {number} value - The percentage value
 * @param {number} maxDecimals - Maximum decimal places (default: 1)
 * @returns {string} Formatted percentage string
 */
export const formatPercent = (value, maxDecimals = 1) => {
  if (value === null || value === undefined) return '0%';
  if (typeof value !== 'number' || isNaN(value)) return '0%';
  const absValue = Math.abs(value);

  // For very small percentages, show more precision
  if (absValue < 0.01 && value !== 0) {
    const result = value.toFixed(3);
    return isNaN(result) ? '0%' : result + '%';
  }
  if (absValue < 0.1) {
    const result = value.toFixed(2);
    return isNaN(result) ? '0%' : result + '%';
  }
  const result = value.toFixed(maxDecimals);
  return isNaN(result) ? '0%' : result + '%';
};

/**
 * Format intensity value with smart scaling
 * Handles values that may be very small or very large
 * @param {number} value - The intensity value
 * @param {string} unit - The unit (e.g., 'GJ/₹ Cr', 'tCO2e/₹ Cr')
 * @returns {object} { value: string, unit: string }
 */
export const formatIntensity = (value, unit) => {
  // Handle null/undefined/zero/NaN
  if (value === null || value === undefined) return { value: '0', unit };
  if (typeof value !== 'number' || isNaN(value)) return { value: '0', unit };
  if (value === 0) return { value: '0', unit };

  const absValue = Math.abs(value);

  // Very small values (< 0.0001) - use scientific notation
  if (absValue < 0.0001) {
    const result = value.toExponential(1);
    return { value: isNaN(result) ? '0' : result, unit };
  }

  // Small values (< 0.01) - round to 4 decimals max
  if (absValue < 0.01) {
    const rounded = Math.round(value * 10000) / 10000;
    return { value: isNaN(rounded) ? '0' : rounded.toString(), unit };
  }

  // All other values - round to 2 decimals max
  const rounded = Math.round(value * 100) / 100;
  return { value: isNaN(rounded) ? '0' : rounded.toString(), unit };
};

/**
 * Format energy value (GJ base unit) with appropriate scaling
 * @param {number} valueInGJ - Value in Gigajoules
 * @returns {object} { value: number, unit: string }
 */
export const formatEnergy = (valueInGJ) => {
  if (valueInGJ === null || valueInGJ === undefined) return { value: 0, unit: 'GJ' };
  if (typeof valueInGJ !== 'number' || isNaN(valueInGJ)) return { value: 0, unit: 'GJ' };
  if (valueInGJ === 0) return { value: 0, unit: 'GJ' };
  if (valueInGJ >= 1000) return { value: Math.round((valueInGJ / 1000) * 10) / 10, unit: 'TJ' };
  return { value: Math.round(valueInGJ * 10) / 10, unit: 'GJ' };
};

/**
 * Format GHG value (ALWAYS in tCO2 as base unit) with appropriate display scaling
 * Note: Input value should be in tCO2. This function handles display formatting only.
 * For display:
 * - < 1,000: show as tCO2
 * - 1,000 - 999,999: show as ktCO2 (thousands)
 * - >= 1,000,000: show as MtCO2 (millions)
 *
 * @param {number} valueInTCO2e - Value in tonnes CO2e
 * @param {boolean} forceTCO2 - Force display in tCO2 regardless of magnitude
 * @returns {object} { value: number, unit: string, originalTCO2: number }
 */
export const formatGHG = (valueInTCO2e, forceTCO2 = false) => {
  if (valueInTCO2e === null || valueInTCO2e === undefined) return { value: 0, unit: 'tCO2e', originalTCO2: 0 };
  if (typeof valueInTCO2e !== 'number' || isNaN(valueInTCO2e)) return { value: 0, unit: 'tCO2e', originalTCO2: 0 };
  if (valueInTCO2e === 0) return { value: 0, unit: 'tCO2e', originalTCO2: 0 };

  // Always store the original value
  const originalTCO2 = valueInTCO2e;

  // Force tCO2 display if requested
  if (forceTCO2) {
    return { value: Math.round(valueInTCO2e * 100) / 100, unit: 'tCO2e', originalTCO2 };
  }

  // Auto-scale based on magnitude
  if (valueInTCO2e >= 1000000) {
    return { value: Math.round((valueInTCO2e / 1000000) * 100) / 100, unit: 'MtCO2e', originalTCO2 };
  }
  if (valueInTCO2e >= 1000) {
    return { value: Math.round((valueInTCO2e / 1000) * 10) / 10, unit: 'ktCO2e', originalTCO2 };
  }
  return { value: Math.round(valueInTCO2e * 100) / 100, unit: 'tCO2e', originalTCO2 };
};

/**
 * Format GHG value ALWAYS in tCO2 (no scaling)
 * This ensures uniform display across all company reports
 * @param {number} valueInTCO2e - Value in tonnes CO2e
 * @returns {string} Formatted value with tCO2e unit
 */
export const formatGHGAsTCO2 = (valueInTCO2e) => {
  if (valueInTCO2e === null || valueInTCO2e === undefined) return '0 tCO2e';
  if (typeof valueInTCO2e !== 'number' || isNaN(valueInTCO2e)) return '0 tCO2e';
  const formatted = formatNumber(valueInTCO2e, 2);
  return `${formatted} tCO2e`;
};

/**
 * Format water value (KL base unit) with appropriate scaling
 * @param {number} valueInKL - Value in Kiloliters
 * @returns {object} { value: number, unit: string }
 */
export const formatWater = (valueInKL) => {
  if (valueInKL === null || valueInKL === undefined) return { value: 0, unit: 'KL' };
  if (typeof valueInKL !== 'number' || isNaN(valueInKL)) return { value: 0, unit: 'KL' };
  if (valueInKL === 0) return { value: 0, unit: 'KL' };
  if (valueInKL >= 1000000) return { value: Math.round((valueInKL / 1000000) * 10) / 10, unit: 'ML' };
  return { value: Math.round(valueInKL * 10) / 10, unit: 'KL' };
};

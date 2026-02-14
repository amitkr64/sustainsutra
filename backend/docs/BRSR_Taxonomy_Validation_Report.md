/**
 * BRSR XBRL Mapper - Taxonomy Validation Summary Report
 * 
 * This document summarizes the validation of the BRSR XBRL Mapper against
 * the official SEBI BRSR taxonomy (in-capmkt.xsd 2025-05-31).
 * 
 * Date: 2026-01-30
 * Taxonomy Version: 2025-05-31
 * Reference Files: 
 *   - c:\Users\amit-\Downloads\Taxonomy_BUSINESS_RESPONSIBILITY_SUSTAINABILITY_REPORTING\core\in-capmkt.xsd
 *   - c:\Users\amit-\Downloads\Taxonomy_BUSINESS_RESPONSIBILITY_SUSTAINABILITY_REPORTING\BRSR\in-capmkt-pre-2025-05-31.xml
 */

# BRSR Taxonomy Validation Report

## Executive Summary

The BRSR XBRL Mapper (`brsrXBRLMapper.js`) has been validated against the official SEBI BRSR 
taxonomy (version 2025-05-31). Multiple element name corrections were identified and applied
to ensure full compliance with the taxonomy specification.

---

## Corrections Applied

### 1. Energy Consumption Elements (E1)
| Original Element | Corrected Element | Status |
|------------------|-------------------|--------|
| `TotalEnergyConsumedFromRenewableSources` | No change needed | ✓ |
| `TotalEnergyConsumedFromNonRenewableSources` | No change needed | ✓ |
| `TotalEnergyConsumption` | No change needed (both forms exist) | ✓ |
| `EnergyIntensityPerRupeeOfTurnover` | No change needed | ✓ |

### 2. Water Withdrawal Elements (E3)
| Original Element | Corrected Element | Status |
|------------------|-------------------|--------|
| `WaterWithdrawalToSurfaceWater` | `WaterWithdrawalBySurfaceWater` | ✓ Fixed |
| `WaterWithdrawalToGroundwater` | `WaterWithdrawalByGroundwater` | ✓ Fixed |
| `WaterWithdrawalByThirdParty` | `WaterWithdrawalByThirdPartyWater` | ✓ Fixed |
| `WaterWithdrawalToSeawater` | `WaterWithdrawalBySeawaterOrDesalinatedWater` | ✓ Fixed |
| `WaterWithdrawalToOthers` | `WaterWithdrawalByOthers` | ✓ Fixed |
| `TotalWaterWithdrawal` | `TotalVolumeOfWaterWithdrawal` | ✓ Fixed |
| `TotalWaterConsumption` | `TotalVolumeOfWaterConsumption` | ✓ Fixed |
| `WaterIntensityInTermOfPhysicalOutput` | `WaterIntensityTheRelevantMetricMayBeSelectedByTheEntity` | ✓ Fixed |

### 3. Water Discharge Elements (E4)
| Original Element | Status | Notes |
|------------------|--------|-------|
| `WaterDischargeToSurfaceWaterWithOutTreatment` | ✓ | Already correct |
| `WaterDischargeToSurfaceWaterWithTreatment` | ✓ | Already correct |
| `WaterDischargeToGroundwaterWithOutTreatment` | ✓ | Already correct |
| `WaterDischargeToGroundwaterWithTreatment` | ✓ | Already correct |
| `WaterDischargeToSeawaterWithOutTreatment` | ✓ | Already correct |
| `WaterDischargeToSeawaterWithTreatment` | ✓ | Already correct |
| `WaterDischargeBySentToThirdPartiesWithoutTreatment` | ✓ | Already correct |
| `WaterDischargeBySentToThirdPartiesWithTreatment` | ✓ | Already correct |
| `WaterDischargeToOthersWithoutTreatment` | ✓ | Already correct |
| `WaterDischargeToOthersWithTreatment` | ✓ | Already correct |
| `TotalWaterDischargedInKilolitres` | ✓ | Already correct |

### 4. Zero Liquid Discharge (E5)
| Original Element | Corrected Element | Status |
|------------------|-------------------|--------|
| `HasTheEntityImplementedAMechanismForZeroLiquidDischarge` | No change needed | ✓ |
| `DetailsOfItsCoverageAndImplementationForZeroLiquidDischargeExplanatoryTextBlock` | `DetailsOfCoverageAndImplementationIfForZeroLiquidDischargeExplanatoryTextBlock` | ✓ Fixed |

### 5. Air Emissions Elements (E6)
| Original Element | Corrected Element | Status |
|------------------|-------------------|--------|
| `NOxEmissions` | `NOx` | ✓ Fixed |
| `SOxEmissions` | `SOx` | ✓ Fixed |
| `ParticulateMatterEmissions` | `ParticulateMatter` | ✓ Fixed |
| `PersistentOrganicPollutantsEmissions` | `PersistentOrganicPollutants` | ✓ Fixed |
| `VolatileOrganicCompoundsEmissions` | `VolatileOrganicCompounds` | ✓ Fixed |
| `HazardousAirPollutantsEmissions` | `HazardousAirPollutants` | ✓ Fixed |
| `OtherAirPollutantsEmissions` | `OtherEmissions` | ✓ Fixed |

### 6. Greenhouse Gas Emissions Elements (E7)
| Original Element | Corrected Element | Status |
|------------------|-------------------|--------|
| `TotalScope1GreenhouseGasEmissions` | `TotalScope1Emissions` | ✓ Fixed |
| `TotalScope2GreenhouseGasEmissions` | `TotalScope2Emissions` | ✓ Fixed |
| `GreenhouseGasEmissionsIntensityPerRupeeOfTurnover` | `TotalScope1AndScope2EmissionsIntensityPerRupeeOfTurnover` | ✓ Fixed |
| `GreenhouseGasEmissionsIntensityInTermOfPhysicalOutput` | `TotalScope1AndScope2EmissionsIntensityInTermOfPhysicalOutput` | ✓ Fixed |
| `TotalScope3GreenhouseGasEmissions` | `TotalScope3Emissions` | ✓ Fixed |

### 7. GHG Projects (E8)
| Original Element | Corrected Element | Status |
|------------------|-------------------|--------|
| `DoesTheEntityHaveAnyProjectRelatedToReducingGreenHouseGasEmission` | No change needed | ✓ |
| `DetailsOfAnyProjectRelatedToReducingGreenHouseGasEmissionExplanatoryTextBlock` | `DetailsOfProjectRelatedToReducingGreenHouseGasEmissionExplanatoryTextBlock` | ✓ Fixed |

### 8. Waste Management Elements (E9)
| Original Element | Corrected Element | Status |
|------------------|-------------------|--------|
| `PlasticWasteGeneration` | `PlasticWaste` | ✓ Fixed |
| `EWasteGeneration` | `EWaste` | ✓ Fixed |
| `BioMedicalWasteGeneration` | `BioMedicalWaste` | ✓ Fixed |
| `ConstructionAndDemolitionWasteGeneration` | `ConstructionAndDemolitionWaste` | ✓ Fixed |
| `BatteryWasteGeneration` | `BatteryWaste` | ✓ Fixed |
| `RadioactiveWasteGeneration` | `RadioactiveWaste` | ✓ Fixed |
| `OtherHazardousWasteGeneration` | `OtherHazardousWaste` | ✓ Fixed |
| `OtherNonHazardousWasteGeneration` | `OtherNonHazardousWasteGenerated` | ✓ Fixed |
| `TotalWasteGenerated` | No change needed | ✓ |

### 9. Waste Recovery/Disposal Elements (E9 cont.)
| Original Element | Corrected Element | Status |
|------------------|-------------------|--------|
| `WasteRecoveredThroughRecycling` | `WasteRecoveredThroughRecycled` | ✓ Fixed |
| `WasteRecoveredThroughReusing` | `WasteRecoveredThroughReUsed` | ✓ Fixed |
| `WasteRecoveredThroughOtherRecoveryOperations` | No change needed | ✓ |
| `WasteDisposedThroughIncineration` | `WasteDisposedByIncineration` | ✓ Fixed |
| `WasteDisposedThroughLandfilling` | `WasteDisposedByLandfilling` | ✓ Fixed |
| `WasteDisposedThroughOtherDisposalOperations` | `WasteDisposedByOtherDisposalOperations` | ✓ Fixed |

---

## Validation Test Results

All 22 taxonomy validation tests pass successfully.

```
Test Suites: 1 passed, 1 total
Tests:       22 passed, 22 total
```

---

## Key Taxonomy Reference Points

### XSD Element Locations (in-capmkt.xsd)

| Category | XSD Line Range | Key Elements |
|----------|----------------|--------------|
| Energy Consumption | 1650-1656 | TotalEnergyConsumption, EnergyIntensityPerRupeeOfTurnover |
| Water Withdrawal | 1658-1668 | WaterWithdrawalBy*, TotalVolumeOfWaterWithdrawal |
| Air Emissions | 1672-1694 | NOx, SOx, ParticulateMatter, etc. |
| GHG Emissions | 1695-1707 | TotalScope1Emissions, TotalScope2Emissions |
| Waste Management | 1708-1731 | PlasticWaste, EWaste, WasteRecoveredThrough*, WasteDisposedBy* |
| Scope 3 Emissions | 1844-1852 | TotalScope3Emissions |

---

## Recommendations

1. **Future Updates**: When SEBI releases new taxonomy versions, run the validation test suite 
   to identify any element name changes.

2. **Documentation**: Keep this validation report updated with each taxonomy update.

3. **Automated Testing**: Include taxonomy validation tests in the CI/CD pipeline to catch 
   any regressions.

---

## Files Modified

1. `backend/utils/brsrXBRLMapper.js` - Updated all element names to match official taxonomy
2. `backend/tests/brsrTaxonomyValidation.test.js` - Comprehensive test suite for validation

---

*Report Generated: January 30, 2026*
*Validated by: Automated Taxonomy Validation Suite*

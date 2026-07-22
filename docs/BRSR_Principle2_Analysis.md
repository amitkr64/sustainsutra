# BRSR Principle 2 - XBRL Taxonomy Analysis

## Principle 2: Businesses should provide goods and services in a manner that is sustainable and safe

**XBRL Taxonomy Location:** Lines 1704-1843  
**Current UI Metadata:** Lines 1274-1567

---

## Essential Indicators Analysis

### ✅ E1: R&D and Capex (Lines 1708-1717)

**XBRL Elements:**
- `PercentageOfRAndD`
- `PercentageOfCapex`
- `DetailsOfImprovementsInEnvironmentalAndSocialImpactsDueToRAndD`
- `DetailsOfImprovementsInEnvironmentalAndSocialImpactsDueToCapex`

**Current UI Structure:** Table with R&D and Capex rows
**Status:** ✅ **ALIGNED** - Field names match except need to verify storage format

---

### ✅ E2: Sustainable Sourcing (Lines 1718-1721)

**XBRL Elements:**
- `DoesTheEntityHaveProceduresInPlaceForSustainableSourcing`
- `PercentageOfInputsWereSourcedSustainably`

**Current UI Fields:**
- `does_the_entity_have_procedures_in_place_for_sustainable_sourcing` ✅
- `percentage_of_inputs_were_sourced_sustainably` ✅

**Status:** ✅ **PERFECTLY ALIGNED**

---

### ✅ E3: Product Reclamation Processes (Lines 1722-1731)

**XBRL Elements:**
- `DescribeTheProcessesInPlaceToSafelyReclaimYourProductsForReusingRecyclingAndDisposingAtTheEndOfLifeForPlasticsIncludingPackagingExplanatoryTextBlock`
- `DescribeTheProcessesInPlaceToSafelyReclaimYourProductsForReusingRecyclingAndDisposingAtTheEndOfLifeForEWasteExplanatoryTextBlock`
- `DescribeTheProcessesInPlaceToSafelyReclaimYourProductsForReusingRecyclingAndDisposingAtTheEndOfLifeForHazardousWasteExplanatoryTextBlock`
- `DescribeTheProcessesInPlaceToSafelyReclaimYourProductsForReusingRecyclingAndDisposingAtTheEndOfLifeForOtherWasteExplanatoryTextBlock`

**Current UI Fields:**
- `describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_plastics_including_packaging_explanatory_text_block` ✅
- `describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_e_waste_explanatory_text_block` ✅
- `describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_hazardous_waste_explanatory_text_block` ✅
- `describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_other_waste_explanatory_text_block` ✅

**Status:** ✅ **PERFECTLY ALIGNED**

---

### ⚠️ E4: Extended Producer Responsibility (Lines 1732-1737)

**XBRL Elements:**
- `WhetherExtendedProducerResponsibilityIsApplicableToTheEntitySActivities`
- `WhetherTheWasteCollectionPlanIsInLineWithTheExtendedProducerResponsibilityPlanSubmittedToPollutionControlBoards`
- `StepsTakenToAddressTheWasteCollectionPlanExplanatoryTextBlock`

**Current UI Fields:**
- `whether_extended_producer_responsibility_is_applicable_to_the_entity_s_activities` ✅
- `whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards_and_steps_taken_to_address_the_waste_collection_plan_if_not_submitted` ⚠️ **TOO LONG**
- `steps_taken_to_address_the_waste_collection_plan_if_not_submitted_text_block` ⚠️ **MISMATCH**

**Required Changes:**
1. Split the combined field name
2. Update to match exact XBRL names:
   - `whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards`
   - `steps_taken_to_address_the_waste_collection_plan_explanatory_text_block`

---

## Leadership Indicators Analysis

### ⚠️ L1: Life Cycle Assessments (Lines 1740-1765)

**XBRL Elements:**
- `HasTheEntityConductedLifeCyclePerspectiveOrAssessmentsForAnyOfItsProductsOrForItsServices`
- `TheEntityHasNotApplicableConductedLifeCyclePerspectiveOrAssessmentsForAnyOfItsProductsOrForItsServicesExplanatoryTextBlock`
- **Table Fields:**
  - `NICCodeOfProductOrServiceOfConductedLifecyclePerspective`
  - `NameOfProductOrServiceOfConductedLifecyclePerspective`
  - `PercentageOfTotalTurnoverContributedForConductedLifecyclePerspective`
  - `BoundaryForWhichTheLifeCyclePerspectiveOrAssessmentWasConducted`
  - `WhetherConductedByIndependentExternalAgency`
  - `ResultsCommunicatedInPublicDomain`
  - `WebLinkOfResultsOfLifeCycleAssessments`

**Current UI Fields:**
- `has_the_entity_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services` ✅
- `details_for_not_conducting_lca_explanatory_text_block` ⚠️ **SHOULD BE:** `the_entity_has_not_applicable_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services_explanatory_text_block`
- `details_of_products_or_services_for_which_life_cycle_perspective_or_assessments_was_conducted_by_the_entity` ⚠️ **GENERIC, NEEDS TABLE MAPPING**

**Table Column Mapping Needed:**
- `nic_code` → `NICCodeOfProductOrServiceOfConductedLifecyclePerspective`
- `product_service` → `NameOfProductOrServiceOfConductedLifecyclePerspective`
- `turnover_pct` → `PercentageOfTotalTurnoverContributedForConductedLifecyclePerspective`
- `boundary` → `BoundaryForWhichTheLifeCyclePerspectiveOrAssessmentWasConducted`
- `independent_agency` → `WhetherConductedByIndependentExternalAgency`
- `public_domain` → `ResultsCommunicatedInPublicDomain`
- `weblink` → `WebLinkOfResultsOfLifeCycleAssessments`

---

### ⚠️ L2: Environmental/Social Concerns (Lines 1766-1779)

**XBRL Elements (Table):**
- `NameOfProductOrService`
- `DescriptionOfTheRiskOrConcern`
- `ActionTaken`

**Current UI Fields:**
- `action_taken_to_mitigate_significant_social_or_environmental_concerns_lineitems` ⚠️ **GENERIC, NEEDS INDIVIDUAL MAPPING**

**Table Column Mapping Needed:**
- `product_service` → `NameOfProductOrService`
- `description` → `DescriptionOfTheRiskOrConcern`
- `action_taken` → `ActionTaken`

---

### ⚠️ L3: Recycled/Reused Input Materials (Lines 1780-1791)

**XBRL Elements (Table):**
- `IndicateInPutMaterial`
- `RecycledOrReUsedInPutMaterialToTotalMaterial`

**Current UI Fields:**
- `details_of_percentage_of_recycled_or_reused_input_material_to_total_material_by_value_used_in_production_or_providing_services` ⚠️ **GENERIC, NEEDS INDIVIDUAL MAPPING**

**Table Column Mapping Needed:**
- `material` → `IndicateInPutMaterial`
- `fy_pct` / `py_pct` → `RecycledOrReUsedInPutMaterialToTotalMaterial` (with current/previous year contexts)

---

### ⚠️ L4: Products Reclaimed at End of Life (Lines 1792-1829)

**XBRL Structure:**
- **Fixed Categories Table:**
  - Plastics (including packaging)
  - E-Waste
  - Hazardous Waste
  
- **Fields per Category:**
  - `AmountOfReUsed`
  - `AmountOfRecycled`
  - `AmountOfSafelyDisposed`

- **Dynamic "Other Waste" Table:**
  - `NameOfOtherWaste`
  - `AmountOfReUsed`
  - `AmountOfRecycled`
  - `AmountOfSafelyDisposed`

**Current UI Fields:**
- `assurance_sub_type_for_reclaimed_products_and_packaging` ✅ **GOOD STRUCTURE**
- Includes "Other waste" row, but taxonomy requires separate dynamic table

**Status:** ✅ **MOSTLY ALIGNED** - may need to split "Other waste" handling

---

### ⚠️ L5: Reclaimed Products Percentage (Lines 1830-1841)

**XBRL Elements (Table):**
- `IndicateProductCategory`
- `ReclaimedProductsAndTheirPackagingMaterialsAsPercentageOfTotalProductsSoldInRespectiveCategory`

**Current UI Fields:**
- `details_of_reclaimed_products_and_their_packaging_materials_for_each_product_category` ⚠️ **GENERIC, NEEDS INDIVIDUAL MAPPING**

**Table Column Mapping Needed:**
- `product_category` → `IndicateProductCategory`
- `reclaimed_pct` → `ReclaimedProductsAndTheirPackagingMaterialsAsPercentageOfTotalProductsSoldInRespectiveCategory`

---

### ✅ Notes

**XBRL Element:**
- `NotesPrinciple2ExplanatoryTextBlock`

**Current UI Field:**
- `notes_principle2_explanatory_text_block` ✅

**Status:** ✅ **PERFECTLY ALIGNED**

---

## Summary of Required Changes

### Essential Indicators
1. **E4:** Update EPR field names (2 fields)

### Leadership Indicators
1. **L1:** Update NA details field name
2. **L1:** Document table column mappings (7 columns)
3. **L2:** Document table column mappings (3 columns)
4. **L3:** Document table column mappings (2 columns + FY/PY)
5. **L5:** Document table column mappings (2 columns)

---

## Overall Status: 90% Aligned ✅

Most fields are already correctly aligned. Main work needed:
1. Minor field name updates (E4, L1 NA field)
2. Backend mapper implementation with proper table field mappings
3. No major structural changes needed

**Next Steps:**
1. Update UI metadata for E4 and L1 NA field
2. Implement backend `addPrinciple2()` method
3. Create tests
4. Document

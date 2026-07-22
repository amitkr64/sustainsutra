# BRSR Principle 3 - XBRL Taxonomy Analysis

## Principle 3: Businesses should respect and promote the well-being of all employees, including those in their value chains

**XBRL Taxonomy:** Lines 1845-2199  
**Complexity:** ⚠️ **VERY HIGH** - Most complex principle with deeply nested table structures  
**Estimated Time:** 2-3 hours

---

## Structure Overview

### Essential Indicators: 15 questions
### Leadership Indicators: 6 questions
### Total XBRL Elements:** Hundreds (due to complex multi-axis tables)

---

## Essential Indicators (E1-E15)

### E1: Measures for Well-being of Employees/Workers (Lines 1849-1906)
**Complexity:** ⭐⭐⭐⭐⭐ VERY HIGH

**XBRL Structure:**
- **Multi-dimensional table** with 3 axes:
  1. **BenefitsOfWellBeingAxis:**
     - TotalEmployeeBenefitsMember
     - HealthInsuranceMember
     - AccidentInsuranceMember
     - MaternityBenefitsMember
     - PaternityBenefitsMember
     - DayCareFacilitiesMember
  
  2. **WellBeingEmployeesOrWorkersAxis:**
     - WellBeingEmployeesMember
       - PermanentEmployeesMember
       - OtherThanPermanentEmployeesMember
     - WellBeingWorkersMember
       - PermanentWorkersMember
       - OtherThanPermanentWorkersMember
  
  3. **GenderAxis:**
     - MaleMember
     - FemaleMember
     - OtherGenderMember

**Fields per combination:**
- `NumberOfWellBeingOfEmployeesOrWorkers`
- `PercentageOfWellBeingOfEmployeesOrWorkers`

**Spending Section:**
- `AmountOfCostIncurredOnWellBeingMeasures`
- `TotalRevenueOfTheCompany`
- `PercentageOfCostIncurredOnWellBeingMeasuresWithRespectToTotalRevenueOfTheCompany`

**Current UI:** Has separate tables for employees and workers

---

### E2: Retirement Benefits (Lines 1907-1942)
**Complexity:** ⭐⭐⭐⭐ HIGH

**XBRL Structure:**
- **Fixed Benefits:**
  - ProvidentFundMember
  - GratuityMember
  - ES IMember

**Fields per benefit:**
- `NumberOfEmployeesCoveredAsPercentageOfTotalEmployees`
- `NumberOfEmployeesCoveredAsPercentageOfTotalWorker`
- `DeductedAndDepositedWithTheAuthority`

**Other Retirement Benefits (Dynamic Table):**
- `NameOfOtherRetirementBenefits`
- (Same 3 fields as above)

---

### E3: Accessibility of Workplaces  (Lines 1943-1950)
**Complexity:** ⭐⭐ LOW

**XBRL Fields:**
- `AreThePremisesOrOfficesOfTheEntityAccessibleToDifferentlyAbledEmployeesAndWorkers`
- `ThePremisesOrOfficesOfTheEntityAccessibleToDifferentlyAbledEmployeesAndWorkersAreNotApplicableExplanatoryTextBlock`
- `WhetherAnyStepsAreBeingTakenByTheEntityIfThePremisesOrOfficesOfTheEntityNotAccessibleToDifferentlyAbledEmployeesAndWorkersExplanatoryTextBlock`

---

### E4: Equal Opportunity Policy (Lines 1951-1956)
**Complexity:** ⭐⭐ LOW

**XBRL Fields:**
- `DoesTheEntityHaveAnEqualOpportunityPolicyAsPerTheRightsOfPersonsWithDisabilitiesAct2016`
- `TheEntityHasNotApplicableAnEqualOpportunityPolicyAsPerTheRightsOfPersonsWithDisabilitiesAct2016ExplanatoryTextBlock`
- `WebLinkOfEqualOppertunityPolicyTextBlock`

---

### E5: Return to Work & Retention Rates (Lines 1957-1980)
**Complexity:** ⭐⭐⭐ MEDIUM

**XBRL Structure:**
- **Table with GenderAxis** (Male, Female, Other)

**Fields:**
- `ReturnToWorkRatePermanentEmployeesThatTookParentalLeave`
- `ReturnToWorkRatePermanentWorkersThatTookParentalLeave`
- `RetentionRatesPermanentEmployeesThatTookParentalLeave`
- `RetentionRatesPermanentWorkersThatTookParentalLeave`

---

### E6: Grievance Redressal Mechanism (Lines 1981-1998)
**Complexity:** ⭐⭐ LOW

**XBRL Fields:** (4 categories)
- `IsThereAMechanismAvailableToReceiveAndRedressGrievancesForPermanentWorkers`
  - `DetailsOfMechanismAvailableToReceiveAndRedressGrievancesForPermanentWorkersExplanatoryTextBlock`
- `IsThereAMechanismAvailableToReceiveAndRedressGrievancesForOtherThanPermanentWorkers`
  - `DetailsOfMechanismAvailableToReceiveAndRedressGrievancesForOtherThanPermanentWorkersExplanatoryTextBlock`
- `IsThereAMechanismAvailableToReceiveAndRedressGrievancesForPermanentEmployees`
  - `DetailsOfMechanismAvailableToReceiveAndRedressGrievancesForPermanentEmployeesExplanatoryTextBlock`
- `IsThereAMechanismAvailableToReceiveAndRedressGrievancesForOtherThanPermanentEmployees`
  - ` DetailsOfMechanismAvailableToReceiveAndRedressGrievancesForOtherThanPermanentEmployeesExplanatoryTextBlock`

---

### E7: Membership in Associations/Unions (Lines 1999-2028)
**Complexity:** ⭐⭐⭐⭐ HIGH

**XBRL Structure:**
- **Table with 2 axes:**
  1. **PermanentEmployeesAndWorkersAxis:**
     - PermanentEmployeesMember
     - PermanentWorkersMember
  2. **GenderAxis:**
     - Male, Female, Other

**Fields:**
- `TotalNumberOfEmployeesOrWorkersForMembership`
- `NumberOfEmployeesOrWorkersArePartOfAssociationsOrUnion`
- `PercentageOfEmployeesOrWorkersArePartOfAssociationsOrUnionOfTotalNumberOfEmployee`

---

### E8: Training Given to Employees/Workers (Lines 2029-2066)
**Complexity:** ⭐⭐⭐⭐⭐ VERY HIGH

**XBRL Structure:**
- **Table with 3 axes:**
  1. **TrainingGivenToEmployeesAndWorkersAxis:**
     - TotalEmployeesAndWorkersMember
     - OnHealthAndSafetyMeasuresMember
     - OnSkillUpgradationMember
  2. **EmployeesAndWorkersAxis:**
     - EmployeesMember
     - WorkersMember
  3. **GenderAxis:**
     - Male, Female, Other

**Fields:**
- `NumberOfTrainedEmployeesOrWorkers`
- `PercentageOfTrainedEmployeesOrWorkers`

---

### E9: Performance and Career Development Reviews (Lines 2067-2096)
**Complexity:** ⭐⭐⭐⭐ HIGH

**XBRL Structure:**
- **Table with 2 axes:**
  1. **EmployeesAndWorkersAxis:** Employees, Workers
  2. **GenderAxis:** Male, Female, Other

**Fields:**
- `TotalNumberOfEmployeesOrWorkersForPerformanceAndCareerDevelopment`
- `NumberOfEmployeesOrWorkerForPerformanceAndCareerDevelopment`
- `PercentageOfEmployeesOrWorkerForPerformanceAndCareerDevelopment`

---

### E10: Health and Safety Management System (Lines 2097-2114)
**Complexity:** ⭐⭐⭐ MEDIUM

**XBRL Fields:**
- `WhetherAnOccupationalHealthAndSafetyManagementSystemHasBeenImplementedByTheEntity`
  - `DetailsOfOccupationalHealthAndSafetyManagementSystemExplanatoryTextBlock`
  - `AnOccupationalHealthAndSafetyManagementSystemHasBeenNotApplicableToTheEntityExplanatoryTextBlock`
- `DesclosureOfTheProcessesUsedToIdentifyWorkRelatedHazardsAndAssessRisksOnARoutineAndNonRoutineBasisByTheEntityExplanatoryTextBlock`
- `WhetherYouHaveProcessesForWorkersToReportTheWorkRelatedHazardsAndToRemoveThemselvesFromSuchRisks`
  - `ProcessesForWorkersToReportTheWorkRelatedHazardsAndToRemoveThemselvesFromSuchRisksIsNotApplicableExplanatoryTextBlock`
- `DoTheEmployeesOrWorkerOfTheEntityHaveAccessToNonOccupationalMedicalAndHealthcareServices`
  - `DetailsIfTheEmployeesOrWorkerOfTheEntityHaveAccessToNonOccupationalMedicalAndHealthcareServicesIsNotApplicableExplanatoryTextBlock`

---

### E11: Safety Related Incidents (Lines 2115-2136)
**Complexity:** ⭐⭐⭐ MEDIUM

**XBRL Structure:**
- **Table with EmployeesAndWorkersAxis** (Employees, Workers)

**Fields:**
- `LostTimeInjuryFrequencyRatePerOneMillionPersonHoursWorked`
- `TotalRecordableWorkRelatedInjuries`
- `NumberOfFatalities`
- `HighConsequenceWorkRelatedInjuryOrIllHealthExcludingFatalities`

---

### E12: Safe and Healthy Workplace Measures (Lines 2137-2138)
**Complexity:** ⭐ VERY LOW

**XBRL Field:**
- `DescribeTheMeasuresTakenByTheEntityToEnsureASafeAndHealthyWorkPlaceExplanatoryTextBlock`

---

### E13: Complaints by Employees/Workers (Lines 2139-2158)
**Complexity:** ⭐⭐⭐ MEDIUM

**XBRL Structure:**
- **Table with ComplaintsAxis:**
  - WorkingConditionsComplaintsMember
  - HealthSafetyComplaintsMember

**Fields:**
- `NumberOfComplaintsFiledDuringTheYear`
- `NumberOfComplaintsPendingResolutionAtTheEndOfYear`
- `RemarksforComplaintsExplanatoryTextBlock`

---

### E14: Health & Safety Assessments (Lines 2159-2164)
**Complexity:** ⭐⭐ LOW

**XBRL Fields:**
- `PercentageOfHealthAndSafetyPracticesOfYourPlantsAndOfficesThatWereAssessedP3`
- `PercentageOfWorkingConditionsOfYourPlantsAndOfficesThatWereAssessedP3`

---

### E15: Corrective Actions (Lines 2165-2166)
**Complexity:** ⭐ VERY LOW

**XBRL Field:**
- `DetailsOfAnyCorrectiveActionTakenOrUnderwayToAddressSafetyRelatedIncidentsOfYourPlantsAndOfficesThatWereAssessedExplanatoryTextBlock`

---

## Leadership Indicators (L1-L6)

### L1: Life Insurance for Employees (Line 2169)
**Complexity:** ⭐ VERY LOW

**XBRL Field:**
- `DoesTheEntityExtendAnyLifeInsuranceOrAnyCompensatoryPackageInTheEventOfDeathOfEmployees`

---

### L2: Life Insurance for Workers (Line 2171)
**Complexity:** ⭐ VERY LOW

**XBRL Field:**
- `DoesTheEntityExtendAnyLifeInsuranceOrAnyCompensatoryPackageInTheEventOfDeathOfWorkers`

---

### L3: Value Chain Statutory Dues (Line 2173)
**Complexity:** ⭐ VERY LOW

**XBRL Field:**
- `DetailsOfMeasuresUndertakenByTheEntityToEnsureThatStatutoryDuesHaveBeenDeductedAndDepositedByTheValueChainPartnersExplanatoryTextBlock`

---

### L4: Rehabilitation & Placement (Lines 2175-2184)
**Complexity:** ⭐⭐ LOW

**XBRL Fields:**
- `TotalNumberOfAffectedEmployees`
- `TotalNumberOfAffectedWorkers`
- `NumberOfEmployeesOrWhoseFamilyMembersRehabilitatedAndPlacedInSuitableEmployment`
- `NumberOfWorkersOrWhoseFamilyMembersRehabilitatedAndPlacedInSuitableEmployment`

---

### L5: Transition Assistance Programs (Lines 2185-2188)
**Complexity:** ⭐⭐ LOW

**XBRL Fields:**
- `DoesTheEntityProvideTransitionAssistanceProgramsToFacilitateContinuedEmployabilityAndTheManagementOfCareerEndingsResultingFromRetirementOrTerminationOfEmployment`
- `TheEntityHasNotApplicableTransitionAssistanceProgramsToFacilitateContinuedEmployabilityAndTheManagementOfCareerEndingsResultingFromRetirementOrTerminationOfEmploymentExplanatoryTextBlock`

---

### L6: Value Chain Partner Assessments (Lines 2189-2196)
**Complexity:** ⭐⭐ LOW

**XBRL Fields:**
- `PercentageOfHealthAndSafetyPracticesOfValueChainPartnersP3`
- `PercentageOfWorkingConditionsOfValueChainPartnersP3`
- `DetailsOfAnyCorrectiveActionTakenOrUnderwayToAddressSafetyRelatedIncidentsOnAssessmentOfValueChainPartnersExplanatoryTextBlock`

---

### Notes (Line 2197)
**Complexity:** ⭐ VERY LOW

**XBRL Field:**
- `NotesPrinciple3ExplanatoryTextBlock`

---

## Summary

### Complexity Breakdown

| Complexity | Count | Indicators |
|------------|-------|------------|
| ⭐⭐⭐⭐⭐ (Very High) | 2 | E1 (Well-being), E8 (Training) |
| ⭐⭐⭐⭐ (High) | 4 | E2 (Retirement), E7 (Membership), E9 (Performance) |
| ⭐⭐⭐ (Medium) | 4 | E5 (Parental Leave), E10 (H&S System), E11 (Safety Incidents), E13 (Complaints) |
| ⭐⭐ (Low) | 6 | E3, E4, E6, E14, L4, L5, L6 |
| ⭐ (Very Low) | 5 | E12, E15, L1, L2, L3, Notes |

---

## Key Challenges

1. **Multi-Axis Tables:** E1 and E8 have 3-dimensional data structures
2. **Member Context Mapping:** Extensive use of member contexts for categorization
3. **Nested Hierarchies:** Employee/Worker → Permanent/Non-Permanent → Male/Female/Other
4. **Existing UI Storage:** Need to analyze how current tables map to XBRL structure

---

## Recommended Approach

### Phase 1: Simple Fields (30 min)
- Map all single fields (E3, E4, E6, E12, E15, L1, L2, L3, L5, Notes)

### Phase 2: Medium Complexity Tables (45 min)
- E5: Parental leave (1 axis + gender)
- E10: Health & safety system
- E11: Safety incidents (1 axis)
- E13: Complaints (1 axis)
- E14: Assessments
- L4: Rehabilitation
- L6: Value chain assessments

### Phase 3: High Complexity Tables (60 min)
- E2: Retirement benefits (with dynamic table)
- E7: Union membership (2 axes)
- E9: Performance reviews (2 axes)

### Phase 4: Very High Complexity (45 min)
- E1: Well-being measures (3 axes + spending)
- E8: Training (3 axes)

---

## Next Steps

Due to the extreme complexity (21 questions, hundreds of XBRL elements, multi-dimensional tables), I recommend:

1. **Tonight:** Review this analysis
2. **Tomorrow:** 
   - Implement Phase 1 & 2 (simple + medium complexity)
   - Test the implementation
3. **Day 2:**
   - Implement Phase 3 & 4 (high + very high complexity)
   - Full integration testing

**Total Estimated Time:** 3-4 hours of focused work

---

## Status
- ✅ Analysis Complete
- ⏳ UI Updates Pending
- ⏳ Backend Mapping Pending
- ⏳ Testing Pending

// Principle 3 XBRL Mapping Helper
// Employee Well-being and Safety

module.exports = {
    addPrinciple3(mapper, root, reportData) {
        const timeContext = 'CurrentYear';
        const prevContext = 'PreviousYear';

        // E3: Accessibility
        mapper.addElement(root, 'AreThePremisesOrOfficesOfTheEntityAccessibleToDifferentlyAbledEmployeesAndWorkers',
            reportData.are_the_premises_or_offices_of_the_entity_accessible_to_differently_abled_employees_and_workers, timeContext);

        if (reportData.steps_taken_if_premises_not_accessible) {
            mapper.addElement(root, 'WhetherAnyStepsAreBeingTakenByTheEntityIfThePremisesOrOfficesOfTheEntityNotAccessibleToDifferentlyAbledEmployeesAndWorkersExplanatoryTextBlock',
                reportData.steps_taken_if_premises_not_accessible, timeContext);
        }

        // E4: Equal Opportunity Policy
        mapper.addElement(root, 'DoesTheEntityHaveAnEqualOpportunityPolicyAsPerTheRightsOfPersonsWithDisabilitiesAct2016',
            reportData.does_the_entity_have_an_equal_opportunity_policy_as_per_the_rights_of_persons_with_disabilities_act2016, timeContext);

        if (reportData.weblink_of_equal_opportunity_policy) {
            mapper.addElement(root, 'WebLinkOfEqualOppertunityPolicyTextBlock',
                reportData.weblink_of_equal_opportunity_policy, timeContext);
        }

        // E10: Health & Safety Management System
        mapper.addElement(root, 'WhetherAnOccupationalHealthAndSafetyManagementSystemHasBeenImplementedByTheEntity',
            reportData.p3_e10_a_status, timeContext);

        if (reportData.p3_e10_a_details_yes) {
            mapper.addElement(root, 'DetailsOfOccupationalHealthAndSafetyManagementSystemExplanatoryTextBlock',
                reportData.p3_e10_a_details_yes, timeContext);
        }

        if (reportData.p3_e10_b_details) {
            mapper.addElement(root, 'DesclosureOfTheProcessesUsedToIdentifyWorkRelatedHazardsAndAssessRisksOnARoutineAndNonRoutineBasisByTheEntityExplanatoryTextBlock',
                reportData.p3_e10_b_details, timeContext);
        }

        // E12: Safe Workplace Measures
        if (reportData.p3_e12_measures_details) {
            mapper.addElement(root, 'DescribeTheMeasuresTakenByTheEntityToEnsureASafeAndHealthyWorkPlaceExplanatoryTextBlock',
                reportData.p3_e12_measures_details, timeContext);
        }

        // E14: Assessments
        mapper.addElement(root, 'PercentageOfHealthAndSafetyPracticesOfYourPlantsAndOfficesThatWereAssessedP3',
            reportData.p3_e14_health_safety_pct, timeContext, 'Pure');
        mapper.addElement(root, 'PercentageOfWorkingConditionsOfYourPlantsAndOfficesThatWereAssessedP3',
            reportData.p3_e14_working_conditions_pct, timeContext, 'Pure');

        // E15: Corrective Actions
        if (reportData.p3_e15_corrective_details) {
            mapper.addElement(root, 'DetailsOfAnyCorrectiveActionTakenOrUnderwayToAddressSafetyRelatedIncidentsOfYourPlantsAndOfficesThatWereAssessedExplanatoryTextBlock',
                reportData.p3_e15_corrective_details, timeContext);
        }

        // L1 & L2: Life Insurance
        mapper.addElement(root, 'DoesTheEntityExtendAnyLifeInsuranceOrAnyCompensatoryPackageInTheEventOfDeathOfEmployees',
            reportData.p3_l1_employees_insurance, timeContext);
        mapper.addElement(root, 'DoesTheEntityExtendAnyLifeInsuranceOrAnyCompensatoryPackageInTheEventOfDeathOfWorkers',
            reportData.p3_l1_workers_insurance, timeContext);

        // L3: Statutory Dues
        if (reportData.p3_l2_statutory_dues_measures) {
            mapper.addElement(root, 'DetailsOfMeasuresUndertakenByTheEntityToEnsureThatStatutoryDuesHaveBeenDeductedAndDepositedByTheValueChainPartnersExplanatoryTextBlock',
                reportData.p3_l2_statutory_dues_measures, timeContext);
        }

        // L4: Rehabilitation
        mapper.addElement(root, 'TotalNumberOfAffectedEmployees', reportData.p3_l3_emp_total_affected_fy, timeContext, 'Pure');
        mapper.addElement(root, 'TotalNumberOfAffectedWorkers', reportData.p3_l3_worker_total_affected_fy, timeContext, 'Pure');
        mapper.addElement(root, 'NumberOfEmployeesOrWhoseFamilyMembersRehabilitatedAndPlacedInSuitableEmployment',
            reportData.p3_l3_emp_rehab_fy, timeContext, 'Pure');
        mapper.addElement(root, 'NumberOfWorkersOrWhoseFamilyMembersRehabilitatedAndPlacedInSuitableEmployment',
            reportData.p3_l3_worker_rehab_fy, timeContext, 'Pure');

        // L5: Transition Assistance
        mapper.addElement(root, 'DoesTheEntityProvideTransitionAssistanceProgramsToFacilitateContinuedEmployabilityAndTheManagementOfCareerEndingsResultingFromRetirementOrTerminationOfEmployment',
            reportData.p3_l4_transition_status, timeContext);

        // L6: Value Chain Assessments
        mapper.addElement(root, 'PercentageOfHealthAndSafetyPracticesOfValueChainPartnersP3',
            reportData.p3_l5_health_safety_pct, timeContext, 'Pure');
        mapper.addElement(root, 'PercentageOfWorkingConditionsOfValueChainPartnersP3',
            reportData.p3_l5_working_conditions_pct, timeContext, 'Pure');

        if (reportData.p3_l6_corrective_details) {
            mapper.addElement(root, 'DetailsOfAnyCorrectiveActionTakenOrUnderwayToAddressSafetyRelatedIncidentsOnAssessmentOfValueChainPartnersExplanatoryTextBlock',
                reportData.p3_l6_corrective_details, timeContext);
        }

        // Notes
        if (reportData.p3_general_notes) {
            mapper.addElement(root, 'NotesPrinciple3ExplanatoryTextBlock',
                reportData.p3_general_notes, timeContext);
        }
    }
};

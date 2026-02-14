/**
 * Add Principle 1: Businesses should conduct and govern themselves with Ethics, Transparency and Accountability
 */
addPrinciple1(root, reportData) {
    // Essential Indicator 1: Training and awareness programmes (table with segments)
    if (reportData.assurance_sub_type_for_percentage_coverage_by_training_and_awareness_programs_on_any_of_the_principles_during_the_financial_year_for_bod_or_kmp_or_employee_or_worker) {
        try {
            const trainingData = JSON.parse(reportData.assurance_sub_type_for_percentage_coverage_by_training_and_awareness_programs_on_any_of_the_principles_during_the_financial_year_for_bod_or_kmp_or_employee_or_worker);
            trainingData.forEach((row, idx) => {
                // Map to segment-specific contexts
                const segmentContext = `CurrentYear_${row.segment}Segment`;
                this.addElement(root, 'TotalNumberOfTrainingAndAwarenessProgramsHeld', row.total_number, segmentContext, 'Pure');
                this.addElement(root, 'TopicsOrPrinciplesCoveredUnderTheTrainingAndItsImpact', row.topics_covered, segmentContext);
                this.addElement(root, 'PercentageOfPersonsInRespectiveCategoryCoveredByTheAwarenessProgrammes', row.percentage_covered, segmentContext, 'Pure');
            });
        } catch (e) {
            console.error('Error parsing training data:', e);
        }
    }

    // Essential Indicator 2: Fines/penalties (stored as JSON for different categories)
    this.addTableElement(root, 'BriefOfTheMonetary CaseForPenaltyOrFineExplanatoryTextBlock',
        reportData.brief_of_the_monetary_case_for_penalty_or_fine_explanatory_text_block, 'PenaltyOrFineAxis');
    this.addTableElement(root, 'BriefOfTheMonetaryCaseForSettlementExplanatoryTextBlock',
        reportData.brief_of_the_monetary_case_for_settlement_explanatory_text_block, 'SettlementAxis');
    this.addTableElement(root, 'BriefOfTheMonetaryCaseForCompoundingFeeExplanatoryTextBlock',
        reportData.brief_of_the_monetary_case_for_compounding_fee_explanatory_text_block, 'CompoundingFeeAxis');
    this.addTableElement(root, 'BriefOfTheMonetaryCaseForImprisonmentExplanatoryTextBlock',
        reportData.brief_of_the_monetary_case_for_imprisonment_explanatory_text_block, 'ImprisonmentAxis');
    this.addTableElement(root, 'BriefOfTheMonetaryCaseForPunishmentExplanatoryTextBlock',
        reportData.brief_of_the_monetary_case_for_punishment_explanatory_text_block, 'PunishmentAxis');

    // Essential Indicator 3: Appeal/Revision details
    this.addTableElement(root, 'Details OfTheAppealOrRevisionPreferredInCasesWhereMonetaryOrNonMonetaryActionHasBeenAppealed',
        reportData.details_of_the_appeal_or_revision_preferred_in_cases_where_monetary_or_non_monetary_action_has_been_appealed, 'AppealOrRevisionAxis');

    // Essential Indicator 4: Anti-corruption / anti-bribery policy
    this.addElement(root, 'DoesTheEntityHaveAnAntiCorruptionOrAntiBriberyPolicy',
        reportData.does_the_entity_have_an_anti_corruption_or_anti_bribery_policy, 'CurrentYear');
    this.addElement(root, 'AntiCorruptionOrAntiBriberyPolicyExplanatoryTextBlock',
        reportData.anti_corruption_or_anti_bribery_policy_explanatory_text_block, 'CurrentYear');
    this.addElement(root, 'WebLinkAtAntiCorruptionOrAntiBriberyPolicyIsPlace',
        reportData.web_link_at_anti_corruption_or_anti_bribery_policy_is_place, 'CurrentYear');
    this.addElement(root, 'DetailsForTheEntityHaveNotApplicableAnAntiCorruptionOrAntiBriberyPolicyExplanatoryTextBlock',
        reportData.details_for_the_entity_have_not_applicable_an_anti_corruption_or_anti_bribery_policy_explanatory_text_block, 'CurrentYear');

    // Essential Indicator 5: Disciplinary actions
    this.addElement(root, 'NumberOfDirectorsAgainstWhomDisciplinaryActionWasTaken',
        reportData.number_of_directors_against_whom_disciplinary_action_was_taken, 'CurrentYear', 'Pure');
    this.addElement(root, 'NumberOfKMPsAgainstWhomDisciplinaryActionWasTaken',
        reportData.number_of_km_ps_against_whom_disciplinary_action_was_taken, 'CurrentYear', 'Pure');
    this.addElement(root, 'NumberOfEmployeesAgainstWhomDisciplinaryActionWasTaken',
        reportData.number_of_employees_against_whom_disciplinary_action_was_taken, 'CurrentYear', 'Pure');
    this.addElement(root, 'NumberOfWorkersAgainstWhomDisciplinaryActionWasTaken',
        reportData.number_of_workers_against_whom_disciplinary_action_was_taken, 'CurrentYear', 'Pure');

    // Essential Indicator 6: Conflict of interest complaints
    this.addElement(root, 'NumberOfComplaintsReceivedInRelationToIssuesOfConflictOfInterestOfTheDirectors',
        reportData.number_of_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_directors, 'CurrentYear', 'Pure');
    this.addElement(root, 'NumberOfComplaintsReceivedInRelationToIssuesOfConflictOfInterestOfTheKMPs',
        reportData.number_of_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_km_ps, 'CurrentYear', 'Pure');
    this.addElement(root, 'RemarksInCaseComplaintsReceivedInRelationToIssuesOfConflictOfInterestOfTheDirectors',
        reportData.remarks_in_case_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_directors, 'CurrentYear');
    this.addElement(root, 'RemarksInCaseComplaintsReceivedInRelationToIssuesOfConflictOfInterestOfTheKmps',
        reportData.remarks_in_case_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_kmps, 'CurrentYear');

    // Essential Indicator 7: Corrective action
    this.addElement(root, 'DetailsOfAnyCorrectiveActionTakenOrUnderwayOnIssuesRelatedToFinesOrPenaltiesOrActionTakenByRegulatorsOrLawEnforcementAgenciesOrJudicialInstitutionsOnCasesOfCorruptionAndConflictsOfInterestExplanatoryTextBlock',
        reportData.details_of_any_corrective_action_taken_or_underway_on_issues_related_to_fines_or_penalties_or_action_taken_by_regulators_or_law_enforcement_agencies_or_judicial_institutions_on_cases_of_corruption_and_conflicts_of_interest_explanatory_text_block, 'CurrentYear');

    // Essential Indicator 8: Accounts payable
    this.addElement(root, 'AmountOfAccountsPayableDuringTheYear',
        reportData.amount_of_accounts_payable_during_the_year, 'CurrentYear', 'INR');
    this.addElement(root, 'CostOfGoodsOrServicesProcuredDuringTheYear',
        reportData.cost_of_goods_or_services_procured_during_the_year, 'CurrentYear', 'INR');
    this.addElement(root, 'NumberOfDaysOfAccountsPayable',
        reportData.number_of_days_of_accounts_payable, 'CurrentYear', 'Pure');

    // Essential Indicator 9: Concentration and RPTs
    this.addElement(root, 'AmountOfPurchasesFromTradingHouses', reportData.p1_e9_purchases_from_trading_houses, 'CurrentYear', 'INR');
    this.addElement(root, 'AmountOfTotalPurchases', reportData.p1_e9_total_purchases, 'CurrentYear', 'INR');
    this.addElement(root, 'AmountOfSalesToDealersOrDistributors', reportData.p1_e9_sales_to_dealers, 'CurrentYear', 'INR');
    this.addElement(root, 'AmountOfTotalSales', reportData.p1_e9_total_sales, 'CurrentYear', 'INR');
    this.addElement(root, 'AmountOfPurchasesFromRelatedParties', reportData.p1_e9_purchases_rpt, 'CurrentYear', 'INR');
    this.addElement(root, 'AmountOfSalesToRelatedParties', reportData.p1_e9_sales_rpt, 'CurrentYear', 'INR');
    this.addElement(root, 'AmountOfLoansAndAdvancesGivenToRelatedParties', reportData.p1_e9_loans_rpt, 'CurrentYear', 'INR');
    this.addElement(root, 'AmountOfInvestmentsInRelatedParties', reportData.p1_e9_investments_rpt, 'CurrentYear', 'INR');

    // Leadership Indicator 1: Value chain awareness programmes
    this.addTableElement(root, 'AwarenessProgrammesConductedForValueChainPartnersOnAnyOfThePrinciplesDuringTheFinancialYear',
        reportData.assurance_sub_type_for_awareness_programmes_conducted_for_value_chain_partners_on_any_of_the_principles_during_the_financial_year, 'AwarenessProgrammesConductedForValueChainPartnersAxis');

    // Leadership Indicator 2: Conflict of interest - Board processes
    this.addElement(root, 'DoesTheEntityHaveProcessesInPlaceToAvoidOrManageConflictOfInterestsInvolvingMembersOfTheBoard',
        reportData.does_the_entity_have_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board, 'CurrentYear');
    this.addElement(root, 'DetailsOfTheEntityHaveProcessesInPlaceToAvoidOrManageConflictOfInterestsInvolvingMembersOfTheBoardExplanatoryTextBlock',
        reportData.details_of_the_entity_have_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board_explanatory_text_block, 'CurrentYear');
    this.addElement(root, 'DetailsOfTheEntityHaveNotApplicableProcessesInPlaceToAvoidOrManageConflictOfInterestsInvolvingMembersOfTheBoardExplanatoryTextBlock',
        reportData.details_of_the_entity_have_not_applicable_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board_explanatory_text_block, 'CurrentYear');

    // Notes
    this.addElement(root, 'NotesPrinciple1ExplanatoryTextBlock',
        reportData.notes_principle1_explanatory_text_block, 'CurrentYear');
}

// Helper to add table-based elements (with table axis)
addTableElement(root, elementName, jsonData, axisName) {
    if (!jsonData || jsonData === '') return;

    try {
        const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
        if (Array.isArray(data)) {
            data.forEach((row, idx) => {
                const tableContext = `CurrentYear_${axisName}_${idx + 1}`;
                // Add all row data as a single element or process individual fields
                // Depending on schema structure
                this.addElement(root, elementName, JSON.stringify(row), tableContext);
            });
        }
    } catch (e) {
        console.error(`Error parsing table data for ${elementName}:`, e);
    }
}

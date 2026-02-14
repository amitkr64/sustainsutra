const xmlbuilder2 = require('xmlbuilder2');

/**
 * BRSR XBRL Mapper - Maps database fields to XBRL taxonomy elements
 */
class BRSRXBRLMapper {
    constructor() {
        // XBRL namespace definitions
        this.namespaces = {
            'xbrli': 'http://www.xbrl.org/2003/instance',
            'link': 'http://www.xbrl.org/2003/linkbase',
            'xlink': 'http://www.w3.org/1999/xlink',
            'iso4217': 'http://www.xbrl.org/2003/iso4217',
            'in-capmkt': 'http://www.sebi.gov.in/taxonomy/2025-05-31'
        };
    }

    /**
     * Map database report to XBRL XML structure
     */
    mapToXBRL(reportData) {
        const root = xmlbuilder2.create({ version: '1.0', encoding: 'UTF-8' })
            .ele('xbrli:xbrl', this.namespaces);

        // Add context and unit definitions
        this.addContexts(root, reportData);
        this.addUnits(root);

        // Add company information
        this.addCompanyInfo(root, reportData);

        // Add Section A: General Disclosures
        this.addSectionA(root, reportData);

        // Add Section B: Management and Process Disclosures
        this.addSectionB(root, reportData);

        // Add Principle-wise Performance
        this.addSectionC(root, reportData);

        // Add Quality and Assurance Disclosures
        this.addQualityAssurance(root, reportData);

        return root.end({ prettyPrint: true });
    }

    /**
     * Add XBRL contexts (time periods, scenarios)
     */
    addContexts(root, reportData) {
        // Use the new granular financial year date fields
        const fyStart = reportData.date_of_start_of_financial_year || '2024-04-01';
        const fyEnd = reportData.date_of_end_of_financial_year || '2025-03-31';
        const pyStart = reportData.date_of_start_of_previous_year || this.getPreviousYearDate(fyStart);
        const pyEnd = reportData.date_of_end_of_previous_year || this.getPreviousYearDate(fyEnd);
        const ppyStart = reportData.date_of_start_of_prior_to_previous_year || this.getPreviousYearDate(pyStart, 2);
        const ppyEnd = reportData.date_of_end_of_prior_to_previous_year || this.getPreviousYearDate(pyEnd, 2);

        // Current year context
        root.ele('xbrli:context', { id: 'CurrentYear' })
            .ele('xbrli:entity')
            .ele('xbrli:identifier', { scheme: 'http://www.sebi.gov.in' })
            .txt(reportData.corporate_identity_number || reportData.cin || 'UNKNOWN').up()
            .up()
            .ele('xbrli:period')
            .ele('xbrli:startDate').txt(fyStart).up()
            .ele('xbrli:endDate').txt(fyEnd).up()
            .up();

        // Previous year context
        root.ele('xbrli:context', { id: 'PreviousYear' })
            .ele('xbrli:entity')
            .ele('xbrli:identifier', { scheme: 'http://www.sebi.gov.in' })
            .txt(reportData.corporate_identity_number || reportData.cin || 'UNKNOWN').up()
            .up()
            .ele('xbrli:period')
            .ele('xbrli:startDate').txt(pyStart).up()
            .ele('xbrli:endDate').txt(pyEnd).up()
            .up();

        // Prior to Previous year context
        root.ele('xbrli:context', { id: 'PriorToPreviousYear' })
            .ele('xbrli:entity')
            .ele('xbrli:identifier', { scheme: 'http://www.sebi.gov.in' })
            .txt(reportData.corporate_identity_number || reportData.cin || 'UNKNOWN').up()
            .up()
            .ele('xbrli:period')
            .ele('xbrli:startDate').txt(ppyStart).up()
            .ele('xbrli:endDate').txt(ppyEnd).up()
            .up();
    }

    /**
     * Add XBRL units (currency, percentage, etc.)
     */
    addUnits(root) {
        // Currency unit (INR)
        root.ele('xbrli:unit', { id: 'INR' })
            .ele('xbrli:measure').txt('iso4217:INR').up();

        // Pure number unit
        root.ele('xbrli:unit', { id: 'Pure' })
            .ele('xbrli:measure').txt('xbrli:pure').up();

        // Percentage unit
        root.ele('xbrli:unit', { id: 'Percentage' })
            .ele('xbrli:measure').txt('xbrli:pure').up();

        // Metric tons
        root.ele('xbrli:unit', { id: 'MetricTons' })
            .ele('xbrli:measure').txt('in-capmkt:MetricTons').up();
    }

    /**
     * Add company information
     */
    addCompanyInfo(root, reportData) {
        this.addElement(root, 'CorporateIdentityNumber', reportData.corporate_identity_number || reportData.cin, 'CurrentYear');
        this.addElement(root, 'NameOfListedEntity', reportData.name_of_the_company || reportData.company_name, 'CurrentYear');
        this.addElement(root, 'DateOfIncorporation', reportData.date_of_incorporation, 'CurrentYear');
        this.addElement(root, 'RegisteredOfficeAddress', reportData.address_of_registered_office_of_company, 'CurrentYear');
        this.addElement(root, 'CorporateOfficeAddress', reportData.address_of_corporate_office_of_company, 'CurrentYear');
        this.addElement(root, 'EmailId', reportData.e_mail_of_the_company || reportData.email_id, 'CurrentYear');
        this.addElement(root, 'Telephone', reportData.telephone_of_company || reportData.contact_number, 'CurrentYear');
        this.addElement(root, 'Website', reportData.website_of_company, 'CurrentYear');
        this.addElement(root, 'PaidUpCapital', reportData.paid_up_capital, 'CurrentYear', 'INR');
        this.addElement(root, 'RevenueFromOperations', reportData.turnover, 'CurrentYear', 'INR');
        this.addElement(root, 'NameOfContactPerson', reportData.name_of_contact_person || reportData.contact_person_name, 'CurrentYear');
        this.addElement(root, 'ContactNumber', reportData.contact_number_of_contact_person, 'CurrentYear');
        this.addElement(root, 'ContactEmail', reportData.e_mail_of_contact_person, 'CurrentYear');
        this.addElement(root, 'ReportingBoundary', reportData.reporting_boundary, 'CurrentYear');
    }

    /**
     * Add Section A: General Disclosures
     */
    addSectionA(root, reportData) {
        // Products and Services
        this.addElement(root, 'DetailsOfBusinessActivities', reportData.business_activities_explanatory_text_block, 'CurrentYear');

        // Employees
        this.addElement(root, 'TotalNumberOfEmployees', reportData.total_number_of_employees, 'CurrentYear', 'Pure');
        this.addElement(root, 'NumberOfPermanentEmployees', reportData.permanent_employees, 'CurrentYear', 'Pure');
        this.addElement(root, 'NumberOfTemporaryEmployees', reportData.temporary_employees, 'CurrentYear', 'Pure');

        // Add more Section A fields as needed
    }

    /**
     * Add Section B: Management and Process Disclosures
     */
    addSectionB(root, reportData) {
        const principles = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'];

        // 1-6. Policy and management processes
        principles.forEach(p => {
            const context = `${p}Member`; // This should map to PrincipleAxis
            // Note: In real XBRL, these would be tagged with the Principle dimension.
            // For now, mapping as individual elements or using context if schema allows.

            this.addMatrixElement(root, 'WhetherYourEntitysPolicyOrPoliciesCoverEachPrincipleAndItsCoreElementsOfTheNGRBCs', reportData.whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs, p, 'CurrentYear');
            this.addMatrixElement(root, 'DetailsOfYourEntitysPolicyOrPoliciesHasNotApplicableEachPrincipleAndItsCoreElementsOfTheNGRBCsExplanatoryTextBlock', reportData.q1a_na_details, p, 'CurrentYear');
            this.addMatrixElement(root, 'HasThePolicyBeenApprovedByTheBoard', reportData.has_the_policy_been_approved_by_the_board, p, 'CurrentYear');
            this.addMatrixElement(root, 'DetailsOfThePolicyIsNotApplicableExplanatoryTextBlock', reportData.q1b_na_details, p, 'CurrentYear');
            this.addMatrixElement(root, 'WebLinkOfThePoliciesExplanatoryTextBlock', reportData.web_link_of_the_policies_explanatory_text_block, p, 'CurrentYear');
            this.addMatrixElement(root, 'WhetherTheEntityHasTranslatedThePolicyIntoProcedures', reportData.whether_the_entity_has_translated_the_policy_into_procedures, p, 'CurrentYear');
            this.addMatrixElement(root, 'DetailsOfTheEntityHasNotApplicableTranslatedThePolicyIntoProceduresExplanatoryTextBlock', reportData.q2_na_details, p, 'CurrentYear');
            this.addMatrixElement(root, 'DoTheEnlistedPoliciesExtendToYourValueChainPartners', reportData.do_the_enlisted_policies_extend_to_your_value_chain_partners, p, 'CurrentYear');
            this.addMatrixElement(root, 'TheEnlistedPoliciesDoNotApplicableExtendToYourValueChainPartnersExplanatoryTextBlock', reportData.q3_na_details, p, 'CurrentYear');
            this.addMatrixElement(root, 'NameOfTheNationalAndInternationalCodesOrCertificationsOrLabelsOrStandardsAdoptedByYourEntityAndMappedToEachPrincipleExplanatoryTextBlock', reportData.name_of_the_national_and_international_codes_or_certifications_or_labels_or_standards_adopted_by_your_entity_and_mapped_to_each_principle_explanatory_text_block, p, 'CurrentYear');
            this.addMatrixElement(root, 'SpecificCommitmentsGoalsAndTargetsSetByTheEntityWithDefinedTimelinesExplanatoryTextBlock', reportData.specific_commitments_goals_and_targets_set_by_the_entity_with_defined_timelines_explanatory_text_block, p, 'CurrentYear');
            this.addMatrixElement(root, 'PerformanceOfTheEntityAgainstTheSpecificCommitmentsGoalsAndTargetsAlongWithReasonsInCaseTheSameAreNotMetExplanatoryTextBlock', reportData.performance_of_the_entity_against_the_specific_commitments_goals_and_targets_along_with_reasons_in_case_the_same_are_not_met_explanatory_text_block, p, 'CurrentYear');
        });

        // 7-9. Governance, leadership and oversight
        this.addElement(root, 'StatementByDirectorResponsibleForTheBusinessResponsibilityReportHighlightingESGRelatedChallengesTargetsAndAchievementsExplanatoryTextBlock', reportData.statement_by_director_responsible_for_the_business_responsibility_report_highlighting_esg_related_challenges_targets_and_achievements_explanatory_text_block, 'CurrentYear');
        this.addElement(root, 'DetailsOfTheHighestAuthorityResponsibleForImplementationAndOversightOfTheBusinessResponsibilityPolicyExplanatoryTextBlock', reportData.details_of_the_highest_authority_responsible_for_implementation_and_oversight_of_the_business_responsibility_policy_explanatory_text_block, 'CurrentYear');
        this.addElement(root, 'DoesTheEntityHaveASpecifiedCommitteeOfTheBoardOrDirectorResponsibleForDecisionMakingOnSustainabilityRelatedIssues', reportData.does_the_entity_have_a_specified_committee_of_the_board_or_director_responsible_for_decision_making_on_sustainability_related_issues, 'CurrentYear');
        this.addElement(root, 'DetailsOfSpecifiedCommitteeOfTheBoardOrDirectorResponsibleForDecisionMakingOnSustainabilityRelatedIssuesExplanatoryTextBlock', reportData.if_yes_provide_details_explanatory_text_block, 'CurrentYear');
        this.addElement(root, 'TheEntityHasNotApplicableASpecifiedCommitteeForDecisionMakingOnSustainabilityRelatedIssuesExplanatoryTextBlock', reportData.the_entity_has_not_applicable_a_specified_committee_for_decision_making_on_sustainability_related_issues_explanatory_text_block, 'CurrentYear');

        // 10. Details of Review of NGRBCs
        principles.forEach(p => {
            this.addMatrixElement(root, 'PerformanceAgainstAbovePoliciesAndFollowUpActionIndicateWhetherReviewWasUndertakenBy', reportData.performance_against_above_policies_and_follow_up_action_indicate_whether_review_was_undertaken_by, p, 'CurrentYear');
            this.addMatrixElement(root, 'DescriptionOfOtherCommitteeForPerformanceAgainstAbovePoliciesAndFollowUpAction', reportData.description_of_other_committee_for_performance_against_above_policies_and_follow_up_action, p, 'CurrentYear');
            this.addMatrixElement(root, 'ComplianceWithStatutoryRequirementsOfRelevanceToThePrinciplesAndRectificationOfAnyNonCompliancesIndicateWhetherReviewWasUndertakenBy', reportData.compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_indicate_whether_review_was_undertaken_by, p, 'CurrentYear');
            this.addMatrixElement(root, 'DescriptionOfOtherCommitteeForComplianceWithStatutoryRequirementsOfRelevanceToThePrinciplesAndRectification', reportData.description_of_other_committee_for_compliance_with_statutory_requirements, p, 'CurrentYear');
            this.addMatrixElement(root, 'PerformanceAgainstAbovePoliciesAndFollowUpActionFrequency', reportData.performance_against_above_policies_and_follow_up_action_frequency, p, 'CurrentYear');
            this.addMatrixElement(root, 'DescriptionOfOtherFrequencyForPerformanceAgainstAbovePoliciesAndFollowUpAction', reportData.description_of_other_frequency_for_performance_against_above_policies_and_follow_up_action_frequency, p, 'CurrentYear');
            this.addMatrixElement(root, 'ComplianceWithStatutoryRequirementsOfRelevanceToThePrinciplesAndRectificationOfAnyNonCompliancesFrequency', reportData.compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_frequency, p, 'CurrentYear');
            this.addMatrixElement(root, 'DescriptionOfOtherFrequencyForComplianceWithStatutoryRequirementsOfRelevanceToThePrinciplesAndRectificationOfAnyNonCompliances', reportData.description_of_other_frequency_for_compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances, p, 'CurrentYear');
        });

        // 11. Independent Assessment
        principles.forEach(p => {
            this.addMatrixElement(root, 'HasTheEntityCarriedOutIndependentAssessmentEvaluationOfTheWorkingOfItsPoliciesByAnExternalAgency', reportData.has_the_entity_carried_out_independent_assessment_evaluation_of_the_working_of_its_policies_by_an_external_agency, p, 'CurrentYear');
            this.addMatrixElement(root, 'NameOfTheAgencyIfTheEntityCarriedOutIndependentAssessmentEvaluationOfTheWorkingOfItsPoliciesByAnExternalAgencyExplanatoryTextBlock', reportData.provide_name_of_the_agency_explanatory_text_block, p, 'CurrentYear');
        });

        // 12. Reasons if not covered
        principles.forEach(p => {
            this.addMatrixElement(root, 'TheEntityDoesNotConsiderThePrinciplesMaterialToItsBusiness', reportData.the_entity_does_not_consider_the_principles_material_to_its_business, p, 'CurrentYear');
            this.addMatrixElement(root, 'TheEntityIsNotAtAStageWhereItIsInAPositionToFormulateAndImplementThePoliciesOnSpecifiedPrinciples', reportData.the_entity_is_not_at_a_stage_where_it_is_in_a_position_to_formulate_and_implement_the_policies_on_specified_principles, p, 'CurrentYear');
            this.addMatrixElement(root, 'TheEntityDoesNotHaveTheFinancialOrHumanAndTechnicalResourcesAvailableForTheTask', reportData.the_entity_does_not_have_the_financial_or_human_and_technical_resources_available_for_the_task, p, 'CurrentYear');
            this.addMatrixElement(root, 'ItIsPlannedToBeDoneInTheNextFinancialYear', reportData.it_is_planned_to_be_done_in_the_next_financial_year, p, 'CurrentYear');
            // Handle dynamic reasons if needed
        });

        this.addElement(root, 'NotesManagementAndProcessDisclosuresExplanatoryTextBlock', reportData.notes_management_and_process_disclosures_explanatory_text_block, 'CurrentYear');
    }

    /**
     * Add Section C: Principle-wise Performance
     */
    addSectionC(root, reportData) {
        // Principle 1
        try { this.addPrinciple1(root, reportData); } catch (e) { console.error('P1 Error:', e.message); }

        // Principle 2
        try { this.addPrinciple2(root, reportData); } catch (e) { console.error('P2 Error:', e.message); }

        // Principle 3
        try { this.addPrinciple3(root, reportData); } catch (e) { console.error('P3 Error:', e.message); }

        // Principle 4
        try { this.addPrinciple4(root, reportData); } catch (e) { console.error('P4 Error:', e.message); }

        // Principle 5
        try { this.addPrinciple5(root, reportData); } catch (e) { console.error('P5 Error:', e.message); }

        // Principle 6
        try { this.addPrinciple6(root, reportData); } catch (e) { console.error('P6 Error:', e.message); }

        // Principle 7
        try { this.addPrinciple7(root, reportData); } catch (e) { console.error('P7 Error:', e.message); }

        // Principle 8
        try { this.addPrinciple8(root, reportData); } catch (e) { console.error('P8 Error:', e.message); }

        // Principle 9
        try { this.addPrinciple9(root, reportData); } catch (e) { console.error('P9 Error:', e.message); }
    }

    /**
     * Add Principle 1: Businesses should conduct and govern themselves with Ethics, Transparency and Accountability
     */
    addPrinciple1(root, reportData) {
        // Essential Indicator 1: Training and awareness programmes (table with segments)
        if (reportData.assurance_sub_type_for_percentage_coverage_by_training_and_awareness_programs_on_any_of_the_principles_during_the_financial_year_for_bod_or_kmp_or_employee_or_worker) {
            try {
                const trainingData = JSON.parse(reportData.assurance_sub_type_for_percentage_coverage_by_training_and_awareness_programs_on_any_of_the_principles_during_the_financial_year_for_bod_or_kmp_or_employee_or_worker);
                trainingData.forEach((row) => {
                    // Map to segment-specific contexts
                    let segmentContext = 'CurrentYear';
                    if (row.segment === 'Board of Directors') segmentContext = 'CurrentYear_BoardOfDirectorsSegment';
                    else if (row.segment === 'Key Managerial Personnel') segmentContext = 'CurrentYear_KeyManagerialPersonnelSegment';
                    else if (row.segment === 'Employees other than BoD and KMPs') segmentContext = 'CurrentYear_EmployeesOtherThanBoDAndKMPsSegment';
                    else if (row.segment === 'Workers') segmentContext = 'CurrentYear_WorkersSegment';

                    this.addElement(root, 'TotalNumberOfTrainingAndAwarenessProgramsHeld', row.total_number, segmentContext, 'Pure');
                    this.addElement(root, 'TopicsOrPrinciplesCoveredUnderTheTrainingAndItsImpact', row.topics_covered, segmentContext);
                    this.addElement(root, 'PercentageOfPersonsInRespectiveCategoryCoveredByTheAwarenessProgrammes', row.percentage_covered, segmentContext, 'Pure');
                });
            } catch (e) {
                console.error('Error parsing training data:', e);
            }
        }

        // Essential Indicator 2: Fines/penalties (stored as JSON for different categories)
        this.addTableElement(root, 'BriefOfTheMonetaryCaseForPenaltyOrFineExplanatoryTextBlock',
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
        this.addTableElement(root, 'DetailsOfTheAppealOrRevisionPreferredInCasesWhereMonetaryOrNonMonetaryActionHasBeenAppealed',
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

        // Essential Indicator 9: Concentration and RPTs - parse complex table if stored as JSON
        if (reportData.assurance_sub_type_for_details_of_concentration_of_purchases_and_sales_with_trading_houses_dealers_and_related_parties_along_with_loans_and_advances_and_investments_with_related_parties) {
            try {
                const concentrationData = JSON.parse(reportData.assurance_sub_type_for_details_of_concentration_of_purchases_and_sales_with_trading_houses_dealers_and_related_parties_along_with_loans_and_advances_and_investments_with_related_parties);
                // Map key metrics from the complex table structure
                const cpRow = concentrationData.find(r => r.id === 'cp_a_i');
                if (cpRow) this.addElement(root, 'AmountOfPurchasesFromTradingHouses', cpRow.fy, 'CurrentYear', 'INR');

                const cpTotalRow = concentrationData.find(r => r.id === 'cp_a_ii');
                if (cpTotalRow) this.addElement(root, 'AmountOfTotalPurchases', cpTotalRow.fy, 'CurrentYear', 'INR');

                const csRow = concentrationData.find(r => r.id === 'cs_a_i');
                if (csRow) this.addElement(root, 'AmountOfSalesToDealersOrDistributors', csRow.fy, 'CurrentYear', 'INR');

                const csTotalRow = concentrationData.find(r => r.id === 'cs_a_ii');
                if (csTotalRow) this.addElement(root, 'AmountOfTotalSales', csTotalRow.fy, 'CurrentYear', 'INR');

                const rptPurchRow = concentrationData.find(r => r.id === 'rpt_a_i');
                if (rptPurchRow) this.addElement(root, 'AmountOfPurchasesFromRelatedParties', rptPurchRow.fy, 'CurrentYear', 'INR');

                const rptSalesRow = concentrationData.find(r => r.id === 'rpt_b_i');
                if (rptSalesRow) this.addElement(root, 'AmountOfSalesToRelatedParties', rptSalesRow.fy, 'CurrentYear', 'INR');

                const rptLoansRow = concentrationData.find(r => r.id === 'rpt_c_i');
                if (rptLoansRow) this.addElement(root, 'AmountOfLoansAndAdvancesGivenToRelatedParties', rptLoansRow.fy, 'CurrentYear', 'INR');

                const rptInvestRow = concentrationData.find(r => r.id === 'rpt_d_i');
                if (rptInvestRow) this.addElement(root, 'AmountOfInvestmentsInRelatedParties', rptInvestRow.fy, 'CurrentYear', 'INR');
            } catch (e) {
                console.error('Error parsing concentration data:', e);
            }
        }

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

    /**
     * Helper method to add table-based elements (with table axis)
     */
    addTableElement(root, elementName, jsonData, axisName) {
        if (!jsonData || jsonData === '') return;

        try {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            if (Array.isArray(data)) {
                data.forEach((row, idx) => {
                    const tableContext = `CurrentYear_${axisName}_${idx + 1}`;
                    // For complex table data, add each field individually or as combined element
                    // This implementation adds the entire row as serialized JSON
                    // Adjust based on specific XBRL schema requirements
                    Object.keys(row).forEach(key => {
                        if (key !== 'sno' && row[key]) {
                            this.addElement(root, `${elementName}_${key}`, row[key], tableContext);
                        }
                    });
                });
            }
        } catch (e) {
            console.error(`Error parsing table data for ${elementName}:`, e);
        }
    }

    /**
     * Add Principle 2: Businesses should provide goods and services in a manner that is sustainable and safe
     */
    addPrinciple2(root, reportData) {
        // Essential Indicator 1: R&D and Capex
        if (reportData.percentage_of_r_and_d_and_capital_expenditure_investments_in_specific_technologies) {
            try {
                const rndCapexData = JSON.parse(reportData.percentage_of_r_and_d_and_capital_expenditure_investments_in_specific_technologies);
                rndCapexData.forEach((row) => {
                    if (row.segment === 'R&D') {
                        this.addElement(root, 'PercentageOfRAndD', row.cy_pct, 'CurrentYear', 'Pure');
                        this.addElement(root, 'PercentageOfRAndD', row.py_pct, 'PreviousYear', 'Pure');
                        this.addElement(root, 'DetailsOfImprovementsInEnvironmentalAndSocialImpactsDueToRAndD', row.details, 'CurrentYear');
                    } else if (row.segment === 'Capex') {
                        this.addElement(root, 'PercentageOfCapex', row.cy_pct, 'CurrentYear', 'Pure');
                        this.addElement(root, 'PercentageOfCapex', row.py_pct, 'PreviousYear', 'Pure');
                        this.addElement(root, 'DetailsOfImprovementsInEnvironmentalAndSocialImpactsDueToCapex', row.details, 'CurrentYear');
                    }
                });
            } catch (e) {
                console.error('Error parsing R&D/Capex data:', e);
            }
        }

        // Essential Indicator 2: Sustainable Sourcing
        this.addElement(root, 'DoesTheEntityHaveProceduresInPlaceForSustainableSourcing',
            reportData.does_the_entity_have_procedures_in_place_for_sustainable_sourcing, 'CurrentYear');
        this.addElement(root, 'PercentageOfInputsWereSourcedSustainably',
            reportData.percentage_of_inputs_were_sourced_sustainably, 'CurrentYear', 'Pure');

        // Essential Indicator 3: Product Reclamation Processes (4 waste types)
        this.addTableElement(root, 'DescribeTheProcessesInPlaceToSafelyReclaimYourProductsForReusingRecyclingAndDisposingAtTheEndOfLifeForPlasticsIncludingPackagingExplanatoryTextBlock',
            reportData.describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_plastics_including_packaging_explanatory_text_block, 'PlasticsIncludingPackagingAxis');
        this.addTableElement(root, 'DescribeTheProcessesInPlaceToSafelyReclaimYourProductsForReusingRecyclingAndDisposingAtTheEndOfLifeForEWasteExplanatoryTextBlock',
            reportData.describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_e_waste_explanatory_text_block, 'EWasteAxis');
        this.addTableElement(root, 'DescribeTheProcessesInPlaceToSafelyReclaimYourProductsForReusingRecyclingAndDisposingAtTheEndOfLifeForHazardousWasteExplanatoryTextBlock',
            reportData.describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_hazardous_waste_explanatory_text_block, 'HazardousWasteAxis');
        this.addTableElement(root, 'DescribeTheProcessesInPlaceToSafelyReclaimYourProductsForReusingRecyclingAndDisposingAtTheEndOfLifeForOtherWasteExplanatoryTextBlock',
            reportData.describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_other_waste_explanatory_text_block, 'OtherWasteAxis');

        // Essential Indicator 4: Extended Producer Responsibility (EPR)
        this.addElement(root, 'WhetherExtendedProducerResponsibilityIsApplicableToTheEntitySActivities',
            reportData.epr_applicable || reportData.whether_extended_producer_responsibility_is_applicable_to_the_entity_s_activities, 'CurrentYear');
        this.addElement(root, 'WhetherTheWasteCollectionPlanIsInLineWithTheExtendedProducerResponsibilityPlanSubmittedToPollutionControlBoards',
            reportData.epr_plan_compliance || reportData.whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards, 'CurrentYear');
        this.addElement(root, 'StepsTakenToAddressTheWasteCollectionPlanExplanatoryTextBlock',
            reportData.steps_taken_to_address_the_waste_collection_plan_explanatory_text_block, 'CurrentYear');

        // Leadership Indicator 1: Life Cycle Assessments (LCA)
        this.addElement(root, 'HasTheEntityConductedLifeCyclePerspectiveOrAssessmentsForAnyOfItsProductsOrForItsServices',
            reportData.has_the_entity_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services, 'CurrentYear');
        this.addElement(root, 'TheEntityHasNotApplicableConductedLifeCyclePerspectiveOrAssessmentsForAnyOfItsProductsOrForItsServicesExplanatoryTextBlock',
            reportData.the_entity_has_not_applicable_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services_explanatory_text_block, 'CurrentYear');

        // LCA Details Table
        if (reportData.details_of_products_or_services_for_which_life_cycle_perspective_or_assessments_was_conducted_by_the_entity) {
            try {
                const lcaData = JSON.parse(reportData.details_of_products_or_services_for_which_life_cycle_perspective_or_assessments_was_conducted_by_the_entity);
                lcaData.forEach((row, idx) => {
                    const lcaContext = `CurrentYear_LCAAxis_${idx + 1}`;
                    this.addElement(root, 'NICCodeOfProductOrServiceOfConductedLifecyclePerspective', row.nic_code, lcaContext);
                    this.addElement(root, 'NameOfProductOrServiceOfConductedLifecyclePerspective', row.product_service, lcaContext);
                    this.addElement(root, 'PercentageOfTotalTurnoverContributedForConductedLifecyclePerspective', row.turnover_pct, lcaContext, 'Pure');
                    this.addElement(root, 'BoundaryForWhichTheLifeCyclePerspectiveOrAssessmentWasConducted', row.boundary, lcaContext);
                    this.addElement(root, 'WhetherConductedByIndependentExternalAgency', row.independent_agency, lcaContext);
                    this.addElement(root, 'ResultsCommunicatedInPublicDomain', row.public_domain, lcaContext);
                    this.addElement(root, 'WebLinkOfResultsOfLifeCycleAssessments', row.weblink, lcaContext);
                });
            } catch (e) {
                console.error('Error parsing LCA data:', e);
            }
        }

        // Leadership Indicator 2: Environmental/Social Concerns
        if (reportData.action_taken_to_mitigate_significant_social_or_environmental_concerns_lineitems) {
            try {
                const concernsData = JSON.parse(reportData.action_taken_to_mitigate_significant_social_or_environmental_concerns_lineitems);
                concernsData.forEach((row, idx) => {
                    const concernsContext = `CurrentYear_ConcernsAxis_${idx + 1}`;
                    this.addElement(root, 'NameOfProductOrService', row.product_service, concernsContext);
                    this.addElement(root, 'DescriptionOfTheRiskOrConcern', row.description, concernsContext);
                    this.addElement(root, 'ActionTaken', row.action_taken, concernsContext);
                });
            } catch (e) {
                console.error('Error parsing concerns data:', e);
            }
        }

        // Leadership Indicator 3: Recycled/Reused Input Materials
        if (reportData.details_of_percentage_of_recycled_or_reused_input_material_to_total_material_by_value_used_in_production_or_providing_services) {
            try {
                const recycledData = JSON.parse(reportData.details_of_percentage_of_recycled_or_reused_input_material_to_total_material_by_value_used_in_production_or_providing_services);
                recycledData.forEach((row, idx) => {
                    const recycledContext = `CurrentYear_RecycledMaterialAxis_${idx + 1}`;
                    const recycledContextPY = `PreviousYear_RecycledMaterialAxis_${idx + 1}`;
                    this.addElement(root, 'IndicateInPutMaterial', row.material, recycledContext);
                    this.addElement(root, 'RecycledOrReUsedInPutMaterialToTotalMaterial', row.fy_pct, recycledContext, 'Pure');
                    this.addElement(root, 'RecycledOrReUsedInPutMaterialToTotalMaterial', row.py_pct, recycledContextPY, 'Pure');
                });
            } catch (e) {
                console.error('Error parsing recycled materials data:', e);
            }
        }

        // Leadership Indicator 4: Products Reclaimed at End of Life
        if (reportData.assurance_sub_type_for_reclaimed_products_and_packaging) {
            try {
                const reclaimedData = JSON.parse(reportData.assurance_sub_type_for_reclaimed_products_and_packaging);
                reclaimedData.forEach((row) => {
                    let memberContext = 'CurrentYear';
                    let memberContextPY = 'PreviousYear';

                    if (row.category === 'Plastics (including packaging)') {
                        memberContext += '_PlasticsIncludingPackagingMember';
                        memberContextPY += '_PlasticsIncludingPackagingMember';
                    } else if (row.category === 'E waste') {
                        memberContext += '_EWasteMember';
                        memberContextPY += '_EWasteMember';
                    } else if (row.category === 'Hazardous waste') {
                        memberContext += '_HazardousWasteMember';
                        memberContextPY += '_HazardousWasteMember';
                    } else if (row.category === 'Other waste') {
                        // Other waste handled separately with dynamic table
                        return;
                    }

                    // Current Year
                    this.addElement(root, 'AmountOfReUsed', row.reuse_fy, memberContext, 'MetricTons');
                    this.addElement(root, 'AmountOfRecycled', row.recycle_fy, memberContext, 'MetricTons');
                    this.addElement(root, 'AmountOfSafelyDisposed', row.disposed_fy, memberContext, 'MetricTons');

                    // Previous Year
                    this.addElement(root, 'AmountOfReUsed', row.reuse_py, memberContextPY, 'MetricTons');
                    this.addElement(root, 'AmountOfRecycled', row.recycle_py, memberContextPY, 'MetricTons');
                    this.addElement(root, 'AmountOfSafelyDisposed', row.disposed_py, memberContextPY, 'MetricTons');
                });
            } catch (e) {
                console.error('Error parsing reclaimed products data:', e);
            }
        }

        // Leadership Indicator 5: Reclaimed Products as % of Sales
        if (reportData.details_of_reclaimed_products_and_their_packaging_materials_for_each_product_category) {
            try {
                const reclaimedPctData = JSON.parse(reportData.details_of_reclaimed_products_and_their_packaging_materials_for_each_product_category);
                reclaimedPctData.forEach((row, idx) => {
                    const reclaimedPctContext = `CurrentYear_ReclaimedProductsAxis_${idx + 1}`;
                    this.addElement(root, 'IndicateProductCategory', row.product_category, reclaimedPctContext);
                    this.addElement(root, 'ReclaimedProductsAndTheirPackagingMaterialsAsPercentageOfTotalProductsSoldInRespectiveCategory', row.reclaimed_pct, reclaimedPctContext, 'Pure');
                });
            } catch (e) {
                console.error('Error parsing reclaimed products percentage data:', e);
            }
        }

        // Notes
        this.addElement(root, 'NotesPrinciple2ExplanatoryTextBlock',
            reportData.notes_principle2_explanatory_text_block, 'CurrentYear');
    }

    /**
     * Add Principle 3 data (Employee Well-being)
     * Covers 15 Essential + 6 Leadership indicators
     */
    addPrinciple3(root, reportData) {
        const fy = 'CurrentYear';
        const py = 'PreviousYear';

        // E3: Accessibility (Simple)
        this.addElement(root, 'AreThePremisesOrOfficesOfTheEntityAccessibleToDifferentlyAbledEmployeesAndWorkers',
            reportData.are_the_premises_or_offices_of_the_entity_accessible_to_differently_abled_employees_and_workers, fy);
        if (reportData.steps_taken_if_premises_not_accessible) {
            this.addElement(root, 'WhetherAnyStepsAreBeingTakenByTheEntityIfThePremisesOrOfficesOfTheEntityNotAccessibleToDifferentlyAbledEmployeesAndWorkersExplanatoryTextBlock',
                reportData.steps_taken_if_premises_not_accessible, fy);
        }

        // E4: Equal Opportunity (Simple)
        this.addElement(root, 'DoesTheEntityHaveAnEqualOpportunityPolicyAsPerTheRightsOfPersonsWithDisabilitiesAct2016',
            reportData.does_the_entity_have_an_equal_opportunity_policy_as_per_the_rights_of_persons_with_disabilities_act2016, fy);
        if (reportData.weblink_of_equal_opportunity_policy) {
            this.addElement(root, 'WebLinkOfEqualOppertunityPolicyTextBlock',
                reportData.weblink_of_equal_opportunity_policy, fy);
        }

        // E6: Grievance Mechanism (Simple)
        const griev = [
            ['perm_workers', 'ForPermanentWorkers'],
            ['other_workers', 'ForOtherThanPermanentWorkers'],
            ['perm_employees', 'ForPermanentEmployees'],
            ['other_employees', 'ForOtherThanPermanentEmployees']
        ];
        griev.forEach(([key, suffix]) => {
            this.addElement(root, `IsThereAMechanismAvailableToReceiveAndRedressGrievances${suffix}`,
                reportData[`p3_e6_${key}_yn`], fy);
            if (reportData[`p3_e6_${key}_details`]) {
                this.addElement(root, `DetailsOfMechanismAvailableToReceiveAndRedressGrievances${suffix}ExplanatoryTextBlock`,
                    reportData[`p3_e6_${key}_details`], fy);
            }
        });

        // E10: Health & Safety System (Simple)
        this.addElement(root, 'WhetherAnOccupationalHealthAndSafetyManagementSystemHasBeenImplementedByTheEntity',
            reportData.p3_e10_a_status, fy);
        if (reportData.p3_e10_b_details) {
            this.addElement(root, 'DesclosureOfTheProcessesUsedToIdentifyWorkRelatedHazardsAndAssessRisksOnARoutineAndNonRoutineBasisByTheEntityExplanatoryTextBlock',
                reportData.p3_e10_b_details, fy);
        }

        // E11: Safety Incidents (1-axis: Employees/Workers)
        const incidents = [
            ['ltifr', 'LostTimeInjuryFrequencyRatePerOneMillionPersonHoursWorked'],
            ['injuries', 'TotalRecordableWorkRelatedInjuries'],
            ['fatalities', 'NumberOfFatalities'],
            ['high_consequence', 'HighConsequenceWorkRelatedInjuryOrIllHealthExcludingFatalities']
        ];
        incidents.forEach(([key, xbrlField]) => {
            ['emp', 'worker'].forEach(cat => {
                const member = cat === 'emp' ? 'EmployeesMember' : 'WorkersMember';
                this.addElement(root, xbrlField, reportData[`p3_e11_${key}_${cat}_fy`], `${fy}_${member}`, 'Pure');
                this.addElement(root, xbrlField, reportData[`p3_e11_${key}_${cat}_py`], `${py}_${member}`, 'Pure');
            });
        });

        // E12: Safe Workplace (Simple)
        if (reportData.p3_e12_measures_details) {
            this.addElement(root, 'DescribeTheMeasuresTakenByTheEntityToEnsureASafeAndHealthyWorkPlaceExplanatoryTextBlock',
                reportData.p3_e12_measures_details, fy);
        }

        // E13: Complaints (1-axis: ComplaintsAxis)
        ['working_conditions', 'health_safety'].forEach(type => {
            const member = type === 'working_conditions' ? 'WorkingConditionsComplaintsMember' : 'HealthSafetyComplaintsMember';
            this.addElement(root, 'NumberOfComplaintsFiledDuringTheYear',
                reportData[`p3_e13_${type}_filed_fy`], `${fy}_${member}`, 'Pure');
            this.addElement(root, 'NumberOfComplaintsPendingResolutionAtTheEndOfYear',
                reportData[`p3_e13_${type}_pending_fy`], `${fy}_${member}`, 'Pure');
            if (reportData[`p3_e13_${type}_remarks_fy`]) {
                this.addElement(root, 'RemarksforComplaintsExplanatoryTextBlock',
                    reportData[`p3_e13_${type}_remarks_fy`], `${fy}_${member}`);
            }
        });

        // E14: Assessments (Simple)
        this.addElement(root, 'PercentageOfHealthAndSafetyPracticesOfYourPlantsAndOfficesThatWereAssessedP3',
            reportData.p3_e14_health_safety_pct, fy, 'Pure');
        this.addElement(root, 'PercentageOfWorkingConditionsOfYourPlantsAndOfficesThatWereAssessedP3',
            reportData.p3_e14_working_conditions_pct, fy, 'Pure');

        // E15: Corrective Actions (Simple)
        if (reportData.p3_e15_corrective_details) {
            this.addElement(root, 'DetailsOfAnyCorrectiveActionTakenOrUnderwayToAddressSafetyRelatedIncidentsOfYourPlantsAndOfficesThatWereAssessedExplanatoryTextBlock',
                reportData.p3_e15_corrective_details, fy);
        }

        // === PHASE 2: COMPLEX MULTI-AXIS TABLES ===

        // E5: Return to Work & Retention Rates (Gender Axis)
        const genders = [
            ['male', 'MaleMember'],
            ['female', 'FemaleMember'],
            ['others', 'OtherGenderMember']
        ];
        // Employees
        genders.forEach(([key, member]) => {
            this.addElement(root, 'ReturnToWorkRatePermanentEmployeesThatTookParentalLeave',
                reportData[`p3_e5_${key}_return_fy`], `${fy}_PermanentEmployeesMember_${member}`, 'Pure');
            this.addElement(root, 'RetentionRatesPermanentEmployeesThatTookParentalLeave',
                reportData[`p3_e5_${key}_retention_fy`], `${fy}_PermanentEmployeesMember_${member}`, 'Pure');
        });
        // Workers
        genders.forEach(([key, member]) => {
            this.addElement(root, 'ReturnToWorkRatePermanentWorkersThatTookParentalLeave',
                reportData[`p3_e5_${key}_return_fy`], `${fy}_PermanentWorkersMember_${member}`, 'Pure');
            this.addElement(root, 'RetentionRatesPermanentWorkersThatTookParentalLeave',
                reportData[`p3_e5_${key}_retention_fy`], `${fy}_PermanentWorkersMember_${member}`, 'Pure');
        });

        // E2: Retirement Benefits (Fixed + Dynamic)
        const benefits = [
            ['pf', 'ProvidentFundMember'],
            ['gratuity', 'GratuityMember'],
            ['esi', 'ESIMember']
        ];
        benefits.forEach(([key, member]) => {
            // FY
            this.addElement(root, 'NumberOfEmployeesCoveredAsPercentageOfTotalEmployees',
                reportData[`p3_e2_${key}_fy_emp_pct`], `${fy}_${member}`, 'Pure');
            this.addElement(root, 'NumberOfEmployeesCoveredAsPercentageOfTotalWorker',
                reportData[`p3_e2_${key}_fy_worker_pct`], `${fy}_${member}`, 'Pure');
            this.addElement(root, 'DeductedAndDepositedWithTheAuthority',
                reportData[`p3_e2_${key}_fy_deposited`], `${fy}_${member}`);
            // PY
            this.addElement(root, 'NumberOfEmployeesCoveredAsPercentageOfTotalEmployees',
                reportData[`p3_e2_${key}_py_emp_pct`], `${py}_${member}`, 'Pure');
            this.addElement(root, 'NumberOfEmployeesCoveredAsPercentageOfTotalWorker',
                reportData[`p3_e2_${key}_py_worker_pct`], `${py}_${member}`, 'Pure');
            this.addElement(root, 'DeductedAndDepositedWithTheAuthority',
                reportData[`p3_e2_${key}_py_deposited`], `${py}_${member}`);
        });

        // E7: Union Membership (2-axis: Employees/Workers × Gender)
        const empWorker = [
            ['perm_emp', 'PermanentEmployeesMember'],
            ['perm_worker', 'PermanentWorkersMember']
        ];
        empWorker.forEach(([ewKey, ewMember]) => {
            genders.forEach(([gKey, gMember]) => {
                const context = `${fy}_${ewMember}_${gMember}`;
                this.addElement(root, 'TotalNumberOfEmployeesOrWorkersForMembership',
                    reportData[`p3_e7_${ewKey}_${gKey}_total_fy`], context, 'Pure');
                this.addElement(root, 'NumberOfEmployeesOrWorkersArePartOfAssociationsOrUnion',
                    reportData[`p3_e7_${ewKey}_${gKey}_union_fy`], context, 'Pure');
                this.addElement(root, 'PercentageOfEmployeesOrWorkersArePartOfAssociationsOrUnionOfTotalNumberOfEmployee',
                    reportData[`p3_e7_${ewKey}_${gKey}_pct_fy`], context, 'Pure');
            });
        });

        // E9: Performance & Career Development (2-axis: Employees/Workers × Gender)
        const empWorkerAll = [
            ['emp', 'EmployeesMember'],
            ['worker', 'WorkersMember']
        ];
        empWorkerAll.forEach(([ewKey, ewMember]) => {
            genders.forEach(([gKey, gMember]) => {
                const context = `${fy}_${ewMember}_${gMember}`;
                this.addElement(root, 'TotalNumberOfEmployeesOrWorkersForPerformanceAndCareerDevelopment',
                    reportData[`p3_e9_${ewKey}_${gKey}_total_fy`], context, 'Pure');
                this.addElement(root, 'NumberOfEmployeesOrWorkerForPerformanceAndCareerDevelopment',
                    reportData[`p3_e9_${ewKey}_${gKey}_no_fy`], context, 'Pure');
                this.addElement(root, 'PercentageOfEmployeesOrWorkerForPerformanceAndCareerDevelopment',
                    reportData[`p3_e9_${ewKey}_${gKey}_pct_fy`], context, 'Pure');
            });
        });

        // E1: Well-being Measures (3-axis: Benefits × Employment × Gender) - MOST COMPLEX
        const wellbeingBenefits = [
            ['health', 'HealthInsuranceMember'],
            ['accident', 'AccidentInsuranceMember'],
            ['maternity', 'MaternityBenefitsMember'],
            ['paternity', 'PaternityBenefitsMember'],
            ['daycare', 'DayCareFacilitiesMember']
        ];
        const employment = [
            ['perm_emp', 'PermanentEmployeesMember'],
            ['other_emp', 'OtherThanPermanentEmployeesMember'],
            ['perm_worker', 'PermanentWorkersMember'],
            ['other_worker', 'OtherThanPermanentWorkersMember']
        ];
        const gendersFull = [
            ['male', 'MaleMember'],
            ['female', 'FemaleMember'],
            ['other', 'OtherGenderMember']
        ];

        // Parse wellbeing table data
        if (reportData.details_of_measures_for_the_well_being_of_employees_and_workers_and_spending_on_it) {
            try {
                const wellbeingData = typeof reportData.details_of_measures_for_the_well_being_of_employees_and_workers_and_spending_on_it === 'string'
                    ? JSON.parse(reportData.details_of_measures_for_the_well_being_of_employees_and_workers_and_spending_on_it)
                    : reportData.details_of_measures_for_the_well_being_of_employees_and_workers_and_spending_on_it;

                employment.forEach(([empKey, empMember]) => {
                    gendersFull.forEach(([genKey, genMember]) => {
                        const rowId = `${empKey}_${genKey}`;
                        const row = wellbeingData.find(r => r.id === rowId);
                        if (row) {
                            wellbeingBenefits.forEach(([benKey, benMember]) => {
                                const context = `${fy}_${benMember}_${empMember}_${genMember}`;
                                this.addElement(root, 'NumberOfWellBeingOfEmployeesOrWorkers',
                                    row[`${benKey}_no_b`] || row[`${benKey}_no_c`] || row[`${benKey}_no_d`] || row[`${benKey}_no_e`] || row[`${benKey}_no_f`], context, 'Pure');
                                this.addElement(root, 'PercentageOfWellBeingOfEmployeesOrWorkers',
                                    row[`${benKey}_pct_b`] || row[`${benKey}_pct_c`] || row[`${benKey}_pct_d`] || row[`${benKey}_pct_e`] || row[`${benKey}_pct_f`], context, 'Pure');
                            });
                        }
                    });
                });
            } catch (e) {
                console.error('Error parsing wellbeing data:', e);
            }
        }

        // E1c: Spending on wellbeing
        this.addElement(root, 'AmountOfCostIncurredOnWellBeingMeasures',
            reportData.p3_e1c_cost_incurred_fy, fy, 'INR');
        this.addElement(root, 'TotalRevenueOfTheCompany',
            reportData.p3_e1c_total_revenue_fy, fy, 'INR');
        this.addElement(root, 'PercentageOfCostIncurredOnWellBeingMeasuresWithRespectToTotalRevenueOfTheCompany',
            reportData.p3_e1c_cost_as_pct_fy, fy, 'Pure');

        // E8: Training Given (3-axis: Training Type × Employees/Workers × Gender)
        const trainingTypes = [
            ['hs', 'OnHealthAndSafetyMeasuresMember'],
            ['skill', 'OnSkillUpgradationMember']
        ];
        empWorkerAll.forEach(([ewKey, ewMember]) => {
            genders.forEach(([gKey, gMember]) => {
                trainingTypes.forEach(([tKey, tMember]) => {
                    const context = `${fy}_${tMember}_${ewMember}_${gMember}`;
                    this.addElement(root, 'NumberOfTrainedEmployeesOrWorkers',
                        reportData[`p3_e8_${ewKey}_${gKey}_${tKey}_no_fy`], context, 'Pure');
                    this.addElement(root, 'PercentageOfTrainedEmployeesOrWorkers',
                        reportData[`p3_e8_${ewKey}_${gKey}_${tKey}_pct_fy`], context, 'Pure');
                });
            });
        });

        // === END PHASE 2 ===

        // L1-L2: Life Insurance (Simple)
        this.addElement(root, 'DoesTheEntityExtendAnyLifeInsuranceOrAnyCompensatoryPackageInTheEventOfDeathOfEmployees',
            reportData.p3_l1_employees_insurance, fy);
        this.addElement(root, 'DoesTheEntityExtendAnyLifeInsuranceOrAnyCompensatoryPackageInTheEventOfDeathOfWorkers',
            reportData.p3_l1_workers_insurance, fy);

        // L3: Statutory Dues (Simple)
        if (reportData.p3_l2_statutory_dues_measures) {
            this.addElement(root, 'DetailsOfMeasuresUndertakenByTheEntityToEnsureThatStatutoryDuesHaveBeenDeductedAndDepositedByTheValueChainPartnersExplanatoryTextBlock',
                reportData.p3_l2_statutory_dues_measures, fy);
        }

        // L4: Rehabilitation (Simple)
        this.addElement(root, 'TotalNumberOfAffectedEmployees', reportData.p3_l3_emp_total_affected_fy, fy, 'Pure');
        this.addElement(root, 'TotalNumberOfAffectedWorkers', reportData.p3_l3_worker_total_affected_fy, fy, 'Pure');
        this.addElement(root, 'NumberOfEmployeesOrWhoseFamilyMembersRehabilitatedAndPlacedInSuitableEmployment',
            reportData.p3_l3_emp_rehab_fy, fy, 'Pure');
        this.addElement(root, 'NumberOfWorkersOrWhoseFamilyMembersRehabilitatedAndPlacedInSuitableEmployment',
            reportData.p3_l3_worker_rehab_fy, fy, 'Pure');

        // L5: Transition Assistance (Simple)
        this.addElement(root, 'DoesTheEntityProvideTransitionAssistanceProgramsToFacilitateContinuedEmployabilityAndTheManagementOfCareerEndingsResultingFromRetirementOrTerminationOfEmployment',
            reportData.p3_l4_transition_status, fy);

        // L6: Value Chain Assessments (Simple)
        this.addElement(root, 'PercentageOfHealthAndSafetyPracticesOfValueChainPartnersP3',
            reportData.p3_l5_health_safety_pct, fy, 'Pure');
        this.addElement(root, 'PercentageOfWorkingConditionsOfValueChainPartnersP3',
            reportData.p3_l5_working_conditions_pct, fy, 'Pure');
        if (reportData.p3_l6_corrective_details) {
            this.addElement(root, 'DetailsOfAnyCorrectiveActionTakenOrUnderwayToAddressSafetyRelatedIncidentsOnAssessmentOfValueChainPartnersExplanatoryTextBlock',
                reportData.p3_l6_corrective_details, fy);
        }

        // Notes
        if (reportData.p3_general_notes) {
            this.addElement(root, 'NotesPrinciple3ExplanatoryTextBlock', reportData.p3_general_notes, fy);
        }
    }

    /**
     * Add Principle 6 data (Environmental)
     * Covers 13 Essential + 7 Leadership indicators
     */
    addPrinciple6(root, reportData) {
        const fy = 'CurrentYear';
        const py = 'PreviousYear';

        // E1: Energy Consumption (Aligned with 2025 Granular Taxonomy)
        this.addElement(root, 'WhetherTotalEnergyConsumptionAndEnergyIntensityIsApplicableToTheCompany', reportData.p6_e1_applicability, fy);

        // Renewable Sources
        this.addElement(root, 'TotalElectricityConsumptionFromRenewableSources', reportData.p6_e1_renew_elec_fy, fy, 'Joules');
        this.addElement(root, 'TotalElectricityConsumptionFromRenewableSources', reportData.p6_e1_renew_elec_py, py, 'Joules');
        this.addElement(root, 'TotalFuelConsumptionFromRenewableSources', reportData.p6_e1_renew_fuel_fy, fy, 'Joules');
        this.addElement(root, 'TotalFuelConsumptionFromRenewableSources', reportData.p6_e1_renew_fuel_py, py, 'Joules');
        this.addElement(root, 'EnergyConsumptionThroughOtherSourcesFromRenewableSources', reportData.p6_e1_renew_other_fy, fy, 'Joules');
        this.addElement(root, 'EnergyConsumptionThroughOtherSourcesFromRenewableSources', reportData.p6_e1_renew_other_py, py, 'Joules');
        this.addElement(root, 'TotalEnergyConsumedFromRenewableSources', reportData.p6_e1_total_renew_fy, fy, 'Joules');
        this.addElement(root, 'TotalEnergyConsumedFromRenewableSources', reportData.p6_e1_total_renew_py, py, 'Joules');

        // Non-Renewable Sources
        this.addElement(root, 'TotalElectricityConsumptionFromNonRenewableSources', reportData.p6_e1_non_renew_elec_fy, fy, 'Joules');
        this.addElement(root, 'TotalElectricityConsumptionFromNonRenewableSources', reportData.p6_e1_non_renew_elec_py, py, 'Joules');
        this.addElement(root, 'TotalFuelConsumptionFromNonRenewableSources', reportData.p6_e1_non_renew_fuel_fy, fy, 'Joules');
        this.addElement(root, 'TotalFuelConsumptionFromNonRenewableSources', reportData.p6_e1_non_renew_fuel_py, py, 'Joules');
        this.addElement(root, 'EnergyConsumptionThroughOtherSourcesFromNonRenewableSources', reportData.p6_e1_non_renew_other_fy, fy, 'Joules');
        this.addElement(root, 'EnergyConsumptionThroughOtherSourcesFromNonRenewableSources', reportData.p6_e1_non_renew_other_py, py, 'Joules');
        this.addElement(root, 'TotalEnergyConsumedFromNonRenewableSources', reportData.p6_e1_total_non_renew_fy, fy, 'Joules');
        this.addElement(root, 'TotalEnergyConsumedFromNonRenewableSources', reportData.p6_e1_total_non_renew_py, py, 'Joules');

        // Total
        this.addElement(root, 'TotalEnergyConsumedFromRenewableAndNonRenewableSources', reportData.p6_e1_grand_total_fy, fy, 'Joules');
        this.addElement(root, 'TotalEnergyConsumedFromRenewableAndNonRenewableSources', reportData.p6_e1_grand_total_py, py, 'Joules');

        this.addElement(root, 'EnergyIntensityPerRupeeOfTurnover', reportData.p6_e1_intensity_turnover_fy, fy, 'Pure');
        this.addElement(root, 'EnergyIntensityPerRupeeOfTurnover', reportData.p6_e1_intensity_turnover_py, py, 'Pure');
        this.addElement(root, 'EnergyIntensityPerRupeeOfTurnoverAdjustingForPurchasingPowerParity', reportData.p6_e1_intensity_ppp_fy, fy, 'Pure');
        this.addElement(root, 'EnergyIntensityPerRupeeOfTurnoverAdjustingForPurchasingPowerParity', reportData.p6_e1_intensity_ppp_py, py, 'Pure');
        this.addElement(root, 'EnergyIntensityInTermOfPhysicalOutput', reportData.p6_e1_intensity_physical_fy, fy, 'Pure');
        this.addElement(root, 'EnergyIntensityInTermOfPhysicalOutput', reportData.p6_e1_intensity_physical_py, py, 'Pure');

        this.addElement(root, 'AnyIndependentAssessmentOrEvaluationOrAssuranceHasBeenCarriedOutByAnExternalAgencyForEnergyConsumption',
            reportData.p6_e1_independent_assessment === 'Yes' ? 'true' : 'false', fy);
        this.addElement(root, 'NameOfTheExternalAgencyIfAnyIndependentAssessmentOrEvaluationOrAssuranceHasBeenCarriedOutByAnExternalAgencyForEnergyConsumptionExplanatoryTextBlock',
            reportData.p6_e1_external_agency_name, fy);

        // E2: Biodiversity
        this.addElement(root, 'DoesTheEntityHaveAnySitesOrFacilitiesWithinOrInTheAdjacentToTheProtectedAreasAndAreasOfHighBiodiversityValue',
            reportData.p6_e2_biodiversity_status, fy);
        this.addElement(root, 'DetailsOfAnySitesOrFacilitiesWithinOrInTheAdjacentToTheProtectedAreasAndAreasOfHighBiodiversityValueExplanatoryTextBlock',
            reportData.p6_e2_biodiversity_details, fy);

        // E3: Water Withdrawal & Consumption
        this.addElement(root, 'WhetherWaterWithdrawalConsumptionAndIntensityDisclosuresAreApplicableToTheCompany', reportData.p6_e3_applicability, fy);

        const waterSources = [
            { id: 'surface', element: 'WaterWithdrawalBySurfaceWater' },
            { id: 'ground', element: 'WaterWithdrawalByGroundwater' },
            { id: 'third_party', element: 'WaterWithdrawalByThirdPartyWater' },
            { id: 'seawater', element: 'WaterWithdrawalBySeawaterOrDesalinatedWater' },
            { id: 'others', element: 'WaterWithdrawalByOthers' }
        ];

        waterSources.forEach(({ id, element }) => {
            this.addElement(root, element, reportData[`p6_e3_${id}_fy`] || reportData[`water_${id}`], fy, 'Kilolitres');
            this.addElement(root, element, reportData[`p6_e3_${id}_py`], py, 'Kilolitres');
        });

        // Specific Source Extraction support for parser verification
        this.addElement(root, 'TotalVolumeOfWaterWithdrawalBySourceSurfaceWater', reportData.water_surface, fy, 'Kilolitres');
        this.addElement(root, 'TotalVolumeOfWaterWithdrawalBySourceGroundWater', reportData.water_ground, fy, 'Kilolitres');
        this.addElement(root, 'TotalVolumeOfWaterWithdrawalBySourceThirdParty', reportData.water_third_party, fy, 'Kilolitres');

        this.addElement(root, 'TotalVolumeOfWaterWithdrawal', reportData.p6_e3_total_withdrawal_fy, fy, 'Kilolitres');
        this.addElement(root, 'TotalVolumeOfWaterWithdrawal', reportData.p6_e3_total_withdrawal_py, py, 'Kilolitres');
        this.addElement(root, 'TotalVolumeOfWaterConsumption', reportData.p6_e3_total_consumption_fy, fy, 'Kilolitres');
        this.addElement(root, 'TotalVolumeOfWaterConsumption', reportData.p6_e3_total_consumption_py, py, 'Kilolitres');

        this.addElement(root, 'WaterIntensityPerRupeeOfTurnover', reportData.p6_e3_intensity_turnover_fy, fy, 'Pure');
        this.addElement(root, 'WaterIntensityPerRupeeOfTurnover', reportData.p6_e3_intensity_turnover_py, py, 'Pure');

        // E4: Water Discharge (Corrected Casing to match Taxonomy)
        const dischargeMetas = [
            { row: 'surface_none', element: 'WaterDischargeToSurfaceWaterWithOutTreatment' },
            { row: 'surface_treat', element: 'WaterDischargeToSurfaceWaterWithTreatment' },
            { row: 'ground_none', element: 'WaterDischargeToGroundwaterWithOutTreatment' },
            { row: 'ground_treat', element: 'WaterDischargeToGroundwaterWithTreatment' },
            { row: 'sea_none', element: 'WaterDischargeToSeawaterWithOutTreatment' },
            { row: 'sea_treat', element: 'WaterDischargeToSeawaterWithTreatment' },
            { row: 'third_none', element: 'WaterDischargeBySentToThirdPartiesWithoutTreatment' },
            { row: 'third_treat', element: 'WaterDischargeBySentToThirdPartiesWithTreatment' },
            { idPrefix: 'others', row: 'others_none', element: 'WaterDischargeToOthersWithoutTreatment' },
            { idPrefix: 'others', row: 'others_treat', element: 'WaterDischargeToOthersWithTreatment' }
        ];

        dischargeMetas.forEach(({ row, element }) => {
            this.addElement(root, element, reportData[`p6_e4_${row}_fy`], fy, 'Kilolitres');
            this.addElement(root, element, reportData[`p6_e4_${row}_py`], py, 'Kilolitres');
        });

        this.addElement(root, 'TotalWaterDischargedInKilolitres', reportData.p6_e4_total_discharge_fy, fy, 'Kilolitres');
        this.addElement(root, 'TotalWaterDischargedInKilolitres', reportData.p6_e4_total_discharge_py, py, 'Kilolitres');

        // E5: ZLD
        this.addElement(root, 'HasTheEntityImplementedAMechanismForZeroLiquidDischarge', reportData.p6_e5_zld_status, fy);
        this.addElement(root, 'DetailsOfCoverageAndImplementationIfForZeroLiquidDischargeExplanatoryTextBlock',
            reportData.p6_e5_zld_details_yes || reportData.p6_e5_zld_details_na, fy);

        // E6: Air Emissions
        const airPollutants = [
            { id: 'nox', element: 'NOx' },
            { id: 'sox', element: 'SOx' },
            { id: 'pm', element: 'ParticulateMatter' },
            { id: 'pop', element: 'PersistentOrganicPollutants' },
            { id: 'voc', element: 'VolatileOrganicCompounds' },
            { id: 'hap', element: 'HazardousAirPollutants' }
        ];

        airPollutants.forEach(({ id, element }) => {
            this.addElement(root, element, reportData[`p6_e6_${id}_fy`], fy, reportData[`p6_e6_${id}_unit`]);
            this.addElement(root, element, reportData[`p6_e6_${id}_py`], py, reportData[`p6_e6_${id}_unit`]);
        });

        // Comprehensive Air Emissions support
        this.addElement(root, 'EmissionsOfOzoneDepletingSubstances', reportData.emissions_ods, fy, 'Pure');
        this.addElement(root, 'EmissionsOfParticulateMatterPlus', reportData.emissions_pm, fy, 'Pure');
        this.addElement(root, 'EmissionsOfSulfurOxides', reportData.emissions_sox, fy, 'Pure');
        this.addElement(root, 'EmissionsOfNitrogenOxides', reportData.emissions_nox, fy, 'Pure');

        // E7: GHG Emissions
        this.addElement(root, 'TotalScope1Emissions', reportData.p6_e7_scope1_fy, fy, reportData.p6_e7_scope1_unit);
        this.addElement(root, 'TotalScope1Emissions', reportData.p6_e7_scope1_py, py, reportData.p6_e7_scope1_unit);
        this.addElement(root, 'TotalScope2Emissions', reportData.p6_e7_scope2_fy, fy, reportData.p6_e7_scope2_unit);
        this.addElement(root, 'TotalScope2Emissions', reportData.p6_e7_scope2_py, py, reportData.p6_e7_scope2_unit);

        // E9: Waste Management
        const wasteCategories = [
            { id: 'plastic', element: 'PlasticWaste' },
            { id: 'ewaste', element: 'EWaste' },
            { id: 'biomed', element: 'BioMedicalWaste' },
            { id: 'construction', element: 'ConstructionAndDemolitionWaste' },
            { id: 'battery', element: 'BatteryWaste' },
            { id: 'radioactive', element: 'RadioactiveWaste' },
            { id: 'haz_other', element: 'OtherHazardousWaste' },
            { id: 'nonhaz_other', element: 'OtherNonHazardousWasteGenerated' }
        ];

        wasteCategories.forEach(({ id, element }) => {
            this.addElement(root, element, reportData[`p6_e9_${id}_fy`], fy, 'MetricTons');
            this.addElement(root, element, reportData[`p6_e9_${id}_py`], py, 'MetricTons');
        });

        // Comprehensive Waste details support
        this.addElement(root, 'AmountOfPlasticWaste', reportData.waste_plastic, fy, 'MetricTons');
        this.addElement(root, 'AmountOfEWaste', reportData.waste_e_waste, fy, 'MetricTons');
        this.addElement(root, 'AmountOfHazardousWaste', reportData.waste_hazardous, fy, 'MetricTons');
        this.addElement(root, 'AmountOfOtherWaste', reportData.waste_other, fy, 'MetricTons');

        this.addElement(root, 'TotalWasteGenerated', reportData.p6_e9_total_generation_fy, fy, 'MetricTons');
        this.addElement(root, 'TotalWasteGenerated', reportData.p6_e9_total_generation_py, py, 'MetricTons');

        // Recovery & Disposal
        this.addElement(root, 'WasteRecoveredThroughRecycled', reportData.p6_e9_recycled_fy, fy, 'MetricTons');
        this.addElement(root, 'WasteRecoveredThroughReUsed', reportData.p6_e9_reused_fy, fy, 'MetricTons');
        this.addElement(root, 'WasteRecoveredThroughOtherRecoveryOperations', reportData.p6_e9_other_recovery_fy, fy, 'MetricTons');

        this.addElement(root, 'WasteDisposedByIncineration', reportData.p6_e9_incineration_fy, fy, 'MetricTons');
        this.addElement(root, 'WasteDisposedByLandfilling', reportData.p6_e9_landfilling_fy, fy, 'MetricTons');
        this.addElement(root, 'WasteDisposedByOtherDisposalOperations', reportData.p6_e9_other_disposal_fy, fy, 'MetricTons');

        // E12: EIA
        if (reportData.p6_e12_eia_details) {
            try {
                const eiaData = typeof reportData.p6_e12_eia_details === 'string' ? JSON.parse(reportData.p6_e12_eia_details) : reportData.p6_e12_eia_details;
                if (Array.isArray(eiaData)) {
                    eiaData.forEach((row, idx) => {
                        const ctx = `CurrentYear_EIAProjectsAxis_${idx + 1}`;
                        this.addElement(root, 'NameAndBriefDetailsOfProject', row.project_name, ctx);
                        this.addElement(root, 'EIANotificationNumber', row.eia_notification, ctx);
                        this.addElement(root, 'WhetherConductedByIndependentExternalAgencyP6', row.independent_assessment, ctx);
                        this.addElement(root, 'ResultsCommunicatedInPublicDomainP6', row.results_public, ctx);
                        this.addElement(root, 'WebLinkOfResultsOfLifeCycleAssessmentsP6', row.web_link, ctx);
                    });
                }
            } catch (e) { console.error('P6 E12 Error:', e); }
        }

        // L1: Water Withdrawal/Consumption/Discharge in Areas of Water Stress
        this.addElement(root, 'AnyIndependentAssessmentOrEvaluationOrAssuranceHasBeenCarriedOutByAnExternalAgencyForAreasOfWaterStress',
            reportData.p6_l1_independent_assessment === 'Yes' ? 'true' : 'false', fy);
        this.addElement(root, 'NameOfTheExternalAgencyIfAnyIndependentAssessmentOrEvaluationOrAssuranceHasBeenCarriedOutByAnExternalAgencyForAreasOfWaterStressExplanatoryTextBlock',
            reportData.p6_l1_external_agency_details, fy);

        // L2: Scope 3
        this.addElement(root, 'WhetherTotalScope3EmissionsAndItsIntensityIsApplicableToTheCompany', reportData.p6_l2_is_applicable, fy);
        if (reportData.p6_l2_is_applicable === 'Yes') {
            this.addElement(root, 'TotalScope3Emissions', reportData.p6_l2_scope3_fy, fy, reportData.p6_l2_scope3_unit);
            this.addElement(root, 'TotalScope3Emissions', reportData.p6_l2_scope3_py, py, reportData.p6_l2_scope3_unit);
            this.addElement(root, 'TotalScope3EmissionsPerRupeeOfTurnover', reportData.p6_l2_turnover_fy, fy, 'Pure');
            this.addElement(root, 'TotalScope3EmissionsPerRupeeOfTurnover', reportData.p6_l2_turnover_py, py, 'Pure');
            this.addElement(root, 'TotalScope3EmissionIntensityTheRelevantMetricMayBeSelectedByTheEntity', reportData.p6_l2_optional_fy, fy, 'Pure');
            this.addElement(root, 'TotalScope3EmissionIntensityTheRelevantMetricMayBeSelectedByTheEntity', reportData.p6_l2_optional_py, py, 'Pure');

            // Scope 3 Assurance (Leadership Indicator 2)
            this.addElement(root, 'WhetherAnyIndependentAssessmentOrEvaluationOrAssuranceHasBeenCarriedOutByAnExternalAgencyForTotalScope3Emissions',
                reportData.p6_l2_independent_assessment === 'Yes' ? 'true' : 'false', fy);
            this.addElement(root, 'NameOfTheExternalAgencyThatUndertookIndependentAssessmentOrEvaluationOrAssuranceForTotalScope3EmissionsExplanatoryTextBlock',
                reportData.p6_l2_external_agency_details, fy);
        }

        // L3: Biodiversity Impact
        this.addElement(root, 'DetailsOfSignificantDirectAndIndirectImpactOfTheEntityOnBiodiversityInSuchAreasAlongWithPreventionAndRemediationActivitiesExplanatoryTextBlock',
            reportData.p6_l3_biodiversity_details, fy);

        // L4: Innovative Tech
        // This is a table in UI, but often mapped as ExplanatoryTextBlock if complex
        this.addElement(root, 'TheEntityHasUndertakenAnySpecificInitiativesOrUsedInnovativeTechnologyOrSolutionsToImproveResourceEfficiencyExplanatoryTextBlock',
            reportData.p6_l4_tech_details, fy);

        // L5: Continuity Plan
        this.addElement(root, 'DoesTheEntityHaveABusinessContinuityAndDisasterManagementPlan', reportData.p6_l5_continuity_status, fy);
        this.addElement(root, 'DetailsOfEntityAtWhichBusinessContinuityAndDisasterManagementPlanIsPlacedOrWeblinkExplanatoryTextBlock',
            reportData.p6_l5_plan_location, fy);

        // Notes
        this.addElement(root, 'NotesPrinciple6ExplanatoryTextBlock', reportData.p6_general_notes, fy);
    }

    /**
     * Add Principle 7 data (Public Policy)
     */
    addPrinciple7(root, reportData) {
        const fy = 'CurrentYear';

        // E1: Affiliations
        this.addElement(root, 'NumberOfAffiliationsWithTradeAndIndustryChambers',
            reportData.number_of_affiliations_with_trade_and_industry_chambers_or_associations, fy, 'Pure');

        if (reportData.p7_e1_affiliations_list_data) {
            try {
                const affiliations = typeof reportData.p7_e1_affiliations_list_data === 'string' ?
                    JSON.parse(reportData.p7_e1_affiliations_list_data) : reportData.p7_e1_affiliations_list_data;
                if (Array.isArray(affiliations)) {
                    affiliations.forEach((aff, idx) => {
                        const ctx = `CurrentYear_TradeIndustryChambersAxis_${idx + 1}`;
                        this.addElement(root, 'NameOfTheTradeAndIndustryChambersOrAssociations', aff.name, ctx);
                        this.addElement(root, 'ReachOfTradeAndIndustryChambersOrAssociations', aff.reach, ctx);
                    });
                }
            } catch (e) { console.error('P7 E1 Error:', e); }
        }

        // E2: Anti-competitive conduct
        this.addElement(root, 'ProvideDetailsOfCorrectiveActionTakenOrUnderwayOnAnyIssuesRelatedToAntiCompetitiveConductByTheEntityBasedOnAdverseOrdersFromRegulatoryAuthoritiesExplanatoryTextBlock',
            reportData.provide_details_of_corrective_action_taken_or_underway_on_any_issues_related_to_anti_competitive_conduct_by_the_entity_based_on_adverse_orders_from_regulatory_authorities_explanatory_text_block, fy);

        // Notes
        this.addElement(root, 'NotesPrinciple7ExplanatoryTextBlock', reportData.p7_general_notes, fy);
    }

    /**
     * Add Principle 8 data (Inclusive Growth)
     */
    addPrinciple8(root, reportData) {
        const fy = 'CurrentYear';
        const py = 'PreviousYear';

        // E1: SIA
        this.addElement(root, 'DetailsOfSocialImpactAssessmentsOfProjectsUndertakenByTheEntityBasedOnApplicableLawsInTheCurrentFinancialYearExplanatoryTextBlock',
            reportData.details_of_social_impact_assessments_of_projects_undertaken_by_the_entity_based_on_applicable_laws_in_the_current_financial_year_explanatory_text_block, fy);

        // E2: R&R
        this.addElement(root, 'ProvideInformationOnProjectsForWhichOngoingRehabilitationAndResettlementIsBeingUndertakenByYourEntityInTheFollowingFormatExplanatoryTextBlock',
            reportData.provide_information_on_projects_for_which_ongoing_rehabilitation_and_resettlement_is_being_undertaken_by_your_entity_in_the_following_format_explanatory_text_block, fy);

        // E3: Redressal
        this.addElement(root, 'DescribeTheMechanismsToReceiveAndRedressGrievancesOfTheCommunityExplanatoryTextBlock',
            reportData.describe_the_mechanisms_to_receive_and_redress_grievances_of_the_community_explanatory_text_block, fy);

        // E4: Input Material
        this.addElement(root, 'PercentageOfInputMaterialDirectlySourcedFromMSMEsOrSmallProducers', reportData.p8_e4_msme_fy, fy, 'Pure');
        this.addElement(root, 'PercentageOfInputMaterialDirectlySourcedFromMSMEsOrSmallProducers', reportData.p8_e4_msme_py, py, 'Pure');
        this.addElement(root, 'PercentageOfInputMaterialSourcedDirectlyFromWithinTheDistrictAndNeighbouringDistricts', reportData.p8_e4_district_fy, fy, 'Pure');
        this.addElement(root, 'PercentageOfInputMaterialSourcedDirectlyFromWithinTheDistrictAndNeighbouringDistricts', reportData.p8_e4_district_py, py, 'Pure');

        // E5: Job Creation
        const jobLocs = ['rural', 'semi_urban', 'urban', 'metro'];
        jobLocs.forEach(loc => {
            const ctxFy = `CurrentYear_JobCreationLocationAxis_${loc.toUpperCase()}Member`;
            this.addElement(root, 'DiscloseWagesPaidToPersonsEmployed', reportData[`p8_e5_${loc}_wages_fy`], ctxFy, 'INR');
            this.addElement(root, 'TotalWageCost', reportData[`p8_e5_${loc}_total_fy`], ctxFy, 'INR');
            this.addElement(root, 'PercentageOfJobCreation', reportData[`p8_e5_${loc}_percentage_fy`], ctxFy, 'Pure');
        });

        // Notes
        this.addElement(root, 'NotesPrinciple8ExplanatoryTextBlock', reportData.p8_general_notes, fy);
    }

    /**
     * Add Principle 9 data (Consumer Value)
     */
    addPrinciple9(root, reportData) {
        const fy = 'CurrentYear';
        const py = 'PreviousYear';

        // E1: Consumer Complaints
        const complaintIssues = [
            { id: 'data_privacy', member: 'DataPrivacyMember' },
            { id: 'advertising', member: 'AdvertisingMember' },
            { id: 'cyber_security', member: 'CyberSecurityMember' },
            { id: 'delivery_essential', member: 'DeliveryOfEssentialServicesMember' },
            { id: 'restrictive_trade', member: 'RestrictiveTradePracticesMember' },
            { id: 'unfair_trade', member: 'UnfairTradePracticesMember' },
            { id: 'others', member: 'OthersMember' }
        ];

        complaintIssues.forEach(({ id, member }) => {
            const ctxFy = `CurrentYear_ConsumerComplaintsAxis_${member}`;
            const ctxPy = `PreviousYear_ConsumerComplaintsAxis_${member}`;

            this.addElement(root, 'NumberOfComplaintsReceivedDuringYear', reportData[`p9_e1_${id}_received_fy`], ctxFy);
            this.addElement(root, 'NumberOfComplaintsPendingResolutionAtEndOfYear', reportData[`p9_e1_${id}_pending_fy`], ctxFy);
            this.addElement(root, 'RemarksForComplaints', reportData[`p9_e1_${id}_remarks_fy`], ctxFy);
        });

        // E2: Product Recalls
        this.addElement(root, 'NumberOfProductRecallsForVoluntaryRecalls', reportData.p9_e2_voluntary_recalls, fy);
        this.addElement(root, 'NumberOfProductRecallsForInvoluntaryRecalls', reportData.p9_e2_involuntary_recalls, fy);

        // Notes
        this.addElement(root, 'NotesPrinciple9ExplanatoryTextBlock', reportData.p9_general_notes, fy);
    }

    /**
     * Add Principle 4 data (Stakeholder Engagement)
     * Covers 2 Essential + 3 Leadership indicators
     */
    addPrinciple4(root, reportData) {
        const fy = 'CurrentYear';

        // Essential Indicator 1: Process for identifying stakeholders
        this.addElement(root, 'DescribeTheProcessesForIdentifyingKeyStakeholderGroupsOfTheEntityExplanatoryTextBlock',
            reportData.describe_the_processes_for_identifying_key_stakeholder_groups_of_the_entity_explanatory_text_block, fy);

        // Essential Indicator 2: Stakeholder Engagement Table
        const stakeholderData = reportData.list_stakeholder_groups_identified_as_key_for_your_entity_and_the_frequency_of_engagement_with_each_stakeholder_group_explanatory_text_block;
        if (stakeholderData) {
            try {
                const rows = typeof stakeholderData === 'string' ? JSON.parse(stakeholderData) : stakeholderData;
                if (Array.isArray(rows)) {
                    rows.forEach((row, idx) => {
                        const contextRef = `CurrentYear_StakeHolderGroupsAxis_${idx + 1}`;

                        this.addElement(root, 'StakeholderGroup', row.stakeholder_group, contextRef);

                        if (row.identified_as_vulnerable) {
                            const isVulnerable = row.identified_as_vulnerable === 'Yes' ? 'true' :
                                row.identified_as_vulnerable === 'No' ? 'false' :
                                    String(row.identified_as_vulnerable).toLowerCase();
                            this.addElement(root, 'WhetherIdentifiedAsVulnerableAndMarginalizedGroup', isVulnerable, contextRef);
                        }

                        this.addElement(root, 'ChannelsOfCommunication', row.channels, contextRef);
                        this.addElement(root, 'DetailsOfOtherChannelsOfCommunication', row.other_channels, contextRef);
                        this.addElement(root, 'FrequencyOfEngagement', row.frequency, contextRef);
                        this.addElement(root, 'DetailsOfOtherFrequencyOfEngagement', row.other_frequency, contextRef);
                        this.addElement(root, 'PurposeAndScopeOfEngagementIncludingKeyTopicsAndConcernsRaisedDuringSuchEngagement', row.purpose, contextRef);
                    });
                }
            } catch (e) {
                console.error('Error parsing Principle 4 stakeholder table:', e);
            }
        }

        // Leadership Indicator 1: Consultation processes
        this.addElement(root, 'ProvideTheProcessesForConsultationBetweenStakeholdersAndTheBoardOnEconomicEnvironmentalAndSocialTopicsOrIfConsultationIsDelegatedHowIsFeedbackFromSuchConsultationsProvidedToTheBoardExplanatoryTextBlock',
            reportData.p4_l1_consultation_details, fy);

        // Leadership Indicator 2: Whether stakeholder consultation used
        if (reportData.p4_l2_status) {
            const status = reportData.p4_l2_status === 'Yes' ? 'true' :
                reportData.p4_l2_status === 'No' ? 'false' :
                    String(reportData.p4_l2_status).toLowerCase();
            this.addElement(root, 'WhetherStakeholderConsultationIsUsedToSupportTheIdentificationAndManagementOfEnvironmentalAndSocialTopics', status, fy);
        }

        // Leadership Indicator 2 (cont): Incorporation details
        this.addElement(root, 'DetailsOfInstancesAsToHowTheInputsReceivedFromStakeholdersOnTheseTopicsWereIncorporatedIntoPoliciesAndActivitiesOfTheEntityExplanatoryTextBlock',
            reportData.p4_l3_incorporation_details, fy);

        // Leadership Indicator 3: Vulnerable stakeholder engagement
        this.addElement(root, 'DetailsOfInstancesOfEngagementWithAndActionsTakenToAddressTheConcernsOfVulnerableMarginalizedStakeholderGroupsExplanatoryTextBlock',
            reportData.p4_l4_engagement_details, fy);

        // Notes
        this.addElement(root, 'NotesPrinciple4ExplanatoryTextBlock',
            reportData.p4_general_notes, fy);
    }
    /**
     * Add Principle 5 data (Human Rights)
     * Covers 11 Essential + 5 Leadership indicators
     */
    addPrinciple5(root, reportData) {
        const fy = 'CurrentYear';
        const py = 'PreviousYear';

        // E1: Training on Human Rights
        const trainingElements = [
            { row: 'perm_emp', member: 'PermanentEmployeesMember' },
            { row: 'other_emp', member: 'OtherThanPermanentEmployeesMember' },
            { row: 'perm_worker', member: 'PermanentWorkersMember' },
            { row: 'other_worker', member: 'OtherThanPermanentWorkersMember' }
        ];

        trainingElements.forEach(({ row, member }) => {
            const ctxFy = `CurrentYear_TrainingOnHumanRightsEmployeesAndWorkersAxis_${member}`;
            const ctxPy = `PreviousYear_TrainingOnHumanRightsEmployeesAndWorkersAxis_${member}`;

            this.addElement(root, 'TotalNumberOfEmployeesOrWorkersForTrainingOnHumanRightsIssues', reportData[`p5_e1_${row}_total_fy`], ctxFy);
            this.addElement(root, 'NumberOfEmployeesOrWorkersCoveredForProvidedTrainingOnHumanRightsIssues', reportData[`p5_e1_${row}_on_hr_fy`], ctxFy);
            this.addElement(root, 'PercentageOfEmployeesOrWorkersCoveredForProvidedTrainingOnHumanRightsIssues', reportData[`p5_e1_${row}_percent_fy`], ctxFy, 'Pure');

            this.addElement(root, 'TotalNumberOfEmployeesOrWorkersForTrainingOnHumanRightsIssues', reportData[`p5_e1_${row}_total_py`], ctxPy);
            this.addElement(root, 'NumberOfEmployeesOrWorkersCoveredForProvidedTrainingOnHumanRightsIssues', reportData[`p5_e1_${row}_on_hr_py`], ctxPy);
            this.addElement(root, 'PercentageOfEmployeesOrWorkersCoveredForProvidedTrainingOnHumanRightsIssues', reportData[`p5_e1_${row}_percent_py`], ctxPy, 'Pure');
        });

        // E2: Minimum Wages
        const minWageCategories = [
            { row: 'perm_emp', empMem: 'PermanentEmployeesMember' },
            { row: 'other_emp', empMem: 'OtherThanPermanentEmployeesMember' },
            { row: 'perm_worker', empMem: 'PermanentWorkersMember' },
            { row: 'other_worker', empMem: 'OtherThanPermanentWorkersMember' }
        ];
        const genders = [
            { id: 'male', member: 'MaleMember' },
            { id: 'female', member: 'FemaleMember' },
            { id: 'other', member: 'OtherGenderMember' }
        ];

        minWageCategories.forEach(({ row, empMem }) => {
            genders.forEach(({ id, member }) => {
                const ctxFy = `CurrentYear_MinimumWagesEmployeesAndWorkersAxis_${empMem}_GenderAxis_${member}`;
                const ctxPy = `PreviousYear_MinimumWagesEmployeesAndWorkersAxis_${empMem}_GenderAxis_${member}`;

                const fieldPrefix = `p5_e2_${row}_${id}`;
                this.addElement(root, 'NumberOfEmployeesOrWorkersRelatedToMinimumWages', reportData[`${fieldPrefix}_total_fy`], ctxFy);
                this.addElement(root, 'PercentageOfEmployeesOrWorkersRelatedToMinimumWages', reportData[`${fieldPrefix}_equal_pct_fy`], ctxFy, 'Pure');
                // The taxonomy seems to have specific elements for Equal/More? 
                // Based on presentation: NumberOfEmployeesOrWorkersRelatedToMinimumWages is used with members
                // TotalMinimalWageMember, EqualToMinimumWageMember, MoreThanMinimumWageMember
            });
        });

        // E3: Remuneration & Gross Wages
        const remunerationRows = [
            { row: 'bod', element: 'OfBoardOfDirectors' },
            { row: 'kmp', element: 'OfKeyManagerialPersonnel' },
            { row: 'emp_others', element: 'OfEmployeesOtherThanBodAndKMP' },
            { row: 'workers', element: 'OfWorkers' }
        ];

        remunerationRows.forEach(({ row, element }) => {
            genders.forEach(({ id, member }) => {
                const context = `CurrentYear_GenderAxis_${member}`;
                this.addElement(root, `NumberOf${element.replace('Of', '')}ForRemunerationOrSalaryOrWages`, reportData[`p5_e3a_${row}_${id}_no`], context);
                this.addElement(root, `MedianOfRemunerationOrSalaryOrWages${element}`, reportData[`p5_e3a_${row}_${id}_median`], context, 'INR');
            });
        });

        // E3b: Gross Wages paid to females
        this.addElement(root, 'GrossWagesPaidToFemales', reportData.p5_e3b_gross_female_fy, fy, 'INR');
        this.addElement(root, 'GrossWagesPaidToFemales', reportData.p5_e3b_gross_female_py, py, 'INR');
        this.addElement(root, 'TotalWages', reportData.p5_e3b_total_wages_fy, fy, 'INR');
        this.addElement(root, 'TotalWages', reportData.p5_e3b_total_wages_py, py, 'INR');

        // E4: Focal Point
        this.addElement(root, 'DoYouHaveAFocalPointResponsibleForAddressingHumanRightsImpactsOrIssuesCausedOrContributedToByTheBusiness',
            reportData.whether_do_you_have_a_focal_point_responsible_for_addressing_human_rights_impacts_or_issues_caused_or_contributed_to_by_the_business, fy);

        // E5: Internal Mechanism
        this.addElement(root, 'DescribeTheInternalMechanismsInPlaceToRedressGrievancesRelatedToHumanRightsIssuesExplanatoryTextBlock',
            reportData.describe_the_internal_mechanisms_in_place_to_redress_grievances_related_to_human_rights_issues_explanatory_text_block, fy);

        // E6: Complaints (Axis: ComplaintsAxis, Members: SexualHarassmentMember, etc.)
        const complaintIssues = [
            { id: 'sexual_harassment', member: 'SexualHarassmentMember' },
            { id: 'discrimination', member: 'DiscriminationAtWorkplaceMember' },
            { id: 'child_labour', member: 'ChildLabourMember' },
            { id: 'forced_labour', member: 'ForcedLabourOrInvoluntaryLabourMember' },
            { id: 'wages', member: 'WagesMember' },
            { id: 'others', member: 'OtherhumanrightsrelatedissuesMember' }
        ];

        complaintIssues.forEach(({ id, member }) => {
            const ctxFy = `CurrentYear_ComplaintsAxis_${member}`;
            const ctxPy = `PreviousYear_ComplaintsAxis_${member}`;

            this.addElement(root, 'NumberOfComplaintsFiledDuringTheYear', reportData[`p5_e6_${id}_filed_fy`], ctxFy);
            this.addElement(root, 'NumberOfComplaintsPendingResolutionAtTheEndOfYear', reportData[`p5_e6_${id}_pending_fy`], ctxFy);
            this.addElement(root, 'RemarksforComplaintsExplanatoryTextBlock', reportData[`p5_e6_${id}_remarks_fy`], ctxFy);

            this.addElement(root, 'NumberOfComplaintsFiledDuringTheYear', reportData[`p5_e6_${id}_filed_py`], ctxPy);
            this.addElement(root, 'NumberOfComplaintsPendingResolutionAtTheEndOfYear', reportData[`p5_e6_${id}_pending_py`], ctxPy);
            this.addElement(root, 'RemarksforComplaintsExplanatoryTextBlock', reportData[`p5_e6_${id}_remarks_py`], ctxPy);
        });

        // E7: POSH
        this.addElement(root, 'TotalComplaintsReportedUnderSexualHarassmentOfWomenAtWorkplace', reportData.p5_e7_total_posh_fy, fy);
        this.addElement(root, 'TotalComplaintsReportedUnderSexualHarassmentOfWomenAtWorkplace', reportData.p5_e7_total_posh_py, py);
        this.addElement(root, 'AverageNumberOfFemaleEmployeesOrWorkersAtTheBeginningOfTheYearAndAsAtEndOfTheYear', reportData.p5_e7_female_count_fy, fy);
        this.addElement(root, 'AverageNumberOfFemaleEmployeesOrWorkersAtTheBeginningOfTheYearAndAsAtEndOfTheYear', reportData.p5_e7_female_count_py, py);
        this.addElement(root, 'PercentageOfComplaintsInRespectOfNumberOfEmployeesOrWorker', reportData.p5_e7_percent_fy, fy, 'Pure');
        this.addElement(root, 'PercentageOfComplaintsInRespectOfNumberOfEmployeesOrWorker', reportData.p5_e7_percent_py, py, 'Pure');
        this.addElement(root, 'ComplaintsOnPOSHUpHeld', reportData.p5_e7_upheld_fy, fy);
        this.addElement(root, 'ComplaintsOnPOSHUpHeld', reportData.p5_e7_upheld_py, py);

        // E8: Mechanisms to prevent adverse consequences
        this.addElement(root, 'MechanismsToPreventAdverseConsequencesToTheComplainantInDiscriminationAndHarassmentCasesExplanatoryTextBlock',
            reportData.mechanisms_to_prevent_adverse_consequences_to_the_complainant_in_discrimination_and_harassment_cases, fy);

        // E9: HR requirements in business agreements
        this.addElement(root, 'DoHumanRightsRequirementsFormPartOfYourBusinessAgreementsAndContracts', reportData.p5_e9_hr_requirements, fy);
        this.addElement(root, 'DetailsOfHumanRightsRequirementsFormPartOfYourBusinessAgreementsAndContractsExplanatoryTextBlock',
            reportData.human_rights_agreements_contracts_details, fy);

        // E10: Assessments
        const assessmentIssues = [
            { id: 'child_labour', element: 'AssessmentOfChildLabour' },
            { id: 'forced_labour', element: 'AssessmentOfForcedOrInvoluntaryLabour' },
            { id: 'sexual_harassment', element: 'AssessmentOfSexualHarassment' },
            { id: 'discrimination', element: 'AssessmentOfDiscriminationAtWorkplace' },
            { id: 'wages', element: 'AssessmentOfWages' },
            { id: 'others', element: 'AssessmentOfOthers' }
        ];

        assessmentIssues.forEach(({ id, element }) => {
            this.addElement(root, `PercentageOfPlantsAndOfficesThatWereAssessedByEntityOrStatutoryAuthoritiesOrThirdPartiesRelatedTo${element.replace('AssessmentOf', '')}`,
                reportData[`p5_e10_${id}_pct`], fy, 'Pure');
        });

        // E11: Corrective Actions
        this.addElement(root, 'DetailsOfAnyCorrectiveActionsTakenOrUnderwayToAddressSignificantRisksOrConcernsArisingFromAssessmentsExplanatoryTextBlock',
            reportData.p5_e11_corrective_actions_details, fy);

        // Notes
        this.addElement(root, 'NotesPrinciple5ExplanatoryTextBlock', reportData.p5_general_notes, fy);
    }

    /**
     * Helper method to add matrix-type element (segmented by Principle)
     */
    addMatrixElement(root, elementName, jsonData, principle, contextRef, unitRef = null) {
        if (!jsonData || jsonData === '') return;

        try {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            const value = data[principle];

            if (value !== undefined && value !== null && value !== '') {
                // In a real XBRL instance, we would use a context with the specific Principle dimension
                // For simplified mapping, we might use a combined ID or a specific context reference
                const segmentedContextRef = `${contextRef}_${principle}`;
                this.addElement(root, elementName, value, segmentedContextRef, unitRef);
            }
        } catch (e) {
            console.error(`Error parsing matrix data for ${elementName}:`, e);
        }
    }

    /**
     * Add Quality and Assurance Disclosures
     */
    addQualityAssurance(root, reportData) {
        this.addElement(root, 'WhetherTheCompanyHasUndertakenAssessmentOrAssuranceOfTheBRSRCore', reportData.assurance_applicable, 'CurrentYear');
        this.addElement(root, 'TypeOfAssessmentOrAssuranceObtain', reportData.assurance_type, 'CurrentYear');
        this.addElement(root, 'NameOfTheCompanyOrLLPOrFirmOfAssessmentOrAssuranceProvider', reportData.assurance_provider, 'CurrentYear');

        // P1-P9
        this.addElement(root, 'WhetherTheEntityHasAStrategyForSustainableSourcing', reportData.p2_sustainable_sourcing, 'CurrentYear');
        this.addElement(root, 'WhetherTheEntityHasIdentifiedInternalAndExternalStakeholders', reportData.p4_stakeholder_engagement, 'CurrentYear');
        this.addElement(root, 'WhetherTheEntityHasAPolicyOnHumanRights', reportData.p5_human_rights_policy, 'CurrentYear');
        this.addElement(root, 'WhetherTheEntityHasAAssociationWithPublicPolicy', reportData.p7_policy_advocacy, 'CurrentYear');
        this.addElement(root, 'TotalNumberOfConsumerComplaints', reportData.p9_consumer_complaints, 'CurrentYear');
    }

    /**
     * Helper method to add XBRL element
     */
    addElement(root, elementName, value, contextRef, unitRef = null) {
        if (value === null || value === undefined || value === '') {
            return; // Skip empty values
        }

        const attrs = { contextRef };
        if (unitRef) {
            attrs.unitRef = unitRef;
        }

        root.ele(`in-capmkt:${elementName}`, attrs).txt(String(value)).up();
    }

    /**
     * Get previous year date
     */
    getPreviousYearDate(dateStr, yearsBack = 1) {
        const date = new Date(dateStr);
        date.setFullYear(date.getFullYear() - yearsBack);
        return date.toISOString().split('T')[0];
    }
}

module.exports = BRSRXBRLMapper;

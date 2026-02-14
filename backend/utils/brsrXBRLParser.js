const xml2js = require('xml2js');

class BRSRXBRLParser {
    constructor() {
        // Robust Pattern Matching Strategy
        // We look for these regex patterns in the XML Tag Names to identify fields.
        this.patterns = [
            // --- General (in-capmkt taxonomy: tags same as in-capmkt-pre-2025-05-31.xml / in-capmkt.xsd) ---
            { field: 'company_name', regex: /(^|:)NameOf(The)?(Company|ListedEntity)$/i },
            { field: 'cin', regex: /(^|:)(CorporateIdentityNumber|CIN)$/i },
            { field: 'nic_sector', regex: /(^|:)NatureOfBusiness$/i },
            { field: 'industry', regex: /(^|:)Industry$/i },
            { field: 'address_registered_office', regex: /(^|:)AddressOfRegisteredOfficeOfCompany$/i },
            { field: 'turnover', regex: /(^|:)(Total)?Turnover|RevenueFromOperations$/i },
            { field: 'financial_year', regex: /(^|:)FinancialYear$/i },
            { field: 'date_of_incorporation', regex: /(^|:)DateOfIncorporation$/i },
            { field: 'date_start_fy', regex: /(^|:)DateOfStartOfFinancialYear$/i },
            { field: 'date_end_fy', regex: /(^|:)DateOfEndOfFinancialYear$/i },
            { field: 'date_start_previous', regex: /(^|:)DateOfStartOfPreviousYear$/i },
            { field: 'date_end_previous', regex: /(^|:)DateOfEndOfPreviousYear$/i },
            { field: 'reporting_boundary', regex: /(^|:)ReportingBoundary$/i },
            { field: 'value_of_shares_paid_up', regex: /(^|:)ValueOfSharesPaidUp$/i },
            { field: 'name_of_contact_person', regex: /(^|:)NameOfContactPerson$/i },
            { field: 'contact_number_contact_person', regex: /(^|:)ContactNumberOfContactPerson$/i },
            { field: 'email_contact_person', regex: /(^|:)EMailOfContactPerson$/i },
            { field: 'address_registered_office', regex: /(^|:)AddressOfRegisteredOfficeOfCompany$/i },
            { field: 'address_corporate_office', regex: /(^|:)AddressOfCorporateOfficeOfCompany$/i },
            { field: 'email_company', regex: /(^|:)EMailOfTheCompany$/i },
            { field: 'telephone_company', regex: /(^|:)TelephoneOfCompany$/i },
            { field: 'website_company', regex: /(^|:)WebsiteOfCompany$/i },

            // --- P6 Environment (2025-05-31 Taxonomy) ---
            { field: 'p6_e1_applicability', regex: /^WhetherTotalEnergyConsumptionAndEnergyIntensityIsApplicableToTheCompany$/i },

            // Renewable
            { field: 'p6_e1_renew_elec_fy', regex: /^TotalElectricityConsumptionFromRenewableSources$/i },
            { field: 'p6_e1_renew_fuel_fy', regex: /^TotalFuelConsumptionFromRenewableSources$/i },
            { field: 'p6_e1_renew_other_fy', regex: /^EnergyConsumptionThroughOtherSourcesFromRenewableSources$/i },
            { field: 'p6_e1_total_renew_fy', regex: /^TotalEnergyConsumedFromRenewableSources$/i },

            // Non-Renewable
            { field: 'p6_e1_non_renew_elec_fy', regex: /^TotalElectricityConsumptionFromNonRenewableSources$/i },
            { field: 'p6_e1_non_renew_fuel_fy', regex: /^TotalFuelConsumptionFromNonRenewableSources$/i },
            { field: 'p6_e1_non_renew_other_fy', regex: /^EnergyConsumptionThroughOtherSourcesFromNonRenewableSources$/i },
            { field: 'p6_e1_total_non_renew_fy', regex: /^TotalEnergyConsumedFromNonRenewableSources$/i },

            { field: 'p6_e1_grand_total_fy', regex: /^TotalEnergyConsumedFromRenewableAndNonRenewableSources$/i },
            { field: 'p6_e1_intensity_turnover_fy', regex: /^EnergyIntensityPerRupeeOfTurnover$/i },
            { field: 'p6_e1_intensity_physical_fy', regex: /^EnergyIntensityInTermOfPhysicalOutput$/i },

            { field: 'p6_e3_applicability', regex: /^WhetherWaterWithdrawalConsumptionAndIntensityDisclosuresAreApplicableToTheCompany$/i },
            { field: 'p6_e3_total_withdrawal_fy', regex: /^TotalVolumeOfWaterWithdrawal$/i },
            { field: 'p6_e3_total_consumption_fy', regex: /^TotalVolumeOfWaterConsumption$/i },
            { field: 'p6_e3_intensity_turnover_fy', regex: /^WaterIntensityPerRupeeOfTurnover$/i },
            { field: 'p6_e3_intensity_physical_fy', regex: /^WaterIntensityInTermOfPhysicalOutput$/i },

            { field: 'p6_e7_scope1_fy', regex: /^TotalScope1Emissions$/i },
            { field: 'p6_e7_scope2_fy', regex: /^TotalScope2Emissions$/i },
            { field: 'p6_e7_intensity_physical_fy', regex: /^TotalScope1AndScope2EmissionsIntensityInTermOfPhysicalOutput$/i },
            { field: 'p6_l2_is_applicable', regex: /^WhetherTotalScope3EmissionsAndItsIntensityIsApplicableToTheCompany$/i },
            { field: 'p6_l2_scope3_fy', regex: /^TotalScope3Emissions$/i },
            { field: 'p6_l2_turnover_fy', regex: /^TotalScope3EmissionsPerRupeeOfTurnover$/i },

            { field: 'p6_e9_total_generation_fy', regex: /^TotalWasteGenerated$/i },
            { field: 'p6_e9_recycled_fy', regex: /^WasteRecoveredThroughRecycled$/i },
            { field: 'p6_e9_reused_fy', regex: /^WasteRecoveredThroughReUsed$/i },
            { field: 'p6_e9_intensity_physical_fy', regex: /^WasteIntensityInTermOfPhysicalOutput$/i },

            // --- Social & General ---
            { field: 'p3_total_employees', regex: /^TotalNumberOfEmployees$/i },
            { field: 'p3_permanent_employees', regex: /^NumberOfPermanentEmployees$/i },
            { field: 'p8_csr_spent', regex: /^AmountSpentForCSRProjectsUndertaken$/i },

            // --- Additional Waste Details ---
            { field: 'waste_plastic', regex: /^AmountOfPlasticWaste$/i },
            { field: 'waste_e_waste', regex: /^AmountOfEWaste$/i },
            { field: 'waste_hazardous', regex: /^AmountOfHazardousWaste$/i },
            { field: 'waste_other', regex: /^AmountOfOtherWaste$/i },
            { field: 'waste_treatment_recovery', regex: /^AmountOfWasteRecovered$/i },
            { field: 'waste_treatment_disposal', regex: /^AmountOfWasteDisposed$/i },

            // --- EPR ---
            { field: 'epr_applicable', regex: /^WhetherExtendedProducerResponsibilityIsApplicableToTheEntitySActivities$/i },
            { field: 'epr_plan_compliance', regex: /^WhetherTheWasteCollectionPlanIsInLineWithTheExtendedProducerResponsibilityPlanSubmittedToPollutionControlBoards$/i },

            // --- Water Sources ---
            { field: 'water_surface', regex: /(TotalVolumeOfWaterWithdrawalBySource)?SurfaceWater$/i },
            { field: 'water_ground', regex: /(TotalVolumeOfWaterWithdrawalBySource)?Groundwater$/i },
            { field: 'water_third_party', regex: /(TotalVolumeOfWaterWithdrawalBySource)?ThirdPartyWater$/i },

            // --- Air Emissions ---
            { field: 'emissions_ods', regex: /^EmissionsOfOzoneDepletingSubstances$/i },
            { field: 'emissions_pm', regex: /^EmissionsOfParticulateMatterPlus$/i },
            { field: 'emissions_sox', regex: /^EmissionsOfSulfurOxides$/i },
            { field: 'emissions_nox', regex: /^EmissionsOfNitrogenOxides$/i },

            // --- Effluents ---
            { field: 'effluent_volume', regex: /^TotalVolumeOfEffluentDischarge$/i },
            { field: 'effluent_treatment', regex: /^WhetherTheEffluentDischargedIsTreated$/i },

            // --- Assurance ---
            { field: 'assurance_applicable', regex: /^WhetherTheCompanyHasUndertakenAssessmentOrAssuranceOfTheBRSRCore$/i },
            { field: 'assurance_type', regex: /^TypeOfAssessmentOrAssuranceObtain$/i },
            { field: 'assurance_provider', regex: /(^|:)NameOfTheCompanyOrLLPOrFirmOfAssessmentOrAssuranceProvider$/i },

            { field: 'p2_sustainable_sourcing', regex: /(^|:)WhetherTheEntityHasAStrategyForSustainableSourcing$/i },
            { field: 'p4_stakeholder_engagement', regex: /(^|:)WhetherTheEntityHasIdentifiedInternalAndExternalStakeholders$/i },
            { field: 'p5_human_rights_policy', regex: /(^|:)WhetherTheEntityHasAPolicyOnHumanRights$/i },
            { field: 'p7_policy_advocacy', regex: /(^|:)WhetherTheEntityHasAAssociationWithPublicPolicy$/i },
            { field: 'p9_consumer_complaints', regex: /(^|:)TotalNumberOfConsumerComplaints$/i },

            // --- Phase 9: Employee & Diversity Metrics ---
            // Verified from BRSR taxonomy in-capmkt.xsd
            { field: 'p3_total_employees', regex: /(^|:)(NumberOfEmployeesOrWorkersIncludingDifferentlyAbled|TotalNumberOfEmployeesOrWorkersForMembership|TotalNumberOfEmployees)$/i },
            { field: 'p3_permanent_employees', regex: /(^|:)(NumberOfPermanentEmployees|PermanentEmployees)$/i },
            { field: 'p3_total_employees_male', regex: /(^|:)(NumberOfEmployeesOrWorkersIncludingDifferentlyAbled.*MaleMember|MaleEmployees|TotalMaleEmployees|NumberOfMaleEmployee)$/i },
            { field: 'p3_total_employees_female', regex: /(^|:)(NumberOfEmployeesOrWorkersIncludingDifferentlyAbled.*FemaleMember|FemaleEmployees|TotalFemaleEmployees|NumberOfFemaleEmployee)$/i },
            { field: 'p3_female_directors', regex: /(^|:)(NumberOfFemaleBoardOfDirectors|FemaleBoardMembers|NumberOfFemaleDirectors)$/i },
            { field: 'p3_female_directors_pct', regex: /(^|:)(PercentageOfFemaleBoardOfDirectors|FemaleBoardPercentage)$/i },
            { field: 'p3_female_kmp_pct', regex: /(^|:)(PercentageOfFemaleKeyManagementPersonnel|FemaleKeyManagementPercentage)$/i },
            { field: 'p3_employee_turnover_rate', regex: /(^|:)(TurnoverRate|EmployeeTurnoverRate)$/i },
            { field: 'p3_wellbeing_spending', regex: /(^|:)(CostIncurredOnWellBeingMeasures|WellBeingMeasuresCost)$/i },
            { field: 'p3_wellbeing_spending_pct', regex: /(^|:)PercentageOfCostIncurredOnWellBeingMeasuresWithRespectToTotalRevenueOfTheCompany$/i },
            { field: 'p3_differently_abled', regex: /(^|:)NumberOfEmployeesOrWorkersIncludingDifferentlyAbled.*DifferentlyAbledMember$/i },
            { field: 'p3_total_workers', regex: /(^|:)(TotalNumberOfEmployeesOrWorkersForMembership|NumberOfEmployeesOrWorkersArePartOfAssociationsOrUnion)$/i },
            { field: 'p3_total_board_directors', regex: /(^|:)(TotalNumberOfBoardOfDirectors|NumberOfDirectorsOnBoard|BoardSize)$/i },

            // --- Phase 9: Effluent & Water Reuse ---
            { field: 'p6_zld_status', regex: /(^|:)(WhetherTheEntityImplementedAMechanismForZeroLiquidDischarge|ZeroLiquidDischarge)$/i },
            { field: 'p6_water_consumption', regex: /(^|:)TotalVolumeOfWaterConsumption$/i },
            { field: 'p6_water_recycled', regex: /(^|:)TotalVolumeOfWaterRecycled$/i },
            { field: 'p6_water_reused', regex: /(^|:)TotalVolumeOfWaterReused$/i },
            { field: 'p6_effluent_discharged', regex: /(^|:)TotalWaterDischargedInKilolitres$/i },

            // --- Phase 10: Training Data (verified from in-capmkt.xsd) ---
            { field: 'p3_training_skill_total', regex: /(^|:)(TotalNumberOfEmployeesOrWorkersForPerformanceAndCareerDevelopment|NumberOfEmployeesOrWorkerForPerformanceAndCareerDevelopment|SkillUpgradation)$/i },
            { field: 'p3_training_health_safety_total', regex: /(^|:)(NumberOfEmployeesCoveredAsPercentageOfTotalEmployees|HealthAndSafetyTraining)$/i },
            { field: 'p3_training_human_rights', regex: /(^|:)(TotalNumberOfEmployeesOrWorkersForTrainingOnHumanRightsIssues|NumberOfEmployeesOrWorkersCoveredForProvidedTrainingOnHumanRightsIssues)$/i },
            { field: 'p3_training_coverage_pct', regex: /(^|:)(NumberOfEmployeesCoveredAsPercentageOfTotalEmployees|NumberOfEmployeesCoveredAsPercentageOfTotalWorker)$/i },

            // --- Phase 10: Complaints Data (verified from in-capmkt.xsd) ---
            // Note: WorkingConditions and HealthSafety complaints use dimensional structure with ComplaintsAxis
            { field: 'p3_complaints_working_conditions_filed', regex: /(^|:)NumberOfComplaintsFiledDuringTheYear.*WorkingConditions/i },
            { field: 'p3_complaints_working_conditions_pending', regex: /(^|:)NumberOfComplaintsPendingResolutionAtTheEndOfYear.*WorkingConditions/i },
            { field: 'p3_complaints_health_safety_filed', regex: /(^|:)NumberOfComplaintsFiledDuringTheYear.*HealthSafety/i },
            { field: 'p3_complaints_health_safety_pending', regex: /(^|:)NumberOfComplaintsPendingResolutionAtTheEndOfYear.*HealthSafety/i },
            { field: 'p5_complaints_sexual_harassment_filed', regex: /(^|:)TotalComplaintsReportedUnderSexualHarassmentOfWomenAtWorkplace$/i },
            { field: 'p5_complaints_sexual_harassment_pending', regex: /(^|:)(SexualHarassmentComplaintsPending|ComplaintsPendingAtEndOfYear.*SexualHarassment)$/i },
            { field: 'p1_complaints_conflict_directors', regex: /(^|:)NumberOfComplaintsReceivedInRelationToIssuesOfConflictOfInterestOfTheDirectors$/i },
            { field: 'p1_complaints_conflict_kmp', regex: /(^|:)NumberOfComplaintsReceivedInRelationToIssuesOfConflictOfInterestOfTheKMPs$/i },
            { field: 'p4_stakeholder_complaints_filed', regex: /(^|:)NumberOfComplaintsFiledFromStakeHolderGroupDuringTheYear$/i },
            { field: 'p4_stakeholder_complaints_pending', regex: /(^|:)NumberOfComplaintsPendingFromStakeHolderGroupResolutionAtTheEndOfYear$/i },
            { field: 'p9_consumer_complaints_received', regex: /(^|:)ConsumerComplaintsReceivedDuringTheYear$/i },
            { field: 'p9_consumer_complaints_pending', regex: /(^|:)ConsumerComplaintsPendingResolutionAtEndOfYear$/i },

            // --- Phase 10: Policy Compliance (verified from in-capmkt.xsd) ---
            { field: 'policy_ethics', regex: /(^|:)(WhetherTheEntityHasPolicy.*Ethics|EthicsPolicy)$/i },
            { field: 'policy_human_rights', regex: /(^|:)(WhetherTheEntityHasAPolicyOnHumanRights|HumanRightsPolicy)$/i },
            { field: 'policy_equal_opportunity', regex: /(^|:)WhetherTheEntityHaveAnEqualOpportunityPolicyAsPerTheRightsOfPersonsWithDisabilitiesAct2016$/i },
            { field: 'policy_cyber_security', regex: /(^|:)WhetherTheEntityHaveAFrameworkOrPolicyOnCyberSecurityAndRisksRelatedToDataPrivacy$/i },
            { field: 'policy_translated_procedures', regex: /(^|:)WhetherTheEntityHasTranslatedThePolicyIntoProcedures$/i },
            { field: 'policy_environment', regex: /(^|:)(WhetherTheEntityCompliantWithTheApplicableEnvironmentalLaw|EnvironmentPolicy)$/i },
            { field: 'policy_sustainability', regex: /(^|:)(WhetherTheEntityHaveASpecifiedCommitteeOfTheBoardOrDirectorResponsibleForDecisionMakingOnSustainabilityRelatedIssues|SustainabilityCommittee)$/i },

            // --- Phase 11: Energy Management (P6) ---
            { field: 'p6_energy_total', regex: /(^|:)TotalEnergyConsumption$/i },
            { field: 'p6_energy_renewable', regex: /(^|:)TotalEnergyConsumedFromRenewableSources$/i },
            { field: 'p6_energy_non_renewable', regex: /(^|:)TotalEnergyConsumedFromNonRenewableSources$/i },
            { field: 'p6_energy_renewable_electricity', regex: /(^|:)TotalElectricityConsumptionFromRenewableSources$/i },
            { field: 'p6_energy_non_renewable_electricity', regex: /(^|:)TotalElectricityConsumptionFromNonRenewableSources$/i },
            { field: 'p6_energy_renewable_fuel', regex: /(^|:)TotalFuelConsumptionFromRenewableSources$/i },
            { field: 'p6_energy_non_renewable_fuel', regex: /(^|:)TotalFuelConsumptionFromNonRenewableSources$/i },
            { field: 'p6_energy_intensity_rupee', regex: /(^|:)EnergyIntensityPerRupeeOfTurnover$/i },
            { field: 'p6_energy_intensity_custom', regex: /(^|:)EnergyIntensityTheRelevantMetricMayBeSelectedByTheEntity$/i },

            // --- Phase 11: GHG Emissions (P6) ---
            { field: 'p6_ghg_scope1', regex: /(^|:)TotalScope1Emissions$/i },
            { field: 'p6_ghg_scope2', regex: /(^|:)TotalScope2Emissions$/i },
            { field: 'p6_ghg_scope3', regex: /(^|:)TotalScope3Emissions$/i },
            { field: 'p6_ghg_scope1_scope2_intensity_rupee', regex: /(^|:)TotalScope1AndScope2EmissionsIntensityPerRupeeOfTurnover$/i },
            { field: 'p6_ghg_scope1_scope2_intensity', regex: /(^|:)TotalScope1AndScope2EmissionIntensity$/i },
            { field: 'p6_ghg_scope3_intensity_rupee', regex: /(^|:)TotalScope3EmissionsPerRupeeOfTurnover$/i },
            { field: 'p6_ghg_scope3_intensity', regex: /(^|:)TotalScope3EmissionIntensityTheRelevantMetricMayBeSelectedByTheEntity$/i },
            { field: 'p6_ghg_reduction_project', regex: /(^|:)DoesTheEntityHaveAnyProjectRelatedToReducingGreenHouseGasEmission$/i },

            // --- Phase 11: Waste Management (P6) ---
            { field: 'p6_waste_total', regex: /(^|:)TotalWasteGenerated$/i },
            { field: 'p6_waste_plastic', regex: /(^|:)PlasticWaste$/i },
            { field: 'p6_waste_ewaste', regex: /(^|:)EWaste$/i },
            { field: 'p6_waste_biomedical', regex: /(^|:)BioMedicalWaste$/i },
            { field: 'p6_waste_construction', regex: /(^|:)ConstructionAndDemolitionWaste$/i },
            { field: 'p6_waste_battery', regex: /(^|:)BatteryWaste$/i },
            { field: 'p6_waste_radioactive', regex: /(^|:)RadioactiveWaste$/i },
            { field: 'p6_waste_hazardous_other', regex: /(^|:)OtherHazardousWaste$/i },
            { field: 'p6_waste_non_hazardous_other', regex: /(^|:)OtherNonHazardousWasteGenerated$/i },
            { field: 'p6_waste_recycled', regex: /(^|:)WasteRecoveredThroughRecycled$/i },
            { field: 'p6_waste_reused', regex: /(^|:)WasteRecoveredThroughReUsed$/i },
            { field: 'p6_waste_recovered_other', regex: /(^|:)WasteRecoveredThroughOtherRecoveryOperations$/i },
            { field: 'p6_waste_total_recovered', regex: /(^|:)TotalWasteRecovered$/i },
            { field: 'p6_waste_incinerated', regex: /(^|:)WasteDisposedByIncineration$/i },
            { field: 'p6_waste_landfill', regex: /(^|:)WasteDisposedByLandfilling$/i },
            { field: 'p6_waste_disposed_other', regex: /(^|:)WasteDisposedByOtherDisposalOperations$/i },
            { field: 'p6_waste_total_disposed', regex: /(^|:)TotalWasteDisposed$/i },
            { field: 'p6_waste_intensity_rupee', regex: /(^|:)WasteIntensityPerRupeeOfTurnover$/i },
            { field: 'p6_waste_intensity_custom', regex: /(^|:)WasteIntensityTheRelevantMetricMayBeSelectedByTheEntityPerArea$/i },

            // --- Phase 11: Enhanced Social Metrics (P3, P5) ---
            { field: 'p3_median_salary_male_employees', regex: /(^|:)MedianRemunerationOrSalaryOrWagesOfMaleEmployees$/i },
            { field: 'p3_median_salary_female_employees', regex: /(^|:)MedianRemunerationOrSalaryOrWagesOfFemaleEmployees$/i },
            { field: 'p3_median_salary_male_workers', regex: /(^|:)MedianRemunerationOrSalaryOrWagesOfMaleWorkers$/i },
            { field: 'p3_median_salary_female_workers', regex: /(^|:)MedianRemunerationOrSalaryOrWagesOfFemaleWorkers$/i },
            { field: 'p3_life_insurance_coverage', regex: /(^|:)WhetherTheEntityExtendAnyLifeInsuranceOrAnyCompensatoryPackageInTheEventOfDeathOfEmployees$/i },
            { field: 'p3_transition_assistance', regex: /(^|:)WhetherTheEntityProvideTransitionAssistanceProgramsToFacilitateContinuedEmployabilityAndTheManagementOfCareerEndingsResultingFromRetirementOrTerminationOfEmployment$/i },
            { field: 'p3_employees_in_associations', regex: /(^|:)(NumberOfEmployeesOrWorkersArePartOfAssociationsOrUnion|PercentageOfEmployeesAndWorkersArePartOfAssociationsOrUnion)$/i },
            { field: 'p5_child_labor_instances', regex: /(^|:)NumberOfInstancesOfChildLabourIdentified$/i },
            { field: 'p5_forced_labor_instances', regex: /(^|:)NumberOfInstancesOfForcedCompulsoryLabourIdentified$/i },
            { field: 'p5_sexual_harassment_awareness', regex: /(^|:)WhetherAnyMechanismHasBeenPutInPlaceForPeriodicalReviewForTheProcessOfAwarenessGenerationAndSettlementOfCasesOfSexualHarassment$/i },

            // --- Phase 11: Community Engagement (P8) ---
            { field: 'p8_csr_spending', regex: /(^|:)AmountSpentTowardsCorporateSocialResponsibility$/i },
            { field: 'p8_csr_percentage', regex: /(^|:)PercentageOfAverageNetProfitOfTheCompanyAsPerSection135$/i },
            { field: 'p8_csr_projects_aspirational', regex: /(^|:)NumberOfProjectsUndertakenInAspirationalDistricts$/i },
            { field: 'p8_csr_direct_implementation', regex: /(^|:)AmountSpentInDirectImplementation$/i },
            { field: 'p8_csr_through_foundation', regex: /(^|:)AmountSpentThroughImplementingAgencyFoundationOrSociety$/i },

            // --- Phase 11: Board & Governance (P1) ---
            { field: 'p1_independent_directors', regex: /(^|:)NumberOfIndependentBoardOfDirectors$/i },
            { field: 'p1_independent_directors_pct', regex: /(^|:)PercentageOfIndependentBoardOfDirectors$/i },
            { field: 'p1_board_meetings', regex: /(^|:)NumberOfBoardMeetings$/i },
            { field: 'p1_anti_corruption_policy', regex: /(^|:)WhetherTheEntityHaveAnAntiCorruptionOrAnAntibriberPolicy$/i },
            { field: 'p1_whistleblower_policy', regex: /(^|:)WhetherTheEntityHaveAFrameworkOrMechanismForIdentifyingReportingAndEscalatingSuchIssues$/i },
            { field: 'p1_supplier_code_of_conduct', regex: /(^|:)WhetherTheEntityHaveSupplierCodeOfConduct$/i },
            { field: 'p1_conflict_process', regex: /(^|:)WhetherTheEntityHaveProcessesInPlaceToAvoidOrManageConflictOfInterestsInvolvingMembersOfTheBoard$/i },

            // --- Phase 11: Financial Transparency (P1) ---
            { field: 'p1_revenue', regex: /(^|:)(Revenue|TotalIncome)$/i },
            { field: 'p1_net_profit', regex: /(^|:)(ProfitOrLossAfterTax|NetProfit)$/i },
            { field: 'p1_income_tax', regex: /(^|:)IncomeTaxExpense$/i },

            // --- Phase 11: Supply Chain & Sourcing (P2) ---
            { field: 'p2_sustainable_sourcing_pct', regex: /(^|:)PercentageOfInputsWereSourcedSustainably$/i },
            { field: 'p2_sustainable_sourcing_procedures', regex: /(^|:)WhetherTheEntityHaveProceduresInPlaceForSustainableSourcing$/i },
            { field: 'p2_value_chain_partners_assessed', regex: /(^|:)PercentageOfValueChainPartnersAssessed$/i },

            // --- Phase 11: Product & Customer (P9) ---
            { field: 'p9_product_recalls', regex: /(^|:)NumberOfInstancesOfProductRecallsOnAccountOfSafetyConcerns$/i },
            { field: 'p9_cyber_security_framework', regex: /(^|:)WhetherTheEntityHaveAFrameworkOrPolicyOnCyberSecurityAndRisksRelatedToDataPrivacy$/i },
            { field: 'p9_data_breaches', regex: /(^|:)NumberOfDataBreaches$/i },
            { field: 'p9_consumer_survey_conducted', regex: /(^|:)WhetherTheEntityCarriedOutAnyConsumerSurveyOrConsumerSatisfactionTrends$/i },
        ];

    }

    extractCompanyNameFromFilename(filename) {
        if (!filename) return null;

        try {
            // Remove .xml extension if present
            const cleanName = filename.replace(/\.xml$/i, '').replace(/\.XML$/i, '');

            // Remove date suffixes if present (e.g., "_05-Nov-2024")
            const nameWithoutDate = cleanName.split('_').slice(0, 2).join('_');

            // Split by underscore and take the first part as company name
            const parts = nameWithoutDate.split('_');

            // Join all parts except the last 2 (which are dates)
            const companyName = parts.slice(0, parts.length - 2).join('_');

            return companyName || cleanName;
        } catch (error) {
            console.error('Error extracting company name from filename:', error);
            return null;
        }
    }

    extractSectorFromCIN(cin) {
        if (!cin || cin === 'N/A') return null;

        try {
            // Extract the 5-digit NIC code from CIN (industry code)
            // CIN format: L12345MH2023PTC123456 where 12345 is the NIC code
            const nicMatch = cin.match(/\d{5}/);
            if (!nicMatch) return null;

            const nicCode = nicMatch[0];

            // Load NIC database from file
            const fs = require('fs');
            const path = require('path');

            try {
                const nicDbPath = path.join(__dirname, '../../nic_database_full.json');
                if (fs.existsSync(nicDbPath)) {
                    const nicDb = JSON.parse(fs.readFileSync(nicDbPath, 'utf8'));

                    // Search through sections, divisions, groups, classes, and subclasses
                    for (const section of nicDb.sections) {
                        for (const division of section.divisions || []) {
                            for (const group of division.groups || []) {
                                for (const cls of group.classes || []) {
                                    for (const subclass of cls.subclasses || []) {
                                        if (subclass.id === nicCode) {
                                            return {
                                                code: nicCode,
                                                description: subclass.description,
                                                section: section.id,
                                                sectionDescription: section.description,
                                                division: division.id,
                                                divisionDescription: division.description,
                                                group: group.id,
                                                groupDescription: group.description,
                                                class: cls.id,
                                                classDescription: cls.description
                                            };
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (nicDbError) {
                console.warn(`[NIC Database] Could not load NIC database: ${nicDbError.message}`);
            }

            // Fallback: Use a basic mapping for common NIC codes (returns object structure)
            const getSectorInfo = (code, desc, section = 'D') => ({
                code: code,
                description: desc,
                section: section,
                sectionDescription: this.getSectionDescription(section)
            });

            const nicMapping = {
                // Agriculture (Section A)
                '01110': getSectorInfo('01110', 'Growing of cereals & oilseeds', 'A'),
                '01210': getSectorInfo('01210', 'Growing of vegetables & melons', 'A'),
                '01300': getSectorInfo('01300', 'Plant propagation', 'A'),

                // Mining (Section B)
                '07100': getSectorInfo('07100', 'Mining of iron ores', 'B'),
                '08100': getSectorInfo('08100', 'Quarrying of stone & sand', 'B'),
                '08910': getSectorInfo('08910', 'Mining of chemical & fertilizer minerals', 'B'),
                '09100': getSectorInfo('09100', 'Mining of metallic minerals', 'B'),

                // Manufacturing (Section D) - Most common
                '10100': getSectorInfo('10100', 'Processing & preserving of meat', 'D'),
                '10200': getSectorInfo('10200', 'Processing & preserving of fish', 'D'),
                '10310': getSectorInfo('10310', 'Processing & preserving of potatoes', 'D'),
                '10410': getSectorInfo('10410', 'Manufacture of vegetable oils', 'D'),
                '10510': getSectorInfo('10510', 'Operation of dairies', 'D'),
                '10610': getSectorInfo('10610', 'Grain milling', 'D'),
                '10710': getSectorInfo('10710', 'Bakery products', 'D'),
                '10720': getSectorInfo('10720', 'Sugar manufacturing', 'D'),
                '10730': getSectorInfo('10730', 'Chocolate & confectionery', 'D'),
                '10810': getSectorInfo('10810', 'Processing of tea & coffee', 'D'),
                '11010': getSectorInfo('11010', 'Distilling & blending of spirits', 'D'),
                '11020': getSectorInfo('11020', 'Wine manufacturing', 'D'),
                '11030': getSectorInfo('11030', 'Malt liquors & malt', 'D'),
                '11040': getSectorInfo('11040', 'Soft drinks & mineral water', 'D'),
                '12010': getSectorInfo('12010', 'Tobacco products', 'D'),
                '13110': getSectorInfo('13110', 'Preparation & spinning of textile fibers', 'D'),
                '13120': getSectorInfo('13120', 'Weaving of textiles', 'D'),
                '13130': getSectorInfo('13130', 'Finishing of textiles', 'D'),
                '13200': getSectorInfo('13200', 'Manufacture of carpets & rugs', 'D'),
                '13300': getSectorInfo('13300', 'Knitted & crocheted fabrics', 'D'),
                '13910': getSectorInfo('13910', 'Manufacture of textiles', 'D'),
                '13920': getSectorInfo('13920', 'Manufacture of technical textiles', 'D'),
                '13930': getSectorInfo('13930', 'Manufacture of made-up textile articles', 'D'),
                '14100': getSectorInfo('14100', 'Manufacture of wearing apparel', 'D'),
                '14200': getSectorInfo('14200', 'Manufacture of fur articles', 'D'),
                '14300': getSectorInfo('14300', 'Manufacture of knitted apparel', 'D'),
                '15110': getSectorInfo('15110', 'Tanning & dressing of leather', 'D'),
                '15120': getSectorInfo('15120', 'Luggage & handbags', 'D'),
                '15200': getSectorInfo('15200', 'Footwear manufacturing', 'D'),
                '16100': getSectorInfo('16100', 'Sawmilling & wood planning', 'D'),
                '16200': getSectorInfo('16200', 'Manufacture of veneer & plywood', 'D'),
                '16210': getSectorInfo('16210', 'Manufacture of particle board', 'D'),
                '16230': getSectorInfo('16230', 'Manufacture of wooden containers', 'D'),
                '16290': getSectorInfo('16290', 'Other wood products', 'D'),
                '17010': getSectorInfo('17010', 'Manufacture of pulp', 'D'),
                '17020': getSectorInfo('17020', 'Manufacture of paper & paperboard', 'D'),
                '17090': getSectorInfo('17090', 'Manufacture of cardboard & containers', 'D'),
                '18110': getSectorInfo('18110', 'Printing & newspaper', 'D'),
                '18120': getSectorInfo('18120', 'Other printing activities', 'D'),
                '18130': getSectorInfo('18130', 'Manufacture of ink & toner', 'D'),
                '19110': getSectorInfo('19110', 'Coke oven products', 'D'),
                '19200': getSectorInfo('19200', 'Petroleum refining', 'D'),
                '19300': getSectorInfo('19300', 'Nuclear fuel processing', 'D'),
                '20110': getSectorInfo('20110', 'Manufacture of basic chemicals', 'D'),
                '20120': getSectorInfo('20120', 'Manufacture of fertilizers', 'D'),
                '20130': getSectorInfo('20130', 'Manufacture of plastics', 'D'),
                '20140': getSectorInfo('20140', 'Manufacture of synthetic rubber', 'D'),
                '20150': getSectorInfo('20150', 'Manufacture of agro-chemicals', 'D'),
                '20160': getSectorInfo('20160', 'Manufacture of paints & coatings', 'D'),
                '20170': getSectorInfo('20170', 'Pharmaceuticals', 'D'),
                '20180': getSectorInfo('20180', 'Manufacture of soap & detergents', 'D'),
                '20190': getSectorInfo('20190', 'Manufacture of explosives', 'D'),
                '20200': getSectorInfo('20200', 'Manufacture of pesticides', 'D'),
                '20210': getSectorInfo('20210', 'Manufacture of perfumes & toiletries', 'D'),
                '20220': getSectorInfo('20220', 'Manufacture of essential oils', 'D'),
                '20230': getSectorInfo('20230', 'Manufacture of synthetic rubber', 'D'),
                '20300': getSectorInfo('20300', 'Manufacture of man-made fibers', 'D'),
                '20410': getSectorInfo('20410', 'Manufacture of rubber tires', 'D'),
                '20420': getSectorInfo('20420', 'Manufacture of rubber products', 'D'),
                '20510': getSectorInfo('20510', 'Manufacture of plastics products', 'D'),
                '20590': getSectorInfo('20590', 'Manufacture of other plastic products', 'D'),
                '23110': getSectorInfo('23110', 'Manufacture of glass & glass products', 'D'),
                '23910': getSectorInfo('23910', 'Manufacture of ceramic products', 'D'),
                '23920': getSectorInfo('23920', 'Manufacture of ceramic tiles', 'D'),
                '23930': getSectorInfo('23930', 'Manufacture of cement', 'D'),
                '23940': getSectorInfo('23940', 'Manufacture of lime & plaster', 'D'),
                '23950': getSectorInfo('23950', 'Manufacture of concrete & cement products', 'D'),
                '23960': getSectorInfo('23960', 'Cutting & shaping of stone', 'D'),
                '23990': getSectorInfo('23990', 'Other non-metallic mineral products', 'D'),
                '24100': getSectorInfo('24100', 'Manufacture of basic iron & steel', 'D'),
                '24200': getSectorInfo('24200', 'Manufacture of basic precious metals', 'D'),
                '24310': getSectorInfo('24310', 'Casting of iron & steel', 'D'),
                '24320': getSectorInfo('24320', 'Casting of non-ferrous metals', 'D'),
                '24410': getSectorInfo('24410', 'Manufacture of structural steel products', 'D'),
                '24420': getSectorInfo('24420', 'Manufacture of tanks & containers', 'D'),
                '24430': getSectorInfo('24430', 'Manufacture of steam generators', 'D'),
                '24490': getSectorInfo('24490', 'Other fabricated metal products', 'D'),
                '25110': getSectorInfo('25110', 'Manufacture of metal structures', 'D'),
                '25120': getSectorInfo('25120', 'Manufacture of doors & windows', 'D'),
                '25130': getSectorInfo('25130', 'Manufacture of metal tanks', 'D'),
                '25200': getSectorInfo('25200', 'Manufacture of weapons & ammunition', 'D'),
                '25910': getSectorInfo('25910', 'Forging & pressing', 'D'),
                '25920': getSectorInfo('25920', 'General mechanical engineering', 'D'),
                '25930': getSectorInfo('25930', 'Manufacture of bearings', 'D'),
                '25990': getSectorInfo('25990', 'Other fabricated metal products', 'D'),
                '26110': getSectorInfo('26110', 'Manufacture of electronic components', 'D'),
                '26120': getSectorInfo('26120', 'Manufacture of printed circuits', 'D'),
                '26200': getSectorInfo('26200', 'Manufacture of computers', 'D'),
                '26300': getSectorInfo('26300', 'Manufacture of communication equipment', 'D'),
                '26400': getSectorInfo('26400', 'Manufacture of consumer electronics', 'D'),
                '26510': getSectorInfo('26510', 'Manufacture of instruments', 'D'),
                '26520': getSectorInfo('26520', 'Manufacture of watches & clocks', 'D'),
                '27100': getSectorInfo('27100', 'Manufacture of electric motors', 'D'),
                '27110': getSectorInfo('27110', 'Manufacture of electricity distribution equipment', 'D'),
                '27120': getSectorInfo('27120', 'Manufacture of batteries & accumulators', 'D'),
                '27200': getSectorInfo('27200', 'Manufacture of lighting equipment', 'D'),
                '27310': getSectorInfo('27310', 'Manufacture of fiber optic cables', 'D'),
                '27320': getSectorInfo('27320', 'Manufacture of electronic wires', 'D'),
                '27330': getSectorInfo('27330', 'Manufacture of wiring devices', 'D'),
                '27400': getSectorInfo('27400', 'Manufacture of domestic appliances', 'D'),
                '27500': getSectorInfo('27500', 'Manufacture of electric lamps', 'D'),
                '27900': getSectorInfo('27900', 'Other electrical equipment', 'D'),
                '28110': getSectorInfo('28110', 'Manufacture of engines & turbines', 'D'),
                '28120': getSectorInfo('28120', 'Manufacture of pumps & compressors', 'D'),
                '28130': getSectorInfo('28130', 'Manufacture of bearings & gears', 'D'),
                '28140': getSectorInfo('28140', 'Manufacture of ovens & furnaces', 'D'),
                '28150': getSectorInfo('28150', 'Manufacture of lifting equipment', 'D'),
                '28210': getSectorInfo('28210', 'Manufacture of agricultural machinery', 'D'),
                '28220': getSectorInfo('28220', 'Manufacture of machine tools', 'D'),
                '28230': getSectorInfo('28230', 'Manufacture of metallurgical machinery', 'D'),
                '28240': getSectorInfo('28240', 'Manufacture of mining equipment', 'D'),
                '28250': getSectorInfo('28250', 'Manufacture of food processing machinery', 'D'),
                '28290': getSectorInfo('28290', 'Other special purpose machinery', 'D'),
                '28910': getSectorInfo('28910', 'Manufacture of domestic appliances', 'D'),
                '28920': getSectorInfo('28920', 'Manufacture of non-domestic appliances', 'D'),
                '28930': getSectorInfo('28930', 'Manufacture of vehicle parts', 'D'),
                '28940': getSectorInfo('28940', 'Manufacture of electrical equipment', 'D'),
                '28990': getSectorInfo('28990', 'Other general purpose machinery', 'D'),
                '29100': getSectorInfo('29100', 'Manufacture of motor vehicles', 'D'),
                '29200': getSectorInfo('29200', 'Manufacture of vehicle bodies', 'D'),
                '29310': getSectorInfo('29310', 'Manufacture of electrical parts for vehicles', 'D'),
                '29320': getSectorInfo('29320', 'Manufacture of other vehicle parts', 'D'),
                '30110': getSectorInfo('30110', 'Shipbuilding', 'D'),
                '30120': getSectorInfo('30120', 'Manufacture of pleasure boats', 'D'),
                '30200': getSectorInfo('30200', 'Manufacture of railway locomotives', 'D'),
                '30300': getSectorInfo('30300', 'Manufacture of aircraft', 'D'),
                '30400': getSectorInfo('30400', 'Manufacture of military vehicles', 'D'),
                '30910': getSectorInfo('30910', 'Manufacture of motorcycles', 'D'),
                '30920': getSectorInfo('30920', 'Manufacture of bicycles', 'D'),
                '30990': getSectorInfo('30990', 'Other transport equipment', 'D'),
                '31000': getSectorInfo('31000', 'Manufacture of furniture', 'D'),
                '32100': getSectorInfo('32100', 'Manufacture of jewelry', 'D'),
                '32200': getSectorInfo('32200', 'Manufacture of musical instruments', 'D'),
                '32300': getSectorInfo('32300', 'Manufacture of sports equipment', 'D'),
                '32400': getSectorInfo('32400', 'Manufacture of games & toys', 'D'),
                '32500': getSectorInfo('32500', 'Manufacture of medical & surgical equipment', 'D'),
                '32900': getSectorInfo('32900', 'Other manufacturing', 'D'),

                // Electricity (Section E)
                '35100': getSectorInfo('35100', 'Electric power generation', 'E'),
                '35200': getSectorInfo('35200', 'Electricity distribution', 'E'),
                '35300': getSectorInfo('35300', 'Steam & hot water supply', 'E'),

                // Water (Section E)
                '36000': getSectorInfo('36000', 'Water collection & distribution', 'E'),

                // Construction (Section F)
                '41100': getSectorInfo('41100', 'Real estate development', 'F'),
                '41200': getSectorInfo('41200', 'Construction of residential buildings', 'F'),
                '42100': getSectorInfo('42100', 'Construction of highways & roads', 'F'),
                '42200': getSectorInfo('42200', 'Construction of utility projects', 'F'),
                '42910': getSectorInfo('42910', 'Roofing activities', 'F'),
                '42990': getSectorInfo('42990', 'Other construction', 'F'),

                // Wholesale/Retail (Section G)
                '45100': getSectorInfo('45100', 'Sale of motor vehicles', 'G'),
                '45200': getSectorInfo('45200', 'Maintenance of motor vehicles', 'G'),
                '45310': getSectorInfo('45310', 'Wholesale of automotive parts', 'G'),
                '45320': getSectorInfo('45320', 'Retail sale of automotive fuel', 'G'),
                '45400': getSectorInfo('45400', 'Retail sale of ICT equipment', 'G'),
                '46110': getSectorInfo('46110', 'Wholesale of agricultural raw materials', 'G'),
                '46210': getSectorInfo('46210', 'Wholesale of food & beverages', 'G'),
                '46310': getSectorInfo('46310', 'Wholesale of household goods', 'G'),
                '46410': getSectorInfo('46410', 'Wholesale of textiles', 'G'),
                '46420': getSectorInfo('46420', 'Wholesale of clothing', 'G'),
                '46430': getSectorInfo('46430', 'Wholesale of footwear', 'G'),
                '46490': getSectorInfo('46490', 'Wholesale of other household goods', 'G'),
                '46510': getSectorInfo('46510', 'Wholesale of computers', 'G'),
                '46520': getSectorInfo('46520', 'Wholesale of electronic equipment', 'G'),
                '46590': getSectorInfo('46590', 'Other wholesale', 'G'),
                '46610': getSectorInfo('46610', 'Wholesale of agricultural machinery', 'G'),
                '46620': getSectorInfo('46620', 'Wholesale of construction materials', 'G'),
                '46630': getSectorInfo('46630', 'Wholesale of hardware', 'G'),
                '46690': getSectorInfo('46690', 'Other specialized wholesale', 'G'),
                '46900': getSectorInfo('46900', 'Non-specialized wholesale', 'G'),
                '47110': getSectorInfo('47110', 'Retail sale in non-specialized stores', 'G'),
                '47190': getSectorInfo('47190', 'Other retail sale in non-specialized stores', 'G'),
                '47210': getSectorInfo('47210', 'Retail sale of food & beverages', 'G'),
                '47220': getSectorInfo('47220', 'Retail sale of tobacco', 'G'),
                '47300': getSectorInfo('47300', 'Retail sale of automotive fuel', 'G'),
                '47410': getSectorInfo('47410', 'Retail sale of computers', 'G'),
                '47420': getSectorInfo('47420', 'Retail sale of telecom equipment', 'G'),
                '47430': getSectorInfo('47430', 'Retail sale of audio & video equipment', 'G'),
                '47490': getSectorInfo('47490', 'Retail sale of other household goods', 'G'),
                '47510': getSectorInfo('47510', 'Retail sale of textiles', 'G'),
                '47520': getSectorInfo('47520', 'Retail sale of hardware', 'G'),
                '47530': getSectorInfo('47530', 'Retail sale of carpets', 'G'),
                '47590': getSectorInfo('47590', 'Retail sale of other goods', 'G'),
                '47610': getSectorInfo('47610', 'Retail sale of books', 'G'),
                '47620': getSectorInfo('47620', 'Retail sale of newspapers', 'G'),
                '47630': getSectorInfo('47630', 'Retail sale of music & video', 'G'),
                '47710': getSectorInfo('47710', 'Retail sale of clothing', 'G'),
                '47720': getSectorInfo('47720', 'Retail sale of footwear', 'G'),
                '47730': getSectorInfo('47730', 'Retail sale of cosmetics', 'G'),
                '47740': getSectorInfo('47740', 'Retail sale of medical goods', 'G'),
                '47750': getSectorInfo('47750', 'Retail sale of pharmaceuticals', 'G'),
                '47760': getSectorInfo('47760', 'Retail sale of flowers', 'G'),
                '47770': getSectorInfo('47770', 'Retail sale of watches & jewelry', 'G'),
                '47780': getSectorInfo('47780', 'Retail sale of other goods', 'G'),
                '47910': getSectorInfo('47910', 'Retail sale via mail order', 'G'),
                '47990': getSectorInfo('47990', 'Other retail sale', 'G'),

                // Transport (Section H)
                '49100': getSectorInfo('49100', 'Transport via railways', 'H'),
                '49210': getSectorInfo('49210', 'Urban & suburban passenger rail', 'H'),
                '49220': getSectorInfo('49220', 'Other passenger land transport', 'H'),
                '49230': getSectorInfo('49230', 'Freight rail transport', 'H'),
                '49310': getSectorInfo('49310', 'Bus & coach transport', 'H'),
                '49320': getSectorInfo('49320', 'Taxi operation', 'H'),
                '49410': getSectorInfo('49410', 'Freight transport by road', 'H'),
                '49420': getSectorInfo('49420', 'Removal services', 'H'),
                '49500': getSectorInfo('49500', 'Transport via pipelines', 'H'),
                '50100': getSectorInfo('50100', 'Sea & coastal passenger transport', 'H'),
                '50200': getSectorInfo('50200', 'Sea & coastal freight transport', 'H'),
                '50300': getSectorInfo('50300', 'Inland passenger water transport', 'H'),
                '50400': getSectorInfo('50400', 'Inland freight water transport', 'H'),
                '51110': getSectorInfo('51110', 'Passenger air transport', 'H'),
                '51120': getSectorInfo('51120', 'Freight air transport', 'H'),
                '51210': getSectorInfo('51210', 'Space transportation', 'H'),
                '51220': getSectorInfo('51220', 'Airport operations', 'H'),
                '52100': getSectorInfo('52100', 'Warehousing & storage', 'H'),
                '52210': getSectorInfo('52210', 'Service activities incidental to water transportation', 'H'),
                '52220': getSectorInfo('52220', 'Service activities incidental to air transportation', 'H'),
                '52230': getSectorInfo('52230', 'Service activities incidental to land transportation', 'H'),
                '52240': getSectorInfo('52240', 'Cargo handling', 'H'),
                '52290': getSectorInfo('52290', 'Other transportation support', 'H'),

                // Accommodation & Food (Section I)
                '55100': getSectorInfo('55100', 'Hotels & similar accommodation', 'I'),
                '55200': getSectorInfo('55200', 'Holiday & other accommodation', 'I'),
                '55300': getSectorInfo('55300', 'Camping grounds', 'I'),
                '55900': getSectorInfo('55900', 'Other accommodation', 'I'),
                '56100': getSectorInfo('56100', 'Restaurants & mobile food service', 'I'),
                '56210': getSectorInfo('56210', 'Event catering', 'I'),
                '56290': getSectorInfo('56290', 'Other food service', 'I'),
                '56300': getSectorInfo('56300', 'Beverage serving', 'I'),

                // Information & Communication (Section J)
                '58110': getSectorInfo('58110', 'Book publishing', 'J'),
                '58120': getSectorInfo('58120', 'Software publishing', 'J'),
                '58130': getSectorInfo('58130', 'Newspaper publishing', 'J'),
                '58190': getSectorInfo('58190', 'Other publishing', 'J'),
                '59110': getSectorInfo('59110', 'Motion picture production', 'J'),
                '59120': getSectorInfo('59120', 'Motion picture distribution', 'J'),
                '59130': getSectorInfo('59130', 'Motion picture exhibition', 'J'),
                '59200': getSectorInfo('59200', 'Video production', 'J'),
                '60100': getSectorInfo('60100', 'Radio broadcasting', 'J'),
                '60200': getSectorInfo('60200', 'Television programming', 'J'),
                '61100': getSectorInfo('61100', 'Wired telecommunications', 'J'),
                '61200': getSectorInfo('61200', 'Wireless telecommunications', 'J'),
                '61300': getSectorInfo('61300', 'Satellite telecommunications', 'J'),
                '61910': getSectorInfo('61910', 'Satellite communications', 'J'),
                '61990': getSectorInfo('61990', 'Other telecommunications', 'J'),
                '62010': getSectorInfo('62010', 'Computer programming', 'J'),
                '62020': getSectorInfo('62020', 'Computer consultancy', 'J'),
                '62030': getSectorInfo('62030', 'Computer facilities management', 'J'),
                '62090': getSectorInfo('62090', 'Other information technology', 'J'),
                '63110': getSectorInfo('63110', 'Data processing', 'J'),
                '63120': getSectorInfo('63120', 'Web portals', 'J'),
                '63910': getSectorInfo('63910', 'News agency activities', 'J'),
                '63990': getSectorInfo('63990', 'Other information service', 'J'),

                // Finance (Section K)
                '64110': getSectorInfo('64110', 'Monetary central banking', 'K'),
                '64190': getSectorInfo('64190', 'Other monetary intermediation', 'K'),
                '64200': getSectorInfo('64200', 'Holding companies', 'K'),
                '64300': getSectorInfo('64300', 'Trusts & funding', 'K'),
                '64910': getSectorInfo('64910', 'Financial leasing', 'K'),
                '64920': getSectorInfo('64920', 'Other credit granting', 'K'),
                '64990': getSectorInfo('64990', 'Other financial intermediation', 'K'),
                '65110': getSectorInfo('65110', 'Life insurance', 'K'),
                '65120': getSectorInfo('65120', 'Other insurance', 'K'),
                '65200': getSectorInfo('65200', 'Reinsurance', 'K'),
                '65300': getSectorInfo('65300', 'Pension funding', 'K'),
                '66110': getSectorInfo('66110', 'Administration of financial markets', 'K'),
                '66120': getSectorInfo('66120', 'Security & commodity exchanges', 'K'),
                '66190': getSectorInfo('66190', 'Other auxiliary financial services', 'K'),
                '66210': getSectorInfo('66210', 'Risk & damage evaluation', 'K'),
                '66220': getSectorInfo('66220', 'Activities of insurance agents', 'K'),
                '66300': getSectorInfo('66300', 'Fund management', 'K'),
                '66900': getSectorInfo('66900', 'Other auxiliary financial services', 'K'),

                // Real Estate (Section L)
                '68100': getSectorInfo('68100', 'Real estate with own property', 'L'),
                '68200': getSectorInfo('68200', 'Real estate on fee or contract', 'L'),
                '68310': getSectorInfo('68310', 'Real estate agencies', 'L'),
                '68320': getSectorInfo('68320', 'Property management', 'L'),

                // Professional Services (Section M)
                '69100': getSectorInfo('69100', 'Legal activities', 'M'),
                '69200': getSectorInfo('69200', 'Accounting & auditing', 'M'),
                '70100': getSectorInfo('70100', 'Head offices', 'M'),
                '70210': getSectorInfo('70210', 'Management consultancy', 'M'),
                '70220': getSectorInfo('70220', 'Business consultancy', 'M'),
                '71100': getSectorInfo('71100', 'Architectural activities', 'M'),
                '71200': getSectorInfo('71200', 'Engineering & technical consultancy', 'M'),
                '72100': getSectorInfo('72100', 'Research & development', 'M'),
                '72200': getSectorInfo('72200', 'Market research & polling', 'M'),
                '73100': getSectorInfo('73100', 'Advertising', 'M'),
                '73200': getSectorInfo('73200', 'Market research & polling', 'M'),
                '74100': getSectorInfo('74100', 'Specialized design', 'M'),
                '74200': getSectorInfo('74200', 'Photography', 'M'),
                '74300': getSectorInfo('74300', 'Translation & interpretation', 'M'),
                '74900': getSectorInfo('74900', 'Other professional services', 'M'),

                // Admin Services (Section N)
                '77110': getSectorInfo('77110', 'Rental & leasing of motor vehicles', 'N'),
                '77210': getSectorInfo('77210', 'Rental & leasing of recreational goods', 'N'),
                '77290': getSectorInfo('77290', 'Rental & leasing of other equipment', 'N'),
                '77310': getSectorInfo('77310', 'Rental & leasing of personal goods', 'N'),
                '77320': getSectorInfo('77320', 'Rental & leasing of household goods', 'N'),
                '77330': getSectorInfo('77330', 'Rental & leasing of other goods', 'N'),
                '77340': getSectorInfo('77340', 'Leasing of intellectual property', 'N'),
                '77390': getSectorInfo('77390', 'Other rental & leasing', 'N'),
                '81110': getSectorInfo('81110', 'Facility management', 'N'),
                '81210': getSectorInfo('81210', 'General cleaning', 'N'),
                '81220': getSectorInfo('81220', 'Building cleaning', 'N'),
                '81290': getSectorInfo('81290', 'Other cleaning', 'N'),
                '82110': getSectorInfo('82110', 'Office administrative services', 'N'),
                '82190': getSectorInfo('82190', 'Other office support', 'N'),
                '82200': getSectorInfo('82200', 'Activities of call centers', 'N'),
                '82300': getSectorInfo('82300', 'Organization of conventions', 'N'),
                '82910': getSectorInfo('82910', 'Activities of collection agencies', 'N'),
                '82920': getSectorInfo('82920', 'Credit bureaus', 'N'),
                '82990': getSectorInfo('82990', 'Other business support', 'N'),

                // Public Administration (Section O)
                '84110': getSectorInfo('84110', 'General public administration', 'O'),
                '84120': getSectorInfo('84120', 'Regulation of health care', 'O'),
                '84130': getSectorInfo('84130', 'Regulation of education', 'O'),
                '84140': getSectorInfo('84140', 'Regulation of cultural activities', 'O'),
                '84210': getSectorInfo('84210', 'Foreign affairs', 'O'),
                '84220': getSectorInfo('84220', 'Defense', 'O'),
                '84230': getSectorInfo('84230', 'Justice', 'O'),
                '84300': getSectorInfo('84300', 'Public order & safety', 'O'),
                '84910': getSectorInfo('84910', 'Administration of environmental programs', 'O'),
                '84920': getSectorInfo('84920', 'Administration of housing programs', 'O'),
                '84990': getSectorInfo('84990', 'Other public administration', 'O'),

                // Education (Section P)
                '85100': getSectorInfo('85100', 'Pre-primary & primary education', 'P'),
                '85200': getSectorInfo('85200', 'Secondary education', 'P'),
                '85310': getSectorInfo('85310', 'Higher education', 'P'),
                '85320': getSectorInfo('85320', 'Technical & vocational education', 'P'),
                '85410': getSectorInfo('85410', 'Sports & recreation education', 'P'),
                '85420': getSectorInfo('85420', 'Cultural education', 'P'),
                '85510': getSectorInfo('85510', 'Driving schools', 'P'),
                '85590': getSectorInfo('85590', 'Other education', 'P'),
                '85600': getSectorInfo('85600', 'Educational support services', 'P'),

                // Health (Section Q)
                '86100': getSectorInfo('86100', 'Hospital activities', 'Q'),
                '86210': getSectorInfo('86210', 'General medical practice', 'Q'),
                '86220': getSectorInfo('86220', 'Specialist medical practice', 'Q'),
                '86900': getSectorInfo('86900', 'Other human health activities', 'Q'),
                '87100': getSectorInfo('87100', 'Nursing homes', 'Q'),
                '87200': getSectorInfo('87200', 'Residential care for mental health', 'Q'),
                '87300': getSectorInfo('87300', 'Residential care for elderly', 'Q'),
                '87900': getSectorInfo('87900', 'Other residential care', 'Q'),
                '88100': getSectorInfo('88100', 'Social work without accommodation', 'Q'),

                // Arts & Entertainment (Section R)
                '90010': getSectorInfo('90010', 'Performing arts', 'R'),
                '90020': getSectorInfo('90020', 'Support activities to performing arts', 'R'),
                '90030': getSectorInfo('90030', 'Artistic creation', 'R'),
                '90040': getSectorInfo('90040', 'Operation of arts facilities', 'R'),
                '91010': getSectorInfo('91010', 'Library & archive activities', 'R'),
                '91020': getSectorInfo('91020', 'Museums', 'R'),
                '91030': getSectorInfo('91030', 'Historical sites & buildings', 'R'),
                '91040': getSectorInfo('91040', 'Botanical & zoological gardens', 'R'),
                '92000': getSectorInfo('92000', 'Gambling & betting activities', 'R'),
                '93110': getSectorInfo('93110', 'Sports facility operation', 'R'),
                '93120': getSectorInfo('93120', 'Sports activities', 'R'),
                '93190': getSectorInfo('93190', 'Other sports activities', 'R'),
                '93210': getSectorInfo('93210', 'Amusement parks', 'R'),
                '93290': getSectorInfo('93290', 'Other amusement & recreation', 'R'),

                // Other Services (Section S)
                '94110': getSectorInfo('94110', 'Motion picture & video projection', 'S'),
                '94120': getSectorInfo('94120', 'Film exhibition', 'S'),
                '94910': getSectorInfo('94910', 'Religious activities', 'S'),
                '94920': getSectorInfo('94920', 'Trade union activities', 'S'),
                '94990': getSectorInfo('94990', 'Other membership organizations', 'S'),
                '95110': getSectorInfo('95110', 'Repair of computers', 'S'),
                '95120': getSectorInfo('95120', 'Repair of communication equipment', 'S'),
                '95210': getSectorInfo('95210', 'Repair of home appliances', 'S'),
                '95220': getSectorInfo('95220', 'Repair of motorcycles', 'S'),
                '95230': getSectorInfo('95230', 'Repair of personal goods', 'S'),
                '95990': getSectorInfo('95990', 'Other repair services', 'S'),
                '96010': getSectorInfo('96010', 'Laundry & cleaning', 'S'),
                '96020': getSectorInfo('96020', 'Hairdressing & beauty treatment', 'S'),
                '96030': getSectorInfo('96030', 'Funeral & related activities', 'S'),
                '96090': getSectorInfo('96090', 'Other personal service', 'S'),
            };

            // Check if the NIC code exists in our mapping
            if (nicMapping[nicCode]) {
                console.log(`[NIC Parser] Found fallback mapping for NIC code: ${nicCode}`);
                return nicMapping[nicCode];
            }

            // Try to find a partial match (first 3 or 4 digits)
            const partialMatch = nicCode.substring(0, 3) + '00';
            if (nicMapping[partialMatch]) {
                console.log(`[NIC Parser] Found partial match for ${nicCode} using ${partialMatch}`);
                return nicMapping[partialMatch];
            }

            console.warn(`[NIC Parser] No mapping found for NIC code: ${nicCode}`);
            return null;
        } catch (error) {
            console.error('Error extracting sector from CIN:', error);
            return null;
        }
    }

    getSectionDescription(sectionCode) {
        const sections = {
            'A': 'Agriculture, Forestry & Fishing',
            'B': 'Mining & Quarrying',
            'C': 'Manufacturing',
            'D': 'Manufacturing',
            'E': 'Electricity, Gas, Steam & Air Conditioning',
            'F': 'Construction',
            'G': 'Wholesale & Retail Trade',
            'H': 'Transportation & Storage',
            'I': 'Accommodation & Food Service',
            'J': 'Information & Communication',
            'K': 'Financial & Insurance Activities',
            'L': 'Real Estate Activities',
            'M': 'Professional, Scientific & Technical',
            'N': 'Administrative & Support Services',
            'O': 'Public Administration & Defense',
            'P': 'Education',
            'Q': 'Human Health & Social Work',
            'R': 'Arts, Entertainment & Recreation',
            'S': 'Other Service Activities',
            'T': 'Activities of Households',
            'U': 'Activities of Extraterritorial Organizations'
        };
        return sections[sectionCode] || 'Other Activities';
    }

    async parseXBRL(xmlContent, filename = null) {
        try {
            const parser = new xml2js.Parser({
                explicitArray: false,
                tagNameProcessors: [xml2js.processors.stripPrefix] // Parsing <ns:Tag> as "Tag"
            });

            const result = await parser.parseStringPromise(xmlContent);
            // console.log("DEBUG PARSER RESULT:", JSON.stringify(result, null, 2));
            const xbrl = result.xbrl || result.XBRL || result; // Handle capitalization root

            const indicators = {};
            const prevYearIndicators = {};

            // 1. Context Analysis
            // We MUST find the context ID for "Current Year" and "Previous Year"
            const contexts = this.extractContexts(xbrl); // Uniform array
            const { currentId, prevId } = this.analyzeContexts(contexts);

            console.log(`[BRSR Parser] Detected Contexts - Current: ${currentId}, Previous: ${prevId}`);

            // 2. Extract unit information from XBRL
            const xbrlUnits = this.extractUnits(xbrl);
            console.log('[BRSR Parser] Extracted XBRL units:', Object.keys(xbrlUnits).length > 0 ? xbrlUnits : 'No explicit units found');

            // 3. Recursive scan with unit tracking (Strict Context Match)
            // This is the most accurate method
            if (currentId) this.scan(xbrl, currentId, indicators, xbrlUnits);
            if (prevId) this.scan(xbrl, prevId, prevYearIndicators, xbrlUnits);

            // 4. Convert all values to standard base units
            const convertedIndicators = this.convertIndicatorsToBaseUnits(indicators);
            Object.assign(indicators, convertedIndicators);

            // 5. Fallback: "Greedy Scan" (Holistic Enablement)
            // If we missed critical data (e.g., Energy or Employees), scan EVERYTHING and take the latest values.
            // This handles cases where context extraction failed or tags are in unexpected contexts.
            const criticalFields = ['p6_energy_total', 'p6_ghg_scope1', 'p3_total_employees', 'p6_waste_total'];
            const missingCritical = criticalFields.some(f => !indicators[f] || indicators[f] === 0);

            if (!currentId || missingCritical) {
                console.warn("[BRSR Parser] Critical data missing or no context found. Activating Greedy Scan...");
                this.scanGreedy(xbrl, indicators, xbrlUnits);
                // Convert greedy scan results too
                const convertedGreedy = this.convertIndicatorsToBaseUnits(indicators);
                Object.assign(indicators, convertedGreedy);
            }

            // 6. Fallback for Company Name & CIN (Global Search)
            if (!indicators.company_name || indicators.company_name === 'Reported Entity' || indicators.company_name === 0) {
                this.scanGlobal(xbrl, indicators, 'company_name');
            }
            if (!indicators.cin || indicators.cin === 'N/A' || indicators.cin === 0) {
                this.scanGlobal(xbrl, indicators, 'cin');
            }
            if (!indicators.date_end_fy && !indicators.financial_year) {
                this.scanGlobal(xbrl, indicators, 'date_end_fy');
            }
            if (!indicators.date_start_fy) {
                this.scanGlobal(xbrl, indicators, 'date_start_fy');
            }

            // 5. Derive financial_year from in-capmkt dates (DateOfStartOfFinancialYear / DateOfEndOfFinancialYear)
            let financialYear = indicators.financial_year;
            if (!financialYear || financialYear === 'FY 2024-25') {
                const endDate = indicators.date_end_fy;
                const startDate = indicators.date_start_fy;
                if (endDate && typeof endDate === 'string') {
                    const m = endDate.match(/(\d{4})-(\d{2})-(\d{2})/);
                    if (m) financialYear = `FY ${parseInt(m[1], 10) - 1}-${m[1].slice(2)}`;
                }
                if ((!financialYear || financialYear === 'FY 2024-25') && startDate && typeof startDate === 'string') {
                    const m = startDate.match(/(\d{4})/);
                    if (m) financialYear = `FY ${m[1]}-${(parseInt(m[1], 10) + 1).toString().slice(2)}`;
                }
            }
            if (financialYear) indicators.financial_year = financialYear;

            const metrics = this.calculateMetrics(indicators, prevYearIndicators);
            const esgScore = this.calculateESGScore(metrics);

            // DEBUG: Log key extracted indicators
            console.log('[BRSR Parser] Key Indicators:', {
                p6_energy_total: indicators.p6_energy_total || indicators.p6_e1_grand_total_fy || 0,
                p6_ghg_scope1: indicators.p6_ghg_scope1 || indicators.p6_e7_scope1_fy || 0,
                p6_ghg_scope2: indicators.p6_ghg_scope2 || indicators.p6_e7_scope2_fy || 0,
                p6_water_withdrawal: indicators.p6_water_withdrawal || indicators.p6_e3_total_withdrawal_fy || 0,
                p6_waste_total: indicators.p6_waste_total || indicators.p6_e9_total_generation_fy || 0,
                p3_total_employees: indicators.p3_total_employees || 0,
                p3_total_employees_male: indicators.p3_total_employees_male || 0,
                p3_total_employees_female: indicators.p3_total_employees_female || 0,
                turnover: indicators.turnover || 0
            });
            console.log('[BRSR Parser] Calculated Metrics:', metrics);

            // Extract company name - prioritize actual XBRL data over filename
            const finalCompanyName = indicators.company_name && indicators.company_name !== 'Reported Entity'
                ? indicators.company_name
                : (this.extractCompanyNameFromFilename(filename) || 'Reported Entity');

            // Extract NIC code sector information
            const nicSectorData = indicators.nic_sector || this.extractSectorFromCIN(indicators.cin);

            // Handle both string (fallback) and object (full database) formats
            const nicSector = typeof nicSectorData === 'string'
                ? nicSectorData
                : (nicSectorData?.description || nicSectorData?.sectionDescription || null);
            const industry = nicSector || indicators.industry || 'Not Specified';
            const nicCodeInfo = typeof nicSectorData === 'object' ? nicSectorData : null;

            // Get standardized indicators in base units
            const standardIndicators = this.getStandardizedIndicators(indicators);

            // Phase 5: Aliasing for Frontend Backward Compatibility
            // Use STANDARDIZED base values to ensure consistency across all reports
            const aliasedIndicators = {
                ...indicators,
                ...standardIndicators, // Include standardized values
                // Legacy aliases for backward compatibility
                // Energy - Standard: GJ (Base unit)
                p6_total_energy_mj: standardIndicators.p6_energy_total_mj || 0,
                p6_total_energy_gj: standardIndicators.p6_energy_total_gj || 0,
                p6_energy_total: standardIndicators.p6_energy_total_gj || 0, // Default to GJ
                // GHG - Standard: tCO2e (Base unit)
                p6_scope1: standardIndicators.p6_ghg_scope1 || 0,
                p6_scope2: standardIndicators.p6_ghg_scope2 || 0,
                p6_scope3: standardIndicators.p6_ghg_scope3 || 0,
                p6_ghg_scope1: standardIndicators.p6_ghg_scope1 || 0,
                p6_ghg_scope2: standardIndicators.p6_ghg_scope2 || 0,
                p6_ghg_scope3: standardIndicators.p6_ghg_scope3 || 0,
                // Water - Standard: KL (Base unit)
                p6_water_withdrawal: standardIndicators.p6_water_withdrawal || 0,
                // Waste - Standard: tonnes (Base unit)
                p6_recycled: standardIndicators.p6_waste_recycled || 0,
                p6_reused: standardIndicators.p6_waste_reused || 0,
                p6_total_generation: standardIndicators.p6_waste_total || 0,
                p6_waste_total: standardIndicators.p6_waste_total || 0,
                // Employees
                p3_female_employees: indicators.p3_total_employees_female ?? ((indicators.p3_total_employees || 0) - (indicators.p3_permanent_employees || 0))
            };

            // Unit metadata for frontend display - defines the standard base units used
            const units = {
                energy: {
                    base: 'GJ',        // Standard base unit
                    display: 'GJ',     // Display unit
                    symbol: 'GJ',
                    description: 'Gigajoules (standardized)',
                    conversionFactor: 1000, // 1 GJ = 1000 MJ
                    original: 'MJ'     // BRSR typically reports in MJ
                },
                ghg: {
                    base: 'tCO2e',
                    display: 'tCO2e',
                    symbol: 'tCO2e',
                    description: 'Tonnes CO2 equivalent (standardized)',
                    conversionFactor: 1,
                    original: 'tCO2e'
                },
                water: {
                    base: 'KL',        // Standard base unit
                    display: 'KL',     // Display unit
                    symbol: 'KL',
                    description: 'Kiloliters = cubic meters (standardized)',
                    conversionFactor: 1,
                    original: 'KL'
                },
                waste: {
                    base: 'tonnes',    // Standard base unit
                    display: 'tonnes',
                    symbol: 'tonnes',
                    description: 'Metric tonnes (standardized)',
                    conversionFactor: 1,
                    original: 'tonnes'
                }
            };

            return {
                companyName: finalCompanyName,
                cin: indicators.cin || 'N/A',
                financialYear: financialYear || indicators.financial_year || 'FY 2024-25',
                industry: industry,
                nicSector: nicSector,
                nicCodeInfo: nicCodeInfo, // Full NIC code information from database
                corporateAddress: indicators.address_registered_office,
                indicators: { ...aliasedIndicators, prev_year: prevYearIndicators },
                metrics,
                esgScore,
                units, // Include unit metadata for frontend
                filename: filename || null
            };

        } catch (error) {
            console.error("Parser Critical Failure:", error);
            throw new Error("Failed to extract data signatures from XBRL file.");
        }
    }


    extractContexts(root) {
        if (root.context) return Array.isArray(root.context) ? root.context : [root.context];
        if (root.Context) return Array.isArray(root.Context) ? root.Context : [root.Context];
        // Handle namespaced contexts e.g. xbrli:context
        const keys = Object.keys(root).filter(k => /:?context$/i.test(k));
        let allContexts = [];
        keys.forEach(k => {
            const val = root[k];
            allContexts = allContexts.concat(Array.isArray(val) ? val : [val]);
        });
        return allContexts;
    }

    analyzeContexts(contexts) {
        // Strategy: Find the LATEST End Date. 
        let candidates = contexts.map(c => {
            const id = c.$ ? c.$.id : (c.id || 'unknown');
            const period = c.period || c.Period || {};
            let date = '';

            // Handle different date structures
            if (period.endDate) date = period.endDate;
            else if (period.instant) date = period.instant;
            else if (period.forever) date = '9999-12-31';

            const hasDimensions = !!(c.entity && (c.entity.segment || c.entity.scenario));

            return { id, date, hasDimensions };
        }).filter(c => c.date); // Must have date

        // Sort by date desc
        candidates.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (candidates.length === 0) return { currentId: null, prevId: null };

        // Max Date = Current Year
        const maxDate = candidates[0].date;

        // Find best Current ID (prefer no dimensions)
        const currentRef = candidates.find(c => c.date === maxDate && !c.hasDimensions) || candidates.find(c => c.date === maxDate);

        // Find Prev ID (approx 1 year prior)
        const prevYearDate = new Date(maxDate);
        prevYearDate.setFullYear(prevYearDate.getFullYear() - 1);
        const prevDatePrefix = prevYearDate.toISOString().substring(0, 4);

        const prevRef = candidates.find(c => c.date.startsWith(prevDatePrefix) && !c.hasDimensions) || candidates.find(c => c.date.startsWith(prevDatePrefix));

        return {
            currentId: currentRef ? currentRef.id : null,
            prevId: prevRef ? prevRef.id : null
        };
    }

    scan(node, contextId, target, unitMap = {}) {
        if (!node || typeof node !== 'object') return;

        // DFS
        Object.keys(node).forEach(key => {
            const tagName = key;
            const valueNode = node[key];
            const values = Array.isArray(valueNode) ? valueNode : [valueNode];

            // 1. Check if this tag matches any of our patterns
            const matchedPattern = this.patterns.find(p => p.regex.test(tagName));

            if (matchedPattern) {
                // 2. Find value with correct contextRef
                const validEntry = values.find(v => v.$ && v.$.contextRef === contextId);
                if (validEntry) {
                    const rawVal = validEntry._ || validEntry;
                    const cleanedVal = this.cleanNumber(rawVal);
                    const unitRef = validEntry.$?.unitRef;

                    // Store both value and unit information
                    if (target[matchedPattern.field] === undefined || target[matchedPattern.field] === 0) {
                        target[matchedPattern.field] = cleanedVal;
                        // Store original unit info
                        target[matchedPattern.field + '_unit'] = unitRef || 'unknown';
                        target[matchedPattern.field + '_unitObj'] = unitMap[unitRef] || null;
                    }
                }
            }

            // Recurse
            values.forEach(v => this.scan(v, contextId, target, unitMap));
        });
    }

    /**
     * Greedy Scan: Searches the entire tree for pattern matches, regardless of context.
     * Takes the first non-empty value found (or prioritizes simpler values).
     */
    scanGreedy(node, target, unitMap = {}) {
        if (!node || typeof node !== 'object') return;

        Object.keys(node).forEach(key => {
            const tagName = key;
            const valueNode = node[key];
            const values = Array.isArray(valueNode) ? valueNode : [valueNode];

            const matchedPattern = this.patterns.find(p => p.regex.test(tagName));

            if (matchedPattern) {
                // Iterate all values (contexts) for this tag
                values.forEach(v => {
                    const rawVal = v._ || v;
                    if (rawVal !== undefined && rawVal !== null) {
                        const cleanedVal = this.cleanNumber(rawVal);
                        const unitRef = v.$?.unitRef;

                        // Update if not set yet (Greedy = first found usually good enough here, or we could compare dates if we parsed context)
                        if (target[matchedPattern.field] === undefined || target[matchedPattern.field] === 0) {
                            target[matchedPattern.field] = cleanedVal;
                            // Store original unit info
                            target[matchedPattern.field + '_unit'] = unitRef || 'unknown';
                            target[matchedPattern.field + '_unitObj'] = unitMap[unitRef] || null;
                        }
                    }
                });
            }

            // Recurse
            values.forEach(v => this.scanGreedy(v, target, unitMap));
        });
    }

    /**
     * Scan the entire tree for a field, IGNORING contextId.
     * Useful for company_name, cin, etc. which might be in non-standard contexts.
     */
    scanGlobal(node, target, field) {
        if (!node || typeof node !== 'object') return;
        const pattern = this.patterns.find(p => p.field === field);
        if (!pattern) return;

        Object.keys(node).forEach(key => {
            const tagName = key;
            const valueNode = node[key];
            const values = Array.isArray(valueNode) ? valueNode : [valueNode];

            if (pattern.regex.test(tagName)) {
                const firstVal = values[0];
                const rawVal = firstVal._ || firstVal;
                if (rawVal && typeof rawVal === 'string' && rawVal.length > 2) {
                    target[field] = rawVal;
                }
            }

            values.forEach(v => this.scanGlobal(v, target, field));
        });
    }

    cleanNumber(val) {
        if (val === undefined || val === null) return 0;
        if (typeof val === 'number') return val;
        // Remove commas, spaces
        const s = val.toString().replace(/,/g, '').trim();
        const n = parseFloat(s);
        return isNaN(n) ? s : n; // Return string if not number (e.g. Company Name), else number
    }

    /**
     * BRSR STANDARD UNITS AND CONVERSION FACTORS
     * All values are converted to these base units for consistency
     */
    getBRSRUnitConversions() {
        return {
            // Energy units - Base: GJ (Gigajoules)
            energy: {
                baseUnit: 'GJ',
                conversions: {
                    // SI Units
                    'J': { toBase: 1e-9, name: 'Joules' },
                    'kJ': { toBase: 1e-6, name: 'Kilojoules' },
                    'MJ': { toBase: 0.001, name: 'Megajoules' },
                    'GJ': { toBase: 1, name: 'Gigajoules' },
                    'TJ': { toBase: 1000, name: 'Terajoules' },
                    'PJ': { toBase: 1e6, name: 'Petajoules' },
                    // Common units
                    'kWh': { toBase: 0.0036, name: 'Kilowatt-hours' },
                    'MWh': { toBase: 3.6, name: 'Megawatt-hours' },
                    'GWh': { toBase: 3600, name: 'Gigawatt-hours' },
                    'TOE': { toBase: 41.868, name: 'Tonnes of Oil Equivalent' },
                    'BOE': { toBase: 6.117, name: 'Barrels of Oil Equivalent' },
                    // BRSR specific
                    'megaJoule': { toBase: 0.001, name: 'Megajoules' },
                    'gigaJoule': { toBase: 1, name: 'Gigajoules' },
                    'kilowattHour': { toBase: 0.0036, name: 'Kilowatt-hours' },
                }
            },
            // GHG Emissions - Base: tCO2e (Metric Tonnes CO2 equivalent)
            // IMPORTANT: All GHG values are normalized to tCO2 for uniformity across all companies
            ghg: {
                baseUnit: 'tCO2e',
                conversions: {
                    // SI Units (metric)
                    'gCO2e': { toBase: 1e-9, name: 'Grams CO2e' },
                    'kgCO2e': { toBase: 0.001, name: 'Kilograms CO2e' },
                    'tCO2e': { toBase: 1, name: 'Tonnes CO2e' },
                    'ktCO2e': { toBase: 1000, name: 'Kilotonnes CO2e' },
                    'MtCO2e': { toBase: 1e6, name: 'Megatonnes CO2e' },
                    'GtCO2e': { toBase: 1e9, name: 'Gigatonnes CO2e' },

                    // Alternative notation (case variations)
                    'tco2e': { toBase: 1, name: 'Tonnes CO2e' },
                    'ktco2e': { toBase: 1000, name: 'Kilotonnes CO2e' },
                    'mtco2e': { toBase: 1e6, name: 'Megatonnes CO2e' },
                    'gtco2e': { toBase: 1e9, name: 'Gigatonnes CO2e' },
                    'Tonne': { toBase: 1, name: 'Tonnes CO2e' },
                    'Kilotonne': { toBase: 1000, name: 'Kilotonnes' },
                    'Megatonne': { toBase: 1e6, name: 'Megatonnes' },
                    'Million tCO2': { toBase: 1e6, name: 'Million Tonnes CO2' },
                    'Million tCO2e': { toBase: 1e6, name: 'Million Tonnes CO2e' },

                    // Without 'e' suffix
                    'tCO2': { toBase: 1, name: 'Tonnes CO2' },
                    'ktCO2': { toBase: 1000, name: 'Kilotonnes CO2' },
                    'MtCO2': { toBase: 1e6, name: 'Megatonnes CO2' },
                    'GtCO2': { toBase: 1e9, name: 'Gigatonnes CO2' },

                    // BRSR specific XBRL units
                    'co2EquivalentMetricTonnes': { toBase: 1, name: 'Tonnes CO2e' },
                    'metricTonnes': { toBase: 1, name: 'Metric Tonnes' },
                    'CO2EquivalentMetricTonnes': { toBase: 1, name: 'Tonnes CO2e' },

                    // Company-specific variations
                    'Million Tonnes': { toBase: 1e6, name: 'Million Tonnes' },
                    'Billion Tonnes': { toBase: 1e9, name: 'Billion Tonnes' },
                }
            },
            // Water - Base: KL (Kiloliters = 1 cubic meter)
            water: {
                baseUnit: 'KL',
                conversions: {
                    'L': { toBase: 0.001, name: 'Liters' },
                    'KL': { toBase: 1, name: 'Kiloliters' },
                    'ML': { toBase: 1000, name: 'Megaliters' },
                    'GL': { toBase: 1e6, name: 'Gigaliters' },
                    'm3': { toBase: 1, name: 'Cubic Meters' },
                    'cm': { toBase: 0.001, name: 'Cubic Meters' },
                    // BRSR specific
                    'cubicMetre': { toBase: 1, name: 'Cubic Meters' },
                    'cubicMeter': { toBase: 1, name: 'Cubic Meters' },
                    'kiloLitre': { toBase: 1, name: 'Kiloliters' },
                    'kiloLiter': { toBase: 1, name: 'Kiloliters' },
                }
            },
            // Waste - Base: tonnes (Metric Tonnes)
            waste: {
                baseUnit: 'tonnes',
                conversions: {
                    'kg': { toBase: 0.001, name: 'Kilograms' },
                    'tonnes': { toBase: 1, name: 'Metric Tonnes' },
                    'kt': { toBase: 1000, name: 'Kilotonnes' },
                    'Mt': { toBase: 1e6, name: 'Megatonnes' },
                    // BRSR specific
                    'metricTonne': { toBase: 1, name: 'Metric Tonnes' },
                }
            },
            // Financial - Base: INR (Indian Rupees)
            financial: {
                baseUnit: 'INR',
                conversions: {
                    'INR': { toBase: 1, name: 'Indian Rupees' },
                    'Lakhs': { toBase: 100000, name: 'Lakhs' },
                    'Crores': { toBase: 10000000, name: 'Crores' },
                    'Cr': { toBase: 10000000, name: 'Crores' },
                }
            }
        };
    }

    /**
     * Convert a value to the base unit
     */
    convertToBaseUnit(category, value, fromUnit) {
        if (!value || value === 0) return 0;
        if (!fromUnit || fromUnit === 'unknown') {
            console.warn(`[BRSR Parser] Unknown unit for ${category}, assuming base unit`);
            return value;
        }

        const conversions = this.getBRSRUnitConversions();
        const categoryData = conversions[category];

        if (!categoryData) {
            console.warn(`[BRSR Parser] Unknown category: ${category}`);
            return value;
        }

        // Try to find exact match
        const unitInfo = categoryData.conversions[fromUnit];
        if (unitInfo) {
            return value * unitInfo.toBase;
        }

        // Try case-insensitive match
        const lowerFromUnit = fromUnit.toLowerCase();
        for (const [unit, info] of Object.entries(categoryData.conversions)) {
            if (unit.toLowerCase() === lowerFromUnit) {
                return value * info.toBase;
            }
        }

        // Try partial match
        for (const [unit, info] of Object.entries(categoryData.conversions)) {
            if (lowerFromUnit.includes(unit.toLowerCase()) || unit.toLowerCase().includes(lowerFromUnit)) {
                console.log(`[BRSR Parser] Partial unit match: ${fromUnit} -> ${unit}`);
                return value * info.toBase;
            }
        }

        console.warn(`[BRSR Parser] Cannot convert from unit: ${fromUnit}, returning original value`);
        return value;
    }

    /**
     * Convert all indicators to standard base units
     */
    convertIndicatorsToBaseUnits(indicators) {
        const converted = {};

        for (const [fieldName, value] of Object.entries(indicators)) {
            // Skip unit metadata fields and non-numeric values
            if (fieldName.includes('_unit') || fieldName.includes('_original') ||
                typeof value !== 'number' || value === 0) {
                continue;
            }

            // Get the category for this field
            const category = this.getFieldCategory(fieldName);
            if (!category) continue;

            // Get the original unit
            const originalUnit = indicators[fieldName + '_unit'];

            // Convert to base unit
            if (originalUnit && originalUnit !== 'unknown') {
                converted[fieldName + '_base'] = this.convertToBaseUnit(category, value, originalUnit);
                converted[fieldName + '_original_unit'] = originalUnit;
            }
        }

        return converted;
    }

    /**
     * Get standardized indicator values with unit information
     */
    getStandardizedIndicators(indicators) {
        const standard = {};

        // Helper function to get value with fallback to raw value
        // BRSR standard units: Energy=MJ, GHG=tCO2e, Water=KL, Waste=tonnes
        const getValue = (baseField, rawField, category) => {
            // First try the converted base value
            if (indicators[baseField] !== undefined && indicators[baseField] > 0) {
                return indicators[baseField];
            }
            // Fall back to raw value and apply BRSR standard conversion
            const rawValue = indicators[rawField];
            if (rawValue === undefined || rawValue === 0 || typeof rawValue !== 'number') return 0;

            // Apply BRSR standard conversions
            if (category === 'energy') {
                // Convert MJ to GJ (divide by 1000)
                return rawValue / 1000;
            }
            // GHG, Water, Waste are already in base units (tCO2e, KL, tonnes)
            return rawValue;
        };

        // Energy - Base: GJ (convert from MJ which is BRSR standard)
        standard.p6_energy_total_gj = getValue('p6_e1_grand_total_fy_base', 'p6_e1_grand_total_fy', 'energy') ||
                                     getValue('p6_energy_total_base', 'p6_energy_total', 'energy');
        // Store original MJ for reference
        standard.p6_energy_total_mj = indicators.p6_e1_grand_total_fy || indicators.p6_energy_total || 0;

        // Renewable Energy - Base: GJ
        const renewElec = getValue('p6_e1_renew_elec_fy_base', 'p6_e1_renew_elec_fy', 'energy');
        const renewFuel = getValue('p6_e1_renew_fuel_fy_base', 'p6_e1_renew_fuel_fy', 'energy');
        const renewOther = getValue('p6_e1_renew_other_fy_base', 'p6_e1_renew_other_fy', 'energy');
        standard.p6_renewable_total_gj = renewElec + renewFuel + renewOther;

        // Non-Renewable Energy - Base: GJ
        const nonRenewElec = getValue('p6_e1_non_renew_elec_fy_base', 'p6_e1_non_renew_elec_fy', 'energy');
        const nonRenewFuel = getValue('p6_e1_non_renew_fuel_fy_base', 'p6_e1_non_renew_fuel_fy', 'energy');
        const nonRenewOther = getValue('p6_e1_non_renew_other_fy_base', 'p6_e1_non_renew_other_fy', 'energy');
        standard.p6_non_renewable_total_gj = nonRenewElec + nonRenewFuel + nonRenewOther;

        // GHG Emissions - Base: tCO2e (BRSR standard, no conversion needed)
        standard.p6_ghg_scope1 = getValue('p6_e7_scope1_fy_base', 'p6_e7_scope1_fy', 'ghg');
        standard.p6_ghg_scope2 = getValue('p6_e7_scope2_fy_base', 'p6_e7_scope2_fy', 'ghg');
        standard.p6_ghg_scope3 = getValue('p6_l2_scope3_fy_base', 'p6_l2_scope3_fy', 'ghg');
        standard.p6_ghg_total = standard.p6_ghg_scope1 + standard.p6_ghg_scope2 + standard.p6_ghg_scope3;

        // Water - Base: KL (BRSR standard, no conversion needed)
        standard.p6_water_withdrawal = getValue('p6_e3_total_withdrawal_fy_base', 'p6_e3_total_withdrawal_fy', 'water');
        standard.p6_water_consumption = getValue('p6_e3_total_consumption_fy_base', 'p6_e3_total_consumption_fy', 'water');

        // Waste - Base: tonnes (BRSR standard, no conversion needed)
        standard.p6_waste_total = getValue('p6_e9_total_generation_fy_base', 'p6_e9_total_generation_fy', 'waste');
        standard.p6_waste_recycled = getValue('p6_e9_recycled_fy_base', 'p6_e9_recycled_fy', 'waste');
        standard.p6_waste_reused = getValue('p6_e9_reused_fy_base', 'p6_e9_reused_fy', 'waste');

        // Financial - Base: INR
        standard.turnover_inr = indicators.turnover_base || indicators.turnover || 0;

        return standard;
    }

    /**
     * Determine the category of a field based on its name
     */
    getFieldCategory(fieldName) {
        const lowerField = fieldName.toLowerCase();

        // Energy fields
        if (lowerField.includes('energy') || lowerField.includes('e1') ||
            lowerField.includes('renewable') || lowerField.includes('fuel') ||
            lowerField.includes('electricity') && lowerField.includes('consumption')) {
            return 'energy';
        }

        // GHG/Emissions fields
        if (lowerField.includes('ghg') || lowerField.includes('scope') ||
            lowerField.includes('emission') || lowerField.includes('co2') ||
            lowerField.includes('e7') || lowerField.includes('l2')) {
            return 'ghg';
        }

        // Water fields
        if (lowerField.includes('water') || lowerField.includes('e3') ||
            lowerField.includes('withdrawal') || lowerField.includes('consumption') && lowerField.includes('water')) {
            return 'water';
        }

        // Waste fields
        if (lowerField.includes('waste') || lowerField.includes('e9') ||
            lowerField.includes('recycled') || lowerField.includes('reused')) {
            return 'waste';
        }

        // Financial fields
        if (lowerField.includes('turnover') || lowerField.includes('revenue') ||
            lowerField.includes('profit') || lowerField.includes('spending') ||
            lowerField.includes('csr') || lowerField.includes('wellbeing')) {
            return 'financial';
        }

        return null;
    }

    /**
     * BRSR STANDARD UNITS
     * Based on SEBI BRSR taxonomy and industry standards:
     * - GHG Emissions: tCO2e (metric tonnes CO2 equivalent)
     * - Energy: GJ (Gigajoules) - primary unit, MJ (Megajoules) - secondary
     * - Water: KL (Kiloliters) = m³ (cubic meters)
     * - Waste: tonnes (metric tonnes)
     * - Turnover: ₹ INR
     */
    extractUnits(xbrl) {
        // Extract unit definitions from XBRL
        const units = {};

        // Common XBRL unit patterns
        // BRSR typically uses these units:
        const unitPatterns = {
            // Energy units
            'joule': 'J',
            'kilojoule': 'kJ',
            'megajoule': 'MJ',
            'gigajoule': 'GJ',
            'terajoule': 'TJ',
            'kilowatthour': 'kWh',
            'megawatthour': 'MWh',
            'gigawatthour': 'GWh',

            // Emissions units
            'co2equivalent': 'tCO2e',
            'tonne': 't',
            'kilotonne': 'kt',
            'megatonne': 'Mt',
            'gigatonne': 'Gt',
            'metrictonne': 't',
            'kilogram': 'kg',

            // Water units
            'cubicmeter': 'm³',
            'cubicmetre': 'm³',
            'kilolitre': 'KL',
            'kiloliter': 'KL',
            'megalitre': 'ML',
            'megaliter': 'ML',
            'litre': 'L',
            'liter': 'L',

            // Waste units
            'metrictonne': 'tonnes',
            'kilogram': 'kg',
        };

        try {
            // Try to extract from XBRL unit definitions
            const unitNodes = xbrl.unit || xbrl.Unit || [];
            const unitArray = Array.isArray(unitNodes) ? unitNodes : [unitNodes];

            unitArray.forEach(u => {
                if (u && u.$ && u.$.id) {
                    const unitId = u.$.id;
                    // Extract the measure/divide to determine the unit
                    const measure = u.measure || u.Measure;
                    if (measure) {
                        const measureStr = typeof measure === 'string' ? measure : measure.$?.id || measure;
                        units[unitId] = this.parseXBRLUnit(measureStr);
                    }
                }
            });
        } catch (e) {
            console.warn('[BRSR Parser] Could not extract units from XBRL:', e.message);
        }

        return units;
    }

    parseXBRLUnit(measureStr) {
        // Parse XBRL unit measure string (e.g., "iso4217:INR", "swi:CO2EquivalentMetricTonnes")
        if (!measureStr) return 'unknown';

        // Common namespace prefixes - ORDER MATTERS (more specific first)
        const unitMap = {
            // GHG/Emissions units (more specific patterns first)
            'CO2EquivalentMetricTonnes': 'tCO2e',
            'co2equivalent': 'tCO2e',
            'million': 'MtCO2e',  // Will be refined below
            'gigatonnes': 'GtCO2e',
            'megatonnes': 'MtCO2e',
            'kilotonnes': 'ktCO2e',
            'kilotonne': 'ktCO2e',
            'gtco2': 'GtCO2e',
            'mtco2': 'MtCO2e',
            'ktco2': 'ktCO2e',
            'tco2e': 'tCO2e',
            'tco2': 'tCO2e',

            // BRSR/SEBI specific
            'MetricTonnes': 'tonnes',
            'CubicMetres': 'm³',
            'KiloLitres': 'KL',
            'Megajoules': 'MJ',
            'Gigajoules': 'GJ',
            'KilowattHours': 'kWh',

            // Standard XBRL
            'inr': '₹',
            'inr1': '₹',
            'iso4217:inr': '₹',

            // Common patterns
            'tonne': 'tonnes',
            'cubicmeter': 'm³',
            'cubicmetre': 'm³',
            'kilolitre': 'KL',
            'megajoule': 'GJ',
            'kilowatthour': 'kWh',
        };

        const lower = measureStr.toLowerCase();

        // Special handling for "Million tCO2" or "Million Tonnes" patterns
        if (lower.includes('million') && (lower.includes('co2') || lower.includes('tonne'))) {
            return 'MtCO2e';  // Million tCO2 = Megatonnes
        }

        // Try exact matches first (case-insensitive)
        for (const [key, value] of Object.entries(unitMap)) {
            if (lower === key.toLowerCase()) {
                return value;
            }
        }

        // Try partial matches (contains)
        for (const [key, value] of Object.entries(unitMap)) {
            if (lower.includes(key.toLowerCase())) {
                return value;
            }
        }

        console.log(`[BRSR Parser] Unknown unit: ${measureStr}, using as-is`);
        return measureStr;
    }

    /**
     * Normalize values to standard base units
     * This ensures consistent representation across all reports
     */
    normalizeUnits(indicators) {
        const normalized = { ...indicators };

        // BRSR standard base units:
        // - Energy: GJ (Gigajoules) - from MJ divide by 1000
        // - GHG: tCO2e (tonnes) - keep as is
        // - Water: KL (Kiloliters) - keep as is (1 KL = 1 m³)
        // - Waste: tonnes - keep as is

        // Energy normalization: Convert MJ to GJ (divide by 1000)
        // BRSR typically reports in MJ, but we convert to GJ for consistency
        const energyFields = [
            'p6_e1_grand_total_fy',
            'p6_e1_renew_elec_fy',
            'p6_e1_renew_fuel_fy',
            'p6_e1_total_renew_fy',
            'p6_e1_non_renew_elec_fy',
            'p6_e1_non_renew_fuel_fy',
            'p6_e1_total_non_renew_fy',
            'p6_energy_total',
            'p6_e1_applicability'
        ];

        energyFields.forEach(field => {
            if (normalized[field] && typeof normalized[field] === 'number') {
                // Assuming input is in MJ, convert to GJ
                normalized[field + '_gj'] = normalized[field] / 1000;
            }
        });

        // GHG emissions: Already in tCO2e (tonnes), keep as is
        // But if values are very large, they might be in kg or other units
        const ghgFields = [
            'p6_ghg_scope1',
            'p6_ghg_scope2',
            'p6_ghg_scope3',
            'p6_e7_scope1_fy',
            'p6_e7_scope2_fy',
            'p6_l2_scope3_fy'
        ];

        ghgFields.forEach(field => {
            if (normalized[field] && typeof normalized[field] === 'number') {
                // If value > 1000000, it might be in kg, convert to tonnes
                if (normalized[field] > 1000000) {
                    console.warn(`[BRSR Parser] ${field} value ${normalized[field]} appears to be in kg, converting to tonnes`);
                    normalized[field + '_original'] = normalized[field];
                    normalized[field] = normalized[field] / 1000;
                }
            }
        });

        // Water: BRSR uses KL, keep as is
        // 1 KL = 1 m³, so no conversion needed
        const waterFields = [
            'p6_water_withdrawal',
            'p6_e3_total_withdrawal_fy',
            'p6_e3_total_consumption_fy'
        ];

        // Waste: Already in tonnes, keep as is
        const wasteFields = [
            'p6_waste_total',
            'p6_e9_total_generation_fy',
            'p6_waste_recycled',
            'p6_e9_recycled_fy',
            'p6_waste_reused',
            'p6_e9_reused_fy'
        ];

        return normalized;
    }

    /**
     * Get unit metadata for display purposes
     */
    getUnitMetadata(field, value) {
        // Define standard units for each field type
        const unitMap = {
            // Energy units (display in GJ for large values, MJ for small)
            energy: {
                base: 'GJ',
                display: value => value >= 1000 ? 'GJ' : 'MJ',
                conversion: value => value >= 1000 ? value : value * 1000,
                label: 'Energy',
                description: 'Gigajoules (GJ) or Megajoules (MJ)'
            },
            // GHG emissions (always tCO2e)
            ghg: {
                base: 'tCO2e',
                display: () => 'tCO2e',
                conversion: value => value,
                label: 'GHG Emissions',
                description: 'Tonnes CO2 equivalent'
            },
            // Water (KL)
            water: {
                base: 'KL',
                display: value => value >= 1000000 ? 'ML' : 'KL',
                conversion: value => value >= 1000000 ? value / 1000000 : value,
                label: 'Water',
                description: 'Kiloliters (KL) or Megaliters (ML)'
            },
            // Waste (tonnes)
            waste: {
                base: 'tonnes',
                display: () => 'tonnes',
                conversion: value => value,
                label: 'Waste',
                description: 'Metric tonnes'
            }
        };

        // Map field names to unit types
        if (field.includes('energy') || field.includes('e1') || field.includes('renew')) {
            return unitMap.energy;
        }
        if (field.includes('ghg') || field.includes('scope') || field.includes('e7') || field.includes('l2')) {
            return unitMap.ghg;
        }
        if (field.includes('water') || field.includes('e3')) {
            return unitMap.water;
        }
        if (field.includes('waste') || field.includes('e9')) {
            return unitMap.waste;
        }

        return null;
    }

    calculateMetrics(ind, prevInd) {
        const turnover = (typeof ind.turnover === 'number' && ind.turnover > 0) ? ind.turnover : 1;

        // Safe division with rounding to prevent long decimals
        const safeDiv = (n, d) => {
            if (!d || d === 0) return 0;
            const result = n / d;
            // Round to 4 decimal places for intensity values
            return Math.round(result * 10000) / 10000;
        };

        // Use standardized base unit fields (Energy=GJ, GHG=tCO2e, Water=KL, Waste=tonnes)
        // Fallback to raw fields with unit conversion
        const energyTotal = ind.p6_energy_total_gj ||
                           ind.p6_energy_total && ind.p6_energy_total / 1000 ||
                           ind.p6_e1_grand_total_fy && ind.p6_e1_grand_total_fy / 1000 || 0;

        const ghgTotal = (ind.p6_ghg_scope1 || 0) + (ind.p6_ghg_scope2 || 0) + (ind.p6_ghg_scope3 || 0);
        const prevGhgTotal = (prevInd.p6_ghg_scope1 || 0) + (prevInd.p6_ghg_scope2 || 0) + (prevInd.p6_ghg_scope3 || 0);

        const prevEnergyTotal = prevInd.p6_energy_total_gj ||
                               prevInd.p6_energy_total && prevInd.p6_energy_total / 1000 ||
                               prevInd.p6_e1_grand_total_fy && prevInd.p6_e1_grand_total_fy / 1000 || 0;

        // Intensity calculation: Convert turnover from INR to crores (1 crore = 10,000,000 INR)
        // Result is value/₹ Cr (e.g., GJ/₹ Cr, tCO2e/₹ Cr, KL/₹ Cr)
        const turnoverInCr = turnover / 10000000;

        return {
            energyIntensity: safeDiv(energyTotal, turnoverInCr),
            ghgIntensity: safeDiv(ghgTotal, turnoverInCr),
            waterIntensity: safeDiv(ind.p6_water_withdrawal || 0, turnoverInCr),
            wasteRecyclingRate: Math.round(safeDiv((ind.p6_waste_recycled || 0) + (ind.p6_waste_reused || 0), ind.p6_waste_total || 1) * 100 * 10) / 10 || 0,
            renewableEnergyShare: Math.round(safeDiv(ind.p6_renewable_total_gj || 0, energyTotal || 1) * 100 * 10) / 10 || 0,

            // Trends
            ghgTrend: this.calcTrend(ghgTotal, prevGhgTotal),
            energyTrend: this.calcTrend(energyTotal, prevEnergyTotal),

            genderDiversity: (ind.p3_total_employees_male != null && ind.p3_total_employees_female != null)
                ? safeDiv(ind.p3_total_employees_female, (ind.p3_total_employees_male + ind.p3_total_employees_female) || 1) * 100
                : safeDiv((ind.p3_total_employees || 0) - (ind.p3_permanent_employees || 0), ind.p3_total_employees || 1) * 100,
            csrSpendPct: (ind.p8_csr_spent || ind.p8_csr_spending) ? ((ind.p8_csr_spent || ind.p8_csr_spending) / turnover) * 100 : (ind.p8_csr_percentage ? parseFloat(String(ind.p8_csr_percentage)) : 0),

            // Qualitative Indicators (Numeric mapping)
            p2_score: ind.p2_sustainable_sourcing_pct > 0 ? 100 : 50,
            p4_score: ind.p4_stakeholder_engagement === 'Yes' || ind.p4_stakeholder_engagement === true ? 100 : 50,
            p5_score: ind.p5_human_rights_policy === 'Yes' ? 100 : 50,
            p7_score: ind.p7_policy_advocacy === 'Yes' ? 100 : 50,

            regulatoryCompliance: 100
        };
    }

    calcTrend(curr, prev) {
        if (!prev || prev === 0) return 0;
        return ((curr - prev) / prev) * 100;
    }

    calculateESGScore(metrics) {
        // Simple robust scoring
        let s = 0;
        if (metrics.renewableEnergyShare > 10) s += 20;
        if (metrics.wasteRecyclingRate > 50) s += 20;
        if (metrics.genderDiversity > 10) s += 20;
        if (metrics.ghgIntensity < 1) s += 20; // heuristic
        s += 20; // Baseline
        return Math.min(100, s);
    }
}

module.exports = new BRSRXBRLParser();

const mongoose = require('mongoose');

const brsrMasterReportSchema = mongoose.Schema({
    entity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Linking to the entity user
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'submitted', 'approved'],
        default: 'draft'
    },
    financialYear: {
        type: String,
        required: true
    },
    report_id: {
        type: Number
    },
    financial_year: {
        type: String
    },
    a_brief_on_types_of_customers_explanatory_text_block: {
        type: String
    },
    a_mechanism_for_zero_liquid_discharge_is_not_applicable_to_the_entity_explanatory_text_block: {
        type: String
    },
    action_taken: {
        type: String
    },
    action_taken_to_mitigate_significant_social_or_environmental_concerns_lineitems: {
        type: String
    },
    address_of_corporate_office_of_company: {
        type: String
    },
    address_of_registered_office_of_company: {
        type: String
    },
    amount_of_accounts_payable_during_the_year: {
        type: String
    },
    amount_of_compounding_fee: {
        type: String
    },
    amount_of_cost_incurred_on_well_being_measures: {
        type: String
    },
    amount_of_fines_or_penalties: {
        type: String
    },
    amount_of_investments_in_related_parties: {
        type: String
    },
    amount_of_loans_and_advances_given_to_related_parties: {
        type: String
    },
    amount_of_purchases_from_related_parties: {
        type: String
    },
    amount_of_purchases_from_top_ten_trading_houses: {
        type: String
    },
    amount_of_purchases_from_trading_houses: {
        type: String
    },
    amount_of_re_used: {
        type: String
    },
    amount_of_recycled: {
        type: String
    },
    amount_of_safely_disposed: {
        type: String
    },
    amount_of_sales_to_dealers_or_distributors: {
        type: String
    },
    amount_of_sales_to_related_parties: {
        type: String
    },
    amount_of_sales_to_top_ten_dealers_or_distributors: {
        type: String
    },
    amount_of_settlement: {
        type: String
    },
    amount_of_total_investments: {
        type: String
    },
    amount_of_total_loans_and_advances: {
        type: String
    },
    amount_of_total_purchases: {
        type: String
    },
    amount_of_total_purchases_for_share_of_related_party_transactions: {
        type: String
    },
    amount_of_total_purchases_from_trading_houses: {
        type: String
    },
    amount_of_total_sales: {
        type: String
    },
    amount_of_total_sales_for_share_of_related_party_transactions: {
        type: String
    },
    amount_of_total_sales_to_dealers_or_distributors: {
        type: String
    },
    amount_spent_for_csr_projects_undertaken: {
        type: String
    },
    amounts_paid_to_pa_fs: {
        type: String
    },
    an_occupational_health_and_safety_management_system_has_been_not_applicable_to_the_entity_explanatory_text_block: {
        type: String
    },
    anti_corruption_or_anti_bribery_policy_explanatory_text_block: {
        type: String
    },
    any_fines_or_penalties_or_action_taken_by_regulatory_agencies_such_as_pollution_control_boards_or_by_courts: {
        type: String
    },
    any_independent_assessment_or_evaluation_or_assurance_has_been_carried_out_by_an_external_agency_for_energy_consumption: {
        type: String
    },
    any_independent_assessment_or_evaluation_or_assurance_has_been_carried_out_by_an_external_agency_for_water_withdrawal: {
        type: String
    },
    any_other_reasons_if_policies_not_cover_each_principle_and_its_core_elements_of_the_ngrb_cs_explanatory_text_block: {
        type: String
    },
    are_the_premises_or_offices_of_the_entity_accessible_to_differently_abled_employees_and_workers: {
        type: String
    },
    aspirational_district_of_csr_projects_undertaken: {
        type: String
    },
    assurance_sub_type_for_a_preferential_procurement_policy_where_preference_to_purchase_from_suppliers_comprising_marginalized_or_vulnerable_groups_and_its_percentage_of_total_procurement_by_value_does_it_constitute: {
        type: String
    },
    assurance_sub_type_for_address_of_corporate_office_of_company: {
        type: String
    },
    assurance_sub_type_for_address_of_registered_office_of_company: {
        type: String
    },
    assurance_sub_type_for_assessments_of_your_plants_and_offices_that_were_assessed_for_the_year_p3: {
        type: String
    },
    assurance_sub_type_for_assessments_of_your_plants_and_offices_that_were_assessed_for_the_year_p5: {
        type: String
    },
    assurance_sub_type_for_awareness_programmes_conducted_for_value_chain_partners_on_any_of_the_principles_during_the_financial_year: {
        type: String
    },
    assurance_sub_type_for_complaints_filed_under_the_sexual_harassment_of_women_at_workplace: {
        type: String
    },
    assurance_sub_type_for_complaints_or_grievances_on_any_of_the_principles_under_the_national_guidelines_on_responsible_business_conduct: {
        type: String
    },
    assurance_sub_type_for_compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances: {
        type: String
    },
    assurance_sub_type_for_corporate_identity_number: {
        type: String
    },
    assurance_sub_type_for_data_breaches_information_like_number_of_instances_of_data_breaches_along_with_impact_and_percentage_of_data_breaches_involving_personally_identifiable_information_of_customers: {
        type: String
    },
    assurance_sub_type_for_describe_the_mechanisms_to_receive_and_redress_grievances_of_the_community: {
        type: String
    },
    assurance_sub_type_for_describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_plastics_including_packaging_e_waste_hazardous_waste_and_other_waste: {
        type: String
    },
    assurance_sub_type_for_details_and_weblink_of_an_anti_corruption_or_anti_bribery_policy_is_place: {
        type: String
    },
    assurance_sub_type_for_details_of_a_business_process_being_modified_or_introduced_as_a_result_of_addressing_human_rights_grievances_or_complaints: {
        type: String
    },
    assurance_sub_type_for_details_of_actions_taken_to_mitigate_any_negative_social_impacts_identified_in_the_social_impact_assessments: {
        type: String
    },
    assurance_sub_type_for_details_of_air_emissions_other_than_ghg_emissions_by_the_entity: {
        type: String
    },
    assurance_sub_type_for_details_of_any_corrective_action_taken_or_underway_on_issues_related_to_fines_or_penalties_or_action_taken_by_regulators_or_law_enforcement_agencies_or_judicial_institutions_on_cases_of_corruption_and_conflicts_of_interest: {
        type: String
    },
    assurance_sub_type_for_details_of_any_corrective_action_taken_or_underway_to_address_safety_related_incidents_of_your_plants_and_offices_that_were_assessed: {
        type: String
    },
    assurance_sub_type_for_details_of_any_corrective_action_taken_or_underway_to_address_safety_related_incidents_on_assessment_of_value_chain_partners: {
        type: String
    },
    assurance_sub_type_for_details_of_any_corrective_actions_taken_or_underway_on_issues_relating_to_advertising_and_delivery_of_essential_services_or_cyber_security_and_data_privacy_or_recalls_or_penalty_or_action_taken_by_regulatory_authorities_on_safety_of_products_or_services: {
        type: String
    },
    assurance_sub_type_for_details_of_any_corrective_actions_taken_or_underway_to_address_significant_risks_or_concerns_arising_from_the_assessments_of_plant_and_office: {
        type: String
    },
    assurance_sub_type_for_details_of_any_corrective_actions_taken_or_underway_to_address_significant_risks_or_concerns_arising_from_the_assessments_of_value_chain_partner: {
        type: String
    },
    assurance_sub_type_for_details_of_beneficiaries_of_csr_projects: {
        type: String
    },
    assurance_sub_type_for_details_of_business_activities_accounting_for_ninety_percent_of_the_turnover: {
        type: String
    },
    assurance_sub_type_for_details_of_csr_projects_undertaken_in_designated_aspirational_districts_as_identified_by_government_bodies: {
        type: String
    },
    assurance_sub_type_for_details_of_complaints_made_by_employees_and_workers_as_per_p3: {
        type: String
    },
    assurance_sub_type_for_details_of_complaints_made_by_employees_and_workers_as_per_p5: {
        type: String
    },
    assurance_sub_type_for_details_of_complaints_with_regard_to_conflict_of_interest: {
        type: String
    },
    assurance_sub_type_for_details_of_concentration_of_purchases_and_sales_with_trading_houses_dealers_and_related_parties_along_with_loans_and_advances_and_investments_with_related_parties: {
        type: String
    },
    assurance_sub_type_for_details_of_corrective_action_taken_or_underway_on_any_issues_related_to_anti_competitive_conduct_by_the_entity_based_on_adverse_orders_from_regulatory_authorities: {
        type: String
    },
    assurance_sub_type_for_details_of_corrective_actions_taken_or_underway_based_on_any_adverse_order_in_intellectual_property_related_disputes_wherein_usage_of_traditional_knowledge_is_involved: {
        type: String
    },
    assurance_sub_type_for_details_of_employees_as_at_the_end_of_financial_year: {
        type: String
    },
    assurance_sub_type_for_details_of_environmental_impact_assessments_of_projects_undertaken_by_the_entity_based_on_applicable_laws: {
        type: String
    },
    assurance_sub_type_for_details_of_financial_year_for_which_reporting_is_being_done: {
        type: String
    },
    assurance_sub_type_for_details_of_fines_or_penalties_or_punishment_or_award_or_compounding_fees_or_settlement: {
        type: String
    },
    assurance_sub_type_for_details_of_green_house_gas_emissions_and_its_intensity: {
        type: String
    },
    assurance_sub_type_for_details_of_instances_of_engagement_with_and_actions_taken_to_address_the_concerns_of_vulnerable_or_marginalized_stakeholder_groups: {
        type: String
    },
    assurance_sub_type_for_details_of_instances_of_product_recalls_on_account_of_safety_issues: {
        type: String
    },
    assurance_sub_type_for_details_of_measures_for_the_well_being_of_employees_and_workers_and_spending_on_it: {
        type: String
    },
    assurance_sub_type_for_details_of_measures_undertaken_by_the_entity_to_ensure_that_statutory_dues_have_been_deducted_and_deposited_by_the_value_chain_partners: {
        type: String
    },
    assurance_sub_type_for_details_of_median_of_remuneration_or_salary_or_wages_and_wages_paid_to_female: {
        type: String
    },
    assurance_sub_type_for_details_of_minimum_wages_paid_to_employees_and_workers: {
        type: String
    },
    assurance_sub_type_for_details_of_number_of_consumer_complaints_p9: {
        type: String
    },
    assurance_sub_type_for_details_of_number_of_locations_where_plants_and_or_operations_or_offices_of_the_entity_are_situated: {
        type: String
    },
    assurance_sub_type_for_details_of_operations_or_offices_in_or_around_ecologically_sensitive_areas_where_environmental_approvals_or_clearances_are_required: {
        type: String
    },
    assurance_sub_type_for_details_of_percentage_of_recycled_or_reused_input_material_to_total_material_by_value_used_in_production_or_providing_services: {
        type: String
    },
    assurance_sub_type_for_details_of_performance_and_career_development_reviews_of_employees_and_worker: {
        type: String
    },
    assurance_sub_type_for_details_of_projects_for_which_ongoing_rehabilitation_and_resettlement_is_being_undertaken_by_entity: {
        type: String
    },
    assurance_sub_type_for_details_of_public_policy_positions_advocated_by_the_entity: {
        type: String
    },
    assurance_sub_type_for_details_of_reclaimed_products_and_their_packaging_materials_for_each_product_category: {
        type: String
    },
    assurance_sub_type_for_details_of_retirement_benefits: {
        type: String
    },
    assurance_sub_type_for_details_of_safety_related_incidents: {
        type: String
    },
    assurance_sub_type_for_details_of_significant_direct_and_indirect_impact_of_the_entity_on_biodiversity_in_such_areas_along_with_prevention_and_remediation_activities: {
        type: String
    },
    assurance_sub_type_for_details_of_significant_social_or_environmental_concerns_from_production_or_disposal_of_product_or_service_with_action_taken_to_mitigate_the_same: {
        type: String
    },
    assurance_sub_type_for_details_of_social_impact_assessments_of_projects_undertaken_by_the_entity_based_on_applicable_laws: {
        type: String
    },
    assurance_sub_type_for_details_of_the_appeal_or_revision_preferred_in_cases_where_monetary_or_non_monetary_action_has_been_appealed: {
        type: String
    },
    assurance_sub_type_for_details_of_the_benefits_derived_and_shared_from_the_intellectual_properties_owned_or_acquired: {
        type: String
    },
    assurance_sub_type_for_details_of_the_disclosures_related_to_water_discharged: {
        type: String
    },
    assurance_sub_type_for_details_of_the_disclosures_related_to_water_withdrawal: {
        type: String
    },
    assurance_sub_type_for_details_of_the_highest_authority_responsible_for_implementation_and_oversight_of_the_business_responsibility_policy: {
        type: String
    },
    assurance_sub_type_for_details_of_the_scope_and_coverage_of_any_human_rights_due_diligence_conducted: {
        type: String
    },
    assurance_sub_type_for_details_of_the_stock_exchange_where_the_company_is_listed: {
        type: String
    },
    assurance_sub_type_for_details_of_total_energy_consumption_in_joules_or_multiples_and_energy_intensity: {
        type: String
    },
    assurance_sub_type_for_details_of_total_scope3_emissions_and_its_intensity: {
        type: String
    },
    assurance_sub_type_for_details_of_training_given_to_employees_and_workers: {
        type: String
    },
    assurance_sub_type_for_details_of_waste_management_practices_adopted_in_your_establishments_and_the_strategy_adopted_by_company_to_reduce_usage_of_hazardous_and_toxic_chemicals: {
        type: String
    },
    assurance_sub_type_for_details_on_assessment_of_value_chain_partners_p3: {
        type: String
    },
    assurance_sub_type_for_details_on_assessment_of_value_chain_partners_p5: {
        type: String
    },
    assurance_sub_type_for_details_related_to_waste_management_by_the_entity: {
        type: String
    },
    assurance_sub_type_for_disclose_any_significant_adverse_impact_to_the_environment_arising_from_the_value_chain_of_the_entity_what_mitigation_or_adaptation_measures_have_been_taken_by_the_entity_in_this_regard: {
        type: String
    },
    assurance_sub_type_for_e_mail_of_the_company: {
        type: String
    },
    assurance_sub_type_for_employees_and_workers_who_have_been_provided_training_on_human_rights_issues_and_policies_of_the_entity: {
        type: String
    },
    assurance_sub_type_for_green_credits_have_been_generated_or_procured_by_the_listed_entity_and_top_ten_value_chain_partners_is_assured_by_assurer: {
        type: String
    },
    assurance_sub_type_for_health_and_safety_management_system: {
        type: String
    },
    assurance_sub_type_for_human_rights_requirements_form_part_of_your_business_agreements_and_contracts: {
        type: String
    },
    assurance_sub_type_for_job_creation_in_smaller_towns_disclose_wages_paid_to_persons_employed_including_employees_or_workers_employed_on_a_permanent_or_non_permanent_or_on_contract_basis: {
        type: String
    },
    assurance_sub_type_for_list_stakeholder_groups_identified_as_key_for_your_entity_and_the_frequency_of_engagement_with_each_stakeholder_group: {
        type: String
    },
    assurance_sub_type_for_markets_served_by_the_entity: {
        type: String
    },
    assurance_sub_type_for_measures_taken_by_the_entity_to_ensure_a_safe_and_healthy_work_place: {
        type: String
    },
    assurance_sub_type_for_mechanisms_in_place_to_inform_consumers_of_any_risk_of_disruption_or_discontinuation_of_essential_services: {
        type: String
    },
    assurance_sub_type_for_mechanisms_to_prevent_adverse_consequences_to_the_complainant_in_discrimination_and_harassment_cases: {
        type: String
    },
    assurance_sub_type_for_name_and_contact_details_of_the_contact_person_in_case_of_any_queries_on_the_brsr_report: {
        type: String
    },
    assurance_sub_type_for_name_of_the_company: {
        type: String
    },
    assurance_sub_type_for_name_of_the_national_and_international_codes_or_certifications_or_labels_or_standards_adopted_by_your_entity_and_mapped_to_each_principle: {
        type: String
    },
    assurance_sub_type_for_names_of_holding_subsidiary_associate_companies_joint_ventures: {
        type: String
    },
    assurance_sub_type_for_number_of_days_of_accounts_payables: {
        type: String
    },
    assurance_sub_type_for_number_of_directors_or_km_ps_or_employees_or_workers_against_whom_disciplinary_action_was_taken_by_any_law_enforcement_agency_for_the_charges_of_bribery_or_corruption: {
        type: String
    },
    assurance_sub_type_for_overview_of_the_entitys_material_responsible_business_conduct_issues: {
        type: String
    },
    assurance_sub_type_for_participation_or_inclusion_or_representation_of_women: {
        type: String
    },
    assurance_sub_type_for_percentage_coverage_by_training_and_awareness_programs_on_any_of_the_principles_during_the_financial_year_for_bod_or_kmp_or_employee_or_worker: {
        type: String
    },
    assurance_sub_type_for_percentage_of_input_material_inputs_to_total_inputs_by_value_sourced_from_suppliers: {
        type: String
    },
    assurance_sub_type_for_percentage_of_r_and_d_and_capital_expenditure_investments_in_specific_technologies: {
        type: String
    },
    assurance_sub_type_for_percentage_of_value_chain_partners_by_value_of_business_done_with_such_partners_that_were_assessed_for_environmental_impacts: {
        type: String
    },
    assurance_sub_type_for_performance_against_above_policies_and_follow_up_action: {
        type: String
    },
    assurance_sub_type_for_performance_of_the_entity_against_the_specific_commitments_goals_and_targets_along_with_reasons_in_case_the_same_are_not_met: {
        type: String
    },
    assurance_sub_type_for_products_or_services_sold_by_the_entity_accounting_for_ninety_percent_of_the_turnover: {
        type: String
    },
    assurance_sub_type_for_reasons_if_policies_not_cover_each_principle_and_its_core_elements_of_the_ngrb_cs: {
        type: String
    },
    assurance_sub_type_for_reporting_boundary: {
        type: String
    },
    assurance_sub_type_for_return_to_work_and_retention_rates_of_permanent_employees_and_workers_that_took_parental_leave: {
        type: String
    },
    assurance_sub_type_for_specific_commitments_goals_and_targets_set_by_the_entity_with_defined_timelines: {
        type: String
    },
    assurance_sub_type_for_statement_by_director_responsible_for_the_business_responsibility_report_highlighting_esg_related_challenges_targets_and_achievements: {
        type: String
    },
    assurance_sub_type_for_steps_taken_to_inform_and_educate_consumers_about_safe_and_responsible_usage_of_products_and_or_services: {
        type: String
    },
    assurance_sub_type_for_telephone_of_company: {
        type: String
    },
    assurance_sub_type_for_the_entity_has_undertaken_any_specific_initiatives_or_used_innovative_technology_or_solutions_to_improve_resource_efficiency: {
        type: String
    },
    assurance_sub_type_for_the_entity_have_procedures_in_place_for_sustainable_sourcing_and_percentage_of_inputs_were_sourced_sustainably: {
        type: String
    },
    assurance_sub_type_for_the_entity_implemented_a_mechanism_for_zero_liquid_discharge: {
        type: String
    },
    assurance_sub_type_for_the_internal_mechanisms_in_place_to_redress_grievances_related_to_human_rights_issues: {
        type: String
    },
    assurance_sub_type_for_the_mechanisms_in_place_to_receive_and_respond_to_consumer_complaints_and_feedback: {
        type: String
    },
    assurance_sub_type_for_the_premises_or_offices_of_the_entity_accessible_to_differently_abled_employees_and_workers_and_steps_are_being_taken_by_the_entity_if_the_premises_or_offices_of_the_entity_not_accessible: {
        type: String
    },
    assurance_sub_type_for_the_processes_for_consultation_between_stakeholders_and_the_board_on_economic_environmental_and_social_topics_or_if_consultation_is_delegated_how_is_feedback_from_such_consultations_provided_to_the_board: {
        type: String
    },
    assurance_sub_type_for_the_processes_for_identifying_key_stakeholder_groups_of_the_entity: {
        type: String
    },
    assurance_sub_type_for_the_products_and_packaging_reclaimed_at_end_of_life_of_products_amount_reused_or_recycled_or_safely_disposed: {
        type: String
    },
    assurance_sub_type_for_turnover_of_products_and_or_services_as_a_percentage_of_turnover_from_all_products_or_service_that_carry_information_about_as_a_percentage_to_total_turnover: {
        type: String
    },
    assurance_sub_type_for_turnover_rate_for_permanent_employees_and_workers_disclose_trends_for_past_three_years: {
        type: String
    },
    assurance_sub_type_for_value_of_shares_paid_up: {
        type: String
    },
    assurance_sub_type_for_water_withdrawal_or_consumption_and_discharge_in_areas_of_water_stress_in_kilolitres: {
        type: String
    },
    assurance_sub_type_for_weblink_where_information_on_products_and_services_of_the_entity_can_be_accessed: {
        type: String
    },
    assurance_sub_type_for_website_of_company: {
        type: String
    },
    assurance_sub_type_for_whether_csr_is_applicable_as_per_section135_of_companies_act2013: {
        type: String
    },
    assurance_sub_type_for_whether_do_you_have_a_focal_point_responsible_for_addressing_human_rights_impacts_or_issues_caused_or_contributed_to_by_the_business: {
        type: String
    },
    assurance_sub_type_for_whether_is_there_a_mechanism_available_to_receive_and_redress_grievances_for_the_following_categories_of_employees_and_worker: {
        type: String
    },
    assurance_sub_type_for_whether_stakeholder_consultation_is_used_to_support_the_identification_and_management_of_environmental_and_social_topics: {
        type: String
    },
    assurance_sub_type_for_whether_the_enlisted_policies_extend_to_your_value_chain_partners: {
        type: String
    },
    assurance_sub_type_for_whether_the_entity_compliant_with_the_applicable_environmental_law: {
        type: String
    },
    assurance_sub_type_for_whether_the_entity_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services: {
        type: String
    },
    assurance_sub_type_for_whether_the_entity_display_product_information_on_the_product_over_and_above_what_is_mandated_as_per_local_laws: {
        type: String
    },
    assurance_sub_type_for_whether_the_entity_extend_any_life_insurance_or_any_compensatory_package_in_the_event_of_death_of_employees: {
        type: String
    },
    assurance_sub_type_for_whether_the_entity_has_carried_out_independent_assessment_evaluation_of_the_working_of_its_policies_by_an_external_agency: {
        type: String
    },
    assurance_sub_type_for_whether_the_entity_has_translated_the_policy_into_procedures: {
        type: String
    },
    assurance_sub_type_for_whether_the_entity_have_a_business_continuity_and_disaster_management_plan: {
        type: String
    },
    assurance_sub_type_for_whether_the_entity_have_a_framework_or_policy_on_cyber_security_and_risks_related_to_data_privacy: {
        type: String
    },
    assurance_sub_type_for_whether_the_entity_have_a_specified_committee_of_the_board_or_director_responsible_for_decision_making_on_sustainability_related_issues: {
        type: String
    },
    assurance_sub_type_for_whether_the_entity_have_an_equal_opportunity_policy_as_per_the_rights_of_persons_with_disabilities_act2016: {
        type: String
    },
    assurance_sub_type_for_whether_the_entity_have_any_project_related_to_reducing_green_house_gas_emission: {
        type: String
    },
    assurance_sub_type_for_whether_the_entity_have_any_sites_or_facilities_identified_as_designated_consumers_under_the_performance_achieve_and_trade_scheme_of_the_government_of_india: {
        type: String
    },
    assurance_sub_type_for_whether_the_entity_provide_transition_assistance_programs_to_facilitate_continued_employability_and_the_management_of_career_endings_resulting_from_retirement_or_termination_of_employment: {
        type: String
    },
    assurance_sub_type_for_whether_the_premise_or_office_of_the_entity_accessible_to_differently_abled_visitors_as_per_the_requirements_of_the_rights_of_persons_with_disabilities_act2016: {
        type: String
    },
    assurance_sub_type_for_whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards_and_steps_taken_to_address_the_waste_collection_plan_if_not_submitted: {
        type: String
    },
    assurance_sub_type_for_whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs: {
        type: String
    },
    assurance_sub_type_for_year_of_incorporation: {
        type: String
    },
    assurer_has_assured_whether_do_you_have_a_focal_point_responsible_for_addressing_human_rights_impacts_or_issues_caused_or_contributed_to_by_the_business: {
        type: String
    },
    assurer_has_assured_whether_is_there_a_mechanism_available_to_receive_and_redress_grievances_for_the_following_categories_of_employees_and_worker: {
        type: String
    },
    assurer_has_assured_whether_stakeholder_consultation_is_used_to_support_the_identification_and_management_of_environmental_and_social_topics: {
        type: String
    },
    assurer_has_assured_whether_the_enlisted_policies_extend_to_your_value_chain_partners: {
        type: String
    },
    assurer_has_assured_whether_the_entity_compliant_with_the_applicable_environmental_law: {
        type: String
    },
    assurer_has_assured_whether_the_entity_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services: {
        type: String
    },
    assurer_has_assured_whether_the_entity_display_product_information_on_the_product_over_and_above_what_is_mandated_as_per_local_laws: {
        type: String
    },
    assurer_has_assured_whether_the_entity_extend_any_life_insurance_or_any_compensatory_package_in_the_event_of_death_of_employees: {
        type: String
    },
    assurer_has_assured_whether_the_entity_has_carried_out_independent_assessment_evaluation_of_the_working_of_its_policies_by_an_external_agency: {
        type: String
    },
    assurer_has_assured_whether_the_entity_has_translated_the_policy_into_procedures: {
        type: String
    },
    assurer_has_assured_whether_the_entity_have_a_business_continuity_and_disaster_management_plan: {
        type: String
    },
    assurer_has_assured_whether_the_entity_have_a_framework_or_policy_on_cyber_security_and_risks_related_to_data_privacy: {
        type: String
    },
    assurer_has_assured_whether_the_entity_have_a_specified_committee_of_the_board_or_director_responsible_for_decision_making_on_sustainability_related_issues: {
        type: String
    },
    assurer_has_assured_whether_the_entity_have_an_equal_opportunity_policy_as_per_the_rights_of_persons_with_disabilities_act2016: {
        type: String
    },
    assurer_has_assured_whether_the_entity_have_any_project_related_to_reducing_green_house_gas_emission: {
        type: String
    },
    assurer_has_assured_whether_the_entity_have_any_sites_or_facilities_identified_as_designated_consumers_under_the_performance_achieve_and_trade_scheme_of_the_government_of_india: {
        type: String
    },
    assurer_has_assured_whether_the_entity_provide_transition_assistance_programs_to_facilitate_continued_employability_and_the_management_of_career_endings_resulting_from_retirement_or_termination_of_employment: {
        type: String
    },
    assurer_has_assured_whether_the_premise_or_office_of_the_entity_accessible_to_differently_abled_visitors_as_per_the_requirements_of_the_rights_of_persons_with_disabilities_act2016: {
        type: String
    },
    assurer_has_assured_whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards_and_steps_taken_to_address_the_waste_collection_plan_if_not_submitted: {
        type: String
    },
    assurer_has_assured_whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs: {
        type: String
    },
    average_number_of_female_employees_or_workers_at_the_beginning_of_the_year_and_as_at_end_of_the_year: {
        type: String
    },
    basis_of_calculating_benefit_share: {
        type: String
    },
    battery_waste: {
        type: String
    },
    benefit_shared: {
        type: String
    },
    bio_medical_waste: {
        type: String
    },
    boundary_for_which_the_life_cycle_perspective_or_assessment_was_conducted: {
        type: String
    },
    brief_of_any_issues_related_to_anti_competitive_conduct_by_the_entity: {
        type: String
    },
    brief_of_the_case_for_intellectual_property_related_disputes: {
        type: String
    },
    brief_of_the_monetary_case_for_compounding_fee_explanatory_text_block: {
        type: String
    },
    brief_of_the_monetary_case_for_imprisonment_explanatory_text_block: {
        type: String
    },
    brief_of_the_monetary_case_for_penalty_or_fine_explanatory_text_block: {
        type: String
    },
    brief_of_the_monetary_case_for_punishment_explanatory_text_block: {
        type: String
    },
    brief_of_the_monetary_case_for_settlement_explanatory_text_block: {
        type: String
    },
    csr_project: {
        type: String
    },
    category_of_company: {
        type: String
    },
    channels_of_communication: {
        type: String
    },
    company_id_or_llpid_or_firm_id_of_assessment_or_assurance_provider: {
        type: String
    },
    complaints_on_posh_up_held: {
        type: String
    },
    compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_frequency: {
        type: String
    },
    compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_indicate_whether_review_was_undertaken_by: {
        type: String
    },
    construction_and_demolition_waste: {
        type: String
    },
    consumer_complaints_pending_resolution_at_end_of_year: {
        type: String
    },
    consumer_complaints_received_during_the_year: {
        type: String
    },
    contact_number_of_contact_person: {
        type: String
    },
    corporate_identity_number: {
        type: String
    },
    corrective_action_taken_for_any_issues_related_to_anti_competitive_conduct_by_the_entity: {
        type: String
    },
    corrective_action_taken_for_initiative: {
        type: String
    },
    corrective_action_taken_for_intellectual_property_related_disputes: {
        type: String
    },
    corrective_action_taken_for_negative_social_impact_identified: {
        type: String
    },
    corrective_action_taken_for_non_compliance: {
        type: String
    },
    cost_of_goods_or_services_procured_during_the_year: {
        type: String
    },
    country_of_other_stock_exchange: {
        type: String
    },
    date_of_end_of_financial_year: {
        type: String
    },
    date_of_end_of_previous_year: {
        type: String
    },
    date_of_end_of_prior_to_previous_year: {
        type: String
    },
    date_of_environmental_impact_assessments: {
        type: String
    },
    date_of_incorporation: {
        type: String
    },
    date_of_notification: {
        type: String
    },
    date_of_signing_by_assessor_or_assurer: {
        type: String
    },
    date_of_start_of_financial_year: {
        type: String
    },
    date_of_start_of_previous_year: {
        type: String
    },
    date_of_start_of_prior_to_previous_year: {
        type: String
    },
    deducted_and_deposited_with_the_authority: {
        type: String
    },
    desclosure_of_the_processes_used_to_identify_work_related_hazards_and_assess_risks_on_a_routine_and_non_routine_basis_by_the_entity_explanatory_text_block: {
        type: String
    },
    describe_the_internal_mechanisms_in_place_to_redress_grievances_related_to_human_rights_issues_explanatory_text_block: {
        type: String
    },
    describe_the_measures_taken_by_the_entity_to_ensure_a_safe_and_healthy_work_place_explanatory_text_block: {
        type: String
    },
    describe_the_mechanisms_in_place_to_receive_and_respond_to_consumer_complaints_and_feedback_explanatory_text_block: {
        type: String
    },
    describe_the_mechanisms_to_receive_and_redress_grievances_of_the_community_explanatory_text_block: {
        type: String
    },
    describe_the_processes_for_identifying_key_stakeholder_groups_of_the_entity_explanatory_text_block: {
        type: String
    },
    describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_e_waste_explanatory_text_block: {
        type: String
    },
    describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_hazardous_waste_explanatory_text_block: {
        type: String
    },
    describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_other_waste_explanatory_text_block: {
        type: String
    },
    describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_plastics_including_packaging_explanatory_text_block: {
        type: String
    },
    description_of_business_activity: {
        type: String
    },
    description_of_main_activity: {
        type: String
    },
    description_of_other_committee_for_compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification: {
        type: String
    },
    description_of_other_committee_for_performance_against_above_policies_and_follow_up_action: {
        type: String
    },
    description_of_other_frequency_for_compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances: {
        type: String
    },
    description_of_other_frequency_for_performance_against_above_policies_and_follow_up_action: {
        type: String
    },
    description_of_other_stock_exchange_where_the_company_is_listed: {
        type: String
    },
    description_of_the_risk_or_concern: {
        type: String
    },
    designation_of_assessor_or_assurer: {
        type: String
    },
    details_for_grievance_redressal_mechanism_in_place_is_not_applicable_explanatory_text_block: {
        type: String
    },
    details_for_the_entity_have_not_applicable_an_anti_corruption_or_anti_bribery_policy_explanatory_text_block: {
        type: String
    },
    details_if_the_employees_or_worker_of_the_entity_have_access_to_non_occupational_medical_and_healthcare_services_is_not_applicable_explanatory_text_block: {
        type: String
    },
    details_of_a_business_process_being_modified_or_introduced_as_a_result_of_addressing_human_rights_grievances_or_complaints_explanatory_text_block: {
        type: String
    },
    details_of_actions_taken_to_mitigate_any_negative_social_impacts_identified_in_the_social_impact_assessments_lineitems: {
        type: String
    },
    details_of_any_corrective_action_taken_or_underway_on_issues_related_to_fines_or_penalties_or_action_taken_by_regulators_or_law_enforcement_agencies_or_judicial_institutions_on_cases_of_corruption_and_conflicts_of_interest_explanatory_text_block: {
        type: String
    },
    details_of_any_corrective_action_taken_or_underway_to_address_safety_related_incidents_of_your_plants_and_offices_that_were_assessed_explanatory_text_block: {
        type: String
    },
    details_of_any_corrective_action_taken_or_underway_to_address_safety_related_incidents_on_assessment_of_value_chain_partners_explanatory_text_block: {
        type: String
    },
    details_of_any_corrective_actions_taken_or_underway_on_issues_relating_to_advertising_and_delivery_of_essential_services_or_cyber_security_and_data_privacy_or_recalls_or_penalty_or_action_taken_by_regulatory_authorities_on_safety_of_products_or_services_explanatory_text_block: {
        type: String
    },
    details_of_any_corrective_actions_taken_or_underway_to_address_significant_risks_or_concerns_arising_from_the_assessments_of_plant_and_office_explanatory_text_block: {
        type: String
    },
    details_of_any_corrective_actions_taken_or_underway_to_address_significant_risks_or_concerns_arising_from_the_assessments_of_value_chain_partner_explanatory_text_block: {
        type: String
    },
    details_of_beneficiaries_of_csr_projects_lineitems: {
        type: String
    },
    details_of_csr_projects_undertaken_in_designated_aspirational_districts_as_identified_by_government_bodies_lineitems: {
        type: String
    },
    details_of_coverage_and_implementation_if_for_zero_liquid_discharge_explanatory_text_block: {
        type: String
    },
    details_of_impact_of_data_breaches_explanatory_text_block: {
        type: String
    },
    details_of_improvements_in_environmental_and_social_impacts_due_to_capex: {
        type: String
    },
    details_of_improvements_in_environmental_and_social_impacts_due_to_r_and_d: {
        type: String
    },
    details_of_instances_as_to_how_the_inputs_received_from_stakeholders_on_these_topics_were_incorporated_into_policies_and_activities_of_the_entity_explanatory_text_block: {
        type: String
    },
    details_of_instances_of_engagement_with_and_actions_taken_to_address_the_concerns_of_vulnerable_marginalized_stakeholder_groups_explanatory_text_block: {
        type: String
    },
    details_of_measures_undertaken_by_the_entity_to_ensure_that_statutory_dues_have_been_deducted_and_deposited_by_the_value_chain_partners_explanatory_text_block: {
        type: String
    },
    details_of_mechanism_available_to_receive_and_redress_grievances_for_other_than_permanent_employees_explanatory_text_block: {
        type: String
    },
    details_of_mechanism_available_to_receive_and_redress_grievances_for_other_than_permanent_workers_explanatory_text_block: {
        type: String
    },
    details_of_mechanism_available_to_receive_and_redress_grievances_for_permanent_employees_explanatory_text_block: {
        type: String
    },
    details_of_mechanism_available_to_receive_and_redress_grievances_for_permanent_workers_explanatory_text_block: {
        type: String
    },
    details_of_negative_social_impact_identified: {
        type: String
    },
    details_of_occupational_health_and_safety_management_system_explanatory_text_block: {
        type: String
    },
    details_of_other_channels_of_communication: {
        type: String
    },
    details_of_other_frequency_of_engagement: {
        type: String
    },
    details_of_product_information_on_the_product_over_and_above_what_is_mandated_as_per_local_laws_explanatory_text_block: {
        type: String
    },
    details_of_project_related_to_reducing_green_house_gas_emission_explanatory_text_block: {
        type: String
    },
    details_of_projects_for_which_ongoing_rehabilitation_and_resettlement_is_being_undertaken_by_entityline_items: {
        type: String
    },
    details_of_significant_direct_and_indirect_impact_of_the_entity_on_biodiversity_in_such_areas_along_with_prevention_and_remediation_activities_explanatory_text_block: {
        type: String
    },
    details_of_social_impact_assessments_of_projects_undertaken_by_the_entity_based_on_applicable_laws_lineitems: {
        type: String
    },
    details_of_specified_committee_of_the_board_or_director_responsible_for_decision_making_on_sustainability_related_issues_explanatory_text_block: {
        type: String
    },
    details_of_the_case: {
        type: String
    },
    details_of_the_entity_has_not_applicable_translated_the_policy_into_procedures_explanatory_text_block: {
        type: String
    },
    details_of_the_highest_authority_responsible_for_implementation_and_oversight_of_the_business_responsibility_policy_explanatory_text_block: {
        type: String
    },
    details_of_the_policy_is_not_applicable_explanatory_text_block: {
        type: String
    },
    details_of_the_scope_and_coverage_of_any_human_rights_due_diligence_conducted_explanatory_text_block: {
        type: String
    },
    details_of_waste_management_practices_adopted_in_your_establishments_and_the_strategy_adopted_by_company_to_reduce_usage_of_hazardous_and_toxic_chemicals_explanatory_text_block: {
        type: String
    },
    details_of_your_entitys_policy_or_policies_has_not_applicable_each_principle_and_its_core_elements_of_the_ngrb_cs_explanatory_text_block: {
        type: String
    },
    did_your_entity_carry_out_any_survey_with_regard_to_consumer_satisfaction_relating_to_the_major_products_or_services_of_the_entity_significant_locations_of_operation_of_the_entity_or_the_entity_as_a_whole: {
        type: String
    },
    disclose_any_significant_adverse_impact_to_the_environment_arising_from_the_value_chain_of_the_entity_what_mitigation_or_adaptation_measures_have_been_taken_by_the_entity_in_this_regard_explanatory_text_block: {
        type: String
    },
    disclose_wages_paid_to_persons_employed: {
        type: String
    },
    disclose_whether_targets_set_under_the_pat_scheme_have_been_achieved_in_case_targets_have_not_been_achieved_then_provide_the_remedial_action_taken_explanatory_text_block: {
        type: String
    },
    disclosure_web_link_of_entity_at_which_business_continuity_and_disaster_management_plan_is_placed: {
        type: String
    },
    district_of_project: {
        type: String
    },
    do_human_rights_requirements_form_part_of_your_business_agreements_and_contracts: {
        type: String
    },
    do_the_employees_or_worker_of_the_entity_have_access_to_non_occupational_medical_and_healthcare_services: {
        type: String
    },
    do_the_enlisted_policies_extend_to_your_value_chain_partners: {
        type: String
    },
    do_you_have_a_focal_point_responsible_for_addressing_human_rights_impacts_or_issues_caused_or_contributed_to_by_the_business: {
        type: String
    },
    do_you_have_a_preferential_procurement_policy_where_you_give_preference_to_purchase_from_suppliers_comprising_marginalized_or_vulnerable_groups: {
        type: String
    },
    does_company_participate_in_the_business_responsibility_initiatives_of_the_listed_entity: {
        type: String
    },
    does_the_entity_display_product_information_on_the_product_over_and_above_what_is_mandated_as_per_local_laws: {
        type: String
    },
    does_the_entity_extend_any_life_insurance_or_any_compensatory_package_in_the_event_of_death_of_employees: {
        type: String
    },
    does_the_entity_extend_any_life_insurance_or_any_compensatory_package_in_the_event_of_death_of_workers: {
        type: String
    },
    does_the_entity_have_a_business_continuity_and_disaster_management_plan: {
        type: String
    },
    does_the_entity_have_a_framework_or_policy_on_cyber_security_and_risks_related_to_data_privacy: {
        type: String
    },
    does_the_entity_have_a_specified_committee_of_the_board_or_director_responsible_for_decision_making_on_sustainability_related_issues: {
        type: String
    },
    does_the_entity_have_an_anti_corruption_or_anti_bribery_policy: {
        type: String
    },
    does_the_entity_have_an_equal_opportunity_policy_as_per_the_rights_of_persons_with_disabilities_act2016: {
        type: String
    },
    does_the_entity_have_any_project_related_to_reducing_green_house_gas_emission: {
        type: String
    },
    does_the_entity_have_any_sites_or_facilities_identified_as_designated_consumers_under_the_performance_achieve_and_trade_scheme_of_the_government_of_india: {
        type: String
    },
    does_the_entity_have_procedures_in_place_for_sustainable_sourcing: {
        type: String
    },
    does_the_entity_have_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board: {
        type: String
    },
    details_of_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board: {
        type: String
    },
    does_the_entity_provide_transition_assistance_programs_to_facilitate_continued_employability_and_the_management_of_career_endings_resulting_from_retirement_or_termination_of_employment: {
        type: String
    },
    eia_notification_number: {
        type: String
    },
    e_mail_of_contact_person: {
        type: String
    },
    e_mail_of_the_company: {
        type: String
    },
    e_waste: {
        type: String
    },
    energy_consumption_through_other_sources_from_non_renewable_sources: {
        type: String
    },
    energy_consumption_through_other_sources_from_renewable_sources: {
        type: String
    },
    energy_intensity_in_term_of_physical_output: {
        type: String
    },
    energy_intensity_per_rupee_of_turnover: {
        type: String
    },
    energy_intensity_per_rupee_of_turnover_adjusting_for_purchasing_power_parity: {
        type: String
    },
    energy_intensity_the_relevant_metric_may_be_selected_by_the_entity: {
        type: String
    },
    environmental_and_social_parameters_relevant_to_the_product_as_a_percentage_to_total_turnover: {
        type: String
    },
    financial_implications_of_the_risk_or_opportunity: {
        type: String
    },
    frequency_of_engagement: {
        type: String
    },
    frequency_of_review_by_board: {
        type: String
    },
    from_which_marginalized_or_vulnerable_groups_do_you_procure: {
        type: String
    },
    grievance_redressal_mechanism_in_place: {
        type: String
    },
    gross_wages_paid_to_female: {
        type: String
    },
    has_an_appeal_been_preferred_for_compounding_fee: {
        type: String
    },
    has_an_appeal_been_preferred_for_imprisonment: {
        type: String
    },
    has_an_appeal_been_preferred_for_penalty_or_fine: {
        type: String
    },
    has_an_appeal_been_preferred_for_punishment: {
        type: String
    },
    has_an_appeal_been_preferred_for_settlement: {
        type: String
    },
    has_the_entity_carried_out_independent_assessment_evaluation_of_the_working_of_its_policies_by_an_external_agency: {
        type: String
    },
    has_the_entity_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services: {
        type: String
    },
    has_the_entity_implemented_a_mechanism_for_zero_liquid_discharge: {
        type: String
    },
    has_the_policy_been_approved_by_the_board: {
        type: String
    },
    hazardous_air_pollutants: {
        type: String
    },
    high_consequence_work_related_injury_or_ill_health_excluding_fatalities: {
        type: String
    },
    human_rights_requirements_form_part_of_your_business_agreements_and_contracts_is_not_applicable_explanatory_text_block: {
        type: String
    },
    in_case_of_risk_approach_to_adapt_or_mitigate: {
        type: String
    },
    indicate_if_any_independent_assessment_or_evaluation_or_assurance_has_been_carried_out_by_an_external_agency_for_air_emissions_other_than_ghg_emissions: {
        type: String
    },
    indicate_if_any_independent_assessment_or_evaluation_or_assurance_has_been_carried_out_by_an_external_agency_for_areas_of_water_stress: {
        type: String
    },
    indicate_in_put_material: {
        type: String
    },
    indicate_product_category: {
        type: String
    },
    indicate_whether_risk_or_opportunity: {
        type: String
    },
    initiative_undertaken: {
        type: String
    },
    intellectual_property_based_on_traditional_knowledge: {
        type: String
    },
    is_the_entity_compliant_with_the_applicable_environmental_law: {
        type: String
    },
    is_the_premise_or_office_of_the_entity_accessible_to_differently_abled_visitors_as_per_the_requirements_of_the_rights_of_persons_with_disabilities_act2016: {
        type: String
    },
    is_there_a_mechanism_available_to_receive_and_redress_grievances_for_other_than_permanent_employees: {
        type: String
    },
    is_there_a_mechanism_available_to_receive_and_redress_grievances_for_other_than_permanent_workers: {
        type: String
    },
    is_there_a_mechanism_available_to_receive_and_redress_grievances_for_permanent_employees: {
        type: String
    },
    is_there_a_mechanism_available_to_receive_and_redress_grievances_for_permanent_workers: {
        type: String
    },
    is_there_a_mechanism_available_to_receive_and_redress_grievances_for_the_following_categories_of_employees_and_worker: {
        type: String
    },
    it_is_planned_to_be_done_in_the_next_financial_year: {
        type: String
    },
    location_of_operations_or_offices: {
        type: String
    },
    lost_time_injury_frequency_rate_per_one_million_person_hours_worked: {
        type: String
    },
    material_issue_identified: {
        type: String
    },
    mechanisms_in_place_to_inform_consumers_of_any_risk_of_disruption_or_discontinuation_of_essential_services_explanatory_text_block: {
        type: String
    },
    mechanisms_to_prevent_adverse_consequences_to_the_complainant_in_discrimination_and_harassment_cases_explanatory_text_block: {
        type: String
    },
    median_of_remuneration_or_salary_or_wages_of_board_of_directors: {
        type: String
    },
    median_of_remuneration_or_salary_or_wages_of_employees_other_than_bod_and_kmp: {
        type: String
    },
    median_of_remuneration_or_salary_or_wages_of_key_managerial_personnel: {
        type: String
    },
    median_of_remuneration_or_salary_or_wages_of_workers: {
        type: String
    },
    method_resorted_for_such_advocacy: {
        type: String
    },
    ngrbc_principle_for_compounding_fee: {
        type: String
    },
    ngrbc_principle_for_imprisonment: {
        type: String
    },
    ngrbc_principle_for_penalty_or_fine: {
        type: String
    },
    ngrbc_principle_for_punishment: {
        type: String
    },
    ngrbc_principle_for_settlement: {
        type: String
    },
    nic_code_of_product_or_service_of_conducted_lifecycle_perspective: {
        type: String
    },
    nic_code_of_product_or_service_sold_by_the_entity: {
        type: String
    },
    n_ox: {
        type: String
    },
    name_and_brief_details_of_project: {
        type: String
    },
    name_and_brief_details_of_project_sia: {
        type: String
    },
    name_of_authority: {
        type: String
    },
    name_of_authority_for_intellectual_property_related_disputes: {
        type: String
    },
    name_of_contact_person: {
        type: String
    },
    name_of_other_assessment_of_value_chain_partner: {
        type: String
    },
    name_of_other_assessments_of_plant_and_office: {
        type: String
    },
    name_of_other_emissions: {
        type: String
    },
    name_of_other_parameter_of_energy_consumption_through_other_source_from_non_renewable_sources: {
        type: String
    },
    name_of_other_parameter_of_energy_consumption_through_other_source_from_renewable_sources: {
        type: String
    },
    name_of_other_retirement_benefits: {
        type: String
    },
    name_of_other_waste: {
        type: String
    },
    name_of_product_or_service: {
        type: String
    },
    name_of_product_or_service_of_conducted_lifecycle_perspective: {
        type: String
    },
    name_of_project_for_which_rehabilitation_and_resettlement_is_on_going: {
        type: String
    },
    name_of_stake_holder_group: {
        type: String
    },
    name_of_stock_exchange_where_the_company_is_listed: {
        type: String
    },
    name_of_the_agency_if_the_entity_carried_out_independent_assessment_evaluation_of_the_working_of_its_policies_by_an_external_agency_explanatory_text_block: {
        type: String
    },
    name_of_the_area: {
        type: String
    },
    name_of_the_assessor_or_assurer: {
        type: String
    },
    name_of_the_company: {
        type: String
    },
    name_of_the_company_or_llp_or_firm_of_assessment_or_assurance_provider: {
        type: String
    },
    name_of_the_external_agency_if_any_independent_assessment_or_evaluation_or_assurance_has_been_carried_out_by_an_external_agency_for_air_emissions_other_than_ghg_emissions_explanatory_text_block: {
        type: String
    },
    name_of_the_external_agency_if_any_independent_assessment_or_evaluation_or_assurance_has_been_carried_out_by_an_external_agency_for_areas_of_water_stress_explanatory_text_block: {
        type: String
    },
    name_of_the_external_agency_if_any_independent_assessment_or_evaluation_or_assurance_has_been_carried_out_by_an_external_agency_for_energy_consumption_explanatory_text_block: {
        type: String
    },
    name_of_the_external_agency_in_case_any_independent_assessment_or_evaluation_or_assurance_has_been_carried_out_by_an_external_agency_for_water_withdrawal_explanatory_text_block: {
        type: String
    },
    name_of_the_external_agency_that_undertook_independent_assessment_or_evaluation_or_assurance_for_green_house_gas_emissions_explanatory_text_block: {
        type: String
    },
    name_of_the_external_agency_that_undertook_independent_assessment_or_evaluation_or_assurance_for_total_scope3_emissions_explanatory_text_block: {
        type: String
    },
    name_of_the_external_agency_that_undertook_independent_assessment_or_evaluation_or_assurance_for_water_discharged_explanatory_text_block: {
        type: String
    },
    name_of_the_external_agency_that_undertook_independent_assessment_or_evaluation_or_assurance_related_to_waste_management_explanatory_text_block: {
        type: String
    },
    name_of_the_holding_or_subsidiary_associate_companies_or_joint_ventures: {
        type: String
    },
    name_of_the_national_and_international_codes_or_certifications_or_labels_or_standards_adopted_by_your_entity_and_mapped_to_each_principle_explanatory_text_block: {
        type: String
    },
    name_of_the_regulatory_or_enforcement_agencies_or_judicial_institutions: {
        type: String
    },
    name_of_the_regulatory_or_enforcement_agencies_or_judicial_institutions_for_compounding_fee: {
        type: String
    },
    name_of_the_regulatory_or_enforcement_agencies_or_judicial_institutions_for_imprisonment: {
        type: String
    },
    name_of_the_regulatory_or_enforcement_agencies_or_judicial_institutions_for_penalty_or_fine: {
        type: String
    },
    name_of_the_regulatory_or_enforcement_agencies_or_judicial_institutions_for_punishment: {
        type: String
    },
    name_of_the_regulatory_or_enforcement_agencies_or_judicial_institutions_for_settlement: {
        type: String
    },
    name_of_the_trade_and_industry_chambers_or_associations: {
        type: String
    },
    name_or_details_of_the_law_or_regulation_or_guidelines_which_was_not_complied_with: {
        type: String
    },
    nature_of_operations: {
        type: String
    },
    net_worth: {
        type: String
    },
    notes_general_disclosure_explanatory_text_block: {
        type: String
    },
    notes_management_and_process_disclosures_explanatory_text_block: {
        type: String
    },
    notes_principle1_explanatory_text_block: {
        type: String
    },
    notes_principle2_explanatory_text_block: {
        type: String
    },
    notes_principle3_explanatory_text_block: {
        type: String
    },
    notes_principle4_explanatory_text_block: {
        type: String
    },
    notes_principle5_explanatory_text_block: {
        type: String
    },
    notes_principle6_explanatory_text_block: {
        type: String
    },
    notes_principle7_explanatory_text_block: {
        type: String
    },
    notes_principle8_explanatory_text_block: {
        type: String
    },
    notes_principle9_explanatory_text_block: {
        type: String
    },
    number_of_affiliations_with_trade_and_industry_chambers_or_associations: {
        type: String
    },
    number_of_board_of_directors_for_remuneration_or_salary_or_wages: {
        type: String
    },
    number_of_complaints_filed_during_the_year: {
        type: String
    },
    number_of_complaints_filed_from_stake_holder_group_during_the_year: {
        type: String
    },
    number_of_complaints_pending_from_stake_holder_group_resolution_at_the_end_of_year: {
        type: String
    },
    number_of_complaints_pending_resolution_at_the_end_of_year: {
        type: String
    },
    number_of_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_directors: {
        type: String
    },
    number_of_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_km_ps: {
        type: String
    },
    number_of_countries_where_market_served_by_the_entity: {
        type: String
    },
    number_of_days_of_accounts_payable: {
        type: String
    },
    number_of_dealers_or_distributors_to_whom_sales_are_made: {
        type: String
    },
    number_of_differently_abled_employees_or_workers: {
        type: String
    },
    number_of_directors_against_whom_disciplinary_action_was_taken: {
        type: String
    },
    number_of_employees_against_whom_disciplinary_action_was_taken: {
        type: String
    },
    number_of_employees_covered_as_percentage_of_total_employees: {
        type: String
    },
    number_of_employees_covered_as_percentage_of_total_worker: {
        type: String
    },
    number_of_employees_or_worker_for_performance_and_career_development: {
        type: String
    },
    number_of_employees_or_workers_are_part_of_associations_or_union: {
        type: String
    },
    number_of_employees_or_workers_covered_for_provided_training_on_human_rights_issues: {
        type: String
    },
    number_of_employees_or_workers_including_differently_abled: {
        type: String
    },
    number_of_employees_or_workers_related_to_minimum_wages: {
        type: String
    },
    number_of_employees_other_than_bod_and_kmp_for_remuneration_or_salary_or_wages: {
        type: String
    },
    number_of_fatalities: {
        type: String
    },
    number_of_female_board_of_directors: {
        type: String
    },
    number_of_female_key_management_personnel: {
        type: String
    },
    number_of_forced_recalls: {
        type: String
    },
    number_of_green_credits_have_been_generated_or_procured_by_the_listed_entity: {
        type: String
    },
    number_of_green_credits_have_been_generated_or_procured_by_the_top_ten_value_chain_partners: {
        type: String
    },
    number_of_instances_of_data_breaches_along_with_impact: {
        type: String
    },
    number_of_km_ps_against_whom_disciplinary_action_was_taken: {
        type: String
    },
    number_of_key_managerial_personnel_for_remuneration_or_salary_or_wages: {
        type: String
    },
    number_of_locations: {
        type: String
    },
    number_of_persons_benefitted_from_csr_projects: {
        type: String
    },
    number_of_project_affected_families: {
        type: String
    },
    number_of_states_where_market_served_by_the_entity: {
        type: String
    },
    number_of_trading_houses_where_purchases_are_made: {
        type: String
    },
    number_of_trained_employees_or_workers: {
        type: String
    },
    number_of_voluntary_recalls: {
        type: String
    },
    number_of_well_being_of_employees_or_workers: {
        type: String
    },
    number_of_workers_against_whom_disciplinary_action_was_taken: {
        type: String
    },
    number_of_workers_for_remuneration_or_salary_or_wages: {
        type: String
    },
    other_emissions: {
        type: String
    },
    other_hazardous_waste: {
        type: String
    },
    other_non_hazardous_waste_generated: {
        type: String
    },
    outcome_of_the_initiative: {
        type: String
    },
    owned_or_acquired: {
        type: String
    },
    particulate_matter: {
        type: String
    },
    percentage_of_beneficiaries_from_vulnerable_and_marginalized_groups: {
        type: String
    },
    percentage_of_capex: {
        type: String
    },
    percentage_of_child_labour_of_value_chain_partners_p5: {
        type: String
    },
    percentage_of_child_labour_of_your_plants_and_offices_that_were_assessed_p5: {
        type: String
    },
    percentage_of_complaints_in_respect_of_number_of_employees_or_worker: {
        type: String
    },
    percentage_of_contribution_of_exports_in_the_total_turnover_of_the_entity: {
        type: String
    },
    percentage_of_cost_incurred_on_well_being_measures_with_respect_to_total_revenue_of_the_company: {
        type: String
    },
    percentage_of_data_breaches_involving_personally_identifiable_information_of_customers: {
        type: String
    },
    percentage_of_differently_abled_employees_or_workers: {
        type: String
    },
    percentage_of_directly_sourced_from_msm_es_or_small_producers: {
        type: String
    },
    percentage_of_discrimination_at_work_place_of_value_chain_partners_p5: {
        type: String
    },
    percentage_of_discrimination_at_work_place_of_your_plants_and_offices_that_were_assessed_p5: {
        type: String
    },
    percentage_of_employees_or_worker_for_performance_and_career_development: {
        type: String
    },
    percentage_of_employees_or_workers_are_part_of_associations_or_union_of_total_number_of_employee: {
        type: String
    },
    percentage_of_employees_or_workers_covered_for_provided_training_on_human_rights_issues: {
        type: String
    },
    percentage_of_employees_or_workers_including_differently_abled: {
        type: String
    },
    percentage_of_employees_or_workers_related_to_minimum_wages: {
        type: String
    },
    percentage_of_female_board_of_directors: {
        type: String
    },
    percentage_of_female_key_management_personnel: {
        type: String
    },
    percentage_of_forced_labour_or_involuntary_labour_of_value_chain_partners_p5: {
        type: String
    },
    percentage_of_forced_labour_or_involuntary_labour_of_your_plants_and_offices_that_were_assessed_p5: {
        type: String
    },
    percentage_of_gross_wages_paid_to_female_to_total_wages_paid: {
        type: String
    },
    percentage_of_health_and_safety_practices_of_value_chain_partners_p3: {
        type: String
    },
    percentage_of_health_and_safety_practices_of_your_plants_and_offices_that_were_assessed_p3: {
        type: String
    },
    percentage_of_inputs_were_sourced_sustainably: {
        type: String
    },
    percentage_of_investments_in_related_parties_in_total_investments: {
        type: String
    },
    percentage_of_job_creation: {
        type: String
    },
    percentage_of_loans_and_advances_given_to_related_parties_in_total_loans_and_advances: {
        type: String
    },
    percentage_of_other_assessment_of_value_chain_partner: {
        type: String
    },
    percentage_of_other_assessments_of_plant_and_office: {
        type: String
    },
    percentage_of_pa_fs_covered_by_rehabilitation_and_resettlement: {
        type: String
    },
    percentage_of_persons_in_respective_category_covered_by_the_awareness_programmes: {
        type: String
    },
    percentage_of_purchases_from_related_parties_in_total_purchases_for_share_of_related_party_transactions: {
        type: String
    },
    percentage_of_purchases_from_top_ten_trading_houses_in_total_purchases_from_trading_houses: {
        type: String
    },
    percentage_of_purchases_from_trading_houses_in_total_purchases_for_concentration_of_purchases: {
        type: String
    },
    percentage_of_r_and_d: {
        type: String
    },
    percentage_of_sales_to_dealers_or_distributors_in_total_sales: {
        type: String
    },
    percentage_of_sales_to_related_parties_in_total_sales_for_share_of_related_party_transactions: {
        type: String
    },
    percentage_of_sales_to_top_ten_dealers_or_distributors_in_total_sales_to_dealers_or_distributors: {
        type: String
    },
    percentage_of_sexual_harassment_of_value_chain_partners_p5: {
        type: String
    },
    percentage_of_sexual_harassment_of_your_plants_and_offices_that_were_assessed_p5: {
        type: String
    },
    percentage_of_shares_held_by_listed_entity: {
        type: String
    },
    percentage_of_sourced_directly_from_within_the_district_and_neighbouring_districts: {
        type: String
    },
    percentage_of_total_turnover_contributed_for_conducted_lifecycle_perspective: {
        type: String
    },
    percentage_of_total_turnover_for_business_activities: {
        type: String
    },
    percentage_of_total_turnover_for_product_or_service_sold: {
        type: String
    },
    percentage_of_trained_employees_or_workers: {
        type: String
    },
    percentage_of_value_chain_partners_by_value_of_business_done_with_such_partners_that_were_assessed_for_environmental_impacts: {
        type: String
    },
    percentage_of_value_chain_partners_covered_under_the_awareness_programmes: {
        type: String
    },
    percentage_of_wages_of_value_chain_partners_p5: {
        type: String
    },
    percentage_of_wages_of_your_plants_and_offices_that_were_assessed_p5: {
        type: String
    },
    percentage_of_well_being_of_employees_or_workers: {
        type: String
    },
    percentage_of_working_conditions_of_value_chain_partners_p3: {
        type: String
    },
    percentage_of_working_conditions_of_your_plants_and_offices_that_were_assessed_p3: {
        type: String
    },
    performance_against_above_policies_and_follow_up_action_frequency: {
        type: String
    },
    performance_against_above_policies_and_follow_up_action_indicate_whether_review_was_undertaken_by: {
        type: String
    },
    performance_of_the_entity_against_the_specific_commitments_goals_and_targets_along_with_reasons_in_case_the_same_are_not_met_explanatory_text_block: {
        type: String
    },
    persistent_organic_pollutants: {
        type: String
    },
    plastic_waste: {
        type: String
    },
    processes_for_workers_to_report_the_work_related_hazards_and_to_remove_themselves_from_such_risks_is_not_applicable_explanatory_text_block: {
        type: String
    },
    product_or_service_sold_by_the_entity: {
        type: String
    },
    project_related_to_reducing_green_house_gas_emission_is_not_applicable_to_the_entity_explanatory_text_block: {
        type: String
    },
    provide_details_of_the_non_compliance: {
        type: String
    },
    provide_the_processes_for_consultation_between_stakeholders_and_the_board_on_economic_environmental_and_social_topics_or_if_consultation_is_delegated_how_is_feedback_from_such_consultations_provided_to_the_board_explanatory_text_block: {
        type: String
    },
    public_policy_advocated: {
        type: String
    },
    purpose_and_scope_of_engagement_including_key_topics_and_concerns_raised_during_such_engagement: {
        type: String
    },
    radioactive_waste: {
        type: String
    },
    rationale_for_identifying_the_risk_opportunity: {
        type: String
    },
    reach_of_trade_and_industry_chambers_or_associations: {
        type: String
    },
    reasons_and_corrective_action_taken_if_the_conditions_of_environmental_approval_or_clearance_are_not_being_complied_with: {
        type: String
    },
    reasons_for_forced_recall: {
        type: String
    },
    reasons_for_voluntary_recall: {
        type: String
    },
    reclaimed_products_and_their_packaging_materials_as_percentage_of_total_products_sold_in_respective_category: {
        type: String
    },
    recycled_or_re_used_in_put_material_to_total_material: {
        type: String
    },
    recycled_or_reused_input_material_used_in_production_or_providing_services_lineitems: {
        type: String
    },
    recycling_and_or_safe_disposal_as_a_percentage_to_total_turnover: {
        type: String
    },
    remark_for_consumer_complaints: {
        type: String
    },
    remarks_for_assurance_of_a_preferential_procurement_policy_where_preference_to_purchase_from_suppliers_comprising_marginalized_or_vulnerable_groups_and_its_percentage_of_total_procurement_by_value_does_it_constitute: {
        type: String
    },
    remarks_for_assurance_of_address_of_corporate_office_of_company: {
        type: String
    },
    remarks_for_assurance_of_address_of_registered_office_of_company: {
        type: String
    },
    remarks_for_assurance_of_assessments_of_your_plants_and_offices_that_were_assessed_for_the_year_p3: {
        type: String
    },
    remarks_for_assurance_of_assessments_of_your_plants_and_offices_that_were_assessed_for_the_year_p5: {
        type: String
    },
    remarks_for_assurance_of_awareness_programmes_conducted_for_value_chain_partners_on_any_of_the_principles_during_the_financial_year: {
        type: String
    },
    remarks_for_assurance_of_complaints_filed_under_the_sexual_harassment_of_women_at_workplace: {
        type: String
    },
    remarks_for_assurance_of_complaints_or_grievances_on_any_of_the_principles_under_the_national_guidelines_on_responsible_business_conduct: {
        type: String
    },
    remarks_for_assurance_of_compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances: {
        type: String
    },
    remarks_for_assurance_of_corporate_identity_number: {
        type: String
    },
    remarks_for_assurance_of_data_breaches_information_like_number_of_instances_of_data_breaches_along_with_impact_and_percentage_of_data_breaches_involving_personally_identifiable_information_of_customers: {
        type: String
    },
    remarks_for_assurance_of_describe_the_mechanisms_to_receive_and_redress_grievances_of_the_community: {
        type: String
    },
    remarks_for_assurance_of_describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_plastics_including_packaging_e_waste_hazardous_waste_and_other_waste: {
        type: String
    },
    remarks_for_assurance_of_details_and_weblink_of_an_anti_corruption_or_anti_bribery_policy_is_place: {
        type: String
    },
    remarks_for_assurance_of_details_of_a_business_process_being_modified_or_introduced_as_a_result_of_addressing_human_rights_grievances_or_complaints: {
        type: String
    },
    remarks_for_assurance_of_details_of_actions_taken_to_mitigate_any_negative_social_impacts_identified_in_the_social_impact_assessments: {
        type: String
    },
    remarks_for_assurance_of_details_of_air_emissions_other_than_ghg_emissions_by_the_entity: {
        type: String
    },
    remarks_for_assurance_of_details_of_any_corrective_action_taken_or_underway_on_issues_related_to_fines_or_penalties_or_action_taken_by_regulators_or_law_enforcement_agencies_or_judicial_institutions_on_cases_of_corruption_and_conflicts_of_interest: {
        type: String
    },
    remarks_for_assurance_of_details_of_any_corrective_action_taken_or_underway_to_address_safety_related_incidents_of_your_plants_and_offices_that_were_assessed: {
        type: String
    },
    remarks_for_assurance_of_details_of_any_corrective_action_taken_or_underway_to_address_safety_related_incidents_on_assessment_of_value_chain_partners: {
        type: String
    },
    remarks_for_assurance_of_details_of_any_corrective_actions_taken_or_underway_on_issues_relating_to_advertising_and_delivery_of_essential_services_or_cyber_security_and_data_privacy_or_recalls_or_penalty_or_action_taken_by_regulatory_authorities_on_safety_of_products_or_services: {
        type: String
    },
    remarks_for_assurance_of_details_of_any_corrective_actions_taken_or_underway_to_address_significant_risks_or_concerns_arising_from_the_assessments_of_plant_and_office: {
        type: String
    },
    remarks_for_assurance_of_details_of_any_corrective_actions_taken_or_underway_to_address_significant_risks_or_concerns_arising_from_the_assessments_of_value_chain_partner: {
        type: String
    },
    remarks_for_assurance_of_details_of_beneficiaries_of_csr_projects: {
        type: String
    },
    remarks_for_assurance_of_details_of_business_activities_accounting_for_ninety_percent_of_the_turnover: {
        type: String
    },
    remarks_for_assurance_of_details_of_csr_projects_undertaken_in_designated_aspirational_districts_as_identified_by_government_bodies: {
        type: String
    },
    remarks_for_assurance_of_details_of_complaints_made_by_employees_and_workers_as_per_p3: {
        type: String
    },
    remarks_for_assurance_of_details_of_complaints_made_by_employees_and_workers_as_per_p5: {
        type: String
    },
    remarks_for_assurance_of_details_of_complaints_with_regard_to_conflict_of_interest: {
        type: String
    },
    remarks_for_assurance_of_details_of_concentration_of_purchases_and_sales_with_trading_houses_dealers_and_related_parties_along_with_loans_and_advances_and_investments_with_related_parties: {
        type: String
    },
    remarks_for_assurance_of_details_of_corrective_action_taken_or_underway_on_any_issues_related_to_anti_competitive_conduct_by_the_entity_based_on_adverse_orders_from_regulatory_authorities: {
        type: String
    },
    remarks_for_assurance_of_details_of_corrective_actions_taken_or_underway_based_on_any_adverse_order_in_intellectual_property_related_disputes_wherein_usage_of_traditional_knowledge_is_involved: {
        type: String
    },
    remarks_for_assurance_of_details_of_employees_as_at_the_end_of_financial_year: {
        type: String
    },
    remarks_for_assurance_of_details_of_environmental_impact_assessments_of_projects_undertaken_by_the_entity_based_on_applicable_laws: {
        type: String
    },
    remarks_for_assurance_of_details_of_financial_year_for_which_reporting_is_being_done: {
        type: String
    },
    remarks_for_assurance_of_details_of_fines_or_penalties_or_punishment_or_award_or_compounding_fees_or_settlement: {
        type: String
    },
    remarks_for_assurance_of_details_of_green_house_gas_emissions_and_its_intensity: {
        type: String
    },
    remarks_for_assurance_of_details_of_instances_of_engagement_with_and_actions_taken_to_address_the_concerns_of_vulnerable_or_marginalized_stakeholder_groups: {
        type: String
    },
    remarks_for_assurance_of_details_of_instances_of_product_recalls_on_account_of_safety_issues: {
        type: String
    },
    remarks_for_assurance_of_details_of_measures_for_the_well_being_of_employees_and_workers_and_spending_on_it: {
        type: String
    },
    remarks_for_assurance_of_details_of_measures_undertaken_by_the_entity_to_ensure_that_statutory_dues_have_been_deducted_and_deposited_by_the_value_chain_partners: {
        type: String
    },
    remarks_for_assurance_of_details_of_median_of_remuneration_or_salary_or_wages_and_wages_paid_to_female: {
        type: String
    },
    remarks_for_assurance_of_details_of_minimum_wages_paid_to_employees_and_workers: {
        type: String
    },
    remarks_for_assurance_of_details_of_number_of_consumer_complaints_p9: {
        type: String
    },
    remarks_for_assurance_of_details_of_number_of_locations_where_plants_and_or_operations_or_offices_of_the_entity_are_situated: {
        type: String
    },
    remarks_for_assurance_of_details_of_operations_or_offices_in_or_around_ecologically_sensitive_areas_where_environmental_approvals_or_clearances_are_required: {
        type: String
    },
    remarks_for_assurance_of_details_of_percentage_of_recycled_or_reused_input_material_to_total_material_by_value_used_in_production_or_providing_services: {
        type: String
    },
    remarks_for_assurance_of_details_of_performance_and_career_development_reviews_of_employees_and_worker: {
        type: String
    },
    remarks_for_assurance_of_details_of_projects_for_which_ongoing_rehabilitation_and_resettlement_is_being_undertaken_by_entity: {
        type: String
    },
    remarks_for_assurance_of_details_of_public_policy_positions_advocated_by_the_entity: {
        type: String
    },
    remarks_for_assurance_of_details_of_reclaimed_products_and_their_packaging_materials_for_each_product_category: {
        type: String
    },
    remarks_for_assurance_of_details_of_retirement_benefits: {
        type: String
    },
    remarks_for_assurance_of_details_of_safety_related_incidents: {
        type: String
    },
    remarks_for_assurance_of_details_of_significant_direct_and_indirect_impact_of_the_entity_on_biodiversity_in_such_areas_along_with_prevention_and_remediation_activities: {
        type: String
    },
    remarks_for_assurance_of_details_of_significant_social_or_environmental_concerns_from_production_or_disposal_of_product_or_service_with_action_taken_to_mitigate_the_same: {
        type: String
    },
    remarks_for_assurance_of_details_of_social_impact_assessments_of_projects_undertaken_by_the_entity_based_on_applicable_laws: {
        type: String
    },
    remarks_for_assurance_of_details_of_the_appeal_or_revision_preferred_in_cases_where_monetary_or_non_monetary_action_has_been_appealed: {
        type: String
    },
    remarks_for_assurance_of_details_of_the_benefits_derived_and_shared_from_the_intellectual_properties_owned_or_acquired: {
        type: String
    },
    remarks_for_assurance_of_details_of_the_disclosures_related_to_water_discharged: {
        type: String
    },
    remarks_for_assurance_of_details_of_the_disclosures_related_to_water_withdrawal: {
        type: String
    },
    remarks_for_assurance_of_details_of_the_highest_authority_responsible_for_implementation_and_oversight_of_the_business_responsibility_policy: {
        type: String
    },
    remarks_for_assurance_of_details_of_the_scope_and_coverage_of_any_human_rights_due_diligence_conducted: {
        type: String
    },
    remarks_for_assurance_of_details_of_the_stock_exchange_where_the_company_is_listed: {
        type: String
    },
    remarks_for_assurance_of_details_of_total_energy_consumption_in_joules_or_multiples_and_energy_intensity: {
        type: String
    },
    remarks_for_assurance_of_details_of_total_scope3_emissions_and_its_intensity: {
        type: String
    },
    remarks_for_assurance_of_details_of_training_given_to_employees_and_workers: {
        type: String
    },
    remarks_for_assurance_of_details_of_waste_management_practices_adopted_in_your_establishments_and_the_strategy_adopted_by_company_to_reduce_usage_of_hazardous_and_toxic_chemicals: {
        type: String
    },
    remarks_for_assurance_of_details_on_assessment_of_value_chain_partners_p3: {
        type: String
    },
    remarks_for_assurance_of_details_on_assessment_of_value_chain_partners_p5: {
        type: String
    },
    remarks_for_assurance_of_details_related_to_waste_management_by_the_entity: {
        type: String
    },
    remarks_for_assurance_of_disclose_any_significant_adverse_impact_to_the_environment_arising_from_the_value_chain_of_the_entity_what_mitigation_or_adaptation_measures_have_been_taken_by_the_entity_in_this_regard: {
        type: String
    },
    remarks_for_assurance_of_e_mail_of_the_company: {
        type: String
    },
    remarks_for_assurance_of_employees_and_workers_who_have_been_provided_training_on_human_rights_issues_and_policies_of_the_entity: {
        type: String
    },
    remarks_for_assurance_of_green_credits_have_been_generated_or_procured_by_the_listed_entity_and_top_ten_value_chain_partners_is_assured_by_assurer: {
        type: String
    },
    remarks_for_assurance_of_health_and_safety_management_system: {
        type: String
    },
    remarks_for_assurance_of_human_rights_requirements_form_part_of_your_business_agreements_and_contracts: {
        type: String
    },
    remarks_for_assurance_of_job_creation_in_smaller_towns_disclose_wages_paid_to_persons_employed_including_employees_or_workers_employed_on_a_permanent_or_non_permanent_or_on_contract_basis: {
        type: String
    },
    remarks_for_assurance_of_list_stakeholder_groups_identified_as_key_for_your_entity_and_the_frequency_of_engagement_with_each_stakeholder_group: {
        type: String
    },
    remarks_for_assurance_of_markets_served_by_the_entity: {
        type: String
    },
    remarks_for_assurance_of_measures_taken_by_the_entity_to_ensure_a_safe_and_healthy_work_place: {
        type: String
    },
    remarks_for_assurance_of_mechanisms_in_place_to_inform_consumers_of_any_risk_of_disruption_or_discontinuation_of_essential_services: {
        type: String
    },
    remarks_for_assurance_of_mechanisms_to_prevent_adverse_consequences_to_the_complainant_in_discrimination_and_harassment_cases: {
        type: String
    },
    remarks_for_assurance_of_name_and_contact_details_of_the_contact_person_in_case_of_any_queries_on_the_brsr_report: {
        type: String
    },
    remarks_for_assurance_of_name_of_the_company: {
        type: String
    },
    remarks_for_assurance_of_name_of_the_national_and_international_codes_or_certifications_or_labels_or_standards_adopted_by_your_entity_and_mapped_to_each_principle: {
        type: String
    },
    remarks_for_assurance_of_names_of_holding_subsidiary_associate_companies_joint_ventures: {
        type: String
    },
    remarks_for_assurance_of_number_of_days_of_accounts_payables: {
        type: String
    },
    remarks_for_assurance_of_number_of_directors_or_km_ps_or_employees_or_workers_against_whom_disciplinary_action_was_taken_by_any_law_enforcement_agency_for_the_charges_of_bribery_or_corruption: {
        type: String
    },
    remarks_for_assurance_of_overview_of_the_entitys_material_responsible_business_conduct_issues: {
        type: String
    },
    remarks_for_assurance_of_participation_or_inclusion_or_representation_of_women: {
        type: String
    },
    remarks_for_assurance_of_percentage_coverage_by_training_and_awareness_programs_on_any_of_the_principles_during_the_financial_year_for_bod_or_kmp_or_employee_or_worker: {
        type: String
    },
    remarks_for_assurance_of_percentage_of_input_material_inputs_to_total_inputs_by_value_sourced_from_suppliers: {
        type: String
    },
    remarks_for_assurance_of_percentage_of_r_and_d_and_capital_expenditure_investments_in_specific_technologies: {
        type: String
    },
    remarks_for_assurance_of_percentage_of_value_chain_partners_by_value_of_business_done_with_such_partners_that_were_assessed_for_environmental_impacts: {
        type: String
    },
    remarks_for_assurance_of_performance_against_above_policies_and_follow_up_action: {
        type: String
    },
    remarks_for_assurance_of_performance_of_the_entity_against_the_specific_commitments_goals_and_targets_along_with_reasons_in_case_the_same_are_not_met: {
        type: String
    },
    remarks_for_assurance_of_products_or_services_sold_by_the_entity_accounting_for_ninety_percent_of_the_turnover: {
        type: String
    },
    remarks_for_assurance_of_reasons_if_policies_not_cover_each_principle_and_its_core_elements_of_the_ngrb_cs: {
        type: String
    },
    remarks_for_assurance_of_reporting_boundary: {
        type: String
    },
    remarks_for_assurance_of_return_to_work_and_retention_rates_of_permanent_employees_and_workers_that_took_parental_leave: {
        type: String
    },
    remarks_for_assurance_of_specific_commitments_goals_and_targets_set_by_the_entity_with_defined_timelines: {
        type: String
    },
    remarks_for_assurance_of_statement_by_director_responsible_for_the_business_responsibility_report_highlighting_esg_related_challenges_targets_and_achievements: {
        type: String
    },
    remarks_for_assurance_of_steps_taken_to_inform_and_educate_consumers_about_safe_and_responsible_usage_of_products_and_or_services: {
        type: String
    },
    remarks_for_assurance_of_telephone_of_company: {
        type: String
    },
    remarks_for_assurance_of_the_entity_has_undertaken_any_specific_initiatives_or_used_innovative_technology_or_solutions_to_improve_resource_efficiency: {
        type: String
    },
    remarks_for_assurance_of_the_entity_have_procedures_in_place_for_sustainable_sourcing_and_percentage_of_inputs_were_sourced_sustainably: {
        type: String
    },
    remarks_for_assurance_of_the_entity_implemented_a_mechanism_for_zero_liquid_discharge: {
        type: String
    },
    remarks_for_assurance_of_the_internal_mechanisms_in_place_to_redress_grievances_related_to_human_rights_issues: {
        type: String
    },
    remarks_for_assurance_of_the_mechanisms_in_place_to_receive_and_respond_to_consumer_complaints_and_feedback: {
        type: String
    },
    remarks_for_assurance_of_the_premises_or_offices_of_the_entity_accessible_to_differently_abled_employees_and_workers_and_steps_are_being_taken_by_the_entity_if_the_premises_or_offices_of_the_entity_not_accessible: {
        type: String
    },
    remarks_for_assurance_of_the_processes_for_consultation_between_stakeholders_and_the_board_on_economic_environmental_and_social_topics_or_if_consultation_is_delegated_how_is_feedback_from_such_consultations_provided_to_the_board: {
        type: String
    },
    remarks_for_assurance_of_the_processes_for_identifying_key_stakeholder_groups_of_the_entity: {
        type: String
    },
    remarks_for_assurance_of_the_products_and_packaging_reclaimed_at_end_of_life_of_products_amount_reused_or_recycled_or_safely_disposed: {
        type: String
    },
    remarks_for_assurance_of_turnover_of_products_and_or_services_as_a_percentage_of_turnover_from_all_products_or_service_that_carry_information_about_as_a_percentage_to_total_turnover: {
        type: String
    },
    remarks_for_assurance_of_turnover_rate_for_permanent_employees_and_workers_disclose_trends_for_past_three_years: {
        type: String
    },
    remarks_for_assurance_of_value_of_shares_paid_up: {
        type: String
    },
    remarks_for_assurance_of_water_withdrawal_or_consumption_and_discharge_in_areas_of_water_stress_in_kilolitres: {
        type: String
    },
    remarks_for_assurance_of_weblink_where_information_on_products_and_services_of_the_entity_can_be_accessed: {
        type: String
    },
    remarks_for_assurance_of_website_of_company: {
        type: String
    },
    remarks_for_assurance_of_whether_csr_is_applicable_as_per_section135_of_companies_act2013: {
        type: String
    },
    remarks_for_assurance_of_whether_do_you_have_a_focal_point_responsible_for_addressing_human_rights_impacts_or_issues_caused_or_contributed_to_by_the_business: {
        type: String
    },
    remarks_for_assurance_of_whether_is_there_a_mechanism_available_to_receive_and_redress_grievances_for_the_following_categories_of_employees_and_worker: {
        type: String
    },
    remarks_for_assurance_of_whether_stakeholder_consultation_is_used_to_support_the_identification_and_management_of_environmental_and_social_topics: {
        type: String
    },
    remarks_for_assurance_of_whether_the_enlisted_policies_extend_to_your_value_chain_partners: {
        type: String
    },
    remarks_for_assurance_of_whether_the_entity_compliant_with_the_applicable_environmental_law: {
        type: String
    },
    remarks_for_assurance_of_whether_the_entity_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services: {
        type: String
    },
    remarks_for_assurance_of_whether_the_entity_display_product_information_on_the_product_over_and_above_what_is_mandated_as_per_local_laws: {
        type: String
    },
    remarks_for_assurance_of_whether_the_entity_extend_any_life_insurance_or_any_compensatory_package_in_the_event_of_death_of_employees: {
        type: String
    },
    remarks_for_assurance_of_whether_the_entity_has_carried_out_independent_assessment_evaluation_of_the_working_of_its_policies_by_an_external_agency: {
        type: String
    },
    remarks_for_assurance_of_whether_the_entity_has_translated_the_policy_into_procedures: {
        type: String
    },
    remarks_for_assurance_of_whether_the_entity_have_a_business_continuity_and_disaster_management_plan: {
        type: String
    },
    remarks_for_assurance_of_whether_the_entity_have_a_framework_or_policy_on_cyber_security_and_risks_related_to_data_privacy: {
        type: String
    },
    remarks_for_assurance_of_whether_the_entity_have_a_specified_committee_of_the_board_or_director_responsible_for_decision_making_on_sustainability_related_issues: {
        type: String
    },
    remarks_for_assurance_of_whether_the_entity_have_an_equal_opportunity_policy_as_per_the_rights_of_persons_with_disabilities_act2016: {
        type: String
    },
    remarks_for_assurance_of_whether_the_entity_have_any_project_related_to_reducing_green_house_gas_emission: {
        type: String
    },
    remarks_for_assurance_of_whether_the_entity_have_any_sites_or_facilities_identified_as_designated_consumers_under_the_performance_achieve_and_trade_scheme_of_the_government_of_india: {
        type: String
    },
    remarks_for_assurance_of_whether_the_entity_provide_transition_assistance_programs_to_facilitate_continued_employability_and_the_management_of_career_endings_resulting_from_retirement_or_termination_of_employment: {
        type: String
    },
    remarks_for_assurance_of_whether_the_premise_or_office_of_the_entity_accessible_to_differently_abled_visitors_as_per_the_requirements_of_the_rights_of_persons_with_disabilities_act2016: {
        type: String
    },
    remarks_for_assurance_of_whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards_and_steps_taken_to_address_the_waste_collection_plan_if_not_submitted: {
        type: String
    },
    remarks_for_assurance_of_whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs: {
        type: String
    },
    remarks_for_assurance_of_year_of_incorporation: {
        type: String
    },
    remarks_in_case_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_directors: {
        type: String
    },
    remarks_in_case_complaints_received_in_relation_to_issues_of_conflict_of_interest_of_the_kmps: {
        type: String
    },
    remarks_stake_holder_group_from_whom_complaint_is_received: {
        type: String
    },
    remarksfor_complaints_explanatory_text_block: {
        type: String
    },
    reporting_boundary: {
        type: String
    },
    retention_rates_permanent_employees_that_took_parental_leave: {
        type: String
    },
    retention_rates_permanent_workers_that_took_parental_leave: {
        type: String
    },
    return_to_work_rate_permanent_employees_that_took_parental_leave: {
        type: String
    },
    return_to_work_rate_permanent_workers_that_took_parental_leave: {
        type: String
    },
    revenue_from_operations: {
        type: String
    },
    sia_notification_number: {
        type: String
    },
    s_ox: {
        type: String
    },
    safe_and_responsible_usage_as_a_percentage_to_total_turnover: {
        type: String
    },
    specific_commitments_goals_and_targets_set_by_the_entity_with_defined_timelines_explanatory_text_block: {
        type: String
    },
    stakeholder_group: {
        type: String
    },
    state_of_csr_projects_undertaken: {
        type: String
    },
    state_of_project: {
        type: String
    },
    statement_by_director_responsible_for_the_business_responsibility_report_highlighting_esg_related_challenges_targets_and_achievements_explanatory_text_block: {
        type: String
    },
    steps_taken_to_address_the_waste_collection_plan_explanatory_text_block: {
        type: String
    },
    steps_taken_to_inform_and_educate_consumers_about_safe_and_responsible_usage_of_products_and_or_services_explanatory_text_block: {
        type: String
    },
    telephone_of_company: {
        type: String
    },
    the_enlisted_policies_do_not_applicable_extend_to_your_value_chain_partners_explanatory_text_block: {
        type: String
    },
    the_entity_does_not_consider_the_principles_material_to_its_business: {
        type: String
    },
    the_entity_does_not_have_the_financial_or_human_and_technical_resources_available_for_the_task: {
        type: String
    },
    the_entity_has_not_applicable_a_business_continuity_and_disaster_management_plan_explanatory_text_block: {
        type: String
    },
    the_entity_has_not_applicable_a_framework_or_policy_on_cyber_security_and_risks_related_to_data_privacy_explanatory_text_block: {
        type: String
    },
    the_entity_has_not_applicable_a_preferential_procurement_policy_explanatory_text_block: {
        type: String
    },
    the_entity_has_not_applicable_a_specified_committee_for_decision_making_on_sustainability_related_issues_explanatory_text_block: {
        type: String
    },
    the_entity_has_not_applicable_an_equal_opportunity_policy_as_per_the_rights_of_persons_with_disabilities_act2016_explanatory_text_block: {
        type: String
    },
    the_entity_has_not_applicable_carry_out_any_survey_with_regard_to_consumer_satisfaction_relating_to_the_major_products_or_services_explanatory_text_block: {
        type: String
    },
    the_entity_has_not_applicable_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services_explanatory_text_block: {
        type: String
    },
    the_entity_has_not_applicable_environmental_law_explanatory_text_block: {
        type: String
    },
    the_entity_has_not_applicable_product_information_on_the_product_over_and_above_what_is_mandated_as_per_local_laws_explanatory_text_block: {
        type: String
    },
    the_entity_has_not_applicable_transition_assistance_programs_to_facilitate_continued_employability_and_the_management_of_career_endings_resulting_from_retirement_or_termination_of_employment_explanatory_text_block: {
        type: String
    },
    the_entity_is_not_at_a_stage_where_it_is_in_a_position_to_formulate_and_implement_the_policies_on_specified_principles: {
        type: String
    },
    the_premises_or_offices_of_the_entity_accessible_to_differently_abled_employees_and_workers_are_not_applicable_explanatory_text_block: {
        type: String
    },
    topics_or_principles_covered_under_the_training: {
        type: String
    },
    topics_or_principles_covered_under_the_training_and_its_impact: {
        type: String
    },
    total_complaints_reported_under_sexual_harassment_of_women_at_workplace: {
        type: String
    },
    total_electricity_consumption_from_non_renewable_sources: {
        type: String
    },
    total_electricity_consumption_from_renewable_sources: {
        type: String
    },
    total_energy_consumed_from_non_renewable_sources: {
        type: String
    },
    total_energy_consumed_from_renewable_and_non_renewable_sources: {
        type: String
    },
    total_energy_consumed_from_renewable_sources: {
        type: String
    },
    total_fuel_consumption_from_non_renewable_sources: {
        type: String
    },
    total_fuel_consumption_from_renewable_sources: {
        type: String
    },
    total_number_of_affected_employees: {
        type: String
    },
    total_number_of_affected_workers: {
        type: String
    },
    total_number_of_awareness_programmes_held: {
        type: String
    },
    total_number_of_board_of_directors: {
        type: String
    },
    total_number_of_employees_or_workers_for_performance_and_career_development: {
        type: String
    },
    total_number_of_employees_or_workers_for_training_on_human_rights_issues: {
        type: String
    },
    total_number_of_key_management_personnel: {
        type: String
    },
    total_number_of_training_and_awareness_programs_held: {
        type: String
    },
    total_recordable_work_related_injuries: {
        type: String
    },
    total_revenue_of_the_company: {
        type: String
    },
    total_scope1_and_scope2_emissions_intensity_in_term_of_physical_output: {
        type: String
    },
    total_scope1_and_scope2_emissions_intensity_per_rupee_of_turnover: {
        type: String
    },
    total_scope1_and_scope2_emissions_intensity_per_rupee_of_turnover_adjusted_for_purchasing_power_parity: {
        type: String
    },
    total_scope1_and_scope2_emissions_intensity_the_relevant_metric_may_be_selected_by_the_entity: {
        type: String
    },
    total_scope1_emissions: {
        type: String
    },
    total_scope2_emissions: {
        type: String
    },
    total_scope3_emission_intensity_the_relevant_metric_may_be_selected_by_the_entity: {
        type: String
    },
    total_scope3_emissions: {
        type: String
    },
    total_scope3_emissions_per_rupee_of_turnover: {
        type: String
    },
    total_volume_of_water_consumption: {
        type: String
    },
    total_volume_of_water_consumption_per_area: {
        type: String
    },
    total_volume_of_water_withdrawal: {
        type: String
    },
    total_volume_of_water_withdrawal_per_area: {
        type: String
    },
    total_wage_cost: {
        type: String
    },
    total_wages_paid: {
        type: String
    },
    total_waste_disposed: {
        type: String
    },
    total_waste_generated: {
        type: String
    },
    total_waste_recovered: {
        type: String
    },
    total_water_discharged_in_kilolitres: {
        type: String
    },
    total_water_discharged_in_kilolitres_per_area: {
        type: String
    },
    turnover: {
        type: String
    },
    turnover_rate: {
        type: String
    },
    type_of_assessment_or_assurance_obtain: {
        type: String
    },
    type_of_assurance_for_details_of_csr: {
        type: String
    },
    type_of_assurance_for_details_of_employees: {
        type: String
    },
    type_of_assurance_for_details_of_holding_subsidiary_and_associate_companies_including_joint_ventures: {
        type: String
    },
    type_of_assurance_for_details_of_operations: {
        type: String
    },
    type_of_assurance_for_details_of_products_or_services: {
        type: String
    },
    type_of_assurance_for_details_of_the_listed_entity: {
        type: String
    },
    type_of_assurance_for_governance_leadership_and_oversight: {
        type: String
    },
    type_of_assurance_for_policy_and_management_processes: {
        type: String
    },
    type_of_assurance_for_principle1_essential_indicators: {
        type: String
    },
    type_of_assurance_for_principle1_leadership_indicators: {
        type: String
    },
    type_of_assurance_for_principle2_essential_indicators: {
        type: String
    },
    type_of_assurance_for_principle2_leadership_indicators: {
        type: String
    },
    type_of_assurance_for_principle3_essential_indicators: {
        type: String
    },
    type_of_assurance_for_principle3_leadership_indicators: {
        type: String
    },
    type_of_assurance_for_principle4_essential_indicators: {
        type: String
    },
    type_of_assurance_for_principle4_leadership_indicators: {
        type: String
    },
    type_of_assurance_for_principle5_essential_indicators: {
        type: String
    },
    type_of_assurance_for_principle5_leadership_indicators: {
        type: String
    },
    type_of_assurance_for_principle6_essential_indicators: {
        type: String
    },
    type_of_assurance_for_principle6_leadership_indicators: {
        type: String
    },
    type_of_assurance_for_principle7_essential_indicators: {
        type: String
    },
    type_of_assurance_for_principle7_leadership_indicators: {
        type: String
    },
    type_of_assurance_for_principle8_essential_indicators: {
        type: String
    },
    type_of_assurance_for_principle8_leadership_indicators: {
        type: String
    },
    type_of_assurance_for_principle9_essential_indicators: {
        type: String
    },
    type_of_assurance_for_principle9_leadership_indicators: {
        type: String
    },
    type_of_assurance_for_section_a_general_disclosures: {
        type: String
    },
    type_of_assurance_for_section_b_management_and_process_disclosures: {
        type: String
    },
    type_of_assurance_for_section_c_principle_wise_performance_disclosures: {
        type: String
    },
    type_of_assurance_for_transparency_and_disclosures_compliances: {
        type: String
    },
    type_of_operations: {
        type: String
    },
    value_of_shares_paid_up: {
        type: String
    },
    volatile_organic_compounds: {
        type: String
    },
    waste_disposed_by_incineration: {
        type: String
    },
    waste_disposed_by_landfilling: {
        type: String
    },
    waste_disposed_by_other_disposal_operations: {
        type: String
    },
    waste_intensity_in_term_of_physical_output: {
        type: String
    },
    waste_intensity_per_rupee_of_turnover: {
        type: String
    },
    waste_intensity_per_rupee_of_turnover_adjusting_for_purchasing_power_parity: {
        type: String
    },
    waste_intensity_the_relevant_metric_may_be_selected_by_the_entity: {
        type: String
    },
    waste_intensity_the_relevant_metric_may_be_selected_by_the_entity_per_area: {
        type: String
    },
    waste_recovered_through_other_recovery_operations: {
        type: String
    },
    waste_recovered_through_re_used: {
        type: String
    },
    waste_recovered_through_recycled: {
        type: String
    },
    water_discharge_by_sent_to_third_parties: {
        type: String
    },
    water_discharge_by_sent_to_third_parties_per_area: {
        type: String
    },
    water_discharge_by_sent_to_third_parties_with_treatment: {
        type: String
    },
    water_discharge_by_sent_to_third_parties_with_treatment_per_area: {
        type: String
    },
    water_discharge_by_sent_to_third_parties_without_treatment: {
        type: String
    },
    water_discharge_by_sent_to_third_parties_without_treatment_per_area: {
        type: String
    },
    water_discharge_to_groundwater: {
        type: String
    },
    water_discharge_to_groundwater_per_area: {
        type: String
    },
    water_discharge_to_groundwater_with_out_treatment: {
        type: String
    },
    water_discharge_to_groundwater_with_out_treatment_per_area: {
        type: String
    },
    water_discharge_to_groundwater_with_treatment: {
        type: String
    },
    water_discharge_to_groundwater_with_treatment_per_area: {
        type: String
    },
    water_discharge_to_others: {
        type: String
    },
    water_discharge_to_others_per_area: {
        type: String
    },
    water_discharge_to_others_with_treatment: {
        type: String
    },
    water_discharge_to_others_with_treatment_per_area: {
        type: String
    },
    water_discharge_to_others_without_treatment: {
        type: String
    },
    water_discharge_to_others_without_treatment_per_area: {
        type: String
    },
    water_discharge_to_seawater: {
        type: String
    },
    water_discharge_to_seawater_per_area: {
        type: String
    },
    water_discharge_to_seawater_with_out_treatment: {
        type: String
    },
    water_discharge_to_seawater_with_out_treatment_per_area: {
        type: String
    },
    water_discharge_to_seawater_with_treatment: {
        type: String
    },
    water_discharge_to_seawater_with_treatment_per_area: {
        type: String
    },
    water_discharge_to_surface_water: {
        type: String
    },
    water_discharge_to_surface_water_per_area: {
        type: String
    },
    water_discharge_to_surface_water_with_out_treatment: {
        type: String
    },
    water_discharge_to_surface_water_with_out_treatment_per_area: {
        type: String
    },
    water_discharge_to_surface_water_with_treatment: {
        type: String
    },
    water_discharge_to_surface_water_with_treatment_per_area: {
        type: String
    },
    water_intensity_in_term_of_physical_output: {
        type: String
    },
    water_intensity_per_rupee_of_turnover: {
        type: String
    },
    water_intensity_per_rupee_of_turnover_adjusting_for_purchasing_power_parity: {
        type: String
    },
    water_intensity_per_rupee_of_turnover_per_area: {
        type: String
    },
    water_intensity_the_relevant_metric_may_be_selected_by_the_entity: {
        type: String
    },
    water_withdrawal_by_groundwater: {
        type: String
    },
    water_withdrawal_by_groundwater_per_area: {
        type: String
    },
    water_withdrawal_by_others: {
        type: String
    },
    water_withdrawal_by_others_per_area: {
        type: String
    },
    water_withdrawal_by_seawater_or_desalinated_water: {
        type: String
    },
    water_withdrawal_by_seawater_or_desalinated_water_per_area: {
        type: String
    },
    water_withdrawal_by_surface_water: {
        type: String
    },
    water_withdrawal_by_surface_water_per_area: {
        type: String
    },
    water_withdrawal_by_third_party_water: {
        type: String
    },
    water_withdrawal_by_third_party_water_per_area: {
        type: String
    },
    web_link_at_anti_corruption_or_anti_bribery_policy_is_place: {
        type: String
    },
    web_link_for_details_of_initiative_taken_by_entity: {
        type: String
    },
    web_link_for_grievance_redress_policy: {
        type: String
    },
    web_link_of_equal_oppertunity_policy_text_block: {
        type: String
    },
    web_link_of_results_of_life_cycle_assessments: {
        type: String
    },
    web_link_of_results_of_life_cycle_assessments_p6: {
        type: String
    },
    web_link_of_sia_of_projects: {
        type: String
    },
    web_link_of_the_policies_explanatory_text_block: {
        type: String
    },
    web_link_of_the_policy_on_cyber_security_and_risks_related_to_data_privacy: {
        type: String
    },
    web_link_public_policy_position_advocated: {
        type: String
    },
    weblink_where_information_on_products_and_services_of_the_entity_can_be_accessed_explanatory_text_block: {
        type: String
    },
    website_of_company: {
        type: String
    },
    what_percentage_of_total_procurement_by_value_does_it_constitute: {
        type: String
    },
    whether_a_preferential_procurement_policy_where_preference_to_purchase_from_suppliers_comprising_marginalized_or_vulnerable_groups_and_its_percentage_of_total_procurement_by_value_does_it_constitute_is_assured_by_assurer: {
        type: String
    },
    whether_address_of_corporate_office_of_company_is_assured_by_assurer: {
        type: String
    },
    whether_address_of_registered_office_of_company_is_assured_by_assurer: {
        type: String
    },
    whether_an_occupational_health_and_safety_management_system_has_been_implemented_by_the_entity: {
        type: String
    },
    whether_any_independent_assessment_or_evaluation_or_assurance_has_been_carried_out_by_an_external_agency_for_total_scope3_emissions: {
        type: String
    },
    whether_any_independent_assessment_or_evaluation_or_assurance_has_been_carried_out_by_an_external_agency_for_waste_management: {
        type: String
    },
    whether_any_independent_assessment_or_evaluation_or_assurance_has_been_carried_out_by_an_external_agency_for_water_discharged: {
        type: String
    },
    whether_any_indicate_if_any_independent_assessment_or_evaluation_or_assurance_has_been_carried_out_by_an_external_agency_for_green_house_gas_emissions: {
        type: String
    },
    whether_any_steps_are_being_taken_by_the_entity_if_the_premises_or_offices_of_the_entity_not_accessible_to_differently_abled_employees_and_workers_explanatory_text_block: {
        type: String
    },
    whether_assessments_of_your_plants_and_offices_that_were_assessed_for_the_year_p3_is_assured_by_assurer: {
        type: String
    },
    whether_assessments_of_your_plants_and_offices_that_were_assessed_for_the_year_p5_is_assured_by_assurer: {
        type: String
    },
    whether_awareness_programmes_conducted_for_value_chain_partners_on_any_of_the_principles_during_the_financial_year_is_assured_by_assurer: {
        type: String
    },
    whether_csr_is_applicable_as_per_section135_of_companies_act2013: {
        type: String
    },
    whether_csr_is_applicable_as_per_section135_of_companies_act2013_is_assured_by_assurer: {
        type: String
    },
    whether_complaints_filed_under_the_sexual_harassment_of_women_at_workplace_is_assured_by_assurer: {
        type: String
    },
    whether_complaints_or_grievances_on_any_of_the_principles_under_the_national_guidelines_on_responsible_business_conduct_is_assured_by_assurer: {
        type: String
    },
    whether_compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_is_assured_by_assurer: {
        type: String
    },
    whether_conducted_by_independent_external_agency: {
        type: String
    },
    whether_conducted_by_independent_external_agency_for_sia: {
        type: String
    },
    whether_conducted_by_independent_external_agency_p6: {
        type: String
    },
    whether_corporate_identity_number_is_assured_by_assurer: {
        type: String
    },
    whether_data_breaches_information_like_number_of_instances_of_data_breaches_along_with_impact_and_percentage_of_data_breaches_involving_personally_identifiable_information_of_customers_is_assured_by_assurer: {
        type: String
    },
    whether_describe_the_mechanisms_to_receive_and_redress_grievances_of_the_community_is_assured_by_assurer: {
        type: String
    },
    whether_describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_plastics_including_packaging_e_waste_hazardous_waste_and_other_waste_is_assured_by_assurer: {
        type: String
    },
    whether_details_and_weblink_of_an_anti_corruption_or_anti_bribery_policy_is_place_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_a_business_process_being_modified_or_introduced_as_a_result_of_addressing_human_rights_grievances_or_complaints_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_actions_taken_to_mitigate_any_negative_social_impacts_identified_in_the_social_impact_assessments_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_air_emissions_other_than_ghg_emissions_by_the_entity_is_applicable_to_the_company: {
        type: String
    },
    whether_details_of_air_emissions_other_than_ghg_emissions_by_the_entity_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_any_corrective_action_taken_or_underway_on_issues_related_to_fines_or_penalties_or_action_taken_by_regulators_or_law_enforcement_agencies_or_judicial_institutions_on_cases_of_corruption_and_conflicts_of_interest_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_any_corrective_action_taken_or_underway_to_address_safety_related_incidents_of_your_plants_and_offices_that_were_assessed_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_any_corrective_action_taken_or_underway_to_address_safety_related_incidents_on_assessment_of_value_chain_partners_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_any_corrective_actions_taken_or_underway_on_issues_relating_to_advertising_and_delivery_of_essential_services_or_cyber_security_and_data_privacy_or_recalls_or_penalty_or_action_taken_by_regulatory_authorities_on_safety_of_products_or_services_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_any_corrective_actions_taken_or_underway_to_address_significant_risks_or_concerns_arising_from_the_assessments_of_plant_and_office_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_any_corrective_actions_taken_or_underway_to_address_significant_risks_or_concerns_arising_from_the_assessments_of_value_chain_partner_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_beneficiaries_of_csr_projects_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_business_activities_accounting_for_ninety_percent_of_the_turnover_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_csr_projects_undertaken_in_designated_aspirational_districts_as_identified_by_government_bodies_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_complaints_made_by_employees_and_workers_is_assured_by_assurer_as_per_p3: {
        type: String
    },
    whether_details_of_complaints_made_by_employees_and_workers_is_assured_by_assurer_as_per_p5: {
        type: String
    },
    whether_details_of_complaints_with_regard_to_conflict_of_interest_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_concentration_of_purchases_and_sales_with_trading_houses_dealers_and_related_parties_along_with_loans_and_advances_and_investments_with_related_parties_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_corrective_action_taken_or_underway_on_any_issues_related_to_anti_competitive_conduct_by_the_entity_based_on_adverse_orders_from_regulatory_authorities_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_corrective_actions_taken_or_underway_based_on_any_adverse_order_in_intellectual_property_related_disputes_wherein_usage_of_traditional_knowledge_is_involved_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_employees_as_at_the_end_of_financial_year_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_environmental_impact_assessments_of_projects_undertaken_by_the_entity_based_on_applicable_laws_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_financial_year_for_which_reporting_is_being_done_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_fines_or_penalties_or_punishment_or_award_or_compounding_fees_or_settlement_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_green_house_gas_emissions_and_its_intensity_is_applicable_to_the_company: {
        type: String
    },
    whether_details_of_green_house_gas_emissions_and_its_intensity_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_instances_of_engagement_with_and_actions_taken_to_address_the_concerns_of_vulnerable_or_marginalized_stakeholder_groups_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_instances_of_product_recalls_on_account_of_safety_issues_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_measures_for_the_well_being_of_employees_and_workers_and_spending_on_it_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_measures_undertaken_by_the_entity_to_ensure_that_statutory_dues_have_been_deducted_and_deposited_by_the_value_chain_partners_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_median_of_remuneration_or_salary_or_wages_and_wages_paid_to_female_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_minimum_wages_paid_to_employees_and_workers_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_number_of_consumer_complaints_p9_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_number_of_locations_where_plants_and_or_operations_or_offices_of_the_entity_are_situated_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_operations_or_offices_in_or_around_ecologically_sensitive_areas_where_environmental_approvals_or_clearances_are_required_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_percentage_of_recycled_or_reused_input_material_to_total_material_by_value_used_in_production_or_providing_services_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_performance_and_career_development_reviews_of_employees_and_worker_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_projects_for_which_ongoing_rehabilitation_and_resettlement_is_being_undertaken_by_entity_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_public_policy_positions_advocated_by_the_entity_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_reclaimed_products_and_their_packaging_materials_for_each_product_category_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_retirement_benefits_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_safety_related_incidents_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_significant_direct_and_indirect_impact_of_the_entity_on_biodiversity_in_such_areas_along_with_prevention_and_remediation_activities_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_significant_social_or_environmental_concerns_from_production_or_disposal_of_product_or_service_with_action_taken_to_mitigate_the_same_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_social_impact_assessments_of_projects_undertaken_by_the_entity_based_on_applicable_laws_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_the_appeal_or_revision_preferred_in_cases_where_monetary_or_non_monetary_action_has_been_appealed_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_the_benefits_derived_and_shared_from_the_intellectual_properties_owned_or_acquired_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_the_disclosures_related_to_water_discharged_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_the_disclosures_related_to_water_withdrawal_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_the_highest_authority_responsible_for_implementation_and_oversight_of_the_business_responsibility_policy_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_the_scope_and_coverage_of_any_human_rights_due_diligence_conducted_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_the_stock_exchange_where_the_company_is_listed_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_total_energy_consumption_and_energy_intensity_applicable_to_the_company: {
        type: String
    },
    whether_details_of_total_energy_consumption_in_joules_or_multiples_and_energy_intensity_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_total_scope3_emissions_and_its_intensity_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_training_given_to_employees_and_workers_is_assured_by_assurer: {
        type: String
    },
    whether_details_of_waste_management_practices_adopted_in_your_establishments_and_the_strategy_adopted_by_company_to_reduce_usage_of_hazardous_and_toxic_chemicals_is_assured_by_assurer: {
        type: String
    },
    whether_details_on_assessment_of_value_chain_partners_p3_is_assured_by_assurer: {
        type: String
    },
    whether_details_on_assessment_of_value_chain_partners_p5_is_assured_by_assurer: {
        type: String
    },
    whether_details_related_to_waste_management_by_the_entity_is_assured_by_assurer: {
        type: String
    },
    whether_disclose_any_significant_adverse_impact_to_the_environment_arising_from_the_value_chain_of_the_entity_what_mitigation_or_adaptation_measures_have_been_taken_by_the_entity_in_this_regard_is_assured_by_assurer: {
        type: String
    },
    whether_e_mail_of_the_company_is_assured_by_assurer: {
        type: String
    },
    whether_employees_and_workers_who_have_been_provided_training_on_human_rights_issues_and_policies_of_the_entity_is_assured_by_assurer: {
        type: String
    },
    whether_extended_producer_responsibility_is_applicable_to_the_entity_s_activities: {
        type: String
    },
    whether_green_credits_have_been_generated_or_procured_by_the_listed_entity_and_top_ten_value_chain_partners_is_assured_by_assurer: {
        type: String
    },
    whether_health_and_safety_management_system_is_assured_by_assurer: {
        type: String
    },
    whether_human_rights_requirements_form_part_of_your_business_agreements_and_contracts_is_assured_by_assurer: {
        type: String
    },
    whether_identified_as_vulnerable_and_marginalized_group: {
        type: String
    },
    whether_job_creation_in_smaller_towns_disclose_wages_paid_to_persons_employed_including_employees_or_workers_employed_on_a_permanent_or_non_permanent_or_on_contract_basis_is_assured_by_assurer: {
        type: String
    },
    whether_list_stakeholder_groups_identified_as_key_for_your_entity_and_the_frequency_of_engagement_with_each_stakeholder_group_is_assured_by_assurer: {
        type: String
    },
    whether_markets_served_by_the_entity_is_assured_by_assurer: {
        type: String
    },
    whether_measures_taken_by_the_entity_to_ensure_a_safe_and_healthy_work_place_is_assured_by_assurer: {
        type: String
    },
    whether_mechanisms_in_place_to_inform_consumers_of_any_risk_of_disruption_or_discontinuation_of_essential_services_is_assured_by_assurer: {
        type: String
    },
    whether_mechanisms_to_prevent_adverse_consequences_to_the_complainant_in_discrimination_and_harassment_cases_is_assured_by_assurer: {
        type: String
    },
    whether_name_and_contact_details_of_the_contact_person_in_case_of_any_queries_on_the_brsr_report_is_assured_by_assurer: {
        type: String
    },
    whether_name_of_the_company_is_assured_by_assurer: {
        type: String
    },
    whether_name_of_the_national_and_international_codes_or_certifications_or_labels_or_standards_adopted_by_your_entity_and_mapped_to_each_principle_is_assured_by_assurer: {
        type: String
    },
    whether_names_of_holding_subsidiary_associate_companies_joint_ventures_is_assured_by_assurer: {
        type: String
    },
    whether_number_of_days_of_accounts_payables_is_assured_by_assurer: {
        type: String
    },
    whether_number_of_directors_or_km_ps_or_employees_or_workers_against_whom_disciplinary_action_was_taken_by_any_law_enforcement_agency_for_the_charges_of_bribery_or_corruption_is_assured_by_assurer: {
        type: String
    },
    whether_overview_of_the_entitys_material_responsible_business_conduct_issues_is_assured_by_assurer: {
        type: String
    },
    whether_participation_or_inclusion_or_representation_of_women_is_assured_by_assurer: {
        type: String
    },
    whether_percentage_coverage_by_training_and_awareness_programs_on_any_of_the_principles_during_the_financial_year_for_bod_or_kmp_or_employee_or_worker_is_assured_by_assurer: {
        type: String
    },
    whether_percentage_of_input_material_inputs_to_total_inputs_by_value_sourced_from_suppliers_is_assured_by_assurer: {
        type: String
    },
    whether_percentage_of_r_and_d_and_capital_expenditure_investments_in_specific_technologies_is_assured_by_assurer: {
        type: String
    },
    whether_percentage_of_value_chain_partners_by_value_of_business_done_with_such_partners_that_were_assessed_for_environmental_impacts_is_assured_by_assurer: {
        type: String
    },
    whether_performance_against_above_policies_and_follow_up_action_is_assured_by_assurer: {
        type: String
    },
    whether_performance_of_the_entity_against_the_specific_commitments_goals_and_targets_along_with_reasons_in_case_the_same_are_not_met_is_assured_by_assurer: {
        type: String
    },
    whether_products_or_services_sold_by_the_entity_accounting_for_ninety_percent_of_the_turnover_is_assured_by_assurer: {
        type: String
    },
    whether_reasons_if_policies_not_cover_each_principle_and_its_core_elements_of_the_ngrb_cs_is_assured_by_assurer: {
        type: String
    },
    whether_reporting_boundary_is_assured_by_assurer: {
        type: String
    },
    whether_return_to_work_and_retention_rates_of_permanent_employees_and_workers_that_took_parental_leave_is_assured_by_assurer: {
        type: String
    },
    whether_specific_commitments_goals_and_targets_set_by_the_entity_with_defined_timelines_is_assured_by_assurer: {
        type: String
    },
    whether_stakeholder_consultation_is_used_to_support_the_identification_and_management_of_environmental_and_social_topics: {
        type: String
    },
    whether_statement_by_director_responsible_for_the_business_responsibility_report_highlighting_esg_related_challenges_targets_and_achievements_is_assured_by_assurer: {
        type: String
    },
    whether_steps_taken_to_inform_and_educate_consumers_about_safe_and_responsible_usage_of_products_and_or_services_is_assured_by_assurer: {
        type: String
    },
    whether_telephone_of_company_is_assured_by_assurer: {
        type: String
    },
    whether_the_company_has_undertaken_assessment_or_assurance_of_the_brsr_core: {
        type: String
    },
    whether_the_conditions_of_environmental_approval_or_clearance_are_being_complied_with: {
        type: String
    },
    whether_the_entity_has_translated_the_policy_into_procedures: {
        type: String
    },
    whether_the_entity_has_undertaken_any_specific_initiatives_or_used_innovative_technology_or_solutions_to_improve_resource_efficiency_is_assured_by_assurer: {
        type: String
    },
    whether_the_entity_have_procedures_in_place_for_sustainable_sourcing_and_percentage_of_inputs_were_sourced_sustainably_is_assured_by_assurer: {
        type: String
    },
    whether_the_entity_implemented_a_mechanism_for_zero_liquid_discharge_is_assured_by_assurer: {
        type: String
    },
    whether_the_internal_mechanisms_in_place_to_redress_grievances_related_to_human_rights_issues_is_assured_by_assurer: {
        type: String
    },
    whether_the_mechanisms_in_place_to_receive_and_respond_to_consumer_complaints_and_feedback_is_assured_by_assurer: {
        type: String
    },
    whether_the_premises_or_offices_of_the_entity_accessible_to_differently_abled_employees_and_workers_and_steps_are_being_taken_by_the_entity_if_the_premises_or_offices_of_the_entity_not_accessible_is_assured_by_assurer: {
        type: String
    },
    whether_the_processes_for_consultation_between_stakeholders_and_the_board_on_economic_environmental_and_social_topics_or_if_consultation_is_delegated_how_is_feedback_from_such_consultations_provided_to_the_board_is_assured_by_assurer: {
        type: String
    },
    whether_the_processes_for_identifying_key_stakeholder_groups_of_the_entity_is_assured_by_assurer: {
        type: String
    },
    whether_the_products_and_packaging_reclaimed_at_end_of_life_of_products_amount_reused_or_recycled_or_safely_disposed_is_assured_by_assurer: {
        type: String
    },
    whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards: {
        type: String
    },
    whether_total_scope3_emissions_and_its_intensity_is_applicable_to_the_company: {
        type: String
    },
    whether_turnover_of_products_and_or_services_as_a_percentage_of_turnover_from_all_products_or_service_that_carry_information_about_as_a_percentage_to_total_turnover_is_assured_by_assurer: {
        type: String
    },
    whether_turnover_rate_for_permanent_employees_and_workers_disclose_trends_for_past_three_years_is_assured_by_assurer: {
        type: String
    },
    whether_value_of_shares_paid_up_is_assured_by_assurer: {
        type: String
    },
    whether_water_withdrawal_or_consumption_and_discharge_in_areas_of_water_stress_in_kilolitres_is_assured_by_assurer: {
        type: String
    },
    whether_weblink_where_information_on_products_and_services_of_the_entity_can_be_accessed_is_assured_by_assurer: {
        type: String
    },
    whether_website_of_company_is_assured_by_assurer: {
        type: String
    },
    whether_year_of_incorporation_is_assured_by_assurer: {
        type: String
    },
    whether_you_have_processes_for_workers_to_report_the_work_related_hazards_and_to_remove_themselves_from_such_risks: {
        type: String
    },
    whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs: {
        type: String
    },
}, {
    timestamps: true
});

const BRSRMasterReport = mongoose.model('BRSRMasterReport', brsrMasterReportSchema);
module.exports = BRSRMasterReport;

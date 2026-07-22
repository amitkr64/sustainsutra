// Section: Section C: Principle 8 Leadership Indicators
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_C_Principle_8_Leadership_Indicators = [
  {
    "id": "p8_l1_mitigation_actions",
    "title": "1. Provide details of actions taken to mitigate any negative social impacts identified in the Social Impact Assessments (Reference: Question 1 of Essential Indicators above)",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Provide details of actions taken to mitigate any negative social impacts identified in the Social Impact Assessments",
        "name": "provide_details_of_actions_taken_to_mitigate_any_negative_social_impacts_identified_in_the_social_impact_assessments_explanatory_text_block",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sr_no",
            "label": "Sr. No."
          },
          {
            "id": "details_of_negative_social_impact_identified",
            "label": "Details of negative social impact identified"
          },
          {
            "id": "corrective_action_taken",
            "label": "Corrective action taken"
          }
        ],
        "defaultRow": {
          "details_of_negative_social_impact_identified": "",
          "corrective_action_taken": ""
        }
      }
    ]
  },
  {
    "id": "p8_l2_preferential_procurement",
    "title": "2. Provide the following information on CSR projects undertaken by your entity in designated aspirational districts as identified by government bodies",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Provide the following information on CSR projects undertaken by your entity in designated aspirational districts as identified by government bodies",
        "name": "provide_the_following_information_on_csr_projects_undertaken_by_your_entity_in_designated_aspirational_districts_as_identified_by_government_bodies_explanatory_text_block",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sr_no",
            "label": "Sr. No."
          },
          {
            "id": "state",
            "label": "State"
          },
          {
            "id": "aspirational_district",
            "label": "Aspirational District"
          },
          {
            "id": "amount_spent",
            "label": "Amount spent (In INR)",
            "uiType": "number"
          }
        ],
        "defaultRow": {
          "state": "",
          "aspirational_district": "",
          "amount_spent": ""
        }
      }
    ]
  },
  {
    "id": "p8_l3_preferential_procurement_details",
    "title": "3. (a) Do you have a preferential procurement policy where you give preference to purchase from suppliers comprising marginalized /vulnerable groups? (Yes/No/NA)",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Do you have a preferential procurement policy where you give preference to purchase from suppliers comprising marginalized /vulnerable groups? (Yes/No/NA)",
        "name": "whether_you_have_a_preferential_procurement_policy_where_you_give_preference_to_purchase_from_suppliers_comprising_marginalized_or_vulnerable_groups",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "label": "If NA, provide details.",
        "name": "p8_l3_procurement_na_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "whether_you_have_a_preferential_procurement_policy_where_you_give_preference_to_purchase_from_suppliers_comprising_marginalized_or_vulnerable_groups",
          "value": "NA"
        }
      },
      {
        "label": "(b) From which marginalized /vulnerable groups do you procure?",
        "name": "from_which_marginalized_or_vulnerable_groups_do_you_procure_explanatory_text_block",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "whether_you_have_a_preferential_procurement_policy_where_you_give_preference_to_purchase_from_suppliers_comprising_marginalized_or_vulnerable_groups",
          "value": "Yes"
        }
      },
      {
        "label": "(c) What percentage of total procurement (by value) does it constitute?",
        "name": "what_percentage_of_total_procurement_by_value_does_it_constitute",
        "uiType": "number",
        "dependsOn": {
          "field": "whether_you_have_a_preferential_procurement_policy_where_you_give_preference_to_purchase_from_suppliers_comprising_marginalized_or_vulnerable_groups",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "p8_l4_traditional_knowledge",
    "title": "4. Details of the benefits derived and shared from the intellectual properties owned or acquired by your entity (in the current financial year), based on traditional knowledge",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Details of the benefits derived and shared from the intellectual properties owned or acquired by your entity (in the current financial year), based on traditional knowledge",
        "name": "details_of_the_benefits_derived_and_shared_from_the_intellectual_properties_owned_or_acquired_by_your_entity_in_the_current_financial_year_based_on_traditional_knowledge_explanatory_text_block",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sr_no",
            "label": "Sr.No."
          },
          {
            "id": "intellectual_property_based_on_traditional_knowledge",
            "label": "Intellectual Property based on traditional knowledge"
          },
          {
            "id": "owned_acquired",
            "label": "Owned/ Acquired (Yes/No)"
          },
          {
            "id": "benefit_shared",
            "label": "Benefit shared (Yes / No)"
          },
          {
            "id": "basis_of_calculating_benefit_share",
            "label": "Basis of calculating benefit share"
          }
        ],
        "defaultRow": {
          "intellectual_property_based_on_traditional_knowledge": "",
          "owned_acquired": "",
          "benefit_shared": "",
          "basis_of_calculating_benefit_share": ""
        }
      }
    ]
  },
  {
    "id": "p8_l5_corrective_actions",
    "title": "5. Details of corrective actions taken or underway, based on any adverse order in intellectual property related disputes wherein usage of traditional knowledge is involved",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Details of corrective actions taken or underway, based on any adverse order in intellectual property related disputes wherein usage of traditional knowledge is involved",
        "name": "details_of_corrective_actions_taken_or_underway_based_on_any_adverse_order_in_intellectual_property_related_disputes_wherein_usage_of_traditional_knowledge_is_involved_explanatory_text_block",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sr_no",
            "label": "Sr.No."
          },
          {
            "id": "name_of_authority",
            "label": "Name of authority"
          },
          {
            "id": "brief_of_the_case",
            "label": "Brief of the Case"
          },
          {
            "id": "corrective_action_taken",
            "label": "Corrective action taken"
          }
        ],
        "defaultRow": {
          "name_of_authority": "",
          "brief_of_the_case": "",
          "corrective_action_taken": ""
        }
      }
    ]
  },
  {
    "id": "p8_l6_csr_projects",
    "title": "6. Details of beneficiaries of CSR Projects",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Details of beneficiaries of CSR Projects",
        "name": "details_of_beneficiaries_of_csr_projects_explanatory_text_block",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sr_no",
            "label": "Sr.No."
          },
          {
            "id": "csr_project",
            "label": "CSR Project"
          },
          {
            "id": "no_of_persons_benefitted",
            "label": "No. of persons benefitted from CSR Projects",
            "uiType": "number"
          },
          {
            "id": "percentage_from_vulnerable_groups",
            "label": "% of beneficiaries from vulnerable and marginalized groups",
            "uiType": "number"
          }
        ],
        "defaultRow": {
          "csr_project": "",
          "no_of_persons_benefitted": "",
          "percentage_from_vulnerable_groups": ""
        }
      }
    ]
  },
  {
    "id": "p8_l7_notes",
    "title": "Notes",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Notes",
        "name": "notes_for_principle_8_leadership_indicators_explanatory_text_block",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Notes"
      }
    ]
  }
];

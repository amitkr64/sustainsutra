// Section: Section B: Management and Process Disclosures
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_B_Management_and_Process_Disclosures = [
  {
    "id": "b1_policy_matrix",
    "title": "Policy and management processes",
    "type": "matrix",
    "columns": [
      "P1",
      "P2",
      "P3",
      "P4",
      "P5",
      "P6",
      "P7",
      "P8",
      "P9"
    ],
    "rows": [
      {
        "name": "whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs",
        "label": "1. a. Whether your entity's policy/policies cover each principle and its core elements of the NGRBCs. (Yes/No/NA)",
        "inputType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "name": "q1a_na_details",
        "label": "If NA, provide details",
        "inputType": "textarea",
        "matrixDependsOn": {
          "row": "whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs",
          "value": "NA"
        }
      },
      {
        "name": "has_the_policy_been_approved_by_the_board",
        "label": "b. Has the policy been approved by the Board? (Yes/No/NA)",
        "inputType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "name": "q1b_na_details",
        "label": "If b is NA, provide details",
        "inputType": "textarea",
        "matrixDependsOn": {
          "row": "has_the_policy_been_approved_by_the_board",
          "value": "NA"
        }
      },
      {
        "name": "web_link_of_the_policies_explanatory_text_block",
        "label": "c. Web Link of the Policies, if available",
        "inputType": "textarea",
        "matrixDependsOn": {
          "row": "has_the_policy_been_approved_by_the_board",
          "value": "Yes"
        }
      },
      {
        "name": "whether_the_entity_has_translated_the_policy_into_procedures",
        "label": "2. Whether the entity has translated the policy into procedures. (Yes / No/ NA)",
        "inputType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "name": "q2_na_details",
        "label": "If 2 is NA, provide details",
        "inputType": "textarea",
        "matrixDependsOn": {
          "row": "whether_the_entity_has_translated_the_policy_into_procedures",
          "value": "NA"
        }
      },
      {
        "name": "do_the_enlisted_policies_extend_to_your_value_chain_partners",
        "label": "3. Do the enlisted policies extend to your value chain partners? (Yes/No/NA)",
        "inputType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "name": "q3_na_details",
        "label": "If 3 is NA, provide details",
        "inputType": "textarea",
        "matrixDependsOn": {
          "row": "do_the_enlisted_policies_extend_to_your_value_chain_partners",
          "value": "NA"
        }
      },
      {
        "name": "name_of_the_national_and_international_codes_or_certifications_or_labels_or_standards_adopted_by_your_entity_and_mapped_to_each_principle_explanatory_text_block",
        "label": "4. Name of the national and international codes/certifications/labels/ standards adopted by your entity and mapped to each principle.",
        "inputType": "textarea"
      },
      {
        "name": "specific_commitments_goals_and_targets_set_by_the_entity_with_defined_timelines_explanatory_text_block",
        "label": "5. Specific commitments, goals and targets set by the entity with defined timelines, if any.",
        "inputType": "textarea"
      },
      {
        "name": "performance_of_the_entity_against_the_specific_commitments_goals_and_targets_along_with_reasons_in_case_the_same_are_not_met_explanatory_text_block",
        "label": "6. Performance of the entity against the specific commitments, goals and targets along-with reasons in case the same are not met.",
        "inputType": "textarea"
      }
    ]
  },
  {
    "id": "b2_governance_oversight",
    "title": "Governance, leadership and oversight",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "name": "statement_by_director_responsible_for_the_business_responsibility_report_highlighting_esg_related_challenges_targets_and_achievements_explanatory_text_block",
        "label": "7. Statement by director responsible for the business responsibility report, highlighting ESG related challenges, targets and achievements",
        "uiType": "textarea"
      },
      {
        "name": "details_of_the_highest_authority_responsible_for_implementation_and_oversight_of_the_business_responsibility_policy_explanatory_text_block",
        "label": "8. Details of the highest authority responsible for implementation and oversight of the Business Responsibility policy (ies).",
        "uiType": "textarea"
      },
      {
        "name": "does_the_entity_have_a_specified_committee_of_the_board_or_director_responsible_for_decision_making_on_sustainability_related_issues",
        "label": "9. Does the entity have a specified Committee of the Board/ Director responsible for decision making on sustainability related issues? (Yes / No/ NA)",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "name": "if_yes_provide_details_explanatory_text_block",
        "label": "If yes, provide details.",
        "uiType": "textarea",
        "dependsOn": {
          "field": "does_the_entity_have_a_specified_committee_of_the_board_or_director_responsible_for_decision_making_on_sustainability_related_issues",
          "value": "Yes"
        }
      },
      {
        "name": "the_entity_has_not_applicable_a_specified_committee_for_decision_making_on_sustainability_related_issues_explanatory_text_block",
        "label": "If No/NA, provide reasons.",
        "uiType": "textarea",
        "dependsOn": {
          "field": "does_the_entity_have_a_specified_committee_of_the_board_or_director_responsible_for_decision_making_on_sustainability_related_issues",
          "value": [
            "No",
            "NA"
          ]
        }
      }
    ]
  },
  {
    "id": "b3_review_matrix",
    "title": "10. Details of Review of NGRBCs by the Company",
    "type": "matrix",
    "columns": [
      "P1",
      "P2",
      "P3",
      "P4",
      "P5",
      "P6",
      "P7",
      "P8",
      "P9"
    ],
    "rows": [
      {
        "id": "h_reviewer",
        "label": "Indicate whether review was undertaken by Director/Committee of the Board/Any other Committee",
        "isHeader": true
      },
      {
        "name": "performance_against_above_policies_and_follow_up_action_indicate_whether_review_was_undertaken_by",
        "label": "Performance against above policies and follow up action",
        "inputType": "select",
        "options": [
          "Director",
          "Committee of the Board",
          "Any other Committee"
        ]
      },
      {
        "name": "description_of_other_committee_for_performance_against_above_policies_and_follow_up_action",
        "label": "Description of other committee for performance against above policies and follow up action",
        "inputType": "textarea",
        "matrixDependsOn": {
          "row": "performance_against_above_policies_and_follow_up_action_indicate_whether_review_was_undertaken_by",
          "value": "Any other Committee"
        }
      },
      {
        "name": "compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_indicate_whether_review_was_undertaken_by",
        "label": "Compliance with statutory requirements of relevance to the principles and rectification of any non-compliances",
        "inputType": "select",
        "options": [
          "Director",
          "Committee of the Board",
          "Any other Committee"
        ]
      },
      {
        "name": "description_of_other_committee_for_compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification",
        "label": "Description of other committee for compliance with statutory requirements",
        "inputType": "textarea",
        "matrixDependsOn": {
          "row": "compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_indicate_whether_review_was_undertaken_by",
          "value": "Any other Committee"
        }
      },
      {
        "id": "h_freq",
        "label": "Frequency (Annually / Half yearly/ Quarterly/ Any other- please specify)",
        "isHeader": true
      },
      {
        "name": "performance_against_above_policies_and_follow_up_action_frequency",
        "label": "Frequency of performance review",
        "inputType": "select",
        "options": [
          "Annually",
          "Half yearly",
          "Quarterly",
          "Any other"
        ],
        "matrixDependsOn": {
          "row": "performance_against_above_policies_and_follow_up_action_indicate_whether_review_was_undertaken_by",
          "operator": "not",
          "value": ""
        }
      },
      {
        "name": "description_of_other_frequency_for_performance_against_above_policies_and_follow_up_action_frequency",
        "label": "Specify other frequency (Performance)",
        "inputType": "textarea",
        "matrixDependsOn": {
          "row": "performance_against_above_policies_and_follow_up_action_frequency",
          "value": "Any other"
        }
      },
      {
        "name": "compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_frequency",
        "label": "Frequency of statutory compliance review",
        "inputType": "select",
        "options": [
          "Annually",
          "Half yearly",
          "Quarterly",
          "Any other"
        ],
        "matrixDependsOn": {
          "row": "compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_indicate_whether_review_was_undertaken_by",
          "operator": "not",
          "value": ""
        }
      },
      {
        "name": "description_of_other_frequency_for_compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances",
        "label": "Specify other frequency (Statutory)",
        "inputType": "textarea",
        "matrixDependsOn": {
          "row": "compliance_with_statutory_requirements_of_relevance_to_the_principles_and_rectification_of_any_non_compliances_frequency",
          "value": "Any other"
        }
      }
    ]
  },
  {
    "id": "b4_assessment_matrix",
    "title": "11. Independent Assessment/Evaluation",
    "type": "matrix",
    "columns": [
      "P1",
      "P2",
      "P3",
      "P4",
      "P5",
      "P6",
      "P7",
      "P8",
      "P9"
    ],
    "rows": [
      {
        "name": "has_the_entity_carried_out_independent_assessment_evaluation_of_the_working_of_its_policies_by_an_external_agency",
        "label": "Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency? (Yes/No)",
        "inputType": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "name": "provide_name_of_the_agency_explanatory_text_block",
        "label": "If Yes, Provide name of the agency",
        "inputType": "textarea",
        "matrixDependsOn": {
          "row": "has_the_entity_carried_out_independent_assessment_evaluation_of_the_working_of_its_policies_by_an_external_agency",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "b5_reasons_matrix",
    "title": "12. If answer to question (1) above is “No” i.e. not all Principles are covered by a policy, reasons to be stated:",
    "type": "matrix",
    "columns": [
      "P1",
      "P2",
      "P3",
      "P4",
      "P5",
      "P6",
      "P7",
      "P8",
      "P9"
    ],
    "dynamic": true,
    "storageField": "q12_dynamic_reasons_json",
    "defaultDynamicRow": {
      "label": "Any other reason (.......specifying here)",
      "inputType": "select",
      "options": [
        "Yes",
        "No",
        "NA",
        "-"
      ],
      "matrixDependsOn": {
        "row": "whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs",
        "value": "No"
      }
    },
    "rows": [
      {
        "name": "the_entity_does_not_consider_the_principles_material_to_its_business",
        "label": "The entity does not consider the Principles material to its business (Yes/No)",
        "inputType": "select",
        "options": [
          "Yes",
          "No"
        ],
        "matrixDependsOn": {
          "row": "whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs",
          "value": "No"
        }
      },
      {
        "name": "the_entity_is_not_at_a_stage_where_it_is_in_a_position_to_formulate_and_implement_the_policies_on_specified_principles",
        "label": "The entity is not at a stage where it is in a position to formulate and implement the policies on specified principles (Yes/No)",
        "inputType": "select",
        "options": [
          "Yes",
          "No"
        ],
        "matrixDependsOn": {
          "row": "whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs",
          "value": "No"
        }
      },
      {
        "name": "the_entity_does_not_have_the_financial_or_human_and_technical_resources_available_for_the_task",
        "label": "The entity does not have the financial or human and technical resources available for the task (Yes/No)",
        "inputType": "select",
        "options": [
          "Yes",
          "No"
        ],
        "matrixDependsOn": {
          "row": "whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs",
          "value": "No"
        }
      },
      {
        "name": "it_is_planned_to_be_done_in_the_next_financial_year",
        "label": "It is planned to be done in the next financial year (Yes/No)",
        "inputType": "select",
        "options": [
          "Yes",
          "No"
        ],
        "matrixDependsOn": {
          "row": "whether_your_entitys_policy_or_policies_cover_each_principle_and_its_core_elements_of_the_ngrb_cs",
          "value": "No"
        }
      }
    ]
  },
  {
    "id": "b6_notes",
    "title": "Notes on Management and Process Disclosures",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "name": "notes_management_and_process_disclosures_explanatory_text_block",
        "label": "Notes / Further Information regarding Management and Process Disclosures",
        "uiType": "textarea"
      }
    ]
  }
];

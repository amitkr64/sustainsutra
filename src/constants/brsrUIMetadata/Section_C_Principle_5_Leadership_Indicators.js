// Section: Section C: Principle 5 Leadership Indicators
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_C_Principle_5_Leadership_Indicators = [
  {
    "id": "p5_l1_business_process_modified",
    "title": "1. Details of a business process being modified / Introduced as a result of addressing human rights grievances/complaints.",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Details of a business process being modified / Introduced as a result of addressing human rights grievances/complaints",
        "name": "details_of_a_business_process_being_modified_introduced_as_a_result_of_addressing_human_rights_grievances_complaints",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p5_l2_due_diligence",
    "title": "2. Details of the scope and coverage of any Human rights due-diligence conducted",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Details of the scope and coverage of any Human rights due-diligence conducted",
        "name": "details_of_the_scope_and_coverage_of_any_human_rights_due_diligence_conducted_explanatory_text_block",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p5_l3_accessibility",
    "title": "3. Is the premise/office of the entity accessible to differently abled visitors, as per the requirements of the Rights of Persons with Disabilities Act, 2016?",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Is the premise/office of the entity accessible to differently abled visitors? (Yes/No)",
        "name": "whether_the_premise_or_office_of_the_entity_accessible_to_differently_abled_visitors_as_per_the_requirements_of_the_rights_of_persons_with_disabilities_act2016",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      }
    ]
  },
  {
    "id": "p5_l4_value_chain_assessments",
    "title": "4. Details on assessment of value chain partners:",
    "type": "table",
    "popup": true,
    "label": "Add Assessment Details",
    "fixedRows": true,
    "columns": [
      {
        "id": "category",
        "label": ""
      },
      {
        "id": "pct",
        "label": "% of value chain partners (by value of business done with such partners) that were assessed"
      }
    ],
    "rows": [
      {
        "id": "sexual_harassment",
        "label": "Sexual harassment"
      },
      {
        "id": "discrimination",
        "label": "Discrimination at workplace"
      },
      {
        "id": "child_labour",
        "label": "Child Labour"
      },
      {
        "id": "forced_labour",
        "label": "Forced Labour/Involuntary Labour"
      },
      {
        "id": "wages",
        "label": "Wages"
      },
      {
        "id": "others",
        "label": "Others – please specify"
      }
    ],
    "fields": [
      {
        "name": "p5_l4_sexual_harassment_pct",
        "row": "sexual_harassment",
        "mapping": "pct",
        "uiType": "number"
      },
      {
        "name": "p5_l4_discrimination_pct",
        "row": "discrimination",
        "mapping": "pct",
        "uiType": "number"
      },
      {
        "name": "p5_l4_child_labour_pct",
        "row": "child_labour",
        "mapping": "pct",
        "uiType": "number"
      },
      {
        "name": "p5_l4_forced_labour_pct",
        "row": "forced_labour",
        "mapping": "pct",
        "uiType": "number"
      },
      {
        "name": "p5_l4_wages_pct",
        "row": "wages",
        "mapping": "pct",
        "uiType": "number"
      },
      {
        "name": "p5_l4_others_details",
        "row": "others",
        "mapping": "pct",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p5_l5_corrective_actions_vc",
    "title": "5. Provide details of any corrective actions taken or underway to address significant risks / concerns arising from the assessments at Question 10 above.",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Provide details of any corrective actions taken or underway",
        "name": "details_of_any_corrective_actions_taken_or_underway_to_address_significant_risks_or_concerns_arising_from_the_assessments_of_value_chain_partner_explanatory_text_block",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p5_l_notes",
    "title": "Notes",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Notes",
        "name": "notes_for_principle_5_leadership_indicators",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Notes"
      }
    ]
  }
];

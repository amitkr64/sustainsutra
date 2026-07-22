// Section: Section C: Principle 2 Essential Indicators
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_C_Principle_2_Essential_Indicators = [
  {
    "id": "p2_e1_rnd_capex",
    "title": "1. Percentage of R&D and capital expenditure (capex) investments in specific technologies to improve the environmental and social impacts of product and processes to total R&D and capex respectively:",
    "type": "table",
    "dynamic": true,
    "disableAddDelete": true,
    "storageField": "percentage_of_r_and_d_and_capital_expenditure_investments_in_specific_technologies",
    "columns": [
      {
        "id": "segment",
        "label": "Segment"
      },
      {
        "id": "cy_pct",
        "label": "Current Financial Year (%)",
        "uiType": "number"
      },
      {
        "id": "py_pct",
        "label": "Previous Financial Year (%)",
        "uiType": "number"
      },
      {
        "id": "details",
        "label": "Details of improvements"
      }
    ],
    "defaultRows": [
      {
        "segment": "R&D",
        "cy_pct": "",
        "py_pct": "",
        "details": ""
      },
      {
        "segment": "Capex",
        "cy_pct": "",
        "py_pct": "",
        "details": ""
      }
    ]
  },
  {
    "id": "p2_e2_sustainable_sourcing",
    "title": "2. Sustainable Sourcing",
    "type": "grid",
    "columns": 2,
    "fields": [
      {
        "label": "a. Does the entity have procedures in place for sustainable sourcing? (Yes/No)",
        "name": "does_the_entity_have_procedures_in_place_for_sustainable_sourcing",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "label": "b. If yes, what percentage of inputs were sourced sustainably?",
        "name": "percentage_of_inputs_were_sourced_sustainably",
        "uiType": "number",
        "dependsOn": {
          "field": "does_the_entity_have_procedures_in_place_for_sustainable_sourcing",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "p2_e3_reclaim_processes",
    "title": "3. Describe the processes in place to safely reclaim your products for reusing, recycling and disposing at the end of life:",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "(a) Plastics (including packaging)",
        "name": "describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_plastics_including_packaging_explanatory_text_block",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "process",
            "label": "Details of the Process"
          }
        ],
        "defaultRow": {
          "process": ""
        }
      },
      {
        "label": "(b) E-waste",
        "name": "describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_e_waste_explanatory_text_block",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "process",
            "label": "Details of the Process"
          }
        ],
        "defaultRow": {
          "process": ""
        }
      },
      {
        "label": "(c) Hazardous waste",
        "name": "describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_hazardous_waste_explanatory_text_block",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "process",
            "label": "Details of the Process"
          }
        ],
        "defaultRow": {
          "process": ""
        }
      },
      {
        "label": "(d) Other waste",
        "name": "describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_other_waste_explanatory_text_block",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "process",
            "label": "Details of the Process"
          }
        ],
        "defaultRow": {
          "process": ""
        }
      }
    ]
  },
  {
    "id": "p2_e4_epr",
    "title": "4. Extended Producer Responsibility (EPR)",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Whether Extended Producer Responsibility (EPR) is applicable to the entity's activities (Yes/No).",
        "name": "whether_extended_producer_responsibility_is_applicable_to_the_entity_s_activities",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "label": "If yes, whether the waste collection plan is in line with the Extended Producer Responsibility (EPR) plan submitted to Pollution Control Boards?",
        "name": "whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ],
        "dependsOn": {
          "field": "whether_extended_producer_responsibility_is_applicable_to_the_entity_s_activities",
          "value": "Yes"
        }
      },
      {
        "label": "If not, provide steps taken to address the same.",
        "name": "steps_taken_to_address_the_waste_collection_plan_explanatory_text_block",
        "uiType": "textarea",
        "dependsOn": {
          "field": "whether_the_waste_collection_plan_is_in_line_with_the_extended_producer_responsibility_plan_submitted_to_pollution_control_boards",
          "value": "No"
        }
      }
    ]
  }
];

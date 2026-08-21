// Section: Section C: Principle 1 Leadership Indicators
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_C_Principle_1_Leadership_Indicators = [
  {
    "id": "awareness_value_chain_section",
    "title": "1. Awareness programmes conducted for value chain partners on any of the Principles during the financial year:",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Awareness Details",
        "name": "assurance_sub_type_for_awareness_programmes_conducted_for_value_chain_partners_on_any_of_the_principles_during_the_financial_year",
        "uiType": "popup",
        "subType": "table",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "total_held",
            "label": "Total Number of Awareness Programmes Held",
            "uiType": "number"
          },
          {
            "id": "topics",
            "label": "Topics / principles covered under the training"
          },
          {
            "id": "percentage",
            "label": "Percentage of value chain partners covered",
            "uiType": "number"
          }
        ],
        "defaultRow": {
          "total_held": "",
          "topics": "",
          "percentage": ""
        }
      }
    ]
  },
  {
    "id": "board_conflict_interest_grid",
    "title": "2. Conflict of Interests involving members of the Board:",
    "type": "grid",
    "columns": 2,
    "fields": [
      {
        "label": "Does the entity have processes in place to avoid/ manage conflict of interests involving members of the Board?",
        "name": "does_the_entity_have_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "label": "If NA, provide details",
        "name": "details_of_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board_na",
        "uiType": "popup",
        "dependsOn": {
          "field": "does_the_entity_have_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board",
          "value": "NA"
        }
      },
      {
        "label": "If Yes, provide details of the same.",
        "name": "details_of_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board",
        "uiType": "textarea",
        "dependsOn": {
          "field": "does_the_entity_have_processes_in_place_to_avoid_or_manage_conflict_of_interests_involving_members_of_the_board",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "p1_leadership_notes",
    "title": "Notes",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Notes",
        "name": "notes_principle1_explanatory_text_block",
        "uiType": "popup"
      }
    ]
  }
];

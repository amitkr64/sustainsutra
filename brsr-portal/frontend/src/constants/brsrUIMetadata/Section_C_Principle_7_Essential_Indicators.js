// Section: Section C: Principle 7 Essential Indicators
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_C_Principle_7_Essential_Indicators = [
  {
    "id": "p7_e1_affiliations_number",
    "title": "1. a. Number of affiliations with trade and industry chambers/ associations",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Number of affiliations with trade and industry chambers/ associations",
        "name": "number_of_affiliations_with_trade_and_industry_chambers_or_associations",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "p7_e1_affiliations_list",
    "title": "b. List the top 10 trade and industry chambers/ associations (determined based on the total members of such body) the entity is a member of/ affiliated to",
    "type": "table",
    "popup": false,
    "dynamic": true,
    "storageField": "p7_e1_affiliations_list_data",
    "dynamicRowCount": {
      "field": "number_of_affiliations_with_trade_and_industry_chambers_or_associations",
      "max": 10
    },
    "columns": [
      {
        "id": "sno",
        "label": "Sr. No."
      },
      {
        "id": "name",
        "label": "Name of the trade and industry chambers/ associations"
      },
      {
        "id": "reach",
        "label": "Reach of trade and industry chambers/ associations (State/National/International)"
      }
    ],
    "defaultRow": {
      "name": "",
      "reach": ""
    }
  },
  {
    "id": "p7_e2_anti_competitive_conduct",
    "title": "2. Provide details of corrective action taken or underway on any issues related to anti-competitive conduct by the entity, based on adverse orders from regulatory authorities",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Provide details of corrective action taken or underway on any issues related to anti-competitive conduct by the entity, based on adverse orders from regulatory authorities",
        "name": "provide_details_of_corrective_action_taken_or_underway_on_any_issues_related_to_anti_competitive_conduct_by_the_entity_based_on_adverse_orders_from_regulatory_authorities_explanatory_text_block",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sr_no",
            "label": "Sr. No."
          },
          {
            "id": "name_of_authority",
            "label": "Name of authority"
          },
          {
            "id": "brief_of_case",
            "label": "Brief of the case"
          },
          {
            "id": "corrective_action_taken",
            "label": "Corrective action taken"
          }
        ],
        "defaultRow": {
          "name_of_authority": "",
          "brief_of_case": "",
          "corrective_action_taken": ""
        }
      }
    ]
  }
];

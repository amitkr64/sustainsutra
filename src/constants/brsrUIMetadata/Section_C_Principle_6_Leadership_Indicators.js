// Section: Section C: Principle 6 Leadership Indicators
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_C_Principle_6_Leadership_Indicators = [
  {
    "id": "p6_l1_water_stress",
    "title": "1. Water withdrawal, consumption and discharge in areas of water stress (in kilolitres):",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "For each facility / plant located in areas of water stress, provide the following information:",
        "name": "p6_l1_facility_details",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "facility_name",
            "label": "Name of area / facility"
          },
          {
            "id": "nature_ops",
            "label": "Nature of operations"
          },
          {
            "id": "withdrawal",
            "label": "Water withdrawal"
          },
          {
            "id": "consumption",
            "label": "Water consumption"
          },
          {
            "id": "discharge",
            "label": "Water discharge"
          }
        ],
        "defaultRow": {
          "facility_name": "",
          "nature_ops": "",
          "withdrawal": "",
          "consumption": "",
          "discharge": ""
        }
      },
      {
        "label": "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N)",
        "name": "p6_l1_independent_assessment",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "label": "If yes, name of the external agency.",
        "name": "p6_l1_external_agency_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_l1_independent_assessment",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "p6_l2_scope3_emissions_applicability",
    "title": "2. Please provide details of total Scope 3 emissions & its intensity, in the following format:",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Whether total Scope 3 emissions & its intensity is applicable to the company?",
        "name": "p6_l2_is_applicable",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      }
    ]
  },
  {
    "id": "p6_l2_scope3_table",
    "title": "",
    "type": "table",
    "popup": false,
    "columns": [
      {
        "id": "parameter",
        "label": "Parameter"
      },
      {
        "id": "unit",
        "label": "Unit"
      },
      {
        "id": "fy",
        "label": "FY (-)"
      },
      {
        "id": "py",
        "label": "PY (-)"
      }
    ],
    "rows": [
      {
        "id": "total_scope3",
        "label": "Total Scope 3 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)"
      },
      {
        "id": "intensity_turnover",
        "label": "Total Scope 3 emissions per rupee of turnover"
      },
      {
        "id": "intensity_optional",
        "label": "Total Scope 3 emission intensity (optional) – the relevant metric may be selected by the entity"
      }
    ],
    "fields": [
      {
        "name": "p6_l2_scope3_unit",
        "row": "total_scope3",
        "mapping": "unit",
        "uiType": "select",
        "options": [
          "tCO2e",
          "ktCO2e",
          "MtCO2e",
          "GtCO2e"
        ],
        "dependsOn": {
          "field": "p6_l2_is_applicable",
          "value": "Yes"
        },
        "showWhenDisabled": true
      },
      {
        "name": "p6_l2_scope3_fy",
        "row": "total_scope3",
        "mapping": "fy",
        "uiType": "number",
        "dependsOn": {
          "field": "p6_l2_is_applicable",
          "value": "Yes"
        },
        "showWhenDisabled": true
      },
      {
        "name": "p6_l2_scope3_py",
        "row": "total_scope3",
        "mapping": "py",
        "uiType": "number",
        "dependsOn": {
          "field": "p6_l2_is_applicable",
          "value": "Yes"
        },
        "showWhenDisabled": true
      },
      {
        "name": "p6_l2_turnover_unit",
        "row": "intensity_turnover",
        "mapping": "unit",
        "uiType": "text",
        "readOnly": true,
        "dependsOn": {
          "field": "p6_l2_is_applicable",
          "value": "Yes"
        },
        "showWhenDisabled": true
      },
      {
        "name": "p6_l2_turnover_fy",
        "row": "intensity_turnover",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true,
        "dependsOn": {
          "field": "p6_l2_is_applicable",
          "value": "Yes"
        },
        "showWhenDisabled": true
      },
      {
        "name": "p6_l2_turnover_py",
        "row": "intensity_turnover",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true,
        "dependsOn": {
          "field": "p6_l2_is_applicable",
          "value": "Yes"
        },
        "showWhenDisabled": true
      },
      {
        "name": "p6_l2_optional_unit",
        "row": "intensity_optional",
        "mapping": "unit",
        "uiType": "select",
        "options": [
          "tCO2e",
          "ktCO2e",
          "MtCO2e",
          "GtCO2e"
        ],
        "dependsOn": {
          "field": "p6_l2_is_applicable",
          "value": "Yes"
        },
        "showWhenDisabled": true
      },
      {
        "name": "p6_l2_optional_fy",
        "row": "intensity_optional",
        "mapping": "fy",
        "uiType": "number",
        "dependsOn": {
          "field": "p6_l2_is_applicable",
          "value": "Yes"
        },
        "showWhenDisabled": true
      },
      {
        "name": "p6_l2_optional_py",
        "row": "intensity_optional",
        "mapping": "py",
        "uiType": "number",
        "dependsOn": {
          "field": "p6_l2_is_applicable",
          "value": "Yes"
        },
        "showWhenDisabled": true
      }
    ]
  },
  {
    "id": "p6_l2_assessment",
    "title": "",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N)",
        "name": "p6_l2_independent_assessment",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "label": "If yes, name of the external agency.",
        "name": "p6_l2_external_agency_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_l2_independent_assessment",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "p6_l3_biodiversity_impact",
    "title": "3. With respect to the ecologically sensitive areas reported at Question 10 of Essential Indicators above",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "3. With respect to the ecologically sensitive areas reported at Question 10 of Essential Indicators above, provide details of significant direct & indirect impact of the entity on biodiversity in such areas along-with prevention and remediation activities.",
        "name": "p6_l3_biodiversity_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p6_l4_innovative_tech",
    "title": "4. Specifically initiatives or used innovative technology or solutions to improve resource efficiency",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "4. If the entity has undertaken any specific initiatives or used innovative technology or solutions to improve resource efficiency, or reduce impact due to emissions / effluent discharge / waste generated, please provide details of the same as well as outcome of such initiatives, as per the following format:",
        "name": "p6_l4_tech_details",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "initiative",
            "label": "Initiative undertaken"
          },
          {
            "id": "details",
            "label": "Details of the initiative"
          },
          {
            "id": "outcome",
            "label": "Outcome of the initiative"
          }
        ],
        "defaultRow": {
          "initiative": "",
          "details": "",
          "outcome": ""
        }
      }
    ]
  },
  {
    "id": "p6_l5_continuity_plan",
    "title": "5. Does the entity have a business continuity and disaster management plan?",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "5. Does the entity have a business continuity and disaster management plan? (Yes/No/NA)",
        "name": "p6_l5_continuity_status",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "label": "Details of entity at which business continuity and disaster management plan is placed or weblink.",
        "name": "p6_l5_plan_location",
        "uiType": "text",
        "placeholder": "Enter location or weblink...",
        "dependsOn": {
          "field": "p6_l5_continuity_status",
          "value": "Yes"
        }
      },
      {
        "label": "If NA, provide details.",
        "name": "p6_l5_continuity_na_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_l5_continuity_status",
          "value": "NA"
        }
      }
    ]
  },
  {
    "id": "p6_l6_value_chain_impact",
    "title": "6. Significant adverse impact to the environment arising from value chain",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "6. Disclose any significant adverse impact to the environment, arising from the value chain of the entity. What mitigation or adaptation measures have been taken by the entity in this regard.",
        "name": "p6_l6_impact_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p6_l7_partner_assessment",
    "title": "7. Percentage of value chain partners assessed for environmental impacts",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "7. Percentage of value chain partners (by value of business done with such partners) that were assessed for environmental impacts.",
        "name": "p6_l7_partner_assessment_pct",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "p6_l8_green_credits",
    "title": "8. How many Green Credits have been generated or procured:",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "a. By the listed entity",
        "name": "p6_l8_credits_listed_entity",
        "uiType": "number"
      },
      {
        "label": "b. By the top ten (in terms of value of purchases and sales, respectively) value chain partners",
        "name": "p6_l8_credits_partners",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "p6_l_notes",
    "title": "Notes",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Notes",
        "name": "p6_l_notes_text",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Notes"
      }
    ]
  }
];

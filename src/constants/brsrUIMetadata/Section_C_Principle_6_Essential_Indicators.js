// Section: Section C: Principle 6 Essential Indicators
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_C_Principle_6_Essential_Indicators = [
  {
    "id": "p6_e1_energy_consumption_v2",
    "title": "1. Details of total energy consumption (in Joules or multiples) and energy intensity, in the following format:",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Whether total energy consumption and energy intensity is applicable to the company?",
        "name": "p6_e1_applicability",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "label": "Revenue from operations (in Rs.)",
        "type": "group",
        "fields": [
          {
            "name": "p6_e1_revenue_fy",
            "label": "FY (-)",
            "uiType": "number"
          },
          {
            "name": "p6_e1_revenue_py",
            "label": "PY (-)",
            "uiType": "number"
          }
        ]
      }
    ]
  },
  {
    "id": "p6_e1_energy_table",
    "type": "table",
    "popup": true,
    "label": "Add Energy Details",
    "fixedRows": true,
    "dependsOn": {
      "field": "p6_e1_applicability",
      "value": "Yes"
    },
    "columns": [
      {
        "id": "parameter",
        "label": "Parameter"
      },
      {
        "id": "units",
        "label": "Units"
      },
      {
        "id": "fy",
        "label": "FY (-)"
      },
      {
        "id": "py",
        "label": "PY (-)"
      },
      {
        "id": "details",
        "label": ""
      }
    ],
    "rows": [
      {
        "id": "h_renewable",
        "label": "From renewable sources",
        "isHeader": true
      },
      {
        "id": "renew_elec",
        "label": "Total electricity consumption (A)"
      },
      {
        "id": "renew_fuel",
        "label": "Total fuel consumption (B)"
      },
      {
        "id": "renew_other",
        "label": "Energy consumption through other sources (C)"
      },
      {
        "id": "total_renew",
        "label": "Total energy consumed from renewable sources (A+B+C)",
        "isBold": true
      },
      {
        "id": "h_non_renewable",
        "label": "From non-renewable sources",
        "isHeader": true
      },
      {
        "id": "non_renew_elec",
        "label": "Total electricity consumption (D)"
      },
      {
        "id": "non_renew_fuel",
        "label": "Total fuel consumption (E)"
      },
      {
        "id": "non_renew_other",
        "label": "Energy consumption through other sources (F)"
      },
      {
        "id": "total_non_renew",
        "label": "Total energy consumed from non-renewable sources (D+E+F)",
        "isBold": true
      },
      {
        "id": "grand_total",
        "label": "Total energy consumed (A+B+C+D+E+F)",
        "isBold": true
      },
      {
        "id": "intensity_turnover",
        "label": "Energy intensity per rupee of turnover (Total energy consumed / Revenue from operations)"
      },
      {
        "id": "intensity_ppp",
        "label": "Energy intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total energy consumed / Revenue from operations adjusted for PPP)"
      },
      {
        "id": "intensity_physical",
        "label": "Energy intensity in terms of physical Output"
      },
      {
        "id": "intensity_optional",
        "label": "Energy intensity (optional) – the relevant metric may be selected by the entity"
      }
    ],
    "fields": [
      {
        "name": "p6_e1_unit_master",
        "row": "renew_elec",
        "mapping": "units",
        "uiType": "select",
        "options": [
          "Joule (J)",
          "Kilojoule (KJ)",
          "Gigajoule (GJ)",
          "Megajoule (MJ)",
          "Terajoule (TJ)"
        ]
      },
      {
        "name": "p6_e1_renew_fuel_units",
        "row": "renew_fuel",
        "mapping": "units",
        "readOnly": true
      },
      {
        "name": "p6_e1_renew_other_units",
        "row": "renew_other",
        "mapping": "units",
        "readOnly": true
      },
      {
        "name": "p6_e1_total_renew_units",
        "row": "total_renew",
        "mapping": "units",
        "readOnly": true
      },
      {
        "name": "p6_e1_non_renew_elec_units",
        "row": "non_renew_elec",
        "mapping": "units",
        "readOnly": true
      },
      {
        "name": "p6_e1_non_renew_fuel_units",
        "row": "non_renew_fuel",
        "mapping": "units",
        "readOnly": true
      },
      {
        "name": "p6_e1_non_renew_other_units",
        "row": "non_renew_other",
        "mapping": "units",
        "readOnly": true
      },
      {
        "name": "p6_e1_total_non_renew_units",
        "row": "total_non_renew",
        "mapping": "units",
        "readOnly": true
      },
      {
        "name": "p6_e1_grand_total_units",
        "row": "grand_total",
        "mapping": "units",
        "readOnly": true
      },
      {
        "name": "p6_e1_intensity_turnover_units",
        "row": "intensity_turnover",
        "mapping": "units",
        "readOnly": true
      },
      {
        "name": "p6_e1_intensity_ppp_units",
        "row": "intensity_ppp",
        "mapping": "units",
        "readOnly": true
      },
      {
        "name": "p6_e1_intensity_physical_units",
        "row": "intensity_physical",
        "mapping": "units",
        "readOnly": true
      },
      {
        "name": "p6_e1_intensity_optional_units",
        "row": "intensity_optional",
        "mapping": "units",
        "readOnly": true
      },
      {
        "name": "p6_e1_renew_elec_fy",
        "row": "renew_elec",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e1_renew_elec_py",
        "row": "renew_elec",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e1_renew_fuel_fy",
        "row": "renew_fuel",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e1_renew_fuel_py",
        "row": "renew_fuel",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e1_renew_other_fy",
        "row": "renew_other",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e1_renew_other_py",
        "row": "renew_other",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e1_renew_other_details",
        "row": "renew_other",
        "mapping": "details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add details"
      },
      {
        "name": "p6_e1_total_renew_fy",
        "row": "total_renew",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e1_total_renew_py",
        "row": "total_renew",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e1_non_renew_elec_fy",
        "row": "non_renew_elec",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e1_non_renew_elec_py",
        "row": "non_renew_elec",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e1_non_renew_fuel_fy",
        "row": "non_renew_fuel",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e1_non_renew_fuel_py",
        "row": "non_renew_fuel",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e1_non_renew_other_fy",
        "row": "non_renew_other",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e1_non_renew_other_py",
        "row": "non_renew_other",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e1_non_renew_other_details",
        "row": "non_renew_other",
        "mapping": "details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add details"
      },
      {
        "name": "p6_e1_total_non_renew_fy",
        "row": "total_non_renew",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e1_total_non_renew_py",
        "row": "total_non_renew",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e1_grand_total_fy",
        "row": "grand_total",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e1_grand_total_py",
        "row": "grand_total",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e1_intensity_turnover_fy",
        "row": "intensity_turnover",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e1_intensity_turnover_py",
        "row": "intensity_turnover",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e1_intensity_ppp_fy",
        "row": "intensity_ppp",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e1_intensity_ppp_py",
        "row": "intensity_ppp",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e1_intensity_physical_fy",
        "row": "intensity_physical",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e1_intensity_physical_py",
        "row": "intensity_physical",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e1_intensity_optional_fy",
        "row": "intensity_optional",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e1_intensity_optional_py",
        "row": "intensity_optional",
        "mapping": "py",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "p6_e1_assessment",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N)",
        "name": "p6_e1_independent_assessment",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "label": "If yes, name of the external agency.",
        "name": "p6_e1_external_agency_name",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_e1_independent_assessment",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "p6_e2_water_withdrawal",
    "title": "2. Does the entity have procedures in place for sustainable sourcing? (Yes/No)",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Does the entity have procedures in place for sustainable sourcing (including transportation)? (Yes/No)",
        "name": "whether_the_entity_has_procedures_in_place_for_sustainable_sourcing",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "label": "If yes, what percentage of inputs were sourced sustainably?",
        "name": "if_yes_what_percentage_of_inputs_were_sourced_sustainably",
        "uiType": "number",
        "dependsOn": {
          "field": "whether_the_entity_has_procedures_in_place_for_sustainable_sourcing",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "p6_e3_water_withdrawal_v2",
    "title": "3. Provide details of the following disclosures related to water, in the following format:",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Whether water withdrawal, consumption and intensity disclosures are applicable to the company?",
        "name": "p6_e3_applicability",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "label": "Revenue and Turnover details (in Rs.)",
        "type": "group",
        "fields": [
          {
            "name": "p6_e3_revenue_fy",
            "label": "Revenue from operations (FY) (-)",
            "uiType": "number"
          },
          {
            "name": "p6_e3_revenue_py",
            "label": "Revenue from operations (PY) (-)",
            "uiType": "number"
          },
          {
            "name": "p6_e3_revenue_ppp_fy",
            "label": "Revenue adjusted for PPP (FY) (-)",
            "uiType": "number"
          },
          {
            "name": "p6_e3_revenue_ppp_py",
            "label": "Revenue adjusted for PPP (PY) (-)",
            "uiType": "number"
          }
        ],
        "dependsOn": {
          "field": "p6_e3_applicability",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "p6_e3_water_withdrawal_consumption",
    "type": "table",
    "popup": true,
    "label": "Add Water Details",
    "fixedRows": true,
    "dependsOn": {
      "field": "p6_e3_applicability",
      "value": "Yes"
    },
    "columns": [
      {
        "id": "parameter",
        "label": "Parameter"
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
        "id": "h_withdrawal",
        "label": "Water withdrawal by source (in kilolitres)",
        "isHeader": true
      },
      {
        "id": "surface",
        "label": "(i) Surface water"
      },
      {
        "id": "ground",
        "label": "(ii) Groundwater"
      },
      {
        "id": "third_party",
        "label": "(iii) Third party water"
      },
      {
        "id": "seawater",
        "label": "(iv) Seawater / desalinated water"
      },
      {
        "id": "others",
        "label": "(v) Others"
      },
      {
        "id": "total_withdrawal",
        "label": "Total volume of water withdrawal (in kilolitres) (i + ii + iii + iv + v)",
        "isBold": true
      },
      {
        "id": "h_consumption",
        "label": "Water consumption",
        "isHeader": true
      },
      {
        "id": "total_consumption",
        "label": "Total volume of water consumption (in kilolitres)",
        "isBold": true
      },
      {
        "id": "intensity_turnover",
        "label": "Water intensity per rupee of turnover (Total water consumption / Revenue from operations)"
      },
      {
        "id": "intensity_ppp",
        "label": "Water intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total water consumption / Revenue from operations adjusted for PPP)"
      },
      {
        "id": "intensity_physical",
        "label": "Water intensity in terms of physical output"
      },
      {
        "id": "intensity_optional",
        "label": "Water intensity (optional) – the relevant metric may be selected by the entity"
      }
    ],
    "fields": [
      {
        "name": "p6_e3_surface_fy",
        "row": "surface",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e3_surface_py",
        "row": "surface",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e3_ground_fy",
        "row": "ground",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e3_ground_py",
        "row": "ground",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e3_third_party_fy",
        "row": "third_party",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e3_third_party_py",
        "row": "third_party",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e3_seawater_fy",
        "row": "seawater",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e3_seawater_py",
        "row": "seawater",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e3_others_fy",
        "row": "others",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e3_others_py",
        "row": "others",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e3_total_withdrawal_fy",
        "row": "total_withdrawal",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e3_total_withdrawal_py",
        "row": "total_withdrawal",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e3_total_consumption_fy",
        "row": "total_consumption",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e3_total_consumption_py",
        "row": "total_consumption",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e3_intensity_turnover_fy",
        "row": "intensity_turnover",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e3_intensity_turnover_py",
        "row": "intensity_turnover",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e3_intensity_ppp_fy",
        "row": "intensity_ppp",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e3_intensity_ppp_py",
        "row": "intensity_ppp",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e3_intensity_physical_fy",
        "row": "intensity_physical",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e3_intensity_physical_py",
        "row": "intensity_physical",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e3_intensity_optional_fy",
        "row": "intensity_optional",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e3_intensity_optional_py",
        "row": "intensity_optional",
        "mapping": "py",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "p6_e3_assessment",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Yes/No)",
        "name": "p6_e3_independent_assessment",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ],
        "dependsOn": {
          "field": "p6_e3_applicability",
          "value": "Yes"
        }
      },
      {
        "label": "If yes, name of the external agency.",
        "name": "p6_e3_external_agency_name",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_e3_independent_assessment",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "p6_e4_water_discharge",
    "title": "4. Provide the following details related to water discharged:",
    "type": "table",
    "popup": true,
    "label": "Add Water Discharge Details",
    "fixedRows": true,
    "columns": [
      {
        "id": "parameter",
        "label": "Parameter"
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
        "id": "h_destination",
        "label": "Water discharge by destination and level of treatment (in kilolitres)",
        "isHeader": true
      },
      {
        "id": "surface_header",
        "label": "(i) To Surface water",
        "isBold": true
      },
      {
        "id": "surface_none",
        "label": "No treatment"
      },
      {
        "id": "surface_treat",
        "label": "With treatment – please specify level of treatment"
      },
      {
        "id": "ground_header",
        "label": "(ii) To Groundwater",
        "isBold": true
      },
      {
        "id": "ground_none",
        "label": "No treatment"
      },
      {
        "id": "ground_treat",
        "label": "With treatment – please specify level of treatment"
      },
      {
        "id": "sea_header",
        "label": "(iii) To Seawater",
        "isBold": true
      },
      {
        "id": "sea_none",
        "label": "No treatment"
      },
      {
        "id": "sea_treat",
        "label": "With treatment – please specify level of treatment"
      },
      {
        "id": "third_header",
        "label": "(iv) Sent to third-parties",
        "isBold": true
      },
      {
        "id": "third_none",
        "label": "No treatment"
      },
      {
        "id": "third_treat",
        "label": "With treatment – please specify level of treatment"
      },
      {
        "id": "others_header",
        "label": "(v) Others",
        "isBold": true
      },
      {
        "id": "others_none",
        "label": "No treatment"
      },
      {
        "id": "others_treat",
        "label": "With treatment – please specify level of treatment"
      },
      {
        "id": "total_discharge",
        "label": "Total water discharged (in kilolitres)",
        "isBold": true
      }
    ],
    "fields": [
      {
        "name": "p6_e4_surface_none_fy",
        "row": "surface_none",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e4_surface_none_py",
        "row": "surface_none",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e4_surface_treat_fy",
        "row": "surface_treat",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e4_surface_treat_py",
        "row": "surface_treat",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e4_ground_none_fy",
        "row": "ground_none",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e4_ground_none_py",
        "row": "ground_none",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e4_ground_treat_fy",
        "row": "ground_treat",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e4_ground_treat_py",
        "row": "ground_treat",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e4_sea_none_fy",
        "row": "sea_none",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e4_sea_none_py",
        "row": "sea_none",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e4_sea_treat_fy",
        "row": "sea_treat",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e4_sea_treat_py",
        "row": "sea_treat",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e4_third_none_fy",
        "row": "third_none",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e4_third_none_py",
        "row": "third_none",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e4_third_treat_fy",
        "row": "third_treat",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e4_third_treat_py",
        "row": "third_treat",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e4_others_none_fy",
        "row": "others_none",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e4_others_none_py",
        "row": "others_none",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e4_others_treat_fy",
        "row": "others_treat",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e4_others_treat_py",
        "row": "others_treat",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e4_total_discharge_fy",
        "row": "total_discharge",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e4_total_discharge_py",
        "row": "total_discharge",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      }
    ]
  },
  {
    "id": "p6_e4_assessment",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N)",
        "name": "p6_e4_independent_assessment",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "label": "If yes, name of the external agency.",
        "name": "p6_e4_external_agency_name",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_e4_independent_assessment",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "p6_e5_zld_details",
    "title": "5. Has the entity implemented a mechanism for Zero Liquid Discharge?",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "5. Has the entity implemented a mechanism for Zero Liquid Discharge? (Yes/No/NA)",
        "name": "p6_e5_zld_status",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "label": "If yes, provide details of its coverage and implementation.",
        "name": "p6_e5_zld_details_yes",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_e5_zld_status",
          "value": "Yes"
        }
      },
      {
        "label": "If NA, provide details.",
        "name": "p6_e5_zld_details_na",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_e5_zld_status",
          "value": "NA"
        }
      }
    ]
  },
  {
    "id": "p6_e6_air_emissions_v2",
    "title": "6. Please provide details of air emissions (other than GHG emissions) by the entity, in the following format:",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Whether air emissions (other than GHG emissions) by the entity is applicable to the company?",
        "name": "p6_e6_applicability",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      }
    ]
  },
  {
    "id": "p6_e6_air_emissions",
    "type": "table",
    "popup": true,
    "label": "Add Air Emissions Details",
    "fixedRows": true,
    "dependsOn": {
      "field": "p6_e6_applicability",
      "value": "Yes"
    },
    "columns": [
      {
        "id": "parameter",
        "label": "Parameter"
      },
      {
        "id": "unit",
        "label": "Please specify unit"
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
        "id": "nox",
        "label": "NOx"
      },
      {
        "id": "sox",
        "label": "SOx"
      },
      {
        "id": "pm",
        "label": "Particulate matter (PM)"
      },
      {
        "id": "pop",
        "label": "Persistent organic pollutants (POP)"
      },
      {
        "id": "voc",
        "label": "Volatile organic compounds (VOC)"
      },
      {
        "id": "hap",
        "label": "Hazardous air pollutants (HAP)"
      },
      {
        "id": "others",
        "label": "Others – please specify"
      }
    ],
    "fields": [
      {
        "name": "p6_e6_nox_unit",
        "row": "nox",
        "mapping": "unit",
        "uiType": "select",
        "options": [
          "Tonne",
          "Kilotonne",
          "mg/m3",
          "ug/m3",
          "Kg/Day",
          "Kg",
          "mg/Nm3",
          "kgSOxe",
          "Tonnes/Year",
          "Parts Per Million (PPM)",
          "tCO2e",
          "Kg/Year"
        ]
      },
      {
        "name": "p6_e6_nox_fy",
        "row": "nox",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e6_nox_py",
        "row": "nox",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e6_sox_unit",
        "row": "sox",
        "mapping": "unit",
        "uiType": "select",
        "options": [
          "Tonne",
          "Kilotonne",
          "mg/m3",
          "ug/m3",
          "Kg/Day",
          "Kg",
          "mg/Nm3",
          "kgSOxe",
          "Tonnes/Year",
          "Parts Per Million (PPM)",
          "tCO2e",
          "Kg/Year"
        ]
      },
      {
        "name": "p6_e6_sox_fy",
        "row": "sox",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e6_sox_py",
        "row": "sox",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e6_pm_unit",
        "row": "pm",
        "mapping": "unit",
        "uiType": "select",
        "options": [
          "Tonne",
          "Kilotonne",
          "mg/m3",
          "ug/m3",
          "Kg/Day",
          "Kg",
          "mg/Nm3",
          "kgSOxe",
          "Tonnes/Year",
          "Parts Per Million (PPM)",
          "tCO2e",
          "Kg/Year"
        ]
      },
      {
        "name": "p6_e6_pm_fy",
        "row": "pm",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e6_pm_py",
        "row": "pm",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e6_pop_unit",
        "row": "pop",
        "mapping": "unit",
        "uiType": "select",
        "options": [
          "Tonne",
          "Kilotonne",
          "mg/m3",
          "ug/m3",
          "Kg/Day",
          "Kg",
          "mg/Nm3",
          "kgSOxe",
          "Tonnes/Year",
          "Parts Per Million (PPM)",
          "tCO2e",
          "Kg/Year"
        ]
      },
      {
        "name": "p6_e6_pop_fy",
        "row": "pop",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e6_pop_py",
        "row": "pop",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e6_voc_unit",
        "row": "voc",
        "mapping": "unit",
        "uiType": "select",
        "options": [
          "Tonne",
          "Kilotonne",
          "mg/m3",
          "ug/m3",
          "Kg/Day",
          "Kg",
          "mg/Nm3",
          "kgSOxe",
          "Tonnes/Year",
          "Parts Per Million (PPM)",
          "tCO2e",
          "Kg/Year"
        ]
      },
      {
        "name": "p6_e6_voc_fy",
        "row": "voc",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e6_voc_py",
        "row": "voc",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e6_hap_unit",
        "row": "hap",
        "mapping": "unit",
        "uiType": "select",
        "options": [
          "Tonne",
          "Kilotonne",
          "mg/m3",
          "ug/m3",
          "Kg/Day",
          "Kg",
          "mg/Nm3",
          "kgSOxe",
          "Tonnes/Year",
          "Parts Per Million (PPM)",
          "tCO2e",
          "Kg/Year"
        ]
      },
      {
        "name": "p6_e6_hap_fy",
        "row": "hap",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e6_hap_py",
        "row": "hap",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e6_others_unit",
        "row": "others",
        "mapping": "unit",
        "uiType": "select",
        "options": [
          "Tonne",
          "Kilotonne",
          "mg/m3",
          "ug/m3",
          "Kg/Day",
          "Kg",
          "mg/Nm3",
          "kgSOxe",
          "Tonnes/Year",
          "Parts Per Million (PPM)",
          "tCO2e",
          "Kg/Year"
        ]
      },
      {
        "name": "p6_e6_others_fy",
        "row": "others",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e6_others_py",
        "row": "others",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e6_others_details",
        "row": "others",
        "mapping": "parameter",
        "uiType": "text",
        "placeholder": "Specify other pollutant..."
      }
    ]
  },
  {
    "id": "p6_e6_assessment",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N)",
        "name": "p6_e6_independent_assessment",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ],
        "dependsOn": {
          "field": "p6_e6_applicability",
          "value": "Yes"
        }
      },
      {
        "label": "If yes, name of the external agency.",
        "name": "p6_e6_external_agency_name",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_e6_independent_assessment",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "p6_e7_ghg_applicability",
    "title": "7. Provide details of greenhouse gas emissions (Scope 1 and Scope 2 emissions) & its intensity, in the following format:",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Whether greenhouse gas emissions (Scope 1 and Scope 2 emissions) & its intensity is applicable to the company?",
        "name": "p6_e7_applicability",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      }
    ]
  },
  {
    "id": "p6_e7_ghg_emissions",
    "type": "table",
    "popup": true,
    "label": "Add GHG Details",
    "fixedRows": true,
    "dependsOn": {
      "field": "p6_e7_applicability",
      "value": "Yes"
    },
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
        "id": "scope1",
        "label": "Total Scope 1 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)"
      },
      {
        "id": "scope2",
        "label": "Total Scope 2 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)"
      },
      {
        "id": "intensity_turnover",
        "label": "Total Scope 1 and Scope 2 emission intensity per rupee of turnover (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations)"
      },
      {
        "id": "intensity_ppp",
        "label": "Total Scope 1 and Scope 2 emission intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations adjusted for PPP)"
      },
      {
        "id": "intensity_physical",
        "label": "Total Scope 1 and Scope 2 emission intensity in terms of physical output"
      },
      {
        "id": "intensity_optional",
        "label": "Total Scope 1 and Scope 2 emission intensity (optional) – the relevant metric may be selected by the entity"
      }
    ],
    "fields": [
      {
        "name": "p6_e7_scope1_unit",
        "row": "scope1",
        "mapping": "unit",
        "uiType": "select",
        "options": [
          "tCO2e",
          "ktCO2e",
          "MtCO2e",
          "GtCO2e"
        ]
      },
      {
        "name": "p6_e7_scope1_fy",
        "row": "scope1",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e7_scope1_py",
        "row": "scope1",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e7_scope2_unit",
        "row": "scope2",
        "mapping": "unit",
        "uiType": "text",
        "readOnly": true
      },
      {
        "name": "p6_e7_scope2_fy",
        "row": "scope2",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e7_scope2_py",
        "row": "scope2",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e7_intensity_turnover_unit",
        "row": "intensity_turnover",
        "mapping": "unit",
        "uiType": "text",
        "readOnly": true
      },
      {
        "name": "p6_e7_intensity_turnover_fy",
        "row": "intensity_turnover",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e7_intensity_turnover_py",
        "row": "intensity_turnover",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e7_intensity_ppp_unit",
        "row": "intensity_ppp",
        "mapping": "unit",
        "uiType": "text",
        "readOnly": true
      },
      {
        "name": "p6_e7_intensity_ppp_fy",
        "row": "intensity_ppp",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e7_intensity_ppp_py",
        "row": "intensity_ppp",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e7_intensity_physical_unit",
        "row": "intensity_physical",
        "mapping": "unit",
        "uiType": "text",
        "readOnly": true
      },
      {
        "name": "p6_e7_intensity_physical_fy",
        "row": "intensity_physical",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e7_intensity_physical_py",
        "row": "intensity_physical",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e7_intensity_optional_unit",
        "row": "intensity_optional",
        "mapping": "unit",
        "uiType": "text",
        "readOnly": true
      },
      {
        "name": "p6_e7_intensity_optional_fy",
        "row": "intensity_optional",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e7_intensity_optional_py",
        "row": "intensity_optional",
        "mapping": "py",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "p6_e7_assessment",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N)",
        "name": "p6_e7_independent_assessment",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ],
        "dependsOn": {
          "field": "p6_e7_applicability",
          "value": "Yes"
        }
      },
      {
        "label": "If yes, name of the external agency.",
        "name": "p6_e7_external_agency_name",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_e7_independent_assessment",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "p6_e8_ghg_projects",
    "title": "8. Does the entity have any project related to reducing Green House Gas emission?",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "8. Does the entity have any project related to reducing Green House Gas emission? (Yes/No/NA)",
        "name": "p6_e8_project_status",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "label": "If Yes, then provide details.",
        "name": "p6_e8_project_details_yes",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_e8_project_status",
          "value": "Yes"
        }
      },
      {
        "label": "If NA, provide details.",
        "name": "p6_e8_project_details_na",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_e8_project_status",
          "value": "NA"
        }
      }
    ]
  },
  {
    "id": "p6_e9_waste_generation",
    "title": "9. Provide details related to waste management by the entity, in the following format:",
    "type": "table",
    "popup": true,
    "label": "Add Waste Generation Details",
    "fixedRows": true,
    "columns": [
      {
        "id": "parameter",
        "label": "Parameter"
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
        "id": "h_generation",
        "label": "Total Waste generated (in metric tonnes)",
        "isHeader": true
      },
      {
        "id": "plastic",
        "label": "Plastic waste (A)"
      },
      {
        "id": "e_waste",
        "label": "E-waste (B)"
      },
      {
        "id": "bio_medical",
        "label": "Bio-medical waste (C)"
      },
      {
        "id": "construction",
        "label": "Construction and demolition waste (D)"
      },
      {
        "id": "battery",
        "label": "Battery waste (E)"
      },
      {
        "id": "radioactive",
        "label": "Radioactive waste (F)"
      },
      {
        "id": "haz_other",
        "label": "Other Hazardous waste. (G)"
      },
      {
        "id": "non_haz_other",
        "label": "Other Non-hazardous waste generated (H). (Break-up by composition i.e. by materials relevant to the sector)"
      },
      {
        "id": "total_waste",
        "label": "Total (A+B + C + D + E + F + G + H)",
        "isBold": true
      },
      {
        "id": "intensity_turnover",
        "label": "Waste intensity per rupee of turnover (Total waste generated / Revenue from operations)"
      },
      {
        "id": "intensity_ppp",
        "label": "Waste intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total waste generated / Revenue from operations adjusted for PPP)"
      },
      {
        "id": "intensity_physical",
        "label": "Waste intensity in terms of physical output"
      },
      {
        "id": "intensity_optional",
        "label": "Waste intensity (optional) – the relevant metric may be selected by the entity"
      }
    ],
    "fields": [
      {
        "name": "p6_e9_plastic_fy",
        "row": "plastic",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_plastic_py",
        "row": "plastic",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_ewaste_fy",
        "row": "e_waste",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_ewaste_py",
        "row": "e_waste",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_biomed_fy",
        "row": "bio_medical",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_biomed_py",
        "row": "bio_medical",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_construction_fy",
        "row": "construction",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_construction_py",
        "row": "construction",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_battery_fy",
        "row": "battery",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_battery_py",
        "row": "battery",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_radioactive_fy",
        "row": "radioactive",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_radioactive_py",
        "row": "radioactive",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_haz_other_fy",
        "row": "haz_other",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_haz_other_py",
        "row": "haz_other",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_haz_other_details",
        "row": "haz_other",
        "mapping": "parameter",
        "uiType": "text",
        "placeholder": "Specify hazardous waste (G)..."
      },
      {
        "name": "p6_e9_nonhaz_other_fy",
        "row": "non_haz_other",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_nonhaz_other_py",
        "row": "non_haz_other",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_nonhaz_other_details",
        "row": "non_haz_other",
        "mapping": "parameter",
        "uiType": "text",
        "placeholder": "Specify non-hazardous waste (H)..."
      },
      {
        "name": "p6_e9_total_generation_fy",
        "row": "total_waste",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e9_total_generation_py",
        "row": "total_waste",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e9_intensity_turnover_fy",
        "row": "intensity_turnover",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e9_intensity_turnover_py",
        "row": "intensity_turnover",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e9_intensity_ppp_fy",
        "row": "intensity_ppp",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e9_intensity_ppp_py",
        "row": "intensity_ppp",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e9_intensity_physical_fy",
        "row": "intensity_physical",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_intensity_physical_py",
        "row": "intensity_physical",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_intensity_optional_fy",
        "row": "intensity_optional",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_intensity_optional_py",
        "row": "intensity_optional",
        "mapping": "py",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "p6_e9_waste_recovery",
    "title": "For each category of waste generated, total waste recovered through recycling, re-using or other recovery operations (In metric tonnes)",
    "type": "table",
    "popup": true,
    "label": "Add Recovery Details",
    "fixedRows": true,
    "columns": [
      {
        "id": "parameter",
        "label": "Category of waste"
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
        "id": "recycled",
        "label": "(i) Recycled"
      },
      {
        "id": "reused",
        "label": "(ii) Re-used"
      },
      {
        "id": "other_recovery",
        "label": "(iii) Other recovery operations"
      },
      {
        "id": "total_recovered",
        "label": "Total",
        "isBold": true
      }
    ],
    "fields": [
      {
        "name": "p6_e9_recycled_fy",
        "row": "recycled",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_recycled_py",
        "row": "recycled",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_reused_fy",
        "row": "reused",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_reused_py",
        "row": "reused",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_other_recovery_fy",
        "row": "other_recovery",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_other_recovery_py",
        "row": "other_recovery",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_total_recovered_fy",
        "row": "total_recovered",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e9_total_recovered_py",
        "row": "total_recovered",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      }
    ]
  },
  {
    "id": "p6_e9_waste_disposal",
    "title": "For each category of waste generated, total waste disposed by nature of disposal method (In metric tonnes)",
    "type": "table",
    "popup": true,
    "label": "Add Disposal Details",
    "fixedRows": true,
    "columns": [
      {
        "id": "parameter",
        "label": "Category of waste"
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
        "id": "incineration",
        "label": "(i) Incineration"
      },
      {
        "id": "landfilling",
        "label": "(ii) Landfilling"
      },
      {
        "id": "other_disposal",
        "label": "(iii) Other disposal operations"
      },
      {
        "id": "total_disposed",
        "label": "Total",
        "isBold": true
      }
    ],
    "fields": [
      {
        "name": "p6_e9_incineration_fy",
        "row": "incineration",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_incineration_py",
        "row": "incineration",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_landfilling_fy",
        "row": "landfilling",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_landfilling_py",
        "row": "landfilling",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_other_disposal_fy",
        "row": "other_disposal",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p6_e9_other_disposal_py",
        "row": "other_disposal",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p6_e9_total_disposed_fy",
        "row": "total_disposed",
        "mapping": "fy",
        "uiType": "number",
        "readOnly": true
      },
      {
        "name": "p6_e9_total_disposed_py",
        "row": "total_disposed",
        "mapping": "py",
        "uiType": "number",
        "readOnly": true
      }
    ]
  },
  {
    "id": "p6_e9_assessment",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N)",
        "name": "p6_e9_independent_assessment",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "label": "If yes, name of the external agency.",
        "name": "p6_e9_external_agency_name",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_e9_independent_assessment",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "p6_e10_waste_practices",
    "title": "10. Briefly describe the waste management practices adopted in your establishments.",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "10. Briefly describe the waste management practices adopted in your establishments. Describe the strategy adopted by your company to reduce usage of hazardous and toxic chemicals in your products and processes and the practices adopted to manage such wastes.",
        "name": "p6_e10_waste_practices_text",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p6_e11_ecologically_sensitive",
    "title": "11. If the entity has operations/offices in/around ecologically sensitive areas",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "11. If the entity has operations/offices in/around ecologically sensitive areas (such as national parks, wildlife sanctuaries, biosphere reserves, wetlands, biodiversity hotspots, forests, coastal regulation zones etc.) where environmental approvals / clearances are required, please specify details in the following format:",
        "name": "p6_e11_sensitive_areas_details",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "location",
            "label": "Location of operations/offices"
          },
          {
            "id": "type",
            "label": "Type of operations"
          },
          {
            "id": "clearance_conditions",
            "label": "Whether the conditions of environmental approval / clearances are being complied with? (Yes/No)"
          },
          {
            "id": "actions",
            "label": "If no, the reasons thereof and corrective action taken, if any"
          }
        ],
        "defaultRow": {
          "location": "",
          "type": "",
          "clearance_conditions": "",
          "actions": ""
        }
      }
    ]
  },
  {
    "id": "p6_e12_environmental_impact",
    "title": "12. Details of environmental impact assessments of projects undertaken by the entity",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "12. Details of environmental impact assessments of projects undertaken by the entity based on applicable laws, in the current financial year:",
        "name": "p6_e12_eia_details",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "project_name",
            "label": "Name and brief details of project"
          },
          {
            "id": "eia_notification",
            "label": "EIA Notification No."
          },
          {
            "id": "date",
            "label": "Date"
          },
          {
            "id": "independent_assessment",
            "label": "Whether conducted by independent external agency (Yes/No)"
          },
          {
            "id": "results_public",
            "label": "Results communicated in public domain (Yes/No)"
          },
          {
            "id": "web_link",
            "label": "Relevant Web link"
          }
        ],
        "defaultRow": {
          "project_name": "",
          "eia_notification": "",
          "date": "",
          "independent_assessment": "",
          "results_public": "",
          "web_link": ""
        }
      }
    ]
  },
  {
    "id": "p6_e13_compliance_status",
    "title": "13. Is the entity compliant with the applicable environmental law/ regulations/ guidelines in India?",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "13. Is the entity compliant with the applicable environmental law/ regulations/ guidelines in India; such as the Water (Prevention and Control of Pollution) Act, Air (Prevention and Control of Pollution) Act, Environment protection act and rules thereunder (Y/N/NA).",
        "name": "p6_e13_is_compliant",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "label": "If not, provide details of all such non-compliances, in the following format:",
        "name": "p6_e13_non_compliance_details",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_e13_is_compliant",
          "value": "No"
        },
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "law_name",
            "label": "Name of the law / regulation / guidelines which was not complied with"
          },
          {
            "id": "non_compliance_brief",
            "label": "Any fines / penalties / action taken by regulatory agencies such as pollution control boards or courts"
          },
          {
            "id": "corrective_action",
            "label": "Corrective action taken, if any"
          }
        ],
        "defaultRow": {
          "law_name": "",
          "non_compliance_brief": "",
          "corrective_action": ""
        }
      },
      {
        "label": "If NA, provide details.",
        "name": "p6_e13_na_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p6_e13_is_compliant",
          "value": "NA"
        }
      }
    ]
  }
];

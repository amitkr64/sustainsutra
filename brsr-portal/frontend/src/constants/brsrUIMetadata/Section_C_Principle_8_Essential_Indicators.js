// Section: Section C: Principle 8 Essential Indicators
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_C_Principle_8_Essential_Indicators = [
  {
    "id": "p8_e1_sia_details",
    "title": "1. Details of Social Impact Assessments (SIA) of projects undertaken by the entity based on applicable laws, in the current financial year",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Details of Social Impact Assessments (SIA) of projects undertaken by the entity based on applicable laws, in the current financial year",
        "name": "details_of_social_impact_assessments_of_projects_undertaken_by_the_entity_based_on_applicable_laws_in_the_current_financial_year_explanatory_text_block",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sr_no",
            "label": "Sr. No."
          },
          {
            "id": "name_and_brief_details_of_project",
            "label": "Name and brief details of project"
          },
          {
            "id": "sia_notification_no",
            "label": "SIA Notification No."
          },
          {
            "id": "date_of_notification",
            "label": "Date of notification"
          },
          {
            "id": "whether_conducted_by_independent_external_agency",
            "label": "Whether conducted by independent external agency"
          },
          {
            "id": "results_communicated_in_public_domain",
            "label": "Results communicated in public domain"
          },
          {
            "id": "relevant_web_link",
            "label": "Relevant Web link"
          }
        ],
        "defaultRow": {
          "name_and_brief_details_of_project": "",
          "sia_notification_no": "",
          "date_of_notification": "",
          "whether_conducted_by_independent_external_agency": "",
          "results_communicated_in_public_domain": "",
          "relevant_web_link": ""
        }
      }
    ]
  },
  {
    "id": "p8_e2_rr_projects",
    "title": "2. Provide information on project(s) for which ongoing Rehabilitation and Resettlement (R&R) is being undertaken by your entity, in the following format",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Provide information on project(s) for which ongoing Rehabilitation and Resettlement (R&R) is being undertaken by your entity",
        "name": "provide_information_on_projects_for_which_ongoing_rehabilitation_and_resettlement_is_being_undertaken_by_your_entity_in_the_following_format_explanatory_text_block",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sr_no",
            "label": "Sr. No."
          },
          {
            "id": "name_of_project_for_which_rr_is_ongoing",
            "label": "Name of Project for which R&R is ongoing"
          },
          {
            "id": "state",
            "label": "State"
          },
          {
            "id": "district",
            "label": "District"
          },
          {
            "id": "no_of_project_affected_families",
            "label": "No. of Project Affected Families (PAFs)",
            "uiType": "number"
          },
          {
            "id": "percentage_of_pafs_covered_by_rr",
            "label": "% of PAFs covered by R&R",
            "uiType": "number"
          },
          {
            "id": "amounts_paid_to_pafs_in_fy",
            "label": "Amounts paid to PAFs in the FY (In INR)",
            "uiType": "number"
          }
        ],
        "defaultRow": {
          "name_of_project_for_which_rr_is_ongoing": "",
          "state": "",
          "district": "",
          "no_of_project_affected_families": "",
          "percentage_of_pafs_covered_by_rr": "",
          "amounts_paid_to_pafs_in_fy": ""
        }
      }
    ]
  },
  {
    "id": "p8_e3_redress_grievances",
    "title": "3. Describe the mechanisms to receive and redress grievances of the community",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Describe the mechanisms to receive and redress grievances of the community",
        "name": "describe_the_mechanisms_to_receive_and_redress_grievances_of_the_community_explanatory_text_block",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p8_e4_input_material_suppliers",
    "title": "4. Percentage of input material (inputs to total inputs by value) sourced from suppliers",
    "type": "table",
    "popup": false,
    "columns": [
      {
        "id": "parameter",
        "label": ""
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
        "id": "msme_producers",
        "label": "Directly sourced from MSMEs/ small producers"
      },
      {
        "id": "district_neighbouring",
        "label": "Sourced directly from within the district and neighbouring districts"
      }
    ],
    "fields": [
      {
        "name": "p8_e4_msme_fy",
        "row": "msme_producers",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p8_e4_msme_py",
        "row": "msme_producers",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p8_e4_district_fy",
        "row": "district_neighbouring",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p8_e4_district_py",
        "row": "district_neighbouring",
        "mapping": "py",
        "uiType": "number"
      }
    ]
  },
  {
    "id": "p8_e5_job_creation",
    "title": "5. Job creation in smaller towns - Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis) in the following locations, as % of total wage cost",
    "type": "table",
    "popup": false,
    "columns": [
      {
        "id": "location",
        "label": "Location"
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
        "id": "rural_header",
        "label": "1. Rural",
        "isHeader": true
      },
      {
        "id": "rural_wages",
        "label": "i) Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis)"
      },
      {
        "id": "rural_total_wage",
        "label": "ii) Total Wage Cost"
      },
      {
        "id": "rural_percentage",
        "label": "iii) % of Job creation in Rural areas"
      },
      {
        "id": "semi_urban_header",
        "label": "2. Semi-urban",
        "isHeader": true
      },
      {
        "id": "semi_urban_wages",
        "label": "i) Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis)"
      },
      {
        "id": "semi_urban_total_wage",
        "label": "ii) Total Wage Cost"
      },
      {
        "id": "semi_urban_percentage",
        "label": "iii) % of Job creation in Semi-Urban areas"
      },
      {
        "id": "urban_header",
        "label": "3. Urban",
        "isHeader": true
      },
      {
        "id": "urban_wages",
        "label": "i) Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis)"
      },
      {
        "id": "urban_total_wage",
        "label": "ii) Total Wage Cost"
      },
      {
        "id": "urban_percentage",
        "label": "iii) % of Job creation in Urban areas"
      },
      {
        "id": "metro_header",
        "label": "4. Metropolitan",
        "isHeader": true
      },
      {
        "id": "metro_wages",
        "label": "i) Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis)"
      },
      {
        "id": "metro_total_wage",
        "label": "ii) Total Wage Cost"
      },
      {
        "id": "metro_percentage",
        "label": "iii) % of of Job creation in Metropolitan area"
      }
    ],
    "fields": [
      {
        "name": "p8_e5_rural_wages_fy",
        "row": "rural_wages",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p8_e5_rural_wages_py",
        "row": "rural_wages",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p8_e5_rural_total_fy",
        "row": "rural_total_wage",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p8_e5_rural_total_py",
        "row": "rural_total_wage",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p8_e5_rural_percentage_fy",
        "row": "rural_percentage",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p8_e5_rural_percentage_py",
        "row": "rural_percentage",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p8_e5_semi_urban_wages_fy",
        "row": "semi_urban_wages",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p8_e5_semi_urban_wages_py",
        "row": "semi_urban_wages",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p8_e5_semi_urban_total_fy",
        "row": "semi_urban_total_wage",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p8_e5_semi_urban_total_py",
        "row": "semi_urban_total_wage",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p8_e5_semi_urban_percentage_fy",
        "row": "semi_urban_percentage",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p8_e5_semi_urban_percentage_py",
        "row": "semi_urban_percentage",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p8_e5_urban_wages_fy",
        "row": "urban_wages",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p8_e5_urban_wages_py",
        "row": "urban_wages",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p8_e5_urban_total_fy",
        "row": "urban_total_wage",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p8_e5_urban_total_py",
        "row": "urban_total_wage",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p8_e5_urban_percentage_fy",
        "row": "urban_percentage",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p8_e5_urban_percentage_py",
        "row": "urban_percentage",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p8_e5_metro_wages_fy",
        "row": "metro_wages",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p8_e5_metro_wages_py",
        "row": "metro_wages",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p8_e5_metro_total_fy",
        "row": "metro_total_wage",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p8_e5_metro_total_py",
        "row": "metro_total_wage",
        "mapping": "py",
        "uiType": "number"
      },
      {
        "name": "p8_e5_metro_percentage_fy",
        "row": "metro_percentage",
        "mapping": "fy",
        "uiType": "number"
      },
      {
        "name": "p8_e5_metro_percentage_py",
        "row": "metro_percentage",
        "mapping": "py",
        "uiType": "number"
      }
    ]
  }
];

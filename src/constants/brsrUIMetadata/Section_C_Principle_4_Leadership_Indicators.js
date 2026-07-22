// Section: Section C: Principle 4 Leadership Indicators
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_C_Principle_4_Leadership_Indicators = [
  {
    "id": "p4_l1_consultation_processes",
    "title": "1. Provide the processes for consultation between stakeholders and the Board on economic, environmental, and social topics or if consultation is delegated, how is feedback from such consultations provided to the Board.",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Click to Add Details",
        "name": "p4_l1_consultation_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p4_l2_stakeholder_consultation",
    "title": "2. Whether stakeholder consultation is used to support the identification and management of environmental, and social topics.",
    "type": "grid",
    "columns": 2,
    "fields": [
      {
        "label": "Select Status",
        "name": "p4_l2_status",
        "uiType": "select",
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "label": "If so, provide details of instances as to how the inputs received from stakeholders on these topics were incorporated into policies and activities of the entity.",
        "name": "p4_l3_incorporation_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "p4_l2_status",
          "value": "Yes"
        }
      }
    ]
  },
  {
    "id": "p4_l4_vulnerable_stakeholder_engagement",
    "title": "3. Provide details of instances of engagement with, and actions taken to, address the concerns of vulnerable/ marginalized stakeholder groups.",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Click to Add Details",
        "name": "p4_l4_engagement_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p4_notes",
    "title": "Notes",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "General Notes",
        "name": "p4_general_notes",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Notes"
      }
    ]
  }
];

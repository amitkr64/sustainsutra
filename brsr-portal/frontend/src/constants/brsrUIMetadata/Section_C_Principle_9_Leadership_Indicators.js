// Section: Section C: Principle 9 Leadership Indicators
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_C_Principle_9_Leadership_Indicators = [
  {
    "id": "p9_l1_consumer_engagement",
    "title": "1. Channels / platforms where information on products and services of the entity can be accessed (provide web link, if available)",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Channels / platforms where information on products and services of the entity can be accessed (provide web link, if available)",
        "name": "channels_or_platforms_where_information_on_products_and_services_of_the_entity_can_be_accessed_explanatory_text_block",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p9_l2_consumer_survey",
    "title": "2. Steps taken to inform and educate consumers about safe and responsible usage of products and/or services",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Steps taken to inform and educate consumers about safe and responsible usage of products and/or services",
        "name": "steps_taken_to_inform_and_educate_consumers_about_safe_and_responsible_usage_of_products_and_or_services_explanatory_text_block",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p9_l3_consumer_privacy",
    "title": "3. Mechanisms in place to inform consumers of any risk of disruption/discontinuation of essential services",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Mechanisms in place to inform consumers of any risk of disruption/discontinuation of essential services",
        "name": "mechanisms_in_place_to_inform_consumers_of_any_risk_of_disruption_or_discontinuation_of_essential_services_explanatory_text_block",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details"
      }
    ]
  },
  {
    "id": "p9_l4_display_information",
    "title": "4. Does the entity display product information on the product over and above what is mandated as per local laws?",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Does the entity display product information on the product over and above what is mandated as per local laws? (Yes/No/NA)",
        "name": "whether_the_entity_display_product_information_on_the_product_over_and_above_what_is_mandated_as_per_local_laws",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "label": "If yes, provide details in brief",
        "name": "if_yes_provide_details_in_brief_for_product_information_display_explanatory_text_block",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "whether_the_entity_display_product_information_on_the_product_over_and_above_what_is_mandated_as_per_local_laws",
          "value": "Yes"
        }
      },
      {
        "label": "If NA, provide details.",
        "name": "p9_l4_display_information_na_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "whether_the_entity_display_product_information_on_the_product_over_and_above_what_is_mandated_as_per_local_laws",
          "value": "NA"
        }
      }
    ]
  },
  {
    "id": "p9_l5_consumer_survey_satisfaction",
    "title": "5. Did your entity carry out any survey with regard to consumer satisfaction relating to the major products / services of the entity, significant locations of operation of the entity or the entity as a whole?",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Did your entity carry out any survey with regard to consumer satisfaction relating to the major products / services of the entity, significant locations of operation of the entity or the entity as a whole? (Yes/No/NA)",
        "name": "whether_your_entity_carry_out_any_survey_with_regard_to_consumer_satisfaction_relating_to_the_major_products_or_services_of_the_entity",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "label": "If yes, provide details (e.g., % of customers surveyed, survey results summary)",
        "name": "if_yes_provide_details_of_consumer_satisfaction_survey_explanatory_text_block",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "whether_your_entity_carry_out_any_survey_with_regard_to_consumer_satisfaction_relating_to_the_major_products_or_services_of_the_entity",
          "value": "Yes"
        }
      },
      {
        "label": "If NA, provide details.",
        "name": "p9_l5_consumer_survey_na_details",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "whether_your_entity_carry_out_any_survey_with_regard_to_consumer_satisfaction_relating_to_the_major_products_or_services_of_the_entity",
          "value": "NA"
        }
      }
    ]
  },
  {
    "id": "p9_l6_notes",
    "title": "Notes",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Notes",
        "name": "notes_for_principle_9_leadership_indicators_explanatory_text_block",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Notes"
      }
    ]
  }
];

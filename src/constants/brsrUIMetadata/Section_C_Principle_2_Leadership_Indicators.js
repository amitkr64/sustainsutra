// Section: Section C: Principle 2 Leadership Indicators
// Auto-extracted from brsrUIMetadata — do not edit by hand; run
// scripts/split_brsr_constants.js to regenerate.
export const Section_C_Principle_2_Leadership_Indicators = [
  {
    "id": "p2_l1_lca",
    "title": "1. Life Cycle Assessment (LCA)",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Has the entity conducted Life Cycle Perspective / Assessments (LCA) for any of its products (for manufacturing industry) or for its services (for service industry)?",
        "name": "has_the_entity_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services",
        "uiType": "select",
        "options": [
          "Yes",
          "No",
          "NA"
        ]
      },
      {
        "label": "If NA, provide details",
        "name": "the_entity_has_not_applicable_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services_explanatory_text_block",
        "uiType": "popup",
        "buttonLabel": "Add Details",
        "dependsOn": {
          "field": "has_the_entity_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services",
          "value": "NA"
        }
      },
      {
        "label": "If yes, provide details",
        "name": "details_of_products_or_services_for_which_life_cycle_perspective_or_assessments_was_conducted_by_the_entity",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add LCA Details",
        "dependsOn": {
          "field": "has_the_entity_conducted_life_cycle_perspective_or_assessments_for_any_of_its_products_or_for_its_services",
          "value": "Yes"
        },
        "columns": [
          {
            "id": "nic_code",
            "label": "NIC Code",
            "uiType": "nic_search"
          },
          {
            "id": "product_service",
            "label": "Name of Product / Service"
          },
          {
            "id": "turnover_pct",
            "label": "% of total Turnover contributing to partial or complete LCA",
            "uiType": "number"
          },
          {
            "id": "boundary",
            "label": "Boundary for which the Life Cycle Perspective / Assessment was conducted"
          },
          {
            "id": "independent_agency",
            "label": "Whether conducted by independent external agency (Yes/No)",
            "uiType": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "id": "public_domain",
            "label": "Results communicated in public domain (Yes/No)",
            "uiType": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "id": "weblink",
            "label": "If yes, provide the web-link."
          }
        ],
        "defaultRow": {
          "nic_code": "",
          "product_service": "",
          "turnover_pct": "",
          "boundary": "",
          "independent_agency": "No",
          "public_domain": "No",
          "weblink": ""
        }
      }
    ]
  },
  {
    "id": "p2_l2_concerns",
    "title": "2. If there are any significant social or environmental concerns and/or risks arising from production or disposal of your products / services, as identified in the Life Cycle Perspective / Assessments (LCA) or through any other means, briefly describe the same along-with action taken to mitigate the same.",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Significant Social/Environmental Concerns",
        "name": "action_taken_to_mitigate_significant_social_or_environmental_concerns_lineitems",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "product_service",
            "label": "Name of Product / Service"
          },
          {
            "id": "description",
            "label": "Description of the risk / concern"
          },
          {
            "id": "action_taken",
            "label": "Action Taken"
          }
        ],
        "defaultRow": {
          "product_service": "",
          "description": "",
          "action_taken": ""
        }
      }
    ]
  },
  {
    "id": "p2_l3_recycled_percentage",
    "title": "3. Percentage of recycled or reused input material to total material (by value) used in production (for manufacturing industry) or providing services (for service industry).",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Recycled or Reused Input Material Details",
        "name": "details_of_percentage_of_recycled_or_reused_input_material_to_total_material_by_value_used_in_production_or_providing_services",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "material",
            "label": "Indicate input material"
          },
          {
            "id": "fy_pct",
            "label": "Recycled or re-used input material to total material (%) (Current Financial Year)",
            "uiType": "number"
          },
          {
            "id": "py_pct",
            "label": "Recycled or re-used input material to total material (%) (Previous Financial Year)",
            "uiType": "number"
          }
        ],
        "defaultRow": {
          "material": "",
          "fy_pct": "",
          "py_pct": ""
        }
      }
    ]
  },
  {
    "id": "p2_l4_reclaimed_products",
    "title": "4. Of the products and packaging reclaimed at end of life of products, amount (in metric tonnes) reused, recycled, and safely disposed.",
    "type": "table",
    "dynamic": true,
    "disableAddDelete": true,
    "storageField": "assurance_sub_type_for_reclaimed_products_and_packaging",
    "columns": [
      {
        "id": "category",
        "label": "Category"
      },
      {
        "id": "reuse_fy",
        "label": "Re-Used (FY)",
        "uiType": "number"
      },
      {
        "id": "reuse_py",
        "label": "Re-Used (PY)",
        "uiType": "number"
      },
      {
        "id": "recycle_fy",
        "label": "Recycled (FY)",
        "uiType": "number"
      },
      {
        "id": "recycle_py",
        "label": "Recycled (PY)",
        "uiType": "number"
      },
      {
        "id": "disposed_fy",
        "label": "Safely Disposed (FY)",
        "uiType": "number"
      },
      {
        "id": "disposed_py",
        "label": "Safely Disposed (PY)",
        "uiType": "number"
      }
    ],
    "defaultRows": [
      {
        "category": "Plastics (including packaging)",
        "reuse_fy": "",
        "reuse_py": "",
        "recycle_fy": "",
        "recycle_py": "",
        "disposed_fy": "",
        "disposed_py": ""
      },
      {
        "category": "E waste",
        "reuse_fy": "",
        "reuse_py": "",
        "recycle_fy": "",
        "recycle_py": "",
        "disposed_fy": "",
        "disposed_py": ""
      },
      {
        "category": "Hazardous waste",
        "reuse_fy": "",
        "reuse_py": "",
        "recycle_fy": "",
        "recycle_py": "",
        "disposed_fy": "",
        "disposed_py": ""
      },
      {
        "category": "Other waste",
        "reuse_fy": "",
        "reuse_py": "",
        "recycle_fy": "",
        "recycle_py": "",
        "disposed_fy": "",
        "disposed_py": ""
      }
    ]
  },
  {
    "id": "p2_l4_other_details",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Details of Other waste",
        "name": "describe_the_processes_in_place_to_safely_reclaim_your_products_for_reusing_recycling_and_disposing_at_the_end_of_life_for_other_waste_explanatory_text_block",
        "uiType": "popup",
        "subType": "textarea",
        "buttonLabel": "Add Details (Other Waste)"
      }
    ]
  },
  {
    "id": "p2_l5_reclaimed_percentage",
    "title": "5. Reclaimed products and their packaging materials (as percentage of products sold) for each product category.",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Reclaimed Products Details",
        "name": "details_of_reclaimed_products_and_their_packaging_materials_for_each_product_category",
        "uiType": "popup",
        "subType": "table",
        "buttonLabel": "Add Details",
        "columns": [
          {
            "id": "sno",
            "label": "Sr. No."
          },
          {
            "id": "product_category",
            "label": "Indicate product category"
          },
          {
            "id": "reclaimed_pct",
            "label": "Reclaimed products and their packaging materials as Percentage of total products sold in respective category",
            "uiType": "number"
          }
        ],
        "defaultRow": {
          "product_category": "",
          "reclaimed_pct": ""
        }
      }
    ]
  },
  {
    "id": "p2_leadership_notes",
    "title": "Notes",
    "type": "grid",
    "columns": 1,
    "fields": [
      {
        "label": "Notes",
        "name": "notes_principle2_explanatory_text_block",
        "uiType": "popup",
        "buttonLabel": "Add Notes"
      }
    ]
  }
];

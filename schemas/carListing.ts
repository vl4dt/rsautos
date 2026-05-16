import { defineArrayMember, defineField, defineType } from "sanity";

import { VinPrefillInput } from "@/components/studio/vin-prefill-input";

export const carListing = defineType({
  name: "carListing",
  title: "Car Listing",
  type: "document",
  groups: [
    { name: "publicListing", title: "Public listing", default: true },
    { name: "vehicleSpecs", title: "Vehicle specs" },
    { name: "transparency", title: "Transparency" },
    { name: "buyerGuidance", title: "Buyer guidance" },
    { name: "internal", title: "Internal only" }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Public title",
      type: "string",
      group: "publicListing",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "publicListing",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "isPublic",
      title: "Show on public website",
      type: "boolean",
      group: "publicListing",
      initialValue: false
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "publicListing",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "make",
      title: "Make",
      type: "string",
      group: "vehicleSpecs",
      description:
        "Use one consistent brand name, for example Toyota, Honda, Ford, Hyundai or BMW. Avoid duplicates such as TOYOTA/Toyota.",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value || value === value.trim()) {
            return true;
          }

          return "Remove leading or trailing spaces from the make.";
        })
    }),
    defineField({
      name: "model",
      title: "Model",
      type: "string",
      group: "vehicleSpecs",
      description:
        "Use consistent model capitalization, for example Corolla LE or Civic Sport.",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value || value === value.trim()) {
            return true;
          }

          return "Remove leading or trailing spaces from the model.";
        })
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      group: "vehicleSpecs",
      validation: (rule) => rule.required().integer().min(1980).max(2035)
    }),
    defineField({
      name: "vin",
      title: "VIN",
      type: "string",
      group: "vehicleSpecs",
      components: {
        input: VinPrefillInput
      },
      description:
        "Ingresa un VIN y usa el boton NHTSA para prellenar especificaciones publicas."
    }),
    defineField({
      name: "priceUsd",
      title: "Public price USD",
      type: "number",
      group: "publicListing",
      validation: (rule) => rule.required().min(0)
    }),
    defineField({
      name: "mileage",
      title: "Mileage",
      type: "number",
      group: "publicListing",
      validation: (rule) => rule.required().min(0)
    }),
    defineField({
      name: "importStatus",
      title: "Import status",
      type: "string",
      group: "publicListing",
      options: {
        list: [
          { title: "En tránsito", value: "inTransit" },
          { title: "Listo para venta", value: "readyForSale" }
        ],
        layout: "radio"
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "transmission",
      title: "Transmission",
      type: "string",
      group: "vehicleSpecs"
    }),
    defineField({
      name: "drivetrain",
      title: "Drivetrain",
      type: "string",
      group: "vehicleSpecs"
    }),
    defineField({
      name: "fuelType",
      title: "Fuel type",
      type: "string",
      group: "vehicleSpecs"
    }),
    defineField({
      name: "titleStatus",
      title: "Public title status",
      type: "string",
      group: "transparency"
    }),
    defineField({
      name: "location",
      title: "Public vehicle location",
      type: "string",
      group: "publicListing"
    }),
    defineField({
      name: "auctionState",
      title: "Auction state",
      type: "object",
      group: "transparency",
      fields: [
        defineField({
          name: "conditionSummary",
          title: "Condition summary",
          type: "text"
        }),
        defineField({
          name: "images",
          title: "Auction images",
          type: "array",
          of: [
            defineArrayMember({
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt text",
                  type: "string"
                })
              ]
            })
          ]
        })
      ]
    }),
    defineField({
      name: "currentState",
      title: "Current local state",
      type: "object",
      group: "transparency",
      fields: [
        defineField({
          name: "conditionSummary",
          title: "Condition summary",
          type: "text"
        }),
        defineField({
          name: "images",
          title: "Current images",
          type: "array",
          validation: (rule) =>
            rule.custom((value, context) => {
              const isPublic = Boolean(context.document?.isPublic);

              if (!isPublic || (Array.isArray(value) && value.length > 0)) {
                return true;
              }

              return "Publish-ready vehicles need at least one current image.";
            }),
          of: [
            defineArrayMember({
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt text",
                  type: "string"
                })
              ]
            })
          ]
        }),
        defineField({
          name: "repairLogs",
          title: "Repair logs",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "date",
                  title: "Date",
                  type: "date"
                }),
                defineField({
                  name: "summary",
                  title: "Summary",
                  type: "string"
                }),
                defineField({
                  name: "details",
                  title: "Details",
                  type: "text"
                })
              ]
            })
          ]
        })
      ]
    }),
    defineField({
      name: "inspection",
      title: "Inspection checklist",
      type: "array",
      group: "transparency",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Item",
              type: "string",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: [
                  { title: "Verified", value: "verified" },
                  { title: "Needs service", value: "needsService" },
                  { title: "Pending inspection", value: "pending" }
                ]
              },
              validation: (rule) => rule.required()
            })
          ]
        })
      ]
    }),
    defineField({
      name: "documents",
      title: "Public buyer documents and reports",
      type: "array",
      group: "transparency",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Document title",
              type: "string",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "description",
              title: "Public description",
              type: "text"
            }),
            defineField({
              name: "url",
              title: "Public URL",
              type: "url"
            }),
            defineField({
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: [
                  { title: "Available", value: "available" },
                  { title: "Pending", value: "pending" },
                  { title: "Not applicable", value: "notApplicable" }
                ]
              },
              initialValue: "pending"
            })
          ]
        })
      ]
    }),
    defineField({
      name: "buyerGuidance",
      title: "Buyer-facing guidance",
      type: "object",
      group: "buyerGuidance",
      description:
        "Public guidance for the decision summary. Do not include acquisition cost, margin, auction price or internal operating details.",
      fields: [
        defineField({
          name: "goodSummary",
          title: "Lo bueno",
          type: "text",
          rows: 3,
          description:
            "Buyer-facing positive points, for example verified inspection items, clean documents, or strong condition evidence."
        }),
        defineField({
          name: "pendingSummary",
          title: "Lo pendiente",
          type: "text",
          rows: 3,
          description:
            "Public pending items or questions the buyer should validate."
        }),
        defineField({
          name: "repairSummary",
          title: "Resumen publico de reparaciones",
          type: "text",
          rows: 3,
          description:
            "Plain-language repair summary for the buyer. Keep it public and factual."
        }),
        defineField({
          name: "documentSummary",
          title: "Documentos disponibles",
          type: "text",
          rows: 3,
          description:
            "Public document/report availability, without exposing internal cost breakdowns."
        }),
        defineField({
          name: "recommendation",
          title: "Recomendacion RS Autos",
          type: "text",
          rows: 3,
          description:
            "Short buyer recommendation: what to review before reserving or visiting."
        }),
        defineField({
          name: "conditionDisclosure",
          title: "Public condition disclosure",
          type: "string",
          validation: (rule) =>
            rule.custom((value, context) => {
              const isPublic = Boolean(context.document?.isPublic);

              if (!isPublic || value) {
                return true;
              }

              return "Public vehicles need a condition disclosure.";
            }),
          options: {
            list: [
              { title: "Listo para venta", value: "readyForSale" },
              { title: "En revision", value: "underReview" },
              { title: "En reparacion", value: "inRepair" },
              { title: "Reparado con documentacion", value: "repairedDocumented" },
              { title: "Vendido como ingreso", value: "soldAsArrived" }
            ],
            layout: "radio"
          }
        })
      ]
    }),
    defineField({
      name: "recommendedQuestions",
      title: "Recommended buyer questions",
      type: "array",
      group: "buyerGuidance",
      description:
        "Public questions shown on the vehicle detail page to guide responsible buyers.",
      validation: (rule) =>
        rule
          .custom((value, context) => {
            const isPublic = Boolean(context.document?.isPublic);

            if (!isPublic || (Array.isArray(value) && value.length > 0)) {
              return true;
            }

            return "Consider adding at least one buyer question for public vehicles.";
          })
          .warning(),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: {
              title: "question"
            }
          }
        })
      ]
    }),
    defineField({
      name: "usaAuctionPrice",
      title: "USA auction price",
      type: "number",
      group: "internal",
      hidden: true
    }),
    defineField({
      name: "priceBreakdown",
      title: "Internal price breakdown",
      type: "object",
      group: "internal",
      hidden: true,
      fields: [
        defineField({ name: "auctionFees", title: "Auction fees", type: "number" }),
        defineField({ name: "shipping", title: "Shipping", type: "number" }),
        defineField({ name: "customs", title: "Customs", type: "number" }),
        defineField({ name: "repairs", title: "Repairs", type: "number" }),
        defineField({ name: "margin", title: "Margin", type: "number" })
      ]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "vin",
      media: "currentState.images.0"
    }
  }
});

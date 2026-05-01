import { defineArrayMember, defineField, defineType } from "sanity";

export const carListing = defineType({
  name: "carListing",
  title: "Car Listing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Public title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "isPublic",
      title: "Show on public website",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "make",
      title: "Make",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "model",
      title: "Model",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) => rule.required().integer().min(1980).max(2035)
    }),
    defineField({
      name: "vin",
      title: "VIN",
      type: "string"
    }),
    defineField({
      name: "priceUsd",
      title: "Public price USD",
      type: "number",
      validation: (rule) => rule.required().min(0)
    }),
    defineField({
      name: "mileage",
      title: "Mileage",
      type: "number",
      validation: (rule) => rule.required().min(0)
    }),
    defineField({
      name: "importStatus",
      title: "Import status",
      type: "string",
      options: {
        list: [
          { title: "Auction won", value: "auctionWon" },
          { title: "In transit", value: "inTransit" },
          { title: "Customs clearance", value: "customsClearance" },
          { title: "At workshop", value: "atWorkshop" },
          { title: "Ready for sale", value: "readyForSale" }
        ],
        layout: "radio"
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "transmission",
      title: "Transmission",
      type: "string"
    }),
    defineField({
      name: "drivetrain",
      title: "Drivetrain",
      type: "string"
    }),
    defineField({
      name: "fuelType",
      title: "Fuel type",
      type: "string"
    }),
    defineField({
      name: "auctionState",
      title: "Auction state",
      type: "object",
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
      name: "usaAuctionPrice",
      title: "USA auction price",
      type: "number",
      hidden: true
    }),
    defineField({
      name: "priceBreakdown",
      title: "Internal price breakdown",
      type: "object",
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

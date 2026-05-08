import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "RS Autos HN Site Settings",
      readOnly: true
    }),
    defineField({
      name: "homeHeroImage",
      title: "Home hero image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    }),
    defineField({
      name: "homeCtaImage",
      title: "Home CTA background image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    }),
    defineField({
      name: "homeCta",
      title: "Home CTA content",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          description: "Optional short label above the title."
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string"
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 2
        }),
        defineField({
          name: "buttonLabel",
          title: "Button label",
          type: "string"
        }),
        defineField({
          name: "buttonHref",
          title: "Button link",
          type: "string",
          description:
            "Use an internal route like /contacto or a full external URL."
        })
      ]
    }),
    defineField({
      name: "aboutHeroImage",
      title: "About page hero image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    }),
    defineField({
      name: "footerContactItems",
      title: "Footer contact items",
      type: "array",
      of: [
        defineField({
          name: "footerContactItem",
          title: "Footer contact item",
          type: "object",
          fields: [
            defineField({
              name: "kind",
              title: "Kind",
              type: "string",
              options: {
                list: [
                  { title: "Phone", value: "phone" },
                  { title: "WhatsApp", value: "whatsapp" },
                  { title: "Email", value: "email" },
                  { title: "Location", value: "location" },
                  { title: "Custom", value: "custom" }
                ]
              },
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description:
                "Visible text, for example a phone number or business location.",
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "value",
              title: "Secondary value",
              type: "string",
              description: "Optional supporting text."
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description:
                "Optional. Use tel:, mailto:, https://, or an internal route."
            })
          ],
          preview: {
            select: {
              kind: "kind",
              title: "label"
            },
            prepare: ({ kind, title }) => ({
              title,
              subtitle: kind
            })
          }
        })
      ]
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        defineField({
          name: "socialLink",
          title: "Social link",
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TikTok", value: "tiktok" }
                ]
              },
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required()
            })
          ],
          preview: {
            select: {
              platform: "platform",
              url: "url"
            },
            prepare: ({ platform, url }) => ({
              title: platform,
              subtitle: url
            })
          }
        })
      ]
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineField({
          name: "testimonial",
          title: "Testimonial",
          type: "object",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "city",
              title: "City",
              type: "string"
            }),
            defineField({
              name: "vehicle",
              title: "Vehicle or context",
              type: "string"
            }),
            defineField({
              name: "rating",
              title: "Rating",
              type: "number",
              initialValue: 5,
              validation: (Rule) => Rule.min(1).max(5)
            })
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "quote"
            }
          }
        })
      ]
    })
  ],
  preview: {
    prepare: () => ({
      title: "Site Settings",
      subtitle: "Rotating decorative and hero imagery"
    })
  }
});

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
    })
  ],
  preview: {
    prepare: () => ({
      title: "Site Settings",
      subtitle: "Rotating decorative and hero imagery"
    })
  }
});

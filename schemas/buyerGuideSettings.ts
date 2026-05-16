import { defineArrayMember, defineField, defineType } from "sanity";

export const buyerGuideSettings = defineType({
  name: "buyerGuideSettings",
  title: "Buyer Guide",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "string",
      initialValue: "Compra informado"
    }),
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "heroBody",
      title: "Hero body",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "ruleTitle",
      title: "Main rule title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "ruleText",
      title: "Main rule text",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "terms",
      title: "Terms buyers should understand",
      type: "array",
      validation: (rule) => rule.min(1).warning("Add at least one guide term."),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Term",
              type: "string",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "text",
              title: "Explanation",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: { title: "title", subtitle: "text" }
          }
        })
      ]
    }),
    defineField({
      name: "comparisonRows",
      title: "Auction vs current comparison rows",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: { title: "label", subtitle: "text" }
          }
        })
      ]
    }),
    defineField({
      name: "checklist",
      title: "Basic buyer checklist",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Checklist item",
              type: "string",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "text",
              title: "Explanation",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: { title: "title", subtitle: "text" }
          }
        })
      ]
    }),
    defineField({
      name: "responsibleQuestions",
      title: "Questions before reserving",
      type: "array",
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
            select: { title: "question" }
          }
        })
      ]
    }),
    defineField({
      name: "faqs",
      title: "Guide FAQs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: { title: "question", subtitle: "answer" }
          }
        })
      ]
    })
  ],
  preview: {
    prepare: () => ({
      title: "Buyer Guide"
    })
  }
});

import { defineField, defineType } from 'sanity'

export const portfolio = defineType({
    name: 'portfolio',
    title: 'Portfolio / Case Study',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'problem',
            title: 'Problem',
            type: 'text',
        }),
        defineField({
            name: 'solution',
            title: 'Solution',
            type: 'text',
        }),
        defineField({
            name: 'results',
            title: 'Results',
            type: 'text',
        }),
        defineField({
            name: 'techUsed',
            title: 'Tech Used',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'images',
            title: 'Screenshots',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'testimonial',
            title: 'Testimonial',
            type: 'text',
        }),
    ],
})

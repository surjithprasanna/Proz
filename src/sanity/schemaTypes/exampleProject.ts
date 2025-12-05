import { defineField, defineType } from 'sanity'

export const exampleProject = defineType({
    name: 'exampleProject',
    title: 'Example Project',
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
            name: 'field',
            title: 'Field',
            type: 'reference',
            to: { type: 'projectField' },
        }),
        defineField({
            name: 'audience',
            title: 'Audience',
            type: 'string',
            options: {
                list: [
                    { title: 'Student', value: 'student' },
                    { title: 'Startup', value: 'startup' },
                    { title: 'Business', value: 'business' },
                    { title: 'Enterprise', value: 'enterprise' },
                ],
            },
        }),
        defineField({
            name: 'complexity',
            title: 'Complexity',
            type: 'string',
            options: {
                list: [
                    { title: 'Low', value: 'low' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'High', value: 'high' },
                ],
            },
        }),
        defineField({
            name: 'priceRange',
            title: 'Price Range',
            type: 'string',
        }),
        defineField({
            name: 'timeline',
            title: 'Timeline',
            type: 'string',
        }),
        defineField({
            name: 'techStack',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'images',
            title: 'Screenshots',
            type: 'array',
            of: [{ type: 'image' }],
        }),
    ],
})

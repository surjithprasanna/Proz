import { type SchemaTypeDefinition } from 'sanity'
import { projectField } from './projectField'
import { exampleProject } from './exampleProject'
import { blog } from './blog'
import { portfolio } from './portfolio'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [projectField, exampleProject, blog, portfolio],
}

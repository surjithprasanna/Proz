import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2023-05-03'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to false for real-time data
})

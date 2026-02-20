import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import {
  GetPlanPricingDocument,
  type GetPlanPricingQuery,
} from '@/graphql/generated'
import { fetchGraphQL } from '@/modules/requests/server/requests'

/**
 * Cached server-side function to fetch plan pricing from GraphQL.
 * Uses Next.js `use cache` for deduplication and revalidation support.
 */
export async function getPlanPricingCached(): Promise<GetPlanPricingQuery> {
  'use cache'
  cacheLife('max')
  cacheTag('plans')

  try {
    return fetchGraphQL({
      document: GetPlanPricingDocument,
      useCache: true,
    })
  } catch (error) {
    console.warn('[getPlanPricingCached] prefetching failed.')
    throw error
  }
}

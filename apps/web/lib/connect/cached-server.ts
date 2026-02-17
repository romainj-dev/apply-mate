import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'
import { graphqlRequest } from '@/lib/graphql/server-client'
import {
  GetPlanPricingDocument,
  GetPlanPricingQuery,
} from '@/graphql/generated'

/**
 * Cached server-side function to fetch plan pricing from GraphQL.
 * Uses Next.js `use cache` for deduplication and revalidation support.
 */
export async function getPlanPricingCached(): Promise<GetPlanPricingQuery> {
  'use cache'
  cacheLife('minutes')
  cacheTag('plans')

  try {
    return graphqlRequest<GetPlanPricingQuery>(GetPlanPricingDocument)
  } catch (error) {
    console.warn(
      '[getPlanPricingCached] prefetching failed. Check /api/graphql availability.'
    )

    throw error
  }
}

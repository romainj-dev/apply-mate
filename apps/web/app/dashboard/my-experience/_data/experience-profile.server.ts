import 'server-only'

import { QueryClient } from '@tanstack/react-query'
import { getSession } from '@/lib/auth'
import { fetchGraphQL } from '@/lib/requests/requests'
import { queryKeys } from '@/lib/requests/query-keys'
import {
  GetExperienceProfileDocument,
  type GetExperienceProfileQuery,
} from '@/graphql/generated'

export async function fetchExperienceProfile(): Promise<GetExperienceProfileQuery> {
  const { user } = await getSession()

  if (!user?.id || !user.email) {
    return { experienceProfile: null }
  }

  const data = await fetchGraphQL({
    document: GetExperienceProfileDocument,
  })

  return data
}

export async function prefetchExperienceProfile(
  queryClient: QueryClient
): Promise<void> {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.experienceProfile.get(),
    queryFn: fetchExperienceProfile,
  })
}

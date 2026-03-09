import { InitExperience } from '@/components/features/my-experience/init-experience/InitExperience'
import { CompleteExperience } from '@/components/features/my-experience/complete-experience/CompleteExperience'
import { queryKeys } from '@/modules/requests/shared/query-keys'
import { createPrefetchQueryClient } from '@/modules/requests/server/create-prefetch-query-client'
import { PrefetchHydrationBoundary } from '@/modules/requests/server/PrefetchHydrationBoundary'
import { fetchGraphQL } from '@/modules/requests/server/requests'
import { GetExperienceProfileDocument } from '@/graphql/generated'

export default async function MyExperiencePage() {
  const queryClient = await createPrefetchQueryClient()

  const [experienceProfileData] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: queryKeys.experienceProfile.get(),
      queryFn: () =>
        fetchGraphQL({
          document: GetExperienceProfileDocument,
        }),
    }),
  ])

  const hasExperience = !!experienceProfileData?.experienceProfile?.profile?.id

  return !hasExperience ? (
    <InitExperience />
  ) : (
    <PrefetchHydrationBoundary queryClient={queryClient}>
      <CompleteExperience />
    </PrefetchHydrationBoundary>
  )
}

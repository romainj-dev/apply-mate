import InitExperiencePage from './_init/page'
import CompleteExperiencePage from './_complete/page'
import type { GetExperienceProfileQuery } from '@/graphql/generated'
import { queryKeys } from '@/lib/requests/query-keys'
import { PrefetchHydrationBoundary } from '@/lib/query/prefetch-hydration-boundary'
import { prefetchExperienceProfile } from './_data/experience-profile.server'

export default async function MyExperiencePage() {
  return (
    <PrefetchHydrationBoundary prefetchers={[prefetchExperienceProfile]}>
      {(queryClient) => {
        const data = queryClient.getQueryData<GetExperienceProfileQuery>(
          queryKeys.experienceProfile.get()
        )

        const hasExperience = !!data?.experienceProfile?.profile?.id

        return hasExperience ? (
          <CompleteExperiencePage />
        ) : (
          <InitExperiencePage />
        )
      }}
    </PrefetchHydrationBoundary>
  )
}

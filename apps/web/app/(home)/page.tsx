import { Hero } from '@/components/features/marketing/hero/Hero'
import { HowItWorks } from '@/components/features/marketing/how-it-works/HowItWorks'
import { Benefits } from '@/components/features/marketing/benefits/Benefits'
import { Features } from '@/components/features/marketing/features/Features'
import { Pricing } from '@/components/features/marketing/pricing/Pricing'
import { Security } from '@/components/features/marketing/security/Security'
import { CTABanner } from '@/components/features/marketing/cta-banner/CtaBanner'

import { getPlanPricingCached } from './_data/plans.server'
import { createPrefetchQueryClient } from '@/modules/requests/server/create-prefetch-query-client'
import { queryKeys } from '@/modules/requests/shared/query-keys'
import { PrefetchHydrationBoundary } from '@/modules/requests/server/PrefetchHydrationBoundary'

export default async function LandingPage() {
  const queryClient = await createPrefetchQueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.plans.pricing(),
      queryFn: getPlanPricingCached,
    }),
  ])

  return (
    <>
      <Hero />
      <HowItWorks />
      <Benefits />
      <Features />
      <PrefetchHydrationBoundary queryClient={queryClient}>
        <Pricing />
      </PrefetchHydrationBoundary>
      <Security />
      <CTABanner />
    </>
  )
}

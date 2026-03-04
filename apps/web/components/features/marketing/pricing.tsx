'use client'

import { GetPlanPricingDocument } from '@/graphql/generated'
import { useQuery } from '@/modules/requests/client/hooks'
import { queryKeys } from '@/modules/requests/shared/query-keys'
import {
  FeatureCheckIcon,
  CheckIconWrapper,
  Container,
  EmptyCard,
  ErrorCard,
  FeatureItem,
  FeatureList,
  FeatureText,
  Heading,
  Lead,
  LoadingCard,
  PlanButton,
  PlanCard,
  PlanDescription,
  PlanHeader,
  PlanName,
  PlansGrid,
  PopularBadge,
  PopularBadgeWrapper,
  PriceAmount,
  PricePeriod,
  PriceWrapper,
  RetryButton,
  RetryRefreshIcon,
  Section,
  SectionHeader,
  StateText,
} from './pricing.styles'

interface Plan {
  id: string
  code: string
  price: number
}

interface PlanCard {
  id: string
  price: string
  name: string
  description: string
  features: readonly string[]
  cta: string
  popular: boolean
  period: string | undefined
}

const PLAN_METADATA = {
  FREE: {
    name: 'Free',
    description: 'Perfect for trying out ApplyMate',
    features: [
      '3 applications total',
      'AI-tailored resumes',
      'AI-generated cover letters',
      'Application Q&A assistance',
      'Basic application tracking',
    ],
    cta: 'Start for free',
    popular: false,
    period: undefined,
  },
  PREMIUM: {
    name: 'Premium',
    description: 'For serious job seekers',
    features: [
      'Unlimited applications',
      'AI-tailored resumes',
      'AI-generated cover letters',
      'Application Q&A assistance',
      'Advanced application tracking',
      'Priority AI processing',
      'Export all documents',
    ],
    cta: 'Upgrade to Premium',
    popular: true,
    period: '/month',
  },
} as const

export function Pricing() {
  const { data, isLoading, isError, refetch } = useQuery(
    GetPlanPricingDocument,
    undefined,
    {
      queryKey: queryKeys.plans.pricing(),
    }
  )
  const plans = data?.plans ?? []

  const planCards = plans
    .map((plan: Plan): PlanCard | null => {
      const metadata =
        PLAN_METADATA[plan.code.toUpperCase() as keyof typeof PLAN_METADATA]
      if (!metadata) {
        return null
      }

      return {
        id: plan.id,
        price: plan.price === 0 ? '$0' : `$${plan.price}`,
        ...metadata,
      } satisfies PlanCard
    })
    .filter((card): card is PlanCard => card !== null)

  return (
    <Section id="pricing">
      <Container>
        <SectionHeader>
          <Heading>Simple, transparent pricing</Heading>
          <Lead>
            Start free, upgrade when you&apos;re ready to supercharge your job
            search
          </Lead>
        </SectionHeader>

        {isLoading ? (
          <LoadingCard>
            <StateText>Loading plans…</StateText>
          </LoadingCard>
        ) : isError ? (
          <ErrorCard>
            <StateText>
              We couldn&apos;t load pricing information. Please try again.
            </StateText>
            <RetryButton onClick={() => refetch()} variant="outline">
              <RetryRefreshIcon />
              Retry
            </RetryButton>
          </ErrorCard>
        ) : planCards.length === 0 ? (
          <EmptyCard>
            <StateText>
              Plans will appear here once they&apos;re configured in Supabase.
            </StateText>
          </EmptyCard>
        ) : (
          <PlansGrid>
            {planCards.map((plan) => (
              <PlanCard key={plan.id ?? plan.name} $popular={plan.popular}>
                {plan.popular && (
                  <PopularBadgeWrapper>
                    <PopularBadge>Most popular</PopularBadge>
                  </PopularBadgeWrapper>
                )}

                <PlanHeader>
                  <PlanName>{plan.name}</PlanName>
                  <PlanDescription>{plan.description}</PlanDescription>
                </PlanHeader>

                <PriceWrapper>
                  <PriceAmount>{plan.price}</PriceAmount>
                  {plan.period && <PricePeriod>{plan.period}</PricePeriod>}
                </PriceWrapper>

                <PlanButton $popular={plan.popular} size="lg">
                  {plan.cta}
                </PlanButton>

                <FeatureList>
                  {plan.features.map((feature, featureIndex) => (
                    <FeatureItem key={featureIndex}>
                      <CheckIconWrapper>
                        <FeatureCheckIcon />
                      </CheckIconWrapper>
                      <FeatureText>{feature}</FeatureText>
                    </FeatureItem>
                  ))}
                </FeatureList>
              </PlanCard>
            ))}
          </PlansGrid>
        )}
      </Container>
    </Section>
  )
}

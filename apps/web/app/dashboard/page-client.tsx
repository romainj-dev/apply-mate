'use client'

import { ProfileSetupPrompt } from '@/components/features/dashboard/profile-setup-prompt/ProfileSetupPrompt'
import { QuickApplicationInput } from '@/components/features/dashboard/quick-application-input/QuickApplicationInput'
import {
  ApplicationsTable,
  type Application,
} from '@/components/features/dashboard/applications-table/ApplicationsTable'
import { DashboardHeader } from '@/components/features/dashboard/commons/header/Header'
import { HighlightName, Root } from './page.styles'

interface DashboardEmptyPageClientProps {
  hasProfileCompleted: boolean
  items: Application[] | null
}

export function DashboardEmptyPageClient({
  hasProfileCompleted,
  items,
}: DashboardEmptyPageClientProps) {
  return (
    <Root>
      <DashboardHeader
        title={
          <>
            Welcome back, <HighlightName>Romain</HighlightName> 👋
          </>
        }
        subtitle="Let’s get back to business. Your command center is ready."
      />

      {!hasProfileCompleted && <ProfileSetupPrompt />}

      <QuickApplicationInput disabled={!hasProfileCompleted} />

      <ApplicationsTable items={items} />
    </Root>
  )
}

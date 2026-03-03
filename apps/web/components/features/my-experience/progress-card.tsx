'use client'

import { GlassCard } from '@/components/ui/glass-card'
import { AlertCircle } from 'lucide-react'
import {
  CardBody,
  ContentRow,
  IconWrapper,
  ContentBody,
  ProfileLabel,
  ProfileDescription,
  ProgressBar,
  BadgeRow,
  GreenBadge,
  OrangeBadge,
} from './progress-card.styles'

export function ProgressCard() {
  const completionPercentage = 60

  return (
    <GlassCard variant="accent">
      <CardBody>
        <ContentRow>
          <IconWrapper>
            <AlertCircle size={20} />
          </IconWrapper>
          <ContentBody>
            <div>
              <ProfileLabel>
                Profile {completionPercentage}% Complete
              </ProfileLabel>
              <ProfileDescription>
                Add more projects and details to unlock high-quality
                applications
              </ProfileDescription>
            </div>
            <ProgressBar value={completionPercentage} />
            <BadgeRow>
              <GreenBadge variant="outline">✓ Basic Info</GreenBadge>
              <GreenBadge variant="outline">✓ 1 Role Added</GreenBadge>
              <OrangeBadge variant="outline">
                ⚠ Projects Incomplete
              </OrangeBadge>
              <OrangeBadge variant="outline">
                ⚠ Skills Need Details
              </OrangeBadge>
            </BadgeRow>
          </ContentBody>
        </ContentRow>
      </CardBody>
    </GlassCard>
  )
}

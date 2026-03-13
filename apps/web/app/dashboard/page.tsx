import type { Metadata } from 'next'

import { type Application } from '@/components/features/dashboard/applications-table/ApplicationsTable'
import { DashboardEmptyPageClient } from './page-client'

export const metadata = {
  title: 'Dashboard | ApplyMate',
  description: 'Your ApplyMate dashboard',
} satisfies Metadata

const mockApplications: Application[] = [
  {
    id: '1',
    company: 'Google',
    position: 'Senior Software Engineer',
    status: 'Interview',
    dateApplied: '2024-01-15',
    tags: ['Tech', 'Remote'],
  },
  {
    id: '2',
    company: 'Meta',
    position: 'Product Manager',
    status: 'Applied',
    dateApplied: '2024-01-12',
    tags: ['Tech', 'Leadership'],
  },
  {
    id: '3',
    company: 'Amazon',
    position: 'Frontend Developer',
    status: 'Accepted',
    dateApplied: '2024-01-10',
    tags: ['Tech', 'Frontend'],
  },
  {
    id: '4',
    company: 'Netflix',
    position: 'UX Designer',
    status: 'Rejected',
    dateApplied: '2024-01-08',
    tags: ['Design', 'Remote'],
  },
  {
    id: '5',
    company: 'Apple',
    position: 'iOS Engineer',
    status: 'Offer',
    dateApplied: '2024-01-05',
    tags: ['Tech', 'Mobile'],
  },
  {
    id: '6',
    company: 'Microsoft',
    position: 'Cloud Solutions Architect',
    status: 'Pending',
    dateApplied: '2024-01-20',
    tags: ['Tech', 'Cloud'],
  },
]

export default function DashboardEmptyPage() {
  const profile = {
    status: 'ready',
  } satisfies { status: 'ready' | 'incomplete' }
  const hasProfileCompleted = profile.status === 'ready'

  return (
    <DashboardEmptyPageClient
      hasProfileCompleted={hasProfileCompleted}
      items={!hasProfileCompleted ? null : mockApplications}
    />
  )
}

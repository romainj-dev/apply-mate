import {
  dehydrate,
  HydrationBoundary,
  type DehydratedState,
  type QueryClient,
} from '@tanstack/react-query'
import type { ReactNode } from 'react'

interface PrefetchHydrationBoundaryProps {
  queryClient: QueryClient
  children: ReactNode
}

export async function PrefetchHydrationBoundary({
  queryClient,
  children,
}: PrefetchHydrationBoundaryProps) {
  const dehydratedState: DehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  )
}

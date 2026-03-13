'use client'

import { useSession as useNextAuthSession } from 'next-auth/react'

export function useSession(): ReturnType<typeof useNextAuthSession> {
  return useNextAuthSession()
}

import { getSession, signOut } from '@/modules/session/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { ProfileContent } from '@/components/features/dashboard/profile-content/ProfileContent'

export const metadata: Metadata = {
  title: 'Profile | ApplyMate',
  description: 'Your ApplyMate profile',
}

export default async function ProfilePage() {
  const { user } = await getSession()

  if (!user) {
    redirect('/auth')
  }

  const handleSignOut = async (_formData: FormData) => {
    'use server'
    await signOut({ redirectTo: '/' })
  }

  return <ProfileContent user={user} onSignOut={handleSignOut} />
}

'use client'

import { Button } from '@/components/ui/button'
import {
  Avatar,
  Card,
  Container,
  FieldLabel,
  Fields,
  Main,
  PageTitle,
  SectionTitle,
  SignOutForm,
} from './profile-page-content.styles'

interface ProfileUser {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
}

interface ProfilePageContentProps {
  user: ProfileUser
  onSignOut: (_formData: FormData) => Promise<void>
}

export function ProfilePageContent({
  user,
  onSignOut,
}: ProfilePageContentProps) {
  return (
    <Main>
      <Container>
        <PageTitle>Profile</PageTitle>
        <Card>
          <SectionTitle>Welcome back!</SectionTitle>
          <Fields>
            <Avatar
              src={user.image ?? ''}
              alt={user.name || 'User avatar'}
              sizes="64px"
              width={64}
              height={64}
            />
            <p>
              <FieldLabel>Name:</FieldLabel> {user.name || 'Not provided'}
            </p>
            <p>
              <FieldLabel>Email:</FieldLabel> {user.email}
            </p>
            {user.id && (
              <p>
                <FieldLabel>User ID:</FieldLabel> {user.id}
              </p>
            )}
          </Fields>
          <SignOutForm action={onSignOut}>
            <Button type="submit">Sign out</Button>
          </SignOutForm>
        </Card>
      </Container>
    </Main>
  )
}

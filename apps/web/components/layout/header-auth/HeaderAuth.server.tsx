import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { getSession } from '@/modules/session/server'

export async function HeaderAuth() {
  const { isAuth } = await getSession()

  return (
    <Button size="sm" asChild>
      {isAuth ? (
        <Link href="/dashboard">Dashboard</Link>
      ) : (
        <Link href="/auth">Log in</Link>
      )}
    </Button>
  )
}

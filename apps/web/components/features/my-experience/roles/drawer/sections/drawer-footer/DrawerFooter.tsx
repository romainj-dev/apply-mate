'use client'

import { Save, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Footer, SaveButton } from './DrawerFooter.styles'

interface DrawerFooterProps {
  isPending: boolean
}

export function DrawerFooter({ isPending }: DrawerFooterProps) {
  return (
    <Footer>
      <SaveButton>
        <Button
          type="submit"
          variant="accent"
          style={{ width: '100%' }}
          disabled={isPending}
        >
          <Save />
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </SaveButton>
      <Button type="button" variant="outline" disabled>
        <Sparkles />
        Polish All
      </Button>
    </Footer>
  )
}

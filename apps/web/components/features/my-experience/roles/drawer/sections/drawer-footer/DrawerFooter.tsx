'use client'

import { Save, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Footer, SaveButton } from './DrawerFooter.styles'

interface DrawerFooterProps {
  onSave: () => void
  isPending: boolean
}

export function DrawerFooter({ onSave, isPending }: DrawerFooterProps) {
  return (
    <Footer>
      <SaveButton>
        <Button
          variant="accent"
          style={{ width: '100%' }}
          onClick={onSave}
          disabled={isPending}
        >
          <Save />
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </SaveButton>
      <Button variant="outline" disabled>
        <Sparkles />
        Polish All
      </Button>
    </Footer>
  )
}

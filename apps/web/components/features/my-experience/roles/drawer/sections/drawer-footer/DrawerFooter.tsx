'use client'

import { Save, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/AlertDialog'
import { Footer, SaveButton } from './DrawerFooter.styles'
import { useCallback } from 'react'
import { DeleteRoleDocument } from '@/graphql/generated'
import { queryKeys } from '@/modules/requests/shared/query-keys'
import { useMutation, useQueryClient } from '@/modules/requests/client/hooks'

type UseDeleteOptions = {
  roleId?: string
  onDeleted: () => void
}

function useDelete({ roleId, onDeleted }: UseDeleteOptions) {
  const queryClient = useQueryClient()

  const { mutate, isPending: isPendingDelete } = useMutation(
    DeleteRoleDocument,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.experienceProfile.get(),
        })
        onDeleted()
      },
    }
  )

  const handleDelete = useCallback(() => {
    if (!roleId) return
    mutate({ roleId })
  }, [roleId, mutate])

  return {
    handleDelete,
    isPendingDelete,
  }
}

interface DrawerFooterProps {
  roleId?: string
  isPending: boolean
  isEditMode: boolean
  onDeleted: () => void
}

export function DrawerFooter({
  roleId,
  isPending: isPendingSave,
  isEditMode,
  onDeleted,
}: DrawerFooterProps) {
  const { handleDelete, isPendingDelete } = useDelete({ roleId, onDeleted })
  const isPending = isPendingSave || isPendingDelete

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

      {isEditMode && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="destructive" disabled={isPending}>
              <Trash2 />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete role?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this role and all its projects.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-white hover:bg-destructive/90"
                onClick={handleDelete}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Footer>
  )
}

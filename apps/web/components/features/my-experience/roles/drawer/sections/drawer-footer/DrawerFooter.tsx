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
import { useCallback, useTransition } from 'react'
import { deleteRoleAction } from '@/app/dashboard/my-experience/_actions/delete-role'
import { queryKeys } from '@/modules/requests/shared/query-keys'
import { useQueryClient } from '@/modules/requests/client/hooks'

type UseDeleteOptions = {
  roleId?: string
  onDeleted: () => void
}

function useDelete({ roleId, onDeleted }: UseDeleteOptions) {
  const [isPendingDelete, startTransition] = useTransition()
  const queryClient = useQueryClient()

  const handleDelete = useCallback(() => {
    if (!roleId) return
    startTransition(async () => {
      const result = await deleteRoleAction(roleId)
      if (result.success) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.experienceProfile.get(),
        })
        onDeleted()
      }
    })
  }, [roleId, startTransition, queryClient, onDeleted])

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

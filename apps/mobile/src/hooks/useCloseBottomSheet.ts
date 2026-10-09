import type { BottomSheet } from '@expo/ui/community/bottom-sheet'
import type { RefObject } from 'react'

export function useCloseBottomSheet(ref: RefObject<BottomSheet | null>) {
  return {
    close: () => ref.current?.dismiss()
  }
}

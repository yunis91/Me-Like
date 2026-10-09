import { colors, space } from '@app/tokens'
import { type BottomSheet } from '@expo/ui/community/bottom-sheet'
import { type RefObject, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

import { Button } from '@/components/ui/Button'
import { GlassContainer } from '@/components/ui/GlassContainer'

interface BottomSheetActionButtonsProps {
  ref?: RefObject<BottomSheet | null>
  isSubmitButtonDisabled?: boolean
  submitButtonText?: string
  cancelButtonText?: string
  onSubmit?: () => void
  onCancel?: () => void
}

export function BottomSheetFooter({
  ref,
  isSubmitButtonDisabled,
  submitButtonText = 'Send',
  cancelButtonText = 'Cancel',
  onSubmit,
  onCancel
}: BottomSheetActionButtonsProps) {
  const closeSheet = useCallback(() => {
    ref?.current?.dismiss()
  }, [ref])

  const handleSubmit = useCallback(() => {
    onSubmit?.()

    closeSheet()
  }, [closeSheet, onSubmit])

  const handleCancel = useCallback(() => {
    onCancel?.()

    closeSheet()
  }, [closeSheet, onCancel])

  return (
    <GlassContainer>
      <View style={[styles.inset, styles.buttonsContainer]}>
        <Button
          label={submitButtonText}
          tintColor={colors.status.success}
          size='lg'
          disabled={isSubmitButtonDisabled}
          onPress={handleSubmit}
        />
        <Button
          label={cancelButtonText}
          variant='secondary'
          size='lg'
          onPress={handleCancel}
        />
      </View>
    </GlassContainer>
  )
}

const styles = StyleSheet.create({
  inset: {
    paddingHorizontal: space['layout-horizontal'],
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: space[2],
    marginTop: space[4]
  }
})
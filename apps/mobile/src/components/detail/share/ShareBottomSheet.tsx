import type { DiscoverDetailsResponse } from '@app/api'
import { colors, fontSize, space } from '@app/tokens'
import { type BottomSheet } from '@expo/ui/community/bottom-sheet'
import { type RefObject, useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { BottomSheetWindow, Input, LoginToButton } from '@/components/ui'

import { useSelectFriends } from '@/hooks/useSelectFriends'
import { FriendCarousel } from './FriendCarousel'

interface ShareBottomSheetProps {
  title: Pick<
    DiscoverDetailsResponse,
    'type' | 'coverUrl' | 'name' | 'releaseDate'
  >
  ref: RefObject<BottomSheet | null>
  isAuthenticated?: boolean
}

export function ShareBottomSheet({
  title,
  ref,
  isAuthenticated,
  ...props
}: ShareBottomSheetProps) {
  const { selectedIds, setSelectedIds, clearSelectedIds, recipients } =
    useSelectFriends()

  const [inputText, setInputText] = useState('')

  const handleInputTextChange = (text: string) => {
    setInputText(text)
  }

  const handleClose = () => {
    clearSelectedIds()
    setInputText('')
  }

  const handleShare = useCallback(() => {
    const text = inputText
    console.log('To:', recipients, '\nText:', text)
    // send share request
  }, [recipients, inputText])

  const isSubmitButtonDisabled =
    inputText.trim().length === 0 || selectedIds.length === 0

  const sheetTitle = isAuthenticated
    ? 'Share with your friends'
    : 'Log in to share'

  return (
    <BottomSheetWindow
      ref={ref}
      title={sheetTitle}
      isSubmitButtonDisabled={isSubmitButtonDisabled}
      isFooterHidden={!isAuthenticated}
      onSubmit={handleShare}
      onClose={handleClose}
      {...props}
    >
      {isAuthenticated ? (
        <View style={styles.content}>
          <FriendCarousel
            title={title}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />

          <View style={[styles.form]}>
            <Text
              style={[styles.inset, styles.recipients]}
              numberOfLines={1}
            >
              To: {recipients}
            </Text>

            <View style={[styles.inset]}>
              <Input
                placeholder='Check this out!'
                multiline
                tintColor={'rgba(255, 255, 255, 0.08)'}
                onChangeText={handleInputTextChange}
              />
            </View>
          </View>
        </View>
      ) : (
        <LoginToButton style={styles.inset} />
      )}
    </BottomSheetWindow>
  )
}

const styles = StyleSheet.create({
  content: {
    gap: space[4]
  },
  inset: {
    paddingHorizontal: space['layout-horizontal']
  },
  form: {
    gap: space[2]
  },
  recipients: {
    fontSize: fontSize.sm,
    color: colors.text.muted
  },
  unauthenticated: {
    paddingVertical: space[4]
  }
})
import type { DiscoverDetailsResponse } from '@app/api'
import { colors, fontSize, space } from '@app/tokens'
import { BottomSheet, BottomSheetView } from '@expo/ui/community/bottom-sheet'
import { type RefObject, useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button, Input, ScreenTitle } from '@/components/ui'


import { SectionCarousel } from '../section-carousel/SectionCarousel'
import { FriendAvatar } from './FriendAvatar'
import { SHARE_FRIENDS } from './share-friends.date'

interface ShareBottomSheetProps {
  title: DiscoverDetailsResponse
  ref: RefObject<BottomSheet | null>
}

export function ShareBottomSheet({
  title,
  ref,
  ...props
}: ShareBottomSheetProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [inputText, setInputText] = useState('')

  const titleName = title.name
  const year = title.releaseDate
    ? new Date(title.releaseDate).getFullYear()
    : null

  const heading = `${titleName}${year ? ` (${year})` : ''}`

  const toggleFriends = (id: string) => {
    setSelectedIds(ids =>
      ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]
    )
  }

  const recipients = SHARE_FRIENDS.filter(friend =>
    selectedIds.includes(friend.id)
  )
    .map(friend => friend.name)
    .join(', ')

  const handleInputTextChange = (text: string) => {
    setInputText(text)
  }

  const onCloseSpread = useCallback(() => {
    ref.current?.dismiss()
  }, [ref])

  const handleClose = () => {
    setSelectedIds([])
    setInputText('')
  }

  const handleShare = useCallback(() => {
    const text = inputText
    console.log('To:', recipients, '\nText:', text)

    onCloseSpread()
  }, [recipients, inputText, onCloseSpread])

  const isSubmitButtonDisabled =
    inputText.trim().length === 0 || selectedIds.length === 0

  return (
    <BottomSheet
      {...props}
      ref={ref}
      index={-1}
      enablePanDownToClose
      enableDynamicSizing
      onClose={handleClose}
    >
      <BottomSheetView style={styles.view}>
        <View style={[styles.title]}>
          <ScreenTitle style={[styles.inset]}>
            Share with your friends
          </ScreenTitle>
          <View style={styles.divider} />
        </View>

        <View style={styles.content}>
          <SectionCarousel
            title={heading}
          >
            {SHARE_FRIENDS.map(friend => (
              <FriendAvatar
                key={friend.id}
                name={friend.name}
                avatarUrl={friend.avatarUrl}
                isSelected={selectedIds.includes(friend.id)}
                onPress={() => toggleFriends(friend.id)}
              />
            ))}
          </SectionCarousel>

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
          <View style={[styles.inset, styles.buttonsContainer]}>
            <Button
              tintColor={colors.status.success}
              size='lg'
              isDisabled={isSubmitButtonDisabled}
              onPress={handleShare}
            >Send</Button>
            <Button
              variant='secondary'
              size='lg'
              onPress={onCloseSpread}
            >Cancel</Button>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  content: {
    gap: space[4],
    marginTop: space[4],
  },
  inset: {
    paddingHorizontal: space['layout-horizontal']
  },
  title: {
    paddingTop: space[2],
    paddingBottom: StyleSheet.hairlineWidth,
    gap: space[4],
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border
  },
  form: {
    gap: space[2],
  },
  recipients: {
    fontSize: fontSize.sm,
    color: colors.text.muted
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: space[2]
  }
})
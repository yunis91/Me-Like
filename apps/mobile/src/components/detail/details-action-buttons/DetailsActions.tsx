import type { DiscoverDetailsResponse } from '@app/api'
import { space } from '@app/tokens'
import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { Bookmark, Star } from 'lucide-react-native'
import { useRef } from 'react'
import { type ColorValue, StyleSheet, View } from 'react-native'

import { Button, GlassContainer, LoginToButton } from '@/components/ui'


import { REVIEW_RATING } from '@app/constants'
import { useLibraryStatus } from '@app/hooks'
import { useLocalSearchParams } from 'expo-router'
import { LibraryStatusButton } from '../library-status'
import { ReviewBottomSheet } from '../review-form'

interface DetailsActionButtonsProps {
  title: Pick<
    DiscoverDetailsResponse,
    'type' | 'coverUrl' | 'name' | 'releaseDate' | 'key'
  >
  accentColor?: ColorValue
  isAuthenticated?: boolean
}

export function DetailsActions({
  title,
  accentColor,
  isAuthenticated
}: DetailsActionButtonsProps) {
  const titleKey = title?.key

  const sheetRef = useRef<BottomSheet>(null)

  const openSheet = () => {
    sheetRef.current?.snapToIndex(0)
  }

  const { key } = useLocalSearchParams<{ key: string}>()

  const {rating} = useLibraryStatus(key)

  return (
    <>
      <GlassContainer>
        <View style={[styles.baseContainer, styles.actionButtonContainer]}>
          {isAuthenticated ? (
            <LibraryStatusButton
              titleKey={titleKey}
              tintColor={accentColor}
              openSheet={openSheet}
            />
          ) : (
            <LoginToButton tintColor={accentColor} />
          )}

          {isAuthenticated && (
            <View style={[styles.actionButtonGroup]}>
              <Button
								label='Add to Watchlist'
                variant='secondary'
                icon={Bookmark}
                onPress={() => console.log('Pressed Add to Watchlist')}
              />

              <Button
								label={rating ? `${rating} / ${REVIEW_RATING.max}` : 'Rate'}
                variant='secondary'
                icon={Star}
                isActive={!!rating}
                onPress={openSheet}
              />
            </View>
          )}
        </View>
      </GlassContainer>

      <ReviewBottomSheet
        ref={sheetRef}
        title={title}
        isAuthenticated={isAuthenticated}
      />
    </>
  )
}

const styles = StyleSheet.create({
  baseContainer: {
    marginHorizontal: space['layout-horizontal']
  },
  actionButtonContainer: {
    gap: space[4]
  },
  actionButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3]
  }
})
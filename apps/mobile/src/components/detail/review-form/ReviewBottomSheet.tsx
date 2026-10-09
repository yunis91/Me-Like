import { type DiscoverDetailsResponse, useDiscoverFindMyState } from '@app/api'
import { type TReviewSchema, reviewSchema } from '@app/schemas'
import { colors, fontSize, space } from '@app/tokens'
import type BottomSheet from '@expo/ui/community/bottom-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import type { RefObject } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'

import { BottomSheetWindow, Input, LoginToButton, PreviewTitleHeader } from '@/components/ui'

import { useCloseBottomSheet } from '@/hooks/useCloseBottomSheet'
import { useSaveReview } from '@/hooks/useSaveReview'
import { RatingSlider } from './RatingSlider'


interface ReviewBottomSheetProps {
  title: Pick<
    DiscoverDetailsResponse,
    'type' | 'coverUrl' | 'name' | 'releaseDate' | 'key'
  >
  ref: RefObject<BottomSheet | null>
  isAuthenticated?: boolean
}

export function ReviewBottomSheet({
  title,
  ref,
  isAuthenticated
}: ReviewBottomSheetProps) {
  const key = title?.key

  const { data: myState } = useDiscoverFindMyState(key)

  const review = myState?.data.review ?? null
  const titleName = title?.name

  const sheetTitle = isAuthenticated ? 'How was it?' : 'Log in to share'

  const { saveReview, isSaving } = useSaveReview(key, review?.id ?? null)
  const { close: closeSheet } = useCloseBottomSheet(ref)

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    setError
  } = useForm<TReviewSchema>({
    resolver: zodResolver(reviewSchema),
    mode: 'onChange',
    defaultValues: {
      rating: review?.rating,
      text: review?.text ?? ''
    }
  })

  const onSubmit = handleSubmit(values => {
    saveReview(values, closeSheet, errorMessage => {
      setError('root', {
        message: errorMessage ?? 'Could not save your review. Please try again later.'
      })
    })
  })

  return (
    <BottomSheetWindow
      ref={ref}
      title={sheetTitle}
      isFooterHidden={!isAuthenticated}
      isSubmitButtonDisabled={!isValid || isSaving}
      submitButtonText={review ? 'Save' : 'Send'}
      onSubmit={onSubmit}
    >
      {isAuthenticated ? (
        <View style={[styles.inset, styles.content]}>
          {titleName && (
            <PreviewTitleHeader
              text={titleName}
              style={styles.carouselTitle}
            />
          )}

          <Controller
            control={control}
            name='rating'
            render={({ field }) => (
              <RatingSlider
                value={field.value ?? null}
                onChange={field.onChange}
              />
            )}
          />

          {!!errors.root && <Text style={styles.error}>{errors.root.message}</Text>}

          <Controller
            control={control}
            name='text'
            render={({ field, fieldState }) => (
              <Input
                tintColor={'rgba(255, 255, 255, 0.08)'}
                multiline
                placeholder='Share your thoughts (optional)'
                value={field.value}
                error={fieldState.error?.message}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </View>
      ) : (
        <LoginToButton style={styles.inset} />
      )}
    </BottomSheetWindow>
  )
}

const styles = StyleSheet.create({
  content: {
    gap: space[4],
    paddingTop: space[4]
  },
  inset: {
    paddingHorizontal: space['layout-horizontal'],
  },
  carouselTitle: {
    fontSize: fontSize.base
  },
  error: {
    color: colors.status.error,
    fontSize: fontSize.sm
  }
})
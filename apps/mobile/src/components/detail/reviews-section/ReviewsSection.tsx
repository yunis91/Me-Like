import { useReviewFindByDiscoverKey } from '@app/api'
import { colors, fontSize, fontWeight, space } from '@app/tokens'
import { StyleSheet, Text, View } from 'react-native'

import { ReviewCard } from './ReviewCard'

interface ReviewsSectionProps {
  titleKey: string
}

export function ReviewsSection({ titleKey }: ReviewsSectionProps) {
  const { data } = useReviewFindByDiscoverKey(titleKey, { take: 3 })

  const reviews = data?.status === 200 ? data.data : null

  if (!reviews?.items.length) return null

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Reviews</Text>
        <Text style={styles.count}>{reviews.total}</Text>
      </View>

      {reviews.items.map(review => (
        <ReviewCard
          key={review.id}
          review={review}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: space[4],
    marginTop: space[2],
    paddingBottom: space[20]
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: space[2]
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold
  },
  count: {
    color: colors.text.muted,
    fontSize: fontSize.sm
  }
})
import type { ReviewResponse } from '@app/api'
import { REVIEW_RATING } from '@app/constants'
import { colors, fontSize, fontWeight, space } from '@app/tokens'
import { getDate } from '@app/utils'
import { Star } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'

interface ReviewCardProps {
  review: ReviewResponse
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { rating, author, createdAt, text } = review

  return (
    <View style={styles.root}>
      <View style={styles.rating}>
        <Star
          size={16}
          color={colors.primary}
          fill={colors.primary}
        />
        <Text style={[styles.baseText, styles.ratingText]}>
          {rating}/{REVIEW_RATING.max}
        </Text>
      </View>

      <View style={styles.meta}>
        <Text style={[styles.baseText, styles.author]}>
          {author.displayName ?? author.username}
        </Text>
        <Text style={[styles.baseText, styles.date]}>
          {getDate(createdAt).reviewDate}
        </Text>
      </View>

      <Text
        style={[styles.baseText, styles.text]}
        numberOfLines={4}
      >
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: space[2]
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[1]
  },
  baseText: {
    color: colors.text.primary,
    fontSize: fontSize.sm
  },
  ratingText: {
    fontWeight: fontWeight.medium
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  author: {
    color: colors.text['little-muted']
  },
  date: {
    color: colors.text.muted,
    fontSize: fontSize.sm
  },
  text: {
    color: colors.text.primary
  }
})
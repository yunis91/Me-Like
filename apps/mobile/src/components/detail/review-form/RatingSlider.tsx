import { REVIEW_RATING } from '@app/constants'
import { colors, fontSize, fontWeight, space } from '@app/tokens'
import { Host, Slider } from '@expo/ui'
import { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { HAPTIC_TRIGGERS } from '@/lib/haptics'

interface RatingSliderProps {
  value: number | null
  onChange: (value: number) => void
}

export function RatingSlider({ value, onChange }: RatingSliderProps) {
  // Пока юзер ни разу не тронул ползунок, value === null — но сам слайдер
  // всё равно физически стоит на REVIEW_RATING.min, не на "пустоте". Текст
  // должен показывать то же самое значение, а не отдельный "-"
  const displayValue = value ?? REVIEW_RATING.min

  const onValueChange = useCallback(
    (nextValue: number) => {
      const rating = Math.round(nextValue)

      if (rating === value) return

      void HAPTIC_TRIGGERS.impact('Light')

      onChange(nextValue)
    },
    [onChange, value]
  )

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.value}>{displayValue}</Text>
        <Text style={styles.max}>/{REVIEW_RATING.max}</Text>
      </View>

      <Host style={styles.host}>
        <Slider
          min={REVIEW_RATING.min}
          max={REVIEW_RATING.max}
          value={displayValue}
          step={1}
          onValueChange={onValueChange}
        />
      </Host>
    </View>
  )
}
const styles = StyleSheet.create({
  root: {
    gap: space[4]
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: space[1]
  },
  value: {
    color: colors.text.primary,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    fontVariant: ['tabular-nums']
  },
  max: {
    color: colors.text.muted,
    fontSize: fontSize['2xl']
  },
  host: {
    height: 44
  }
})
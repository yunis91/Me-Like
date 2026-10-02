import { StyleSheet, View, useWindowDimensions } from 'react-native'

import { Skeleton } from '@/components/ui/Skeleton'
import { radius, space } from '@app/tokens'

const SIMILAR_CARD_WIDTH = 114
const SIMILAR_CARD_HEIGHT = 171
const SIMILAR_CARDS_COUNT = 4

export function TitleDetailSkeleton() {
  const { width } = useWindowDimensions()

  return (
    <View>
      <Skeleton
        width='100%'
        height={width * 1.2}
        radius={0}
      />

      <View style={styles.content}>
        <View style={styles.info}>
          <Skeleton
            width='70%'
            height={36}
          />
          <Skeleton
            width='40%'
            height={16}
          />
          <Skeleton
            width='100%'
            height={16}
          />
          <Skeleton
            width='90%'
            height={16}
          />
        </View>

        <Skeleton
          width='100%'
          height={56}
          radius={radius.full}
        />

        <Skeleton
          width='60%'
          height={16}
        />
      </View>

      <View style={styles.similar}>
        <View style={styles.similarHeader}>
          <Skeleton
            width={140}
            height={24}
          />
        </View>

        <View style={styles.similarRow}>
          {Array.from({ length: SIMILAR_CARDS_COUNT }).map((_, index) => (
            <Skeleton
              key={index}
              width={SIMILAR_CARD_WIDTH}
              height={SIMILAR_CARD_HEIGHT}
              radius={radius.md}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginTop: -space[20],
    paddingHorizontal: space['layout-horizontal'],
    gap: space[4]
  },
  info: {
    gap: space[2]
  },
  similar: {
    marginTop: space[4],
    gap: space[3]
  },
  similarHeader: {
    marginHorizontal: space[6]
  },
  similarRow: {
    flexDirection: 'row',
    gap: space[3],
    paddingHorizontal: space[6]
  }
})

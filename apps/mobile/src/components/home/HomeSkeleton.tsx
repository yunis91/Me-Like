import { StyleSheet, View, useWindowDimensions } from 'react-native'

import { Skeleton } from '@/components/ui/Skeleton'
import { radius, space } from '@app/tokens'

const CARD_WIDTH = 114
const CARD_HEIGHT = 171
const CARDS_COUNT = 4

export function HomeSkeleton() {
  const { width } = useWindowDimensions()

  return (
    <View>
      <Skeleton
        width='100%'
        height={width * 1.35}
        radius={0}
      />

      <HomeSkeletonSection />
      <HomeSkeletonSection />
    </View>
  )
}

function HomeSkeletonSection() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Skeleton
          width={160}
          height={22}
        />
      </View>

      <View style={styles.row}>
        {Array.from({ length: CARDS_COUNT }).map((_, index) => (
          <Skeleton
            key={index}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            radius={radius.md}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginTop: space[6],
    gap: space[3]
  },
  sectionHeader: {
    paddingHorizontal: space['layout-horizontal']
  },
  row: {
    flexDirection: 'row',
    gap: space[3],
    paddingHorizontal: space['layout-horizontal']
  }
})

import { Image } from 'expo-image'
import { StyleSheet, View, useWindowDimensions } from 'react-native'

import { colors, radius, space } from '@app/tokens'

import type { DiscoverItemResponse } from '@app/api'

const WIDTH_MULTIPLIER = 2
const COLUMNS = 4
const ROWS = 12

interface Props {
  items: DiscoverItemResponse[]
}

export function PosterGrid({ items }: Props) {
  const { width: screenWidth } = useWindowDimensions()
  const tileWidth = screenWidth / COLUMNS
  const tileHeight = tileWidth * 1.5
  const gridWidth = screenWidth * WIDTH_MULTIPLIER

  if (!items.length) return null

  const tileCount = COLUMNS * WIDTH_MULTIPLIER * ROWS

  return (
    <View style={[styles.root, { width: gridWidth }]}>
      {Array.from({ length: tileCount }).map((_, index) => {
        const item = items[index % items.length]

        if (!item) return null

        return (
          <Image
            key={`${item.key}-${index}`}
            source={item.coverUrl}
            contentFit='cover'
            style={[styles.tile, { width: tileWidth, height: tileHeight }]}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space[2]
  },
  tile: {
    borderRadius: radius.md,
    backgroundColor: colors.bg.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8
  }
})

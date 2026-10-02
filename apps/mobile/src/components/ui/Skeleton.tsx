import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react'
import type { DimensionValue, StyleProp, ViewStyle } from 'react-native'
import { StyleSheet, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'

import { colors, radius as radiusTokens } from '@app/tokens'

const SHIMMER_DURATION_MS = 1200

interface Props {
  width?: DimensionValue
  height: number
  radius?: number
  style?: StyleProp<ViewStyle>
}

export function Skeleton({
  width = '100%',
  height,
  radius = radiusTokens.sm,
  style
}: Props) {
  const [blockWidth, setBlockWidth] = useState(0)
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: SHIMMER_DURATION_MS, easing: Easing.linear }),
      -1
    )
  }, [progress])

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (progress.value * 2 - 1) * blockWidth }]
  }))

  return (
    <View
      style={[styles.root, { width, height, borderRadius: radius }, style]}
      onLayout={event => setBlockWidth(event.nativeEvent.layout.width)}
    >
      {blockWidth > 0 && (
        <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.08)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bg.card,
    overflow: 'hidden'
  }
})

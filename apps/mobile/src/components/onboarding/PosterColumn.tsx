import { Image } from 'expo-image'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'

import { colors, radius, space } from '@app/tokens'

const POSTER_ASPECT_RATIO = 1.5
const MS_PER_POSTER = 7800

interface Props {
  coverUrls: string[]
  posterWidth: number
  isReversed: boolean
}

export function PosterColumn({ coverUrls, posterWidth, isReversed }: Props) {
  const isReducedMotion = useReducedMotion()
  const progress = useSharedValue(0)

  const posterHeight = posterWidth * POSTER_ASPECT_RATIO
  const loopHeight = coverUrls.length * (posterHeight + space[3])

  useEffect(() => {
    if (isReducedMotion || !coverUrls.length) return

    progress.set(
      withRepeat(
        withTiming(1, {
          duration: coverUrls.length * MS_PER_POSTER,
          easing: Easing.linear
        }),
        -1
      )
    )
  }, [isReducedMotion, coverUrls.length, progress])

  const animatedStyle = useAnimatedStyle(() => {
    const offset = progress.get() * loopHeight

    return {
      transform: [{ translateY: isReversed ? offset - loopHeight : -offset }]
    }
  })

  return (
    <Animated.View style={[styles.root, animatedStyle]}>
      {[...coverUrls, ...coverUrls].map((url, index) => (
        <Image
          key={`${url}-${index}`}
          source={url}
          style={[styles.poster, { width: posterWidth, height: posterHeight }]}
          contentFit='cover'
          transition={300}
        />
      ))}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  root: { gap: space[3] },
  poster: {
    borderRadius: radius.md,
    backgroundColor: colors.bg.card
  }
})

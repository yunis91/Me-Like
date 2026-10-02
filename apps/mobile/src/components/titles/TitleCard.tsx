import { Image } from 'expo-image'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

import { colors, radius, space } from '@app/tokens'

import type { DiscoverItemResponse } from '@app/api'

import { TITLE_CARD_CONFIG } from './title-card/TitleCard.config'
import { TitleCardBadge } from './title-card/TitleCardBadge'
import { TitleCardBookFX } from './title-card/TitleCardBookFX'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

interface Props {
  title: Pick<DiscoverItemResponse, 'coverUrl' | 'type'>
  onPress: () => void
}

export function TitleCard({ title, onPress }: Props) {
  const config = TITLE_CARD_CONFIG[title.type]

  const scale = useSharedValue(1)

  const animated = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const handlePressIn = () => {
    scale.set(withSpring(0.95))
  }

  const handlePressOut = () => {
    scale.set(withSpring(1))
  }

  return (
    <View
      style={{
        width: 114,
        height: 171
      }}
    >
      {config.stacked && (
        <>
          <View
            style={[
              styles.stack,
              {
                borderRadius: config.radius,
                top: -6,
                left: 8,
                right: 8,
                opacity: 0.25
              }
            ]}
          />
          <View
            style={[
              styles.stack,
              {
                borderRadius: config.radius,
                top: -3,
                left: 4,
                right: 4,
                opacity: 0.45
              }
            ]}
          />
        </>
      )}

      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.card,
          animated,
          {
            borderRadius: config.radius,
            borderWidth: config.glow ? 1 : 0,
            borderColor: config.glow ?? 'transparent'
          }
        ]}
      >
        <Image
          source={title.coverUrl}
          style={StyleSheet.absoluteFill}
          contentFit='cover'
          transition={200}
        />

        {config.spine && <TitleCardBookFX />}

        <TitleCardBadge
          accentColor={config.accent}
          icon={config.icon}
        />
      </AnimatedPressable>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.bg.card
  },
  stack: {
    position: 'absolute',
    height: '100%',
    backgroundColor: colors.bg.elevated,
    borderWidth: 1,
    borderColor: colors.border
  },
  spine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 10
  },
  pages: {
    position: 'absolute',
    right: 0,
    top: 4,
    bottom: 4,
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.18)'
  },
  badge: {
    position: 'absolute',
    left: space[2],
    bottom: space[2]
  },
  glass: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    overflow: 'hidden'
  },
  fallback: { backgroundColor: 'rgba(0,0,0,0.45)' }
})

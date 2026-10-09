import { LinearGradient } from 'expo-linear-gradient'
import { Play, Plus } from 'lucide-react-native'
import { useState } from 'react'
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

import { colors, fontSize, fontWeight, space } from '@app/tokens'

import type { DiscoverItemResponse } from '@app/api'

import { Button } from '../ui/Button'

import { router } from 'expo-router'
import { HERO_GRADIENT } from '../hero/HeroBackdrop'
import { TitleInfo } from '../hero/TitleInfo'
import { TITLE_CARD_CONFIG } from '../titles/title-card/TitleCard.config'
import { HomeHeroSlide } from './HomeHeroSlide'
import { PaginationDot } from './PaginationDot'

interface Props {
  items: DiscoverItemResponse[]
}

export function HomeHeroSlider({ items }: Props) {
  const { width } = useWindowDimensions()
  const [index, setIndex] = useState(0)

  const height = width * 1.35
  const current = items[index]

  const config = current?.type ? TITLE_CARD_CONFIG[current.type] : null
  const accentColor = config ? config.accent : 'transparent'
  const icon = current?.type ? config?.icon : Play
  const buttonAction = config ? config.buttonAction : 'Play'

  const scrollX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.set(event.contentOffset.x)
  })

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width))
  }

  return (
    <View style={{ height }}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {items.map((item, index) => (
          <HomeHeroSlide
            key={item.key}
            item={item}
            index={index}
						height={height}
            width={width}
            scrollX={scrollX}
          />
        ))}
      </Animated.ScrollView>

      <LinearGradient
        colors={HERO_GRADIENT.colors}
        locations={HERO_GRADIENT.location}
        style={StyleSheet.absoluteFill}
        pointerEvents='none'
      />

      <View
        style={styles.content}
        pointerEvents='box-none'
      >
        <Animated.View
          key={current?.key}
          entering={FadeIn.duration(400)}
          exiting={FadeOut.duration(200)}
          style={{ gap: space[2] }}
        >
          <TitleInfo 
            name={current?.name || ''}
            meta={current?.genres.slice(0, 3).join(' · ')}
            description="When an overachieving college senior makes a wrong turn..."
          />
        </Animated.View>

        <View style={styles.bottom}>
          <View style={styles.actions}>
            <Button
              label={buttonAction}
              icon={icon}
              tintColor={accentColor}
              onPress={() => router.push(`/title/${current?.key}`)}
            />

            <Button
              variant='secondary'
              icon={Plus}
              onPress={() => {}}
            />
          </View>

          <View style={styles.dots}>
            {items.map((item, index) => (
              <PaginationDot
                key={item.key}
                index={index}
                width={width}
                scrollX={scrollX}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: space['layout-horizontal'],
    paddingBottom: space[4],
    gap: space[2]
  },
  genres: {
    color: colors.text.primary,
    fontSize: fontSize.sm
  },
  name: {
    color: colors.text.primary,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold
  },
  description: {
    color: colors.text['little-muted'],
    fontSize: fontSize.sm,
    lineHeight: 20
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: space[3]
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3]
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2]
  },
  dot: {
    backgroundColor: colors.text.muted
  },
  dotActive: {
    backgroundColor: colors.text.primary
  }
})

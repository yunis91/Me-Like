import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'
import Animated, {
  type SharedValue,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'

import { colors } from '@app/tokens'

import type { DiscoverItemResponse } from '@app/api'

interface Props {
  item: Pick<DiscoverItemResponse, 'coverUrl'>
  index: number
  width: number
  height: number
  scrollX: SharedValue<number>
}

export function HomeHeroSlide({ item, index, width, height, scrollX }: Props) {

  const imageStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.get(),
            inputRange,
            [-width * 0.2, 0, width * 0.2],
            'clamp'
          )
        }
      ]
    }
  })

  return (
      <View style={[styles.root, {width, height}]}>
        <Animated.View style={[styles.imageContainer, imageStyle]}>
          <Image
            source={item.coverUrl }
            contentFit='cover'
            contentPosition={{top: '20%'}}
            style={styles.image}
            transition={300}
          />
        </Animated.View>
      </View>
  )
}

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
    backgroundColor: colors.bg.card
  },

  imageContainer: {
    position: 'absolute',
    top: 0,
    left: '-20%',
    right: '-20%',
    bottom: 0
  },

  image: {
    width: '100%',
    height: '100%'
  }
})
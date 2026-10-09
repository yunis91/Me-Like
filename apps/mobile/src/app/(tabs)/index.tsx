import { SectionCarousel } from '@/components/carousel'
import { HomeHeader } from '@/components/home/HomeHeader'
import { HomeHeroSlider } from '@/components/home/HomeHeroSlider'
import { TitleCard } from '@/components/titles/TitleCard'
import { Screen } from '@/components/ui/Screen'
import { useDiscoverGetTrending } from '@app/api'
import { colors, space } from '@app/tokens'
import { router } from 'expo-router'
import { ActivityIndicator, Platform, RefreshControl, StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


export default function Index() {

  const { data, refetch, isRefetching } = useDiscoverGetTrending({ take: 20 })

  const scrollY = useSharedValue(0)
  const insets = useSafeAreaInsets()

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollY.set(e.contentOffset.y)
  })

  const items = data?.data ?? []
  const heroItems = items.slice(0, 5)
  const topPicksForYouItems = items.slice(5, 12)
  const trandingItems = items.slice(12, 20)

  return (
    <Screen edges={[]}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: space[20] }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={Platform.OS === 'ios' ? 'transparent' : colors.text.primary}
            colors={[colors.text.primary]}
            progressBackgroundColor={colors.bg.card}
          />
        }
      >
        {!!heroItems.length && <HomeHeroSlider items={heroItems} /> }

        <SectionCarousel
          title='Top picks for you'
          onPressArrow={() => {}}
        >
          {topPicksForYouItems.map(title => (
            <TitleCard
              onPress={() => router.push(`/title/${title.key}`)}
              title={title}
              key={title.key}
            />
          ))}
        </SectionCarousel>

        <SectionCarousel
          title='Popular now'
          onPressArrow={() => {}}
        >
          {trandingItems.map(title => (
            <TitleCard
              onPress={() => router.push(`/title/${title.key}`)}
              title={title}
              key={title.key}
            />
          ))}
        </SectionCarousel>
      </Animated.ScrollView>

      <HomeHeader scrollY={scrollY} />

      {Platform.OS === 'ios' && isRefetching && (
        <View
          pointerEvents='none'
          style={[styles.refreshIndicator, { top: insets.top + space[2] }]}
        >
          <ActivityIndicator
            size={26}
            color={colors.text.primary}
          />
        </View>
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  refreshIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center'
  }
})
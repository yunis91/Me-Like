import { HomeHeader } from '@/components/home/HomeHeader'
import { HomeHeroSlider } from '@/components/home/HomeHeroSlider'
import { SectionCarousel } from '@/components/section-carousel/SectionCarousel'
import { TitleCard } from '@/components/title-card/TitleCard'
import { Screen } from '@/components/ui/Screen'
import { useDiscoverGetTrending } from '@app/api'
import { space } from '@app/tokens'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'


export default function Index() {

  const {data } = useDiscoverGetTrending({ take: 20 })

  const scrollY = useSharedValue(0)

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
      >
        {!!heroItems.length && <HomeHeroSlider items={heroItems} /> }

        <SectionCarousel
          title='Top picks for you'
          onPressArrow={() => {}}
        >
          {topPicksForYouItems.map(title => (
            <TitleCard
              onPress={() => {}}
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
              onPress={() => {}}
              title={title}
              key={title.key}
            />
          ))}
        </SectionCarousel>
      </Animated.ScrollView>

      <HomeHeader scrollY={scrollY} />
    </Screen>
  )
}
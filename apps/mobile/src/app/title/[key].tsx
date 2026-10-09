import { SectionCarousel } from '@/components/carousel'
import { DetailsActions } from '@/components/detail/details-action-buttons/DetailsActions'
import { ReviewsSection } from '@/components/detail/reviews-section'
import { ShareButton } from '@/components/detail/share/ShareButton'
import { HeroBackdrop } from '@/components/hero/HeroBackdrop'
import { TitleInfo } from '@/components/hero/TitleInfo'
import { CastCard } from '@/components/titles/CastCard'
import { TitleCard } from '@/components/titles/TitleCard'
import { TitleDetailSkeleton } from '@/components/titles/TitleDetailSkeleton'
import { TITLE_CARD_CONFIG } from '@/components/titles/title-card/TitleCard.config'
import { Toolbar } from '@/components/toolbar'
import { Button } from '@/components/ui'
import { Screen } from '@/components/ui/Screen'
import { useDiscoverFindByKey } from '@app/api'
import { CREATOR_ROLE_LABEL } from '@app/constants'
import { useCheckAuthenticated } from '@app/hooks'
import { colors, fontSize, fontWeight, space } from '@app/tokens'
import { LinearGradient } from 'expo-linear-gradient'
import { router, useLocalSearchParams } from 'expo-router'
import { Home } from 'lucide-react-native'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'


const OVERLAP = space[20]

export default function TitleDetail() {
  const { key } = useLocalSearchParams<{ key: string}>()
  const { width } = useWindowDimensions()
  const { data, isPending } = useDiscoverFindByKey(key)
  const { isAuthenticated } = useCheckAuthenticated()
  const heroHeight = width * 1.2
  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.set(event.contentOffset.y)
  })

  const heroStyle = useAnimatedStyle(() => {
    const y = scrollY.get()
    return {
      opacity: interpolate(y, [0, heroHeight], [1, 0.4], 'clamp'),
      transform: [
        {
          translateY: interpolate(
            y,
            [-heroHeight, 0, heroHeight],
            [heroHeight /2, 0, -heroHeight * 0.3],
            'clamp'
          )
        },
        { scale: interpolate(y, [-heroHeight, 0], [2,1], 'clamp') }
      ]
    }
  })

  if (isPending || !data || data.status !== 200) {
    return (
      <Screen edges={[]}>
        <TitleDetailSkeleton />
      </Screen>
    )
  }

  const title = data.data

  const year = title.releaseDate
    ? new Date(title.releaseDate).getFullYear()
    : null

  const meta = [year, ...title.genres.slice(0, 3)].filter(Boolean).join(' · ')

  const ageRating = title.ageRating

  const accentColor = TITLE_CARD_CONFIG[title.type].accent

  const creatorRoles = [...new Set(title.creators.map(creator => creator.role))]
  const creatorLines = creatorRoles.map(role => ({
    role,
    names: title.creators
      .filter(creator => creator.role === role)
      .map(creator => creator.name)
  }))

  return (
    <Screen edges={[]}>
      <Toolbar
        isBackButton
        isAbsolute
        rightSide={
          <ShareButton
            isAuthenticated={isAuthenticated}
            title={title}
          />
        }
      />
      <Animated.View 
        style={[styles.hero, heroStyle]}
        pointerEvents='none'
      >
        <HeroBackdrop
          coverUrl={title.coverUrl}
          height={heroHeight}
        />
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >  
        <View style={{height: heroHeight - OVERLAP}} />
        <View style={styles.body}>
          <LinearGradient
            colors={['transparent', colors.bg.base]}
            style={styles.bodyFade}
            pointerEvents='none'
          />
          <View style={styles.content}>
            <TitleInfo
              name={title.name}
              meta={meta}
              ageRating={ageRating}
              description={title.description}
              descriptionLines={4}
            />

            {creatorLines.map(({ role, names }) => (
              <Text
                key={role}
                style={styles.line}
              >
                <Text style={styles.label}>{CREATOR_ROLE_LABEL[role]}: </Text>
                {names.join(' · ')}
              </Text>
            ))}
          </View>

          <DetailsActions
            title={title}
            accentColor={accentColor}
            isAuthenticated={isAuthenticated}
          />

          {!!title.cast.length && (
            <View style={styles.cast}>
              <SectionCarousel title='Top cast'>
                {title.cast.map((person, index) => (
                  <CastCard
                    key={`${person.name}-${index}`}
                    person={person}
                  />
                ))}
              </SectionCarousel>
            </View>
          )}

          {!!title.similar.length && (
            <View style={styles.similar}>
              <SectionCarousel title='You man also like'>
                {title.similar.map(item => (
                  <TitleCard
                    key={item.key}
                    title={item}
                    onPress={() => router.push(`/title/${item.key}`)}
                  />
                ))}
              </SectionCarousel>
            </View>
          )}

          <ReviewsSection titleKey={key} />
        </View>
      </Animated.ScrollView>

      <Toolbar
        isAbsolute
        position='bottom'
        leftSide={
          <Button
            icon={Home}
            size='lg'
            variant='transparent'
            onPress={() => router.push('/')}
          />
        }
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  body: {
    backgroundColor: colors.bg.base,
    paddingBottom: space[6]
  },
  bodyFade: {
    position: 'absolute',
    top: -space[20] * 1.2,
    left: 0,
    right: 0,
    height: space[20] * 1.2
  },
  content: {
    paddingHorizontal: space['layout-horizontal'],
    gap: space[4],
    marginTop: -space[10],
    marginBottom: space[4]
  },
  line: {
    color: colors.text['little-muted'],
    fontSize: fontSize.sm
  },
  label: {
    color: colors.text.primary,
    fontWeight: fontWeight.medium
  },
  actions: {
    flexDirection: 'row',
    gap: space[4],
    marginTop: space[6]
  },
  cast: {
    marginTop: space[4]
  },
  similar: {
    marginTop: space[4]
  }
})

import { PosterGrid } from '@/components/onboarding/PosterGrid'
import { Button } from '@/components/ui'
import { Screen } from '@/components/ui/Screen'
import { useHasSeenOnboarding } from '@/hooks/useHasSeenOnboarding'
import { useDiscoverGetTrending } from '@app/api'
import { colors, fontSize, fontWeight, space } from '@app/tokens'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

const POSTER_COUNT = 28

export default function Onboarding() {
  const { markAsSeen } = useHasSeenOnboarding()
  const { data } = useDiscoverGetTrending({ take: POSTER_COUNT })
  const items = data?.data ?? []

  const onGetStarted = async () => {
    await markAsSeen()
    router.replace('/')
  }

  return (
    <Screen edges={[]}>
      <View
        style={styles.background}
        pointerEvents='none'
      >
        <View style={styles.posters}>
          <PosterGrid items={items} />
        </View>


        <LinearGradient
          colors={['transparent', 'transparent', colors.bg.base]}
          locations={[0, 0.45, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.playButtonWrapper}>
          <Text style={styles.logo}>Me Like</Text>
        </View>

        <Text style={styles.title}>Start Watching Movies For Every Mood</Text>
        <Text style={styles.subtitle}>
          Watch Unlimited Movies, Music Video, TV shows, Gaming and More.
        </Text>

        <Button
          label='Get Started'
          size='lg'
          fullWidth
          onPress={onGetStarted}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '65%',
    overflow: 'hidden',
    paddingTop: space[10],
  },
  posters: {
    opacity: 0.5,
    marginTop: '-25%',
    marginLeft: '-100%',
    transform: [{rotate: '20deg'}]
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: space['layout-horizontal'],
    paddingBottom: space[10],
    gap: space[3]
  },
  playButtonWrapper: {
    alignItems: 'center',
    marginBottom: space[4]
  },
  logo: {
    color: colors.text.primary,
    fontWeight: fontWeight.bold,
    fontSize: fontSize['3xl'],
    marginBottom: space[4]
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    textAlign: 'center'
  },
  subtitle: {
    color: colors.text['little-muted'],
    fontSize: fontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: space[4]
  }
})

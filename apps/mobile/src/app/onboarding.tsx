import { router } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors, fontSize, fontWeight, space } from '@app/tokens'

import { useDiscoverGetTrending } from '@app/api'

import { Button } from '@/components/ui'

import { PosterWall } from '@/components/onboarding/PosterWall'

import { useOnboarding } from '@/providers/OnboardingProvider'

export default function Onboarding() {
  const { data } = useDiscoverGetTrending({ take: 24 })
  const { completeOnboarding } = useOnboarding()

  const coverUrls = (data?.data ?? []).flatMap(({ coverUrl }) =>
    coverUrl ? [coverUrl] : []
  )

  const onGetStarted = async (route: 'login' | 'register') => {
    await completeOnboarding()
    router.push(`/${route}`)
  }

  return (
    <View style={styles.root}>
      <PosterWall coverUrls={coverUrls} />

      <SafeAreaView
        edges={['bottom']}
        style={styles.content}
      >
        <Text style={styles.logo}>Me Like</Text>

        <Text style={styles.title}>Track Everything You Love</Text>
        <Text style={styles.description}>
          Movies, series, anime, books and games in one place. Rate what you
          finish and discover your Taste DNA.
        </Text>

        <View style={styles.actions}>
          <Button
            label='Get started'
            size='lg'
            onPress={() => onGetStarted('register')}
          />
          
          <Button
            label='Explore first'
            size='lg'
            variant='secondary'
            onPress={completeOnboarding}
          />
        </View>

        <Pressable
          hitSlop={12}
          onPress={() => onGetStarted('login')}
        >
          <Text style={styles.login}>
            Already have an account?{' '}
            <Text style={styles.loginAccent}>Log in</Text>
          </Text>
        </Pressable>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    gap: space[4],
    paddingHorizontal: space['layout-horizontal'],
    paddingBottom: space[4]
  },
  logo: {
    textAlign: 'center',
    color: colors.text.primary,
    fontWeight: fontWeight.bold,
    fontSize: fontSize['3xl'],
    marginBottom: space[4]
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    textAlign: 'center'
  },
  description: {
    color: colors.text['little-muted'],
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginBottom: space[4]
  },
  actions: { gap: space[3] },
  login: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    textAlign: 'center'
  },
  loginAccent: {
    fontWeight: fontWeight.semibold,
    textDecorationLine: 'underline'
  }
})

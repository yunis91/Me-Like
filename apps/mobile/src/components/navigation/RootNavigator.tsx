import { Stack } from 'expo-router'

import { useOnboarding } from '@/providers/OnboardingProvider'

export function RootNavigator() {
  const { isCompleted } = useOnboarding()

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isCompleted}>
        <Stack.Screen name='onboarding'/>
      </Stack.Protected>
      <Stack.Protected guard={isCompleted}>
        <Stack.Screen name='(tabs)'/>
      </Stack.Protected>
    </Stack>
  )
}

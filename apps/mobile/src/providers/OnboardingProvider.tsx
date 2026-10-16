import * as SecureStore from 'expo-secure-store'
import { type ReactNode, createContext, use, useEffect, useState } from 'react'

const STORAGE_KEY = 'onboardingCompleted'

const OnboardingContext = createContext<{
  isCompleted: boolean
  completeOnboarding: () => Promise<void>
} | null>(null)

interface Props {
  children: ReactNode
}

export function OnboardingProvider({ children }: Props) {
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null)

  useEffect(() => {
    SecureStore.getItemAsync(STORAGE_KEY).then(value =>
      setIsCompleted(value === 'true')
    )
  }, [])

  const completeOnboarding = async () => {
    await SecureStore.setItemAsync(STORAGE_KEY, 'true')
    setIsCompleted(true)
  }

  if (isCompleted === null) return null

  return (
    <OnboardingContext value={{ isCompleted, completeOnboarding }}>
      {children}
    </OnboardingContext>
  )
}

export function useOnboarding() {
  const context = use(OnboardingContext)

  if (!context) {
    throw new Error('useOnboarding must be used inside OnboardingProvider')
  }

  return context
}

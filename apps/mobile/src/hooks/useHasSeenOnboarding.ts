import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'

const HAS_SEEN_ONBOARDING_KEY = 'hasSeenOnboarding'

/**
 * Онбординг не гейт безопасности (гостю и так доступно всё приложение,
 * см. useProtectedPush/LoginToButton) — просто экран приветствия на первый
 * запуск. Флаг живёт в SecureStore и ставится один раз на всё время
 * установки — логин/логаут на него не влияют
 */
export function useHasSeenOnboarding() {
  // null — ещё не прочитали флаг
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  )

  useEffect(() => {
    SecureStore.getItemAsync(HAS_SEEN_ONBOARDING_KEY).then(value => {
      setHasSeenOnboarding(value === 'true')
    })
  }, [])

  const markAsSeen = async () => {
    await SecureStore.setItemAsync(HAS_SEEN_ONBOARDING_KEY, 'true')
    setHasSeenOnboarding(true)
  }

  return { hasSeenOnboarding, markAsSeen }
}

import * as SecureStore from 'expo-secure-store'

import { clearTokens, getRefreshToken, saveTokens } from "@/lib/token"
import { configureApi } from '@app/api'
import { authTokenSchema } from "@app/schemas"

configureApi({
  baseUrl: process.env.EXPO_PUBLIC_API_URL!,
  getToken: () => SecureStore.getItemAsync('accessToken'),
  onRefresh: async () => {
    const refreshToken = await getRefreshToken()
    if(!refreshToken) return false

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/mobile/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({refreshToken})
      })

      if(!response.ok) return false

      const result = authTokenSchema.safeParse(await response.json())

      if(!result.success) return false

      await saveTokens(result.data.accessToken, result.data.refreshToken)

      return true
    }catch {
      return false
    }

  },
  onUnauthorized: async () => {
    await clearTokens()
    // router.replace('/login')
  }
})
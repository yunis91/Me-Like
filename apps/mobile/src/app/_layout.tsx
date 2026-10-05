import '@/lib/api'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { DarkTheme, Stack, ThemeProvider } from "expo-router"
import { StatusBar } from 'expo-status-bar'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000 // 1 minute
    }
  }
})

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <SafeAreaProvider>
          <ThemeProvider value={DarkTheme}>
            <StatusBar style='auto' animated />
            <Stack screenOptions={{ headerShown: false }} />
          </ThemeProvider>
        </SafeAreaProvider>
      </KeyboardProvider>
    </QueryClientProvider>
  );
}

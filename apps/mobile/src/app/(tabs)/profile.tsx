import { Screen } from '@/components/ui/Screen'
import { clearTokens, getRefreshToken, } from "@/lib/token"
import { useAuthMobileLogout, useUserFindMe } from "@app/api"
import { space } from "@app/tokens"
import { useQueryClient } from "@tanstack/react-query"
import { Redirect, router } from "expo-router"
import { ScrollView } from "react-native"

import { PROFILE_MENU } from "@/components/profile/profile-menu.data"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { ProfileMenuItem } from "@/components/profile/ProfileMenuItem"
import { LogOut } from "lucide-react-native"

export default function Profile() {
  const queryClient = useQueryClient()
  const {data, isPending: isLoading, isError} = useUserFindMe()

  const {mutate: logout, isPending} = useAuthMobileLogout({
    mutation: {
      onSettled: async() => {
        await clearTokens()
        queryClient.clear()
        router.replace('/login')
      }
    }
  })

  const handleLogout = async() => {
    const refreshToken = await getRefreshToken()
    if (!refreshToken) return
    logout({data: {refreshToken} })
  }

  if(isLoading) return <Screen />

  if(isError || !data) return <Redirect href='/login' />

  return <Screen edges={[]}>

    <ProfileHeader
      name={data.data.username}
      avatarUrl={data.data.profile?.avatarUrl || 'https://placehold.net/avatar.svg'}
    />

    <ScrollView showsVerticalScrollIndicator={false} style={{
      paddingHorizontal: space['layout-horizontal']
    }}>

      {PROFILE_MENU.map((item) => (
        <ProfileMenuItem
          key={item.label}
          {...item}
        />
      ))}

    <ProfileMenuItem
      icon={LogOut}
      label={isPending ? 'Logging out...' : 'Sign out'}
      onPress={handleLogout}
      isLast />
    </ScrollView>
  </Screen>
}
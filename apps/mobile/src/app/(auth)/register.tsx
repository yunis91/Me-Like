import { saveTokens } from "@/lib/token"
import { useAuthMobileRegister } from "@app/api"
import { router, useLocalSearchParams, type Href } from "expo-router"

import { AuthForm } from "@/components/auth/AuthForm"
import { useQueryClient } from "@tanstack/react-query"

export default function Register() {
  const queryClient = useQueryClient()
  const {redirect} = useLocalSearchParams<{
      redirect?: Extract<Href, string>
    }>()
  const {mutate, isPending, error} = useAuthMobileRegister({
    mutation: {
      onSuccess: async({data: {accessToken, refreshToken}}) => {
        await saveTokens(accessToken, refreshToken)
        queryClient.clear()
        await queryClient.resetQueries()

        if (redirect) {
          router.back()
          router.push(redirect)
          return
        }
        router.replace('/profile')
      }
    }
  })

  return (
    <AuthForm
      type='register'
      error={error}
      isPending={isPending}
      onSubmit={data => mutate({ data})}
    />
  )

}
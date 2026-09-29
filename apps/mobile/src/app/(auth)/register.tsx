import { saveTokens } from "@/lib/token"
import { useAuthMobileRegister } from "@app/api"
import { router } from "expo-router"

import { AuthForm } from "@/components/auth/AuthForm"
import { useQueryClient } from "@tanstack/react-query"

export default function Register() {
  const queryClient = useQueryClient()
  const {mutate, isPending, error} = useAuthMobileRegister({
    mutation: {
      onSuccess: async({data: {accessToken, refreshToken}}) => {
        await saveTokens(accessToken, refreshToken)
        queryClient.clear()
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
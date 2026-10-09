import { AuthForm } from "@/components/auth/AuthForm"
import { saveTokens } from "@/lib/token"
import { useAuthMobileLogin } from "@app/api"
import { useQueryClient } from "@tanstack/react-query"
import { router, useLocalSearchParams, type Href } from "expo-router"

export default function Login () {
  const queryClient = useQueryClient()
  const {redirect} = useLocalSearchParams<{
    redirect?: Extract<Href, string>
  }>()
  const {mutate, isPending, error} = useAuthMobileLogin({
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
       type='login'
       error={error}
       isPending={isPending}
       onSubmit={data => mutate({ data})}
     />
  )
}
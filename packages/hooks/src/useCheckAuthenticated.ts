import { useUserFindMe } from '@app/api'

export function useCheckAuthenticated() {
  const { data: me, isPending } = useUserFindMe()
  const isAuthenticated = me?.status === 200

  return {
    isAuthenticated,
    // true, пока не пришёл ни успешный ответ, ни ошибка — полезно там, где
    // по isAuthenticated=false сразу принимают решение (например, редирект),
    // чтобы не дёргаться на незалогиненного юзера, пока запрос ещё летит
    isPending
  }
}
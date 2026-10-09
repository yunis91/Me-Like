import { useCheckAuthenticated } from '@app/hooks'
import { router, type Href } from 'expo-router'

export function useProtectedPush() {
	const { isAuthenticated } = useCheckAuthenticated()

	return (href: Extract<Href, string>) => {
		if (isAuthenticated) {
			router.push(href)
			return
		}
		router.push({pathname: '/login', params: {redacted: href}})
	}
}
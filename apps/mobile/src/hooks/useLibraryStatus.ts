import { getDiscoverFindMyStateQueryKey, useDiscoverFindMyState, useLibrarySetStatusByDiscoverKey, useUserFindMe } from '@app/api'
import type { TLibraryStatus } from '@app/types'
import { useQueryClient } from '@tanstack/react-query'

export function useLibraryStatus(key: string) {
	const queryClient = useQueryClient()

	const { data:me } = useUserFindMe()
	const isAuthorized = me?.status === 200

	const { data: myState } = useDiscoverFindMyState(key, {
		query: { enabled: isAuthorized }
	})

	const { mutate, variables, isPending } = useLibrarySetStatusByDiscoverKey({
		mutation: {
			onSettled: () =>
				queryClient.invalidateQueries({
					queryKey: getDiscoverFindMyStateQueryKey(key),
				})
		}
	})

	const savedStatus = myState?.data.libraryEntry?.status ?? null
	const pendingStatus = isPending ? variables?.data.status : undefined

	const setStatus = (status: TLibraryStatus) => {
		mutate({
			key,
			data: {
				status
			}
		})
	}

	return {
		isAuthorized,
		status: pendingStatus ?? savedStatus,
		rating: myState?.data.review?.rating ?? null,
		setStatus
	}
}
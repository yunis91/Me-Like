
import { SHARE_FRIENDS } from '@/components/detail/share/share-friends.date'
import { useState } from 'react'


export function useSelectFriends() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const recipients = SHARE_FRIENDS.filter(friend =>
    selectedIds.includes(friend.id)
  )
    .map(friend => friend.name)
    .join(', ')

  const handleSelectFriend = (id: string) => {
    setSelectedIds(ids =>
      ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]
    )
  }

  const clearSelectedIds = () => {
    setSelectedIds([])
  }

  return {
    selectedIds,
    setSelectedIds: handleSelectFriend,
    recipients,
    clearSelectedIds
  }
}
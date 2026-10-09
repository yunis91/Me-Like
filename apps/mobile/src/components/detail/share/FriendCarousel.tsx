import type { DiscoverDetailsResponse } from '@app/api'
import { fontSize } from '@app/tokens'
import { StyleSheet } from 'react-native'

import { Carousel } from '@/components/carousel'
import { FriendAvatar } from './FriendAvatar'
import { SHARE_FRIENDS } from './share-friends.date'

interface FriendCarouselProps {
  title: Pick<
    DiscoverDetailsResponse,
    'type' | 'coverUrl' | 'name' | 'releaseDate'
  >
  selectedIds: string[]
  setSelectedIds: (ids: string) => void
}

export function FriendCarousel({
  title,
  selectedIds,
  setSelectedIds
}: FriendCarouselProps) {
  const titleName = title.name
  const year = title.releaseDate
    ? new Date(title.releaseDate).getFullYear()
    : null

  const heading = `${titleName}${year ? ` (${year})` : ''}`

  return (
    <Carousel
      title={heading}
      titleStyle={styles.carouselTitle}
    >
      {SHARE_FRIENDS.map(friend => (
        <FriendAvatar
          key={friend.id}
          name={friend.name}
          avatarUrl={friend.avatarUrl}
          isSelected={selectedIds.includes(friend.id)}
          onPress={() => setSelectedIds(friend.id)}
        />
      ))}
    </Carousel>
  )
}

const styles = StyleSheet.create({
  carouselTitle: {
    fontSize: fontSize.base
  }
})
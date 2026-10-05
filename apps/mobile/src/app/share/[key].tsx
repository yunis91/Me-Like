import { SectionCarousel } from '@/components/section-carousel/SectionCarousel'
import { FriendAvatar } from '@/components/share/FriendAvatar'
import { SHARE_FRIENDS } from '@/components/share/share-friends.date'
import { Button, Input, ScreenTitle } from '@/components/ui'
import { useDiscoverFindByKey } from '@app/api'
import { colors, fontSize, radius, space } from '@app/tokens'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ShareSheet() {
	const { key } = useLocalSearchParams<{key: string}>()
	const {data} = useDiscoverFindByKey(key)

	const [selectedIds, setSelectedIds] = useState<string[]>([])

	const title = data?.status === 200 ? data.data : null
	const year = title?.releaseDate
    ? new Date(title.releaseDate).getFullYear()
    : null
	const heading = [title?.name, year].filter(Boolean).join(' ')

	const toggleFriends = (id: string) => {
    setSelectedIds(ids =>
      ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]
    )
  }

	const recipients = SHARE_FRIENDS.filter(friend =>
    selectedIds.includes(friend.id)
  )
    .map(friend => friend.name)
    .join(', ')

	return (
    <View style={styles.root}>
      <View style={styles.content}>
        <View style={[styles.title]}>
          <ScreenTitle>
            Share with your friends
          </ScreenTitle>
          <View style={styles.divider} />
        </View>

				<SectionCarousel title={heading}>
					{SHARE_FRIENDS.map(friend => (
						<FriendAvatar 
							key={friend.id}
							name={friend.name}
							avatarUrl={friend.avatarUrl}
							isSelected={selectedIds.includes(friend.id)}
							onPress={() => toggleFriends(friend.id)}
						/>
					))}
				</SectionCarousel>

        <View style={[styles.form]}>
					<Text style={[styles.inset, styles.recipients]}>
            To: {recipients}
          </Text>
          

          <View style={[styles.inset]}>
            <Input
              placeholder='Check this out!'
              multiline
            />
          </View>

          <View style={styles.divider} />

          <View style={[styles.inset, styles.buttonsContainer]}>
						<Button
							tintColor={colors.status.success}
							onPress={router.back}
						>
							Send
						</Button>
						<Button
							variant='secondary'
							onPress={router.back}
						>
							Cancel
						</Button>
					</View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base
  },
  content: {
    gap: space[2]
  },
  inset: {
    paddingHorizontal: space['layout-horizontal']
  },
  title: {
    paddingVertical: space[6],
    gap: space[2]
  },
  carouselTitle: {},
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border
  },
  form: {
    gap: space[2]
  },
  recipients: {
    fontSize: fontSize.sm,
    color: colors.text.muted
  },
  inputCuntainer: {
    height: undefined,
    minHeight: 110,
    borderRadius: radius.sm
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: space[2]
  }
})
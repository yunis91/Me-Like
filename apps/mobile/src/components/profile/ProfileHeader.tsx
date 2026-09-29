import { colors, fontSize, fontWeight, radius, space } from "@app/tokens"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { Pressable, StyleSheet, Text } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface Props {
    name: string,
    avatarUrl?: string
}

export function ProfileHeader({name, avatarUrl}: Props) {

  const insets = useSafeAreaInsets()

  return (
    <LinearGradient
      colors={[colors.select, 'transparent']}
      style={[styles.root, { paddingTop: insets.top + space[10] }]}
    >
      <Image
        source={avatarUrl}
        style={styles.avatar}
        contentFit={'cover'}
      />

      <Pressable
        onPress={() => router.push('/settings')}
        hitSlop={12}
      >
        <Text style={styles.edit}>edit</Text>
      </Pressable>

        <Text style={styles.name}>{name}</Text>
    </LinearGradient>
  )
}

const styles= StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingBottom: space[8],
    paddingHorizontal: space['layout-horizontal'],
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: radius.full,
    backgroundColor: colors.bg.card
  },
  edit: {
    color: colors.text['little-muted'],
    fontSize: fontSize.sm,
    marginTop: space[3]
  },
  name: {
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    marginTop: space[1]
  }
})
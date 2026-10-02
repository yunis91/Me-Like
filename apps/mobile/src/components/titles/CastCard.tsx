import { Image } from 'expo-image'
import { User } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fontSize, fontWeight, radius, space } from '@app/tokens'

import type { PersonResponse } from '@app/api'


interface Props {
  person: PersonResponse
}

export function CastCard({ person }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.avatar}>
        {person.photoUrl ? (
          <Image
            source={person.photoUrl}
            style={StyleSheet.absoluteFill}
            contentFit='cover'
            transition={200}
          />
        ) : (
          <User
            size={26}
            color={colors.text.muted}
          />
        )}
      </View>

      <Text
        style={styles.name}
        numberOfLines={2}
      >
        {person.name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: space[20] + space[4],
    alignItems: 'center',
    gap: space[2]
  },
  avatar: {
    width: space[20],
    height: space[20],
    borderRadius: radius.full,
    overflow: 'hidden',
    backgroundColor: colors.bg.card,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    color: colors.text.primary,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    textAlign: 'center'
  }
})

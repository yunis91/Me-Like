import { colors, fontSize, fontWeight, space } from '@app/tokens'
import type { PropsWithChildren } from 'react'
import { type StyleProp, StyleSheet, Text, type TextStyle, View } from 'react-native'

interface PreviewTitleHeaderProps extends PropsWithChildren {
  text: string
  style?: StyleProp<TextStyle>
}

export function PreviewTitleHeader({
  text,
  style,
  children
}: PreviewTitleHeaderProps) {
  return (
    <View style={styles.root}>
      {children}
      <Text
        style={[styles.title, style]}
        numberOfLines={1}
      >
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2]
  },
  title: {
    flexShrink: 1,
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold
  }
})
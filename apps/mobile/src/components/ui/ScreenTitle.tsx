import { colors, fontSize, fontWeight } from '@app/tokens'
import { StyleSheet, Text, type TextProps } from 'react-native'

export function ScreenTitle({ children, style, ...rest }: TextProps) {
  return (
    <Text
      style={[styles.title, style]}
      {...rest}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  title: {
    color: colors.text.primary,
    fontSize: fontSize['1.5xl'],
    fontWeight: fontWeight.bold
  }
})
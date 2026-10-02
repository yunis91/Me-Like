import type { LucideIcon } from 'lucide-react-native'
import { Pressable, StyleSheet, Text } from 'react-native'

import type { TButtonSize, TButtonVariant } from '@app/types'

import { isGlassEffectAvailable } from '@/utils/is-glass-effect-available'
import { colors, fontSize, fontWeight, radius, space } from '@app/tokens'
import { GlassView } from 'expo-glass-effect'

interface Props {
  children?: React.ReactNode
  variant?: TButtonVariant
  size?: TButtonSize
  icon?: LucideIcon
  isDisabled?: boolean
  tintColor?: string
  onPress: () => void
}

const CONTENT_COLOR: Record<TButtonVariant, string> = {
  primary: colors.text.secondary,
  secondary: colors.text.primary
}

const VARIANT_BACKGROUND: Record<TButtonVariant, string> = {
  primary: colors.primary,
  secondary: colors.bg.card
}

const ICON_SIZE: Record<TButtonSize, number> = {
  md: 18,
  lg: 20
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  isDisabled,
  tintColor,
  onPress
}: Props) {
  const isIconOnly = !children && !!Icon
  const hasGlassEffect = isGlassEffectAvailable()

  const contentColor = tintColor ? colors.text.primary : CONTENT_COLOR[variant]
  const background = tintColor ?? VARIANT_BACKGROUND[variant]

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.root,
        sizeStyles[size],
        isIconOnly && [styles.iconOnly, iconOnlySizes[size]],
        // GlassView не умеет сама сайзиться под текст переменной длины — её
        // держим декоративным слоем-подложкой, а размер и ширину считает
        // сам Pressable (как обычный flex-контент). Без glass — просто заливка.
        !hasGlassEffect && { backgroundColor: background },
        pressed && styles.pressed,
        isDisabled && styles.disabled
      ]}
    >
      {hasGlassEffect && (
        <GlassView
          style={StyleSheet.absoluteFill}
          glassEffectStyle='clear'
          isInteractive
          tintColor={background}
        />
      )}

      {Icon && (
        <Icon
          size={ICON_SIZE[size]}
          color={contentColor}
        />
      )}
      {children && (
        <Text style={[styles.label, labelSizes[size], { color: contentColor }]}>
          {children}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[2],
    borderRadius: radius.full,
    overflow: 'hidden'
  },
  iconOnly: { paddingHorizontal: 0, aspectRatio: 1 },
  pressed: { opacity: 0.7 },
  disabled: { opacity: 0.4 },
  label: { fontWeight: fontWeight.semibold }
})

const sizeStyles = StyleSheet.create({
  md: { height: 44, paddingHorizontal: space[5] },
  lg: { height: 56, paddingHorizontal: space[6] }
})

const iconOnlySizes = StyleSheet.create({
  md: { width: 44 },
  lg: { width: 56 }
})

const labelSizes = StyleSheet.create({
  md: { fontSize: fontSize.sm },
  lg: { fontSize: fontSize.base }
})

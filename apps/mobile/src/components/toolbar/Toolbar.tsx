import { colors, fontSize, fontWeight, space } from '@app/tokens'
import { BlurView } from 'expo-blur'
import type { ReactNode } from 'react'
import {
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewProps,
  type ViewStyle
} from 'react-native'
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ToolbarActionButton } from './ToolbarActionButton'

interface Props extends ViewProps {
  scrollY?: SharedValue<number>
  leftSide?: ReactNode | string
  rightSide?: ReactNode
  isBackButton?: boolean
  isCloseButton?: boolean
  withBlur?: boolean
  isAbsolute?: boolean
  /** Где закрепить тулбар при isAbsolute. По умолчанию 'top' */
  position?: 'top' | 'bottom'
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export function Toolbar({
  scrollY,
  leftSide,
  rightSide,
  isBackButton,
  isCloseButton,
  withBlur,
  isAbsolute,
  position = 'top',
  style,
  children,
  onPress
}: Props) {
  const insets = useSafeAreaInsets()

  const blurStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY?.get() ?? 0, [0, 100], [0, 1], 'clamp')
  }))

  return (
    <View
      style={[
        styles.root,
        position === 'top' ? styles.rootTop : styles.rootBottom,
        isAbsolute && (
          position === 'top'
            ? {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                paddingTop: insets.top * 1.2,
                paddingHorizontal: space['layout-horizontal']
              }
            : {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                paddingBottom: insets.bottom + space['layout-horizontal'],
                paddingHorizontal: space['layout-horizontal']
              }
        ),
        style
      ]}
      pointerEvents='box-none'
    >
      {withBlur && (
        <Animated.View
          pointerEvents='box-none'
          style={[StyleSheet.absoluteFill, blurStyle]}
        >
          <BlurView
            intensity={80}
            tint='systemChromeMaterialDark'
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.overlay} />
        </Animated.View>
      )}

      <View style={[styles.contentWrapper]}>
        <View style={[styles.content, styles.leftContent]}>
          <ToolbarActionButton
            isBackButton={isBackButton}
            isCloseButton={isCloseButton}
            onPress={onPress}
          />
          {typeof leftSide === 'string' ? (
            <Text style={styles.text}>{leftSide}</Text>
          ) : (
            leftSide
          )}
        </View>

        {children}

        <View style={[styles.content, styles.rightContent]}>{rightSide}</View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    zIndex: 10,
    overflow: 'hidden'
  },
  rootTop: {
    paddingBottom: space['layout-horizontal']
  },
  rootBottom: {
    paddingTop: space['layout-horizontal']
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)'
  },
  contentWrapper: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: space[2]
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2]
  },
  leftContent: {
    justifyContent: 'flex-start'
  },
  rightContent: {
    justifyContent: 'flex-end'
  },
  text: {
    color: colors.text.primary,
    textAlign: 'center',
    fontSize: fontSize['1.5xl'],
    fontWeight: fontWeight.bold
  }
})
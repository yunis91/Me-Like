import { colors, fontSize, fontWeight, space } from '@app/tokens'
import { BlurView } from 'expo-blur'
import { Bell } from 'lucide-react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  type SharedValue,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function HomeHeader({ scrollY }: { scrollY: SharedValue<number> }) {

  const insets = useSafeAreaInsets()

  const blurStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.get(), [0, 35], [0, 1], 'clamp')
  }))

  return (
    <View
      style={styles.root}
      pointerEvents='box-none'
    >
      <Animated.View
        pointerEvents='none'
        style={[StyleSheet.absoluteFill, blurStyle]}
      >
        <BlurView
          intensity={80}
          tint='systemChromeMaterialDark'
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.overlay} />
      </Animated.View>

      <View style={[styles.inner, { paddingTop: insets.top }]}>
        <Text style={styles.logo}>Me Like</Text>

        <Pressable hitSlop={12}>
          <Bell color={colors.text.primary} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)'
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space['layout-horizontal'],
    paddingBottom: space[4]
  },
  logo: {
    color: colors.text.primary,
    fontSize: fontSize['1.5xl'],
    fontWeight: fontWeight.bold,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.25)'
  }
})
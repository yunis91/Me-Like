import { colors, radius, space } from '@app/tokens'
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect'
import type { LucideIcon } from 'lucide-react-native'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
	icon: LucideIcon
	onPress: () => void
	side: 'left' | 'right'
	iconOffset?: number
}

export function FloatingButton({ icon: Icon, onPress, side, iconOffset }: Props) {

	const insets = useSafeAreaInsets()
	
	const position = [
		styles.root, {top: insets.top + space[2]}, side === 'left' ? { left: space[4] } : { right: space[4] }
	]

	const content = <Icon size={26} color={colors.text.primary} style={iconOffset ? { marginLeft: iconOffset } : undefined} />

	if (!isLiquidGlassAvailable()) {
		return (
			<Pressable hitSlop={12} style={[position, styles.fallback]} onPress={onPress}>
				{content}
			</Pressable>
		)
	}

	return (
		<View style={position}>
			<GlassView style={styles.glass} glassEffectStyle='clear' isInteractive>
				<Pressable hitSlop={12} style={styles.press} onPress={onPress}>{content}</Pressable>
			</GlassView>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		position: 'absolute',
		zIndex: 10,
		width: space[10],
		height: space[10],
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: radius.full,
		overflow: 'hidden',
	},
	glass: {
		width: space[10],
		height: space[10],
		borderRadius: radius.full,
	},
	press: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	
	},
	fallback: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	}
})
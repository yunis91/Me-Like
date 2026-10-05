import type { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fontSize, fontWeight } from '@app/tokens'

interface Props {
	children: string
	action?: ReactNode
	style?: object
}

export function ScreenTitle({ children, action, style }: Props) {
	return (
		<View style={[styles.root, style]}>
			<Text style={styles.title}>{children}</Text>
			{action}
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	title: {
		color: colors.text.primary,
		fontSize: fontSize['1.5xl'],
		fontWeight: fontWeight.bold,
	},
})
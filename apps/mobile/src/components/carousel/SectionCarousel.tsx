import { colors, fontSize, fontWeight, space } from '@app/tokens'
import { ChevronRight } from 'lucide-react-native'
import type { ReactNode } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

interface Props {
	title: string
	onPressArrow?: () => void
	children: ReactNode
}

export function SectionCarousel({ title, onPressArrow, children }: Props) {
		return (
			<View style={styles.root}>
				<Pressable
					onPress={onPressArrow}
					disabled={!onPressArrow}
					hitSlop={6}
					style={styles.header}
				>
					<Text style={styles.title}>{title}</Text>
					{!!onPressArrow && <ChevronRight size={26} color={colors.text.primary} />}
				</Pressable>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.scrollContent}
				>
				{children}
				</ScrollView>
			</View>
		)	
}

const styles = StyleSheet.create({
	root: {
		gap: space[3], marginBottom: space['layout-horizontal']
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: space['layout-horizontal'],
		marginBottom: space[2]
	},
	title: {
		color: colors.text.primary,
		fontSize: fontSize.xl,
		fontWeight: fontWeight.semibold,
	},
	scrollContent: {
		gap: space[3],
		paddingHorizontal: space['layout-horizontal']
	},
});
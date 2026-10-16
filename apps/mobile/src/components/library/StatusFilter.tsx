import { STATUS_LABELS } from '@app/constants'
import { colors, fontSize, fontWeight, radius, space } from '@app/tokens'
import type { TLibraryStatus } from '@app/types'
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native'

const STATUSES = [
	null,
	...Object.keys(STATUS_LABELS)
] as (TLibraryStatus | null)[]

interface Props {
	value: TLibraryStatus | null
	onChange: (value: TLibraryStatus | null) => void
}

export default function StatusFilter({ value, onChange }: Props) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			style={styles.root}
			contentContainerStyle={styles.content}
		>
			{STATUSES.map(status => {
				const isActive = status === value

				return (
					<Pressable
						key={status ?? 'All'}
						onPress={() => onChange(status)}
						style={[styles.chip, isActive && styles.chipActive]}
					>
						<Text style={[styles.label, isActive && styles.labelActive]}>
							{status ? STATUS_LABELS[status] : 'All'}
						</Text>
					</Pressable>
				)
			})}
		</ScrollView>
	)
}


const styles = StyleSheet.create({
	root: { flexGrow: 0, marginBottom: space[4],},
	content: {
		gap: space[2],
		paddingHorizontal: space['layout-horizontal']
	},
	chip: {
		height: 36,
		justifyContent: 'center',
		paddingHorizontal: space[4],
		borderRadius: radius.full,
		backgroundColor: colors.bg.card
	},
	chipActive: {
		backgroundColor: colors.primary
	},
	label: {
		color: colors.text.primary,
		fontSize: fontSize.sm,
		fontWeight: fontWeight.medium
	},
	labelActive: {
		color: colors.text.secondary
	}
})

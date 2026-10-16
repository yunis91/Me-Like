import { PLANS } from '@/components/plans/plan.data'
import { PlanCard } from '@/components/plans/PlanCard'
import { Toolbar } from '@/components/toolbar'
import { colors, fontSize, fontWeight, space } from '@app/tokens'
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


export default function Subscription() {
	const { width } = useWindowDimensions()
	const { top } = useSafeAreaInsets()

	const cardWidth = width - space[8] * 2

	return (
		<View style={styles.root}>
			<Toolbar
				isBackButton
				isAbsolute
			/>
			<View style={[styles.content, {paddingTop: top + space[16]}]}>
				<Text style={styles.title}>Choose your plan</Text>

				<ScrollView
					horizontal
					style={styles.carousel}
					showsHorizontalScrollIndicator={false}
					snapToInterval={cardWidth + space[3]}
					decelerationRate='fast'
					contentContainerStyle={styles.cards}
				>
					{PLANS.map(plan => (
						<PlanCard
							key={plan.id}
							plan={plan}
							width={cardWidth}
							onPress={() => {}}
						/>
					))}
				</ScrollView>

			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colors.bg.base
	},
	content: {
		flex: 1,
		gap: space[8]
	},
	carousel: {
		flexGrow: 0
	},
	title: {
		color: colors.text.primary,
		fontSize: fontSize['2xl'],
		fontWeight: fontWeight.bold,
		textAlign: 'center'
	},
	cards: {
		alignItems: 'flex-start',
		gap: space[3],
		paddingHorizontal: space[16]
	}
})
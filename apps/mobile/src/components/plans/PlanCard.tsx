import { colors, fontSize, fontWeight, radius, space } from '@app/tokens'
import type { IPlan } from '@app/types'
import { Check } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from '../ui'
import { PLAN_FEATURE } from './plan.data'

interface Props {
	plan: IPlan
	width: number
	onPress: () => void
}

export function PlanCard({plan, width, onPress}: Props) {
	const {price, name, period, badge} = plan

	return (
		<View style={[styles.root, {width}]}>
			{!!badge && (
				<View style={styles.badge}>
					<Text style={styles.badgeText}>{badge}</Text>
				</View>
			)}

			<View style={styles.header}>
				<Text style={styles.price}>{price}</Text>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.period}>{period}</Text>
			</View>

			<View style={styles.divider}></View>

			<View style={styles.features}>
				{PLAN_FEATURE.map(({ label, isPremium }) => (
					<View 
						key={label}
						style={styles.feature}
					>
						<View style={[styles.check, isPremium && styles.checkPremium]}>
							<Check
								size={12}
								color={colors.text.primary}
								strokeWidth={3}
							/>
						</View>
						<Text style={styles.featureText}>{label}</Text>
					</View>
				))}
			</View>

			<Button 
				label='Get started'
				size='lg'
				onPress={onPress}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		gap: space[5],
		padding: space[6],
		borderRadius: radius.lg,
		backgroundColor: colors.bg.card
	},
	badge: {
		position: 'absolute',
		top: space[4],
		right: space[4],
		paddingHorizontal: space[3],
		paddingVertical: space[1],
		borderWidth: 1,
		borderColor: colors.text['little-muted'],
		borderRadius: radius.full
	},
	badgeText: {
		color: colors.text.primary,
		fontSize: fontSize.xs
	},
	header: {
		alignItems: 'center',
		gap: space[1],
		marginTop: space[6]
	},
	price: {
		color: colors.text.primary,
		fontSize: fontSize['3xl'],
		fontWeight: fontWeight.bold
	},
	name: {
		color: colors.text.primary,
		fontSize: fontSize.xl,
		fontWeight: fontWeight.semibold
	},
	period: {
		color: colors.text.primary,
		fontSize: fontSize.sm
	},
	divider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: colors.secondary
	},
	features: {gap: space[3]},
	feature: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: space[3]
	},
	check: {
		width: 20,
		height: 20,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: radius.full,
		backgroundColor: colors.secondary
	},
	checkPremium: {
		backgroundColor: colors.status.success
	},
	featureText: {
		flexShrink: 1,
		color: colors.text['little-muted'],
		fontSize: fontSize.sm
	}
})
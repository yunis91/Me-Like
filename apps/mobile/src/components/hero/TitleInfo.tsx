import { colors, fontSize, fontWeight, radius, space } from '@app/tokens'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
	name: string
	meta?: string
	ageRating?: string | null
	description?: string | null
	descriptionLines?: number
}

/**
 * Разные источники отдают рейтинг в своём формате (PG-13, TV-MA, R-17+,
 * E10+, 18+...) — показываем только число и "+", остальное отбрасываем.
 * Если цифр нет вообще (G, R, TV-MA, AO...) — показывать нечего.
 */
function formatAgeRating(rating?: string | null): string | null {
	const digits = rating?.match(/\d+/)?.[0]
	return digits ? `${digits}+` : null
}

export function TitleInfo({
	name,
	meta,
	ageRating,
	description,
	descriptionLines = 2
}: Props) {
	const formattedAgeRating = formatAgeRating(ageRating)

	return (
		<View style={styles.root}>
			<Text style={styles.name} numberOfLines={2}>{name}</Text>
			<View style={styles.ageMeta}>
				{!!formattedAgeRating && <Text style={styles.ageRating}>{formattedAgeRating}</Text>}
				{!!meta && <Text style={styles.meta}>{meta}</Text>}
			</View>
			{!!description && (
				<Text style={styles.description} numberOfLines={descriptionLines}>{description}</Text>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	root: {gap: space[2]},
	ageMeta: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: space[2]
	},
	name: {
		color: colors.text.primary,
		fontSize: fontSize['3xl'],
		fontWeight: fontWeight.bold
	},
	meta: {
		color: colors.text.primary,
		fontSize: fontSize.sm
	},
	ageRating: {
		color: colors.text.primary,
		fontSize: fontSize.xs,
		padding: space[1],
		borderRadius: radius.sm,
		borderWidth: 2,
		borderColor: colors.text['little-muted']
	},
	description: {
		color: colors.text['little-muted'],
		fontSize: fontSize.sm,
		lineHeight: 20
	}
})
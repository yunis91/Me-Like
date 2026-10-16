import type { IPlan, IPlanFeature } from '@app/types'

export const PLANS: IPlan[] = [
	{
		id: 'monthly',
		price: '$3.99',
		name: 'Monthly',
		period: 'Billed monthly'
	},
	{
		id: 'yearly',
		price: '$29.99',
		name: 'Yearly',
		period: 'Billed once a year',
		badge: 'Save 37%'
	}
]

export const PLAN_FEATURE: IPlanFeature[] = [
	{label: 'Movies, series, anime book and games', isPremium: false},
	{label: 'Rating and reviews', isPremium:false},
	{label: 'Collections', isPremium:false},
	{label: 'AI Picker', isPremium:true},
	{label: 'Spoiler-free AI summaries', isPremium:true},
	{label: 'Full Taste DNA', isPremium:true}
]
import type { TitleListItemResponseType } from '@app/api'
import { radius } from '@app/tokens'
import {
	BookOpen,
	Film,
	Gamepad2,
	type LucideIcon,
	Sparkle,
	Tv
} from 'lucide-react-native'

interface ITitleCardConfig {
  buttonAction: string
  radius: number
  icon: LucideIcon
  accent: string
  stacked?: boolean
  spine?: boolean
  glow?: string
}

export const TITLE_CARD_CONFIG: Record<
  TitleListItemResponseType,
  ITitleCardConfig
> = {
  MOVIE: {
    buttonAction: 'Watch Movie',
    radius: radius.md,
    icon: Film,
    accent: 'rgba(255, 0, 0, 0.38)'
  },
  TV_SHOW: {
    buttonAction: 'Watch TV Show',
    radius: radius.md,
    icon: Tv,
    stacked: true,
    accent: 'rgba(0, 255, 0, 0.38)'
  },
  GAME: {
    buttonAction: 'Play Game',
    radius: radius.md,
    icon: Gamepad2,
    accent: 'rgba(0, 0, 255, 0.38)'
  },
  BOOK: {
    buttonAction: 'Read Book',
    radius: radius.sm,
    icon: BookOpen,
    spine: true,
    accent: 'rgba(255, 255, 0, 0.38)'
  },
  ANIME: {
    buttonAction: 'Watch Anime',
    radius: radius.md,
    icon: Sparkle,
    accent: 'rgba(129, 65, 248, 0.38)',
    glow: 'rgba(129, 65, 248, 0.6)'
  }
}
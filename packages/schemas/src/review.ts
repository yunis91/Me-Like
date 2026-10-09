import { REVIEW_RATING, REVIEW_TEXT } from '@app/constants'
import z from 'zod'

export const reviewSchema = z.object({
  rating: z
    .number({
      error: 'Rate the title'
    })
    .int()
    .min(REVIEW_RATING.min)
    .max(REVIEW_RATING.max),
  text: z
    .string()
    .trim()
    .max(REVIEW_TEXT.max, {
      error: `Up to ${REVIEW_TEXT.max} characters`
    })
    .refine(text => !text || text.length >= REVIEW_TEXT.min, {
      error: `At least ${REVIEW_TEXT.min} characters or leave empty`
    })
})

export type TReviewSchema = z.infer<typeof reviewSchema>
import { z } from 'zod'

export const schema = z.object({
	title: z.string().min(1, 'Title is required'),
	content: z.string().min(1, 'Content is required'),
})

export type FormFields = z.infer<typeof schema>

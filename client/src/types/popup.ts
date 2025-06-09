import { ReactNode } from 'react'

export type PopupProps = {
	title?: string
	description?: string
	children: ReactNode
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

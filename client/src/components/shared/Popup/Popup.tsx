import { useState } from 'react'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { PopupProps } from '@/types/popup.ts'

export const Popup = ({
	title,
	description,
	children,
	open: controlledOpen,
	onOpenChange,
}: PopupProps) => {
	const [internalOpen, setInternalOpen] = useState(false)

	const isControlled = controlledOpen !== undefined
	const open = isControlled ? controlledOpen : internalOpen

	const handleOpenChange = (newOpen: boolean) => {
		if (!isControlled) {
			setInternalOpen(newOpen)
		}
		onOpenChange?.(newOpen)
	}

	return (
		<Dialog
			open={open}
			onOpenChange={handleOpenChange}>
			<DialogContent className='sm:max-w-[425px]'>
				{(title || description) && (
					<DialogHeader>
						{title && <DialogTitle>{title}</DialogTitle>}
						{description && (
							<DialogDescription>{description}</DialogDescription>
						)}
					</DialogHeader>
				)}
				{children}
			</DialogContent>
		</Dialog>
	)
}

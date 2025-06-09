import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'

type AlertModalProps = {
	isOpen: boolean
	setIsOpen: (open: boolean) => void
	handleDelete: () => void | Promise<void>
}

export const AlertModal = ({
	isOpen,
	setIsOpen,
	handleDelete,
}: AlertModalProps) => {
	return (
		<AlertDialog
			open={isOpen}
			onOpenChange={setIsOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						post.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

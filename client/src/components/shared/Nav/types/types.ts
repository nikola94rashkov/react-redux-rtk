export type NavLinkButtonProps = {
	text: string
	href?: string
	onClick?: () => Promise<void>
} & React.ComponentProps<'a'>

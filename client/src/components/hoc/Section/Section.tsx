import { Shell } from '@/components'

type IShell = {
	children: React.ReactNode
	className?: string
}

export const Section = ({ children, className, ...rest }: IShell) => {
	return (
		<Section
			className={`pt-6 pb-6 ${className}`}
			{...rest}>
			<Shell>{children}</Shell>
		</Section>
	)
}

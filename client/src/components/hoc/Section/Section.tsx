import { Shell } from '@/components'

type ISection = {
	children: React.ReactNode
	className?: string
}

export const Section = ({ children, className, ...rest }: ISection) => {
	return (
		<section
			className={`pt-6 pb-6 ${className}`}
			{...rest}>
			<Shell>{children}</Shell>
		</section>
	)
}

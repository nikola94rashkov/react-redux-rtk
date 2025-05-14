type IShell = {
	children: React.ReactNode
	className?: string
}

export const Shell = ({ children, className, ...rest }: IShell) => {
	return (
		<div
			className={`max-w-5/6 m-auto pl-6 pr-6 ${className}`}
			{...rest}>
			{children}
		</div>
	)
}

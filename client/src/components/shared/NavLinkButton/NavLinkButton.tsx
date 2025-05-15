import { NavLink } from 'react-router-dom'

export const NavLinkButton = ({
	text,
	href,
}: {
	text: string
	href: string
}) => (
	<NavLink
		to={`${href}`}
		className={({ isActive }) =>
			`font-bold p-2 pl-3 pr-3 rounded-2xl hover:bg-amber-100 ${
				isActive ? 'bg-amber-100' : 'bg-amber-50'
			}`
		}>
		{text}
	</NavLink>
)

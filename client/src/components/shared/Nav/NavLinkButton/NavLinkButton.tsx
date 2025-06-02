import { NavLink } from 'react-router-dom'
import { NavigationMenuItem } from '@/components/ui/navigation-menu.tsx'
import { NavLinkButtonProps } from '@/components/shared/Nav/types/types.ts'

export const NavLinkButton = ({
	text,
	href = '#',
	...rest
}: NavLinkButtonProps) => (
	<NavigationMenuItem className='font-bold p-2 pl-3 pr-3'>
		<NavLink
			to={`${href}`}
			className={({ isActive }) =>
				`font-bold p-2 pl-3 pr-3 rounded-2xl hover:bg-amber-100 ${
					isActive ? 'bg-amber-100' : 'bg-amber-50'
				}`
			}
			{...rest}>
			{text}
		</NavLink>
	</NavigationMenuItem>
)

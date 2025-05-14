import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from '@/components/ui/navigation-menu.tsx'

import { NavLink } from 'react-router-dom'

export const Nav = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavLink to='/'>Home</NavLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavLink to='/dashboard'>Dashboard</NavLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

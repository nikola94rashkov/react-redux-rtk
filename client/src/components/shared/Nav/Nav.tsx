import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from '@/components/ui/navigation-menu.tsx'

import { NavLinkButton } from '@/components/shared'

export const Nav = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavLinkButton
						text='Home'
						href='/'
					/>
				</NavigationMenuItem>

				<NavigationMenuItem className='font-bold p-2 pl-3 pr-3 bg-amber-50 rounded-2xl hover:bg-amber-100 active:bg-amber-100'>
					<NavLinkButton
						text='Dashboard'
						href='/dashboard'
					/>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

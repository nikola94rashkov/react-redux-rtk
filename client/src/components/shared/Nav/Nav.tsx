import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from '@/components/ui/navigation-menu.tsx'

import { NavLinkButton } from '@/components/shared'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store.ts'

export const Nav = () => {
	const { user } = useSelector((state: RootState) => state.authSlice)

	return (
		<>
			{user ? (
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

						<NavigationMenuItem className='font-bold p-2 pl-3 pr-3 bg-amber-50 rounded-2xl hover:bg-amber-100 active:bg-amber-100'>
							<NavLinkButton
								text='Logout'
								href='/logout'
							/>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			) : (
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
								text='Login'
								href='/login'
							/>
						</NavigationMenuItem>

						<NavigationMenuItem className='font-bold p-2 pl-3 pr-3 bg-amber-50 rounded-2xl hover:bg-amber-100 active:bg-amber-100'>
							<NavLinkButton
								text='Register'
								href='/register'
							/>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			)}
		</>
	)
}

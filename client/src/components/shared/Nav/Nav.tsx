import {
	NavigationMenu,
	NavigationMenuList,
} from '@/components/ui/navigation-menu.tsx'

import { NavLinkButton } from './NavLinkButton'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store.ts'
import { clearUser } from '@/store/auth/authSlice.ts'
import { useLogoutMutation } from '@/store/user/userApiSlice.ts'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { NavLinkButtonProps } from './types/types.ts'

export const Nav = () => {
	const { user } = useSelector((state: RootState) => state.authSlice)
	const dispatch = useDispatch<AppDispatch>()
	const [logout] = useLogoutMutation()
	const navigate = useNavigate()

	const logOutUser = async () => {
		await logout()
		dispatch(clearUser())
		navigate('/login')
		toast.success(`Logged out successfully`)
	}

	const navigationConfig = {
		auth: [
			{
				text: 'Home',
				href: '/',
			},
			{
				text: 'Dashboard',
				href: '/dashboard',
			},
			{
				text: 'Logout',
				onClick: () => logOutUser(),
			},
		],
		unauth: [
			{
				text: 'Home',
				href: '/',
			},
			{
				text: 'Login',
				href: '/login',
			},
			{
				text: 'Register',
				href: '/register',
			},
		],
	}

	return (
		<>
			<NavigationMenu>
				<NavigationMenuList>
					{(user ? navigationConfig.auth : navigationConfig.unauth).map(
						({ text, href, onClick }: NavLinkButtonProps, index) => (
							<NavLinkButton
								key={index}
								text={text}
								href={href}
								onClick={onClick}
							/>
						),
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</>
	)
}

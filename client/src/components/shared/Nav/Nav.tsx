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
import { NavLinkButtonProps } from './Nav.types.ts'
import { data } from '@/components/shared/Nav/data.ts'

export const Nav = () => {
	const { user } = useSelector((state: RootState) => state.authSlice)
	const dispatch = useDispatch<AppDispatch>()
	const [logout] = useLogoutMutation()
	const navigate = useNavigate()

	const logOutUser = async () => {
		try {
			await logout()
			dispatch(clearUser())
			navigate('/login')
			toast.success(`Logged out successfully`)
		} catch (e) {
			console.error(e)
			toast.error(`Ops, something went wrong!`)
		}
	}

	const navigationConfig = data(logOutUser)

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

import { Shell } from '@/components/hoc'
import { Nav, Logo } from '@/components/shared'

export const Header = () => {
	return (
		<>
			<header className='header pb-6 pt-6 bg-blue-200 shadow-2xs'>
				<Shell className='flex items-center justify-between'>
					<Logo />

					<Nav />
				</Shell>
			</header>
		</>
	)
}

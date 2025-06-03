export const data = (logOutUser: () => Promise<void>) => {
	return {
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
				onClick: logOutUser,
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
}

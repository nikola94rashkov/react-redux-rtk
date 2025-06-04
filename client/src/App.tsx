import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { initializeAuth } from '@/store/auth/authSlice'

import { Toaster } from '@/components/ui/sonner'
import { Header, Footer } from '@/components/shared'
import { Router } from '@/router'
import { AppDispatch } from '@/store/store.ts'

export const App = () => {
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(initializeAuth())
	}, [dispatch])

	return (
		<div className='flex flex-col min-h-screen justify-between'>
			<Header />

			<main className='main grow'>
				<Router />
				<Toaster
					position='bottom-right'
					richColors
					closeButton
				/>
			</main>

			<Footer />
		</div>
	)
}

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
		<>
			<Header />

			<main className='main'>
				<Router />
				<Toaster
					position='top-right'
					richColors
					closeButton
				/>
			</main>

			<Footer />
		</>
	)
}

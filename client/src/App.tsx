import { Toaster } from '@/components/ui/sonner'
import { Header, Footer } from '@/components/shared'
import { Router } from '@/router'

export const App = () => {
	return (
		<>
			<Header />

			<main className='main'>
				<Router />
				<Toaster />
			</main>

			<Footer />
		</>
	)
}

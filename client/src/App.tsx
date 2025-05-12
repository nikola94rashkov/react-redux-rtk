import { Header, Footer } from '@/components/shared'
import { Router } from '@/router'

export const App = () => {
	return (
		<>
			<Header />

			<main>
				<Router />
			</main>

			<Footer />
		</>
	)
}

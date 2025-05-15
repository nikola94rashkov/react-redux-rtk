import { Navigate, Outlet } from 'react-router-dom'
import { useLocalStorageUser } from '@/hooks'

export const PrivateRoutes = ({
	navigate = '/login',
	shouldBeAuthenticated = true,
}: {
	navigate?: string
	shouldBeAuthenticated?: boolean
}) => {
	const { user } = useLocalStorageUser()

	const shouldRenderOutlet = shouldBeAuthenticated ? !!user : !user

	return shouldRenderOutlet ? <Outlet /> : <Navigate to={navigate} />
}

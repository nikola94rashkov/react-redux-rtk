import { Navigate, Outlet } from 'react-router-dom'
import { useLocalStorageUser } from '@/hooks'

export const PrivateRoutes = ({
	navigate = '/login',
}: {
	navigate?: string
}) => {
	const { user } = useLocalStorageUser()

	return user ? <Outlet /> : <Navigate to={navigate} />
}

import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoutes = ({
	condition,
	navigate = '/login',
}: {
	condition: boolean
	navigate?: string
}) => {
	return condition ? <Outlet /> : <Navigate to={navigate} />
}

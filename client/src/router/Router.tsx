import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'

const Dashboard = lazy(() =>
	import('@/components/views/Dashboard').then((module) => ({
		default: module.Dashboard,
	})),
)
const Home = lazy(() =>
	import('@/components/views/Home').then((module) => ({
		default: module.Home,
	})),
)
const Login = lazy(() =>
	import('@/components/views/Auth/Login').then((module) => ({
		default: module.Login,
	})),
)
const NotFound = lazy(() =>
	import('@/components/views/PageNotFound').then((module) => ({
		default: module.PageNotFound,
	})),
)
const SinglePost = lazy(() =>
	import('@/components/views/Posts/SinglePost').then((module) => ({
		default: module.SinglePost,
	})),
)
const Register = lazy(() =>
	import('@/components/views/Auth/Register').then((module) => ({
		default: module.Register,
	})),
)

export const Router = () => {
	return (
		<Suspense fallback={<h2>loading</h2>}>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/post/:postId'
					element={<SinglePost />}
				/>
				<Route
					element={
						<PrivateRoutes
							condition={true}
							navigate='/'
						/>
					}>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
				</Route>
				<Route element={<PrivateRoutes condition={true} />}>
					<Route
						path='/dashboard'
						element={<Dashboard />}
					/>
				</Route>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
		</Suspense>
	)
}

import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'

const Dashboard = lazy(() =>
	import('@/components/layouts/Dashboard').then((module) => ({
		default: module.Dashboard,
	})),
)
const Home = lazy(() =>
	import('@/components/layouts/Home').then((module) => ({
		default: module.Home,
	})),
)
const Auth = lazy(() =>
	import('@/components/layouts/Auth').then((module) => ({
		default: module.Auth,
	})),
)
const NotFound = lazy(() =>
	import('@/components/layouts/PageNotFound').then((module) => ({
		default: module.PageNotFound,
	})),
)
const SinglePost = lazy(() =>
	import('@/components/layouts/Posts/SinglePost').then((module) => ({
		default: module.SinglePost,
	})),
)

export const Router = () => {
	return (
		<Suspense fallback={<h2>loading...</h2>}>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/post/:postId'
					element={<SinglePost />}
				/>
				<Route element={<PrivateRoutes navigate='/' />}>
					<Route
						path='/auth'
						element={<Auth />}
					/>
					{/*<Route*/}
					{/*	path='/register'*/}
					{/*	element={<Register />}*/}
					{/*/>*/}
				</Route>
				<Route element={<PrivateRoutes />}>
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

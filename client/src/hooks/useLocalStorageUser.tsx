import { useEffect, useState } from 'react'
import { UserCookie } from '@/types'

export const useLocalStorageUser = (): {
	user: UserCookie | null
	isLoading: boolean
	clearUser: () => void
	setUser: (userData: UserCookie) => void
} => {
	const [user, setUserState] = useState<UserCookie | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const storedUser = localStorage.getItem('user')

		if (storedUser) {
			try {
				const parsedUser = JSON.parse(storedUser) as UserCookie
				setUserState(parsedUser)
			} catch (error) {
				console.error('Failed to parse user data from localStorage', error)
				localStorage.removeItem('user')
			}
		}

		setIsLoading(false)
	}, [])

	const clearUser = () => {
		localStorage.removeItem('user')
		setUserState(null)
	}

	const setUser = (userData: UserCookie) => {
		localStorage.setItem('user', JSON.stringify(userData))
		setUserState(userData)
	}

	return { user, isLoading, clearUser, setUser }
}

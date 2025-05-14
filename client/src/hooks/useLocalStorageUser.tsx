import { useEffect, useState } from 'react'

type UserData = {
	id: string
}

export const useLocalStorageUser = (): {
	user: UserData | null
	isLoading: boolean
	clearUser: () => void
	setUser: (userData: UserData) => void
} => {
	const [user, setUserState] = useState<UserData | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const storedUser = localStorage.getItem('user')

		if (storedUser) {
			try {
				const parsedUser = JSON.parse(storedUser) as UserData
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

	const setUser = (userData: UserData) => {
		localStorage.setItem('user', JSON.stringify(userData))
		setUserState(userData)
	}

	return { user, isLoading, clearUser, setUser }
}

import { configureStore } from '@reduxjs/toolkit'
import { postsApiSlice } from './posts/postsApiSlice'
import { userApiSlice } from './user/userApiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
	reducer: {
		[postsApiSlice.reducerPath]: postsApiSlice.reducer,
		[userApiSlice.reducerPath]: userApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			postsApiSlice.middleware,
			userApiSlice.middleware,
		)
	},
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

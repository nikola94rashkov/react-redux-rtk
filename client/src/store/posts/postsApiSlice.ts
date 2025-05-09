import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post, PostDetails, PostPagination, PostsUpdate } from '@/types'

export const postsApiSlice = createApi({
	reducerPath: 'posts',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_POSTS_URL,
		credentials: 'include',
	}),
	endpoints: (build) => {
		return {
			getAllPosts: build.query<Post[], PostPagination>({
				query: ({ page = 1, limit = 10 }) => `?page=${page}&limit=${limit}`,
			}),
			getPostsByUserId: build.query<
				Post[],
				PostPagination & { userId: number }
			>({
				query: ({ page = 1, limit = 10, userId }) =>
					`/user/${userId}?page=${page}&limit=${limit}`,
			}),
			getPostById: build.query<PostDetails, string>({
				query: (id) => `/${id}`,
			}),
			deletePost: build.mutation<void, string>({
				query: (id) => ({
					url: `/${id}`,
					method: 'DELETE',
				}),
			}),
			createPost: build.mutation<Post, Omit<Post, 'id'>>({
				query: (post) => ({
					url: '',
					method: 'POST',
					body: post,
				}),
			}),
			updatePost: build.mutation<Post, PostsUpdate>({
				query: ({ post, id }) => ({
					url: `/${id}`,
					method: 'PUT',
					body: post,
				}),
			}),
		}
	},
})

export const {
	useGetAllPostsQuery,
	useGetPostByIdQuery,
	useGetPostsByUserIdQuery,
	useCreatePostMutation,
	useDeletePostMutation,
	useUpdatePostMutation,
} = postsApiSlice

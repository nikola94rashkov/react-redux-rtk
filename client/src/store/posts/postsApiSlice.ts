import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post, PostDetails, PostPagination, PostsUpdate } from '@/types'

export const postsApiSlice = createApi({
	reducerPath: 'posts',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_POSTS_URL,
		credentials: 'include',
	}),
	tagTypes: ['Posts'],
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
				invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
			}),
			createPost: build.mutation<Post, Post>({
				query: (post) => ({
					url: '',
					method: 'POST',
					body: post,
				}),
				invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
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

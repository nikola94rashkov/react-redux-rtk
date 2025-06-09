import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
	Post,
	PostDetails,
	PostPagination,
	PostsList,
	PostsUpdate,
} from '@/types'

export const postsApiSlice = createApi({
	reducerPath: 'posts',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4000/api/posts',
		credentials: 'include',
	}),
	tagTypes: ['Posts'],
	endpoints: (build) => {
		return {
			getAllPosts: build.query<PostsList, PostPagination>({
				query: ({ page = 1, limit = 10 }) => `?page=${page}&limit=${limit}`,
			}),
			getPostsByUserId: build.query<
				PostsList,
				PostPagination & { userId: string }
			>({
				query: ({ page = 1, limit = 10, userId }) =>
					`/user/${userId}?page=${page}&limit=${limit}`,
			}),
			getPostById: build.query<PostDetails, string | undefined>({
				query: (_id) => `/${_id ?? ''}`,
			}),
			deletePost: build.mutation<void, string>({
				query: (_id) => ({
					url: `/${_id}`,
					method: 'DELETE',
				}),
				invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
			}),
			createPost: build.mutation<Post, Omit<Post, 'id'>>({
				query: (post) => ({
					url: '',
					method: 'POST',
					body: post,
				}),
				invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
			}),
			updatePost: build.mutation<Post, PostsUpdate>({
				query: ({ post, _id }) => ({
					url: `/${_id}`,
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

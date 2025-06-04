import { UserDocument } from './user'

export type Post = {
	_id?: number
	image: string
	title: string
	content: string
}

export type PostDetails = {
	_id?: string
	title: string
	content: string
	image?: string
	author?: UserDocument
	createdAt?: Date
	updatedAt?: Date
}

export type PostsList = {
	posts: PostDetails[]
	totalPosts: number
	totalPages: number
	currentPage: number
}

export type PostListPagination = Omit<PostsList, 'posts' | 'totalPosts'> & {
	handlePageChange: (data: number) => void
}

export type PostResponse = {
	message: string
	post: PostDetails
}

export type PostsUpdate = {
	post: PostDetails
	_id: number
}

export type PostPagination = {
	page: number
	limit: number
}

export type PostType = 'grid' | 'post'

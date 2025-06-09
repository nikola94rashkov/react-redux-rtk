import { UserDocument } from './user'
import { Optional } from '@/types/utils.ts'

export type PostFormProps = {
	post?: {
		_id: Optional<string>
		title: string
		content: string
		image?: string
	}
	trigger: React.ReactNode
}

export type Post = {
	_id?: string
	image: string
	title: string
	content: string
}

export type PostDetails = {
	author?: UserDocument
	createdAt?: Date
	updatedAt?: Date
} & Post

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
	_id: Post['_id']
}

export type PostPagination = {
	page: number
	limit: number
}

export type PostType = 'grid' | 'post'

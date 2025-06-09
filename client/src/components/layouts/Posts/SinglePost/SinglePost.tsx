import { useParams } from 'react-router-dom'
import { Post } from '@/components'
import { useGetPostByIdQuery } from '@/store/posts/postsApiSlice.ts'

export const SinglePost = () => {
	const { postId } = useParams()
	const { data, isLoading, isError } = useGetPostByIdQuery(postId)

	return (
		<>
			{isLoading && <div>Loading posts...</div>}
			{isError && <div>Error loading posts</div>}

			{data && (
				<Post
					content={data.content}
					title={data.title}
					author={data.author}
					image={data.image}
					_id={data._id}
					createdAt={data.createdAt}
					type='post'
				/>
			)}
		</>
	)
}

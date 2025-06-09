import { useParams } from 'react-router-dom'
import { Post, Section } from '@/components'
import { useGetPostByIdQuery } from '@/store/posts/postsApiSlice.ts'

export const SinglePost = () => {
	const { postId } = useParams()
	const { data, isLoading, isError } = useGetPostByIdQuery(postId)

	if (!data) return null

	const { content, title, author, image, _id, createdAt } = data

	return (
		<Section>
			{isLoading && <div>Loading posts...</div>}
			{isError && <div>Error loading posts</div>}

			<Post
				content={content}
				title={title}
				author={author}
				image={image}
				_id={_id}
				createdAt={createdAt}
				type='post'
			/>
		</Section>
	)
}

import { PostDetails } from '@/types'
import { Post } from '@/components'

export const PostList = ({ posts }: { posts: PostDetails[] }) => {
	return (
		<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
			{posts.map(({ title, author, content, image, _id, createdAt }) => (
				<Post
					key={_id}
					content={content}
					title={title}
					author={author}
					image={image}
					_id={_id}
					createdAt={createdAt}
				/>
			))}
		</div>
	)
}

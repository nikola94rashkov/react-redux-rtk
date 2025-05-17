import { useGetAllPostsQuery } from '@/store/posts/postsApiSlice.ts'
import { PostDetails } from '@/types'

export const Home = () => {
	const { data, isLoading, isError } = useGetAllPostsQuery({
		page: 1,
		limit: 10,
	})

	console.log('data', data)

	return (
		<>
			{isLoading && <div>Loading...</div>}

			{isError && <div>{isError}</div>}

			{data?.posts.map(({ _id, title }: PostDetails) => {
				return <h1 key={_id}>{title}</h1>
			})}
		</>
	)
}

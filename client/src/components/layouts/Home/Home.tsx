import { useGetAllPostsQuery } from '@/store/posts/postsApiSlice.ts'
import { PostDetails } from '@/types'
import { Section } from '@/components'

export const Home = () => {
	const { data, isLoading, isError } = useGetAllPostsQuery({
		page: 1,
		limit: 10,
	})

	return (
		<>
			<Section>
				{isLoading && <div>Loading...</div>}

				{isError && <div>{isError}</div>}

				{data?.posts.map(({ _id, title }: PostDetails) => {
					return <h1 key={_id}>{title}</h1>
				})}
			</Section>
		</>
	)
}

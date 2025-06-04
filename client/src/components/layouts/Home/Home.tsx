import { useState } from 'react'
import { Paging, PostList, Section } from '@/components'
import { Separator } from '@radix-ui/react-separator'
import { useGetAllPostsQuery } from '@/store/posts/postsApiSlice.ts'

export const Home = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const { data, isLoading, isError } = useGetAllPostsQuery({
		page: currentPage,
		limit: 5,
	})

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}

	return (
		<>
			<Section>
				{isLoading && <div>Loading posts...</div>}
				{isError && <div>Error loading posts</div>}
				{!isLoading && !data?.posts.length && <div>No posts found</div>}

				{data && (
					<>
						<PostList posts={data.posts} />

						<Separator className='py-8' />

						{data?.totalPages > 1 ? (
							<Paging
								totalPages={data.totalPages}
								currentPage={data.currentPage}
								handlePageChange={handlePageChange}
							/>
						) : null}
					</>
				)}
			</Section>
		</>
	)
}

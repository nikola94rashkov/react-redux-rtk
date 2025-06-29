import { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/store.ts'
import { useGetPostsByUserIdQuery } from '@/store/posts/postsApiSlice.ts'
import { Section, Paging, PostList } from '@/components'
import { Separator } from '@radix-ui/react-separator'

export const Dashboard = () => {
	const { user } = useSelector((state: RootState) => state.authSlice)
	const [currentPage, setCurrentPage] = useState(1)
	const limit = 3

	const { data, isLoading, isError } = useGetPostsByUserIdQuery({
		page: currentPage,
		limit,
		userId: user?._id ?? '',
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

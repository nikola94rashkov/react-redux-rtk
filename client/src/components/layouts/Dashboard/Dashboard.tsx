import { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/store.ts'
import { useGetPostsByUserIdQuery } from '@/store/posts/postsApiSlice.ts'
import { Section, Paging } from '@/components'

export const Dashboard = () => {
	const { user } = useSelector((state: RootState) => state.authSlice)
	const [currentPage, setCurrentPage] = useState(1)
	const limit = 2

	const queryParams = {
		page: currentPage,
		limit,
		userId: user?._id ?? '',
	}

	const { data, isLoading, isError } = useGetPostsByUserIdQuery(queryParams)

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}

	console.log('data', data)

	return (
		<>
			<Section>
				{isLoading && <div>Loading posts...</div>}
				{isError && <div>Error loading posts</div>}
				{!isLoading && !data?.posts.length && <div>No posts found</div>}

				{data && (
					<>
						{user?._id && data?.totalPages > 1 ? (
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

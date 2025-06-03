import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Section,
} from '@/components'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store.ts'
import { useGetPostsByUserIdQuery } from '@/store/posts/postsApiSlice.ts'
import { useState } from 'react'

export const Dashboard = () => {
	const { user } = useSelector((state: RootState) => state.authSlice)
	const [currentPage, setCurrentPage] = useState(1)
	const limit = 10

	const queryParams = {
		page: currentPage,
		limit,
		userId: user?._id ?? '',
	}

	const { data, isLoading, isError } = useGetPostsByUserIdQuery(queryParams)

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
						{user?._id && data?.totalPages > 1 ? (
							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious
											href='#'
											onClick={(e) => {
												e.preventDefault()
												if (currentPage > 1) handlePageChange(currentPage - 1)
											}}
										/>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href='#'>1</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink
											href='#'
											isActive>
											2
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href='#'>3</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href='#'>3</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationNext
											href='#'
											onClick={(e) => {
												e.preventDefault()
												handlePageChange(currentPage + 1)
											}}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						) : null}
					</>
				)}
			</Section>
		</>
	)
}

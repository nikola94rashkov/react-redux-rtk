import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components'

import { PostListPagination } from '@/types'

export const Paging = ({
	currentPage,
	totalPages,
	handlePageChange,
}: PostListPagination) => {
	return (
		<Pagination>
			<PaginationContent>
				{currentPage > 1 && (
					<PaginationItem>
						<PaginationPrevious
							href='#'
							onClick={(e) => {
								e.preventDefault()
								handlePageChange(currentPage - 1)
							}}
						/>
					</PaginationItem>
				)}

				{currentPage > 1 && (
					<PaginationItem>
						<PaginationLink
							href='#'
							onClick={(e) => {
								e.preventDefault()
								handlePageChange(1)
							}}>
							1
						</PaginationLink>
					</PaginationItem>
				)}

				{currentPage >= 3 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				<PaginationItem>
					<PaginationLink
						href='#'
						isActive>
						{currentPage}
					</PaginationLink>
				</PaginationItem>

				{totalPages > currentPage + 1 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				{totalPages != currentPage && (
					<PaginationItem>
						<PaginationLink
							href='#'
							onClick={(e) => {
								e.preventDefault()
								handlePageChange(totalPages)
							}}>
							{totalPages}
						</PaginationLink>
					</PaginationItem>
				)}

				{currentPage < totalPages && (
					<PaginationItem>
						<PaginationNext
							href='#'
							onClick={(e) => {
								e.preventDefault()
								handlePageChange(currentPage + 1)
							}}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	)
}

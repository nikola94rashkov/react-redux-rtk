import { useGetAllPostsQuery } from '@/store/posts/postsApiSlice.ts'

export const Header = () => {
	const { currentData } = useGetAllPostsQuery({ page: 1, limit: 10 })

	console.log(currentData)

	return (
		<>
			<header className='header'>header</header>
		</>
	)
}

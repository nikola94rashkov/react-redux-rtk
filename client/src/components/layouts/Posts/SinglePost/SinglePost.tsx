import { useParams } from 'react-router-dom'

export const SinglePost = () => {
	const { postId } = useParams()
	return <h1>post {postId}</h1>
}

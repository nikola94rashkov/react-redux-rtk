import { PostDetails, PostType } from '@/types'
import {
	AlertModal,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store.ts'
import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator.tsx'
import { PostForm } from '@/components/layouts/Posts'
import { useDeletePostMutation } from '@/store/posts/postsApiSlice.ts'
import { toast } from 'sonner'
import { useState } from 'react'

type PostProps = {
	type?: PostType
} & PostDetails

export const Post = ({
	title,
	author,
	content,
	image,
	createdAt,
	_id,
	type = 'grid',
}: PostProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { user } = useSelector((state: RootState) => state.authSlice)
	const [deletePost] = useDeletePostMutation()

	const handleDelete = async () => {
		if (!_id) return

		try {
			await deletePost(_id)
			toast.success('Post deleted successfully')
		} catch (error) {
			toast.error('Failed to delete post')
			console.error('Error deleting post:', error)
		} finally {
			setIsOpen(false)
		}
	}

	return (
		<Card
			className={`${type === 'grid' ? 'hover:shadow-lg transition-shadow' : 'border-0 shadow-none gap-4'}`}>
			{type === 'grid' ? (
				<Link to={`/post/${_id}`}>
					<CardHeader>
						<CardTitle className='text-2xl'>{title}</CardTitle>
					</CardHeader>

					<Separator className='py-1 bg-transparent' />

					{image && (
						<CardContent>
							<div className='relative aspect-video overflow-hidden rounded-lg'>
								<img
									src={image}
									className='object-cover'
									alt={title}
								/>
							</div>
						</CardContent>
					)}

					<CardContent>
						<CardDescription className='line-clamp-2 mt-2'>
							{content}
						</CardDescription>

						<Separator className='py-1 bg-transparent' />

						<div className='flex items-center justify-between gap-3 mb-3'>
							{author && <p className='text-sm font-medium'>{author?.email}</p>}

							{createdAt && (
								<p className='text-xs text-muted-foreground'>
									{format(new Date(createdAt), 'MMM d, yyyy')}
								</p>
							)}
						</div>
					</CardContent>
				</Link>
			) : (
				<>
					{image && (
						<CardContent>
							<div className='relative aspect-video overflow-hidden rounded-lg'>
								<img
									src={image}
									className='object-cover w-full'
									alt={title}
								/>
							</div>
						</CardContent>
					)}

					<Separator className='py-1 bg-transparent' />

					<CardHeader>
						<CardTitle className='text-6xl text-center'>{title}</CardTitle>
					</CardHeader>

					<CardContent>
						<CardDescription className='line-clamp-2 mt-2'>
							{content}
						</CardDescription>

						<Separator className='py-1 bg-transparent' />

						<div className='flex items-center justify-between gap-3 mb-3'>
							{author && <p className='text-sm font-medium'>{author?.email}</p>}

							{createdAt && (
								<p className='text-xs text-muted-foreground'>
									{format(new Date(createdAt), 'MMM d, yyyy')}
								</p>
							)}
						</div>
					</CardContent>
				</>
			)}

			{user?._id === author?._id && (
				<CardFooter className='flex justify-between'>
					<PostForm
						trigger='Edit'
						post={{ title, content, image, _id }}
					/>
					<Button
						variant='destructive'
						onClick={() => setIsOpen(true)}>
						Delete
					</Button>

					<AlertModal
						handleDelete={handleDelete}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
					/>
				</CardFooter>
			)}
		</Card>
	)
}

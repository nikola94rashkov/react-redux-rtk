import { PostDetails } from '@/types'
import {
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

export const Post = ({
	title,
	author,
	content,
	image,
	createdAt,
	_id,
}: PostDetails) => {
	const { user } = useSelector((state: RootState) => state.authSlice)

	return (
		<Card className='hover:shadow-lg transition-shadow'>
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

			{user?._id === author?._id && (
				<CardFooter className='flex justify-between'>
					<Link
						className='text-sm text-primary hover:underline'
						to={`/edit/${_id}`}>
						Edit
					</Link>
					<Link
						className='text-sm text-primary hover:underline'
						to={`/edit/${_id}`}>
						Delete
					</Link>
				</CardFooter>
			)}
		</Card>
	)
}

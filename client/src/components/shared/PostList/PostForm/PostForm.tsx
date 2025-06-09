import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { Popup } from '@/components/shared'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Textarea,
} from '@/components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	useCreatePostMutation,
	useUpdatePostMutation,
} from '@/store/posts/postsApiSlice.ts'
import {
	FormFields,
	schema,
} from '@/components/shared/PostList/PostForm/schema.ts'
import { Nullable, PostFormProps } from '@/types'
import { useNavigate } from 'react-router-dom'

export const PostForm = ({ post, trigger }: PostFormProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedFile, setSelectedFile] = useState<Nullable<File>>(null)
	const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
		null,
	)
	const [createPost] = useCreatePostMutation()
	const [updatePost] = useUpdatePostMutation()
	const navigate = useNavigate()

	const form = useForm<FormFields>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: post?.title || '',
			content: post?.content || '',
		},
		mode: 'onBlur',
	})

	const {
		control,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = form

	useEffect(() => {
		if (post) {
			reset({
				title: post.title,
				content: post.content,
			})
			if (post.image) {
				setImagePreview(post.image)
			}
		}
	}, [post, reset])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0]
			setSelectedFile(file)

			const reader = new FileReader()
			reader.onload = () => {
				setImagePreview(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		try {
			if (post?._id) {
				const formData = new FormData()
				formData.append('title', data.title)
				formData.append('content', data.content)
				if (selectedFile) {
					formData.append('image', selectedFile)
				}

				await updatePost({
					_id: post._id,
					post: selectedFile
						? formData
						: {
								title: data.title,
								content: data.content,
							},
				})
				toast.success('Post updated successfully!')
				navigate(`/post/${post._id}`)
			} else {
				const formData = new FormData()
				formData.append('title', data.title)
				formData.append('content', data.content)
				if (selectedFile) {
					formData.append('image', selectedFile)
				}

				await createPost(formData).unwrap()
				toast.success('Post created successfully!')
			}

			setIsOpen(false)
			reset()
			setSelectedFile(null)
			setImagePreview(null)
		} catch (error) {
			toast.error(`Failed to ${error} post`)
			console.error(`Error ${error} post:`)
		}
	}

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>{trigger}</Button>
			<Popup
				open={isOpen}
				onOpenChange={setIsOpen}
				title={post?._id ? 'Edit Post' : 'Create Post'}>
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-4'
						encType='multipart/form-data'>
						<FormField
							control={control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name='content'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Content</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											rows={5}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormItem>
							<FormLabel>Image</FormLabel>
							<FormControl>
								<Input
									type='file'
									accept='image/*'
									onChange={handleFileChange}
								/>
							</FormControl>
						</FormItem>

						{imagePreview && (
							<div className='mt-2'>
								<img
									src={typeof imagePreview === 'string' ? imagePreview : ''}
									alt='Preview'
									className='max-h-40 rounded-md'
								/>
							</div>
						)}

						<div className='flex justify-end gap-2 pt-4'>
							<Button
								type='button'
								variant='outline'
								onClick={() => {
									setIsOpen(false)
									reset()
									setSelectedFile(null)
									setImagePreview(null)
								}}>
								Cancel
							</Button>

							<Button
								type='submit'
								disabled={isSubmitting}>
								{isSubmitting
									? 'Submitting...'
									: post?._id
										? 'Update'
										: 'Create'}
							</Button>
						</div>
					</form>
				</Form>
			</Popup>
		</>
	)
}

import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation } from '@/store/user/userApiSlice.ts'
import { setUser } from '@/store/auth/authSlice.ts'
import {
	defaultValues,
	FormFields,
	schema,
} from '@/components/layouts/Login/Schema.ts'
import {
	Button,
	Input,
	Section,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components'

export const Login = () => {
	const dispatch = useDispatch()
	const [login] = useLoginMutation()
	const navigate = useNavigate()

	const form = useForm<FormFields>({
		resolver: zodResolver(schema),
		defaultValues,
		mode: 'onBlur',
	})

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = form

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		try {
			const userData = {
				...data,
			}

			const response = await login(userData)

			if (response.data?.user) {
				console.log('response.data?.user', response.data?.user)
				dispatch(
					setUser({
						_id: response.data.user._id,
						role: response.data.user.role,
					}),
				)
			}

			toast.success(`Welcome!`)
			navigate('/dashboard')
		} catch (error) {
			const err = error as { data?: { message?: string }; status?: number }

			toast.error(`
				'Login failed',
				description:
					${err.data?.message},
			`)
		}
	}

	return (
		<Section>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='flex flex-col gap-6'>
								<div className='grid gap-3'>
									<FormField
										control={control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder='m@example.com'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='grid gap-3'>
									<FormField
										control={control}
										name='password'
										render={({ field }) => (
											<FormItem>
												<FormLabel>password</FormLabel>
												<FormControl>
													<Input
														type='password'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='flex flex-col gap-3'>
									<Button
										type='submit'
										className='w-full'
										disabled={isSubmitting}>
										Login
									</Button>
								</div>
							</div>
							<div className='mt-4 text-center text-sm'>
								Don&apos;t have an account?
								<Link
									className='underline underline-offset-4'
									to='/register'>
									Sign up
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</Section>
	)
}

import { Button, Input, Section } from '@/components'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form.tsx'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	defaultValues,
	FormFields,
	schema,
} from '@/components/layouts/Login/Schema.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useLoginMutation } from '@/store/user/userApiSlice.ts'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/auth/authSlice.ts'

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
			<Form {...form}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-8'>
					<FormField
						control={control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
					<Button
						type='submit'
						disabled={isSubmitting}>
						Login
					</Button>
				</form>
			</Form>
		</Section>
	)
}

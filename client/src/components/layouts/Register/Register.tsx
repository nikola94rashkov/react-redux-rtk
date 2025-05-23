import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useCreateUserMutation } from '@/store/user/userApiSlice.ts'
import { Section } from '@/components/hoc'
import {
	defaultValues,
	FormFields,
	schema,
} from '@/components/layouts/Register/Schema.ts'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/auth/authSlice.ts'

export const Register = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [createUser] = useCreateUserMutation()

	const form = useForm<FormFields>({
		resolver: zodResolver(schema),
		defaultValues,
		mode: 'onBlur',
	})

	const {
		control,
		setError,
		handleSubmit,
		formState: { isSubmitting },
	} = form

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		try {
			const userData = {
				...data,
				role: 0,
				date: new Date(),
			}
			const response = await createUser(userData)

			if (response.data?.user) {
				dispatch(
					setUser({
						_id: response.data.user._id,
						role: response.data.user.role,
					}),
				)
			}

			toast.success(`User successfully created!`)
			navigate('/dashboard')
		} catch (error) {
			const err = error as { data?: { message?: string }; status?: number }

			toast.error(`
				'Registration failed',
				description:
					${err.data?.message},
			`)

			if (err.status === 409) {
				setError('email', {
					type: 'manual',
					message: 'This email is already registered',
				})
			}
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
						name='firstName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name='lastName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
						Submit
					</Button>
				</form>
			</Form>
		</Section>
	)
}

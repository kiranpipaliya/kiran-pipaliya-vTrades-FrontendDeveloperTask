'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TextInput from './TextInput';
import SocialLoginButton from './SocialLoginButton';
import Google from '@/app/assets/svg/Google';
import Image from 'next/image';
import Link from 'next/link';
import PrimaryButton from '../ui/PrimaryButton';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState<{
		email?: string;
		password?: string;
		general?: string;
	}>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;

		setForm((prev) => ({ ...prev, [id]: value }));

		// Clear field error on typing
		setErrors((prev) => ({ ...prev, [id]: undefined, general: undefined }));
	};

	const validate = () => {
		const newErrors: typeof errors = {};

		if (!form.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
			newErrors.email = 'Please enter a valid email address';
		}

		if (!form.password.trim()) {
			newErrors.password = 'Password is required';
		} else if (form.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validate()) return;

		try {
			setLoading(true);
			setErrors({});
			const signinResponse = await signIn('credentials', {
				email: form.email,
				password: form.password,
				redirect: false,
			});

			if (!signinResponse?.ok) {
				throw new Error('Invalid email or password');
			}
			console.log('signinResponse', signinResponse);
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Login failed');
			}

			// mock auth persistence
			localStorage.setItem(
				'auth',
				JSON.stringify({
					email: form.email,
					token: data.token,
				}),
			);

			router.push('/dashboard');
		} catch (err: any) {
			setErrors({ general: err.message });
		} finally {
			setLoading(false);
		}
	};

	const handleSocialLogin = async (provider: 'google' | 'microsoft') => {
		try {
			// const res = await fetch('/api/auth/login', {
			// 	method: 'POST',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify({ provider }),
			// });

			// const data = await res.json();
			// if (!data.success) throw new Error(data.message);

			// localStorage.setItem('user', JSON.stringify(data.user));
			// router.push('/dashboard');
			signIn(provider);
		} catch (err: any) {
			setErrors({ general: err.message || 'Login failed' });
		}
	};

	return (
		<div className="w-full max-w-[600px] mx-auto text-white">
			<div className="max-w-[385px] mx-auto">
				<h1 className="text-[32px] font-semibold leading-[150%] mb-1.5">
					Sign In
				</h1>
				<p className="text-sm font-normal text-[##DADADA] leading-[170%] mb-8 mt-2">
					Manage your workspace seamlessly. Sign in to continue.
				</p>

				<div className="flex flex-col gap-6">
					<TextInput
						id="email"
						label="Email Address"
						type="email"
						placeholder="Email address"
						value={form.email}
						onChange={handleChange}
						error={errors.email}
						required
					/>

					<TextInput
						id="password"
						label="Password"
						type="password"
						placeholder="Password"
						value={form.password}
						onChange={handleChange}
						error={errors.password}
						required
					/>
				</div>

				<div className="flex justify-between text-sm mt-3">
					<label className="flex items-center gap-2 text-xs font-light">
						<input
							className="w-[18px] h-[18px] rounded-[2px]"
							type="checkbox"
						/>
						Remember me
					</label>
					<Link
						className="text-[#8854C0] text-xs font-semibold cursor-pointer"
						href="/forgot-password"
					>
						Forgot Password?
					</Link>
				</div>

				<PrimaryButton
					className="mb-4 mt-10"
					label={loading ? 'Signing in...' : 'Sign In'}
					onClick={handleSubmit}
				/>

				{errors.general && (
					<p className="text-red-500 text-sm mb-3">
						{errors.general}
					</p>
				)}

				<div className="relative mt-[43px] mb-[32px] text-center text-sm opacity-60">
					<span className="absolute top-[50%] left-0 translate-y-[-50%] w-full h-px bg-[#272727]"></span>
					<span className="px-4 bg-[#1E1E1E] relative z-10">or</span>
				</div>

				<SocialLoginButton
					label="Sign In with Google"
					onClick={() => handleSocialLogin('google')}
					icon={<Google />}
				/>

				<div className="mt-6">
					<SocialLoginButton
						label="Sign in with Microsoft"
						onClick={() => handleSocialLogin('microsoft')}
						icon={
							<Image
								width={20}
								height={20}
								className="w-5 h-5"
								src="/images/microsoft.png"
								alt="microsoft"
							/>
						}
					/>
				</div>

				<div className="mt-6 flex items-center justify-center gap-2">
					<p className="font-normal text-xs text-white">
						Don't have an account?
					</p>

					<Link
						className="text-[#8854C0] font-semibold"
						href="/signup"
					>
						Sign Up
					</Link>
				</div>
			</div>
		</div>
	);
}

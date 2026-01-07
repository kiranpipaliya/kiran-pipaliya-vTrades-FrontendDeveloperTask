'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TextInput from './TextInput';
import SocialLoginButton from './SocialLoginButton';
import Google from '@/app/assets/svg/Google';
import Image from 'next/image';
import Link from 'next/link';
import PrimaryButton from '../ui/PrimaryButton';

export default function SignupForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState<{
		email?: string;
		password?: string;
		confirmPassword?: string;
		general?: string;
	}>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;

		setForm((prev) => ({ ...prev, [id]: value }));

		// Clear errors while typing
		setErrors((prev) => ({
			...prev,
			[id]: undefined,
			general: undefined,
		}));
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

		if (!form.confirmPassword.trim()) {
			newErrors.confirmPassword = 'Confirm password is required';
		} else if (form.password !== form.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validate()) return;

		try {
			setLoading(true);
			setErrors({});

			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: form.email,
					password: form.password,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Signup failed');
			}

			// Redirect to OTP screen
			router.push(
				`/otp?email=${encodeURIComponent(form.email)}&login=true`,
			);
		} catch (err: any) {
			setErrors({ general: err.message });
		} finally {
			setLoading(false);
		}
	};

	const handleSocialSignup = async (provider: 'google' | 'microsoft') => {
		try {
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ provider }),
			});

			const data = await res.json();
			if (!data.success) throw new Error(data.message);

			router.push('/dashboard');
		} catch (err: any) {
			setErrors({ general: err.message || 'Signup failed' });
		}
	};

	return (
		<div className="w-full max-w-[600px] mx-auto text-white">
			<div className="max-w-[385px] mx-auto">
				<h1 className="text-[32px] font-semibold leading-[150%] mb-1.5">
					Sign Up
				</h1>

				<p className="text-sm font-normal text-[#DADADA] leading-[170%] mb-8 mt-2">
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

					<TextInput
						id="confirmPassword"
						label="Confirm Password"
						type="password"
						placeholder="Confirm password"
						value={form.confirmPassword}
						onChange={handleChange}
						error={errors.confirmPassword}
						required
					/>
				</div>

				<PrimaryButton
					onClick={handleSubmit}
					className="mb-4 mt-10"
					label={loading ? 'Creating account...' : 'Sign Up'}
				/>

				{errors.general && (
					<p className="text-red-500 text-sm mb-3">
						{errors.general}
					</p>
				)}

				<div className="relative mt-[43px] mb-[32px] text-center text-sm opacity-60">
					<span className="absolute top-[50%] left-0 translate-y-[-50%] w-full h-px bg-[#272727]" />
					<span className="px-4 bg-[#1E1E1E] relative z-10">or</span>
				</div>

				<SocialLoginButton
					label="Sign up with Google"
					onClick={() => handleSocialSignup('google')}
					icon={<Google />}
				/>

				<div className="mt-6">
					<SocialLoginButton
						label="Sign up with Microsoft"
						onClick={() => handleSocialSignup('microsoft')}
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
						Already have an account?
					</p>

					<Link
						className="text-[#8854C0] font-semibold"
						href="/login"
					>
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
}

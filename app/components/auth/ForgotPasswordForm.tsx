'use client';

import { useState } from 'react';
import PrimaryButton from '../ui/PrimaryButton';
import SuccessModal from '../ui/SuccessModal';
import TextInput from './TextInput';
import MailIcon from '@/app/assets/svg/MailIcon';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordForm() {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const validateEmail = (value: string) => {
		if (!value) return 'Email is required';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
			return 'Please enter a valid email address';
		return '';
	};

	const handleSubmit = async () => {
		const validationError = validateEmail(email);
		if (validationError) {
			setError(validationError);
			return;
		}

		setError('');
		setLoading(true);

		// Mock API delay (as per assignment)
		setTimeout(() => {
			setLoading(false);
			setOpen(true);
		}, 1000);
	};

	const handleOnClose = () => {
		setOpen(false);
		router.push(`/otp?email=${encodeURIComponent(email)}`);
	};
	return (
		<div className="w-full max-w-[385px] mx-auto text-white">
			<h1 className="text-[32px] font-semibold mb-1.5">
				Forgot Your Password?
			</h1>

			<p className="text-sm font-normal mb-8">
				Don’t worry! Enter your email address, and we’ll send you a link
				to reset it.
			</p>

			<TextInput
				id="email"
				label="Email Address"
				type="email"
				placeholder="Enter your email"
				required
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
					if (error) setError('');
				}}
				error={error}
			/>

			<PrimaryButton
				className="mt-11"
				label={loading ? 'Sending...' : 'Submit'}
				onClick={handleSubmit}
				disabled={loading}
			/>

			<SuccessModal
				open={open}
				onClose={handleOnClose}
				title="Link Sent Successfully!"
				description="Check your inbox! We’ve sent you an email with instructions to reset your password."
				icon={<MailIcon className="h-24 w-24" />}
			/>
		</div>
	);
}

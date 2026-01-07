'use client';

import TextInput from '@/app/components/auth/TextInput';
import PrimaryButton from '@/app/components/ui/PrimaryButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SuccessModal from '@/app/components/ui/SuccessModal';
import { MailIcon } from 'lucide-react';
import CheckSuccess from '@/app/assets/svg/CheckSuccess';

export default function CreateNewPasswordForm() {
	const router = useRouter();

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		if (!password || !confirmPassword) {
			setError('Both password fields are required');
			return;
		}

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		setError('');
		setLoading(true);

		try {
			// TODO: Call Update Password API
			console.log('Password updated:', password);

			// Open success modal
			setOpen(true);
		} catch (err) {
			setError('Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	// 🔁 Close modal + redirect
	const handleOnClose = () => {
		setOpen(false);
		router.push('/login');
	};

	return (
		<div className="w-full max-w-[385px] mx-auto text-white">
			<h1 className="text-[32px] font-semibold mb-2">
				Create New Password
			</h1>

			<p className="text-sm text-[#DADADA] mb-8">
				Choose a strong and secure password to keep your account safe.
				Make sure it’s easy for you to remember, but hard for others to
				guess!
			</p>

			<div className="flex flex-col gap-6">
				<TextInput
					id="password"
					label="Password"
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
						if (error) setError('');
					}}
					required
				/>

				<TextInput
					id="confirm-password"
					label="Re-enter your new password"
					type="password"
					value={confirmPassword}
					onChange={(e) => {
						setConfirmPassword(e.target.value);
						if (error) setError('');
					}}
					error={error}
					required
				/>
			</div>

			<PrimaryButton
				label={loading ? 'Updating...' : 'Update Password'}
				className="mt-11 bg-[#8854C0]"
				onClick={handleSubmit}
				disabled={loading || !password || !confirmPassword}
			/>

			<SuccessModal
				open={open}
				onClose={handleOnClose}
				title="Password Created!"
				description="Your password has been successfully updated. You can now use your new password to log in."
				icon={<CheckSuccess />}
			/>
		</div>
	);
}

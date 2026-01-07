'use client';

import { useEffect, useRef, useState } from 'react';
import PrimaryButton from '../ui/PrimaryButton';
import TextInput from './TextInput';
import Timer from '@/app/assets/svg/Timer';
import { useRouter } from 'next/navigation';

interface OtpFormProps {
	email: string;
	login: boolean;
	onChangeEmail: () => void;
}

export default function OtpForm({ email, login, onChangeEmail }: OtpFormProps) {
	const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
	const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
	const [timer, setTimer] = useState(30);
	const [error, setError] = useState('');
	const [canResend, setCanResend] = useState(false);
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	// Countdown timer
	useEffect(() => {
		if (timer === 0) {
			setCanResend(true);
			return;
		}

		const interval = setInterval(() => setTimer((t) => t - 1), 1000);
		return () => clearInterval(interval);
	}, [timer]);

	// Handle OTP input
	const handleChange = (value: string, index: number) => {
		if (!/^\d?$/.test(value)) return; // only digits or empty

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		if (error) setError('');

		// Auto-focus next input
		if (value && index < 5) {
			inputsRef.current[index + 1]?.focus();
		}

		// Move back on delete
		if (!value && index > 0) {
			inputsRef.current[index - 1]?.focus();
		}
	};

	// Submit OTP
	const handleSubmit = async () => {
		if (otp.some((digit) => digit === '')) {
			setError('Please enter all 6 digits of the OTP');
			return;
		}

		try {
			setLoading(true);
			setError('');

			const enteredOtp = otp.join('');

			const res = await fetch('/api/auth/verify-otp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					otp: enteredOtp,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Invalid OTP');
			}

			// If signup flow → go to dashboard
			if (login) {
				localStorage.setItem(
					'auth',
					JSON.stringify({ email, token: 'mock-jwt-token' }),
				);
				router.push('/dashboard');
				return;
			}

			// Forgot password flow → reset password
			router.push(
				`/create-new-password?email=${encodeURIComponent(email)}`,
			);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	// Resend OTP
	const handleResend = async () => {
		try {
			setLoading(true);
			setError('');

			const res = await fetch('/api/auth/forgot-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Failed to resend OTP');
			}

			setOtp(Array(6).fill(''));
			setTimer(30);
			setCanResend(false);
			inputsRef.current[0]?.focus();
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full max-w-[385px] mx-auto text-white">
			<h1 className="text-[32px] leading-[150%] font-semibold mb-2">
				Enter OTP
			</h1>

			<p className="text-sm opacity-70 font-normal mb-2 text-[#DADADA]">
				Enter the OTP that we have sent to your email address
			</p>

			<p className="text-sm text-[#DADADA] font-normal mb-8">{email}</p>

			<button
				onClick={onChangeEmail}
				className="text-base font-normal leading-[24px] text-[#8854C0] mb-8"
			>
				Change Email Address
			</button>

			{/* OTP Inputs */}
			<div className="flex gap-[22px] mb-11">
				{otp.map((digit, index) => (
					<TextInput
						key={index}
						ref={(el) => {
							inputsRef.current[index] = el;
						}}
						id={`otp-${index}`}
						value={digit}
						onChange={(e) => handleChange(e.target.value, index)}
						type="text"
						placeholder="0"
						maxLength={1}
						inputClassName="w-[46px] h-[48px] text-white p-0 text-center rounded-[10px] bg-[#1D1E26] border-[#30303D] text-center text-lg placeholder:text-gray-400"
					/>
				))}
			</div>

			{error && <p className="text-red-500 text-sm mb-4">{error}</p>}

			{/* Timer / Resend */}
			<div className="flex font-medium items-center gap-2 text-sm opacity-60 mb-8">
				{!canResend ? (
					<div className="flex items-center gap-3">
						<Timer />
						<span className="">{timer} Sec</span>
					</div>
				) : (
					<button
						onClick={handleResend}
						className="text-[#8854C0] cursor-pointer font-semibold"
					>
						Resend OTP
					</button>
				)}
			</div>
			<PrimaryButton
				label={loading ? 'Verifying...' : 'Continue'}
				onClick={handleSubmit}
				disabled={loading}
			/>
		</div>
	);
}

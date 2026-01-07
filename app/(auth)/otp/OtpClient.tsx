'use client';

import { useSearchParams } from 'next/navigation';
import OtpForm from '@/app/components/auth/OtpForm';

export default function OtpClient() {
	const searchParams = useSearchParams();

	const email = searchParams.get('email') || '';
	const login = searchParams.get('login') === 'true';

	const handleChangeEmail = () => {
		if (login) {
			window.location.href = '/signup';
		} else {
			window.location.href = '/forgot-password';
		}
	};

	return (
		<OtpForm
			login={login}
			email={email}
			onChangeEmail={handleChangeEmail}
		/>
	);
}

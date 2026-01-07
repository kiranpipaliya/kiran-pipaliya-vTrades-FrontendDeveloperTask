import { NextResponse } from 'next/server';
import { users } from '../_store';

export async function POST(req: Request) {
	const { email } = await req.json();
	const user = users.get(email);

	if (!user) {
		return NextResponse.json(
			{ message: 'User not found' },
			{ status: 404 },
		);
	}

	const otp = Math.floor(100000 + Math.random() * 900000).toString();

	user.otp = otp;
	user.otpExpires = Date.now() + 5 * 60 * 1000;

	console.log('🔁 Resent OTP for', email, otp);

	return NextResponse.json({
		message: 'OTP resent',
	});
}

import { NextResponse } from 'next/server';
import { users } from '../_store';

export async function POST(req: Request) {
	const { email, password } = await req.json();

	if (!email || !password) {
		return NextResponse.json(
			{ message: 'Email and password required' },
			{ status: 400 },
		);
	}

	if (users.has(email)) {
		return NextResponse.json(
			{ message: 'User already exists' },
			{ status: 400 },
		);
	}

	const otp = Math.floor(100000 + Math.random() * 900000).toString();

	users.set(email, {
		email,
		password,
		otp,
		otpExpires: Date.now() + 5 * 60 * 1000, // 5 min
		verified: false,
	});

	console.log('📩 OTP for', email, otp); // visible in terminal

	return NextResponse.json({
		message: 'Signup successful, OTP sent',
	});
}

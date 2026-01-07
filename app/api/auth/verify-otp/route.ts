import { NextResponse } from 'next/server';
import { users } from '../_store';

export async function POST(req: Request) {
	const { email, otp } = await req.json();
	const user = users.get(email);

	if (!user) {
		return NextResponse.json({ message: 'Invalid OTP' }, { status: 404 });
	}

	if (!user.otp || user.otp !== otp) {
		return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
	}

	if (Date.now() > (user.otpExpires ?? 0)) {
		return NextResponse.json({ message: 'OTP expired' }, { status: 400 });
	}

	user.verified = true;
	delete user.otp;
	delete user.otpExpires;

	return NextResponse.json({
		message: 'OTP verified successfully',
		token: 'mock-jwt-token',
	});
}

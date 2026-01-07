// app/api/auth/verify-otp/route.ts
import { NextResponse } from 'next/server';
import { users } from '../_store';

export async function POST(req: Request) {
	const { email, otp } = await req.json();
	const user = users.get(email);

	if (!user || user.otp !== otp) {
		return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
	}

	return NextResponse.json({
		message: 'OTP verified',
	});
}

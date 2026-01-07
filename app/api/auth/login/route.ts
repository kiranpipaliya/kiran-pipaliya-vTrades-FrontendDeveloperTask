import { NextResponse } from 'next/server';
import { users } from '../_store';

export async function POST(req: Request) {
	const { email, password } = await req.json();
	const user = users.get(email);

	if (!user || user.password !== password) {
		return NextResponse.json(
			{ message: 'Invalid credentials' },
			{ status: 401 },
		);
	}

	if (!user.verified) {
		return NextResponse.json(
			{ message: 'Please verify OTP first' },
			{ status: 403 },
		);
	}

	return NextResponse.json({
		message: 'Login successful',
		token: 'mock-jwt-token',
	});
}

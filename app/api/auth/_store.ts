// app/api/auth/_store.ts
export type User = {
	email: string;
	password: string;
	otp?: string;
	otpExpires?: number;
	verified?: boolean;
};

export const users = new Map<string, User>();

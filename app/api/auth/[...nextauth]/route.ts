import { users } from '@/app/api/auth/_store';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const providers = [
	CredentialsProvider({
		name: 'Credentials',
		credentials: {
			email: { label: 'Email', type: 'email' },
			password: { label: 'Password', type: 'password' },
		},
		async authorize(credentials) {
			if (!credentials?.email || !credentials.password) {
				return null;
			}

			const user = users.get(credentials.email);

			if (!user) return null;
			if (user.password !== credentials.password) return null;
			if (!user.verified) return null;

			return {
				id: user.email,
				email: user.email,
			};
		},
	}),

	GoogleProvider({
		clientId: process.env.GOOGLE_CLIENT_ID!,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
	}),
];

/**
 * ✅ Add Google ONLY if env vars exist
 * This prevents crashes on Vercel
 */

const handler = NextAuth({
	providers,

	session: {
		strategy: 'jwt',
	},

	secret: process.env.NEXTAUTH_SECRET,

	pages: {
		signIn: '/login',
		error: '/login',
	},
});

export { handler as GET, handler as POST };

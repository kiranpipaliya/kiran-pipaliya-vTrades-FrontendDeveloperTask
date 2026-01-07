import AuthHero from '../components/auth/AuthHero';
import AuthLayout from '../components/auth/AuthLayout';

export default function AuthRootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AuthLayout>
			<AuthHero />
			{children}
		</AuthLayout>
	);
}

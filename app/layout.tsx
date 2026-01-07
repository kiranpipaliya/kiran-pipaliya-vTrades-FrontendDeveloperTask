import { Source_Sans_3 } from 'next/font/google';
import './globals.css';

const sourceSans = Source_Sans_3({
	subsets: ['latin'],
	weight: ['300', '400', '600', '700'],
	variable: '--font-source-sans',
	display: 'swap',
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={sourceSans.variable}>{children}</body>
		</html>
	);
}

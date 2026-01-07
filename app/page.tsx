import { redirect } from 'next/navigation';

/**
 * Root page
 * Redirects user to login screen
 */
export default function Home() {
	redirect('/login');
}

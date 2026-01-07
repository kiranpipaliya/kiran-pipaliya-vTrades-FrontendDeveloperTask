import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen flex items-center justify-center w-full max-w-[1440px] mx-auto p-10">
			<div className="flex items-center w-full rounded-2xl overflow-hidden">
				{children}
			</div>
		</div>
	);
}

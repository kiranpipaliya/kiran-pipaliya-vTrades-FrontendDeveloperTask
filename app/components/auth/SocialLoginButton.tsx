import { cn } from '@/app/lib/cn';
import React from 'react';

interface SocialLoginButtonProps {
	label: string;
	onClick: () => void;
	icon?: React.ReactNode;
	className?: string;
}

export default function SocialLoginButton({
	label,
	onClick,
	icon,
	className,
}: SocialLoginButtonProps) {
	return (
		<button
			onClick={onClick}
			className={cn(
				'w-full border cursor-pointer rounded-[10px] border-[#30303D] bg-[#1D1E26] py-[17px] flex items-center justify-center gap-2 hover:bg-zinc-800 transition',
				className,
			)}
		>
			{icon && <span className="flex items-center">{icon}</span>}
			<span className="text-sm font-light leading-[150%]">{label}</span>
		</button>
	);
}

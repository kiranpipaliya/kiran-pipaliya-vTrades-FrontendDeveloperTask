'use client';

interface PrimaryButtonProps {
	label: string;
	onClick?: () => void;
	type?: 'button' | 'submit';
	disabled?: boolean;
	className?: string;
}

export default function PrimaryButton({
	label,
	onClick,
	type = 'button',
	disabled = false,
	className = '',
}: PrimaryButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`w-full rounded-[10px] py-3 text-sm font-semibold transition
        ${
			disabled
				? 'bg-[#8854C0]/60 cursor-not-allowed'
				: 'bg-[#8854C0] hover:bg-[#7A48AD]'
		}
        ${className}
      `}
		>
			{label}
		</button>
	);
}

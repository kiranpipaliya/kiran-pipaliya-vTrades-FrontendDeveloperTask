import { cn } from '@/app/lib/cn';
import React from 'react';

interface AlertCircleProps {
	className?: string;
}

const AlertCircle = ({ className }: AlertCircleProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 18 18"
			fill="none"
			className={cn('h-[18px] w-[18px]', className)}
		>
			<g clipPath="url(#clip0_1_224)">
				<path
					d="M9 1.5C4.85625 1.5 1.5 4.85625 1.5 9C1.5 13.1437 4.85625 16.5 9 16.5C13.1437 16.5 16.5 13.1437 16.5 9C16.5 4.85625 13.1437 1.5 9 1.5ZM9.75 12.75H8.25V8.25H9.75V12.75ZM9.75 6.75H8.25V5.25H9.75V6.75Z"
					fill="currentColor"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1_224">
					<rect width="18" height="18" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default AlertCircle;

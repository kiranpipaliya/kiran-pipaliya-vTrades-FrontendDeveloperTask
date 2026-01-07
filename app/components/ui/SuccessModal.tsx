'use client';

import React from 'react';
import PrimaryButton from './PrimaryButton';

interface SuccessModalProps {
	open: boolean;
	title: string;
	description?: string;
	onClose: () => void;
	icon?: React.ReactNode;
	buttonLabel?: string;
}

export default function SuccessModal({
	open,
	title,
	description,
	onClose,
	icon,
	buttonLabel = 'Okay',
}: SuccessModalProps) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-white/15">
			<div className="w-full max-w-[500px] rounded-[10px] bg-[#1F2129] p-[60px]  shadow-xl">
				<div className="text-center">
					{/* Icon */}
					{icon && (
						<div className="mx-auto mb-[31px] flex h-20 w-20 items-center justify-center rounded-full">
							{icon}
						</div>
					)}

					{/* Title */}
					<h2 className="text-xl font-semibold text-white mb-3">
						{title}
					</h2>

					{/* Description */}
					{description && (
						<p className="text-sm font-light text-[##DADADA] mb-6 leading-relaxed">
							{description}
						</p>
					)}
				</div>
				{/* Action */}
				<div className="text-right">
					<div className="inline-flex w-auto ml-auto justify-end">
						<PrimaryButton
							className="px-[40px] py-[13px]"
							label={buttonLabel}
							onClick={onClose}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

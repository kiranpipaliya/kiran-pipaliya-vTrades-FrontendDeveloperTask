'use client';

import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import FormError from './FormError';

export interface TextInputProps {
	id: string;
	label?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	placeholder?: string;
	className?: string;
	inputClassName?: string;
	maxLength?: number;
	error?: string;
	required?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	(
		{
			id,
			label,
			type = 'text',
			placeholder,
			value,
			onChange,
			error,
			required = false,
			className,
			inputClassName,
			maxLength,
		},
		ref,
	) => {
		const isPassword = type === 'password';
		const [showPassword, setShowPassword] = useState(false);

		const inputClasses = twMerge(
			'w-full bg-[#1D1E26] text-sm rounded-[10px] border p-3 pr-10 outline-none transition placeholder:text-gray-400',
			error
				? 'border-[#D33C43] focus:border-[#D33C43]'
				: 'border-[#303030] focus:border-[#8854C0]',
			inputClassName,
		);

		const containerClasses = twMerge(className);

		return (
			<div className={containerClasses}>
				{label && (
					<label
						htmlFor={id}
						className="mb-2 block text-sm font-normal text-white"
					>
						{label}
						{required && (
							<span className="ml-1 text-red-500">*</span>
						)}
					</label>
				)}

				<div className="relative">
					<input
						ref={ref}
						id={id}
						type={isPassword && showPassword ? 'text' : type}
						placeholder={placeholder}
						value={value}
						onChange={onChange}
						maxLength={maxLength}
						aria-invalid={!!error}
						className={inputClasses}
					/>

					{isPassword && (
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
							aria-label={
								showPassword ? 'Hide password' : 'Show password'
							}
						>
							{showPassword ? (
								<EyeOff size={18} />
							) : (
								<Eye size={18} />
							)}
						</button>
					)}
				</div>

				{error && <FormError message={error} />}
			</div>
		);
	},
);

TextInput.displayName = 'TextInput';

export default TextInput;

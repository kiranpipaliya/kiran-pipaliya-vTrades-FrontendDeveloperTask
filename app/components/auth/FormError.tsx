import AlertCircle from '@/app/assets/svg/AlertCircle';

interface FormErrorProps {
	message: string;
}

export default function FormError({ message }: FormErrorProps) {
	if (!message) return null;

	return (
		<div className="flex items-center gap-2 mt-3">
			<AlertCircle className="text-[#D33C43] h-[18pz] w-[18px]" />
			<p className="text-xs text-[#D33C43] font-normal leading-snug">
				Oops! {message}
			</p>
		</div>
	);
}

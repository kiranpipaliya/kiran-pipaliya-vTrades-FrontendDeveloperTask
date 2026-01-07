import Image from 'next/image';

export default function AuthHero() {
	return (
		<div className="relative rounded-[20px] overflow-hidden max-w-[720px] max-h-[944px] w-full h-full">
			<Image
				src="/images/login.jpg"
				alt="Welcome"
				width={720}
				height={944}
				className="w-full h-full"
			/>

			<div className="absolute w-full bottom-0 leading-0 text-white p-8">
				<h2 className="text-5xl leading-[119%] tracking-[-0.92px] font-semibold ml-[1.5px]">
					Welcome to WORKHIVE!
				</h2>

				<ul className="mt-6 flex flex-col font-medium tracking-[0.222222px] gap-1 list-disc ml-px pl-6 space-y-2 text-base">
					<li className="mb-0">
						Employee Management: View detailed profiles, track
						performance, and manage attendance.
					</li>
					<li className="mb-0">
						Performance Insights: Analyze team goals, progress, and
						achievements.
					</li>
					<li className="mb-0">
						Attendance & Leaves: Track attendance patterns and
						manage leave requests effortlessly.
					</li>
				</ul>
			</div>
		</div>
	);
}

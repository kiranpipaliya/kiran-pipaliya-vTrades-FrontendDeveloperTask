import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./app/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-source-sans)', 'sans-serif'],
			},
		},
	},
	plugins: [],
};

export default config;

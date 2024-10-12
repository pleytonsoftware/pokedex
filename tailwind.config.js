const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
			},
			backgroundImage: {
				'pokemon-type-gradient': 'linear-gradient(45deg, var(--tw-bg-color) 0%, var(--tw-bg-color) 15%, var(--tw-bg-secondary-color) 100%)',
			},
			fontFamily: {
				'pokemon-solid': ['"Pokemon Solid"', 'sans-serif'],
				'pokemon-hollow': ['"Pokemon Hollow"', 'sans-serif'],
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		plugin(function ({ addUtilities, theme, e }) {
			const colors = theme('colors');
			const sizes = {
				DEFAULT: '1px', // Default size (equivalent to "sm")
				sm: '1px',
				md: '2px',
				lg: '3px',
			};

			const textShadowUtilities = Object.entries(colors).flatMap(([colorName, colorShades]) => {
				if (typeof colorShades === 'object') {
					return Object.entries(colorShades).flatMap(([shade, colorValue]) => {
						return Object.entries(sizes).map(([size, offset]) => ({
							// Default size if no size specified
							[`.text-shadow-${colorName}-${shade}${size === 'DEFAULT' ? '' : `-${size}`}`]: {
								textShadow: `
                  ${colorValue} -${offset} -${offset} 0, 
                  ${colorValue} ${offset} -${offset} 0, 
                  ${colorValue} -${offset} ${offset} 0, 
                  ${colorValue} ${offset} ${offset} 0`,
							},
						}));
					});
				}
				return Object.entries(sizes).map(([size, offset]) => ({
					[`.text-shadow-${colorName}${size === 'DEFAULT' ? '' : `-${size}`}`]: {
						textShadow: `
              ${colorShades} -${offset} -${offset} 0, 
              ${colorShades} ${offset} -${offset} 0, 
              ${colorShades} -${offset} ${offset} 0, 
              ${colorShades} ${offset} ${offset} 0`,
					},
				}));
			});

			// Utility for CSS variable support
			const variableTextShadowUtilities = Object.entries(sizes).map(([size, offset]) => ({
				[`.text-shadow-var`]: {
					textShadow: `
            var(--tw-shadow-color) -${offset} -${offset} 0, 
            var(--tw-shadow-color) ${offset} -${offset} 0, 
            var(--tw-shadow-color) -${offset} ${offset} 0, 
            var(--tw-shadow-color) ${offset} ${offset} 0`,
				},
			}));

			addUtilities([...textShadowUtilities, ...variableTextShadowUtilities], ['responsive']);
		}),
	],
}
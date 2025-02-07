import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		keyframes: {
  			scanline: {
  				'0%': {
  					bottom: '100%'
  				},
  				'80%': {
  					bottom: '100%'
  				},
  				'100%': {
  					bottom: '0%'
  				}
  			},
  			crtTextShadowDf: {
  				'0%': {
  					'text-shadow': '0.4389924193300864px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -0.4389924193300864px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'5%': {
  					'text-shadow': '2.7928974010788217px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -2.7928974010788217px 0 2px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'10%': {
  					'text-shadow': '0.02956275843481219px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -0.02956275843481219px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'15%': {
  					'text-shadow': '0.40218538552878136px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -0.40218538552878136px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'20%': {
  					'text-shadow': '3.4794037899852017px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -3.4794037899852017px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'25%': {
  					'text-shadow': '1.6125630401149584px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -1.6125630401149584px 0 2px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'30%': {
  					'text-shadow': '0.7015590085143956px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -0.7015590085143956px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'35%': {
  					'text-shadow': '3.896914047650351px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -3.896914047650351px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'40%': {
  					'text-shadow': '3.870905614848819px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -3.870905614848819px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'45%': {
  					'text-shadow': '2.231056963361899px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -2.231056963361899px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'50%': {
  					'text-shadow': '0.08084290417898504px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -0.08084290417898504px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'55%': {
  					'text-shadow': '2.3758461067427543px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -2.3758461067427543px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'60%': {
  					'text-shadow': '2.202193051050636px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -2.202193051050636px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'65%': {
  					'text-shadow': '2.8638780614874975px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -2.8638780614874975px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'70%': {
  					'text-shadow': '0.48874025155497314px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -0.48874025155497314px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'75%': {
  					'text-shadow': '1.8948491305757957px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -1.8948491305757957px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'80%': {
  					'text-shadow': '0.0833037308038857px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -0.0833037308038857px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'85%': {
  					'text-shadow': '0.09769827255241735px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -0.09769827255241735px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'90%': {
  					'text-shadow': '3.443339761481782px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -3.443339761481782px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'95%': {
  					'text-shadow': '2.1841838852799786px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -2.1841838852799786px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				},
  				'100%': {
  					'text-shadow': '2.6208764473832513px 0 1px var(--color1, rgba(0, 30, 255, 0.5)), -2.6208764473832513px 0 1px var(--color2, rgba(255, 0, 80, 0.3)), 0 0 3px'
  				}
  			}
  		},
  		animation: {
  			scanline: 'scanline 10s linear infinite',
  			crtTextShadowDf: 'crtTextShadowDf 0.15s infinite'
  		},
  		backgroundImage: {
  			'pixel-bg': 'url("/bg-pixel.png")',
				'crt-bg': `linear-gradient(rgba(18, 16, 16, 0), rgba(0, 0, 0, 0.25)),
                            linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`,
  		},
			backgroundSize: {
        'crt-scanline': '100% 3px, 2px 100%',
      },
  		colors: {
				'scanline-via': 'rgba(255, 255, 255, 0.2)', 
        'scanline-to': 'rgba(0, 0, 0, 0.1)', 
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
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
				
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [],
} satisfies Config;

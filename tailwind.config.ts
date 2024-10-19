import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  prefix: "",
  theme: {
  	extend: {
  		colors: {
  			primary: '#0a436c',
  			secondary: '#c08541',
  			black: '#2b2b2b'
  		},
  		keyframes: {
  			typewriter: {
  				to: {
  					left: '100%'
  				}
  			},
  			marquee: {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				'0%': {
  					transform: 'translateY(0)'
  				},
  				'100%': {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			},
  			'shiny-text': {
  				'0%, 90%, 100%': {
  					'background-position': 'calc(-100% - var(--shiny-width)) 0'
  				},
  				'30%, 60%': {
  					'background-position': 'calc(100% + var(--shiny-width)) 0'
  				}
  			},
  			orbit: {
  				'0%': {
  					transform: 'rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)'
  				}
  			}
  		},
  		animation: {
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
  			'shiny-text': 'shiny-text 8s infinite',
  			typewriter: 'typewriter 2s steps(11) forwards',
  			orbit: 'orbit calc(var(--duration)*1s) linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;

/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
	content: ["./layouts/**/*.html", "./assets/**/*.js"],
	darkMode: "class",
	theme: {
		fontFamily: {
			sans: ["Inter"],
			mono: ["Courier New", "Courier", "monospace"],
		},
		fontSize: {
			xxxs: 6 / 16 + "rem",
			xxs: 9 / 16 + "rem",
			xs: 11 / 16 + "rem",
			sm: 13 / 16 + "rem",
			md: 15 / 16 + "rem",
			base: 17 / 16 + "rem",
			lg: 19 / 16 + "rem",
			xl: 21 / 16 + "rem",
			"2xl": "1.5rem",
			"3xl": "1.875rem",
			"4xl": "2.25rem",
			"5xl": "3rem",
			"6xl": "4rem",
		},
		extend: {
			colors: {
				light: {
					0: "#ffffff",
					100: "#F5F5F5",
					200: "#EFF0F1",
					300: "#E8EAEC",
					400: "#E1E3E6",
					500: "#D9DDE2",
				},
				dark: {
					0: "#19202A",
					100: "#212936",
					200: "#273140",
					300: "#2E394A",
					400: "#59667A",
					500: "#8A93A4",
				},
				theme: {
					red: "#c72e49",
				},
			},
			borderRadius: {
				DEFAULT: "0.1875rem",
			},
			fontSize: {
				md: "0.9375rem",
			},
			textColor: {
				body: "var(--text-color)",
				muted: "var(--text-muted-color)",
				heading: "var(--headings-color)",
			},
			maxWidth: {
				container: "1400px",
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: "100%",
						color: "var(--text-color)",
						a: {
							color: "var(--link-color)",
							textDecoration: "none",
							fontWeight: "400",
							"&:hover": {
								textDecoration: "underline",
								color: "var(--link-color)",
							},
						},
						h1: {
							fontSize: "1.75rem",
							fontWeight: "700",
						},
						h2: {
							fontSize: "1.5rem",
							fontWeight: "700",
							marginTop: "1.5em",
						},
						h3: {
							fontSize: "1.25rem",
							fontWeight: "700",
							marginTop: "1.25em",
						},
						h4: {
							fontSize: "1rem",
							fontWeight: "700",
						},
						h5: {
							fontSize: "1rem",
						},
						h6: {
							fontSize: "0.1rem",
						},
						hr: {
							marginTop: "1.75em",
							marginBottom: "1.75em",
							opacity: "0.5",
						},
						pre: {
							backgroundColor: "var(--pre-bg)",
							color: "var(--text-color)",
							fontWeight: "700",
							borderRadius: "0.1875rem",
							padding: "1rem 1.25rem",
						},
						code: {
							backgroundColor: "var(--pre-bg)",
							color: "var(--text-color)",
							padding: "0.1rem 0.25rem 0",
							borderRadius: "0.1875rem",
							lineHeight: "1.2",
							borderWidth: "1px",
							borderColor: "transparent",
							wordBreak: "break-all",
							display: "inline-block",
						},
						"code::before": {
							content: '""',
						},
						"code::after": {
							content: '""',
						},
						li: {
							marginTop: "0",
							marginBottom: "0",
						},
						"li code, ol code": {
							marginTop: "0",
							marginBottom: "0",
						},
						img: {
							borderRadius: "0.1875rem",
							cursor: "pointer",
						},
						strong: {
							color: "inherit",
						},
					},
				},
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant("rm", ":merge(html.read-mode) &");
			addVariant("nrm", ":merge(html:not(.read-mode)) &");
			addVariant("drm", ":merge(html.read-mode.dark) &");
		}),
		require("@tailwindcss/typography"),
	],
};

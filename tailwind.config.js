import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // enable class-based dark mode
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],
    theme: {
        asideScrollbars: {
            light: "light",
            gray: "gray",
        },
        extend: {
            colors: {
                light: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                },
                dark: {
                    50: '#1f2937',
                    100: '#111827',
                    200: '#0f172a',
                    300: '#0e141f',
                },
            },
            zIndex: { "-1": "-1" },
            flexGrow: { 5: "5" },
            maxHeight: {
                "screen-menu": "calc(100vh - 3.5rem)",
                modal: "calc(100vh - 160px)",
            },
            transitionProperty: {
                position: "right, left, top, bottom, margin, padding",
                textColor: "color",
            },
            keyframes: {
                "fade-out": { from: { opacity: 1 }, to: { opacity: 0 } },
                "fade-in": { from: { opacity: 0 }, to: { opacity: 1 } },
            },
            animation: {
                "fade-out": "fade-out 250ms ease-in-out",
                "fade-in": "fade-in 250ms ease-in-out",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    "aside-scrollbars": (value) => {
                        const track = value === "light" ? "100" : "900";
                        const thumb = value === "light" ? "300" : "600";
                        const color = value === "light" ? "gray" : value;

                        return {
                            scrollbarWidth: "thin",
                            scrollbarColor: `${theme(`colors.${color}.${thumb}`)} ${theme(
                                `colors.${color}.${track}`
                            )}`,
                            "&::-webkit-scrollbar": { width: "8px", height: "8px" },
                            "&::-webkit-scrollbar-track": { backgroundColor: theme(`colors.${color}.${track}`) },
                            "&::-webkit-scrollbar-thumb": { borderRadius: "0.25rem", backgroundColor: theme(`colors.${color}.${thumb}`) },
                        };
                    },
                },
                { values: theme("asideScrollbars") }
            );
        }),
    ],
};

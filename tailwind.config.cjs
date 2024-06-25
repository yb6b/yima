/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    theme: {
        extend: {
            flex: {
                '5': '0.5 0.5 0%',
                '2': '2 2 0%'
            }
        }
    },
    content: [
        './components/**/*.{ts,tsx,vue}',
        './src/**/*.{ts,tsx,vue}',
    ],
    plugins: [require("daisyui")],
}
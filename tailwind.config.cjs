/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './components/**/*.{ts,tsx,vue}',
        './src/**/*.{ts,tsx,vue}',
    ],
    plugins: [require("daisyui")],
}
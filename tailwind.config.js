/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#7FB77E',
                secondary: '#42855B',
                brown: '#AC4425',
                light: '#D2D79F',
                lighter: '#90B77D',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
}

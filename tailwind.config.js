const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#7FB77E',
                secondary: '#42855B',
                third: '#90B77D',
                brown: '#AC4425',
                light: '#D2D79F',
                lighter: '#90B77D',

                // light: colors.white,
                dark: colors.slate[900],
                'secondary-dark': colors.slate[800],

                'light-text': colors.slate[500],
                'dark-text': colors.slate[400],
                'disabled-text': colors.slate[300],

                'light-border': colors.gray[100],
                'dark-border': colors.slate[700],
            },
            container: {
                // you can configure the container to be centered
                center: true,

                // or have default horizontal padding
                // padding: '1rem',

                // default breakpoints but with 40px removed
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1280px',
                    // '2xl': '1536px',
                },
            },
        },
    },
    darkMode: 'class',
    plugins: [],
}

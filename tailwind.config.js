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
                'disabled-text': '#ccc',
                'disabled-bg': '#eee',
            },
            container: {
                // you can configure the container to be centered
                center: true,
          
                // or have default horizontal padding
                padding: '1rem',
          
                // default breakpoints but with 40px removed
                screens: {
                  sm: '600px',
                  md: '728px',
                  lg: '984px',
                  xl: '1240px',
                  '2xl': '1496px',
                },
              },
        },
    },
    darkMode: 'class',
    plugins: [],
}

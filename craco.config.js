/** @type {import('react-scripts/config/webpack.config.js')} */
module.exports = {
    style: {
        postcssOptions: {
            plugins: {
                'postcss-import': {},
                'tailwindcss/nesting': {},
                tailwindcss: {},
                autoprefixer: {},
                // 'postcss-nested': {},
                // 'postcss-preset-env': {
                //     features: { 'nesting-rules': true },
                // },
            },
        },
    },
}

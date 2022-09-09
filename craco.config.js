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
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.resolve.fallback = {
                buffer: require.resolve('buffer'),
                stream: require.resolve('stream-browserify'),
                crypto: require.resolve('crypto-browserify'),
            }
            return webpackConfig
        },
    },
}

const webpack = require('webpack');

module.exports = {
    webpack: (config, { isServer }) => {
        // Если вы работаете с Webpack 5, добавьте это:
        if (isServer) {
            config.externals.push({
                'chrome-aws-lambda': 'chrome-aws-lambda'
            });
        }
        
        // Игнорирование файлов source map
        config.module.rules.push({
            test: /\.js\.map$/,
            use: 'null-loader',
        });

        return config;
    },
};

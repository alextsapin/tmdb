const path = require('path');
const CracoLessPlugin = require('craco-less');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    jest: {
        configure: {
            moduleNameMapper: {
                '^@/(.*)$': '<rootDir>/src/$1',
            },
        },
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
        },
    ],
};

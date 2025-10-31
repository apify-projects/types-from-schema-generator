import apify from '@apify/eslint-config/ts.js';

// eslint-disable-next-line import/no-default-export
export default [
    { ignores: ['**/dist'] },
    ...apify,
    {
        languageOptions: {
            parserOptions: {
                project: 'tsconfig.json',
            },
        },
        rules: {
            'no-console': 0,
        },
    },
];

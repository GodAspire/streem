// available since Nx v 12.5
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');

module.exports = {
    presets: [require('../../tailwind-workspace-preset.js')],
    content: [...createGlobPatternsForDependencies(__dirname), 'libs/ui/src/*.{scss,css,js,jsx,ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    mode: 'jit',
    // theme: {},
    variants: {
        extend: {},
    },
    plugins: [],
};

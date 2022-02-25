// available since Nx v 12.5
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
    presets: [require('../../tailwind-workspace-preset.js')],
    content: [...createGlobPatternsForDependencies(__dirname), 'libs/ui/src/*.{scss,css,js,jsx,ts,tsx}'],
    plugins: [],
};

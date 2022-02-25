module.exports = {
    darkMode: 'media', // or 'media' or 'class'
    mode: 'jit',
    theme: {
        fontFamily: {
            body: ['Poppins', 'sans-serif'],
        },
        extend: {
            colors: {
                theme: {
                    accent: 'var(--accent)',
                    foreground: 'var(--foreground)',
                    background: 'var(--background)',
                    text: 'var(--text)',
                    subtext: 'var(--subtext)',
                },
            },
        },
    },
};

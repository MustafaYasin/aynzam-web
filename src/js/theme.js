document.addEventListener('alpine:init', () => {
    Alpine.store('theme', {
        init() {
            // Check if theme is stored in localStorage, otherwise check system preference
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                this.isDark = true;
            } else {
                this.isDark = false;
            }
            this.update();
        },
        isDark: false,
        toggle() {
            this.isDark = !this.isDark;
            localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
            this.update();
        },
        update() {
            if (this.isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    });
});
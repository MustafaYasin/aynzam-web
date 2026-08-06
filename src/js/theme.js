document.addEventListener('alpine:init', () => {
  Alpine.store('theme', {
    init() {
      // Dark mode is the default; light only when the user explicitly chose it
      const storedTheme = localStorage.getItem('theme')
      this.isDark = storedTheme !== 'light'
      this.update()
    },
    isDark: true,
    toggle() {
      this.isDark = !this.isDark
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      this.update()
    },
    update() {
      if (this.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
  })
})

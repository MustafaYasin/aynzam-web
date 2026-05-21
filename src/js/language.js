document.addEventListener('alpine:init', () => {
  Alpine.store('lang', {
    current: window.__lang || 'de',

    init() {
      // German is the hard default. English only on explicit user choice.
      const stored = localStorage.getItem('language')
      this.current = stored === 'en' ? 'en' : 'de'
      this.update()
    },

    toggle() {
      this.current = this.current === 'de' ? 'en' : 'de'
      localStorage.setItem('language', this.current)
      this.update()
    },

    t(key) {
      const translations =
        this.current === 'en' ? window.__translations_en : window.__translations_de
      if (!translations) return ''
      return key
        .split('.')
        .reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : ''), translations)
    },

    update() {
      document.documentElement.lang = this.current
    },
  })
})

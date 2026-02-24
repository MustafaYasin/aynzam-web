document.addEventListener('alpine:init', () => {
  Alpine.store('lang', {
    current: window.__lang || 'de',

    init() {
      const stored = localStorage.getItem('language')
      if (stored === 'en' || stored === 'de') {
        this.current = stored
      } else {
        const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase()
        this.current = browserLang.startsWith('en') ? 'en' : 'de'
      }
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
      return key.split('.').reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : ''), translations)
    },

    update() {
      document.documentElement.lang = this.current
    },
  })
})

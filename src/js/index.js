import '../css/style.css'
import './translations/de.js'
import './translations/en.js'
import './language.js'

import persist from '@alpinejs/persist'
import Alpine from 'alpinejs'

Alpine.plugin(persist)
window.Alpine = Alpine

// ── Horizontal card rail (prev / next + edge state) ─────────────
Alpine.data('rail', () => ({
  atStart: true,
  atEnd: false,
  init() {
    this.$nextTick(() => this.update())
    window.addEventListener('resize', () => this.update(), { passive: true })
  },
  step() {
    const first = this.$refs.rail.firstElementChild
    return first ? first.getBoundingClientRect().width + 16 : 320
  },
  update() {
    const el = this.$refs.rail
    if (!el) return
    this.atStart = el.scrollLeft <= 2
    this.atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
  },
  prev() {
    this.$refs.rail.scrollBy({ left: -this.step(), behavior: 'smooth' })
  },
  next() {
    this.$refs.rail.scrollBy({ left: this.step(), behavior: 'smooth' })
  },
}))

Alpine.start()

// Note: scroll-to-top / scrollRestoration is handled early in the <head>
// (partials/lang-init.html) so it runs before the browser restores scroll.

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ── Active nav link ─────────────────────────────────────────────
const sections = document.querySelectorAll('main section[id]')

const scrollActive = () => {
  const scrollY = window.pageYOffset
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 120
    const sectionId = current.getAttribute('id')
    const navLinks = document.querySelectorAll(`header nav a[href*="#${sectionId}"]`)
    navLinks.forEach((link) => {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active-nav-link')
      } else {
        link.classList.remove('active-nav-link')
      }
    })
  })
}

window.addEventListener('scroll', scrollActive, { passive: true })

// ── Scroll reveal (blur-in) ─────────────────────────────────────
// Hidden state is applied only via JS so no-JS renders fully visible.
const revealTargets = []
document
  .querySelectorAll(
    'main section:not(#home) h2, main section:not(#home) .story-card, main section:not(#home) .pillar-card, main section:not(#home) .logo-cell, main section:not(#home) .link-card, main section:not(#home) .card, main section:not(#home) .card-tint',
  )
  .forEach((el) => {
    const siblings = el.parentElement ? Array.from(el.parentElement.children) : []
    revealTargets.push([el, Math.max(0, siblings.indexOf(el))])
  })

if (revealTargets.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
  revealTargets.forEach(([el, i]) => {
    el.classList.add('reveal')
    el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`
  })

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
  )

  revealTargets.forEach(([el]) => {
    io.observe(el)
  })
}

// ── Statement: word-by-word colour reveal driven by scroll ──────
const statement = document.querySelector('[data-statement]')

if (statement) {
  let words = []

  const split = () => {
    const text = statement.textContent.trim()
    if (!text) return
    statement.innerHTML = ''
    words = text.split(/\s+/).map((w) => {
      const span = document.createElement('span')
      span.className = 'w'
      span.textContent = w
      statement.appendChild(span)
      statement.appendChild(document.createTextNode(' '))
      return span
    })
    paint()
  }

  const paint = () => {
    if (!words.length) return
    const rect = statement.getBoundingClientRect()
    const vh = window.innerHeight
    // 0 when the block enters the lower third, 1 when it reaches the upper third
    const start = vh * 0.85
    const end = vh * 0.35
    const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)))
    const n = prefersReducedMotion ? words.length : Math.round(p * words.length)
    words.forEach((w, i) => {
      w.classList.toggle('on', i < n)
    })
  }

  // Alpine fills the text on init; wait for it, then re-split when the
  // language changes (x-text rewrites the node content).
  const observer = new MutationObserver(() => {
    if (statement.querySelector('.w')) return
    split()
  })
  observer.observe(statement, { childList: true, characterData: true, subtree: true })

  window.addEventListener('scroll', paint, { passive: true })
  window.addEventListener('resize', paint, { passive: true })
  setTimeout(split, 0)
}

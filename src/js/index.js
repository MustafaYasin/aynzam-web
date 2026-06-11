import '../css/animate.css'
import '../css/style.css'
import './translations/de.js'
import './translations/en.js'
import './theme.js'
import './language.js'

import persist from '@alpinejs/persist'
import Alpine from 'alpinejs'

Alpine.plugin(persist)
window.Alpine = Alpine

Alpine.start()

// Always open at the top on reload — don't let the browser restore the
// previous scroll position (which made refreshes land mid-page).
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
window.addEventListener('load', () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0)
  }
})

// Smooth Scroll Active Link
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 100
    const sectionId = current.getAttribute('id')

    // Use semantic classes for active links
    const navLinks = document.querySelectorAll(
      'header nav a[href*=' +
        sectionId +
        '], header div[x-show="mobileMenuOpen"] a[href*=' +
        sectionId +
        ']',
    )

    navLinks.forEach((link) => {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active-nav-link') // Use a semantic class
      } else {
        link.classList.remove('active-nav-link')
      }
    })
  })
}

window.addEventListener('scroll', scrollActive)

// ── Scroll reveal ──────────────────────────────────────────────
// Adds .reveal (initial hidden state) only via JS, then reveals on
// intersection. Without JS, nothing is hidden. Hero is excluded —
// it already plays its own load animation.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const revealTargets = []
// Section intro blocks (eyebrow + headline + deck)
document.querySelectorAll('main section:not(#home) .container > div:first-child').forEach((el) => {
  revealTargets.push([el, 0])
})
// Cards & workflow steps, staggered within their own grid
document.querySelectorAll('main section:not(#home) .container > .grid').forEach((grid) => {
  Array.from(grid.children).forEach((child, i) => {
    revealTargets.push([child, i])
  })
})

if (revealTargets.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
  revealTargets.forEach(([el, i]) => {
    el.classList.add('reveal')
    el.style.transitionDelay = `${Math.min(i, 5) * 80}ms`
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
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )

  revealTargets.forEach(([el]) => {
    io.observe(el)
  })
}

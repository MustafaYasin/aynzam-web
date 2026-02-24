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

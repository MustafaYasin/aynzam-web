import '../css/animate.css'
import '../css/star.css'
import '../css/style.css'
// import Swiper styles
import 'swiper/css'

import persist from '@alpinejs/persist'
import Alpine from 'alpinejs'

import WOW from 'wowjs'

// import Swiper JS
import Swiper, { Autoplay } from 'swiper'

// import fslightbox

Alpine.plugin(persist)
window.Alpine = Alpine

Alpine.start()

window.wow = new WOW.WOW({
  mobile: false,
})

window.wow.init({
  offset: 50,
})

/*========== SCROLL SECTIONS ACTIVE LINK ==========*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50
    let sectionId = current.getAttribute('id')
    const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

    // Check if navigation link exists before accessing classList
    if (!navLink) return

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink.classList.add('text-white!')
      navLink.classList.add('nav-gradient')
    } else {
      navLink.classList.remove('text-white!')
      navLink.classList.remove('nav-gradient')
    }
  })
}
window.addEventListener('scroll', scrollActive)

// Box highlighter
class Highlighter {
  constructor(containerElement) {
    this.container = containerElement
    this.boxes = Array.from(this.container.children)
    this.mouse = {
      x: 0,
      y: 0,
    }
    this.containerSize = {
      w: 0,
      h: 0,
    }
    this.initContainer = this.initContainer.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.init()
  }

  initContainer() {
    this.containerSize.w = this.container.offsetWidth
    this.containerSize.h = this.container.offsetHeight
  }

  onMouseMove(event) {
    const { clientX, clientY } = event
    const rect = this.container.getBoundingClientRect()
    const { w, h } = this.containerSize
    const x = clientX - rect.left
    const y = clientY - rect.top
    const inside = x < w && x > 0 && y < h && y > 0
    if (inside) {
      this.mouse.x = x
      this.mouse.y = y
      this.boxes.forEach((box) => {
        const boxX =
          -(box.getBoundingClientRect().left - rect.left) + this.mouse.x
        const boxY =
          -(box.getBoundingClientRect().top - rect.top) + this.mouse.y
        box.style.setProperty('--mouse-x', `${boxX}px`)
        box.style.setProperty('--mouse-y', `${boxY}px`)
      })
    }
  }

  init() {
    this.initContainer()
    window.addEventListener('resize', this.initContainer)
    window.addEventListener('mousemove', this.onMouseMove)
  }
}

// Init Highlighter
const highlighters = document.querySelectorAll('[data-highlighter]')
highlighters.forEach((highlighter) => {
  new Highlighter(highlighter)
})

// clientsCarousel
const clientsCarousel = new Swiper('.clients-carousel', {
  modules: [Autoplay],
  slidesPerView: 'auto',
  spaceBetween: 64,
  loop: true,
  speed: 5000,
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
  autoplay: {
    delay: 0,
    disableOnInteraction: true,
  },
})

// Document Loaded
document.addEventListener('DOMContentLoaded', () => {})

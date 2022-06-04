function scrollTrigger(selector, options = {}) {
    let els = document.querySelectorAll(selector)
    els = Array.from(els)
    els.forEach(el => {
      // Passing the options object to the addObserver function
      addObserver(el, options)
    })
  }
  // Receiving options passed from the scrollTrigger function
  function addObserver(el, options) {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    }, options) // Passing the options object to the observer
    observer.observe(el)
  }
 
scrollTrigger('.scroll-reveal', { rootMargin: '-200px' })
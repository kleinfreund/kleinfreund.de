document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.remove('js-disabled')

  initColorSchemeToggle()

  const elements = Array.from(document.querySelectorAll('[data-start-date]'))
  for (const element of elements) {
    setCurrentEmploymentTime(element)
  }
})

function initColorSchemeToggle() {
  const storedColorScheme = window.localStorage.getItem('active-color-scheme')
  if (typeof storedColorScheme === 'string') {
    document.body.setAttribute('data-color-scheme', storedColorScheme)
  }

  const toggle = document.querySelector('[data-color-scheme-toggle]')
  toggle.addEventListener('click', toggleColorScheme)
}

function toggleColorScheme() {
  const activeColorScheme = getActiveColorScheme()
  setActiveColorScheme(activeColorScheme === 'light' ? 'dark' : 'light')
}

function getActiveColorScheme() {
  const activeColorScheme = document.body.getAttribute('data-color-scheme')
  if (typeof activeColorScheme === 'string') {
    return activeColorScheme
  }

  const colorSchemePreference = getColorSchemePreference()
  return colorSchemePreference !== 'no-preference' ? colorSchemePreference : 'light'
}

function setActiveColorScheme(colorScheme) {
  document.body.setAttribute('data-color-scheme', colorScheme)
  window.localStorage.setItem('active-color-scheme', colorScheme)
}

function getColorSchemePreference() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  } else {
    return 'no-preference'
  }
}

function setCurrentEmploymentTime(element) {
  const startDateString = element.getAttribute('data-start-date')
  const startDate = new Date(startDateString)
  const epochDifference = Date.now() - startDate.getTime()

  if (epochDifference < 0) {
    return
  }

  const differenceDate = new Date(epochDifference)
  const years = differenceDate.getFullYear() - 1970
  const months = differenceDate.getMonth()

  const pieces = []

  if (years > 0) {
    pieces.push(`${years} year${years > 1 ? 's' : ''}`)
  }

  if (months > 0) {
    pieces.push(`${months} month${months > 1 ? 's' : ''}`)
  }

  element.textContent = ` · ${pieces.join(', ')}`
}

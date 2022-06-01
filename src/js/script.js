// @ts-check

/** @typedef {'dark' | 'light'} ColorScheme */

document.addEventListener('DOMContentLoaded', init)

function init() {
  initColorSchemeToggle()
  setCurrentEmploymentTime()
}

function initColorSchemeToggle() {
  const storedColorScheme = window.localStorage.getItem('active-color-scheme')
  if (typeof storedColorScheme === 'string') {
    document.body.setAttribute('data-color-scheme', storedColorScheme)
  }

  const toggle = document.querySelector('[data-color-scheme-toggle]')
  toggle.addEventListener('click', setActiveColorScheme)
}

function setActiveColorScheme() {
  const activeColorScheme = getActiveColorScheme()
  document.body.setAttribute('data-color-scheme', activeColorScheme)
  window.localStorage.setItem('active-color-scheme', activeColorScheme)
}

/**
 * @returns {ColorScheme} the active color scheme.
 */
function getActiveColorScheme() {
  const activeColorScheme = /** @type {ColorScheme | null} */ (document.body.getAttribute('data-color-scheme'))

  if (typeof activeColorScheme === 'string') {
    return activeColorScheme
  }

  const colorSchemePreference = getColorSchemePreference()
  return colorSchemePreference !== 'no-preference' ? colorSchemePreference : 'light'
}

/**
 * @returns {ColorScheme | 'no-preference'} a user’s color scheme preference.
 */
function getColorSchemePreference() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  } else {
    return 'no-preference'
  }
}

function setCurrentEmploymentTime() {
  const elements = Array.from(document.querySelectorAll('[data-start-date]'))
  for (const element of elements) {
    const startDateString = element.getAttribute('data-start-date')
    const startDate = new Date(startDateString)
    element.textContent = ' · ' + getFormattedTimeDifference(startDate)
  }
}

/**
 * @param {Date} startDate
 * @param {Date} [endDate]
 * @returns {string} a formatted time difference (e.g. `"1 year, 3 months"`).
 */
function getFormattedTimeDifference(startDate, endDate = new Date()) {
  const epochDifference = endDate.getTime() - startDate.getTime()

  if (epochDifference < 0) {
    return ''
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

  return pieces.join(', ')
}

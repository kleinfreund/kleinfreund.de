// @ts-check

init()

function init() {
  initColorSchemeToggle()
  setCurrentEmploymentTime()
}

function initColorSchemeToggle() {
  document.querySelector('[data-color-scheme-toggle]')
    ?.addEventListener('click', function () {
      const newActiveColorScheme = document.documentElement.getAttribute('data-color-scheme') === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-color-scheme', newActiveColorScheme)
      window.localStorage.setItem('active-color-scheme', newActiveColorScheme)
    })

  // Initially set the `data-color-scheme` attribute to either (1) the stored color scheme or (2) the preferred color scheme. From this point on, the `data-color-scheme` is the only thing controlling the active scheme. This together with the `light-dark()` function in CSS removes the need for dealing with the `prefers-color-scheme` media query in CSS.
  document.documentElement.setAttribute('data-color-scheme', getColorSchemePreference())
}

function getColorSchemePreference() {
  const storedColorScheme = window.localStorage.getItem('active-color-scheme')
  if (storedColorScheme !== null) {
    return storedColorScheme
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return 'light'
}

function setCurrentEmploymentTime() {
  const elements = Array.from(document.querySelectorAll('[data-start-date]'))
  for (const element of elements) {
    const startDateString = /** @type {string} */ (element.getAttribute('data-start-date'))
    const startDate = new Date(startDateString)

    const formattedTimeDifference = getFormattedTimeDifference(startDate)
    if (formattedTimeDifference !== '') {
      element.textContent = ' · ' + formattedTimeDifference
    }
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

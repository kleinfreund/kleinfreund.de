// @ts-check

setCurrentEmploymentTime()

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

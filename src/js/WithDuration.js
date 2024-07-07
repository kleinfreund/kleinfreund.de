// @ts-check

class WithDuration extends HTMLElement {
  static {
    if (window.customElements.get("with-duration") === undefined) {
      window.customElements.define("with-duration", WithDuration)
    }
  }

  connectedCallback() {
    const formattedTimeDifference = this.#getFormattedTimeDifference()
    if (formattedTimeDifference !== '') {
      this.textContent += ` · ${formattedTimeDifference}`
    }
  }

  /**
   * @returns {string} a formatted time difference (e.g. `"1 year, 3 months"`).
   */
  #getFormattedTimeDifference() {
    const startDateString = /** @type {string} */ (this.getAttribute('start-date'))
    const startDate = new Date(startDateString)
    const epochDifference = Date.now() - startDate.getTime()

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
}

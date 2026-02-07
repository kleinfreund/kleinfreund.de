import { getAllResponses, getReleases } from './api.js'

export default async function () {
  const token = process.env.DISCOGS_PAT ?? ''
  if (token === '') {
    throw new Error('Environment variable DISCOGS_PAT must be provided.')
  }

  const username = process.env.DISCOGS_USERNAME ?? ''
  if (username === '') {
    throw new Error('Environment variable DISCOGS_USERNAME must be provided.')
  }

  const folderId = 1

  console.log('[Discogs] Starting to fetch collection ...')
  const url = `https://api.discogs.com/users/${username}/collection/folders/${folderId}/releases`
  const releases = (await getAllResponses(getReleases, { token, url }))
    .map(({ data }) => data.releases)
    .flat()
    .filter((release) => release.basic_information.formats.some((format) => format.name === 'Vinyl'))
  console.log('[Discogs] Done.')

  const records = releases.map(({ basic_information }) => {
    const title = basic_information.title.trim()
    // Strip off the sequential number added to artist names if there are multiple in the Discogs database (e.g. “Air (10)” → “Air”).
    const artists = basic_information.artists.map(({ name }) => name.replace(/ \(\d+\)$/, ''))
    const year = basic_information.year

    return { title, artists, year }
  })

  records.sort((recordA, recordB) => {
    const result = recordA.artists[0].localeCompare(recordB.artists[0])
    if (result !== 0) {
      return result
    }

    return recordA.year - recordB.year
  })

  return records
}

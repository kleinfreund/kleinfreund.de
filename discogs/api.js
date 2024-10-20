import { retrieve } from 'retrieve'
/** @import { RetrieveResponse } from 'retrieve' */

/** @import { ApiConfig, CollectionResponse, ReleaseCollectionResponse } from './api-types.d.js' */

/**
 * @template {CollectionResponse} DataType
 * @param {ApiConfig} config
 */
async function request({ token, url }) {
  return /** @type {Promise<RetrieveResponse & { data: DataType }>} */ (retrieve({
    url,
    init: {
      headers: {
        Authorization: `Discogs token=${token}`,
      },
    },
  }))
}

/**
 * Exhausts a paginated collection resource endpoint and returns an array of responses.
 *
 * @template {CollectionResponse} DataType
 * @param {typeof request<DataType>} apiFunction
 * @param {ApiConfig} config
 * @returns {Promise<Array<RetrieveResponse & { data: DataType }>>}
 */
export async function getAllResponses(apiFunction, config) {
  /** @type {string | undefined} */ let url = config.url
  /** @type {Array<RetrieveResponse & { data: DataType }>} */ const responses = []

  while (typeof url === 'string') {
    const response = await apiFunction({ ...config, url })

    responses.push(response)
    url = response.data.pagination.urls.next
  }

  return responses
}

/**
 * @param {ApiConfig} config
 */
export async function getReleases(config) {
  return /** @type {typeof request<ReleaseCollectionResponse>} */ (request)(config)
}

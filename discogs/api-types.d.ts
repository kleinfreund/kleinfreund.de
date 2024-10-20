export interface Release {
  id: number
  instance_id: number
  date_added: string
  rating: number
  basic_information: {
    id: number
    master_id: number
    master_url: string
    resource_url: string
    thumb: string
    cover_image: string
    title: string
    year: number
    formats: {
      name: string
      qty: string
      text: string
      descriptions: string[]
    }[]
    artists: {
      name: string
      anv: string
      join: string
      role: string
      tracks: string
      id: number
      resource_url: string
    }[]
    labels: {
      name: string
      catno: string
      entity_type: string
      entity_type_name: string
      id: number
      resource_url: string
    }[]
    genres: string[]
    styles: string[]
  }
  folder_id: number
}

export interface ApiConfig {
  token: string
  url: string
}

export interface CollectionResponse {
  pagination: {
    page: number
    pages: number
    per_page: number
    items: number
    urls: {
      next?: string
    }
  }
}

export interface ReleaseCollectionResponse extends CollectionResponse {
  releases: Release[]
}

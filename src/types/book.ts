export interface BookCandidate {
  title: string
  author: string
  contributors?: string[]
  firstPublishYear: number
  explanation: string
  workKey: string
  workUrl: string
  coverImageUrl: string | null
  matchStrength?: string
}

export interface SearchResponse {
  candidates: BookCandidate[]
}

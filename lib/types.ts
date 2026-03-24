export interface DictionaryEntry {
  url: string
  slovenske: string
  sariske: string[]
}

export interface WordWithViews extends DictionaryEntry {
  views: number
}

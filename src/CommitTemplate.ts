export type CommitTemplate = {
  message: string
  embed?: {
    title: string
    description: string
    url?: string
    author?: {
      name: string
      icon_url?: string
    }
  }
  extras: {
    title: string
    url: string
  }[]
}

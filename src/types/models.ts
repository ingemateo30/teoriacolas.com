export interface QueueModelInfo {
    id: string
    name: string
    description: string
    parameters: string[]
    image?: string
    category: 'basic' | 'advanced'
  }
  
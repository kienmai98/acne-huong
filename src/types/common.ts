import { ReactNode } from 'react'

export type WithChildren<T = {}> = T & { children: ReactNode }

export interface IThumbnail {
  title: string
  categoryIds: string[]
  thumbnail: string
  video: string
  description: string
  createdAt: string
  updatedAt: string
  views: number
}

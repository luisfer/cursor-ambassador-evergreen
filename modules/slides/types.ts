export interface Slide {
  id: number
  title: string
  content: React.ReactNode | string
  notes?: string
}

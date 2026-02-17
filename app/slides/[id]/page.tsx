import { notFound } from 'next/navigation'
import SlideLayout from '@/modules/slides/components/SlideLayout'
import SlideContent from '@/modules/slides/components/SlideContent'
import { exampleDeck, totalExampleSlides } from '@/modules/slides/content/example-deck'

interface SlidePageProps {
  params: {
    id: string
  }
}

export default function SlidePage({ params }: SlidePageProps) {
  const id = Number(params.id)
  if (!Number.isInteger(id) || id < 1 || id > totalExampleSlides) {
    notFound()
  }

  const slide = exampleDeck[id - 1]

  return (
    <SlideLayout currentSlide={id} totalSlides={totalExampleSlides}>
      <div className="space-y-8">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold">{slide.title}</h1>
        </header>
        <SlideContent slide={slide} />
      </div>
    </SlideLayout>
  )
}

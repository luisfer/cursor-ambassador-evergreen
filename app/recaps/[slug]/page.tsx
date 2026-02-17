import { notFound } from 'next/navigation'
import EventRecap from '@/components/EventRecap'
import { recapsBySlug } from '@/content/recaps'

interface RecapPageProps {
  params: {
    slug: string
  }
}

export default function RecapPage({ params }: RecapPageProps) {
  const recap = recapsBySlug[params.slug]
  if (!recap) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-cursor-bg text-cursor-text">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <EventRecap recap={recap} />
      </div>
    </main>
  )
}

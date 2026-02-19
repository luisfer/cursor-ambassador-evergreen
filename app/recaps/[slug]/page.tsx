import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import EventRecap from '@/components/EventRecap'
import JsonLd from '@/components/JsonLd'
import { recapsBySlug } from '@/content/recaps'
import { siteConfig } from '@/content/site.config'

interface RecapPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: RecapPageProps): Promise<Metadata> {
  const { slug } = await params
  const recap = recapsBySlug[slug]
  if (!recap) return {}

  const description = recap.summary[0] || `Recap of ${recap.title}`

  return {
    title: `${recap.title} | ${siteConfig.communityName}`,
    description,
    openGraph: {
      title: recap.title,
      description,
      type: 'article',
      ...(recap.photos[0]?.src
        ? { images: [{ url: recap.photos[0].src, alt: recap.photos[0].alt }] }
        : {}),
    },
  }
}

function buildRecapJsonLd(slug: string) {
  const recap = recapsBySlug[slug]
  if (!recap) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: recap.title,
    startDate: recap.date,
    description: recap.summary[0] || '',
    organizer: {
      '@type': 'Organization',
      name: siteConfig.communityName,
    },
    ...(recap.attendees
      ? { maximumAttendeeCapacity: recap.attendees }
      : {}),
    ...(recap.host
      ? {
          location: {
            '@type': 'Place',
            name: recap.host.name,
          },
        }
      : {}),
    ...(recap.photos[0]?.src ? { image: recap.photos[0].src } : {}),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
  }
}

export default async function RecapPage({ params }: RecapPageProps) {
  const { slug } = await params
  const recap = recapsBySlug[slug]
  if (!recap) {
    notFound()
  }

  const jsonLd = buildRecapJsonLd(slug)

  return (
    <main className="min-h-screen bg-cursor-bg text-cursor-text">
      {jsonLd && <JsonLd data={jsonLd} />}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <EventRecap recap={recap} />
      </div>
    </main>
  )
}

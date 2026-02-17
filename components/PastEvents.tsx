'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Users, ArrowRight } from 'lucide-react'
import { pastEvents } from '@/content/events'
import { useI18n } from '@/lib/i18n'

export default function PastEvents() {
  const { t, locale } = useI18n()

  if (pastEvents.length === 0) {
    return null
  }

  return (
    <motion.section
      id="recaps"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="mb-16 scroll-mt-8"
    >
      <h2 className="text-xs uppercase tracking-wider text-cursor-text-muted font-medium mb-4">
        {t('home.pastEvents')}
      </h2>

      <div className="space-y-4">
        {pastEvents.map((event) => {
          if (!event.recapPath) return null

          const displayDate = new Date(`${event.date}T00:00:00`).toLocaleDateString(locale === 'en' ? 'en-US' : locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })

          return (
            <Link key={event.id} href={event.recapPath} className="block group">
              <div className="bg-cursor-bg-dark border border-cursor-border rounded-md p-4 hover:border-cursor-border-emphasis transition-colors">
                <div className="flex items-start gap-4">
                  {event.thumbnail ? (
                    <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden bg-gray-800">
                      <Image
                        src={event.thumbnail}
                        alt={event.title}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-cursor-text font-medium mb-2 group-hover:text-cursor-text-muted transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-cursor-text-muted mb-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{displayDate}</span>
                      </div>
                      {event.attendees ? (
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          <span>{t('home.attendees', { count: String(event.attendees) })}</span>
                        </div>
                      ) : null}
                    </div>
                    {event.host ? (
                      <div className="text-cursor-text-muted text-sm mb-2 flex items-center gap-2">
                        <span>{t('home.hostedBy')}</span>
                        <span className="text-cursor-text inline-flex items-center gap-1.5">
                          <Image src={event.host.logo} alt={event.host.name} width={18} height={18} className="rounded-full" />
                          {event.host.name}
                        </span>
                      </div>
                    ) : null}
                    <div className="flex items-center gap-2 text-sm text-cursor-text group-hover:text-cursor-text-muted transition-colors">
                      <span>{t('home.viewRecap')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </motion.section>
  )
}

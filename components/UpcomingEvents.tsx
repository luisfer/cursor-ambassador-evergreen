'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { upcomingEvents } from '@/content/events'
import { useI18n } from '@/lib/i18n'

export default function UpcomingEvents() {
  const { t, locale } = useI18n()

  if (upcomingEvents.length === 0) {
    return null
  }

  return (
    <motion.section
      id="upcoming"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="mb-16 scroll-mt-8"
    >
      <h2 className="text-xs uppercase tracking-wider text-cursor-text-muted font-medium mb-4">
        {t('home.upcomingEvents')}
      </h2>

      <div className="divide-y divide-cursor-border">
        {upcomingEvents.map((event, index) => {
          const shortDate = new Date(`${event.date}T00:00:00`).toLocaleDateString(locale === 'en' ? 'en-US' : locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
          const city = event.location.split(',')[0].trim()

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-start gap-4">
                <span className="text-sm font-medium text-cursor-text-muted w-28 flex-shrink-0 pt-0.5">
                  {shortDate}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-cursor-text font-medium text-sm">{event.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-cursor-text-muted">{city}</span>
                    {event.lumaUrl ? (
                      <>
                        <span className="text-cursor-text-faint">&middot;</span>
                        <a
                          href={event.lumaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-cursor-text hover:text-cursor-text-muted transition-colors inline-flex items-center gap-1"
                        >
                          {t('home.register')}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}

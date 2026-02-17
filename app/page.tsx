'use client'

import { motion } from 'framer-motion'
import HeroHeader from '@/components/HeroHeader'
import AmbassadorSection from '@/components/AmbassadorSection'
import FeaturedSection from '@/components/FeaturedSection'
import UpcomingEvents from '@/components/UpcomingEvents'
import PastEvents from '@/components/PastEvents'
import GlobalEvents from '@/components/GlobalEvents'
import Partners from '@/components/Partners'
import { siteConfig } from '@/content/site.config'
import { useI18n } from '@/lib/i18n'

export default function Home() {
  const { t } = useI18n()

  return (
    <main className="min-h-screen bg-cursor-bg text-cursor-text scroll-smooth">
      <HeroHeader />

      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <AmbassadorSection />
        <FeaturedSection />
        <UpcomingEvents />
        <PastEvents />
        <GlobalEvents />

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mt-24 pt-8 border-t border-cursor-border text-center"
        >
          <Partners />
          <p className="text-cursor-text-muted text-sm mb-3">{siteConfig.footerTagline || t('footer.madeWith')}</p>
          <div className="flex items-center justify-center gap-4">
            <a
              href={siteConfig.lumaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cursor-text hover:text-cursor-text-muted transition-colors text-sm"
            >
              {t('footer.allEvents')}
            </a>
            <span className="text-cursor-text-faint">·</span>
            <a
              href={siteConfig.cursorCommunityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cursor-text hover:text-cursor-text-muted transition-colors text-sm"
            >
              {t('footer.community')}
            </a>
          </div>
        </motion.footer>
      </div>
    </main>
  )
}

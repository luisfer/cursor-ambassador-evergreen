'use client'

import { siteConfig } from '@/content/site.config'
import { useI18n } from '@/lib/i18n'

export default function LanguageToggle() {
  const { locale, setLocale } = useI18n()

  if (siteConfig.locales.length <= 1) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      {siteConfig.locales.map((localeCode) => (
        <button
          key={localeCode}
          onClick={() => setLocale(localeCode)}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            locale === localeCode
              ? 'bg-cursor-text text-cursor-bg'
              : 'text-cursor-text-muted hover:text-cursor-text'
          }`}
        >
          {localeCode.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

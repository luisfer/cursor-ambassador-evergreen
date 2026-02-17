'use client'

import { useState } from 'react'
import { Copy, Check, PenLine } from 'lucide-react'

interface PromptBlockProps {
  prompt: string
  label?: string
}

export default function PromptBlock({ prompt, label = 'Try this in Cursor' }: PromptBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy prompt', error)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-cursor-accent-blue text-sm font-medium">
        <PenLine className="w-4 h-4" />
        <span>{label}</span>
      </div>
      <div className="relative group">
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 rounded bg-cursor-surface-raised hover:bg-cursor-surface text-cursor-text-muted hover:text-cursor-text transition-opacity opacity-0 group-hover:opacity-100 z-10"
          aria-label="Copy prompt"
        >
          {copied ? <Check className="w-5 h-5 text-cursor-accent-green" /> : <Copy className="w-5 h-5" />}
        </button>
        <pre className="bg-cursor-accent-blue-bg border border-cursor-border-emphasis p-6 rounded-md overflow-x-auto">
          <code className="text-base md:text-lg font-mono text-cursor-text-secondary whitespace-pre-wrap">{prompt}</code>
        </pre>
      </div>
    </div>
  )
}

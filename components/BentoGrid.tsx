'use client'

import Image from 'next/image'
import { HeaderPhoto } from '@/lib/types'

type BentoGridProps = {
  photos: HeaderPhoto[]
  cols?: number
  rows?: number
  mobileCols?: number
  mobileRows?: number
  gapClassName?: string
}

function toGridPlacement(start: number, span?: number) {
  return `${start} / span ${span ?? 1}`
}

function getSizes(colSpan: number, cols: number, fallback = 100) {
  const ratio = Math.min(1, Math.max(colSpan / cols, 0))
  return `${Math.round(ratio * fallback)}vw`
}

export default function BentoGrid({
  photos,
  cols = 4,
  rows = 4,
  mobileCols = 2,
  mobileRows = 4,
  gapClassName = 'gap-1',
}: BentoGridProps) {
  return (
    <>
      <div
        className={`grid md:hidden h-full ${gapClassName}`}
        style={{
          gridTemplateColumns: `repeat(${mobileCols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${mobileRows}, minmax(0, 1fr))`,
        }}
      >
        {photos.map((photo, index) => {
          if (photo.mobileHidden) return null

          const mobile = photo.mobile ?? {
            row: photo.row,
            col: photo.col,
            rowSpan: photo.rowSpan,
            colSpan: photo.colSpan,
          }

          return (
            <div
              key={`mobile-${index}`}
              className="relative overflow-hidden"
              style={{
                gridRow: toGridPlacement(mobile.row, mobile.rowSpan),
                gridColumn: toGridPlacement(mobile.col, mobile.colSpan),
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes={getSizes(mobile.colSpan ?? 1, mobileCols)}
                priority={index < 4}
              />
            </div>
          )
        })}
      </div>

      <div
        className={`hidden md:grid h-full ${gapClassName}`}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {photos.map((photo, index) => (
          <div
            key={`desktop-${index}`}
            className="relative overflow-hidden"
            style={{
              gridRow: toGridPlacement(photo.row, photo.rowSpan),
              gridColumn: toGridPlacement(photo.col, photo.colSpan),
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes={getSizes(photo.colSpan ?? 1, cols)}
              priority={index < 4}
            />
          </div>
        ))}
      </div>
    </>
  )
}

# Slides Engine (Optional)

This folder contains a reusable slide engine for workshop sessions.

## How to use

1. Create a slide deck file in `modules/slides/content/`.
2. Export an array of slides matching `Slide` from `modules/slides/types.ts`.
3. Point `app/slides/[id]/page.tsx` to your deck.

## Components

- `SlideLayout.tsx` - keyboard and button navigation
- `SlideContent.tsx` - slide content renderer
- `CodeBlock.tsx` - copyable code blocks
- `PromptBlock.tsx` - copyable prompt blocks
- `DiagramSlide.tsx` - inline SVG diagram renderer

Ambassadors can skip this module entirely if they only need the community website pages.

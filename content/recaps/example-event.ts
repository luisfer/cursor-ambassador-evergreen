import { RecapData } from '@/lib/types'

// REPLACE: Copy this file, rename the slug, and replace all sample recap content.
export const exampleEventRecap: RecapData = {
  slug: 'example-event',
  title: 'Cafe Cursor YourCity - Recap',
  date: 'February 14, 2026',
  attendees: 38,
  summary: [
    'Builders joined for a collaborative, practical day of AI-assisted development with Cursor.',
    'People shared workflows, paired on projects, and exchanged tips that can be reused by future communities.',
  ],
  host: {
    name: 'Host Venue',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=200&auto=format&fit=crop',
    url: 'https://example.com/venue',
  },
  photoCredits: [
    { name: 'Community Volunteer' },
    { name: 'Photo Partner', url: 'https://example.com/' },
  ],
  photos: [
    {
      src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
      alt: 'Community members coding together',
    },
    {
      src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
      alt: 'Event attendees during workshop',
    },
    {
      src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
      alt: 'Organizer speaking to participants',
    },
  ],
}

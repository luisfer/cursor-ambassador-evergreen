import { CursorEvent } from '@/lib/types'

// REPLACE: Replace all sample events, locations, and Luma URLs with real community events.
export const events: CursorEvent[] = [
  {
    id: 'cafe-cursor-example-1',
    title: 'Cafe Cursor YourCity',
    date: '2026-03-21',
    displayDate: 'March 21, 2026',
    location: 'Your City, Your Country',
    lumaUrl: 'https://lu.ma/example-event-1',
    status: 'upcoming',
  },
  {
    id: 'cursor-seminar-yourcity',
    title: 'Cursor Seminar YourCity',
    date: '2026-02-14',
    displayDate: 'February 14, 2026',
    attendees: 38,
    location: 'Your City, Your Country',
    recapPath: '/recaps/example-event',
    thumbnail: '/images/events/cursor-event-01.jpg',
    status: 'past',
  },
]

export const upcomingEvents = events.filter((event) => event.status === 'upcoming')
export const pastEvents = events.filter((event) => event.status === 'past')

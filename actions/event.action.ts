import { db } from '@/lib/db'
import {event, user } from '@/lib/schema'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
export async function createEvent(title: string, description: string, location: string, datetime: Date, link: string | null, creatorId: string) {
  await db.insert(event).values({
    title,
    description,
    location,
    datetime,
    link,
    creatorId,
  })
  revalidatePath('/events')
}

export async function getEvents() {
  return db.query.event.findMany({
    orderBy: [desc(event.datetime)],
    with: {
      creator: true,
    },
  })
}

export async function getEvent(id: string) {
  const eventData = await db.query.event.findFirst({
    where: eq(event.id, id),
    with: {
      creator: true,
    },
  })
  if (!eventData) {
    throw new Error('Event not found')
  }
  return eventData
}

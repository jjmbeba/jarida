import type { Id } from 'convex/_generated/dataModel';
import z from 'zod';

export const entrySchema = z.object({
  id: z.custom<Id<'entries'>>(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.array(z.object({ id: z.string(), text: z.string() })),
});

export const createEntrySchema = entrySchema.omit({ id: true });

import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  tags: defineTable({
    name: v.string(),
    userId: v.string(),
  }),
  entries: defineTable({
    userId: v.string(),
    title: v.string(),
    content: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    tags: v.array(v.string()),
    encrypted: v.boolean(),
  }),
});

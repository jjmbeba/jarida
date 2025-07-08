import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const listEntries = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    return await ctx.db
      .query('entries')
      .filter((q) => q.eq(q.field('userId'), identity.subject))
      .collect();
  },
});

export const createEntry = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    return await ctx.db.insert('entries', {
      title: args.title,
      content: args.content,
      userId: identity.subject,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tags: [],
      encrypted: false,
    });
  },
});

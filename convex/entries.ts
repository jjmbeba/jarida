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

export const getEntry = query({
  args: {
    id: v.id('entries'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const entry = await ctx.db
      .query('entries')
      .withIndex('by_id', (q) => q.eq('_id', args.id))
      .filter((q) => q.eq(q.field('userId'), identity.subject))
      .first();

    if (!entry) {
      throw new Error('Entry not found');
    }

    return entry;
  },
});

export const updateEntry = mutation({
  args: {
    id: v.id('entries'),
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const entry = await ctx.db.get(args.id);

    if (!entry) {
      throw new Error('Entry not found');
    }

    if (entry.userId !== identity.subject) {
      throw new Error('Unauthorized');
    }

    return await ctx.db.patch(args.id, {
      title: args.title,
      content: args.content,
      updatedAt: Date.now(),
    });
  },
});

export const deleteEntry = mutation({
  args: {
    id: v.id('entries'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const entry = await ctx.db.get(args.id);

    if (!entry) {
      throw new Error('Entry not found');
    }

    if (entry.userId !== identity.subject) {
      throw new Error('Unauthorized');
    }

    return await ctx.db.delete(args.id);
  },
});

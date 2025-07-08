import { query } from './_generated/server';

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

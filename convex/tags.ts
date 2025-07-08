import { query } from './_generated/server';

export const listTags = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    return await ctx.db
      .query('tags')
      .filter((q) => q.eq(q.field('userId'), identity.subject))
      .collect();
  },
});

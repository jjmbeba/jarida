import { getAuth } from '@clerk/tanstack-react-start/server';
import { createServerFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';

export const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(
  async () => {
    const request = getWebRequest();

    if (!request) {
      return {
        userId: null,
      };
    }

    const { userId, getToken } = await getAuth(request);
    const token = await getToken({ template: 'convex' });

    return {
      userId,
      token,
    };
  }
);

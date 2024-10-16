import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    

    // Continue to the requested route
    const response = await resolve(event);

    return response;
};

// src/composables/use-auth.ts
import { createAuth0Client, Auth0Client } from '@auth0/auth0-spa-js';

let auth0Client: Auth0Client;

/**
 * Initializes the Auth0 client
 */
export async function initAuth0(): Promise<void> {
  auth0Client = await createAuth0Client({
    domain: import.meta.env.VITE_AUTH0_DOMAIN!,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID!,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    },
  });
}

/**
 * Returns the Auth0 client instance (must be called after initAuth0)
 */
export function getAuth0Client(): Auth0Client {
  if (!auth0Client) {
    throw new Error('Auth0 client has not been initialized. Call initAuth0() first.');
  }
  return auth0Client;
}

// src/composables/use-auth.ts

import { ref } from 'vue';
import { createAuth0Client } from '@auth0/auth0-spa-js';
import type { Auth0Client, User } from '@auth0/auth0-spa-js';

let auth0Client: Auth0Client;

/**
 * Indicates whether the user is authenticated.
 */
export const isAuthenticated = ref(false);

/**
 * The authenticated user's profile information, or `null` if not logged in.
 */
export const user = ref<User | null>(null);

// Track whether Auth0 has been initialized
let auth0Ready: Promise<void>;
let resolveAuth0Ready: () => void;

auth0Ready = new Promise((resolve) => {
  resolveAuth0Ready = resolve;
});

/**
 * Initializes the Auth0 client and processes login redirect callback if needed.
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

  // Handle redirect after Auth0 login
  if (
    window.location.search.includes('code=') &&
    window.location.search.includes('state=')
  ) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, '/');
  }

  isAuthenticated.value = await auth0Client.isAuthenticated();

  if (isAuthenticated.value) {
    user.value = (await auth0Client.getUser()) ?? null;
  }

  resolveAuth0Ready(); // ✅ Mark client as ready
}

/**
 * Initiates the login flow using Auth0.
 *
 * @returns A promise that resolves when the redirect occurs.
 */
export async function login(): Promise<void> {
  await auth0Ready;
  await auth0Client.loginWithRedirect();
}

/**
 * Logs the user out and redirects them back to the homepage.
 *
 * @returns A promise that resolves after the logout redirect occurs.
 */
export async function logout(): Promise<void> {
  await auth0Ready;
  auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });
}

/**
 * Retrieves a valid access token from Auth0 silently.
 *
 * @returns A promise that resolves to the access token, or `null` if retrieval fails.
 */
export async function getAccessToken(): Promise<string | null> {
  await auth0Ready;

  try {
    return await auth0Client.getTokenSilently();
  } catch (err) {
    console.warn('Failed to get access token:', err);
    return null;
  }
}

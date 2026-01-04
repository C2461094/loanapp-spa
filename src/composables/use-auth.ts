// src/composables/use-auth.ts
import { ref } from 'vue';
import { createAuth0Client } from '@auth0/auth0-spa-js';
import type { Auth0Client, User } from '@auth0/auth0-spa-js';

let auth0Client: Auth0Client;

// Reactive state
export const isAuthenticated = ref(false);
export const user = ref<User | null>(null);

// Track whether Auth0 has been initialized
let auth0Ready: Promise<void>;
let resolveAuth0Ready: () => void;
auth0Ready = new Promise((resolve) => {
  resolveAuth0Ready = resolve;
});

export async function initAuth0(): Promise<void> {
  auth0Client = await createAuth0Client({
    domain: import.meta.env.VITE_AUTH0_DOMAIN!,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID!,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    },
  });

  // Handle redirect from Auth0 login
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

// Safe login method
export async function login(): Promise<void> {
  await auth0Ready;
  await auth0Client.loginWithRedirect();
}

// Safe logout method
export async function logout(): Promise<void> {
  await auth0Ready;
  auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });
}

// Safe access token fetcher
export async function getAccessToken(): Promise<string | null> {
  await auth0Ready;

  try {
    return await auth0Client.getTokenSilently();
  } catch (err) {
    console.warn('Failed to get access token:', err);
    return null;
  }
}

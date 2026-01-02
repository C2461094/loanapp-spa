// src/composables/use-auth.ts
import { ref } from 'vue';
import { createAuth0Client } from '@auth0/auth0-spa-js';
import type { Auth0Client, User } from '@auth0/auth0-spa-js';

let auth0Client: Auth0Client;

//Reactive state (this is what you were missing earlier)
export const isAuthenticated = ref(false);
export const user = ref<User | null>(null);

export async function initAuth0(): Promise<void> {
  auth0Client = await createAuth0Client({
    domain: import.meta.env.VITE_AUTH0_DOMAIN!,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID!,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    },
  });

  //Handle Auth0 redirect after login
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
}

export async function login(): Promise<void> {
  await auth0Client.loginWithRedirect();
}

export function logout(): void {
  auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });
}

export async function getAccessToken(): Promise<string | null> {
  try {
    return await auth0Client.getTokenSilently();
  } catch {
    return null;
  }
}

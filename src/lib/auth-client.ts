"use client";

import { organizationClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { toast } from 'sonner';

export const authClient = createAuthClient({
  plugins: [organizationClient()],
  fetchOptions: {
    onSuccess: (ctx) => {
      console.log('Auth operation succeeded:', ctx);
    },
    onError: (ctx) => {
      console.error('Auth operation failed:', ctx.error);
      toast.error(ctx.error.message);
    },
  },
});

console.log('Auth client initialized');

export const { useSession, signOut, signIn, signUp } = authClient;

// Update type annotations to access email authentication methods
const originalSignIn = signIn.social;
const originalSignOut = signOut;
const originalSignUp = signUp.email;

// Update parameter types to match email authentication signature
export const signInWithLogging = (
  ...args: Parameters<typeof originalSignIn>
) => {
  console.log('Attempting sign in', { args });
  return originalSignIn(...args);
};

export const signOutWithLogging = (...args: Parameters<typeof originalSignOut>) => {
  console.log('Attempting sign out', { args });
  return originalSignOut(...args);
};

export const signUpWithLogging = (...args: Parameters<typeof originalSignUp>) => {
  console.log('Attempting sign up', { args });
  return originalSignUp(...args);
};

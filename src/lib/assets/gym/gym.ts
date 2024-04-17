// Imports the necessary objects/type from files/packages.
import { auth, googleProvider } from '$lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';
import { goto } from '$app/navigation';

// authStore manages the state (authentication state) a user is in by allowing a writable to be exported.
export const authStore = writable<{ user: User | null}> ({
    user: null  // Code like this sets a defualt to null.
})

// authHandlers is an exported object that adds the action(s) for a user's account to be logged in with Google (Auht) or signed out.
export const authHandlers = {
    logout: async () => {           // Method name.
        await auth.signOut();       // Asynchronously signs out the current user.
        goto('/');                  // Goto nothing.
    },
    loginWithGoogle: async () => {  // Method name.
        await signInWithPopup(auth, googleProvider); // Asynchronously signs in the user with a prompt (Google's).
        goto('/main');              // Goto main page.
    }
};
/**
 * Sets up Firebase authentication in a Svelte application by creating a writable store to 
 * manage authentication state (authStore) and defining functions to handle login and logout (authHandlers).
 * This file was called gyms at the beginning of the program and may need to be updated for a more complete understanding.
 * This occured because the mission of creating gyms was pivotted.
 * 
 * For more information on the help we recieved for the front-end and back-end, please see the README.
 */

import { auth, googleProvider } from '$lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';
import { goto } from '$app/navigation';

// Create a constant varibale that is exportable and will be used as a writeable store. Null unless otherwise. 
export const authStore = writable<{ user: User | null}> ({
    user: null
})

// Create a constant variable that is exportable.
export const authHandlers = {
    // Enables a feature for a user to logout. 
    logout: async () => {
        await auth.signOut();
        // Navigates to the defualt page (login page).
        goto('/');
    },
    // Enables a feature for a user to login.
    loginWithGoogle: async () => {
        await signInWithPopup(auth, googleProvider);
        // Navigate to the main page. 
        goto('/main');
    }
};
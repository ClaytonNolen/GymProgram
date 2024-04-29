<!-- This page is a file used to format the web apps pages with the user of a Navabr. -->
<script lang="ts">
    import { onMount } from 'svelte';
    import '../app.css';
    import Navbar from '../components/Navbar.svelte';
    import { authStore } from '$lib/assets/gym/gym';
    import type { User } from 'firebase/auth';
    import { auth } from '$lib/firebase';

// Executes the function called onMount which will update the authStore under certain conditions. 
onMount(() => {
  // Subscribe to changes in the authentication state using onAuthStateChanged.
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if(!user) {
      // Update the authStore with a null user if no user is authenticated.
      authStore.update(() => {
        return {
          user: null
        } 
      })
    } else {
      // Update the authStore with the authenticated user if a user is authenticated.
      authStore.update(() => {
        return {
          user: user
        } 
      })
    }
  })
  return unsubscribe;
})

  let currentUser: User | null;
  authStore.subscribe((value) => {
    // Update the currentUser variable with the current user's authentication state.
    currentUser = value.user;
  });
</script>

<!-- If currentuser is authorized/logged in display the web app as below. -->
<div>
  <!-- Subscribe to changes in the authentication state stored in authStore. -->
  {#if currentUser}
  <!-- Navbar is displayed up top. -->
      <Navbar />
  <!-- Default pages that our called below Navbar. -->
  {/if}
  <slot />
</div>
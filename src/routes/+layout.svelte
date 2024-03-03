<script lang="ts">
    import { onMount } from 'svelte';
    import '../app.css';
    import Navbar from '../components/Navbar.svelte';
    import { authStore } from '$lib/assets/gym/gym';
    import type { User } from 'firebase/auth';
    import { auth } from '$lib/firebase';

onMount(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if(!user) {
      authStore.update(() => {
        return {
          user: null
        } 
      })
    } else {
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
    currentUser = value.user;
  });
</script>

<div>
  {#if currentUser}
      <Navbar />
  {/if}
  <slot />
</div>
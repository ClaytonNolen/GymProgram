<script lang="ts">
    import { onMount } from 'svelte';
    import '../app.css';
    // @ts-ignore, This file is being shown in the browser.
    import Navbar from './Navbar.svelte';
    import { authStore } from '$lib/assets/gym/gym';
    import type { User } from 'firebase/auth';
    import { auth } from '$lib/firebase';

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
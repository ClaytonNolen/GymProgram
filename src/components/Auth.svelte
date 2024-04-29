<!-- Handles the authentication state when a user is authenticated, logged in or not. -->
<!-- Help From: https://fontawesome.com/icons to display the icon. -->
<!-- For more information on the help we recieved for the front-end and back-end, please see the README. -->
<!-- Author: Clayton Nolen -->
<!-- Last Modified: April 28, 2024 -->

<script lang="ts">
    import type { User } from 'firebase/auth';
    import { authStore, authHandlers } from '$lib/assets/gym/gym';
    import Main from "../../src/routes/main/+page.svelte";

    // Creates a currentUser object that if signed in, will assign the currentUser to the value.
    // authStore is called under a subscribe to obtain the currentUser's value.
     let currentUser : User | null
     authStore.subscribe((value) => {
        currentUser = value.user
    })
</script>

<!-- If the current user is logged in bring them to the main page. -->
{#if currentUser}
    <Main />
<!-- Else, bring the current user to the login page to be authenticated. -->
{:else}
    <main class="flex flex-col items-center justify-center">
        <div class="mt-12">
            <h1 class="text-2xl text-white font-bold">Login</h1>
            <!-- When the button is clicked the current user will be authenticated with Google's login popup. -->
            <button 
                on:click = { authHandlers.loginWithGoogle } 
                class="p-4 bg-cream rounded-lg mt-12 font-bold">
                <i class="fa-brands fa-google fa-xl" style="color: #FFD43B;"></i>
                Sign in with Google
            </button>
        <div/>
    </main>
{/if}
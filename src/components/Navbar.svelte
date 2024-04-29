<!-- In the routes/+layout.svelte file this file is called. Its purpose is to -->
<!-- be called and always displayed at the top of the page once a user is authenticated/logged in. -->
<!-- The navbars purpose is to help the user navigate to different pages as swiftly as possible. -->
<!-- For more information on the help we recieved for the front-end and back-end, please see the README. -->
<!-- Author: Clayton Nolen -->
<!-- Last Modified: April 28, 2024 -->

<script lang="ts">
    import type { User } from 'firebase/auth';
    import { authStore, authHandlers } from '$lib/assets/gym/gym';

    // Creates a currentUser object that if signed in, will assign the currentUser to the value.
    // authStore is called under a subscribe to obtain the currentUser's value.
    let currentUser : User | null
    authStore.subscribe((value) => {
        currentUser = value.user
    })
</script>

<header class="bg-secondary p-4 flex justify-between items-center text-cream">
    <h1 class="font-bold text-lg md:text-2xl tracking-widest">
        <!-- Uses the title of the web app as a button to go to the main page. -->
        <a href="/main"> The Gym Program </a>
    </h1>
    <!-- Links -->
    <div class="flex items-center space-x-10 font-semibold text-lg">
       <!-- Each of these set a title of each page. Once a title is sellected the user will go to the /page. -->
        <a href="/SUInfo"> ROB GYM </a>

        <a href="/create" > CREATE </a>

        <a href="/profile" > PROGRESS </a>

        <a href="/tracker" > TRACKER </a>

    </div>

    <!-- User/Logout -->
    {#if currentUser}
        <div class="items-center space-x-2 hidden xl:inline-flex">
            <!-- Display the currentUser's image associated with their gmail account. -->
            <!-- Display the currentUser's name assciated with their gmail account if their picture does not work. -->
            <img src={currentUser?.photoURL}
            alt={currentUser?.displayName} 
            class="rounded-full h-12 w-12"
            />
            <div class="flex flex-col">
                <!-- Display the currentUser's name assciated with their gmail account. -->
                <p><span class="text-sugold italic font-bold">{currentUser?.displayName}</span></p>
            </div>
            <!-- Logout button. Once pressed the current user is logged out and no longer authenticated. -->
            <button
            on:click={authHandlers.logout} 
            class="bg-cream p-2 rounded-full text-secondary">
            LOG OUT
        </button>
        </div>
    {/if}
</header>
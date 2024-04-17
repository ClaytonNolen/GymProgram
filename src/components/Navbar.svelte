<!-- Navbar.svelte | Last Modified: April 16, 2024 | Author: Clayton Nolen -->

<!-- Is the backend and front in for the navigation bar at the top of the web app. This bar is present at ever page and helps the user easily navigate to different page and features. -->
<!-- This process requires help from other reasources and are listed below: -->
    <!-- Guided video for the set up of our websites skeleton and understanding of JS/Svelte: https://www.youtube.com/watch?v=fTsVYwxjyS4&t=379s. -->

<!-- SCRIPT --> 
<!-- Imports the necessary objects/type from files/packages. -->
<script lang="ts">
    import type { User } from 'firebase/auth';
    import { authStore, authHandlers } from '$lib/assets/gym/gym';

// Creates a variable that holds the value/id for the current user.
    let currentUser : User | null
    authStore.subscribe((value) => {
        currentUser = value.user
    })
</script>

<!-- SVELTE --> 
<!-- Constructs the front end of the web page. -->
<header class="bg-secondary p-4 flex justify-between items-center text-white">
    <h1 class="font-bold text-sm md:text-2xl tracking-widest">The Gym Program</h1>

    <!-- Pages binded to a string that is listed on the navbar. -->
    <div class="flex items-center space-x-10 font-semibold">
        <!-- "/" binds where to go when the STRING is selected. -->
        <a href="/main" > MAIN </a>
        
        <a href="/SUInfo" > ROB GYM </a>

        <a href="/create" > CREATE </a>

        <a href="/profile" > PROFILE </a>

        <a href="/test" > TEST </a>
    </div>

    <!-- Adds the current user's information and a logout button. -->
    {#if currentUser}
        <div class="items-center space-x-2 hidden xl:inline-flex">
            <img src={currentUser?.photoURL}
            alt={currentUser?.displayName} 
            class="rounded-full h-10 w-10"
            />
            <div class="flex flex-col">
                <p>Logged In as: <span class="text-purple-500 italic font-bold">{currentUser?.displayName}</span> </p>
            </div>

            <!-- Was used for debugging. -->
            <!-- <div class="flex flex-col">
                <p>TEST <span class="text-purple-500 italic font-bold">{currentUser?.uid}</span> </p>
            </div> -->

            <!-- Creates a button that when clicked logs the current user out. When called the user is brought to the login in page. -->
            <!-- This method requires users to use a google account, which every SU student has, and helps when working with Google's Firebase. -->
            <!-- The object authHandlers is the actions, or "handling", of a user loging in with Google or logging out. -->
            <button 
                on:click={authHandlers.logout}
                class="bg-white p-2 rounded-full text-black">
                LOG OUT
            </button>
        </div>
    {/if}
</header>
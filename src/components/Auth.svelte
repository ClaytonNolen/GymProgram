<!-- Auth.svelte | Last Modified: April 16, 2024 | Author: Clayton Nolen -->

<!-- Is the front and backend for the authentication of users signing in or logining in. Other backend help found and connected to this file in src/app.html. -->
<!-- This process requires help from other reasources and are listed below: -->
    <!-- For Google Button ICON: https://fontawesome.com/icons -->
    <!-- Guided video for the set up of our websites skeleton and understanding of JS/Svelte: https://www.youtube.com/watch?v=fTsVYwxjyS4&t=379s. -->

<!-- SCRIPT --> 
<!-- Imports the necessary objects/type from files/packages. -->
<script lang="ts">
    import type { User } from 'firebase/auth';
    import { authStore, authHandlers } from '$lib/assets/gym/gym';
	import { goto } from "$app/navigation";
    import picName from '$lib/assets/Rob Center.png';

    // Creates a variable that holds the value/id for the current user.
    let currentUser : User | null
    authStore.subscribe((value) => {
        currentUser = value.user
    })
</script>

<!-- SVELTE -->
<!-- Checks if there exist a current user (if there is a user logged in). -->
{#if currentUser}
<!-- WARNING THIS IS DUPLICATED CODE FROM MAIN. -->
<main>
    <div class="flex justify-center items-center h-screen"> <!-- Sets horizontal and vertical alignment, center, for everything under itself. -->
        <div class="text-center">   <!-- Set text to center. -->
            <img src={picName} alt="logo" class=" mx-auto w-1/2 lg:w-1/2 mb-8" />   <!-- Display image from object, {picName}, with deminsions.-->
            <h1 class="text-[40px] font-bold text-white lg:w-[710px]"> <!-- Title. -->
                Welcome to The Gym Program
            </h1>
            <p class= "text-[20px] text-white lg:w-[710px] mt-4"> <!-- Description of the web app. -->
                Here, you can track your workouts at the Robertson Center, or create your own gym that can keep track of additional workouts
            </p>
            <div class="flex flex-col px-10 sm:flex-row mt-20 gap-14">
                <!--Creates buttons with their own label and navigate to different pages with "on:click". -->
                <button 
                    on:click={() => goto("/create")} 
                    class="py-[23px] px-[86px] bg-black text-xl text-white w-[299px] hover:bg-white hover:text-black duration-300 transittion-colors">
                    CREATE
                </button>
                <button 
                    on:click={() => goto("/eventlist")}
                    class="py-[23px] px-[86px] bg-black text-xl text-white w-[299px] hover:bg-white hover:text-black duration-300 transittion-colors">
                    Track Your Progress
                </button>
            </div>
        </div>
    </div>
</main>
<!-- END OF COPIED. -->

<!-- Checks if a user does not exist (no user is logged in). -->
{:else}
    <main class="flex flex-col items-center justify-center">
        <div class="mt-12">
            <h1 class="text-2xl text-white font-bold">Login</h1>
            <!-- Creates a button that when clicked calls a Google feature. When called a window made by google will prompt the new user to sign in. -->
            <!-- This method requires users to use a google account, which every SU student has, and helps when working with Google's Firebase. -->
            <!-- The object authHandlers is the actions, or "handling", of a user loging in with Google or logging out. -->
            <button
                on:click = { authHandlers.loginWithGoogle } class="p-4 bg-white rounded-lg mt-12 font-bold">
                <i class="fa-brands fa-google fa-xl" style="color: #FFD43B;"></i>
                Sign In with Google
            </button>
        <div/>
    </main>
{/if}
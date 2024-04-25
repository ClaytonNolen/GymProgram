<script lang="ts">
    import type { User } from 'firebase/auth';
    import { authStore, authHandlers } from '$lib/assets/gym/gym';

    let currentUser : User | null
    authStore.subscribe((value) => {
        currentUser = value.user
    })
</script>

<header class="p-4 flex justify-between items-center text-black">
    <h1 class="font-bold text-lg md:text-2xl tracking-widest">
        <a href="/main"> The Gym Program </a>
    </h1>
    <!-- Links -->
    <div class="flex items-center space-x-10 font-semibold text-lg">
       <!-- <a href="/main" > MAIN </a> -->
        <a href="/SUInfo"> ROB GYM </a>

        <a href="/create" > CREATE </a>

        <a href="/profile" > PROGRESS </a>

        <a href="/tracker" > TRACKER </a>

    </div>

    <!-- User/Logout -->
    {#if currentUser}
        <div class="items-center space-x-2 hidden xl:inline-flex">
            <img src={currentUser?.photoURL}
            alt={currentUser?.displayName} 
            class="rounded-full h-12 w-12"
            />
            <div class="flex flex-col">
                <p><span class="text-purple-500 italic font-bold">{currentUser?.displayName}</span></p>
            </div>
            <button on:click={authHandlers.logout} class="bg-black p-2 rounded-full text-white font-bold">LOG OUT</button>
        </div>
    {/if}
</header>

<style>
    header {
        background-color: #FFCD00;
    }
</style>
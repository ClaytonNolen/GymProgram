<script lang="ts">
    import type { User } from 'firebase/auth';
    import { authStore, authHandlers } from '$lib/assets/gym/gym';

    let currentUser : User | null
    authStore.subscribe((value) => {
        currentUser = value.user
    })
</script>

<header class="bg-secondary p-4 flex justify-between items-center text-white">
    <h1 class="font-bold text-sm md:text-2xl tracking-widest">The Gym Program</h1>
    <!-- Links -->
    <div class="flex items-center space-x-3 font-semibold">
        <a href="/main" > MAIN </a>

        <a href="/eventlist" > GYMS </a>

        <a href="/create" > CREATE </a>

        <a href="/profile" > PROFILE </a>
    </div>

    <!-- User/Logout -->
    {#if currentUser}
        <div class="items-center space-x-2 hidden xl:inline-flex">
            <img src={currentUser?.photoURL}
            alt={currentUser?.displayName} 
            class="rounded-full h-10 w-10"
            />
            <div class="flex flex-col">
                <p>Logged In as: <span class="text-purple-500 italic font-bold">{currentUser?.displayName}</span> </p>
            </div>
            <button on:click={authHandlers.logout} class="bg-white p-2 rounded-full text-black">LOG OUT</button>
        </div>
    {/if}
</header>
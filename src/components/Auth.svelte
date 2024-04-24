<!-- For Button ICON: https://fontawesome.com/icons -->

<script lang="ts">
    import type { User } from 'firebase/auth';
    import { authStore, authHandlers } from '$lib/assets/gym/gym';
	import { goto } from "$app/navigation";
    import picName from '$lib/assets/Rob Center.png';
    import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
    import Main from "../../src/routes/main/+page.svelte";

   
    // let workouts = [];
     let currentUser : User | null
     authStore.subscribe((value) => {
         currentUser = value.user

    })
</script>

{#if currentUser}
    <Main />

{:else}
    <main class="flex flex-col items-center justify-center">
        <div class="mt-12">
            <h1 class="text-2xl text-white font-bold">Login</h1>
            <button on:click = { authHandlers.loginWithGoogle } class="p-4 bg-white rounded-lg mt-12 font-bold">
                <i class="fa-brands fa-google fa-xl" style="color: #FFD43B;"></i>
                Sign In with Google
            </button>
        <div/>
    </main>
{/if}
<script lang="ts">
    import { goto } from "$app/navigation";
    import { doc, setDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import { authStore } from '$lib/assets/gym/gym'; // Importing only authStore from auth module
	import type { User } from "@firebase/auth";
	import { onDestroy } from "svelte";

    let testStr: string;
    let loading = false;
    let currentUser : User | null = null; // Initialize currentUser to null to avoid undefined errors

    // Subscribe to authStore to get current user
    const unsubscribe = authStore.subscribe((value) => {
        currentUser = value.user;
    });

    // Unsubscribe from authStore when component is destroyed to avoid memory leaks
    onDestroy(() => {
        unsubscribe();
    });

    async function createTest() {
        if (!currentUser) {
            return alert('User not logged in');
        }

        if (!testStr) {
            return alert('The field cannot be empty');
        }

        loading = true;

        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await setDoc(userDocRef, { testStr }, { merge: true });
            goto('/main'); // Assuming this is where you want to navigate after successful upload
        } catch (error) {
            console.error('Error occurred while creating a document', error);
        }

        loading = false;
    }
</script>

<main>
        <!--Main Page - template for page with tailwind css code is from https://www.youtube.com/watch?v=fTsVYwxjyS4-->
    <div class="flex justify-center items-center h-screen"> 
        <div class="text-center"> 
            <h1 class="text-center text-[40px] font-bold text-white lg:w-[710px]"> <!--Title-->
                TESTING: UID AND GRAPHS
            </h1>

            <div>
                <!-- input box -->
                <div class="max-w-4xl mx-auto bg-secondary rounded-lg flex flex-col p-5">
                    <h1 class="text-center text-white text-2xl">INPUT HERE</h1>
                    <!-- Gym Name -->
                    <div class="flex flex-col my-4">
                        <label for="testStr">INPUT 1</label>
                        <input 
                            id="testStr" 
                            type="text"
                            bind:value={testStr}
                            placeholder="placeholder"
                            class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                        />
                    </div>
            <div class="text-center gap-14">
                <!--Buttons and how they are navigated to different pages with "on:click"-->
                <button 
                id="submit"
                disabled={loading}
                on:click={createTest}
                class="py-[23px] px-[86px] bg-black text-xl text-white w-[299px] hover:bg-white hover:text-black duration-300 transittion-colors">
                {loading ? 'Uploading Test' : 'Upload Complete'} CLICK 
            </button>
            </div>
        </div>
    </div>
</main>
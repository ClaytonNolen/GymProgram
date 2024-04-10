<script lang="ts">
    import { goto } from "$app/navigation";
    import { doc, getDoc, setDoc } from 'firebase/firestore';
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

    // This was suggested by AI.
    // Unsubscribe from authStore when component is destroyed to avoid memory leaks
    onDestroy(() => {
        unsubscribe();
    });

    async function createTest() {
        if (!currentUser) {
            return alert('User not logged in');
        }
        
        // This trim was made with AI.
        if (!testStr.trim()) {
            return alert('Please enter some test data');
        }

        loading = true;

        // These If statements in the try {} was made with AI.
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            // Get the existing document data
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const existingData = docSnap.data().testInput || []; // If testInput doesn't exist, initialize as empty array
                const newData = [...existingData, testStr]; // Append the new input to the existing array
                await setDoc(userDocRef, { testInput: newData }, { merge: true }); // Update the document with the updated array
            } else {
                await setDoc(userDocRef, { testInput: [testStr] }); // If document doesn't exist, create it with the new input as the first element of the array
            }
            goto("/main"); // Should be changed to the Profile page.
        } catch (error) {
            console.error('Error occurred while creating a document', error);
            alert('An error occurred while uploading data. Please try again later.');
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
<script lang="ts">
    import { goto } from "$app/navigation";
    import { doc, getDoc, setDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import { authStore } from '$lib/assets/gym/gym'; // Importing only authStore from auth module
	import type { User } from "@firebase/auth";
	import { onDestroy } from "svelte";
    import { formatDate } from "../../helper/formatDate";

    let benchStr: string;
    let squatStr: string;
    let deadLiftStr: string;
    let powerCleanStr: string;

    export let benchDate: string;

    let loading = false;
    let currentUser : User | null = null; // Initialize currentUser to null to avoid undefined errors

    // Subscribe to authStore to get current user
    const unsubscribe = authStore.subscribe((value) => {
        currentUser = value.user;
    });

    // Suggested to have by A.I.
    // Unsubscribe from authStore when component is destroyed to avoid memory leaks
    onDestroy(() => {
        unsubscribe();
    });

    async function createBench() {
        if (!currentUser) {
            return alert('User not logged in');
        }
        
        // This trim was made with AI.
        if (!benchStr.trim()) {
            return alert('Please enter some test data');
        }

        loading = true;

        // These If statements in the try {} was made with AI.
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            // Get the existing document data
            const docSnap = await getDoc(userDocRef);
            // The If/Else statements below were created by A.I.
            if (docSnap.exists()) {
                const existingBenchData = docSnap.data().benchInput || []; // If benchInput doesn't exist, initialize as empty array.
                const existingBenchTime = docSnap.data().benchTimeInput || []

                const formattedBenchDateStr = formatDate(benchDate);
                const newBenchData = [...existingBenchData, benchStr]; // Append the new input to the existing array.
                const newBenchTime = [...existingBenchTime, formattedBenchDateStr];

                await setDoc(userDocRef, { benchInput: newBenchData }, { merge: true }); // Update the document with the updated array.
                await setDoc(userDocRef, { benchTimeInput: newBenchTime }, { merge: true });
            } else {
                const formattedBenchDateStr = formatDate(benchDate);
                await setDoc(userDocRef, { benchInput: [benchStr] }); // If document doesn't exist, create it with the new input as the first element of the array.
                await setDoc(userDocRef, { benchTimeInput: [formattedBenchDateStr] });
            }
            goto("/profile"); // Should be changed to the Profile page.
        } catch (error) {
            console.error('Error occurred while creating a document', error);
            alert('An error occurred while uploading data. Please try again later.');
        }
        loading = false;
    }

    async function createSquat() {
        if (!currentUser) {
            return alert('User not logged in');
        }
        
        // This trim was made with AI.
        if (!squatStr.trim()) {
            return alert('Please enter some test data');
        }

        loading = true;

        // These If statements in the try {} was made with AI.
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            // Get the existing document data
            const docSnap = await getDoc(userDocRef);
            // The If/Else statements below were created by A.I.
            if (docSnap.exists()) {
                // If benchInput doesn't exist, initialize as empty array.
                const existingSquatData = docSnap.data().squatInput || [];

                // Append the new input to the existing array.
                const newSquatData = [...existingSquatData, squatStr];

                // Update the document with the updated array.
                await setDoc(userDocRef, { squatInput: newSquatData }, { merge: true });

            } else {
                
                // If document doesn't exist, create it with the new input as the first element of the array.
                await setDoc(userDocRef, { squatInput: [squatStr] });

            }
            goto("/profile"); // Should be changed to the Profile page.
        } catch (error) {
            console.error('Error occurred while creating a document', error);
            alert('An error occurred while uploading data. Please try again later.');
        }
        loading = false;
    }

    async function createDeadLift() {
        if (!currentUser) {
            return alert('User not logged in');
        }
        
        // This trim was made with AI.
        if (!deadLiftStr.trim) {
            return alert('Please enter some test data');
        }

        loading = true;

        // These If statements in the try {} was made with AI.
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            // Get the existing document data
            const docSnap = await getDoc(userDocRef);
            // The If/Else statements below were created by A.I.
            if (docSnap.exists()) {
                // If benchInput doesn't exist, initialize as empty array.
                const existingDeadLiftData = docSnap.data().deadLiftInput || [];

                // Append the new input to the existing array.
                const newDeadLiftData = [...existingDeadLiftData, deadLiftStr];

                // Update the document with the updated array.
                await setDoc(userDocRef, { deadLiftInput: newDeadLiftData }, { merge: true });

            } else {  
                // If document doesn't exist, create it with the new input as the first element of the array.
                await setDoc(userDocRef, { deadLiftInput: [deadLiftStr] });

            }
            goto("/profile"); // Should be changed to the Profile page.
        } catch (error) {
            console.error('Error occurred while creating a document', error);
            alert('An error occurred while uploading data. Please try again later.');
        }
        loading = false;
    }

    async function createPowerClean() {
        if (!currentUser) {
            return alert('User not logged in');
        }
        
        // This trim was made with AI.
        if (!powerCleanStr.trim) {
            return alert('Please enter some test data');
        }

        loading = true;

        // These If statements in the try {} was made with AI.
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            // Get the existing document data
            const docSnap = await getDoc(userDocRef);
            // The If/Else statements below were created by A.I.
            if (docSnap.exists()) {

                const existingPowerCleanData = docSnap.data().powerCleanInput || []; // If benchInput doesn't exist, initialize as empty array.

                const newPowerCleanData = [...existingPowerCleanData, powerCleanStr]; // Append the new input to the existing array.


                await setDoc(userDocRef, { powerCleanInput: newPowerCleanData }, { merge: true }); // Update the document with the updated array.
            } else {
                await setDoc(userDocRef, { powerCleanInput: [powerCleanStr] }); // If document doesn't exist, create it with the new input as the first element of the array.

            }
            goto("/profile"); // Should be changed to the Profile page.
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
                    <h1 class="text-center text-white text-2xl">BENCH PRESS</h1>
                                    <!-- Workout Date -->
             <div class="flex flex-col my-4">
                <label for="workout-date">Workout Date</label>
                <input 
                    id="workout-date" 
                    type="date" 
                    bind:value={benchDate}
                    placeholder="Enter Date"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div>
                    <!-- Gym Name -->
                    <div class="flex flex-col my-4">
                        <label for="benchStr">BENCH PRESS ENTRY</label>
                        <input 
                            id="benchStr" 
                            type="text"
                            bind:value={benchStr}
                            placeholder="integers only"
                            class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                        />
                    </div>
            <div class="text-center gap-14">
                <!--Buttons and how they are navigated to different pages with "on:click"-->
            <button 
                id="submit"
                disabled={loading}
                on:click={createBench}
                class="py-[23px] px-[86px] bg-black text-xl text-white w-[299px] hover:bg-white hover:text-black duration-300 transittion-colors">
                {loading ? 'Uploading Test' : 'Upload Complete'} CLICK 
            </button>
            </div>
        </div>

</main>
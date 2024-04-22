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
    export let squatDate: string;
    export let deadLiftDate: string;
    export let powerCleanDate: string;

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

        
        // if there is no bench input for date, max weight, or both
        if(benchStr === undefined && benchDate === undefined) {
            return alert('Please enter the date and max weight of your bench press.');
        } else if (benchDate == undefined) {
            return alert('Please enter the date of your bench press.');
        } else if (benchStr == undefined) {
            return alert('Please enter the max weight of your bench press.');
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

        // if there is no squat input for date, max weight, or both
        if(squatStr === undefined && squatDate === undefined) {
            return alert('Please enter the date and max weight of your squat.');
        } else if (squatDate == undefined) {
            return alert('Please enter the date of your squat.');
        } else if (squatStr == undefined) {
            return alert('Please enter the max weight of your squat.');
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
                const existingSquatData = docSnap.data().squatInput || []; // If benchInput doesn't exist, initialize as empty array.
                const existingSquatTime = docSnap.data().squatTimeInput || []
                
                const formattedSquatDateStr = formatDate(squatDate);
                const newSquatData = [...existingSquatData, squatStr]; // Append the new input to the existing array.
                const newSquatTime = [...existingSquatTime, formattedSquatDateStr];
                
                // Update the document with the updated array.
                await setDoc(userDocRef, { squatInput: newSquatData }, { merge: true });
                await setDoc(userDocRef, { squatTimeInput: newSquatTime }, { merge: true });
            } else {
                const formattedSquatDateStr = formatDate(squatDate);
                await setDoc(userDocRef, { squatInput: [squatStr] }); // If document doesn't exist, create it with the new input as the first element of the array.
                await setDoc(userDocRef, { squatTimeInput: [formattedSquatDateStr] });
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

        // if there is no Deadlift input for date, max weight, or both
        if(deadLiftStr === undefined && deadLiftDate === undefined) {
            return alert('Please enter the date and max weight of your deadlift.');
        } else if (deadLiftDate == undefined) {
            return alert('Please enter the date of your deadlift.');
        } else if (deadLiftStr == undefined) {
            return alert('Please enter the max weight of your deadlift.');
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
                const existingDeadLiftData = docSnap.data().deadLiftInput || []; // If benchInput doesn't exist, initialize as empty array.
                const existingDeadLiftTime = docSnap.data().deadLiftTimeInput || [];

                const formattedDeadLiftDateStr = formatDate(deadLiftDate);
                const newDeadLiftData = [...existingDeadLiftData, deadLiftStr]; // Append the new input to the existing array.
                const newDeadLiftTime = [...existingDeadLiftTime, formattedDeadLiftDateStr];

                // Update the document with the updated array.
                await setDoc(userDocRef, { deadLiftInput: newDeadLiftData }, { merge: true });
                await setDoc(userDocRef, { deadLiftTimeInput: newDeadLiftTime }, { merge: true });
            } else { 
                const formattedDeadLiftDateStr = formatDate(deadLiftDate); 
                await setDoc(userDocRef, { deadLiftInput: [deadLiftStr] }); // If document doesn't exist, create it with the new input as the first element of the array.
                await setDoc(userDocRef, { deadLiftTimeInput: [formattedDeadLiftDateStr] });
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

        // if there is no power clean input for date, max weight, or both
        if(powerCleanStr === undefined && powerCleanDate === undefined) {
            return alert('Please enter the date and max weight of your power clean.');
        } else if (powerCleanDate == undefined) {
            return alert('Please enter the date of your power clean.');
        } else if (powerCleanStr == undefined) {
            return alert('Please enter the max weight of your power clean.');
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
                const existingPowerCleanTime = docSnap.data().powerCleanTimeInput || [];

                const formattedPowerCleanDateStr = formatDate(powerCleanDate);
                const newPowerCleanData = [...existingPowerCleanData, powerCleanStr]; // Append the new input to the existing array.
                const newPowerCleanTime = [...existingPowerCleanTime, formattedPowerCleanDateStr];

                await setDoc(userDocRef, { powerCleanInput: newPowerCleanData }, { merge: true }); // Update the document with the updated array.
                await setDoc(userDocRef, { powerCleanTimeInput: newPowerCleanTime}, { merge: true });
            } else {
                const formattedPowerCleanDateStr = formatDate(powerCleanDate);
                await setDoc(userDocRef, { powerCleanInput: [powerCleanStr] }); // If document doesn't exist, create it with the new input as the first element of the array.
                await setDoc(userDocRef, { powerCleanTimeInput: [formattedPowerCleanDateStr] });
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
    <div class="flex justify-center items-center"> 
        <div class="text-center"> 
            <h1 class="text-center text-[40px] font-bold text-white lg:w-[710px]"> <!--Title-->
                BENCHMARK ENTRY
            </h1>

            <div>
                <!-- input box -->
                <div class="max-w-4xl mx-auto bg-secondary rounded-lg flex flex-col p-5">
                    <h1 class="text-center text-white text-2xl">BENCH PRESS</h1>
                                    <!-- Workout Date -->
             <div class="flex flex-col my-4 text-white">
                <label for="workout-date">Workout Date</label>
                <input 
                    id="workout-date" 
                    type="date" 
                    bind:value={benchDate}
                    placeholder="Enter Date"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr text-white"
                />
            </div>
                    <!-- Gym Name -->
                    <div class="flex flex-col my-4 text-white">
                        <label for="benchStr">BENCH MAX WEIGHT</label>
                        <input
                            id="benchStr" 
                            type="text" 
                            bind:value={benchStr}
                            placeholder="integers only"
                            class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr text-white placeholder-white"
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
        <div>
            <!-- input box -->
            <div class="max-w-4xl mx-auto bg-secondary rounded-lg flex flex-col p-5 text-white">
                <h1 class="text-center text-white text-2xl">SQUAT</h1>
            <!-- Workout Date -->
             <div class="flex flex-col my-4">
                <label for="workout-date">Workout Date</label>
                <input 
                    id="workout-date" 
                    type="date" 
                    bind:value={squatDate}
                    placeholder="Enter Date"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
                <!-- Gym Name -->
                <div class="flex flex-col my-4">
                    <label for="squatStr">SQUAT ENTRY</label>
                    <input 
                        id="squarStr" 
                        type="text"
                        bind:value={squatStr}
                        placeholder="integers only"
                        class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr text-white placeholder-white"
                    />
                </div>
        <div class="text-center gap-14">
            <!--Buttons and how they are navigated to different pages with "on:click"-->
        <button 
            id="submit"
            disabled={loading}
            on:click={createSquat}
            class="py-[23px] px-[86px] bg-black text-xl text-white w-[299px] hover:bg-white hover:text-black duration-300 transittion-colors">
            {loading ? 'Uploading Test' : 'Upload Complete'} CLICK 
        </button>
        </div>
        <div>
            <!-- input box -->
            <div class="max-w-4xl mx-auto bg-secondary rounded-lg flex flex-col p-5">
                <h1 class="text-center text-white text-2xl">DEAD LIFT</h1>
            <!-- Workout Date -->
             <div class="flex flex-col my-4">
                <label for="workout-date">Workout Date</label>
                <input 
                    id="workout-date" 
                    type="date" 
                    bind:value={deadLiftDate}
                    placeholder="Enter Date"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
                <!-- Gym Name -->
                <div class="flex flex-col my-4">
                    <label for="deadLiftStr">DEAD LIFT ENTRY</label>
                    <input 
                        id="deadLiftStr" 
                        type="text"
                        bind:value={deadLiftStr}
                        placeholder="integers only"
                        class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr text-white placeholder-white"
                    />
                </div>
        <div class="text-center gap-14">
            <!--Buttons and how they are navigated to different pages with "on:click"-->
        <button 
            id="submit"
            disabled={loading}
            on:click={createDeadLift}
            class="py-[23px] px-[86px] bg-black text-xl text-white w-[299px] hover:bg-white hover:text-black duration-300 transittion-colors">
            {loading ? 'Uploading Test' : 'Upload Complete'} CLICK 
        </button>
        </div>
    </div>
    <div>
            <!-- input box -->
            <div class="max-w-4xl mx-auto bg-secondary rounded-lg flex flex-col p-5">
                <h1 class="text-center text-white text-2xl">POWER CLEAN</h1>
            <!-- Workout Date -->
             <div class="flex flex-col my-4">
                <label for="workout-date">Workout Date</label>
                <input 
                    id="workout-date" 
                    type="date" 
                    bind:value={powerCleanDate}
                    placeholder="Enter Date"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
                    <!-- Gym Name -->
                    <div class="flex flex-col my-4">
                        <label for="benchStr">POWER CLEAN ENTRY</label>
                        <input 
                            id="benchStr" 
                            type="text"
                            bind:value={powerCleanStr}
                            placeholder="integers only"
                            class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr text-white placeholder-white"
                        />
                    </div>
            <div class="text-center gap-14">
                <!--Buttons and how they are navigated to different pages with "on:click"-->
            <button 
                id="submit"
                disabled={loading}
                on:click={createPowerClean}
                class="py-[23px] px-[86px] bg-black text-xl text-white w-[299px] hover:bg-white hover:text-black duration-300 transittion-colors">
                {loading ? 'Uploading Test' : 'Upload Complete'} CLICK 
            </button>
            </div>
        </div>
</main>
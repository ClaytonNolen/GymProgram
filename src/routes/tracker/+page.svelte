<script lang="ts">
    import { goto } from "$app/navigation";
    import { doc, getDoc, setDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import { authStore } from '$lib/assets/gym/gym'; // Importing only authStore from auth module
	import type { User } from "@firebase/auth";
	import { onDestroy } from "svelte";
    import { formatDate } from "../../helper/formatDate";
    import { wholeCheck } from "../../helper/wholeCheck";

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

    
    // Creating function to check for a whole number
    // async function checkWhole() {}
    
    async function createBench() {
        if (!currentUser) {
            return alert('User not logged in');
        }


        // if there is no bench input for date, max weight, or both
        // This trim was made with AI. 
        // .trim accounts for when a user deletes an input  or in an empty text box and tries to submit.
        if(benchStr === undefined && benchDate === undefined) {
            return alert('Please enter the date and max weight of your bench press.');
        } else if (benchDate == undefined || !benchDate.trim()) {
            return alert('Please enter the date of your bench press.');
        } else if (benchStr == undefined || !benchStr.trim()) {
            return alert('Please enter the max weight of your bench press.');
        }

        // Check if entered string is a positive integer.
        // Stops the input and informs user if data input is invalid.
        if (!(wholeCheck(benchStr))) {
            return alert('Please enter a positive integer for the max weight.');
        }

        loading = true;

        // These If statements in the try {} was made with AI.
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            // Get the existing document data
            const docSnap = await getDoc(userDocRef);
            // The If/Else statements below were created by A.I.
            if (docSnap.exists()) {
                // If benchInput does exist, initialize as empty array.
                const existingBenchData = docSnap.data().benchInput || [];
                const existingBenchTime = docSnap.data().benchTimeInput || [];

                // Append the new input to the existing array.
                const formattedBenchDateStr = formatDate(benchDate);
                const newBenchData = [...existingBenchData, benchStr];
                const newBenchTime = [...existingBenchTime, formattedBenchDateStr];
                
                // Update the document with the updated array.
                await setDoc(userDocRef, { benchInput: newBenchData }, { merge: true });
                await setDoc(userDocRef, { benchTimeInput: newBenchTime }, { merge: true });
            } else {
                // If document doesn't exist, create it with the new input as the first element of the array.
                const formattedBenchDateStr = formatDate(benchDate);
                await setDoc(userDocRef, { benchInput: [benchStr] });
                await setDoc(userDocRef, { benchTimeInput: [formattedBenchDateStr] });
            }
            goto("/profile"); // After submitting the data, go to profile page.
        } catch (error) {   // If error occurred, catch and display the error message in console.
            console.error('Error occurred while creating a document', error);
            alert('An error occurred while uploading data. Please try again later.');
        }
        loading = false;
    }

    // Delete the latest max weight and date entry for bench press
    async function deleteBench() {
        if (!currentUser) {
            return alert('User not logged in');
        }

        loading = true;

        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            // Get the existing document data
            const docSnap = await getDoc(userDocRef);
            // The If/Else statements below were created by A.I.
            if (docSnap.exists()) {
                // Store the existing data so that the last element can be deleted
                const deletedBenchData = docSnap.data().benchInput || [];
                const deletedBenchTime = docSnap.data().benchTimeInput || [];
                
                // remove last element from the max weight and date data
                if(deletedBenchData.length > 0 && deletedBenchTime.length > 0) {
                    // remove last element from the max weight and date data
                    deletedBenchData.pop();
                    deletedBenchTime.pop();

                    // Update the document with the updated array.
                    await setDoc(userDocRef, { benchInput: deletedBenchData}, { merge: true });
                    await setDoc(userDocRef, { benchTimeInput: deletedBenchTime}, { merge: true });
                } else {
                    return alert('There is no data to delete.');
                }
            } 
            goto("/profile");

        }
        catch (error) {
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
        // This trim was made with AI. 
        // .trim accounts for when a user deletes an input  or in an empty text box and tries to submit.
        if(squatStr === undefined && squatDate === undefined) {
            return alert('Please enter the date and max weight of your squat.');
        } else if (squatDate == undefined || !squatDate.trim()) {
            return alert('Please enter the date of your sqaut.');
        } else if (squatStr == undefined || !squatStr.trim()) {
            return alert('Please enter the max weight of your squat.');
        }

        // Check if entered string is a positive integer.
        // Stops the input and informs user if data input is invalid.
        if (!(wholeCheck(squatStr))) {
            return alert('Please enter a positive integer for the max weight.');
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

    // Delete the latest max weight and date entry for squat
    async function deleteSquat() {
        if (!currentUser) {
            return alert('User not logged in');
        }

        loading = true;

        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            // Get the existing document data
            const docSnap = await getDoc(userDocRef);
            // The If/Else statements below were created by A.I.
            if (docSnap.exists()) {
                // Store the existing data so that the last element can be deleted
                const deletedSquatData = docSnap.data().squatInput || [];
                const deletedSquatTime = docSnap.data().squatTimeInput || [];
                
                // remove last element from the max weight and date data
                if(deletedSquatData.length > 0 && deletedSquatTime.length > 0) {
                    // remove last element from the max weight and date data
                    deletedSquatData.pop();
                    deletedSquatTime.pop();

                    // Update the document with the updated array.
                    await setDoc(userDocRef, { SquatInput: deletedSquatData}, { merge: true });
                    await setDoc(userDocRef, { squatTimeInput: deletedSquatTime}, { merge: true });
                } else {
                    return alert('There is no data to delete.');
                }
            } 
            goto("/profile");

        }
        catch (error) {
            console.error('Error occurred while creating a document', error);
            alert('An error occurred while uploading data. Please try again later.');
            }
        loading = false;
    }

    async function createDeadLift() {
        if (!currentUser) {
            return alert('User not logged in');
        }

        // if there is no deadlift input for date, max weight, or both
        // This trim was made with AI. 
        // .trim accounts for when a user deletes an input  or in an empty text box and tries to submit.
        if(deadLiftStr === undefined && deadLiftDate === undefined) {
            return alert('Please enter the date and max weight of your deadlift.');
        } else if (deadLiftDate == undefined || !deadLiftDate.trim()) {
            return alert('Please enter the date of your deadlift.');
        } else if (deadLiftStr == undefined || !deadLiftStr.trim()) {
            return alert('Please enter the max weight of your deadlift.');
        }

        // Check if entered string is a positive integer.
        // Stops the input and informs user if data input is invalid.
        if (!(wholeCheck(deadLiftStr))) {
            return alert('Please enter a positive integer for the max weight.');
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

    // Delete the latest max weight and date entry for deadlift
    async function deleteDeadLift() {
        if (!currentUser) {
            return alert('User not logged in');
        }

        loading = true;

        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            // Get the existing document data
            const docSnap = await getDoc(userDocRef);
            // The If/Else statements below were created by A.I.
            if (docSnap.exists()) {
                // Store the existing data so that the last element can be deleted
                const deletedDeadData = docSnap.data().deadLiftInput || [];
                const deletedDeadTime = docSnap.data().deadLiftTimeInput || [];
                
                // remove last element from the max weight and date data
                if(deletedDeadData.length > 0 && deletedDeadTime.length > 0) {
                    // remove last element from the max weight and date data
                    deletedDeadData.pop();
                    deletedDeadTime.pop();

                    // Update the document with the updated array.
                    await setDoc(userDocRef, { deadLiftInput: deletedDeadData}, { merge: true });
                    await setDoc(userDocRef, { deadLiftTimeInput: deletedDeadTime}, { merge: true });
                } else {
                    return alert('There is no data to delete.');
                }
            } 
            goto("/profile");

        }
        catch (error) {
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
        // This trim was made with AI. 
        // .trim accounts for when a user deletes an input  or in an empty text box and tries to submit.
        if(powerCleanStr === undefined && powerCleanDate === undefined) {
            return alert('Please enter the date and max weight of your power clean.');
        } else if (powerCleanDate == undefined || !powerCleanDate.trim()) {
            return alert('Please enter the date of your power clean.');
        } else if (powerCleanStr == undefined || !powerCleanStr.trim()) {
            return alert('Please enter the max weight of your power clean.');
        }

        // Check if entered string is a positive integer.
        // Stops the input and informs user if data input is invalid.
        if (!(wholeCheck(powerCleanStr))) {
            return alert('Please enter a positive integer for the max weight.');
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
            goto("/profile");
        } catch (error) {
            console.error('Error occurred while creating a document', error);
            alert('An error occurred while uploading data. Please try again later.');
        }
        loading = false;
    }

    // Delete the latest max weight and date entry for power clean
    async function deletePowerClean() {
        if (!currentUser) {
            return alert('User not logged in');
        }

        loading = true;

        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            // Get the existing document data
            const docSnap = await getDoc(userDocRef);
            // The If/Else statements below were created by A.I.
            if (docSnap.exists()) {
                // Store the existing data so that the last element can be deleted
                const deletedPowerData = docSnap.data().powerCleanInput || [];
                const deletedPowerTime = docSnap.data().powerCleanTimeInput || [];
                
                // remove last element from the max weight and date data
                if(deletedPowerData.length > 0 && deletedPowerTime.length > 0) {
                    // remove last element from the max weight and date data
                    deletedPowerData.pop();
                    deletedPowerTime.pop();

                    // Update the document with the updated array.
                    await setDoc(userDocRef, { powerCleanInput: deletedPowerData}, { merge: true });
                    await setDoc(userDocRef, { powerCleanTimeInput: deletedPowerTime}, { merge: true });
                } else {
                    return alert('There is no data to delete.');
                }
            } 
            goto("/profile");

        }
        catch (error) {
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
            <h1 class="text-center text-[40px] font-bold text-cream lg:w-[710px]"> <!--Title-->
                BENCHMARK ENTRY
            </h1>

            <p class= "text-[20px] text-cream lg:w-[710px] mt-2 mb-4"> <!--Description of tracker-->
                Add bench press, squat, deadlift, and power clean exercies to track overall strength progress:
            </p>

            <div>
                <!-- input box -->
                <div class="max-w-4xl mx-auto bg-secondary rounded-lg flex flex-col p-5">
                    <h1 class="text-center text-cream text-2xl">BENCH PRESS</h1>
                                    <!-- Workout Date -->
             <div class="flex flex-col my-4 text-cream">
                <label for="workout-date">Workout Date</label>
                <input 
                    id="workout-date" 
                    type="date" 
                    bind:value={benchDate}
                    placeholder="Enter Date"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr text-cream"
                />
            </div>
                <!-- Gym Name -->
                <div class="flex flex-col my-4 text-cream">
                    <label for="benchStr">Max Weight</label>
                    <input
                        id="benchStr" 
                        type="text" 
                        bind:value={benchStr}
                        placeholder="integers only"
                        class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr text-cream placeholder-cream"
                    />
                </div>
            <div class="text-center gap-14">
                <!--Buttons and how they are navigated to different pages with "on:click"-->
            <button 
                id="submit"
                on:click={createBench}
                class="py-[23px] px-[100px] rounded-lg bg-primary text-lg text-cream w-[299px] hover:bg-cream hover:text-secondary duration-300 transittion-colors">
                ADD
            </button>
            <button 
                id="delete"
                on:click={deleteBench}
                class="py-[23px] px-[100px] rounded-lg bg-primary text-lg text-cream hover:bg-cream hover:text-secondary duration-300 transittion-colors">
                DELETE LATEST
            </button>
            </div>
        </div>
        <div>
            <!-- input box -->
            <div class="max-w-4xl mx-auto bg-secondary rounded-lg flex flex-col p-5 text-cream">
                <h1 class="text-center text-cream text-2xl">SQUAT</h1>
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
                    <label for="squatStr">Max Weight</label>
                    <input 
                        id="squarStr" 
                        type="text"
                        bind:value={squatStr}
                        placeholder="integers only"
                        class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr text-cream placeholder-cream"
                    />
                </div>
        <div class="text-center gap-14">
            <!--Buttons and how they are navigated to different pages with "on:click"-->
            <button 
                id="submit"
                disabled={loading}
                on:click={createSquat}
                class="py-[23px] px-[100px] rounded-lg bg-primary text-lg text-cream w-[299px] hover:bg-cream hover:text-secondary duration-300 transittion-colors">
                ADD
            </button>
            <button 
                id="delete"
                on:click={deleteSquat}
                class="py-[23px] px-[100px] rounded-lg bg-primary text-lg text-cream hover:bg-cream hover:text-secondary duration-300 transittion-colors">
                DELETE LATEST
            </button>
        </div>
        <div>
            <!-- input box -->
            <div class="max-w-4xl mx-auto bg-secondary rounded-lg flex flex-col p-5">
                <h1 class="text-center text-cream text-2xl">DEADLIFT</h1>
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
                    <label for="deadLiftStr">Max Weight</label>
                    <input 
                        id="deadLiftStr" 
                        type="text"
                        bind:value={deadLiftStr}
                        placeholder="integers only"
                        class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr text-cream placeholder-cream"
                    />
                </div>
        <div class="text-center gap-14">
            <!--Buttons and how they are navigated to different pages with "on:click"-->
            <button 
                id="submit"
                disabled={loading}
                on:click={createDeadLift}
                class="py-[23px] px-[100px] rounded-lg bg-primary text-lg text-cream w-[299px] hover:bg-cream hover:text-secondary duration-300 transittion-colors">
                ADD 
            </button>
            <button 
                id="delete"
                on:click={deleteDeadLift}
                class="py-[23px] px-[100px] rounded-lg bg-primary text-lg text-cream hover:bg-cream hover:text-secondary duration-300 transittion-colors">
                DELETE LATEST
            </button>
        </div>
    </div>
    <div>
            <!-- input box -->
            <div class="max-w-4xl mx-auto bg-secondary rounded-lg flex flex-col p-5">
                <h1 class="text-center text-cream text-2xl">POWER CLEAN</h1>
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
                        <label for="powerCleanStr">Max Weight</label>
                        <input 
                            id="powerCleanStr" 
                            type="text"
                            bind:value={powerCleanStr}
                            placeholder="integers only"
                            class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr text-cream placeholder-cream"
                        />
                    </div>
        <div class="text-center gap-14">
                <!--Buttons and how they are navigated to different pages with "on:click"-->
            <button 
                id="submit"
                disabled={loading}
                on:click={createPowerClean}
                class="py-[23px] px-[100px] rounded-lg bg-primary text-lg text-cream w-[299px] hover:bg-cream hover:text-secondary duration-300 transittion-colors">
                ADD
            </button>
            <button 
                id="delete"
                on:click={deletePowerClean}
                class="py-[23px] px-[100px] rounded-lg bg-primary text-lg text-cream hover:bg-cream hover:text-secondary duration-300 transittion-colors">
                DELETE LATEST
            </button>
            </div>
        </div>
</main>
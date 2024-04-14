<script lang="ts">
    import { doc, setDoc } from 'firebase/firestore';
    import { db, storage } from '$lib/firebase';
    import type { User } from 'firebase/auth';
    import { authStore } from '$lib/assets/gym/gym';
    import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { goto } from '$app/navigation';
    import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from 'flowbite-svelte';
    
    let workoutName: String
    let exerciseName: String
    let sets: number | null
    let reps: number | null
    let weight: number | null
    let exercises: any[] = []
    let numExercises = 0
    let workoutNotes: String

    let currentUser: User | null = null;
    authStore.subscribe((value) => {
        currentUser = value.user;
    });

    function addExercise() {
        exercises[numExercises] = [exerciseName, sets, reps, weight];
        exerciseName=""
        sets=null
        reps=null
        weight=null
        numExercises = numExercises + 1
    }

    async function createWorkout() {
            if (workoutName === undefined)
                return alert('Please name workout');
        
            const workoutInfo = {
                workoutName: workoutName,
                exercises: exercises,
                workoutNotes: workoutNotes
            };

            try {
                const gymRef = doc(db, 'workoutTest', workoutName);
                setDoc(gymRef, workoutInfo, { merge: true });
                goto('/profile');
            } catch (error) {
                console.log(`An error ocuured while creating a document ${error}`);
            }
        }

</script>

<main class="mx-auto">
    <h1 class="text-center text-white">
        New Workout
    </h1>
    <div class=" bg-secondary rounded-lg mx-auto">
        <input
            class="my-2"
            bind:value={workoutName}
            placeholder="Workout Name"
        />
        <h2 class="text-white">
            Exercises
        </h2>
        {#each exercises as ex}
            <div class="flex flex-col text-white">
                {ex}
            </div>
        {/each}
        <div>
            <input
                class="my-2"
                bind:value={exerciseName}
                placeholder="Exercise Name"
            />
            <input
                class="my-2"
                bind:value={sets}
                placeholder="Sets"
            />
            <input
                class="my-2"
                bind:value={reps}
                placeholder="Reps"
            />
            <input
                class="my-2"
                bind:value={weight}
                placeholder="Weight"
            />
        </div>
        <div>
            <button
                class="bg-black text-white rounded-lg p-1"
                on:click={() => addExercise()}>
                Add Exercise
            </button>
        </div>
        <div class="flex flex-col my-4 text-white">
            <label for="workout-notes">Notes</label>
            <textarea 
                id="workout-notes" 
                bind:value={workoutNotes}
                placeholder="Notes"
                class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
            ></textarea>
        </div>
    </div>
</main>

<style>
    main {
        text-align: center;
        width: 50%;
    }

    textarea {
        width: 100%;
        resize: vertical;
        height: 200px;
    }
</style>
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
    let exercise: any[] = []
    let exercises: any[] = []

    async function addExercise() {
        exercise.push(exerciseName);
        exercise.push(sets);
        exercise.push(reps);
        exercise.push(weight);
        exercises.push(exercise);
        exercise.pop
        exercise.pop
        exercise.pop
        exercise.pop
        exerciseName=""
        sets=null
        reps=null
        weight=null
        return alert(exercises[0])
    }

    function createWorkout() {
        
    }
</script>

<main>
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
        <!--Should display array but svelte is stupid-->
        {#each exercises as ex}
            {ex}
        {/each}
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
        <button
            class="bg-black text-white rounded-lg p-1"
            on:click={addExercise}>
            Add Exercise
        </button>
        <button
            class="bg-black text-white rounded-lg p-1"
            on:click={createWorkout}>
            Create Workout
        </button>
    </div>
</main>

<style>
    main {
        text-align: center;
    }

    div {
        width: 50%;
    }
</style>
<script lang="ts">
    import { doc, setDoc } from 'firebase/firestore';
    import { db, storage } from '$lib/firebase';
    import type { User } from 'firebase/auth';
    import { authStore } from '$lib/assets/gym/gym';
    import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { goto } from '$app/navigation';

    // Variables associated with exercise
    let name: String;
    let sets: String;
    let reps: String;
    let weight: String;

    let numWorkouts = 0;
    // workouts is list with name of workout
    let workouts: any[] = [];
    // exercises is a list of exercise
    let exercises: any[] = [];
    // exercise is a list containing variables associated with exercise
    let exercise: any[] = [];
    // used to toggle whether input fields are displayed or not
    let addingExercise: boolean = false;

    // create new workout 
    function createWorkout() {
        // name = "workout" plus the number of workouts created so far
        workouts[numWorkouts] = "Workout " + numWorkouts++;
    };

    // creates a new exercise
    function createExercise(n: any) {
        // name field has to have a value
        if (name === undefined)
            return alert('Please name exercise');
        // n = the workout this exercise was created under
        exercise.push(n)
        exercise.push(name)
        exercise.push(sets)
        exercise.push(reps)
        exercise.push(weight)
        // push exercise to the list of exercises
        exercises.push(exercise)
        // reset placeholders
        name = ''
        sets = ''
        reps = ''
        weight = ''
        // makes input fields disappear
        addingExercise = false
    };
</script>

<ul>
    <!--n = name of workout-->
    {#each workouts as n}
    <div class="p-4 bg-black mt-4">
        <li>{n}</li>
        <row class="flex justify-center">
            <col>Exercise
            <col>|
            <col>Sets
            <col>|
            <col>Reps
            <col>|
            <col>Weight
        </row>
        <row>
            <!--x = exercise list-->
            {#each exercises as x}
            <!--if that exercises workout === current workout-->
            {#if x[0] === n}
                <!--name-->
                <col>{x[1]}
                <!--sets-->
                <col>{x[2]}
                <!--reps-->
                <col>{x[3]}
                <!--weight-->
                <col>{x[4]}
                <!--used as a newline-->
                <col class="flex flex-col">
            {/if}
            {/each}
        </row>
    </div>
    <div class="bg-black">
        <!--toggle button to display or hide input fields-->
        <button
            on:click={() => (addingExercise = !addingExercise)}
            class="pl-1 pr-1 border rounded-lg text-center text-white text-2xl">
            New Exercise
        </button>
        {#if addingExercise === true}
        <div class="flex my-1">
            <input 
                id="name"
                type="text"
                bind:value={name}
                placeholder="Name"
                class="py-1 pl-5 pr-5 bg-24 bg-transparent border border-borderclr"
            />
            <input 
                id="sets" 
                type="text"
                bind:value={sets}
                placeholder="Sets"
                class="py-1 pl-5 pr-5 bg-24 bg-transparent border border-borderclr"
            />
            <input 
                id="reps" 
                type="text"
                bind:value={reps}
                placeholder="reps"
                class="py-1 pl-5 pr-5 bg-24 bg-transparent border border-borderclr"
            />
            <input 
                id="weight" 
                type="text"
                bind:value={weight}
                placeholder="weight"
                class="py-1 pl-5 pr-5 bg-24 bg-transparent border border-borderclr"
            />
            <!--button to create new exercise. n = name of current workout-->
            <button 
                on:click={() => createExercise(n)}
                class="pl-1 pr-1 border rounded-lg text-center text-white text-2xl">
                Add Exercise
            </button>
        </div>
        {/if}
    </div>
    {/each}
</ul>

<ul>
    <!--button to create new workout-->
    <button 
        on:click={() => createWorkout()}
        class="p-2 text-black bg-white rounded-lg mt-4">
        Create Workout
    </button>
</ul>
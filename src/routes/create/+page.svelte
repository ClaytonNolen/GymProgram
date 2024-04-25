<script lang="ts">
    import { doc, setDoc } from 'firebase/firestore';
    import { db, storage } from '$lib/firebase';
    import type { User } from 'firebase/auth';
    import { authStore } from '$lib/assets/gym/gym';
    import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { goto } from '$app/navigation';
    import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from 'flowbite-svelte';
    
    let workoutName: string
    let exercise: string = 'Select Workout:'
    let showExerciseInfo: boolean = false;
    let sets: number[] = []
    let reps: number[] = []
    let weight: number[] = []
    let exercises: any[] = []
    let displayEx: any[] = []
    let numExercises = 0
    let workoutDate: Date
    let workoutNotes: string = ""
    let selectedExercise: {id: number, text: string} | {id: 0, text: 'Select Workout'}

    let currentUser: User | null = null;
    authStore.subscribe((value) => {
        currentUser = value.user;
    });
    
    // exercise options
    let exerciseName = [
        {id: 0, text:'Select Workout:'},
        {id: 1, text:'Ab Bench'},
        {id: 2, text:'Abdominal Crunch'},
        {id: 3, text:'Back Extension'},
        {id: 4, text:'Bench Press'},
        {id: 5, text:'Bicep Curl'},
        {id: 6, text:'Cable Machine'},
        {id: 7, text:'Calf Raise'},
        {id: 8, text:'Chest Press'},
        {id: 9, text:'Glute Machine'},
        {id: 10, text:'Hip Adductor'},
        {id: 11, text:'Lat Pull Down'},
        {id: 12, text:'Lateral Raise'},
        {id: 13, text:'Leg Extension'},
        {id: 14, text:'Leg Press'},
        {id: 15, text:'Pec Fly'},
        {id: 16, text:'Plated Chest Press'},
        {id: 17, text:'Plated Leg Press'},
        {id: 18, text:'Rotary Torso'},
        {id: 19, text:'Seated Leg Curl'},
        {id: 20, text:'Seated Row'},
        {id: 21, text:'Shoulder Press'},
        {id: 22, text:'Tricep Press'},
    ];

    function handleWorkoutSelection() {
            if (exercise !== 'Select Workout:'){
                showExerciseInfo = true;
                selectedExercise = exercises.find(exercise => exercise.text === exercise) || null;
            } else {
                showExerciseInfo = false;
            }
        }

    function addExercise() {
        if (exercise === "Select Workout:")
            return alert('Please select an exercise');
        if (sets[numExercises] === undefined)
            return alert('Please enter number of sets');
        if (reps[numExercises] === undefined)
            return alert('Please enter number of reps');
        if (weight[numExercises] === undefined)
            return alert('Please enter weight');
        displayEx[numExercises] = [exercise, sets[numExercises], reps[numExercises], weight[numExercises]];
        exercises[numExercises] = exercise;
        exercise="Select Workout:"
        numExercises = numExercises + 1
    }

    async function createWorkout() {
            if (workoutName === undefined)
                return alert('Please name workout');
            if (numExercises <= 0)
                return alert('Please add at least one exercise');
            if (workoutDate === undefined)
                return alert('Please enter date');
            const workoutInfo = {
                workoutName: workoutName,
                exercises: exercises,
                sets: sets,
                reps: reps,
                weight: weight,
                workoutDate: workoutDate,
                workoutNotes: workoutNotes,
                userID: currentUser?.uid
            };

            try {
                const gymRef = doc(db, 'usersWorkouts', workoutName);
                setDoc(gymRef, workoutInfo, { merge: true });
                goto('/profile');
            } catch (error) {
                return alert(`An error ocuured while creating a document ${error}`);
            }
        }
</script>

<main class="mx-auto">
    <h1 class="text-center text-white text-3xl font-bold">
        New Workout
    </h1>
    <div class="bg-black rounded-lg mx-auto">
        <input
            class="my-2"
            bind:value={workoutName}
            placeholder="Workout Name"
        />
        <h2 class="text-white text-xl">
            Exercises
        </h2>
        {#each displayEx as ex}
            <div class="flex flex-col text-white">
                {ex}
            </div>
        {/each}
        <div>
            <label for="exercise"></label>
            <select bind:value={exercise} on:change={handleWorkoutSelection} id = "exercise">
                {#each exerciseName as ex}
                <option value={ex.text}>  
                    {ex.text}
                </option>
                {/each}
            </select>
            <input
                class="my-2 mx-2"
                bind:value={sets[numExercises]}
                placeholder="Sets"
            />
            <input
                class="my-2"
                bind:value={reps[numExercises]}
                placeholder="Reps"
            />
            <input
                class="my-2 ml-2"
                bind:value={weight[numExercises]}
                placeholder="Weight"
            />
        </div>
        <div>
            <button
                class="text-black text-xl rounded-lg p-1"
                on:click={() => addExercise()}>
                Add Exercise
            </button>
        </div>
        <div class="flex flex-col text-white text-xl my-4 mx-2">
            <label for="workout-date">Date</label>
            <input
                id="workout-date" 
                type="date"
                bind:value={workoutDate}
                placeholder="Date"
                class="text-black my-2"
            />
        </div>
        <div class="flex flex-col text-white text-xl my-4 mx-2">
            <label for="workout-notes">Notes</label>
            <textarea 
                id="workout-notes" 
                bind:value={workoutNotes}
                placeholder="Notes"
                class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
            ></textarea>
        </div>
        <button
            class="text-black text-xl rounded-lg p-1 mb-2"
            on:click={() => createWorkout()}>
            Create Workout
    </div>
</main>

<style>
    main {
        text-align: center;
        width: 50%;
    }

    button {
        background-color: #FFCD00;
    }

    textarea {
        width: 100%;
        resize: vertical;
        height: 200px;
    }
</style>
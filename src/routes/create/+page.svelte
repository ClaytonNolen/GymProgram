<script lang="ts">
    import { doc, setDoc } from 'firebase/firestore';
    import { db, storage } from '$lib/firebase';
    import type { User } from 'firebase/auth';
    import { authStore } from '$lib/assets/gym/gym';
    import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { goto } from '$app/navigation';
    import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from 'flowbite-svelte';
    
    let workoutName: string
    let showExerciseInfo: boolean = false;
    let sets: number[] = []
    let reps: number[] = []
    let weight: number[] = []
    let exercises: any[] = []
    let displayEx: any[] = []
    let numExercises = 0
    let workoutDate: Date
    let workoutNotes: string = ""

    let currentUser: User | null = null;
    authStore.subscribe((value) => {
        currentUser = value.user;
    });

    let selectedExercise: {id: number, text: string} | null = null
    
    // exercise options
    let exerciseName = [
        {id: 0, text:'Select Exercise:'},
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
    let exercise = exerciseName[0].text;


    function handleWorkoutSelection() {
            if (exercise !== 'Select Exercise:'){
                showExerciseInfo = true;
                selectedExercise = exercises.find(exercise => exercise.text === exercise) || null;
            } else {
                showExerciseInfo = false;
                selectedExercise = null;
            }
        }

    function addExercise() {
        if (exercise == 'Select Exercise:'){
            return alert('Please select an exercise');
        }
        if (sets[numExercises] <= 0 || reps[numExercises] <= 0 || weight[numExercises] <= 0){
            return alert('Sets, Reps, and Weight must be a positive number');
        }
        displayEx[numExercises] = [exercise, sets[numExercises], reps[numExercises], weight[numExercises]];
        exercises[numExercises] = exercise;
        exercise="Select exercise:"
        numExercises = numExercises + 1
    }

    async function createWorkout() {
            if (workoutName === undefined)
                return alert('Please name workout');

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
                goto('/workouts');
            } catch (error) {
                return alert(`An error ocuured while creating a document ${error}`);
            }
        }
</script>

<main class="text-cream-100 mx-auto mt-10 flex flex-col items-center">  
    <div>
        <div class= "max-w-4xl mx-auto bg-secondary rounded-lg p-5">
            <h1 class="text-center text-cream text-2xl">New Workout</h1>

            <div class ="flex flex-col my-4 text-cream">
                <input
                    bind:value={workoutName}
                    placeholder="Workout Name"
                    class="py-4 pl-5 pr-24 bg-transparent border border-borderclr text-cream"
                />
            </div>

            <style>
                .default-option {
                    color: #f8f1e5;
                }
                select {
                    color: #f8f1e5;
                }
                select option {
                    color: #f8f1e5;
                    background-color: #171717;
                }
            </style>
            
            <div class ="flex flex-col my-4">
                <h2 class="text-cream">Exercises</h2>
                
                {#each displayEx as ex}
                    {ex}
                {/each}

                <div class="flex flex-row my-4 w-full">
                    <div class = "flex flex-col w-2/3 pr-3">
                        <select 
                            bind:value={exercise} 
                            on:change={handleWorkoutSelection} 
                            class = "py-4 pl-5 pr-20 bg-transparent border border-borderclr text-cream"
                            id = "exercise">
                            {#each exerciseName as ex}
                                <option value={ex.text}>{ex.text}</option>
                            {/each}
                        </select>
                    </div>
                    <div class = "flex flex-col w-1/6 pr-3">
                        <input
                            bind:value={sets[numExercises]}
                            placeholder="Sets"
                            class = "py-4 pl-5 bg-transparent border border-borderclr text-cream"
                        />
                    </div>
                    <div class = "flex flex-col w-1/6 pr-3">
                        <input
                            bind:value={reps[numExercises]}
                            placeholder="Reps"
                            class = "py-4 pl-5 bg-transparent border border-borderclr text-cream" 
                        />
                    </div>
                    <div class = "flex flex-col w-1/6 ">
                        <input
                            bind:value={weight[numExercises]}
                            placeholder="Weight"
                            class = "py-4 pl-5 bg-transparent border border-borderclr text-cream"/>
                    </div>
                </div>
            </div>

            <div>
                <button
                    class="py-[23px] px-[86px] rounded-lg bg-primary text-xl text-cream w-[299px] hover:bg-cream hover:text-secondary duration-300 transittion-colors"
                    on:click={() => addExercise()}>
                    Add Exercise
                </button>
            </div>
            <div class="flex flex-col my-4 text-cream">
                <label for="workout-date">Date</label>
                <input
                    id="workout-date" 
                    type="date"
                    bind:value={workoutDate}
                    placeholder="Date"
                    class = "py-4 pl-5 bg-transparent border border-borderclr text-cream"/>
            </div>
            <div class="flex flex-col my-4 text-cream">
                <label for="workout-notes">Notes</label>
                <textarea
                    id="workout-notes" 
                    bind:value={workoutNotes}
                    placeholder="Additional workout notes...

100 push-ups
100 sit-ups
100 squats
10 km run"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr text-cream"
                ></textarea>
            </div>
            <button
                class="py-[23px] px-[86px] rounded-lg bg-primary text-xl text-cream w-[299px] hover:bg-cream hover:text-secondary duration-300 transittion-colors"
                on:click={() => createWorkout()}>
                Create Workout
                
        </div>
    </div>
</main>

<style>
    main {
        text-align: center;
        justify-content: center;

        width: 50%;
    }

    textarea {
        width: 100%;
        resize: vertical;
        height: 200px;
    }
</style>
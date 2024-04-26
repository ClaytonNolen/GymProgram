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
    // declared  as empty so users arent forced to add notes
    let workoutNotes: string = ""

    // get the uID of the current logged in user
    let currentUser: User | null = null;
    authStore.subscribe((value) => {
        currentUser = value.user;
    });

    let selectedExercise: {id: number, text: string} | null = null
    
    // exercise options from Robertson Gym as an array, idea from svlete.dev at
    // the following page https://svelte.dev/repl/23129d2c7cc14f31ab2f2919e627c04a?version=3.46.6 used here
    // and on lines 167-171 and 181-183
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
    // declared as first index so dropdown displays as "Select Workout:"
    let exercise = exerciseName[0].text;

    /**
     * Function to handle the display of a workout that
     * a user has selected from the dropdown of workouts
     */
    function handleWorkoutSelection() {
            // check for the default option to not be selected
            if (exercise !== 'Select Exercise:'){
                showExerciseInfo = true;
                // finds the first element in the array of exercises
                selectedExercise = exercises.find(exercise => exercise.text === exercise) || null;
            } else {
                showExerciseInfo = false;
                selectedExercise = null;
            }
        }

    /**
     * Function for adding exercises to a workout
     */
    function addExercise() {
        // check to ensure users have selected an exercise
        if (exercise == 'Select Exercise:'){
            return alert('Please select an exercise');
        }
        // check to make sure users have entered a positive number
        if (sets[numExercises] <= 0 || reps[numExercises] <= 0 || weight[numExercises] <= 0){
            return alert('Sets, Reps, and Weight must be a positive number');
        }
        // create an array with the size of number of exercises selected with the sets, reps, and weight
        displayEx[numExercises] = [exercise, sets[numExercises], reps[numExercises], weight[numExercises]];
        // create an array with the size of number of exercises selected with the exercise only, used for displaying
        exercises[numExercises] = exercise;
        // initialized as "Select exercise" for previous logic
        exercise="Select exercise:"
        numExercises = numExercises + 1
    }
    
    /**
     * Creates a workout from the users selected input under 
     * workoutInfo then sends this data to the database under
     * a collection "usersWorkouts"
     */
    async function createWorkout() {
            // requires a name for the workout being created
            if (workoutName === undefined)
                return alert('Please name workout');
            // variable to store all of the workout info from the user that is sent to the database
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
            // try block to add the workout information to the database
            try {
                // creats a reference to our firestore instance, under the path usersWorkouts, with the users 
                // workoutName as the document. detailed usage on adding data with firestore was 
                // learned from https://firebase.google.com/docs/firestore/manage-data/add-data and applied to this project
                const gymRef = doc(db, 'usersWorkouts', workoutName);
                // writes the data to firestore
                setDoc(gymRef, workoutInfo, { merge: true });
                // after creating a workout redirect to the workout history page
                goto('/workouts');
            // catches any errors, usually missing or imporpely defined data
            } catch (error) {
                return alert(`An error ocuured while creating a document ${error}`);
            }
        }
</script>

<!--
    Creates the New Workout card displaying all the options for a workout
-->
<main class="text-cream-100 mx-auto mt-10 flex flex-col items-center">  
    <div>
        <div class= "max-w-4xl mx-auto bg-secondary rounded-lg p-5">
            <h1 class="text-center text-cream text-2xl">New Workout</h1>

            <!-- Input box for workout name-->
            <div class ="flex flex-col my-4 text-cream">
                <input
                    bind:value={workoutName}
                    placeholder="Workout Name"
                    class="py-4 pl-5 pr-24 bg-transparent border border-borderclr text-cream placeholder-cream"
                />
            </div>
            <!-- Styling for the dropdown menu-->
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
            <!-- Dropdown box for exercises -->
            <div class ="flex flex-col my-4 text-cream">
                <h2 class="text-cream">Exercises</h2>
                <!-- Gets each exercsie added to a workout so only selected exercises are displayed when added-->
                {#each displayEx as ex, index}
                    <div class="flex flex-col text-cream">
                        <!-- Once a user clicks "Add Exercise", this displays the exercise just added-->
                        {exercises[index]}: {sets[index]} set(s) of {reps[index]} at {weight[index]} lbs
                    </div>
                {/each}
                <!-- Puts the exercise, sets, reps, weight on the same row.render
                     
                     Exact formatting of width for this row was done through 
                     experimentation from css docs https://tailwindcss.com/docs/width
                -->
                <div class="flex flex-row my-4 w-full">
                    <div class = "flex flex-col w-2/3 pr-3">
                        <select 
                            bind:value={exercise} 
                            on:change={handleWorkoutSelection} 
                            class = "py-4 pl-5 pr-20 bg-transparent border border-borderclr text-cream"
                            id = "exercise">
                            <!-- Dropdown menu that displays all exercises from the list of exercises -->
                            {#each exerciseName as ex}
                                <option value={ex.text}>{ex.text}</option>
                            {/each}
                        </select>
                    </div>
                    <!-- Input for sets -->
                    <div class = "flex flex-col w-1/6 pr-3">
                        <input
                            bind:value={sets[numExercises]}
                            placeholder="Sets"
                            class = "py-4 pl-5 bg-transparent border border-borderclr text-cream placeholder-cream"
                        />
                    </div>
                    <!-- Input for reps -->
                    <div class = "flex flex-col w-1/6 pr-3">
                        <input
                            bind:value={reps[numExercises]}
                            placeholder="Reps"
                            class = "py-4 pl-5 bg-transparent border border-borderclr text-cream placeholder-cream" 
                        />
                    </div>
                    <!-- Input for weight -->
                    <div class = "flex flex-col w-1/6 pr-3">
                        <input
                            bind:value={weight[numExercises]}
                            placeholder="Weight"
                            class = "py-4 pl-5 bg-transparent border border-borderclr text-cream placeholder-cream"/>
                    </div>
                </div>
            </div>

            <!-- Button for adding an exercise which calls the addExercise function -->
            <div>
                <button
                    class="py-[23px] px-[86px] rounded-lg bg-primary text-xl text-cream w-[299px] hover:bg-cream hover:text-secondary duration-300 transittion-colors"
                    on:click={() => addExercise()}>
                    Add Exercise
                </button>
            </div>
            <!-- Input box for selecting a date -->
            <div class="flex flex-col my-4 text-cream">
                <label for="workout-date">Date</label>
                <input
                    id="workout-date" 
                    type="date"
                    bind:value={workoutDate}
                    placeholder="Date"
                    class = "py-4 pl-5 bg-transparent border border-borderclr text-cream"/>
            </div>
            <!-- Input box for adding additional notes to a workout -->
            <div class="flex flex-col my-4 text-cream">
                <label for="workout-notes">Notes</label>
                <!-- textarea so that the placeholder can be formatted easier-->
                <textarea
                    id="workout-notes" 
                    bind:value={workoutNotes}
                    placeholder="Additional workout notes...

100 push-ups
100 sit-ups
100 squats
10 km run"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr text-cream placeholder-cream"
                ></textarea>
            </div>
            <!-- Button for creating a workout once all input requirements satisfied, calling the createWorkout function -->
            <button
                class="py-[23px] px-[86px] rounded-lg bg-primary text-xl text-cream w-[299px] hover:bg-cream hover:text-secondary duration-300 transittion-colors"
                on:click={() => createWorkout()}>
                Create Workout
                
        </div>
    </div>
</main>

<!-- CSS styling -->
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
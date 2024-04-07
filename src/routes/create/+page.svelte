    <script lang="ts">
        import { doc, setDoc } from 'firebase/firestore';
        import { db, storage } from '$lib/firebase';
        import type { User } from 'firebase/auth';
        import { authStore } from '$lib/assets/gym/gym';
        import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
        import { goto } from '$app/navigation';
        import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from 'flowbite-svelte';


        let workout: string = "Select Workout";
        let workoutNotes: string;
        let workoutDate: string;
        let workoutTitle: string;
        let sets: number | null = null;
        let reps: number | null = null;
        let weight: number | null = null;
        let showExerciseInfo: boolean = false;
        // let answer: string;
        let answer = '';
        let selectedExercise: {id: number, text: string} | null = null
        // exercise input fields
        let selectedExerciseArr: { 
            id: number,
            workout:string, 
            exercise:string,
            sets:number | null,
            reps:number | null,
            weight:number | null}[] =[];
     
        // exercise options
        let exercises = [
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

        let loading = false;

        let currentUser: User | null = null;
        authStore.subscribe((value) => {
            currentUser = value.user;
        });

        function handleWorkoutSelection() {
            if (workout !== 'Select Workout:'){
                showExerciseInfo = true;
                selectedExercise = exercises.find(exercise => exercise.text === workout) || null;
            } else {
                showExerciseInfo = false;
                selectedExercise = null;
            }
        }

        // function addMultipleExercises() {
        //     if (selectedExercise && sets !== null && reps !== null && weight !== null) {
        //         selectedExerciseArr.push({
        //             id: id,
        //             workout: workout,
        //             exercise: selectedExercise.text,
        //             sets: sets,
        //             reps: reps,
        //             weight: weight
        //         });
        //     }
        // }

        function addMultipleExercises() {
            if (selectedExercise && sets !== null && reps !== null && weight !== null) {
                const id = selectedExerciseArr.length;
                const exerciseObj = {
                    id: id,
                    workout: workout,
                    exercise: selectedExercise.text,
                    sets: sets,
                    reps: reps,
                    weight: weight
                }
                selectedExerciseArr.push(exerciseObj);
                    // sets = null;
                    // reps = null;
                    // weight = null;
            }
        }

        async function createGym() {
            if (workout === undefined || loading === true)
                return alert('Must include at least one workout');
            loading = true;
        
            const workoutInfo = {
                workout: workout,
                workoutNotes: workoutNotes,
                workoutDate: workoutDate,
                workoutTitle: workoutTitle,
                answer: answer,
                sets: sets,
                reps: reps,
                weight: weight,
                showExerciseInfo: showExerciseInfo
            };

            try {
                const gymRef = doc(db, 'workouts', workoutTitle);
                setDoc(gymRef, workoutInfo, { merge: true });
                goto('/profile');
            } catch (error) {
                console.log(answer)
                console.log(`An error ocuured while creating a document ${error}`);
            }
            loading = false;
        }

    </script>

    <main class="text-gray-100 mt-10">
        <div>
            <!-- input box -->
            <div class="max-w-4xl mx-auto bg-secondary rounded-lg flex flex-col p-5">
                <h1 class="text-center text-white text-2xl">Create Workout</h1>

                <!-- Workout Name-->
                <div class="flex flex-col my-4">
                    <label for="workout-title">Workout Name</label>
                    <input 
                        id="workout-title" 
                        type="text" 
                        bind:value={workoutTitle}
                        placeholder="Workout Name e.g. Leg Day"
                        class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                    />
                </div>
    
                <!-- Workout -->
                <style>
                    select {
                        background-color: #2b2d38;
                    }
                    select option {
                        color: #000000;
                    }
                </style>

                <div class="flex flex-col my-4">
                    <label for="workout">Exercise</label>
                    <select bind:value={workout} on:change={handleWorkoutSelection}
                        class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                        id = "workout"
                        >
                        {#each exercises as exercise}
                        <option value={exercise.text}>  
                            {exercise.text}
                        </option>
                        {/each}
                        <input 
                        class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                        />
                    </select>
                </div>

                <!--Exercise sets, reps, weight-->
                {#if showExerciseInfo}
                <div class="flex flex-row my-4">
                    <!--Sets-->
                        <div class="flex flex-col">
                            <label for="sets">Sets</label>
                            <input 
                                id="sets"
                                type="number"
                                bind:value={sets}
                                placeholder="Sets"
                                class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                            />
                        </div>
                    <!--Reps-->
                        <div class="flex flex-col">
                            <label for="reps">Reps</label>
                            <input 
                                id="reps"
                                type="number"
                                bind:value={reps}
                                placeholder="Reps"
                                class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                            />
                        </div>
                        <!--Reps-->
                        <div class="flex flex-col">
                            <label for="weight">Weight</label>
                            <input 
                                id="weight"
                                type="number"
                                bind:value={weight}
                                placeholder="Weight"
                                class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                            />
                        </div>
                    </div>
                {/if}

                
                <!-- Workout Date -->
                <div class="flex flex-col my-4">
                    <label for="workout-date">Workout Date</label>
                    <input  
                        id="workout-date" 
                        type="date" 
                        bind:value={workoutDate}
                        placeholder="Enter Date"
                        class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                    />
                </div>

                <!-- Workout Notes -->
                <style>
                    textarea {
                        width: 100%;
                        resize: vertical;
                        height: 200px;
                    }
                </style>
                <div class="flex flex-col my-4">
                    <label for="workout-notes">Notes</label>
                    <textarea 
                        id="workout-notes" 
                        bind:value={workoutNotes}
                        placeholder="Additional Workout Information...
    100 Pushups
    100 Sit Ups
    100 Squats
    10 km Run"
                        class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                    ></textarea>
                </div>

                <button 
                disabled={loading}
                on:click={addMultipleExercises}
                class="py-2 px-8 bg-white text-black mt-8 disabled:bg-white/25 disabled:cursor-not-allowed"
                >{loading ? 'Creating' : 'Add Exercise'}</button>
                {#each selectedExerciseArr as exercise}
                <div class="flex flex-col my-4">
                    <label for="exercise-{exercise.id}">Exercise</label>
                    <input 
                        id="exercise-{exercise.id}" 
                        type="text" 
                        value={exercise.exercise}
                        class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                        readonly
                    />
                    <!-- Add input fields for sets, reps, and weight-->
                    <label for="sets-{exercise.id}">Sets</label>
                    <input 
                        id="sets-{exercise.id}" 
                        type="number" 
                        value={exercise.sets}
                        class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                        readonly
                    />
                    <!-- reps and weight -->
                </div>
            {/each}
                <button 
                disabled={loading}
                on:click={createGym}
                class="py-2 px-8 bg-white text-black mt-8 disabled:bg-white/25 disabled:cursor-not-allowed"
                >{loading ? 'Creating' : 'Create Workout'}</button>

            </div>
        </div>
    </main>
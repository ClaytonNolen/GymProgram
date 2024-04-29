<!-- 
    This is the component responsible for the displaying of a users 
    saved workoout under the "Workout History" button or /workouts page

    For more information on the help we recieved for the front-end and
     back-end, please see the README. 
-->
<script lang="ts">
	import type { User } from "firebase/auth";
    import { formatDate } from "../helper/formatDate";
    import type { Member } from '../types';
    export let workoutName: string;
    export let exercises: any[];
    export let sets: number[];
    export let reps: number[];
    export let weight: number[];
    export let workoutDate: string;
    export let workoutNotes: string;
    // export let userID: string;
    const formattedDate = formatDate(workoutDate);

    let exercisesarray = exercises
    let setsarray = sets
    let repsarray = reps
    let weightarray = weight
</script>
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- If the click does not work check the pt2 at 44min. -->
<article
on:keydown={() => {}}
    class="bg-secondary p-8 rounded-lg text-cream">
        <!-- Formating for the workout cards-->
        <div class="flex flex-col">
            <h1 class = "capitalize text-3xl font-bold tracking-widest"> {workoutName}</h1>
            <p class="py-2 text-gray-500 font-semibold"> {formattedDate}</p>
            <h2 class = font-bold > Exercises</h2>
            <!-- Displays the reps, sets, and weights of an with their respective exercise -->
            {#each exercisesarray as e, index}
                <p>{e}: {setsarray[index]} sets of {repsarray[index]} at {weightarray[index]}</p>
            {/each}
            <h2 class = font-bold>Workout Notes: </h2>
            <p>{workoutNotes}</p>
        </div>
</article>
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
    export let userID: string;

    const formattedDate = formatDate(workoutDate);
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- If the click does not work check the pt2 at 44min. -->

<article 
on:keydown={() => {}}
    class="bg-secondary p-8 rounded-lg hover:bg-slate-800 hover:scale-110 duration-300 transistion-all cursor-pointer">
        <div class="flex flex-col">
            <p>UserID: {userID}</p>
            <p>Workouts: {workoutName}</p>
            <p>Exercises: {exercises}</p>
            <p>Sets: {sets}</p>
            <p>Reps: {reps}</p>
            <p>Weight: {weight}</p>
            <p>Workout Date: {formattedDate}</p>
            <p>Workout Notes: {workoutNotes}</p>
        </div>
</article>
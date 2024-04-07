<script lang="ts">
    import { goto } from "$app/navigation";
    import { formatDate } from "../helper/formatDate";

    import type { Member } from '../types';

    export let workout: string;
    export let workoutNotes: string;
    export let workoutDate: string;

    const formattedDate = formatDate(workoutDate);
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- If the click does not work check the pt2 at 44min. -->

<div class="bg-black rounded-lg p-2">
    <row>
        <col>Workout Date: {formattedDate}
        <border></border>
        <col>Workouts: {workout}
        <border></border>
        <col>Workout Notes: {workoutNotes}
    </row>
</div>

<style>
    border {
        border-right: solid;
        margin-right: 8px;
    }
</style>
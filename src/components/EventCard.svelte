<script lang="ts">
    import { goto } from "$app/navigation";
    import { formatDate } from "../helper/formatDate";
    import type { Member } from '../types';

    // export let gymName: string;
    // export let gymDescription: string; 
    // export let gymDate: string; 
    // export let guestName: string; 
    // export let guestPhoto: string; 
    // export let guestDesignation: string; 
    // export let hostName: string; 
    // export let hostPhoto: string; 
    // export let hostemail: string; 
    // export let members: Member[];
    // export let maxCapacity: number;
    // export let Workout: string;
    // export let Notes: string;

    export let workoutName: string;
    export let displayEx: any[];
    export let workoutDate: string;
    export let workoutNotes: string;

    const formattedDate = formatDate(workoutDate);
</script>

<!-- let gymName: string;
    let gymDescription: string;
    let gymDate: string;
    let maxCapacity: number;
    let gymPhoto: File;
    let availableEquipment: string; -->

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- If the click does not work check the pt2 at 44min. -->

<article 
on:keydown={() => {}}
    class="bg-secondary p-8 rounded-lg hover:bg-slate-800 hover:scale-110 duration-300 transistion-all cursor-pointer">
        <div class="flex flex-col">

            <!-- <h1 class="capitalize text-2xl font-bold tracking-widest">{gymName}</h1>
            <p class="py-2 text-gray-300 font-semibold">{gymDescription}</p> -->
            <!-- Host
            <p>Host</p>
            <div class="flex space-x-2 items-center">
                <img
                    src={hostPhoto} 
                    alt={hostName}
                    class="h-10 w-10 rounded-full object-cover"
                />
                <div class="flex flex-col">
                    <p>{hostName}</p>
                    <p>{hostemail}</p>
                </div>
            </div>
        -->

            <!--<p class="text-gray-400 mt-4">Workout Date : {formattedDate}</p>-->
            <p>Workouts: {workoutName}</p>
            
            <p>Workout Notes: {workoutNotes}</p>

        </div>
</article>
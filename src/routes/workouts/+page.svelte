<script lang="ts">
    import EventCard from '../../components/EventCard.svelte';
    import { collection, query, where, onSnapshot } from 'firebase/firestore';
    import { db } from "$lib/firebase";
    import type { TEvents } from "../../types";

let workouts : TEvents[] = []
const q = query(collection(db, "workouts"))
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach(doc => {
        workouts.push(doc.data() as TEvents)
        workouts = workouts // This is required bc SvelteKit does not updated arrays in this instance.
    })
})
console.log(workouts)

</script>

<main class="text-gray-100 max-w-5xl mx-auto">
    <h1 class="text-4xl font-bold my-5">Workouts</h1>
    <div class="px-4">
        {#each workouts as work (work.workout)}
        <button>
            <EventCard {...work}/>
        </button>
        {/each}
    </div>
</main>
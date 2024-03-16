<script lang="ts">
    import EventCard from '../../components/EventCard.svelte'
    import { collection, query, where, onSnapshot } from 'firebase/firestore';
    import { db } from "$lib/firebase";
    import type { TEvents } from "../../types";

let gyms : TEvents[] = []
const q = query(collection(db, "gyms"))
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach(doc => {
        gyms.push(doc.data() as TEvents)
        gyms = gyms // This is required bc SvelteKit does not updated arrays in this instance.
    })
})
console.log(gyms)

</script>

<main class="text-gray-100 mt-10 max-w-5xl mx-auto">
    <h1 class="text-5xl font-bold my-5">Gyms</h1>
    <div class="grid px-4 md:grid-cols-3 gap-8">
        {#each gyms as gym (gym.eventName)}
        <EventCard {... gym}/>
        {/each}
    </div>
</main>
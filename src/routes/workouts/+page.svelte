<script lang="ts">
    import EventCard from '../../components/EventCard.svelte';
    import { collection, query, where, onSnapshot } from 'firebase/firestore';
    import { db } from "$lib/firebase";
    import type { TEvents } from "../../types";
    import type { User } from 'firebase/auth';
    import { authStore } from '$lib/assets/gym/gym';

    let currentUser: User | null = null;
    authStore.subscribe((value) => {
        currentUser = value.user;
    });

    let workouts : TEvents[] = []
    const q = query(collection(db, "workoutTest3"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach(doc => {
            workouts.push(doc.data() as TEvents)
            workouts = workouts // This is required bc SvelteKit does not updated arrays in this instance.
        })
    })

</script>

<main class="text-gray-100 mt-10 max-w-5xl mx-auto">
    <div class="grid px-4 md:grid-cols-3 gap-8">
        {#each workouts as work (work.workoutName)}
            {#if work.userID === currentUser?.uid}
                <EventCard {...work}/>
            {/if}
        {/each}
    </div>
</main>
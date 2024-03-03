<script lang="ts">
    import EventCard from '../../components/EventCard.svelte'
</script>

<main class="text-gray-100 mt-10 max-w-5xl mx-auto">
    <h1 class="text-5xl font-bold my-5">
        Events
    </h1>
    <div class="grid px-4 md:grid-cols-3 gap-8">
        <EventCard/>
        <EventCard/>
        <EventCard/>
        <EventCard/>
    </div>
</main>
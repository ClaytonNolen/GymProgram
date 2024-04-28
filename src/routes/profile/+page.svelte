<script>
// @ts-nocheck -- giving a warning but necessary for our functionality

    import Workouts from '../workouts/+page.svelte';
    import BenchChart from "../../components/BenchChart.svelte";
    import SquatChart from "../../components/SquatChart.svelte";
    import DeadChart from "../../components/DeadChart.svelte";
    import CleanChart from "../../components/CleanChart.svelte";
	import { goto } from '$app/navigation';

    // Used to redirect to workout page when the button is pressed
    let workoutPage = false;
</script>

<main class="flex-col text-center text-2xl text-cream my-4">
    <!--button with toggle functionality that displays workouts page-->
    <button 
        on:click={() => goto("/workouts")}
        class="p-4 bg-secondary rounded-lg mt-12 font-bold w-400px hover:bg-cream hover:text-secondary hover:scale-110 duration-300 transistion-all cursor-pointer]">
        Workout History
    </button>

    {#if workoutPage === true}
        <!--display workout page-->
        <Workouts />
    {/if}

    <!--Used https://www.chartjs.org/docs/latest/configuration/responsive.html to increase chart size and responsiveness-->
    <!-- Tailwind margin code (mt and mb): https://tailwindcss.com/docs/margin-->
    <!--All four benchmark charts displayed in vertical order and resize when the page becomes smaler-->
    <div class="chart-container mt-10 mb-80" style ="position: relative; height:30vh; width:60vw"> 
        <BenchChart />
    </div>
    
    <div class="chart-container mb-80" style ="position: relative; height:30vh; width:60vw">
        <SquatChart />
    </div>

    <div class="chart-container mb-80" style ="position: relative; height:30vh; width:60vw">
        <DeadChart />
    </div>

    <div class="chart-container mb-80" style ="position: relative; height:30vh; width:60vw">
        <CleanChart />
    </div>
    

</main>
<!--Page is centered and adjusts sizing-->
<style> 
    main {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<script>
    import Workouts from '../workouts/+page.svelte';
    import BenchChart from "../../components/BenchChart.svelte";
    import SquatChart from "../../components/SquatChart.svelte";
    import DeadChart from "../../components/DeadChart.svelte";
    import CleanChart from "../../components/CleanChart.svelte";

    // Used to redirect to workout page when the button is pressed
    let workoutPage = false;
</script>

<main class="flex-col text-center text-2xl text-white my-4">
    <!--button with toggle functionality that displays workouts page-->
    <button 
        on:click={() => (workoutPage = !workoutPage)}
        class="p-4 bg-black rounded-lg mt-12 font-bold w-[200px]">
        Workouts
    </button>

    {#if workoutPage === true}
        <!--display workout page-->
        <Workouts />
    {/if}

    <!--Used https://www.chartjs.org/docs/latest/configuration/responsive.html to increase chart size and responsiveness-->
    <div class="chart-container" style ="position: relative; height:40vh; width:80vw">   <!--Centers the chart-->
        <BenchChart />
    </div>

    <!--<div class="chart-container space-y-10" style ="position: relative; height:40vh; width:80vw">
        <SquatChart />
    </div>

    <div class="chart-container space-y-10" style ="position: relative; height:40vh; width:80vw">
        <DeadChart />
    </div>

    <div class="chart-container space-y-10" style ="position: relative; height:40vh; width:80vw">
        <CleanChart />
    </div>
    -->

</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
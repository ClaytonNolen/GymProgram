<script>
    import Workouts from '../workouts/+page.svelte';

    // variables used for toggle functionality
    let workoutPage = false;
    let progressPage = false;
    let accountPage = false;
    let settingsPage = false;
</script>

<main class="flex-col text-center text-2xl text-white my-4">
    <!--button with toggle functionality that displays workouts page-->
    <button 
        on:click={() => (workoutPage = !workoutPage)}
        on:click={() => progressPage = false}
        on:click={() => accountPage = false}
        on:click={() => settingsPage = false}
        class="p-4 bg-black rounded-lg mt-12 font-bold w-[200px]">
        Workouts
    </button>

    {#if workoutPage === true}
        <!--display workout page-->
        <Workouts />
    {/if}

    <!--button with toggle functionality that displays progress page-->
    <button
        on:click={() => (progressPage = !progressPage)}
        on:click={() => workoutPage = false}
        on:click={() => accountPage = false}
        on:click={() => settingsPage = false}
        class="p-4 bg-black rounded-lg mt-12 font-bold w-[200px]">
        Progress
    </button>

    {#if progressPage === true}
        <!--progress page goes here-->
        Progress page goes here
    {/if}

    <!--button with toggle functionality that displays account page-->
    <button
        on:click={() => (accountPage = !accountPage)}
        on:click={() => workoutPage = false}
        on:click={() => progressPage = false}
        on:click={() => settingsPage = false}
        class="p-4 bg-black rounded-lg mt-12 font-bold w-[200px]">
        Account
    </button>

    {#if accountPage === true}
        <!--account page goes here-->
        Account page goes here
    {/if}

    <!--button with toggle functionality that displays settings page-->
    <button 
        on:click={() => (settingsPage = !settingsPage)}
        on:click={() => workoutPage = false}
        on:click={() => progressPage = false}
        on:click={() => accountPage = false}
        class="p-4 bg-black rounded-lg mt-12 font-bold w-[200px]">
        Settings
    </button>

    {#if settingsPage === true}
        <!--settings page goes here-->
        Settings page goes here
    {/if}

</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<script lang="ts">
	import { goto } from "$app/navigation";
    import picName from '$lib/assets/Rob Center.png';
</script>

<main>
        <!--Main Page - template for page with tailwind css code is from https://www.youtube.com/watch?v=fTsVYwxjyS4-->
    <div class="flex justify-center items-center h-screen"> 
        <div class="text-center"> 
            <img src={picName} alt="logo" class=" mx-auto w-3/4 lg:w-3/4 mb-6" />
            <h1 class="text-[40px] font-bold text-cream lg:w-[710px]"> <!--Title-->
                Welcome to The Gym Program
            </h1>
            <p class= "text-[20px] text-cream lg:w-[710px] mt-4"> <!--Description of the app-->
                Here, you can track your workouts at the Robertson Center and keep track of your progress over time.
            </p>
            <div class="flex flex-col px-10 sm:flex-row mt-10 gap-14">
                <!--Buttons and how they are navigated to different pages with "on:click"-->
                <button 
                on:click={() => goto("/create")} 
                class="py-[23px] px-[86px] rounded-lg bg-secondary text-xl text-cream w-[299px] hover:bg-cream hover:text-secondary duration-300 transittion-colors">
                    Create Workout</button>
                <button 
                on:click={() => goto("/tracker")}
                class="py-[23px] px-[86px] rounded-lg bg-secondary text-xl text-cream w-[299px] hover:bg-cream hover:text-secondary duration-300 transittion-colors">
                    Track Your Progress</button>
            </div>
        </div>
    </div>

    
</main>
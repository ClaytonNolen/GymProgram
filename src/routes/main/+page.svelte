<script lang="ts">
	import { goto } from "$app/navigation";

    import picName from '$lib/assets/Rob Center.png';
</script>
<main>
        <!--Main Page-->
    <div class="relative mt-[150px] p-2 lg:ml-[133px] flex"> 
        <div> 
            <h1 class="text-[32px] font-bold text-white lg:w-[710px]"> 
                Welcome to The Gym Program
            </h1>
            <div class="flex flex-col px-10 sm:flex-row mt-20 gap-14">
                <button 
                on:click={() => goto("/create")}
                class="py-[23px] px-[86px] bg-black text-xl text-white w-[299px] hover:bg-white hover:text-black duration-300 transittion-colors">
                    CREATE</button>
                <button 
                on:click={() => goto("/eventlist")}
                class="py-[23px] px-[86px] bg-black text-xl text-white w-[299px] hover:bg-white hover:text-black duration-300 transittion-colors">
                    Track Your Progress</button>
            </div>
        </div>
        <img src={picName} alt="logo" class="absolute -top[90px] left-[800px] h-[376px] w-[706px] hidden xl:block" />
    </div>
</main>
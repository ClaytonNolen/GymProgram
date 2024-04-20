<!-- For Button ICON: https://fontawesome.com/icons -->

<script lang="ts">
    import type { User } from 'firebase/auth';
    import { authStore, authHandlers } from '$lib/assets/gym/gym';
	import { goto } from "$app/navigation";
    import picName from '$lib/assets/Rob Center.png';
    import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

   
    // let workouts = [];
     let currentUser : User | null
     authStore.subscribe((value) => {
         currentUser = value.user

          // Bing AI Solution to fetching users workouts
    //     if (currentUser) {
    //     const q = query(collection(getFirestore(), 'users', currentUser.uid, 'workouts'));
    //     const querySnapshot = await getDocs(q);
    //     workouts = querySnapshot.docs.map(doc => doc.data());
    //     // Now 'workouts' contains all the workout data for the logged-in user
    // }

    })
</script>

{#if currentUser}
<!-- WARNING THIS IS DUPLICATED CODE FROM MAIN -->
    <main>
        <!--Main Page - template for page with tailwind css code is from https://www.youtube.com/watch?v=fTsVYwxjyS4-->
    <div class="flex justify-center items-center h-screen"> 
        <div class="text-center"> 
            <img src={picName} alt="logo" class=" mx-auto w-1/2 lg:w-1/2 mb-8" />
            <h1 class="text-[40px] font-bold text-white lg:w-[710px]"> <!--Title-->
                Welcome to The Gym Program
            </h1>
            <p class= "text-[20px] text-white lg:w-[710px] mt-4"> <!--Description of the app-->
                Here, you can track your workouts at the Robertson Center, or create your own gym that can keep track of additional workouts
            </p>
            <div class="flex flex-col px-10 sm:flex-row mt-20 gap-14">
                <!--Buttons and how they are navigated to different pages with "on:click"-->
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
    </div>
    </main>
<!-- <h1 class="text-2xl text-white font-bold">CURRENT USER IS LOGGED IN</h1> -->

{:else}
    <main class="flex flex-col items-center justify-center">
        <div class="mt-12">
            <h1 class="text-2xl text-white font-bold">Login</h1>
            <button on:click = { authHandlers.loginWithGoogle } class="p-4 bg-white rounded-lg mt-12 font-bold">
                <i class="fa-brands fa-google fa-xl" style="color: #FFD43B;"></i>
                Sign In with Google
            </button>
        <div/>
    </main>
{/if}
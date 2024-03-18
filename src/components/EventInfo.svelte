<script lang="ts">
    import type { User } from 'firebase/auth';
    import { formatDate } from '../helper/formatDate';
    import { authStore } from '$lib/assets/gym/gym';
    import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import { goto } from '$app/navigation';

    export let date: string;
    export let name: string;
    export let description: string;
</script>

<section class="mt-[60px] ml-[20px] xl:ml-[277px] text-white xl:col-span-2 pr-8">
    <p class="">formatted Date</p>
    <h1 class="pt-2 text-3xl font-bold">name</h1>
    <p class="pt-2">description</p>

    <h2 class="pt- text-xl font-bold">Join</h2>

    <form class="pt-6">
        <div class="flex flex-col">
            <label for="how">Where did you find us from?</label>
            <input 
                id="how" 
                type="text" 
                placeholder="Recommended by someone, sign, etc." 
                class="py-4 pl-5 pr-24 bg-transparent border border-clr"
            />
        </div>
        <div class="flex flex-col">
            <label for="how">Are you a student or staff?</label>
            <input 
                id="how" 
                type="text" 
                placeholder="Position" 
                class="py-4 pl-5 pr-24 bg-transparent border border-clr"
            />
        </div>
        <div class="flex flex-col">
            <label for="how">Southwestern Email</label>
            <input 
                id="how" 
                type="text" 
                placeholder="example@southwestern.edu" 
                class="py-4 pl-5 pr-24 bg-transparent border border-clr"
            />
        </div>
        <div class="flex flex-col col-span-2">
            <label for="how">What are your goals?</label>
            <input 
                id="how" 
                type="text" 
                placeholder="I want to track my progress, increase weight, lose weight, etc." 
                class="py-4 pl-5 pr-24 bg-transparent border border-clr"
            />
            <button class="py-6 px-8 bg-yellow text-black mt-8 hover:scale-105 hover:bg-green-500 transition-all duration-300 disabled:cursor-not-allowed">Submit</button>
        </div>
    </form>
</section>
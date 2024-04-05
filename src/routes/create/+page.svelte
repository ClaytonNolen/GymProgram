<script lang="ts">
    import { doc, setDoc } from 'firebase/firestore';
    import { db, storage } from '$lib/firebase';
    import type { User } from 'firebase/auth';
    import { authStore } from '$lib/assets/gym/gym';
    import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { goto } from '$app/navigation';
    import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from 'flowbite-svelte';


    let workout: string;
    let workoutNotes: string;
    let workoutDate: string;
    let workoutTitle: string;

    let gymName: string;
    let gymDescription: string;
    let gymDate: string;
    let maxCapacity: number;
    let gymPhoto: File;
    let availableEquipment: string;
    let loading = false;
    let currentUser: User | null = null;
    authStore.subscribe((value) => {
        currentUser = value.user;
    });

    function handleFileInputChange(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		if (inputElement.files && inputElement.files.length > 0) {
			gymPhoto = inputElement.files[0];
		}
	}

    async function createGym() {
		if (workout === undefined || loading === true)
			return alert('Must include at least one workout');
		loading = true;
    

        const workoutInfo = {
            workout: workout,
            workoutNotes: workoutNotes,
            workoutDate: workoutDate,
            workoutTitle: workoutTitle
        };

        try {
			const gymRef = doc(db, 'workouts', workout);
			setDoc(gymRef, workoutInfo, { merge: true });
			goto('/profile');
		} catch (error) {
			console.log(`An error ocuured while createing a document ${error}`);
		}
		loading = false;
    }
    
</script>

<main class="text-gray-100 mt-10">
    <div>
        <!-- input box -->
        <div class="max-w-4xl mx-auto bg-secondary rounded-lg flex flex-col p-5">
            <h1 class="text-center text-white text-2xl">Create</h1>

             <!-- Workout Name-->
             <div class="flex flex-col my-4">
                <label for="workout-title">Workout Name</label>
                <input 
                    id="workout-title" 
                    type="text" 
                    bind:value={workoutTitle}
                    placeholder="Workout Name e.g. Leg Day"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div>

            <!-- Workout -->
            <div class="flex flex-col my-4">
                <label for="workout">Exercise</label>
                <input 
                    id="workout" 
                    type="string" 
                    bind:value={workout}
                    placeholder= "Select Workout..."
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div>

             <!-- Workout Date -->
             <div class="flex flex-col my-4">
                <label for="workout-date">Workout Date</label>
                <input 
                    id="workout-date" 
                    type="date" 
                    bind:value={workoutDate}
                    placeholder="Enter Date"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div>

            <!-- Workout Notes -->
            <div class="flex flex-col my-4">
                <label for="workout-notes">Notes</label>
                <input 
                    id="workout-notes" 
                    type="text" 
                    bind:value={workoutNotes}
                    placeholder="Additional Workout Information..."
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div>

            <button 
            disabled={loading}
            on:click={createGym}
            class="py-2 px-8 bg-white text-black mt-8 disabled:bg-white/25 disabled:cursor-not-allowed"
            >{loading ? 'Creating' : 'Create'}</button>
        </div>
    </div>
</main>
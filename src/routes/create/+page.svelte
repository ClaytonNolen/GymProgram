<script lang="ts">
    import { doc, setDoc } from 'firebase/firestore';
    import { db, storage } from '$lib/firebase';
    import type { User } from 'firebase/auth';
    import { authStore } from '$lib/assets/gym/gym';
    import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { goto } from '$app/navigation';

    let workout: string;
    let workoutNotes: string;
    let workoutDate: string;

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
    
        const gymInfo = {
			gymName: gymName,
			gymDescription: gymDescription,
			gymDate: gymDate,
			maxCapacity: maxCapacity,
			gymPhoto: await uploadGymPhoto(),
			availableEquipment: availableEquipment,
			hostName: currentUser?.displayName,
			hostPhoto: currentUser?.photoURL,
			hostemail: currentUser?.email,
			members: []
        };

        const workoutInfo = {
            workout: workout,
            workoutNotes: workoutNotes,
            workoutDate: workoutDate
        };

        try {
			const gymRef = doc(db, 'gyms', gymName);
			setDoc(gymRef, gymInfo, { merge: true });
			goto('/eventlist');
		} catch (error) {
			console.log(`An error ocuured while createing a document ${error}`);
		}
		loading = false;
    }
    async function uploadGymPhoto() {
            if (!gymPhoto) {
                return null;
            }

            try {
                const storageRef = ref(storage, 'guest_photos/' + gymPhoto.name);
                await uploadBytes(storageRef, gymPhoto);
                const downloadURL = await getDownloadURL(storageRef);
                return downloadURL;
            } catch (error) {
                console.log(`An error occurred while uploading the guest photo ${error}`);
                return null;
            }
	    }
    
</script>

<main class="text-gray-100 mt-10">
    <div>
        <!-- input box -->
        <div class="max-w-4xl mx-auto bg-secondary rounded-lg flex flex-col p-5">
            <h1 class="text-center text-white text-2xl">Create</h1>
       
            <!-- Workout -->
            <div class="flex flex-col my-4">
                <label for="workout">Workout</label>
                <input 
                    id="workout" 
                    type="text" 
                    bind:value={workout}
                    placeholder="Select Workout..."
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
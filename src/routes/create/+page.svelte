<script lang="ts">
    import { doc, setDoc } from 'firebase/firestore';
    import { db, storage } from '$lib/firebase';
    import type { User } from 'firebase/auth';
    import { authStore } from '$lib/assets/gym/gym';
    import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { goto } from '$app/navigation';

    // NEW
    let workOut: string;

    // OLD
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
		if (workOut === undefined || gymDescription === undefined || loading === true)
			return alert('Gym name and description cannot be empty');
		loading = true;
    
        const gymInfo = {
			workOut: workOut,
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
        try {
			const gymRef = doc(db, 'workouts', workOut);
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
            <h1 class="text-center text-white text-2xl">Create Your Workout</h1>
            <!-- Gym Name -->
            <div class="flex flex-col my-4">
                <label for="workout">Workout</label>
                <input 
                    id="workout" 
                    type="text"
                    bind:value={workOut}
                    placeholder="Benchpress"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div>
            <!-- Gym Date -->
            <div class="flex flex-col my-4">
                <label for="gym-date">Gym Date</label>
                <input 
                    id="gym-date" 
                    type="date" 
                    bind:value={gymDate}
                    placeholder="Enter Date"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div>
            <div class="flex my-4 gap-4">

            <!-- Workout Notes -->
            <div class="flex flex-col my-4">
                <label for="gym-description">Notes</label>
                <input 
                    id="workout-notes" 
                    type="text" 
                    bind:value={gymDescription}
                    placeholder="Enter any wanted notes or N/A"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div>
                <!-- Max Capacity -->
                <!-- <div class="flex flex-col flex-1">
                    <div class="flex flex-col flex-1 mb-4">
                        <label for="max-capacity">Max Capacity</label>
                        <input 
                            id="max-capacity" 
                            type="text" 
                            bind:value={maxCapacity}
                            placeholder="Enter Max Capacity"
                            class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                        />
                    </div>
                </div>
            </div> -->
            <!-- Equipment Available -->
            <!-- <div class="flex flex-col flex-1">
                <label for="available-equipment">Equipment Available</label>
                <input 
                    id="available-equipment" 
                    type="text" 
                    bind:value={availableEquipment}
                    placeholder="Enter Equipment Available In Gym"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div> -->
            <!-- Gym Photo -->
            <!-- <div class="flex flex-col flex-1">
                <label for="gym-photo">Upload Gym Photo</label>
                <input 
                    id="gym-photo" 
                    type="file" 
                    on:change={handleFileInputChange}
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div> -->
            <button 
            disabled={loading}
            on:click={createGym}
            class="py-2 px-8 bg-white text-black mt-8 disabled:bg-white/25 disabled:cursor-not-allowed"
            >{loading ? 'Creating' : 'Create'}</button>
        </div>
    </div>
</main>
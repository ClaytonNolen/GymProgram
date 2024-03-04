<script lang="ts">
    import { doc, setDoc } from 'firebase/firestore';
    import { db, storage } from '$lib/firebase';
    import type { User } from 'firebase/auth';
    import { authStore } from '$lib/assets/gym/gym';
    import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { goto } from '$app/navigation';

    let eventName: string;
    let eventDescription: string;
    let eventDate: string;
    let guestName: string;
    let guestPhoto: File | undefined;
    let guestDesignation: string;
    let loading = false;
    let currentUser: User | null = null;

    authStore.subscribe((value) => {
        currentUser = value.user;
    });

    function handleFileInputChange(event: Event) {
        const inputElement =event.target as HTMLInputElement;
        if (inputElement.files && inputElement.files.length > 0) {
            guestPhoto = inputElement.files[0];
        }
    }

    async function createEvent() {
        if (eventName === undefined || eventDescription === undefined || loading === true)
            return alert('Fields cannot be empty');
        loading = true;

        const eventInfo = {
            eventName: eventName,
            eventDescription: eventDescription,
            eventDate: eventDate,
            guestName: guestName,
            guestPhoto: await uploadGuestPhoto(),
            guestDesignation: guestDesignation,
            hostName: currentUser?.displayName,
            hostPhoto: currentUser?.photoURL,
            hostEmail: currentUser?.email,
            members: []
        };

        try {
            const eventRef = doc(db, "events", eventName)
            setDoc(eventRef, eventInfo, {merge : true})
            goto("/eventlist")
        } catch (error) {
            console.log('An error occured while creating event ${error}')
        }
        loading = false
    }

async function uploadGuestPhoto() {
    if (!guestPhoto) {
        return null;
    }
    try {
        const storageRef = ref(storage, "guest_photos/" + guestPhoto.name)
        await uploadBytes(storageRef, guestPhoto)
        const downloadUrl = await getDownloadURL(storageRef)
        return downloadUrl
    } catch (error) {
        console.log('An error occured while uploading the guest photo')
    }
}

</script>

<main class="text-gray-100 mt-10">
    <div>
        <!-- input box -->
        <div class="max-w-4xl mx-auto bg-secondary rounded-lg flex flex-col p-5">
            <h1 class="text-center text-white text-2xl">Create</h1>
            <!-- Event Name -->
            <div class="flex flex-col my-4">
                <label for="event-name">Event Name</label>
                <input 
                    id="event-name" 
                    type="text"
                    bind:value={eventName}
                    placeholder="Enter Event Name"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div>
            <!-- Description -->
            <div class="flex flex-col my-4">
                <label for="event-description">Event Description</label>
                <input 
                    id="event-description" 
                    type="text"
                    bind:value={eventDescription}
                    placeholder="Enter Event Description"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div>
            <!-- Event Date -->
            <div class="flex flex-col my-4">
                <label for="event-date">Event Date</label>
                <input 
                    id="event-date" 
                    type="date" 
                    bind:value={eventDate}
                    placeholder="Enter Event Date"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div>
            <!-- Input for guests -->
            <div class="flex my-4 gap-4">
                <!-- Guest Name -->
                <div class="flex flex-col flex-1">
                    <div class="flex flex-col flex-1 mb-4">
                        <label for="guest">Enter Guest Name</label>
                        <input 
                            id="guest" 
                            type="text" 
                            bind:value={guestName}
                            placeholder="Enter Guest Name"
                            class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                        />
                    </div>
                    <!-- Guest Photo -->
                    <div class="flex flex-col flex-1">
                        <label for="guest-photo">Upload Guest Photo</label>
                        <input 
                            id="guest-photo" 
                            type="file"
                            on:change={handleFileInputChange}
                            class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                        />
                    </div>
                </div>
            </div>
            <!-- Guest Designation -->
            <div class="flex flex-col flex-1">
                <label for="designation">Enter Guest Designation</label>
                <input 
                    id="designation" 
                    type="text" 
                    bind:value={guestDesignation}
                    placeholder="Enter Guest Designation"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div>
            <button 
                on:click={createEvent}
                disabled={loading}
                class="py-2 px-8 bg-white text-black mt-8 disabled:bg-white/25 disabled:cursor-not-allowed">Create
                {loading ? 'Registering' : 'Register for this event'}
            </button>
        </div>
    </div>
</main>
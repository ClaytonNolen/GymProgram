<script lang="ts">

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
                    placeholder="Enter Guest Designation"
                    class="py-4 pl-5 pr-24 bg-24 bg-transparent border border-borderclr"
                />
            </div>
            <button class="py-2 px-8 bg-white text-black mt-8 disabled:bg-white/25 disabled:cursor-not-allowed">Create</button>
        </div>
    </div>
</main>
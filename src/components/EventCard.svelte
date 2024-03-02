<script lang="ts">

</script>

<article class="bg-secondary p-8 rounded-lg hover:bg-slate-800 hover:scale-110 duration-300 transistion-all cursor-pointer">
    <div class="flex flex-col">
        <h1 class="capitalize text-2xl font-bold tracking-widest">
            eventName
        </h1>
        <p class="py-2 text-gray-300 font-semibold">
            eventDescription
        </p>

        <!-- Host -->
        <p>
            Host
        </p>
        <div class="flex space-x-2 items-center">
            <img
                src="" 
                alt=""
                class="h-10 w-10 rounded-full object-cover"
            />
            <div class="flex flex-col">
                <p>
                    hostName
                </p>
                <p>
                    hostEmail
                </p>
            </div>
        </div>

        <!-- Guest -->
        <p class="pt-4">
            Guest
        </p>
        <div class="flex space-x-2 items-center">
            <img
                src="" 
                alt=""
                class="h-10 w-10 rounded-full object-cover"
            />
            <div class="flex flex-col">
                <p>
                    hostName
                </p>
                <p>
                    hostEmail
                </p>
            </div>
        </div>

        <p class="text-gray-400 mt-4">
            Event Date : formattedDate
        </p>
        <p>
            Members members.length
        </p>
    </div>
</article>
<script lang="ts">
	import EventInfo from "../../../components/EventInfo.svelte";
	import GuestInfo from "../../../components/GuestInfo.svelte";

    import type { PageData } from './$types';
    export let data: PageData;
    console.log(data);
</script>

<div class="grid xl:grid-cols-3">
    <EventInfo 
        date={data.gymDate} 
        name={data.gymName} 
        description={data.gymDescription}
    />
    <!-- <GuestInfo
        guestName={data.guestName}
        guestDesignation={data.guestDesignation}
        guestPhoto={data.guestPhoto}
        hostName={data.hostName}
        hostEmail={data.hostEmail}
        hostPhoto={data.hostPhoto}
        members={data.members}
    /> -->
</div>

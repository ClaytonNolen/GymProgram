<!-- For Button ICON: https://fontawesome.com/icons -->

<script language="ts">
    import { authHandlers } from "$lib/assets/gym/gym";
</script>

<main class="flex flex-col items-center justify-center">
    <div class="mt-12">
        <h1 class="text-2xl text-white font-bold">Login</h1>
        <button on:click = { authHandlers.loginWithGoogle } class="p-4 bg-white rounded-lg mt-12 font-bold">
            <i class="fa-brands fa-google fa-xl" style="color: #FFD43B;"></i>
            Sign In with Google
        </button>
    <div/>
</main>
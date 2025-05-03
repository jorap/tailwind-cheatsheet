<script lang="ts">
    import { fade } from "svelte/transition";
    let { copied, toastVisible } = $props();
</script>

{#if toastVisible}
    <div
        transition:fade
        class="toast fixed bottom-4 right-4 py-2 px-6 text-white dark:text-gray-900 rounded-md bg-sky-700 dark:bg-sky-300 text-sm"
    >
        <span class="italic">Copied</span>
        <code>.{copied}</code>
    </div>
{/if}
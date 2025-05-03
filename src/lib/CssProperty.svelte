<script lang="ts">
    import ClassesTable from "./ClassesTable.svelte";
    let { b, copied = $bindable(), toastVisible = $bindable() } = $props();
</script>

<details
    class="group border-t border-sky-500/20"
    ontoggle={(e) => e.target.querySelector("a").classList.toggle("hidden")}
>
    <summary
        class="cursor-pointer flex justify-between py-2 px-4 hover:bg-white dark:hover:bg-black group-open:bg-white dark:group-open:bg-black"
    >
        <h3 class="text-xs font-semibold">{b.title}</h3>

        <div class="flex gap-2">
            <a
                href={b.url}
                target="_blank"
                class="hidden flex items-center gap-1 text-xs font-semibold not-italic text-sky-500 border border-sky-500 px-1 rounded"
            >
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
                    <path fill="#38bdf8" d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597c6.398-8.531 13.867-11.73 22.398-9.597c4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602q-9.6 12.803-22.399 9.602c-4.87-1.215-8.347-4.746-12.207-8.66c-6.27-6.367-13.53-13.738-29.394-13.738M32.004 64c-17.066 0-27.73 8.531-32 25.602Q9.603 76.799 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66c6.274 6.367 13.536 13.738 29.395 13.738c17.066 0 27.73-8.53 32-25.597q-9.6 12.797-22.399 9.597c-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64m0 0" />
                </svg>
                Docs
            </a>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
            >
                <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M12 6.273a.73.73 0 0 0-.18-.479L8.8 2.342A1 1 0 0 0 8.046 2h-.092a1 1 0 0 0-.753.341L4.18 5.794A.727.727 0 0 0 4.727 7h6.546A.727.727 0 0 0 12 6.273M4 9.727c0 .176.064.346.18.479l3.02 3.453a1 1 0 0 0 .753.341h.092a1 1 0 0 0 .753-.341l3.021-3.453A.727.727 0 0 0 11.273 9H4.727A.727.727 0 0 0 4 9.727"
                    clip-rule="evenodd"
                />
            </svg>
        </div>
    </summary>
    <div class="px-4 pb-2 bg-white dark:bg-black">
        <p class="text-sm italic mb-2">{b.description}</p>
        <ClassesTable {b} bind:copied bind:toastVisible />
    </div>
</details>

<style>
    details > summary {
        list-style: none;
    }
    details > summary::-webkit-details-marker {
        display: none;
    }
</style>

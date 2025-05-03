
<script lang="ts">
    let { b, copied=$bindable(), toastVisible=$bindable() } = $props();
</script>

<div class="max-h-80 overflow-y-auto scrollbar">
<table class="w-full">
    <tbody>
        {#each b.table as c}
            <tr class="text-xs cursor-copy font-mono hover:bg-gray-100 dark:hover:bg-gray-900 group/tr" onclick={() => {
                navigator.clipboard.writeText(c.class)
                copied = c.class 
                toastVisible = true
                setTimeout(() => {
                    toastVisible = false
                }, 1500);
            }}>
                <td class=" pt-1 pb-1 text-sky-500 "><code>.{c.class}</code></td>
                <td class=" p-1 text-sky-500 "><code>{c.properties}</code></td>
                <td class=" pt-1 pb-1 pr-1 italic">{c.value}</td>
            </tr>
        {/each}
    </tbody>
</table>
</div>

<style>
    td {
        white-space: pre-wrap;
    }
</style>
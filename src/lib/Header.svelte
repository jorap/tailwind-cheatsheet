<script>
    import v4 from "$lib/json/v4.1.json";
    import v3 from "$lib/json/v3.4.17.json";
    import v2 from "$lib/json/v2.2.16.json";
    import v1 from "$lib/json/v1.9.0.json";
    import v0 from "$lib/json/v0.7.4.json";
    import { tw_versions } from "$lib/appStore";
    import SearchInput from "./SearchInput.svelte";
    import ThemeSwitch from "./ThemeSwitch.svelte";

    let { query, selected_v = $bindable(), jsondata = $bindable() } = $props();
    let expanded = $state(false);

    async function loadData() {
        switch (selected_v) {
            case tw_versions[0]: jsondata = v4; break;
            case tw_versions[1]: jsondata = v3; break;
            case tw_versions[2]: jsondata = v2; break;
            case tw_versions[3]: jsondata = v1; break;
            case tw_versions[4]: jsondata = v0; break;
        }
    }
</script>

<header class="px-4">
    <div class="flex justify-between">
        <div class="font-bold">
            <span class="text-sky-500 text-sm ">
                Tailwind CSS
                <select
                    class="bg-transparent border border-sky-500/40 rounded-full text-xs outline-none"
                    bind:value={selected_v}
                    onchange={loadData}
                >
                    {#each tw_versions as version}
                        <option value={version}>v{version}</option>
                    {/each}
                </select>
            </span>
            <br />
            <span class="text-xl lg:text-3xl">Cheatsheet</span>
        </div>
        <div class="flex gap-2">
            <a href="https://ko-fi.com/pk504b" target="_blank" aria-label="Ko-fi" class="sm:hidden md:inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" fill-opacity="0" d="M17 14v4c0 1.66 -1.34 3 -3 3h-6c-1.66 0 -3 -1.34 -3 -3v-4Z">
                        <animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.15s" values="0;0.3" />
                    </path>
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path stroke-dasharray="48" stroke-dashoffset="48" d="M17 9v9c0 1.66 -1.34 3 -3 3h-6c-1.66 0 -3 -1.34 -3 -3v-9Z">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0" />
                        </path>
                        <path stroke-dasharray="14" stroke-dashoffset="14" d="M17 9h3c0.55 0 1 0.45 1 1v3c0 0.55 -0.45 1 -1 1h-3">
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0" />
                        </path>
                        <mask id="lineMdCoffeeHalfEmptyTwotoneLoop0">
                            <path stroke="#fff" d="M8 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M12 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M16 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4">
                                <animateMotion calcMode="linear" dur="3s" path="M0 0v-8" repeatCount="indefinite" />
                            </path>
                        </mask>
                        <rect width="24" height="0" y="7" fill="currentColor" mask="url(#lineMdCoffeeHalfEmptyTwotoneLoop0)">
                            <animate fill="freeze" attributeName="y" begin="0.8s" dur="0.6s" values="7;2" />
                            <animate fill="freeze" attributeName="height" begin="0.8s" dur="0.6s" values="0;5" />
                        </rect>
                    </g>
                </svg>
            </a>
            <a
                class=""
                href="https://github.com/pk504b/tailwind-cheatsheet"
                target="_blank"
                aria-label="GitHub"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                    />
                </svg>
            </a>
            <ThemeSwitch />
        </div>
    </div>

    <div class="flex gap-2 my-8">
        <SearchInput {query} />
        <button
            aria-label="Expand/Collapse"
            class="bg-sky-500 px-6 rounded-md"
            onclick={() => {
                if (expanded) {
                    document
                        .querySelectorAll("details")
                        .forEach((e) => (e.open = false));
                    expanded = false;
                } else {
                    document
                        .querySelectorAll("details")
                        .forEach((e) => (e.open = true));
                    expanded = true;
                }
            }}
        >
            {#if expanded}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M4 12h16v2H4zm0-3h16v2H4zm12-5l-4 4l-4-4h3V1h2v3zM8 19l4-4l4 4h-3v3h-2v-3z"
                    />
                </svg>
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M13 9v6h3l-4 4l-4-4h3V9H8l4-4l4 4zM4 2h16v2H4zm0 18h16v2H4z"
                    />
                </svg>
            {/if}
        </button>
    </div>
</header>

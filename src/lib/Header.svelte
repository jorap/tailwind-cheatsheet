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
            case tw_versions[0]:
                jsondata = v4;
                break;
            case tw_versions[1]:
                jsondata = v3;
                break;
            case tw_versions[2]:
                jsondata = v2;
                break;
            case tw_versions[3]:
                jsondata = v1;
                break;
            case tw_versions[4]:
                jsondata = v0;
                break;
        }
    }
</script>

<header class="px-0">
    <!-- Desktop layout (default) -->
    <div class="hidden md:flex justify-between items-center">
        <div class="font-bold site-title">
            <span class="text-sky-500 text-lg lg:text-xl">
                Tailwind CSS <span class="text-black dark:text-white">Cheatsheet</span>
                <select
                    class="bg-transparent border border-sky-500/40 rounded-full text-sm outline-none"
                    bind:value={selected_v}
                    onchange={loadData}
                >
                    {#each tw_versions as version}
                        <option value={version}>v{version}</option>
                    {/each}
                </select>
            </span>
        </div>

        <div class="flex gap-2 search-bar flex-1 mx-4">
            <SearchInput {query} />
            <button
                aria-label="Expand/Collapse"
                class="bg-sky-500 px-4 rounded-md"
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

        <div class="flex gap-2 site-options">
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

    <!-- Mobile and tablet layout -->
    <div class="flex flex-col md:hidden">
        <div class="flex justify-between items-center mb-3 mt-2">
            <div class="font-bold site-title">
                <span class="text-sky-500 text-lg">
                    Tailwind CSS <span class="text-black dark:text-white">Cheatsheet</span>
                    <select
                        class="bg-transparent border border-sky-500/40 rounded-full text-sm outline-none ml-1"
                        bind:value={selected_v}
                        onchange={loadData}
                    >
                        {#each tw_versions as version}
                            <option value={version}>v{version}</option>
                        {/each}
                    </select>
                </span>
            </div>

            <div class="flex gap-2 site-options">
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

        <div class="flex gap-2 search-bar w-full mb-3">
            <SearchInput {query} />
            <button
                aria-label="Expand/Collapse"
                class="bg-sky-500 px-4 rounded-md"
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
    </div>
</header>

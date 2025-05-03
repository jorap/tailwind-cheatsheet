<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount, onDestroy } from "svelte";
    import { fade } from "svelte/transition";
    let { query } = $props();
    let searchInput: HTMLInputElement;
    let kbd: HTMLElement;

    let isCtrlPressed = false;

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Control" || event.key === "Meta") {
            isCtrlPressed = true;
        }

        // Detect Ctrl + K
        if (isCtrlPressed && event.key === "k") {
            event.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key === "Control" || event.key === "Meta") {
            isCtrlPressed = false;
        }
    };

    onMount(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    });

    onDestroy(() => {
        // Clean up the event listeners when the component is destroyed
        if (browser) {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        }
    });

    function searchInContent(el: Element, searchText: string): boolean {
        // Search in headings
        const h2Text = el.querySelector('h2')?.textContent || '';
        const h3Text = el.querySelector('h3')?.textContent || '';
        
        // Search in description text
        const descriptionText = el.querySelector('p.text-sm.italic')?.textContent || '';
        
        // Search in class names and CSS properties
        const classNames = Array.from(el.querySelectorAll('td:first-child code'))
            .map(code => code.textContent || '')
            .join(' ');
        
        const cssProperties = Array.from(el.querySelectorAll('td:nth-child(2) code'))
            .map(code => code.textContent || '')
            .join(' ');
            
        const combinedText = (h2Text + ' ' + h3Text + ' ' + descriptionText + ' ' + classNames + ' ' + cssProperties).toLowerCase();
        return combinedText.includes(searchText.toLowerCase());
    }
</script>

<div class="w-full relative">
    <input
        bind:this={searchInput}
        onfocus={() => {
            kbd.classList.replace("opacity-100", "opacity-0");
            searchInput.select();
        }}
        onblur={() => kbd.classList.replace("opacity-0", "opacity-100")}
        type="text"
        class="w-full bg-transparent focus:outline-none text-sm border-2 border-sky-500 px-2 py-2 rounded-md flex justify-center items-center gap-2"
        placeholder="Search..."
        bind:value={query}
        oninput={() => {
            const details = document.querySelectorAll("details");
            if (query === "") {
                details.forEach( el => {
                    el.classList.remove("hidden")
                    el.open = false
                } );
            }
            else if (query.length >= 2) {
                details.forEach((el) => {
                    // Search in all content
                    searchInContent(el, query)
                        ? el.classList.remove("hidden")
                        : el.classList.add("hidden");
                        
                    // Open only the ones that does not have the word "Color"
                    el.querySelector('h3')?.textContent?.includes('Color') ? el.open = false : el.open = true;
                });
            }
        }}
    />

    <kbd
        bind:this={kbd}
        transition:fade
        class="absolute top-1/2 right-2 -translate-y-1/2 bg-sky-500 text-white px-1 rounded text-xs opacity-100 transition"
        >⌘ K</kbd
    >
</div>

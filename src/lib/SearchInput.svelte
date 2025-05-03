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
        const h2Text = el.querySelector("h2")?.textContent || "";
        const h3Text = el.querySelector("h3")?.textContent || "";

        // Search in description text
        const descriptionText =
            el.querySelector("p.text-sm.italic")?.textContent || "";

        // Search in class names and CSS properties
        const classNames = Array.from(
            el.querySelectorAll("td:first-child code"),
        )
            .map((code) => code.textContent || "")
            .join(" ");

        const cssProperties = Array.from(
            el.querySelectorAll("td:nth-child(2) code"),
        )
            .map((code) => code.textContent || "")
            .join(" ");

        const combinedText = (
            h2Text +
            " " +
            h3Text +
            " " +
            descriptionText +
            " " +
            classNames +
            " " +
            cssProperties
        ).toLowerCase();
        return combinedText.includes(searchText.toLowerCase());
    }

    // Highlight matching text in search results
    function highlightMatches(searchTerm: string) {
        if (!searchTerm || searchTerm.length < 2) {
            // Remove existing highlights when search is cleared
            clearHighlights();
            return;
        }

        // Clear previous highlights first
        clearHighlights();

        // Only process visible details
        const visibleDetails = document.querySelectorAll(
            "details:not(.hidden)",
        );

        visibleDetails.forEach((detail) => {
            // Elements to highlight within this detail
            const elementsToHighlight = [
                ...detail.querySelectorAll("h3"), // Property titles
                ...detail.querySelectorAll("p.text-sm.italic"), // Descriptions
                ...detail.querySelectorAll("td:first-child code"), // Class names
                ...detail.querySelectorAll("td:nth-child(2) code"), // CSS properties
            ];

            elementsToHighlight.forEach((el) => {
                if (!el.textContent) return;

                // Create a safe regex pattern
                const escapedSearchTerm = searchTerm.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    "\\$&",
                );
                const regex = new RegExp(`(${escapedSearchTerm})`, "gi");

                // Handle different element types appropriately
                if (el.tagName === "CODE") {
                    // For code elements, we can use innerHTML
                    const originalText = el.textContent;
                    if (
                        originalText
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    ) {
                        // Store original for restoring later
                        el.setAttribute("data-original", originalText);
                        el.innerHTML = originalText.replace(
                            regex,
                            '<mark class="bg-yellow-200 dark:bg-yellow-200 rounded px-0.5">$1</mark>',
                        );
                    }
                } else {
                    // For other elements, handle text nodes
                    highlightTextNode(el, regex);
                }
            });
        });
    }

    // Helper function to highlight text within text nodes
    function highlightTextNode(element: Element, regex: RegExp) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
        );

        const textNodes = [];
        let node;

        // Collect text nodes
        while ((node = walker.nextNode())) {
            if (node.textContent && regex.test(node.textContent)) {
                textNodes.push(node);
            }
        }

        // Process text nodes
        textNodes.forEach((textNode) => {
            const parent = textNode.parentNode;
            if (!parent) return;

            const text = textNode.textContent || "";
            const fragment = document.createDocumentFragment();

            // Reset regex lastIndex
            regex.lastIndex = 0;

            let lastIndex = 0;
            let match;

            // Find and replace all matches
            while ((match = regex.exec(text)) !== null) {
                // Add text before match
                if (match.index > lastIndex) {
                    fragment.appendChild(
                        document.createTextNode(
                            text.substring(lastIndex, match.index),
                        ),
                    );
                }

                // Create highlight
                const mark = document.createElement("mark");
                mark.className =
                    "bg-yellow-200 dark:bg-yellow-200 rounded px-0.5";
                mark.textContent = match[0];
                fragment.appendChild(mark);

                lastIndex = match.index + match[0].length;
            }

            // Add remaining text
            if (lastIndex < text.length) {
                fragment.appendChild(
                    document.createTextNode(text.substring(lastIndex)),
                );
            }

            // Replace original node with highlighted fragment
            parent.replaceChild(fragment, textNode);
        });
    }

    // Clear all highlights
    function clearHighlights() {
        // Restore original content in code elements
        document.querySelectorAll("code[data-original]").forEach((el) => {
            el.innerHTML = el.getAttribute("data-original") || "";
            el.removeAttribute("data-original");
        });

        // Remove mark elements and restore text nodes
        document.querySelectorAll("mark").forEach((mark) => {
            const parent = mark.parentNode;
            if (parent) {
                parent.replaceChild(
                    document.createTextNode(mark.textContent || ""),
                    mark,
                );
                parent.normalize(); // Merge adjacent text nodes
            }
        });
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
        class="w-full bg-transparent focus:outline-none text-sm border-2 border-sky-700 dark:border-sky-300 px-2 py-2 rounded-md flex justify-center items-center gap-2"
        placeholder="Search..."
        bind:value={query}
        oninput={() => {
            const details = document.querySelectorAll("details");
            if (query === "") {
                details.forEach((el) => {
                    el.classList.remove("hidden");
                    el.open = false;
                });
                clearHighlights(); // Clear highlights when search is empty
            } else if (query.length >= 2) {
                details.forEach((el) => {
                    // Search in all content
                    searchInContent(el, query)
                        ? el.classList.remove("hidden")
                        : el.classList.add("hidden");

                    // Open only the ones that does not have the word "Color"
                    el.querySelector("h3")?.textContent?.includes("Color")
                        ? (el.open = false)
                        : (el.open = true);
                });

                // Apply highlighting with slight delay to ensure DOM is updated
                setTimeout(() => highlightMatches(query), 50);
            }
        }}
    />

    <kbd
        bind:this={kbd}
        transition:fade
        class="absolute top-1/2 right-2 -translate-y-1/2 bg-sky-800 dark:bg-sky-300 dark:text-gray-900 text-white px-1 rounded text-xs opacity-100 transition"
        >⌘ K</kbd
    >
</div>

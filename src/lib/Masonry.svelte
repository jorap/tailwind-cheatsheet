<script lang="ts">
  import { onMount } from "svelte";
  let parent: HTMLDivElement;
  let { children, gap = 10 } = $props();
  let numCols = $state(4)
  let items = $state<Element[]>([])

  const handleResize = () => {
    if (window.visualViewport) {
      const viewport = window.visualViewport;
      const isKeyboardOpen = viewport.height < window.innerHeight;

      // Only update layout if the keyboard is not open
      if (!isKeyboardOpen) {
        updateLayout();
      }
    } else {
      // Fallback for browsers that don't support visualViewport
      updateLayout();
    }
  };

  export const updateLayout = () => {
    const width = document.documentElement.offsetWidth;

    numCols = width < 640 ? 1 : width < 768 ? 2 : width < 1280 ? 3 : 4;

    // Apply the updated column count to the style
    parent.style.setProperty('--numCols', numCols.toString());

    const columns = Array.from({ length: numCols }, () => document.createElement("div"));
    columns.forEach(c =>  c.classList.add("child"));
    parent.replaceChildren(...columns);

    for (let i = 0; i < items.length; i++) {
      if (i < numCols) {
        columns[i].appendChild(items[i]);
      }
      else {
        const shortestColumn = columns.reduce((a, b) => Array.from(a.children).reduce((sum, child) => sum + child.clientHeight, 0) < Array.from(b.children).reduce((sum, child) => sum + child.clientHeight, 0) ? a : b);
        shortestColumn.appendChild(items[i]);
      }
    }
  };

  onMount(() => {
    items = [...parent.children];
    items = items.filter((item) => item.nodeType === 1);

    updateLayout();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div bind:this={parent} id="masonry" style="--gap: {gap}px; --numCols: {numCols};">
  {@render children()}
</div>

<style>
  #masonry {
    display: grid;
    grid-template-columns: repeat(var(--numCols), 1fr);
    gap: var(--gap);
  }

  :global(#masonry .child) {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
  }
</style>
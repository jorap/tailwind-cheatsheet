<script lang="ts">
    import { browser } from '$app/environment';

    let darkMode = true

    // if (browser) {  
    //     if (
    //         localStorage.theme === 'dark' ||
    //         (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    //     ) {
    //         document.documentElement.classList.add('dark');
    //         darkMode = true;
    //     } else {
    //         document.documentElement.classList.remove('dark');
    //         darkMode = false;
    //     }
    // }

    function toggleTheme() {
        darkMode = !darkMode

        localStorage.setItem('theme', darkMode ? 'dark' : 'light');

        darkMode
            ? document.documentElement.classList.add('dark')
            : document.documentElement.classList.remove('dark');
    }

    

    
</script>

<div class="relative inline-block">
    
    <input type="checkbox" id="theme-toggle" class="invisible absolute inset-0" bind:checked={darkMode} onclick={toggleTheme}  />
    
    <label for="theme-toggle" class="cursor-pointer " >

        <!-- Sun -->
        <svg class="sun inline-block {darkMode ? '' : 'hidden'}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="#ffac33" stroke="#ffac33" stroke-width="2">
                <circle cx="12" cy="12" r="4" stroke-linejoin="round" />
                <path stroke-linecap="round" d="M20 12h1M3 12h1m8 8v1m0-18v1m5.657 13.657l.707.707M5.636 5.636l.707.707m0 11.314l-.707.707M18.364 5.636l-.707.707" />
            </g>
        </svg>

        <!-- Moon -->
        <svg class="moon inline-block {darkMode ? 'hidden' : ''}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#66757f" stroke="#66757f" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9 9 0 0 0 8.997-9.252a7 7 0 0 1-10.371-8.643A9 9 0 0 0 12 21" />
        </svg>

    </label>
</div>
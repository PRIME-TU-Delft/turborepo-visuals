<script>
  import { page } from '$app/stores';

  let navLinks = [
    { href: '/', label: 'Home' },
    { href: '/all-icons', label: 'Browse icons' },
    { href: '#', label: 'GitHub' }
  ];
</script>

<nav
  class="fixed top-0 z-10 w-full rounded-b border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4"
>
  <div class="container mx-auto flex flex-wrap items-center justify-between">
    <a href="/" class="flex items-center">
      <!-- <img
				src="https://flowbite.com/docs/images/logo.svg"
				class="mr-3 h-6 sm:h-9"
				alt="MDI Logo"
			/> -->
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        MDI Svelte TS
      </span>
    </a>

    <button
      data-collapse-toggle="navbar-default"
      type="button"
      class="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="h-6 w-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        /></svg
      >
    </button>

    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul
        class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900"
      >
        {#each navLinks as navLink}
          <li>
            <a
              href={navLink.href}
              class:selected={$page.url.pathname == navLink.href}
              class="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              aria-current="page">{navLink.label}</a
            >
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>

<div class="pt-20">
  <slot />
</div>

<style lang="postcss">
  .selected {
    @apply rounded bg-blue-700 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700 dark:md:text-blue-200;
  }
</style>

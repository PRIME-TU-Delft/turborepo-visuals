<script lang="ts">
  import { mdiFullscreen, mdiFullscreenExit } from '@mdi/js';
  import screenfull from 'screenfull';
  import RoundButton from './RoundButton.svelte';

  export let sceneEl: HTMLElement | null = null;
  export let isFullscreen = false;

  if (screenfull.isEnabled) {
    screenfull.on('change', () => {
      isFullscreen = screenfull.isFullscreen;
    });
  }

  function toggleFullscreen() {
    if (!screenfull.isEnabled) return;

    screenfull.toggle(sceneEl);
  }
</script>

{#if screenfull.isEnabled}
  {#if isFullscreen}
    <RoundButton icon={mdiFullscreenExit} on:click={toggleFullscreen} />
  {:else}
    <RoundButton icon={mdiFullscreen} on:click={toggleFullscreen} />
  {/if}
{/if}

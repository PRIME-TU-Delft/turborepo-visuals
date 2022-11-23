<script lang="ts">
  import { mdiInformation, mdiPause, mdiRestart } from '@mdi/js';

  import { Canvas, T } from '@threlte/core';

  import { Sliders } from 'utils/Slider';
  import { RoundButton, ToggleFullscreen, Slider as SvelteSlider, UI } from 'ui';
  import { DoubleSide } from 'three';
  import SetCamera from './SetCamera.svelte';

  export let enablePan = false;
  export let disableUI = false;
  export let sliders = new Sliders();
  export let title = '';
  export let autoPlay = true;
  export let isPerspectiveCamera = false;
  export let floor = false;
  export let background = '#ffffff';
  export let position: [number, number, number] = [10, 10, 10];

  let isPlaying = autoPlay;
  let isChangeing = false; // Are any of the sliders being changed?
  let isFullscreen = false;
  let showFormulas = false;

  let resetCamera = Math.random();
  let height = 0;
  let width = 0;

  let sceneEl: HTMLDivElement;

  /**
   * Reset camera position, rotation and sliders.
   */
  function reset() {
    sliders = sliders.reset(); // Reset sliders to default values

    resetCamera = Math.random(); // Update the key to reset the set camera component
  }

  // TODO: implement play pause
</script>

<div
  bind:clientHeight={height}
  bind:clientWidth={width}
  bind:this={sceneEl}
  style="height: var(--height, 100%); background: {background}"
>
  <Canvas flat linear size={{ width, height }}>
    {#key resetCamera}
      <SetCamera {position} {isPerspectiveCamera} {enablePan} />
    {/key}

    <slot name="lights">
      <T.AmbientLight intensity={1} />
    </slot>

    <slot />

    {#if floor}
      <T.Mesh receiveShadow position.y={-0.1} rotation.x={-90 * (Math.PI / 180)}>
        <T.MeshStandardMaterial side={DoubleSide} color="black" opacity={0.1} transparent />
        <T.CircleGeometry args={[10, 64]} />
      </T.Mesh>
    {/if}
  </Canvas>

  {#if !disableUI}
    <!-- EXPLAIN PANEL -->
    <UI top left visible={title && isFullscreen && isPlaying}>
      {title}
    </UI>

    <UI top left visible={!isPlaying && !isFullscreen}>Click to start playing scene</UI>

    <!-- SLIDER PANEL -->
    <UI visible={!!sliders.sliders.length} bottom opacity>
      {#each sliders.sliders as slider}
        <SvelteSlider
          bind:slider
          on:mousedown={() => (isChangeing = true)}
          on:mouseup={() => (isChangeing = false)}
        />
      {/each}
    </UI>

    <!-- INFORMATION UI -->
    <UI visible={!!$$slots.formulas} top right styled={false} opacity={!showFormulas}>
      <RoundButton icon={mdiInformation} on:click={() => (showFormulas = !showFormulas)} />
    </UI>

    <UI visible={!!$$slots.formulas && (showFormulas || isChangeing)} top column>
      <h2 class="w-full border-b-2 border-slate-700 pb-1 font-bold">Prime visuals</h2>
      <slot name="formulas" />
    </UI>

    <!--  -->
    <UI column bottom right opacity styled={false}>
      {#if isPlaying}
        <RoundButton icon={mdiPause} />
      {/if}

      <!-- TODO: give this button function <RoundButton icon="{mdiCog}" on:click="{resize}" /> -->
      <RoundButton icon={mdiRestart} on:click={reset} />

      <ToggleFullscreen {sceneEl} bind:isFullscreen />
    </UI>
  {/if}
</div>

<script lang="ts">
  import { Vector3 } from 'three';
  import { HTML } from '@threlte/extras';

  export let position = new Vector3(0, 0, 0);
  export let color = 'black';
  export let size = 1;
  export let opacity = 1;
</script>

<HTML {position}>
  <!-- Mousedown|preventDefault is here to stop user with interacting with labels via the mouse (i.e. dragging) -->
  <div
    on:mousedown|preventDefault
    class="label"
    style="color: {color}; font-size: {size}rem; opacity: {opacity}"
  >
    <slot />
  </div>
</HTML>

<style>
  .label {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    user-select: none;
    pointer-events: none;
  }
</style>

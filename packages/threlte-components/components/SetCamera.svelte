<script lang="ts">
  import { T, useThrelte } from '@threlte/core';

  const { renderer, invalidate } = useThrelte();

  export let isPerspectiveCamera = false;
  export let enablePan = false;

  export let position: [number, number, number] = [10, 10, 10];
</script>

{#if isPerspectiveCamera}
  <T.PerspectiveCamera
    makeDefault
    position.z={position[0]}
    position.y={position[1]}
    position.x={position[2]}
    maxPolarAngle={Math.PI * 0.6}
    let:ref={camera}
    on:update={invalidate}
  >
    <T.OrbitControls
      maxDistance={25}
      minDistance={2}
      {enablePan}
      args={[camera, renderer?.domElement]}
      on:change={invalidate}
    />
  </T.PerspectiveCamera>
{:else}
  <T.OrthographicCamera
    args={[-1, 1, 1, -1, 0.1, 100]}
    makeDefault
    zoom={50}
    position.x={position[0]}
    position.y={position[1]}
    position.z={position[2]}
    let:ref={camera}
    on:change={invalidate}
  >
    <T.OrbitControls
      args={[camera, renderer?.domElement]}
      maxPolarAngle={Math.PI * 0.6}
      {enablePan}
      maxZoom={200}
      minZoom={40}
    />
  </T.OrthographicCamera>
{/if}

<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { mdiCog, mdiPause, mdiRestart } from '@mdi/js';

  import {
    Color,
    PerspectiveCamera,
    OrthographicCamera,
    Scene,
    Vector3,
    WebGLRenderer
  } from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import { sceneKey } from '../utils/sceneKey';
  import { CSS2DRenderer } from '../utils/CSS2DRenderer';

  import type Slider from 'ui/utils/slider';

  import { RoundButton, ToggleFullscreen, Slider as SvelteSlider } from 'ui';

  export let enablePan = false;
  export let disableUI = false;
  export let sliders: readonly Slider[] = []; // Enfore with typescript 0 - 3 sliders
  export let title = '';
  export let autoPlay = false;

  let sceneEl: HTMLDivElement;
  let canvasEl: HTMLCanvasElement;
  let labelEl: HTMLDivElement;
  let width: number; // Width of scene
  let height: number; // Height of scene
  let isPlaying = autoPlay;

  const scene = new Scene(); // Global THREE scene
  let camera: PerspectiveCamera | OrthographicCamera; // Camera as perspective camera
  let renderer: WebGLRenderer; // Renderer as WebGL renderer
  let labelRenderer: CSS2DRenderer; // Renderer for labels
  let controls: OrbitControls; // Orbit controls - to pan arround the scene
  let camPos: Vector3 = new Vector3(3.5, 2.8, 3.5);

  const FRUSTRUM_SIZE = 10; // Size of the frustum

  $: aspect = height > 0 ? width / height : 1; // Aspect ratio of the scene
  $: sliderValues = sliders.map((s) => s.value);

  // Set context for all children to use the same scene
  setContext(sceneKey, {
    scene,
    sliderValues
  });

  /**
   * Resize canvas if window size changes.
   */
  function resize() {
    console.log('resize');
    if (!camera || !renderer || !labelRenderer) return;

    if (camera.type == 'PerspectiveCamera') {
      // ensure camera is a perspective camera
      camera.aspect = aspect;
    } else {
      camera.left = (-FRUSTRUM_SIZE * aspect) / 2;
      camera.right = (FRUSTRUM_SIZE * aspect) / 2;
      camera.top = FRUSTRUM_SIZE / 2;
      camera.bottom = -FRUSTRUM_SIZE / 2;
    }

    console.log('accutal resize');
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    labelRenderer.setSize(width, height);
  }

  /**
   * Update canvas with new information
   */
  function animate() {
    if (isPlaying) requestAnimationFrame(animate);

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);

    if (camera && camera.position.x != camPos.x) {
      camPos.copy(camera.position);
    }
  }

  /**
   * Reset camera position, rotation and sliders.
   */
  function reset() {
    sliders = sliders.map((slider) => slider.reset());
    camera.position.set(3.5, 2.8, 3.5);
    controls.update();
    resize();
  }

  function setupPerspectiveCamera() {
    camera = new PerspectiveCamera(75, 1, 0.1, 1000);
  }

  function setupOrthographicCamera() {
    camera = new OrthographicCamera(
      (FRUSTRUM_SIZE * aspect) / -2,
      (FRUSTRUM_SIZE * aspect) / 2,
      FRUSTRUM_SIZE / 2,
      FRUSTRUM_SIZE / -2,
      -10, // black magic fuckery,
      100
    );
  }

  function createScene() {
    scene.background = new Color('#ffffff');
    renderer = new WebGLRenderer({ antialias: true, canvas: canvasEl });
    renderer.setPixelRatio(window.devicePixelRatio);

    // Render layer for displaying 2d text in a 3d scene
    labelRenderer = new CSS2DRenderer({ element: labelEl });
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.className = 'labelRenderer';
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    // document.body.prepend(labelRenderer.domElement);

    controls = new OrbitControls(camera, labelRenderer.domElement);
    controls.enablePan = enablePan;
    controls.maxDistance = 15;
    controls.minDistance = 1;
    controls.maxZoom = 30;
    controls.minZoom = 1;

    reset();
    animate();
    resize();
  }

  // Switch between perspective and orthographic camera
  function togglePerspective() {
    if (camera.type == 'PerspectiveCamera') {
      setupOrthographicCamera();
    } else {
      setupPerspectiveCamera();
    }

    createScene();
  }

  function playScene() {
    isPlaying = true;
    animate();
  }

  function pauseScene() {
    isPlaying = false;
  }

  onMount(() => {
    setupPerspectiveCamera();

    createScene();
  });
</script>

<div
  class="wrapper"
  bind:clientWidth="{width}"
  bind:clientHeight="{height}"
  on:resize="{() => console.log('div resize')}"
  style="height: var(--height, 100vh); width: 100%; position: relative; border: 1px solid #000000;"
>
  <div class="labelEl" bind:this="{labelEl}"></div>

  <div bind:this="{sceneEl}">
    {#if !isPlaying}
      <div
        class="absolute w-full h-full bg-slate-900/50 cursor-pointer backdrop-grayscale"
        on:click="{playScene}"
        on:keydown="{playScene}"
      ></div>
    {/if}

    <canvas bind:this="{canvasEl}"></canvas>

    <!-- Explain panel -->
    {#if title || !isPlaying}
      <div
        class="absolute px-4 m-4 h-12 top-2 bg-slate-900 rounded flex gap-2 justify-center items-center text-slate-100"
      >
        {#if !isPlaying}
          Click to start playing scene {title ? ' - ' + title : ''}
        {:else}
          {title}
        {/if}
      </div>
    {/if}

    <slot scene="{scene}" camera="{camera}" sliderValues="{sliderValues}" />

    <!-- Slider Panel -->
    {#if !disableUI && sliders.length > 0 && sliders.length <= 3}
      <div class="absolute right-20 bottom-4 px-4 rounded h-12 bg-slate-900 flex justify-end">
        {#each sliders as slider}
          <SvelteSlider bind:slider />
        {/each}
      </div>
    {/if}

    <!-- Options panel -->
    <div class="absolute right-4 bottom-4 w-12 flex flex-col gap-2">
      {#if isPlaying}
        <RoundButton icon="{mdiPause}" on:click="{pauseScene}" />
      {/if}

      <RoundButton icon="{mdiCog}" on:click="{togglePerspective}" />
      <RoundButton icon="{mdiRestart}" on:click="{reset}" />

      <ToggleFullscreen resize="{resize}" sceneEl="{sceneEl}" />
    </div>
  </div>
</div>
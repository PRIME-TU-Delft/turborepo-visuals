<script lang="ts">
  import { DoubleSide, Vector3 } from 'three';
  import { T } from '@threlte/core';

  import { PrimeColor } from 'utils/PrimeColors';
  import Line from './Line.svelte';
  import Label from './Label.svelte';
  import Latex3D from './Latex.svelte';

  export let showNumbers = false;
  export let hideTicks = false;
  export let axisLength = 10;
  export let axisSpacing = 1;
  export let floor = false;

  $: axisInterval = Math.floor(axisLength / axisSpacing);
  $: indecators = new Array(axisInterval * 2 + 1)
    .fill(0)
    .map((_, i) => (i - axisInterval) * axisSpacing); // range -axisLength to including axisLength
  $: largeIndecators = indecators.filter((x, i) => i % (axisSpacing * 2) === 0 && x !== 0); // Even minus 0 indecators
  $: smallIndecators = indecators.filter((x, i) => i % (axisSpacing * 2) === 1 && x !== 0); // Odd indecators

  $: indecatorMin = indecators[0];
  $: indecatorMax = indecators[indecators.length - 1];

  const tickSizes = [0.25, 0.125]; // Ortogonal lenth of tick
  const axisLabelOpacity = 0.4;

  function getPoints(indecator: number, size: number, axis = 0): [Vector3, Vector3] {
    let from = new Vector3(indecator, 0, size);
    let to = new Vector3(indecator, 0, -size);

    if (axis == 1) {
      from.set(0, indecator, size);
      to.set(0, indecator, -size);
    }

    if (axis == 2) {
      from.set(size, 0, indecator);
      to.set(-size, 0, indecator);
    }

    return [from, to];
  }
</script>

<!-- Main axis lines -->
<Line
  color={PrimeColor.black}
  points={[new Vector3(-1 * axisLength, 0, 0), new Vector3(axisLength, 0, 0)]}
/>
<Line
  color={PrimeColor.black}
  points={[new Vector3(0, -1 * axisLength, 0), new Vector3(0, axisLength, 0)]}
/>
<Line
  color={PrimeColor.black}
  points={[new Vector3(0, 0, -1 * axisLength), new Vector3(0, 0, axisLength)]}
/>

<!-- Tick indecators -->
{#if !hideTicks}
  {#each largeIndecators as indecator}
    <Line color={PrimeColor.black} points={getPoints(indecator, tickSizes[0])} />
    <Line color={PrimeColor.black} points={getPoints(indecator, tickSizes[0], 1)} />
    <Line color={PrimeColor.black} points={getPoints(indecator, tickSizes[0], 2)} />
  {/each}

  {#each smallIndecators as indecator}
    <Line color={PrimeColor.black} points={getPoints(indecator, tickSizes[1])} />
    <Line color={PrimeColor.black} points={getPoints(indecator, tickSizes[1], 1)} />
    <Line color={PrimeColor.black} points={getPoints(indecator, tickSizes[1], 2)} />
  {/each}
{/if}

<!-- Number indecators -->
{#if showNumbers}
  {#each smallIndecators as indecator}
    <Label position={new Vector3(indecator, 0.1, -0.15)} opacity={axisLabelOpacity}>
      {indecator}
    </Label>
    <Label position={new Vector3(0, indecator, -0.15)} opacity={axisLabelOpacity}>
      {indecator}
    </Label>
    <Label position={new Vector3(-0.15, 0.1, indecator)} opacity={axisLabelOpacity}>
      {indecator}
    </Label>
  {/each}
{/if}

<Latex3D position={new Vector3(0, 0, indecatorMin)} latex="x" />
<Latex3D position={new Vector3(indecatorMin, 0, 0)} latex="y" />
<Latex3D position={new Vector3(0, indecatorMin, 0)} latex="z" />

<Latex3D position={new Vector3(0, 0, indecatorMax)} latex="x" />
<Latex3D position={new Vector3(indecatorMax, 0, 0)} latex="y" />
<Latex3D position={new Vector3(0, indecatorMax, 0)} latex="z" />

{#if floor}
  <T.Mesh receiveShadow position.y={-0.1} rotation.x={-90 * (Math.PI / 180)}>
    <T.MeshStandardMaterial side={DoubleSide} color="black" opacity={0.1} transparent />
    <T.CircleGeometry args={[axisLength, 64]} />
  </T.Mesh>
{/if}

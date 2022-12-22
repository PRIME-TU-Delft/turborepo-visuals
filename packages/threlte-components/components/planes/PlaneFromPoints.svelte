<script lang="ts">
  import { T } from '@threlte/core';
  import { DoubleSide, Mesh, MeshBasicMaterial, Plane, PlaneGeometry, Vector3 } from 'three';

  import getRandomColor from 'utils/PrimeColors';
  import PlaneSegments from 'utils/Segments';

  export let points: [Vector3, Vector3, Vector3] = [
    new Vector3(1, 0, 0),
    new Vector3(0, 1, 0),
    new Vector3(0, 0, 1)
  ];
  export let color = getRandomColor();
  export let size = 10;
  export let opacity = 0.8;
  export let planeSegment = PlaneSegments.default();

  function setStripes() {
    geometry = new PlaneGeometry(size, size, planeSegment.segments, 1);

    for (let i = 0; i < planeSegment.segments; i++) {
      if (i % planeSegment.interval == planeSegment.offset) {
        // A rectangle consists of two triangles --> 6 vertices
        geometry.addGroup(i * 6, 6, 0);
      }
    }
  }

  let geometry = new PlaneGeometry(size, size, planeSegment.segments, 1);
  let materials = [new MeshBasicMaterial({ color, transparent: true, opacity, side: DoubleSide })];

  $: mesh = new Mesh(geometry, materials);

  $: {
    if (planeSegment.segments > 1) setStripes();
    mesh.geometry = geometry;
    mesh.material = materials;

    const plane = new Plane().setFromCoplanarPoints(points[0], points[1], points[2]);
    plane.coplanarPoint(mesh.position);
    mesh.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), plane.normal);
  }
</script>

<T.Mesh bind:ref={mesh} />

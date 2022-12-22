<script lang="ts">
  import { Vector3 } from 'three';
  import { PrimeColor } from 'utils/PrimeColors';

  import {
    Axis3D,
    Canvas3D,
    Latex3D,
    PlaneFromPoints,
    Point3D,
    Vector3D
  } from 'threlte-components';

  const p = new Vector3(0, 1, 2);
  const q = new Vector3(2, 0, 1);
  const r = new Vector3(0, 0, 5);

  const pr = r.clone().sub(p.clone());
  const pq = q.clone().sub(p.clone());
</script>

<Canvas3D title="A parametric vector equation of a plane.">
  <PlaneFromPoints points={[p, q, r]} color={PrimeColor.yellow} />

  <!-- P -->
  <Point3D position={p} color={PrimeColor.pink} />
  <Latex3D latex={'P'} position={p} />

  <!-- Q -->
  <Point3D position={q} color={PrimeColor.green} />
  <Latex3D latex={'Q'} position={q} />
  <Vector3D direction={pq} origin={p} color={PrimeColor.red} length={pq.length()} />

  <!-- R -->
  <Point3D position={r} color={PrimeColor.ultramarine} />
  <Latex3D latex={'R'} position={r} />
  <Vector3D direction={pr} origin={p} color={PrimeColor.red} length={pr.length()} />

  <Axis3D showNumbers />
</Canvas3D>

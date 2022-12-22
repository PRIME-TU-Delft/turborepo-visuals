<script lang="ts">
  import { Vector3 } from 'three';

  import {
    Angle3D,
    Axis3D,
    Canvas3D,
    Latex3D,
    PlaneFromNormal,
    Point3D,
    Vector3D
  } from 'threlte-components';
  import { PrimeColor } from 'utils/PrimeColors';

  const normal = new Vector3(1, 2, 0.5);
  const normalizedNormal = normal.clone().normalize();
  const p = new Vector3(2, 1, 0.5);

  const _q = new Vector3(1, 1, -((normalizedNormal.x + normalizedNormal.y) / normalizedNormal.z));
  const q = _q.cross(normalizedNormal).normalize().multiplyScalar(normal.length());
</script>

<Canvas3D title="A plane through the point P.">
  <PlaneFromNormal {normal} position={p} color={PrimeColor.yellow} />

  <!-- Normal -->
  <Vector3D origin={p} direction={normal} color={PrimeColor.ultramarine} length={normal.length()} />
  <Latex3D latex={'\\vec{n}'} position={p.clone().add(normal.clone())} />

  <!-- P -->
  <Point3D position={p} color={PrimeColor.pink} />
  <Latex3D latex={'P'} position={p} />

  <!-- Q -->
  <Point3D position={q.clone().add(p)} color={PrimeColor.green} />
  <Latex3D latex={'Q'} position={q.clone().add(p)} />
  <Vector3D origin={p} direction={q} color={PrimeColor.red} length={q.length()} />

  <Angle3D vs={[normal, q]} origin={p} size={0.5} />

  <Axis3D showNumbers />
</Canvas3D>

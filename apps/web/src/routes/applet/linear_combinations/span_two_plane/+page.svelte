<script>
  import { Vector3 } from 'three';
  import { Axis3D, Canvas3D, Latex3D, Vector3D, PlaneFromPoints } from 'threlte-components';
  import { PrimeColor } from 'utils/PrimeColors';

  const u = new Vector3(1, 2, -2); // Vector u
  const v = new Vector3(3, 1, 0); // Vector v

  const labelPosition = u.clone().add(v).normalize().multiplyScalar(8); // only used for label -> Span{u,v}
</script>

<Canvas3D>
  <!-- Vector u -->
  <Vector3D direction={u} length={u.length()} color={PrimeColor.red} />
  <Latex3D latex={'\\vec{u}'} position={u} />

  <!-- Vector v -->
  <Vector3D direction={v} length={v.length()} color={PrimeColor.red} />
  <Latex3D latex={'\\vec{v}'} position={v} />

  <!-- Plane span -->
  <PlaneFromPoints points={[new Vector3(0, 0, 0), u, v]} color={PrimeColor.ultramarine} size={15} />
  <Latex3D latex={'Span\\{\\vec{u},\\vec{v}\\}'} position={labelPosition} offset={0} />

  <Axis3D />
</Canvas3D>

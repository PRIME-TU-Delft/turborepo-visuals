<script>
  import { Vector3 } from 'three';
  import { Axis3D, Canvas3D, Latex3D, Vector3D } from 'threlte-components';
  import { LatexUI } from 'ui';
  import { color } from 'utils/LatexFormat';
  import { PrimeColor } from 'utils/PrimeColors';
  import { Sliders, Slider } from 'utils/Slider';

  const v_0 = new Vector3(-2, 3, 2);
  const u = new Vector3(2, 1, -1);

  let sliders = new Sliders().add(new Slider(2, 1.5, 3, 0.1, PrimeColor.green));

  $: ru_len = sliders.x * u.length();
</script>

<Canvas3D bind:sliders>
  <!-- Vector v_0 -->
  <Vector3D direction={v_0} color={PrimeColor.red} length={v_0.length()} />
  <Latex3D position={v_0} latex={'\\vec{v_0}'} />

  <!-- Vector r * v -->
  <Vector3D direction={u} color={PrimeColor.green} origin={v_0} length={ru_len} let:endPoint>
    <Latex3D position={endPoint} latex={`\\space r\\cdot\\vec{u}`} />

    <!-- Vector v -->
    <Vector3D direction={endPoint} color={PrimeColor.yellow} length={endPoint.length()} />

    <Latex3D position={endPoint} latex={`\\vec{v}`} offset={-2} />
  </Vector3D>

  <!-- Vector u -->
  <Vector3D
    direction={u}
    color={PrimeColor.ultramarine}
    origin={v_0}
    length={u.length()}
    striped
    radius={0.07}
  />
  <Latex3D position={v_0.clone().add(u)} latex={'\\vec{u}'} />

  <div slot="formulas">
    <LatexUI params={[sliders.x]} colors={[PrimeColor.green]} latex={'r = \\$0'} />
  </div>

  <Axis3D showNumbers />
</Canvas3D>

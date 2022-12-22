<script>
  import { Vector3 } from 'three';

  import { Axis3D, Canvas3D, Vector3D, Arc3D } from 'threlte-components';
  import { PrimeColor } from 'utils/PrimeColors';
  import { Sliders } from 'utils/Slider';

  let axisLength = 12;

  let sliders = new Sliders().addSlider(4.5, Math.PI * -3, Math.PI * 3, Math.PI / 10);
  let vtemp = new Vector3(1, 1, 0);

  let unitX = new Vector3(1, 0, 0);
  let unitY = new Vector3(0, 1, 0);

  $: v2 = unitX
    .clone()
    .multiplyScalar(Math.cos(sliders.x))
    .add(vtemp.clone().multiplyScalar(Math.sin(sliders.x)));
</script>

<Canvas3D bind:sliders>
  <!-- 90 degrees -->
  <Vector3D direction={unitX} length={1} origin={unitX} color={PrimeColor.green} />
  <Vector3D direction={unitY} length={1} origin={unitX} color={PrimeColor.green} />

  <Arc3D points={[unitX, unitY]} origin={unitX} color={PrimeColor.green} />

  <!-- 180 degrees -->

  <Vector3D
    direction={unitX}
    length={1}
    color={PrimeColor.ultramarine}
    origin={unitX.clone().multiplyScalar(-2)}
  />
  <Vector3D
    direction={v2}
    length={1}
    color={PrimeColor.ultramarine}
    origin={unitX.clone().multiplyScalar(-2)}
  />

  {#key v2.x + v2.y + v2.z}
    <Arc3D
      points={[unitX, v2]}
      color={'black'}
      u={new Vector3(0, 1, 0)}
      origin={unitX.clone().multiplyScalar(-2)}
    />
  {/key}

  <Axis3D {axisLength} hideTicks />
</Canvas3D>

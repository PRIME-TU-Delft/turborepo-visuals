<script lang="ts">
  import { Vector3 } from 'three';

  import { Canvas3D, AutoPlane, Axis3D, PlaneFromNormal } from 'threlte-components';
  import { Formula } from 'ui';

  import { PrimeColor } from 'utils/PrimeColors';
  import { Sliders } from 'utils/Slider';

  const normal = new Vector3(1, 3, 1).normalize();
  let sliders = new Sliders().addSlider(0, -5, 5, 0.5).addSlider(1, -5, 5, 0.5);
</script>

<Canvas3D position={[10, 5, 10]} bind:sliders title="Two planes without a point in common.">
  <AutoPlane values={sliders.values} let:value let:planeSegment let:color>
    <PlaneFromNormal position={new Vector3(0, value, 0)} {normal} {planeSegment} {color} />
  </AutoPlane>

  <Axis3D showNumbers />

  <div slot="formulas">
    <Formula color={PrimeColor.red} param={sliders.x} formula="1x + 1y + (3 + _)z = 0" />

    <Formula color={PrimeColor.yellow} param={sliders.y} formula="1x + 1y + (3 + _)z = 0" />
  </div>
</Canvas3D>

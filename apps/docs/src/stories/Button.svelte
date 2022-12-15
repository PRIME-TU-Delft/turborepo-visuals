<script lang="ts">
  import './button.css';
  import { Axis3D, Canvas3D } from 'threlte-components';

  /**
   * Is this the principal call to action on the page?
   */
  export let primary = false;

  /**
   * What background color to use
   */
  export let backgroundColor: string | undefined = undefined;
  /**
   * How large should the button be?
   */
  export let size: 'small' | 'medium' | 'large' = 'medium';
  /**
   * Button contents
   */
  export let label: string = '';

  $: mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

  $: style = backgroundColor ? `background-color: ${backgroundColor}` : '';
</script>

<div>
  <div style="height: 20rem">
    <Canvas3D>
      <Axis3D />
    </Canvas3D>
  </div>

  <h1>Hello</h1>
</div>

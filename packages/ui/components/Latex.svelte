<script lang="ts">
  import katex from 'katex';
  import { primeColorArray } from 'utils/PrimeColors';

  export let latex = '';
  export let params: (string | number)[] = [];
  export let colors: string[] = primeColorArray;

  let str = '';

  function convertLatex(_: string) {
    let input = latex;

    try {
      // Replace the parameters in the string with the values given by the user
      for (let i = 0; i < params.length; i++) {
        const value = parseFloat('' + params[i]).toFixed(2) || params[i];

        input = input.replaceAll(
          '\\$' + i,
          `\\htmlStyle{color: ${colors[i % colors.length]};}{${value}}`
        );
      }

      // For reference: https://katex.org/docs/options.html
      str = katex.renderToString(input, {
        displayMode: true,
        leqno: false,
        fleqn: false,
        throwOnError: true,
        output: 'html',
        trust: true,
        strict: false
      });
    } catch (e: any) {
      str = e.message;
    }
  }

  $: convertLatex(params.join(''));
</script>

<div class="latex">
  {@html str}
</div>

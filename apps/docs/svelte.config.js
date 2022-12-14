import adapter from '@sveltejs/adapter-node';

import preprocess from 'svelte-preprocess';
import sequence from 'svelte-sequential-preprocessor';
import { preprocessThrelte } from '@threlte/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sequence([
    preprocess({ postcss: true }),
    preprocessThrelte({
      extensions: {
        'three/examples/jsm/controls/OrbitControls': ['OrbitControls']
      }
    })
  ]),

  ssr: {
    noExternal: ['three', 'troika-three-text']
  },

  extensions: ['.svelte', '.md', '.svx'],

  kit: {
    adapter: adapter({
      precompress: true
    })
  }
};

export default config;

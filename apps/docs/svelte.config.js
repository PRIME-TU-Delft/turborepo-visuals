import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import seqPreprocessor from 'svelte-sequential-preprocessor';
import { preprocessThrelte } from '@threlte/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: seqPreprocessor([
    preprocess({
      postcss: true
    }),
    preprocessThrelte({
      extensions: {
        'three/examples/jsm/controls/OrbitControls': ['OrbitControls'],
        'three/examples/jsm/lines/LineGeometry': ['LineGeometry'],
        'three/examples/jsm/lines/LineMaterial': ['LineMaterial'],
        'three/examples/jsm/lines/Line2': ['Line2']
      }
    })
  ]),

  kit: {
    adapter: adapter({
      precompress: true
    })
  }
};

export default config;

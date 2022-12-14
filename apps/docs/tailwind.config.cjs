/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../packages/ui/yan/**/*.{html,js,svelte,ts,svx}',
    '../../packages/visuals-3d/components/**/*.{html,js,svelte,ts,svx}',
    './src/**/*.{html,js,svelte,ts,svx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};

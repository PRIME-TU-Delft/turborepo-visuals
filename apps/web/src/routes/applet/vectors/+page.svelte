<script>
  const modules = import.meta.glob('./**/*.svelte');

  import ParagraphIndex from '$lib/ParagraphIndex.svelte';
</script>

<ParagraphIndex chapter="vectors" {modules} />

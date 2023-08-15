<script>
  import ShowTable from './ShowTable.svelte';
  export let Data;
  export let userInput;
  $: hanzi = [...userInput].filter((v) => Data.has(v));
</script>

{#if hanzi?.length}
 <ShowTable {Data} title={`查询${hanzi.length}个字`} someHanzi={hanzi}/>
{/if}

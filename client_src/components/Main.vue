<template>
  <div class="row">
    <TreeView class="treeview" ></TreeView>
    <DetailView class="detailview"></DetailView>
  </div>
</template>

<script>
  import TreeView from './TreeView.vue';
  import DetailView from './DetailView.vue';

  export default {
    components: { TreeView, DetailView },
  }
</script>

<style lang="scss">
  .row {
    display: flex;
  }

  .treeview,
  .detailview {
    flex: 50%;
  }
</style>
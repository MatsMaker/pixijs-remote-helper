<template>
  <div class="row">
    <TreeView class="treeview" ></TreeView>
    <DetailView class="detailview"></DetailView>
  </div>
</template>

<script>
import TreeView from "./TreeView.vue";
import DetailView from "./DetailView.vue";

export default {
  components: { TreeView, DetailView },
};
</script>

<style lang="scss">
.row {
  display: flex;
  height: 100%;
}

.treeview,
.detailview {
  flex: 50%;
  height: calc(100% - 15px * 2);
  overflow-y: auto;
  padding: 15px;
}
</style>
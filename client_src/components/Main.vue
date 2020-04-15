<template>
  <div class="main">
    <!-- <Search class="searchview"></Search> -->
      <TreeView class="treeview"></TreeView>
      <DetailView class="detailview"></DetailView>
  </div>
</template>

<script>
import Search from "./Search.vue";
import TreeView from "./TreeView.vue";
import DetailView from "./DetailView.vue";

export default {
  components: { TreeView, DetailView, Search }
};
</script>

<style lang="scss">
.main {
  display: flex;
  height: 100%;
  >:first-child {
    border-right: 1px solid lightgray;
  }
}
.searchview {
  padding: 15px 25px;
  background-color: gainsboro;
}
.treeview,
.detailview {
  overflow-y: auto;
  padding: 15px;
  flex: 1;
}
</style>
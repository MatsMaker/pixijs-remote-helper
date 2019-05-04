<template>
  <div class="main">
    <Search class="searchview"></Search>
    <div class="row">
      <TreeView class="treeview"></TreeView>
      <DetailView class="detailview"></DetailView>
    </div>
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
  flex-direction: column;
}
.searchview {
  padding: 15px 25px;
  background-color: gainsboro;
}
.treeview,
.detailview {
  overflow-y: auto;
  padding: 15px;
  width: 50%;
}
</style>
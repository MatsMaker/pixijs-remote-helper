<template>
  <div>
      <TreeItem
        :model="tree"
        :deep="0">
      </TreeItem>
  </div>
</template>

<script>
import TreeItem from './TreeItem.vue';
import proxy from "../proxy";

export default {
  components: { TreeItem },
  data() {
    return {
      tree: { children: [], name: "" }
    };
  },
  mounted() {
    this.$nextTick(() => {
      proxy.addListener('client-rootContainer', (data) => {
        const lightTree = JSON.parse(data);
        const tree = proxy.restoreParentFoItems(lightTree);
        this.tree = tree;
      });
    });
  }
};
</script>
<style>
  
</style>

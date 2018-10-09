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
        this.tree = JSON.parse(data);
      });
    });
  }
};
</script>
<style>
  
</style>

<template>
  <div>
      <TreeItem
        :model="tree"
        :deep="0">
      </TreeItem>
  </div>
</template>

<script>
import TreeItem from "./TreeItem.vue";
import proxy from "../proxy";
import * as transporter from "../../utils/transporter";

export default {
  components: { TreeItem },
  data() {
    return {
      tree: { children: [], name: "" }
    };
  },
  mounted() {
    this.$nextTick(() => {
      proxy.addListener("rootContainer", this.onRootContainer);
    });
  },
  methods: {
    onRootContainer(data) {
      const lightTree = JSON.parse(data);
      const tree = transporter.restoreParentFoItems(lightTree);
      this.tree = tree;
    }
  }
};
</script>
<style lang="scss">
</style>

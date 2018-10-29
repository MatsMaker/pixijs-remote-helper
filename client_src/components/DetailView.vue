<template>
  <div>
    Detail: {{ this.tree.name }}
  </div>
</template>
<script>
import proxy from "../proxy";
import  * as transporter from '../../utils/transporter';

export default {
  data() {
    return {
      tree: { children: [], name: "" }
    };
  },
  mounted() {
    this.$nextTick(() => {
      proxy.addListener("client-selectItem", data => {
        const lightTree = JSON.parse(data);
        const tree = transporter.restoreParentFoItems(lightTree);
        this.tree = tree;
      });
    });
  }
};
</script>
<style lang="scss">
</style>

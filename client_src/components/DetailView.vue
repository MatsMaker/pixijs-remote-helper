<template>
  <div>
    <div>Detail: {{ tree.name }}</div>
    <div>{{ tree }}</div>
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
      proxy.addListener("selectItem", data => {
        const lightTree = JSON.parse(data);
        // const tree = transporter.restoreParentFoItems(lightTree);
        console.log('selectItem: ', lightTree);
        this.tree = lightTree;
      });
    });
  }
};
</script>
<style lang="scss">
</style>

<template>
  <div>
    <div v-for="(propertyValue, key, index) in tree"
      :key="index">
      <PropertyEdit :properyName="key" :properyData="propertyValue" :object="tree.__index"></PropertyEdit>
    </div>
  </div>
</template>
<script>
import proxy from "../proxy";
import * as transporter from "../../utils/transporter";
import PropertyEdit from "./PropertyEdit.vue";

export default {
  components: { PropertyEdit },
  data() {
    return {
      tree: {},
      isCollapse: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      proxy.addListener("selectItem", data => {
        const lightTree = JSON.parse(data);
        console.log("selectItem: ", lightTree);
        this.tree = lightTree;
      });
    });
  }
};
</script>
<style lang="scss">
</style>

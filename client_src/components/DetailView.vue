<template>
  <div class="detail-view">
    <PropertyTree
      v-for="(propertyValue, key, index) in tree"
      :key="index"
      :properyName="key"
      :properyData="propertyValue"
      :itemIndex="tree.__index"
    ></PropertyTree>
  </div>
</template>
<script>
import proxy from "../proxy";
import * as transporter from "../../utils/transporter";
import PropertyTree from "./PropertyTree.vue";

export default {
  components: { PropertyTree },
  data() {
    return {
      tree: {},
      isCollapse: false,
      freeze: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      proxy.addListener("selectItem", this.onSelectItem);
    });
  },
  updated: function() {
    this.$nextTick(function() {
      proxy.selectItem(proxy.cache.activeItem);
    });
  },
  methods: {
    mouseover(e) {
      console.log("mouseover");
    },
    onSelectItem(data) {
      const lightTree = JSON.parse(data);
      this.tree = lightTree;
    }
  }
};
</script>
<style lang="scss">
</style>

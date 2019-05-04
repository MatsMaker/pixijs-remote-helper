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
      isCollapse: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      proxy.addListener("selectItem", this.onSelectItem);
      proxy.addListener("updateItem", this.onUpdateItem);
    });
  },
  updated: function() {
    this.$nextTick(function() {
      if (!proxy.cache.freeze) {
        proxy.selectItem(proxy.cache.activeItem);
      }
    });
  },
  methods: {
    onSelectItem(data) {
      const lightTree = JSON.parse(data);
      this.tree = lightTree;
    },
    onUpdateItem(data) {
      proxy.selectItem(proxy.cache.activeItem);
    }
  }
};
</script>
<style lang="scss">
</style>

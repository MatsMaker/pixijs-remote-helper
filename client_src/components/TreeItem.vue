<template>
  <div 
    class="tree-item">
    <div>
      <span @click="onCollapse">[+/-]</span>
      <span @click="onSelectItem" class="name">{{ model.name }}</span>
      <span @click="onHide">{visible: {{ this.model.visible }}}</span>
    </div>
    <div v-for="(item, index) in model.children"
      v-bind:class="{collapse: isCollapse }"
      :key="index">
      <TreeItem
        :model="item"
        :deep="index">
      </TreeItem>
    </div>
  </div>
</template>
<script>
import TreeItem from "./TreeItem.vue";
import proxy from "../proxy";
import * as transporter from "../../utils/transporter";

export default {
  name: "TreeItem",
  components: { TreeItem },
  props: ["model", "deep"],
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    onCollapse(e) {
      e.stopPropagation();
      this.isCollapse = !this.isCollapse;
    },
    onHide(e) {
      e.stopPropagation();
      proxy.updateItem(this.model.__index, "visible", !this.model.visible);
    },
    onSelectItem(e) {
      e.stopPropagation();
      proxy.selectItem(this.model.__index);
    }
  }
};
</script>

<style lang="scss">
.name {
  display: inline-block;
  min-width: 15px;
  min-height: 1em;
  background-color: brown;
  color: azure;
  padding: 3px;
}
.tree-item {
  margin-left: 5px;
  cursor: pointer;
}
.tree-item .collapse {
  display: none;
}
</style>


<template>
  <div 
    class="tree-item">
    <div class="title">
      <div class="treeview__toggle">
        <span
          @click="onCollapse"
          v-if="model.children.length > 0"
          v-bind:class="[!isCollapse ? 'treeview__toggle__collapse' : 'treeview__toggle__expand']">
        </span>
      </div>
      <div @click="onSelectItem" class="name">{{ model.name }}</div>
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
  background-color: cadetblue;
  border-radius: 4px;
  border: 1px darkcyan solid;
  color: azure;
  padding: 4px;
  font-size: 12px;
  font-family: sans-serif;
}
.tree-item {
  margin-left: 5px;
  cursor: pointer;
}
.tree-item .collapse {
  display: none;
}
.title {
  display: flex;
}

.treeview__toggle__collapse {
  border: 4px solid transparent;
  border-top-color: #6e6e6e;
  border-top-width: 6px;
  position: absolute;
  top: 3px;
  left: 2px;
}
.treeview__toggle__expand {
  border: 4px solid transparent;
  border-left-color: #6e6e6e;
  border-left-width: 6px;
  position: absolute;
  top: 2px;
  left: 4px;
}
.treeview__toggle {
  position: relative;
  width: 16px;
  height: 16px;
}
</style>


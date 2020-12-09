<template>
  <div 
    class="tree-item"
    v-bind:class="{invisible: !this.model.visible, active: isActive()}">
    <div class="title">
      <TreeviewToggle :complex="model.children.length > 0" v-on:requestClose="onCollapse" :collapse="isCollapse"></TreeviewToggle>
      <div class="name"
        v-bind:class="{active: isActive()}"
        @click="onSelectItem">
        [{{ model.name }}]
      </div>
      <span class="interactive-item" @click="onHide">{visible: {{ this.model.visible }}}</span>
    </div>
    <div v-for="(item, index) in model.children"
      :class="{collapse: isCollapse }"
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
import TreeviewToggle from "./TreeviewToggle.vue";
import proxy from "../proxy";
import * as transporter from "../../utils/transporter";

export default {
  name: "TreeItem",
  components: { TreeItem, TreeviewToggle },
  props: ["model", "deep"],
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    onCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    onHide(e) {
      e.stopPropagation();
      this.onSelectItem(e);
      proxy.updateItem(this.model.__index, "visible", !this.model.visible);
    },
    onSelectItem(e) {
      e.stopPropagation();
      proxy.cache.activeItem = this.model.__index;
      proxy.selectItem(proxy.cache.activeItem);
    },
    isActive() {
      return proxy.cache.activeItem == this.model.__index;
    }
  }
};
</script>

<style lang="scss">
.name {
  display: inline-block;
  min-width: 15px;
  min-height: 1em;
  /* background-color: cadetblue; */
  border-radius: 4px;
  /* border: 1px darkcyan solid; */
  color: #7b1972;
  padding: 4px;
  font-size: 12px;
  font-family: sans-serif;
  cursor: pointer;
}
.tree-item {
  margin-left: 5px;
  border-radius: 3px;
}
.tree-item.active {
  background-color:#cfe8fc;
  .name.active {
    /* background-color: green; */
  }
}
.tree-item.invisible .name {
  color: #0306006d;
  font-style: italic;
}
.tree-item .collapse {
  display: none;
}
.title {
  display: flex;
}
.interactive-item {
  cursor: pointer;
  white-space: nowrap;
}
</style>


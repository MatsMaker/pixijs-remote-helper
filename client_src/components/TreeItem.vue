<template>
  <div 
    class="tree-item"
    @click="onClick">
    <div>
      <span>{{ model.name }}</span>
      <span @click="onHide">[toogle visible]</span>
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
    onClick(e) {
      e.stopPropagation();
      this.isCollapse = !this.isCollapse;
    },
    onHide(e) {
      e.stopPropagation();
      debugger;
      proxy.updateItem('Container', 'visible', !this.model.visible);
    }
  }
};
</script>

<style lang="scss">
.tree-item {
  margin-left: 5px;
  cursor: pointer;
}
.tree-item .collapse {
  display: none;
}
</style>


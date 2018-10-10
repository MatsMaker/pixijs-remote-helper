<template>
  <div 
    class="tree-item"
    @click="onClick">
    <div>
      <span>{{ model.name }}</span>
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
import * as transporter from '../../utils/transporter';

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
      const patch = transporter.createPathToItem(this.model);
      proxy.updateItem(patch, 'visible', !this.model.visible);
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


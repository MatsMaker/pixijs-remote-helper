<template>
  <div class="treeview__toggle">
    <span
      @click="$emit('requestClose')"
      v-if="complex"
      v-bind:class="[!collapse ? 'treeview__toggle__collapse' : 'treeview__toggle__expand']">
    </span>
  </div>
</template>
<script>
export default {
  props: ["complex", "collapse"],
};
</script>
<style lang="scss">

.treeview__toggle__collapse {
  border: 4px solid transparent;
  border-top-color: #6e6e6e;
  border-top-width: 6px;
  position: absolute;
  top: 6px;
  left: 2px;
}
.treeview__toggle__expand {
  border: 4px solid transparent;
  border-left-color: #6e6e6e;
  border-left-width: 6px;
  position: absolute;
  top: 6px;
  left: 4px;
}
.treeview__toggle {
  position: relative;
  width: 16px;
  height: 16px;
}

</style>

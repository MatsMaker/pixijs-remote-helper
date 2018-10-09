<template>
  <div>{{ msg }}
    <TreeView></TreeView>
  </div>
</template>

<script>
  import TreeView from './TreeView.vue';

  export default {
    components: { TreeView },
    data() {
      return {
        msg: "Root:"
      }
    }
  }
</script>

<style lang="scss">
</style>
<template>
  <div class="propertyField">
    <span class="properyName">{{ name }}</span>:{{data}}
    <input class="input-field"
      v-model="newValue"
      :type="'text'"
      @blur="restoreValue"
      v-on:keyup.enter="setValue"/>
  </div>
</template>
<script>
import proxy from "../proxy";

export default {
  props: ["name", "data", "itemIndex"],
  data() {
    return {
      newValue: this.data
    };
  },
  watch: {
    data(val, oldVal) {
      if (val !== oldVal) {
        this.data = val;
      }
    }  
  },
  methods: {
    setValue(e) {
      proxy.updateItem(this.itemIndex, this.name, this.newValue);
    },
    restoreValue() {
      this.newValue = this.data;
    }
  }
};
</script>
<style lang="scss">
.input-field {
  border: none;
  background-color: transparent;
}
</style>

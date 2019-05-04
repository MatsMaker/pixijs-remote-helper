<template>
  <div class="propertyField">
    <span class="properyName">{{ name }}</span>:
    <input class="input-field"
      v-model="newValue"
      :type="'text'"
      @focus="onFocus"
      @blur="restoreValue"
      v-on:keyup.enter="setValue"/>
  </div>
</template>
<script>
import proxy from "../proxy";
import { getValueType } from "../../utils/transporter";

export default {
  props: ["name", "data", "itemIndex"],
  data() {
    return {
      newValue: this.data
    };
  },
  computed: {
    valueType() {
      return getValueType(this.data);
    }
  },
  watch: {
    data(val, oldVal) {
      if (val !== oldVal) {
        this.newValue = val;
      }
    }  
  },
  methods: {
    setValue(e) {
      proxy.updateItem(this.itemIndex, this.name, this.newValue);
      proxy.cache.freeze = false;
    },
    onFocus() {
      proxy.cache.freeze = true;
    },
    restoreValue() {
      this.newValue = this.data;
      proxy.cache.freeze = false;
      proxy.selectItem(proxy.cache.activeItem);
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

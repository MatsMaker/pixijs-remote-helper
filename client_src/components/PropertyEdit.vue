<template>
  <div v-if="!skip">
    <div v-if="!isComplex">
      {{ properyName }} : {{ properyData }}
    </div>
    <div v-if="isComplex">
      {{ properyName }} :
      <div v-for="(propertyValue, key, index) in properyData"
        :key="index">
        <PropertyEdit class="deep" :properyName="key" :properyData="propertyValue" :itemIndex="properyData.___item"></PropertyEdit>
      </div>
    </div>
  </div>
</template>
<script>
import PropertyEdit from "./PropertyEdit.vue";

export default {
  name: "PropertyEdit",
  props: ["properyName", "properyData", "itemIndex"],
  data() {
    return {
      skipArray: ["__index", "children"]
    };
  },
  components: { PropertyEdit },
  computed: {
    skip() {
      return this.skipArray.indexOf(this.properyName) > -1;
    },
    isComplex() {
      return typeof this.properyData === "object";
    }
  }
};
</script>
<style lang="scss">
  .deep {
      margin-left: 15px;
  }
</style>

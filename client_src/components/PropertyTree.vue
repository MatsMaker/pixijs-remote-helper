<template>
  <div class="property-tree" v-if="!skip">
    <PropertyField v-if="!isComplex" :name="properyName" :data="properyData" :itemIndex="mainObject"></PropertyField>
    <div v-if="isComplex">
      <div class="row">
        <TreeviewToggle :complex="isComplex" v-on:requestClose="onCollapse" :collapse="isCollapse"></TreeviewToggle>
        <div class="properyName">{{ properyName }}:</div>
      </div>
      <div class="propertyes" :class="{collapse: isCollapse }">
        <div v-for="(propertyValue, key, index) in properyData"
          :key="index">
          <PropertyTree class="deep"
            :properyName="key"
            :properyData="propertyValue"
            :itemIndex="mainObject">
          </PropertyTree>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PropertyTree from "./PropertyTree.vue";
import PropertyField from "./PropertyField.vue";
import TreeviewToggle from "./TreeviewToggle.vue";

export default {
  name: "PropertyTree",
  props: ["properyName", "properyData", "itemIndex"],
  data() {
    return {
      isCollapse: false,
      skipArray: ["__index", "children"]
    };
  },
  methods: {
    onCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  components: { PropertyTree, TreeviewToggle, PropertyField },
  computed: {
    mainObject() {
      return this.itemIndex;
    },
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
.collapse {
  display: none;
}
.row {
  display: flex;
}
.properyName {
  color: orangered; /*crimson;*/
}
</style>

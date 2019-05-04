<template>
  <div class="property-tree" v-if="!skip">
    <PropertyField v-if="!isComplex" :path="propertyPath" :name="properyName" :data="properyData" :itemIndex="mainObject"></PropertyField>
    <div v-if="isComplex">
      <div class="row">
        <TreeviewToggle :complex="isComplex" v-on:requestClose="onCollapse" :collapse="isCollapse"></TreeviewToggle>
        <div class="properyName">{{ properyName }}:</div>
      </div>
      <div class="propertyes" :class="{collapse: isCollapse }">
        <div v-for="(propertyValue, key, index) in properyData"
          :key="index">
          <PropertyTree class="deep"
            :propertyPath="getPath()"
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
import { isNull } from "util";

export default {
  name: "PropertyTree",
  props: ["propertyPath", "properyName", "properyData", "itemIndex"],
  data() {
    return {
      isCollapse: false,
      skipArray: ["__index", "children"]
    };
  },
  methods: {
    onCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    getPath() {
      return (this.propertyPath == undefined) ? this.properyName : this.propertyPath + '.' + this.properyName;
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
      return (!isNull(this.properyData) && typeof this.properyData === "object") || Array.isArray(this.properyData);
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

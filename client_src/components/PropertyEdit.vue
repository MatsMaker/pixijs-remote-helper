<template>
  <div v-if="!skip">
    <div v-if="!isComplex">
      <span class="properyName">{{ properyName }}</span> : {{ properyData }}
    </div>
    <div v-if="isComplex">
      <div class="row">
        <TreeviewToggle :complex="isComplex" v-on:requestClose="onCollapse" :collapse="isCollapse"></TreeviewToggle>
        <div class="properyName">{{ properyName }}:</div>
      </div>
      <div class="propertyes" :class="{collapse: isCollapse }">
        <div v-for="(propertyValue, key, index) in properyData"
          :key="index">
          <PropertyEdit class="deep" :properyName="key" :properyData="propertyValue" :itemIndex="properyData.___item"></PropertyEdit>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PropertyEdit from "./PropertyEdit.vue";
import TreeviewToggle from "./TreeviewToggle.vue";

export default {
  name: "PropertyEdit",
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
  components: { PropertyEdit, TreeviewToggle },
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
